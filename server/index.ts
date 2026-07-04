import express, { type Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { startCleanupJob } from "./rate-limiter";
import { getPageMeta, buildSsrContent } from "./seo-metadata";

// ── E-E-A-T Schema Markup ─────────────────────────────────────────────────
const RYMD_BASE_URL = 'https://reviewmydns.com';

const RYMD_ORG_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${RYMD_BASE_URL}/#organization`,
  name: 'ReviewMyDNS',
  url: RYMD_BASE_URL,
  description: 'Free DNS lookup, propagation checking, and diagnostic tools',
  sameAs: [],
});

const RYMD_PERSON_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Todd Isom',
  jobTitle: 'Network Engineer & DNS Specialist',
  worksFor: { '@id': `${RYMD_BASE_URL}/#organization` },
  knowsAbout: ['DNS', 'network infrastructure', 'domain management'],
});

function buildRymdBreadcrumbs(urlPath: string): string {
  const segments = urlPath.split('/').filter(Boolean);
  const items: object[] = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${RYMD_BASE_URL}/` }];
  let accumulated = '';
  for (let i = 0; i < segments.length; i++) {
    accumulated += '/' + segments[i];
    const label = segments[i].replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    items.push({ '@type': 'ListItem', position: i + 2, name: label, item: RYMD_BASE_URL + accumulated });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items });
}

function buildRymdSchemas(urlPath: string): string {
  const scripts = [
    `<script type="application/ld+json">${RYMD_ORG_SCHEMA}</script>`,
    `<script type="application/ld+json">${buildRymdBreadcrumbs(urlPath)}</script>`,
  ];
  if (urlPath === '/about') {
    scripts.push(`<script type="application/ld+json">${RYMD_PERSON_SCHEMA}</script>`);
  }
  return scripts.join('\n  ');
}

const app = express();

// Trust proxy for production (required for secure cookies behind reverse proxy)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Health check endpoint - responds immediately before full app setup
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 301 redirects for old/alternate URL aliases to canonical pages
const REDIRECTS: Record<string, string> = {
  '/what-is-dns-ttl':         '/what-is-ttl-in-dns',
  '/what-is-an-mx-record':    '/mx-record-lookup',
  '/a-vs-cname-records':      '/a-record-vs-cname',
  '/dns-cache-explained':     '/what-is-dns-cache',
  '/what-is-a-nameserver':    '/how-to-check-nameservers',
  '/flush-dns-cache':         '/how-to-flush-dns-cache',
  '/ttl-migration-guide':     '/how-to-lower-ttl-before-migration',
  '/embed':                   '/widget',
};
Object.entries(REDIRECTS).forEach(([from, to]) => {
  app.get(from, (_req, res) => res.redirect(301, to));
});

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
    if ((req.path.startsWith('/api') && !req.path.startsWith('/api-docs')) || req.path.startsWith('/assets') || req.path.includes('.')) {
      return next();
    }
    const canonicalPath = req.originalUrl.replace(/\/+$/, '') || '';
    const canonicalUrl = `https://reviewmydns.com${canonicalPath}`;
    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
    const meta = getPageMeta(req.path);

    const originalEnd = res.end;
    const originalSend = res.send;

    const injectSeo = (content: string) => {
      if (!content.includes('rel="canonical"')) {
        content = content.replace('</head>', `${canonicalTag}\n</head>`);
      }
      // Inject E-E-A-T schemas (only if not already injected by catch-all)
      if (!content.includes('application/ld+json')) {
        content = content.replace('</head>', `  ${buildRymdSchemas(req.path)}\n</head>`);
      }
      content = content.replace('%%OG_URL%%', canonicalUrl);
      content = content.replace('%%PAGE_TITLE%%', meta.title);
      content = content.replace('%%PAGE_DESC%%', meta.description);
      content = content.replace('%%SSR_CONTENT%%', buildSsrContent(meta.h1, req.path, meta.description));
      return content;
    };

    res.send = function (body: any) {
      if (typeof body === 'string' && body.includes('</head>')) {
        body = injectSeo(body);
      }
      return originalSend.call(this, body);
    };

    res.end = (function (this: any, chunk?: any, ...args: any[]) {
      if (typeof chunk === 'string' && chunk.includes('</head>')) {
        chunk = injectSeo(chunk);
      }
      return (originalEnd as any).apply(this, [chunk, ...args]);
    }) as any;

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
    app.use(express.static(distPath, { index: false }));

    const htmlTemplate = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

    app.get("/dns-propagation-checker", (req, res) => {
      res.status(200).set({ "Content-Type": "text/html" }).send(htmlTemplate);
    });

    app.get("/mx-record-lookup", (req, res) => {
      res.status(200).set({ "Content-Type": "text/html" }).send(htmlTemplate);
    });

    app.get("/widget", (req, res) => {
      const html = fs.readFileSync(path.resolve(distPath, "widget.html"), "utf-8");
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    });

    app.get("/blog/cloudflare-vs-route53", (_req, res) => {
      res.status(410).send("<!DOCTYPE html><html><head><title>410 Gone</title></head><body><h1>410 Gone</h1><p>This page has been permanently removed.</p></body></html>");
    });

    app.use("*", (req, res) => {
      const urlPath = req.originalUrl.split('?')[0].replace(/\/+$/, '') || '/';
      const canonicalUrl = `https://reviewmydns.com${urlPath}`;
      const meta = getPageMeta(req.originalUrl);
      let html = htmlTemplate;
      if (!html.includes('rel="canonical"')) {
        html = html.replace('</head>', `<link rel="canonical" href="${canonicalUrl}" />\n</head>`);
      }
      // Inject E-E-A-T schemas
      html = html.replace('</head>', `  ${buildRymdSchemas(urlPath)}\n</head>`);
      html = html.replace('%%OG_URL%%', canonicalUrl);
      html = html.replace('%%PAGE_TITLE%%', meta.title);
      html = html.replace('%%PAGE_DESC%%', meta.description);
      html = html.replace('%%SSR_CONTENT%%', buildSsrContent(meta.h1, req.originalUrl, meta.description));
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
