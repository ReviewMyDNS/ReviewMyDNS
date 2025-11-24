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
  },
  {
    slug: "namecheap-dns-setup",
    provider: "Namecheap",
    title: "How to Set DNS Records on Namecheap - Complete Setup Guide",
    metaDescription: "Learn how to configure DNS records on Namecheap with our step-by-step guide. Set up A, CNAME, MX, and TXT records for your domain easily.",
    h1: "How to Set Up DNS Records on Namecheap",
    introduction: "Namecheap is a popular domain registrar known for affordable domains and user-friendly DNS management. This guide will show you how to configure DNS records on Namecheap, whether you're hosting a website, setting up email, or verifying domain ownership.",
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
  }
];

export function getProviderGuide(slug: string): ProviderGuide | undefined {
  return providerGuides.find(guide => guide.slug === slug);
}

export function getAllProviderGuideSlugs(): string[] {
  return providerGuides.map(guide => guide.slug);
}
