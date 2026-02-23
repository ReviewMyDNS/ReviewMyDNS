interface PageMeta {
  title: string;
  description: string;
  h1: string;
}

const NAV_LINKS = `<nav><a href="/">DNS Checker</a> | <a href="/dns-propagation-checker">Propagation Checker</a> | <a href="/mx-record-lookup">MX Lookup</a> | <a href="/txt-record-checker">TXT Checker</a> | <a href="/tools">All Tools</a> | <a href="/what-is-ttl-in-dns">TTL Guide</a> | <a href="/dns-record-types-explained">Record Types</a> | <a href="/how-to-flush-dns-cache">Flush DNS</a> | <a href="/spf-dkim-dmarc-explained">SPF/DKIM/DMARC</a> | <a href="/pricing">Pricing</a> | <a href="/blog">Blog</a> | <a href="/guides">Guides</a> | <a href="/faq">FAQ</a> | <a href="/contact">Contact</a></nav>`;

const FOOTER_LINKS = `<nav><a href="/what-is-ttl-in-dns">What is TTL</a> | <a href="/a-record-vs-cname">A vs CNAME</a> | <a href="/what-is-dns-cache">DNS Cache</a> | <a href="/how-to-check-nameservers">Check Nameservers</a> | <a href="/how-to-lower-ttl-before-migration">TTL Migration</a> | <a href="/why-mx-record-not-working">MX Troubleshooting</a> | <a href="/dns-not-propagating">DNS Not Propagating</a> | <a href="/how-long-does-dns-propagation-take">Propagation Time</a> | <a href="/google-workspace-mx-not-working">Google MX Issues</a> | <a href="/domain-not-working-after-transfer">Domain Transfer</a> | <a href="/check-godaddy-dns">GoDaddy DNS</a> | <a href="/check-cloudflare-dns">Cloudflare DNS</a> | <a href="/check-namecheap-dns">Namecheap DNS</a> | <a href="/dnssec">DNSSEC</a> | <a href="/terminology">DNS Terminology</a> | <a href="/security">Security</a> | <a href="/api-docs">API</a></nav>`;

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
    description: 'Free MX record lookup tool. Check mail exchange records for any domain across global DNS servers.',
    h1: 'MX Record Lookup Tool',
  },
  '/txt-record-checker': {
    title: 'TXT Record Checker - Verify SPF, DKIM, DMARC',
    description: 'Check TXT records for any domain. Verify SPF, DKIM, and DMARC email authentication records.',
    h1: 'TXT Record Checker',
  },
  '/what-is-ttl-in-dns': {
    title: 'What is TTL in DNS? Complete Guide',
    description: 'Learn what TTL means in DNS, how it affects propagation, and best practices for setting TTL values.',
    h1: 'What is TTL in DNS?',
  },
  '/dns-record-types-explained': {
    title: 'DNS Record Types Explained - A, AAAA, CNAME, MX',
    description: 'Complete guide to DNS record types: A, AAAA, CNAME, MX, TXT, NS, SOA, PTR, SRV, and CAA records.',
    h1: 'DNS Record Types Explained',
  },
  '/a-record-vs-cname': {
    title: 'A Record vs CNAME - When to Use Each',
    description: 'Learn the difference between A records and CNAME records, when to use each, and common mistakes to avoid.',
    h1: 'A Record vs CNAME: What is the Difference?',
  },
  '/what-is-dns-cache': {
    title: 'What is DNS Cache? How DNS Caching Works',
    description: 'Learn how DNS caching works at browser, OS, router, and ISP level. Understand cache poisoning and how to flush.',
    h1: 'What is DNS Cache?',
  },
  '/how-to-check-nameservers': {
    title: 'How to Check Nameservers for a Domain',
    description: 'Find nameservers for any domain using our free tool or command line. Verify NS records and troubleshoot issues.',
    h1: 'How to Check Nameservers',
  },
  '/how-to-flush-dns-cache': {
    title: 'How to Flush DNS Cache - Windows, Mac, Linux',
    description: 'Step-by-step guide to flush DNS cache on Windows, Mac, Linux, Chrome, and Firefox with verification steps.',
    h1: 'How to Flush DNS Cache',
  },
  '/how-to-lower-ttl-before-migration': {
    title: 'How to Lower TTL Before DNS Migration',
    description: 'Step-by-step guide to lowering TTL before a DNS migration to minimize downtime and speed up propagation.',
    h1: 'How to Lower TTL Before Migration',
  },
  '/why-mx-record-not-working': {
    title: 'Why Is My MX Record Not Working? 8 Common Fixes',
    description: 'Troubleshoot MX record issues. Fix email delivery problems with Google Workspace, Microsoft 365, and Zoho.',
    h1: 'Why Is My MX Record Not Working?',
  },
  '/spf-dkim-dmarc-explained': {
    title: 'SPF, DKIM, DMARC Explained - Email Auth Guide',
    description: 'Complete guide to SPF, DKIM, and DMARC email authentication. Learn setup, validation, and troubleshooting.',
    h1: 'SPF, DKIM, and DMARC Explained',
  },
  '/how-long-does-dns-propagation-take': {
    title: 'How Long Does DNS Propagation Take?',
    description: 'DNS propagation typically takes 24-48 hours. Learn what affects timing and how to speed it up.',
    h1: 'How Long Does DNS Propagation Take?',
  },
  '/dns-not-propagating': {
    title: 'DNS Not Propagating? How to Fix It',
    description: 'Fix DNS propagation issues. Common causes and solutions when DNS changes are not updating globally.',
    h1: 'DNS Not Propagating? How to Fix It',
  },
  '/google-workspace-mx-not-working': {
    title: 'Google Workspace MX Records Not Working - Fix',
    description: 'Fix Google Workspace MX record issues. Correct MX values, priority settings, and common setup mistakes.',
    h1: 'Google Workspace MX Records Not Working',
  },
  '/domain-not-working-after-transfer': {
    title: 'Domain Not Working After Transfer - Fix Guide',
    description: 'Fix domain issues after transfer. Restore DNS records, nameservers, and resolve common transfer problems.',
    h1: 'Domain Not Working After Transfer',
  },
  '/check-godaddy-dns': {
    title: 'Check GoDaddy DNS Records - Free Tool',
    description: 'Check and verify GoDaddy DNS records. Troubleshoot DNS issues for domains hosted on GoDaddy.',
    h1: 'Check GoDaddy DNS Records',
  },
  '/check-cloudflare-dns': {
    title: 'Check Cloudflare DNS Records - Free Tool',
    description: 'Check and verify Cloudflare DNS records. Troubleshoot proxy and DNS issues for Cloudflare domains.',
    h1: 'Check Cloudflare DNS Records',
  },
  '/check-namecheap-dns': {
    title: 'Check Namecheap DNS Records - Free Tool',
    description: 'Check and verify Namecheap DNS records. Troubleshoot DNS issues for Namecheap hosted domains.',
    h1: 'Check Namecheap DNS Records',
  },
  '/pricing': {
    title: 'Pricing - ReviewMyDNS Pro Plans',
    description: 'ReviewMyDNS pricing plans. Free, Pro, Team, and Enterprise options for DNS monitoring and bulk lookups.',
    h1: 'ReviewMyDNS Pricing Plans',
  },
  '/tools': {
    title: 'DNS Tools - ReviewMyDNS',
    description: 'Free DNS tools: propagation checker, MX lookup, TXT checker, bulk lookup, DNSSEC validator, and more.',
    h1: 'DNS Tools',
  },
  '/blog': {
    title: 'Blog - ReviewMyDNS',
    description: 'DNS guides, tutorials, and best practices from ReviewMyDNS. Learn about DNS management and troubleshooting.',
    h1: 'ReviewMyDNS Blog',
  },
  '/guides': {
    title: 'DNS Setup Guides - ReviewMyDNS',
    description: 'Step-by-step DNS setup guides for GoDaddy, Cloudflare, Namecheap, AWS Route 53, and more providers.',
    h1: 'DNS Setup Guides',
  },
  '/faq': {
    title: 'FAQ - ReviewMyDNS',
    description: 'Frequently asked questions about DNS propagation, record types, troubleshooting, and ReviewMyDNS tools.',
    h1: 'Frequently Asked Questions',
  },
  '/contact': {
    title: 'Contact Us - ReviewMyDNS',
    description: 'Contact the ReviewMyDNS team for support, feedback, or business inquiries.',
    h1: 'Contact Us',
  },
  '/api-docs': {
    title: 'API Documentation - ReviewMyDNS',
    description: 'ReviewMyDNS API documentation. Integrate DNS lookups and monitoring into your applications.',
    h1: 'API Documentation',
  },
  '/terminology': {
    title: 'DNS Terminology Glossary - ReviewMyDNS',
    description: 'Complete DNS terminology glossary. Definitions for A record, CNAME, MX, TTL, nameserver, and more.',
    h1: 'DNS Terminology Glossary',
  },
  '/dnssec': {
    title: 'DNSSEC Explained - How It Works',
    description: 'Learn how DNSSEC protects DNS queries with cryptographic signatures. Setup guides and validation tools.',
    h1: 'DNSSEC Explained',
  },
  '/security': {
    title: 'DNS Security Best Practices - ReviewMyDNS',
    description: 'DNS security guide covering DNSSEC, DNS over HTTPS, cache poisoning prevention, and best practices.',
    h1: 'DNS Security Best Practices',
  },
  '/errors': {
    title: 'DNS Error Reference - ReviewMyDNS',
    description: 'Common DNS errors explained with solutions. Fix NXDOMAIN, SERVFAIL, REFUSED, and timeout errors.',
    h1: 'DNS Error Reference',
  },
  '/bulk-lookup': {
    title: 'Bulk DNS Lookup - Check Multiple Domains',
    description: 'Check DNS records for multiple domains at once. Bulk lookup tool for A, MX, TXT, and NS records.',
    h1: 'Bulk DNS Lookup',
  },
  '/compare': {
    title: 'Compare DNS Providers - ReviewMyDNS',
    description: 'Compare DNS providers side by side. Features, pricing, and performance for top DNS hosting services.',
    h1: 'Compare DNS Providers',
  },
  '/history': {
    title: 'DNS Lookup History - ReviewMyDNS',
    description: 'View your DNS lookup history. Track changes and monitor DNS records over time.',
    h1: 'DNS Lookup History',
  },
  '/monitor': {
    title: 'DNS Monitoring - ReviewMyDNS',
    description: 'Monitor DNS records for changes. Get alerts when DNS records are modified or go down.',
    h1: 'DNS Monitoring',
  },
  '/analytics': {
    title: 'DNS Analytics - ReviewMyDNS',
    description: 'DNS performance analytics. Track response times, uptime, and resolution patterns across global servers.',
    h1: 'DNS Analytics',
  },
};

