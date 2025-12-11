// Provider-specific DNS setup guides for programmatic SEO
export interface ProviderGuide {
  slug: string;
  provider: string;
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  affiliateUrl?: string;
  affiliateCta?: string;
  affiliateDescription?: string;
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
    affiliateUrl: "https://www.cloudflare.com/plans/",
    affiliateCta: "Get Started with Cloudflare Free",
    affiliateDescription: "Free DNS, CDN, and DDoS protection for your domain",
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
    affiliateUrl: "https://www.godaddy.com/domains",
    affiliateCta: "Register a Domain on GoDaddy",
    affiliateDescription: "Get your domain from the world's largest registrar",
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
  },
  {
    slug: "namecheap-dns-setup",
    provider: "Namecheap",
    title: "How to Set DNS Records on Namecheap - Complete Setup Guide",
    metaDescription: "Learn how to configure DNS records on Namecheap with our step-by-step guide. Set up A, CNAME, MX, and TXT records for your domain easily.",
    h1: "How to Set Up DNS Records on Namecheap",
    introduction: "Namecheap is a popular domain registrar known for affordable domains and user-friendly DNS management. This guide will show you how to configure DNS records on Namecheap, whether you're hosting a website, setting up email, or verifying domain ownership.",
    affiliateUrl: "https://www.namecheap.com/domains/",
    affiliateCta: "Get Affordable Domains at Namecheap",
    affiliateDescription: "Low-cost domains with free WhoisGuard privacy",
    steps: [
      {
        title: "Log into Namecheap Account",
        description: "Visit namecheap.com and sign in to your account.",
        details: [
          "Click on 'Domain List' from the left sidebar",
          "Find your domain and click the 'Manage' button",
          "Ensure 'Namecheap BasicDNS' or 'Namecheap PremiumDNS' is selected in the nameservers section",
          "If using custom nameservers, you'll need to manage DNS at that provider instead"
        ]
      },
      {
        title: "Navigate to Advanced DNS Settings",
        description: "Click the 'Advanced DNS' tab at the top of the domain management page.",
        details: [
          "You'll see existing DNS records in a table format",
          "Default records include parking page A records and mail CNAME records",
          "Click 'Add New Record' button to create custom DNS entries"
        ]
      },
      {
        title: "Add DNS Records",
        description: "Select record type and fill in required fields.",
        details: [
          "Choose record type from dropdown (A, AAAA, CNAME, MX, TXT, etc.)",
          "Enter Host (use @ for root domain, or subdomain name)",
          "Input Value/Target (IP address, hostname, or text content)",
          "Set TTL (Automatic is recommended, or custom from 60 seconds to 7200 seconds)",
          "Click the green checkmark to save the record"
        ]
      },
      {
        title: "Verify DNS Propagation",
        description: "DNS changes on Namecheap typically propagate within 30 minutes to 24 hours.",
        details: [
          "Namecheap DNS updates their authoritative servers within minutes",
          "Global propagation depends on TTL values and DNS server caching",
          "Use ReviewMyDNS to check real-time propagation across 50+ global servers",
          "Flush your local DNS cache to see changes immediately on your device"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Type: A Record, Host: @, Value: 192.0.2.1, TTL: Automatic",
        instructions: "Maps your domain to an IPv4 address. Use @ for root domain (example.com) or enter subdomain (www, blog, app). Required to point your domain to web hosting."
      },
      {
        type: "CNAME Record",
        example: "Type: CNAME Record, Host: www, Value: example.com, TTL: Automatic",
        instructions: "Creates an alias pointing to another domain. Commonly used for www subdomain or third-party services. Cannot be used on root domain (@) - use A record instead."
      },
      {
        type: "MX Record",
        example: "Type: MX Record, Host: @, Value: mail.example.com, Priority: 10, TTL: Automatic",
        instructions: "Directs email to your mail server. Set multiple MX records with priorities for redundancy. Lower priority number = higher importance. Essential for email delivery."
      },
      {
        type: "TXT Record",
        example: "Type: TXT Record, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: Automatic",
        instructions: "Stores text data for SPF email authentication, domain verification, DKIM signatures, and DMARC policies. Critical for email deliverability and security."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS changes not reflecting after several hours",
        solution: "Namecheap DNS typically propagates within 30 minutes globally, but local ISP caching can delay updates. Flush your DNS cache (ipconfig /flushdns on Windows, sudo killall -HUP mDNSResponder on Mac). Use our global DNS checker to verify which servers show the updated records."
      },
      {
        issue: "Cannot add CNAME for root domain",
        solution: "DNS protocol doesn't allow CNAME records on root domains (@). Use an A record pointing directly to your server's IP address instead. If your host requires CNAME, ask them for the IP address to use in an A record."
      },
      {
        issue: "Email delivery failing after DNS changes",
        solution: "Verify all MX records are correct with proper priority values. Ensure SPF, DKIM, and DMARC TXT records are configured if required by your email provider. Check that you didn't accidentally delete existing email records. Email DNS changes can take 2-4 hours to fully propagate."
      },
      {
        issue: "SSL certificate errors after changing DNS",
        solution: "SSL certificates are tied to domains and IP addresses. If you changed A records, your hosting provider may need to regenerate SSL certificates. This typically happens automatically but can take 1-24 hours. Contact your host if errors persist."
      }
    ],
    faq: [
      {
        question: "What's the difference between BasicDNS and PremiumDNS on Namecheap?",
        answer: "BasicDNS is free and suitable for most users, offering standard DNS management. PremiumDNS ($4.88/year) includes faster global DNS resolution, 100% uptime SLA, DDoS protection, and DNSSEC support. For most small websites, BasicDNS is sufficient."
      },
      {
        question: "How long does Namecheap DNS propagation take?",
        answer: "Namecheap updates their authoritative DNS servers within minutes. Global propagation typically completes in 30 minutes to 4 hours, though the industry standard is up to 24-48 hours. Previous TTL values and ISP DNS caching affect actual propagation time. Monitor progress with our global DNS propagation checker."
      },
      {
        question: "Should I use Automatic or Custom TTL on Namecheap?",
        answer: "Automatic TTL (1800 seconds / 30 minutes) works well for most use cases. Set custom lower TTL (60-300 seconds) before making planned DNS changes for faster propagation. Higher TTL (3600-7200 seconds) reduces DNS query load but delays future changes. Change back to higher TTL after changes propagate."
      },
      {
        question: "Can I point my Namecheap domain to external nameservers?",
        answer: "Yes! In domain management, click 'Nameservers' > 'Custom DNS' and enter external nameservers (like Cloudflare's or your hosting provider's). Nameserver changes take 24-48 hours to propagate. Once changed, you'll manage all DNS records at the external provider, not Namecheap."
      }
    ]
  },
  {
    slug: "aws-route53-dns-setup",
    provider: "AWS Route 53",
    title: "How to Set DNS Records on AWS Route 53 - Step-by-Step Guide",
    metaDescription: "Complete tutorial for configuring DNS records in AWS Route 53. Learn to create A, CNAME, MX, and TXT records with AWS best practices.",
    h1: "How to Configure DNS Records on AWS Route 53",
    introduction: "AWS Route 53 is Amazon's highly scalable cloud DNS service, offering 100% uptime SLA and global anycast routing. This guide explains how to manage DNS records in Route 53, from basic A records to advanced routing policies for load balancing and failover.",
    steps: [
      {
        title: "Access AWS Route 53 Console",
        description: "Log into AWS Management Console and navigate to Route 53.",
        details: [
          "Search for 'Route 53' in the AWS services search bar",
          "Click on 'Hosted zones' from the left navigation menu",
          "Select your domain's hosted zone from the list",
          "If you don't see your domain, create a hosted zone first"
        ]
      },
      {
        title: "Navigate to Hosted Zone",
        description: "Click on your domain name to view existing DNS records.",
        details: [
          "You'll see NS (nameserver) and SOA records created automatically",
          "These records are required for DNS to function - don't delete them",
          "Note your Route 53 nameservers if you need to update your registrar"
        ]
      },
      {
        title: "Create DNS Record",
        description: "Click 'Create record' button to add a new DNS entry.",
        details: [
          "Choose 'Simple routing' for standard DNS records (most common)",
          "Enter record name (leave blank for root domain, or add subdomain)",
          "Select record type (A, AAAA, CNAME, MX, TXT, etc.)",
          "Enter value(s) - IP address, hostname, or text content",
          "Set TTL (300 seconds default, or custom value)",
          "Click 'Create records' to save"
        ]
      },
      {
        title: "Update Nameservers at Registrar",
        description: "Point your domain registrar to Route 53 nameservers.",
        details: [
          "Copy the 4 NS record values from your hosted zone",
          "Log into your domain registrar (where you purchased the domain)",
          "Update nameservers to the 4 Route 53 NS values",
          "Nameserver changes take 24-48 hours to propagate globally",
          "Once propagated, Route 53 becomes authoritative for your domain"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Name: (blank), Type: A, Value: 192.0.2.1, TTL: 300, Routing: Simple",
        instructions: "Maps domain to IPv4 address. Leave name blank for root domain or enter subdomain. Can use alias records to point to AWS resources (ELB, S3, CloudFront) with zero TTL and no charges."
      },
      {
        type: "CNAME Record",
        example: "Name: www, Type: CNAME, Value: example.com, TTL: 300, Routing: Simple",
        instructions: "Creates alias to another domain. Cannot be used on root domain - use Alias record or A record instead. Common for subdomains and third-party service integrations."
      },
      {
        type: "MX Record",
        example: "Name: (blank), Type: MX, Value: 10 mail.example.com, TTL: 300, Routing: Simple",
        instructions: "Routes email to mail servers. Value includes priority (lower = higher priority) followed by mail server hostname. Add multiple MX records for redundancy. Don't forget trailing dot for FQDN."
      },
      {
        type: "TXT Record",
        example: "Name: (blank), Type: TXT, Value: \"v=spf1 include:_spf.google.com ~all\", TTL: 300",
        instructions: "Stores text for verification, SPF, DKIM, DMARC, and domain ownership. Enclose values in quotes if they contain spaces. Multiple TXT values can exist for one name. Critical for email authentication."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS records not resolving after creation",
        solution: "Verify your domain registrar is pointing to the correct Route 53 nameservers (check NS records in hosted zone). Nameserver changes take 24-48 hours. If nameservers are correct, verify record syntax - FQDN should end with a dot, or leave blank for Route 53 to append your zone. Use our DNS checker to verify global propagation."
      },
      {
        issue: "Cannot create CNAME on root domain",
        solution: "AWS Route 53 supports Alias records as a solution. Instead of CNAME, create an A record with 'Alias' enabled, pointing to your AWS resource (ELB, CloudFront, S3). Alias records work at root domain and are free (no query charges)."
      },
      {
        issue: "High Route 53 costs from DNS queries",
        solution: "Route 53 charges $0.40 per million queries (first 1 billion/month). Reduce costs by: increasing TTL values to cache records longer, using Alias records for AWS resources (no query charges), consolidating multiple A records into one with multiple IP values, implementing CloudFront caching."
      },
      {
        issue: "Email delivery failures with MX records",
        solution: "Ensure MX record values include priority number (e.g., '10 mail.example.com'). Verify mail server hostnames have corresponding A records. Check SPF, DKIM, DMARC TXT records are configured. MX records must point to A records, not CNAME records. Use our DNS lookup to verify MX propagation."
      }
    ],
    faq: [
      {
        question: "What's the difference between A records and Alias records in Route 53?",
        answer: "A records map to IP addresses and are charged per query. Alias records are AWS-specific, pointing to AWS resources (ELB, S3, CloudFront, API Gateway) with no query charges and automatic IP updates. Alias records can be used on root domains, while CNAME cannot. Use Alias records for AWS resources, A records for external IPs."
      },
      {
        question: "How much does AWS Route 53 cost?",
        answer: "Hosted zones cost $0.50 per month per zone. DNS queries are $0.40 per million queries (first 1 billion/month). Alias queries to AWS resources are free. Health checks are $0.50/month per endpoint. Most small websites pay $0.50-$2/month. Route 53 is more expensive than free DNS providers but offers 100% uptime SLA and advanced routing."
      },
      {
        question: "How long does Route 53 DNS propagation take?",
        answer: "Route 53 propagates changes to all AWS edge locations within 60 seconds. Global propagation to ISPs and resolvers depends on TTL values and varies from minutes to 48 hours. Lower TTL (60-300 seconds) enables faster changes but increases query costs. Use our global DNS checker to monitor propagation across worldwide servers."
      },
      {
        question: "Should I use Route 53 if I'm not using other AWS services?",
        answer: "Route 53 offers excellent reliability (100% uptime SLA) and advanced features (geolocation routing, health checks, failover) but costs more than free DNS providers. Use Route 53 if you need enterprise-grade DNS, traffic routing policies, or AWS integration. For simple DNS needs, free providers like Cloudflare offer good performance at no cost."
      }
    ]
  },
  {
    slug: "google-domains-dns-setup",
    provider: "Google Domains",
    title: "How to Set DNS Records on Google Domains - Complete Guide",
    metaDescription: "Step-by-step instructions for configuring DNS records on Google Domains. Learn to set up A, CNAME, MX, and TXT records easily.",
    h1: "How to Set Up DNS Records on Google Domains",
    introduction: "Google Domains (now Squarespace Domains) offers straightforward DNS management with Google's reliable infrastructure. This guide walks through setting up DNS records in Google Domains, from website hosting to email configuration.",
    steps: [
      {
        title: "Access Google Domains Console",
        description: "Log into domains.google.com with your Google account.",
        details: [
          "Click on your domain name from the 'My domains' list",
          "Select 'DNS' from the left sidebar menu",
          "Ensure 'Use Google Domains nameservers' is selected (not custom)",
          "If using custom nameservers, manage DNS at that provider instead"
        ]
      },
      {
        title: "Navigate to Resource Records",
        description: "Scroll down to the 'Resource records' section on the DNS page.",
        details: [
          "You'll see existing records like @ pointing to Google parking",
          "Default records include synthetic records for Google services",
          "Click 'Manage custom records' to add or edit DNS entries"
        ]
      },
      {
        title: "Add Custom DNS Record",
        description: "Click 'Create new record' to add a DNS entry.",
        details: [
          "Enter hostname (leave blank for @ root domain, or type subdomain)",
          "Select Type from dropdown (A, AAAA, CNAME, MX, TXT, etc.)",
          "Set TTL (default 3600 seconds, or custom from 300-86400)",
          "Enter Data/Value (IP address, hostname, text content, or priority for MX)",
          "Click 'Add' to save the record"
        ]
      },
      {
        title: "Verify Propagation",
        description: "DNS changes on Google Domains typically propagate quickly.",
        details: [
          "Google Domains updates authoritative servers within minutes",
          "Global propagation depends on TTL and DNS caching (typically 1-4 hours)",
          "Use ReviewMyDNS to verify changes across 50+ global DNS servers",
          "Flush local DNS cache to see updates on your device immediately"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Host: (blank for @), Type: A, TTL: 3600, Data: 192.0.2.1",
        instructions: "Points your domain to an IPv4 address. Leave host blank for root domain (example.com) or enter subdomain name (www, blog). Required to connect domain to web hosting server."
      },
      {
        type: "CNAME Record",
        example: "Host: www, Type: CNAME, TTL: 3600, Data: example.com",
        instructions: "Creates an alias pointing to another domain name. Cannot be used on root domain - use A record instead. Common for www subdomain or third-party service integrations like email providers."
      },
      {
        type: "MX Record",
        example: "Host: (blank), Type: MX, TTL: 3600, Data: 10 mail.example.com",
        instructions: "Directs email to mail server. Data field includes priority (lower = higher priority) followed by server hostname. Add multiple MX records with different priorities for email redundancy."
      },
      {
        type: "TXT Record",
        example: "Host: (blank), Type: TXT, TTL: 3600, Data: v=spf1 include:_spf.google.com ~all",
        instructions: "Stores text data for SPF email authentication, domain verification, DKIM signatures, and DMARC policies. Essential for email deliverability and proving domain ownership to third-party services."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS changes not visible after 1 hour",
        solution: "Google Domains typically propagates within 15-30 minutes to their nameservers. Global propagation to ISPs can take longer (up to 24-48 hours) due to DNS caching. Flush your local DNS cache (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on Mac). Use our DNS propagation checker to see which servers have updated records."
      },
      {
        issue: "Cannot use CNAME on root domain",
        solution: "DNS specification prohibits CNAME records on root domains (@). Google Domains requires an A record pointing to an IP address for root domains. If your hosting provider only gives a CNAME, ask for the IP address to use in an A record, or consider using Cloudflare's CNAME flattening."
      },
      {
        issue: "Email stopped working after changing DNS",
        solution: "Verify you didn't delete existing MX records during DNS changes. Email requires MX records pointing to mail servers, plus SPF and DKIM TXT records. Check Google Workspace or email provider documentation for correct MX values. Email propagation can take 2-6 hours globally."
      },
      {
        issue: "Website shows Google parking page instead of my site",
        solution: "This indicates A records are still pointing to Google's parking IP (typically 216.239.32.21). Update or delete the @ A record to point to your hosting provider's IP address. Changes appear within 30 minutes on Google's servers, but ISP caching may delay 1-4 hours."
      }
    ],
    faq: [
      {
        question: "What happened to Google Domains?",
        answer: "Google sold Google Domains to Squarespace in June 2023. Existing Google Domains customers can continue using the service with the same features and pricing. Domains are gradually being migrated to Squarespace, but DNS management functionality remains unchanged during the transition."
      },
      {
        question: "What TTL should I use on Google Domains?",
        answer: "The default 3600 seconds (1 hour) is suitable for most stable DNS records. Use lower TTL (300-600 seconds) before making planned changes for faster propagation. Higher TTL (14400-86400 seconds) reduces DNS query load and improves performance for rarely-changing records. Adjust TTL before changes, then increase after propagation."
      },
      {
        question: "How long does Google Domains DNS propagation take?",
        answer: "Google Domains updates their authoritative nameservers within 10-30 minutes. Complete global propagation varies from 1-4 hours typically, up to 48 hours in rare cases. Propagation time depends on previous TTL values and ISP DNS caching policies. Monitor real-time propagation with our global DNS checker tool."
      },
      {
        question: "Can I use external nameservers with Google Domains?",
        answer: "Yes! In DNS settings, select 'Use custom name servers' and enter nameservers from providers like Cloudflare or your hosting company. Nameserver changes take 24-48 hours to propagate. Once changed, manage all DNS records at the external provider. You can switch back to Google nameservers anytime."
      }
    ]
  },
  {
    slug: "bluehost-dns-setup",
    provider: "Bluehost",
    title: "How to Set DNS Records on Bluehost - Step-by-Step Tutorial",
    metaDescription: "Learn how to configure DNS records on Bluehost hosting. Complete guide for setting up A, CNAME, MX, and TXT records with screenshots.",
    h1: "How to Configure DNS Records on Bluehost",
    introduction: "Bluehost is one of the most popular web hosting providers, powering millions of websites worldwide. This guide shows you how to manage DNS records in Bluehost's control panel, whether you're hosting email, adding subdomains, or integrating third-party services.",
    affiliateUrl: "https://www.bluehost.com/hosting",
    affiliateCta: "Start with Bluehost Hosting",
    affiliateDescription: "WordPress recommended hosting starting at $2.95/mo",
    steps: [
      {
        title: "Log into Bluehost Control Panel",
        description: "Access your Bluehost account at my.bluehost.com.",
        details: [
          "Click on 'Domains' in the left sidebar navigation",
          "Select the domain you want to manage from the domains list",
          "Click 'Manage' next to the domain name",
          "Navigate to the 'DNS' tab or 'Advanced' section"
        ]
      },
      {
        title: "Access DNS Zone Editor",
        description: "Find the DNS management section in your domain settings.",
        details: [
          "Look for 'Zone Editor' or 'DNS Zone Editor' in the advanced settings",
          "You'll see existing DNS records in a table format",
          "Common default records include A records, MX records, and CNAME records",
          "Bluehost may show simplified or advanced editor options"
        ]
      },
      {
        title: "Add New DNS Record",
        description: "Click 'Add Record' or the + button to create a new DNS entry.",
        details: [
          "Select record type from dropdown (A, AAAA, CNAME, MX, TXT, etc.)",
          "Enter Host/Name (use @ for root domain, or subdomain like www, mail)",
          "Input Points To/Value (IP address, hostname, or text content)",
          "Set TTL if available (typically 14400 seconds default)",
          "For MX records, also enter Priority value (lower = higher priority)",
          "Click 'Save' or 'Add Record' to create the entry"
        ]
      },
      {
        title: "Verify DNS Propagation",
        description: "Wait for DNS changes to propagate globally.",
        details: [
          "Bluehost DNS updates typically take 4-24 hours to propagate",
          "Changes appear on Bluehost servers within 1-2 hours",
          "Global propagation depends on TTL values and DNS caching",
          "Use ReviewMyDNS to check real-time propagation across worldwide DNS servers",
          "Clear your browser cache and flush DNS for immediate local testing"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Host: @, Type: A, Points To: 192.0.2.1, TTL: 14400",
        instructions: "Points your domain to an IPv4 address. Use @ for root domain (example.com) or enter subdomain (www, blog, shop). Required to connect your domain to Bluehost or external hosting servers."
      },
      {
        type: "CNAME Record",
        example: "Host: www, Type: CNAME, Points To: example.com, TTL: 14400",
        instructions: "Creates an alias pointing to another domain. Commonly used for www subdomain or third-party services. Cannot be used on root domain (@) - use A record instead. Bluehost often pre-configures www CNAME."
      },
      {
        type: "MX Record",
        example: "Host: @, Type: MX, Points To: mail.example.com, Priority: 10, TTL: 14400",
        instructions: "Routes email to mail servers. Priority determines order (lower number = higher priority). Add multiple MX records for backup mail servers. Essential for email delivery with Bluehost email or external providers like Google Workspace."
      },
      {
        type: "TXT Record",
        example: "Host: @, Type: TXT, Value: v=spf1 include:_spf.google.com ~all, TTL: 14400",
        instructions: "Stores text data for SPF email authentication, domain verification, DKIM keys, and DMARC policies. Critical for email deliverability and security. Used to verify domain ownership with third-party services."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS changes not showing after 24 hours",
        solution: "Bluehost DNS can take up to 24-48 hours for complete global propagation. Verify changes were saved correctly in the Zone Editor. Check if your domain is using Bluehost nameservers (not external). Flush your local DNS cache and try from different devices/networks. Use our DNS propagation tool to identify which servers haven't updated."
      },
      {
        issue: "Website down after changing A record",
        solution: "Verify the new A record IP address is correct (check with your hosting provider). Ensure you updated the @ (root) A record and www CNAME if needed. Bluehost's default A record points to your hosting account - changing it redirects traffic. If using Bluehost hosting, use the IP from cPanel. Changes can take 4-12 hours to propagate."
      },
      {
        issue: "Email not working after DNS changes",
        solution: "Check that MX records point to correct mail servers (mail.example.com or Bluehost's mail servers). Bluehost email requires specific MX records - verify values in cPanel under Email Routing. Ensure SPF and DKIM TXT records exist if using Bluehost email. Email propagation takes 2-6 hours. Don't delete default email records unless migrating to external email."
      },
      {
        issue: "SSL certificate errors after updating DNS",
        solution: "Bluehost provides free SSL certificates, but they need time to generate for new domains or subdomains. Wait 24 hours after DNS changes for SSL to activate. In cPanel, go to SSL/TLS Status to force certificate installation. Ensure your domain is pointing to Bluehost nameservers for automatic SSL."
      }
    ],
    faq: [
      {
        question: "What are Bluehost's default nameservers?",
        answer: "Bluehost typically assigns nameservers like ns1.bluehost.com and ns2.bluehost.com (exact values vary). Find your specific nameservers in Bluehost account under Domains > Nameservers. These must be set at your domain registrar for Bluehost DNS management to work. Nameserver changes take 24-48 hours to propagate globally."
      },
      {
        question: "How long does Bluehost DNS propagation take?",
        answer: "Bluehost states DNS changes can take 24-48 hours for complete global propagation. Most changes appear within 4-12 hours. Propagation time varies based on your previous TTL settings and local ISP DNS caching. Use our global DNS propagation checker to monitor real-time status across worldwide servers."
      },
      {
        question: "Should I use Bluehost DNS or external DNS like Cloudflare?",
        answer: "Bluehost DNS is sufficient for most websites and integrates seamlessly with Bluehost hosting. External DNS like Cloudflare offers faster global resolution, DDoS protection, and advanced features but requires managing DNS separately. If using Bluehost hosting with basic needs, their DNS is fine. For high-traffic sites or advanced security, consider Cloudflare."
      },
      {
        question: "Can I manage DNS if my domain is registered elsewhere?",
        answer: "Yes! You can use Bluehost DNS even if your domain is registered at GoDaddy, Namecheap, etc. Point your domain registrar's nameservers to Bluehost's nameservers (found in your Bluehost account). After 24-48 hours propagation, manage all DNS records in Bluehost cPanel. You keep domain registration at original registrar but use Bluehost for DNS and hosting."
      }
    ]
  },
  {
    slug: "hover-dns-setup",
    provider: "Hover",
    title: "How to Set DNS Records on Hover - Complete Setup Guide",
    metaDescription: "Step-by-step guide for configuring DNS records on Hover. Learn to set up A, CNAME, MX, and TXT records for your domain easily.",
    h1: "How to Set Up DNS Records on Hover",
    introduction: "Hover is a no-nonsense domain registrar focused on simplicity and privacy, without upsells or aggressive marketing. This guide demonstrates how to configure DNS records in Hover's clean interface, from pointing your domain to hosting to setting up email services.",
    steps: [
      {
        title: "Access Hover Control Panel",
        description: "Log into hover.com with your account credentials.",
        details: [
          "Click on your domain name from the domains list on the dashboard",
          "Select the 'DNS' tab at the top of the domain page",
          "You'll see existing DNS records in a simple, clean table",
          "Hover shows record type, hostname, and value columns"
        ]
      },
      {
        title: "View Existing DNS Records",
        description: "Review current DNS configuration before making changes.",
        details: [
          "Default records include Hover parking page A record and CNAME for www",
          "Hover may include email forwarding MX records if configured",
          "Note existing TTL values before making changes",
          "You can edit or delete existing records using the action buttons"
        ]
      },
      {
        title: "Add New DNS Record",
        description: "Click 'Add New' button to create a custom DNS record.",
        details: [
          "Select record type from dropdown (A, AAAA, CNAME, MX, TXT, SRV, NS)",
          "Enter Hostname (leave blank for @ root domain, or type subdomain)",
          "Input Value/Target (IP address for A, hostname for CNAME, text for TXT)",
          "For MX records, also enter Priority (typically 10, 20, 30 for multiple servers)",
          "TTL is automatically set to 900 seconds (15 minutes) by default",
          "Click 'Save' to add the record"
        ]
      },
      {
        title: "Verify and Test Changes",
        description: "DNS changes on Hover propagate relatively quickly.",
        details: [
          "Hover DNS updates their nameservers within minutes",
          "Global propagation typically completes within 1-4 hours",
          "Full propagation can take up to 24-48 hours depending on TTL",
          "Use ReviewMyDNS to check propagation status across 50+ global DNS servers",
          "Flush local DNS cache to test changes on your device immediately"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Type: A, Hostname: (blank for @), Value: 192.0.2.1, TTL: 900",
        instructions: "Points your domain to an IPv4 address. Leave hostname blank for root domain (example.com) or enter subdomain (www, blog, store). Required to connect domain to web hosting server."
      },
      {
        type: "CNAME Record",
        example: "Type: CNAME, Hostname: www, Value: example.com, TTL: 900",
        instructions: "Creates an alias pointing to another domain name. Cannot be used on root domain (@) - use A record instead. Commonly used for www subdomain or connecting to third-party platforms like Shopify or WordPress.com."
      },
      {
        type: "MX Record",
        example: "Type: MX, Hostname: (blank), Value: mail.example.com, Priority: 10, TTL: 900",
        instructions: "Directs email to mail servers. Priority determines routing order (lower = higher priority). Add multiple MX records for redundancy. Required for custom email hosting or services like Google Workspace, Microsoft 365."
      },
      {
        type: "TXT Record",
        example: "Type: TXT, Hostname: (blank), Value: v=spf1 include:_spf.google.com ~all, TTL: 900",
        instructions: "Stores text information for SPF email authentication, DKIM signatures, DMARC policies, and domain verification. Essential for email deliverability and security. Used by email providers to prevent spoofing."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS changes not appearing after several hours",
        solution: "Hover DNS typically propagates within 1-4 hours globally. Check that you clicked 'Save' after adding the record. Verify your domain is using Hover nameservers (ns1.hover.com, ns2.hover.com). Flush your local DNS cache and try from different networks. Use our global DNS checker to identify servers still showing old records."
      },
      {
        issue: "Cannot create CNAME for root domain",
        solution: "DNS protocol prohibits CNAME records on root domains (@). Hover requires an A record pointing to an IP address for root domains. If your hosting provider only provides a CNAME, contact them for the underlying IP address to use in an A record."
      },
      {
        issue: "Email delivery failing after DNS update",
        solution: "Verify MX records point to correct mail servers with proper priority values. Ensure you didn't delete existing email forwarding or MX records. Check SPF and DKIM TXT records if using email services. Hover's email forwarding requires specific MX records. Email DNS changes can take 2-6 hours to propagate to mail servers."
      },
      {
        issue: "Website showing Hover parking page instead of my site",
        solution: "This means the A record is still pointing to Hover's parking IP (typically 64.98.145.30). Update or replace the @ A record to point to your web hosting IP address. Changes appear on Hover's nameservers within 15-30 minutes, but ISP caching may delay visibility 1-4 hours."
      }
    ],
    faq: [
      {
        question: "What are Hover's nameservers?",
        answer: "Hover's default nameservers are ns1.hover.com and ns2.hover.com. You can find your specific nameserver values in your domain's 'Overview' tab. These nameservers must be set at your domain registrar (if registered elsewhere) for Hover DNS to work. Nameserver changes propagate in 24-48 hours."
      },
      {
        question: "How long does Hover DNS propagation take?",
        answer: "Hover updates their authoritative DNS servers within minutes of saving changes. Global propagation to ISPs and resolvers typically takes 1-4 hours, though the industry standard is up to 48 hours. Hover uses a default TTL of 900 seconds (15 minutes) which enables relatively fast propagation. Use our DNS propagation checker to monitor worldwide status."
      },
      {
        question: "Does Hover offer email forwarding?",
        answer: "Yes! Hover includes free email forwarding for up to 100 email addresses per domain. In your domain settings, go to 'Email' tab to set up forwarding (e.g., forward hello@yourdomain.com to your Gmail). Hover automatically manages the required MX and other email DNS records for forwarding."
      },
      {
        question: "Can I use external nameservers instead of Hover's DNS?",
        answer: "Yes! In domain settings, click 'Edit Nameservers' and enter custom nameservers from providers like Cloudflare or your hosting company. Once changed, manage all DNS records at the external provider. Nameserver changes take 24-48 hours to propagate. You can switch back to Hover nameservers anytime to regain Hover DNS management."
      }
    ]
  },
  {
    slug: "nxdomain-error-fix",
    provider: "NXDOMAIN Error",
    title: "How to Fix NXDOMAIN Error - DNS Resolution Failed",
    metaDescription: "NXDOMAIN error means your domain doesn't exist in DNS. Learn what causes it and how to fix it quickly with our troubleshooting guide.",
    h1: "Fix NXDOMAIN DNS Error: Complete Troubleshooting Guide",
    introduction: "NXDOMAIN (Non-Existent Domain) is one of the most common DNS errors, occurring when your domain name cannot be found in DNS servers. This guide explains what causes NXDOMAIN errors and provides step-by-step solutions to get your domain working again.",
    steps: [
      {
        title: "Verify Domain Registration",
        description: "Ensure your domain is properly registered and hasn't expired.",
        details: [
          "Check your domain registrar account (GoDaddy, Namecheap, etc.)",
          "Verify domain registration status is 'Active' not 'Expired' or 'Suspended'",
          "Renew domain if it expired recently",
          "Check domain registrar inbox for auto-renewal failure notifications"
        ]
      },
      {
        title: "Check Nameservers Are Correct",
        description: "NXDOMAIN often means nameservers point to wrong DNS provider.",
        details: [
          "Log into domain registrar and check current nameservers",
          "Verify they match your DNS provider's nameservers",
          "If using custom DNS (Cloudflare, Route53), ensure nameservers are updated at registrar",
          "Nameserver changes take 24-48 hours to propagate"
        ]
      },
      {
        title: "Wait for DNS Propagation",
        description: "Recent nameserver changes need time to propagate globally.",
        details: [
          "After updating nameservers, wait 24-48 hours minimum",
          "Some ISPs cache DNS longer than others",
          "Use ReviewMyDNS to check propagation status across servers",
          "If nameservers changed recently, NXDOMAIN will resolve after propagation"
        ]
      },
      {
        title: "Add DNS Records",
        description: "Ensure A records exist for your domain.",
        details: [
          "Log into DNS provider dashboard",
          "Add A record for @ (root domain) pointing to your server IP",
          "Add A record for www pointing to same IP or CNAME to root",
          "Wait 15-30 minutes for records to propagate"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record Missing",
        example: "Symptom: No A or AAAA records exist for @ (root domain)",
        instructions: "NXDOMAIN often occurs when no A records exist. Add A record with @ as hostname and your server IP. This creates the root domain in DNS."
      },
      {
        type: "Nameserver Issue",
        example: "Nameservers at registrar don't match DNS provider nameservers",
        instructions: "Registrar nameservers must point to your DNS provider. Mismatch causes NXDOMAIN. Update registrar nameservers to match DNS provider."
      },
      {
        type: "Expired Domain",
        example: "Domain registration expired without auto-renewal",
        instructions: "Expired domains are removed from DNS and return NXDOMAIN. Renew domain immediately at registrar. Takes 1-4 hours to restore."
      },
      {
        type: "Propagation Delay",
        example: "Recent nameserver change still propagating globally",
        instructions: "Nameserver changes take 24-48 hours. Use DNS propagation checker to see if some servers still show NXDOMAIN while others have updated."
      }
    ],
    troubleshooting: [
      {
        issue: "NXDOMAIN persists even after adding A records",
        solution: "Verify your A record points to correct IP (check with hosting provider). Ensure nameservers at registrar match DNS provider. If recently changed, wait additional 12-24 hours. Use 'nslookup domain.com' command to test from different DNS servers. Check if domain registration actually active (not suspended)."
      },
      {
        issue: "DNS worked before, now showing NXDOMAIN",
        solution: "Check if domain registration expired or was not renewed. Verify DNS provider account is active and billing current. Check if nameservers were accidentally changed. Review recent DNS changes - you may have deleted critical records. Use DNS history if available."
      },
      {
        issue: "Subdomain returns NXDOMAIN but root domain works",
        solution: "Add A or CNAME record for subdomain. For example, if www.example.com shows NXDOMAIN, add CNAME record 'www' pointing to 'example.com' or A record 'www' pointing to IP. Root domain DNS must exist first."
      },
      {
        issue: "NXDOMAIN from some servers, works on others",
        solution: "DNS hasn't fully propagated yet. Different servers have different TTL values and update schedules. This is normal after changes. Wait 24-48 hours for complete global propagation. Use our global DNS checker to monitor which servers have updated."
      }
    ],
    faq: [
      {
        question: "What exactly does NXDOMAIN mean?",
        answer: "NXDOMAIN (Non-Existent Domain) means the authoritative DNS server received a query for a domain that doesn't exist in its database. It's the DNS server saying 'I don't have any records for that domain.' This happens when A records are missing or nameservers are misconfigured."
      },
      {
        question: "How long to fix NXDOMAIN after registering domain?",
        answer: "New domain registration takes 24-48 hours for DNS to propagate globally. Your registrar automatically creates nameserver records, but ISP and resolver caching delays visibility. After 4-6 hours most people can resolve it. Full 24-48 hours ensures 99% of worldwide resolvers show it."
      },
      {
        question: "Can I fix NXDOMAIN if my domain expired?",
        answer: "Yes! Renew expired domain immediately at your registrar. DNS records are usually preserved during renewal. Within 1-4 hours of renewal, NXDOMAIN should resolve. If records were deleted during expiration, re-add them. Most registrars hold expired domains for 30 days before permanent deletion."
      },
      {
        question: "Will NXDOMAIN hurt my SEO?",
        answer: "If NXDOMAIN persists for days/weeks, Google stops indexing your site. However, if resolved within 24-48 hours, SEO impact is minimal. Google's crawler will retry and re-index once domain works. Frequent NXDOMAIN errors can eventually harm rankings if they last weeks, so fix promptly."
      }
    ]
  },
  {
    slug: "servfail-error-fix",
    provider: "SERVFAIL Error",
    title: "How to Fix SERVFAIL DNS Error - Complete Guide",
    metaDescription: "SERVFAIL means your DNS server encountered an error. Learn what causes it and how to troubleshoot and resolve SERVFAIL errors.",
    h1: "Fix SERVFAIL Error: DNS Server Failure Troubleshooting",
    introduction: "SERVFAIL is a DNS error indicating the authoritative nameserver cannot process your query. Unlike NXDOMAIN (domain doesn't exist), SERVFAIL means the DNS infrastructure itself has a problem. This guide helps diagnose and resolve SERVFAIL errors.",
    steps: [
      {
        title: "Check DNS Provider Status",
        description: "Verify your DNS provider isn't experiencing outages.",
        details: [
          "Visit DNS provider's status page (Cloudflare, Route53, etc.)",
          "Check if there are active incidents or maintenance windows",
          "Monitor Twitter/status channels for provider announcements",
          "SERVFAIL during maintenance usually resolves automatically"
        ]
      },
      {
        title: "Verify DNS Record Configuration",
        description: "SERVFAIL often caused by misconfigured DNS records.",
        details: [
          "Check for invalid CNAME records (CNAME pointing to invalid targets)",
          "Verify all records have valid syntax (no typos in hostnames)",
          "Look for CNAME records on root domain @ (not allowed)",
          "Check for circular DNS chains (record A points to B, B points back to A)"
        ]
      },
      {
        title: "Test DNS Propagation",
        description: "Use multiple DNS servers to isolate the problem.",
        details: [
          "Test with Google DNS: 8.8.8.8",
          "Test with Cloudflare DNS: 1.1.1.1",
          "Test with your ISP DNS",
          "If SERVFAIL appears on some but not all, propagation is in progress"
        ]
      },
      {
        title: "Fix or Delete Problem Records",
        description: "Remove or correct DNS records causing SERVFAIL.",
        details: [
          "Delete any CNAME records on root domain",
          "Fix typos in DNS record targets",
          "Remove circular DNS chains",
          "Save changes and wait 15-30 minutes for propagation"
        ]
      }
    ],
    recordTypes: [
      {
        type: "Invalid CNAME Target",
        example: "CNAME pointing to non-existent hostname (e.g., 'cdn.example.com' doesn't have A record)",
        instructions: "CNAME must point to hostname with corresponding A record. Ensure target hostname has valid DNS records pointing to IP."
      },
      {
        type: "CNAME on Root Domain",
        example: "@ CNAME pointing somewhere (violates DNS spec)",
        instructions: "Root domain cannot have CNAME record. Use A record or Alias record instead. Delete CNAME @, add A record @ with IP."
      },
      {
        type: "Syntax Error in Record",
        example: "Hostname contains invalid characters or spacing",
        instructions: "DNS record values must follow strict format. Hostnames only: a-z, 0-9, hyphens. No spaces or special characters. Fix typos."
      },
      {
        type: "Circular DNS Chain",
        example: "A points to B, B points back to A, creating infinite loop",
        instructions: "Break the cycle by making one record point directly to IP address. Identify circular references and edit one record to have IP target."
      }
    ],
    troubleshooting: [
      {
        issue: "SERVFAIL on all DNS servers",
        solution: "DNS provider likely has outage or your DNS zone is corrupted. Check provider status page for incidents. If no outage, check for misconfigured records (invalid CNAME, circular chains). Contact provider support if zone appears corrupted. You may need to delete and recreate problematic records."
      },
      {
        issue: "SERVFAIL from some servers, OK from others",
        solution: "DNS changes are still propagating globally. Different nameservers have different configurations during propagation window. This is normal and will resolve within 15-30 minutes. Use our global DNS checker to see which servers still show SERVFAIL."
      },
      {
        issue: "SERVFAIL started suddenly for working domain",
        solution: "Recent DNS change likely caused it. Check recent record additions/edits for typos or invalid configurations. Delete the problematic record or fix it. If can't identify, check DNS provider's change log. Rollback recent changes if necessary."
      },
      {
        issue: "SERVFAIL for specific record type only (e.g., only MX fails)",
        solution: "That record type has configuration error. Check MX records for syntax errors, verify mail server hostnames have corresponding A records. For email-specific SERVFAIL, review all email-related DNS records (MX, SPF, DKIM)."
      }
    ],
    faq: [
      {
        question: "What's the difference between NXDOMAIN and SERVFAIL?",
        answer: "NXDOMAIN means the domain doesn't exist in DNS. SERVFAIL means the domain exists but the DNS server encountered an error processing your query. NXDOMAIN = 'I don't have this domain' vs SERVFAIL = 'I have this domain but something's broken.'"
      },
      {
        question: "Can SERVFAIL be caused by my ISP DNS?",
        answer: "Yes, ISP DNS servers can cause SERVFAIL if they're misconfigured or offline. Test with public DNS (Google 8.8.8.8, Cloudflare 1.1.1.1). If those work but ISP DNS fails, problem is ISP's DNS infrastructure. Contact your ISP about their DNS problems."
      },
      {
        question: "How long does it take to fix SERVFAIL?",
        answer: "If caused by DNS provider outage, it resolves when provider fixes it (usually 15 minutes - 2 hours). If caused by your misconfigured records, fix appears in 15-30 minutes after you correct the record. Provider typically needs to resolve it within 1 hour or it's a major incident."
      },
      {
        question: "Does SERVFAIL affect my website visitors?",
        answer: "Yes, visitors cannot resolve your domain during SERVFAIL. Their browsers show 'Cannot find server' errors. Email delivery fails if SERVFAIL affects MX records. This severely impacts user experience. SERVFAIL should be fixed as highest priority - typically within minutes."
      }
    ]
  },
  {
    slug: "spf-too-many-lookups-error",
    provider: "SPF Too Many Lookups",
    title: "Fix SPF Too Many Lookups Error - Email Authentication",
    metaDescription: "SPF too many lookups error breaks email delivery. Learn what causes it and how to optimize your SPF record to fix email authentication.",
    h1: "Fix SPF Too Many Lookups: Email Authentication Error",
    introduction: "SPF (Sender Policy Framework) 'too many lookups' error occurs when your SPF record exceeds DNS lookup limits. This causes emails to fail authentication and get rejected or marked as spam. This guide shows how to fix and optimize SPF records.",
    steps: [
      {
        title: "Understand SPF Lookup Limit",
        description: "SPF allows maximum 10 DNS lookups per record.",
        details: [
          "Each 'include:' directive counts as one lookup",
          "Nested includes count toward limit (includes within includes)",
          "Over 10 lookups = SPF fails entirely = email fails authentication",
          "Most domains hit this limit after adding 5-6 email services"
        ]
      },
      {
        title: "Count Current SPF Lookups",
        description: "Determine how many lookups your SPF record uses.",
        details: [
          "Use SPF lookup tool or manual counting",
          "Count each 'include:' directive as 1 lookup",
          "Add nested includes from referenced SPF records",
          "Some includes expand to multiple lookups"
        ]
      },
      {
        title: "Reduce SPF Complexity",
        description: "Consolidate includes and remove unnecessary services.",
        details: [
          "Remove SPF records for email services no longer used",
          "Consolidate multiple services under single include if possible",
          "Use A, MX, and IP records instead of includes where possible",
          "Consider DNS flattening/consolidation services"
        ]
      },
      {
        title: "Implement SPF Optimization",
        description: "Restructure SPF for efficiency.",
        details: [
          "Move rarely-used services to separate subdomain SPF",
          "Use IP ranges instead of includes for simple cases",
          "Implement DNS consolidation solution if using many services",
          "Test final SPF record before deploying"
        ]
      }
    ],
    recordTypes: [
      {
        type: "SPF With Too Many Includes",
        example: "v=spf1 include:_spf.google.com include:sendgrid.com include:mailchimp.com include:spf.salesforce.com ~all",
        instructions: "Each include counts as one lookup. This simple example uses 4 lookups. Add more services and nested includes quickly exceed 10-lookup limit. Solution: consolidate services or remove unused ones."
      },
      {
        type: "Optimized SPF Record",
        example: "v=spf1 include:_spf.google.com ip4:192.0.2.0/24 ~all",
        instructions: "Combines include (1 lookup) with direct IP range (0 lookups). Direct IPs don't count toward lookup limit. Use this approach for custom mail servers."
      },
      {
        type: "SPF With Nested Includes",
        example: "include:_spf.sendgrid.net which itself includes other SPF records",
        instructions: "Nested includes count toward your 10-lookup limit. If include:_spf.sendgrid.net references 3 other SPF records, that counts as 4 lookups total (1 for initial, 3 nested)."
      },
      {
        type: "SPF Redirect Solution",
        example: "v=spf1 redirect=_spf.company.com (references external SPF record)",
        instructions: "Redirect mechanism allows SPF reuse without counting as lookup. Useful for complex multi-service setups. Redirect record becomes authoritative for SPF checking."
      }
    ],
    troubleshooting: [
      {
        issue: "Emails rejected with SPF 'too many lookups' error",
        solution: "Count SPF lookups in your record (each include = 1 lookup, max 10). Remove unnecessary email services or consolidate. Use IP ranges instead of includes for simple cases. Test SPF record with SPF checking tools. Consider DNS consolidation service if using many platforms."
      },
      {
        issue: "Added email service but now SPF fails",
        solution: "Likely exceeded 10-lookup limit by adding new include. Remove one or more old services you no longer use. Use SPF flattening service to optimize record. Some platforms offer individual IP addresses instead of includes - use those. Test before deploying."
      },
      {
        issue: "SPF includes reference records that reference other records",
        solution: "These nested includes count toward your limit. Flatten the includes: instead of including an include, include the final IP addresses directly if you have access. Or ask service provider for consolidated SPF include with fewer nested references."
      },
      {
        issue: "Some emails pass SPF, others fail",
        solution: "SPF may be borderline at 10 lookups. Some resolvers are stricter than others. Reduce lookups below 10 to ensure consistency. Remove least-critical email service to get safety margin. Test with different email providers."
      }
    ],
    faq: [
      {
        question: "What causes SPF 'too many lookups'?",
        answer: "SPF mechanism allows maximum 10 DNS lookups per SPF record query. Each 'include:' directive counts as one lookup. Nested includes (includes within includes) also count. Services like Google Workspace, SendGrid, Mailchimp each require include directives. Adding too many email services quickly exceeds 10-lookup limit."
      },
      {
        question: "How do I count SPF lookups?",
        answer: "Count each 'include:' directive in your SPF record as 1 lookup. Then research each included SPF record and count their includes too (nested lookups). Use online SPF analysis tools that show lookup count. Goal is keeping total ≤10 lookups."
      },
      {
        question: "Does SPF too many lookups break all email?",
        answer: "Yes, SPF fails entirely when exceeding 10 lookups. Receiving mail servers reject emails or send to spam. Email authentication fails completely. This is a hard limit - even 1 lookup over 10 causes complete failure, not partial failure."
      },
      {
        question: "What's the best way to fix too many lookups?",
        answer: "1) Remove unused email services' SPF records. 2) Use IP addresses instead of includes where possible. 3) Use DNS consolidation service to flatten includes. 4) Ask services for individual IP addresses instead of SPF includes. 5) Implement SPF redirect for complex setups."
      }
    ]
  },
  {
    slug: "dmarc-authentication-failed",
    provider: "DMARC Authentication Failed",
    title: "Fix DMARC Authentication Failed Error - Email Security",
    metaDescription: "DMARC authentication failing causes emails to be rejected or marked spam. Learn how to configure DMARC correctly for email security.",
    h1: "Fix DMARC Authentication Failed: Email Security Setup",
    introduction: "DMARC (Domain-based Message Authentication, Reporting and Conformance) authentication failures occur when SPF or DKIM fail. This guide helps diagnose and fix DMARC issues to improve email deliverability and security.",
    steps: [
      {
        title: "Verify SPF Record Exists",
        description: "DMARC requires SPF authentication to pass.",
        details: [
          "Check your domain's SPF record (TXT record starting with 'v=spf1')",
          "SPF must include authorized mail servers",
          "SPF must align with email 'From:' domain",
          "If SPF missing or broken, DMARC fails"
        ]
      },
      {
        title: "Verify DKIM Signature",
        description: "DMARC requires DKIM authentication to pass.",
        details: [
          "Check DKIM TXT records exist (e.g., 'selector1._domainkey.example.com')",
          "Email provider gives you DKIM selector and public key",
          "Add DKIM TXT record to your DNS",
          "If DKIM missing or incorrectly configured, DMARC fails"
        ]
      },
      {
        title: "Create DMARC Policy Record",
        description: "Add DMARC TXT record to your domain.",
        details: [
          "Create TXT record named '_dmarc' with value like 'v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com'",
          "p=none (monitoring only, don't reject emails) for initial setup",
          "p=quarantine (send failing emails to spam) after testing",
          "p=reject (reject failing emails) only after fully validated"
        ]
      },
      {
        title: "Monitor DMARC Reports",
        description: "Review DMARC reports to identify issues.",
        details: [
          "DMARC sends daily reports to email in 'rua=' tag",
          "Reports show SPF/DKIM pass/fail rates",
          "Identify which services are failing authentication",
          "Adjust SPF/DKIM configuration based on report insights"
        ]
      }
    ],
    recordTypes: [
      {
        type: "DMARC Policy Record (Monitoring)",
        example: "Type: TXT, Host: _dmarc, Value: v=DMARC1; p=none; rua=mailto:dmarc@example.com",
        instructions: "p=none means don't reject emails, just monitor. Use this for initial DMARC setup to see authentication results without blocking email."
      },
      {
        type: "DMARC Policy Record (Quarantine)",
        example: "Type: TXT, Host: _dmarc, Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com; fo=1",
        instructions: "p=quarantine sends failing emails to spam folder. Use after validating SPF/DKIM working correctly. fo=1 sends daily reports for failures."
      },
      {
        type: "DMARC Policy Record (Reject)",
        example: "Type: TXT, Host: _dmarc, Value: v=DMARC1; p=reject; rua=mailto:dmarc@example.com; pct=100",
        instructions: "p=reject blocks emails failing DMARC. Only use after fully validated. pct=100 rejects 100% of failing emails. Start at pct=10 and gradually increase."
      },
      {
        type: "DKIM TXT Record",
        example: "Type: TXT, Host: selector1._domainkey, Value: v=DKIM1; k=rsa; p=MIGfMA0BgkqhkiG9w0BAQ...",
        instructions: "DKIM public key provided by email provider. 'selector1' name varies by provider (Google Workspace uses selector1, others may vary). Required for DMARC to verify signatures."
      }
    ],
    troubleshooting: [
      {
        issue: "DMARC reports show 0% SPF/DKIM pass rate",
        solution: "SPF or DKIM not configured correctly. Check SPF TXT record exists and includes all mail servers. Verify DKIM TXT record matches provider's public key exactly. Ensure 'From:' domain in emails matches domain with SPF/DKIM. Test with DMARC analyzer tool."
      },
      {
        issue: "Some emails pass DMARC, others fail",
        solution: "Different email services may not be included in SPF. Check which services are failing in DMARC reports and add their SPF includes. Verify DKIM is enabled for all email sources. Some services may not support DKIM alignment."
      },
      {
        issue: "DMARC p=reject breaking legitimate emails",
        solution: "Revert to p=quarantine or p=none while debugging. Review DMARC reports to identify which senders are failing. Add their SPF includes or enable DKIM for those services. Test thoroughly before re-enabling p=reject."
      },
      {
        issue: "DMARC records show inconsistent alignment",
        solution: "SPF/DKIM alignment requires domain in SPF/DKIM records matches domain in email 'From:' header. Check if using subdomain for email vs different domain. Align domain consistently across email configuration and SPF/DKIM records."
      }
    ],
    faq: [
      {
        question: "Do I need DMARC if I have SPF and DKIM?",
        answer: "DMARC policy tells receiving servers what to do when SPF/DKIM fails. Without DMARC, servers use their own judgment (often send to spam). DMARC enforces your policy. SPF and DKIM are authentication mechanisms; DMARC is the enforcement policy on top of them."
      },
      {
        question: "What's the difference between p=none, p=quarantine, p=reject?",
        answer: "p=none: Monitor only, no action taken on failures. p=quarantine: Send failing emails to spam/junk folder. p=reject: Block and reject failing emails entirely. Start with p=none, graduate to quarantine after validation, finally to reject after full confidence."
      },
      {
        question: "How long to fix DMARC issues?",
        answer: "DMARC TXT records take effect immediately (or within 15-30 minutes depending on DNS propagation). However, DMARC reports take 24 hours to generate. You'll see first authentication results tomorrow. Fixing underlying SPF/DKIM takes 15-30 minutes per fix."
      },
      {
        question: "Can DMARC reject legitimate emails?",
        answer: "Yes, if SPF/DKIM not properly configured, legitimate emails from your domain can fail and be rejected. Always start with p=none to monitor before enforcing rejection. Test thoroughly with DMARC analyzer before using p=reject."
      }
    ]
  },
  {
    slug: "domain-com-dns-setup",
    provider: "Domain.com",
    title: "How to Set DNS Records on Domain.com - Complete Guide",
    metaDescription: "Learn how to configure DNS records on Domain.com. Step-by-step guide for setting up A, CNAME, MX, and TXT records.",
    h1: "How to Configure DNS Records on Domain.com",
    introduction: "Domain.com is a popular domain registrar offering affordable domains and email services. This guide shows how to manage DNS records in Domain.com's control panel for websites, email, and third-party services.",
    steps: [
      {
        title: "Log Into Domain.com Account",
        description: "Access your Domain.com account to manage DNS.",
        details: [
          "Visit domain.com and sign in with email/password",
          "Click 'Manage Domains' from main menu",
          "Find your domain and click 'Manage' button",
          "Select 'DNS Management' or 'Edit DNS' option"
        ]
      },
      {
        title: "View Existing DNS Records",
        description: "Review current DNS configuration.",
        details: [
          "Domain.com shows DNS records in list format",
          "Default includes Domain.com nameservers and parking records",
          "You'll see options to add, edit, or delete records",
          "TTL (Time To Live) can be customized per record"
        ]
      },
      {
        title: "Add New DNS Record",
        description: "Create custom DNS entry.",
        details: [
          "Click 'Add New Record' or similar button",
          "Select record type (A, CNAME, MX, TXT, etc.)",
          "Enter host/name (@ for root or subdomain)",
          "Input value/target and TTL",
          "Click 'Save' or 'Add Record'"
        ]
      },
      {
        title: "Verify Propagation",
        description: "DNS changes take time to propagate globally.",
        details: [
          "Domain.com updates usually within 1 hour",
          "Global propagation: 24-48 hours typical",
          "Use ReviewMyDNS to check propagation status",
          "Flush local DNS cache for immediate testing"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Host: @, Type: A, Value: 192.0.2.1, TTL: 3600",
        instructions: "Points root domain to IPv4 address. Use @ for root or subdomain name for subdomains."
      },
      {
        type: "MX Record",
        example: "Host: @, Type: MX, Value: mail.example.com, Priority: 10, TTL: 3600",
        instructions: "Routes email to mail server. Add multiple MX records for redundancy."
      },
      {
        type: "CNAME Record",
        example: "Host: www, Type: CNAME, Value: example.com, TTL: 3600",
        instructions: "Creates domain alias. Cannot be used on root domain (@)."
      },
      {
        type: "TXT Record",
        example: "Host: @, Type: TXT, Value: v=spf1 include:_spf.google.com ~all, TTL: 3600",
        instructions: "Stores text for SPF, DKIM, DMARC, domain verification."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS changes not appearing",
        solution: "Domain.com DNS updates within 1 hour to their servers. Wait 24-48 hours for global propagation. Flush your DNS cache. Use DNS propagation checker to verify worldwide status."
      },
      {
        issue: "Email not working",
        solution: "Verify MX records point to correct mail servers. Check SPF and DKIM TXT records configured. Ensure nameservers at registrar point to Domain.com (if using their DNS)."
      },
      {
        issue: "Website showing parking page",
        solution: "A records still point to parking. Update A record @ to point to hosting provider IP."
      },
      {
        issue: "Cannot add CNAME for root",
        solution: "DNS doesn't allow CNAME on root. Use A record instead."
      }
    ],
    faq: [
      {
        question: "What are Domain.com's default nameservers?",
        answer: "Domain.com nameservers are typically ns1.domain.com, ns2.domain.com (exact values shown in account)."
      },
      {
        question: "Can I use external DNS with Domain.com domain?",
        answer: "Yes, update nameservers to external provider (Cloudflare, Route53) at Domain.com account settings."
      },
      {
        question: "How long Domain.com DNS propagation?",
        answer: "Domain.com servers update within 1 hour. Global propagation: 24-48 hours typical."
      },
      {
        question: "What TTL should I use?",
        answer: "Default 3600 (1 hour) works for most cases. Lower TTL (300-600) for frequent changes. Higher TTL (14400) for stable records."
      }
    ]
  },
  {
    slug: "siteground-dns-setup",
    provider: "SiteGround",
    title: "How to Configure DNS Records on SiteGround - Complete Guide",
    metaDescription: "Step-by-step guide for setting up DNS records on SiteGround hosting. Learn to configure A, MX, CNAME, and TXT records.",
    h1: "How to Set Up DNS Records on SiteGround",
    introduction: "SiteGround is a leading web hosting provider serving millions of sites. This guide explains how to manage DNS records in SiteGround's control panel for websites, email, and services.",
    affiliateUrl: "https://www.siteground.com/web-hosting.htm",
    affiliateCta: "Try SiteGround Premium Hosting",
    affiliateDescription: "Top-rated hosting with excellent support",
    steps: [
      {
        title: "Access SiteGround Control Panel",
        description: "Log into your SiteGround hosting account.",
        details: [
          "Visit my.siteground.com and sign in",
          "Select 'Manage Domain' for your domain",
          "Navigate to 'DNS Zone' or 'Zone Editor'",
          "View all DNS records in SiteGround's interface"
        ]
      },
      {
        title: "Locate DNS Zone Editor",
        description: "Find DNS management section.",
        details: [
          "In domain settings, find 'DNS Zone' or 'Advanced DNS'",
          "SiteGround shows records in editable table format",
          "You can add, edit, delete records directly",
          "Changes apply within minutes to SiteGround servers"
        ]
      },
      {
        title: "Add DNS Record",
        description: "Create new DNS entry.",
        details: [
          "Click 'Add New Record' button",
          "Select type (A, AAAA, CNAME, MX, TXT, etc.)",
          "Enter hostname/name (@ for root)",
          "Input value/target",
          "Set TTL if available",
          "Save record"
        ]
      },
      {
        title: "Test DNS Changes",
        description: "Verify changes propagated.",
        details: [
          "SiteGround updates within 15-30 minutes",
          "Global propagation: 1-4 hours typical",
          "Use DNS checker to verify worldwide status",
          "Changes may not appear immediately on all devices (DNS caching)"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Name: @, Type: A, IP: 192.0.2.1, TTL: 3600",
        instructions: "Points domain to IPv4 address. SiteGround provides your hosting IP in account."
      },
      {
        type: "MX Record",
        example: "Name: @, Type: MX, Value: mail.example.com, Priority: 10",
        instructions: "Routes email to mail server. SiteGround email requires specific MX records."
      },
      {
        type: "CNAME Record",
        example: "Name: www, Type: CNAME, Value: example.com",
        instructions: "Creates domain alias. SiteGround often pre-configures www CNAME."
      },
      {
        type: "TXT Record",
        example: "Name: @, Type: TXT, Value: v=spf1 include:sendgrid.net ~all",
        instructions: "Stores verification, SPF, DKIM, DMARC records."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS changes not visible",
        solution: "SiteGround updates within 15-30 minutes. Wait 1-4 hours for global propagation. Flush DNS cache. Check SiteGround status for incidents."
      },
      {
        issue: "Website not working",
        solution: "Verify A record points to SiteGround hosting IP (SiteGround provides this). If using external DNS, ensure nameservers point to SiteGround."
      },
      {
        issue: "SiteGround email not working",
        solution: "SiteGround email requires specific MX records. Check SiteGround documentation for their MX values. Add SPF and DKIM TXT records."
      },
      {
        issue: "SSL certificate errors",
        solution: "SiteGround issues free SSL certificates. Ensure domain points to SiteGround. Force SSL renewal in SiteGround account. May take 24 hours."
      }
    ],
    faq: [
      {
        question: "What are SiteGround's nameservers?",
        answer: "SiteGround nameservers shown in account control panel. Usually ns1.siteground.xxx, ns2.siteground.xxx pattern. Use these when changing from another registrar."
      },
      {
        question: "Can I use external DNS with SiteGround hosting?",
        answer: "Yes, point your domain registrar nameservers to external provider (Cloudflare, Route53). Then manage DNS there. SiteGround hosting works with any nameservers."
      },
      {
        question: "How long SiteGround DNS propagation?",
        answer: "SiteGround servers update within 15-30 minutes. Global propagation: 1-4 hours. Previous TTL values affect propagation speed."
      },
      {
        question: "Can I manage DNS on domain registered elsewhere?",
        answer: "Yes, change nameservers at your domain registrar to SiteGround's nameservers. Then manage DNS in SiteGround account."
      }
    ]
  },
  {
    slug: "hostgator-dns-setup",
    provider: "HostGator",
    title: "How to Configure DNS Records on HostGator - Step-by-Step",
    metaDescription: "Complete guide for setting up DNS records on HostGator hosting. Learn to add A, MX, CNAME, and TXT records.",
    h1: "How to Set Up DNS Records on HostGator",
    introduction: "HostGator is one of the largest web hosting providers serving millions of customers. This guide shows how to manage DNS records in HostGator's control panel.",
    affiliateUrl: "https://www.hostgator.com/web-hosting",
    affiliateCta: "Get Started with HostGator",
    affiliateDescription: "Affordable hosting with 45-day money-back guarantee",
    steps: [
      {
        title: "Access HostGator Control Panel",
        description: "Log into your HostGator account.",
        details: [
          "Visit login.hostgator.com with email/password",
          "Click 'Manage My Domains'",
          "Select your domain from the list",
          "Click 'Manage Domain' or 'DNS Management'"
        ]
      },
      {
        title: "Navigate to Zone Editor",
        description: "Find DNS records section.",
        details: [
          "In domain management, find 'Zone Editor' or 'DNS Zone'",
          "HostGator displays records in table format",
          "Default records include HostGator nameservers and hosting A records",
          "You can add, edit, or delete records"
        ]
      },
      {
        title: "Add or Edit DNS Records",
        description: "Create or modify DNS entries.",
        details: [
          "Click 'Add New Record' to create entry",
          "Select record type (A, CNAME, MX, TXT, etc.)",
          "Enter hostname and value",
          "Set TTL (default usually fine)",
          "Click 'Save' to apply"
        ]
      },
      {
        title: "Verify Propagation",
        description: "Wait for changes to take effect.",
        details: [
          "HostGator updates within 1-2 hours typically",
          "Global propagation: 4-24 hours",
          "Use DNS checker to verify worldwide",
          "Some delays are normal due to caching"
        ]
      }
    ],
    recordTypes: [
      {
        type: "A Record",
        example: "Name: @, Type: A, Value: 192.0.2.1, TTL: 14400",
        instructions: "Points domain to hosting IP. HostGator provides your hosting IP address."
      },
      {
        type: "MX Record",
        example: "Name: @, Type: MX, Priority: 10, Value: mail.hostgator.com",
        instructions: "Routes email to mail server. HostGator email needs specific MX records."
      },
      {
        type: "CNAME Record",
        example: "Name: www, Type: CNAME, Value: example.com",
        instructions: "Subdomain alias. HostGator typically pre-configures www CNAME."
      },
      {
        type: "TXT Record",
        example: "Name: @, Type: TXT, Value: v=spf1 include:_spf.hostgator.com ~all",
        instructions: "Email authentication, SPF, DKIM, DMARC, domain verification."
      }
    ],
    troubleshooting: [
      {
        issue: "DNS changes not appearing",
        solution: "HostGator updates within 1-2 hours. Global propagation takes 4-24 hours. Flush DNS cache on your device. Verify changes saved correctly in Zone Editor."
      },
      {
        issue: "Website showing HostGator default page",
        solution: "A record still pointing to parking or old IP. Check A record @ points to correct hosting IP. Save changes and wait 1-2 hours."
      },
      {
        issue: "HostGator email not working",
        solution: "Verify MX records match HostGator email configuration. Add SPF record if required. Check HostGator's email documentation for correct values."
      },
      {
        issue: "SSL certificate errors",
        solution: "HostGator provides free SSL via AutoSSL. Ensure domain points to HostGator hosting. Force AutoSSL renewal through cPanel. May take up to 24 hours."
      }
    ],
    faq: [
      {
        question: "What are HostGator's nameservers?",
        answer: "HostGator nameservers shown in account. Usually ns1.hostgator.com, ns2.hostgator.com pattern. Use when pointing domain from another registrar."
      },
      {
        question: "Can I use external DNS with HostGator?",
        answer: "Yes, change nameservers at your registrar to external provider (Cloudflare, etc.). Then manage DNS there. HostGator hosting works with any nameservers."
      },
      {
        question: "How long HostGator DNS propagation?",
        answer: "HostGator servers update 1-2 hours. Global propagation: 4-24 hours typical. Depends on TTL and ISP caching."
      },
      {
        question: "Can I manage DNS for domain registered elsewhere?",
        answer: "Yes, change nameservers at registrar to HostGator nameservers. Then manage DNS in HostGator account."
      }
    ]
  },
  { slug: "namesilo-dns-setup", provider: "NameSilo", title: "How to Set DNS Records on NameSilo - Complete Guide", metaDescription: "Learn how to configure DNS records on NameSilo domain registrar. Step-by-step guide for A, CNAME, MX, and TXT records.", h1: "How to Configure DNS Records on NameSilo", introduction: "NameSilo is an affordable domain registrar offering competitive pricing and full DNS control. This guide shows how to manage DNS records in NameSilo's control panel.", steps: [{ title: "Log Into NameSilo Account", description: "Access your NameSilo domain management.", details: ["Visit namesilo.com and sign in", "Click 'Manage My Domains'", "Find your domain and click 'Manage Domain'", "Select 'Advanced DNS' tab"] }, { title: "View DNS Records", description: "Review current DNS configuration.", details: ["NameSilo displays all DNS records", "Default includes parking and nameserver records", "Click 'Add DNS Record' to create new entry", "Existing records can be edited or deleted"] }, { title: "Add DNS Record", description: "Create custom DNS entry.", details: ["Select record type (A, CNAME, MX, TXT, etc.)", "Enter hostname and value", "TTL defaults to 7200 seconds", "Click 'Submit' to save"] }, { title: "Verify Propagation", description: "DNS updates globally within hours.", details: ["NameSilo updates within 15 minutes", "Global propagation: 1-4 hours typical", "Use DNS checker to verify status", "Check from multiple servers"] }], recordTypes: [{ type: "A Record", example: "Host: @, Type: A, Value: 192.0.2.1, TTL: 7200", instructions: "Points domain to IPv4 address" }, { type: "MX Record", example: "Host: @, Type: MX, Value: mail.example.com, Priority: 10", instructions: "Routes email to mail server" }, { type: "CNAME Record", example: "Host: www, Type: CNAME, Value: example.com", instructions: "Creates domain alias for subdomains" }, { type: "TXT Record", example: "Host: @, Type: TXT, Value: v=spf1 include:_spf.google.com ~all", instructions: "Email authentication and verification records" }], troubleshooting: [{ issue: "DNS changes not appearing", solution: "NameSilo updates within 15 minutes to their servers. Wait 1-4 hours for global propagation. Flush your DNS cache." }, { issue: "Website showing parking page", solution: "A record @ still points to parking IP. Update A record to your hosting provider's IP address." }, { issue: "Email not working", solution: "Verify MX records are correct. Add SPF and DKIM TXT records. Check email provider documentation." }, { issue: "Cannot add CNAME for root", solution: "Use A record instead. DNS protocol doesn't allow CNAME on root domain." }], faq: [{ question: "What are NameSilo's nameservers?", answer: "NameSilo provides their own nameservers. Check your domain settings for specific nameserver values to use for external DNS." }, { question: "How long NameSilo DNS propagation takes?", answer: "NameSilo updates within 15 minutes. Global propagation: 1-4 hours typical. Full propagation up to 48 hours in rare cases." }, { question: "Can I use external DNS with NameSilo domain?", answer: "Yes, change nameservers at NameSilo to external provider nameservers. Then manage DNS at external provider." }, { question: "Is NameSilo DNS reliable?", answer: "Yes, NameSilo provides reliable DNS service with no additional cost included with domain registration." }] },
  { slug: "dynadot-dns-setup", provider: "Dynadot", title: "How to Set DNS Records on Dynadot - Complete Guide", metaDescription: "Step-by-step guide for configuring DNS records on Dynadot domain registrar. Learn to add A, MX, CNAME, and TXT records.", h1: "How to Configure DNS Records on Dynadot", introduction: "Dynadot is an affordable domain registrar with full DNS management capabilities. This guide shows how to manage your DNS records.", steps: [{ title: "Access Dynadot Control Panel", description: "Log into your Dynadot account.", details: ["Visit dynadot.com and sign in", "Go to 'Domains' section", "Click your domain name", "Select 'DNS' or 'Advanced DNS' option"] }, { title: "View DNS Records", description: "See current DNS configuration.", details: ["Dynadot shows all DNS records in list format", "Default records include Dynadot nameservers", "You can add, edit, or delete records", "Click 'Add Record' to create new entry"] }, { title: "Add DNS Record", description: "Create new DNS entry.", details: ["Select record type", "Enter hostname and value", "Set TTL (default 3600 seconds)", "Click 'Add' or 'Save'"] }, { title: "Test Changes", description: "Verify DNS propagation.", details: ["Dynadot updates within 30 minutes typically", "Global propagation: 1-4 hours", "Use DNS checker for verification", "Check worldwide server status"] }], recordTypes: [{ type: "A Record", example: "Host: @, Type: A, IP: 192.0.2.1", instructions: "Points domain to server IP address" }, { type: "MX Record", example: "Host: @, Type: MX, Value: mail.example.com, Priority: 10", instructions: "Routes email to designated mail server" }, { type: "CNAME Record", example: "Host: www, Type: CNAME, Value: example.com", instructions: "Creates alias pointing to another domain" }, { type: "TXT Record", example: "Host: @, Type: TXT, Value: v=spf1 include:_spf.google.com ~all", instructions: "Stores verification and email authentication data" }], troubleshooting: [{ issue: "DNS not updating", solution: "Wait 30 minutes to 1 hour for Dynadot to process. Global propagation up to 4 hours. Clear browser cache and DNS cache." }, { issue: "Website showing Dynadot default page", solution: "A record still points to Dynadot parking. Update A record @ to your hosting provider's IP." }, { issue: "Email not configured", solution: "Add correct MX records. Verify mail server hostname has A record. Add SPF record." }, { issue: "CNAME error on root domain", solution: "Root domain requires A record, not CNAME. Use A record pointing to IP address." }], faq: [{ question: "What are Dynadot nameservers?", answer: "Dynadot provides default nameservers. Check your domain settings for specific nameserver addresses if using external DNS." }, { question: "How long Dynadot DNS propagation?", answer: "Dynadot updates within 30 minutes typically. Global propagation: 1-4 hours. Full propagation up to 48 hours." }, { question: "Can I use external nameservers with Dynadot?", answer: "Yes, change nameservers to external provider in Dynadot settings. Then manage DNS at external provider." }, { question: "Is Dynadot DNS included with domains?", answer: "Yes, Dynadot provides free DNS with all domain registrations. No additional cost for DNS management." }] },
  { slug: "porkbun-dns-setup", provider: "Porkbun", title: "How to Configure DNS Records on Porkbun - Complete Setup Guide", metaDescription: "Learn how to set up DNS records on Porkbun domain registrar. Guide for A, CNAME, MX, and TXT record configuration.", h1: "How to Set Up DNS Records on Porkbun", introduction: "Porkbun is an affordable domain registrar with excellent customer service and full DNS control. This guide shows how to manage your DNS records.", steps: [{ title: "Log Into Porkbun Account", description: "Access Porkbun domain management.", details: ["Visit porkbun.com and sign in", "Click 'Domain Management'", "Find your domain and click 'Manage'", "Select 'DNS' section"] }, { title: "Access DNS Editor", description: "Find DNS record management area.", details: ["Porkbun displays DNS records in table format", "Default records show Porkbun nameservers", "Click 'Add a Record' to create new entry", "Existing records can be edited inline"] }, { title: "Create DNS Record", description: "Add new DNS entry.", details: ["Select record type (A, CNAME, MX, TXT, etc.)", "Enter hostname (@ for root or subdomain)", "Input value/target IP or hostname", "TTL defaults to 600 seconds", "Save the record"] }, { title: "Verify Propagation", description: "DNS changes take time to spread globally.", details: ["Porkbun updates within 30 minutes", "Global propagation: 1-4 hours typical", "Use DNS propagation checker to verify", "Different servers update on different schedules"] }], recordTypes: [{ type: "A Record", example: "Host: @, Type: A, TTL: 600, Value: 192.0.2.1", instructions: "Maps domain to IPv4 server address" }, { type: "MX Record", example: "Host: @, Type: MX, Priority: 10, Value: mail.example.com, TTL: 600", instructions: "Directs email to mail server with priority" }, { type: "CNAME Record", example: "Host: www, Type: CNAME, TTL: 600, Value: example.com", instructions: "Creates subdomain alias to another domain" }, { type: "TXT Record", example: "Host: @, Type: TXT, TTL: 600, Value: v=spf1 include:_spf.google.com ~all", instructions: "Email authentication, verification, and SPF records" }], troubleshooting: [{ issue: "DNS changes not visible", solution: "Porkbun updates within 30 minutes to their servers. Wait 1-4 hours for ISP propagation. Flush local DNS cache." }, { issue: "Website showing Porkbun parking page", solution: "A record points to Porkbun parking IP. Change A record @ to your hosting provider's actual IP address." }, { issue: "Email delivery failing", solution: "Ensure MX records point to correct mail server. Add SPF record for email authentication. Verify DKIM records if required." }, { issue: "CNAME on root domain error", solution: "Root domain cannot have CNAME record. Use A record with server IP instead." }], faq: [{ question: "What are Porkbun's DNS nameservers?", answer: "Porkbun provides default nameservers shown in your domain settings. You can use external nameservers by changing them in domain settings." }, { question: "How fast is Porkbun DNS?", answer: "Porkbun uses Cloudflare's DNS infrastructure for fast global resolution. Updates within 30 minutes, global propagation 1-4 hours." }, { question: "Can I use external DNS providers with Porkbun?", answer: "Yes, change nameservers to external provider (Cloudflare, Route53, etc.) in Porkbun settings. Then manage all DNS there." }, { question: "Is DNS management free with Porkbun domains?", answer: "Yes, full DNS management is included free with all Porkbun domain registrations. No additional charges." }] },
  { slug: "email-delivery-debugging-dns", provider: "Email Delivery Debugging", title: "DNS Issues Causing Email Delivery Failures - Complete Debugging Guide", metaDescription: "Troubleshoot DNS-related email delivery problems. Learn to fix SPF, DKIM, DMARC, and MX record issues.", h1: "Fix Email Delivery Problems: Complete DNS Debugging Guide", introduction: "Email delivery failures are often caused by DNS misconfigurations. This comprehensive guide helps diagnose and fix DNS issues preventing emails from reaching recipients.", steps: [{ title: "Check MX Records", description: "Verify mail server DNS records exist and are correct.", details: ["Use DNS lookup tool to check @ MX records", "Verify MX records point to correct mail server hostname", "Ensure mail server hostname has corresponding A record pointing to IP", "Check MX priority values are set correctly"] }, { title: "Verify SPF Record", description: "SPF authenticates your domain and prevents spoofing.", details: ["Check that @ TXT record starts with 'v=spf1'", "Ensure all mail servers are included via IP, hostname, or 'include:' directives", "Verify SPF record doesn't exceed 10 DNS lookups", "Test SPF with SPF analyzer tool"] }, { title: "Configure DKIM", description: "DKIM signs emails cryptographically.", details: ["Obtain DKIM public key from email provider", "Add TXT record with selector (usually selector1._domainkey) and DKIM key", "Enable DKIM signing in email provider settings", "Test DKIM with email authentication checker"] }, { title: "Set DMARC Policy", description: "DMARC enforces SPF/DKIM authentication.", details: ["Create _dmarc TXT record", "Start with p=none for monitoring", "Add rua email to receive daily reports", "Graduate to p=quarantine then p=reject after validation"] }, { title: "Test Full Email Authentication", description: "Verify email authentication is working end-to-end.", details: ["Send test email to yourself", "Check email headers for SPF, DKIM, DMARC results", "All three should show 'pass' result", "If failures, debug specific record"] }], recordTypes: [{ type: "MX Record Missing/Wrong", example: "Missing or incorrect MX records prevent mail delivery entirely", instructions: "Add MX record @ pointing to your mail server. Ensure priority is set. Mail server hostname must have valid A record." }, { type: "SPF Record Misconfigured", example: "SPF includes wrong servers or exceeds 10 lookups", instructions: "Remove unused email services from SPF. Use IP addresses instead of includes where possible. Count lookups to stay under 10." }, { type: "DKIM Public Key Incorrect", example: "DKIM TXT record has wrong public key format", instructions: "Get DKIM public key from email provider. Copy entire key exactly into TXT record. Most common DKIM failures caused by typos." }, { type: "DMARC Policy Blocking", example: "_dmarc record with p=reject blocking all emails", instructions: "Start with p=none to monitor. Check reports before moving to p=quarantine. Ensure SPF/DKIM working before p=reject." }], troubleshooting: [{ issue: "Emails going to spam despite correct DNS", solution: "Check email reputation (domain/IP may be on blocklists). Warm up new domain gradually with low send volume. Ensure reverse DNS (PTR) is configured. Monitor DMARC reports for delivery issues." }, { issue: "SPF pass but emails still failing", solution: "SPF aligned authentication required. Ensure email 'From:' domain matches domain with SPF records. Also check DKIM and DMARC configuration." }, { issue: "DKIM validation failing", solution: "Verify DKIM public key in DNS exactly matches provider's key. Check selector name is correct. Common: selector1 vs selector2. Use DKIM test tool." }, { issue: "Some recipients get emails, others don't", solution: "Different email providers have different authentication requirements. Some need DKIM, others only SPF. Ensure both working. Check specific provider's requirements." }], faq: [{ question: "In what order should I set up email authentication?", answer: "1) Add MX records first (enables mail delivery). 2) Add SPF record (basic authentication). 3) Add DKIM records (cryptographic signing). 4) Add DMARC policy (enforcement). Test each before moving to next." }, { question: "Why are my SPF and DKIM passing but DMARC failing?", answer: "DMARC requires alignment - email 'From:' domain must match SPF/DKIM domain. If using subdomain for mail (noreply@sub.example.com) vs main domain, alignment fails. Create subdomain SPF/DKIM records." }, { question: "How long does email authentication setup take?", answer: "MX/SPF/DKIM records take effect within 15-30 minutes (DNS propagation). Email providers start checking authentication immediately. Initial propagation to all ISPs: 4-24 hours. Gradual delivery improvement over 1-2 weeks." }, { question: "Will fixing DNS improve email deliverability immediately?", answer: "DNS changes take effect quickly (30 minutes) but ISP spam filters take time to trust your domain. Expect gradual improvement over 1-2 weeks. Warm up sending volume gradually while authentication settles." }] },
  { slug: "dns-resolution-not-working-propagation", provider: "DNS Resolution Issues", title: "Fix DNS Not Resolving: Propagation Debugging Guide", metaDescription: "Troubleshoot DNS resolution failures. Learn why your domain isn't resolving and how to fix propagation issues.", h1: "Fix DNS Not Resolving: Complete Propagation Debugging", introduction: "When DNS doesn't resolve, your domain becomes inaccessible. This guide helps diagnose whether it's a propagation delay, misconfiguration, or nameserver issue.", steps: [{ title: "Verify Domain Registration Active", description: "Ensure domain hasn't expired or been suspended.", details: ["Check registrar account for domain status", "Verify registration hasn't expired", "Ensure auto-renewal is enabled if needed", "Expired domains return NXDOMAIN immediately"] }, { title: "Check Nameservers at Registrar", description: "Nameservers must match your DNS provider's nameservers.", details: ["Log into domain registrar account", "Check nameservers currently set for domain", "Compare to your DNS provider's nameservers", "If mismatch, update nameservers at registrar"] }, { title: "Test DNS Resolution from Multiple Servers", description: "Use public DNS servers to test resolution.", details: ["Test with Google DNS: 8.8.8.8", "Test with Cloudflare DNS: 1.1.1.1", "Test with your ISP DNS", "If some work and others don't, propagation is in progress"] }, { title: "Check A Records Exist", description: "Verify DNS records are actually created.", details: ["Log into DNS provider dashboard", "Check @ A record exists and points to valid IP", "Add A record if missing", "Verify record format is correct (no typos)"] }, { title: "Wait for Propagation", description: "DNS changes take time to spread globally.", details: ["Nameserver changes: 24-48 hours typical", "DNS record changes: 15 minutes to 4 hours typical", "Use global DNS checker to monitor progress", "Different servers update on different timelines"] }], recordTypes: [{ type: "No A Record", example: "@ A record missing entirely = NXDOMAIN error", instructions: "Add A record for @ pointing to your server IP. Root domain must have A record to resolve." }, { type: "Wrong A Record Value", example: "A record points to wrong IP or parking page IP", instructions: "Verify A record value matches your actual hosting IP. Not your registrar's parking IP. Update record if incorrect." }, { type: "Nameserver Mismatch", example: "Registrar nameservers don't match DNS provider nameservers", instructions: "Update registrar nameservers to exactly match DNS provider. Changes take 24-48 hours to propagate." }, { type: "Propagation Incomplete", example: "Some servers show domain, others show NXDOMAIN", instructions: "This is normal during propagation. Wait 24-48 hours for all servers to update. Use global DNS checker to see progress." }], troubleshooting: [{ issue: "Domain works on some computers but not others", solution: "This indicates propagation in progress. Different ISPs cache DNS differently. Some servers have updated, others haven't. Wait 24-48 hours for complete propagation." }, { issue: "Domain only resolves from specific DNS server", solution: "Your authoritative nameserver has record, but other resolvers haven't cached it yet. Propagation complete only when all public resolvers have record. Monitor with global DNS checker." }, { issue: "Worked yesterday, now returns NXDOMAIN", solution: "Recent DNS change went wrong. Check if nameservers were changed or A record was deleted. Verify DNS provider account is active and billing current. Rollback recent changes if necessary." }, { issue: "Mobile phone can't resolve but computer can", solution: "Phone is using different DNS (carrier DNS vs ISP DNS). Both should work after full propagation. Flush DNS cache on phone. This usually resolves within hours." }], faq: [{ question: "Why does my domain work on my computer but not for others?", answer: "Your computer likely cached the old DNS result before you made changes. Remote users see updated DNS right away. Flush your DNS cache to see what others see: ipconfig /flushdns (Windows) or sudo dscacheutil -flushcache (Mac)." }, { question: "How long should I wait for DNS propagation?", answer: "DNS record changes (A, MX, TXT): 15 minutes to 4 hours typical. Nameserver changes (pointing registrar to new DNS): 24-48 hours typical. Industry standard allows up to 48 hours. Some providers are faster." }, { question: "What causes slow DNS propagation?", answer: "Slow propagation usually caused by: 1) ISP DNS cache (ISPs cache DNS longer), 2) Previous high TTL (still in cache), 3) Regional DNS servers (some regions slower), 4) Resolver configuration. Nothing you can do except wait." }, { question: "Can I speed up DNS propagation?", answer: "Limited options: 1) Lower TTL before making changes (propagates faster), 2) Flush local DNS cache, 3) Try different DNS servers. Global propagation timing depends on ISPs and resolvers worldwide - you can't control that." }] },
  { slug: "dnssec-validation-errors", provider: "DNSSEC Errors", title: "Fix DNSSEC Validation Errors - DNS Security Guide", metaDescription: "Resolve DNSSEC validation failures. Learn how to fix DNSSEC configuration and validation errors.", h1: "Fix DNSSEC Validation Errors: Complete Configuration Guide", introduction: "DNSSEC (Domain Name System Security Extensions) adds security to DNS but requires proper configuration. This guide helps diagnose and fix DNSSEC validation errors.", steps: [{ title: "Enable DNSSEC in DNS Provider", description: "Activate DNSSEC signing for your domain.", details: ["Log into DNS provider dashboard", "Find DNSSEC or 'Sign Zone' option", "Click to enable DNSSEC signing", "DNS provider generates DNSKEY records automatically"] }, { title: "Copy DS Records to Registrar", description: "DS records link DNSSEC trust chain from registrar.", details: ["Copy DS record(s) from DNS provider", "Log into domain registrar account", "Find DNSSEC or DS record section", "Paste DS records into registrar DNSSEC settings"] }, { title: "Verify DNSSEC Setup", description: "Test that DNSSEC is working correctly.", details: ["Use DNSSEC test tool to check your domain", "Should show 'Secure' or 'DNSSEC working'", "Verify DNSKEY records are published", "Check DS records match registrar entries"] }, { title: "Monitor DNSSEC Status", description: "Keep DNSSEC working properly long-term.", details: ["Monitor DNSSEC key expiration dates", "Most providers auto-rotate keys before expiration", "Check DNSSEC status regularly with test tools", "Ensure registrar DS records always up-to-date"] }], recordTypes: [{ type: "DNSKEY Record", example: "DNSSEC public key for domain (created by DNS provider)", instructions: "DNS provider automatically creates DNSKEY records. These are published in DNS zone. You don't manually create them." }, { type: "DS Record", example: "DS records provided by DNS provider (copied to registrar)", instructions: "Copy DS records from DNS provider and paste into registrar DNSSEC settings. DS records create the trust chain." }, { type: "RRSIG Record", example: "Resource Record Signature (automatically created by DNS provider)", instructions: "RRSIG records sign your DNS records. DNS provider automatically creates these. Verifies authenticity of DNS responses." }, { type: "SOA Record", example: "SOA record must exist for DNSSEC to work", instructions: "DNSSEC requires valid SOA record. Most registrars create automatically. Verify SOA exists before enabling DNSSEC." }], troubleshooting: [{ issue: "DNSSEC validation failing", solution: "Verify DS records in registrar exactly match DNS provider's DS records. Even one character difference breaks validation. Copy DS records character-by-character. Wait 24-48 hours after adding DS records." }, { issue: "DNSSEC chain broken", solution: "DS records at registrar don't match DNS provider records. This breaks the trust chain. Update registrar DS records to match current provider DS records." }, { issue: "DNSKEY records not found", solution: "DNS provider must have DNSSEC enabled. Enable DNSSEC in DNS provider dashboard. Wait for DNSKEY records to generate (usually immediate)." }, { issue: "DNSSEC working before, now broken", solution: "Keys likely expired and weren't rotated. DNS provider should auto-rotate keys. Check provider key expiration dates. May need to manually trigger rotation." }], faq: [{ question: "Do I need DNSSEC?", answer: "DNSSEC prevents DNS spoofing and tampering but adds complexity. Recommended for high-security applications, critical infrastructure. Optional for most websites. Ensure your DNS provider auto-rotates keys if enabling." }, { question: "How long does DNSSEC setup take?", answer: "Enabling DNSSEC in DNS provider is immediate. DS records should propagate within 1 hour. Full global DNSSEC validation takes 24-48 hours due to DNS caching and propagation." }, { question: "Does DNSSEC slow down DNS lookups?", answer: "Minor performance impact. Requires additional signature validation. Modern resolvers handle this well. Impact usually negligible for end users. Some old systems may see slightly slower lookups." }, { question: "What happens if DNSSEC keys expire?", answer: "DNS provider should auto-rotate keys before expiration. If keys expire without rotation, DNSSEC validation fails and domain becomes unreachable. Check provider's auto-rotation policy." }] },
  { slug: "ns1-managed-dns-setup", provider: "NS1 DNS", title: "How to Set Up NS1 Managed DNS - Advanced Configuration Guide", metaDescription: "Complete guide for configuring DNS records in NS1. Learn advanced DNS management with NS1's managed DNS service.", h1: "How to Configure DNS Records in NS1", introduction: "NS1 is an enterprise-grade managed DNS provider offering advanced features like traffic steering, load balancing, and API-first infrastructure. This guide covers NS1 DNS configuration.", steps: [{ title: "Create NS1 Account and Zone", description: "Set up your domain in NS1.", details: ["Sign up at ns1.com", "Create new zone for your domain", "NS1 generates 4 authoritative nameservers", "Copy NS1 nameservers for your registrar"] }, { title: "Update Nameservers at Registrar", description: "Point your domain to NS1.", details: ["Log into domain registrar", "Update nameservers to NS1 nameservers", "Use exact nameservers provided by NS1", "Changes take 24-48 hours to propagate"] }, { title: "Add DNS Records via Portal or API", description: "Create DNS records in NS1.", details: ["NS1 offers web portal and REST API", "Add A records, MX records, TXT records as needed", "Configure advanced features: traffic management, filters, policies", "Test records are resolving correctly"] }, { title: "Configure Advanced Features", description: "Leverage NS1's advanced DNS capabilities.", details: ["Set up load balancing rules", "Configure geographic routing", "Add failover policies", "Monitor DNS query analytics"] }], recordTypes: [{ type: "A Record with Load Balancing", example: "A record @ pointing to multiple IPs with load balancing", instructions: "NS1 allows multiple A record values with load balancing. Route traffic across multiple servers based on geography, performance, or custom rules." }, { type: "MX Record with Failover", example: "MX records with failover policy to backup mail servers", instructions: "NS1 enables intelligent MX failover. If primary mail server down, automatically route to backup. Requires health check configuration." }, { type: "TXT Record for SPF with API Management", example: "SPF record managed via NS1 API for dynamic updates", instructions: "Use NS1 API to dynamically update SPF records. Useful for automated infrastructure where SPF rules change frequently." }, { type: "CNAME with Geographic Routing", example: "CNAME record with geographic routing to different CDNs", instructions: "Route traffic based on user geography. US traffic to US CDN, EU traffic to EU CDN. Requires NS1 advanced plan." }], troubleshooting: [{ issue: "NS1 nameservers not propagating", solution: "Verify nameservers at registrar exactly match NS1 nameservers. Nameserver changes take 24-48 hours. Use DNS checker to verify when propagated." }, { issue: "Advanced features not working", solution: "Some NS1 features require higher plan tier. Verify your NS1 plan includes the feature. Check health checks are properly configured. Review NS1 API documentation." }, { issue: "Costs higher than expected", solution: "NS1 charges per query. High-traffic domains may have significant costs. Monitor query analytics. Consider traffic shaping or caching strategies to reduce queries." }, { issue: "Performance not as expected", solution: "Verify advanced routing policies are configured correctly. Check health check endpoints are responding. Review NS1 performance analytics to identify issues." }], faq: [{ question: "Is NS1 good for beginners?", answer: "NS1 is enterprise-focused with advanced features. Beginners should start with simpler DNS providers (Cloudflare, Route53). NS1 best for organizations needing advanced traffic steering and performance optimization." }, { question: "How much does NS1 DNS cost?", answer: "NS1 charges based on DNS queries. Typical: 1M queries/month = $10-30/month depending on plan tier. High-traffic domains can be expensive. Check calculator on NS1 website." }, { question: "Can I use NS1 with any domain registrar?", answer: "Yes, point your domain registrar's nameservers to NS1 nameservers. NS1 works with any registrar. Only requires changing nameservers." }, { question: "Does NS1 offer API access?", answer: "Yes, NS1 is API-first. Full REST API for managing DNS records, zones, and advanced policies. Great for infrastructure-as-code and automation." }] },
  { slug: "dnsimple-dns-setup", provider: "DNSimple", title: "How to Set Up DNSimple Managed DNS - Complete Guide", metaDescription: "Learn how to configure DNS records with DNSimple. Guide for A, MX, CNAME, and TXT records on DNSimple.", h1: "How to Configure DNS Records in DNSimple", introduction: "DNSimple is a developer-friendly DNS provider focused on simplicity and automation. This guide covers DNSimple DNS setup and management.", steps: [{ title: "Create DNSimple Account", description: "Sign up and add your domain.", details: ["Visit dnsimple.com and create account", "Add your domain to DNSimple", "DNSimple generates nameservers for your domain", "Copy nameservers for your registrar"] }, { title: "Change Nameservers at Registrar", description: "Point domain to DNSimple.", details: ["Log into your domain registrar", "Update nameservers to DNSimple nameservers", "Use exact values from DNSimple account", "Wait 24-48 hours for propagation"] }, { title: "Add DNS Records", description: "Create A, MX, CNAME, TXT records.", details: ["Go to DNSimple zone editor", "Click 'Add Record' to create new entry", "Select record type and enter details", "DNSimple saves records immediately"] }, { title: "Configure Advanced Options", description: "Use DNSimple advanced features.", details: ["Enable DNSSEC if needed", "Set up email forwarding", "Configure zone-level features", "Use API for automation"] }], recordTypes: [{ type: "A Record", example: "Name: @, Type: A, Content: 192.0.2.1", instructions: "Points domain to IPv4 address. DNSimple updates within minutes." }, { type: "MX Record", example: "Name: @, Type: MX, Priority: 10, Content: mail.example.com", instructions: "Routes email to mail server. Add multiple MX records for redundancy." }, { type: "CNAME Record", example: "Name: www, Type: CNAME, Content: example.com", instructions: "Creates subdomain alias. Cannot be used on root domain." }, { type: "TXT Record", example: "Name: @, Type: TXT, Content: v=spf1 include:_spf.google.com ~all", instructions: "Email authentication and verification records." }], troubleshooting: [{ issue: "DNSimple nameservers not working", solution: "Verify nameservers at registrar exactly match DNSimple nameservers. Wait 24-48 hours for propagation. Check with DNS checker." }, { issue: "Email forwarding not working", solution: "Enable email forwarding in DNSimple. Ensure MX records point to DNSimple email forwarding service. May take 24 hours." }, { issue: "DNS changes not appearing", solution: "DNSimple updates within 30 seconds typically. Check you clicked 'Save' on the record. Refresh browser and try again." }, { issue: "Cannot add certain record types", solution: "Some record types may be restricted. Check DNSimple documentation for supported record types. Contact support for special cases." }], faq: [{ question: "Is DNSimple good for beginners?", answer: "Yes, DNSimple is designed for simplicity and automation. Great for developers and small businesses. Excellent documentation and support." }, { question: "Does DNSimple offer API access?", answer: "Yes, DNSimple has comprehensive REST API for automation. Great for infrastructure-as-code and automated DNS management." }, { question: "How much does DNSimple cost?", answer: "DNSimple starts at $5/month for first domain, $3/month for additional domains (annual billing). Includes unlimited DNS records and email forwarding." }, { question: "Can I migrate my domain to DNSimple?", answer: "Yes, add domain to DNSimple and update nameservers at registrar. Both registrar and DNSimple must work together during migration." }] },
  { slug: "linode-dns-setup", provider: "Linode DNS", title: "How to Set Up Linode Managed DNS - Complete Configuration Guide", metaDescription: "Step-by-step guide for configuring DNS records in Linode. Learn to set up A, MX, CNAME, and TXT records.", h1: "How to Configure DNS Records in Linode", introduction: "Linode offers managed DNS service integrated with their hosting platform. This guide covers setting up and managing DNS records in Linode.", steps: [{ title: "Access Linode DNS Manager", description: "Log into Linode account and navigate to DNS Manager.", details: ["Visit manager.linode.com", "Log into your Linode account", "Click 'Domains' in left sidebar", "Find your domain or create new domain"] }, { title: "Create Domain Zone", description: "Set up zone file for your domain.", details: ["Click 'Create a new Domain'", "Enter your domain name", "Select 'Create with nameservers set to Linode nameservers' or 'Use Linode's nameservers'", "Linode generates SOA and NS records"] }, { title: "Update Nameservers at Registrar", description: "Point your domain to Linode nameservers.", details: ["Copy Linode nameservers from DNS Manager", "Log into domain registrar", "Update nameservers to Linode's nameservers", "Wait 24-48 hours for propagation"] }, { title: "Add DNS Records", description: "Create A, CNAME, MX, TXT records.", details: ["In Linode DNS Manager, click domain", "Click 'Add an A Record', 'Add a CNAME Record', etc.", "Enter hostname and value", "Click 'Save' to create record"] }], recordTypes: [{ type: "A Record", example: "Hostname: @, IP Address: 192.0.2.1", instructions: "Maps domain to server IP. Use @ for root domain." }, { type: "MX Record", example: "Mail Server: mail.example.com, Priority: 10", instructions: "Routes email to mail server. Configure priority values." }, { type: "CNAME Record", example: "Hostname: www, CNAME: example.com", instructions: "Creates subdomain alias to another domain." }, { type: "TXT Record", example: "Hostname: @, Text: v=spf1 include:_spf.google.com ~all", instructions: "Email authentication, SPF, DKIM, DMARC records." }], troubleshooting: [{ issue: "Linode nameservers not propagating", solution: "Verify nameservers at registrar match Linode nameservers exactly. Wait 24-48 hours. Use DNS checker to verify propagation." }, { issue: "DNS records not working", solution: "Verify domain zone file is active in Linode DNS Manager. Check records were saved correctly. Wait 15-30 minutes for records to take effect." }, { issue: "Email not working", solution: "Ensure MX records point to correct mail server. Verify mail server hostname has A record. Check SPF and DKIM TXT records." }, { issue: "Website showing Linode placeholder", solution: "A record points to Linode placeholder IP. Update A record to your website server IP or use Linode hosting." }], faq: [{ question: "Is Linode DNS free?", answer: "Yes, Linode DNS Manager is free with any Linode account. No charges for DNS service regardless of number of records or queries." }, { question: "Can I use Linode DNS without Linode hosting?", answer: "Yes, Linode offers managed DNS standalone. You can point any domain to Linode's nameservers regardless of where domain is registered or hosted." }, { question: "How fast is Linode DNS?", answer: "Linode uses global DNS infrastructure with anycast routing. Very fast globally. DNS updates take effect within 30 seconds to 5 minutes typically." }, { question: "Does Linode offer DNSSEC?", answer: "Yes, Linode supports DNSSEC. Can be enabled in DNS Manager. Requires DS records to be added to registrar." }] },
  { slug: "digitalocean-dns-setup", provider: "DigitalOcean DNS", title: "How to Set Up DigitalOcean Managed DNS - Complete Guide", metaDescription: "Learn how to configure DNS records in DigitalOcean. Guide for A, MX, CNAME, and TXT record setup.", h1: "How to Configure DNS Records in DigitalOcean", introduction: "DigitalOcean provides free managed DNS service for their customers and anyone else. This guide covers setting up DNS records in DigitalOcean.", steps: [{ title: "Access DigitalOcean Control Panel", description: "Log into DigitalOcean account.", details: ["Visit cloud.digitalocean.com", "Log into your DigitalOcean account", "Click 'Networking' in left menu", "Select 'Domains' tab"] }, { title: "Add Domain to DigitalOcean", description: "Register your domain in DigitalOcean DNS.", details: ["Click 'Add Domain'", "Enter domain name", "Select your project (if using projects)", "DigitalOcean creates nameserver records"] }, { title: "Update Nameservers", description: "Point registrar to DigitalOcean nameservers.", details: ["Copy DigitalOcean nameservers from Domains page", "Log into domain registrar", "Update nameservers to DigitalOcean's nameservers", "Propagation takes 24-48 hours"] }, { title: "Add DNS Records", description: "Create A, CNAME, MX, TXT records.", details: ["In Domains page, click your domain", "Click 'Add Record' button", "Select record type and enter details", "Save record"] }], recordTypes: [{ type: "A Record", example: "Hostname: @, IPv4 Address: 192.0.2.1", instructions: "Points domain to server IP address" }, { type: "CNAME Record", example: "Hostname: www, Fully Qualified Domain Name: example.com", instructions: "Creates subdomain alias to another domain" }, { type: "MX Record", example: "Hostname: @, Mail Host: mail.example.com, Priority: 10", instructions: "Routes email to designated mail server" }, { type: "TXT Record", example: "Hostname: @, Text Data: v=spf1 include:_spf.google.com ~all", instructions: "Email authentication, verification, and SPF records" }], troubleshooting: [{ issue: "DigitalOcean nameservers not working", solution: "Verify nameservers at registrar exactly match DigitalOcean. Wait 24-48 hours for propagation. Use DNS checker to verify." }, { issue: "DNS changes not appearing", solution: "DigitalOcean updates DNS within 30 seconds. Check record saved correctly. Refresh browser. Clear DNS cache if testing locally." }, { issue: "Website showing DO default page", solution: "A record points to default DigitalOcean placeholder. Update A record to your droplet's IP or domain." }, { issue: "Email not working", solution: "Configure MX records pointing to email provider. Add SPF and DKIM records. Verify email provider DNS values." }], faq: [{ question: "Is DigitalOcean DNS free?", answer: "Yes, DigitalOcean DNS is free for everyone. No registration required. Free global DNS even without DigitalOcean hosting." }, { question: "Can I use DigitalOcean DNS without hosting?", answer: "Yes, DigitalOcean offers managed DNS standalone. Point any domain's nameservers to DigitalOcean regardless of host." }, { question: "How fast is DigitalOcean DNS?", answer: "DigitalOcean uses global Anycast DNS infrastructure. Very fast worldwide. DNS changes take effect within 30 seconds." }, { question: "Does DigitalOcean support DNSSEC?", answer: "Yes, DigitalOcean supports DNSSEC. Can be enabled per domain in DNS settings. Requires DS records at registrar." }] }
];

export function getProviderGuide(slug: string): ProviderGuide | undefined {
  return providerGuides.find(guide => guide.slug === slug);
}

export function getAllProviderGuideSlugs(): string[] {
  return providerGuides.map(guide => guide.slug);
}
