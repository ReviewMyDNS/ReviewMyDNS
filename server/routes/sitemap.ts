import { Router } from 'express';

const router = Router();

// FAQ guide slugs for programmatic SEO (synced with client/src/data/faq-guides.ts)
const faqSlugs = [
  'why-dns-not-updating-24-hours',
  'how-to-check-dns-propagation',
  'difference-between-a-record-cname-mx-txt',
  'domain-nameservers-vs-dns-records',
  'what-is-dns-caching',
  'how-to-find-your-nameservers',
  'nxdomain-error-fix',
  'servfail-error-fix',
  'spf-too-many-lookups-fix',
  'dmarc-fail-fix',
  'dnssec-validation-failed-fix',
  'mx-record-not-found-fix',
  'cname-root-domain-error-fix',
  'timeout-dns-query-fix',
];

// Blog article slugs (synced with client/src/data/blog-articles.ts)
const blogSlugs = [
  'dns-propagation-explained',
  'dns-migration-checklist',
  'spf-dkim-dmarc-guide',
  'common-dns-misconfigurations',
  'dns-history-debugging',
  'how-to-read-dns-records',
];

// DNS error slugs for programmatic SEO
const dnsErrorSlugs = [
  'nxdomain',
  'servfail',
  'refused',
  'timeout',
  'noerror-empty',
  'formerr',
  'notimpl',
  'cname-loop',
  'dnssec-validation-failed',
  'network-unreachable',
  'connection-refused',
  'truncated-response',
  'soa-mismatch',
  'ttl-expired',
  'lame-delegation',
  'missing-glue',
  'spf-permerror',
  'dkim-signature-invalid',
  'dmarc-failure',
  'ptr-missing',
];

// Platform DNS guide slugs
const platformDnsSlugs = [
  'wordpress',
  'shopify',
  'squarespace',
  'wix',
  'webflow',
  'ghost',
  'vercel',
  'netlify',
  'github-pages',
  'heroku',
  'render',
  'digitalocean',
  'aws',
  'google-cloud',
  'azure',
  'hubspot',
];

// Provider guide slugs for programmatic SEO (synced with client/src/data/provider-guides.ts)
const providerGuideSlugs = [
  'cloudflare-dns-setup',
  'godaddy-dns-setup',
  'namecheap-dns-setup',
  'aws-route53-dns-setup',
  'google-domains-dns-setup',
  'bluehost-dns-setup',
  'hover-dns-setup',
  'nxdomain-error-fix',
  'servfail-error-fix',
  'spf-too-many-lookups-error',
  'dmarc-authentication-failed',
  'domain-com-dns-setup',
  'siteground-dns-setup',
  'hostgator-dns-setup',
  'namesilo-dns-setup',
  'dynadot-dns-setup',
  'porkbun-dns-setup',
  'email-delivery-debugging-dns',
  'dns-resolution-not-working-propagation',
  'dnssec-validation-errors',
  'ns1-managed-dns-setup',
  'dnsimple-dns-setup',
  'linode-dns-setup',
  'digitalocean-dns-setup',
  'hostinger-dns-setup',
  'dreamhost-dns-setup',
  'ionos-dns-setup',
  'ovhcloud-dns-setup',
  'gandi-dns-setup',
  'wix-dns-setup',
  'squarespace-dns-setup',
  'shopify-dns-setup',
  'netlify-dns-setup',
  'vercel-dns-setup',
  'dns-not-propagating-fix',
  'email-going-to-spam-dns-fix',
  'ssl-certificate-dns-errors',
  'subdomain-not-working-dns',
];

router.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://reviewmydns.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const urls = [
    // Core pages
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/tools', priority: '0.9', changefreq: 'weekly' },
    { loc: '/pricing', priority: '0.9', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
    // SEO landing pages
    { loc: '/dns-propagation-checker', priority: '0.9', changefreq: 'weekly' },
    { loc: '/mx-record-lookup', priority: '0.8', changefreq: 'weekly' },
    { loc: '/txt-record-checker', priority: '0.8', changefreq: 'weekly' },
    // Developer resources
    { loc: '/api', priority: '0.8', changefreq: 'monthly' },
    { loc: '/api-docs', priority: '0.7', changefreq: 'monthly' },
    // Content hubs
    { loc: '/guides', priority: '0.9', changefreq: 'weekly' },
    { loc: '/faq', priority: '0.8', changefreq: 'weekly' },
    { loc: '/terminology', priority: '0.8', changefreq: 'monthly' },
    // Pro tools
    { loc: '/bulk-lookup', priority: '0.8', changefreq: 'weekly' },
    { loc: '/compare', priority: '0.7', changefreq: 'weekly' },
    { loc: '/monitor', priority: '0.7', changefreq: 'weekly' },
    { loc: '/analytics', priority: '0.7', changefreq: 'weekly' },
    { loc: '/history', priority: '0.7', changefreq: 'weekly' },
    { loc: '/security', priority: '0.6', changefreq: 'monthly' },
    { loc: '/dnssec', priority: '0.6', changefreq: 'monthly' },
    // Embed tools
    { loc: '/widget', priority: '0.5', changefreq: 'monthly' },
    { loc: '/embed', priority: '0.5', changefreq: 'monthly' },
    // New programmatic SEO pages
    { loc: '/errors', priority: '0.9', changefreq: 'weekly' },
    { loc: '/dns-for', priority: '0.9', changefreq: 'weekly' },
    { loc: '/is-down', priority: '0.9', changefreq: 'daily' },
  ];

  // Add programmatic provider guide pages
  providerGuideSlugs.forEach(slug => {
    urls.push({
      loc: `/guides/${slug}`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  });

  // Add FAQ pages
  faqSlugs.forEach(slug => {
    urls.push({
      loc: `/faq/${slug}`,
      priority: '0.7',
      changefreq: 'monthly'
    });
  });

  // Add blog index page
  urls.push({
    loc: '/blog',
    priority: '0.9',
    changefreq: 'weekly'
  });

  // Add blog article pages
  blogSlugs.forEach(slug => {
    urls.push({
      loc: `/blog/${slug}`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  });

  // Add DNS error pages
  dnsErrorSlugs.forEach(slug => {
    urls.push({
      loc: `/errors/${slug}`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  });

  // Add platform DNS guide pages
  platformDnsSlugs.forEach(slug => {
    urls.push({
      loc: `/dns-for/${slug}`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

export default router;
