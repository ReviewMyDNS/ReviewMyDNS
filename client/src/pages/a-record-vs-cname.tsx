import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield, Database, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function ARecordVsCname() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>A Record vs CNAME: What's the Difference? (2026 Guide) | ReviewMyDNS</title>
        <meta name="description" content="What's the difference between an A record and a CNAME? A records point to IP addresses, CNAMEs point to other domain names. Learn when to use each, root domain restrictions, and real-world examples." />
        <meta name="keywords" content="a record vs cname, difference between a record and cname, when to use cname vs a record, dns a record, dns cname record, cname vs a record" />
        <link rel="canonical" href="https://reviewmydns.com/a-record-vs-cname" />
        <meta property="og:title" content="A Record vs CNAME: What's the Difference? (2026 Guide) | ReviewMyDNS" />
        <meta property="og:description" content="A records point to IP addresses, CNAMEs point to other domain names. Learn the key differences, when to use each, and common mistakes to avoid." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/a-record-vs-cname" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is the difference between an A record and a CNAME?", "acceptedAnswer": { "@type": "Answer", "text": "An A record maps a domain name directly to an IPv4 address (e.g., example.com → 93.184.216.34). A CNAME record maps a domain name to another domain name as an alias (e.g., www.example.com → example.com). The key difference is that A records resolve to a final IP address, while CNAMEs create a chain that must eventually resolve to an A or AAAA record." } },
            { "@type": "Question", "name": "Can I use a CNAME record on a root domain?", "acceptedAnswer": { "@type": "Answer", "text": "No. According to RFC 1034 and RFC 2181, a CNAME record cannot coexist with other record types at the same hostname. Since root domains (zone apex) require SOA and NS records, placing a CNAME there would violate the DNS specification. Some providers offer workarounds like ALIAS records (DNSimple), ANAME records (DNS Made Easy), or CNAME flattening (Cloudflare) to achieve similar functionality at the root domain." } },
            { "@type": "Question", "name": "When should I use an A record vs a CNAME?", "acceptedAnswer": { "@type": "Answer", "text": "Use an A record when: you need to point your root domain (example.com) to a server, you know the exact IP address, or you need the best possible DNS lookup performance. Use a CNAME when: you're configuring subdomains (www, blog, shop), connecting to cloud services like Vercel, Netlify, or AWS that provide hostnames instead of static IPs, or when you want DNS changes managed by a third-party service automatically." } },
            { "@type": "Question", "name": "Does a CNAME record affect performance?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, slightly. A CNAME adds an extra DNS lookup step because the resolver must first resolve the CNAME to find the target domain, then resolve that target domain to get the final IP address. This adds a few milliseconds to the initial connection. However, DNS resolvers cache both lookups, so the performance impact is negligible for most websites after the first visit." } },
            { "@type": "Question", "name": "What is CNAME flattening?", "acceptedAnswer": { "@type": "Answer", "text": "CNAME flattening is a technique used by DNS providers like Cloudflare to allow CNAME-like behavior at the root domain (zone apex). Instead of returning a CNAME response, the DNS provider resolves the CNAME chain internally and returns the final A/AAAA record directly. This gives you the flexibility of a CNAME with the compatibility of an A record at the root domain." } },
            { "@type": "Question", "name": "Can I have a CNAME and MX record on the same subdomain?", "acceptedAnswer": { "@type": "Answer", "text": "No. The DNS specification states that a CNAME record must be the only record at a given hostname. If you place a CNAME on a subdomain, you cannot also have MX, TXT, A, or any other record types on that same subdomain. If you need email (MX records) on a subdomain, use an A record instead of a CNAME." } },
            { "@type": "Question", "name": "What DNS record should I use for Vercel, Netlify, or GitHub Pages?", "acceptedAnswer": { "@type": "Answer", "text": "For subdomains (like www.example.com), use a CNAME record pointing to the provider's hostname (e.g., cname.vercel-dns.com for Vercel, your-site.netlify.app for Netlify, username.github.io for GitHub Pages). For root domains (example.com), use an A record pointing to the provider's IP address, or use ALIAS/CNAME flattening if your DNS provider supports it." } }
          ]
        }) }} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Logo size="sm" className="mr-2" />
                <span className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</span>
              </div>

              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Pricing
                </Link>
              </nav>

              <div className="flex items-center space-x-2">
                <Link href="/signin">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                    Sign In
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 hidden sm:inline-flex">
                    Upgrade
                  </Button>
                </Link>
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              A Record vs CNAME: What's the Difference?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              An <strong>A record</strong> points a domain to an IP address. A <strong>CNAME</strong> points a domain to another domain name. Understanding when to use each is essential for proper DNS configuration.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Database className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">A Record → IP</h3>
                  <p className="text-sm text-gray-600">Maps directly to an IPv4 address</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <RefreshCw className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">CNAME → Domain</h3>
                  <p className="text-sm text-gray-600">Aliases one domain to another</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Root Domain</h3>
                  <p className="text-sm text-gray-600">Only A records work at the apex</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Performance</h3>
                  <p className="text-sm text-gray-600">A records resolve in one step</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <DnsLookupForm onLookupComplete={handleLookupComplete} isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
        </section>

        {lookupResults && (
          <>
            <section className="pb-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <PropagationMap results={lookupResults.results || []} />
              </div>
            </section>

            <section className="pb-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <ResultsTable results={lookupResults} />
              </div>
            </section>
          </>
        )}

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <CheckCircle2 className="h-6 w-6 text-blue-600 mr-2" />
                Quick Answer
              </h2>
              <p className="text-gray-700 text-lg">
                An <strong>A record</strong> maps a domain name directly to an <strong>IPv4 address</strong> (e.g., <code className="bg-gray-100 px-1 rounded">example.com → 93.184.216.34</code>). A <strong>CNAME record</strong> maps a domain name to <strong>another domain name</strong> as an alias (e.g., <code className="bg-gray-100 px-1 rounded">www.example.com → example.com</code>). Use A records for root domains and when you know the server IP. Use CNAMEs for subdomains and cloud services that provide hostnames instead of static IPs.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">A Record vs CNAME: Side-by-Side Comparison</h2>
            <p className="text-gray-700 mb-4">
              The table below highlights the key differences between A records and CNAME records. Understanding these differences will help you choose the right record type for every DNS configuration scenario.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Feature</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">A Record</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">CNAME Record</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">What it stores</td>
                    <td className="py-3 px-4">An IPv4 address (e.g., 93.184.216.34)</td>
                    <td className="py-3 px-4">Another domain name (e.g., example.com)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Root domain support</td>
                    <td className="py-3 px-4">✅ Yes — required for zone apex</td>
                    <td className="py-3 px-4">❌ No — violates RFC at root domain</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Subdomain support</td>
                    <td className="py-3 px-4">✅ Yes</td>
                    <td className="py-3 px-4">✅ Yes — most common use case</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">DNS lookup steps</td>
                    <td className="py-3 px-4">1 step — resolves directly to IP</td>
                    <td className="py-3 px-4">2+ steps — resolves alias, then target IP</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Performance</td>
                    <td className="py-3 px-4">Slightly faster (direct resolution)</td>
                    <td className="py-3 px-4">Slightly slower (extra lookup)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Can coexist with other records</td>
                    <td className="py-3 px-4">✅ Yes — with MX, TXT, NS, etc.</td>
                    <td className="py-3 px-4">❌ No — must be the only record at that name</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">IP changes</td>
                    <td className="py-3 px-4">Must update manually if IP changes</td>
                    <td className="py-3 px-4">Automatically follows target domain's IP</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Best for</td>
                    <td className="py-3 px-4">Root domains, static servers, email</td>
                    <td className="py-3 px-4">Subdomains, CDNs, cloud platforms</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">When to Use an A Record</h2>
            <p className="text-gray-700 mb-4">
              A records are the most fundamental DNS record type. They directly map a domain name to an IPv4 address, making them the simplest and most performant option. Here are the scenarios where an A record is the right choice:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Root Domain (Zone Apex)
                </h3>
                <p className="text-gray-700">If you need <code className="bg-gray-100 px-1 rounded">example.com</code> (without www) to point to your server, you must use an A record. CNAME records are not allowed at the zone apex per the DNS specification. This is the most common reason to use an A record.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Known Static IP Address
                </h3>
                <p className="text-gray-700">When your server has a fixed IP address that rarely changes (like a dedicated server or VPS), an A record is the most straightforward option. You know the IP, so there's no need for the indirection a CNAME provides.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Performance-Critical Applications
                </h3>
                <p className="text-gray-700">A records resolve in a single DNS lookup, while CNAMEs require at least two lookups. For latency-sensitive applications, the few milliseconds saved by avoiding a CNAME chain can matter at scale. A records also reduce DNS query load on resolvers.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Alongside Email Records
                </h3>
                <p className="text-gray-700">If you need MX, TXT (SPF/DKIM), or other records on the same hostname, you must use an A record—not a CNAME. The DNS specification prohibits CNAME records from coexisting with other record types at the same name.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">When to Use a CNAME Record</h2>
            <p className="text-gray-700 mb-4">
              CNAME records are ideal when you want a domain name to follow another domain's IP address automatically. They're the go-to choice for subdomains and cloud service integrations:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  Subdomains (www, blog, shop, app)
                </h3>
                <p className="text-gray-700">The most common use of CNAME records is pointing <code className="bg-gray-100 px-1 rounded">www.example.com</code> to <code className="bg-gray-100 px-1 rounded">example.com</code>. This ensures the www version always resolves to the same IP as the root domain without maintaining two separate A records.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  CDNs and Load Balancers
                </h3>
                <p className="text-gray-700">CDN providers like Cloudflare, AWS CloudFront, and Fastly give you a hostname (e.g., <code className="bg-gray-100 px-1 rounded">d1234.cloudfront.net</code>) instead of a static IP because their infrastructure dynamically routes traffic. A CNAME lets your subdomain follow the CDN's IP addresses automatically as they change.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  Cloud Hosting Platforms
                </h3>
                <p className="text-gray-700">Services like Vercel, Netlify, Heroku, and Render provide dynamic hostnames for your deployments. Using a CNAME record means you never need to update DNS when the platform changes its underlying infrastructure or IP addresses.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  SaaS Domain Verification
                </h3>
                <p className="text-gray-700">Many SaaS platforms ask you to create a CNAME record for custom domain setup and SSL certificate provisioning. This allows the platform to manage the underlying IP routing while you control the domain name.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Why You Can't Use CNAME at the Root Domain</h2>
            <p className="text-gray-700 mb-4">
              This is one of the most frequently asked questions in DNS management. The reason is rooted in the DNS specification itself: <strong>RFC 1034</strong> and <strong>RFC 2181</strong> state that a CNAME record must be the only record at a given hostname. It cannot coexist with any other record type.
            </p>
            <p className="text-gray-700 mb-4">
              The root domain (zone apex) always has at least an <strong>SOA record</strong> and <strong>NS records</strong>—these are required for the DNS zone to function. Since a CNAME would conflict with these mandatory records, placing a CNAME at the root domain violates the DNS specification and causes unpredictable behavior across different resolvers.
            </p>
            <p className="text-gray-700 mb-4">
              To work around this limitation, several DNS providers have created proprietary solutions:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Provider</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Solution</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">How It Works</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Cloudflare</td>
                    <td className="py-3 px-4">CNAME Flattening</td>
                    <td className="py-3 px-4">Resolves the CNAME chain internally and returns the final A/AAAA record to the client</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">DNSimple</td>
                    <td className="py-3 px-4">ALIAS Record</td>
                    <td className="py-3 px-4">Virtual record that resolves the target and returns an A record at the apex</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">DNS Made Easy</td>
                    <td className="py-3 px-4">ANAME Record</td>
                    <td className="py-3 px-4">Similar to ALIAS—resolves the target hostname and serves the IP at the root</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">AWS Route 53</td>
                    <td className="py-3 px-4">Alias Record</td>
                    <td className="py-3 px-4">AWS-specific alias that works at zone apex for CloudFront, ELB, S3, and other AWS services</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">What Is CNAME Flattening?</h2>
            <p className="text-gray-700 mb-4">
              CNAME flattening is a technique pioneered by Cloudflare that solves the root domain CNAME problem. Instead of returning a CNAME response to the client (which would violate RFC at the apex), the DNS provider resolves the entire CNAME chain internally and returns the final A or AAAA record directly.
            </p>
            <p className="text-gray-700 mb-4">
              From the client's perspective, they receive a standard A record response—as if the domain had an A record configured. Behind the scenes, the DNS provider periodically resolves the CNAME target to keep the returned IP address current. This gives you the flexibility of a CNAME (automatic IP following) with the compatibility of an A record at the zone apex.
            </p>
            <p className="text-gray-700 mb-8">
              Cloudflare applies CNAME flattening automatically for all CNAME records at the root domain. Other providers may require you to select an ALIAS or ANAME record type explicitly. Learn more about TTL behavior with these setups in our <Link href="/what-is-ttl-in-dns" className="text-blue-600 hover:underline font-medium">TTL in DNS guide</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common Mistakes to Avoid</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-amber-500 mr-2" />
                  Mistake #1: CNAME at the Root Domain
                </h3>
                <p className="text-gray-700">Adding a CNAME record for <code className="bg-gray-100 px-1 rounded">example.com</code> (without a subdomain) will cause DNS resolution failures for some resolvers. Some DNS providers silently allow this, but it violates the specification and can break email delivery, TXT record lookups, and other services. Use an A record or ALIAS/ANAME record at the root instead.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-amber-500 mr-2" />
                  Mistake #2: CNAME with MX Records on the Same Subdomain
                </h3>
                <p className="text-gray-700">If you have a CNAME on <code className="bg-gray-100 px-1 rounded">mail.example.com</code> and also try to add MX records on the same subdomain, the MX records will be ignored by most resolvers. A CNAME must be the exclusive record at a hostname. If you need email on a subdomain, use an A record instead.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-amber-500 mr-2" />
                  Mistake #3: CNAME Chains (CNAME pointing to another CNAME)
                </h3>
                <p className="text-gray-700">While technically allowed by the DNS specification, chaining multiple CNAMEs together (A → CNAME → CNAME → CNAME → A) adds latency and increases the chance of resolution failure. Each link in the chain requires an additional DNS lookup. Keep CNAME chains to a single level whenever possible.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-amber-500 mr-2" />
                  Mistake #4: Using A Records for Dynamic Cloud Infrastructure
                </h3>
                <p className="text-gray-700">If you hardcode an A record for a cloud platform that changes IPs (like Heroku or some AWS services), your site will go down when the IP changes. Use a CNAME to the platform's provided hostname so DNS automatically follows IP changes without manual intervention.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Real-World DNS Setup Examples</h2>
            <p className="text-gray-700 mb-4">
              Here's how popular platforms recommend configuring DNS records. Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">DNS propagation checker</Link> to verify your records after making changes.
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Vercel</h3>
                <p className="text-gray-700 mb-1"><strong>Root domain:</strong> A record → <code className="bg-gray-100 px-1 rounded">76.76.21.21</code></p>
                <p className="text-gray-700"><strong>www subdomain:</strong> CNAME → <code className="bg-gray-100 px-1 rounded">cname.vercel-dns.com</code></p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Netlify</h3>
                <p className="text-gray-700 mb-1"><strong>Root domain:</strong> A record → <code className="bg-gray-100 px-1 rounded">75.2.60.5</code> (Netlify load balancer)</p>
                <p className="text-gray-700"><strong>www subdomain:</strong> CNAME → <code className="bg-gray-100 px-1 rounded">your-site.netlify.app</code></p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">GitHub Pages</h3>
                <p className="text-gray-700 mb-1"><strong>Root domain:</strong> A records → <code className="bg-gray-100 px-1 rounded">185.199.108.153</code>, <code className="bg-gray-100 px-1 rounded">185.199.109.153</code>, <code className="bg-gray-100 px-1 rounded">185.199.110.153</code>, <code className="bg-gray-100 px-1 rounded">185.199.111.153</code></p>
                <p className="text-gray-700"><strong>www subdomain:</strong> CNAME → <code className="bg-gray-100 px-1 rounded">username.github.io</code></p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Shopify</h3>
                <p className="text-gray-700 mb-1"><strong>Root domain:</strong> A record → <code className="bg-gray-100 px-1 rounded">23.227.38.65</code></p>
                <p className="text-gray-700"><strong>www subdomain:</strong> CNAME → <code className="bg-gray-100 px-1 rounded">shops.myshopify.com</code></p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">AWS (CloudFront / ELB)</h3>
                <p className="text-gray-700 mb-1"><strong>Root domain:</strong> Route 53 Alias record → CloudFront distribution or ELB</p>
                <p className="text-gray-700"><strong>www subdomain:</strong> CNAME → <code className="bg-gray-100 px-1 rounded">d1234abcdef.cloudfront.net</code></p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Performance: A Record vs CNAME</h2>
            <p className="text-gray-700 mb-4">
              Every CNAME record adds an additional DNS lookup to the resolution process. When a resolver encounters a CNAME, it must:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>Query the CNAME record for the requested hostname</li>
              <li>Receive the target domain name from the CNAME response</li>
              <li>Query the A/AAAA record for the target domain</li>
              <li>Return the final IP address to the client</li>
            </ol>
            <p className="text-gray-700 mb-4">
              This extra step adds a few milliseconds to the initial DNS resolution. However, DNS resolvers cache both the CNAME and the target A record independently, so subsequent lookups from the same resolver are instant. For most websites, the performance difference between an A record and a CNAME is negligible—typically 1–5 milliseconds on the first lookup.
            </p>
            <p className="text-gray-700 mb-8">
              Where it matters: High-traffic APIs, latency-sensitive real-time applications, and services processing millions of unique DNS lookups per hour may benefit from eliminating CNAME indirection. For standard websites and applications, prioritize ease of management (CNAME) over the marginal performance gain (A record).
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Related DNS Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link href="/dns-record-types-explained" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">DNS Record Types Explained →</h3>
                  <p className="text-sm text-gray-700">Complete guide to A, AAAA, CNAME, MX, TXT, NS, and other DNS record types.</p>
                </div>
              </Link>
              <Link href="/dns-propagation-checker" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">DNS Propagation Checker →</h3>
                  <p className="text-sm text-gray-700">Check if your A or CNAME record changes have propagated across 50+ global servers.</p>
                </div>
              </Link>
              <Link href="/what-is-ttl-in-dns" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">What Is TTL in DNS? →</h3>
                  <p className="text-sm text-gray-700">Understand how TTL values affect caching and propagation for both A and CNAME records.</p>
                </div>
              </Link>
              <Link href="/how-long-does-dns-propagation-take" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">How Long Does DNS Propagation Take? →</h3>
                  <p className="text-sm text-gray-700">Detailed breakdown of propagation times by record type and provider.</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="mb-2">© {new Date().getFullYear()} ReviewMyDNS. Free DNS propagation checker.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/dns-propagation-checker" className="hover:text-white">DNS Checker</Link>
              <Link href="/dns-record-types-explained" className="hover:text-white">Record Types</Link>
              <Link href="/what-is-ttl-in-dns" className="hover:text-white">TTL Guide</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}