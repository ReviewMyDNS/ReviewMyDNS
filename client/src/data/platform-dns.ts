export interface PlatformDns {
  slug: string;
  platform: string;
  title: string;
  metaDescription: string;
  intro: string;
  icon: string;
  steps: {
    title: string;
    content: string;
  }[];
  commonRecords: {
    type: string;
    name: string;
    value: string;
    purpose: string;
  }[];
  troubleshooting: string[];
  keywords: string[];
}

export const platformDnsGuides: PlatformDns[] = [
  {
    slug: "wordpress",
    platform: "WordPress",
    title: "WordPress DNS Setup Guide - Configure Domain & Hosting",
    metaDescription: "Complete WordPress DNS configuration guide. Connect your domain to WordPress hosting, set up SSL, email, and CDN records.",
    intro: "Whether you're using WordPress.com, self-hosted WordPress, or managed WordPress hosting, proper DNS configuration ensures your site loads correctly and your email works reliably.",
    icon: "wordpress",
    steps: [
      {
        title: "Point Your Domain to WordPress Hosting",
        content: "Log in to your domain registrar and update the A record to point to your WordPress host's IP address. Most managed WordPress hosts provide specific IPs in their setup documentation. For WordPress.com, you'll need to add their nameservers or CNAME records."
      },
      {
        title: "Configure www Subdomain",
        content: "Add a CNAME record for 'www' pointing to your root domain or hosting provider's URL. This ensures both example.com and www.example.com work correctly."
      },
      {
        title: "Set Up Email Records",
        content: "Add MX records for your email provider (Google Workspace, Microsoft 365, or your host's email). Include SPF, DKIM, and DMARC records for email authentication."
      },
      {
        title: "Enable CDN (Optional)",
        content: "If using Cloudflare or another CDN, update nameservers or add CNAME records as directed. This improves performance and security."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "[Your Host IP]", purpose: "Points domain to WordPress server" },
      { type: "CNAME", name: "www", value: "example.com", purpose: "Redirects www to root domain" },
      { type: "MX", name: "@", value: "mail.example.com", purpose: "Routes email to mail server" },
      { type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", purpose: "SPF email authentication" }
    ],
    troubleshooting: [
      "ERR_NAME_NOT_RESOLVED: DNS hasn't propagated yet, wait up to 48 hours",
      "SSL certificate errors: Ensure A record points to correct IP before requesting SSL",
      "Email not working: Verify MX records and check SPF/DKIM configuration",
      "Site showing old content: Clear browser cache and flush DNS"
    ],
    keywords: ["WordPress DNS", "WordPress domain setup", "connect domain WordPress", "WordPress hosting DNS", "WordPress A record"]
  },
  {
    slug: "shopify",
    platform: "Shopify",
    title: "Shopify DNS Setup - Connect Your Custom Domain",
    metaDescription: "Step-by-step Shopify DNS configuration. Connect a custom domain to your Shopify store with correct A and CNAME records.",
    intro: "Connecting a custom domain to Shopify requires specific DNS records. Shopify provides the A record IP and CNAME for your store, making setup straightforward once you know where to look.",
    icon: "shopify",
    steps: [
      {
        title: "Add Domain in Shopify Admin",
        content: "Go to Settings > Domains > Connect existing domain. Enter your domain name and Shopify will provide the required DNS records."
      },
      {
        title: "Update A Record",
        content: "In your domain registrar's DNS settings, set the A record for @ (root domain) to Shopify's IP: 23.227.38.65"
      },
      {
        title: "Add CNAME for www",
        content: "Create a CNAME record for 'www' pointing to shops.myshopify.com. This ensures the www version of your site works."
      },
      {
        title: "Verify in Shopify",
        content: "Return to Shopify and click 'Verify connection'. It may take a few minutes to several hours for DNS to propagate."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "23.227.38.65", purpose: "Points domain to Shopify servers" },
      { type: "CNAME", name: "www", value: "shops.myshopify.com", purpose: "Connects www subdomain to store" },
      { type: "TXT", name: "@", value: "[Shopify verification]", purpose: "Domain ownership verification" }
    ],
    troubleshooting: [
      "Domain not verifying: Wait 24-48 hours for propagation, then retry",
      "SSL pending: Shopify auto-provisions SSL after DNS verification",
      "www not working: Ensure CNAME points to shops.myshopify.com (not your store URL)",
      "Email issues: Shopify doesn't provide email; use a third-party service with proper MX records"
    ],
    keywords: ["Shopify DNS", "Shopify custom domain", "connect domain Shopify", "Shopify A record", "Shopify CNAME"]
  },
  {
    slug: "squarespace",
    platform: "Squarespace",
    title: "Squarespace DNS Setup - Custom Domain Configuration",
    metaDescription: "Configure DNS for Squarespace. Complete guide to connecting your custom domain with A records, CNAME, and email setup.",
    intro: "Squarespace provides detailed DNS instructions for connecting custom domains. You can either transfer your domain to Squarespace or keep it at your current registrar and update DNS records.",
    icon: "squarespace",
    steps: [
      {
        title: "Add Domain in Squarespace",
        content: "In Settings > Domains, click 'Use a domain I own' and enter your domain. Squarespace will display the required DNS records."
      },
      {
        title: "Configure A Records",
        content: "Add four A records pointing to Squarespace IPs: 198.185.159.144, 198.185.159.145, 198.49.23.144, 198.49.23.145"
      },
      {
        title: "Set Up www CNAME",
        content: "Add a CNAME record for 'www' pointing to ext-cust.squarespace.com"
      },
      {
        title: "Verify Connection",
        content: "Squarespace will automatically check your DNS. SSL is provisioned once records are verified."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "198.185.159.144", purpose: "Primary Squarespace server" },
      { type: "A", name: "@", value: "198.185.159.145", purpose: "Secondary Squarespace server" },
      { type: "A", name: "@", value: "198.49.23.144", purpose: "Tertiary Squarespace server" },
      { type: "A", name: "@", value: "198.49.23.145", purpose: "Quaternary Squarespace server" },
      { type: "CNAME", name: "www", value: "ext-cust.squarespace.com", purpose: "www subdomain routing" }
    ],
    troubleshooting: [
      "Domain showing 'Not connected': All 4 A records must be added correctly",
      "Mixed content warnings: Ensure all embedded content uses HTTPS",
      "Email not working: Squarespace doesn't host email; add MX records for your email provider",
      "Subdomain issues: Add separate CNAME records for each subdomain"
    ],
    keywords: ["Squarespace DNS", "Squarespace domain", "connect domain Squarespace", "Squarespace A record", "Squarespace custom domain"]
  },
  {
    slug: "wix",
    platform: "Wix",
    title: "Wix DNS Configuration - Connect Your Domain",
    metaDescription: "Complete Wix DNS setup guide. Connect a custom domain to your Wix website using nameservers or DNS records.",
    intro: "Wix offers two methods to connect your domain: transferring nameservers to Wix (recommended) or pointing individual DNS records. The nameserver method provides the smoothest experience.",
    icon: "wix",
    steps: [
      {
        title: "Start Connection in Wix",
        content: "In your Wix dashboard, go to Settings > Domains > Connect a Domain. Choose 'Connect a domain you already own'."
      },
      {
        title: "Choose Connection Method",
        content: "Select either 'Nameservers' (recommended) for full Wix DNS management, or 'Pointing' to keep DNS at your registrar."
      },
      {
        title: "Update DNS Records",
        content: "For pointing: Add the A record and CNAME provided by Wix. For nameservers: Update nameservers to ns1.wixdns.net and ns2.wixdns.net."
      },
      {
        title: "Complete Verification",
        content: "Wix automatically verifies the connection. SSL certificate is provisioned after successful verification."
      }
    ],
    commonRecords: [
      { type: "NS", name: "@", value: "ns1.wixdns.net", purpose: "Wix nameserver (if transferring)" },
      { type: "NS", name: "@", value: "ns2.wixdns.net", purpose: "Secondary Wix nameserver" },
      { type: "A", name: "@", value: "[Provided by Wix]", purpose: "Points to Wix servers (if pointing)" },
      { type: "CNAME", name: "www", value: "[Provided by Wix]", purpose: "www subdomain (if pointing)" }
    ],
    troubleshooting: [
      "Domain not connecting: Ensure old conflicting records are removed",
      "SSL errors: Wait 24-48 hours after DNS changes for SSL provisioning",
      "Email stopped working: If using Wix nameservers, reconfigure MX records in Wix DNS",
      "Subdomain not working: Add CNAME in Wix dashboard for each subdomain"
    ],
    keywords: ["Wix DNS", "Wix domain setup", "connect domain Wix", "Wix nameservers", "Wix custom domain"]
  },
  {
    slug: "webflow",
    platform: "Webflow",
    title: "Webflow DNS Setup - Custom Domain Configuration",
    metaDescription: "Configure DNS for Webflow sites. Connect your custom domain with A records and CNAME for staging and production.",
    intro: "Webflow uses a straightforward DNS setup with A records for the root domain and CNAME for www. The platform automatically provisions SSL certificates once DNS is configured correctly.",
    icon: "webflow",
    steps: [
      {
        title: "Add Domain in Webflow",
        content: "In Project Settings > Hosting > Custom domains, add your domain. Webflow displays the required DNS records."
      },
      {
        title: "Configure A Record",
        content: "Add an A record for @ pointing to 75.2.70.75 (Webflow's IP address)."
      },
      {
        title: "Add www CNAME",
        content: "Create a CNAME record for 'www' pointing to proxy-ssl.webflow.com"
      },
      {
        title: "Publish and Verify",
        content: "Publish your Webflow site, then check the domain status in settings. SSL will be issued automatically."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "75.2.70.75", purpose: "Points to Webflow hosting" },
      { type: "CNAME", name: "www", value: "proxy-ssl.webflow.com", purpose: "www with SSL proxy" }
    ],
    troubleshooting: [
      "Domain shows 'Invalid configuration': Verify A record IP is exactly 75.2.70.75",
      "SSL not working: Ensure site is published after adding domain",
      "Mixed http/https: All assets should use relative URLs or https",
      "Staging domain needed: Add staging subdomain CNAME to [site].webflow.io"
    ],
    keywords: ["Webflow DNS", "Webflow custom domain", "Webflow hosting DNS", "Webflow A record", "connect domain Webflow"]
  },
  {
    slug: "ghost",
    platform: "Ghost",
    title: "Ghost CMS DNS Setup - Custom Domain for Your Blog",
    metaDescription: "Configure DNS for Ghost blogs. Connect custom domains to Ghost(Pro) or self-hosted Ghost installations.",
    intro: "Ghost provides both managed hosting (Ghost Pro) and self-hosted options. DNS configuration varies slightly depending on your setup, but the core concepts remain the same.",
    icon: "ghost",
    steps: [
      {
        title: "Get Your Server IP or CNAME",
        content: "For Ghost(Pro), find your custom domain settings in Ghost Admin. For self-hosted, use your server's IP address."
      },
      {
        title: "Add A Record",
        content: "Point your root domain (@) to your Ghost server's IP address or Ghost(Pro)'s provided IP."
      },
      {
        title: "Configure www",
        content: "Add a CNAME record for 'www' pointing to your root domain or Ghost's provided hostname."
      },
      {
        title: "Enable SSL",
        content: "Ghost(Pro) handles SSL automatically. For self-hosted, use Let's Encrypt via ghost setup ssl."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "[Server IP]", purpose: "Points to Ghost server" },
      { type: "CNAME", name: "www", value: "example.com", purpose: "Redirects www to root" }
    ],
    troubleshooting: [
      "502 Bad Gateway: Ghost service may need restart or Nginx misconfigured",
      "SSL certificate errors: Run 'ghost setup ssl' on self-hosted installations",
      "Domain not resolving: Check A record and wait for propagation",
      "Email issues: Add appropriate MX and SPF records for your email service"
    ],
    keywords: ["Ghost DNS", "Ghost blog domain", "Ghost CMS custom domain", "Ghost hosting DNS", "Ghost Pro domain"]
  },
  {
    slug: "vercel",
    platform: "Vercel",
    title: "Vercel DNS Setup - Deploy with Custom Domains",
    metaDescription: "Configure DNS for Vercel deployments. Connect custom domains to your Vercel projects with A records and CNAME.",
    intro: "Vercel makes custom domain setup easy with automatic SSL and global CDN. You can either use Vercel's nameservers for full DNS management or point specific records from your registrar.",
    icon: "vercel",
    steps: [
      {
        title: "Add Domain in Vercel Dashboard",
        content: "Go to your project settings, click 'Domains', and add your custom domain. Vercel provides DNS instructions."
      },
      {
        title: "Configure DNS Records",
        content: "Add an A record pointing to 76.76.21.21, or use CNAME to cname.vercel-dns.com for subdomains."
      },
      {
        title: "Add www Configuration",
        content: "For www, add a CNAME pointing to cname.vercel-dns.com or configure redirect in Vercel."
      },
      {
        title: "Verify and Deploy",
        content: "Vercel auto-verifies DNS and provisions SSL. Your site is live once verification completes."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "76.76.21.21", purpose: "Points to Vercel's global network" },
      { type: "CNAME", name: "www", value: "cname.vercel-dns.com", purpose: "www via Vercel DNS" }
    ],
    troubleshooting: [
      "Domain showing 'Invalid configuration': Check for conflicting A or AAAA records",
      "SSL pending: Usually resolves within minutes; check DNS propagation",
      "Preview URLs needed: Use branch-specific URLs provided by Vercel",
      "Multiple domains: Each domain needs separate configuration in project settings"
    ],
    keywords: ["Vercel DNS", "Vercel custom domain", "Vercel deployment domain", "Vercel A record", "Next.js domain"]
  },
  {
    slug: "netlify",
    platform: "Netlify",
    title: "Netlify DNS Configuration - Custom Domains & SSL",
    metaDescription: "Set up custom domains on Netlify. Configure DNS, enable HTTPS, and connect your domain to Netlify deployments.",
    intro: "Netlify offers flexible domain configuration with automatic HTTPS. You can use Netlify DNS for full management or configure external DNS with A records and CNAME.",
    icon: "netlify",
    steps: [
      {
        title: "Add Custom Domain",
        content: "In Site settings > Domain management, click 'Add custom domain'. Enter your domain and follow the verification steps."
      },
      {
        title: "Choose DNS Method",
        content: "Either use Netlify DNS (transfer nameservers) or external DNS (keep current registrar)."
      },
      {
        title: "Configure Records",
        content: "For external DNS: Add an A record to 75.2.60.5 and CNAME for www to your-site.netlify.app"
      },
      {
        title: "Enable HTTPS",
        content: "Netlify provisions Let's Encrypt certificates automatically. Click 'Verify DNS' then enable HTTPS."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "75.2.60.5", purpose: "Netlify load balancer IP" },
      { type: "CNAME", name: "www", value: "[site].netlify.app", purpose: "www subdomain" }
    ],
    troubleshooting: [
      "DNS verification failing: Remove AAAA records if present, Netlify handles IPv6",
      "SSL not provisioning: Ensure no CAA records blocking Let's Encrypt",
      "Branch deploys: Use branch-specific subdomain for preview URLs",
      "404 on subdirectories: Check _redirects file or netlify.toml"
    ],
    keywords: ["Netlify DNS", "Netlify custom domain", "Netlify HTTPS", "Netlify domain setup", "JAMstack domain"]
  },
  {
    slug: "github-pages",
    platform: "GitHub Pages",
    title: "GitHub Pages DNS Setup - Custom Domain Configuration",
    metaDescription: "Connect a custom domain to GitHub Pages. Configure A records, CNAME, and HTTPS for your GitHub-hosted site.",
    intro: "GitHub Pages supports custom domains with HTTPS. Configuration involves adding DNS records at your registrar and a CNAME file in your repository.",
    icon: "github",
    steps: [
      {
        title: "Add CNAME File to Repository",
        content: "Create a file named CNAME in your repo root containing just your domain name (e.g., example.com)."
      },
      {
        title: "Configure A Records",
        content: "Add A records pointing to GitHub's IPs: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153"
      },
      {
        title: "Add www CNAME",
        content: "Create a CNAME record for 'www' pointing to yourusername.github.io"
      },
      {
        title: "Enable HTTPS",
        content: "In repo Settings > Pages, check 'Enforce HTTPS' after DNS verification completes."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "185.199.108.153", purpose: "GitHub Pages IP 1" },
      { type: "A", name: "@", value: "185.199.109.153", purpose: "GitHub Pages IP 2" },
      { type: "A", name: "@", value: "185.199.110.153", purpose: "GitHub Pages IP 3" },
      { type: "A", name: "@", value: "185.199.111.153", purpose: "GitHub Pages IP 4" },
      { type: "CNAME", name: "www", value: "[username].github.io", purpose: "www subdomain" }
    ],
    troubleshooting: [
      "404 error: Ensure CNAME file exists and branch is set correctly in settings",
      "HTTPS not available: Wait up to 24 hours for certificate provisioning",
      "Domain shows old site: Clear browser cache and check CNAME file content",
      "Build failing: Check Actions tab for deployment errors"
    ],
    keywords: ["GitHub Pages DNS", "GitHub Pages custom domain", "GitHub Pages HTTPS", "gh-pages domain", "GitHub hosting DNS"]
  },
  {
    slug: "heroku",
    platform: "Heroku",
    title: "Heroku DNS Setup - Custom Domains for Your App",
    metaDescription: "Configure custom domains on Heroku. Set up DNS records for your Heroku applications with SSL support.",
    intro: "Heroku applications use CNAME or ALIAS records for custom domains. The platform provides automatic SSL certificates for verified custom domains.",
    icon: "heroku",
    steps: [
      {
        title: "Add Domain in Heroku Dashboard",
        content: "Go to your app's Settings tab and click 'Add domain'. Enter your domain name."
      },
      {
        title: "Get DNS Target",
        content: "Heroku provides a DNS target like example.herokuapp.com. Copy this value."
      },
      {
        title: "Configure DNS",
        content: "For subdomains, use CNAME pointing to the DNS target. For root domains, use ALIAS/ANAME if supported, or a CNAME flattening service."
      },
      {
        title: "Enable ACM for SSL",
        content: "Heroku's Automated Certificate Management (ACM) provisions SSL. Enable it in settings."
      }
    ],
    commonRecords: [
      { type: "CNAME", name: "www", value: "[app].herokudns.com", purpose: "Points www to Heroku" },
      { type: "ALIAS", name: "@", value: "[app].herokudns.com", purpose: "Root domain (if supported)" }
    ],
    troubleshooting: [
      "SSL pending: ACM requires DNS to be configured first",
      "Root domain not working: Many registrars don't support ALIAS; consider using www as primary",
      "Domain not verifying: Check CNAME target matches exactly what Heroku provided",
      "H10 App crashed: This is an app error, not DNS; check logs"
    ],
    keywords: ["Heroku DNS", "Heroku custom domain", "Heroku SSL", "Heroku domain setup", "Heroku ACM"]
  },
  {
    slug: "render",
    platform: "Render",
    title: "Render DNS Configuration - Custom Domains",
    metaDescription: "Set up custom domains on Render. Configure DNS records for web services, static sites, and databases.",
    intro: "Render provides automatic SSL and global CDN for custom domains. Configuration is straightforward with clear DNS instructions in the dashboard.",
    icon: "render",
    steps: [
      {
        title: "Add Custom Domain in Render",
        content: "Go to your service's Settings tab and click 'Add Custom Domain'. Enter your domain."
      },
      {
        title: "Configure A Record",
        content: "For root domains, add an A record pointing to Render's IP (provided in dashboard)."
      },
      {
        title: "Add CNAME for www",
        content: "Create a CNAME for www pointing to your service's onrender.com subdomain."
      },
      {
        title: "Verify and Enable SSL",
        content: "Render verifies DNS automatically and provisions a TLS certificate."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "[Render IP]", purpose: "Points to Render service" },
      { type: "CNAME", name: "www", value: "[service].onrender.com", purpose: "www subdomain" }
    ],
    troubleshooting: [
      "Certificate pending: DNS must verify before SSL is issued",
      "502 error: Service may still be deploying; check build logs",
      "Redirect loop: Check force HTTPS settings and CDN configuration",
      "Custom port: Render uses port 10000 internally; configure accordingly"
    ],
    keywords: ["Render DNS", "Render custom domain", "Render hosting DNS", "Render SSL", "Render web service domain"]
  },
  {
    slug: "digitalocean",
    platform: "DigitalOcean",
    title: "DigitalOcean DNS Setup - Domain Configuration Guide",
    metaDescription: "Configure DNS with DigitalOcean. Set up domains for Droplets, App Platform, and managed services.",
    intro: "DigitalOcean provides free DNS hosting with their nameservers. You can manage DNS for any domain, whether hosted on DigitalOcean or elsewhere.",
    icon: "digitalocean",
    steps: [
      {
        title: "Add Domain to DigitalOcean",
        content: "In the Networking section, click 'Add Domain'. Enter your domain name and link it to a project."
      },
      {
        title: "Update Nameservers",
        content: "Point your domain to ns1.digitalocean.com, ns2.digitalocean.com, ns3.digitalocean.com"
      },
      {
        title: "Create DNS Records",
        content: "Add A records pointing to your Droplet's IP, or CNAME for App Platform services."
      },
      {
        title: "Configure Additional Records",
        content: "Set up MX for email, TXT for verification, and any subdomains needed."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "[Droplet IP]", purpose: "Points to your server" },
      { type: "A", name: "www", value: "[Droplet IP]", purpose: "www subdomain" },
      { type: "NS", name: "@", value: "ns1.digitalocean.com", purpose: "Primary nameserver" }
    ],
    troubleshooting: [
      "DNS not propagating: Nameserver changes can take 24-48 hours",
      "SSL with Nginx: Use Certbot for Let's Encrypt certificates",
      "App Platform domain: Use the provided CNAME target from app settings",
      "Spaces CDN: Configure CNAME to your space's CDN endpoint"
    ],
    keywords: ["DigitalOcean DNS", "DigitalOcean domain", "Droplet DNS", "DO nameservers", "DigitalOcean App Platform domain"]
  },
  {
    slug: "aws",
    platform: "AWS",
    title: "AWS Route 53 DNS Setup - Complete Configuration Guide",
    metaDescription: "Configure DNS with AWS Route 53. Set up hosted zones, connect to EC2, CloudFront, S3, and other AWS services.",
    intro: "Amazon Route 53 is a highly available DNS service with advanced routing features. It integrates seamlessly with other AWS services like EC2, CloudFront, and S3.",
    icon: "aws",
    steps: [
      {
        title: "Create Hosted Zone",
        content: "In Route 53 console, create a public hosted zone for your domain. AWS provides nameservers to use."
      },
      {
        title: "Update Registrar Nameservers",
        content: "Copy the NS records from Route 53 and update your domain registrar to use these nameservers."
      },
      {
        title: "Add DNS Records",
        content: "Create record sets: A/AAAA for EC2, ALIAS for CloudFront/ELB, or CNAME for external services."
      },
      {
        title: "Configure Health Checks (Optional)",
        content: "Set up health checks for failover routing or multi-region deployments."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "[EC2 Elastic IP]", purpose: "Points to EC2 instance" },
      { type: "ALIAS", name: "@", value: "[CloudFront distribution]", purpose: "CDN with SSL" },
      { type: "ALIAS", name: "www", value: "[ELB DNS name]", purpose: "Load balancer" }
    ],
    troubleshooting: [
      "Zone not resolving: Nameservers must be updated at registrar",
      "ALIAS vs CNAME: Use ALIAS for AWS resources at zone apex",
      "Health check failing: Verify security groups allow health check IPs",
      "Latency routing: Ensure records exist in all specified regions"
    ],
    keywords: ["AWS Route 53", "AWS DNS", "Route 53 setup", "EC2 domain", "CloudFront DNS", "AWS hosted zone"]
  },
  {
    slug: "google-cloud",
    platform: "Google Cloud",
    title: "Google Cloud DNS Setup - Domain Configuration",
    metaDescription: "Configure DNS with Google Cloud DNS. Connect domains to Compute Engine, Cloud Run, and GCP services.",
    intro: "Google Cloud DNS provides reliable, low-latency DNS serving. It integrates with other GCP services and supports DNSSEC for enhanced security.",
    icon: "google",
    steps: [
      {
        title: "Create DNS Zone",
        content: "In Cloud Console > Network Services > Cloud DNS, create a public zone for your domain."
      },
      {
        title: "Note Nameservers",
        content: "GCP provides nameservers like ns-cloud-a1.googledomains.com. Update these at your registrar."
      },
      {
        title: "Add Record Sets",
        content: "Create A records for Compute Engine IPs, or CNAME for Cloud Run and other services."
      },
      {
        title: "Enable DNSSEC (Optional)",
        content: "For added security, enable DNSSEC and update DS records at your registrar."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "[GCE External IP]", purpose: "Points to VM instance" },
      { type: "CNAME", name: "app", value: "[Cloud Run URL]", purpose: "Serverless endpoint" }
    ],
    troubleshooting: [
      "DNSSEC validation failures: Ensure DS record matches DNSKEY",
      "Cloud Run mapping: Custom domain mapping required in Cloud Run settings",
      "Load balancer: Use reserved external IP for consistent A records",
      "Billing: Cloud DNS charges per zone and per million queries"
    ],
    keywords: ["Google Cloud DNS", "GCP DNS", "Cloud DNS setup", "Compute Engine domain", "Cloud Run DNS"]
  },
  {
    slug: "azure",
    platform: "Azure",
    title: "Azure DNS Configuration - Custom Domain Setup",
    metaDescription: "Set up DNS with Azure DNS. Configure domains for App Service, VMs, and Azure services with custom domains.",
    intro: "Azure DNS provides reliable DNS hosting integrated with the Azure ecosystem. It supports private DNS zones for internal resources and public zones for internet-facing services.",
    icon: "azure",
    steps: [
      {
        title: "Create DNS Zone",
        content: "In Azure Portal, create a DNS zone resource. Enter your domain name and resource group."
      },
      {
        title: "Update Nameservers",
        content: "Azure provides nameservers like ns1-01.azure-dns.com. Update your registrar with these."
      },
      {
        title: "Add Record Sets",
        content: "Create A records for VMs, CNAME for App Services, or TXT for verification."
      },
      {
        title: "Link to Azure Services",
        content: "For App Service custom domains, add CNAME and TXT verification records."
      }
    ],
    commonRecords: [
      { type: "A", name: "@", value: "[VM Public IP]", purpose: "Points to Azure VM" },
      { type: "CNAME", name: "www", value: "[app].azurewebsites.net", purpose: "App Service" },
      { type: "TXT", name: "asuid", value: "[Verification ID]", purpose: "Domain verification" }
    ],
    troubleshooting: [
      "Custom domain not verifying: Add both CNAME and TXT verification records",
      "SSL binding: Configure in App Service TLS/SSL settings after domain verification",
      "Traffic Manager: Use CNAME pointing to Traffic Manager endpoint",
      "Private DNS: Ensure VNet is linked to private zone"
    ],
    keywords: ["Azure DNS", "Azure custom domain", "App Service DNS", "Azure VM domain", "Azure DNS zone"]
  },
  {
    slug: "hubspot",
    platform: "HubSpot",
    title: "HubSpot DNS Setup - Connect Your Domain",
    metaDescription: "Configure DNS for HubSpot CMS, landing pages, and email. Connect custom domains to your HubSpot account.",
    intro: "HubSpot uses custom domains for CMS websites, landing pages, blogs, and email sending. Each domain type may require different DNS configurations.",
    icon: "hubspot",
    steps: [
      {
        title: "Add Domain in HubSpot",
        content: "Go to Settings > Domains & URLs > Connect a domain. Choose the domain type (website, landing pages, email, etc.)."
      },
      {
        title: "Add CNAME Records",
        content: "HubSpot provides specific CNAME values for each subdomain. Add these in your DNS."
      },
      {
        title: "Configure Email Authentication",
        content: "For email sending domains, add DKIM (CNAME) and SPF (TXT) records provided by HubSpot."
      },
      {
        title: "Verify Connection",
        content: "Return to HubSpot and click 'Verify'. SSL is automatically provisioned for web domains."
      }
    ],
    commonRecords: [
      { type: "CNAME", name: "www", value: "[portal-id].group[X].sites.hubspot.net", purpose: "CMS website" },
      { type: "CNAME", name: "hs1._domainkey", value: "[portal-id].dkim1.hubspot.com", purpose: "DKIM email auth" },
      { type: "TXT", name: "@", value: "v=spf1 include:_spf.hubspot.com ~all", purpose: "SPF email auth" }
    ],
    troubleshooting: [
      "CNAME conflict at root: HubSpot requires subdomain; use www as primary",
      "Email not authenticated: Ensure all DKIM CNAME records are added",
      "Domain verification failed: Check for typos in CNAME values",
      "Multiple brand domains: Each requires separate domain connection"
    ],
    keywords: ["HubSpot DNS", "HubSpot domain", "HubSpot CMS domain", "HubSpot email DNS", "HubSpot DKIM"]
  }
];

export function getPlatformBySlug(slug: string): PlatformDns | undefined {
  return platformDnsGuides.find(p => p.slug === slug);
}

export function getAllPlatformSlugs(): string[] {
  return platformDnsGuides.map(p => p.slug);
}
