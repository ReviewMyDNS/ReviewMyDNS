import express, { type Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { startCleanupJob } from "./rate-limiter";

const app = express();

// Trust proxy for production (required for secure cookies behind reverse proxy)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Stripe webhook needs raw body for signature verification
// Apply express.raw() to webhook route BEFORE express.json()
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), (req, res, next) => {
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/assets') || req.path.includes('.')) {
      return next();
    }
    const canonicalPath = req.path.replace(/\/+$/, '') || '';
    const canonicalUrl = `https://reviewmydns.com${canonicalPath}`;
    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;

    const originalEnd = res.end;
    const originalSend = res.send;

    const injectSeo = (content: string) => {
      if (!content.includes('rel="canonical"')) {
        content = content.replace('</head>', `${canonicalTag}\n</head>`);
      }
      content = content.replace('%%OG_URL%%', canonicalUrl);
      return content;
    };

    res.send = function (body: any) {
      if (typeof body === 'string' && body.includes('</head>')) {
        body = injectSeo(body);
      }
      return originalSend.call(this, body);
    };

    res.end = function (chunk?: any, ...args: any[]) {
      if (typeof chunk === 'string' && chunk.includes('</head>')) {
        chunk = injectSeo(chunk);
      }
      return originalEnd.call(this, chunk, ...args);
    } as any;

    next();
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    const distPath = path.resolve(import.meta.dirname, "public");
    if (!fs.existsSync(distPath)) {
      throw new Error(
        `Could not find the build directory: ${distPath}, make sure to build the client first`,
      );
    }
    app.use(express.static(distPath));
    app.use("*", (req, res) => {
      const canonicalPath = req.originalUrl.split('?')[0].replace(/\/+$/, '') || '';
      const canonicalUrl = `https://reviewmydns.com${canonicalPath}`;
      let html = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");
      if (!html.includes('rel="canonical"')) {
        html = html.replace('</head>', `<link rel="canonical" href="${canonicalUrl}" />\n</head>`);
      }
      html = html.replace('%%OG_URL%%', canonicalUrl);
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    });
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    // Start daily cleanup job for old usage logs
    startCleanupJob(24); // Run every 24 hours
  });
})();
