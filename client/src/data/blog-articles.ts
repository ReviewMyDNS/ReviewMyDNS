export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  author: string;
  category: string;
  readTime: string;
  heroImage: string;
  content: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "dns-propagation-explained",
    title: "DNS Propagation: How It Actually Works (and How to Check It Properly)",
    description: "Learn what DNS propagation really is, how long it takes, why records seem 'stuck', and how to correctly check propagation from 50+ global locations using ReviewMyDNS.",
    publishedDate: "2024-12-23",
    author: "ReviewMyDNS Team",
    category: "DNS Basics",
    readTime: "12 min read",
    heroImage: "/blog/dns-propagation.svg",
    content: `
## Introduction

When you change a DNS record—like pointing your domain to a new server—you expect the change to "just work." In reality, it can take minutes to hours before users around the world see the new result. That delay is what people call DNS propagation.

Unfortunately, DNS propagation is often misunderstood:

- Some providers still say "wait 24–48 hours,"
- Tools sometimes show mixed results,
- And it's not obvious whether the issue is your DNS, caching, or something else.

In this guide, we'll explain:

- What DNS propagation actually is (and what it isn't),
- How long it really takes,
- Why different locations show different results,
- And how to correctly check propagation using a global DNS checker like ReviewMyDNS.

## What Is DNS Propagation?

DNS (Domain Name System) is the internet's address book. When you change a record, you're updating the answer to questions like:

- "What IP does example.com point to?"
- "Which mail server handles email for example.com?"
- "What's the SPF or DMARC policy for this domain?"

**DNS propagation is the period of time where different DNS resolvers around the world still have old answers cached, and gradually start using the new ones.**

Key points:

- There is no single "DNS server" that updates instantly.
- DNS is distributed and cached at many layers:
  - Recursive resolvers (ISP, corporate, public DNS like 8.8.8.8),
  - Browser cache,
  - Operating system cache.
- Until these caches expire, they can continue to return old records, even though your authoritative DNS servers have the new data.

You're not "waiting for the change to upload" somewhere; you're waiting for caches to expire and refresh.

## How Long Does DNS Propagation Take?

The answer is: **it depends mostly on your TTLs and caching behavior.**

### TTL: Time to Live

Every DNS record has a TTL (Time to Live) in seconds. It tells resolvers how long they're allowed to cache an answer before asking again.

Examples:

| TTL Value | Cache Duration |
|-----------|----------------|
| 60 seconds | Up to 1 minute |
| 300 seconds | Up to 5 minutes |
| 3600 seconds | Up to 1 hour |
| 86400 seconds | Up to 24 hours |

If you change a record that previously had a TTL of 3600 seconds:

- Any resolver that cached the old answer can keep serving it for up to an hour.
- After that, when they re-query, they'll get the new answer.

**In practice:**

- Most changes start visible within minutes in many locations.
- Some resolvers might hold onto old records for up to the old TTL, sometimes longer if they ignore TTLs.
- That's why you often see "mixed" propagation—some places show new IPs, others still show old ones.

### Factors That Affect Propagation Time

1. **Previous TTL value**: If a record had TTL=86400 (24 hours), old answers can linger for a day.
2. **Resolver behavior**: Some resolvers are conservative and may cache longer. Some public DNS services or corporate caches can be sticky.
3. **Record type**: A, AAAA, CNAME, MX, TXT, NS—all have TTLs and can be cached.
4. **User devices and browsers**: Local OS and browser caches can also keep old answers temporarily.

The old blanket advice "DNS takes 24–48 hours" is often outdated. With sensible TTLs (e.g., 300–3600 seconds), you typically see full propagation in minutes to a few hours, not days.

## Why Different Locations Show Different Results

When you test DNS from multiple locations, you might see:

- Some locations show the new IP/record,
- Some still show the old IP/record,
- Some show NXDOMAIN or errors during transitions.

**Reasons:**

### Different resolvers have different cache states
- A resolver in Europe may have just refreshed the record.
- A resolver in Asia may still have the old record cached.

### Staggered queries
- Not all resolvers ask for your record at the same moment.
- They'll re-query whenever their local TTL expires, which can be slightly different across servers.

### Nameserver changes vs. record changes
- If you changed nameservers at your registrar, some resolvers may still query the old nameservers until the registrar glue records and delegations are fully updated and cached.

### Misconfigurations
Sometimes the issue isn't propagation at all:
- Wrong record values,
- Missing records,
- Nameservers not responding,
- DNSSEC issues.

That's why checking from multiple vantage points globally is so important—you see where the old answers still live and whether there are real misconfigurations.

## How to Correctly Check DNS Propagation

You can check DNS propagation manually with dig or nslookup, but that gets tedious quickly. A global DNS propagation checker like ReviewMyDNS does the hard work for you.

### Step 1: Enter your domain and record type

1. Go to ReviewMyDNS.com.
2. In the main form, enter your domain or hostname (e.g., example.com or www.example.com).
3. Select the record type you want to check:
   - A / AAAA (IP addresses),
   - CNAME (aliases),
   - MX (mail servers),
   - TXT (SPF, DKIM, DMARC, verifications),
   - NS, SOA, CAA, etc.

### Step 2: Run a global check

Click **Check DNS Propagation**.

ReviewMyDNS will:

- Query your chosen record type from 50+ DNS servers worldwide.
- Display:
  - Each location,
  - The answer returned (e.g., IP address, MX host),
  - Status indicators for consistency or errors.

You can quickly see:

- Which locations are returning the new value,
- Which are still returning old values,
- Any locations that return errors (NXDOMAIN, SERVFAIL, REFUSED).

### Step 3: Interpret the results

Some patterns you might see:

**All locations show the same new record**
→ Propagation is effectively complete.

**Mix of old and new values**
→ Propagation is in progress. Caches in some regions haven't expired yet.

**Some locations show NXDOMAIN**
→ Could be:
- You just created the record and some resolvers haven't seen it yet, or
- Misconfiguration (e.g., record missing at your authoritative DNS), or
- Nameserver/delegation issues.

**SERVFAIL or REFUSED errors**
→ Often indicates:
- Authoritative DNS not responding,
- DNSSEC validation failures,
- Misconfigured nameservers.

If you see inconsistent or error responses, you're likely dealing with more than just propagation, and it's worth double-checking your DNS configuration.

## Best Practices Before Changing DNS

To make propagation smoother and safer:

### 1. Lower TTL in advance

If you know you'll be making a significant change (e.g., moving servers, changing MX records):

- 24–48 hours before the change, lower the TTL on the relevant records to something like:
  - 300 seconds (5 minutes), or
  - 600 seconds (10 minutes).
- Wait for that lower TTL to propagate (old caches clear).
- Then make your record change.

This way, if you need to correct something, the old/bad record won't linger for a full day.

### 2. Verify record values before going live

- Double-check IP addresses, hostnames, and syntax.
- For MX, SPF, DKIM, and DMARC:
  - Make sure hostnames are correct,
  - SPF doesn't exceed 10 DNS lookups,
  - DMARC policy and reporting addresses are valid.

### 3. Use a test subdomain when possible

If you're trying a new provider:

- Use a test subdomain first (e.g., test.example.com) to validate DNS, SSL, or email routing before touching the main domain.

## Common Problems Mistaken for "Slow Propagation"

A lot of "DNS propagation issues" are actually misconfigurations. Examples:

### Mis-typed records
- Wrong IP (e.g., 1.2.3.4 vs 12.3.4.5)
- Wrong hostname in CNAME or MX
- Extra spaces or quotes in TXT records

### Missing or incorrect NS records
- Registrar still pointing at old nameservers
- New nameservers not properly set up for your domain

### DNSSEC issues
- Incomplete or outdated DS records at the registrar
- DNSSEC enabled on provider, but not correctly configured
- Leads to SERVFAIL at validating resolvers

### Cloudflare or proxy complications
- Orange-cloud vs gray-cloud (proxied vs DNS-only)
- SSL mode set to "Flexible" causing redirect loops or SSL issues
- CNAME flattening behavior confusing propagation expectations

If propagation seems "stuck" for more than a few hours and some locations show errors, you're likely dealing with configuration problems, not just caching.

## How ReviewMyDNS Helps You Debug Faster

With ReviewMyDNS, you can:

### See global propagation at a glance
Check from 50+ worldwide DNS servers in one click.

### Compare old vs new providers
Use the DNS Comparison tool to see differences between:
- Old DNS host vs new DNS host,
- Before/after migration.

### Track DNS changes over time
Use Historical Tracking to:
- See when records changed,
- Understand what might have triggered an outage,
- Detect unauthorized modifications.

### Validate security and email configuration
Use the Security Check to validate:
- SPF, DKIM, and DMARC records,
- DNSSEC and CAA settings.

This turns DNS propagation from a guessing game into a measurable, visible process.

## Summary

DNS propagation isn't magic, and it doesn't have to be a black box:

- You're mostly waiting for cached answers to expire based on TTL.
- With reasonable TTLs, you should see most changes propagate in minutes to a few hours, not days.
- Mixed results across locations are normal during the transition.
- Many "propagation issues" are actually configuration errors.

By using a global DNS propagation checker like ReviewMyDNS, you can:

- See exactly what resolvers around the world are returning,
- Confirm when changes are truly live,
- And quickly spot misconfigurations before they impact users.

**Next step:** [Check your DNS propagation now](/) and see how your records look from 50+ global locations.

---

## Related Tools

- [Global DNS Checker](/) — See propagation status from 50+ worldwide servers
- [Historical Tracking](/history) — Track when records changed over time
- [DNS Comparison](/compare) — Compare before/after or old/new providers

## Related Guides

- [How to Move DNS Providers Without Downtime](/blog/dns-migration-checklist) — Step-by-step migration checklist
- [15 Common DNS Misconfigurations](/blog/common-dns-misconfigurations) — Catch configuration errors that look like propagation issues
    `
  },
  {
    slug: "dns-migration-checklist",
    title: "How to Move DNS Providers Without Downtime: A Step-by-Step Checklist",
    description: "Learn how to safely move DNS providers without downtime. Step-by-step checklist covering TTLs, record export/import, verification, propagation, email records, and post-migration monitoring.",
    publishedDate: "2024-12-23",
    author: "ReviewMyDNS Team",
    category: "Tutorials",
    readTime: "15 min read",
    heroImage: "/blog/dns-migration.svg",
    content: `
## Introduction

Moving DNS providers can feel risky.

You're touching the core of how users find your site and how email reaches your domain. A mistake can mean:

- Website downtime,
- Broken APIs or subdomains,
- Emails bouncing or going to spam.

The good news: if you plan the migration carefully, you can switch DNS providers with zero or near-zero downtime.

This guide gives you a practical, step-by-step checklist for moving DNS from Provider A to Provider B safely. We'll cover:

- Preparing your records and TTLs,
- Exporting and importing DNS correctly,
- Verifying records before the cutover,
- Managing propagation,
- Checking web and email after the switch,
- Monitoring DNS changes with tools like ReviewMyDNS.

## Overview: The High-Level Plan

At a high level, a safe DNS migration follows this pattern:

1. **Prepare**: Audit existing records, lower TTLs, and clean up.
2. **Replicate**: Import all records into the new provider.
3. **Verify**: Check that old and new DNS responses match.
4. **Cut Over**: Change nameservers at your domain registrar.
5. **Monitor**: Watch propagation and application behavior.
6. **Clean Up**: Remove temporary settings and old provider references.

We'll walk through each step in detail.

## Step 1: Audit Your Existing DNS Records

Before touching anything, you need a complete and accurate view of your current DNS configuration.

### 1.1 List all current records

From your current DNS provider:

- Export or screenshot all DNS zones for your domain:
  - A and AAAA
  - CNAME
  - MX
  - TXT (SPF, DKIM, DMARC, verifications)
  - NS (if using sub-zone delegation)
  - SRV, CAA, and others if applicable

Also list:

- All subdomains in use: www, api, app, admin, mail, etc.
- Any third-party services that rely on DNS: Email providers, CDNs/WAF (Cloudflare, Fastly, etc.), SaaS verifications (Google Workspace, Microsoft 365, Stripe, etc.).

### 1.2 Identify critical records

Mark records that are mission-critical, such as:

- Production web frontend (www.example.com, example.com),
- API endpoints,
- Email MX and associated SPF/DKIM/DMARC,
- VPN/remote access hostnames.

You'll want to be extra careful validating these later.

## Step 2: Lower TTLs in Advance

Propagation delay is one of the biggest sources of DNS headaches. You can reduce risk by lowering TTLs before migration.

### 2.1 Lower TTLs on key records

24–48 hours before the planned cutover:

- For critical records (A/AAAA/CNAME/MX/TXT), lower TTLs to something like:
  - 300 seconds (5 minutes) or
  - 600 seconds (10 minutes)

This ensures that:

- Any cached answers at resolvers expire quickly,
- If you need to roll back or adjust, changes will be seen faster.

### 2.2 Wait for the new TTLs to propagate

Let at least the old TTL duration pass before changing nameservers. Example:

- Old TTL: 3600 seconds (1 hour)
- You lower TTL to 300 seconds
- Wait ~1 hour so existing 3600-second caches clear
- Then proceed with your migration, knowing new changes will propagate faster

During this time, you can start setting up the new provider.

## Step 3: Replicate DNS Configuration at the New Provider

Now you'll recreate all of your DNS records at the new provider.

### 3.1 Import or re-create records

At your new DNS provider:

- If they support zone file import: Export from old provider → import into new.
- If not: Manually recreate each record:
  - Make sure hostnames, values, and TTLs match.
  - Watch out for provider-specific UI differences (e.g., @ for root).

Pay special attention to:

- **MX records**: Correct priority and hostname.
- **SPF TXT records**: Full string, no truncation.
- **DKIM TXT records**: Selector + full key value.
- **DMARC TXT record**: Syntax and reporting addresses (rua=, ruf=).
- **CNAME chains** (e.g., www → CDN hostname).

### 3.2 Match (or improve) TTLs

For now, you can:

- Set TTLs similar to what you configured in Step 2 (e.g., 300–600 seconds).
- Later, once everything is stable, you can increase them for efficiency.

## Step 4: Verify Old vs New DNS Before Cutover

Before changing nameservers, you want to ensure that the old and new DNS answers match.

This is where a DNS comparison tool like ReviewMyDNS is very handy.

### 4.1 Compare providers for key records

Using ReviewMyDNS:

- Use the DNS Comparison tool to compare:
  - Old provider vs new provider responses for:
    - example.com (root),
    - www.example.com,
    - api.example.com (and any critical subdomains),
    - MX and TXT records for email.

You're checking that:

- The new provider returns the same values as the old provider,
- No records are missing,
- No typos or extra/missing dots,
- Mail records are identical.

### 4.2 Spot and fix discrepancies

If you find differences:

- Fix them at the new provider before you change nameservers.
- Re-run the comparison until everything matches for critical records.

This "pre-flight check" is the difference between a smooth migration and a surprise outage.

## Step 5: Change Nameservers at the Registrar

Once you're confident the new provider has a correct copy of your DNS zone, it's time to cut over.

### 5.1 Locate registrar settings

At your domain registrar (where you bought the domain):

- Go to the domain's DNS / Nameservers settings.
- Note the current nameservers (in case you need to roll back temporarily).

### 5.2 Update to new provider's nameservers

From your new DNS provider, copy their authoritative nameservers (e.g., ns1.newdns.com, ns2.newdns.com).

At the registrar:

- Replace the old nameservers with the new provider's nameservers.
- Save/apply changes.

This tells the internet: "for this domain, start asking the new provider for answers."

## Step 6: Monitor Propagation and Behavior

After switching nameservers, you'll go through a propagation window where some resolvers use the new provider and some still use the old one.

Because you lowered TTLs earlier, this period should be relatively short.

### 6.1 Check DNS propagation globally

Use a global DNS propagation checker like ReviewMyDNS to:

- Check the key records (A, AAAA, CNAME, MX, TXT) from 50+ locations worldwide.
- Confirm:
  - Locations are resolving to the new provider's answers.
  - No locations show NXDOMAIN or SERVFAIL for critical records.

If you see mixed answers (old and new):

- That's expected early on.
- It should converge fully to the new answers within the old TTL + some buffer.

### 6.2 Verify application behavior

Test from multiple networks (home, office, mobile):

- Load your main site (example.com, www.example.com).
- Hit critical subdomains (e.g., app, api, admin).
- Confirm:
  - No invalid certificates (if SSL/TLS changed),
  - No unexpected redirects,
  - No 4xx/5xx errors that weren't present before.

### 6.3 Verify email delivery

Check email is still working:

- Send test emails to and from key addresses on your domain.
- Use mail tester tools to validate SPF, DKIM, and DMARC.
- Confirm messages are authenticated and not landing in spam.

With ReviewMyDNS, you can also run a Security / Email DNS check to validate MX, SPF, DKIM, DMARC, DNSSEC, and CAA records.

## Step 7: Keep Monitoring and Then Clean Up

Once propagation is complete and everything looks good, you can finalize the migration.

### 7.1 Monitor DNS changes and errors

Over the next few days:

- Periodically run checks on key DNS records.
- Use Historical Tracking to:
  - Confirm no unexpected changes are happening,
  - Establish a baseline for future troubleshooting.

If your new provider supports logging or change history, enable it.

### 7.2 Raise TTLs again (optional)

After you're confident everything is stable:

- Consider raising TTLs for:
  - Root, www, API endpoints (e.g., 1800–3600 seconds or more),
  - MX and TXT records (often safely higher).

Higher TTLs:

- Reduce DNS query load,
- Improve performance for repeat clients,
- But make future changes slower to propagate—so balance based on how often you change records.

### 7.3 Remove or archive the old configuration

Once you're sure you won't roll back:

- Remove the zone from the old DNS provider, or
- Archive screenshots/exports for documentation, then remove.

This avoids confusion later if someone looks at the old provider and assumes those records are active.

## Common Pitfalls to Avoid During DNS Migration

Even with a checklist, there are some classic gotchas:

### Forgetting a subdomain
Missing api, admin, static, cdn, etc.
**Fix**: Double-check your full subdomain list before migration.

### Breaking email
Incorrect MX priority or hostnames, missing SPF/DKIM/DMARC after migration.
**Fix**: Verify email-related TXT and MX records closely and re-test sending/receiving.

### Cloud/Proxy misconfiguration
If using Cloudflare/another CDN/WAF: forgetting to set proxied vs DNS-only correctly, SSL mode mismatched (Flexible vs Full).
**Fix**: Replicate not just DNS records, but also proxy settings and certificates where applicable.

### Lack of rollback plan
Not knowing how to quickly restore old nameservers if something goes wrong.
**Fix**: Keep old nameserver info handy and don't decommission old DNS too quickly.

## How ReviewMyDNS Can Help With DNS Provider Migrations

ReviewMyDNS gives you the visibility you need for a safe migration:

### Global DNS Propagation Checker
See how your A, CNAME, MX, TXT, and other records resolve from 50+ servers worldwide.

### DNS Comparison
Compare old vs new DNS providers side-by-side: catch missing or mismatched records before you cut over.

### Historical Tracking
Track changes over time: understand when and how records changed, debug outages after the fact.

### Security & Email Checks
Validate SPF, DKIM, DMARC, DNSSEC and CAA, MX configuration.

This turns a risky, opaque process into a set of measurable, verifiable steps.

## Summary: Your DNS Migration Checklist

To move DNS providers without downtime:

1. **Audit** your current DNS records and identify critical entries.
2. **Lower TTLs** on key records 24–48 hours before migration.
3. **Replicate** all records at the new provider carefully.
4. **Verify** that old vs new provider answers match (especially for web and email).
5. **Change nameservers** at your registrar to point to the new provider.
6. **Monitor** propagation and test web + email from multiple networks.
7. **Keep monitoring**, then raise TTLs and clean up the old provider.

If you follow this checklist and use a global DNS checker to validate every step, you can switch providers with minimal risk and near-zero downtime.

**Next step:** [Run a global DNS check](/) to see how your records look from 50+ locations and plan your next migration safely.

---

## Related Tools

- [Global DNS Checker](/) — Verify propagation from 50+ worldwide servers
- [DNS Comparison](/compare) — Compare old vs new provider side-by-side before cutover
- [Historical Tracking](/history) — Monitor for unexpected changes after migration
- [Security Check](/security) — Validate SPF, DKIM, DMARC after email migration

## Related Guides

- [DNS Propagation: How It Actually Works](/blog/dns-propagation-explained) — Understand why changes take time to appear
- [SPF, DKIM, and DMARC Complete Guide](/blog/spf-dkim-dmarc-guide) — Don't break email during migration
- [15 Common DNS Misconfigurations](/blog/common-dns-misconfigurations) — Avoid migration pitfalls
    `
  },
  {
    slug: "dns-propagation-myths-debunked",
    title: "5 DNS Propagation Myths Debunked: What Really Happens When You Change DNS",
    description: "Separate fact from fiction about DNS propagation. Learn what really happens when you update DNS records and how to avoid common mistakes.",
    publishedDate: "2024-12-10",
    author: "ReviewMyDNS Team",
    category: "DNS Basics",
    readTime: "8 min read",
    heroImage: "/blog/dns-myths.svg",
    content: `
## Introduction

DNS propagation is one of the most misunderstood concepts in web hosting and domain management. Whether you're a seasoned IT professional or a small business owner managing your first website, you've likely encountered confusing advice about how DNS works.

In this article, we'll debunk the five most common DNS propagation myths and explain what actually happens when you change your DNS records.

## Myth 1: DNS Changes Take 24-48 Hours to Propagate Worldwide

**The Reality:** This is perhaps the most persistent myth in DNS. The "24-48 hours" timeframe was accurate in the early days of the internet when TTL (Time To Live) values were set high and DNS infrastructure was slower.

Today, most DNS changes propagate within **5-30 minutes** for properly configured domains. The actual propagation time depends on:

- **TTL values**: Lower TTLs mean faster propagation
- **DNS caching layers**: ISP caches, browser caches, OS caches
- **Geographic location**: Some regions update faster than others

**Pro tip**: Before making DNS changes, lower your TTL to 300 seconds (5 minutes) at least 24 hours in advance. This ensures the old, high-TTL records expire from caches before you make changes.

## Myth 2: There's Nothing You Can Do But Wait

**The Reality:** While you can't force every DNS resolver in the world to update simultaneously, there are several things you can do to speed up and verify propagation:

1. **Pre-lower your TTL**: As mentioned above, reduce TTL values before making changes
2. **Flush local caches**: Clear your browser cache and OS DNS cache
3. **Use DNS checking tools**: Tools like ReviewMyDNS let you verify DNS resolution from multiple global locations
4. **Check specific resolvers**: Different ISPs and regions may have different propagation status

## Myth 3: DNS Propagation is Linear and Predictable

**The Reality:** DNS propagation is neither linear nor predictable. It's more like a wave that moves at different speeds across different parts of the internet.

Some factors that affect propagation patterns:

- **ISP caching policies**: Some ISPs aggressively cache DNS records beyond their TTL
- **CDN behavior**: Content delivery networks have their own DNS caching layers
- **Geographic infrastructure**: Regions with better internet infrastructure often see faster updates
- **Record type**: Some record types (like MX) may be cached differently than others

## Myth 4: All DNS Record Types Propagate the Same Way

**The Reality:** Different DNS record types are handled differently by various systems:

- **A/AAAA records**: Usually propagate fastest as they're queried most frequently
- **MX records**: Email servers may cache these more aggressively for reliability
- **TXT records**: Often used for verification, these typically propagate within the TTL window
- **CNAME records**: May have additional delays due to chain resolution
- **NS records**: Changes to nameserver records can take longer due to registrar-level caching

## Myth 5: Once Propagated, DNS is Stable Forever

**The Reality:** DNS resolution can vary even after "complete" propagation. Some issues that can cause apparent re-propagation:

- **TTL expiration cycles**: Some caches may expire and re-query at different intervals
- **ISP cache refreshes**: Internet service providers periodically refresh their DNS caches
- **Anycast routing changes**: Large DNS providers use anycast, which can route queries to different servers
- **Load balancing**: DNS-based load balancing can return different results for the same query

## How to Monitor DNS Propagation Effectively

Instead of guessing, use tools to monitor your DNS changes:

1. **Check multiple global locations**: Use ReviewMyDNS to query DNS servers worldwide
2. **Monitor over time**: Don't just check once—monitor for 24 hours to see the full propagation pattern
3. **Test from different networks**: Your home network, mobile data, and office may show different results
4. **Verify all record types**: If you changed multiple records, check each one separately

## Conclusion

Understanding how DNS propagation really works empowers you to make changes with confidence. Remember:

- Most changes propagate in minutes, not days
- You can influence propagation speed with TTL management
- Use monitoring tools to verify propagation status
- Different record types and regions may propagate at different speeds

Stop waiting 48 hours "just to be safe" and start managing your DNS with knowledge and precision.
    `
  },
  {
    slug: "migrate-dns-providers-safely",
    title: "How to Migrate DNS Providers Without Breaking Your Website",
    description: "A step-by-step guide to safely moving your DNS from one provider to another with zero downtime.",
    publishedDate: "2024-12-08",
    author: "ReviewMyDNS Team",
    category: "Tutorials",
    readTime: "12 min read",
    heroImage: "/blog/dns-migration.svg",
    content: `
## Why Migrate DNS Providers?

There are many reasons you might want to switch DNS providers:

- **Better performance**: Faster response times from providers like Cloudflare or Google
- **More features**: Advanced features like DNS failover or geographic routing
- **Cost reduction**: Moving from an expensive provider to a more affordable one
- **Consolidation**: Bringing all your domains under one management platform
- **Security**: Access to DNSSEC, DDoS protection, or better monitoring

Whatever your reason, a DNS migration requires careful planning to avoid downtime.

## Step 1: Document Your Current DNS Configuration

Before you touch anything, create a complete backup of your current DNS records:

1. **Export all records**: Most DNS providers offer a zone file export feature
2. **Screenshot the configuration**: Visual backup in case the export misses something
3. **Note all record types**: A, AAAA, CNAME, MX, TXT, SRV, NS records
4. **Document TTL values**: You'll need these for the new provider
5. **List any special features**: Failover rules, geographic routing, etc.

Use ReviewMyDNS to query your current DNS and save the results as a baseline reference.

## Step 2: Lower Your TTL Values

At least 48 hours before migration:

1. Log into your current DNS provider
2. Lower all TTL values to 300 seconds (5 minutes)
3. Wait for the old TTL period to expire
4. Verify the new TTL is being served using a DNS lookup tool

**Why this matters**: If your current TTL is 86400 seconds (24 hours), some resolvers may have cached your records for up to a day. Lowering the TTL ensures caches expire quickly once you make the switch.

## Step 3: Set Up Your New DNS Provider

While waiting for TTL changes to propagate:

1. **Create an account** with your new DNS provider
2. **Add your domain** to their system (don't change nameservers yet)
3. **Recreate all DNS records** exactly as they exist currently
4. **Double-check MX records**: Email is critical—verify mail server priorities
5. **Verify TXT records**: SPF, DKIM, and DMARC records must be exact
6. **Test CNAME chains**: Ensure all CNAME records point to valid targets

## Step 4: Verify Your New Configuration

Before switching nameservers, verify your new DNS configuration is correct:

1. **Use the provider's preview feature** if available
2. **Query your new nameservers directly**: Use dig or nslookup to query the new NS records
3. **Compare old vs new**: Every record should match exactly
4. **Test any special features**: Failover, load balancing, etc.

## Step 5: Make the Switch

When you're confident the new configuration is correct:

1. **Choose a low-traffic time**: Late night or early morning local time
2. **Log into your domain registrar** (this may be different from your DNS provider)
3. **Update nameserver records** to point to your new DNS provider
4. **Don't touch the old DNS** yet—leave it running for 72 hours

## Step 6: Monitor Propagation

After changing nameservers:

1. **Use ReviewMyDNS** to monitor propagation across global DNS servers
2. **Check every 15 minutes** for the first few hours
3. **Test from different networks**: Home, mobile, office, VPN
4. **Monitor your website and email**: Watch for any delivery issues

## Step 7: Post-Migration Cleanup

After 72 hours with no issues:

1. **Increase TTL values** back to normal (3600-86400 seconds)
2. **Cancel your old DNS provider** if no longer needed
3. **Update documentation**: Record the new DNS configuration
4. **Set up monitoring**: Configure alerts for DNS issues

## Common Migration Mistakes to Avoid

1. **Rushing the process**: Take your time—there's no prize for speed
2. **Forgetting MX records**: Email downtime is painful
3. **Mismatched TTL values**: Copy TTLs exactly from the old provider
4. **Deleting old DNS too soon**: Keep it active for at least 72 hours
5. **Not testing thoroughly**: Query your new DNS before going live

## Conclusion

DNS migration doesn't have to be scary. With proper planning, TTL management, and careful verification, you can switch providers with zero downtime. The key is preparation and patience.

Use tools like ReviewMyDNS throughout the process to monitor your propagation and catch any issues before they affect your users.
    `
  },
  {
    slug: "spf-dkim-dmarc-guide",
    title: "SPF, DKIM, and DMARC: The Complete Email Authentication Guide",
    description: "Master email authentication with this comprehensive guide to SPF, DKIM, and DMARC. Learn how to configure DNS records to stop spoofing, improve deliverability, and keep emails out of spam.",
    publishedDate: "2024-12-23",
    author: "ReviewMyDNS Team",
    category: "Email",
    readTime: "18 min read",
    heroImage: "/blog/email-dns.svg",
    content: `
## Introduction

If your emails are landing in spam—or not being delivered at all—the problem is almost always your DNS configuration.

Modern email relies on three authentication protocols working together:

- **SPF** (Sender Policy Framework): Who is allowed to send email for your domain?
- **DKIM** (DomainKeys Identified Mail): Is this email actually from your domain and unmodified?
- **DMARC** (Domain-based Message Authentication): What should happen when authentication fails?

When properly configured, these three records:

- Prevent attackers from spoofing your domain,
- Improve your email deliverability,
- Give you visibility into who's sending email as you.

This guide explains each protocol in detail, shows you how to configure them correctly, and helps you debug common problems.

## Part 1: Understanding Email Authentication

### How Email Authentication Works

When you send an email from your domain:

1. Your mail server signs the message with DKIM.
2. The receiving server checks SPF to see if your server is authorized.
3. The receiving server verifies the DKIM signature.
4. DMARC tells the receiver what to do if SPF or DKIM fails.

If all checks pass, your email is more likely to reach the inbox. If they fail, it may be marked as spam or rejected entirely.

### Why All Three Are Necessary

| Protocol | What It Proves | Limitation |
|----------|----------------|------------|
| SPF | Sending IP is authorized | Breaks with forwarding |
| DKIM | Message is authentic and unmodified | Doesn't cover envelope sender |
| DMARC | Ties SPF/DKIM to your domain + policy | Requires both SPF and DKIM to work well |

Each protocol has blind spots. Together, they form a robust authentication system.

## Part 2: SPF (Sender Policy Framework)

### What SPF Does

SPF lets you publish a list of IP addresses and servers that are authorized to send email for your domain. Receiving servers check this list to verify the sender.

### SPF Record Format

SPF is published as a TXT record at your root domain:

\`\`\`
v=spf1 include:_spf.google.com include:amazonses.com ip4:192.0.2.1 -all
\`\`\`

**Components:**

- \`v=spf1\` — Required version tag
- \`include:\` — Authorize another domain's SPF (counts as a DNS lookup)
- \`ip4:\` / \`ip6:\` — Authorize specific IP addresses
- \`a\` — Authorize IPs from your A record
- \`mx\` — Authorize IPs from your MX record
- \`-all\` — Fail everything else (hard fail)
- \`~all\` — Soft fail (mark as suspicious but deliver)
- \`?all\` — Neutral (no policy)

### The 10 DNS Lookup Limit

**This is the most common SPF problem.**

SPF allows a maximum of 10 DNS lookups. Each \`include:\`, \`a\`, \`mx\`, \`redirect\`, and \`exists\` mechanism counts as a lookup.

If you exceed 10 lookups, SPF returns a **PermError** and fails.

**How to count lookups:**

1. Each \`include:\` = 1 lookup
2. Nested includes also count
3. \`a\` and \`mx\` = 1 lookup each
4. \`ip4:\` and \`ip6:\` = 0 lookups (no DNS needed)

**Example problem:**

\`\`\`
v=spf1 include:_spf.google.com include:spf.protection.outlook.com include:amazonses.com include:sendgrid.net include:mailchimp.com include:freshdesk.com include:zendesk.com -all
\`\`\`

This looks like 7 includes, but each include may have nested includes. You could easily exceed 10.

**Solutions:**

1. Remove services you no longer use
2. Replace \`include:\` with \`ip4:\` for static IPs
3. Use SPF flattening tools (but update regularly)
4. Split email sending across subdomains

### Common SPF Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Multiple SPF records | Only one allowed; causes failure | Merge into single record |
| Missing \`v=spf1\` | Record not recognized as SPF | Add version tag |
| Using \`+all\` | Allows anyone to send as you | Use \`-all\` or \`~all\` |
| Too many lookups | PermError, SPF fails | Reduce includes |

## Part 3: DKIM (DomainKeys Identified Mail)

### What DKIM Does

DKIM adds a cryptographic signature to your outgoing emails. Receiving servers use a public key (published in DNS) to verify the signature.

This proves:

1. The email actually came from your domain
2. The message wasn't modified in transit

### DKIM Record Format

DKIM records are TXT records at a specific selector:

\`\`\`
selector._domainkey.yourdomain.com
\`\`\`

**Example record:**

\`\`\`
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...
\`\`\`

**Components:**

- \`v=DKIM1\` — Version tag
- \`k=rsa\` — Key type (RSA is standard)
- \`p=...\` — Public key (base64 encoded)

### Finding Your DKIM Selector

Each email service uses a different selector:

| Provider | Selector Example |
|----------|------------------|
| Google Workspace | \`google._domainkey\` |
| Microsoft 365 | \`selector1._domainkey\`, \`selector2._domainkey\` |
| SendGrid | \`s1._domainkey\`, \`s2._domainkey\` |
| Mailchimp | \`k1._domainkey\` |

Your email provider will give you the exact selector and public key to publish.

### Common DKIM Problems

**1. Selector mismatch**

The selector in your email headers doesn't match the DNS record.

**Fix:** Check the DKIM-Signature header in a sent email and verify that selector exists in DNS.

**2. Record truncation**

DKIM keys are long. Some DNS providers truncate TXT records over 255 characters.

**Fix:** Split the record into multiple quoted strings:

\`\`\`
"v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBA..." "...QAB"
\`\`\`

**3. Missing record entirely**

**Fix:** Generate a new key pair in your email provider and publish the public key.

### Verifying DKIM

Use ReviewMyDNS to query:

\`\`\`
selector._domainkey.yourdomain.com (TXT record)
\`\`\`

You should see the public key. If you see NXDOMAIN, the record is missing.

## Part 4: DMARC (Domain-based Message Authentication)

### What DMARC Does

DMARC ties SPF and DKIM together and tells receiving servers:

1. **Policy**: What to do when authentication fails
2. **Reporting**: Where to send aggregate and forensic reports
3. **Alignment**: How strict to be about domain matching

### DMARC Record Format

DMARC is published as a TXT record at:

\`\`\`
_dmarc.yourdomain.com
\`\`\`

**Example record:**

\`\`\`
v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com; ruf=mailto:dmarc-forensic@yourdomain.com; pct=100; adkim=r; aspf=r
\`\`\`

**Components:**

| Tag | Meaning | Values |
|-----|---------|--------|
| \`v\` | Version | Must be \`DMARC1\` |
| \`p\` | Policy | \`none\`, \`quarantine\`, \`reject\` |
| \`rua\` | Aggregate report address | \`mailto:...\` |
| \`ruf\` | Forensic report address | \`mailto:...\` |
| \`pct\` | Percentage of mail to apply policy | 0-100 |
| \`adkim\` | DKIM alignment | \`r\` (relaxed), \`s\` (strict) |
| \`aspf\` | SPF alignment | \`r\` (relaxed), \`s\` (strict) |

### DMARC Policy Progression

Don't jump straight to \`reject\`. Follow this progression:

**Week 1-2: Monitor**
\`\`\`
v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
\`\`\`

Collect reports without affecting delivery.

**Week 3-4: Quarantine (partial)**
\`\`\`
v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@yourdomain.com
\`\`\`

Send 25% of failing mail to spam.

**Week 5-6: Quarantine (full)**
\`\`\`
v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@yourdomain.com
\`\`\`

**Week 7+: Reject**
\`\`\`
v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com
\`\`\`

Block all failing mail.

### Understanding DMARC Reports

DMARC aggregate reports (rua) show:

- Which IPs are sending email as your domain
- Whether SPF and DKIM passed or failed
- Volume of messages

Use a DMARC report analyzer to parse the XML files.

## Part 5: Complete Configuration Walkthrough

### Step 1: Inventory Your Email Senders

Before configuring, list everyone who sends email as your domain:

- Primary email (Google Workspace, Microsoft 365)
- Marketing (Mailchimp, HubSpot)
- Transactional (SendGrid, Amazon SES)
- Support (Zendesk, Freshdesk)
- Internal systems (servers, applications)

### Step 2: Configure SPF

Create your SPF record including all authorized senders:

\`\`\`
v=spf1 include:_spf.google.com include:sendgrid.net ip4:YOUR.SERVER.IP -all
\`\`\`

Verify with ReviewMyDNS that it's published correctly.

### Step 3: Configure DKIM

For each email service:

1. Generate DKIM keys in the service's settings
2. Publish the TXT record at the specified selector
3. Enable DKIM signing in the service

Verify each selector with ReviewMyDNS.

### Step 4: Configure DMARC

Start with monitoring mode:

\`\`\`
v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
\`\`\`

Wait 1-2 weeks and review reports before tightening the policy.

### Step 5: Test Everything

1. Send test emails to Gmail, Outlook, Yahoo
2. Check headers for SPF, DKIM, DMARC pass/fail
3. Use mail-tester.com for a full audit
4. Monitor DMARC reports for unexpected failures

## Part 6: Debugging Common Problems

### Emails Going to Spam

**Check:**
1. SPF: Is sending IP authorized?
2. DKIM: Does signature verify?
3. DMARC: Is alignment passing?

Use ReviewMyDNS to verify all three records are correct.

### "SPF PermError: Too Many Lookups"

**Fix:**
1. Count your includes (including nested)
2. Remove unused services
3. Replace includes with IP addresses where possible

### "DKIM Signature Verification Failed"

**Check:**
1. Is the selector correct in DNS?
2. Is the public key complete (not truncated)?
3. Has the key been rotated recently?

### "DMARC Fail" Despite SPF/DKIM Passing

**Likely cause:** Alignment failure

SPF domain or DKIM domain doesn't match the From: header domain.

**Fix:** Use relaxed alignment (\`adkim=r; aspf=r\`) or ensure your sending services properly align domains.

## How ReviewMyDNS Helps with Email Authentication

With ReviewMyDNS, you can:

### Check All Email Records at Once
Query MX, TXT (SPF), DKIM selectors, and DMARC from 50+ global locations.

### Validate Configuration
- Verify SPF syntax and lookup count
- Confirm DKIM public keys are published
- Check DMARC policy and reporting addresses

### Monitor for Changes
Track when email records change—intentionally or not.

### Troubleshoot Delivery Issues
Compare what different resolvers see for your email records.

## Summary

Email authentication isn't optional anymore. Major email providers (Gmail, Microsoft, Yahoo) require proper SPF, DKIM, and DMARC for reliable delivery.

**Key takeaways:**

1. **SPF** authorizes sending IPs—watch the 10-lookup limit
2. **DKIM** signs messages—publish keys for all senders
3. **DMARC** ties them together—start with \`p=none\` and progress to \`reject\`

Use ReviewMyDNS to verify your email DNS configuration and catch issues before they affect delivery.

**Next step:** [Run a security check](/security) to validate your SPF, DKIM, and DMARC records now.

---

## Related Tools

- [Security Check](/security) — Validate SPF, DKIM, DMARC, DNSSEC, and CAA
- [Global DNS Checker](/) — Check TXT records from 50+ locations
- [DNS Comparison](/compare) — Compare email records between providers

## Related Guides

- [15 Common DNS Misconfigurations](/blog/common-dns-misconfigurations) — Avoid common SPF/DKIM mistakes
- [How to Move DNS Providers Without Downtime](/blog/dns-migration-checklist) — Don't break email during migration
    `
  },
  {
    slug: "dns-ttl-guide",
    title: "DNS TTL Values Explained: How to Choose the Right TTL for Every Situation",
    description: "Understanding Time To Live (TTL) values and how to optimize them for performance, reliability, and faster changes.",
    publishedDate: "2024-12-01",
    author: "ReviewMyDNS Team",
    category: "DNS Basics",
    readTime: "10 min read",
    heroImage: "/blog/dns-ttl.svg",
    content: `
## What is DNS TTL?

TTL (Time To Live) is a value in seconds that tells DNS resolvers how long they can cache a DNS record before querying the authoritative nameserver again.

For example, a TTL of 3600 means resolvers can serve the cached record for one hour before checking for updates.

## Why TTL Matters

TTL affects three critical aspects of your domain:

1. **Performance**: Higher TTLs reduce DNS query load and speed up resolution
2. **Reliability**: Cached records continue working even if your nameserver is temporarily unavailable
3. **Flexibility**: Lower TTLs allow faster changes when you need to update records

## Common TTL Values and When to Use Them

### 300 seconds (5 minutes)
**Best for:**
- Domains expecting changes soon
- Pre-migration preparation
- Dynamic IP addresses
- Development/staging environments

**Trade-offs:**
- More DNS queries = slightly slower resolution
- Higher load on nameservers

### 3600 seconds (1 hour)
**Best for:**
- General purpose websites
- Balance between performance and flexibility
- Most A, AAAA, and CNAME records

**This is the recommended default for most use cases.**

### 86400 seconds (24 hours)
**Best for:**
- Stable infrastructure that rarely changes
- MX records (email server changes are rare)
- NS records (nameserver changes should be planned)
- Maximum caching performance

**Trade-offs:**
- Changes take up to 24 hours to fully propagate
- Harder to respond to emergencies

### 604800 seconds (1 week)
**Best for:**
- Root domain NS records at registrar
- Rarely changing TXT records
- Maximum performance priority

**Not recommended for most use cases due to inflexibility.**

## TTL Strategies by Record Type

### A/AAAA Records (IP Addresses)
- **Static servers**: 3600-86400 seconds
- **Cloud/dynamic IPs**: 300-900 seconds
- **Load-balanced**: Match your failover needs

### MX Records (Email)
- **Recommended**: 3600-86400 seconds
- Email is critical—use stable servers and higher TTLs

### CNAME Records
- **Recommended**: 3600 seconds
- Balance between performance and potential target changes

### TXT Records (SPF, DKIM, DMARC)
- **Recommended**: 3600-86400 seconds
- These rarely change and benefit from caching

### NS Records
- **Recommended**: 86400-172800 seconds
- Nameserver changes should be rare and planned

## TTL Strategy for DNS Migrations

When planning DNS changes, use this TTL reduction strategy:

1. **48 hours before**: Lower TTL to 300 seconds
2. **Wait for old TTL to expire**: If previous TTL was 86400, wait 24 hours
3. **Make your DNS changes**: The low TTL ensures fast propagation
4. **Monitor propagation**: Use ReviewMyDNS to verify changes
5. **After 24-48 hours**: Raise TTL back to normal values

## Common TTL Mistakes

### Mistake 1: Setting TTL Too Low Permanently
**Problem**: Constant DNS queries slow down your site and increase nameserver load.
**Solution**: Only use low TTLs temporarily during changes.

### Mistake 2: Forgetting to Lower TTL Before Changes
**Problem**: Users see old records for hours/days after you make changes.
**Solution**: Plan ahead—lower TTL at least 48 hours before making changes.

### Mistake 3: Using Different TTLs Than Intended
**Problem**: Some DNS providers have minimum TTL limits (e.g., 60 seconds minimum).
**Solution**: Verify actual TTL values using DNS lookup tools.

### Mistake 4: Not Accounting for Caching Layers
**Problem**: Browser caches, OS caches, and ISP caches may ignore TTL.
**Solution**: Educate users about clearing caches; plan for realistic propagation times.

## How to Check Current TTL Values

Use ReviewMyDNS to see your current TTL values:

1. Enter your domain
2. Select the record type
3. View the TTL column in results

Compare TTL values across different DNS servers to ensure consistency.

## Conclusion

TTL management is a powerful but often overlooked aspect of DNS administration. The right TTL values provide a balance between performance and flexibility for your specific needs.

Remember:
- Higher TTLs = better performance, slower changes
- Lower TTLs = faster changes, more DNS traffic
- Temporarily lower TTLs before making changes
- Match TTL to how often each record type changes

Use ReviewMyDNS to monitor your DNS configuration and verify TTL values are serving as expected.
    `
  },
  {
    slug: "cloudflare-vs-route53-dns-comparison",
    title: "Cloudflare DNS vs AWS Route 53: Complete Comparison for 2024",
    description: "An in-depth comparison of Cloudflare and AWS Route 53 for DNS hosting, including performance, features, pricing, and use cases.",
    publishedDate: "2024-11-28",
    author: "ReviewMyDNS Team",
    category: "Comparisons",
    readTime: "14 min read",
    heroImage: "/blog/cloudflare-vs-route53.svg",
    content: `
## Introduction

Choosing a DNS provider is a critical infrastructure decision. Two of the most popular options are Cloudflare DNS and AWS Route 53. Both offer excellent performance and reliability, but they serve different use cases and have distinct feature sets.

This comparison will help you decide which is right for your needs.

## Overview

### Cloudflare DNS
- **Type**: Free DNS hosting with premium features
- **Best for**: Websites, applications needing CDN integration
- **Key strength**: Performance + security + CDN in one platform

### AWS Route 53
- **Type**: Paid DNS hosting (per-query pricing)
- **Best for**: AWS-integrated infrastructure, enterprise needs
- **Key strength**: Deep AWS integration + advanced routing policies

## Performance Comparison

### Query Speed

Based on global DNS benchmarks:

| Provider | Average Response Time | 
|----------|----------------------|
| Cloudflare | 11-15ms |
| Route 53 | 20-30ms |

Cloudflare generally has faster raw DNS resolution due to their massive anycast network optimized specifically for speed.

### Global Availability

**Cloudflare**: 300+ data centers in 100+ countries
**Route 53**: 80+ edge locations globally

Both provide excellent global coverage, but Cloudflare has more points of presence.

### Uptime

Both providers offer 100% uptime SLAs and have excellent track records. Route 53 has the backing of AWS's infrastructure, while Cloudflare has a distributed architecture designed specifically for DNS.

## Feature Comparison

### DNS Record Types

Both support all standard record types:
- A, AAAA, CNAME, MX, TXT, NS, SOA
- SRV, CAA, PTR

**Route 53 exclusive**: Alias records for AWS resources
**Cloudflare exclusive**: Proxied records with CDN/security features

### Routing Policies

**Route 53** offers more advanced routing:
- Simple routing
- Weighted routing
- Latency-based routing
- Failover routing
- Geolocation routing
- Multi-value answer routing

**Cloudflare** offers:
- Load balancing (paid feature)
- Geographic routing (Enterprise)
- Failover (with Health Checks add-on)

Winner: Route 53 for complex routing requirements

### Security Features

**Cloudflare**:
- Free DDoS protection
- DNSSEC with one click
- Bot management
- WAF integration
- Rate limiting

**Route 53**:
- DNSSEC support
- Private DNS for VPCs
- Query logging
- AWS Shield integration (additional cost)

Winner: Cloudflare for built-in security features

### CDN Integration

**Cloudflare**: DNS + CDN + Security in one platform
**Route 53**: DNS only; requires CloudFront for CDN

If you need CDN, Cloudflare offers a more integrated experience.

## Pricing Comparison

### Cloudflare DNS
- **Free tier**: Unlimited DNS queries, basic features
- **Pro**: $20/month (includes more features)
- **Business**: $200/month
- **Enterprise**: Custom pricing

### Route 53
- **Hosted zones**: $0.50/month per zone
- **Standard queries**: $0.40 per million queries
- **Latency-based routing**: $0.60 per million queries
- **Geo routing**: $0.70 per million queries
- **Health checks**: $0.50-$2.00/month per check

**For a typical website with 1 million queries/month:**
- Cloudflare: $0
- Route 53: ~$0.90/month

**For enterprise with complex routing:**
- Cloudflare: Enterprise pricing
- Route 53: More cost-effective at scale

## Use Case Recommendations

### Choose Cloudflare If:
- You want free, fast DNS hosting
- You need integrated CDN and security
- You're building a website or web application
- You want simple setup and management
- You need DDoS protection included

### Choose Route 53 If:
- You're heavily invested in AWS ecosystem
- You need complex routing policies
- You require private DNS for internal resources
- You want deep integration with other AWS services
- You need Alias records for AWS resources

### Consider Both If:
- You can use Cloudflare for external DNS
- You can use Route 53 for internal/AWS-specific needs
- This hybrid approach is common in enterprise environments

## Migration Considerations

### Moving to Cloudflare
1. Create Cloudflare account
2. Add your domain
3. Cloudflare imports existing records
4. Update nameservers at registrar
5. Records are typically migrated automatically

### Moving to Route 53
1. Create hosted zone in AWS
2. Manually recreate all DNS records
3. Update nameservers at registrar
4. Consider using AWS CLI for bulk imports

## Conclusion

Both Cloudflare DNS and AWS Route 53 are excellent choices, but for different reasons:

- **Cloudflare** excels at performance, security, and value for web-focused projects
- **Route 53** excels at AWS integration and complex enterprise routing needs

For most websites and applications, Cloudflare offers the best combination of performance, features, and price (free). For AWS-heavy infrastructure with complex routing requirements, Route 53 is the better choice.

Use ReviewMyDNS to compare DNS performance across providers and verify your configuration after migration.
    `
  },
  {
    slug: "common-dns-misconfigurations",
    title: "15 Common DNS Misconfigurations and How to Detect Them",
    description: "Comprehensive guide to identifying and fixing the most common DNS configuration mistakes that cause downtime, email delivery failures, and security vulnerabilities.",
    publishedDate: "2024-12-23",
    author: "ReviewMyDNS Team",
    category: "Troubleshooting",
    readTime: "16 min read",
    heroImage: "/blog/dns-misconfigurations.svg",
    content: `
## Introduction

DNS misconfigurations are one of the leading causes of website outages, email delivery failures, and security incidents.

Even experienced administrators make these mistakes—often without realizing until something breaks.

The good news? Most DNS issues follow predictable patterns. If you know what to look for, you can detect and fix them before they cause problems.

This guide covers the 15 most common DNS misconfigurations, how to detect each one, and exactly how to fix them.

## Overview: The Cost of DNS Misconfigurations

Before we dive in, here's why this matters:

| Misconfiguration | Impact |
|------------------|--------|
| Missing MX records | Complete email outage |
| Broken SPF/DKIM | Emails marked as spam or rejected |
| CNAME at root | Website doesn't load |
| Dangling CNAME | Subdomain takeover (security risk) |
| Wrong nameservers | Complete domain outage |
| Missing CAA | Unauthorized SSL certificates |

Let's go through each one.

## 1. Missing or Incorrect MX Records

**What happens:** Email doesn't reach your domain, or mail servers reject connections.

**How to detect:**

1. Query your MX records with ReviewMyDNS
2. Check if any records exist
3. Verify each mail server hostname actually resolves to an IP

**Common mistakes:**

- MX points to an IP address (wrong—it must point to a hostname)
- MX hostname doesn't exist or has a typo
- MX priorities are backwards (lower numbers = higher priority)
- Using CNAME instead of A record for the mail server hostname

**Example of correct MX setup:**

\`\`\`
Priority 10: mail1.example.com
Priority 20: mail2.example.com (backup)
\`\`\`

**Fix:** Ensure MX records point to valid, resolvable hostnames with appropriate priority values. Verify each hostname has an A record.

## 2. SPF Record Exceeds 10 DNS Lookups

**What happens:** Email authentication fails with "SPF PermError." Receiving servers can't validate your email.

**How to detect:**

1. Query your TXT records
2. Count \`include:\`, \`a\`, \`mx\`, \`redirect\`, and \`exists\` mechanisms
3. Remember: nested includes count too

**The 10-lookup limit:**

Each of these counts as 1 lookup:
- \`include:_spf.google.com\` (plus its nested includes)
- \`a\` mechanism
- \`mx\` mechanism
- \`redirect\`
- \`exists\`

These do NOT count:
- \`ip4:\` and \`ip6:\`
- \`all\`

**Example problem:**

\`\`\`
v=spf1 include:_spf.google.com include:spf.protection.outlook.com include:amazonses.com include:sendgrid.net include:mailchimp.com include:freshdesk.com -all
\`\`\`

This looks like 6 includes, but Google's SPF alone has 3-4 nested includes. You're probably over 10.

**Fix:**

1. Remove services you no longer use
2. Replace \`include:\` with \`ip4:\` for services with static IPs
3. Use SPF flattening (but update it regularly)
4. Split email sending across subdomains

## 3. Multiple SPF Records

**What happens:** SPF fails because the RFC only allows one SPF record per domain.

**How to detect:**

Query TXT records and look for multiple entries starting with \`v=spf1\`.

**Common cause:**

Adding a new email service by creating a new SPF record instead of editing the existing one.

**Fix:** Merge all SPF mechanisms into a single record:

\`\`\`
v=spf1 include:_spf.google.com include:sendgrid.net -all
\`\`\`

## 4. CNAME at the Root Domain (Apex)

**What happens:** DNS standards (RFC 1034) don't allow CNAME records at the root domain. Your website may not load.

**Why this is a problem:**

- \`example.com\` (root) cannot have a CNAME
- \`www.example.com\` can have a CNAME
- Many DNS providers silently ignore or break root CNAMEs

**How to detect:**

Query your root domain and check if you have a CNAME. If so, that's the problem.

**Fix:**

- Use A and AAAA records for the root domain
- OR use a DNS provider that supports ALIAS/ANAME records (Cloudflare, Route 53, DNSimple)

These providers synthesize the behavior you want without violating DNS standards.

## 5. Inconsistent DNS Across Nameservers

**What happens:** Different users see different DNS results. Some can access your site, others can't.

**How to detect:**

Use ReviewMyDNS to query your domain from 50+ global locations. Compare results—if they differ, you have a synchronization problem.

**Common causes:**

- Manual edits to individual nameservers without replicating
- Zone transfer (AXFR) failures between primary and secondary nameservers
- Recent changes that haven't propagated to all nameservers

**Fix:**

1. Identify which nameserver has incorrect data
2. Force a zone transfer or manually update
3. Consider using a managed DNS provider with automatic replication

## 6. Dangling CNAME Records (Subdomain Takeover Risk)

**What happens:** A CNAME points to a hostname that no longer exists. An attacker can register that hostname and take over your subdomain.

**Security impact:** Critical. Attackers can:

- Host malicious content on your subdomain
- Steal cookies scoped to your domain
- Conduct phishing attacks with your domain's reputation

**How to detect:**

1. List all CNAME records
2. For each one, check if the target hostname resolves
3. If you get NXDOMAIN, you have a dangling CNAME

**Common scenarios:**

- Decommissioned cloud services (S3 buckets, Azure apps, GitHub Pages)
- Expired SaaS trial accounts
- Removed CDN endpoints

**Fix:**

1. Delete the CNAME record immediately
2. If you need the subdomain, update it to point to a valid target
3. Audit CNAMEs regularly—at least quarterly

## 7. Missing or Invalid DKIM Records

**What happens:** Emails fail DKIM authentication. Receiving servers can't verify message integrity.

**How to detect:**

1. Get your DKIM selector from your email provider
2. Query: \`selector._domainkey.yourdomain.com\`
3. If you get NXDOMAIN or malformed data, the record is missing or broken

**Common problems:**

- Wrong selector (e.g., \`google\` vs \`google._domainkey\`)
- Record truncated (long TXT records split incorrectly)
- Key rotated but new key not published

**Fix:**

1. Verify the exact selector your email provider uses
2. Regenerate and republish DKIM records if needed
3. For long keys, ensure your DNS provider supports multi-string TXT records

## 8. Missing DMARC Record

**What happens:** No policy for handling email authentication failures. You don't receive reports about who's sending email as your domain.

**How to detect:**

Query: \`_dmarc.yourdomain.com\`

If you get NXDOMAIN, you don't have DMARC.

**Why this matters:**

- No visibility into spoofing attempts
- No policy enforcement
- Harder to troubleshoot email delivery

**Fix:** Add a DMARC record. Start with monitoring:

\`\`\`
v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com
\`\`\`

## 9. Excessively High TTL Values

**What happens:** DNS changes take too long to propagate. If you need to make an emergency change, you're stuck waiting.

**How to detect:**

Query your records and check TTL values. If they're 86400 (1 day) or higher, changes will be slow.

**Trade-offs:**

| TTL | Propagation | Cache Efficiency |
|-----|-------------|------------------|
| 300 (5 min) | Fast | Low |
| 3600 (1 hour) | Moderate | Good |
| 86400 (1 day) | Slow | High |

**Fix:**

- Use 3600 seconds for most production records
- Lower TTL before planned changes (24-48 hours ahead)
- Consider lower TTLs for records that change frequently

## 10. Missing CAA Records

**What happens:** Any certificate authority can issue SSL certificates for your domain. An attacker who compromises a CA could get a valid cert for your domain.

**How to detect:**

Query CAA records for your domain. If you get no results, you don't have CAA.

**Why this matters:**

CAA (Certificate Authority Authorization) tells CAs which ones are allowed to issue certs for your domain. Without it, any CA can.

**Fix:** Add CAA records for your authorized CAs:

\`\`\`
example.com. CAA 0 issue "letsencrypt.org"
example.com. CAA 0 issue "digicert.com"
example.com. CAA 0 iodef "mailto:security@example.com"
\`\`\`

## 11. Wrong NS Records at Registrar

**What happens:** Your domain points to old or incorrect nameservers. Complete domain outage.

**How to detect:**

1. Check nameservers at your registrar
2. Compare with your actual DNS provider
3. Query your domain globally—if you get SERVFAIL, nameservers may be wrong

**Common causes:**

- DNS provider migration without updating registrar
- Typo in nameserver hostnames
- Nameserver decommissioned by provider

**Fix:** Update nameserver records at your domain registrar to match your current DNS provider.

## 12. Missing Reverse DNS (PTR) Records

**What happens:** Email servers reject your outgoing mail as spam. PTR records map IP addresses back to hostnames.

**How to detect:**

Do a reverse DNS lookup on your mail server's IP address. If it doesn't resolve or doesn't match your hostname, PTR is missing or wrong.

**Why email servers check PTR:**

- Legitimate mail servers usually have PTR records
- Spammers often use IPs without PTR
- It's a basic spam filter heuristic

**Fix:** Contact your hosting provider or ISP to configure PTR records. You typically can't set these yourself.

## 13. Wildcard Records Causing Unexpected Matches

**What happens:** A wildcard record (\`*.example.com\`) matches subdomains you didn't intend.

**How to detect:**

1. Query a random subdomain that shouldn't exist
2. If you get a response (instead of NXDOMAIN), you have a wildcard

**Problems caused:**

- Subdomain enumeration becomes impossible
- Security scanners return false positives
- Unexpected behavior for typos

**Fix:**

- Remove wildcard if not needed
- If needed, explicitly create records for known subdomains (explicit records take precedence over wildcards)

## 14. TXT Record Formatting Errors

**What happens:** SPF, DKIM, DMARC, or verification records fail because of formatting issues.

**Common mistakes:**

- Missing quotes around long strings
- Incorrect escaping of special characters
- Trailing whitespace
- Multiple TXT records instead of one with multiple strings

**How to detect:**

Query TXT records and carefully check formatting. Use a validator for SPF, DKIM, and DMARC.

**Fix:**

- Follow the exact format your service requires
- For long records, use multiple quoted strings:
  \`\`\`
  "v=spf1 include..." "...more includes... -all"
  \`\`\`

## 15. Expired or Suspended Domain

**What happens:** Your domain stops resolving entirely. All services fail.

**How to detect:**

1. WHOIS lookup shows expired status
2. All DNS queries fail with SERVFAIL or REFUSED
3. Registrar sends warning emails (check spam folder)

**Common causes:**

- Missed renewal payment
- Outdated payment method
- Email notifications going to spam or wrong address

**Fix:**

1. Renew immediately if within grace period
2. Enable auto-renewal
3. Set up domain monitoring alerts
4. Keep registrar contact email current

## How to Audit Your DNS Configuration

Here's a systematic approach to finding misconfigurations:

### Step 1: Check Core Records

Use ReviewMyDNS to query:
- A and AAAA (web traffic)
- MX (email routing)
- NS (nameservers)
- TXT (SPF, DMARC, verifications)

### Step 2: Check Email Authentication

Query:
- SPF: TXT at root domain
- DKIM: TXT at each \`selector._domainkey.yourdomain.com\`
- DMARC: TXT at \`_dmarc.yourdomain.com\`

### Step 3: Check Security Records

Query:
- CAA records
- DNSSEC status (if enabled)

### Step 4: Compare Globally

Use ReviewMyDNS to query from 50+ locations:
- Are results consistent?
- Any SERVFAIL or timeout errors?
- Do all nameservers return the same data?

### Step 5: Inventory Subdomains

List all subdomains and check:
- Do CNAMEs point to valid targets?
- Are there old subdomains that should be removed?
- Any dangling records?

## How ReviewMyDNS Helps Detect Misconfigurations

### Global DNS Propagation Checker
See how your records look from 50+ locations worldwide. Catch inconsistencies between nameservers.

### Record Type Queries
Query all record types (A, AAAA, CNAME, MX, TXT, NS, CAA, SOA) to get complete visibility.

### Email Authentication Checks
Validate SPF, DKIM, and DMARC configuration in one place.

### Historical Tracking
Compare current records to past snapshots. Know when something changed.

## Summary: Your DNS Health Checklist

| Check | What to Look For |
|-------|------------------|
| MX Records | Valid, resolvable hostnames with correct priorities |
| SPF | Single record, under 10 lookups, proper policy |
| DKIM | Records exist for all sending services |
| DMARC | Policy defined, reporting enabled |
| Root Domain | A/AAAA records (not CNAME) |
| CNAMEs | All targets resolve (no dangling) |
| TTLs | Reasonable values (300-86400) |
| CAA | Authorized CAs specified |
| Nameservers | Correct at registrar, consistent responses |
| TXT Formatting | Proper quoting, no truncation |

Run these checks regularly—at least monthly, or before any DNS changes.

**Next step:** [Run a global DNS check](/) to audit your configuration now.

---

## Related Tools

- [Global DNS Checker](/) — Check all record types from 50+ locations
- [DNS Comparison](/compare) — Spot differences between nameservers
- [Security Check](/security) — Validate email and security records
- [Historical Tracking](/history) — Track changes over time

## Related Guides

- [DNS Propagation: How It Actually Works](/blog/dns-propagation-explained) — Understand caching and TTLs
- [DNS History Debugging Guide](/blog/dns-history-debugging) — Use history to troubleshoot outages
- [SPF, DKIM, and DMARC Complete Guide](/blog/spf-dkim-dmarc-guide) — Fix email authentication issues
    `
  },
  {
    slug: "dns-history-debugging",
    title: "How to Use DNS History to Debug Outages and Detect Unauthorized Changes",
    description: "Master DNS troubleshooting with historical data. Learn how to use DNS history to debug outages, detect hijacking, identify unauthorized changes, and maintain audit trails for compliance.",
    publishedDate: "2024-12-23",
    author: "ReviewMyDNS Team",
    category: "Tutorials",
    readTime: "14 min read",
    heroImage: "/blog/dns-history.svg",
    content: `
## Introduction

When something breaks, the first question is always: "What changed?"

For DNS-related issues, the answer is often hidden in history. A record that was modified, a nameserver that was swapped, or an authentication record that was deleted—these changes can cause:

- Website outages,
- Email delivery failures,
- Security incidents.

DNS history tracking lets you:

1. **Debug faster**: Know exactly when and what changed
2. **Restore quickly**: See previous working configurations
3. **Detect threats**: Catch unauthorized modifications
4. **Prove compliance**: Maintain audit trails

This guide shows you how to use DNS history effectively for troubleshooting and security monitoring.

## Part 1: Why DNS History Matters

### The Problem with "It Just Broke"

DNS issues are frustrating because they often appear suddenly with no obvious cause:

- "The website was working this morning."
- "Emails started bouncing an hour ago."
- "Some users can access the site, others can't."

Without history, you're guessing. With history, you can:

1. Identify the exact moment the problem started
2. See what the working configuration looked like
3. Understand if the change was intentional or not

### Common Scenarios Where History Helps

| Scenario | What History Reveals |
|----------|---------------------|
| Website outage | A/CNAME record changed |
| Email bouncing | MX or SPF record modified |
| Intermittent access | Inconsistent changes across nameservers |
| Security incident | Unauthorized record modification |
| Compliance audit | Full change log with timestamps |

## Part 2: Debugging Outages with DNS History

### Scenario 1: "The Website Was Working Yesterday"

**Symptoms:** Users report the site is down. You check the server—it's running fine.

**Investigation steps:**

1. **Query current A/AAAA records**
   - Is the IP address correct?
   - Does it match your server?

2. **Compare with historical data**
   - What was the A record yesterday?
   - When did it change?

3. **Check CNAME records**
   - If using a CDN, did the CNAME target change?
   - Did someone accidentally delete the CNAME?

4. **Examine nameserver records**
   - Did the NS records change at the registrar?
   - Are nameservers responding correctly?

**Common root causes:**

- Accidental record deletion
- IP address update with wrong value
- DNS provider migration incomplete
- Domain expired and nameservers removed

**Resolution:** Once you identify what changed, either:
- Revert to the previous (working) configuration
- Fix the new configuration if the change was intentional but incorrect

### Scenario 2: "Email Suddenly Stopped Working"

**Symptoms:** Emails are bouncing with "no MX record" or landing in spam. DMARC reports show authentication failures.

**Investigation steps:**

1. **Check MX record history**
   - Did the mail server hostname change?
   - Were priorities modified?
   - Was the MX record deleted?

2. **Review SPF record changes**
   - Was a new include added that broke the 10-lookup limit?
   - Was an authorized sender removed?
   - Was the SPF record accidentally deleted?

3. **Verify DKIM records**
   - Did someone rotate keys without publishing the new public key?
   - Was the selector changed?

4. **Examine DMARC history**
   - Did the policy change from none to reject?
   - Were reporting addresses modified?

**Common root causes:**

- MX record typo or deletion
- SPF record exceeding lookup limit after adding new service
- DKIM key rotation without DNS update
- DMARC policy tightened before SPF/DKIM were fully configured

### Scenario 3: "Some Users Can Access, Others Can't"

**Symptoms:** Complaints from specific geographic regions or ISPs. Intermittent failures.

**Investigation steps:**

1. **Query from multiple global locations**
   - Are all locations returning the same answer?
   - Do some locations show NXDOMAIN or old values?

2. **Compare nameserver responses**
   - Are all authoritative nameservers in sync?
   - Did one nameserver get updated but not others?

3. **Check propagation timeline**
   - Was a recent change made?
   - Is it still propagating (check TTL)?

4. **Review historical consistency**
   - Were the records ever consistent?
   - When did the discrepancy start?

**Common root causes:**

- Zone transfer failure between primary and secondary nameservers
- Change made on one nameserver without replication
- Partial DNS provider migration
- Cached stale records with high TTL

## Part 3: Security Monitoring with DNS History

### Detecting DNS Hijacking

DNS hijacking occurs when an attacker modifies your DNS records to redirect traffic to their servers.

**Warning signs in history:**

1. **Unexpected A/AAAA record changes**
   - IP address changed to an unknown address
   - Change happened outside business hours
   - No corresponding change ticket or documentation

2. **Nameserver modifications**
   - NS records changed without authorization
   - New nameservers belong to unknown provider

3. **MX record tampering**
   - Mail routed to attacker-controlled server
   - Enables email interception

**How to investigate:**

1. Pull DNS history for the past 30 days
2. Identify all record changes
3. Correlate with your change management logs
4. Flag any changes that weren't authorized

### Detecting Subdomain Takeover Risk

Subdomain takeover happens when a CNAME points to an expired or unclaimed resource.

**What history reveals:**

1. **CNAME targets that stopped resolving**
   - Target hostname returns NXDOMAIN
   - Attacker can register the target and control your subdomain

2. **Decommissioned services**
   - GitHub Pages removed but CNAME remains
   - S3 bucket deleted but DNS record exists
   - Azure/Heroku app removed

**Proactive monitoring:**

- Regularly check all CNAME records
- Verify each target still resolves
- Compare against service inventory
- Delete orphaned CNAMEs immediately

### Building an Unauthorized Change Detection System

To catch unauthorized changes automatically:

1. **Baseline your DNS**
   - Document all current records
   - Store as your "known good" state

2. **Monitor for changes**
   - Query records regularly (daily or more)
   - Compare against baseline

3. **Alert on unexpected changes**
   - Any change not in baseline triggers review
   - Correlate with change tickets

4. **Investigate and remediate**
   - Determine if change was authorized
   - Revert if unauthorized
   - Update baseline if legitimate

## Part 4: Building Your DNS Audit Trail

### Why Audit Trails Matter

Organizations need DNS audit trails for:

- **Compliance**: SOC 2, ISO 27001, PCI-DSS require change documentation
- **Incident response**: Forensic analysis during security incidents
- **Accountability**: Know who changed what and when
- **Troubleshooting**: Debug issues faster with historical context

### What to Track

For each DNS record, capture:

| Field | Description |
|-------|-------------|
| Timestamp | When the change occurred |
| Record type | A, AAAA, CNAME, MX, TXT, etc. |
| Hostname | The name being changed |
| Old value | Previous record value |
| New value | New record value |
| Old TTL | Previous TTL |
| New TTL | New TTL |
| Source | How detected (provider logs, monitoring) |

### Sample Change Log Format

\`\`\`
Date: 2024-12-20 14:32:00 UTC
Domain: example.com
Record: A @ 
Action: Modified
Old Value: 192.0.2.1 (TTL 3600)
New Value: 198.51.100.1 (TTL 300)
Source: Cloudflare API audit log
Authorized: Yes (Ticket #1234)
Reason: Server migration to new datacenter
\`\`\`

### Integrating with Change Management

Link DNS changes to your ticketing system:

1. **Require tickets for changes**
   - No DNS change without documented approval
   - Include expected values and rollback plan

2. **Log ticket references**
   - Each DNS change includes ticket number
   - Easy to trace authorization

3. **Periodic reconciliation**
   - Compare DNS history with ticket log
   - Flag undocumented changes for review

## Part 5: Practical DNS History Workflows

### Workflow 1: Post-Incident Analysis

After an outage:

1. **Establish timeline**
   - When did users first report issues?
   - When was the incident resolved?

2. **Pull DNS history for that window**
   - What records changed during the incident?
   - What changed just before the incident started?

3. **Identify root cause**
   - Was a DNS change the cause?
   - Or did DNS change as part of the resolution?

4. **Document and improve**
   - Update runbooks with findings
   - Implement monitoring to prevent recurrence

### Workflow 2: Proactive Security Review

Monthly security audit:

1. **Export all DNS records**
   - Full zone dump as of today

2. **Compare with previous month**
   - What changed?
   - Were all changes authorized?

3. **Validate critical records**
   - MX, SPF, DKIM, DMARC unchanged?
   - A records still point to your servers?

4. **Check for orphaned records**
   - Do all CNAMEs resolve?
   - Are there old subdomains to remove?

### Workflow 3: Pre-Migration Checklist

Before DNS provider migration:

1. **Export complete zone**
   - All records, types, and TTLs

2. **Document current state**
   - Screenshot or export from old provider
   - This is your rollback reference

3. **Verify after migration**
   - Compare new provider responses to old
   - Use history to confirm nothing was lost

4. **Monitor for 72 hours**
   - Track any propagation issues
   - Compare global responses to expected values

## How ReviewMyDNS Helps with DNS History

### Global Propagation Snapshots

Query your domain from 50+ locations and see:
- Current values everywhere
- Discrepancies between regions
- TTL information for propagation timing

### Record Comparison

Compare DNS responses between:
- Different times (before vs after)
- Different nameservers
- Different global locations

### Historical Tracking

Track changes over time:
- Know when records changed
- See previous values
- Build your audit trail

### Security Checks

Validate critical records:
- Email authentication (SPF, DKIM, DMARC)
- Certificate authorization (CAA)
- DNSSEC status

## Summary: Your DNS History Best Practices

### For Debugging

1. Always check DNS history first when troubleshooting
2. Correlate DNS changes with incident timelines
3. Compare current values with known working state
4. Query from multiple global locations

### For Security

1. Baseline all DNS records
2. Monitor for unauthorized changes
3. Alert on unexpected modifications
4. Review all changes monthly

### For Compliance

1. Maintain complete change logs
2. Link changes to authorization tickets
3. Document who, what, when, and why
4. Keep historical records for audit periods

DNS history is your debugging superpower. When something breaks, history tells you what changed. When you need to prove compliance, history provides the audit trail. When you suspect an attack, history reveals the evidence.

**Next step:** [Start tracking your DNS changes](/history) now—before you need the history.

---

## Related Tools

- [Historical Tracking](/history) — Monitor DNS changes over time
- [DNS Comparison](/compare) — Compare current vs past configurations
- [Security Check](/security) — Detect unauthorized email record changes
- [Global DNS Checker](/) — Verify current propagation status

## Related Guides

- [DNS Propagation: How It Actually Works](/blog/dns-propagation-explained) — Understand how caching affects what you see
- [15 Common DNS Misconfigurations](/blog/common-dns-misconfigurations) — Know what to look for in your audit
- [How to Move DNS Providers Without Downtime](/blog/dns-migration-checklist) — Use history to verify migrations
    `
  },
  {
    slug: "how-to-read-dns-records",
    title: "How to Read DNS Records: A Beginner's Reference Guide",
    description: "Learn what each DNS record type means, when you need it, and how to interpret lookup results. A practical reference for A, AAAA, CNAME, MX, TXT, NS, SOA, CAA, and more.",
    publishedDate: "2024-12-23",
    author: "ReviewMyDNS Team",
    category: "DNS Basics",
    readTime: "10 min read",
    heroImage: "/blog/dns-basics.svg",
    content: `
## Introduction

DNS records are the instructions that tell the internet how to find your website, where to send your email, and how to verify your domain. But if you've ever looked at raw DNS output, it can seem like a foreign language.

This guide is a practical reference for reading and understanding DNS records. We'll cover:

- What each common record type means,
- When you'd use each one,
- How to interpret lookup results,
- What to look for when something's wrong.

By the end, you'll be able to look at any DNS lookup result and understand exactly what it's telling you.

## The Anatomy of a DNS Record

Every DNS record has the same basic structure:

\`\`\`
name    TTL    class    type    value
\`\`\`

**Example:**

\`\`\`
example.com.    300    IN    A    93.184.216.34
\`\`\`

**Breaking it down:**

| Field | Example | Meaning |
|-------|---------|---------|
| Name | example.com. | The domain or hostname this record is for |
| TTL | 300 | Time To Live—how long to cache (in seconds) |
| Class | IN | Internet class (almost always "IN") |
| Type | A | The record type (A, MX, CNAME, etc.) |
| Value | 93.184.216.34 | The data returned for this record |

The trailing dot after the domain name indicates it's a fully qualified domain name (FQDN). You'll often see this in raw DNS output.

## A Record (Address Record)

**Purpose:** Maps a domain name to an IPv4 address.

**Example:**

\`\`\`
example.com.    300    IN    A    93.184.216.34
\`\`\`

**What it means:**
- When someone requests example.com, DNS returns this IP address.
- This is how browsers know which server to connect to.

**Common uses:**
- Pointing your domain to your web server
- Pointing subdomains (api.example.com, app.example.com) to specific servers

**What to check:**
- Is the IP correct for your server?
- If you have multiple A records, are they all valid? (Load balancing or redundancy)
- After a migration, are you seeing the new IP yet?

## AAAA Record (IPv6 Address)

**Purpose:** Maps a domain name to an IPv6 address.

**Example:**

\`\`\`
example.com.    300    IN    AAAA    2606:2800:220:1:248:1893:25c8:1946
\`\`\`

**What it means:**
- Same as an A record, but for the newer IPv6 protocol.
- Devices that support IPv6 may prefer these.

**Do you need it?**
- If your server has an IPv6 address, adding AAAA records helps with performance and future-proofing.
- If you don't have IPv6, it's fine to omit these.

## CNAME Record (Canonical Name)

**Purpose:** Creates an alias—points one name to another name.

**Example:**

\`\`\`
www.example.com.    300    IN    CNAME    example.com.
\`\`\`

**What it means:**
- "www.example.com is an alias for example.com"
- DNS will then look up example.com to get the actual IP.

**Common uses:**
- Making www.example.com point to example.com
- Pointing to CDN or SaaS provider hostnames (e.g., mysite.cdn.provider.com)

**Important rules:**
- A CNAME cannot coexist with other records at the same name.
- You can't put a CNAME at the root domain (example.com)—only on subdomains.
- Some providers use "CNAME flattening" or "ALIAS" records to work around this.

**What to check:**
- Is the target hostname correct?
- Does the target actually resolve?
- Watch for CNAME chains (CNAME → CNAME → CNAME)—too many can slow things down.

## MX Record (Mail Exchange)

**Purpose:** Specifies which mail servers accept email for your domain.

**Example:**

\`\`\`
example.com.    3600    IN    MX    10 mail.example.com.
example.com.    3600    IN    MX    20 backup-mail.example.com.
\`\`\`

**What it means:**
- Email for example.com should be sent to mail.example.com.
- The number (10, 20) is the priority—lower is preferred.
- If mail.example.com is unavailable, try backup-mail.example.com.

**Common uses:**
- Pointing to your email provider (Google Workspace, Microsoft 365, etc.)
- Setting up backup mail servers

**What to check:**
- Are the hostnames correct for your email provider?
- Do the hostnames resolve to valid IP addresses?
- Are priorities set correctly (primary should have lowest number)?

## TXT Record (Text)

**Purpose:** Stores arbitrary text data, often used for verification and email security.

**Example:**

\`\`\`
example.com.    300    IN    TXT    "v=spf1 include:_spf.google.com ~all"
\`\`\`

**Common uses:**

### SPF (Sender Policy Framework)
Tells receiving mail servers which IPs are allowed to send email for your domain.

\`\`\`
"v=spf1 include:_spf.google.com include:sendgrid.net ~all"
\`\`\`

### DKIM (DomainKeys Identified Mail)
Published at a specific selector subdomain (e.g., selector1._domainkey.example.com).

\`\`\`
"v=DKIM1; k=rsa; p=MIGfMA0G..."
\`\`\`

### DMARC (Domain-based Message Authentication)
Published at _dmarc.example.com. Tells receivers how to handle failed SPF/DKIM.

\`\`\`
"v=DMARC1; p=quarantine; rua=mailto:reports@example.com"
\`\`\`

### Domain verification
Services like Google, Microsoft, Mailchimp ask you to add TXT records to prove you own the domain.

\`\`\`
"google-site-verification=abc123xyz..."
\`\`\`

**What to check:**
- Is the SPF record valid? (Use our [Security Check](/security) to validate)
- Only one SPF record per domain (multiple causes failures)
- Are DKIM selectors correctly published?
- Is DMARC set up and reporting to you?

## NS Record (Name Server)

**Purpose:** Specifies which DNS servers are authoritative for your domain.

**Example:**

\`\`\`
example.com.    86400    IN    NS    ns1.dnsprovider.com.
example.com.    86400    IN    NS    ns2.dnsprovider.com.
\`\`\`

**What it means:**
- "For example.com, ask ns1.dnsprovider.com or ns2.dnsprovider.com for answers."
- These are set at your domain registrar and tell the world where to find your DNS.

**What to check:**
- Do these match what your DNS provider expects?
- After a migration, are the old NS records still showing? (Propagation in progress)
- Having at least 2 NS records is standard for redundancy.

## SOA Record (Start of Authority)

**Purpose:** Contains metadata about the DNS zone.

**Example:**

\`\`\`
example.com.    86400    IN    SOA    ns1.dnsprovider.com. admin.example.com. (
                              2024122301 ; Serial
                              7200       ; Refresh
                              3600       ; Retry
                              1209600    ; Expire
                              86400 )    ; Minimum TTL
\`\`\`

**What it means:**

| Field | Example | Meaning |
|-------|---------|---------|
| Primary NS | ns1.dnsprovider.com | Primary nameserver for the zone |
| Admin email | admin.example.com | Hostmaster email (@ becomes .) |
| Serial | 2024122301 | Zone version number (changes on updates) |
| Refresh | 7200 | How often secondary servers check for updates |
| Retry | 3600 | Retry interval if refresh fails |
| Expire | 1209600 | When secondary stops serving if it can't reach primary |
| Minimum TTL | 86400 | Default negative caching TTL |

**What to check:**
- Serial number should increase with each change (some providers auto-manage this).
- SOA exists at the root of your domain—if it's missing, something is seriously wrong.

## CAA Record (Certification Authority Authorization)

**Purpose:** Specifies which Certificate Authorities (CAs) can issue SSL certificates for your domain.

**Example:**

\`\`\`
example.com.    300    IN    CAA    0 issue "letsencrypt.org"
example.com.    300    IN    CAA    0 issuewild "letsencrypt.org"
example.com.    300    IN    CAA    0 iodef "mailto:security@example.com"
\`\`\`

**What it means:**
- Only Let's Encrypt can issue certificates for this domain.
- \`issue\` controls regular certs, \`issuewild\` controls wildcard certs.
- \`iodef\` specifies where to send violation reports.

**Do you need it?**
- CAA is optional but recommended for security.
- If you don't have CAA records, any CA can issue certs for your domain.

**What to check:**
- Does your CAA record include your actual CA? (Let's Encrypt, DigiCert, Sectigo, etc.)
- If SSL cert issuance is failing, check if CAA is blocking it.

## PTR Record (Pointer / Reverse DNS)

**Purpose:** Maps an IP address back to a domain name (reverse of A record).

**Example:**

\`\`\`
34.216.184.93.in-addr.arpa.    86400    IN    PTR    example.com.
\`\`\`

**What it means:**
- "The IP 93.184.216.34 belongs to example.com."
- Used for reverse lookups, especially in email (receiving servers check if your sending IP has a PTR).

**Where it's configured:**
- PTR records are managed by whoever controls the IP address—usually your hosting provider.
- You typically request this through your host's control panel.

**What to check:**
- If sending email from your own server, PTR should resolve to your mail hostname.
- Mismatched or missing PTR can cause email deliverability issues.

## SRV Record (Service)

**Purpose:** Specifies the location of specific services (hostname and port).

**Example:**

\`\`\`
_sip._tcp.example.com.    300    IN    SRV    10 5 5060 sipserver.example.com.
\`\`\`

**Format breakdown:**
\`\`\`
_service._protocol.domain.    TTL    IN    SRV    priority weight port target
\`\`\`

**Common uses:**
- VoIP/SIP services
- XMPP/Jabber messaging
- LDAP directory services
- Microsoft services (like Skype for Business)

**What to check:**
- Service name and protocol match what's expected (_sip._tcp, _xmpp-client._tcp, etc.)
- Target hostname resolves correctly
- Port number matches the service's expected port

## Reading Lookup Results: What to Look For

When you [run a DNS lookup](/), here's what to check:

### Consistency across locations
- Do all servers return the same values?
- If not, propagation may still be in progress.

### Expected values
- Is the IP address what you expect?
- Are MX records pointing to your actual mail provider?
- Are TXT records complete and properly formatted?

### Response status
- **NOERROR:** Record found successfully.
- **NXDOMAIN:** Domain or subdomain doesn't exist.
- **SERVFAIL:** Server error—often DNSSEC issues or misconfigured nameservers.
- **REFUSED:** Server refused to answer (shouldn't happen for your own domain).

### TTL values
- Very low TTLs (60–300) = Records refresh quickly, good for changes.
- Very high TTLs (86400) = Cached for a day, changes take longer to propagate.

## Common Patterns You'll See

### Website hosting
\`\`\`
example.com.        A      93.184.216.34
www.example.com.    CNAME  example.com.
\`\`\`

### Email with Google Workspace
\`\`\`
example.com.    MX    1 aspmx.l.google.com.
example.com.    MX    5 alt1.aspmx.l.google.com.
example.com.    TXT   "v=spf1 include:_spf.google.com ~all"
\`\`\`

### CDN setup (Cloudflare, etc.)
\`\`\`
example.com.        A      104.21.45.67        (Cloudflare IP)
example.com.        AAAA   2606:4700:3030::...  (Cloudflare IPv6)
\`\`\`

### Subdomain delegation
\`\`\`
blog.example.com.    NS    ns1.blogprovider.com.
blog.example.com.    NS    ns2.blogprovider.com.
\`\`\`

## Summary

| Record | Purpose | Example Use |
|--------|---------|-------------|
| A | IPv4 address | Point domain to web server |
| AAAA | IPv6 address | IPv6 connectivity |
| CNAME | Alias | www → root, or → CDN |
| MX | Mail servers | Route email to provider |
| TXT | Text data | SPF, DKIM, DMARC, verification |
| NS | Nameservers | Delegation to DNS provider |
| SOA | Zone metadata | Zone info and serial |
| CAA | SSL authorization | Restrict which CAs can issue certs |
| PTR | Reverse DNS | IP → hostname lookup |
| SRV | Service location | VoIP, messaging services |

Now that you know how to read DNS records, you can confidently interpret any lookup result—and quickly spot problems.

**Next step:** [Run a DNS lookup](/) now and see exactly what's configured for your domain.

---

## Related Tools

- [Global DNS Checker](/) — Check any record type from 50+ locations
- [Security Check](/security) — Validate SPF, DKIM, DMARC, and CAA
- [DNS Comparison](/compare) — Compare records between two providers

## Related Guides

- [DNS Propagation: How It Actually Works](/blog/dns-propagation-explained) — Understand TTLs and caching
- [SPF, DKIM, and DMARC Complete Guide](/blog/spf-dkim-dmarc-guide) — Deep dive into email authentication
- [15 Common DNS Misconfigurations](/blog/common-dns-misconfigurations) — Know what errors to watch for
    `
  }
];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find(article => article.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogArticles.map(article => article.slug);
}
