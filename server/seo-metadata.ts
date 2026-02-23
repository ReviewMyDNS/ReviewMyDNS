interface PageMeta {
  title: string;
  description: string;
  h1: string;
}

const NAV_LINKS = `<nav aria-label="Main navigation"><a href="/">DNS Checker</a> | <a href="/dns-propagation-checker">Propagation Checker</a> | <a href="/mx-record-lookup">MX Lookup</a> | <a href="/txt-record-checker">TXT Checker</a> | <a href="/tools">All Tools</a> | <a href="/what-is-ttl-in-dns">TTL Guide</a> | <a href="/dns-record-types-explained">Record Types</a> | <a href="/how-to-flush-dns-cache">Flush DNS</a> | <a href="/spf-dkim-dmarc-explained">SPF/DKIM/DMARC</a> | <a href="/pricing">Pricing</a> | <a href="/blog">Blog</a> | <a href="/guides">Guides</a> | <a href="/faq">FAQ</a> | <a href="/contact">Contact</a></nav>`;

const GUIDE_LINKS = `<nav aria-label="DNS setup guides"><h2>DNS Setup Guides</h2><a href="/guides/cloudflare-dns-setup">Cloudflare DNS Setup</a> | <a href="/guides/godaddy-dns-setup">GoDaddy DNS Setup</a> | <a href="/guides/namecheap-dns-setup">Namecheap DNS Setup</a> | <a href="/guides/aws-route53-dns-setup">AWS Route 53 Setup</a> | <a href="/guides/google-domains-dns-setup">Google Domains Setup</a> | <a href="/guides/bluehost-dns-setup">Bluehost DNS Setup</a> | <a href="/guides/hover-dns-setup">Hover DNS Setup</a> | <a href="/guides/domain-com-dns-setup">Domain.com Setup</a> | <a href="/guides/siteground-dns-setup">SiteGround Setup</a> | <a href="/guides/hostgator-dns-setup">HostGator Setup</a> | <a href="/guides/namesilo-dns-setup">NameSilo Setup</a> | <a href="/guides/dynadot-dns-setup">Dynadot Setup</a> | <a href="/guides/porkbun-dns-setup">Porkbun Setup</a> | <a href="/guides/ns1-managed-dns-setup">NS1 Setup</a> | <a href="/guides/dnsimple-dns-setup">DNSimple Setup</a> | <a href="/guides/linode-dns-setup">Linode Setup</a> | <a href="/guides/digitalocean-dns-setup">DigitalOcean Setup</a> | <a href="/guides/hostinger-dns-setup">Hostinger Setup</a> | <a href="/guides/dreamhost-dns-setup">DreamHost Setup</a> | <a href="/guides/ionos-dns-setup">IONOS Setup</a> | <a href="/guides/ovhcloud-dns-setup">OVHcloud Setup</a> | <a href="/guides/gandi-dns-setup">Gandi Setup</a> | <a href="/guides/wix-dns-setup">Wix DNS Setup</a></nav>`;

const TROUBLESHOOTING_GUIDE_LINKS = `<nav aria-label="Troubleshooting guides"><h2>Troubleshooting Guides</h2><a href="/guides/nxdomain-error-fix">NXDOMAIN Error Fix</a> | <a href="/guides/servfail-error-fix">SERVFAIL Error Fix</a> | <a href="/guides/spf-too-many-lookups-error">SPF Too Many Lookups</a> | <a href="/guides/dmarc-authentication-failed">DMARC Auth Failed</a> | <a href="/guides/email-delivery-debugging-dns">Email Delivery Debugging</a> | <a href="/guides/dns-resolution-not-working-propagation">DNS Resolution Issues</a> | <a href="/guides/dnssec-validation-errors">DNSSEC Validation Errors</a></nav>`;

const FAQ_LINKS = `<nav aria-label="Frequently asked questions"><h2>Common DNS Questions</h2><a href="/faq/why-dns-not-updating-24-hours">Why Is DNS Not Updating After 24 Hours?</a> | <a href="/faq/how-to-check-dns-propagation">How to Check DNS Propagation</a> | <a href="/faq/difference-between-a-record-cname-mx-txt">Difference Between A, CNAME, MX, TXT</a> | <a href="/faq/domain-nameservers-vs-dns-records">Nameservers vs DNS Records</a> | <a href="/faq/what-is-dns-caching">What Is DNS Caching?</a> | <a href="/faq/how-to-find-your-nameservers">How to Find Your Nameservers</a> | <a href="/faq/nxdomain-error-fix">NXDOMAIN Error Fix</a> | <a href="/faq/servfail-error-fix">SERVFAIL Error Fix</a> | <a href="/faq/spf-too-many-lookups-fix">SPF Too Many Lookups Fix</a> | <a href="/faq/dmarc-fail-fix">DMARC Fail Fix</a> | <a href="/faq/dnssec-validation-failed-fix">DNSSEC Validation Failed</a> | <a href="/faq/mx-record-not-found-fix">MX Record Not Found</a> | <a href="/faq/cname-root-domain-error-fix">CNAME Root Domain Error</a> | <a href="/faq/timeout-dns-query-fix">Timeout DNS Query Fix</a></nav>`;

