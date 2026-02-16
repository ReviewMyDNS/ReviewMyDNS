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
    affiliateUrl: "https://namecheap.pxf.io/c/6787068/1632743/5618",
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
    affiliateUrl: "https://www.siteground.com/index.htm?afcode=f5c86ce71650d92a83063c120b89a99e",
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
  { slug: "digitalocean-dns-setup", provider: "DigitalOcean DNS", title: "How to Set Up DigitalOcean Managed DNS - Complete Guide", metaDescription: "Learn how to configure DNS records in DigitalOcean. Guide for A, MX, CNAME, and TXT record setup.", h1: "How to Configure DNS Records in DigitalOcean", introduction: "DigitalOcean provides free managed DNS service for their customers and anyone else. This guide covers setting up DNS records in DigitalOcean.", steps: [{ title: "Access DigitalOcean Control Panel", description: "Log into DigitalOcean account.", details: ["Visit cloud.digitalocean.com", "Log into your DigitalOcean account", "Click 'Networking' in left menu", "Select 'Domains' tab"] }, { title: "Add Domain to DigitalOcean", description: "Register your domain in DigitalOcean DNS.", details: ["Click 'Add Domain'", "Enter domain name", "Select your project (if using projects)", "DigitalOcean creates nameserver records"] }, { title: "Update Nameservers", description: "Point registrar to DigitalOcean nameservers.", details: ["Copy DigitalOcean nameservers from Domains page", "Log into domain registrar", "Update nameservers to DigitalOcean's nameservers", "Propagation takes 24-48 hours"] }, { title: "Add DNS Records", description: "Create A, CNAME, MX, TXT records.", details: ["In Domains page, click your domain", "Click 'Add Record' button", "Select record type and enter details", "Save record"] }], recordTypes: [{ type: "A Record", example: "Hostname: @, IPv4 Address: 192.0.2.1", instructions: "Points domain to server IP address" }, { type: "CNAME Record", example: "Hostname: www, Fully Qualified Domain Name: example.com", instructions: "Creates subdomain alias to another domain" }, { type: "MX Record", example: "Hostname: @, Mail Host: mail.example.com, Priority: 10", instructions: "Routes email to designated mail server" }, { type: "TXT Record", example: "Hostname: @, Text Data: v=spf1 include:_spf.google.com ~all", instructions: "Email authentication, verification, and SPF records" }], troubleshooting: [{ issue: "DigitalOcean nameservers not working", solution: "Verify nameservers at registrar exactly match DigitalOcean. Wait 24-48 hours for propagation. Use DNS checker to verify." }, { issue: "DNS changes not appearing", solution: "DigitalOcean updates DNS within 30 seconds. Check record saved correctly. Refresh browser. Clear DNS cache if testing locally." }, { issue: "Website showing DO default page", solution: "A record points to default DigitalOcean placeholder. Update A record to your droplet's IP or domain." }, { issue: "Email not working", solution: "Configure MX records pointing to email provider. Add SPF and DKIM records. Verify email provider DNS values." }], faq: [{ question: "Is DigitalOcean DNS free?", answer: "Yes, DigitalOcean DNS is free for everyone. No registration required. Free global DNS even without DigitalOcean hosting." }, { question: "Can I use DigitalOcean DNS without hosting?", answer: "Yes, DigitalOcean offers managed DNS standalone. Point any domain's nameservers to DigitalOcean regardless of host." }, { question: "How fast is DigitalOcean DNS?", answer: "DigitalOcean uses global Anycast DNS infrastructure. Very fast worldwide. DNS changes take effect within 30 seconds." }, { question: "Does DigitalOcean support DNSSEC?", answer: "Yes, DigitalOcean supports DNSSEC. Can be enabled per domain in DNS settings. Requires DS records at registrar." }] },
  { slug: "hostinger-dns-setup", provider: "Hostinger", title: "How to Set DNS Records on Hostinger - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records on Hostinger. Learn how to set up A, CNAME, MX, and TXT records with Hostinger's hPanel.", h1: "How to Set Up DNS Records on Hostinger", introduction: "Hostinger is one of the most popular budget-friendly web hosting providers, serving millions of users worldwide. This guide walks you through configuring DNS records in Hostinger's hPanel control panel for websites, email, and domain verification.", steps: [{ title: "Log Into Hostinger hPanel", description: "Access your Hostinger account and navigate to DNS management.", details: ["Visit hpanel.hostinger.com and sign in with your credentials", "Click 'Domains' in the left sidebar menu", "Select your domain from the list", "Click 'DNS / Nameservers' in the domain settings"] }, { title: "Navigate to DNS Zone Editor", description: "Find the DNS zone editor in hPanel.", details: ["hPanel shows all DNS records in a clean table layout", "You'll see existing A, CNAME, MX, and TXT records", "Default records include Hostinger nameservers and hosting A records", "Click 'Add Record' button to create a new DNS entry"] }, { title: "Add New DNS Record", description: "Create a custom DNS record for your domain.", details: ["Select record type from the dropdown (A, AAAA, CNAME, MX, TXT, SRV)", "Enter the hostname (use @ for root domain or type subdomain name)", "Input the target value (IP address, hostname, or text content)", "Set TTL value (14400 seconds default recommended)", "Click 'Add Record' to save the entry"] }, { title: "Verify DNS Propagation", description: "Confirm your DNS changes have propagated globally.", details: ["Hostinger DNS typically updates within 15-30 minutes", "Full global propagation can take 1-24 hours depending on TTL", "Use ReviewMyDNS to check propagation status across worldwide servers", "Flush your local DNS cache to test changes on your device immediately"] }], recordTypes: [{ type: "A Record", example: "Type: A, Name: @, Points to: 192.0.2.1, TTL: 14400", instructions: "Maps your domain to an IPv4 address. Use @ for root domain or enter a subdomain name like www or blog." }, { type: "CNAME Record", example: "Type: CNAME, Name: www, Target: example.com, TTL: 14400", instructions: "Creates an alias pointing to another domain. Commonly used for www subdomain or third-party service integration." }, { type: "MX Record", example: "Type: MX, Name: @, Mail Server: mx1.hostinger.com, Priority: 5, TTL: 14400", instructions: "Routes email to your mail server. Hostinger email uses mx1.hostinger.com and mx2.hostinger.com with priorities 5 and 10." }, { type: "TXT Record", example: "Type: TXT, Name: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 14400", instructions: "Stores text data for SPF email authentication, DKIM, DMARC, and domain ownership verification." }], troubleshooting: [{ issue: "DNS changes not appearing after 30 minutes", solution: "Hostinger DNS updates within 15-30 minutes to their servers. If changes aren't visible, flush your DNS cache (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on Mac). Use ReviewMyDNS to check if propagation is in progress across global servers." }, { issue: "Website showing Hostinger parking page", solution: "Your A record is still pointing to Hostinger's default parking IP. Update the @ A record to point to your actual hosting server IP address. Check your hosting provider for the correct IP. Changes take 15-30 minutes." }, { issue: "Hostinger email not receiving messages", solution: "Verify MX records are set to mx1.hostinger.com (priority 5) and mx2.hostinger.com (priority 10). Ensure SPF TXT record includes Hostinger's mail servers. Check that no conflicting MX records exist from previous configurations." }, { issue: "Cannot edit DNS records in hPanel", solution: "If DNS editing is grayed out, your nameservers may be pointing to an external provider. Switch nameservers back to Hostinger's default (ns1.dns-parking.com, ns2.dns-parking.com) to manage DNS in hPanel, or manage DNS at your external provider." }], faq: [{ question: "What are Hostinger's default nameservers?", answer: "Hostinger's default nameservers are ns1.dns-parking.com and ns2.dns-parking.com. These are shown in your hPanel under Domains > DNS / Nameservers. You must use these nameservers to manage DNS records through hPanel." }, { question: "How long does Hostinger DNS propagation take?", answer: "Hostinger updates their authoritative DNS servers within 15-30 minutes. Global propagation typically completes in 1-4 hours, though it can take up to 24 hours depending on previous TTL values and ISP DNS caching. Monitor propagation with ReviewMyDNS." }, { question: "Can I use Cloudflare DNS with Hostinger hosting?", answer: "Yes, you can change your nameservers to Cloudflare's nameservers in hPanel under DNS / Nameservers > Change Nameservers. Once changed, manage all DNS records in Cloudflare's dashboard instead of hPanel. Hostinger hosting works with any nameservers." }, { question: "Does Hostinger support DNSSEC?", answer: "Hostinger supports DNSSEC for domains registered with them. You can enable it in hPanel under your domain's DNS settings. If using external nameservers, configure DNSSEC at your DNS provider and add DS records at Hostinger." }] },
  { slug: "dreamhost-dns-setup", provider: "DreamHost", title: "How to Set DNS Records on DreamHost - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records on DreamHost. Learn how to add A, CNAME, MX, and TXT records in DreamHost's panel.", h1: "How to Set Up DNS Records on DreamHost", introduction: "DreamHost is an established web hosting provider and domain registrar trusted by over 1.5 million websites. This guide covers how to manage DNS records in DreamHost's control panel for websites, email configuration, and domain verification.", steps: [{ title: "Log Into DreamHost Panel", description: "Access your DreamHost account to manage DNS.", details: ["Visit panel.dreamhost.com and sign in with your credentials", "Click 'Domains' in the left navigation menu", "Select 'Manage Domains' from the dropdown", "Find your domain in the list and click 'DNS' link next to it"] }, { title: "Access DNS Management Page", description: "Navigate to the DNS records editor for your domain.", details: ["DreamHost displays all current DNS records in a table", "You'll see default records including DreamHost nameservers and hosting records", "Scroll down to the 'Add a custom DNS record' section", "Custom records override DreamHost's automatic DNS entries"] }, { title: "Add Custom DNS Record", description: "Create a new DNS record for your domain.", details: ["Enter the Name field (leave blank for root domain, or type subdomain)", "Select record Type from dropdown (A, AAAA, CNAME, MX, TXT, SRV)", "Enter the Value (IP address, hostname, or text content)", "For MX records, also enter priority number", "Click 'Add Record Now!' to save"] }, { title: "Verify DNS Propagation", description: "Confirm your changes have propagated globally.", details: ["DreamHost DNS changes typically take effect within 4-6 hours", "Some records may update faster depending on TTL settings", "Use ReviewMyDNS to check propagation status across global DNS servers", "Flush your local DNS cache for immediate testing on your device"] }], recordTypes: [{ type: "A Record", example: "Name: (blank), Type: A, Value: 192.0.2.1", instructions: "Points your root domain or subdomain to an IPv4 address. Leave name blank for root domain or enter subdomain name." }, { type: "CNAME Record", example: "Name: www, Type: CNAME, Value: example.com", instructions: "Creates an alias pointing to another domain name. Cannot be used on the root domain - use A record instead." }, { type: "MX Record", example: "Name: (blank), Type: MX, Value: mx1.dreamhost.com, Priority: 0", instructions: "Routes email to your mail server. DreamHost email uses mx1.dreamhost.com and mx2.dreamhost.com." }, { type: "TXT Record", example: "Name: (blank), Type: TXT, Value: v=spf1 include:netblocks.dreamhost.com ~all", instructions: "Stores text data for SPF, DKIM, DMARC, and domain verification. Essential for email deliverability." }], troubleshooting: [{ issue: "DNS changes taking longer than expected", solution: "DreamHost DNS can take 4-6 hours to propagate fully. This is slower than some providers due to their DNS architecture. Flush your local DNS cache and use ReviewMyDNS to check if propagation is in progress. If still not updated after 6 hours, contact DreamHost support." }, { issue: "Custom DNS records being overridden", solution: "DreamHost automatically manages DNS for hosted domains. If your custom records are being overridden, ensure you're adding them in the 'Custom DNS' section, not the auto-generated section. Remove DreamHost hosting from the domain if you want full manual DNS control." }, { issue: "Email not working after DNS changes", solution: "If using DreamHost email, verify MX records point to mx1.dreamhost.com and mx2.dreamhost.com. If using Google Workspace or Microsoft 365, update MX records to their servers. Add appropriate SPF and DKIM TXT records for your email provider." }, { issue: "Domain showing DreamHost 'coming soon' page", solution: "This means the domain is registered but not yet configured for hosting. Add hosting in the DreamHost panel under Domains > Manage Domains > Add Hosting. Or update the A record to point to your external hosting IP address." }], faq: [{ question: "What are DreamHost's nameservers?", answer: "DreamHost's nameservers are ns1.dreamhost.com, ns2.dreamhost.com, and ns3.dreamhost.com. These are required if you want to manage DNS through DreamHost's panel. You can find them in your panel under Domains > Registrations." }, { question: "How long does DreamHost DNS propagation take?", answer: "DreamHost DNS changes typically take 4-6 hours to propagate globally, though some changes may appear sooner. This is slightly slower than some providers. Monitor propagation status with ReviewMyDNS to see which global servers have updated." }, { question: "Can I use DreamHost DNS with hosting elsewhere?", answer: "Yes, you can register your domain at DreamHost and point it to external hosting via A records or CNAME records. You can also use DreamHost's nameservers while pointing records to external servers, or change nameservers entirely to another DNS provider." }, { question: "Does DreamHost offer free SSL with DNS?", answer: "DreamHost provides free Let's Encrypt SSL certificates for domains hosted on their servers. If your domain points elsewhere, SSL must be configured at your hosting provider. SSL certificates are issued automatically when DNS properly points to DreamHost hosting." }] },
  { slug: "ionos-dns-setup", provider: "IONOS (1&1)", title: "How to Set DNS Records on IONOS (1&1) - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records on IONOS (formerly 1&1). Learn how to add A, CNAME, MX, and TXT records in the IONOS control panel.", h1: "How to Set Up DNS Records on IONOS (1&1)", introduction: "IONOS (formerly 1&1 Internet) is one of Europe's largest web hosting and domain providers, serving millions of customers globally. This guide walks you through configuring DNS records in the IONOS control panel for websites, email, and third-party services.", steps: [{ title: "Log Into IONOS Control Panel", description: "Access your IONOS account to manage DNS.", details: ["Visit my.ionos.com and sign in with your customer ID or email", "Click 'Domains & SSL' from the main menu", "Select your domain from the list", "Click 'DNS' or 'Manage Subdomains' in domain settings"] }, { title: "Navigate to DNS Settings", description: "Find the DNS management section for your domain.", details: ["IONOS displays DNS records in a categorized table view", "You'll see tabs or sections for A, CNAME, MX, TXT, and other record types", "Default records include IONOS nameservers and hosting configuration", "Click 'Add Record' to create a new DNS entry"] }, { title: "Add New DNS Record", description: "Create a custom DNS record.", details: ["Select record type from the available options (A, AAAA, CNAME, MX, TXT, SRV)", "Enter the hostname (use @ for root domain or type a subdomain name)", "Input the target value (IP address, hostname, or text content)", "Set TTL if the option is available (IONOS may use default TTL)", "Click 'Save' to create the record"] }, { title: "Verify DNS Propagation", description: "Confirm your changes have taken effect globally.", details: ["IONOS DNS changes typically propagate within 1-2 hours", "Full global propagation may take up to 24 hours", "Use ReviewMyDNS to check propagation status across worldwide DNS servers", "Flush your local DNS cache for immediate testing"] }], recordTypes: [{ type: "A Record", example: "Type: A, Host: @, Points to: 192.0.2.1, TTL: 3600", instructions: "Maps your domain to an IPv4 address. Use @ for root domain or enter subdomain name. IONOS provides your hosting IP in the control panel." }, { type: "CNAME Record", example: "Type: CNAME, Host: www, Points to: example.com, TTL: 3600", instructions: "Creates an alias pointing to another domain. Used for www subdomain or third-party service integration. Cannot be used on root domain." }, { type: "MX Record", example: "Type: MX, Host: @, Mail Server: mx00.ionos.com, Priority: 10, TTL: 3600", instructions: "Routes email to your mail server. IONOS email uses mx00.ionos.com and mx01.ionos.com with appropriate priorities." }, { type: "TXT Record", example: "Type: TXT, Host: @, Value: v=spf1 include:_spf.perfora.net ~all, TTL: 3600", instructions: "Stores text data for SPF authentication, DKIM, DMARC, and domain verification. IONOS SPF uses _spf.perfora.net." }], troubleshooting: [{ issue: "DNS changes not appearing in IONOS", solution: "IONOS DNS typically updates within 1-2 hours. If changes aren't visible, verify you saved the record correctly. Flush your DNS cache and use ReviewMyDNS to check global propagation. IONOS sometimes caches aggressively, so wait at least 2 hours before troubleshooting further." }, { issue: "IONOS email not receiving messages", solution: "Verify MX records point to mx00.ionos.com and mx01.ionos.com. Ensure SPF TXT record includes _spf.perfora.net. Check that no conflicting MX records exist. If using external email (Google Workspace, Microsoft 365), update MX records to those providers' servers." }, { issue: "Cannot find DNS settings in IONOS panel", solution: "IONOS has redesigned their panel several times. Navigate to Domains & SSL > select domain > DNS. If you don't see DNS options, your domain may be using external nameservers. Switch back to IONOS nameservers to manage DNS in their panel." }, { issue: "Website showing IONOS under construction page", solution: "Your A record still points to IONOS default page. Update the @ A record to your hosting server's IP address. If hosting with IONOS, ensure your hosting package is linked to the domain in the control panel." }], faq: [{ question: "What are IONOS nameservers?", answer: "IONOS nameservers are typically ns1081.ui-dns.org and ns1081.ui-dns.com (exact values vary by account). Find your specific nameservers in the IONOS control panel under Domains & SSL > DNS > Nameserver Information." }, { question: "How long does IONOS DNS propagation take?", answer: "IONOS DNS changes typically propagate within 1-2 hours to their authoritative servers. Full global propagation can take up to 24 hours depending on TTL values and ISP DNS caching. Monitor with ReviewMyDNS for real-time propagation status." }, { question: "Can I use Cloudflare DNS with an IONOS domain?", answer: "Yes, you can change your IONOS domain's nameservers to Cloudflare. In the IONOS control panel, go to Domains & SSL > DNS > Nameservers and update to Cloudflare's nameservers. Then manage all DNS records in Cloudflare's dashboard." }, { question: "Is IONOS DNS the same as 1&1 DNS?", answer: "Yes, IONOS is the rebranded name of 1&1 Internet. The DNS management interface is the same service with an updated interface. If you have an older 1&1 account, it has been migrated to IONOS and you can access DNS at my.ionos.com." }] },
  { slug: "ovhcloud-dns-setup", provider: "OVHcloud", title: "How to Set DNS Records on OVHcloud - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records on OVHcloud. Learn how to add A, CNAME, MX, and TXT records in the OVHcloud control panel.", h1: "How to Set Up DNS Records on OVHcloud", introduction: "OVHcloud is one of Europe's largest cloud and hosting providers, offering domain registration and DNS management for millions of domains. This guide explains how to configure DNS records in OVHcloud's control panel for websites, email, and services.", steps: [{ title: "Log Into OVHcloud Control Panel", description: "Access your OVHcloud account.", details: ["Visit ovh.com/manager and sign in with your NIC handle (customer ID)", "Navigate to 'Web Cloud' section from the top menu", "Click 'Domain Names' in the left sidebar", "Select your domain from the list"] }, { title: "Access DNS Zone Editor", description: "Navigate to the DNS zone management for your domain.", details: ["Click the 'DNS Zone' tab in your domain settings", "OVHcloud displays all DNS records in a detailed table", "You'll see record type, subdomain, TTL, target, and actions columns", "Click 'Add an entry' to create a new DNS record"] }, { title: "Add New DNS Record", description: "Create a custom DNS entry.", details: ["Select the record type (A, AAAA, CNAME, MX, TXT, SRV, etc.)", "Enter the subdomain (leave blank for root domain)", "Input the target value (IP address, hostname, or text)", "Set TTL (default 3600 seconds)", "Click 'Next' and then 'Confirm' to save"] }, { title: "Verify DNS Propagation", description: "Confirm changes have propagated globally.", details: ["OVHcloud DNS changes typically propagate within 30 minutes to 4 hours", "Click 'Propagation Status' in OVHcloud panel for basic checks", "Use ReviewMyDNS for comprehensive global propagation verification", "Flush your local DNS cache to see changes immediately"] }], recordTypes: [{ type: "A Record", example: "Type: A, Subdomain: (blank), Target: 192.0.2.1, TTL: 3600", instructions: "Points your domain to an IPv4 address. Leave subdomain blank for root domain or enter a subdomain like www or blog." }, { type: "CNAME Record", example: "Type: CNAME, Subdomain: www, Target: example.com., TTL: 3600", instructions: "Creates an alias to another domain. OVHcloud requires a trailing dot on the target domain. Cannot be used on root domain." }, { type: "MX Record", example: "Type: MX, Subdomain: (blank), Priority: 1, Target: mx1.ovh.net., TTL: 3600", instructions: "Routes email to your mail server. OVHcloud email uses mx1.ovh.net, mx2.ovh.net, and mx3.ovh.net with priorities 1, 5, and 10." }, { type: "TXT Record", example: "Type: TXT, Subdomain: (blank), Target: v=spf1 include:mx.ovh.com ~all, TTL: 3600", instructions: "Stores text data for SPF, DKIM, DMARC, and verification. OVHcloud SPF uses mx.ovh.com." }], troubleshooting: [{ issue: "DNS changes not reflecting after hours", solution: "OVHcloud DNS propagation takes 30 minutes to 4 hours. If still not updated, verify the record was saved correctly in the DNS zone. Check that your domain uses OVHcloud nameservers (dns*.ovh.net). Use ReviewMyDNS to verify global propagation status." }, { issue: "CNAME record target not working", solution: "OVHcloud requires a trailing dot (.) after CNAME target domains (e.g., example.com. instead of example.com). This is a common source of errors. Add the trailing dot and save again." }, { issue: "OVHcloud email delivery issues", solution: "Verify MX records point to mx1.ovh.net, mx2.ovh.net, and mx3.ovh.net. Ensure SPF TXT record includes mx.ovh.com. Add DKIM records if configured. If using external email service, update MX records accordingly." }, { issue: "Cannot modify DNS zone", solution: "If DNS editing is locked, check if your domain has an active DNS zone in OVHcloud. Go to Domain Names > DNS Zone to verify. If using external nameservers, you must manage DNS at that provider instead of OVHcloud." }], faq: [{ question: "What are OVHcloud's nameservers?", answer: "OVHcloud nameservers follow the pattern dns*.ovh.net (e.g., dns19.ovh.net). Your specific nameservers are shown in the OVHcloud control panel under Domain Names > DNS Servers. Use these when pointing your domain to OVHcloud DNS." }, { question: "How long does OVHcloud DNS propagation take?", answer: "OVHcloud updates their DNS servers within 30 minutes typically. Full global propagation takes 1-4 hours for record changes, and 24-48 hours for nameserver changes. Monitor real-time propagation with ReviewMyDNS." }, { question: "Does OVHcloud support DNSSEC?", answer: "Yes, OVHcloud supports DNSSEC for domains registered with them. You can enable it in the control panel under Domain Names > DNSSEC. OVHcloud handles key management automatically when using their nameservers." }, { question: "Can I transfer DNS management away from OVHcloud?", answer: "Yes, change your domain's nameservers to another DNS provider (Cloudflare, Route53, etc.) in the OVHcloud panel under DNS Servers. Once nameservers propagate (24-48 hours), manage DNS at the new provider." }] },
  { slug: "gandi-dns-setup", provider: "Gandi", title: "How to Set DNS Records on Gandi - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records on Gandi. Learn how to add A, CNAME, MX, and TXT records using Gandi's LiveDNS.", h1: "How to Set Up DNS Records on Gandi", introduction: "Gandi is a respected domain registrar and hosting provider known for their 'No Bullshit' philosophy and developer-friendly approach. This guide covers DNS management using Gandi's LiveDNS platform for websites, email, and services.", steps: [{ title: "Log Into Gandi Account", description: "Access your Gandi account for DNS management.", details: ["Visit admin.gandi.net and sign in with your credentials", "Click 'Domain' in the left sidebar navigation", "Select your domain name from the list", "Click 'DNS Records' tab to view your zone"] }, { title: "Access LiveDNS Zone Editor", description: "Navigate to Gandi's LiveDNS record management.", details: ["Gandi's LiveDNS shows all DNS records in a clean interface", "Records are organized by type with name, TTL, and value columns", "You can filter records by type or search for specific entries", "Click 'Add Record' button to create a new DNS entry"] }, { title: "Create DNS Record", description: "Add a new DNS record to your zone.", details: ["Select record type from dropdown (A, AAAA, CNAME, MX, TXT, SRV, etc.)", "Enter the name (use @ for root domain or type subdomain)", "Set TTL (default 10800 seconds / 3 hours)", "Input the value (IP address, hostname, or text content)", "Click 'Create' to save the record"] }, { title: "Verify DNS Propagation", description: "Confirm your DNS changes have propagated.", details: ["Gandi LiveDNS updates within 5-15 minutes to their servers", "Global propagation typically completes in 1-4 hours", "Use ReviewMyDNS to check propagation across global DNS servers", "Gandi also provides a basic propagation check in their panel"] }], recordTypes: [{ type: "A Record", example: "Type: A, Name: @, TTL: 10800, Value: 192.0.2.1", instructions: "Points your domain to an IPv4 address. Use @ for root domain. Gandi LiveDNS propagates A record changes within minutes." }, { type: "CNAME Record", example: "Type: CNAME, Name: www, TTL: 10800, Value: example.com.", instructions: "Creates an alias to another domain. Gandi requires a trailing dot on CNAME targets. Cannot be used on root domain - use ALIAS record instead." }, { type: "MX Record", example: "Type: MX, Name: @, TTL: 10800, Priority: 10, Value: spool.mail.gandi.net.", instructions: "Routes email to mail server. Gandi email uses spool.mail.gandi.net. Add trailing dot after mail server hostname." }, { type: "TXT Record", example: "Type: TXT, Name: @, TTL: 10800, Value: v=spf1 include:_mailcust.gandi.net ~all", instructions: "Stores text for SPF, DKIM, DMARC, and verification. Gandi email SPF uses _mailcust.gandi.net." }], troubleshooting: [{ issue: "DNS changes not propagating from Gandi", solution: "Gandi LiveDNS typically updates within 5-15 minutes. If changes aren't visible, verify the record was saved (check for validation errors). Ensure your domain uses Gandi's LiveDNS nameservers. Use ReviewMyDNS to check global propagation status." }, { issue: "CNAME or MX record not resolving", solution: "Gandi requires a trailing dot (.) on hostname targets for CNAME and MX records (e.g., example.com. not example.com). This is a common mistake. Edit the record and add the trailing dot." }, { issue: "Gandi email not working after DNS changes", solution: "Verify MX records point to spool.mail.gandi.net with a trailing dot. Ensure SPF TXT record includes _mailcust.gandi.net. Check DKIM is configured in Gandi email settings. Allow 1-2 hours for email DNS changes to propagate." }, { issue: "Cannot use CNAME on root domain", solution: "Gandi supports ALIAS records for root domains as an alternative to CNAME. Create an ALIAS record type instead of CNAME for the @ hostname. This allows CNAME-like behavior on the root domain." }], faq: [{ question: "What are Gandi's LiveDNS nameservers?", answer: "Gandi LiveDNS nameservers follow the ns-*-*.gandi.net pattern (specific values shown in your account). Gandi automatically assigns LiveDNS nameservers when you register or transfer a domain. These are required to manage DNS through Gandi's interface." }, { question: "How long does Gandi DNS propagation take?", answer: "Gandi LiveDNS updates within 5-15 minutes to their authoritative servers. Global propagation typically completes in 1-4 hours. Default TTL is 10800 seconds (3 hours). Lower the TTL before making changes for faster propagation." }, { question: "Does Gandi support ALIAS records?", answer: "Yes, Gandi LiveDNS supports ALIAS records, which allow CNAME-like behavior on root domains. This is useful when services require a CNAME but you need it on the root domain (@). ALIAS records resolve to IP addresses at query time." }, { question: "Can I use the Gandi DNS API?", answer: "Yes, Gandi provides a comprehensive REST API for DNS management at api.gandi.net. You can create, update, and delete DNS records programmatically. Generate an API key in your Gandi account settings under Security." }] },
  { slug: "wix-dns-setup", provider: "Wix", title: "How to Set DNS Records on Wix - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records on Wix. Learn how to add A, CNAME, MX, and TXT records for your Wix domain.", h1: "How to Set Up DNS Records on Wix", introduction: "Wix is a popular website builder that also offers domain registration and DNS management. This guide shows how to configure DNS records in Wix's domain management panel for custom domains, email, and third-party service verification.", steps: [{ title: "Access Wix Domain Settings", description: "Navigate to DNS management in your Wix account.", details: ["Log into your Wix account at wix.com", "Click your profile icon and select 'Domains' from the menu", "Or go to Settings > Domains in your site dashboard", "Find your domain and click 'Manage' next to it"] }, { title: "Open DNS Records Editor", description: "Access the DNS records management page.", details: ["Click 'DNS Records' or 'Advanced' tab in domain settings", "Wix shows existing DNS records in a table format", "Default records include Wix nameservers and site hosting records", "Scroll down to see all record types and the 'Add Record' option"] }, { title: "Add New DNS Record", description: "Create a custom DNS record.", details: ["Click '+ Add Record' button", "Select record type from dropdown (A, CNAME, MX, TXT, SRV, AAAA)", "Enter the Host Name (use @ for root domain or subdomain name)", "Enter the Value (IP address, domain, or text)", "Set TTL (1 hour default)", "Click 'Save' to add the record"] }, { title: "Verify DNS Propagation", description: "Confirm your DNS changes have propagated.", details: ["Wix DNS changes typically take 1-48 hours to propagate fully", "Wix displays a status indicator for domain connection", "Use ReviewMyDNS to check propagation across global DNS servers", "Flush local DNS cache for faster testing on your device"] }], recordTypes: [{ type: "A Record", example: "Type: A, Host: @, Value: 192.0.2.1, TTL: 1 Hour", instructions: "Points your domain to an IPv4 address. Wix automatically creates A records when you connect a domain to your site." }, { type: "CNAME Record", example: "Type: CNAME, Host: www, Value: example.com, TTL: 1 Hour", instructions: "Creates an alias to another domain. Wix uses CNAME records for www subdomain and some third-party integrations." }, { type: "MX Record", example: "Type: MX, Host: @, Value: mx.google.com, Priority: 1, TTL: 1 Hour", instructions: "Routes email to your mail server. Required for Google Workspace, Microsoft 365, or other email services with your Wix domain." }, { type: "TXT Record", example: "Type: TXT, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 1 Hour", instructions: "Stores text for SPF, DKIM, DMARC, and domain verification. Commonly needed for Google verification and email authentication." }], troubleshooting: [{ issue: "Wix domain not connecting to site", solution: "Ensure your domain's nameservers point to Wix (ns*.wixdns.net). If using external DNS, add the A records and CNAME provided by Wix in your domain setup wizard. Check the domain connection status in Wix dashboard for specific errors." }, { issue: "DNS records not saving in Wix", solution: "Wix has restrictions on certain DNS records to prevent conflicts with their hosting. You cannot modify Wix's automatic A records if the domain is connected to a Wix site. For custom records, use the '+ Add Record' option in the Advanced DNS section." }, { issue: "Email not working with Wix domain", solution: "Wix doesn't provide email hosting by default. You need a third-party email provider (Google Workspace, Microsoft 365, Zoho). Add the provider's MX records and SPF/DKIM TXT records in Wix DNS settings. Remove any conflicting default MX records." }, { issue: "Third-party verification failing", solution: "When adding TXT records for verification (Google Search Console, Facebook, etc.), ensure you enter the exact value provided. Don't add quotes around the value in Wix - they're added automatically. Wait 1-2 hours for propagation before retrying verification." }], faq: [{ question: "What are Wix nameservers?", answer: "Wix nameservers follow the pattern ns*.wixdns.net (e.g., ns2.wixdns.net, ns3.wixdns.net). Exact values are shown when you connect a domain in Wix. Use these nameservers to manage DNS fully through Wix's dashboard." }, { question: "How long does Wix DNS propagation take?", answer: "Wix states DNS changes can take up to 48 hours to propagate. In practice, most changes appear within 1-4 hours. Domain connection to a Wix site typically completes within 24 hours. Monitor with ReviewMyDNS for real-time status." }, { question: "Can I use Wix DNS with external hosting?", answer: "Yes, if your domain is registered with Wix, you can add custom A records pointing to external hosting. However, if the domain is connected to a Wix site, you may need to disconnect it first. Alternatively, change nameservers to your hosting provider." }, { question: "Does Wix support all DNS record types?", answer: "Wix supports A, AAAA, CNAME, MX, TXT, SRV, and NS record types. Some advanced record types (CAA, NAPTR) may not be available. If you need unsupported record types, consider using external DNS like Cloudflare with your Wix domain." }] },
  { slug: "squarespace-dns-setup", provider: "Squarespace", title: "How to Set DNS Records on Squarespace - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records on Squarespace. Learn how to add A, CNAME, MX, and TXT records for your Squarespace domain.", h1: "How to Set Up DNS Records on Squarespace", introduction: "Squarespace is a popular website builder that also offers domain registration and DNS management. This guide covers how to configure DNS records for domains registered through Squarespace or connected to a Squarespace site.", steps: [{ title: "Access Squarespace Domain Settings", description: "Navigate to DNS settings in your Squarespace account.", details: ["Log into your Squarespace account at squarespace.com", "Click 'Settings' in the left sidebar of your site dashboard", "Select 'Domains' from the settings menu", "Click on your domain name to open domain settings"] }, { title: "Open DNS Settings Panel", description: "Access the DNS records editor.", details: ["Click 'DNS' or 'DNS Settings' in the domain panel", "Squarespace shows existing DNS records organized by type", "You'll see default records for Squarespace hosting", "Click 'Add Record' to create custom DNS entries"] }, { title: "Add Custom DNS Record", description: "Create a new DNS record.", details: ["Select record type (A, CNAME, MX, TXT, AAAA)", "Enter the Host field (@ for root domain or subdomain name)", "Enter the Data/Value field (IP address, hostname, or text)", "Set Priority for MX records", "Click 'Add' or 'Save' to create the record"] }, { title: "Verify DNS Propagation", description: "Confirm changes have propagated globally.", details: ["Squarespace DNS changes typically take 1-4 hours to propagate", "Check domain status in Squarespace Settings > Domains", "Use ReviewMyDNS to verify propagation across global servers", "Some ISPs may cache old records for up to 48 hours"] }], recordTypes: [{ type: "A Record", example: "Type: A, Host: @, Data: 198.185.159.144, TTL: Auto", instructions: "Points domain to an IPv4 address. Squarespace uses specific IP addresses (198.185.159.144 and others) for their hosting. Custom A records can point to external servers." }, { type: "CNAME Record", example: "Type: CNAME, Host: www, Data: ext-cust.squarespace.com, TTL: Auto", instructions: "Creates alias to another domain. Squarespace uses ext-cust.squarespace.com for www subdomain pointing. Custom CNAMEs available for other subdomains." }, { type: "MX Record", example: "Type: MX, Host: @, Data: mx.google.com, Priority: 1, TTL: Auto", instructions: "Routes email to mail server. Squarespace doesn't provide email hosting - use Google Workspace or another email provider's MX records." }, { type: "TXT Record", example: "Type: TXT, Host: @, Data: v=spf1 include:_spf.google.com ~all, TTL: Auto", instructions: "Stores text for domain verification, SPF, DKIM, and DMARC. Used for Google verification, email authentication, and third-party service connections." }], troubleshooting: [{ issue: "Domain not connecting to Squarespace site", solution: "Ensure you've added Squarespace's required A records (198.185.159.144, 198.185.159.145, 198.49.23.144, 198.49.23.145) and CNAME record (www pointing to ext-cust.squarespace.com). Verify these in Settings > Domains. Allow 24-72 hours for full connection." }, { issue: "SSL certificate not generating", solution: "Squarespace provides free SSL for connected domains. SSL generation requires DNS to fully propagate first (24-72 hours). Ensure all 4 A records and the www CNAME are correctly configured. Contact Squarespace support if SSL doesn't appear after 72 hours." }, { issue: "Email not working with Squarespace domain", solution: "Squarespace doesn't provide email hosting. Set up a third-party email service (Google Workspace recommended by Squarespace). Add the email provider's MX, SPF, and DKIM records in Squarespace DNS settings. Remove any conflicting default MX records." }, { issue: "Custom subdomain not resolving", solution: "Add a CNAME or A record for your subdomain in Squarespace DNS settings. If pointing to an external service, use the CNAME value they provide. Ensure the subdomain doesn't conflict with existing records. Allow 1-4 hours for propagation." }], faq: [{ question: "What are Squarespace's nameservers?", answer: "Squarespace uses nameservers like ns1.squarespace.com through ns4.squarespace.com for domains registered through them. If you registered your domain elsewhere, you can either change nameservers to Squarespace's or add individual DNS records at your registrar." }, { question: "How long does Squarespace DNS propagation take?", answer: "Squarespace DNS changes typically propagate within 1-4 hours for record changes. Initial domain connection can take 24-72 hours. SSL certificate generation happens after DNS propagation. Monitor status in Squarespace Settings > Domains or use ReviewMyDNS." }, { question: "Can I use Squarespace DNS without a Squarespace site?", answer: "If your domain is registered through Squarespace, you can manage DNS records even without an active Squarespace website. Point A records to any external hosting provider. However, Squarespace's DNS features are optimized for their own hosting." }, { question: "Does Squarespace support all DNS record types?", answer: "Squarespace supports A, AAAA, CNAME, MX, and TXT records. Some advanced record types (SRV, CAA, NAPTR) are not supported. If you need unsupported record types, consider transferring DNS management to a provider like Cloudflare." }] },
  { slug: "shopify-dns-setup", provider: "Shopify", title: "How to Set DNS Records on Shopify - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records for Shopify stores. Learn how to connect your custom domain and set up A, CNAME, MX, and TXT records.", h1: "How to Set Up DNS Records on Shopify", introduction: "Shopify is the leading ecommerce platform, and connecting a custom domain requires proper DNS configuration. This guide covers how to set up DNS records for your Shopify store, whether your domain is registered through Shopify or an external registrar.", steps: [{ title: "Access Shopify Domain Settings", description: "Navigate to domain management in your Shopify admin.", details: ["Log into your Shopify admin at admin.shopify.com", "Click 'Settings' in the bottom left corner", "Select 'Domains' from the settings menu", "Click 'Connect existing domain' or manage your Shopify-registered domain"] }, { title: "Configure DNS at Your Registrar", description: "Add Shopify's required DNS records at your domain registrar.", details: ["Shopify requires an A record pointing @ to 23.227.38.65", "Add a CNAME record for www pointing to shops.myshopify.com", "If your domain is registered with Shopify, DNS is managed directly in Shopify admin", "For third-party domains, add records at your registrar (GoDaddy, Namecheap, etc.)"] }, { title: "Verify Domain Connection", description: "Confirm your domain is properly connected to Shopify.", details: ["Return to Shopify admin > Settings > Domains", "Click 'Verify connection' to check DNS records", "Shopify verifies A record and CNAME are correctly configured", "SSL certificate is automatically provisioned after verification succeeds"] }, { title: "Verify DNS Propagation", description: "Ensure DNS has propagated globally.", details: ["Shopify domain verification can take 24-48 hours", "SSL certificate provisioning adds another 24 hours after DNS propagates", "Use ReviewMyDNS to check DNS propagation status worldwide", "Flush your local DNS cache to test changes immediately"] }], recordTypes: [{ type: "A Record", example: "Type: A, Host: @, Value: 23.227.38.65, TTL: 3600", instructions: "Points your root domain to Shopify's servers. The IP address 23.227.38.65 is Shopify's standard A record value for all stores." }, { type: "CNAME Record", example: "Type: CNAME, Host: www, Value: shops.myshopify.com, TTL: 3600", instructions: "Points the www subdomain to your Shopify store. This CNAME is required for Shopify to serve your store on the www subdomain." }, { type: "MX Record", example: "Type: MX, Host: @, Value: mx.google.com, Priority: 1, TTL: 3600", instructions: "Routes email for your domain. Shopify doesn't provide email hosting - use Google Workspace, Zoho Mail, or another email provider." }, { type: "TXT Record", example: "Type: TXT, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 3600", instructions: "Used for email authentication (SPF, DKIM, DMARC) and domain verification for third-party services." }], troubleshooting: [{ issue: "Shopify says domain is not connected", solution: "Verify A record @ points to 23.227.38.65 and CNAME www points to shops.myshopify.com at your domain registrar. DNS propagation can take 24-48 hours. Use ReviewMyDNS to check if records have propagated. Click 'Verify connection' again after propagation." }, { issue: "SSL certificate not provisioning", solution: "Shopify SSL certificates require DNS to be fully propagated first. Ensure A record and CNAME are correct. Wait up to 48 hours after DNS propagation. If SSL still fails, remove and re-add the domain in Shopify admin. Contact Shopify support if issues persist." }, { issue: "Email not working with Shopify domain", solution: "Shopify does not provide email hosting. Set up a third-party email provider (Google Workspace, Zoho, ProtonMail). Add the provider's MX records at your domain registrar or Shopify DNS. Add SPF and DKIM TXT records for email authentication." }, { issue: "Redirect between www and non-www not working", solution: "In Shopify admin > Settings > Domains, set your primary domain (www or root). Shopify automatically redirects the non-primary version. Both A record and CNAME must be correctly configured for redirects to work. Allow 24 hours for changes to take effect." }], faq: [{ question: "What DNS records does Shopify need?", answer: "Shopify requires two DNS records: an A record for @ (root domain) pointing to 23.227.38.65, and a CNAME record for www pointing to shops.myshopify.com. These are the same for all Shopify stores regardless of your plan." }, { question: "How long does Shopify domain connection take?", answer: "DNS propagation for Shopify typically takes 24-48 hours. After DNS propagates, SSL certificate provisioning adds another 24 hours. Total time from DNS change to fully working HTTPS site is usually 24-72 hours. Monitor with ReviewMyDNS." }, { question: "Can I use Shopify with a subdomain only?", answer: "Yes, you can connect a subdomain (like shop.example.com) to Shopify using a CNAME record pointing to shops.myshopify.com. The root domain stays on your existing website. Configure this in Shopify admin > Settings > Domains > Connect existing domain." }, { question: "Does Shopify manage DNS automatically?", answer: "If your domain is registered through Shopify, DNS is managed automatically and records are pre-configured. For third-party domains, you must manually add Shopify's A record and CNAME at your domain registrar. Shopify provides step-by-step instructions for popular registrars." }] },
  { slug: "netlify-dns-setup", provider: "Netlify", title: "How to Set DNS Records on Netlify - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records on Netlify. Learn how to set up custom domains with A, CNAME, MX, and TXT records on Netlify DNS.", h1: "How to Set Up DNS Records on Netlify", introduction: "Netlify is a popular platform for deploying modern web applications with built-in DNS management. This guide covers how to configure DNS records using Netlify DNS, connect custom domains to your Netlify sites, and set up email and verification records.", steps: [{ title: "Access Netlify DNS Settings", description: "Navigate to DNS management in your Netlify dashboard.", details: ["Log into app.netlify.com with your account", "Click 'Domains' in the top navigation menu", "Select your domain or click 'Add domain' for a new one", "Click 'DNS settings' or 'Go to DNS panel' for your domain"] }, { title: "Configure Netlify DNS", description: "Set up Netlify as your DNS provider.", details: ["Netlify provides nameservers (dns1.p0*.nsone.net pattern)", "Update your domain registrar's nameservers to Netlify's provided values", "Alternatively, use external DNS and add A/CNAME records pointing to Netlify", "Netlify auto-configures records for sites deployed on the platform"] }, { title: "Add Custom DNS Records", description: "Create DNS records for email, verification, and other services.", details: ["In DNS settings, click 'Add new record'", "Select record type (A, AAAA, CNAME, MX, TXT, NS)", "Enter hostname (leave blank for root domain or enter subdomain)", "Input value and TTL (default 3600 seconds)", "Click 'Save' to create the record"] }, { title: "Verify DNS Propagation", description: "Confirm your DNS changes and SSL provisioning.", details: ["Netlify DNS changes propagate within 15-30 minutes typically", "Netlify automatically provisions Let's Encrypt SSL for connected domains", "SSL may take up to 24 hours after DNS propagation", "Use ReviewMyDNS to verify DNS propagation across global servers"] }], recordTypes: [{ type: "A Record", example: "Type: A, Name: (blank), Value: 75.2.60.5, TTL: 3600", instructions: "Points root domain to Netlify's load balancer IP. Netlify recommends using their DNS nameservers instead of A records for automatic SSL and CDN optimization." }, { type: "CNAME Record", example: "Type: CNAME, Name: www, Value: your-site.netlify.app, TTL: 3600", instructions: "Points subdomain to your Netlify site. Use your-site.netlify.app as the CNAME target. Required if using external DNS instead of Netlify DNS." }, { type: "MX Record", example: "Type: MX, Name: (blank), Value: mx.google.com, Priority: 1, TTL: 3600", instructions: "Routes email to your mail server. Netlify doesn't provide email hosting. Add MX records for Google Workspace, Zoho, or other email providers." }, { type: "TXT Record", example: "Type: TXT, Name: (blank), Value: v=spf1 include:_spf.google.com ~all, TTL: 3600", instructions: "Stores text for SPF, DKIM, DMARC, and domain verification. Add TXT records for email authentication and third-party service verification." }], troubleshooting: [{ issue: "Custom domain showing 'DNS verification failed'", solution: "Ensure your nameservers are updated to Netlify's DNS servers at your registrar. If using external DNS, verify A record points to 75.2.60.5 and CNAME www points to your-site.netlify.app. Use ReviewMyDNS to check propagation status. Allow 24-48 hours for nameserver changes." }, { issue: "SSL certificate not provisioning", solution: "Netlify SSL requires DNS to be fully propagated. Ensure domain is properly connected in Netlify dashboard. Check that no CAA records block Let's Encrypt. If using Netlify DNS, SSL is usually automatic within 24 hours. Try removing and re-adding the domain." }, { issue: "Netlify DNS records conflicting with site", solution: "Netlify automatically creates A and CNAME records for connected sites. If you add manual records that conflict, the site may not resolve correctly. Delete conflicting custom records and let Netlify auto-manage site DNS records." }, { issue: "Email not working with Netlify domain", solution: "Netlify doesn't provide email hosting. Add MX records for your email provider (Google Workspace, Zoho, etc.) in Netlify DNS settings. Add corresponding SPF and DKIM TXT records. Ensure no conflicting MX records exist." }], faq: [{ question: "What are Netlify's DNS nameservers?", answer: "Netlify DNS uses NS1-powered nameservers following the pattern dns1.p0*.nsone.net through dns4.p0*.nsone.net. Exact nameservers are shown when you set up Netlify DNS for your domain. These must be configured at your domain registrar." }, { question: "How long does Netlify DNS propagation take?", answer: "Netlify DNS record changes propagate within 15-30 minutes typically. Nameserver changes at your registrar take 24-48 hours. SSL certificate provisioning takes up to 24 hours after DNS propagation. Monitor status with ReviewMyDNS." }, { question: "Should I use Netlify DNS or external DNS?", answer: "Netlify DNS is recommended for sites hosted on Netlify - it enables automatic SSL provisioning, CDN optimization, and branch deploys with subdomains. Use external DNS (Cloudflare, Route53) if you need advanced features like DDoS protection or complex routing rules." }, { question: "Can I use Netlify DNS without hosting on Netlify?", answer: "Yes, Netlify DNS can be used as a standalone DNS service. However, it's optimized for Netlify-hosted sites. For standalone DNS, providers like Cloudflare or Route53 offer more advanced features. Netlify DNS is free and works well for simple DNS needs." }] },
  { slug: "vercel-dns-setup", provider: "Vercel", title: "How to Set DNS Records on Vercel - Complete Setup Guide", metaDescription: "Step-by-step guide to configure DNS records on Vercel. Learn how to connect custom domains and set up A, CNAME, MX, and TXT records on Vercel.", h1: "How to Set Up DNS Records on Vercel", introduction: "Vercel is a leading platform for deploying frontend frameworks and serverless functions, with built-in DNS and domain management. This guide covers how to configure DNS records on Vercel, connect custom domains to your deployments, and set up email and verification records.", steps: [{ title: "Access Vercel Domain Settings", description: "Navigate to domain management in your Vercel dashboard.", details: ["Log into vercel.com/dashboard with your account", "Select your project from the dashboard", "Click 'Settings' tab, then 'Domains' in the left menu", "Or go to account Settings > Domains for account-level domain management"] }, { title: "Add Custom Domain to Project", description: "Connect your domain to a Vercel deployment.", details: ["Click 'Add Domain' and enter your domain name", "Vercel shows required DNS records for connection", "Choose between Vercel nameservers or adding individual records at your registrar", "For Vercel nameservers: ns1.vercel-dns.com and ns2.vercel-dns.com"] }, { title: "Configure DNS Records", description: "Add required DNS records at your domain registrar.", details: ["Add A record for @ pointing to 76.76.21.21", "Add CNAME record for www pointing to cname.vercel-dns.com", "If using Vercel DNS, add custom records in Vercel dashboard under Domains > DNS Records", "MX and TXT records can be added for email and verification"] }, { title: "Verify DNS Propagation", description: "Confirm domain connection and SSL provisioning.", details: ["Vercel automatically checks DNS configuration and shows status", "SSL certificates are provisioned automatically after DNS propagation", "Vercel shows green checkmark when domain is fully connected", "Use ReviewMyDNS to verify DNS propagation across global servers"] }], recordTypes: [{ type: "A Record", example: "Type: A, Host: @, Value: 76.76.21.21, TTL: 3600", instructions: "Points root domain to Vercel's edge network. The IP 76.76.21.21 is Vercel's standard A record value for all projects." }, { type: "CNAME Record", example: "Type: CNAME, Host: www, Value: cname.vercel-dns.com, TTL: 3600", instructions: "Points www subdomain to Vercel's DNS. Use cname.vercel-dns.com as the target. This enables Vercel's edge network and automatic SSL." }, { type: "MX Record", example: "Type: MX, Host: @, Value: mx.google.com, Priority: 1, TTL: 3600", instructions: "Routes email to your mail server. Vercel doesn't provide email hosting. Add MX records for Google Workspace, Zoho, or other email providers." }, { type: "TXT Record", example: "Type: TXT, Host: @, Value: v=spf1 include:_spf.google.com ~all, TTL: 3600", instructions: "Stores text for SPF, DKIM, DMARC, and domain verification. Add TXT records for email authentication and third-party services." }], troubleshooting: [{ issue: "Vercel showing 'Invalid Configuration' for domain", solution: "Verify A record @ points to 76.76.21.21 and CNAME www points to cname.vercel-dns.com at your registrar. DNS propagation can take up to 48 hours. Check ReviewMyDNS for propagation status. If using Vercel nameservers, ensure registrar has ns1.vercel-dns.com and ns2.vercel-dns.com." }, { issue: "SSL certificate not generating", solution: "Vercel auto-provisions SSL after DNS propagation. Ensure DNS records are correct and fully propagated. Check for CAA records that might block certificate issuance. If SSL doesn't appear after 48 hours, remove the domain and re-add it in Vercel dashboard." }, { issue: "Deployment not showing on custom domain", solution: "Verify the domain is assigned to the correct Vercel project in Settings > Domains. Check that the production branch has a successful deployment. Ensure DNS records point to Vercel (not a previous hosting provider). Clear browser cache and try incognito mode." }, { issue: "Email not working with Vercel domain", solution: "Vercel doesn't provide email hosting. If using Vercel DNS, add MX records in the Vercel dashboard under Domains > DNS Records. If using external DNS, add MX records at your registrar. Include SPF and DKIM TXT records for email authentication." }], faq: [{ question: "What are Vercel's nameservers?", answer: "Vercel's nameservers are ns1.vercel-dns.com and ns2.vercel-dns.com. Set these at your domain registrar to use Vercel DNS for full DNS management. Alternatively, keep your existing DNS provider and add individual A/CNAME records." }, { question: "How long does Vercel DNS propagation take?", answer: "Vercel DNS record changes propagate within minutes when using Vercel DNS. For external DNS changes, propagation takes 1-48 hours depending on your registrar and TTL values. Vercel shows real-time connection status in the dashboard. Use ReviewMyDNS for global verification." }, { question: "Should I use Vercel DNS or external DNS?", answer: "Vercel DNS is recommended for simplicity - it auto-configures records for your deployments and handles SSL automatically. Use external DNS (Cloudflare, Route53) if you need advanced features like DDoS protection, geo-routing, or if you have many non-Vercel services on the domain." }, { question: "What IP address does Vercel use for A records?", answer: "Vercel uses 76.76.21.21 as the standard A record IP for all projects. This IP routes to Vercel's global edge network. For IPv6, Vercel also supports AAAA records - check Vercel documentation for the current IPv6 address." }] },
  { slug: "dns-not-propagating-fix", provider: "DNS Propagation Issues", title: "Why Is My DNS Not Propagating? - Complete Troubleshooting Guide", metaDescription: "Fix DNS propagation delays and stuck DNS changes. Learn about TTL, caching, ISP delays, and common reasons DNS records aren't updating globally.", h1: "Why Is My DNS Not Propagating? Complete Troubleshooting Guide", introduction: "DNS propagation delays are one of the most common frustrations when managing domains. After making DNS changes, you expect them to take effect immediately — but DNS doesn't work that way. This guide explains why DNS changes appear stuck, how TTL and caching affect propagation, and step-by-step fixes to speed things up.", steps: [{ title: "Understand DNS TTL and Caching", description: "TTL (Time To Live) controls how long DNS records are cached by resolvers worldwide.", details: ["Every DNS record has a TTL value in seconds (e.g., 3600 = 1 hour)", "Resolvers cache records for the TTL duration before re-querying", "If your old TTL was 86400 (24 hours), resolvers may serve stale data for up to 24 hours", "Lower your TTL to 300 (5 minutes) before making changes, then wait for old TTL to expire"] }, { title: "Flush Your Local DNS Cache", description: "Your computer and browser cache DNS responses independently of ISP resolvers.", details: ["Windows: Run 'ipconfig /flushdns' in Command Prompt as Administrator", "macOS: Run 'sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder' in Terminal", "Linux: Run 'sudo systemd-resolve --flush-caches' or restart systemd-resolved", "Also clear your browser cache or test in incognito/private browsing mode"] }, { title: "Test with Multiple Public DNS Resolvers", description: "Compare results across different DNS providers to confirm propagation status.", details: ["Test with Google DNS (8.8.8.8) using 'nslookup yourdomain.com 8.8.8.8'", "Test with Cloudflare DNS (1.1.1.1) using 'nslookup yourdomain.com 1.1.1.1'", "Test with Quad9 (9.9.9.9) and OpenDNS (208.67.222.222)", "Use ReviewMyDNS to check propagation across 50+ global servers simultaneously"] }, { title: "Verify Changes at Authoritative Nameservers", description: "Check that your DNS provider's authoritative servers have the correct records.", details: ["Find your authoritative nameservers with 'dig NS yourdomain.com'", "Query authoritative server directly: 'dig @ns1.yourdns.com yourdomain.com A'", "If authoritative servers show old data, the change wasn't saved correctly", "Re-check your DNS provider dashboard and save changes again"] }, { title: "Check for ISP DNS Caching Issues", description: "Some ISPs aggressively cache DNS records beyond TTL values.", details: ["ISP resolvers sometimes ignore TTL and cache for longer periods", "Switch to a public DNS resolver (Google 8.8.8.8 or Cloudflare 1.1.1.1) to bypass ISP caching", "Contact your ISP if their DNS servers consistently show stale data", "Corporate networks and VPNs may have their own DNS caching layers"] }], recordTypes: [{ type: "A Record Propagation", example: "Old: A @ 192.0.2.1 TTL 86400 → New: A @ 203.0.113.1 TTL 300", instructions: "A record changes are affected by the previous TTL value. If the old TTL was high, resolvers keep serving old IP. Lower TTL before migration." }, { type: "CNAME Record Propagation", example: "Old: CNAME www old-host.com TTL 3600 → New: CNAME www new-host.com TTL 300", instructions: "CNAME changes follow the same TTL caching rules. Additionally, the target domain's own DNS resolution adds another layer of potential caching." }, { type: "MX Record Propagation", example: "Old: MX @ mail.old-provider.com TTL 3600 → New: MX @ mail.new-provider.com TTL 300", instructions: "MX record changes affect email delivery. Keep old mail server active during propagation to avoid lost emails. MX changes can take 2-6 hours." }, { type: "NS Record Propagation", example: "Old NS: ns1.old-dns.com → New NS: ns1.new-dns.com", instructions: "Nameserver changes are the slowest to propagate (24-48 hours). The registrar updates the parent zone, which must propagate through the global DNS hierarchy." }], troubleshooting: [{ issue: "DNS shows old records after 24+ hours", solution: "Verify changes saved correctly at your DNS provider. Query authoritative nameservers directly to confirm. If authoritative servers show correct data but resolvers don't, aggressive ISP caching is likely — switch to public DNS (8.8.8.8 or 1.1.1.1) and wait." }, { issue: "DNS works on some devices but not others", solution: "Different devices use different DNS resolvers with different cache states. Flush DNS cache on affected devices. Check if devices use ISP DNS vs public DNS. Corporate networks may have separate DNS infrastructure with longer cache times." }, { issue: "Changed nameservers but domain not resolving", solution: "Nameserver changes take 24-48 hours. Ensure new nameservers are correct and active. Verify DNS records exist at the new DNS provider before changing nameservers. Query new nameservers directly to confirm records are configured." }, { issue: "DNS propagation checker shows mixed results", solution: "Mixed results are normal during propagation — different servers update at different times. If most servers show new data, propagation is nearly complete. Wait for remaining servers. If stuck after 48 hours, check for DNSSEC issues or incorrect nameserver configuration." }], faq: [{ question: "How long does DNS propagation actually take?", answer: "DNS propagation typically takes 15 minutes to 4 hours for record changes, and 24-48 hours for nameserver changes. The actual time depends on the previous TTL value, ISP caching behavior, and the type of change. Use ReviewMyDNS to monitor real-time propagation status across global servers." }, { question: "Can I speed up DNS propagation?", answer: "You can't force all resolvers to update, but you can prepare: lower your TTL to 300 seconds 24-48 hours before making changes, flush your local DNS cache after changes, and use public DNS resolvers (8.8.8.8, 1.1.1.1) which typically update faster than ISP resolvers." }, { question: "Why does my DNS work on my phone but not my computer?", answer: "Different devices use different DNS resolvers. Your phone may use mobile carrier DNS while your computer uses ISP or router DNS. Each resolver has its own cache. Flush DNS cache on the affected device, or switch to a public DNS resolver like Google (8.8.8.8) or Cloudflare (1.1.1.1)." }, { question: "Does changing DNS affect my website's SEO?", answer: "DNS changes themselves don't affect SEO, but downtime during propagation can. To minimize impact: lower TTL before changes, keep old server running during propagation, verify changes with ReviewMyDNS before decommissioning old infrastructure, and monitor for 404 errors after migration." }] },
  { slug: "email-going-to-spam-dns-fix", provider: "Email Spam DNS Fix", title: "Emails Going to Spam? Fix Your DNS Records - SPF DKIM DMARC Guide", metaDescription: "Fix emails landing in spam by configuring SPF, DKIM, and DMARC DNS records correctly. Complete guide to improve email deliverability through DNS.", h1: "Emails Going to Spam? Fix Your DNS Records", introduction: "If your emails are landing in spam folders instead of inboxes, misconfigured or missing DNS records are often the cause. Email providers like Gmail, Outlook, and Yahoo check SPF, DKIM, and DMARC records to verify that emails are legitimate. This guide walks you through diagnosing and fixing DNS-related email deliverability problems.", steps: [{ title: "Check Your Current SPF Record", description: "SPF (Sender Policy Framework) tells receiving servers which IP addresses and servers are authorized to send email for your domain.", details: ["Look up your domain's TXT records using ReviewMyDNS or 'dig TXT yourdomain.com'", "Find the record starting with 'v=spf1'", "If no SPF record exists, create one — this is the most common cause of spam classification", "Ensure all sending services are included: your mail server, marketing tools (Mailchimp, SendGrid), and transactional email services"] }, { title: "Fix Common SPF Mistakes", description: "SPF misconfigurations cause authentication failures that trigger spam filters.", details: ["Only one SPF TXT record allowed per domain — merge multiple records into one", "Use 'include:' mechanism for third-party services (e.g., include:_spf.google.com)", "End with '~all' (soft fail) or '-all' (hard fail) — never '+all' which allows anyone to send as your domain", "Keep total DNS lookups under 10 to avoid 'permerror' which defaults to fail"] }, { title: "Set Up DKIM Signing", description: "DKIM (DomainKeys Identified Mail) adds a cryptographic signature to outgoing emails.", details: ["Get your DKIM public key from your email provider (Google Workspace, Microsoft 365, etc.)", "Add a TXT record at selector._domainkey.yourdomain.com with the DKIM public key", "Common selectors: 'google' for Google Workspace, 'selector1' and 'selector2' for Microsoft 365", "Test DKIM by sending an email and checking headers for 'dkim=pass'"] }, { title: "Configure DMARC Policy", description: "DMARC ties SPF and DKIM together and tells receivers what to do with unauthenticated email.", details: ["Add a TXT record at _dmarc.yourdomain.com", "Start with monitoring: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com", "After reviewing reports, upgrade to p=quarantine (sends failures to spam)", "Eventually move to p=reject (blocks unauthenticated email entirely)"] }, { title: "Verify Email Authentication End-to-End", description: "Test that all three authentication methods pass correctly.", details: ["Send a test email to a Gmail account and click 'Show original' to view authentication results", "Check for 'spf=pass', 'dkim=pass', and 'dmarc=pass' in email headers", "Use ReviewMyDNS to verify all DNS records are correctly published", "Monitor DMARC reports for ongoing authentication failures"] }], recordTypes: [{ type: "SPF Record (TXT)", example: "Name: @, Type: TXT, Value: v=spf1 include:_spf.google.com include:sendgrid.net ~all", instructions: "Authorizes mail servers to send email for your domain. Include all services that send email on your behalf. Only one SPF record per domain — merge if you have multiple." }, { type: "DKIM Record (TXT)", example: "Name: google._domainkey, Type: TXT, Value: v=DKIM1; k=rsa; p=MIIBIjANB...(public key)", instructions: "Publishes your DKIM public key for email signature verification. The selector name and key value come from your email provider. Each sending service needs its own DKIM record." }, { type: "DMARC Record (TXT)", example: "Name: _dmarc, Type: TXT, Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com", instructions: "Sets your DMARC policy. Start with p=none for monitoring, then p=quarantine, then p=reject. The rua address receives aggregate reports showing authentication results." }, { type: "MX Record", example: "Name: @, Type: MX, Priority: 1, Value: aspmx.l.google.com", instructions: "Routes incoming email to your mail server. Incorrect MX records cause bounced emails. Set multiple MX records with different priorities for redundancy." }], troubleshooting: [{ issue: "SPF record returns 'permerror' or 'too many DNS lookups'", solution: "SPF is limited to 10 DNS lookups total. Each 'include:', 'a:', 'mx:', and 'redirect=' counts as a lookup. Consolidate includes, use IP addresses (ip4:/ip6:) instead of hostnames where possible, or use SPF flattening services to reduce lookup count." }, { issue: "DKIM signature fails verification", solution: "Verify the DKIM TXT record is published at the correct selector._domainkey.yourdomain.com hostname. Check for formatting issues — the key value must be exact with no extra spaces or line breaks. Ensure DKIM signing is enabled in your email provider settings." }, { issue: "DMARC reports show high failure rates", solution: "Review DMARC aggregate reports to identify which IPs are failing. Common causes: forgotten sending services not in SPF, forwarded emails breaking SPF alignment, or DKIM not configured for all sending services. Add missing sources to SPF and configure DKIM for each service." }, { issue: "Emails still going to spam despite passing SPF/DKIM/DMARC", solution: "Authentication is necessary but not sufficient. Also check: email content and subject lines for spam trigger words, sending domain reputation (use Google Postmaster Tools), IP reputation of your mail server, proper unsubscribe headers, and consistent sending volume patterns." }], faq: [{ question: "Do I really need all three — SPF, DKIM, and DMARC?", answer: "Yes. As of 2024, Google and Yahoo require SPF, DKIM, and DMARC for bulk senders (5000+ emails/day), and strongly recommend them for all senders. Even for low-volume senders, all three significantly improve deliverability and protect your domain from spoofing." }, { question: "How long after fixing DNS records will emails stop going to spam?", answer: "DNS changes propagate within 1-4 hours, but email provider reputation systems take longer to adjust. Gmail and Outlook may take 1-2 weeks to improve your domain's reputation after fixing authentication. Consistent, authenticated sending over time improves deliverability." }, { question: "Can I have multiple SPF records for my domain?", answer: "No. DNS allows only one SPF TXT record per domain. Multiple SPF records cause a 'permerror' which defaults to fail. Merge all authorized senders into a single SPF record using multiple 'include:' mechanisms within one record." }, { question: "What DMARC policy should I start with?", answer: "Start with p=none to monitor without affecting delivery. This lets you receive reports and identify all legitimate sending sources. Once you've confirmed all legitimate senders pass SPF and DKIM, upgrade to p=quarantine (sends failures to spam), then eventually p=reject (blocks failures entirely)." }] },
  { slug: "ssl-certificate-dns-errors", provider: "SSL Certificate DNS", title: "SSL Certificate DNS Validation Errors - How to Fix", metaDescription: "Fix SSL certificate DNS validation errors for Let's Encrypt, DigiCert, and other CAs. Learn to add CNAME and TXT validation records correctly.", h1: "SSL Certificate DNS Validation Errors - How to Fix", introduction: "SSL/TLS certificates require domain validation to prove you own the domain. DNS validation is the most common method, requiring you to add specific CNAME or TXT records. When these records are misconfigured, certificate issuance fails. This guide covers fixing DNS validation errors for popular certificate authorities including Let's Encrypt, DigiCert, Comodo, and GoDaddy SSL.", steps: [{ title: "Identify the Required Validation Record", description: "Your certificate authority (CA) provides specific DNS records you must add for validation.", details: ["Check your SSL provider's dashboard or email for the validation record details", "Let's Encrypt (via Certbot): requires a TXT record at _acme-challenge.yourdomain.com", "DigiCert/Comodo/Sectigo: typically requires a CNAME record with a specific hash value", "GoDaddy/Namecheap SSL: usually provides a CNAME or TXT record for validation", "AWS Certificate Manager: provides CNAME records for each domain/subdomain on the certificate"] }, { title: "Add the DNS Validation Record Correctly", description: "Create the exact DNS record specified by your certificate authority.", details: ["For TXT validation: Add TXT record at the exact hostname specified (e.g., _acme-challenge)", "For CNAME validation: Add CNAME record with the exact name and target provided", "Do NOT include your domain name in the hostname if your DNS provider auto-appends it", "Example: If CA says add '_acme-challenge.example.com', enter just '_acme-challenge' as hostname", "Double-check for typos — validation records are long random strings that must be exact"] }, { title: "Wait for DNS Propagation", description: "The CA will query DNS servers to find your validation record.", details: ["Allow 5-30 minutes for DNS propagation before triggering validation", "Use ReviewMyDNS to verify the validation record is visible globally", "Some CAs retry automatically every few minutes; others require manual re-validation", "If using Cloudflare proxy (orange cloud), set validation records to DNS-only (gray cloud)"] }, { title: "Trigger Certificate Validation", description: "Request the CA to verify your DNS record and issue the certificate.", details: ["Let's Encrypt: Re-run certbot with DNS challenge or click 'Verify' in your hosting panel", "DigiCert/Comodo: Click 'Check DNS' or 'Verify' in your SSL order dashboard", "AWS ACM: Certificates auto-validate once CNAME records propagate", "Most CAs validate within minutes once DNS records are globally visible"] }], recordTypes: [{ type: "ACME Challenge TXT Record", example: "Name: _acme-challenge, Type: TXT, Value: dGVzdC1hY21lLWNoYWxsZW5nZS12YWx1ZQ (CA-provided token)", instructions: "Used by Let's Encrypt and ACME-compatible CAs. Add TXT record at _acme-challenge.yourdomain.com with the exact token provided by certbot or your hosting panel. For wildcard certificates, the same _acme-challenge hostname is used." }, { type: "CNAME Validation Record", example: "Name: _abc123.yourdomain.com, Type: CNAME, Target: dcv.digicert.com (CA-provided target)", instructions: "Used by DigiCert, Comodo, Sectigo, and others. Add CNAME record with the exact name and target from your CA. The name is typically a hash unique to your order." }, { type: "AWS ACM CNAME Record", example: "Name: _randomhash.yourdomain.com, Type: CNAME, Target: _randomhash.acm-validations.aws", instructions: "AWS Certificate Manager provides unique CNAME records for each domain on the certificate. Add all CNAME records to your DNS. ACM auto-renews certificates as long as CNAME records remain in place." }, { type: "CAA Record", example: "Name: @, Type: CAA, Value: 0 issue letsencrypt.org", instructions: "CAA (Certificate Authority Authorization) restricts which CAs can issue certificates for your domain. If present, ensure your CA is listed. Add '0 issue letsencrypt.org' to allow Let's Encrypt, or '0 issue ;' to block all CAs." }], troubleshooting: [{ issue: "Validation record not found by CA", solution: "Verify the record exists using ReviewMyDNS or 'dig TXT _acme-challenge.yourdomain.com'. Common mistakes: including full domain in hostname (DNS provider auto-appends it), typos in the long validation token, or record not yet propagated. Wait 15-30 minutes and retry." }, { issue: "Let's Encrypt DNS challenge fails for wildcard certificate", solution: "Wildcard certificates (*.yourdomain.com) require DNS-01 challenge. Add TXT record at _acme-challenge.yourdomain.com (not _acme-challenge.*.yourdomain.com). If renewing, delete old challenge TXT records first as stale records can cause validation failures." }, { issue: "SSL validation fails when using Cloudflare proxy", solution: "If your DNS records are proxied through Cloudflare (orange cloud), set the validation CNAME or TXT record to DNS-only (gray cloud). Cloudflare's proxy can interfere with CA validation queries. After certificate is issued, you can re-enable proxy for other records." }, { issue: "CAA record blocking certificate issuance", solution: "Check for CAA records: 'dig CAA yourdomain.com'. If CAA records exist, they must include your CA. Add '0 issue letsencrypt.org' for Let's Encrypt or '0 issue digicert.com' for DigiCert. If no CAA records exist, any CA can issue certificates (default behavior)." }], faq: [{ question: "What is DNS validation for SSL certificates?", answer: "DNS validation proves domain ownership by requiring you to add a specific DNS record that only the domain owner can create. The certificate authority queries DNS for this record, and if found, issues the SSL certificate. It's the preferred method because it doesn't require web server access and works for wildcard certificates." }, { question: "How long does SSL DNS validation take?", answer: "Once the DNS validation record has propagated globally (typically 5-30 minutes), the CA can validate within seconds to minutes. Total time from adding the record to certificate issuance is usually under 1 hour. Use ReviewMyDNS to confirm propagation before triggering validation." }, { question: "Do I need to keep DNS validation records after the certificate is issued?", answer: "For Let's Encrypt TXT challenges: records can be removed after issuance, but you'll need to add new ones at renewal (every 90 days). For AWS ACM CNAME records: keep them permanently for automatic renewal. For DigiCert/Comodo CNAME records: typically can be removed after issuance but check your CA's renewal requirements." }, { question: "Why does my SSL certificate keep failing to renew?", answer: "Auto-renewal failures are usually caused by: deleted DNS validation records (especially AWS ACM CNAME records), changed nameservers since original validation, CAA records blocking the CA, or Cloudflare proxy interfering with validation. Check DNS records are intact and propagating correctly using ReviewMyDNS." }] },
  { slug: "subdomain-not-working-dns", provider: "Subdomain DNS Issues", title: "Subdomain Not Working? DNS Configuration Fix Guide", metaDescription: "Fix subdomains not resolving or loading. Learn to configure A records, CNAME records, and wildcard DNS for subdomains that aren't working.", h1: "Subdomain Not Working? DNS Configuration Fix Guide", introduction: "Subdomains like blog.example.com, app.example.com, or shop.example.com require their own DNS records to work. If your subdomain isn't resolving, loading a blank page, or showing an error, it's almost always a DNS configuration issue. This guide covers the most common subdomain DNS problems and how to fix them.", steps: [{ title: "Check If a DNS Record Exists for the Subdomain", description: "Every subdomain needs its own A, AAAA, or CNAME record — they don't inherit from the root domain.", details: ["Use ReviewMyDNS or 'dig A subdomain.yourdomain.com' to check if a record exists", "If you get NXDOMAIN (non-existent domain), no DNS record exists for that subdomain", "Log into your DNS provider and add an A or CNAME record for the subdomain", "The subdomain name goes in the 'Host' or 'Name' field (e.g., 'blog' for blog.example.com)"] }, { title: "Add the Correct DNS Record Type", description: "Choose between A record and CNAME record based on your hosting setup.", details: ["Use an A record if pointing to a specific IP address (e.g., your server's IP)", "Use a CNAME record if pointing to another hostname (e.g., your-app.herokuapp.com)", "CNAME records cannot coexist with other record types at the same hostname", "For most third-party services (Shopify, Heroku, Netlify), use CNAME as they provide hostnames not IPs"] }, { title: "Configure Your Web Server for the Subdomain", description: "DNS alone isn't enough — your web server must also be configured to serve the subdomain.", details: ["In Apache: Add a VirtualHost block with ServerName set to the subdomain", "In Nginx: Add a server block with server_name set to the subdomain", "In cloud platforms (Vercel, Netlify): Add the subdomain as a custom domain in project settings", "Ensure your SSL certificate covers the subdomain (separate cert or wildcard *.yourdomain.com)"] }, { title: "Set Up Wildcard DNS (Optional)", description: "Wildcard DNS routes all undefined subdomains to a single destination.", details: ["Add an A or CNAME record with '*' as the hostname (e.g., * → 192.0.2.1)", "Wildcard only matches subdomains without their own specific DNS records", "Useful for multi-tenant apps, staging environments, or catch-all routing", "Wildcard SSL certificates (*.yourdomain.com) are needed separately from wildcard DNS"] }, { title: "Verify Subdomain DNS Propagation", description: "Confirm the subdomain's DNS records are visible globally.", details: ["Use ReviewMyDNS to check the subdomain's A or CNAME record globally", "Test with 'nslookup subdomain.yourdomain.com 8.8.8.8' from command line", "New subdomain records typically propagate within 5-30 minutes", "If the root domain works but subdomain doesn't, the issue is definitely a missing DNS record"] }], recordTypes: [{ type: "A Record for Subdomain", example: "Name: blog, Type: A, Value: 192.0.2.1, TTL: 300", instructions: "Points a subdomain directly to an IP address. Enter just the subdomain name (e.g., 'blog') not the full domain. Your DNS provider appends the root domain automatically." }, { type: "CNAME Record for Subdomain", example: "Name: shop, Type: CNAME, Value: shops.myshopify.com, TTL: 300", instructions: "Points a subdomain to another hostname. Required by many third-party services like Shopify, Heroku, and Netlify. Cannot be used if other record types exist at the same subdomain." }, { type: "Wildcard A Record", example: "Name: *, Type: A, Value: 192.0.2.1, TTL: 300", instructions: "Routes all undefined subdomains to one IP. Only applies to subdomains without specific records. Useful for multi-tenant applications or catch-all routing." }, { type: "AAAA Record for Subdomain", example: "Name: app, Type: AAAA, Value: 2001:db8::1, TTL: 300", instructions: "Points a subdomain to an IPv6 address. Works identically to A records but for IPv6. Add alongside A record for dual-stack support." }], troubleshooting: [{ issue: "Subdomain returns NXDOMAIN (domain not found)", solution: "No DNS record exists for this subdomain. Log into your DNS provider and add an A record (for IP address) or CNAME record (for hostname) with the subdomain name in the Host field. Wildcard records only apply if no specific record exists for that subdomain." }, { issue: "Subdomain resolves but shows wrong website or blank page", solution: "DNS is working but the web server isn't configured for this subdomain. Add the subdomain as a virtual host in Apache/Nginx, or add it as a custom domain in your hosting platform (Vercel, Netlify, etc.). Also check that your SSL certificate covers the subdomain." }, { issue: "Wildcard subdomain not catching all subdomains", solution: "Wildcard records (*.yourdomain.com) only match subdomains that don't have their own specific DNS records. They also only match one level deep — *.example.com matches sub.example.com but NOT deep.sub.example.com. Verify the wildcard record exists and check for conflicting specific records." }, { issue: "CNAME subdomain conflicts with other records", solution: "DNS protocol doesn't allow CNAME records to coexist with other record types at the same hostname. If you need MX, TXT, or other records at a subdomain, use an A record instead of CNAME, or move those other records to a different hostname." }], faq: [{ question: "Do subdomains inherit DNS records from the root domain?", answer: "No. Each subdomain needs its own DNS records. An A record for @ (root domain) does NOT apply to www, blog, app, or any other subdomain. You must create separate records for each subdomain, or use a wildcard (*) record to catch all undefined subdomains." }, { question: "Should I use an A record or CNAME for my subdomain?", answer: "Use a CNAME if your hosting provider gives you a hostname (e.g., myapp.herokuapp.com, shops.myshopify.com). Use an A record if you have a specific IP address. CNAME is generally preferred because if the provider changes their IP, the CNAME automatically follows." }, { question: "How do wildcard DNS records work?", answer: "A wildcard record (* as hostname) matches any subdomain that doesn't have its own specific DNS record. For example, if you have A records for 'www' and 'mail', plus a wildcard, the wildcard handles everything else (blog, app, test, etc.). Wildcards only match one level — *.example.com matches sub.example.com but not deep.sub.example.com." }, { question: "Do I need a separate SSL certificate for each subdomain?", answer: "You can either get individual certificates for each subdomain, or use a wildcard certificate (*.yourdomain.com) that covers all subdomains at one level. Let's Encrypt offers free wildcard certificates via DNS-01 challenge. Many hosting platforms auto-provision SSL for subdomains added to your account." }] },
];

export function getProviderGuide(slug: string): ProviderGuide | undefined {
  return providerGuides.find(guide => guide.slug === slug);
}

export function getAllProviderGuideSlugs(): string[] {
  return providerGuides.map(guide => guide.slug);
}
