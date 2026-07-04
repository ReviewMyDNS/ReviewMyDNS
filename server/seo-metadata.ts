interface PageMeta {
  title: string;
  description: string;
  h1: string;
}

const NAV_LINKS = `<nav aria-label="Main navigation"><a href="/">DNS Checker</a> | <a href="/dns-propagation-checker">Propagation Checker</a> | <a href="/mx-record-lookup">MX Lookup</a> | <a href="/txt-record-checker">TXT Checker</a> | <a href="/tools">All Tools</a> | <a href="/what-is-ttl-in-dns">TTL Guide</a> | <a href="/dns-record-types-explained">Record Types</a> | <a href="/how-to-flush-dns-cache">Flush DNS</a> | <a href="/spf-dkim-dmarc-explained">SPF/DKIM/DMARC</a> | <a href="/pricing">Pricing</a> | <a href="/blog">Blog</a> | <a href="/guides">Guides</a> | <a href="/faq">FAQ</a> | <a href="/contact">Contact</a> | <a href="/about">About</a> | <a href="/errors">DNS Errors</a> | <a href="/dns-for">DNS For Platforms</a> | <a href="/is-down">Is It Down?</a> | <a href="/embed">Embed Widget</a> | <a href="/api-docs">API Docs</a> | <a href="/api">API</a> | <a href="/bulk-lookup">Bulk Lookup</a> | <a href="/compare">Compare Providers</a> | <a href="/history">Lookup History</a> | <a href="/monitor">DNS Monitor</a> | <a href="/analytics">Analytics</a> | <a href="/widget">DNS Widget</a> | <a href="/link-to-us">Link to Us</a> | <a href="/documentation">Documentation</a></nav>`;

const GUIDE_LINKS = `<nav aria-label="DNS setup guides"><h2>DNS Setup Guides</h2><a href="/guides/cloudflare-dns-setup">Cloudflare DNS Setup</a> | <a href="/guides/godaddy-dns-setup">GoDaddy DNS Setup</a> | <a href="/guides/namecheap-dns-setup">Namecheap DNS Setup</a> | <a href="/guides/aws-route53-dns-setup">AWS Route 53 Setup</a> | <a href="/guides/google-domains-dns-setup">Google Domains Setup</a> | <a href="/guides/bluehost-dns-setup">Bluehost DNS Setup</a> | <a href="/guides/hover-dns-setup">Hover DNS Setup</a> | <a href="/guides/domain-com-dns-setup">Domain.com Setup</a> | <a href="/guides/siteground-dns-setup">SiteGround Setup</a> | <a href="/guides/hostgator-dns-setup">HostGator Setup</a> | <a href="/guides/namesilo-dns-setup">NameSilo Setup</a> | <a href="/guides/dynadot-dns-setup">Dynadot Setup</a> | <a href="/guides/porkbun-dns-setup">Porkbun Setup</a> | <a href="/guides/ns1-managed-dns-setup">NS1 Setup</a> | <a href="/guides/dnsimple-dns-setup">DNSimple Setup</a> | <a href="/guides/linode-dns-setup">Linode Setup</a> | <a href="/guides/digitalocean-dns-setup">DigitalOcean Setup</a> | <a href="/guides/hostinger-dns-setup">Hostinger Setup</a> | <a href="/guides/dreamhost-dns-setup">DreamHost Setup</a> | <a href="/guides/ionos-dns-setup">IONOS Setup</a> | <a href="/guides/ovhcloud-dns-setup">OVHcloud Setup</a> | <a href="/guides/gandi-dns-setup">Gandi Setup</a> | <a href="/guides/wix-dns-setup">Wix DNS Setup</a> | <a href="/guides/netlify-dns-setup">Netlify DNS Setup</a> | <a href="/guides/shopify-dns-setup">Shopify DNS Setup</a> | <a href="/guides/squarespace-dns-setup">Squarespace DNS Setup</a> | <a href="/guides/vercel-dns-setup">Vercel DNS Setup</a></nav>`;

const TROUBLESHOOTING_GUIDE_LINKS = `<nav aria-label="Troubleshooting guides"><h2>Troubleshooting Guides</h2><a href="/guides/nxdomain-error-fix">NXDOMAIN Error Fix</a> | <a href="/guides/servfail-error-fix">SERVFAIL Error Fix</a> | <a href="/guides/spf-too-many-lookups-error">SPF Too Many Lookups</a> | <a href="/guides/dmarc-authentication-failed">DMARC Auth Failed</a> | <a href="/guides/email-delivery-debugging-dns">Email Delivery Debugging</a> | <a href="/guides/dns-resolution-not-working-propagation">DNS Resolution Issues</a> | <a href="/guides/dnssec-validation-errors">DNSSEC Validation Errors</a> | <a href="/guides/dns-not-propagating-fix">DNS Not Propagating Fix</a> | <a href="/guides/ssl-certificate-dns-errors">SSL Certificate DNS Errors</a> | <a href="/guides/email-going-to-spam-dns-fix">Email Going to Spam Fix</a> | <a href="/guides/subdomain-not-working-dns">Subdomain Not Working</a></nav>`;

const FAQ_LINKS = `<nav aria-label="Frequently asked questions"><h2>Common DNS Questions</h2><a href="/faq/why-dns-not-updating-24-hours">Why Is DNS Not Updating After 24 Hours?</a> | <a href="/faq/how-to-check-dns-propagation">How to Check DNS Propagation</a> | <a href="/faq/difference-between-a-record-cname-mx-txt">Difference Between A, CNAME, MX, TXT</a> | <a href="/faq/domain-nameservers-vs-dns-records">Nameservers vs DNS Records</a> | <a href="/faq/what-is-dns-caching">What Is DNS Caching?</a> | <a href="/faq/how-to-find-your-nameservers">How to Find Your Nameservers</a> | <a href="/faq/nxdomain-error-fix">NXDOMAIN Error Fix</a> | <a href="/faq/servfail-error-fix">SERVFAIL Error Fix</a> | <a href="/faq/spf-too-many-lookups-fix">SPF Too Many Lookups Fix</a> | <a href="/faq/dmarc-fail-fix">DMARC Fail Fix</a> | <a href="/faq/dnssec-validation-failed-fix">DNSSEC Validation Failed</a> | <a href="/faq/mx-record-not-found-fix">MX Record Not Found</a> | <a href="/faq/cname-root-domain-error-fix">CNAME Root Domain Error</a> | <a href="/faq/timeout-dns-query-fix">Timeout DNS Query Fix</a></nav>`;

const ERROR_LINKS = `<nav aria-label="DNS error reference"><h2>DNS Error Reference</h2><a href="/errors">All DNS Errors</a> | <a href="/errors/nxdomain">NXDOMAIN</a> | <a href="/errors/servfail">SERVFAIL</a> | <a href="/errors/refused">REFUSED</a> | <a href="/errors/timeout">Timeout</a> | <a href="/errors/noerror-empty">NOERROR Empty</a> | <a href="/errors/formerr">FORMERR</a> | <a href="/errors/notimpl">NOTIMPL</a> | <a href="/errors/cname-loop">CNAME Loop</a> | <a href="/errors/dnssec-validation-failed">DNSSEC Validation Failed</a> | <a href="/errors/network-unreachable">Network Unreachable</a> | <a href="/errors/connection-refused">Connection Refused</a> | <a href="/errors/truncated-response">Truncated Response</a> | <a href="/errors/soa-mismatch">SOA Mismatch</a> | <a href="/errors/ttl-expired">TTL Expired</a> | <a href="/errors/lame-delegation">Lame Delegation</a> | <a href="/errors/missing-glue">Missing Glue</a> | <a href="/errors/spf-permerror">SPF PermError</a> | <a href="/errors/dkim-signature-invalid">DKIM Signature Invalid</a> | <a href="/errors/dmarc-failure">DMARC Failure</a> | <a href="/errors/ptr-missing">PTR Missing</a></nav>`;

const DNSFOR_LINKS = `<nav aria-label="DNS for platforms"><h2>DNS Setup by Platform</h2><a href="/dns-for">All Platforms</a> | <a href="/dns-for/wordpress">WordPress DNS</a> | <a href="/dns-for/shopify">Shopify DNS</a> | <a href="/dns-for/squarespace">Squarespace DNS</a> | <a href="/dns-for/wix">Wix DNS</a> | <a href="/dns-for/webflow">Webflow DNS</a> | <a href="/dns-for/ghost">Ghost DNS</a> | <a href="/dns-for/vercel">Vercel DNS</a> | <a href="/dns-for/netlify">Netlify DNS</a> | <a href="/dns-for/github-pages">GitHub Pages DNS</a> | <a href="/dns-for/heroku">Heroku DNS</a> | <a href="/dns-for/render">Render DNS</a> | <a href="/dns-for/digitalocean">DigitalOcean DNS</a> | <a href="/dns-for/aws">AWS DNS</a> | <a href="/dns-for/google-cloud">Google Cloud DNS</a> | <a href="/dns-for/azure">Azure DNS</a> | <a href="/dns-for/hubspot">HubSpot DNS</a></nav>`;

const BLOG_LINKS = `<nav aria-label="Blog posts"><h2>Latest Blog Posts</h2><a href="/blog">All Posts</a> | <a href="/blog/dns-propagation-explained">DNS Propagation Explained</a> | <a href="/blog/dns-migration-checklist">DNS Migration Checklist</a> | <a href="/blog/spf-dkim-dmarc-guide">SPF DKIM DMARC Guide</a> | <a href="/blog/common-dns-misconfigurations">Common DNS Misconfigurations</a> | <a href="/blog/dns-history-debugging">DNS History Debugging</a> | <a href="/blog/how-to-read-dns-records">How to Read DNS Records</a></nav>`;

const CONTENT_LINKS = `<nav aria-label="Content pages"><h2>Learn About DNS</h2><a href="/what-is-ttl-in-dns">What is TTL in DNS?</a> | <a href="/dns-record-types-explained">DNS Record Types Explained</a> | <a href="/a-record-vs-cname">A Record vs CNAME</a> | <a href="/what-is-dns-cache">What is DNS Cache?</a> | <a href="/how-to-check-nameservers">How to Check Nameservers</a> | <a href="/how-to-flush-dns-cache">How to Flush DNS Cache</a> | <a href="/how-to-lower-ttl-before-migration">TTL Before Migration</a> | <a href="/why-mx-record-not-working">MX Record Not Working</a> | <a href="/spf-dkim-dmarc-explained">SPF/DKIM/DMARC Explained</a> | <a href="/how-long-does-dns-propagation-take">DNS Propagation Time</a> | <a href="/dns-not-propagating">DNS Not Propagating</a> | <a href="/google-workspace-mx-not-working">Google Workspace MX Issues</a> | <a href="/domain-not-working-after-transfer">Domain Transfer Issues</a> | <a href="/dnssec">DNSSEC</a> | <a href="/terminology">DNS Terminology</a> | <a href="/security">DNS Security</a></nav>`;

const PROVIDER_LINKS = `<nav aria-label="Provider tools"><h2>Check DNS by Provider</h2><a href="/check-godaddy-dns">GoDaddy DNS</a> | <a href="/check-cloudflare-dns">Cloudflare DNS</a> | <a href="/check-namecheap-dns">Namecheap DNS</a></nav>`;

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'ReviewMyDNS - Free DNS Propagation Checker',
    description: 'Check DNS records across 50+ global servers. Free DNS propagation checker with diagnostics for A, MX, CNAME, TXT, NS records.',
    h1: 'Free DNS Propagation Checker - Check DNS Records Globally',
  },
  '/dns-propagation-checker': {
    title: 'DNS Propagation Checker - ReviewMyDNS',
    description: 'Check DNS propagation across 50+ worldwide servers. Verify DNS changes, monitor record updates, and troubleshoot issues.',
    h1: 'DNS Propagation Checker',
  },
  '/mx-record-lookup': {
    title: 'MX Record Lookup - Check Mail Server Records',
    description: 'Free MX record lookup tool. Check mail exchange records for any domain across global DNS servers to verify email routing.',
    h1: 'MX Record Lookup Tool',
  },
  '/txt-record-checker': {
    title: 'TXT Record Checker - Verify SPF, DKIM, DMARC',
    description: 'Check TXT records for any domain. Verify SPF, DKIM, and DMARC email authentication records across multiple DNS servers.',
    h1: 'TXT Record Checker',
  },
  '/what-is-ttl-in-dns': {
    title: 'What is TTL in DNS? Complete Guide',
    description: 'Learn what TTL means in DNS, how it affects propagation, and best practices for setting TTL values for different record types.',
    h1: 'What is TTL in DNS?',
  },
  '/dns-record-types-explained': {
    title: 'DNS Record Types Explained - A, AAAA, CNAME, MX',
    description: 'Complete guide to DNS record types: A, AAAA, CNAME, MX, TXT, NS, SOA, PTR, SRV, and CAA records explained with examples.',
    h1: 'DNS Record Types Explained',
  },
  '/a-record-vs-cname': {
    title: 'A Record vs CNAME - When to Use Each',
    description: 'Learn the difference between A records and CNAME records, when to use each type, and common DNS configuration mistakes to avoid.',
    h1: 'A Record vs CNAME: What is the Difference?',
  },
  '/what-is-dns-cache': {
    title: 'What is DNS Cache? How DNS Caching Works',
    description: 'Learn how DNS caching works at browser, OS, router, and ISP level. Understand cache poisoning risks and how to flush your cache.',
    h1: 'What is DNS Cache?',
  },
  '/how-to-check-nameservers': {
    title: 'How to Check Nameservers for a Domain',
    description: 'Find nameservers for any domain using our free tool or command line. Verify NS records and troubleshoot delegation issues.',
    h1: 'How to Check Nameservers',
  },
  '/how-to-flush-dns-cache': {
    title: 'How to Flush DNS Cache - Windows, Mac, Linux',
    description: 'Step-by-step guide to flush DNS cache on Windows, Mac, Linux, Chrome, and Firefox. Includes verification steps for each platform.',
    h1: 'How to Flush DNS Cache',
  },
  '/how-to-lower-ttl-before-migration': {
    title: 'How to Lower TTL Before DNS Migration',
    description: 'Step-by-step guide to lowering TTL before a DNS migration to minimize downtime. Includes timing recommendations and rollback tips.',
    h1: 'How to Lower TTL Before Migration',
  },
  '/why-mx-record-not-working': {
    title: 'Why Is My MX Record Not Working? 8 Common Fixes',
    description: 'Troubleshoot MX record issues causing email delivery failures. Fix problems with Google Workspace, Microsoft 365, and Zoho Mail.',
    h1: 'Why Is My MX Record Not Working?',
  },
  '/spf-dkim-dmarc-explained': {
    title: 'SPF, DKIM, DMARC Explained - Email Auth Guide',
    description: 'Complete guide to SPF, DKIM, and DMARC email authentication. Learn how to set up, validate, and troubleshoot email security records.',
    h1: 'SPF, DKIM, and DMARC Explained',
  },
  '/how-long-does-dns-propagation-take': {
    title: 'How Long Does DNS Propagation Take?',
    description: 'DNS propagation typically takes 24-48 hours but can be faster. Learn what affects propagation timing and how to speed it up.',
    h1: 'How Long Does DNS Propagation Take?',
  },
  '/dns-not-propagating': {
    title: 'DNS Not Propagating? How to Fix It',
    description: 'Fix DNS propagation issues when your DNS changes are not updating globally. Common causes, solutions, and verification steps.',
    h1: 'DNS Not Propagating? How to Fix It',
  },
  '/google-workspace-mx-not-working': {
    title: 'Google Workspace MX Records Not Working - Fix',
    description: 'Fix Google Workspace MX record issues preventing email delivery. Correct MX values, priority settings, and common setup mistakes.',
    h1: 'Google Workspace MX Records Not Working',
  },
  '/domain-not-working-after-transfer': {
    title: 'Domain Not Working After Transfer - Fix Guide',
    description: 'Fix domain issues after registrar transfer. Restore DNS records and nameservers, and resolve common post-transfer problems.',
    h1: 'Domain Not Working After Transfer',
  },
  '/check-godaddy-dns': {
    title: 'Check GoDaddy DNS Records - Free Tool',
    description: 'Check and verify GoDaddy DNS records across global servers. Troubleshoot DNS propagation issues for GoDaddy hosted domains.',
    h1: 'Check GoDaddy DNS Records',
  },
  '/check-cloudflare-dns': {
    title: 'Check Cloudflare DNS Records - Free Tool',
    description: 'Check and verify Cloudflare DNS records across global servers. Troubleshoot proxy and DNS issues for Cloudflare managed domains.',
    h1: 'Check Cloudflare DNS Records',
  },
  '/check-namecheap-dns': {
    title: 'Check Namecheap DNS Records - Free Tool',
    description: 'Check and verify Namecheap DNS records across global servers. Troubleshoot DNS propagation for Namecheap hosted domains.',
    h1: 'Check Namecheap DNS Records',
  },
  '/pricing': {
    title: 'Pricing - ReviewMyDNS Pro Plans',
    description: 'ReviewMyDNS pricing plans for DNS monitoring, bulk lookups, and advanced analytics. Compare Free, Pro, Team, and Enterprise tiers.',
    h1: 'ReviewMyDNS Pricing Plans',
  },
  '/tools': {
    title: 'Free DNS Tools and Lookup Utilities - ReviewMyDNS',
    description: 'Free DNS tools including propagation checker, MX lookup, TXT checker, bulk DNS lookup, DNSSEC validator, and performance analytics.',
    h1: 'DNS Tools',
  },
  '/blog': {
    title: 'DNS Blog - Guides, Tutorials and Best Practices',
    description: 'DNS guides, tutorials, and best practices from ReviewMyDNS. Learn about DNS management, troubleshooting, and email authentication.',
    h1: 'ReviewMyDNS Blog',
  },
  '/guides': {
    title: 'DNS Setup Guides - ReviewMyDNS',
    description: 'Step-by-step DNS setup guides for popular hosting providers including GoDaddy, Cloudflare, Namecheap, AWS Route 53, and more.',
    h1: 'DNS Setup Guides',
  },
  '/faq': {
    title: 'DNS Frequently Asked Questions (FAQ) - ReviewMyDNS',
    description: 'Frequently asked questions about DNS propagation, record types, nameservers, email authentication, and ReviewMyDNS tools.',
    h1: 'Frequently Asked Questions',
  },
  '/contact': {
    title: 'Contact ReviewMyDNS - Support and Feedback',
    description: 'Contact the ReviewMyDNS team for support, feedback, partnership inquiries, or business collaboration opportunities.',
    h1: 'Contact Us',
  },
  '/api-docs': {
    title: 'API Documentation - ReviewMyDNS',
    description: 'ReviewMyDNS API documentation for developers. Integrate DNS lookups, propagation checks, and monitoring into your applications.',
    h1: 'API Documentation',
  },
  '/terminology': {
    title: 'DNS Terminology Glossary - ReviewMyDNS',
    description: 'Complete DNS terminology glossary with definitions for A record, CNAME, MX, TTL, nameserver, DNSSEC, and all common DNS terms.',
    h1: 'DNS Terminology Glossary',
  },
  '/dnssec': {
    title: 'DNSSEC Explained - How It Works',
    description: 'Learn how DNSSEC protects DNS queries with cryptographic signatures. Includes setup guides, validation tools, and troubleshooting tips.',
    h1: 'DNSSEC Explained',
  },
  '/security': {
    title: 'DNS Security Best Practices - ReviewMyDNS',
    description: 'DNS security guide covering DNSSEC implementation, DNS over HTTPS, cache poisoning prevention, and security best practices.',
    h1: 'DNS Security Best Practices',
  },
  '/errors': {
    title: 'DNS Error Reference - ReviewMyDNS',
    description: 'Common DNS errors explained with step-by-step solutions. Fix NXDOMAIN, SERVFAIL, REFUSED, timeout, and other DNS resolution errors.',
    h1: 'DNS Error Reference',
  },
  '/bulk-lookup': {
    title: 'Bulk DNS Lookup - Check Multiple Domains',
    description: 'Check DNS records for multiple domains at once with our bulk lookup tool. Query A, MX, TXT, and NS records in batch operations.',
    h1: 'Bulk DNS Lookup',
  },
  '/compare': {
    title: 'Compare DNS Providers - ReviewMyDNS',
    description: 'Compare top DNS providers side by side including features, pricing, performance benchmarks, and reliability for DNS hosting services.',
    h1: 'Compare DNS Providers',
  },
  '/history': {
    title: 'DNS Lookup History - ReviewMyDNS',
    description: 'View your DNS lookup history and track DNS record changes over time. Monitor propagation progress and compare past results.',
    h1: 'DNS Lookup History',
  },
  '/monitor': {
    title: 'DNS Monitoring and Change Alerts - ReviewMyDNS',
    description: 'Monitor DNS records for unexpected changes with automated alerts. Get notified when DNS records are modified or servers go down.',
    h1: 'DNS Monitoring',
  },
  '/analytics': {
    title: 'DNS Performance Analytics Dashboard - ReviewMyDNS',
    description: 'DNS performance analytics dashboard. Track response times, server uptime, and resolution patterns across global DNS infrastructure.',
    h1: 'DNS Analytics',
  },
  '/is-down': {
    title: 'Is It Down? Website Status Checker - ReviewMyDNS',
    description: 'Check if a website is down for everyone or just you. Real-time DNS resolution and availability checks across 50+ global servers.',
    h1: 'Is It Down? Website Status Checker',
  },
  '/embed': {
    title: 'Embed DNS Checker Widget on Your Site - ReviewMyDNS',
    description: 'Add a free DNS checker widget to your website. Embeddable DNS propagation tool for web hosting providers, agencies, and IT teams.',
    h1: 'Embed DNS Checker Widget',
  },
  '/widget': {
    title: 'DNS Lookup Widget for Your Website - ReviewMyDNS',
    description: 'Free embeddable DNS lookup widget for websites. Let your visitors check DNS records directly from your site with our lightweight tool.',
    h1: 'DNS Lookup Widget',
  },
  '/link-to-us': {
    title: 'Link to ReviewMyDNS - Badges, Assets & Embed Codes',
    description: 'Link to ReviewMyDNS from your website or blog. Download badges, grab HTML or Markdown embed codes, and help spread free DNS tools.',
    h1: 'Link to ReviewMyDNS',
  },
  '/subscribe': {
    title: 'Upgrade Your Plan - ReviewMyDNS Pro',
    description: 'Upgrade to ReviewMyDNS Pro for unlimited DNS lookups, bulk checking, historical tracking, and DNS monitoring.',
    h1: 'Upgrade Your Plan',
  },
  '/documentation': {
    title: 'DNS Documentation & Record Type Reference - ReviewMyDNS',
    description: 'Complete DNS record type reference for A, AAAA, MX, CNAME, TXT, NS, SOA records, plus API documentation for ReviewMyDNS developers.',
    h1: 'DNS Documentation',
  },
  '/about': {
    title: 'About ReviewMyDNS - Free DNS Propagation Checker',
    description: 'ReviewMyDNS is a free DNS propagation checker querying 50+ global servers. Learn about our mission to make DNS troubleshooting accessible to everyone.',
    h1: 'About ReviewMyDNS',
  },
  '/privacy': {
    title: 'Privacy Policy - ReviewMyDNS',
    description: 'ReviewMyDNS privacy policy. Learn how we collect, use, and protect your data when using our free DNS propagation checker.',
    h1: 'Privacy Policy',
  },
  '/terms': {
    title: 'Terms of Service - ReviewMyDNS',
    description: 'ReviewMyDNS terms of service. Read the terms governing use of our free DNS propagation checker and related services.',
    h1: 'Terms of Service',
  },
  '/dns-for': {
    title: 'DNS Setup Guides by Platform - ReviewMyDNS',
    description: 'Platform-specific DNS setup guides for WordPress, Shopify, Vercel, Netlify, AWS, and more. Configure custom domains step by step.',
    h1: 'DNS Setup by Platform',
  },
  '/api': {
    title: 'DNS Lookup API - Programmatic Access - ReviewMyDNS',
    description: 'Access DNS lookups programmatically with our REST API. Query DNS records, check propagation, and monitor changes from your applications.',
    h1: 'ReviewMyDNS API',
  },
};

const DEFAULT_META: PageMeta = {
  title: 'ReviewMyDNS - Free DNS Propagation Checker',
  description: 'Check DNS records across 50+ global servers. Free DNS propagation checker with real-time diagnostics and troubleshooting tools.',
  h1: 'ReviewMyDNS - DNS Lookup Tool',
};

const ACRONYMS = new Set(['dns', 'mx', 'spf', 'dkim', 'dmarc', 'ttl', 'ns', 'txt', 'soa', 'ptr', 'cname', 'aaaa', 'aws', 'api', 'ssl', 'tls', 'ip', 'url', 'isp', 'cdn', 'dnssec', 'faq']);

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, ' ').split(' ').map(w =>
    ACRONYMS.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ');
}

export function getPageMeta(urlPath: string): PageMeta {
  const cleanPath = urlPath.split('?')[0].replace(/\/+$/, '') || '/';

  if (PAGE_META[cleanPath]) {
    return PAGE_META[cleanPath];
  }

  if (cleanPath.startsWith('/guides/')) {
    const slug = cleanPath.replace('/guides/', '');
    const name = slugToTitle(slug);
    const alreadyHasSetup = /\bDNS Setup$/i.test(name);
    const heading = alreadyHasSetup ? `${name} Guide` : `${name} DNS Setup Guide`;
    return {
      title: `${heading} | ReviewMyDNS`,
      description: `Complete ${name.toLowerCase()} guide with step-by-step instructions. Configure A, CNAME, MX, and TXT records for your domain correctly.`,
      h1: heading,
    };
  }

  if (cleanPath.startsWith('/faq/')) {
    const slug = cleanPath.replace('/faq/', '');
    const name = slugToTitle(slug);
    return {
      title: `${name} - DNS FAQ | ReviewMyDNS`,
      description: `Get a detailed answer to ${name.toLowerCase()} along with step-by-step troubleshooting instructions and related DNS resources.`,
      h1: name,
    };
  }

  if (cleanPath.startsWith('/errors/')) {
    const slug = cleanPath.replace('/errors/', '');
    const name = slug.replace(/-/g, ' ').toUpperCase();
    return {
      title: `${name} DNS Error - Causes and Fixes | ReviewMyDNS`,
      description: `Learn what the ${name} DNS error means, what causes it, and how to fix it with step-by-step troubleshooting instructions and tools.`,
      h1: `Fix: ${name} DNS Error`,
    };
  }

  if (cleanPath.startsWith('/dns-for/')) {
    const slug = cleanPath.replace('/dns-for/', '');
    const name = slugToTitle(slug);
    return {
      title: `DNS Setup for ${name} - Complete Guide | ReviewMyDNS`,
      description: `Configure DNS records for ${name} with our complete setup guide. Includes A record, CNAME, and custom domain configuration steps.`,
      h1: `DNS Setup for ${name}`,
    };
  }

  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const name = slugToTitle(slug);
    return {
      title: `${name} - ReviewMyDNS Blog`,
      description: `Read our in-depth article on ${name.toLowerCase()}. Expert DNS advice, practical examples, and actionable tips for domain administrators.`,
      h1: name,
    };
  }

  if (cleanPath.startsWith('/is-down/')) {
    const domain = cleanPath.replace('/is-down/', '');
    return {
      title: `Is ${domain} Down? Check Status | ReviewMyDNS`,
      description: `Check if ${domain} is down right now or if the problem is on your end. Real-time DNS resolution and availability check across global servers.`,
      h1: `Is ${domain} Down?`,
    };
  }

  return DEFAULT_META;
}

