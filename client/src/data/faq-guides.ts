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
  },
  {
    slug: "nxdomain-error-fix",
    category: "DNS Errors",
    title: "NXDOMAIN Error - What It Means and How to Fix It",
    metaDescription: "Getting NXDOMAIN errors? Learn what NXDOMAIN means, common causes, and step-by-step fixes to resolve domain not found errors.",
    h1: "NXDOMAIN Error - What It Means and How to Fix It",
    faqs: [
      {
        question: "What does NXDOMAIN mean?",
        answer: "NXDOMAIN stands for 'Non-Existent Domain'. It means the DNS server couldn't find any records for the domain you requested. The domain either doesn't exist in DNS, has no records configured, or isn't reachable through the DNS hierarchy."
      },
      {
        question: "What causes NXDOMAIN errors?",
        answer: "Common causes: 1) Domain not registered (expired or never purchased), 2) DNS records not configured at registrar or DNS provider, 3) Nameservers incorrectly set or not responding, 4) Typo in domain name, 5) Domain suspended by registrar, 6) Recent DNS changes not propagated yet."
      },
      {
        question: "How do I fix NXDOMAIN for my domain?",
        answer: "Check: 1) Domain registration is active (WHOIS lookup), 2) Nameservers are correctly set at registrar, 3) DNS records exist at your DNS provider, 4) No typos in domain, 5) Wait 24-48 hours if you recently changed nameservers. Fix the first issue you find."
      },
      {
        question: "Is NXDOMAIN the same as domain expired?",
        answer: "Not always, but expired domains commonly show NXDOMAIN. When a domain expires, the registrar may remove DNS delegation, causing NXDOMAIN. Check WHOIS to see domain expiry date. Renew the domain if expired, then wait for DNS propagation."
      },
      {
        question: "Why does NXDOMAIN appear for only some users?",
        answer: "Different DNS servers cache at different times. If you recently fixed NXDOMAIN, some users still see error (cached result). If you recently caused NXDOMAIN (changed nameservers incorrectly), some users still work (cached old result). Wait for full propagation."
      },
      {
        question: "Can firewall or ISP cause NXDOMAIN?",
        answer: "Yes. Some ISPs and corporate firewalls return NXDOMAIN for blocked domains (censorship/security). Test with multiple DNS servers (8.8.8.8, 1.1.1.1). If different servers give different results, network filtering may be involved."
      },
      {
        question: "How do I check if domain exists in DNS?",
        answer: "Use DNS lookup tools: 1) Online: ReviewMyDNS global checker, 2) Command line: nslookup domain.com or dig domain.com. If all servers return NXDOMAIN, domain has no DNS records. If some servers find it, check those servers' configuration."
      },
      {
        question: "NXDOMAIN after changing nameservers - what went wrong?",
        answer: "After nameserver changes, DNS might return NXDOMAIN during propagation (24-48 hours). Or new nameservers don't have your records configured. Verify: 1) New nameserver addresses are correct, 2) DNS records exist at new DNS provider, 3) Wait for propagation to complete."
      }
    ]
  },
  {
    slug: "servfail-error-fix",
    category: "DNS Errors",
    title: "SERVFAIL Error - Causes and Solutions for DNS Server Failure",
    metaDescription: "SERVFAIL DNS error? Learn what causes DNS server failures and how to troubleshoot and fix SERVFAIL errors.",
    h1: "SERVFAIL Error - Causes and Solutions",
    faqs: [
      {
        question: "What does SERVFAIL mean?",
        answer: "SERVFAIL (Server Failure) indicates the DNS server encountered an error while processing your query. Unlike NXDOMAIN (domain doesn't exist), SERVFAIL means something went wrong on the server side - the domain might exist but couldn't be resolved."
      },
      {
        question: "What causes SERVFAIL errors?",
        answer: "Common causes: 1) Authoritative nameservers down or unreachable, 2) DNSSEC validation failures, 3) Misconfigured DNS zones, 4) Network connectivity issues between resolvers and authoritative servers, 5) Nameserver timeout (overloaded or slow), 6) Circular CNAME references."
      },
      {
        question: "How do I fix SERVFAIL for my domain?",
        answer: "Troubleshoot: 1) Check if your nameservers are online (ping/traceroute), 2) Verify DNSSEC is correctly configured (or disable if broken), 3) Check for DNS zone syntax errors, 4) Test with different resolvers to isolate issue, 5) Contact DNS provider if their servers are down."
      },
      {
        question: "Is SERVFAIL a temporary or permanent error?",
        answer: "Can be either. Temporary: server overload, network glitch, brief outage. Permanent: misconfigured DNSSEC, broken zone file, nameservers completely down. Test over time - if SERVFAIL persists for hours, it's likely a configuration issue requiring fix."
      },
      {
        question: "Why does SERVFAIL only happen on some DNS servers?",
        answer: "Different resolvers have different behaviors: 1) Some enforce DNSSEC strictly (fail if broken), others don't, 2) Network routing varies (some resolvers reach your nameservers, others can't), 3) Caching differences (some cached good result before issue started)."
      },
      {
        question: "Can DNSSEC cause SERVFAIL?",
        answer: "Yes, very commonly. If DNSSEC is enabled but incorrectly configured (wrong signatures, expired keys, missing records), DNSSEC-validating resolvers return SERVFAIL instead of returning potentially forged data. Fix DNSSEC or disable it if not needed."
      },
      {
        question: "How do I check if my nameservers are responding?",
        answer: "Test: 1) Ping nameserver addresses, 2) Use dig/nslookup directly against nameservers: 'dig @ns1.example.com example.com', 3) Check DNS provider status page, 4) Use online DNS debugger tools. If nameservers don't respond, contact DNS provider."
      },
      {
        question: "SERVFAIL after DNS changes - what happened?",
        answer: "Recent DNS changes may have introduced errors: 1) Typos in zone file, 2) Invalid record format, 3) DNSSEC signature didn't update, 4) New nameservers not correctly configured. Review recent changes, test zone file validity, check DNSSEC status."
      }
    ]
  },
  {
    slug: "spf-too-many-lookups-fix",
    category: "Email DNS Errors",
    title: "SPF Too Many DNS Lookups - How to Fix SPF PermError",
    metaDescription: "SPF record exceeds 10 DNS lookup limit? Learn how to fix SPF PermError by optimizing your SPF record.",
    h1: "SPF Too Many DNS Lookups - How to Fix It",
    faqs: [
      {
        question: "What does 'SPF too many DNS lookups' mean?",
        answer: "SPF (Sender Policy Framework) records are limited to 10 DNS lookups maximum. Each 'include:', 'a:', 'mx:', and 'redirect=' counts as a lookup. If your SPF exceeds 10 lookups, email servers return 'PermError' and may reject your emails or mark them as spam."
      },
      {
        question: "How do I count my SPF lookups?",
        answer: "Each mechanism that requires DNS: include: (1 lookup + nested includes), a: (1 lookup), mx: (1 lookup + 1 per MX record resolved), redirect= (1 lookup + target's lookups). Use online SPF checkers to count automatically. IP addresses (ip4:, ip6:) don't count."
      },
      {
        question: "How do I fix SPF exceeding 10 lookups?",
        answer: "Options: 1) Replace 'include:' with IP addresses (ip4:) where possible, 2) Remove unused services from SPF, 3) Use SPF flattening services that resolve includes to IPs, 4) Split into multiple domains with separate SPF, 5) Remove redundant includes."
      },
      {
        question: "What is SPF flattening?",
        answer: "SPF flattening replaces 'include:' mechanisms with the IP addresses they resolve to. Instead of 'include:_spf.google.com' (multiple lookups), you list Google's actual IPs. This reduces lookups but requires maintenance when provider IPs change. Use automated flattening services."
      },
      {
        question: "Can I split SPF across multiple TXT records?",
        answer: "No. You can only have ONE SPF record per domain. Multiple SPF records cause errors. However, you can use subdomains - send marketing email from marketing.example.com with its own SPF. Or use SPF macro expansion for advanced splitting."
      },
      {
        question: "What services commonly cause SPF bloat?",
        answer: "Each service you send email through adds lookups: Google Workspace (include:_spf.google.com), Microsoft 365 (include:spf.protection.outlook.com), Mailchimp, SendGrid, HubSpot, Salesforce, Zendesk, etc. 4-5 services can exceed limit. Audit which services actually send email."
      },
      {
        question: "What happens if I exceed 10 lookups?",
        answer: "Email servers receiving your email see 'PermError' (permanent error) in SPF check. This fails SPF authentication. Depending on DMARC policy and receiver settings, email may be rejected, quarantined (spam), or accepted but flagged. Email deliverability suffers significantly."
      },
      {
        question: "Do nested includes count toward the limit?",
        answer: "Yes! If you include:_spf.google.com, and Google's SPF has 3 more includes, that's 4 lookups from one include. This is why limits are exceeded quickly. Check the full resolution chain, not just your top-level SPF record."
      }
    ]
  },
  {
    slug: "dmarc-fail-fix",
    category: "Email DNS Errors",
    title: "DMARC Fail - Why Emails Fail DMARC and How to Fix It",
    metaDescription: "Emails failing DMARC authentication? Learn why DMARC fails happen and how to fix alignment issues.",
    h1: "DMARC Fail - Why Emails Fail and How to Fix It",
    faqs: [
      {
        question: "What does DMARC fail mean?",
        answer: "DMARC (Domain-based Message Authentication, Reporting & Conformance) fail means your email didn't pass authentication checks. For DMARC to pass, email must pass EITHER SPF or DKIM, AND the domain must align. Failure means neither aligned authentication passed."
      },
      {
        question: "Why does DMARC require alignment?",
        answer: "Alignment means the domain in SPF/DKIM must match the 'From:' header domain. Without alignment, attackers could pass SPF for their domain but spoof your From: address. DMARC enforces that authenticated domain matches visible sender domain."
      },
      {
        question: "What causes DMARC to fail?",
        answer: "Common causes: 1) SPF record missing or incorrect, 2) DKIM not configured or broken, 3) Sending from unauthorized servers, 4) Email forwarding breaks authentication, 5) Third-party services not properly configured, 6) Subdomain vs root domain mismatch."
      },
      {
        question: "How do I fix DMARC failures?",
        answer: "Fix path: 1) Check DMARC reports for failure sources, 2) Ensure SPF includes all legitimate sending sources, 3) Configure DKIM for all sending services, 4) Verify alignment (same domain in From: and authenticated domain), 5) Set DMARC policy to 'none' while debugging."
      },
      {
        question: "What is DMARC alignment mode (strict vs relaxed)?",
        answer: "Relaxed (default): subdomain.example.com can align with example.com. Strict: exact domain match required. If using subdomains, relaxed alignment helps. Set with 'aspf=r' (relaxed SPF) and 'adkim=r' (relaxed DKIM) in DMARC record."
      },
      {
        question: "Why do forwarded emails fail DMARC?",
        answer: "Email forwarding breaks SPF (forwarder's IP not in your SPF) and may break DKIM (if forwarder modifies message). This is a known DMARC limitation. Solutions: ARC (Authenticated Received Chain) helps, or recipients whitelist forwarded sources."
      },
      {
        question: "How do I read DMARC reports?",
        answer: "DMARC aggregate reports (XML) show: sending IPs, pass/fail for SPF/DKIM/DMARC, alignment status. Look for: 1) Failed sources you don't recognize (potential spoofing), 2) Failed sources you do recognize (fix their authentication), 3) Volume patterns. Use DMARC report analyzers for easier reading."
      },
      {
        question: "What DMARC policy should I use?",
        answer: "Start with p=none (monitor only, no action on failures). Analyze reports, fix legitimate failures. Move to p=quarantine (spam folder) when confident. Finally p=reject (block failures) for full protection. Don't jump to reject without monitoring first - you'll block legitimate email."
      }
    ]
  },
  {
    slug: "dnssec-validation-failed-fix",
    category: "DNS Errors",
    title: "DNSSEC Validation Failed - How to Fix DNSSEC Errors",
    metaDescription: "DNSSEC validation failing? Learn how to troubleshoot and fix DNSSEC configuration errors.",
    h1: "DNSSEC Validation Failed - How to Fix It",
    faqs: [
      {
        question: "What is DNSSEC validation failure?",
        answer: "DNSSEC adds cryptographic signatures to DNS records. Validation failure means the signature couldn't be verified - either signatures are wrong, expired, missing, or the chain of trust is broken. DNSSEC-validating resolvers will return SERVFAIL instead of potentially spoofed data."
      },
      {
        question: "What causes DNSSEC to fail?",
        answer: "Common causes: 1) DS record at registrar doesn't match DNSKEY at nameserver, 2) RRSIG signatures expired, 3) Zone not properly signed, 4) Key rollover done incorrectly, 5) Nameserver change without updating DS records, 6) Clock skew on signing servers."
      },
      {
        question: "How do I check if DNSSEC is the problem?",
        answer: "Compare results from DNSSEC-validating resolver (8.8.8.8) vs non-validating resolver. If Google DNS returns SERVFAIL but other resolvers work, DNSSEC is likely broken. Use online DNSSEC debuggers (like DNSViz) to see the full validation chain and find breaks."
      },
      {
        question: "How do I fix DNSSEC validation errors?",
        answer: "Fix depends on cause: 1) Update DS record at registrar to match current DNSKEY, 2) Re-sign zone if signatures expired, 3) If using managed DNSSEC, contact DNS provider, 4) As last resort, disable DNSSEC (remove DS record, wait 24-48 hours for propagation)."
      },
      {
        question: "Can I just disable DNSSEC?",
        answer: "Yes, but carefully. Remove DS record from registrar first, wait for TTL to expire (24-48 hours), then disable DNSSEC at DNS provider. If you remove in wrong order, you'll have broken DNSSEC during transition. Disabling is safe if you don't need DNSSEC security."
      },
      {
        question: "Why did DNSSEC break after changing nameservers?",
        answer: "Old DS record at registrar points to old nameserver's DNSKEY. New nameservers have different DNSKEYs. Mismatch = validation failure. Solution: Get new DS record from new DNS provider, update at registrar, wait for propagation. Or disable DNSSEC before migration."
      },
      {
        question: "What is a DS record vs DNSKEY?",
        answer: "DNSKEY: Public key stored at your nameserver (in your DNS zone). DS record: Hash of DNSKEY stored at parent zone (at your registrar). DS record at registrar must match DNSKEY at nameserver. If they don't match, DNSSEC validation fails."
      },
      {
        question: "How often do DNSSEC signatures expire?",
        answer: "Typically 1-4 weeks. Zone must be re-signed before signatures expire. Managed DNS providers do this automatically. If self-managing DNSSEC, you need automated re-signing. Expired signatures = DNSSEC failure for entire zone."
      }
    ]
  },
  {
    slug: "mx-record-not-found-fix",
    category: "Email DNS Errors",
    title: "MX Record Not Found - How to Fix Email Delivery Failures",
    metaDescription: "No MX record found for your domain? Learn why emails aren't being delivered and how to fix missing MX records.",
    h1: "MX Record Not Found - How to Fix It",
    faqs: [
      {
        question: "What does 'MX record not found' mean?",
        answer: "MX (Mail Exchanger) records tell email servers where to deliver mail for your domain. If no MX record exists, sending servers don't know where to deliver email, causing delivery failures with errors like 'no mail exchanger' or 'MX lookup failed'."
      },
      {
        question: "Why is my MX record missing?",
        answer: "Common reasons: 1) MX record never created, 2) Accidentally deleted when editing DNS, 3) DNS provider changed and records not migrated, 4) Domain just registered (default records may not include MX), 5) Using wrong nameservers that don't have your records."
      },
      {
        question: "How do I add an MX record?",
        answer: "In your DNS provider: 1) Add record type 'MX', 2) Host/Name: @ (for root domain), 3) Value: your mail server hostname (e.g., mail.example.com or aspmx.l.google.com), 4) Priority: 10 (lower = higher priority), 5) TTL: 3600. Save and wait for propagation."
      },
      {
        question: "What MX records do I need for Google Workspace?",
        answer: "Google Workspace requires 5 MX records: ASPMX.L.GOOGLE.COM (priority 1), ALT1.ASPMX.L.GOOGLE.COM (priority 5), ALT2.ASPMX.L.GOOGLE.COM (priority 5), ALT3.ASPMX.L.GOOGLE.COM (priority 10), ALT4.ASPMX.L.GOOGLE.COM (priority 10). All point to @ (root domain)."
      },
      {
        question: "What MX records do I need for Microsoft 365?",
        answer: "Microsoft 365 typically uses one MX record: Host: @, Value: [your-domain].mail.protection.outlook.com, Priority: 0. Replace [your-domain] with your actual domain formatted per Microsoft's instructions (usually domain-com for example.com)."
      },
      {
        question: "Can I have email without MX records?",
        answer: "Technically, if no MX exists, senders should fall back to A record. But most modern servers don't do this - they require MX records. Without MX, email delivery is unreliable at best, completely broken at worst. Always configure MX records for email."
      },
      {
        question: "Why does MX lookup show nothing after I added records?",
        answer: "DNS propagation takes 15 minutes to 24 hours. Also check: 1) Record saved correctly (typos?), 2) Correct domain (@ not subdomain), 3) Using correct nameservers, 4) DNS provider shows record in dashboard. If record shows in dashboard but not in lookup, wait for propagation."
      },
      {
        question: "What priority should I set for MX records?",
        answer: "Lower number = higher priority. Primary mail server: 10. Backup: 20, 30, etc. If you have one mail server, priority 10 is fine. Multiple MX records with same priority distribute load. Different priorities create failover (lower priority first, higher if unavailable)."
      }
    ]
  },
  {
    slug: "cname-root-domain-error-fix",
    category: "DNS Errors",
    title: "Cannot Add CNAME to Root Domain - How to Fix This Error",
    metaDescription: "Getting error when adding CNAME to root domain? Learn why CNAME doesn't work on root domains and alternative solutions.",
    h1: "Cannot Add CNAME to Root Domain - How to Fix It",
    faqs: [
      {
        question: "Why can't I add CNAME to my root domain?",
        answer: "DNS protocol (RFC 1034) prohibits CNAME records on root/apex domains (example.com without www). CNAME says 'this name is an alias for another name' - but root domains must have SOA and NS records, which can't coexist with CNAME. This is a fundamental DNS limitation."
      },
      {
        question: "What is the difference between root domain and subdomain?",
        answer: "Root domain (apex): example.com - no prefix. Subdomain: www.example.com, blog.example.com - has prefix. CNAME works on subdomains, not root domain. In DNS settings, root domain is usually represented as '@'."
      },
      {
        question: "How do I point my root domain to another hostname?",
        answer: "Options: 1) Use A record with IP address instead (ask host for IP), 2) Use ALIAS/ANAME record (if your DNS provider supports it), 3) Use Cloudflare's CNAME flattening, 4) Set up redirect from root to www (then CNAME www)."
      },
      {
        question: "What is ALIAS or ANAME record?",
        answer: "ALIAS/ANAME is a non-standard DNS record type that acts like CNAME but works on root domains. Your DNS provider resolves the alias and returns IP addresses. Supported by: Cloudflare (CNAME flattening), Route53 (Alias), DNSimple (ALIAS), NS1 (ALIAS)."
      },
      {
        question: "How do I set up CNAME flattening on Cloudflare?",
        answer: "On Cloudflare, add a CNAME record for root domain (@) normally. Cloudflare automatically 'flattens' it - resolves the target hostname and returns the IP addresses instead of CNAME. To external resolvers, it looks like an A record. Works transparently."
      },
      {
        question: "Should I redirect root domain to www or vice versa?",
        answer: "Either works, but choose one and be consistent: 1) www.example.com as primary: CNAME www to your host, redirect @ to www. 2) example.com as primary: A record @ to IP, CNAME www to @. Most modern sites prefer non-www (cleaner URL), but www allows CNAME flexibility."
      },
      {
        question: "My hosting provider only gave me a hostname, not IP. Now what?",
        answer: "Options: 1) Ask host for IP address (they may have one), 2) Use DNS provider with ALIAS/ANAME support, 3) Switch to Cloudflare for CNAME flattening, 4) Set up www as primary domain with CNAME, redirect root to www using registrar/host's redirect feature."
      },
      {
        question: "Can I use multiple A records instead of CNAME?",
        answer: "Yes. If your hosting provider uses multiple IPs (load balancing), add multiple A records for root domain, each pointing to different IP. This is commonly done for CDN setups. However, if IPs change, you must update all A records (CNAME would update automatically)."
      }
    ]
  },
  {
    slug: "timeout-dns-query-fix",
    category: "DNS Errors",
    title: "DNS Query Timeout - Why DNS Is Slow and How to Fix It",
    metaDescription: "DNS queries timing out? Learn what causes slow DNS resolution and how to fix DNS timeout issues.",
    h1: "DNS Query Timeout - Causes and Solutions",
    faqs: [
      {
        question: "What does DNS query timeout mean?",
        answer: "DNS timeout means the resolver waited for a response but never received one within the allowed time (typically 2-5 seconds). The DNS server may be unreachable, overloaded, or the network path has problems. Timeouts prevent your browser from connecting to websites."
      },
      {
        question: "What causes DNS timeouts?",
        answer: "Common causes: 1) Nameservers are down or unreachable, 2) Network issues between you and DNS server, 3) DNS server overloaded (slow response), 4) Firewall blocking DNS traffic (UDP port 53), 5) ISP DNS issues, 6) Your nameservers poorly configured."
      },
      {
        question: "How do I fix DNS timeouts on my computer?",
        answer: "Try: 1) Switch to public DNS (8.8.8.8 or 1.1.1.1), 2) Flush DNS cache, 3) Restart router, 4) Check if other sites work (isolate the problem), 5) Disable VPN temporarily, 6) Check firewall isn't blocking DNS. If only your domain times out, problem is your nameservers."
      },
      {
        question: "How do I fix DNS timeouts for my domain?",
        answer: "If your domain times out for everyone: 1) Check if nameservers are online (ping them), 2) Verify nameserver addresses at registrar are correct, 3) Contact DNS provider about outages, 4) Check if your DNS zone has errors, 5) Consider switching to more reliable DNS provider."
      },
      {
        question: "Why do only some DNS servers timeout for my domain?",
        answer: "Different servers may have different network paths to your nameservers. Some routes may be blocked, congested, or have high latency. Also, some DNS providers have better global coverage than others. Test from multiple locations to identify pattern."
      },
      {
        question: "Can high TTL cause timeouts?",
        answer: "Not directly. TTL affects caching duration, not query speed. However, if your nameservers are slow/unreachable and TTL is low, DNS queries happen more often (each times out). High TTL would serve from cache more, masking timeout issues for cached queries."
      },
      {
        question: "How do I test DNS response time?",
        answer: "Use dig command: 'dig example.com +stats' shows query time in milliseconds. Normal: under 100ms. Slow: 100-500ms. Very slow: 500ms+. Test multiple times and against different nameservers. Online tools like ReviewMyDNS also show response times per server."
      },
      {
        question: "Should I switch DNS providers if timeouts are frequent?",
        answer: "Yes, if your current DNS provider has reliability issues. Major providers (Cloudflare, Route53, Google Cloud DNS) have 100% uptime SLAs and global anycast networks. Migration: set up records at new provider, update nameservers at registrar, wait 24-48 hours."
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
