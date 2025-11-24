import { Router } from 'express';

const router = Router();

// Provider guide slugs for programmatic SEO (synced with client/src/data/provider-guides.ts)
const providerGuideSlugs = [
  'cloudflare-dns-setup',
  'godaddy-dns-setup',
  // Add more as they're created: namecheap, route53, google-domains, hover, bluehost
];

router.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://reviewmydns.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/tools', priority: '0.9', changefreq: 'weekly' },
    { loc: '/pricing', priority: '0.9', changefreq: 'monthly' },
    { loc: '/login', priority: '0.5', changefreq: 'monthly' },
    { loc: '/register', priority: '0.5', changefreq: 'monthly' },
    { loc: '/bulk-lookup', priority: '0.8', changefreq: 'weekly' },
    { loc: '/analytics', priority: '0.7', changefreq: 'weekly' },
    { loc: '/monitor', priority: '0.7', changefreq: 'weekly' },
    { loc: '/history', priority: '0.7', changefreq: 'weekly' },
    { loc: '/compare', priority: '0.7', changefreq: 'weekly' },
    { loc: '/security', priority: '0.6', changefreq: 'monthly' },
    { loc: '/dnssec', priority: '0.6', changefreq: 'monthly' },
    { loc: '/api-docs', priority: '0.7', changefreq: 'monthly' },
    // SEO landing pages
    { loc: '/dns-propagation-checker', priority: '0.9', changefreq: 'weekly' },
    { loc: '/mx-record-lookup', priority: '0.8', changefreq: 'weekly' },
    { loc: '/txt-record-checker', priority: '0.8', changefreq: 'weekly' },
    { loc: '/widget', priority: '0.7', changefreq: 'monthly' },
    { loc: '/embed', priority: '0.6', changefreq: 'monthly' },
  ];

  // Add programmatic provider guide pages
  providerGuideSlugs.forEach(slug => {
    urls.push({
      loc: `/guides/${slug}`,
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
