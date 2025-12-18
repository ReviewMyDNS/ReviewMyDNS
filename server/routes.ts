import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { performDnsLookup } from "./services/dns-resolver";
import { insertDnsLookupSchema, signupSchema, signinSchema, users, PLAN_LIMITS, insertEmailCaptureSchema } from "@shared/schema";
import { ZodError } from "zod";
import { createSessionMiddleware, requireAuth, hashPassword, verifyPassword, sanitizeUser } from "./auth";
import { getPlanTier } from "./middleware/plan-guard";
import { checkRateLimit, logUsage, getAnonymousId } from "./rate-limiter";
import Stripe from "stripe";
import { db } from "./db";
import { eq } from "drizzle-orm";
import sitemapRoutes from "./routes/sitemap";

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

  // Google Search Console verification
  app.get('/google7e2da050c003b930.html', (req, res) => {
    res.type('text/html').send('google-site-verification: google7e2da050c003b930.html');
  });

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

  // Get usage stats for current user/anonymous session
  app.get('/api/usage/stats', async (req, res) => {
    try {
      const userPlan = getPlanTier(req.user);
      const planLimits = PLAN_LIMITS[userPlan];
      const userId = req.user?.id || null;
      const anonymousId = userId ? null : getAnonymousId(req);
      
      // Get current usage (convert null to -1 for unlimited plans)
      const dailyLimit = planLimits.dailyLookups ?? -1;
      const usage = await checkRateLimit(userId, anonymousId, "dns_lookup", dailyLimit);
      
      res.json({
        plan: userPlan,
        dailyLimit: planLimits.dailyLookups,
        used: usage.limit === -1 ? 0 : usage.limit - usage.remaining,
        remaining: usage.remaining,
        resetAt: usage.resetAt,
        allowedRecordTypes: planLimits.allowedRecordTypes,
      });
    } catch (error) {
      console.error("Error fetching usage stats:", error);
      res.status(500).json({ error: 'Failed to fetch usage stats' });
    }
  });

  // DNS Lookup endpoint with rate limiting
  app.post("/api/dns/lookup", async (req, res) => {
    try {
      const validatedData = insertDnsLookupSchema.parse(req.body);
      
      // Get user plan and limits
      const userPlan = getPlanTier(req.user);
      const planLimits = PLAN_LIMITS[userPlan];
      const userId = req.user?.id || null;
      const anonymousId = userId ? null : getAnonymousId(req);
      
      // Check if record type is allowed for this plan
      const isAllowed = (planLimits.allowedRecordTypes as readonly string[]).includes(validatedData.recordType);
      if (!isAllowed) {
        return res.status(403).json({
          error: "Record type not available",
          message: `DNS record type '${validatedData.recordType}' requires a Pro or Enterprise plan`,
          currentPlan: userPlan,
          allowedTypes: planLimits.allowedRecordTypes,
          upgradeUrl: "/pricing",
        });
      }
      
      // Check rate limit (convert null to -1 for unlimited plans)
      const dailyLimit = planLimits.dailyLookups ?? -1;
      const rateLimit = await checkRateLimit(userId, anonymousId, "dns_lookup", dailyLimit);
      
      if (!rateLimit.allowed) {
        return res.status(429).json({
          error: "Rate limit exceeded",
          message: `You've reached your daily limit of ${rateLimit.limit} DNS lookups`,
          currentPlan: userPlan,
          limit: rateLimit.limit,
          remaining: 0,
          resetAt: rateLimit.resetAt,
          upgradeUrl: "/pricing",
        });
      }
      
      // Log usage
      await logUsage(userId, anonymousId, "dns_lookup");
      
      // Create the lookup record with userId
      const lookup = await storage.createDnsLookup({
        ...validatedData,
        userId,
      });
      
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
      
      // Return the lookup with results and rate limit info
      const lookupWithResults = await storage.getDnsLookupWithResults(lookup.id);
      res.json({
        ...lookupWithResults,
        rateLimit: {
          limit: rateLimit.limit,
          remaining: rateLimit.remaining - 1,
          resetAt: rateLimit.resetAt,
        },
      });
      
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

  // Get lookup results by share ID (API endpoint)
  app.get("/api/dns/share/:shareId", async (req, res) => {
    try {
      const shareId = req.params.shareId;
      
      const lookup = await storage.getDnsLookupByShareId(shareId);
      if (!lookup) {
        return res.status(404).json({ message: "Shared lookup not found" });
      }
      
      res.json(lookup);
    } catch (error) {
      console.error("Error fetching shared lookup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Server-side render shared result page with meta tags for social crawlers
  app.get("/r/:shareId", async (req, res, next) => {
    try {
      const shareId = req.params.shareId;
      const userAgent = req.get('user-agent') || '';
      
      // Detect if request is from a social media crawler
      const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|pinterest|telegrambot/i.test(userAgent);
      
      // If not a crawler, let the SPA handle it
      if (!isCrawler) {
        return next();
      }

      // Fetch lookup data for crawler
      const lookup = await storage.getDnsLookupByShareId(shareId);
      
      if (!lookup) {
        return next(); // Let SPA show 404
      }

      const title = `DNS Results: ${lookup.domain} (${lookup.recordType}) - ReviewMyDNS`;
      const description = `${lookup.stats.resolvedCount} of ${lookup.stats.totalServers} DNS servers resolved successfully. Average response time: ${lookup.stats.averageResponseTime.toFixed(0)}ms. Global coverage: ${lookup.stats.globalCoverage.toFixed(1)}%`;
      const url = `${req.protocol}://${req.get('host')}/r/${shareId}`;
      const siteName = 'ReviewMyDNS';

      // Read the base index.html and inject meta tags
      const fs = await import('fs/promises');
      const path = await import('path');
      const indexPath = path.join(process.cwd(), 'dist/public/index.html');
      
      let html: string;
      try {
        html = await fs.readFile(indexPath, 'utf-8');
      } catch (err) {
        // Fallback to development mode
        const devIndexPath = path.join(process.cwd(), 'client/index.html');
        html = await fs.readFile(devIndexPath, 'utf-8');
      }

      // Inject meta tags into the HTML
      const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:site_name" content="${siteName}" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${url}" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
      `;

      // Insert meta tags before </head>
      html = html.replace('</head>', `${metaTags}\n  </head>`);

      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      console.error("Error rendering shared page:", error);
      next(); // Let SPA handle error
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
      let priceId;
      if (plan === 'enterprise') {
        priceId = process.env.STRIPE_ENTERPRISE_PRICE_ID;
      } else if (plan === 'team') {
        priceId = process.env.STRIPE_TEAM_PRICE_ID;
      } else {
        priceId = process.env.STRIPE_PRICE_ID;
      }
      
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

      // Construct base URL with fallback
      const protocol = req.headers['x-forwarded-proto'] || 'https';
      const host = req.headers.host;
      const origin = req.headers.origin || `${protocol}://${host}`;
      
      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        line_items: [{
          price: priceId,
          quantity: 1,
        }],
        allow_promotion_codes: true,
        success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
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

  // Verify Stripe checkout session (for when user returns from checkout)
  app.get('/api/stripe/verify-session/:sessionId', requireAuth, async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (session.metadata?.userId !== req.user!.id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      if (session.payment_status === 'paid' && session.subscription) {
        const plan = session.metadata?.plan || 'pro';
        
        await storage.updateUserStripeInfo(
          req.user!.id,
          session.customer as string,
          session.subscription as string
        );

        await db
          .update(users)
          .set({
            subscriptionPlan: plan,
            subscriptionStatus: 'active',
            updatedAt: new Date(),
          })
          .where(eq(users.id, req.user!.id));

        res.json({ success: true, plan });
      } else {
        res.json({ success: false, payment_status: session.payment_status });
      }
    } catch (error: any) {
      console.error('Session verification error:', error);
      res.status(500).json({ error: 'Failed to verify session' });
    }
  });

  // Stripe webhook endpoint
  app.post('/api/stripe/webhook', async (req, res) => {
    try {
      const sig = req.headers['stripe-signature'];
      if (!sig) {
        return res.status(400).send('No signature');
      }

      let event;
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET || ''
        );
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;

        if (userId && session.subscription) {
          console.log(`[Stripe Webhook] Updating subscription for user ${userId} to plan ${plan}`);
          
          await storage.updateUserStripeInfo(
            userId,
            session.customer as string,
            session.subscription as string
          );

          const user = await storage.getUser(userId);
          if (user) {
            await db
              .update(users)
              .set({
                subscriptionPlan: plan,
                subscriptionStatus: 'active',
                updatedAt: new Date(),
              })
              .where(eq(users.id, userId));
          }
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Webhook handler failed' });
    }
  });

  // Email capture endpoint
  app.post("/api/email-capture", async (req, res) => {
    try {
      const result = insertEmailCaptureSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid email data",
          errors: result.error.errors 
        });
      }

      await storage.captureEmail(result.data);

      res.json({ success: true });
    } catch (error) {
      console.error("Error capturing email:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // SEO routes
  app.use(sitemapRoutes);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