const PAGE_CONTENT: Record<string, string> = {
  '/dns-propagation-checker': `
<section>
<h2>How DNS Propagation Works</h2>
<p>When you update a DNS record — pointing your domain to a new server, switching email providers, or adding a TXT record for email authentication — that change must travel from your authoritative nameserver to recursive resolvers worldwide before every user sees the new value. This process is called DNS propagation.</p>
<p>Propagation isn't instant because DNS resolvers cache records according to the TTL (Time to Live) value set on each record. A TTL of 3600 means a resolver can serve its cached copy for up to one hour before re-querying. If you're changing a record with a 24-hour TTL, some resolvers may serve stale data for up to a full day. The fix: lower your TTL to 300 seconds at least 48 hours before any planned DNS change.</p>
<h2>How to Use This Tool</h2>
<p>Enter your domain name, select the record type you changed (A, AAAA, CNAME, MX, TXT, NS, or SOA), and click Check. The tool simultaneously queries 50+ DNS servers distributed across North America, Europe, Asia-Pacific, South America, and Africa and returns each server's current answer. Green results mean the new record is live at that location. Inconsistent results mean propagation is still in progress.</p>
<h2>What Each Record Type Tells You</h2>
<ul>
<li><strong>A record:</strong> The IPv4 address your domain currently resolves to. Check this after moving to a new web host or server.</li>
<li><strong>AAAA record:</strong> The IPv6 address. Check this if your new host uses IPv6.</li>
<li><strong>CNAME:</strong> The hostname an alias resolves to. Common for subdomains pointing to CDNs, load balancers, or third-party services.</li>
<li><strong>MX record:</strong> The mail servers handling email for your domain. Check this after switching email providers.</li>
<li><strong>TXT record:</strong> Includes SPF, DKIM, DMARC, and domain verification tokens. Check this after adding email authentication records.</li>
<li><strong>NS record:</strong> The nameservers authoritative for your domain. Check this after transferring a domain or changing DNS providers.</li>
</ul>
<h2>Why Results Differ Across Locations</h2>
<p>Different resolvers refresh their caches at different times. A resolver in Tokyo may have already picked up your new record while one in São Paulo is still serving the old value — both are behaving correctly according to DNS standards. This is normal during the TTL window and resolves itself once cached copies expire. If propagation looks complete globally but users in a specific region still see the old value, their ISP's resolver may have a long TTL override or a resolver that aggressively caches.</p>
</section>`,

  '/mx-record-lookup': `
<section>
<h2>What MX Records Do</h2>
<p>Mail Exchange (MX) records are the DNS records that determine where email for your domain is delivered. Every time someone sends mail to user@yourdomain.com, their mail server performs an MX lookup, retrieves the list of mail servers authorised to receive mail for your domain, and attempts delivery in priority order — lowest priority number first.</p>
<p>A domain can have multiple MX records for redundancy. If the primary mail server (lowest priority number) is unavailable, the sending server tries the next one. Most email providers supply between one and five MX records as part of their setup instructions.</p>
<h2>How to Use This Tool</h2>
<p>Enter your domain name and click Look Up. The tool returns your full set of MX records including the mail server hostname and priority value for each. Compare the results against your email provider's required configuration to confirm everything is set up correctly.</p>
<h2>MX Records for Common Providers</h2>
<ul>
<li><strong>Google Workspace:</strong> Five records — ASPMX.L.GOOGLE.COM (priority 1), ALT1 and ALT2 (priority 5), ALT3 and ALT4 (priority 10).</li>
<li><strong>Microsoft 365:</strong> One record — [your-domain-hash].mail.protection.outlook.com at priority 0.</li>
<li><strong>Zoho Mail:</strong> Two records — mx.zoho.com (priority 10), mx2.zoho.com (priority 20).</li>
<li><strong>Proton Mail:</strong> Two records — mail.protonmail.ch (priority 10), mailsec.protonmail.ch (priority 20).</li>
</ul>
<h2>Common MX Record Mistakes</h2>
<ul>
<li><strong>Pointing to a CNAME:</strong> The DNS specification (RFC 2821) forbids MX records from pointing to CNAME aliases. Use only hostnames that have A or AAAA records.</li>
<li><strong>Pointing to an IP address:</strong> MX records must always point to hostnames, never directly to IP addresses.</li>
<li><strong>Duplicate priorities on primary and backup:</strong> Giving your primary and backup servers the same priority number makes delivery unpredictable. Use distinct values (10, 20, 30) to control failover order explicitly.</li>
<li><strong>Missing records after a domain transfer:</strong> Registrar transfers can wipe DNS records if you rely on registrar-hosted DNS. Export your full DNS zone before initiating any transfer.</li>
</ul>
<h2>When MX Lookup Is Not Enough</h2>
<p>MX records confirm where email should be delivered but don't guarantee deliverability. If your email is being rejected or going to spam, check your TXT records for SPF, DKIM, and DMARC configuration using the <a href="/txt-record-checker">TXT record checker</a>. A valid MX record with missing or broken SPF will still result in delivery failures at many receiving servers.</p>
</section>`,

  '/txt-record-checker': `
<section>
<h2>What TXT Records Are Used For</h2>
<p>TXT records store arbitrary text strings in DNS and have become the standard mechanism for domain ownership verification and email authentication. The three email authentication standards — SPF, DKIM, and DMARC — are all published as TXT records. So are domain verification tokens for Google Workspace, Microsoft 365, and dozens of other services.</p>
<h2>SPF: Sender Policy Framework</h2>
<p>An SPF record lists the mail servers and IP ranges authorised to send email on behalf of your domain. A typical SPF record looks like: <code>v=spf1 include:_spf.google.com ~all</code>. The <code>~all</code> suffix means mail from unlisted sources is soft-failed (accepted but flagged). Using <code>-all</code> enforces a hard fail, which is stricter but can reject legitimate mail if the SPF record is incomplete. A domain should have exactly one SPF record — multiple SPF records cause a PermError and break email delivery.</p>
<h2>DKIM: DomainKeys Identified Mail</h2>
<p>DKIM adds a cryptographic signature to outbound emails. The public key that receiving servers use to verify signatures is stored in a TXT record at a selector subdomain: <code>selector._domainkey.yourdomain.com</code>. If the public key is missing, expired, or doesn't match the private key used by your mail server, receiving servers treat the message as unsigned. Some providers rotate DKIM keys periodically — use this tool after any key rotation to confirm the new record is publishing correctly.</p>
<h2>DMARC: Policy and Reporting</h2>
<p>DMARC tells receiving servers what to do with mail that fails SPF or DKIM checks: monitor (<code>p=none</code>), quarantine to spam (<code>p=quarantine</code>), or reject outright (<code>p=reject</code>). It also specifies email addresses where aggregate and forensic reports should be sent. A DMARC record lives at <code>_dmarc.yourdomain.com</code> and looks like: <code>v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com</code>.</p>
<h2>How to Use This Tool</h2>
<p>Enter your domain and click Check. The tool returns all TXT records published for your domain. Look for records starting with <code>v=spf1</code> (SPF), <code>v=DKIM1</code> (DKIM public key), and <code>v=DMARC1</code> (DMARC policy). If any of these are missing or malformed, use the <a href="/guides/email-delivery-debugging-dns">email delivery debugging guide</a> to identify and fix the issue.</p>
</section>`,

  '/bulk-lookup': `
<section>
<h2>When Single Lookups Are Not Enough</h2>
<p>Most DNS tools are built for checking one domain at a time. That works fine for troubleshooting a single site, but it's impractical when you need to audit DNS records across dozens or hundreds of domains simultaneously. The ReviewMyDNS bulk lookup tool accepts a list of domains and runs the same DNS query against all of them in parallel, returning a consolidated results table you can scan or export.</p>
<h2>Common Use Cases</h2>
<ul>
<li><strong>Post-migration audit:</strong> After moving a portfolio of domains to a new DNS provider, run a bulk A record check to verify all domains are resolving to the correct IP. A single missed domain can mean a site is silently pointing to the old server.</li>
<li><strong>Email deliverability audit:</strong> Check MX and TXT records for all domains in your organisation. Identify which domains are missing SPF, DKIM, or DMARC records before they cause delivery failures or get your IP ranges blacklisted.</li>
<li><strong>Nameserver migration verification:</strong> After changing nameservers for multiple domains, run a bulk NS lookup to confirm each domain has delegated to the correct nameservers and propagation is complete.</li>
<li><strong>Client domain health checks:</strong> Agencies and MSPs managing multiple client domains can run periodic bulk checks to surface misconfigurations before clients notice problems.</li>
<li><strong>Propagation monitoring during cutover:</strong> When migrating multiple sites simultaneously, use bulk A record lookups to monitor propagation progress across the entire batch rather than checking each domain individually.</li>
</ul>
<h2>How to Use Bulk Lookup</h2>
<p>Paste your list of domains (one per line) into the input field, select the DNS record type to query (A, AAAA, MX, TXT, CNAME, NS, or SOA), and submit. The tool returns the current DNS response for each domain in a table. Inconsistent results across a list of domains that should all resolve to the same value immediately highlight which domains were missed or are still propagating.</p>
<h2>Bulk Lookup vs. DNS Monitoring</h2>
<p>Bulk lookup is a point-in-time snapshot — it tells you what DNS looks like right now across a list of domains. For ongoing change detection, use <a href="/monitor">DNS monitoring</a>, which watches your records continuously and alerts you when values change unexpectedly.</p>
</section>`,

  '/compare': `
<section>
<h2>Why DNS Provider Responses Differ</h2>
<p>Public DNS resolvers including Google (8.8.8.8), Cloudflare (1.1.1.1), OpenDNS, and your ISP's default resolver don't always return identical answers for the same domain at the same moment. Differences arise from cache state, anycast routing, and refresh timing — each resolver independently caches records for the duration of the TTL and re-queries the authoritative nameserver only when that cache expires.</p>
<p>During the propagation window after a DNS change, comparing provider responses shows exactly which resolvers have picked up the new record and which are still serving cached data. Outside of propagation events, persistent differences between providers can indicate misconfigured authoritative nameservers, split-horizon DNS configurations, or geographically targeted DNS responses.</p>
<h2>What the Comparison Tool Shows</h2>
<ul>
<li><strong>Resolved value per provider:</strong> The IP address, hostname, or TXT string each resolver is currently returning for your domain.</li>
<li><strong>Consistency check:</strong> Whether all queried providers are returning the same answer or diverging.</li>
<li><strong>Response time:</strong> How quickly each provider responds — useful for evaluating DNS provider performance.</li>
<li><strong>TTL remaining:</strong> How long each provider will serve its current cached value before re-querying.</li>
</ul>
<h2>When to Use Provider Comparison</h2>
<ul>
<li>During a DNS migration to track which major resolvers have propagated the new record values.</li>
<li>When some users report they can reach your site and others cannot — they may be hitting different resolvers returning different answers.</li>
<li>When verifying that a specific major resolver (Google, Cloudflare, etc.) has expired its cache and is returning your updated record.</li>
<li>When evaluating DNS hosting providers for performance — compare authoritative response latencies to identify the fastest option for your primary audience geography.</li>
</ul>
<h2>Interpreting Inconsistent Results</h2>
<p>If two providers return different answers and you have not recently changed any DNS records, the discrepancy may indicate a problem with your authoritative nameserver configuration rather than a propagation lag. Check your zone file for conflicting record entries, or use the <a href="/dns-propagation-checker">propagation checker</a> to query your authoritative nameservers directly.</p>
</section>`,

  '/monitor': `
<section>
<h2>Why DNS Monitoring Matters</h2>
<p>DNS records are often the last thing administrators think about and the first thing that breaks when something goes wrong. A single accidental record deletion, an unauthorised nameserver change, or a hosting provider outage can take a website offline, stop email delivery, or expose a domain to hijacking — all without any immediate alert to the domain owner. DNS monitoring closes that gap by watching your records continuously and notifying you the moment anything changes.</p>
<h2>What ReviewMyDNS Monitors</h2>
<ul>
<li><strong>A and AAAA records:</strong> Changes to IP addresses indicate server moves, load balancer updates, or potential hijacking. An unexpected A record change is a serious security signal.</li>
<li><strong>MX records:</strong> A modified MX record can silently redirect all inbound email to an attacker's server. MX changes are among the highest-severity DNS events to monitor.</li>
<li><strong>NS records:</strong> Nameserver changes indicate a domain has been transferred or delegated to a new provider. Unauthorised NS changes are a hallmark of domain hijacking.</li>
<li><strong>TXT records:</strong> Changes to SPF, DKIM, or DMARC records can break email authentication and allow spoofing. Monitor these if email deliverability is business-critical.</li>
<li><strong>CNAME records:</strong> An unexpected CNAME change can redirect traffic to a wrong or malicious destination.</li>
</ul>
<h2>Alert Delivery</h2>
<p>Alerts fire immediately when a monitored record changes value, is deleted, or when a nameserver becomes unresponsive. Notifications are delivered by email. Pro and Team plans support webhook and Slack integration for routing alerts into existing incident management workflows.</p>
<h2>Monitoring Frequency</h2>
<p>Free tier monitors domains hourly. Pro plans support monitoring intervals down to every 5 minutes, giving near-real-time detection of changes. For high-value domains where uptime is measured in revenue, 5-minute monitoring provides actionable alerts before most users notice a problem.</p>
<h2>Setting Up Monitoring</h2>
<p>Add a domain to your monitoring list, select the record types you want to watch, and configure alert recipients. ReviewMyDNS takes a baseline snapshot of the current record values and alerts you only when those values change — so you will not receive false alerts for expected propagation if you pause monitoring before planned maintenance.</p>
</section>`,

  '/errors/missing-glue': `
<section>
<h2>What Is a Missing Glue Record?</h2>
<p>A glue record is a special A or AAAA record that a parent zone (like <code>.com</code> or <code>.net</code>) provides alongside an NS delegation to break a circular dependency. When your domain's nameservers are hosted on a subdomain of the domain they serve — for example, <code>ns1.example.com</code> serving DNS for <code>example.com</code> — a resolver cannot look up <code>ns1.example.com</code> without first knowing how to reach <code>example.com</code>. The glue record solves this by publishing the IP address of <code>ns1.example.com</code> directly in the parent zone's response.</p>
<p>When the glue record is missing, resolvers get stuck in an unresolvable loop: to find the authoritative servers for <code>example.com</code>, they need to look up <code>ns1.example.com</code>, but to look up <code>ns1.example.com</code>, they need to contact the authoritative servers for <code>example.com</code>. Resolvers handle this failure by returning SERVFAIL or by timing out entirely.</p>
<h2>When Glue Records Are Required</h2>
<p>Glue records are mandatory only when the nameserver hostname falls within the zone it serves. Concretely:</p>
<ul>
<li><strong>Glue required:</strong> Domain <code>example.com</code> using nameservers <code>ns1.example.com</code> and <code>ns2.example.com</code>.</li>
<li><strong>Glue not required:</strong> Domain <code>example.com</code> using nameservers <code>ns1.registrar.com</code> and <code>ns2.registrar.com</code>. Those nameservers belong to a different zone that can be resolved independently.</li>
</ul>
<p>Most domain registrars call this feature "host records" or "registered hosts." Before you can set <code>ns1.example.com</code> as a nameserver for <code>example.com</code>, you must first register the IP address for <code>ns1.example.com</code> with the registrar. This registration is what creates the glue record in the parent TLD zone.</p>
<h2>How to Diagnose a Missing Glue Error</h2>
<p>Use <code>dig</code> to trace the delegation path manually:</p>
<pre><code>dig +trace example.com NS</code></pre>
<p>If the TLD nameservers return your NS records without accompanying A records in the Additional section, glue is missing. You can also verify by querying the TLD servers directly:</p>
<pre><code>dig NS example.com @a.gtld-servers.net</code></pre>
<p>Look at the Additional section of the response. If it is empty when your NS records point to hostnames under your own domain, the glue records were not registered.</p>
<h2>How to Fix a Missing Glue Record</h2>
<p>The fix must be performed at your domain registrar, not in your DNS zone file. Log in to your registrar's control panel and find the section for "Host Records," "Child Nameservers," or "Private Nameservers." Create host registrations for each nameserver hostname, providing its IP address. Once saved, the registrar submits these records to the parent TLD registry. Propagation of glue records through the TLD zone typically takes 12-48 hours.</p>
<p>After creating the glue records, verify them with <code>dig</code> or use the <a href="/">ReviewMyDNS propagation checker</a> to confirm the nameserver delegation is resolving correctly from multiple global locations. If your domain was completely unreachable due to the missing glue, resolution should recover once the TLD zone propagates the new glue entries.</p>
<h2>Registrar-Specific Steps for Adding Glue Records</h2>
<p>The exact steps to register a glue record vary by registrar, but the underlying process is the same at all of them:</p>
<ul>
<li><strong>GoDaddy:</strong> Navigate to your domain, click "Manage DNS," then scroll to "Hostnames." Click "Add" and enter each nameserver subdomain (e.g., <code>ns1</code>) and its IP address.</li>
<li><strong>Namecheap:</strong> Go to "Domain List," click "Manage" on your domain, then select "Advanced DNS." Under "Personal DNS Servers," add each nameserver hostname and IP.</li>
<li><strong>Google Domains / Squarespace:</strong> Navigate to DNS settings, find "Custom name servers" then "Edit name servers." A link to "Register hosts" lets you add hostnames with their IPs.</li>
<li><strong>Cloudflare Registrar:</strong> Glue records are managed under "Registrar" then "Name servers." Use the "Add host" option to register each private nameserver IP.</li>
</ul>
<p>If your registrar's panel has no option to register host records or child nameservers, contact their support team. This option is only relevant if you operate your own authoritative nameservers — if you use Cloudflare, AWS Route 53, or any third-party DNS provider, their nameservers are in a different zone and glue records are handled by the DNS provider automatically.</p>
<h2>Related DNS Errors</h2>
<p>A missing glue record often produces a <a href="/errors/servfail">SERVFAIL error</a> at the resolver level, or a <a href="/errors/lame-delegation">Lame Delegation</a> if the nameserver is reachable but refuses to answer authoritatively. If your domain was working and suddenly stopped, check for recent changes to your nameserver configuration. See the full <a href="/errors">DNS error reference</a> for causes and fixes for all common DNS error types, and use the <a href="/dns-propagation-checker">DNS propagation checker</a> to verify resolution from 50+ global servers after your fix is applied.</p>
</section>`,

  '/dns-for/netlify': `
<section>
<h2>Custom Domain DNS Setup for Netlify</h2>
<p>Netlify lets you connect any custom domain to a site deployed through its platform. DNS configuration for Netlify is straightforward, but the record type you use depends on whether you are pointing a root domain (apex) or a subdomain, and whether you want to use Netlify's CDN-optimised DNS or manage records at your existing registrar.</p>
<h2>Option 1: Netlify DNS (Recommended)</h2>
<p>For the best performance and automatic SSL certificate provisioning, Netlify recommends transferring DNS management to Netlify's own nameservers. Log in to the Netlify dashboard, navigate to Domain Management, click "Add Custom Domain," and enter your domain. Netlify will display four nameserver addresses. Go to your domain registrar and update the NS records to point to these Netlify nameservers. Once propagation completes (typically 1-24 hours), Netlify automatically provisions Let's Encrypt SSL certificates and handles all routing.</p>
<p>With Netlify DNS, you can use NETLIFY records — a proprietary CNAME-like record type that works at the root domain level, bypassing the standard DNS restriction that prevents CNAME records at the apex. This means both <code>example.com</code> and <code>www.example.com</code> can point to Netlify's CDN edge nodes.</p>
<h2>Option 2: External DNS with A and CNAME Records</h2>
<p>If you prefer to keep DNS at your current provider, use the following configuration:</p>
<ul>
<li><strong>Root domain (apex):</strong> Create an A record for <code>@</code> pointing to Netlify's load balancer IP: <code>75.2.60.5</code>. Some registrars support ANAME or ALIAS records at the apex — these are equivalent and provide better failover.</li>
<li><strong>www subdomain:</strong> Create a CNAME record for <code>www</code> pointing to your Netlify site URL: <code>your-site-name.netlify.app</code>.</li>
<li><strong>Other subdomains:</strong> Create CNAME records pointing to <code>your-site-name.netlify.app</code>.</li>
</ul>
<p>After adding these records, return to the Netlify dashboard and click "Verify DNS configuration." Netlify will confirm the records are resolving correctly and begin issuing the SSL certificate. SSL provisioning typically takes 5-15 minutes after DNS verification.</p>
<h2>Configuring Email Alongside a Netlify Site</h2>
<p>If you host email at Google Workspace, Microsoft 365, or another provider while your website runs on Netlify, you must configure both sets of records at your DNS provider. When using external DNS (Option 2 above), add Netlify's A record for the root domain and your email provider's MX records simultaneously. There is no conflict — MX records and A records for the same domain coexist without issue.</p>
<p>For email authentication, add your email provider's SPF TXT record alongside the Netlify A record:</p>
<ul>
<li>SPF example for Google Workspace: <code>v=spf1 include:_spf.google.com ~all</code></li>
<li>Add DKIM and DMARC TXT records provided by your email provider to complete email authentication setup.</li>
</ul>
<p>Use the <a href="/mx-record-lookup">MX record lookup</a> to verify your mail records are resolving correctly, and the <a href="/txt-record-checker">TXT record checker</a> to confirm SPF and DKIM are in place.</p>
<h2>Troubleshooting Netlify DNS Issues</h2>
<ul>
<li><strong>SSL certificate pending:</strong> Netlify needs to verify domain ownership via DNS before issuing a certificate. If the SSL status stays "Waiting on DNS propagation" for more than an hour, use the <a href="/dns-propagation-checker">DNS propagation checker</a> to confirm your A or CNAME record is resolving correctly worldwide.</li>
<li><strong>www redirects not working:</strong> Ensure both the root and www records are configured. Netlify handles the canonical redirect between them only when both point to Netlify-controlled endpoints.</li>
<li><strong>CNAME flattening issues:</strong> Some registrars do not support CNAME records at the apex. If yours does not, you must either switch to Netlify DNS or use an ALIAS/ANAME record if your registrar supports it. Use the A record fallback (<code>75.2.60.5</code>) if neither option is available.</li>
<li><strong>Branch deploys on subdomains:</strong> Netlify branch deploy URLs follow the format <code>branch-name--site-name.netlify.app</code>. To map a custom subdomain to a branch, add a CNAME pointing to that branch deploy URL, then register the subdomain in the Netlify dashboard under Domain Management.</li>
</ul>
<p>Verify your DNS configuration with the <a href="/dns-propagation-checker">DNS propagation checker</a> to see results from 50+ global servers. For a complete walkthrough of Netlify DNS setup, see the <a href="/guides/netlify-dns-setup">Netlify DNS Setup Guide</a>. If you are also setting up Vercel or another platform, compare the DNS requirements in <a href="/dns-for/vercel">DNS for Vercel</a> and <a href="/dns-for/render">DNS for Render</a>.</p>
</section>`,

  '/dns-for/render': `
<section>
<h2>Custom Domain DNS Setup for Render</h2>
<p>Render is a cloud platform for hosting web services, static sites, and databases. Connecting a custom domain to a Render service requires configuring DNS records at your domain registrar or DNS provider to point to Render's infrastructure.</p>
<h2>Configuring DNS for a Render Web Service</h2>
<p>In the Render dashboard, open your service, click "Settings," and navigate to "Custom Domains." Add your domain — Render will display the DNS records you need to configure.</p>
<p>For a <strong>subdomain</strong> (such as <code>app.example.com</code> or <code>www.example.com</code>), Render requires a CNAME record:</p>
<ul>
<li><strong>Type:</strong> CNAME</li>
<li><strong>Host/Name:</strong> <code>app</code> (or whatever subdomain you're configuring)</li>
<li><strong>Value/Target:</strong> Your Render service URL, e.g. <code>your-service.onrender.com</code></li>
</ul>
<p>For a <strong>root domain</strong> (apex domain, e.g. <code>example.com</code>), you cannot use a CNAME record per the DNS specification. Use Render's A records instead:</p>
<ul>
<li><strong>Type:</strong> A</li>
<li><strong>Host/Name:</strong> <code>@</code> or leave blank (represents the root domain)</li>
<li><strong>Value:</strong> <code>216.24.57.1</code></li>
</ul>
<p>Some registrars support ALIAS or ANAME records at the apex — if yours does, you can point the root domain to <code>your-service.onrender.com</code> directly, which gives you automatic failover when Render updates its IP addresses.</p>
<h2>Configuring DNS for Render Static Sites</h2>
<p>Static sites on Render use the same DNS configuration as web services. Add a CNAME for subdomains pointing to your static site URL (<code>your-site.onrender.com</code>), or use the A record approach for the root domain. Render handles HTTPS automatically for static sites as well as web services — no additional DNS records for SSL are needed.</p>
<h2>DNS for Render PostgreSQL and Private Services</h2>
<p>Render's managed PostgreSQL databases use internal hostnames within Render's network and do not require external DNS records. If you expose a service to the public internet and want a custom domain, apply the standard CNAME or A record setup described above. Internal Render services that communicate service-to-service use Render's internal DNS automatically and are not accessible from the public internet regardless of DNS configuration.</p>
<h2>SSL Certificates on Render</h2>
<p>Render automatically provisions Let's Encrypt SSL certificates for custom domains. After you add a domain in the dashboard and configure the DNS records correctly, Render performs a DNS check and issues the certificate. This typically takes 5-30 minutes after DNS propagates. If the certificate is not issued after an hour, use the <a href="/dns-propagation-checker">DNS propagation checker</a> to verify your CNAME or A record is resolving globally. Render also supports wildcard certificates for domains where you host multiple subdomains — contact Render support for wildcard configuration.</p>
<h2>Troubleshooting Render Custom Domain Issues</h2>
<ul>
<li><strong>Domain shows "Verifying" in Render dashboard:</strong> Render hasn't yet confirmed your DNS records point to its infrastructure. Wait for DNS propagation (check progress with the <a href="/dns-propagation-checker">propagation checker</a>) then click "Verify" again in the dashboard.</li>
<li><strong>Root domain not loading:</strong> Make sure you've configured an A record for <code>@</code> (root), not just a CNAME for <code>www</code>. Check both records are active using the <a href="/">DNS lookup tool</a>.</li>
<li><strong>Redirect loops:</strong> Render handles redirects between www and the root domain. Do not configure redirects independently at your registrar — let Render manage canonical URL routing after both DNS records point to Render.</li>
<li><strong>Service spun down (free tier):</strong> Render's free tier spins down inactive services after 15 minutes. This is not a DNS issue — the domain resolves correctly, but the first request after inactivity triggers a cold start. Upgrade to a paid plan for always-on availability.</li>
</ul>
<p>For related DNS troubleshooting, see the <a href="/guides/dns-not-propagating-fix">DNS not propagating fix guide</a> and the <a href="/guides/subdomain-not-working-dns">subdomain not working guide</a>. Compare Render's DNS setup with <a href="/dns-for/netlify">Netlify DNS</a> and <a href="/dns-for/vercel">Vercel DNS</a> if you are evaluating platforms. Check DNS records across 50+ global servers using the <a href="/dns-propagation-checker">propagation checker</a> to confirm Render's records are live worldwide.</p>
</section>`,

  '/faq': `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does DNS propagation take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DNS propagation typically completes within 15 minutes to 4 hours for most resolvers. Full global propagation can take up to 48 hours in rare cases where ISPs cache records longer than the TTL. Lowering your TTL to 300 seconds at least 48 hours before making DNS changes significantly speeds up propagation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between an A record and a CNAME record?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An A record maps a hostname directly to an IPv4 address. A CNAME record creates an alias pointing one hostname to another hostname. A records can be used at the root domain (apex). CNAME records can only be used on subdomains, not at the apex, per the DNS specification."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my DNS not updating after 24 hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If DNS hasn't updated after 24 hours, check three things: 1) Confirm your new records are saved correctly in your DNS provider dashboard, 2) Check the TTL on the old records — a 86400-second TTL means some resolvers cached the old value for up to 24 hours, 3) Some ISPs override TTL values and cache longer. Use the ReviewMyDNS propagation checker to see exactly which servers worldwide still show the old record."
      }
    },
    {
      "@type": "Question",
      "name": "What are nameservers and how are they different from DNS records?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nameservers are the authoritative servers that host your DNS zone and answer queries for your domain. DNS records (A, CNAME, MX, TXT, etc.) are the entries stored within that zone. You change nameservers when switching DNS providers. You change DNS records when updating where your website, email, or other services point."
      }
    },
    {
      "@type": "Question",
      "name": "How do I find my domain's nameservers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Run 'dig NS yourdomain.com' or 'nslookup -type=NS yourdomain.com' from a terminal. Online, use any DNS lookup tool and query NS records for your domain. Nameservers are typically listed in your domain registrar's dashboard under DNS Settings or Nameservers."
      }
    }
  ]
}
</script>
<section>
<h2>Frequently Asked DNS Questions</h2>
<p>This page collects the most common questions about DNS propagation, DNS record types, email authentication, troubleshooting errors, and using ReviewMyDNS tools. Each question links to a detailed guide with step-by-step explanations and examples.</p>
<h2>DNS Propagation Questions</h2>
<p>DNS propagation is the most common source of confusion when making DNS changes. When you update a record, resolvers worldwide cache the old value until the TTL (Time to Live) expires. A TTL of 3600 means resolvers can serve the old record for up to one hour. A TTL of 86400 means up to 24 hours. Before any planned DNS change, lower your TTL to 300 seconds and wait 48 hours for the lower TTL to propagate. See <a href="/faq/why-dns-not-updating-24-hours">Why Is DNS Not Updating After 24 Hours?</a> for a complete troubleshooting walkthrough.</p>
<p>To track propagation progress, use the <a href="/dns-propagation-checker">DNS propagation checker</a> to query 50+ servers worldwide and see exactly which regions have picked up your new records. The <a href="/faq/how-to-check-dns-propagation">How to Check DNS Propagation</a> guide explains how to interpret results.</p>
<h2>DNS Record Type Questions</h2>
<p>Understanding which record type to use for a given task prevents common misconfigurations. A records point a hostname to an IPv4 address. AAAA records handle IPv6. CNAME records create aliases from one hostname to another and are restricted to subdomains. MX records route email to the correct mail server. TXT records store SPF, DKIM, DMARC, and domain verification data. NS records delegate a zone to specific nameservers.</p>
<p>The most frequent source of confusion is whether to use an A record or a CNAME. See <a href="/faq/difference-between-a-record-cname-mx-txt">Difference Between A, CNAME, MX, and TXT Records</a> for a detailed comparison with real-world use cases.</p>
<h2>Email Authentication Questions</h2>
<p>SPF, DKIM, and DMARC are DNS-based email authentication standards that reduce spam and spoofing. SPF lists the IP addresses authorised to send on behalf of your domain. DKIM adds a cryptographic signature to each outbound message. DMARC tells receiving servers what to do when SPF or DKIM fails. All three are stored as TXT records and can be verified with the <a href="/txt-record-checker">TXT record checker</a>.</p>
<h2>Troubleshooting Questions</h2>
<p>Common error scenarios include <a href="/errors/nxdomain">NXDOMAIN</a> (domain doesn't exist or missing record), <a href="/errors/servfail">SERVFAIL</a> (resolver couldn't get an answer), and <a href="/errors/timeout">timeout</a> (nameserver unresponsive). Each error page includes causes, diagnostic commands, and step-by-step fixes.</p>
</section>`,

  '/faq/domain-nameservers-vs-dns-records': `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between nameservers and DNS records?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nameservers are the authoritative servers that host your entire DNS zone. DNS records (A, CNAME, MX, TXT, NS, etc.) are the individual entries stored within that zone. Think of nameservers as the filing cabinet and DNS records as the files inside it. You change nameservers when you switch DNS providers. You change DNS records when you update where your website, email, or subdomains point."
      }
    },
    {
      "@type": "Question",
      "name": "When should I change nameservers vs changing DNS records?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Change nameservers when you move your entire DNS hosting to a new provider — for example, switching from your registrar's DNS to Cloudflare or Route 53. Change individual DNS records when you update specific services, such as pointing your website to a new server IP, adding a mail provider's MX records, or verifying domain ownership with a TXT record."
      }
    },
    {
      "@type": "Question",
      "name": "How long do nameserver changes take to propagate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nameserver changes propagate through the global DNS infrastructure in 24-48 hours, though many resolvers pick up changes within a few hours. Nameserver changes are slower than individual record changes because they require the parent TLD zone to publish the new delegation. During propagation, different users may resolve your domain through different nameservers, causing inconsistent results."
      }
    },
    {
      "@type": "Question",
      "name": "Do DNS records transfer automatically when I change nameservers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. DNS records are stored at the nameserver, not at the registrar. When you change nameservers to a new provider, you must manually recreate all your DNS records at the new provider before or during the nameserver change. If you change nameservers before recreating records, your website and email will stop working until the records are added."
      }
    }
  ]
}
</script>
<section>
<h2>Nameservers vs DNS Records: Understanding the Difference</h2>
<p>One of the most common points of confusion when managing a domain is whether to change the nameservers or change specific DNS records. These are two completely different operations, and mixing them up can cause extended downtime or misconfigured services.</p>
<h2>What Nameservers Are</h2>
<p>Nameservers are the authoritative DNS servers that store and serve all the DNS records for your domain. When a resolver needs to look up any record for <code>example.com</code> — whether an A record, MX record, or TXT record — it first finds the nameservers responsible for <code>example.com</code> by querying the parent TLD zone (the <code>.com</code> registry). The TLD zone contains NS records telling the resolver which nameservers are authoritative for your domain. Your registrar manages this delegation.</p>
<p>Nameservers are usually provided by your DNS hosting provider. Common examples include Cloudflare nameservers (<code>alice.ns.cloudflare.com</code>), Route 53 nameservers (<code>ns-XXXX.awsdns-XX.com</code>), and registrar-default nameservers from GoDaddy (<code>ns1.domaincontrol.com</code>) or Namecheap (<code>dns1.registrar-servers.com</code>). Each set of nameservers hosts a complete copy of your DNS zone.</p>
<h2>What DNS Records Are</h2>
<p>DNS records are the individual entries within your zone file that map hostnames to IP addresses, mail servers, or other values. Common record types include:</p>
<ul>
<li><strong>A record:</strong> Maps a hostname to an IPv4 address. Used to point your domain or subdomain to a web server.</li>
<li><strong>CNAME record:</strong> Creates an alias from one hostname to another. Used for subdomains pointing to CDNs, hosting platforms, or third-party services.</li>
<li><strong>MX record:</strong> Points to the mail servers that receive email for your domain.</li>
<li><strong>TXT record:</strong> Stores SPF, DKIM, DMARC, and domain verification tokens as text strings.</li>
<li><strong>NS record:</strong> Specifies the authoritative nameservers for your domain or a subdomain delegation.</li>
</ul>
<h2>When to Change Nameservers</h2>
<p>Change your nameservers when you want to move your entire DNS hosting to a new provider. Common scenarios include switching to Cloudflare for DDoS protection and caching, migrating to AWS Route 53 for programmatic control, or moving to a premium DNS provider for improved performance or DNSSEC support.</p>
<p><strong>Critical step before changing nameservers:</strong> Export and recreate all your DNS records at the new provider BEFORE updating nameservers at your registrar. If you switch nameservers before the new provider has your records, your website, email, and all subdomains will stop working for the duration of propagation (which can be 24-48 hours). Use the <a href="/dns-propagation-checker">DNS propagation checker</a> to confirm the old nameservers are no longer being served before assuming the transition is complete.</p>
<h2>When to Change DNS Records</h2>
<p>Change individual DNS records when you update a specific service without moving DNS providers. Examples include pointing your domain to a new web host IP, adding mail provider MX records when switching to Google Workspace or Microsoft 365, adding a TXT record for domain verification, or creating a subdomain that points to a third-party platform like Vercel or Netlify.</p>
<p>Individual record changes propagate based on the record's TTL value. A record with TTL 3600 takes up to an hour to propagate globally after a change. See <a href="/faq/why-dns-not-updating-24-hours">Why Is DNS Not Updating After 24 Hours?</a> if changes are taking longer than expected. Use the <a href="/dns-propagation-checker">propagation checker</a> to track global rollout in real time.</p>
<h2>Real-World Example: Moving to Cloudflare DNS</h2>
<p>Suppose your domain is registered at Namecheap with Namecheap's default nameservers (<code>dns1.registrar-servers.com</code>). You want to move DNS hosting to Cloudflare for CDN and DDoS protection. The correct sequence to avoid downtime:</p>
<ol>
<li>Add your domain to Cloudflare at <code>dash.cloudflare.com</code>. During setup, Cloudflare scans your existing zone and imports all DNS records automatically — review the imported list carefully and add any records that were missed.</li>
<li>Verify every record is present in Cloudflare: A records for your domain and www subdomain, MX records for your email provider with correct priorities, TXT records for SPF, DKIM, and DMARC, and any CNAME records for subdomains.</li>
<li>At Namecheap, update the nameservers from Namecheap's defaults to the two nameservers Cloudflare assigned to your account (e.g., <code>alice.ns.cloudflare.com</code> and <code>bob.ns.cloudflare.com</code>).</li>
<li>Wait 24-48 hours for nameserver propagation. Your website and email continue working because resolvers serve cached copies of the old nameserver responses during the transition window.</li>
<li>After Cloudflare shows the domain as Active, all future DNS changes are made in the Cloudflare dashboard exclusively.</li>
</ol>
<p>If you update nameservers before setting up records in Cloudflare, resolvers that pick up the new nameservers first find an empty zone and return NXDOMAIN for all records — causing your site and email to go offline.</p>
<h2>What Happens to DNS Records When You Change Nameservers</h2>
<p>DNS records are stored at your DNS provider, not at your registrar. When you point your domain to new nameservers, the new provider starts with only the SOA and NS records it generates automatically — your A, MX, CNAME, and TXT records do not follow automatically. They must be manually recreated at the new provider before the nameserver switch.</p>
<p>To prevent data loss and downtime during a migration:</p>
<ul>
<li>Export your full zone file from your current provider before making any changes. Most providers offer a BIND-format zone export in DNS Settings.</li>
<li>Recreate every record exactly at the new provider — including MX records with correct priorities and all TXT records for email authentication.</li>
<li>Lower all record TTLs to 300 seconds at least 48 hours before the switch to ensure fast propagation.</li>
<li>After the migration, use <a href="/monitor">DNS monitoring</a> to detect missing records and get alerted if any records change unexpectedly.</li>
</ul>
<h2>How the DNS Hierarchy Connects Registrars and Nameservers</h2>
<p>At the top of the DNS hierarchy is ICANN, which oversees the root zone. Below that are TLD registries (Verisign for .com, Nominet for .uk). When you register <code>example.com</code>, your registrar tells the .com registry which nameservers are authoritative for your domain. The .com registry stores your NS records in the TLD zone — this is the delegation that allows resolvers to find your nameservers.</p>
<p>When a resolver looks up <code>example.com</code>, it queries a root server, which refers it to a .com TLD server, which returns your NS records and refers it to your nameservers, which return the actual A, MX, or other records. Your registrar manages the NS delegation in the TLD zone. Your DNS provider manages the records within your zone. This clear separation means you can mix providers freely: register at GoDaddy, use Cloudflare nameservers, host email at Google Workspace, and deploy your website on Vercel — all tied together by DNS records. See the <a href="/guides/cloudflare-dns-setup">Cloudflare DNS Setup Guide</a> for the complete workflow when switching to Cloudflare, and <a href="/faq/how-to-find-your-nameservers">How to Find Your Nameservers</a> to verify what your domain is currently using.</p>
</section>`,

  '/faq/what-is-dns-caching': `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is DNS caching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DNS caching is the process of temporarily storing the results of DNS lookups so that future queries for the same hostname can be answered immediately from memory rather than repeating the full lookup against authoritative nameservers. Caching happens at multiple levels: your browser, your operating system, your router, your ISP's recursive resolver, and public resolvers like Google and Cloudflare."
      }
    },
    {
      "@type": "Question",
      "name": "How long does DNS caching last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DNS cache duration is controlled by the TTL (Time to Live) value set on each individual DNS record. A TTL of 3600 means the record can be cached for up to 3,600 seconds (one hour). A TTL of 86400 means up to 24 hours. Some ISPs extend caching beyond the published TTL. The minimum effective TTL on most resolvers is around 30-60 seconds regardless of how low you set it."
      }
    },
    {
      "@type": "Question",
      "name": "Why does DNS caching cause propagation delays?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you change a DNS record, resolvers worldwide that cached the old value will continue serving it until their cache expires. A record with TTL 3600 that was cached 1 minute before you made the change will still serve the old value for another 59 minutes. Resolvers in different regions expire their caches at different times, causing inconsistent results globally during the propagation window."
      }
    },
    {
      "@type": "Question",
      "name": "How do I clear my DNS cache?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On Windows, run 'ipconfig /flushdns' in an elevated command prompt. On macOS, run 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder'. On Linux with systemd-resolved, run 'sudo systemd-resolve --flush-caches'. In Chrome, visit chrome://net-internals/#dns and click Clear host cache. Note that flushing your local cache only affects your device — other users and ISP resolvers keep their own caches."
      }
    }
  ]
}
</script>
<section>
<h2>What Is DNS Caching and How Does It Work?</h2>
<p>DNS caching is the temporary storage of DNS lookup results to reduce query latency and authoritative nameserver load. Every DNS record has a TTL (Time to Live) value — a number of seconds that instructs resolvers how long they may cache that record's answer before they must re-query the authoritative nameserver for a fresh result.</p>
<h2>Where DNS Caching Happens</h2>
<p>DNS caching occurs at multiple independent layers between your device and the authoritative nameserver. Understanding each layer helps you troubleshoot propagation delays and cache-related issues.</p>
<ul>
<li><strong>Browser cache:</strong> Chrome, Firefox, Safari, and Edge each maintain their own DNS cache. Browser caches typically honour the record's TTL but have their own minimum and maximum bounds. Chrome's DNS cache can be viewed and cleared at <code>chrome://net-internals/#dns</code>. Firefox caches DNS within its network layer and clears when you restart the browser with cache cleared.</li>
<li><strong>Operating system cache:</strong> Windows uses the DNS Client Service to cache lookups. macOS uses mDNSResponder. Linux systems may use systemd-resolved or nscd. These caches persist across browser sessions and application restarts. Flushing the OS cache does not flush the browser cache — you may need to flush both.</li>
<li><strong>Router DNS cache:</strong> Many home routers and office firewalls cache DNS results for all devices on the local network. This cache can serve stale data even after you've flushed your device's local cache. Restarting the router clears its DNS cache.</li>
<li><strong>ISP recursive resolver:</strong> Your Internet Service Provider runs DNS resolvers that cache records for all of their subscribers. ISP resolvers often cache longer than the published TTL, especially for heavily queried domains.</li>
<li><strong>Public resolvers:</strong> Services like Google (8.8.8.8), Cloudflare (1.1.1.1), and OpenDNS cache records globally. These resolvers tend to be more reliable about respecting published TTL values than ISP resolvers.</li>
</ul>
<h2>How TTL Controls Cache Duration</h2>
<p>The TTL value on a DNS record is the maximum time, in seconds, that a resolver is permitted to cache that record. Common TTL values:</p>
<ul>
<li><strong>300 seconds (5 minutes):</strong> Low TTL used before planned DNS migrations. Records propagate quickly after a change but increase query load on your nameservers.</li>
<li><strong>3600 seconds (1 hour):</strong> A common default. Good balance between cache efficiency and propagation speed for most use cases.</li>
<li><strong>86400 seconds (24 hours):</strong> High TTL appropriate for stable records like MX records that rarely change. Reduces nameserver load but slows propagation if you need to make emergency changes.</li>
</ul>
<p>The recommended practice for planned DNS changes is to lower your TTL to 300 seconds at least 48 hours before the change, make the change, verify it has propagated, then optionally raise the TTL back to a higher value for efficiency.</p>
<h2>Practical Guide: Lowering TTL Before DNS Changes</h2>
<p>If you change a DNS record without lowering the TTL first, every resolver that recently cached the old record will serve the old value until the original TTL expires. For a record with TTL 86400 (24 hours), this means some users see the old value for up to 24 hours after your change. The correct procedure for any planned migration:</p>
<ol>
<li><strong>48 hours before the change:</strong> Lower the TTL on every record you plan to change to 300 seconds. This means any cached copies expire quickly after your change is made.</li>
<li><strong>Wait 48 hours:</strong> Allow the lowered TTL itself to propagate globally. Once 48 hours have passed, all resolvers have expired their caches of the old TTL value and re-queried with the new 300-second TTL.</li>
<li><strong>Make the DNS change:</strong> Update the record values — new IP address, new MX records, or whatever the change requires. With a 5-minute TTL, most resolvers pick up the change within 5-15 minutes.</li>
<li><strong>Verify propagation:</strong> Use the <a href="/dns-propagation-checker">DNS propagation checker</a> to confirm the new values are live globally. At 300 seconds TTL, propagation should be complete for 95% or more of global resolvers within 30 minutes.</li>
<li><strong>After propagation completes:</strong> Optionally raise the TTL back to 3600 or 86400 to reduce DNS query load on your nameservers. Low TTL increases query frequency, which is negligible for small sites but adds cost at scale on providers like AWS Route 53 that charge per query.</li>
</ol>
<h2>ISP DNS Caching: The Part You Cannot Control</h2>
<p>While you can flush your own device's DNS cache and control the TTL on your records, you cannot force ISP resolvers to expire their caches early. Some ISPs cache DNS records beyond the published TTL — this is technically non-compliant with RFC 1035 but common in practice. If users are still seeing old DNS values after your TTL has expired on major public resolvers (Google 8.8.8.8, Cloudflare 1.1.1.1), their ISP's resolver is likely the source. There is no remedy other than waiting — most ISP resolvers refresh within 24-48 hours even if they cache beyond TTL. Corporate networks that run internal DNS resolvers may need a manual flush by an IT administrator.</p>
<h2>Negative DNS Caching</h2>
<p>When a resolver queries for a hostname that does not exist and receives an NXDOMAIN response, it caches that negative result. The caching duration for NXDOMAIN responses is controlled by the negative TTL value in the zone's SOA record, typically 1800 to 3600 seconds. If you add a new DNS record and some users still get NXDOMAIN, it may be because their resolver cached an NXDOMAIN before you added the record. Lowering the SOA negative TTL before adding new records helps prevent this. Negative caching is separate from the per-record TTL — the SOA negative TTL applies to all missing records in the zone.</p>
<h2>DNS Cache vs DNS Propagation</h2>
<p>These terms are often confused. DNS propagation refers to the time it takes for a change to spread from the authoritative nameserver to all recursive resolvers worldwide. The propagation window is bounded by the TTL — once all cached copies of the old record expire, propagation is complete. Cache poisoning is a different issue where a resolver stores a fraudulent record injected by an attacker — DNSSEC protects against this by adding cryptographic signatures to DNS responses. Check if your domain has DNSSEC enabled with the <a href="/dnssec">DNSSEC validator</a>. See the <a href="/guides/dns-not-propagating-fix">DNS not propagating fix guide</a> if your changes are taking longer than expected. Use the <a href="/dns-propagation-checker">DNS propagation checker</a> to test which global servers are still serving cached data, and <a href="/faq/why-dns-not-updating-24-hours">Why Is DNS Not Updating After 24 Hours</a> for a full troubleshooting checklist.</p>
</section>`,

  '/faq/how-to-find-your-nameservers': `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I find my domain's nameservers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the command 'dig NS yourdomain.com' or 'nslookup -type=NS yourdomain.com' in a terminal. You can also run 'whois yourdomain.com' and look for the Name Server entries. Online, enter your domain in any DNS lookup tool and query for NS records. Your registrar's dashboard also lists the current nameservers under DNS Settings or Nameservers."
      }
    },
    {
      "@type": "Question",
      "name": "What do nameservers look like?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nameservers are hostnames, not IP addresses. They follow a pattern like ns1.provider.com and ns2.provider.com. Examples: Cloudflare nameservers look like 'alma.ns.cloudflare.com'; AWS Route 53 nameservers look like 'ns-123.awsdns-45.com'; registrar default nameservers often look like 'ns1.registrar.com'. Most providers assign two to four nameservers for redundancy."
      }
    },
    {
      "@type": "Question",
      "name": "Where do I update my nameservers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nameservers are always updated at your domain registrar — the company where you purchased the domain. Log in to your registrar, find the domain in your account, and look for a section called DNS, Nameservers, or DNS Settings. Do not confuse this with the DNS management dashboard at your DNS hosting provider, which is where you manage individual DNS records."
      }
    },
    {
      "@type": "Question",
      "name": "Why do I have multiple nameservers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiple nameservers provide redundancy. If one nameserver is unreachable due to a network issue, hardware failure, or maintenance, resolvers automatically try the others. The DNS specification requires at least two nameservers for every zone. Most providers assign two to four nameservers spread across different networks and geographic locations to maximise availability."
      }
    }
  ]
}
</script>
<section>
<h2>How to Find Your Domain's Nameservers</h2>
<p>Your domain's nameservers are the authoritative DNS servers that answer queries for your domain worldwide. Knowing your current nameservers is essential when troubleshooting DNS issues, switching DNS providers, or verifying that a nameserver change has propagated correctly.</p>
<h2>Method 1: Using dig (macOS, Linux, Windows with WSL)</h2>
<p>The <code>dig</code> command is the most reliable way to look up nameservers. Open a terminal and run:</p>
<pre><code>dig NS yourdomain.com</code></pre>
<p>The output shows the NS records in the ANSWER section. Each NS record lists one nameserver hostname. If you want to see the glue records (the IP addresses of the nameservers as published by the TLD), add the <code>+additional</code> flag:</p>
<pre><code>dig NS yourdomain.com +additional</code></pre>
<p>To trace the full delegation path from the root zone down to your authoritative nameservers — useful for diagnosing delegation problems — use:</p>
<pre><code>dig NS yourdomain.com +trace</code></pre>
<h2>Method 2: Using nslookup (Windows, macOS, Linux)</h2>
<p>On Windows, macOS, and Linux, <code>nslookup</code> is available by default. Run:</p>
<pre><code>nslookup -type=NS yourdomain.com</code></pre>
<p>The output lists the domain's authoritative nameservers. You can specify a particular resolver to query (useful for comparing results from different DNS servers):</p>
<pre><code>nslookup -type=NS yourdomain.com 8.8.8.8</code></pre>
<p>Testing against multiple resolvers — 8.8.8.8 (Google), 1.1.1.1 (Cloudflare), and your ISP default — shows whether nameserver propagation has completed globally or is still in progress.</p>
<h2>Method 3: Using whois</h2>
<p>The WHOIS protocol returns domain registration data including nameservers. Run <code>whois yourdomain.com</code> in a terminal, or use any online WHOIS tool. Look for the "Name Server" fields in the output. WHOIS data comes from the registrar, so it shows nameservers as your registrar has them recorded — useful for spotting discrepancies between what the registrar has on file and what the TLD zone is actually serving. During nameserver propagation, WHOIS and DNS queries may temporarily show different values.</p>
<h2>Method 4: Using an Online DNS Lookup Tool</h2>
<p>Enter your domain in the <a href="/">ReviewMyDNS lookup tool</a>, select NS as the record type, and run the query. The tool simultaneously checks nameserver records from 50+ global DNS servers and shows whether all servers are returning consistent NS records — helpful when verifying that a nameserver change has fully propagated.</p>
<h2>Understanding What You Find</h2>
<p>Nameservers are always hostnames, not IP addresses. Most domains have two to four nameservers for redundancy. Common nameserver patterns by provider:</p>
<ul>
<li><strong>Cloudflare:</strong> Two account-unique hostnames, e.g. <code>alice.ns.cloudflare.com</code> and <code>bob.ns.cloudflare.com</code> — these names vary per account</li>
<li><strong>AWS Route 53:</strong> Four nameservers across different TLDs, e.g. <code>ns-123.awsdns-45.com</code>, <code>ns-678.awsdns-90.net</code>, <code>ns-111.awsdns-22.org</code>, <code>ns-999.awsdns-33.co.uk</code></li>
<li><strong>GoDaddy:</strong> Typically <code>ns1.domaincontrol.com</code> and <code>ns2.domaincontrol.com</code></li>
<li><strong>Namecheap:</strong> Typically <code>dns1.registrar-servers.com</code> and <code>dns2.registrar-servers.com</code></li>
<li><strong>Google Domains / Squarespace:</strong> Typically <code>ns-cloud-X1.googledomains.com</code> through <code>ns-cloud-X4.googledomains.com</code></li>
</ul>
<h2>Where to Update Nameservers at Your Registrar</h2>
<p>Nameservers are always changed at your domain registrar — the company where you originally purchased the domain. Do not confuse this with the DNS management dashboard at your current DNS provider, which is where you manage individual DNS records. Registrar-specific navigation paths:</p>
<ul>
<li><strong>GoDaddy:</strong> Domain Settings → Manage DNS → Nameservers → Change. See the <a href="/guides/godaddy-dns-setup">GoDaddy DNS guide</a>.</li>
<li><strong>Namecheap:</strong> Domain List → Manage → Nameservers → Custom DNS. See the <a href="/guides/namecheap-dns-setup">Namecheap DNS guide</a>.</li>
<li><strong>Google Domains:</strong> DNS → Nameservers → Use custom name servers.</li>
</ul>
<p>After changing nameservers, verify global propagation by querying NS records across multiple resolvers or using the <a href="/dns-propagation-checker">propagation checker</a> with NS record type selected. Full nameserver propagation takes 24-48 hours. During this period, use <a href="/faq/domain-nameservers-vs-dns-records">Nameservers vs DNS Records</a> as a reference for understanding which system to make changes in. See the <a href="/guides/cloudflare-dns-setup">Cloudflare DNS Setup Guide</a> for the complete activation workflow after switching to Cloudflare nameservers.</p>
<h2>Troubleshooting Inconsistent Nameserver Results</h2>
<p>If different DNS servers return different NS records for your domain, nameserver propagation is still in progress — this is normal within 24-48 hours of a change. If inconsistency persists beyond 48 hours, check your registrar to confirm the nameservers are saved correctly and that your domain is not on a registrar lock or hold status. Some registrar locks prevent nameserver changes from taking effect. Also verify there are no typos in the nameserver hostnames — a single character error in a nameserver hostname causes resolution failures for all DNS records under that domain.</p>
</section>`,

  '/faq/why-dns-not-updating-24-hours': `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does DNS normally take to update?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DNS records typically update within 15 minutes to 4 hours. Most updates complete within 30 minutes to 2 hours. Full global propagation can take up to 48 hours in some cases, but this is rare with modern DNS infrastructure."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my DNS taking longer than 24 hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Long propagation delays are usually caused by high TTL values set before changes, ISP DNS caching beyond the TTL, recent nameserver changes (which take 24-48 hours), or DNS provider issues. Use the ReviewMyDNS propagation checker to see exactly which servers worldwide still show the old record."
      }
    },
    {
      "@type": "Question",
      "name": "What is TTL and how does it affect DNS propagation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TTL (Time To Live) controls how long DNS results are cached. High TTL (86400 seconds = 24 hours) means old records stay cached longer. Before making DNS changes, lower your TTL to 300 seconds and wait 48 hours for the lower TTL to propagate."
      }
    },
    {
      "@type": "Question",
      "name": "Can I speed up DNS propagation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flush your local DNS cache and lower your TTL before making changes. You cannot control ISP caching. Use a global DNS checker to verify which servers have updated and which haven't."
      }
    }
  ]
}
</script>
<section>
<h2>Why DNS Changes Take More Than 24 Hours</h2>
<p>When you update a DNS record — changing an A record to point to a new server, adding an MX record for email, or updating CNAME entries — the change does not take effect instantly for all users worldwide. DNS is a distributed system with multiple layers of caching. Each layer holds records for a duration controlled by the TTL (Time to Live) value you set on your records. Until each cached copy expires, users at that resolver continue to see the old value.</p>
<p>A TTL of 86400 seconds (24 hours) means every resolver that has cached your record can continue serving the old value for up to 24 hours after you make the change. This is the most common reason DNS appears stuck: the TTL was not lowered before the change was made. The solution is to lower TTL to 300 seconds (5 minutes) at least 48 hours before any planned DNS change, then make the change. With a 5-minute TTL, propagation completes for most users within 5-15 minutes.</p>
<h2>The Three Layers of DNS Caching</h2>
<p>DNS propagation is slow because records are cached at multiple independent levels, each with its own expiry timeline:</p>
<ul>
<li><strong>Your authoritative nameserver:</strong> The source of truth. Changes take effect here immediately when you save them in your DNS dashboard.</li>
<li><strong>Recursive resolvers (ISP and public DNS):</strong> These servers cache records for the duration of the TTL. Google DNS (8.8.8.8), Cloudflare (1.1.1.1), and your ISP's resolver all cache independently.</li>
<li><strong>Your local machine and browser:</strong> Operating systems and browsers cache DNS lookups in addition to the resolver-level cache. Even after the resolver cache expires, your machine may still serve a local cached copy.</li>
</ul>
<p>If you see the new record from one location but not another, different caches are at different stages of expiry. This is normal and temporary — it resolves once all caches expire and re-query the authoritative nameserver.</p>
<h2>What to Do When DNS Is Still Not Updated After 24 Hours</h2>
<p>If a full day has passed and DNS still has not updated, the issue is probably not caching — something else is wrong. Work through this checklist:</p>
<ol>
<li><strong>Verify the record is actually saved:</strong> Log in to your DNS provider and confirm the new record is present with the correct value and TTL. A common mistake is forgetting to click "Save" after editing.</li>
<li><strong>Check which nameservers are active:</strong> Run <code>dig NS yourdomain.com</code> to see which nameservers are authoritative. If the NS records point to a different provider than where you made the change, your edit went to the wrong place.</li>
<li><strong>Check for conflicting records:</strong> If an old record for the same hostname exists at the same provider, the conflict may prevent the new record from being served. Delete the old record before adding the new one.</li>
<li><strong>Use the propagation checker:</strong> The <a href="/dns-propagation-checker">DNS propagation checker</a> queries 50+ global servers and shows exactly which ones have the new value and which have the old one — or no record at all.</li>
</ol>
<h2>Nameserver Changes vs Record Changes</h2>
<p>Nameserver changes (moving from one DNS provider to another) take significantly longer than individual record changes. When you change nameservers, the parent TLD zone must be updated, and that update must propagate through the global DNS hierarchy. This process genuinely takes 24-48 hours. Individual record changes within the same DNS zone propagate much faster — typically within the TTL of the record being changed.</p>
<p>If you recently changed nameservers and are still seeing old records, allow the full 48-hour window. Use the <a href="/dns-propagation-checker">propagation checker</a> to monitor NS record propagation separately from the records within your zone.</p>
<p>For a step-by-step walkthrough of checking propagation, see <a href="/faq/how-to-check-dns-propagation">How to Check DNS Propagation</a>. If propagation appears complete but your site still isn't loading, see <a href="/guides/subdomain-not-working-dns">Subdomain Not Working</a> and the <a href="/guides/dns-not-propagating-fix">DNS Not Propagating Fix Guide</a>.</p>
</section>`,

  '/faq/how-to-check-dns-propagation': `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the easiest way to check DNS propagation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a web-based DNS propagation checker. Enter your domain, select record type (A, MX, CNAME, etc.), and it checks 50+ global servers instantly. Shows which servers have updated and which haven't."
      }
    },
    {
      "@type": "Question",
      "name": "How do I check DNS propagation from the command line?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use nslookup (Windows) or dig (Mac/Linux). Example: 'dig example.com A' or 'nslookup example.com 8.8.8.8'. Each command queries one server — test against multiple servers like 8.8.8.8 (Google), 1.1.1.1 (Cloudflare), and 9.9.9.9 (Quad9) for a global view."
      }
    },
    {
      "@type": "Question",
      "name": "What does it mean when different servers show different results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is normal during propagation. Different DNS servers cache records independently and expire at different times. When you see different results from different servers, propagation is still in progress. When all servers show the same new record, propagation is complete."
      }
    },
    {
      "@type": "Question",
      "name": "Why does my local machine show the old DNS when the checker shows the new one?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your local DNS cache hasn't expired. Flush it: Windows (ipconfig /flushdns), Mac (sudo dscacheutil -flushcache), Linux (sudo systemd-resolve --flush-caches). After flushing, your machine will query fresh DNS servers and see the updated record."
      }
    }
  ]
}
</script>
<section>
<h2>How to Check DNS Propagation</h2>
<p>DNS propagation is the process by which a DNS change you make — adding an A record, updating an MX record, or modifying a CNAME — spreads from your authoritative nameserver to the thousands of recursive resolvers used by internet users worldwide. Because each resolver caches records independently for the duration of the record's TTL, different users may see different results for the same domain during propagation. Checking propagation means verifying which resolvers worldwide have picked up your new record and which are still serving the old one.</p>
<h2>Method 1: Online Propagation Checker (Fastest)</h2>
<p>An online DNS propagation checker queries multiple global DNS servers simultaneously and shows you the result from each one in a single view. Use the <a href="/dns-propagation-checker">ReviewMyDNS propagation checker</a> to check your domain across 50+ servers in North America, Europe, Asia-Pacific, South America, and Africa. Enter your domain, select the record type you changed (A, AAAA, CNAME, MX, TXT, NS), and click Check.</p>
<p>Interpreting the results: green rows with consistent values mean those servers have the new record. Rows showing the old value or no record are still caching the old data. A mix of old and new values is normal during propagation — it means the process is in progress. Once all servers show the new value, propagation is complete.</p>
<h2>Method 2: Command-Line Tools</h2>
<p>Command-line DNS tools let you query specific servers and see the raw DNS response:</p>
<pre><code># Query Google DNS for an A record
dig A example.com @8.8.8.8

# Query Cloudflare DNS
dig A example.com @1.1.1.1

# Query your ISP's default resolver
dig A example.com

# Check MX records globally
dig MX example.com @8.8.8.8
dig MX example.com @1.1.1.1</code></pre>
<p>On Windows, use <code>nslookup</code> instead of <code>dig</code>:</p>
<pre><code>nslookup example.com 8.8.8.8
nslookup -type=MX example.com 1.1.1.1</code></pre>
<h2>Which DNS Servers to Test Against</h2>
<p>Testing against a representative set of resolvers gives you a reliable picture of global propagation status. The most important servers to check:</p>
<ul>
<li><strong>Google Public DNS:</strong> 8.8.8.8 and 8.8.4.4 — used by millions of devices worldwide</li>
<li><strong>Cloudflare DNS:</strong> 1.1.1.1 and 1.0.0.1 — one of the fastest resolvers globally</li>
<li><strong>Quad9:</strong> 9.9.9.9 — security-focused resolver with good global coverage</li>
<li><strong>OpenDNS:</strong> 208.67.222.222 — widely deployed in corporate networks</li>
<li><strong>Your ISP's default resolver:</strong> Reached by running <code>dig</code> without specifying a server</li>
</ul>
<p>If all major public resolvers show the new record but some users still see the old one, their ISP resolver may cache beyond the record's TTL. ISP caching behaviour varies and is outside your control.</p>
<h2>Understanding TTL and How It Affects Propagation Speed</h2>
<p>The TTL (Time to Live) on a DNS record determines how long resolvers cache it. A TTL of 3600 means resolvers can serve their cached copy for up to one hour. To speed up future propagation, lower your TTL to 300 seconds at least 48 hours before making any planned DNS change. After the change, the low TTL ensures caches expire quickly, and most users see the new record within 5-15 minutes.</p>
<p>If your TTL was high (3600 or 86400) when you made the change, you cannot speed up propagation retroactively — you must wait for the TTL to expire on each resolver's cache. See <a href="/faq/why-dns-not-updating-24-hours">Why DNS Is Not Updating After 24 Hours</a> for a full troubleshooting checklist if propagation seems stuck.</p>
</section>`,

  '/faq/difference-between-a-record-cname-mx-txt': `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an A record in DNS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An A record maps a domain name to an IPv4 address (like 192.0.2.1). When someone visits your domain, the A record tells the browser which server IP to connect to. Every domain needs at least one A record to be accessible. A records can be used at the root domain (apex) and on subdomains."
      }
    },
    {
      "@type": "Question",
      "name": "What is a CNAME record and when should I use it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A CNAME (Canonical Name) record creates an alias — it points one hostname to another hostname. For example, www.example.com can CNAME to example.com, and the browser resolves example.com's A record. CNAME records can only be used on subdomains, not at the root domain (apex)."
      }
    },
    {
      "@type": "Question",
      "name": "What is an MX record?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MX records route email to your mail server. Each MX record specifies a mail server hostname and a priority value. Lower priority numbers are tried first. Without correctly configured MX records, email sent to your domain will fail to be delivered."
      }
    },
    {
      "@type": "Question",
      "name": "What is a TXT record used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TXT records store arbitrary text data. They are used for email authentication (SPF, DKIM, DMARC), domain ownership verification for services like Google Search Console and Microsoft 365, and other metadata. A domain can have multiple TXT records simultaneously."
      }
    },
    {
      "@type": "Question",
      "name": "When do I use A record vs CNAME?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use an A record when mapping a domain directly to an IP address — for the root domain or any hostname where you have a fixed IP. Use a CNAME for subdomains that should point to another hostname rather than an IP address, such as www pointing to your CDN or a platform like Netlify or Vercel."
      }
    }
  ]
}
</script>
<section>
<h2>DNS Record Types Explained: A, CNAME, MX, and TXT</h2>
<p>DNS records are the individual entries in your DNS zone that map your domain and subdomains to servers, services, and policies. Each record type serves a distinct purpose. Choosing the wrong type — for example, using a CNAME at the root domain — causes resolution failures. This guide explains when to use each of the four most common record types.</p>
<h2>A Records: Mapping Domains to IPv4 Addresses</h2>
<p>An A record is the most fundamental DNS record type. It maps a hostname directly to a 32-bit IPv4 address (for example, <code>192.0.2.1</code>). When a user navigates to <code>example.com</code>, their browser queries DNS for the A record and receives the IP address of the web server to connect to.</p>
<p>A records work at any level of the domain hierarchy: the root domain (<code>example.com</code>), subdomains (<code>www.example.com</code>, <code>api.example.com</code>), or deeply nested hostnames. You can have multiple A records for the same hostname pointing to different IP addresses — this is used for round-robin load balancing or failover across multiple servers.</p>
<p>The AAAA record is the IPv6 equivalent. It maps a hostname to a 128-bit IPv6 address. Fully configured domains should have both A records (for IPv4 clients) and AAAA records (for IPv6 clients).</p>
<h2>CNAME Records: Hostname Aliases</h2>
<p>A CNAME (Canonical Name) record creates an alias from one hostname to another. Instead of resolving to an IP address directly, a CNAME points to another hostname, and the resolver then looks up that hostname's A record. For example:</p>
<ul>
<li><code>www.example.com</code> CNAME → <code>example.com</code> — the www subdomain is an alias for the root domain</li>
<li><code>blog.example.com</code> CNAME → <code>my-blog.netlify.app</code> — the blog subdomain points to a Netlify deployment</li>
<li><code>shop.example.com</code> CNAME → <code>my-store.myshopify.com</code> — the shop subdomain points to Shopify</li>
</ul>
<p>CNAMEs are convenient for hosting platforms because when the platform's IP addresses change, only the platform's A record needs to update — your CNAME still resolves correctly. However, CNAMEs have one critical restriction: <strong>they cannot be used at the zone apex (root domain)</strong>. A root domain like <code>example.com</code> cannot have a CNAME record per the DNS specification. Use an A record for the root domain, or check if your DNS provider supports ALIAS/ANAME records (which behave like a CNAME at the apex).</p>
<h2>MX Records: Email Routing</h2>
<p>MX (Mail Exchange) records specify which servers receive email for your domain. When someone sends an email to <code>user@example.com</code>, the sender's mail server queries for the MX records of <code>example.com</code> and delivers the message to the listed mail server.</p>
<p>Each MX record has two values: a priority number and a mail server hostname. Lower priority numbers are tried first. If the primary server is unreachable, the sending server tries the next lowest priority. A typical Google Workspace MX configuration looks like:</p>
<ul>
<li>Priority 1 → <code>aspmx.l.google.com</code></li>
<li>Priority 5 → <code>alt1.aspmx.l.google.com</code></li>
<li>Priority 10 → <code>alt2.aspmx.l.google.com</code></li>
</ul>
<p>If your MX records are missing or pointing to an unreachable server, email to your domain bounces with a delivery failure. Use the <a href="/mx-record-lookup">MX record lookup</a> to check what mail servers are configured for your domain and verify they are reachable.</p>
<h2>TXT Records: Verification and Email Authentication</h2>
<p>TXT records store arbitrary text strings. They have no inherent effect on routing but are read by services that need to verify domain ownership or check domain policy. The three most common uses of TXT records are:</p>
<ul>
<li><strong>SPF (Sender Policy Framework):</strong> Specifies which servers are authorised to send email on behalf of your domain. Example: <code>v=spf1 include:_spf.google.com ~all</code></li>
<li><strong>DKIM (DomainKeys Identified Mail):</strong> Stores the public key used to verify cryptographic signatures on outbound emails. DKIM TXT records use a specific naming convention: <code>selector._domainkey.example.com</code></li>
<li><strong>DMARC:</strong> Specifies how receiving servers should handle mail that fails SPF or DKIM checks. DMARC TXT records are at <code>_dmarc.example.com</code></li>
</ul>
<p>Domain verification for services like Google Search Console, Microsoft 365, and Mailchimp also uses TXT records — the service asks you to add a specific text string to verify you control the domain. Use the <a href="/txt-record-checker">TXT record checker</a> to inspect what TXT records are currently published for any domain. For a deeper look at email authentication, see <a href="/faq/domain-nameservers-vs-dns-records">Nameservers vs DNS Records</a> and <a href="/faq/what-is-dns-caching">What Is DNS Caching?</a></p>
</section>`,

  '/faq/nxdomain-error-fix': `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does NXDOMAIN mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NXDOMAIN stands for Non-Existent Domain. It means the DNS server found no records for the domain you queried. The domain either doesn't exist, has no records configured, or was queried via a nameserver that doesn't have its records."
      }
    },
    {
      "@type": "Question",
      "name": "What causes NXDOMAIN errors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common causes: expired or unregistered domain, missing DNS records at the DNS provider, incorrectly configured nameservers, a typo in the domain name, a recently changed nameserver that hasn't fully propagated, or a suspended domain."
      }
    },
    {
      "@type": "Question",
      "name": "How do I fix an NXDOMAIN error for my own domain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Check that your domain is registered and not expired (WHOIS lookup), verify nameservers are correctly set at your registrar, confirm DNS records exist at your DNS provider, and wait 24-48 hours after any nameserver change for full propagation."
      }
    },
    {
      "@type": "Question",
      "name": "Why does NXDOMAIN appear for some users but not others?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Different DNS resolvers cache records independently. If you recently fixed the underlying issue, some resolvers still serve the NXDOMAIN from their cache. If you recently caused the issue, some resolvers still serve old cached records. This inconsistency resolves once the TTL expires across all resolvers."
      }
    }
  ]
}
</script>
<section>
<h2>NXDOMAIN Error: What It Means and How to Fix It</h2>
<p>NXDOMAIN stands for "Non-Existent Domain." It is the DNS response code returned when a resolver queried for a hostname and found definitively that no records exist for it in the DNS hierarchy. This is distinct from other DNS errors like SERVFAIL (server encountered an error) or REFUSED (resolver declined the query) — NXDOMAIN specifically means the authoritative nameserver confirmed the domain or record does not exist.</p>
<p>From a user's perspective, NXDOMAIN typically manifests as a browser "This site can't be reached" or "DNS_PROBE_FINISHED_NXDOMAIN" error, or a command-line output showing <code>;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NXDOMAIN</code>.</p>
<h2>Common Causes of NXDOMAIN</h2>
<p>NXDOMAIN can occur at the full domain level (e.g., <code>example.com</code> returning NXDOMAIN) or at the subdomain level (e.g., <code>app.example.com</code> returning NXDOMAIN while <code>example.com</code> resolves fine). The cause depends on where in the DNS hierarchy the failure occurs:</p>
<ul>
<li><strong>Domain not registered or expired:</strong> If the domain is not registered or has lapsed, the TLD zone has no NS delegation for it. All queries return NXDOMAIN. Verify registration status with a WHOIS lookup.</li>
<li><strong>Nameservers not configured at registrar:</strong> Without NS records at the registrar, resolvers cannot find the authoritative nameserver for the domain and return NXDOMAIN.</li>
<li><strong>Missing DNS record for a subdomain:</strong> If <code>example.com</code> resolves but <code>app.example.com</code> returns NXDOMAIN, the specific A, CNAME, or other record for <code>app</code> is missing in the DNS zone. Add the record at your DNS provider.</li>
<li><strong>Nameserver propagation in progress:</strong> After changing nameservers, the new nameservers must propagate through the TLD zone. During this 24-48 hour window, some resolvers query the old nameservers, which may no longer have your records, resulting in NXDOMAIN.</li>
<li><strong>Domain suspended:</strong> Registrars can suspend domains for policy violations, ICANN disputes, or non-payment. A suspended domain's DNS delegation is removed, causing NXDOMAIN. Check your registrar account for notices.</li>
</ul>
<h2>How to Diagnose NXDOMAIN</h2>
<p>Use <code>dig</code> to trace the resolution path and identify where the failure occurs:</p>
<pre><code># Check if the root domain resolves
dig A example.com

# Check a specific subdomain
dig A app.example.com

# Trace the full resolution path to see where NXDOMAIN originates
dig +trace example.com

# Query the authoritative nameserver directly
dig A example.com @ns1.yourprovider.com</code></pre>
<p>If <code>dig +trace</code> returns NXDOMAIN from the TLD nameservers, the issue is at the domain registration level (expired or no NS delegation). If NXDOMAIN comes from your authoritative nameserver, the specific DNS record is missing.</p>
<h2>Step-by-Step Fix for NXDOMAIN</h2>
<ol>
<li><strong>Run a WHOIS lookup</strong> on your domain to confirm it is registered, not expired, and not suspended. Any of these conditions will show NXDOMAIN for the entire domain.</li>
<li><strong>Check your nameservers</strong> at your registrar. Log in and verify the NS records match your DNS provider's nameservers. If they are blank or pointing to an old provider, update them.</li>
<li><strong>Check your DNS records</strong> at your DNS provider. Log in and verify the A, CNAME, or other records for the failing hostname exist and have the correct values.</li>
<li><strong>Check propagation</strong> with the <a href="/dns-propagation-checker">DNS propagation checker</a>. If some servers return the record and others return NXDOMAIN, propagation is in progress — wait for the TTL to expire.</li>
<li><strong>Flush your local cache</strong> after making fixes. On Windows: <code>ipconfig /flushdns</code>. On macOS: <code>sudo dscacheutil -flushcache</code>. On Linux: <code>sudo systemd-resolve --flush-caches</code>.</li>
</ol>
<p>For subdomains returning NXDOMAIN, see the <a href="/guides/subdomain-not-working-dns">Subdomain Not Working guide</a> for a detailed checklist. For NXDOMAIN caused by nameserver changes, see <a href="/faq/why-dns-not-updating-24-hours">Why DNS Is Not Updating After 24 Hours</a>. The <a href="/errors/nxdomain">NXDOMAIN error reference</a> covers the technical details of how resolvers produce this response code.</p>
</section>`,

  '/guides/subdomain-not-working-dns': `
<section>
<h2>Why Your Subdomain Is Not Working</h2>
<p>A subdomain that fails to resolve — returning NXDOMAIN, a browser "site can't be reached" error, or loading the wrong site — is almost always a DNS configuration problem. Unlike root domain issues that often stem from nameserver misconfigurations, subdomain failures are typically caused by missing or incorrect individual DNS records. This guide covers the most common causes and how to diagnose and fix each one.</p>
<h2>Cause 1: Missing A or CNAME Record for the Subdomain</h2>
<p>A subdomain only resolves if there is an explicit DNS record for it. Unlike some web servers, DNS does not automatically inherit the parent domain's records — <code>example.com</code> pointing to an IP does not automatically make <code>blog.example.com</code> or <code>app.example.com</code> resolve. You must create a separate A or CNAME record for each subdomain.</p>
<p><strong>How to fix it:</strong> Log into your DNS management dashboard (at your DNS hosting provider, not your registrar) and add the missing record:</p>
<ul>
<li>To point <code>app.example.com</code> to an IP address: Add an A record with name <code>app</code> and value set to the server's IPv4 address.</li>
<li>To point <code>app.example.com</code> to another hostname: Add a CNAME record with name <code>app</code> and value set to the target hostname.</li>
</ul>
<p>After adding the record, wait for propagation and verify using the <a href="/dns-propagation-checker">DNS propagation checker</a>.</p>
<h2>Cause 2: Wildcard DNS Record Conflicts</h2>
<p>A wildcard record (<code>*.example.com</code>) matches any subdomain not explicitly defined. While useful for catch-all configurations, wildcard records can cause unexpected behaviour when a specific subdomain record exists alongside the wildcard. Resolvers always prefer the more specific record over the wildcard. If a wildcard record exists but a specific subdomain is not resolving correctly, check whether the specific record overrides the wildcard as expected.</p>
<p>To check for wildcard records, query your DNS zone for a <code>*</code> record:</p>
<pre><code>dig A '*.example.com'</code></pre>
<h2>Cause 3: TTL Delay After Creating the Record</h2>
<p>If you just added a new subdomain record, allow time for it to propagate. New records typically propagate to most resolvers within 5-60 minutes, but full global propagation can take up to the TTL value (often 3600 seconds or 1 hour). Use the <a href="/dns-propagation-checker">propagation checker</a> to track which global servers have picked up the new record. If propagation seems stuck, verify the record was saved correctly in your DNS dashboard.</p>
<h2>Cause 4: Wrong Record Type (CNAME at Apex)</h2>
<p>CNAME records cannot be used at the root domain (apex). However, this restriction doesn't apply to subdomains — you can freely use CNAMEs for any subdomain other than the root. If your subdomain isn't resolving and you used a CNAME, confirm the CNAME target itself is resolving correctly:</p>
<pre><code>dig CNAME app.example.com
dig A target-hostname.com</code></pre>
<p>If the CNAME points to a hostname that doesn't resolve (for example, a deleted Vercel or Netlify deployment), the subdomain will also fail to resolve.</p>
<h2>Cause 5: Nameserver Propagation Incomplete</h2>
<p>If you recently changed your domain's nameservers, your DNS records may not yet be visible from all global resolvers. During nameserver propagation (which takes 24-48 hours), some resolvers query your old nameservers and others query the new ones. If your subdomain record was only added to the new nameserver's zone, resolvers still querying the old nameserver won't find it yet.</p>
<p>Check propagation status of your NS records with <code>dig NS example.com</code> from multiple locations or use the <a href="/dns-propagation-checker">propagation checker</a> to see which nameservers are visible worldwide.</p>
<h2>Diagnostic Commands</h2>
<p>Use these commands to diagnose subdomain DNS failures:</p>
<pre><code># Check if the subdomain has an A or CNAME record
dig A app.example.com
dig CNAME app.example.com

# Trace the full resolution path
dig +trace app.example.com

# Query the authoritative nameserver directly
dig A app.example.com @ns1.yourprovider.com</code></pre>
<p>If <code>dig +trace</code> shows an NXDOMAIN at the authoritative step, the record is missing in the zone. If it shows an NXDOMAIN at the TLD delegation step, the nameservers themselves may have an issue. See the <a href="/errors/nxdomain">NXDOMAIN error guide</a> and the <a href="/guides/dns-not-propagating-fix">DNS not propagating fix guide</a> for further troubleshooting. Use the <a href="/mx-record-lookup">MX record lookup</a> if your subdomain issue is email-related.</p>
<h2>Platform-Specific Subdomain Setup</h2>
<p>Many subdomain issues arise when connecting a custom subdomain to a hosting platform. Each platform has specific DNS requirements:</p>
<ul>
<li><strong>Netlify:</strong> Add a CNAME record pointing to your site URL (<code>your-site.netlify.app</code>). See <a href="/dns-for/netlify">DNS for Netlify</a> for the complete configuration.</li>
<li><strong>Vercel:</strong> Add a CNAME record pointing to <code>cname.vercel-dns.com</code> for subdomains, or an A record at the apex.</li>
<li><strong>Render:</strong> Add a CNAME for subdomains pointing to <code>your-service.onrender.com</code>. See <a href="/dns-for/render">DNS for Render</a> for full details.</li>
<li><strong>GitHub Pages:</strong> Add a CNAME record pointing to <code>username.github.io</code>. See <a href="/dns-for/github-pages">DNS for GitHub Pages</a>.</li>
</ul>
<p>After adding a record for a hosting platform, you must also configure the custom domain within that platform's dashboard — the DNS record alone is not enough. The platform needs to know your domain so it can route requests and issue an SSL certificate. Use the <a href="/dns-propagation-checker">propagation checker</a> to confirm the CNAME or A record is resolving globally, then verify the domain in the platform's settings.</p>
</section>`,

  '/guides/cloudflare-dns-setup': `
<section>
<h2>How Cloudflare DNS Differs From Other Providers</h2>
<p>Cloudflare is not just a DNS host — it is also a global CDN, DDoS mitigation platform, and application firewall. This makes Cloudflare DNS configuration unique: every A, AAAA, and CNAME record has a proxy toggle that no other major DNS provider offers. When you enable the proxy (orange cloud), traffic routes through Cloudflare's global edge network before reaching your server. When disabled (grey cloud / DNS only), Cloudflare functions as a standard authoritative nameserver and returns your server's real IP to all queries.</p>
<p>Cloudflare operates over 300 data centre locations worldwide using anycast routing. DNS changes you make in the Cloudflare dashboard typically propagate to all Cloudflare edge nodes within 1 to 5 minutes — far faster than most DNS providers. External resolvers still cache results for the duration of the TTL, but Cloudflare's end of propagation is near-instant.</p>

<h2>Finding Your Cloudflare Nameservers</h2>
<p>When you add a domain to Cloudflare, the platform assigns two unique nameservers to your account — for example, <code>alice.ns.cloudflare.com</code> and <code>bob.ns.cloudflare.com</code>. These nameservers are specific to your Cloudflare account, not shared globally. To activate Cloudflare, log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.), navigate to Nameservers or DNS Settings, and replace the existing nameservers with Cloudflare's assigned pair. Nameserver changes take 24-48 hours to propagate globally. The Cloudflare dashboard shows your domain status as <em>Pending Nameserver Update</em> until propagation completes, then switches to <em>Active</em>.</p>

<h2>Understanding the Proxy Toggle</h2>
<p>The proxy toggle (the cloud icon next to each record) is the most important and Cloudflare-specific decision you make for each record:</p>
<ul>
<li><strong>Orange cloud (Proxied):</strong> All HTTP/HTTPS traffic routes through Cloudflare's edge network. Your server's real IP is hidden. Cloudflare applies DDoS protection, WAF rules, caching, and serves Cloudflare's Universal SSL certificate to clients. Use proxied for all web-facing A, AAAA, and CNAME records pointing to your website or web application.</li>
<li><strong>Grey cloud (DNS Only):</strong> Cloudflare acts as a standard nameserver and returns your server's real IP. No proxying, no CDN, no Cloudflare firewall. Use DNS Only for MX records (email servers must never be proxied), FTP, SSH, game servers, and any service that needs direct IP connections.</li>
</ul>
<p>Only A, AAAA, and CNAME records can be toggled. MX, TXT, NS, and SOA records are always DNS Only — there is no proxy option for those record types.</p>

<h2>Step-by-Step: Adding Records in Cloudflare</h2>
<p><strong>Adding an A record (website):</strong> In the DNS tab, click Add record, set Type to A, enter <code>@</code> for the root domain or a subdomain name such as <code>www</code>, enter your server's IPv4 address, set TTL to Auto, and enable the orange proxy cloud. Click Save. The record appears immediately in your zone and propagates to Cloudflare's edge within 5 minutes.</p>
<p><strong>Adding a CNAME at the root domain (CNAME Flattening):</strong> Standard DNS prohibits CNAME records at the zone apex, but Cloudflare resolves the target hostname to an IP at query time and returns an A record to clients. To use it, add a CNAME record with Name set to <code>@</code> and Target pointing to a hostname like <code>your-app.netlify.app</code> or <code>your-project.vercel.app</code>. This CNAME Flattening feature is unique to Cloudflare and not available on providers like GoDaddy or Namecheap without manual IP resolution.</p>
<p><strong>Adding MX records for email:</strong> Set Type to MX, Name to <code>@</code>, Mail server to your email provider's hostname (e.g., <code>aspmx.l.google.com</code> for Google Workspace or <code>mail.protection.outlook.com</code> for Microsoft 365), and Priority to the value your provider specifies. For multiple MX records, use priorities 1, 5, 10 as Google requires. MX records cannot be proxied — Cloudflare hides the proxy toggle for MX records automatically.</p>
<p><strong>Adding TXT records for email authentication:</strong> Set Type to TXT, Name to <code>@</code> for SPF and DMARC, enter the full TXT value in quotes (e.g., <code>v=spf1 include:_spf.google.com ~all</code>), and set TTL to Auto. DKIM records use a selector subdomain like <code>google._domainkey</code> as the Name. Verify all three using the <a href="/txt-record-checker">TXT record checker</a> after propagation.</p>

<h2>Common Cloudflare-Specific Errors and Fixes</h2>
<p><strong>Error 1001 — DNS Resolution Error:</strong> The CNAME target configured in your Cloudflare zone cannot be resolved. This happens when you CNAME to a hostname that has been deleted or renamed — for example, an old Netlify deployment URL. Fix: update the CNAME to the new valid target hostname. Verify the target resolves with <code>dig CNAME www.yourdomain.com</code> or the <a href="/dns-propagation-checker">DNS propagation checker</a>.</p>
<p><strong>Error 1014 — CNAME Cross-User Banned:</strong> A CNAME in your zone points to a Cloudflare-proxied hostname belonging to a different Cloudflare account. Cloudflare blocks cross-account CNAME chains to prevent abuse. Fix: switch the CNAME target to an unproxied hostname, or use an A record pointing directly to the destination server's IP address.</p>
<p><strong>Error 522 — Connection Timed Out:</strong> Cloudflare reached your origin server but it did not respond in time. This is an origin server problem, not a DNS problem. Check that your server is running and that its firewall allows inbound traffic from Cloudflare's IP ranges. Your server must accept connections from Cloudflare's edge — not from end users directly — when the record is proxied.</p>
<p><strong>Error 525 — SSL Handshake Failed:</strong> Cloudflare cannot establish a TLS connection to your origin server. This occurs when the SSL/TLS mode is set to Full or Full (Strict) but your origin has an invalid or expired certificate. Temporary fix: change the SSL/TLS mode in the Cloudflare dashboard to Flexible. Permanent fix: install a valid certificate on your origin, then switch back to Full (Strict) mode.</p>
<p><strong>SSL pending after adding a proxied record:</strong> After adding a new proxied domain or subdomain, Cloudflare issues a Universal SSL certificate. Certificate generation takes up to 24 hours for new domains and 15 minutes to several hours for new subdomains on existing domains. If SSL is still pending after 24 hours, verify the record is proxied (orange cloud) and check the SSL/TLS section in the Cloudflare dashboard for specific error messages about certificate issuance.</p>

<h2>Cloudflare DNS Propagation: How Fast Is It?</h2>
<p>For proxied records, Cloudflare uses TTL 300 (5 minutes) and serves the value from its own distributed cache to external resolvers. For DNS-only records, the TTL you set in the dashboard controls how long external resolvers cache the result. Setting TTL to Auto on a DNS-only record applies 300 seconds when the record is actively being modified and 1 hour otherwise.</p>
<p>After making a change, use the <a href="/dns-propagation-checker">DNS propagation checker</a> to see which global servers have your latest records. For proxied records, the checker returns Cloudflare's anycast IP addresses rather than your server's real IP — this is correct and expected. For DNS-only records, the checker returns your actual server IP. Compare your Cloudflare setup to <a href="/guides/godaddy-dns-setup">GoDaddy DNS</a> or <a href="/guides/namecheap-dns-setup">Namecheap DNS</a> to understand the workflow differences when switching providers.</p>

<h2>Verifying Cloudflare DNS Is Active</h2>
<p>After updating your nameservers at your registrar, verify activation with <code>dig NS yourdomain.com</code>. The response should show Cloudflare's two nameservers assigned to your account. The Cloudflare dashboard also changes the domain status from Pending to Active once propagation is confirmed. Once active, manage all DNS records exclusively in the Cloudflare dashboard. Do not add or edit records at your registrar — the registrar only controls which nameservers handle your domain, not the records themselves. See <a href="/faq/how-to-find-your-nameservers">How to Find Your Nameservers</a> for verification steps and <a href="/faq/domain-nameservers-vs-dns-records">Nameservers vs DNS Records</a> for a full explanation of this relationship.</p>
</section>`,

  '/terminology': `
<section>
<h2>Core DNS Record Types</h2>
<ul>
<li><strong>A record:</strong> Maps a domain or subdomain to an IPv4 address. The most fundamental DNS record — querying example.com for its A record returns the IP address where the website is hosted.</li>
<li><strong>AAAA record:</strong> Maps a domain or subdomain to an IPv6 address. As IPv6 adoption increases, AAAA records are increasingly important alongside A records.</li>
<li><strong>CNAME (Canonical Name):</strong> Creates an alias that points one hostname to another hostname rather than an IP address. Cannot be used at the zone apex (the root domain itself) — only on subdomains.</li>
<li><strong>MX (Mail Exchange):</strong> Specifies the mail servers authorised to receive email for a domain, along with a priority value controlling delivery order. See the <a href="/mx-record-lookup">MX record lookup tool</a>.</li>
<li><strong>TXT record:</strong> Stores arbitrary text data. Used for SPF, DKIM, DMARC, and domain verification tokens.</li>
<li><strong>NS (Nameserver):</strong> Identifies the authoritative DNS servers for a domain. NS records at the registrar level delegate DNS control to a specific DNS provider.</li>
<li><strong>SOA (Start of Authority):</strong> Contains administrative metadata for a DNS zone: the primary nameserver, contact email, serial number, and refresh/retry/expire intervals.</li>
<li><strong>PTR (Pointer):</strong> The reverse of an A record — maps an IP address back to a hostname. Used for reverse DNS lookups, critical for mail server reputation.</li>
<li><strong>SRV (Service):</strong> Specifies the location of servers for specific services (e.g., SIP, XMPP). Includes service name, protocol, priority, weight, port, and hostname.</li>
<li><strong>CAA (Certification Authority Authorisation):</strong> Specifies which certificate authorities are permitted to issue TLS certificates for a domain, reducing the risk of misissued certificates.</li>
</ul>
<h2>Email Authentication Terms</h2>
<ul>
<li><strong>SPF (Sender Policy Framework):</strong> A TXT record listing IP addresses and mail servers authorised to send email on behalf of a domain.</li>
<li><strong>DKIM (DomainKeys Identified Mail):</strong> A cryptographic signing system where outbound emails are signed with a private key, and the corresponding public key is stored in DNS.</li>
<li><strong>DMARC (Domain-based Message Authentication, Reporting and Conformance):</strong> A policy record that specifies how receiving servers should handle mail failing SPF or DKIM checks, and where to send authentication reports.</li>
</ul>
<h2>DNS Infrastructure Terms</h2>
<ul>
<li><strong>TTL (Time to Live):</strong> The duration in seconds that DNS resolvers may cache a record before re-querying. Lower TTLs mean faster propagation of changes; higher TTLs reduce query load on nameservers.</li>
<li><strong>Propagation:</strong> The time required for a DNS change to spread from the authoritative nameserver to all recursive resolvers worldwide, bounded by the record's TTL value.</li>
<li><strong>Authoritative nameserver:</strong> The DNS server that holds the official records for a domain and provides definitive answers to queries for that zone.</li>
<li><strong>Recursive resolver:</strong> A DNS server that queries authoritative nameservers on behalf of clients, caches results, and returns answers. Your ISP's DNS server and public resolvers like Google (8.8.8.8) and Cloudflare (1.1.1.1) are recursive resolvers.</li>
<li><strong>Anycast:</strong> A network routing technique where multiple servers share the same IP address. Queries are routed to the nearest server automatically. Used by all major DNS providers for performance and redundancy.</li>
<li><strong>DNSSEC (DNS Security Extensions):</strong> Adds cryptographic signatures to DNS records to prevent cache poisoning and ensure responses come from the legitimate authoritative server.</li>
<li><strong>Zone:</strong> The set of DNS records managed by a single authoritative nameserver for a domain and its subdomains.</li>
<li><strong>Delegation:</strong> The process by which a parent zone (e.g., .com) points to the nameservers responsible for a child zone (e.g., example.com) via NS records.</li>
</ul>
</section>`,

  '/guides/aws-route53-dns-setup': `
<section>
<h2>How to Configure DNS Records on AWS Route 53</h2>
<p>AWS Route 53 is Amazon's highly scalable cloud DNS service, offering 100% uptime SLA and global anycast routing. This guide explains how to manage DNS records in Route 53, from basic A records to advanced routing policies for load balancing and failover.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access AWS Route 53 Console</strong> Log into AWS Management Console and navigate to Route 53.
<ul>
<li>Search for 'Route 53' in the AWS services search bar</li>
<li>Click on 'Hosted zones' from the left navigation menu</li>
<li>Select your domain's hosted zone from the list</li>
<li>If you don't see your domain, create a hosted zone first</li>
</ul>
</li>
<li>
<strong>Navigate to Hosted Zone</strong> Click on your domain name to view existing DNS records.
<ul>
<li>You'll see NS (nameserver) and SOA records created automatically</li>
<li>These records are required for DNS to function - don't delete them</li>
<li>Note your Route 53 nameservers if you need to update your registrar</li>
</ul>
</li>
<li>
<strong>Create DNS Record</strong> Click 'Create record' button to add a new DNS entry.
<ul>
<li>Choose 'Simple routing' for standard DNS records (most common)</li>
<li>Enter record name (leave blank for root domain, or add subdomain)</li>
<li>Select record type (A, AAAA, CNAME, MX, TXT, etc.)</li>
<li>Enter value(s) - IP address, hostname, or text content</li>
<li>Set TTL (300 seconds default, or custom value)</li>
<li>Click 'Create records' to save</li>
</ul>
</li>
<li>
<strong>Update Nameservers at Registrar</strong> Point your domain registrar to Route 53 nameservers.
<ul>
<li>Copy the 4 NS record values from your hosted zone</li>
<li>Log into your domain registrar (where you purchased the domain)</li>
<li>Update nameservers to the 4 Route 53 NS values</li>
<li>Nameserver changes take 24-48 hours to propagate globally</li>
<li>Once propagated, Route 53 becomes authoritative for your domain</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on AWS Route 53</h2>
<ul>
<li><strong>A Record:</strong> Maps domain to IPv4 address. Leave name blank for root domain or enter subdomain. Can use alias records to point to AWS resources (ELB, S3, CloudFront) with zero TTL and no charges. <code>Name: (blank), Type: A, Value: 192.0.2.1, TTL: 300, Routing: Simple</code></li>
<li><strong>CNAME Record:</strong> Creates alias to another domain. Cannot be used on root domain - use Alias record or A record instead. Common for subdomains and third-party service integrations. <code>Name: www, Type: CNAME, Value: example.com, TTL: 300, Routing: Simple</code></li>
<li><strong>MX Record:</strong> Routes email to mail servers. Value includes priority (lower = higher priority) followed by mail server hostname. Add multiple MX records for redundancy. Don't forget trailing dot for FQDN. <code>Name: (blank), Type: MX, Value: 10 mail.example.com, TTL: 300, Routing: Simple</code></li>
<li><strong>TXT Record:</strong> Stores text for verification, SPF, DKIM, DMARC, and domain ownership. Enclose values in quotes if they contain spaces. Multiple TXT values can exist for one name. Critical for email authentication. <code>Name: (blank), Type: TXT, Value: "v=spf1 include:_spf.google.com ~all", TTL: 300</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS records not resolving after creation:</strong> Verify your domain registrar is pointing to the correct Route 53 nameservers (check NS records in hosted zone). Nameserver changes take 24-48 hours. If nameservers are correct, verify record syntax - FQDN should end with a dot, or leave blank for Route 53 to append your zone. Use our DNS checker to verify global propagation.</li>
<li><strong>Cannot create CNAME on root domain:</strong> AWS Route 53 supports Alias records as a solution. Instead of CNAME, create an A record with 'Alias' enabled, pointing to your AWS resource (ELB, CloudFront, S3). Alias records work at root domain and are free (no query charges).</li>
<li><strong>High Route 53 costs from DNS queries:</strong> Route 53 charges $0.40 per million queries (first 1 billion/month). Reduce costs by: increasing TTL values to cache records longer, using Alias records for AWS resources (no query charges), consolidating multiple A records into one with multiple IP values, implementing CloudFront caching.</li>
<li><strong>Email delivery failures with MX records:</strong> Ensure MX record values include priority number (e.g., '10 mail.example.com'). Verify mail server hostnames have corresponding A records. Check SPF, DKIM, DMARC TXT records are configured. MX records must point to A records, not CNAME records. Use our DNS lookup to verify MX propagation.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What's the difference between A records and Alias records in Route 53?</strong> A records map to IP addresses and are charged per query. Alias records are AWS-specific, pointing to AWS resources (ELB, S3, CloudFront, API Gateway) with no query charges and automatic IP updates. Alias records can be used on root domains, while CNAME cannot. Use Alias records for AWS resources, A records for external IPs.</li>
<li><strong>How much does AWS Route 53 cost?</strong> Hosted zones cost $0.50 per month per zone. DNS queries are $0.40 per million queries (first 1 billion/month). Alias queries to AWS resources are free. Health checks are $0.50/month per endpoint. Most small websites pay $0.50-$2/month. Route 53 is more expensive than free DNS providers but offers 100% uptime SLA and advanced routing.</li>
<li><strong>How long does Route 53 DNS propagation take?</strong> Route 53 propagates changes to all AWS edge locations within 60 seconds. Global propagation to ISPs and resolvers depends on TTL values and varies from minutes to 48 hours. Lower TTL (60-300 seconds) enables faster changes but increases query costs. Use our global DNS checker to monitor propagation across worldwide servers.</li>
<li><strong>Should I use Route 53 if I'm not using other AWS services?</strong> Route 53 offers excellent reliability (100% uptime SLA) and advanced features (geolocation routing, health checks, failover) but costs more than free DNS providers. Use Route 53 if you need enterprise-grade DNS, traffic routing policies, or AWS integration. For simple DNS needs, free providers like Cloudflare offer good performance at no cost.</li>
</ul>
</section>`,

  '/guides/wix-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Wix</h2>
<p>Wix is a popular website builder that also offers domain registration and DNS management. This guide shows how to configure DNS records in Wix's domain management panel for custom domains, email, and third-party service verification.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access Wix Domain Settings</strong> Navigate to DNS management in your Wix account.
<ul>
<li>Log into your Wix account at wix.com</li>
<li>Click your profile icon and select 'Domains' from the menu</li>
<li>Or go to Settings > Domains in your site dashboard</li>
<li>Find your domain and click 'Manage' next to it</li>
</ul>
</li>
<li>
<strong>Open DNS Records Editor</strong> Access the DNS records management page.
<ul>
<li>Click 'DNS Records' or 'Advanced' tab in domain settings</li>
<li>Wix shows existing DNS records in a table format</li>
<li>Default records include Wix nameservers and site hosting records</li>
<li>Scroll down to see all record types and the 'Add Record' option</li>
</ul>
</li>
<li>
<strong>Add New DNS Record</strong> Create a custom DNS record.
<ul>
<li>Click '+ Add Record' button</li>
<li>Select record type from dropdown (A, CNAME, MX, TXT, SRV, AAAA)</li>
<li>Enter the Host Name (use @ for root domain or subdomain name)</li>
<li>Enter the Value (IP address, domain, or text)</li>
<li>Set TTL (1 hour default)</li>
<li>Click 'Save' to add the record</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Confirm your DNS changes have propagated.
<ul>
<li>Wix DNS changes typically take 1-48 hours to propagate fully</li>
<li>Wix displays a status indicator for domain connection</li>
<li>Use ReviewMyDNS to check propagation across global DNS servers</li>
<li>Flush local DNS cache for faster testing on your device</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Wix</h2>
<ul>
<li><strong>A Record:</strong> Points your domain to an IPv4 address. Wix automatically creates A records when you connect a domain to your site. <code>Type: A, Host: @, Value: 192.0.2.1, TTL: 1 Hour</code></li>
<li><strong>CNAME Record:</strong> Creates an alias to another domain. Wix uses CNAME records for www subdomain and some third-party integrations. <code>Type: CNAME, Host: www, Value: example.com, TTL: 1 Hour</code></li>
<li><strong>MX Record:</strong> Routes email to your mail server. Required for Google Workspace, Microsoft 365, or other email services with your Wix domain. <code>Type: MX, Host: @, Value: mx.google.com, Priority: 1, TTL: 1 Hour</code></li>
<li><strong>TXT Record:</strong> Stores text for SPF, DKIM, DMARC, and domain verification. Commonly needed for Google verification and email authentication. <code>Type: TXT, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 1 Hour</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>Wix domain not connecting to site:</strong> Ensure your domain's nameservers point to Wix (ns*.wixdns.net). If using external DNS, add the A records and CNAME provided by Wix in your domain setup wizard. Check the domain connection status in Wix dashboard for specific errors.</li>
<li><strong>DNS records not saving in Wix:</strong> Wix has restrictions on certain DNS records to prevent conflicts with their hosting. You cannot modify Wix's automatic A records if the domain is connected to a Wix site. For custom records, use the '+ Add Record' option in the Advanced DNS section.</li>
<li><strong>Email not working with Wix domain:</strong> Wix doesn't provide email hosting by default. You need a third-party email provider (Google Workspace, Microsoft 365, Zoho). Add the provider's MX records and SPF/DKIM TXT records in Wix DNS settings. Remove any conflicting default MX records.</li>
<li><strong>Third-party verification failing:</strong> When adding TXT records for verification (Google Search Console, Facebook, etc.), ensure you enter the exact value provided. Don't add quotes around the value in Wix - they're added automatically. Wait 1-2 hours for propagation before retrying verification.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Wix nameservers?</strong> Wix nameservers follow the pattern ns*.wixdns.net (e.g., ns2.wixdns.net, ns3.wixdns.net). Exact values are shown when you connect a domain in Wix. Use these nameservers to manage DNS fully through Wix's dashboard.</li>
<li><strong>How long does Wix DNS propagation take?</strong> Wix states DNS changes can take up to 48 hours to propagate. In practice, most changes appear within 1-4 hours. Domain connection to a Wix site typically completes within 24 hours. Monitor with ReviewMyDNS for real-time status.</li>
<li><strong>Can I use Wix DNS with external hosting?</strong> Yes, if your domain is registered with Wix, you can add custom A records pointing to external hosting. However, if the domain is connected to a Wix site, you may need to disconnect it first. Alternatively, change nameservers to your hosting provider.</li>
<li><strong>Does Wix support all DNS record types?</strong> Wix supports A, AAAA, CNAME, MX, TXT, SRV, and NS record types. Some advanced record types (CAA, NAPTR) may not be available. If you need unsupported record types, consider using external DNS like Cloudflare with your Wix domain.</li>
</ul>
</section>`,

  '/guides/namecheap-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Namecheap</h2>
<p>Namecheap is a popular domain registrar known for affordable domains and user-friendly DNS management. This guide will show you how to configure DNS records on Namecheap, whether you're hosting a website, setting up email, or verifying domain ownership.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log into Namecheap Account</strong> Visit namecheap.com and sign in to your account.
<ul>
<li>Click on 'Domain List' from the left sidebar</li>
<li>Find your domain and click the 'Manage' button</li>
<li>Ensure 'Namecheap BasicDNS' or 'Namecheap PremiumDNS' is selected in the nameservers section</li>
<li>If using custom nameservers, you'll need to manage DNS at that provider instead</li>
</ul>
</li>
<li>
<strong>Navigate to Advanced DNS Settings</strong> Click the 'Advanced DNS' tab at the top of the domain management page.
<ul>
<li>You'll see existing DNS records in a table format</li>
<li>Default records include parking page A records and mail CNAME records</li>
<li>Click 'Add New Record' button to create custom DNS entries</li>
</ul>
</li>
<li>
<strong>Add DNS Records</strong> Select record type and fill in required fields.
<ul>
<li>Choose record type from dropdown (A, AAAA, CNAME, MX, TXT, etc.)</li>
<li>Enter Host (use @ for root domain, or subdomain name)</li>
<li>Input Value/Target (IP address, hostname, or text content)</li>
<li>Set TTL (Automatic is recommended, or custom from 60 seconds to 7200 seconds)</li>
<li>Click the green checkmark to save the record</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> DNS changes on Namecheap typically propagate within 30 minutes to 24 hours.
<ul>
<li>Namecheap DNS updates their authoritative servers within minutes</li>
<li>Global propagation depends on TTL values and DNS server caching</li>
<li>Use ReviewMyDNS to check real-time propagation across 50+ global servers</li>
<li>Flush your local DNS cache to see changes immediately on your device</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Namecheap</h2>
<ul>
<li><strong>A Record:</strong> Maps your domain to an IPv4 address. Use @ for root domain (example.com) or enter subdomain (www, blog, app). Required to point your domain to web hosting. <code>Type: A Record, Host: @, Value: 192.0.2.1, TTL: Automatic</code></li>
<li><strong>CNAME Record:</strong> Creates an alias pointing to another domain. Commonly used for www subdomain or third-party services. Cannot be used on root domain (@) - use A record instead. <code>Type: CNAME Record, Host: www, Value: example.com, TTL: Automatic</code></li>
<li><strong>MX Record:</strong> Directs email to your mail server. Set multiple MX records with priorities for redundancy. Lower priority number = higher importance. Essential for email delivery. <code>Type: MX Record, Host: @, Value: mail.example.com, Priority: 10, TTL: Automatic</code></li>
<li><strong>TXT Record:</strong> Stores text data for SPF email authentication, domain verification, DKIM signatures, and DMARC policies. Critical for email deliverability and security. <code>Type: TXT Record, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: Automatic</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not reflecting after several hours:</strong> Namecheap DNS typically propagates within 30 minutes globally, but local ISP caching can delay updates. Flush your DNS cache (ipconfig /flushdns on Windows, sudo killall -HUP mDNSResponder on Mac). Use our global DNS checker to verify which servers show the updated records.</li>
<li><strong>Cannot add CNAME for root domain:</strong> DNS protocol doesn't allow CNAME records on root domains (@). Use an A record pointing directly to your server's IP address instead. If your host requires CNAME, ask them for the IP address to use in an A record.</li>
<li><strong>Email delivery failing after DNS changes:</strong> Verify all MX records are correct with proper priority values. Ensure SPF, DKIM, and DMARC TXT records are configured if required by your email provider. Check that you didn't accidentally delete existing email records. Email DNS changes can take 2-4 hours to fully propagate.</li>
<li><strong>SSL certificate errors after changing DNS:</strong> SSL certificates are tied to domains and IP addresses. If you changed A records, your hosting provider may need to regenerate SSL certificates. This typically happens automatically but can take 1-24 hours. Contact your host if errors persist.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What's the difference between BasicDNS and PremiumDNS on Namecheap?</strong> BasicDNS is free and suitable for most users, offering standard DNS management. PremiumDNS ($4.88/year) includes faster global DNS resolution, 100% uptime SLA, DDoS protection, and DNSSEC support. For most small websites, BasicDNS is sufficient.</li>
<li><strong>How long does Namecheap DNS propagation take?</strong> Namecheap updates their authoritative DNS servers within minutes. Global propagation typically completes in 30 minutes to 4 hours, though the industry standard is up to 24-48 hours. Previous TTL values and ISP DNS caching affect actual propagation time. Monitor progress with our global DNS propagation checker.</li>
<li><strong>Should I use Automatic or Custom TTL on Namecheap?</strong> Automatic TTL (1800 seconds / 30 minutes) works well for most use cases. Set custom lower TTL (60-300 seconds) before making planned DNS changes for faster propagation. Higher TTL (3600-7200 seconds) reduces DNS query load but delays future changes. Change back to higher TTL after changes propagate.</li>
<li><strong>Can I point my Namecheap domain to external nameservers?</strong> Yes! In domain management, click 'Nameservers' > 'Custom DNS' and enter external nameservers (like Cloudflare's or your hosting provider's). Nameserver changes take 24-48 hours to propagate. Once changed, you'll manage all DNS records at the external provider, not Namecheap.</li>
</ul>
</section>`,

  '/guides/google-domains-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Google Domains</h2>
<p>Google Domains (now Squarespace Domains) offers straightforward DNS management with Google's reliable infrastructure. This guide walks through setting up DNS records in Google Domains, from website hosting to email configuration.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access Google Domains Console</strong> Log into domains.google.com with your Google account.
<ul>
<li>Click on your domain name from the 'My domains' list</li>
<li>Select 'DNS' from the left sidebar menu</li>
<li>Ensure 'Use Google Domains nameservers' is selected (not custom)</li>
<li>If using custom nameservers, manage DNS at that provider instead</li>
</ul>
</li>
<li>
<strong>Navigate to Resource Records</strong> Scroll down to the 'Resource records' section on the DNS page.
<ul>
<li>You'll see existing records like @ pointing to Google parking</li>
<li>Default records include synthetic records for Google services</li>
<li>Click 'Manage custom records' to add or edit DNS entries</li>
</ul>
</li>
<li>
<strong>Add Custom DNS Record</strong> Click 'Create new record' to add a DNS entry.
<ul>
<li>Enter hostname (leave blank for @ root domain, or type subdomain)</li>
<li>Select Type from dropdown (A, AAAA, CNAME, MX, TXT, etc.)</li>
<li>Set TTL (default 3600 seconds, or custom from 300-86400)</li>
<li>Enter Data/Value (IP address, hostname, text content, or priority for MX)</li>
<li>Click 'Add' to save the record</li>
</ul>
</li>
<li>
<strong>Verify Propagation</strong> DNS changes on Google Domains typically propagate quickly.
<ul>
<li>Google Domains updates authoritative servers within minutes</li>
<li>Global propagation depends on TTL and DNS caching (typically 1-4 hours)</li>
<li>Use ReviewMyDNS to verify changes across 50+ global DNS servers</li>
<li>Flush local DNS cache to see updates on your device immediately</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Google Domains</h2>
<ul>
<li><strong>A Record:</strong> Points your domain to an IPv4 address. Leave host blank for root domain (example.com) or enter subdomain name (www, blog). Required to connect domain to web hosting server. <code>Host: (blank for @), Type: A, TTL: 3600, Data: 192.0.2.1</code></li>
<li><strong>CNAME Record:</strong> Creates an alias pointing to another domain name. Cannot be used on root domain - use A record instead. Common for www subdomain or third-party service integrations like email providers. <code>Host: www, Type: CNAME, TTL: 3600, Data: example.com</code></li>
<li><strong>MX Record:</strong> Directs email to mail server. Data field includes priority (lower = higher priority) followed by server hostname. Add multiple MX records with different priorities for email redundancy. <code>Host: (blank), Type: MX, TTL: 3600, Data: 10 mail.example.com</code></li>
<li><strong>TXT Record:</strong> Stores text data for SPF email authentication, domain verification, DKIM signatures, and DMARC policies. Essential for email deliverability and proving domain ownership to third-party services. <code>Host: (blank), Type: TXT, TTL: 3600, Data: v=spf1 include:_spf.google.com ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not visible after 1 hour:</strong> Google Domains typically propagates within 15-30 minutes to their nameservers. Global propagation to ISPs can take longer (up to 24-48 hours) due to DNS caching. Flush your local DNS cache (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on Mac). Use our DNS propagation checker to see which servers have updated records.</li>
<li><strong>Cannot use CNAME on root domain:</strong> DNS specification prohibits CNAME records on root domains (@). Google Domains requires an A record pointing to an IP address for root domains. If your hosting provider only gives a CNAME, ask for the IP address to use in an A record, or consider using Cloudflare's CNAME flattening.</li>
<li><strong>Email stopped working after changing DNS:</strong> Verify you didn't delete existing MX records during DNS changes. Email requires MX records pointing to mail servers, plus SPF and DKIM TXT records. Check Google Workspace or email provider documentation for correct MX values. Email propagation can take 2-6 hours globally.</li>
<li><strong>Website shows Google parking page instead of my site:</strong> This indicates A records are still pointing to Google's parking IP (typically 216.239.32.21). Update or delete the @ A record to point to your hosting provider's IP address. Changes appear within 30 minutes on Google's servers, but ISP caching may delay 1-4 hours.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What happened to Google Domains?</strong> Google sold Google Domains to Squarespace in June 2023. Existing Google Domains customers can continue using the service with the same features and pricing. Domains are gradually being migrated to Squarespace, but DNS management functionality remains unchanged during the transition.</li>
<li><strong>What TTL should I use on Google Domains?</strong> The default 3600 seconds (1 hour) is suitable for most stable DNS records. Use lower TTL (300-600 seconds) before making planned changes for faster propagation. Higher TTL (14400-86400 seconds) reduces DNS query load and improves performance for rarely-changing records. Adjust TTL before changes, then increase after propagation.</li>
<li><strong>How long does Google Domains DNS propagation take?</strong> Google Domains updates their authoritative nameservers within 10-30 minutes. Complete global propagation varies from 1-4 hours typically, up to 48 hours in rare cases. Propagation time depends on previous TTL values and ISP DNS caching policies. Monitor real-time propagation with our global DNS checker tool.</li>
<li><strong>Can I use external nameservers with Google Domains?</strong> Yes! In DNS settings, select 'Use custom name servers' and enter nameservers from providers like Cloudflare or your hosting company. Nameserver changes take 24-48 hours to propagate. Once changed, manage all DNS records at the external provider. You can switch back to Google nameservers anytime.</li>
</ul>
</section>`,

  '/guides/hover-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Hover</h2>
<p>Hover is a no-nonsense domain registrar focused on simplicity and privacy, without upsells or aggressive marketing. This guide demonstrates how to configure DNS records in Hover's clean interface, from pointing your domain to hosting to setting up email services.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access Hover Control Panel</strong> Log into hover.com with your account credentials.
<ul>
<li>Click on your domain name from the domains list on the dashboard</li>
<li>Select the 'DNS' tab at the top of the domain page</li>
<li>You'll see existing DNS records in a simple, clean table</li>
<li>Hover shows record type, hostname, and value columns</li>
</ul>
</li>
<li>
<strong>View Existing DNS Records</strong> Review current DNS configuration before making changes.
<ul>
<li>Default records include Hover parking page A record and CNAME for www</li>
<li>Hover may include email forwarding MX records if configured</li>
<li>Note existing TTL values before making changes</li>
<li>You can edit or delete existing records using the action buttons</li>
</ul>
</li>
<li>
<strong>Add New DNS Record</strong> Click 'Add New' button to create a custom DNS record.
<ul>
<li>Select record type from dropdown (A, AAAA, CNAME, MX, TXT, SRV, NS)</li>
<li>Enter Hostname (leave blank for @ root domain, or type subdomain)</li>
<li>Input Value/Target (IP address for A, hostname for CNAME, text for TXT)</li>
<li>For MX records, also enter Priority (typically 10, 20, 30 for multiple servers)</li>
<li>TTL is automatically set to 900 seconds (15 minutes) by default</li>
<li>Click 'Save' to add the record</li>
</ul>
</li>
<li>
<strong>Verify and Test Changes</strong> DNS changes on Hover propagate relatively quickly.
<ul>
<li>Hover DNS updates their nameservers within minutes</li>
<li>Global propagation typically completes within 1-4 hours</li>
<li>Full propagation can take up to 24-48 hours depending on TTL</li>
<li>Use ReviewMyDNS to check propagation status across 50+ global DNS servers</li>
<li>Flush local DNS cache to test changes on your device immediately</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Hover</h2>
<ul>
<li><strong>A Record:</strong> Points your domain to an IPv4 address. Leave hostname blank for root domain (example.com) or enter subdomain (www, blog, store). Required to connect domain to web hosting server. <code>Type: A, Hostname: (blank for @), Value: 192.0.2.1, TTL: 900</code></li>
<li><strong>CNAME Record:</strong> Creates an alias pointing to another domain name. Cannot be used on root domain (@) - use A record instead. Commonly used for www subdomain or connecting to third-party platforms like Shopify or WordPress.com. <code>Type: CNAME, Hostname: www, Value: example.com, TTL: 900</code></li>
<li><strong>MX Record:</strong> Directs email to mail servers. Priority determines routing order (lower = higher priority). Add multiple MX records for redundancy. Required for custom email hosting or services like Google Workspace, Microsoft 365. <code>Type: MX, Hostname: (blank), Value: mail.example.com, Priority: 10, TTL: 900</code></li>
<li><strong>TXT Record:</strong> Stores text information for SPF email authentication, DKIM signatures, DMARC policies, and domain verification. Essential for email deliverability and security. Used by email providers to prevent spoofing. <code>Type: TXT, Hostname: (blank), Value: v=spf1 include:_spf.google.com ~all, TTL: 900</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not appearing after several hours:</strong> Hover DNS typically propagates within 1-4 hours globally. Check that you clicked 'Save' after adding the record. Verify your domain is using Hover nameservers (ns1.hover.com, ns2.hover.com). Flush your local DNS cache and try from different networks. Use our global DNS checker to identify servers still showing old records.</li>
<li><strong>Cannot create CNAME for root domain:</strong> DNS protocol prohibits CNAME records on root domains (@). Hover requires an A record pointing to an IP address for root domains. If your hosting provider only provides a CNAME, contact them for the underlying IP address to use in an A record.</li>
<li><strong>Email delivery failing after DNS update:</strong> Verify MX records point to correct mail servers with proper priority values. Ensure you didn't delete existing email forwarding or MX records. Check SPF and DKIM TXT records if using email services. Hover's email forwarding requires specific MX records. Email DNS changes can take 2-6 hours to propagate to mail servers.</li>
<li><strong>Website showing Hover parking page instead of my site:</strong> This means the A record is still pointing to Hover's parking IP (typically 64.98.145.30). Update or replace the @ A record to point to your web hosting IP address. Changes appear on Hover's nameservers within 15-30 minutes, but ISP caching may delay visibility 1-4 hours.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Hover's nameservers?</strong> Hover's default nameservers are ns1.hover.com and ns2.hover.com. You can find your specific nameserver values in your domain's 'Overview' tab. These nameservers must be set at your domain registrar (if registered elsewhere) for Hover DNS to work. Nameserver changes propagate in 24-48 hours.</li>
<li><strong>How long does Hover DNS propagation take?</strong> Hover updates their authoritative DNS servers within minutes of saving changes. Global propagation to ISPs and resolvers typically takes 1-4 hours, though the industry standard is up to 48 hours. Hover uses a default TTL of 900 seconds (15 minutes) which enables relatively fast propagation. Use our DNS propagation checker to monitor worldwide status.</li>
<li><strong>Does Hover offer email forwarding?</strong> Yes! Hover includes free email forwarding for up to 100 email addresses per domain. In your domain settings, go to 'Email' tab to set up forwarding (e.g., forward hello@yourdomain.com to your Gmail). Hover automatically manages the required MX and other email DNS records for forwarding.</li>
<li><strong>Can I use external nameservers instead of Hover's DNS?</strong> Yes! In domain settings, click 'Edit Nameservers' and enter custom nameservers from providers like Cloudflare or your hosting company. Once changed, manage all DNS records at the external provider. Nameserver changes take 24-48 hours to propagate. You can switch back to Hover nameservers anytime to regain Hover DNS management.</li>
</ul>
</section>`,

  '/guides/domain-com-dns-setup': `
<section>
<h2>How to Configure DNS Records on Domain.com</h2>
<p>Domain.com is a popular domain registrar offering affordable domains and email services. This guide shows how to manage DNS records in Domain.com's control panel for websites, email, and third-party services.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log Into Domain.com Account</strong> Access your Domain.com account to manage DNS.
<ul>
<li>Visit domain.com and sign in with email/password</li>
<li>Click 'Manage Domains' from main menu</li>
<li>Find your domain and click 'Manage' button</li>
<li>Select 'DNS Management' or 'Edit DNS' option</li>
</ul>
</li>
<li>
<strong>View Existing DNS Records</strong> Review current DNS configuration.
<ul>
<li>Domain.com shows DNS records in list format</li>
<li>Default includes Domain.com nameservers and parking records</li>
<li>You'll see options to add, edit, or delete records</li>
<li>TTL (Time To Live) can be customized per record</li>
</ul>
</li>
<li>
<strong>Add New DNS Record</strong> Create custom DNS entry.
<ul>
<li>Click 'Add New Record' or similar button</li>
<li>Select record type (A, CNAME, MX, TXT, etc.)</li>
<li>Enter host/name (@ for root or subdomain)</li>
<li>Input value/target and TTL</li>
<li>Click 'Save' or 'Add Record'</li>
</ul>
</li>
<li>
<strong>Verify Propagation</strong> DNS changes take time to propagate globally.
<ul>
<li>Domain.com updates usually within 1 hour</li>
<li>Global propagation: 24-48 hours typical</li>
<li>Use ReviewMyDNS to check propagation status</li>
<li>Flush local DNS cache for immediate testing</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Domain.com</h2>
<ul>
<li><strong>A Record:</strong> Points root domain to IPv4 address. Use @ for root or subdomain name for subdomains. <code>Host: @, Type: A, Value: 192.0.2.1, TTL: 3600</code></li>
<li><strong>MX Record:</strong> Routes email to mail server. Add multiple MX records for redundancy. <code>Host: @, Type: MX, Value: mail.example.com, Priority: 10, TTL: 3600</code></li>
<li><strong>CNAME Record:</strong> Creates domain alias. Cannot be used on root domain (@). <code>Host: www, Type: CNAME, Value: example.com, TTL: 3600</code></li>
<li><strong>TXT Record:</strong> Stores text for SPF, DKIM, DMARC, domain verification. <code>Host: @, Type: TXT, Value: v=spf1 include:_spf.google.com ~all, TTL: 3600</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not appearing:</strong> Domain.com DNS updates within 1 hour to their servers. Wait 24-48 hours for global propagation. Flush your DNS cache. Use DNS propagation checker to verify worldwide status.</li>
<li><strong>Email not working:</strong> Verify MX records point to correct mail servers. Check SPF and DKIM TXT records configured. Ensure nameservers at registrar point to Domain.com (if using their DNS).</li>
<li><strong>Website showing parking page:</strong> A records still point to parking. Update A record @ to point to hosting provider IP.</li>
<li><strong>Cannot add CNAME for root:</strong> DNS doesn't allow CNAME on root. Use A record instead.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Domain.com's default nameservers?</strong> Domain.com nameservers are typically ns1.domain.com, ns2.domain.com (exact values shown in account).</li>
<li><strong>Can I use external DNS with Domain.com domain?</strong> Yes, update nameservers to external provider (Cloudflare, Route53) at Domain.com account settings.</li>
<li><strong>How long Domain.com DNS propagation?</strong> Domain.com servers update within 1 hour. Global propagation: 24-48 hours typical.</li>
<li><strong>What TTL should I use?</strong> Default 3600 (1 hour) works for most cases. Lower TTL (300-600) for frequent changes. Higher TTL (14400) for stable records.</li>
</ul>
</section>`,

  '/guides/siteground-dns-setup': `
<section>
<h2>How to Set Up DNS Records on SiteGround</h2>
<p>SiteGround is a leading web hosting provider serving millions of sites. This guide explains how to manage DNS records in SiteGround's control panel for websites, email, and services.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access SiteGround Control Panel</strong> Log into your SiteGround hosting account.
<ul>
<li>Visit my.siteground.com and sign in</li>
<li>Select 'Manage Domain' for your domain</li>
<li>Navigate to 'DNS Zone' or 'Zone Editor'</li>
<li>View all DNS records in SiteGround's interface</li>
</ul>
</li>
<li>
<strong>Locate DNS Zone Editor</strong> Find DNS management section.
<ul>
<li>In domain settings, find 'DNS Zone' or 'Advanced DNS'</li>
<li>SiteGround shows records in editable table format</li>
<li>You can add, edit, delete records directly</li>
<li>Changes apply within minutes to SiteGround servers</li>
</ul>
</li>
<li>
<strong>Add DNS Record</strong> Create new DNS entry.
<ul>
<li>Click 'Add New Record' button</li>
<li>Select type (A, AAAA, CNAME, MX, TXT, etc.)</li>
<li>Enter hostname/name (@ for root)</li>
<li>Input value/target</li>
<li>Set TTL if available</li>
<li>Save record</li>
</ul>
</li>
<li>
<strong>Test DNS Changes</strong> Verify changes propagated.
<ul>
<li>SiteGround updates within 15-30 minutes</li>
<li>Global propagation: 1-4 hours typical</li>
<li>Use DNS checker to verify worldwide status</li>
<li>Changes may not appear immediately on all devices (DNS caching)</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on SiteGround</h2>
<ul>
<li><strong>A Record:</strong> Points domain to IPv4 address. SiteGround provides your hosting IP in account. <code>Name: @, Type: A, IP: 192.0.2.1, TTL: 3600</code></li>
<li><strong>MX Record:</strong> Routes email to mail server. SiteGround email requires specific MX records. <code>Name: @, Type: MX, Value: mail.example.com, Priority: 10</code></li>
<li><strong>CNAME Record:</strong> Creates domain alias. SiteGround often pre-configures www CNAME. <code>Name: www, Type: CNAME, Value: example.com</code></li>
<li><strong>TXT Record:</strong> Stores verification, SPF, DKIM, DMARC records. <code>Name: @, Type: TXT, Value: v=spf1 include:sendgrid.net ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not visible:</strong> SiteGround updates within 15-30 minutes. Wait 1-4 hours for global propagation. Flush DNS cache. Check SiteGround status for incidents.</li>
<li><strong>Website not working:</strong> Verify A record points to SiteGround hosting IP (SiteGround provides this). If using external DNS, ensure nameservers point to SiteGround.</li>
<li><strong>SiteGround email not working:</strong> SiteGround email requires specific MX records. Check SiteGround documentation for their MX values. Add SPF and DKIM TXT records.</li>
<li><strong>SSL certificate errors:</strong> SiteGround issues free SSL certificates. Ensure domain points to SiteGround. Force SSL renewal in SiteGround account. May take 24 hours.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are SiteGround's nameservers?</strong> SiteGround nameservers shown in account control panel. Usually ns1.siteground.xxx, ns2.siteground.xxx pattern. Use these when changing from another registrar.</li>
<li><strong>Can I use external DNS with SiteGround hosting?</strong> Yes, point your domain registrar nameservers to external provider (Cloudflare, Route53). Then manage DNS there. SiteGround hosting works with any nameservers.</li>
<li><strong>How long SiteGround DNS propagation?</strong> SiteGround servers update within 15-30 minutes. Global propagation: 1-4 hours. Previous TTL values affect propagation speed.</li>
<li><strong>Can I manage DNS on domain registered elsewhere?</strong> Yes, change nameservers at your domain registrar to SiteGround's nameservers. Then manage DNS in SiteGround account.</li>
</ul>
</section>`,

  '/guides/dynadot-dns-setup': `
<section>
<h2>How to Configure DNS Records on Dynadot</h2>
<p>Dynadot is an affordable domain registrar with full DNS management capabilities. This guide shows how to manage your DNS records.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access Dynadot Control Panel</strong> Log into your Dynadot account.
<ul>
<li>Visit dynadot.com and sign in</li>
<li>Go to 'Domains' section</li>
<li>Click your domain name</li>
<li>Select 'DNS' or 'Advanced DNS' option</li>
</ul>
</li>
<li>
<strong>View DNS Records</strong> See current DNS configuration.
<ul>
<li>Dynadot shows all DNS records in list format</li>
<li>Default records include Dynadot nameservers</li>
<li>You can add, edit, or delete records</li>
<li>Click 'Add Record' to create new entry</li>
</ul>
</li>
<li>
<strong>Add DNS Record</strong> Create new DNS entry.
<ul>
<li>Select record type</li>
<li>Enter hostname and value</li>
<li>Set TTL (default 3600 seconds)</li>
<li>Click 'Add' or 'Save'</li>
</ul>
</li>
<li>
<strong>Test Changes</strong> Verify DNS propagation.
<ul>
<li>Dynadot updates within 30 minutes typically</li>
<li>Global propagation: 1-4 hours</li>
<li>Use DNS checker for verification</li>
<li>Check worldwide server status</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Dynadot</h2>
<ul>
<li><strong>A Record:</strong> Points domain to server IP address <code>Host: @, Type: A, IP: 192.0.2.1</code></li>
<li><strong>MX Record:</strong> Routes email to designated mail server <code>Host: @, Type: MX, Value: mail.example.com, Priority: 10</code></li>
<li><strong>CNAME Record:</strong> Creates alias pointing to another domain <code>Host: www, Type: CNAME, Value: example.com</code></li>
<li><strong>TXT Record:</strong> Stores verification and email authentication data <code>Host: @, Type: TXT, Value: v=spf1 include:_spf.google.com ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS not updating:</strong> Wait 30 minutes to 1 hour for Dynadot to process. Global propagation up to 4 hours. Clear browser cache and DNS cache.</li>
<li><strong>Website showing Dynadot default page:</strong> A record still points to Dynadot parking. Update A record @ to your hosting provider's IP.</li>
<li><strong>Email not configured:</strong> Add correct MX records. Verify mail server hostname has A record. Add SPF record.</li>
<li><strong>CNAME error on root domain:</strong> Root domain requires A record, not CNAME. Use A record pointing to IP address.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Dynadot nameservers?</strong> Dynadot provides default nameservers. Check your domain settings for specific nameserver addresses if using external DNS.</li>
<li><strong>How long Dynadot DNS propagation?</strong> Dynadot updates within 30 minutes typically. Global propagation: 1-4 hours. Full propagation up to 48 hours.</li>
<li><strong>Can I use external nameservers with Dynadot?</strong> Yes, change nameservers to external provider in Dynadot settings. Then manage DNS at external provider.</li>
<li><strong>Is Dynadot DNS included with domains?</strong> Yes, Dynadot provides free DNS with all domain registrations. No additional cost for DNS management.</li>
</ul>
</section>`,

  '/guides/porkbun-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Porkbun</h2>
<p>Porkbun is an affordable domain registrar with excellent customer service and full DNS control. This guide shows how to manage your DNS records.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log Into Porkbun Account</strong> Access Porkbun domain management.
<ul>
<li>Visit porkbun.com and sign in</li>
<li>Click 'Domain Management'</li>
<li>Find your domain and click 'Manage'</li>
<li>Select 'DNS' section</li>
</ul>
</li>
<li>
<strong>Access DNS Editor</strong> Find DNS record management area.
<ul>
<li>Porkbun displays DNS records in table format</li>
<li>Default records show Porkbun nameservers</li>
<li>Click 'Add a Record' to create new entry</li>
<li>Existing records can be edited inline</li>
</ul>
</li>
<li>
<strong>Create DNS Record</strong> Add new DNS entry.
<ul>
<li>Select record type (A, CNAME, MX, TXT, etc.)</li>
<li>Enter hostname (@ for root or subdomain)</li>
<li>Input value/target IP or hostname</li>
<li>TTL defaults to 600 seconds</li>
<li>Save the record</li>
</ul>
</li>
<li>
<strong>Verify Propagation</strong> DNS changes take time to spread globally.
<ul>
<li>Porkbun updates within 30 minutes</li>
<li>Global propagation: 1-4 hours typical</li>
<li>Use DNS propagation checker to verify</li>
<li>Different servers update on different schedules</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Porkbun</h2>
<ul>
<li><strong>A Record:</strong> Maps domain to IPv4 server address <code>Host: @, Type: A, TTL: 600, Value: 192.0.2.1</code></li>
<li><strong>MX Record:</strong> Directs email to mail server with priority <code>Host: @, Type: MX, Priority: 10, Value: mail.example.com, TTL: 600</code></li>
<li><strong>CNAME Record:</strong> Creates subdomain alias to another domain <code>Host: www, Type: CNAME, TTL: 600, Value: example.com</code></li>
<li><strong>TXT Record:</strong> Email authentication, verification, and SPF records <code>Host: @, Type: TXT, TTL: 600, Value: v=spf1 include:_spf.google.com ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not visible:</strong> Porkbun updates within 30 minutes to their servers. Wait 1-4 hours for ISP propagation. Flush local DNS cache.</li>
<li><strong>Website showing Porkbun parking page:</strong> A record points to Porkbun parking IP. Change A record @ to your hosting provider's actual IP address.</li>
<li><strong>Email delivery failing:</strong> Ensure MX records point to correct mail server. Add SPF record for email authentication. Verify DKIM records if required.</li>
<li><strong>CNAME on root domain error:</strong> Root domain cannot have CNAME record. Use A record with server IP instead.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Porkbun's DNS nameservers?</strong> Porkbun provides default nameservers shown in your domain settings. You can use external nameservers by changing them in domain settings.</li>
<li><strong>How fast is Porkbun DNS?</strong> Porkbun uses Cloudflare's DNS infrastructure for fast global resolution. Updates within 30 minutes, global propagation 1-4 hours.</li>
<li><strong>Can I use external DNS providers with Porkbun?</strong> Yes, change nameservers to external provider (Cloudflare, Route53, etc.) in Porkbun settings. Then manage all DNS there.</li>
<li><strong>Is DNS management free with Porkbun domains?</strong> Yes, full DNS management is included free with all Porkbun domain registrations. No additional charges.</li>
</ul>
</section>`,

  '/guides/ns1-managed-dns-setup': `
<section>
<h2>How to Configure DNS Records in NS1</h2>
<p>NS1 is an enterprise-grade managed DNS provider offering advanced features like traffic steering, load balancing, and API-first infrastructure. This guide covers NS1 DNS configuration.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Create NS1 Account and Zone</strong> Set up your domain in NS1.
<ul>
<li>Sign up at ns1.com</li>
<li>Create new zone for your domain</li>
<li>NS1 generates 4 authoritative nameservers</li>
<li>Copy NS1 nameservers for your registrar</li>
</ul>
</li>
<li>
<strong>Update Nameservers at Registrar</strong> Point your domain to NS1.
<ul>
<li>Log into domain registrar</li>
<li>Update nameservers to NS1 nameservers</li>
<li>Use exact nameservers provided by NS1</li>
<li>Changes take 24-48 hours to propagate</li>
</ul>
</li>
<li>
<strong>Add DNS Records via Portal or API</strong> Create DNS records in NS1.
<ul>
<li>NS1 offers web portal and REST API</li>
<li>Add A records, MX records, TXT records as needed</li>
<li>Configure advanced features: traffic management, filters, policies</li>
<li>Test records are resolving correctly</li>
</ul>
</li>
<li>
<strong>Configure Advanced Features</strong> Leverage NS1's advanced DNS capabilities.
<ul>
<li>Set up load balancing rules</li>
<li>Configure geographic routing</li>
<li>Add failover policies</li>
<li>Monitor DNS query analytics</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on NS1 DNS</h2>
<ul>
<li><strong>A Record with Load Balancing:</strong> NS1 allows multiple A record values with load balancing. Route traffic across multiple servers based on geography, performance, or custom rules. <code>A record @ pointing to multiple IPs with load balancing</code></li>
<li><strong>MX Record with Failover:</strong> NS1 enables intelligent MX failover. If primary mail server down, automatically route to backup. Requires health check configuration. <code>MX records with failover policy to backup mail servers</code></li>
<li><strong>TXT Record for SPF with API Management:</strong> Use NS1 API to dynamically update SPF records. Useful for automated infrastructure where SPF rules change frequently. <code>SPF record managed via NS1 API for dynamic updates</code></li>
<li><strong>CNAME with Geographic Routing:</strong> Route traffic based on user geography. US traffic to US CDN, EU traffic to EU CDN. Requires NS1 advanced plan. <code>CNAME record with geographic routing to different CDNs</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>NS1 nameservers not propagating:</strong> Verify nameservers at registrar exactly match NS1 nameservers. Nameserver changes take 24-48 hours. Use DNS checker to verify when propagated.</li>
<li><strong>Advanced features not working:</strong> Some NS1 features require higher plan tier. Verify your NS1 plan includes the feature. Check health checks are properly configured. Review NS1 API documentation.</li>
<li><strong>Costs higher than expected:</strong> NS1 charges per query. High-traffic domains may have significant costs. Monitor query analytics. Consider traffic shaping or caching strategies to reduce queries.</li>
<li><strong>Performance not as expected:</strong> Verify advanced routing policies are configured correctly. Check health check endpoints are responding. Review NS1 performance analytics to identify issues.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>Is NS1 good for beginners?</strong> NS1 is enterprise-focused with advanced features. Beginners should start with simpler DNS providers (Cloudflare, Route53). NS1 best for organizations needing advanced traffic steering and performance optimization.</li>
<li><strong>How much does NS1 DNS cost?</strong> NS1 charges based on DNS queries. Typical: 1M queries/month = $10-30/month depending on plan tier. High-traffic domains can be expensive. Check calculator on NS1 website.</li>
<li><strong>Can I use NS1 with any domain registrar?</strong> Yes, point your domain registrar's nameservers to NS1 nameservers. NS1 works with any registrar. Only requires changing nameservers.</li>
<li><strong>Does NS1 offer API access?</strong> Yes, NS1 is API-first. Full REST API for managing DNS records, zones, and advanced policies. Great for infrastructure-as-code and automation.</li>
</ul>
</section>`,

  '/guides/linode-dns-setup': `
<section>
<h2>How to Configure DNS Records in Linode</h2>
<p>Linode offers managed DNS service integrated with their hosting platform. This guide covers setting up and managing DNS records in Linode.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access Linode DNS Manager</strong> Log into Linode account and navigate to DNS Manager.
<ul>
<li>Visit manager.linode.com</li>
<li>Log into your Linode account</li>
<li>Click 'Domains' in left sidebar</li>
<li>Find your domain or create new domain</li>
</ul>
</li>
<li>
<strong>Create Domain Zone</strong> Set up zone file for your domain.
<ul>
<li>Click 'Create a new Domain'</li>
<li>Enter your domain name</li>
<li>Select 'Create with nameservers set to Linode nameservers' or 'Use Linode's nameservers'</li>
<li>Linode generates SOA and NS records</li>
</ul>
</li>
<li>
<strong>Update Nameservers at Registrar</strong> Point your domain to Linode nameservers.
<ul>
<li>Copy Linode nameservers from DNS Manager</li>
<li>Log into domain registrar</li>
<li>Update nameservers to Linode's nameservers</li>
<li>Wait 24-48 hours for propagation</li>
</ul>
</li>
<li>
<strong>Add DNS Records</strong> Create A, CNAME, MX, TXT records.
<ul>
<li>In Linode DNS Manager, click domain</li>
<li>Click 'Add an A Record', 'Add a CNAME Record', etc.</li>
<li>Enter hostname and value</li>
<li>Click 'Save' to create record</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Linode DNS</h2>
<ul>
<li><strong>A Record:</strong> Maps domain to server IP. Use @ for root domain. <code>Hostname: @, IP Address: 192.0.2.1</code></li>
<li><strong>MX Record:</strong> Routes email to mail server. Configure priority values. <code>Mail Server: mail.example.com, Priority: 10</code></li>
<li><strong>CNAME Record:</strong> Creates subdomain alias to another domain. <code>Hostname: www, CNAME: example.com</code></li>
<li><strong>TXT Record:</strong> Email authentication, SPF, DKIM, DMARC records. <code>Hostname: @, Text: v=spf1 include:_spf.google.com ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>Linode nameservers not propagating:</strong> Verify nameservers at registrar match Linode nameservers exactly. Wait 24-48 hours. Use DNS checker to verify propagation.</li>
<li><strong>DNS records not working:</strong> Verify domain zone file is active in Linode DNS Manager. Check records were saved correctly. Wait 15-30 minutes for records to take effect.</li>
<li><strong>Email not working:</strong> Ensure MX records point to correct mail server. Verify mail server hostname has A record. Check SPF and DKIM TXT records.</li>
<li><strong>Website showing Linode placeholder:</strong> A record points to Linode placeholder IP. Update A record to your website server IP or use Linode hosting.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>Is Linode DNS free?</strong> Yes, Linode DNS Manager is free with any Linode account. No charges for DNS service regardless of number of records or queries.</li>
<li><strong>Can I use Linode DNS without Linode hosting?</strong> Yes, Linode offers managed DNS standalone. You can point any domain to Linode's nameservers regardless of where domain is registered or hosted.</li>
<li><strong>How fast is Linode DNS?</strong> Linode uses global DNS infrastructure with anycast routing. Very fast globally. DNS updates take effect within 30 seconds to 5 minutes typically.</li>
<li><strong>Does Linode offer DNSSEC?</strong> Yes, Linode supports DNSSEC. Can be enabled in DNS Manager. Requires DS records to be added to registrar.</li>
</ul>
</section>`,

  '/guides/digitalocean-dns-setup': `
<section>
<h2>How to Configure DNS Records in DigitalOcean</h2>
<p>DigitalOcean provides free managed DNS service for their customers and anyone else. This guide covers setting up DNS records in DigitalOcean.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access DigitalOcean Control Panel</strong> Log into DigitalOcean account.
<ul>
<li>Visit cloud.digitalocean.com</li>
<li>Log into your DigitalOcean account</li>
<li>Click 'Networking' in left menu</li>
<li>Select 'Domains' tab</li>
</ul>
</li>
<li>
<strong>Add Domain to DigitalOcean</strong> Register your domain in DigitalOcean DNS.
<ul>
<li>Click 'Add Domain'</li>
<li>Enter domain name</li>
<li>Select your project (if using projects)</li>
<li>DigitalOcean creates nameserver records</li>
</ul>
</li>
<li>
<strong>Update Nameservers</strong> Point registrar to DigitalOcean nameservers.
<ul>
<li>Copy DigitalOcean nameservers from Domains page</li>
<li>Log into domain registrar</li>
<li>Update nameservers to DigitalOcean's nameservers</li>
<li>Propagation takes 24-48 hours</li>
</ul>
</li>
<li>
<strong>Add DNS Records</strong> Create A, CNAME, MX, TXT records.
<ul>
<li>In Domains page, click your domain</li>
<li>Click 'Add Record' button</li>
<li>Select record type and enter details</li>
<li>Save record</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on DigitalOcean DNS</h2>
<ul>
<li><strong>A Record:</strong> Points domain to server IP address <code>Hostname: @, IPv4 Address: 192.0.2.1</code></li>
<li><strong>CNAME Record:</strong> Creates subdomain alias to another domain <code>Hostname: www, Fully Qualified Domain Name: example.com</code></li>
<li><strong>MX Record:</strong> Routes email to designated mail server <code>Hostname: @, Mail Host: mail.example.com, Priority: 10</code></li>
<li><strong>TXT Record:</strong> Email authentication, verification, and SPF records <code>Hostname: @, Text Data: v=spf1 include:_spf.google.com ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DigitalOcean nameservers not working:</strong> Verify nameservers at registrar exactly match DigitalOcean. Wait 24-48 hours for propagation. Use DNS checker to verify.</li>
<li><strong>DNS changes not appearing:</strong> DigitalOcean updates DNS within 30 seconds. Check record saved correctly. Refresh browser. Clear DNS cache if testing locally.</li>
<li><strong>Website showing DO default page:</strong> A record points to default DigitalOcean placeholder. Update A record to your droplet's IP or domain.</li>
<li><strong>Email not working:</strong> Configure MX records pointing to email provider. Add SPF and DKIM records. Verify email provider DNS values.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>Is DigitalOcean DNS free?</strong> Yes, DigitalOcean DNS is free for everyone. No registration required. Free global DNS even without DigitalOcean hosting.</li>
<li><strong>Can I use DigitalOcean DNS without hosting?</strong> Yes, DigitalOcean offers managed DNS standalone. Point any domain's nameservers to DigitalOcean regardless of host.</li>
<li><strong>How fast is DigitalOcean DNS?</strong> DigitalOcean uses global Anycast DNS infrastructure. Very fast worldwide. DNS changes take effect within 30 seconds.</li>
<li><strong>Does DigitalOcean support DNSSEC?</strong> Yes, DigitalOcean supports DNSSEC. Can be enabled per domain in DNS settings. Requires DS records at registrar.</li>
</ul>
</section>`,

  '/guides/hostinger-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Hostinger</h2>
<p>Hostinger is one of the most popular budget-friendly web hosting providers, serving millions of users worldwide. This guide walks you through configuring DNS records in Hostinger's hPanel control panel for websites, email, and domain verification.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log Into Hostinger hPanel</strong> Access your Hostinger account and navigate to DNS management.
<ul>
<li>Visit hpanel.hostinger.com and sign in with your credentials</li>
<li>Click 'Domains' in the left sidebar menu</li>
<li>Select your domain from the list</li>
<li>Click 'DNS / Nameservers' in the domain settings</li>
</ul>
</li>
<li>
<strong>Navigate to DNS Zone Editor</strong> Find the DNS zone editor in hPanel.
<ul>
<li>hPanel shows all DNS records in a clean table layout</li>
<li>You'll see existing A, CNAME, MX, and TXT records</li>
<li>Default records include Hostinger nameservers and hosting A records</li>
<li>Click 'Add Record' button to create a new DNS entry</li>
</ul>
</li>
<li>
<strong>Add New DNS Record</strong> Create a custom DNS record for your domain.
<ul>
<li>Select record type from the dropdown (A, AAAA, CNAME, MX, TXT, SRV)</li>
<li>Enter the hostname (use @ for root domain or type subdomain name)</li>
<li>Input the target value (IP address, hostname, or text content)</li>
<li>Set TTL value (14400 seconds default recommended)</li>
<li>Click 'Add Record' to save the entry</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Confirm your DNS changes have propagated globally.
<ul>
<li>Hostinger DNS typically updates within 15-30 minutes</li>
<li>Full global propagation can take 1-24 hours depending on TTL</li>
<li>Use ReviewMyDNS to check propagation status across worldwide servers</li>
<li>Flush your local DNS cache to test changes on your device immediately</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Hostinger</h2>
<ul>
<li><strong>A Record:</strong> Maps your domain to an IPv4 address. Use @ for root domain or enter a subdomain name like www or blog. <code>Type: A, Name: @, Points to: 192.0.2.1, TTL: 14400</code></li>
<li><strong>CNAME Record:</strong> Creates an alias pointing to another domain. Commonly used for www subdomain or third-party service integration. <code>Type: CNAME, Name: www, Target: example.com, TTL: 14400</code></li>
<li><strong>MX Record:</strong> Routes email to your mail server. Hostinger email uses mx1.hostinger.com and mx2.hostinger.com with priorities 5 and 10. <code>Type: MX, Name: @, Mail Server: mx1.hostinger.com, Priority: 5, TTL: 14400</code></li>
<li><strong>TXT Record:</strong> Stores text data for SPF email authentication, DKIM, DMARC, and domain ownership verification. <code>Type: TXT, Name: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 14400</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not appearing after 30 minutes:</strong> Hostinger DNS updates within 15-30 minutes to their servers. If changes aren't visible, flush your DNS cache (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on Mac). Use ReviewMyDNS to check if propagation is in progress across global servers.</li>
<li><strong>Website showing Hostinger parking page:</strong> Your A record is still pointing to Hostinger's default parking IP. Update the @ A record to point to your actual hosting server IP address. Check your hosting provider for the correct IP. Changes take 15-30 minutes.</li>
<li><strong>Hostinger email not receiving messages:</strong> Verify MX records are set to mx1.hostinger.com (priority 5) and mx2.hostinger.com (priority 10). Ensure SPF TXT record includes Hostinger's mail servers. Check that no conflicting MX records exist from previous configurations.</li>
<li><strong>Cannot edit DNS records in hPanel:</strong> If DNS editing is grayed out, your nameservers may be pointing to an external provider. Switch nameservers back to Hostinger's default (ns1.dns-parking.com, ns2.dns-parking.com) to manage DNS in hPanel, or manage DNS at your external provider.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Hostinger's default nameservers?</strong> Hostinger's default nameservers are ns1.dns-parking.com and ns2.dns-parking.com. These are shown in your hPanel under Domains > DNS / Nameservers. You must use these nameservers to manage DNS records through hPanel.</li>
<li><strong>How long does Hostinger DNS propagation take?</strong> Hostinger updates their authoritative DNS servers within 15-30 minutes. Global propagation typically completes in 1-4 hours, though it can take up to 24 hours depending on previous TTL values and ISP DNS caching. Monitor propagation with ReviewMyDNS.</li>
<li><strong>Can I use Cloudflare DNS with Hostinger hosting?</strong> Yes, you can change your nameservers to Cloudflare's nameservers in hPanel under DNS / Nameservers > Change Nameservers. Once changed, manage all DNS records in Cloudflare's dashboard instead of hPanel. Hostinger hosting works with any nameservers.</li>
<li><strong>Does Hostinger support DNSSEC?</strong> Hostinger supports DNSSEC for domains registered with them. You can enable it in hPanel under your domain's DNS settings. If using external nameservers, configure DNSSEC at your DNS provider and add DS records at Hostinger.</li>
</ul>
</section>`,

  '/guides/dreamhost-dns-setup': `
<section>
<h2>How to Set Up DNS Records on DreamHost</h2>
<p>DreamHost is an established web hosting provider and domain registrar trusted by over 1.5 million websites. This guide covers how to manage DNS records in DreamHost's control panel for websites, email configuration, and domain verification.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log Into DreamHost Panel</strong> Access your DreamHost account to manage DNS.
<ul>
<li>Visit panel.dreamhost.com and sign in with your credentials</li>
<li>Click 'Domains' in the left navigation menu</li>
<li>Select 'Manage Domains' from the dropdown</li>
<li>Find your domain in the list and click 'DNS' link next to it</li>
</ul>
</li>
<li>
<strong>Access DNS Management Page</strong> Navigate to the DNS records editor for your domain.
<ul>
<li>DreamHost displays all current DNS records in a table</li>
<li>You'll see default records including DreamHost nameservers and hosting records</li>
<li>Scroll down to the 'Add a custom DNS record' section</li>
<li>Custom records override DreamHost's automatic DNS entries</li>
</ul>
</li>
<li>
<strong>Add Custom DNS Record</strong> Create a new DNS record for your domain.
<ul>
<li>Enter the Name field (leave blank for root domain, or type subdomain)</li>
<li>Select record Type from dropdown (A, AAAA, CNAME, MX, TXT, SRV)</li>
<li>Enter the Value (IP address, hostname, or text content)</li>
<li>For MX records, also enter priority number</li>
<li>Click 'Add Record Now!' to save</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Confirm your changes have propagated globally.
<ul>
<li>DreamHost DNS changes typically take effect within 4-6 hours</li>
<li>Some records may update faster depending on TTL settings</li>
<li>Use ReviewMyDNS to check propagation status across global DNS servers</li>
<li>Flush your local DNS cache for immediate testing on your device</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on DreamHost</h2>
<ul>
<li><strong>A Record:</strong> Points your root domain or subdomain to an IPv4 address. Leave name blank for root domain or enter subdomain name. <code>Name: (blank), Type: A, Value: 192.0.2.1</code></li>
<li><strong>CNAME Record:</strong> Creates an alias pointing to another domain name. Cannot be used on the root domain - use A record instead. <code>Name: www, Type: CNAME, Value: example.com</code></li>
<li><strong>MX Record:</strong> Routes email to your mail server. DreamHost email uses mx1.dreamhost.com and mx2.dreamhost.com. <code>Name: (blank), Type: MX, Value: mx1.dreamhost.com, Priority: 0</code></li>
<li><strong>TXT Record:</strong> Stores text data for SPF, DKIM, DMARC, and domain verification. Essential for email deliverability. <code>Name: (blank), Type: TXT, Value: v=spf1 include:netblocks.dreamhost.com ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes taking longer than expected:</strong> DreamHost DNS can take 4-6 hours to propagate fully. This is slower than some providers due to their DNS architecture. Flush your local DNS cache and use ReviewMyDNS to check if propagation is in progress. If still not updated after 6 hours, contact DreamHost support.</li>
<li><strong>Custom DNS records being overridden:</strong> DreamHost automatically manages DNS for hosted domains. If your custom records are being overridden, ensure you're adding them in the 'Custom DNS' section, not the auto-generated section. Remove DreamHost hosting from the domain if you want full manual DNS control.</li>
<li><strong>Email not working after DNS changes:</strong> If using DreamHost email, verify MX records point to mx1.dreamhost.com and mx2.dreamhost.com. If using Google Workspace or Microsoft 365, update MX records to their servers. Add appropriate SPF and DKIM TXT records for your email provider.</li>
<li><strong>Domain showing DreamHost 'coming soon' page:</strong> This means the domain is registered but not yet configured for hosting. Add hosting in the DreamHost panel under Domains > Manage Domains > Add Hosting. Or update the A record to point to your external hosting IP address.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are DreamHost's nameservers?</strong> DreamHost's nameservers are ns1.dreamhost.com, ns2.dreamhost.com, and ns3.dreamhost.com. These are required if you want to manage DNS through DreamHost's panel. You can find them in your panel under Domains > Registrations.</li>
<li><strong>How long does DreamHost DNS propagation take?</strong> DreamHost DNS changes typically take 4-6 hours to propagate globally, though some changes may appear sooner. This is slightly slower than some providers. Monitor propagation status with ReviewMyDNS to see which global servers have updated.</li>
<li><strong>Can I use DreamHost DNS with hosting elsewhere?</strong> Yes, you can register your domain at DreamHost and point it to external hosting via A records or CNAME records. You can also use DreamHost's nameservers while pointing records to external servers, or change nameservers entirely to another DNS provider.</li>
<li><strong>Does DreamHost offer free SSL with DNS?</strong> DreamHost provides free Let's Encrypt SSL certificates for domains hosted on their servers. If your domain points elsewhere, SSL must be configured at your hosting provider. SSL certificates are issued automatically when DNS properly points to DreamHost hosting.</li>
</ul>
</section>`,

  '/guides/ionos-dns-setup': `
<section>
<h2>How to Set Up DNS Records on IONOS (1&1)</h2>
<p>IONOS (formerly 1&1 Internet) is one of Europe's largest web hosting and domain providers, serving millions of customers globally. This guide walks you through configuring DNS records in the IONOS control panel for websites, email, and third-party services.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log Into IONOS Control Panel</strong> Access your IONOS account to manage DNS.
<ul>
<li>Visit my.ionos.com and sign in with your customer ID or email</li>
<li>Click 'Domains & SSL' from the main menu</li>
<li>Select your domain from the list</li>
<li>Click 'DNS' or 'Manage Subdomains' in domain settings</li>
</ul>
</li>
<li>
<strong>Navigate to DNS Settings</strong> Find the DNS management section for your domain.
<ul>
<li>IONOS displays DNS records in a categorized table view</li>
<li>You'll see tabs or sections for A, CNAME, MX, TXT, and other record types</li>
<li>Default records include IONOS nameservers and hosting configuration</li>
<li>Click 'Add Record' to create a new DNS entry</li>
</ul>
</li>
<li>
<strong>Add New DNS Record</strong> Create a custom DNS record.
<ul>
<li>Select record type from the available options (A, AAAA, CNAME, MX, TXT, SRV)</li>
<li>Enter the hostname (use @ for root domain or type a subdomain name)</li>
<li>Input the target value (IP address, hostname, or text content)</li>
<li>Set TTL if the option is available (IONOS may use default TTL)</li>
<li>Click 'Save' to create the record</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Confirm your changes have taken effect globally.
<ul>
<li>IONOS DNS changes typically propagate within 1-2 hours</li>
<li>Full global propagation may take up to 24 hours</li>
<li>Use ReviewMyDNS to check propagation status across worldwide DNS servers</li>
<li>Flush your local DNS cache for immediate testing</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on IONOS (1&1)</h2>
<ul>
<li><strong>A Record:</strong> Maps your domain to an IPv4 address. Use @ for root domain or enter subdomain name. IONOS provides your hosting IP in the control panel. <code>Type: A, Host: @, Points to: 192.0.2.1, TTL: 3600</code></li>
<li><strong>CNAME Record:</strong> Creates an alias pointing to another domain. Used for www subdomain or third-party service integration. Cannot be used on root domain. <code>Type: CNAME, Host: www, Points to: example.com, TTL: 3600</code></li>
<li><strong>MX Record:</strong> Routes email to your mail server. IONOS email uses mx00.ionos.com and mx01.ionos.com with appropriate priorities. <code>Type: MX, Host: @, Mail Server: mx00.ionos.com, Priority: 10, TTL: 3600</code></li>
<li><strong>TXT Record:</strong> Stores text data for SPF authentication, DKIM, DMARC, and domain verification. IONOS SPF uses _spf.perfora.net. <code>Type: TXT, Host: @, Value: v=spf1 include:_spf.perfora.net ~all, TTL: 3600</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not appearing in IONOS:</strong> IONOS DNS typically updates within 1-2 hours. If changes aren't visible, verify you saved the record correctly. Flush your DNS cache and use ReviewMyDNS to check global propagation. IONOS sometimes caches aggressively, so wait at least 2 hours before troubleshooting further.</li>
<li><strong>IONOS email not receiving messages:</strong> Verify MX records point to mx00.ionos.com and mx01.ionos.com. Ensure SPF TXT record includes _spf.perfora.net. Check that no conflicting MX records exist. If using external email (Google Workspace, Microsoft 365), update MX records to those providers' servers.</li>
<li><strong>Cannot find DNS settings in IONOS panel:</strong> IONOS has redesigned their panel several times. Navigate to Domains & SSL > select domain > DNS. If you don't see DNS options, your domain may be using external nameservers. Switch back to IONOS nameservers to manage DNS in their panel.</li>
<li><strong>Website showing IONOS under construction page:</strong> Your A record still points to IONOS default page. Update the @ A record to your hosting server's IP address. If hosting with IONOS, ensure your hosting package is linked to the domain in the control panel.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are IONOS nameservers?</strong> IONOS nameservers are typically ns1081.ui-dns.org and ns1081.ui-dns.com (exact values vary by account). Find your specific nameservers in the IONOS control panel under Domains & SSL > DNS > Nameserver Information.</li>
<li><strong>How long does IONOS DNS propagation take?</strong> IONOS DNS changes typically propagate within 1-2 hours to their authoritative servers. Full global propagation can take up to 24 hours depending on TTL values and ISP DNS caching. Monitor with ReviewMyDNS for real-time propagation status.</li>
<li><strong>Can I use Cloudflare DNS with an IONOS domain?</strong> Yes, you can change your IONOS domain's nameservers to Cloudflare. In the IONOS control panel, go to Domains & SSL > DNS > Nameservers and update to Cloudflare's nameservers. Then manage all DNS records in Cloudflare's dashboard.</li>
<li><strong>Is IONOS DNS the same as 1&1 DNS?</strong> Yes, IONOS is the rebranded name of 1&1 Internet. The DNS management interface is the same service with an updated interface. If you have an older 1&1 account, it has been migrated to IONOS and you can access DNS at my.ionos.com.</li>
</ul>
</section>`,

  '/guides/ovhcloud-dns-setup': `
<section>
<h2>How to Set Up DNS Records on OVHcloud</h2>
<p>OVHcloud is one of Europe's largest cloud and hosting providers, offering domain registration and DNS management for millions of domains. This guide explains how to configure DNS records in OVHcloud's control panel for websites, email, and services.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log Into OVHcloud Control Panel</strong> Access your OVHcloud account.
<ul>
<li>Visit ovh.com/manager and sign in with your NIC handle (customer ID)</li>
<li>Navigate to 'Web Cloud' section from the top menu</li>
<li>Click 'Domain Names' in the left sidebar</li>
<li>Select your domain from the list</li>
</ul>
</li>
<li>
<strong>Access DNS Zone Editor</strong> Navigate to the DNS zone management for your domain.
<ul>
<li>Click the 'DNS Zone' tab in your domain settings</li>
<li>OVHcloud displays all DNS records in a detailed table</li>
<li>You'll see record type, subdomain, TTL, target, and actions columns</li>
<li>Click 'Add an entry' to create a new DNS record</li>
</ul>
</li>
<li>
<strong>Add New DNS Record</strong> Create a custom DNS entry.
<ul>
<li>Select the record type (A, AAAA, CNAME, MX, TXT, SRV, etc.)</li>
<li>Enter the subdomain (leave blank for root domain)</li>
<li>Input the target value (IP address, hostname, or text)</li>
<li>Set TTL (default 3600 seconds)</li>
<li>Click 'Next' and then 'Confirm' to save</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Confirm changes have propagated globally.
<ul>
<li>OVHcloud DNS changes typically propagate within 30 minutes to 4 hours</li>
<li>Click 'Propagation Status' in OVHcloud panel for basic checks</li>
<li>Use ReviewMyDNS for comprehensive global propagation verification</li>
<li>Flush your local DNS cache to see changes immediately</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on OVHcloud</h2>
<ul>
<li><strong>A Record:</strong> Points your domain to an IPv4 address. Leave subdomain blank for root domain or enter a subdomain like www or blog. <code>Type: A, Subdomain: (blank), Target: 192.0.2.1, TTL: 3600</code></li>
<li><strong>CNAME Record:</strong> Creates an alias to another domain. OVHcloud requires a trailing dot on the target domain. Cannot be used on root domain. <code>Type: CNAME, Subdomain: www, Target: example.com., TTL: 3600</code></li>
<li><strong>MX Record:</strong> Routes email to your mail server. OVHcloud email uses mx1.ovh.net, mx2.ovh.net, and mx3.ovh.net with priorities 1, 5, and 10. <code>Type: MX, Subdomain: (blank), Priority: 1, Target: mx1.ovh.net., TTL: 3600</code></li>
<li><strong>TXT Record:</strong> Stores text data for SPF, DKIM, DMARC, and verification. OVHcloud SPF uses mx.ovh.com. <code>Type: TXT, Subdomain: (blank), Target: v=spf1 include:mx.ovh.com ~all, TTL: 3600</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not reflecting after hours:</strong> OVHcloud DNS propagation takes 30 minutes to 4 hours. If still not updated, verify the record was saved correctly in the DNS zone. Check that your domain uses OVHcloud nameservers (dns*.ovh.net). Use ReviewMyDNS to verify global propagation status.</li>
<li><strong>CNAME record target not working:</strong> OVHcloud requires a trailing dot (.) after CNAME target domains (e.g., example.com. instead of example.com). This is a common source of errors. Add the trailing dot and save again.</li>
<li><strong>OVHcloud email delivery issues:</strong> Verify MX records point to mx1.ovh.net, mx2.ovh.net, and mx3.ovh.net. Ensure SPF TXT record includes mx.ovh.com. Add DKIM records if configured. If using external email service, update MX records accordingly.</li>
<li><strong>Cannot modify DNS zone:</strong> If DNS editing is locked, check if your domain has an active DNS zone in OVHcloud. Go to Domain Names > DNS Zone to verify. If using external nameservers, you must manage DNS at that provider instead of OVHcloud.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are OVHcloud's nameservers?</strong> OVHcloud nameservers follow the pattern dns*.ovh.net (e.g., dns19.ovh.net). Your specific nameservers are shown in the OVHcloud control panel under Domain Names > DNS Servers. Use these when pointing your domain to OVHcloud DNS.</li>
<li><strong>How long does OVHcloud DNS propagation take?</strong> OVHcloud updates their DNS servers within 30 minutes typically. Full global propagation takes 1-4 hours for record changes, and 24-48 hours for nameserver changes. Monitor real-time propagation with ReviewMyDNS.</li>
<li><strong>Does OVHcloud support DNSSEC?</strong> Yes, OVHcloud supports DNSSEC for domains registered with them. You can enable it in the control panel under Domain Names > DNSSEC. OVHcloud handles key management automatically when using their nameservers.</li>
<li><strong>Can I transfer DNS management away from OVHcloud?</strong> Yes, change your domain's nameservers to another DNS provider (Cloudflare, Route53, etc.) in the OVHcloud panel under DNS Servers. Once nameservers propagate (24-48 hours), manage DNS at the new provider.</li>
</ul>
</section>`,

  '/guides/gandi-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Gandi</h2>
<p>Gandi is a respected domain registrar and hosting provider known for their 'No Bullshit' philosophy and developer-friendly approach. This guide covers DNS management using Gandi's LiveDNS platform for websites, email, and services.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log Into Gandi Account</strong> Access your Gandi account for DNS management.
<ul>
<li>Visit admin.gandi.net and sign in with your credentials</li>
<li>Click 'Domain' in the left sidebar navigation</li>
<li>Select your domain name from the list</li>
<li>Click 'DNS Records' tab to view your zone</li>
</ul>
</li>
<li>
<strong>Access LiveDNS Zone Editor</strong> Navigate to Gandi's LiveDNS record management.
<ul>
<li>Gandi's LiveDNS shows all DNS records in a clean interface</li>
<li>Records are organized by type with name, TTL, and value columns</li>
<li>You can filter records by type or search for specific entries</li>
<li>Click 'Add Record' button to create a new DNS entry</li>
</ul>
</li>
<li>
<strong>Create DNS Record</strong> Add a new DNS record to your zone.
<ul>
<li>Select record type from dropdown (A, AAAA, CNAME, MX, TXT, SRV, etc.)</li>
<li>Enter the name (use @ for root domain or type subdomain)</li>
<li>Set TTL (default 10800 seconds / 3 hours)</li>
<li>Input the value (IP address, hostname, or text content)</li>
<li>Click 'Create' to save the record</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Confirm your DNS changes have propagated.
<ul>
<li>Gandi LiveDNS updates within 5-15 minutes to their servers</li>
<li>Global propagation typically completes in 1-4 hours</li>
<li>Use ReviewMyDNS to check propagation across global DNS servers</li>
<li>Gandi also provides a basic propagation check in their panel</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Gandi</h2>
<ul>
<li><strong>A Record:</strong> Points your domain to an IPv4 address. Use @ for root domain. Gandi LiveDNS propagates A record changes within minutes. <code>Type: A, Name: @, TTL: 10800, Value: 192.0.2.1</code></li>
<li><strong>CNAME Record:</strong> Creates an alias to another domain. Gandi requires a trailing dot on CNAME targets. Cannot be used on root domain - use ALIAS record instead. <code>Type: CNAME, Name: www, TTL: 10800, Value: example.com.</code></li>
<li><strong>MX Record:</strong> Routes email to mail server. Gandi email uses spool.mail.gandi.net. Add trailing dot after mail server hostname. <code>Type: MX, Name: @, TTL: 10800, Priority: 10, Value: spool.mail.gandi.net.</code></li>
<li><strong>TXT Record:</strong> Stores text for SPF, DKIM, DMARC, and verification. Gandi email SPF uses _mailcust.gandi.net. <code>Type: TXT, Name: @, TTL: 10800, Value: v=spf1 include:_mailcust.gandi.net ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not propagating from Gandi:</strong> Gandi LiveDNS typically updates within 5-15 minutes. If changes aren't visible, verify the record was saved (check for validation errors). Ensure your domain uses Gandi's LiveDNS nameservers. Use ReviewMyDNS to check global propagation status.</li>
<li><strong>CNAME or MX record not resolving:</strong> Gandi requires a trailing dot (.) on hostname targets for CNAME and MX records (e.g., example.com. not example.com). This is a common mistake. Edit the record and add the trailing dot.</li>
<li><strong>Gandi email not working after DNS changes:</strong> Verify MX records point to spool.mail.gandi.net with a trailing dot. Ensure SPF TXT record includes _mailcust.gandi.net. Check DKIM is configured in Gandi email settings. Allow 1-2 hours for email DNS changes to propagate.</li>
<li><strong>Cannot use CNAME on root domain:</strong> Gandi supports ALIAS records for root domains as an alternative to CNAME. Create an ALIAS record type instead of CNAME for the @ hostname. This allows CNAME-like behavior on the root domain.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Gandi's LiveDNS nameservers?</strong> Gandi LiveDNS nameservers follow the ns-*-*.gandi.net pattern (specific values shown in your account). Gandi automatically assigns LiveDNS nameservers when you register or transfer a domain. These are required to manage DNS through Gandi's interface.</li>
<li><strong>How long does Gandi DNS propagation take?</strong> Gandi LiveDNS updates within 5-15 minutes to their authoritative servers. Global propagation typically completes in 1-4 hours. Default TTL is 10800 seconds (3 hours). Lower the TTL before making changes for faster propagation.</li>
<li><strong>Does Gandi support ALIAS records?</strong> Yes, Gandi LiveDNS supports ALIAS records, which allow CNAME-like behavior on root domains. This is useful when services require a CNAME but you need it on the root domain (@). ALIAS records resolve to IP addresses at query time.</li>
<li><strong>Can I use the Gandi DNS API?</strong> Yes, Gandi provides a comprehensive REST API for DNS management at api.gandi.net. You can create, update, and delete DNS records programmatically. Generate an API key in your Gandi account settings under Security.</li>
</ul>
</section>`,

  '/guides/netlify-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Netlify</h2>
<p>Netlify is a popular platform for deploying modern web applications with built-in DNS management. This guide covers how to configure DNS records using Netlify DNS, connect custom domains to your Netlify sites, and set up email and verification records.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access Netlify DNS Settings</strong> Navigate to DNS management in your Netlify dashboard.
<ul>
<li>Log into app.netlify.com with your account</li>
<li>Click 'Domains' in the top navigation menu</li>
<li>Select your domain or click 'Add domain' for a new one</li>
<li>Click 'DNS settings' or 'Go to DNS panel' for your domain</li>
</ul>
</li>
<li>
<strong>Configure Netlify DNS</strong> Set up Netlify as your DNS provider.
<ul>
<li>Netlify provides nameservers (dns1.p0*.nsone.net pattern)</li>
<li>Update your domain registrar's nameservers to Netlify's provided values</li>
<li>Alternatively, use external DNS and add A/CNAME records pointing to Netlify</li>
<li>Netlify auto-configures records for sites deployed on the platform</li>
</ul>
</li>
<li>
<strong>Add Custom DNS Records</strong> Create DNS records for email, verification, and other services.
<ul>
<li>In DNS settings, click 'Add new record'</li>
<li>Select record type (A, AAAA, CNAME, MX, TXT, NS)</li>
<li>Enter hostname (leave blank for root domain or enter subdomain)</li>
<li>Input value and TTL (default 3600 seconds)</li>
<li>Click 'Save' to create the record</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Confirm your DNS changes and SSL provisioning.
<ul>
<li>Netlify DNS changes propagate within 15-30 minutes typically</li>
<li>Netlify automatically provisions Let's Encrypt SSL for connected domains</li>
<li>SSL may take up to 24 hours after DNS propagation</li>
<li>Use ReviewMyDNS to verify DNS propagation across global servers</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Netlify</h2>
<ul>
<li><strong>A Record:</strong> Points root domain to Netlify's load balancer IP. Netlify recommends using their DNS nameservers instead of A records for automatic SSL and CDN optimization. <code>Type: A, Name: (blank), Value: 75.2.60.5, TTL: 3600</code></li>
<li><strong>CNAME Record:</strong> Points subdomain to your Netlify site. Use your-site.netlify.app as the CNAME target. Required if using external DNS instead of Netlify DNS. <code>Type: CNAME, Name: www, Value: your-site.netlify.app, TTL: 3600</code></li>
<li><strong>MX Record:</strong> Routes email to your mail server. Netlify doesn't provide email hosting. Add MX records for Google Workspace, Zoho, or other email providers. <code>Type: MX, Name: (blank), Value: mx.google.com, Priority: 1, TTL: 3600</code></li>
<li><strong>TXT Record:</strong> Stores text for SPF, DKIM, DMARC, and domain verification. Add TXT records for email authentication and third-party service verification. <code>Type: TXT, Name: (blank), Value: v=spf1 include:_spf.google.com ~all, TTL: 3600</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>Custom domain showing 'DNS verification failed':</strong> Ensure your nameservers are updated to Netlify's DNS servers at your registrar. If using external DNS, verify A record points to 75.2.60.5 and CNAME www points to your-site.netlify.app. Use ReviewMyDNS to check propagation status. Allow 24-48 hours for nameserver changes.</li>
<li><strong>SSL certificate not provisioning:</strong> Netlify SSL requires DNS to be fully propagated. Ensure domain is properly connected in Netlify dashboard. Check that no CAA records block Let's Encrypt. If using Netlify DNS, SSL is usually automatic within 24 hours. Try removing and re-adding the domain.</li>
<li><strong>Netlify DNS records conflicting with site:</strong> Netlify automatically creates A and CNAME records for connected sites. If you add manual records that conflict, the site may not resolve correctly. Delete conflicting custom records and let Netlify auto-manage site DNS records.</li>
<li><strong>Email not working with Netlify domain:</strong> Netlify doesn't provide email hosting. Add MX records for your email provider (Google Workspace, Zoho, etc.) in Netlify DNS settings. Add corresponding SPF and DKIM TXT records. Ensure no conflicting MX records exist.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Netlify's DNS nameservers?</strong> Netlify DNS uses NS1-powered nameservers following the pattern dns1.p0*.nsone.net through dns4.p0*.nsone.net. Exact nameservers are shown when you set up Netlify DNS for your domain. These must be configured at your domain registrar.</li>
<li><strong>How long does Netlify DNS propagation take?</strong> Netlify DNS record changes propagate within 15-30 minutes typically. Nameserver changes at your registrar take 24-48 hours. SSL certificate provisioning takes up to 24 hours after DNS propagation. Monitor status with ReviewMyDNS.</li>
<li><strong>Should I use Netlify DNS or external DNS?</strong> Netlify DNS is recommended for sites hosted on Netlify - it enables automatic SSL provisioning, CDN optimization, and branch deploys with subdomains. Use external DNS (Cloudflare, Route53) if you need advanced features like DDoS protection or complex routing rules.</li>
<li><strong>Can I use Netlify DNS without hosting on Netlify?</strong> Yes, Netlify DNS can be used as a standalone DNS service. However, it's optimized for Netlify-hosted sites. For standalone DNS, providers like Cloudflare or Route53 offer more advanced features. Netlify DNS is free and works well for simple DNS needs.</li>
</ul>
</section>`,

  '/guides/shopify-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Shopify</h2>
<p>Shopify is the leading ecommerce platform, and connecting a custom domain requires proper DNS configuration. This guide covers how to set up DNS records for your Shopify store, whether your domain is registered through Shopify or an external registrar.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access Shopify Domain Settings</strong> Navigate to domain management in your Shopify admin.
<ul>
<li>Log into your Shopify admin at admin.shopify.com</li>
<li>Click 'Settings' in the bottom left corner</li>
<li>Select 'Domains' from the settings menu</li>
<li>Click 'Connect existing domain' or manage your Shopify-registered domain</li>
</ul>
</li>
<li>
<strong>Configure DNS at Your Registrar</strong> Add Shopify's required DNS records at your domain registrar.
<ul>
<li>Shopify requires an A record pointing @ to 23.227.38.65</li>
<li>Add a CNAME record for www pointing to shops.myshopify.com</li>
<li>If your domain is registered with Shopify, DNS is managed directly in Shopify admin</li>
<li>For third-party domains, add records at your registrar (GoDaddy, Namecheap, etc.)</li>
</ul>
</li>
<li>
<strong>Verify Domain Connection</strong> Confirm your domain is properly connected to Shopify.
<ul>
<li>Return to Shopify admin > Settings > Domains</li>
<li>Click 'Verify connection' to check DNS records</li>
<li>Shopify verifies A record and CNAME are correctly configured</li>
<li>SSL certificate is automatically provisioned after verification succeeds</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Ensure DNS has propagated globally.
<ul>
<li>Shopify domain verification can take 24-48 hours</li>
<li>SSL certificate provisioning adds another 24 hours after DNS propagates</li>
<li>Use ReviewMyDNS to check DNS propagation status worldwide</li>
<li>Flush your local DNS cache to test changes immediately</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Shopify</h2>
<ul>
<li><strong>A Record:</strong> Points your root domain to Shopify's servers. The IP address 23.227.38.65 is Shopify's standard A record value for all stores. <code>Type: A, Host: @, Value: 23.227.38.65, TTL: 3600</code></li>
<li><strong>CNAME Record:</strong> Points the www subdomain to your Shopify store. This CNAME is required for Shopify to serve your store on the www subdomain. <code>Type: CNAME, Host: www, Value: shops.myshopify.com, TTL: 3600</code></li>
<li><strong>MX Record:</strong> Routes email for your domain. Shopify doesn't provide email hosting - use Google Workspace, Zoho Mail, or another email provider. <code>Type: MX, Host: @, Value: mx.google.com, Priority: 1, TTL: 3600</code></li>
<li><strong>TXT Record:</strong> Used for email authentication (SPF, DKIM, DMARC) and domain verification for third-party services. <code>Type: TXT, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 3600</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>Shopify says domain is not connected:</strong> Verify A record @ points to 23.227.38.65 and CNAME www points to shops.myshopify.com at your domain registrar. DNS propagation can take 24-48 hours. Use ReviewMyDNS to check if records have propagated. Click 'Verify connection' again after propagation.</li>
<li><strong>SSL certificate not provisioning:</strong> Shopify SSL certificates require DNS to be fully propagated first. Ensure A record and CNAME are correct. Wait up to 48 hours after DNS propagation. If SSL still fails, remove and re-add the domain in Shopify admin. Contact Shopify support if issues persist.</li>
<li><strong>Email not working with Shopify domain:</strong> Shopify does not provide email hosting. Set up a third-party email provider (Google Workspace, Zoho, ProtonMail). Add the provider's MX records at your domain registrar or Shopify DNS. Add SPF and DKIM TXT records for email authentication.</li>
<li><strong>Redirect between www and non-www not working:</strong> In Shopify admin > Settings > Domains, set your primary domain (www or root). Shopify automatically redirects the non-primary version. Both A record and CNAME must be correctly configured for redirects to work. Allow 24 hours for changes to take effect.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What DNS records does Shopify need?</strong> Shopify requires two DNS records: an A record for @ (root domain) pointing to 23.227.38.65, and a CNAME record for www pointing to shops.myshopify.com. These are the same for all Shopify stores regardless of your plan.</li>
<li><strong>How long does Shopify domain connection take?</strong> DNS propagation for Shopify typically takes 24-48 hours. After DNS propagates, SSL certificate provisioning adds another 24 hours. Total time from DNS change to fully working HTTPS site is usually 24-72 hours. Monitor with ReviewMyDNS.</li>
<li><strong>Can I use Shopify with a subdomain only?</strong> Yes, you can connect a subdomain (like shop.example.com) to Shopify using a CNAME record pointing to shops.myshopify.com. The root domain stays on your existing website. Configure this in Shopify admin > Settings > Domains > Connect existing domain.</li>
<li><strong>Does Shopify manage DNS automatically?</strong> If your domain is registered through Shopify, DNS is managed automatically and records are pre-configured. For third-party domains, you must manually add Shopify's A record and CNAME at your domain registrar. Shopify provides step-by-step instructions for popular registrars.</li>
</ul>
</section>`,

  '/guides/squarespace-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Squarespace</h2>
<p>Squarespace is a popular website builder that also offers domain registration and DNS management. This guide covers how to configure DNS records for domains registered through Squarespace or connected to a Squarespace site.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access Squarespace Domain Settings</strong> Navigate to DNS settings in your Squarespace account.
<ul>
<li>Log into your Squarespace account at squarespace.com</li>
<li>Click 'Settings' in the left sidebar of your site dashboard</li>
<li>Select 'Domains' from the settings menu</li>
<li>Click on your domain name to open domain settings</li>
</ul>
</li>
<li>
<strong>Open DNS Settings Panel</strong> Access the DNS records editor.
<ul>
<li>Click 'DNS' or 'DNS Settings' in the domain panel</li>
<li>Squarespace shows existing DNS records organized by type</li>
<li>You'll see default records for Squarespace hosting</li>
<li>Click 'Add Record' to create custom DNS entries</li>
</ul>
</li>
<li>
<strong>Add Custom DNS Record</strong> Create a new DNS record.
<ul>
<li>Select record type (A, CNAME, MX, TXT, AAAA)</li>
<li>Enter the Host field (@ for root domain or subdomain name)</li>
<li>Enter the Data/Value field (IP address, hostname, or text)</li>
<li>Set Priority for MX records</li>
<li>Click 'Add' or 'Save' to create the record</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Confirm changes have propagated globally.
<ul>
<li>Squarespace DNS changes typically take 1-4 hours to propagate</li>
<li>Check domain status in Squarespace Settings > Domains</li>
<li>Use ReviewMyDNS to verify propagation across global servers</li>
<li>Some ISPs may cache old records for up to 48 hours</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Squarespace</h2>
<ul>
<li><strong>A Record:</strong> Points domain to an IPv4 address. Squarespace uses specific IP addresses (198.185.159.144 and others) for their hosting. Custom A records can point to external servers. <code>Type: A, Host: @, Data: 198.185.159.144, TTL: Auto</code></li>
<li><strong>CNAME Record:</strong> Creates alias to another domain. Squarespace uses ext-cust.squarespace.com for www subdomain pointing. Custom CNAMEs available for other subdomains. <code>Type: CNAME, Host: www, Data: ext-cust.squarespace.com, TTL: Auto</code></li>
<li><strong>MX Record:</strong> Routes email to mail server. Squarespace doesn't provide email hosting - use Google Workspace or another email provider's MX records. <code>Type: MX, Host: @, Data: mx.google.com, Priority: 1, TTL: Auto</code></li>
<li><strong>TXT Record:</strong> Stores text for domain verification, SPF, DKIM, and DMARC. Used for Google verification, email authentication, and third-party service connections. <code>Type: TXT, Host: @, Data: v=spf1 include:_spf.google.com ~all, TTL: Auto</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>Domain not connecting to Squarespace site:</strong> Ensure you've added Squarespace's required A records (198.185.159.144, 198.185.159.145, 198.49.23.144, 198.49.23.145) and CNAME record (www pointing to ext-cust.squarespace.com). Verify these in Settings > Domains. Allow 24-72 hours for full connection.</li>
<li><strong>SSL certificate not generating:</strong> Squarespace provides free SSL for connected domains. SSL generation requires DNS to fully propagate first (24-72 hours). Ensure all 4 A records and the www CNAME are correctly configured. Contact Squarespace support if SSL doesn't appear after 72 hours.</li>
<li><strong>Email not working with Squarespace domain:</strong> Squarespace doesn't provide email hosting. Set up a third-party email service (Google Workspace recommended by Squarespace). Add the email provider's MX, SPF, and DKIM records in Squarespace DNS settings. Remove any conflicting default MX records.</li>
<li><strong>Custom subdomain not resolving:</strong> Add a CNAME or A record for your subdomain in Squarespace DNS settings. If pointing to an external service, use the CNAME value they provide. Ensure the subdomain doesn't conflict with existing records. Allow 1-4 hours for propagation.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Squarespace's nameservers?</strong> Squarespace uses nameservers like ns1.squarespace.com through ns4.squarespace.com for domains registered through them. If you registered your domain elsewhere, you can either change nameservers to Squarespace's or add individual DNS records at your registrar.</li>
<li><strong>How long does Squarespace DNS propagation take?</strong> Squarespace DNS changes typically propagate within 1-4 hours for record changes. Initial domain connection can take 24-72 hours. SSL certificate generation happens after DNS propagation. Monitor status in Squarespace Settings > Domains or use ReviewMyDNS.</li>
<li><strong>Can I use Squarespace DNS without a Squarespace site?</strong> If your domain is registered through Squarespace, you can manage DNS records even without an active Squarespace website. Point A records to any external hosting provider. However, Squarespace's DNS features are optimized for their own hosting.</li>
<li><strong>Does Squarespace support all DNS record types?</strong> Squarespace supports A, AAAA, CNAME, MX, and TXT records. Some advanced record types (SRV, CAA, NAPTR) are not supported. If you need unsupported record types, consider transferring DNS management to a provider like Cloudflare.</li>
</ul>
</section>`,

  '/guides/vercel-dns-setup': `
<section>
<h2>How to Set Up DNS Records on Vercel</h2>
<p>Vercel is a leading platform for deploying frontend frameworks and serverless functions, with built-in DNS and domain management. This guide covers how to configure DNS records on Vercel, connect custom domains to your deployments, and set up email and verification records.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access Vercel Domain Settings</strong> Navigate to domain management in your Vercel dashboard.
<ul>
<li>Log into vercel.com/dashboard with your account</li>
<li>Select your project from the dashboard</li>
<li>Click 'Settings' tab, then 'Domains' in the left menu</li>
<li>Or go to account Settings > Domains for account-level domain management</li>
</ul>
</li>
<li>
<strong>Add Custom Domain to Project</strong> Connect your domain to a Vercel deployment.
<ul>
<li>Click 'Add Domain' and enter your domain name</li>
<li>Vercel shows required DNS records for connection</li>
<li>Choose between Vercel nameservers or adding individual records at your registrar</li>
<li>For Vercel nameservers: ns1.vercel-dns.com and ns2.vercel-dns.com</li>
</ul>
</li>
<li>
<strong>Configure DNS Records</strong> Add required DNS records at your domain registrar.
<ul>
<li>Add A record for @ pointing to 76.76.21.21</li>
<li>Add CNAME record for www pointing to cname.vercel-dns.com</li>
<li>If using Vercel DNS, add custom records in Vercel dashboard under Domains > DNS Records</li>
<li>MX and TXT records can be added for email and verification</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Confirm domain connection and SSL provisioning.
<ul>
<li>Vercel automatically checks DNS configuration and shows status</li>
<li>SSL certificates are provisioned automatically after DNS propagation</li>
<li>Vercel shows green checkmark when domain is fully connected</li>
<li>Use ReviewMyDNS to verify DNS propagation across global servers</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Vercel</h2>
<ul>
<li><strong>A Record:</strong> Points root domain to Vercel's edge network. The IP 76.76.21.21 is Vercel's standard A record value for all projects. <code>Type: A, Host: @, Value: 76.76.21.21, TTL: 3600</code></li>
<li><strong>CNAME Record:</strong> Points www subdomain to Vercel's DNS. Use cname.vercel-dns.com as the target. This enables Vercel's edge network and automatic SSL. <code>Type: CNAME, Host: www, Value: cname.vercel-dns.com, TTL: 3600</code></li>
<li><strong>MX Record:</strong> Routes email to your mail server. Vercel doesn't provide email hosting. Add MX records for Google Workspace, Zoho, or other email providers. <code>Type: MX, Host: @, Value: mx.google.com, Priority: 1, TTL: 3600</code></li>
<li><strong>TXT Record:</strong> Stores text for SPF, DKIM, DMARC, and domain verification. Add TXT records for email authentication and third-party services. <code>Type: TXT, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 3600</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>Vercel showing 'Invalid Configuration' for domain:</strong> Verify A record @ points to 76.76.21.21 and CNAME www points to cname.vercel-dns.com at your registrar. DNS propagation can take up to 48 hours. Check ReviewMyDNS for propagation status. If using Vercel nameservers, ensure registrar has ns1.vercel-dns.com and ns2.vercel-dns.com.</li>
<li><strong>SSL certificate not generating:</strong> Vercel auto-provisions SSL after DNS propagation. Ensure DNS records are correct and fully propagated. Check for CAA records that might block certificate issuance. If SSL doesn't appear after 48 hours, remove the domain and re-add it in Vercel dashboard.</li>
<li><strong>Deployment not showing on custom domain:</strong> Verify the domain is assigned to the correct Vercel project in Settings > Domains. Check that the production branch has a successful deployment. Ensure DNS records point to Vercel (not a previous hosting provider). Clear browser cache and try incognito mode.</li>
<li><strong>Email not working with Vercel domain:</strong> Vercel doesn't provide email hosting. If using Vercel DNS, add MX records in the Vercel dashboard under Domains > DNS Records. If using external DNS, add MX records at your registrar. Include SPF and DKIM TXT records for email authentication.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Vercel's nameservers?</strong> Vercel's nameservers are ns1.vercel-dns.com and ns2.vercel-dns.com. Set these at your domain registrar to use Vercel DNS for full DNS management. Alternatively, keep your existing DNS provider and add individual A/CNAME records.</li>
<li><strong>How long does Vercel DNS propagation take?</strong> Vercel DNS record changes propagate within minutes when using Vercel DNS. For external DNS changes, propagation takes 1-48 hours depending on your registrar and TTL values. Vercel shows real-time connection status in the dashboard. Use ReviewMyDNS for global verification.</li>
<li><strong>Should I use Vercel DNS or external DNS?</strong> Vercel DNS is recommended for simplicity - it auto-configures records for your deployments and handles SSL automatically. Use external DNS (Cloudflare, Route53) if you need advanced features like DDoS protection, geo-routing, or if you have many non-Vercel services on the domain.</li>
<li><strong>What IP address does Vercel use for A records?</strong> Vercel uses 76.76.21.21 as the standard A record IP for all projects. This IP routes to Vercel's global edge network. For IPv6, Vercel also supports AAAA records - check Vercel documentation for the current IPv6 address.</li>
</ul>
</section>`,

  '/guides/godaddy-dns-setup': `
<section>
<h2>How to Configure DNS Records on GoDaddy</h2>
<p>GoDaddy is one of the world's largest domain registrars, hosting millions of domains. This tutorial shows you how to manage DNS records in GoDaddy's domain management panel, from pointing your domain to web hosting to setting up email with MX records.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access GoDaddy Domain Management</strong> Log into your GoDaddy account at sso.godaddy.com.
<ul>
<li>Navigate to 'My Products' from the main menu</li>
<li>Find your domain in the 'Domains' section</li>
<li>Click the domain name or click 'Manage' button</li>
<li>Select 'DNS' from the domain settings tabs</li>
</ul>
</li>
<li>
<strong>Navigate to DNS Management</strong> In the DNS management section, you'll see all existing records.
<ul>
<li>GoDaddy shows A, CNAME, MX, TXT, and other record types in separate tabs or a single list</li>
<li>Default records include domain parking or GoDaddy hosting if set up</li>
<li>You can add, edit, or delete records from this interface</li>
</ul>
</li>
<li>
<strong>Add New DNS Record</strong> Click 'Add' or 'Add Record' button to create a new DNS entry.
<ul>
<li>Select record type from dropdown menu</li>
<li>Enter host/name (use @ for root domain)</li>
<li>Input the points to/value field (IP address, hostname, or text)</li>
<li>Set TTL (default is 1 hour, can be customized from 30 minutes to 1 day)</li>
<li>Click 'Save' to create the record</li>
</ul>
</li>
<li>
<strong>Verify and Test Changes</strong> DNS changes on GoDaddy can take up to 48 hours to propagate globally.
<ul>
<li>GoDaddy typically updates within 1 hour, but global propagation varies</li>
<li>Use ReviewMyDNS to check propagation status across global DNS servers</li>
<li>Flush your local DNS cache to see changes faster on your computer</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on GoDaddy</h2>
<ul>
<li><strong>A Record:</strong> Points your domain to an IPv4 address. Use @ for root domain (example.com) or enter subdomain name like 'www' or 'blog'. <code>Type: A, Host: @, Points to: 192.0.2.1, TTL: 1 Hour</code></li>
<li><strong>CNAME Record:</strong> Creates an alias for another domain name. Commonly used to point www to your root domain or configure third-party services. Cannot be used on root domain (@). <code>Type: CNAME, Host: www, Points to: example.com, TTL: 1 Hour</code></li>
<li><strong>MX Record:</strong> Routes email to your mail server. Add multiple MX records with different priorities for redundancy (lower number = higher priority). Common for Google Workspace, Microsoft 365. <code>Type: MX, Host: @, Points to: mail.example.com, Priority: 10, TTL: 1 Hour</code></li>
<li><strong>TXT Record:</strong> Stores text information for domain verification, SPF records for email authentication, DKIM keys, and DMARC policies. Essential for email deliverability. <code>Type: TXT, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 1 Hour</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not visible after 1 hour:</strong> GoDaddy DNS can take up to 48 hours for complete global propagation, though changes typically appear within 1-4 hours. Clear your browser cache and flush DNS (ipconfig /flushdns). Use our DNS propagation checker to see which servers have updated.</li>
<li><strong>Cannot add CNAME for root domain (@):</strong> CNAME records cannot be set on root domains due to DNS protocol limitations. Instead, use an A record pointing to your server's IP address. Some providers offer CNAME flattening, but GoDaddy requires A records for root domains.</li>
<li><strong>Email stops working after DNS changes:</strong> Ensure you didn't accidentally delete existing MX records when making changes. Email requires MX records pointing to your mail server, plus SPF and DKIM TXT records. Verify all email-related DNS records are present and correct. Email propagation can take 2-6 hours.</li>
<li><strong>Website shows GoDaddy parking page instead of my site:</strong> This means your A record isn't pointing to your web hosting IP address. Verify the IP address is correct (check with your hosting provider). Remove or edit any existing parking page A records. Changes may take 30 minutes to 2 hours to reflect.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What TTL should I set for my GoDaddy DNS records?</strong> GoDaddy's default TTL of 1 hour (3600 seconds) is suitable for most situations. Use 30 minutes (1800 seconds) if you're making frequent DNS changes or testing configurations. Higher TTL values (4-8 hours) reduce DNS query load but slow down future changes.</li>
<li><strong>How long does GoDaddy DNS propagation take?</strong> GoDaddy states DNS changes can take up to 48 hours to propagate globally, though most changes complete within 1-4 hours. Propagation time depends on your previous TTL settings and local DNS server caching policies. Use our global DNS checker to monitor real-time propagation status.</li>
<li><strong>Can I use external nameservers instead of GoDaddy's DNS?</strong> Yes! You can change your domain's nameservers to external DNS providers like Cloudflare, Route53, or custom nameservers. In your domain settings, click 'Nameservers' > 'Change' > 'I'll use my own nameservers'. Note that changing nameservers takes 24-48 hours to propagate fully.</li>
<li><strong>Why is there an @ symbol in DNS records?</strong> The @ symbol represents your root domain (example.com without any subdomain). Using @ in the Host field creates a DNS record for the bare domain. Use specific text (like 'www', 'mail', 'blog') to create subdomain records (www.example.com, mail.example.com).</li>
</ul>
</section>`,

  '/guides/bluehost-dns-setup': `
<section>
<h2>How to Configure DNS Records on Bluehost</h2>
<p>Bluehost is one of the most popular web hosting providers, powering millions of websites worldwide. This guide shows you how to manage DNS records in Bluehost's control panel, whether you're hosting email, adding subdomains, or integrating third-party services.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log into Bluehost Control Panel</strong> Access your Bluehost account at my.bluehost.com.
<ul>
<li>Click on 'Domains' in the left sidebar navigation</li>
<li>Select the domain you want to manage from the domains list</li>
<li>Click 'Manage' next to the domain name</li>
<li>Navigate to the 'DNS' tab or 'Advanced' section</li>
</ul>
</li>
<li>
<strong>Access DNS Zone Editor</strong> Find the DNS management section in your domain settings.
<ul>
<li>Look for 'Zone Editor' or 'DNS Zone Editor' in the advanced settings</li>
<li>You'll see existing DNS records in a table format</li>
<li>Common default records include A records, MX records, and CNAME records</li>
<li>Bluehost may show simplified or advanced editor options</li>
</ul>
</li>
<li>
<strong>Add New DNS Record</strong> Click 'Add Record' or the + button to create a new DNS entry.
<ul>
<li>Select record type from dropdown (A, AAAA, CNAME, MX, TXT, etc.)</li>
<li>Enter Host/Name (use @ for root domain, or subdomain like www, mail)</li>
<li>Input Points To/Value (IP address, hostname, or text content)</li>
<li>Set TTL if available (typically 14400 seconds default)</li>
<li>For MX records, also enter Priority value (lower = higher priority)</li>
<li>Click 'Save' or 'Add Record' to create the entry</li>
</ul>
</li>
<li>
<strong>Verify DNS Propagation</strong> Wait for DNS changes to propagate globally.
<ul>
<li>Bluehost DNS updates typically take 4-24 hours to propagate</li>
<li>Changes appear on Bluehost servers within 1-2 hours</li>
<li>Global propagation depends on TTL values and DNS caching</li>
<li>Use ReviewMyDNS to check real-time propagation across worldwide DNS servers</li>
<li>Clear your browser cache and flush DNS for immediate local testing</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Bluehost</h2>
<ul>
<li><strong>A Record:</strong> Points your domain to an IPv4 address. Use @ for root domain (example.com) or enter subdomain (www, blog, shop). Required to connect your domain to Bluehost or external hosting servers. <code>Host: @, Type: A, Points To: 192.0.2.1, TTL: 14400</code></li>
<li><strong>CNAME Record:</strong> Creates an alias pointing to another domain. Commonly used for www subdomain or third-party services. Cannot be used on root domain (@) - use A record instead. Bluehost often pre-configures www CNAME. <code>Host: www, Type: CNAME, Points To: example.com, TTL: 14400</code></li>
<li><strong>MX Record:</strong> Routes email to mail servers. Priority determines order (lower number = higher priority). Add multiple MX records for backup mail servers. Essential for email delivery with Bluehost email or external providers like Google Workspace. <code>Host: @, Type: MX, Points To: mail.example.com, Priority: 10, TTL: 14400</code></li>
<li><strong>TXT Record:</strong> Stores text data for SPF email authentication, domain verification, DKIM keys, and DMARC policies. Critical for email deliverability and security. Used to verify domain ownership with third-party services. <code>Host: @, Type: TXT, Value: v=spf1 include:_spf.google.com ~all, TTL: 14400</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not showing after 24 hours:</strong> Bluehost DNS can take up to 24-48 hours for complete global propagation. Verify changes were saved correctly in the Zone Editor. Check if your domain is using Bluehost nameservers (not external). Flush your local DNS cache and try from different devices/networks. Use our DNS propagation tool to identify which servers haven't updated.</li>
<li><strong>Website down after changing A record:</strong> Verify the new A record IP address is correct (check with your hosting provider). Ensure you updated the @ (root) A record and www CNAME if needed. Bluehost's default A record points to your hosting account - changing it redirects traffic. If using Bluehost hosting, use the IP from cPanel. Changes can take 4-12 hours to propagate.</li>
<li><strong>Email not working after DNS changes:</strong> Check that MX records point to correct mail servers (mail.example.com or Bluehost's mail servers). Bluehost email requires specific MX records - verify values in cPanel under Email Routing. Ensure SPF and DKIM TXT records exist if using Bluehost email. Email propagation takes 2-6 hours. Don't delete default email records unless migrating to external email.</li>
<li><strong>SSL certificate errors after updating DNS:</strong> Bluehost provides free SSL certificates, but they need time to generate for new domains or subdomains. Wait 24 hours after DNS changes for SSL to activate. In cPanel, go to SSL/TLS Status to force certificate installation. Ensure your domain is pointing to Bluehost nameservers for automatic SSL.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are Bluehost's default nameservers?</strong> Bluehost typically assigns nameservers like ns1.bluehost.com and ns2.bluehost.com (exact values vary). Find your specific nameservers in Bluehost account under Domains > Nameservers. These must be set at your domain registrar for Bluehost DNS management to work. Nameserver changes take 24-48 hours to propagate globally.</li>
<li><strong>How long does Bluehost DNS propagation take?</strong> Bluehost states DNS changes can take 24-48 hours for complete global propagation. Most changes appear within 4-12 hours. Propagation time varies based on your previous TTL settings and local ISP DNS caching. Use our global DNS propagation checker to monitor real-time status across worldwide servers.</li>
<li><strong>Should I use Bluehost DNS or external DNS like Cloudflare?</strong> Bluehost DNS is sufficient for most websites and integrates seamlessly with Bluehost hosting. External DNS like Cloudflare offers faster global resolution, DDoS protection, and advanced features but requires managing DNS separately. If using Bluehost hosting with basic needs, their DNS is fine. For high-traffic sites or advanced security, consider Cloudflare.</li>
<li><strong>Can I manage DNS if my domain is registered elsewhere?</strong> Yes! You can use Bluehost DNS even if your domain is registered at GoDaddy, Namecheap, etc. Point your domain registrar's nameservers to Bluehost's nameservers (found in your Bluehost account). After 24-48 hours propagation, manage all DNS records in Bluehost cPanel. You keep domain registration at original registrar but use Bluehost for DNS and hosting.</li>
</ul>
</section>`,

  '/guides/nxdomain-error-fix': `
<section>
<h2>Fix NXDOMAIN DNS Error: Complete Troubleshooting Guide</h2>
<p>NXDOMAIN (Non-Existent Domain) is one of the most common DNS errors, occurring when your domain name cannot be found in DNS servers. This guide explains what causes NXDOMAIN errors and provides step-by-step solutions to get your domain working again.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Verify Domain Registration</strong> Ensure your domain is properly registered and hasn't expired.
<ul>
<li>Check your domain registrar account (GoDaddy, Namecheap, etc.)</li>
<li>Verify domain registration status is 'Active' not 'Expired' or 'Suspended'</li>
<li>Renew domain if it expired recently</li>
<li>Check domain registrar inbox for auto-renewal failure notifications</li>
</ul>
</li>
<li>
<strong>Check Nameservers Are Correct</strong> NXDOMAIN often means nameservers point to wrong DNS provider.
<ul>
<li>Log into domain registrar and check current nameservers</li>
<li>Verify they match your DNS provider's nameservers</li>
<li>If using custom DNS (Cloudflare, Route53), ensure nameservers are updated at registrar</li>
<li>Nameserver changes take 24-48 hours to propagate</li>
</ul>
</li>
<li>
<strong>Wait for DNS Propagation</strong> Recent nameserver changes need time to propagate globally.
<ul>
<li>After updating nameservers, wait 24-48 hours minimum</li>
<li>Some ISPs cache DNS longer than others</li>
<li>Use ReviewMyDNS to check propagation status across servers</li>
<li>If nameservers changed recently, NXDOMAIN will resolve after propagation</li>
</ul>
</li>
<li>
<strong>Add DNS Records</strong> Ensure A records exist for your domain.
<ul>
<li>Log into DNS provider dashboard</li>
<li>Add A record for @ (root domain) pointing to your server IP</li>
<li>Add A record for www pointing to same IP or CNAME to root</li>
<li>Wait 15-30 minutes for records to propagate</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on NXDOMAIN Error</h2>
<ul>
<li><strong>A Record Missing:</strong> NXDOMAIN often occurs when no A records exist. Add A record with @ as hostname and your server IP. This creates the root domain in DNS. <code>Symptom: No A or AAAA records exist for @ (root domain)</code></li>
<li><strong>Nameserver Issue:</strong> Registrar nameservers must point to your DNS provider. Mismatch causes NXDOMAIN. Update registrar nameservers to match DNS provider. <code>Nameservers at registrar don't match DNS provider nameservers</code></li>
<li><strong>Expired Domain:</strong> Expired domains are removed from DNS and return NXDOMAIN. Renew domain immediately at registrar. Takes 1-4 hours to restore. <code>Domain registration expired without auto-renewal</code></li>
<li><strong>Propagation Delay:</strong> Nameserver changes take 24-48 hours. Use DNS propagation checker to see if some servers still show NXDOMAIN while others have updated. <code>Recent nameserver change still propagating globally</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>NXDOMAIN persists even after adding A records:</strong> Verify your A record points to correct IP (check with hosting provider). Ensure nameservers at registrar match DNS provider. If recently changed, wait additional 12-24 hours. Use 'nslookup domain.com' command to test from different DNS servers. Check if domain registration actually active (not suspended).</li>
<li><strong>DNS worked before, now showing NXDOMAIN:</strong> Check if domain registration expired or was not renewed. Verify DNS provider account is active and billing current. Check if nameservers were accidentally changed. Review recent DNS changes - you may have deleted critical records. Use DNS history if available.</li>
<li><strong>Subdomain returns NXDOMAIN but root domain works:</strong> Add A or CNAME record for subdomain. For example, if www.example.com shows NXDOMAIN, add CNAME record 'www' pointing to 'example.com' or A record 'www' pointing to IP. Root domain DNS must exist first.</li>
<li><strong>NXDOMAIN from some servers, works on others:</strong> DNS hasn't fully propagated yet. Different servers have different TTL values and update schedules. This is normal after changes. Wait 24-48 hours for complete global propagation. Use our global DNS checker to monitor which servers have updated.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What exactly does NXDOMAIN mean?</strong> NXDOMAIN (Non-Existent Domain) means the authoritative DNS server received a query for a domain that doesn't exist in its database. It's the DNS server saying 'I don't have any records for that domain.' This happens when A records are missing or nameservers are misconfigured.</li>
<li><strong>How long to fix NXDOMAIN after registering domain?</strong> New domain registration takes 24-48 hours for DNS to propagate globally. Your registrar automatically creates nameserver records, but ISP and resolver caching delays visibility. After 4-6 hours most people can resolve it. Full 24-48 hours ensures 99% of worldwide resolvers show it.</li>
<li><strong>Can I fix NXDOMAIN if my domain expired?</strong> Yes! Renew expired domain immediately at your registrar. DNS records are usually preserved during renewal. Within 1-4 hours of renewal, NXDOMAIN should resolve. If records were deleted during expiration, re-add them. Most registrars hold expired domains for 30 days before permanent deletion.</li>
<li><strong>Will NXDOMAIN hurt my SEO?</strong> If NXDOMAIN persists for days/weeks, Google stops indexing your site. However, if resolved within 24-48 hours, SEO impact is minimal. Google's crawler will retry and re-index once domain works. Frequent NXDOMAIN errors can eventually harm rankings if they last weeks, so fix promptly.</li>
</ul>
</section>`,

  '/guides/dmarc-authentication-failed': `
<section>
<h2>Fix DMARC Authentication Failed: Email Security Setup</h2>
<p>DMARC (Domain-based Message Authentication, Reporting and Conformance) authentication failures occur when SPF or DKIM fail. This guide helps diagnose and fix DMARC issues to improve email deliverability and security.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Verify SPF Record Exists</strong> DMARC requires SPF authentication to pass.
<ul>
<li>Check your domain's SPF record (TXT record starting with 'v=spf1')</li>
<li>SPF must include authorized mail servers</li>
<li>SPF must align with email 'From:' domain</li>
<li>If SPF missing or broken, DMARC fails</li>
</ul>
</li>
<li>
<strong>Verify DKIM Signature</strong> DMARC requires DKIM authentication to pass.
<ul>
<li>Check DKIM TXT records exist (e.g., 'selector1._domainkey.example.com')</li>
<li>Email provider gives you DKIM selector and public key</li>
<li>Add DKIM TXT record to your DNS</li>
<li>If DKIM missing or incorrectly configured, DMARC fails</li>
</ul>
</li>
<li>
<strong>Create DMARC Policy Record</strong> Add DMARC TXT record to your domain.
<ul>
<li>Create TXT record named '_dmarc' with value like 'v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com'</li>
<li>p=none (monitoring only, don't reject emails) for initial setup</li>
<li>p=quarantine (send failing emails to spam) after testing</li>
<li>p=reject (reject failing emails) only after fully validated</li>
</ul>
</li>
<li>
<strong>Monitor DMARC Reports</strong> Review DMARC reports to identify issues.
<ul>
<li>DMARC sends daily reports to email in 'rua=' tag</li>
<li>Reports show SPF/DKIM pass/fail rates</li>
<li>Identify which services are failing authentication</li>
<li>Adjust SPF/DKIM configuration based on report insights</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on DMARC Authentication Failed</h2>
<ul>
<li><strong>DMARC Policy Record (Monitoring):</strong> p=none means don't reject emails, just monitor. Use this for initial DMARC setup to see authentication results without blocking email. <code>Type: TXT, Host: _dmarc, Value: v=DMARC1; p=none; rua=mailto:dmarc@example.com</code></li>
<li><strong>DMARC Policy Record (Quarantine):</strong> p=quarantine sends failing emails to spam folder. Use after validating SPF/DKIM working correctly. fo=1 sends daily reports for failures. <code>Type: TXT, Host: _dmarc, Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com; fo=1</code></li>
<li><strong>DMARC Policy Record (Reject):</strong> p=reject blocks emails failing DMARC. Only use after fully validated. pct=100 rejects 100% of failing emails. Start at pct=10 and gradually increase. <code>Type: TXT, Host: _dmarc, Value: v=DMARC1; p=reject; rua=mailto:dmarc@example.com; pct=100</code></li>
<li><strong>DKIM TXT Record:</strong> DKIM public key provided by email provider. 'selector1' name varies by provider (Google Workspace uses selector1, others may vary). Required for DMARC to verify signatures. <code>Type: TXT, Host: selector1._domainkey, Value: v=DKIM1; k=rsa; p=MIGfMA0BgkqhkiG9w0BAQ...</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DMARC reports show 0% SPF/DKIM pass rate:</strong> SPF or DKIM not configured correctly. Check SPF TXT record exists and includes all mail servers. Verify DKIM TXT record matches provider's public key exactly. Ensure 'From:' domain in emails matches domain with SPF/DKIM. Test with DMARC analyzer tool.</li>
<li><strong>Some emails pass DMARC, others fail:</strong> Different email services may not be included in SPF. Check which services are failing in DMARC reports and add their SPF includes. Verify DKIM is enabled for all email sources. Some services may not support DKIM alignment.</li>
<li><strong>DMARC p=reject breaking legitimate emails:</strong> Revert to p=quarantine or p=none while debugging. Review DMARC reports to identify which senders are failing. Add their SPF includes or enable DKIM for those services. Test thoroughly before re-enabling p=reject.</li>
<li><strong>DMARC records show inconsistent alignment:</strong> SPF/DKIM alignment requires domain in SPF/DKIM records matches domain in email 'From:' header. Check if using subdomain for email vs different domain. Align domain consistently across email configuration and SPF/DKIM records.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>Do I need DMARC if I have SPF and DKIM?</strong> DMARC policy tells receiving servers what to do when SPF/DKIM fails. Without DMARC, servers use their own judgment (often send to spam). DMARC enforces your policy. SPF and DKIM are authentication mechanisms; DMARC is the enforcement policy on top of them.</li>
<li><strong>What's the difference between p=none, p=quarantine, p=reject?</strong> p=none: Monitor only, no action taken on failures. p=quarantine: Send failing emails to spam/junk folder. p=reject: Block and reject failing emails entirely. Start with p=none, graduate to quarantine after validation, finally to reject after full confidence.</li>
<li><strong>How long to fix DMARC issues?</strong> DMARC TXT records take effect immediately (or within 15-30 minutes depending on DNS propagation). However, DMARC reports take 24 hours to generate. You'll see first authentication results tomorrow. Fixing underlying SPF/DKIM takes 15-30 minutes per fix.</li>
<li><strong>Can DMARC reject legitimate emails?</strong> Yes, if SPF/DKIM not properly configured, legitimate emails from your domain can fail and be rejected. Always start with p=none to monitor before enforcing rejection. Test thoroughly with DMARC analyzer before using p=reject.</li>
</ul>
</section>`,

  '/guides/hostgator-dns-setup': `
<section>
<h2>How to Set Up DNS Records on HostGator</h2>
<p>HostGator is one of the largest web hosting providers serving millions of customers. This guide shows how to manage DNS records in HostGator's control panel.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Access HostGator Control Panel</strong> Log into your HostGator account.
<ul>
<li>Visit login.hostgator.com with email/password</li>
<li>Click 'Manage My Domains'</li>
<li>Select your domain from the list</li>
<li>Click 'Manage Domain' or 'DNS Management'</li>
</ul>
</li>
<li>
<strong>Navigate to Zone Editor</strong> Find DNS records section.
<ul>
<li>In domain management, find 'Zone Editor' or 'DNS Zone'</li>
<li>HostGator displays records in table format</li>
<li>Default records include HostGator nameservers and hosting A records</li>
<li>You can add, edit, or delete records</li>
</ul>
</li>
<li>
<strong>Add or Edit DNS Records</strong> Create or modify DNS entries.
<ul>
<li>Click 'Add New Record' to create entry</li>
<li>Select record type (A, CNAME, MX, TXT, etc.)</li>
<li>Enter hostname and value</li>
<li>Set TTL (default usually fine)</li>
<li>Click 'Save' to apply</li>
</ul>
</li>
<li>
<strong>Verify Propagation</strong> Wait for changes to take effect.
<ul>
<li>HostGator updates within 1-2 hours typically</li>
<li>Global propagation: 4-24 hours</li>
<li>Use DNS checker to verify worldwide</li>
<li>Some delays are normal due to caching</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on HostGator</h2>
<ul>
<li><strong>A Record:</strong> Points domain to hosting IP. HostGator provides your hosting IP address. <code>Name: @, Type: A, Value: 192.0.2.1, TTL: 14400</code></li>
<li><strong>MX Record:</strong> Routes email to mail server. HostGator email needs specific MX records. <code>Name: @, Type: MX, Priority: 10, Value: mail.hostgator.com</code></li>
<li><strong>CNAME Record:</strong> Subdomain alias. HostGator typically pre-configures www CNAME. <code>Name: www, Type: CNAME, Value: example.com</code></li>
<li><strong>TXT Record:</strong> Email authentication, SPF, DKIM, DMARC, domain verification. <code>Name: @, Type: TXT, Value: v=spf1 include:_spf.hostgator.com ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not appearing:</strong> HostGator updates within 1-2 hours. Global propagation takes 4-24 hours. Flush DNS cache on your device. Verify changes saved correctly in Zone Editor.</li>
<li><strong>Website showing HostGator default page:</strong> A record still pointing to parking or old IP. Check A record @ points to correct hosting IP. Save changes and wait 1-2 hours.</li>
<li><strong>HostGator email not working:</strong> Verify MX records match HostGator email configuration. Add SPF record if required. Check HostGator's email documentation for correct values.</li>
<li><strong>SSL certificate errors:</strong> HostGator provides free SSL via AutoSSL. Ensure domain points to HostGator hosting. Force AutoSSL renewal through cPanel. May take up to 24 hours.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are HostGator's nameservers?</strong> HostGator nameservers shown in account. Usually ns1.hostgator.com, ns2.hostgator.com pattern. Use when pointing domain from another registrar.</li>
<li><strong>Can I use external DNS with HostGator?</strong> Yes, change nameservers at your registrar to external provider (Cloudflare, etc.). Then manage DNS there. HostGator hosting works with any nameservers.</li>
<li><strong>How long HostGator DNS propagation?</strong> HostGator servers update 1-2 hours. Global propagation: 4-24 hours typical. Depends on TTL and ISP caching.</li>
<li><strong>Can I manage DNS for domain registered elsewhere?</strong> Yes, change nameservers at registrar to HostGator nameservers. Then manage DNS in HostGator account.</li>
</ul>
</section>`,

  '/guides/namesilo-dns-setup': `
<section>
<h2>How to Configure DNS Records on NameSilo</h2>
<p>NameSilo is an affordable domain registrar offering competitive pricing and full DNS control. This guide shows how to manage DNS records in NameSilo's control panel.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Log Into NameSilo Account</strong> Access your NameSilo domain management.
<ul>
<li>Visit namesilo.com and sign in</li>
<li>Click 'Manage My Domains'</li>
<li>Find your domain and click 'Manage Domain'</li>
<li>Select 'Advanced DNS' tab</li>
</ul>
</li>
<li>
<strong>View DNS Records</strong> Review current DNS configuration.
<ul>
<li>NameSilo displays all DNS records</li>
<li>Default includes parking and nameserver records</li>
<li>Click 'Add DNS Record' to create new entry</li>
<li>Existing records can be edited or deleted</li>
</ul>
</li>
<li>
<strong>Add DNS Record</strong> Create custom DNS entry.
<ul>
<li>Select record type (A, CNAME, MX, TXT, etc.)</li>
<li>Enter hostname and value</li>
<li>TTL defaults to 7200 seconds</li>
<li>Click 'Submit' to save</li>
</ul>
</li>
<li>
<strong>Verify Propagation</strong> DNS updates globally within hours.
<ul>
<li>NameSilo updates within 15 minutes</li>
<li>Global propagation: 1-4 hours typical</li>
<li>Use DNS checker to verify status</li>
<li>Check from multiple servers</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on NameSilo</h2>
<ul>
<li><strong>A Record:</strong> Points domain to IPv4 address <code>Host: @, Type: A, Value: 192.0.2.1, TTL: 7200</code></li>
<li><strong>MX Record:</strong> Routes email to mail server <code>Host: @, Type: MX, Value: mail.example.com, Priority: 10</code></li>
<li><strong>CNAME Record:</strong> Creates domain alias for subdomains <code>Host: www, Type: CNAME, Value: example.com</code></li>
<li><strong>TXT Record:</strong> Email authentication and verification records <code>Host: @, Type: TXT, Value: v=spf1 include:_spf.google.com ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS changes not appearing:</strong> NameSilo updates within 15 minutes to their servers. Wait 1-4 hours for global propagation. Flush your DNS cache.</li>
<li><strong>Website showing parking page:</strong> A record @ still points to parking IP. Update A record to your hosting provider's IP address.</li>
<li><strong>Email not working:</strong> Verify MX records are correct. Add SPF and DKIM TXT records. Check email provider documentation.</li>
<li><strong>Cannot add CNAME for root:</strong> Use A record instead. DNS protocol doesn't allow CNAME on root domain.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>What are NameSilo's nameservers?</strong> NameSilo provides their own nameservers. Check your domain settings for specific nameserver values to use for external DNS.</li>
<li><strong>How long NameSilo DNS propagation takes?</strong> NameSilo updates within 15 minutes. Global propagation: 1-4 hours typical. Full propagation up to 48 hours in rare cases.</li>
<li><strong>Can I use external DNS with NameSilo domain?</strong> Yes, change nameservers at NameSilo to external provider nameservers. Then manage DNS at external provider.</li>
<li><strong>Is NameSilo DNS reliable?</strong> Yes, NameSilo provides reliable DNS service with no additional cost included with domain registration.</li>
</ul>
</section>`,

  '/guides/email-delivery-debugging-dns': `
<section>
<h2>Fix Email Delivery Problems: Complete DNS Debugging Guide</h2>
<p>Email delivery failures are often caused by DNS misconfigurations. This comprehensive guide helps diagnose and fix DNS issues preventing emails from reaching recipients.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Check MX Records</strong> Verify mail server DNS records exist and are correct.
<ul>
<li>Use DNS lookup tool to check @ MX records</li>
<li>Verify MX records point to correct mail server hostname</li>
<li>Ensure mail server hostname has corresponding A record pointing to IP</li>
<li>Check MX priority values are set correctly</li>
</ul>
</li>
<li>
<strong>Verify SPF Record</strong> SPF authenticates your domain and prevents spoofing.
<ul>
<li>Check that @ TXT record starts with 'v=spf1'</li>
<li>Ensure all mail servers are included via IP, hostname, or 'include:' directives</li>
<li>Verify SPF record doesn't exceed 10 DNS lookups</li>
<li>Test SPF with SPF analyzer tool</li>
</ul>
</li>
<li>
<strong>Configure DKIM</strong> DKIM signs emails cryptographically.
<ul>
<li>Obtain DKIM public key from email provider</li>
<li>Add TXT record with selector (usually selector1._domainkey) and DKIM key</li>
<li>Enable DKIM signing in email provider settings</li>
<li>Test DKIM with email authentication checker</li>
</ul>
</li>
<li>
<strong>Set DMARC Policy</strong> DMARC enforces SPF/DKIM authentication.
<ul>
<li>Create _dmarc TXT record</li>
<li>Start with p=none for monitoring</li>
<li>Add rua email to receive daily reports</li>
<li>Graduate to p=quarantine then p=reject after validation</li>
</ul>
</li>
<li>
<strong>Test Full Email Authentication</strong> Verify email authentication is working end-to-end.
<ul>
<li>Send test email to yourself</li>
<li>Check email headers for SPF, DKIM, DMARC results</li>
<li>All three should show 'pass' result</li>
<li>If failures, debug specific record</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Email Delivery Debugging</h2>
<ul>
<li><strong>MX Record Missing/Wrong:</strong> Add MX record @ pointing to your mail server. Ensure priority is set. Mail server hostname must have valid A record. <code>Missing or incorrect MX records prevent mail delivery entirely</code></li>
<li><strong>SPF Record Misconfigured:</strong> Remove unused email services from SPF. Use IP addresses instead of includes where possible. Count lookups to stay under 10. <code>SPF includes wrong servers or exceeds 10 lookups</code></li>
<li><strong>DKIM Public Key Incorrect:</strong> Get DKIM public key from email provider. Copy entire key exactly into TXT record. Most common DKIM failures caused by typos. <code>DKIM TXT record has wrong public key format</code></li>
<li><strong>DMARC Policy Blocking:</strong> Start with p=none to monitor. Check reports before moving to p=quarantine. Ensure SPF/DKIM working before p=reject. <code>_dmarc record with p=reject blocking all emails</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>Emails going to spam despite correct DNS:</strong> Check email reputation (domain/IP may be on blocklists). Warm up new domain gradually with low send volume. Ensure reverse DNS (PTR) is configured. Monitor DMARC reports for delivery issues.</li>
<li><strong>SPF pass but emails still failing:</strong> SPF aligned authentication required. Ensure email 'From:' domain matches domain with SPF records. Also check DKIM and DMARC configuration.</li>
<li><strong>DKIM validation failing:</strong> Verify DKIM public key in DNS exactly matches provider's key. Check selector name is correct. Common: selector1 vs selector2. Use DKIM test tool.</li>
<li><strong>Some recipients get emails, others don't:</strong> Different email providers have different authentication requirements. Some need DKIM, others only SPF. Ensure both working. Check specific provider's requirements.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>In what order should I set up email authentication?</strong> 1) Add MX records first (enables mail delivery). 2) Add SPF record (basic authentication). 3) Add DKIM records (cryptographic signing). 4) Add DMARC policy (enforcement). Test each before moving to next.</li>
<li><strong>Why are my SPF and DKIM passing but DMARC failing?</strong> DMARC requires alignment - email 'From:' domain must match SPF/DKIM domain. If using subdomain for mail (noreply@sub.example.com) vs main domain, alignment fails. Create subdomain SPF/DKIM records.</li>
<li><strong>How long does email authentication setup take?</strong> MX/SPF/DKIM records take effect within 15-30 minutes (DNS propagation). Email providers start checking authentication immediately. Initial propagation to all ISPs: 4-24 hours. Gradual delivery improvement over 1-2 weeks.</li>
<li><strong>Will fixing DNS improve email deliverability immediately?</strong> DNS changes take effect quickly (30 minutes) but ISP spam filters take time to trust your domain. Expect gradual improvement over 1-2 weeks. Warm up sending volume gradually while authentication settles.</li>
</ul>
</section>`,

  '/guides/dns-resolution-not-working-propagation': `
<section>
<h2>Fix DNS Not Resolving: Complete Propagation Debugging</h2>
<p>When DNS doesn't resolve, your domain becomes inaccessible. This guide helps diagnose whether it's a propagation delay, misconfiguration, or nameserver issue.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Verify Domain Registration Active</strong> Ensure domain hasn't expired or been suspended.
<ul>
<li>Check registrar account for domain status</li>
<li>Verify registration hasn't expired</li>
<li>Ensure auto-renewal is enabled if needed</li>
<li>Expired domains return NXDOMAIN immediately</li>
</ul>
</li>
<li>
<strong>Check Nameservers at Registrar</strong> Nameservers must match your DNS provider's nameservers.
<ul>
<li>Log into domain registrar account</li>
<li>Check nameservers currently set for domain</li>
<li>Compare to your DNS provider's nameservers</li>
<li>If mismatch, update nameservers at registrar</li>
</ul>
</li>
<li>
<strong>Test DNS Resolution from Multiple Servers</strong> Use public DNS servers to test resolution.
<ul>
<li>Test with Google DNS: 8.8.8.8</li>
<li>Test with Cloudflare DNS: 1.1.1.1</li>
<li>Test with your ISP DNS</li>
<li>If some work and others don't, propagation is in progress</li>
</ul>
</li>
<li>
<strong>Check A Records Exist</strong> Verify DNS records are actually created.
<ul>
<li>Log into DNS provider dashboard</li>
<li>Check @ A record exists and points to valid IP</li>
<li>Add A record if missing</li>
<li>Verify record format is correct (no typos)</li>
</ul>
</li>
<li>
<strong>Wait for Propagation</strong> DNS changes take time to spread globally.
<ul>
<li>Nameserver changes: 24-48 hours typical</li>
<li>DNS record changes: 15 minutes to 4 hours typical</li>
<li>Use global DNS checker to monitor progress</li>
<li>Different servers update on different timelines</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on DNS Resolution Issues</h2>
<ul>
<li><strong>No A Record:</strong> Add A record for @ pointing to your server IP. Root domain must have A record to resolve. <code>@ A record missing entirely = NXDOMAIN error</code></li>
<li><strong>Wrong A Record Value:</strong> Verify A record value matches your actual hosting IP. Not your registrar's parking IP. Update record if incorrect. <code>A record points to wrong IP or parking page IP</code></li>
<li><strong>Nameserver Mismatch:</strong> Update registrar nameservers to exactly match DNS provider. Changes take 24-48 hours to propagate. <code>Registrar nameservers don't match DNS provider nameservers</code></li>
<li><strong>Propagation Incomplete:</strong> This is normal during propagation. Wait 24-48 hours for all servers to update. Use global DNS checker to see progress. <code>Some servers show domain, others show NXDOMAIN</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>Domain works on some computers but not others:</strong> This indicates propagation in progress. Different ISPs cache DNS differently. Some servers have updated, others haven't. Wait 24-48 hours for complete propagation.</li>
<li><strong>Domain only resolves from specific DNS server:</strong> Your authoritative nameserver has record, but other resolvers haven't cached it yet. Propagation complete only when all public resolvers have record. Monitor with global DNS checker.</li>
<li><strong>Worked yesterday, now returns NXDOMAIN:</strong> Recent DNS change went wrong. Check if nameservers were changed or A record was deleted. Verify DNS provider account is active and billing current. Rollback recent changes if necessary.</li>
<li><strong>Mobile phone can't resolve but computer can:</strong> Phone is using different DNS (carrier DNS vs ISP DNS). Both should work after full propagation. Flush DNS cache on phone. This usually resolves within hours.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>Why does my domain work on my computer but not for others?</strong> Your computer likely cached the old DNS result before you made changes. Remote users see updated DNS right away. Flush your DNS cache to see what others see: ipconfig /flushdns (Windows) or sudo dscacheutil -flushcache (Mac).</li>
<li><strong>How long should I wait for DNS propagation?</strong> DNS record changes (A, MX, TXT): 15 minutes to 4 hours typical. Nameserver changes (pointing registrar to new DNS): 24-48 hours typical. Industry standard allows up to 48 hours. Some providers are faster.</li>
<li><strong>What causes slow DNS propagation?</strong> Slow propagation usually caused by: 1) ISP DNS cache (ISPs cache DNS longer), 2) Previous high TTL (still in cache), 3) Regional DNS servers (some regions slower), 4) Resolver configuration. Nothing you can do except wait.</li>
<li><strong>Can I speed up DNS propagation?</strong> Limited options: 1) Lower TTL before making changes (propagates faster), 2) Flush local DNS cache, 3) Try different DNS servers. Global propagation timing depends on ISPs and resolvers worldwide - you can't control that.</li>
</ul>
</section>`,

  '/guides/dnsimple-dns-setup': `
<section>
<h2>How to Configure DNS Records in DNSimple</h2>
<p>DNSimple is a developer-friendly DNS provider focused on simplicity and automation. This guide covers DNSimple DNS setup and management.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Create DNSimple Account</strong> Sign up and add your domain.
<ul>
<li>Visit dnsimple.com and create account</li>
<li>Add your domain to DNSimple</li>
<li>DNSimple generates nameservers for your domain</li>
<li>Copy nameservers for your registrar</li>
</ul>
</li>
<li>
<strong>Change Nameservers at Registrar</strong> Point domain to DNSimple.
<ul>
<li>Log into your domain registrar</li>
<li>Update nameservers to DNSimple nameservers</li>
<li>Use exact values from DNSimple account</li>
<li>Wait 24-48 hours for propagation</li>
</ul>
</li>
<li>
<strong>Add DNS Records</strong> Create A, MX, CNAME, TXT records.
<ul>
<li>Go to DNSimple zone editor</li>
<li>Click 'Add Record' to create new entry</li>
<li>Select record type and enter details</li>
<li>DNSimple saves records immediately</li>
</ul>
</li>
<li>
<strong>Configure Advanced Options</strong> Use DNSimple advanced features.
<ul>
<li>Enable DNSSEC if needed</li>
<li>Set up email forwarding</li>
<li>Configure zone-level features</li>
<li>Use API for automation</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on DNSimple</h2>
<ul>
<li><strong>A Record:</strong> Points domain to IPv4 address. DNSimple updates within minutes. <code>Name: @, Type: A, Content: 192.0.2.1</code></li>
<li><strong>MX Record:</strong> Routes email to mail server. Add multiple MX records for redundancy. <code>Name: @, Type: MX, Priority: 10, Content: mail.example.com</code></li>
<li><strong>CNAME Record:</strong> Creates subdomain alias. Cannot be used on root domain. <code>Name: www, Type: CNAME, Content: example.com</code></li>
<li><strong>TXT Record:</strong> Email authentication and verification records. <code>Name: @, Type: TXT, Content: v=spf1 include:_spf.google.com ~all</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNSimple nameservers not working:</strong> Verify nameservers at registrar exactly match DNSimple nameservers. Wait 24-48 hours for propagation. Check with DNS checker.</li>
<li><strong>Email forwarding not working:</strong> Enable email forwarding in DNSimple. Ensure MX records point to DNSimple email forwarding service. May take 24 hours.</li>
<li><strong>DNS changes not appearing:</strong> DNSimple updates within 30 seconds typically. Check you clicked 'Save' on the record. Refresh browser and try again.</li>
<li><strong>Cannot add certain record types:</strong> Some record types may be restricted. Check DNSimple documentation for supported record types. Contact support for special cases.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>Is DNSimple good for beginners?</strong> Yes, DNSimple is designed for simplicity and automation. Great for developers and small businesses. Excellent documentation and support.</li>
<li><strong>Does DNSimple offer API access?</strong> Yes, DNSimple has comprehensive REST API for automation. Great for infrastructure-as-code and automated DNS management.</li>
<li><strong>How much does DNSimple cost?</strong> DNSimple starts at $5/month for first domain, $3/month for additional domains (annual billing). Includes unlimited DNS records and email forwarding.</li>
<li><strong>Can I migrate my domain to DNSimple?</strong> Yes, add domain to DNSimple and update nameservers at registrar. Both registrar and DNSimple must work together during migration.</li>
</ul>
</section>`,

  '/guides/dns-not-propagating-fix': `
<section>
<h2>Why Is My DNS Not Propagating? Complete Troubleshooting Guide</h2>
<p>DNS propagation delays are one of the most common frustrations when managing domains. After making DNS changes, you expect them to take effect immediately — but DNS doesn't work that way. This guide explains why DNS changes appear stuck, how TTL and caching affect propagation, and step-by-step fixes to speed things up.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Understand DNS TTL and Caching</strong> TTL (Time To Live) controls how long DNS records are cached by resolvers worldwide.
<ul>
<li>Every DNS record has a TTL value in seconds (e.g., 3600 = 1 hour)</li>
<li>Resolvers cache records for the TTL duration before re-querying</li>
<li>If your old TTL was 86400 (24 hours), resolvers may serve stale data for up to 24 hours</li>
<li>Lower your TTL to 300 (5 minutes) before making changes, then wait for old TTL to expire</li>
</ul>
</li>
<li>
<strong>Flush Your Local DNS Cache</strong> Your computer and browser cache DNS responses independently of ISP resolvers.
<ul>
<li>Windows: Run 'ipconfig /flushdns' in Command Prompt as Administrator</li>
<li>macOS: Run 'sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder' in Terminal</li>
<li>Linux: Run 'sudo systemd-resolve --flush-caches' or restart systemd-resolved</li>
<li>Also clear your browser cache or test in incognito/private browsing mode</li>
</ul>
</li>
<li>
<strong>Test with Multiple Public DNS Resolvers</strong> Compare results across different DNS providers to confirm propagation status.
<ul>
<li>Test with Google DNS (8.8.8.8) using 'nslookup yourdomain.com 8.8.8.8'</li>
<li>Test with Cloudflare DNS (1.1.1.1) using 'nslookup yourdomain.com 1.1.1.1'</li>
<li>Test with Quad9 (9.9.9.9) and OpenDNS (208.67.222.222)</li>
<li>Use ReviewMyDNS to check propagation across 50+ global servers simultaneously</li>
</ul>
</li>
<li>
<strong>Verify Changes at Authoritative Nameservers</strong> Check that your DNS provider's authoritative servers have the correct records.
<ul>
<li>Find your authoritative nameservers with 'dig NS yourdomain.com'</li>
<li>Query authoritative server directly: 'dig @ns1.yourdns.com yourdomain.com A'</li>
<li>If authoritative servers show old data, the change wasn't saved correctly</li>
<li>Re-check your DNS provider dashboard and save changes again</li>
</ul>
</li>
<li>
<strong>Check for ISP DNS Caching Issues</strong> Some ISPs aggressively cache DNS records beyond TTL values.
<ul>
<li>ISP resolvers sometimes ignore TTL and cache for longer periods</li>
<li>Switch to a public DNS resolver (Google 8.8.8.8 or Cloudflare 1.1.1.1) to bypass ISP caching</li>
<li>Contact your ISP if their DNS servers consistently show stale data</li>
<li>Corporate networks and VPNs may have their own DNS caching layers</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on DNS Propagation Issues</h2>
<ul>
<li><strong>A Record Propagation:</strong> A record changes are affected by the previous TTL value. If the old TTL was high, resolvers keep serving old IP. Lower TTL before migration. <code>Old: A @ 192.0.2.1 TTL 86400 → New: A @ 203.0.113.1 TTL 300</code></li>
<li><strong>CNAME Record Propagation:</strong> CNAME changes follow the same TTL caching rules. Additionally, the target domain's own DNS resolution adds another layer of potential caching. <code>Old: CNAME www old-host.com TTL 3600 → New: CNAME www new-host.com TTL 300</code></li>
<li><strong>MX Record Propagation:</strong> MX record changes affect email delivery. Keep old mail server active during propagation to avoid lost emails. MX changes can take 2-6 hours. <code>Old: MX @ mail.old-provider.com TTL 3600 → New: MX @ mail.new-provider.com TTL 300</code></li>
<li><strong>NS Record Propagation:</strong> Nameserver changes are the slowest to propagate (24-48 hours). The registrar updates the parent zone, which must propagate through the global DNS hierarchy. <code>Old NS: ns1.old-dns.com → New NS: ns1.new-dns.com</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>DNS shows old records after 24+ hours:</strong> Verify changes saved correctly at your DNS provider. Query authoritative nameservers directly to confirm. If authoritative servers show correct data but resolvers don't, aggressive ISP caching is likely — switch to public DNS (8.8.8.8 or 1.1.1.1) and wait.</li>
<li><strong>DNS works on some devices but not others:</strong> Different devices use different DNS resolvers with different cache states. Flush DNS cache on affected devices. Check if devices use ISP DNS vs public DNS. Corporate networks may have separate DNS infrastructure with longer cache times.</li>
<li><strong>Changed nameservers but domain not resolving:</strong> Nameserver changes take 24-48 hours. Ensure new nameservers are correct and active. Verify DNS records exist at the new DNS provider before changing nameservers. Query new nameservers directly to confirm records are configured.</li>
<li><strong>DNS propagation checker shows mixed results:</strong> Mixed results are normal during propagation — different servers update at different times. If most servers show new data, propagation is nearly complete. Wait for remaining servers. If stuck after 48 hours, check for DNSSEC issues or incorrect nameserver configuration.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>How long does DNS propagation actually take?</strong> DNS propagation typically takes 15 minutes to 4 hours for record changes, and 24-48 hours for nameserver changes. The actual time depends on the previous TTL value, ISP caching behavior, and the type of change. Use ReviewMyDNS to monitor real-time propagation status across global servers.</li>
<li><strong>Can I speed up DNS propagation?</strong> You can't force all resolvers to update, but you can prepare: lower your TTL to 300 seconds 24-48 hours before making changes, flush your local DNS cache after changes, and use public DNS resolvers (8.8.8.8, 1.1.1.1) which typically update faster than ISP resolvers.</li>
<li><strong>Why does my DNS work on my phone but not my computer?</strong> Different devices use different DNS resolvers. Your phone may use mobile carrier DNS while your computer uses ISP or router DNS. Each resolver has its own cache. Flush DNS cache on the affected device, or switch to a public DNS resolver like Google (8.8.8.8) or Cloudflare (1.1.1.1).</li>
<li><strong>Does changing DNS affect my website's SEO?</strong> DNS changes themselves don't affect SEO, but downtime during propagation can. To minimize impact: lower TTL before changes, keep old server running during propagation, verify changes with ReviewMyDNS before decommissioning old infrastructure, and monitor for 404 errors after migration.</li>
</ul>
</section>`,

  '/guides/email-going-to-spam-dns-fix': `
<section>
<h2>Emails Going to Spam? Fix Your DNS Records</h2>
<p>If your emails are landing in spam folders instead of inboxes, misconfigured or missing DNS records are often the cause. Email providers like Gmail, Outlook, and Yahoo check SPF, DKIM, and DMARC records to verify that emails are legitimate. This guide walks you through diagnosing and fixing DNS-related email deliverability problems.</p>
<h2>Step-by-Step Setup Guide</h2>
<ol>
<li>
<strong>Check Your Current SPF Record</strong> SPF (Sender Policy Framework) tells receiving servers which IP addresses and servers are authorized to send email for your domain.
<ul>
<li>Look up your domain's TXT records using ReviewMyDNS or 'dig TXT yourdomain.com'</li>
<li>Find the record starting with 'v=spf1'</li>
<li>If no SPF record exists, create one — this is the most common cause of spam classification</li>
<li>Ensure all sending services are included: your mail server, marketing tools (Mailchimp, SendGrid), and transactional email services</li>
</ul>
</li>
<li>
<strong>Fix Common SPF Mistakes</strong> SPF misconfigurations cause authentication failures that trigger spam filters.
<ul>
<li>Only one SPF TXT record allowed per domain — merge multiple records into one</li>
<li>Use 'include:' mechanism for third-party services (e.g., include:_spf.google.com)</li>
<li>End with '~all' (soft fail) or '-all' (hard fail) — never '+all' which allows anyone to send as your domain</li>
<li>Keep total DNS lookups under 10 to avoid 'permerror' which defaults to fail</li>
</ul>
</li>
<li>
<strong>Set Up DKIM Signing</strong> DKIM (DomainKeys Identified Mail) adds a cryptographic signature to outgoing emails.
<ul>
<li>Get your DKIM public key from your email provider (Google Workspace, Microsoft 365, etc.)</li>
<li>Add a TXT record at selector._domainkey.yourdomain.com with the DKIM public key</li>
<li>Common selectors: 'google' for Google Workspace, 'selector1' and 'selector2' for Microsoft 365</li>
<li>Test DKIM by sending an email and checking headers for 'dkim=pass'</li>
</ul>
</li>
<li>
<strong>Configure DMARC Policy</strong> DMARC ties SPF and DKIM together and tells receivers what to do with unauthenticated email.
<ul>
<li>Add a TXT record at _dmarc.yourdomain.com</li>
<li>Start with monitoring: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com</li>
<li>After reviewing reports, upgrade to p=quarantine (sends failures to spam)</li>
<li>Eventually move to p=reject (blocks unauthenticated email entirely)</li>
</ul>
</li>
<li>
<strong>Verify Email Authentication End-to-End</strong> Test that all three authentication methods pass correctly.
<ul>
<li>Send a test email to a Gmail account and click 'Show original' to view authentication results</li>
<li>Check for 'spf=pass', 'dkim=pass', and 'dmarc=pass' in email headers</li>
<li>Use ReviewMyDNS to verify all DNS records are correctly published</li>
<li>Monitor DMARC reports for ongoing authentication failures</li>
</ul>
</li>
</ol>
<h2>Common DNS Record Types on Email Spam DNS Fix</h2>
<ul>
<li><strong>SPF Record (TXT):</strong> Authorizes mail servers to send email for your domain. Include all services that send email on your behalf. Only one SPF record per domain — merge if you have multiple. <code>Name: @, Type: TXT, Value: v=spf1 include:_spf.google.com include:sendgrid.net ~all</code></li>
<li><strong>DKIM Record (TXT):</strong> Publishes your DKIM public key for email signature verification. The selector name and key value come from your email provider. Each sending service needs its own DKIM record. <code>Name: google._domainkey, Type: TXT, Value: v=DKIM1; k=rsa; p=MIIBIjANB...(public key)</code></li>
<li><strong>DMARC Record (TXT):</strong> Sets your DMARC policy. Start with p=none for monitoring, then p=quarantine, then p=reject. The rua address receives aggregate reports showing authentication results. <code>Name: _dmarc, Type: TXT, Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com</code></li>
<li><strong>MX Record:</strong> Routes incoming email to your mail server. Incorrect MX records cause bounced emails. Set multiple MX records with different priorities for redundancy. <code>Name: @, Type: MX, Priority: 1, Value: aspmx.l.google.com</code></li>
</ul>
<h2>Troubleshooting Common Issues</h2>
<ul>
<li><strong>SPF record returns 'permerror' or 'too many DNS lookups':</strong> SPF is limited to 10 DNS lookups total. Each 'include:', 'a:', 'mx:', and 'redirect=' counts as a lookup. Consolidate includes, use IP addresses (ip4:/ip6:) instead of hostnames where possible, or use SPF flattening services to reduce lookup count.</li>
<li><strong>DKIM signature fails verification:</strong> Verify the DKIM TXT record is published at the correct selector._domainkey.yourdomain.com hostname. Check for formatting issues — the key value must be exact with no extra spaces or line breaks. Ensure DKIM signing is enabled in your email provider settings.</li>
<li><strong>DMARC reports show high failure rates:</strong> Review DMARC aggregate reports to identify which IPs are failing. Common causes: forgotten sending services not in SPF, forwarded emails breaking SPF alignment, or DKIM not configured for all sending services. Add missing sources to SPF and configure DKIM for each service.</li>
<li><strong>Emails still going to spam despite passing SPF/DKIM/DMARC:</strong> Authentication is necessary but not sufficient. Also check: email content and subject lines for spam trigger words, sending domain reputation (use Google Postmaster Tools), IP reputation of your mail server, proper unsubscribe headers, and consistent sending volume patterns.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<ul>
<li><strong>Do I really need all three — SPF, DKIM, and DMARC?</strong> Yes. As of 2024, Google and Yahoo require SPF, DKIM, and DMARC for bulk senders (5000+ emails/day), and strongly recommend them for all senders. Even for low-volume senders, all three significantly improve deliverability and protect your domain from spoofing.</li>
<li><strong>How long after fixing DNS records will emails stop going to spam?</strong> DNS changes propagate within 1-4 hours, but email provider reputation systems take longer to adjust. Gmail and Outlook may take 1-2 weeks to improve your domain's reputation after fixing authentication. Consistent, authenticated sending over time improves deliverability.</li>
<li><strong>Can I have multiple SPF records for my domain?</strong> No. DNS allows only one SPF TXT record per domain. Multiple SPF records cause a 'permerror' which defaults to fail. Merge all authorized senders into a single SPF record using multiple 'include:' mechanisms within one record.</li>
<li><strong>What DMARC policy should I start with?</strong> Start with p=none to monitor without affecting delivery. This lets you receive reports and identify all legitimate sending sources. Once you've confirmed all legitimate senders pass SPF and DKIM, upgrade to p=quarantine (sends failures to spam), then eventually p=reject (blocks failures entirely).</li>
</ul>
</section>`,


};

