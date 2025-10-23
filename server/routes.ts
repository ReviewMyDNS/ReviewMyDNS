import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { performDnsLookup } from "./services/dns-resolver";
import { insertDnsLookupSchema, signupSchema, signinSchema } from "@shared/schema";
import { ZodError } from "zod";
import { createSessionMiddleware, requireAuth, hashPassword, verifyPassword, sanitizeUser } from "./auth";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
if (!process.env.STRIPE_PRICE_ID) {
  throw new Error('Missing required Stripe secret: STRIPE_PRICE_ID');
}
if (!process.env.STRIPE_ENTERPRISE_PRICE_ID) {
  throw new Error('Missing required Stripe secret: STRIPE_ENTERPRISE_PRICE_ID');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware
  app.use(createSessionMiddleware());

  // Auth endpoints
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const validatedData = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      
      // Hash password and create user
      const passwordHash = await hashPassword(validatedData.password);
      const user = await storage.createUser(
        validatedData.email,
        passwordHash,
        validatedData.firstName,
        validatedData.lastName
      );
      
      // Create session
      req.session.userId = user.id;
      
      res.json({ user: sanitizeUser(user) });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      console.error("Signup error:", error);
      res.status(500).json({ error: 'Failed to create account' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const validatedData = signinSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      // Verify password
      const isValid = await verifyPassword(validatedData.password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      // Create session
      req.session.userId = user.id;
      
      res.json({ user: sanitizeUser(user) });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      console.error("Login error:", error);
      res.status(500).json({ error: 'Failed to log in' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: 'Failed to log out' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  app.get('/api/auth/user', requireAuth, async (req, res) => {
    res.json({ user: sanitizeUser(req.user!) });
  });

  // DNS Lookup endpoint
  app.post("/api/dns/lookup", async (req, res) => {
    try {
      const validatedData = insertDnsLookupSchema.parse(req.body);
      
      // Create the lookup record
      const lookup = await storage.createDnsLookup(validatedData);
      
      // Get active DNS servers
      const dnsServers = await storage.getActiveDnsServers();
      const serverList = dnsServers.map(server => ({ id: server.id, ip: server.ip }));
      
      // Perform DNS lookup across all servers
      const dnsResults = await performDnsLookup(
        validatedData.domain,
        validatedData.recordType as any,
        serverList
      );
      
      // Store results
      for (const { serverId, result } of dnsResults) {
        await storage.createDnsResult({
          lookupId: lookup.id,
          serverId,
          status: result.success ? 'resolved' : 'failed',
          response: result.response || result.error || null,
          responseTime: result.responseTime,
        });
      }
      
      // Return the lookup with results
      const lookupWithResults = await storage.getDnsLookupWithResults(lookup.id);
      res.json(lookupWithResults);
      
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("DNS lookup error:", error);
        res.status(500).json({
          message: "Internal server error during DNS lookup"
        });
      }
    }
  });
  
  // Get lookup results by ID
  app.get("/api/dns/lookup/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid lookup ID" });
      }
      
      const lookup = await storage.getDnsLookupWithResults(id);
      if (!lookup) {
        return res.status(404).json({ message: "Lookup not found" });
      }
      
      res.json(lookup);
    } catch (error) {
      console.error("Error fetching lookup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get all DNS servers
  app.get("/api/dns/servers", async (req, res) => {
    try {
      const servers = await storage.getAllDnsServers();
      res.json(servers);
    } catch (error) {
      console.error("Error fetching DNS servers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Stripe checkout session endpoint
  app.post('/api/create-checkout-session', requireAuth, async (req, res) => {
    try {
      const { plan = 'pro' } = req.body;
      const priceId = plan === 'enterprise' 
        ? process.env.STRIPE_ENTERPRISE_PRICE_ID 
        : process.env.STRIPE_PRICE_ID;
      
      console.log("[Stripe] Creating checkout session for plan:", plan, "priceId:", priceId);
      
      const userId = req.user!.id;
      let user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create or get Stripe customer
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || undefined,
          metadata: {
            userId: user.id,
          },
        });
        customerId = customer.id;
        await storage.updateUserStripeInfo(userId, customerId, "");
      }

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        line_items: [{
          price: priceId,
          quantity: 1,
        }],
        success_url: `${req.headers.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/pricing`,
        metadata: {
          userId: user.id,
          plan: plan,
        },
      });

      console.log("[Stripe] Checkout session created:", session.id);

      res.send({
        sessionId: session.id,
        url: session.url,
      });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      const message = error.code === 'resource_missing' && error.param === 'line_items[0][price]'
        ? 'Subscription configuration error. Please contact support.'
        : error.message;
      return res.status(400).send({ error: { message } });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
