import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { performDnsLookup } from "./services/dns-resolver";
import { insertDnsLookupSchema } from "@shared/schema";
import { ZodError } from "zod";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
if (!process.env.STRIPE_PRICE_ID) {
  throw new Error('Missing required Stripe secret: STRIPE_PRICE_ID');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);
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
  
  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Stripe subscription endpoint
  app.post('/api/create-subscription', isAuthenticated, async (req: any, res) => {
    try {
      console.log("[Stripe] STRIPE_PRICE_ID:", process.env.STRIPE_PRICE_ID);
      
      const userId = req.user.claims.sub;
      let user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // If user already has an active subscription, return existing
      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId, {
          expand: ['latest_invoice.payment_intent'],
        });
        if (subscription.status === 'active' || subscription.status === 'trialing') {
          const latestInvoice: any = subscription.latest_invoice;
          const paymentIntent: any = latestInvoice?.payment_intent;
          
          return res.send({
            subscriptionId: subscription.id,
            clientSecret: paymentIntent?.client_secret,
          });
        }
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
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: process.env.STRIPE_PRICE_ID,
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user with Stripe info
      await storage.updateUserStripeInfo(userId, customerId, subscription.id);

      const latestInvoice: any = subscription.latest_invoice;
      const paymentIntent: any = latestInvoice?.payment_intent;

      res.send({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent?.client_secret,
      });
    } catch (error: any) {
      console.error("Stripe subscription error:", error);
      const message = error.code === 'resource_missing' && error.param === 'items[0][price]'
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
