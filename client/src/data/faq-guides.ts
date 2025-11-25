export interface FaqGuide {
  slug: string;
  category: string;
  title: string;
  metaDescription: string;
  h1: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const faqGuides: FaqGuide[] = [
  {
    slug: "why-dns-not-updating-24-hours",
    category: "DNS Propagation",
    title: "Why Is My DNS Not Updating After 24 Hours? - Troubleshooting Guide",
    metaDescription: "DNS taking longer than 24 hours to update? Learn why DNS propagation delays happen and how to fix them.",
    h1: "Why Is My DNS Not Updating After 24 Hours?",
    faqs: [
      {
        question: "How long does DNS normally take to update?",
        answer: "DNS records typically update within 15 minutes to 4 hours. Most updates complete within 30 minutes to 2 hours. Full global propagation can take up to 48 hours in some cases, but this is rare with modern DNS infrastructure."
      },
      {
        question: "Why is my DNS taking longer than 24 hours?",
        answer: "Long propagation delays are usually caused by: 1) High TTL values (set before changes, still cached), 2) ISP DNS caching (some ISPs cache longer than others), 3) Regional DNS servers (some regions slower), 4) Recent nameserver changes (these take 24-48 hours), 5) DNS provider issues."
      },
      {
        question: "What is TTL and how does it affect propagation?",
        answer: "TTL (Time To Live) controls how long DNS results are cached. High TTL (86400 seconds = 24 hours) means old records stay cached longer. Before making DNS changes, lower your TTL to 300 seconds. Then after changes, DNS updates faster since old values expire quicker."
      },
      {
        question: "How do I check if my DNS has fully propagated?",
        answer: "Use a global DNS propagation checker to see which servers worldwide have your new records. If all show your new record, propagation is complete. If some show old records, propagation is still in progress. Check again in 1-2 hours."
      },
      {
        question: "Can I speed up DNS propagation?",
        answer: "Limited options: 1) Flush your DNS cache (doesn't speed global propagation), 2) Lower TTL before making changes (helps future updates), 3) Use multiple DNS servers to verify propagation. You can't control ISP caching - they propagate on their own timeline."
      },
      {
        question: "Should I wait 48 hours before concluding DNS failed?",
        answer: "No. After 24 hours, if most servers show your new DNS record, propagation is complete for practical purposes. If after 24 hours your domain still doesn't work, the issue is likely not propagation - check if your DNS records are actually correct in your provider's dashboard."
      },
      {
        question: "What if nameservers were changed? How long then?",
        answer: "Nameserver changes take 24-48 hours because they must propagate through the DNS root servers, TLD servers, and millions of resolvers worldwide. This is longer than DNS record changes (15 min-4 hours) because it's a fundamental DNS system change."
      },
      {
        question: "Does my registrar vs DNS provider affect propagation speed?",
        answer: "Yes, to some degree. Enterprise DNS providers (Cloudflare, Route53, NS1) propagate faster globally than budget providers. However, most changes still take 15 min to 4 hours. Registrar changes take 24-48 hours regardless of quality."
      }
    ]
  },
  {
    slug: "how-to-check-dns-propagation",
    category: "DNS Tools",
    title: "How to Check DNS Propagation - Complete Guide",
    metaDescription: "Learn how to check if your DNS records have propagated globally. Use tools and commands to verify DNS propagation.",
    h1: "How to Check DNS Propagation - Complete Guide",
    faqs: [
      {
        question: "What is the easiest way to check DNS propagation?",
        answer: "Use a web-based DNS propagation checker tool (like ReviewMyDNS). Enter your domain, select record type (A, MX, CNAME, etc.), and it checks 50+ global servers instantly. Shows which servers have updated and which haven't."
      },
      {
        question: "Can I check DNS propagation from command line?",
        answer: "Yes. Use nslookup (Windows) or dig (Mac/Linux). Example: 'nslookup example.com' or 'dig example.com'. You can also specify DNS server: 'nslookup example.com 8.8.8.8' (Google DNS). Each command queries one server, so you'll need multiple queries for global view."
      },
      {
        question: "Which public DNS servers should I test against?",
        answer: "Key public servers: Google DNS (8.8.8.8), Cloudflare DNS (1.1.1.1), Quad9 (9.9.9.9), OpenDNS (208.67.222.222). Test against several to see if propagation is global. Some users may still use their ISP DNS which might cache longer."
      },
      {
        question: "What does it mean when different servers show different results?",
        answer: "This is normal during propagation. Different DNS servers cache at different times and for different durations. When you see different results from different servers, propagation is in progress. When all servers show the same (your new record), propagation is complete."
      },
      {
        question: "How often should I check propagation?",
        answer: "Check immediately after making changes (baseline). Then check every 15-30 minutes for the first 2-3 hours. After 4 hours, if most servers updated, propagation is likely complete. Use a tool that checks all servers at once instead of manual checking."
      },
      {
        question: "What if my local machine shows old DNS but checker shows new DNS?",
        answer: "Your local DNS cache hasn't cleared. Flush your DNS cache: Windows (ipconfig /flushdns), Mac (sudo dscacheutil -flushcache), Linux (sudo systemd-resolve --flush-caches). After flushing, your machine will query fresh and see the new record."
      },
      {
        question: "Can I check DNS propagation on mobile?",
        answer: "Yes, use mobile DNS checker apps or web-based tools on your phone. Mobile phones use different DNS (often carrier DNS), so they may update at different times than your computer. Testing from multiple devices is helpful."
      },
      {
        question: "What does 'DNS resolving' mean vs 'DNS propagated'?",
        answer: "DNS resolving = your domain returns an IP/result (working). DNS propagated = that result is consistent everywhere globally. You might have DNS resolving to old IP for some users and new IP for others - this is incomplete propagation."
      }
    ]
  },
  {
    slug: "difference-between-a-record-cname-mx-txt",
    category: "DNS Records",
    title: "A Record vs CNAME vs MX vs TXT - DNS Record Types Explained",
    metaDescription: "Learn the differences between DNS record types: A, CNAME, MX, TXT. When to use each type.",
    h1: "DNS Record Types Explained: A vs CNAME vs MX vs TXT",
    faqs: [
      {
        question: "What is an A record?",
        answer: "A record maps a domain name to an IPv4 address (like 192.0.2.1). When someone visits your domain, the A record tells the browser which server IP to connect to. Every domain needs at least one A record to be accessible."
      },
      {
        question: "What is a CNAME record?",
        answer: "CNAME (Canonical Name) creates an alias - it points a domain/subdomain to another domain. Example: www.example.com CNAME to example.com. The browser then looks up example.com's A record. You cannot have CNAME on root domain (@), only subdomains."
      },
      {
        question: "What is an MX record?",
        answer: "MX record routes email to your mail server. Example: MX record @ points to mail.example.com (which has its own A record). You can have multiple MX records with priority values (lower number = higher priority). Without MX records, email to your domain fails."
      },
      {
        question: "What is a TXT record?",
        answer: "TXT record stores text data. Used for: 1) Email authentication (SPF, DKIM, DMARC), 2) Domain verification (Google, Microsoft, etc.), 3) General text information. No character limits (can be very long). Flexible format."
      },
      {
        question: "When do I use A record vs CNAME?",
        answer: "Use A record for: root domain (@) and any domain mapping to IP. Use CNAME for: subdomain aliases (www, blog, api, etc.). A record = IP address, CNAME = domain pointer. Most domains have A record @ and CNAME records for subdomains."
      },
      {
        question: "Can I have both A record and CNAME for same domain?",
        answer: "No. Every domain has one primary record type. If you have A record @ (root), you cannot have CNAME @. For subdomains, you choose either A record (point to IP) or CNAME (point to another domain), not both."
      },
      {
        question: "What if I need multiple A records for same domain?",
        answer: "Yes, you can have multiple A records for load balancing or failover. Each A record can point to different IP addresses. When resolving, some systems use all IPs (round-robin), others use first available (failover)."
      },
      {
        question: "How do DNS record types affect website speed?",
        answer: "A record (direct) = fastest. CNAME (alias) = slightly slower (extra lookup). TXT/MX = don't affect website speed (background records). For performance-critical domains, prefer A records over CNAME chains."
      }
    ]
  },
  {
    slug: "domain-nameservers-vs-dns-records",
    category: "DNS Fundamentals",
    title: "Nameservers vs DNS Records - Complete Explanation",
    metaDescription: "Understand the difference between domain nameservers and DNS records. Learn how they work together.",
    h1: "Nameservers vs DNS Records - What's the Difference?",
    faqs: [
      {
        question: "What are nameservers?",
        answer: "Nameservers are DNS servers that store all your domain's DNS records. Your domain registrar points to your nameservers. When someone looks up your domain, their device queries your nameservers to get your DNS records. Think of nameservers as the database server."
      },
      {
        question: "What are DNS records?",
        answer: "DNS records are individual entries stored on nameservers. A record, CNAME, MX, TXT, etc. Each record answers a specific question (where's this domain's IP? which server gets email? what's this verification code?). Records live ON the nameservers."
      },
      {
        question: "What does 'point nameservers' mean?",
        answer: "Your domain registrar (GoDaddy, Namecheap, etc.) has a setting where you specify which nameservers manage your domain. You tell registrar 'use Cloudflare's nameservers' or 'use your own nameservers'. Registrar then directs all DNS queries to those nameservers."
      },
      {
        question: "Can I use different nameservers than my registrar?",
        answer: "Yes, absolutely. You can register domain at GoDaddy but use Cloudflare's nameservers. At registrar, change nameservers to Cloudflare's nameservers. Then manage all DNS records in Cloudflare. Your registrar only holds domain ownership."
      },
      {
        question: "How long does nameserver change take vs DNS record change?",
        answer: "Nameserver changes: 24-48 hours (system-wide propagation required). DNS record changes: 15 minutes to 4 hours. Nameserver changes are slower because they affect the DNS system globally, not just cache updates."
      },
      {
        question: "What if my nameservers are broken?",
        answer: "If nameservers down or misconfigured, your entire domain fails (all DNS records unreachable). This is a critical issue. Fix by: 1) Verify nameservers at registrar still point correctly, 2) Check DNS provider nameservers still working, 3) Try different nameservers if provider has issues."
      },
      {
        question: "Do I need nameservers from my hosting provider?",
        answer: "Not necessarily. Your hosting provider can provide nameservers (convenience). But you can also use separate DNS provider (Cloudflare, Route53, etc.). Many people use hosting for web hosting and separate DNS provider for DNS - gives more flexibility."
      },
      {
        question: "Can I transfer nameservers without transferring domain?",
        answer: "Yes. Registrar and nameservers are separate. Your domain stays at current registrar (GoDaddy), but you point it to different nameservers (Cloudflare, Route53, etc.). This is common and doesn't affect domain ownership."
      }
    ]
  },
  {
    slug: "what-is-dns-caching",
    category: "DNS Concepts",
    title: "What Is DNS Caching? How TTL Affects Your Website",
    metaDescription: "Learn about DNS caching and TTL (Time To Live). Understand how DNS caching affects your website.",
    h1: "What Is DNS Caching and How Does TTL Work?",
    faqs: [
      {
        question: "What is DNS caching?",
        answer: "DNS caching stores DNS lookup results so future requests don't need to query the DNS server again. When you visit a website, your computer caches the IP address. Next time you visit, it uses cached result (faster). Caching happens at multiple levels: browser, OS, ISP, resolvers."
      },
      {
        question: "What is TTL?",
        answer: "TTL (Time To Live) is a value you set in DNS records that tells systems how long to cache your record. Example: TTL 3600 = cache for 3600 seconds (1 hour). After TTL expires, system queries DNS again for fresh record. Higher TTL = longer caching."
      },
      {
        question: "Why should I lower TTL before DNS changes?",
        answer: "If TTL is 86400 (24 hours), your old record cached for full 24 hours after you change it. Users see old record until cache expires. Lower TTL to 300 (5 minutes) BEFORE making changes. Then after changes, old record expires in 5 minutes, users see new record quickly."
      },
      {
        question: "What's the best TTL value to use?",
        answer: "Common values: 300-600 (fast updates, more DNS queries), 3600 (1 hour, moderate), 86400 (24 hours, less queries). For stable records not changing often: 3600-86400. For records changing frequently: 300-600. Balance between propagation speed and server load."
      },
      {
        question: "How do I flush DNS cache on my computer?",
        answer: "Windows: ipconfig /flushdns. Mac: sudo dscacheutil -flushcache. Linux: sudo systemd-resolve --flush-caches. After flushing, your computer queries fresh DNS records instead of using cache. Useful for testing DNS changes locally."
      },
      {
        question: "Does lowering TTL affect DNS performance?",
        answer: "Yes, lower TTL increases DNS queries (less caching). This slightly increases latency and DNS server load. But modern DNS is so fast, most users won't notice. The tradeoff: faster updates (low TTL) vs less queries (high TTL)."
      },
      {
        question: "What happens if I set TTL to 0?",
        answer: "TTL 0 means never cache - query DNS for every request. This guarantees you always get fresh data but significantly increases DNS queries. Some systems don't allow TTL 0. Minimum practical: 60-300 seconds."
      },
      {
        question: "Why are some users seeing old DNS after I changed it?",
        answer: "Different levels of caching: 1) Your computer cache (flush locally), 2) ISP DNS cache (they control), 3) Resolver cache (third-party), 4) Browser cache. Some caches might hold old record longer than TTL. Full propagation takes longer than just TTL expiration."
      }
    ]
  },
  {
    slug: "how-to-find-your-nameservers",
    category: "DNS Setup",
    title: "How to Find Your Nameservers - Step-by-Step Guide",
    metaDescription: "Learn how to find your domain nameservers. Check what nameservers your domain is using.",
    h1: "How to Find Your Domain Nameservers",
    faqs: [
      {
        question: "Where can I find my current nameservers?",
        answer: "Log into your domain registrar account (GoDaddy, Namecheap, etc.) and go to domain settings. Look for 'Nameservers' or 'DNS Settings'. Your current nameservers are listed there (usually 3-4 nameserver addresses)."
      },
      {
        question: "How do I check nameservers using online tools?",
        answer: "Search 'WHOIS lookup' or 'nameserver checker' online. Enter your domain. These tools query the WHOIS database and show which nameservers your domain is registered to use. Results should match what you see in your registrar account."
      },
      {
        question: "Can I check nameservers from command line?",
        answer: "Yes. Use 'nslookup -type=NS example.com' (Windows/Mac) or 'dig NS example.com' (Mac/Linux). This queries your configured nameservers and shows NS records. Results show which nameservers are authoritative for your domain."
      },
      {
        question: "What if my current nameservers are wrong?",
        answer: "Change them in your registrar account. Go to domain settings > nameservers > edit. Update to correct nameservers (your DNS provider's nameservers). Save changes. Wait 24-48 hours for propagation. Your domain will then use correct DNS provider."
      },
      {
        question: "How do I know what nameservers to use?",
        answer: "Depends on your DNS provider: Cloudflare gives you 2 nameservers, Route53 gives 4, etc. Your DNS provider's documentation shows their nameserver addresses. Copy those exact addresses into your registrar's nameserver field."
      },
      {
        question: "Can I use nameservers from different providers?",
        answer: "Technically yes but not recommended. You could use 2 nameservers from Cloudflare and 2 from Route53, but this complicates management and creates reliability issues. Better to use all nameservers from one provider."
      },
      {
        question: "What happens if I set wrong nameservers?",
        answer: "Your domain fails completely. All DNS lookups go to wrong servers which don't have your records. Domain becomes unreachable. Error message: SERVFAIL or NXDOMAIN. Fix by correcting nameservers to right provider."
      },
      {
        question: "How often do I need to check my nameservers?",
        answer: "Rarely. Nameservers set once during domain setup. Only check if domain stops working. Nameservers shouldn't need changes unless you switch DNS providers or hosting. Check annually as sanity check during security review."
      }
    ]
  }
];

export function getFaqGuide(slug: string): FaqGuide | undefined {
  return faqGuides.find(guide => guide.slug === slug);
}

export function getAllFaqGuideSlugs(): string[] {
  return faqGuides.map(guide => guide.slug);
}
