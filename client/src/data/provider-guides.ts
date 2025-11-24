// Provider-specific DNS setup guides for programmatic SEO
export interface ProviderGuide {
  slug: string;
  provider: string;
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  steps: {
    title: string;
    description: string;
    details?: string[];
  }[];
  recordTypes: {
    type: string;
    example: string;
    instructions: string;
  }[];
  troubleshooting: {
    issue: string;
    solution: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const providerGuides: ProviderGuide[] = [
  {
    slug: "cloudflare-dns-setup",
    provider: "Cloudflare",
    title: "How to Set DNS Records on Cloudflare - Complete Setup Guide",
    metaDescription: "Step-by-step guide to configure DNS records on Cloudflare. Learn how to set up A, AAAA, CNAME, MX, and TXT records with screenshots and examples.",
    h1: "How to Set Up DNS Records on Cloudflare",
    introduction: "Cloudflare is one of the world's largest DNS providers, offering fast global DNS resolution with built-in DDoS protection and CDN services. This guide walks you through configuring DNS records on Cloudflare, from A records for your website to MX records for email delivery.",
    steps: [
      {
        title: "Log into Cloudflare Dashboard",
        description: "Navigate to dash.cloudflare.com and sign in with your account credentials.",
        details: [
          "Click on your domain from the list of sites",
          "Select the 'DNS' tab from the left sidebar menu",
          "You'll see your current DNS records listed in a table"
        ]
      },
      {
        title: "Add a New DNS Record",
        description: "Click the 'Add record' button at the top of the DNS records table.",
        details: [
          "Choose the record type from the dropdown (A, AAAA, CNAME, MX, TXT, etc.)",
          "Enter the name (subdomain) or use @ for root domain",
          "Input the target value (IP address, hostname, or text content)",
          "Set TTL (Time To Live) - Auto is recommended for most cases",
          "Toggle the Proxy status (orange cloud) on or off as needed"
        ]
      },
      {
        title: "Configure Proxy Settings",
        description: "Decide whether to proxy traffic through Cloudflare's CDN.",
        details: [
          "Orange cloud (proxied): Traffic goes through Cloudflare for DDoS protection and caching",
          "Gray cloud (DNS only): Direct connection to your server, no Cloudflare features",
          "Note: Only A, AAAA, and CNAME records can be proxied"
        ]
      },
      {
        title: "Save and Verify",
        description: "Click 'Save' to create the DNS record.",
        details: [
          "The record appears immediately in your DNS table",
          "Cloudflare's DNS typically propagates within 1-5 minutes",
          "Use ReviewMyDNS to verify global propagation status"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Type: A, Name: @, IPv4 address: 192.0.2.1, TTL: Auto, Proxy: Orange (proxied)",
        instructions: "Maps your domain to an IPv4 address. Use @ for root domain (example.com) or a subdomain name like 'www' or 'app'."
      },
      {
        type: "CNAME Record",
        example: "Type: CNAME, Name: www, Target: example.com, TTL: Auto, Proxy: Orange",
        instructions: "Creates an alias pointing to another domain. Commonly used to point www to root domain or set up services like email providers."
      },
      {
        type: "MX Record",
        example: "Type: MX, Name: @, Mail server: mail.example.com, Priority: 10, TTL: Auto",
        instructions: "Directs email to your mail server. Multiple MX records can be set with different priorities (lower number = higher priority)."
      },
      {
        type: "TXT Record",
        example: "Type: TXT, Name: @, Content: v=spf1 include:_spf.google.com ~all, TTL: Auto",
        instructions: "Stores text data for verification, SPF email authentication, DKIM signatures, and domain ownership verification."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS changes not appearing after 5 minutes",
        solution: "Cloudflare DNS is fast but local caching may delay updates. Flush your DNS cache (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on Mac). Use our global DNS checker to verify propagation across different servers."
      },
      {
        issue: "Website showing Cloudflare error 1001 or 1014",
        solution: "This indicates a CNAME resolution error. Ensure your CNAME target is correct and that the destination domain has valid A/AAAA records. The target cannot be a proxied Cloudflare hostname."
      },
      {
        issue: "Email not working after adding MX records",
        solution: "MX records cannot be proxied (must be gray cloud). Verify your mail server hostnames have corresponding A records. Check SPF and DKIM TXT records are correctly configured. Allow 1-2 hours for email server DNS caches to update."
      },
      {
        issue: "SSL certificate errors with new DNS records",
        solution: "If using Cloudflare's Universal SSL, certificate generation can take up to 24 hours for new subdomains. Ensure the record is proxied (orange cloud) to use Cloudflare SSL. For custom certificates, verify your origin server SSL configuration."
      }
    ],
    faq: [
      {
        question: "What's the difference between proxied and DNS-only on Cloudflare?",
        answer: "Proxied (orange cloud) routes traffic through Cloudflare's network, providing DDoS protection, caching, and SSL. DNS-only (gray cloud) bypasses Cloudflare's proxy and connects directly to your server. Use proxied for web traffic (A, AAAA, CNAME) and DNS-only for mail servers and other services."
      },
      {
        question: "How long does Cloudflare DNS propagation take?",
        answer: "Cloudflare's authoritative DNS typically updates within 1-5 minutes globally. However, client-side caching and ISP DNS servers may take longer (up to 24-48 hours) depending on previous TTL values. You can check real-time propagation status with our global DNS checker."
      },
      {
        question: "Should I set TTL to Auto or a custom value on Cloudflare?",
        answer: "Auto (300 seconds) is recommended for most use cases as it balances performance and flexibility. Set lower TTL (60-120 seconds) before making planned DNS changes for faster propagation. Higher TTL (3600+ seconds) reduces DNS query load but delays change propagation."
      },
      {
        question: "Can I use Cloudflare DNS without using their CDN/proxy?",
        answer: "Yes! You can use Cloudflare purely for DNS management by setting all records to DNS-only (gray cloud). This gives you Cloudflare's fast global DNS network without proxying traffic. Ideal if you have your own CDN or prefer direct server connections."
      }
    ]
  },
  {
    slug: "godaddy-dns-setup",
    provider: "GoDaddy",
    title: "How to Set DNS Records on GoDaddy - Step-by-Step Tutorial",
    metaDescription: "Complete guide to configure DNS records on GoDaddy. Learn how to add A, CNAME, MX, and TXT records for your domain with detailed instructions.",
    h1: "How to Configure DNS Records on GoDaddy",
    introduction: "GoDaddy is one of the world's largest domain registrars, hosting millions of domains. This tutorial shows you how to manage DNS records in GoDaddy's domain management panel, from pointing your domain to web hosting to setting up email with MX records.",
    steps: [
      {
        title: "Access GoDaddy Domain Management",
        description: "Log into your GoDaddy account at sso.godaddy.com.",
        details: [
          "Navigate to 'My Products' from the main menu",
          "Find your domain in the 'Domains' section",
          "Click the domain name or click 'Manage' button",
          "Select 'DNS' from the domain settings tabs"
        ]
      },
      {
        title: "Navigate to DNS Management",
        description: "In the DNS management section, you'll see all existing records.",
        details: [
          "GoDaddy shows A, CNAME, MX, TXT, and other record types in separate tabs or a single list",
          "Default records include domain parking or GoDaddy hosting if set up",
          "You can add, edit, or delete records from this interface"
        ]
      },
      {
        title: "Add New DNS Record",
        description: "Click 'Add' or 'Add Record' button to create a new DNS entry.",
        details: [
          "Select record type from dropdown menu",
          "Enter host/name (use @ for root domain)",
          "Input the points to/value field (IP address, hostname, or text)",
          "Set TTL (default is 1 hour, can be customized from 30 minutes to 1 day)",
          "Click 'Save' to create the record"
        ]
      },
      {
        title: "Verify and Test Changes",
        description: "DNS changes on GoDaddy can take up to 48 hours to propagate globally.",
        details: [
          "GoDaddy typically updates within 1 hour, but global propagation varies",
          "Use ReviewMyDNS to check propagation status across global DNS servers",
          "Flush your local DNS cache to see changes faster on your computer"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Type: A, Host: @, Points to: 192.0.2.1, TTL: 1 Hour",
        instructions: "Points your domain to an IPv4 address. Use @ for root domain (example.com) or enter subdomain name like 'www' or 'blog'."
      },
      {
        type: "CNAME Record",
        example: "Type: CNAME, Host: www, Points to: example.com, TTL: 1 Hour",
        instructions: "Creates an alias for another domain name. Commonly used to point www to your root domain or configure third-party services. Cannot be used on root domain (@)."
      },
      {
        type: "MX Record",
        example: "Type: MX, Host: @, Points to: mail.example.com, Priority: 10, TTL: 1 Hour",
        instructions: "Routes email to your mail server. Add multiple MX records with different priorities for redundancy (lower number = higher priority). Common for Google Workspace, Microsoft 365."
      },
      {
        type: "TXT Record",
        example: "Type: TXT, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 1 Hour",
        instructions: "Stores text information for domain verification, SPF records for email authentication, DKIM keys, and DMARC policies. Essential for email deliverability."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS changes not visible after 1 hour",
        solution: "GoDaddy DNS can take up to 48 hours for complete global propagation, though changes typically appear within 1-4 hours. Clear your browser cache and flush DNS (ipconfig /flushdns). Use our DNS propagation checker to see which servers have updated."
      },
      {
        issue: "Cannot add CNAME for root domain (@)",
        solution: "CNAME records cannot be set on root domains due to DNS protocol limitations. Instead, use an A record pointing to your server's IP address. Some providers offer CNAME flattening, but GoDaddy requires A records for root domains."
      },
      {
        issue: "Email stops working after DNS changes",
        solution: "Ensure you didn't accidentally delete existing MX records when making changes. Email requires MX records pointing to your mail server, plus SPF and DKIM TXT records. Verify all email-related DNS records are present and correct. Email propagation can take 2-6 hours."
      },
      {
        issue: "Website shows GoDaddy parking page instead of my site",
        solution: "This means your A record isn't pointing to your web hosting IP address. Verify the IP address is correct (check with your hosting provider). Remove or edit any existing parking page A records. Changes may take 30 minutes to 2 hours to reflect."
      }
    ],
    faq: [
      {
        question: "What TTL should I set for my GoDaddy DNS records?",
        answer: "GoDaddy's default TTL of 1 hour (3600 seconds) is suitable for most situations. Use 30 minutes (1800 seconds) if you're making frequent DNS changes or testing configurations. Higher TTL values (4-8 hours) reduce DNS query load but slow down future changes."
      },
      {
        question: "How long does GoDaddy DNS propagation take?",
        answer: "GoDaddy states DNS changes can take up to 48 hours to propagate globally, though most changes complete within 1-4 hours. Propagation time depends on your previous TTL settings and local DNS server caching policies. Use our global DNS checker to monitor real-time propagation status."
      },
      {
        question: "Can I use external nameservers instead of GoDaddy's DNS?",
        answer: "Yes! You can change your domain's nameservers to external DNS providers like Cloudflare, Route53, or custom nameservers. In your domain settings, click 'Nameservers' > 'Change' > 'I'll use my own nameservers'. Note that changing nameservers takes 24-48 hours to propagate fully."
      },
      {
        question: "Why is there an @ symbol in DNS records?",
        answer: "The @ symbol represents your root domain (example.com without any subdomain). Using @ in the Host field creates a DNS record for the bare domain. Use specific text (like 'www', 'mail', 'blog') to create subdomain records (www.example.com, mail.example.com)."
      }
    ]
  }
  // More providers will be added: Namecheap, Route53, Google Domains, Hover, Bluehost
];

export function getProviderGuide(slug: string): ProviderGuide | undefined {
  return providerGuides.find(guide => guide.slug === slug);
}

export function getAllProviderGuideSlugs(): string[] {
  return providerGuides.map(guide => guide.slug);
}