export function buildSsrContent(h1: string, urlPath: string = '/', description?: string): string {
  const cleanPath = urlPath.split('?')[0].replace(/\/+$/, '') || '/';
  const intro = `<p>ReviewMyDNS is a free DNS propagation checker that queries 50+ global DNS servers to verify your DNS records. Check A, AAAA, MX, CNAME, TXT, NS, and SOA records instantly.</p>`;
  const pageDesc = description ? `<p>${description}</p>` : '';
  const pageContent = PAGE_CONTENT[cleanPath] || '';

  let sectionLinks = '';
  if (cleanPath === '/' || cleanPath === '/dns-propagation-checker' || cleanPath === '/tools') {
    sectionLinks = `${CONTENT_LINKS}${GUIDE_LINKS}${TROUBLESHOOTING_GUIDE_LINKS}${FAQ_LINKS}${ERROR_LINKS}${DNSFOR_LINKS}${BLOG_LINKS}${PROVIDER_LINKS}`;
  } else if (cleanPath.startsWith('/guides')) {
    sectionLinks = `${GUIDE_LINKS}${TROUBLESHOOTING_GUIDE_LINKS}${CONTENT_LINKS}${PROVIDER_LINKS}`;
  } else if (cleanPath.startsWith('/faq')) {
    sectionLinks = `${FAQ_LINKS}${CONTENT_LINKS}${ERROR_LINKS}${TROUBLESHOOTING_GUIDE_LINKS}`;
  } else if (cleanPath.startsWith('/errors')) {
    sectionLinks = `${ERROR_LINKS}${TROUBLESHOOTING_GUIDE_LINKS}${FAQ_LINKS}${CONTENT_LINKS}`;
  } else if (cleanPath.startsWith('/dns-for')) {
    sectionLinks = `${DNSFOR_LINKS}${GUIDE_LINKS}${CONTENT_LINKS}${PROVIDER_LINKS}`;
  } else if (cleanPath.startsWith('/blog')) {
    sectionLinks = `${BLOG_LINKS}${CONTENT_LINKS}${GUIDE_LINKS}${FAQ_LINKS}`;
  } else {
    sectionLinks = `${CONTENT_LINKS}${GUIDE_LINKS}${TROUBLESHOOTING_GUIDE_LINKS}${FAQ_LINKS}${ERROR_LINKS}${DNSFOR_LINKS}${BLOG_LINKS}${PROVIDER_LINKS}`;
  }

  return `${NAV_LINKS}<h1>${h1}</h1>${pageDesc}${intro}${pageContent}${sectionLinks}`;
}