const ERROR_LINKS = `<nav aria-label="DNS error reference"><h2>DNS Error Reference</h2><a href="/errors/nxdomain">NXDOMAIN</a> | <a href="/errors/servfail">SERVFAIL</a> | <a href="/errors/refused">REFUSED</a> | <a href="/errors/timeout">Timeout</a> | <a href="/errors/noerror-empty">NOERROR Empty</a> | <a href="/errors/formerr">FORMERR</a> | <a href="/errors/notimpl">NOTIMPL</a> | <a href="/errors/cname-loop">CNAME Loop</a> | <a href="/errors/dnssec-validation-failed">DNSSEC Validation Failed</a> | <a href="/errors/network-unreachable">Network Unreachable</a> | <a href="/errors/connection-refused">Connection Refused</a> | <a href="/errors/truncated-response">Truncated Response</a> | <a href="/errors/soa-mismatch">SOA Mismatch</a> | <a href="/errors/ttl-expired">TTL Expired</a> | <a href="/errors/lame-delegation">Lame Delegation</a> | <a href="/errors/missing-glue">Missing Glue</a> | <a href="/errors/spf-permerror">SPF PermError</a> | <a href="/errors/dkim-signature-invalid">DKIM Signature Invalid</a> | <a href="/errors/dmarc-failure">DMARC Failure</a> | <a href="/errors/ptr-missing">PTR Missing</a></nav>`;

const DNSFOR_LINKS = `<nav aria-label="DNS for platforms"><h2>DNS Setup by Platform</h2><a href="/dns-for/wordpress">WordPress DNS</a> | <a href="/dns-for/shopify">Shopify DNS</a> | <a href="/dns-for/squarespace">Squarespace DNS</a> | <a href="/dns-for/wix">Wix DNS</a> | <a href="/dns-for/webflow">Webflow DNS</a> | <a href="/dns-for/ghost">Ghost DNS</a> | <a href="/dns-for/vercel">Vercel DNS</a> | <a href="/dns-for/netlify">Netlify DNS</a> | <a href="/dns-for/github-pages">GitHub Pages DNS</a> | <a href="/dns-for/heroku">Heroku DNS</a> | <a href="/dns-for/render">Render DNS</a> | <a href="/dns-for/digitalocean">DigitalOcean DNS</a> | <a href="/dns-for/aws">AWS DNS</a> | <a href="/dns-for/google-cloud">Google Cloud DNS</a> | <a href="/dns-for/azure">Azure DNS</a> | <a href="/dns-for/hubspot">HubSpot DNS</a></nav>`;

const BLOG_LINKS = `<nav aria-label="Blog posts"><h2>Latest Blog Posts</h2><a href="/blog/dns-propagation-explained">DNS Propagation Explained</a> | <a href="/blog/dns-migration-checklist">DNS Migration Checklist</a> | <a href="/blog/spf-dkim-dmarc-guide">SPF DKIM DMARC Guide</a> | <a href="/blog/common-dns-misconfigurations">Common DNS Misconfigurations</a> | <a href="/blog/dns-history-debugging">DNS History Debugging</a> | <a href="/blog/how-to-read-dns-records">How to Read DNS Records</a></nav>`;

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
};

const DEFAULT_META: PageMeta = {
  title: 'ReviewMyDNS - Free DNS Propagation Checker',
  description: 'Check DNS records across 50+ global servers. Free DNS propagation checker with real-time diagnostics and troubleshooting tools.',
  h1: 'ReviewMyDNS - DNS Lookup Tool',
};

export function getPageMeta(urlPath: string): PageMeta {
  const cleanPath = urlPath.split('?')[0].replace(/\/+$/, '') || '/';

  if (PAGE_META[cleanPath]) {
    return PAGE_META[cleanPath];
  }

  if (cleanPath.startsWith('/guides/')) {
    const slug = cleanPath.replace('/guides/', '');
    const name = slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `${name} - DNS Setup Guide | ReviewMyDNS`,
      description: `Complete ${name.toLowerCase()} guide with step-by-step instructions. Configure A, CNAME, MX, and TXT records for your domain correctly.`,
      h1: `${name} DNS Setup Guide`,
    };
  }

  if (cleanPath.startsWith('/faq/')) {
    const slug = cleanPath.replace('/faq/', '');
    const name = slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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
    const name = slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `DNS Setup for ${name} - Complete Guide | ReviewMyDNS`,
      description: `Configure DNS records for ${name} with our complete setup guide. Includes A record, CNAME, and custom domain configuration steps.`,
      h1: `DNS Setup for ${name}`,
    };
  }

  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const name = slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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

export function buildSsrContent(h1: string, urlPath: string = '/'): string {
  const cleanPath = urlPath.split('?')[0].replace(/\/+$/, '') || '/';
  const intro = `<p>ReviewMyDNS is a free DNS propagation checker that queries 50+ global DNS servers to verify your DNS records. Check A, AAAA, MX, CNAME, TXT, NS, and SOA records instantly.</p>`;

  let sectionLinks = '';
  if (cleanPath === '/' || cleanPath === '/dns-propagation-checker' || cleanPath === '/tools') {
    sectionLinks = `${CONTENT_LINKS}${GUIDE_LINKS}${FAQ_LINKS}${ERROR_LINKS}${DNSFOR_LINKS}${BLOG_LINKS}${PROVIDER_LINKS}`;
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
    sectionLinks = `${CONTENT_LINKS}${GUIDE_LINKS}${FAQ_LINKS}${ERROR_LINKS}${DNSFOR_LINKS}${BLOG_LINKS}${PROVIDER_LINKS}`;
  }

  return `${NAV_LINKS}<h1>${h1}</h1>${intro}${sectionLinks}`;
}