const DEFAULT_META: PageMeta = {
  title: 'ReviewMyDNS - Free DNS Propagation Checker',
  description: 'Check DNS records across 50+ global servers. Free DNS propagation checker with diagnostics.',
  h1: 'ReviewMyDNS - DNS Lookup Tool',
};

export function getPageMeta(urlPath: string): PageMeta {
  const cleanPath = urlPath.split('?')[0].replace(/\/+$/, '') || '/';

  if (PAGE_META[cleanPath]) {
    return PAGE_META[cleanPath];
  }

  if (cleanPath.startsWith('/guides/')) {
    const slug = cleanPath.replace('/guides/', '').replace(/-/g, ' ');
    const name = slug.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `${name} DNS Setup Guide - ReviewMyDNS`,
      description: `Step-by-step guide to configure DNS records for ${name}. Setup A, CNAME, MX, and TXT records.`,
      h1: `${name} DNS Setup Guide`,
    };
  }

  if (cleanPath.startsWith('/faq/')) {
    const slug = cleanPath.replace('/faq/', '').replace(/-/g, ' ');
    const name = slug.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `${name} - DNS FAQ | ReviewMyDNS`,
      description: `Get the answer to "${name}" and other common DNS questions.`,
      h1: name,
    };
  }

  if (cleanPath.startsWith('/errors/')) {
    const slug = cleanPath.replace('/errors/', '').replace(/-/g, ' ');
    const name = slug.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `${name} - DNS Error Fix | ReviewMyDNS`,
      description: `How to fix the "${name}" DNS error. Causes, solutions, and troubleshooting steps.`,
      h1: `Fix: ${name}`,
    };
  }

  if (cleanPath.startsWith('/dns-for/')) {
    const slug = cleanPath.replace('/dns-for/', '').replace(/-/g, ' ');
    const name = slug.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `DNS Setup for ${name} - ReviewMyDNS`,
      description: `Configure DNS records for ${name}. Step-by-step DNS setup and troubleshooting guide.`,
      h1: `DNS Setup for ${name}`,
    };
  }

  if (cleanPath.startsWith('/blog/')) {
    return {
      title: 'Blog Post - ReviewMyDNS',
      description: 'DNS guide and tutorial from ReviewMyDNS.',
      h1: 'ReviewMyDNS Blog',
    };
  }

  if (cleanPath.startsWith('/is-down/')) {
    const domain = cleanPath.replace('/is-down/', '');
    return {
      title: `Is ${domain} Down? - ReviewMyDNS`,
      description: `Check if ${domain} is down or just you. Real-time DNS and availability check.`,
      h1: `Is ${domain} Down?`,
    };
  }

  return DEFAULT_META;
}

export function buildSsrContent(h1: string): string {
  return `${NAV_LINKS}<h1>${h1}</h1><p>ReviewMyDNS is a free DNS propagation checker that queries 50+ global DNS servers to verify your DNS records. Check A, AAAA, MX, CNAME, TXT, NS, and SOA records instantly.</p>${FOOTER_LINKS}`;
}
