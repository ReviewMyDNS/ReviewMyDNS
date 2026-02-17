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

export default function WhatIsDnsCache() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>What is DNS Cache? How DNS Caching Works (2026) | ReviewMyDNS</title>
        <meta name="description" content="What is DNS cache and how does it work? DNS caching stores domain-to-IP mappings at multiple levels (browser, OS, router, ISP) to speed up browsing. Learn how TTL controls cache duration and how to flush DNS cache." />
        <meta name="keywords" content="what is dns cache, dns caching explained, how dns cache works, dns cache flush, clear dns cache, dns cache poisoning, dns ttl cache" />
        <link rel="canonical" href="https://reviewmydns.com/what-is-dns-cache" />
        <meta property="og:title" content="What is DNS Cache? How DNS Caching Works (2026) | ReviewMyDNS" />
        <meta property="og:description" content="DNS caching stores domain-to-IP mappings to speed up browsing. Learn how it works, why it causes propagation delays, and how to flush your DNS cache on every OS." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/what-is-dns-cache" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is DNS cache?", "acceptedAnswer": { "@type": "Answer", "text": "DNS cache is a temporary storage of DNS lookup results (domain name to IP address mappings) maintained at multiple levels: your web browser, operating system, home router, and ISP's DNS resolver. When you visit a website, the DNS response is cached so that subsequent visits to the same site don't require a full DNS lookup, making browsing faster and reducing load on DNS servers." } },
            { "@type": "Question", "name": "How does DNS caching work?", "acceptedAnswer": { "@type": "Answer", "text": "When you type a domain name in your browser, the system checks for a cached DNS result in this order: browser cache → OS cache → router cache → ISP resolver cache. If a cached entry is found and hasn't expired (based on its TTL value), the cached IP is returned immediately without contacting any DNS servers. If no cache entry exists or it has expired, the ISP resolver queries authoritative DNS servers, caches the result according to the TTL, and returns the IP address." } },
            { "@type": "Question", "name": "How do I flush my DNS cache?", "acceptedAnswer": { "@type": "Answer", "text": "To flush DNS cache: On Windows, open Command Prompt and run 'ipconfig /flushdns'. On macOS, open Terminal and run 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder'. On Linux with systemd, run 'sudo systemd-resolve --flush-caches'. In Google Chrome, navigate to chrome://net-internals/#dns and click 'Clear host cache'. After flushing, your system will perform fresh DNS lookups for all domains." } },
            { "@type": "Question", "name": "What is DNS cache poisoning?", "acceptedAnswer": { "@type": "Answer", "text": "DNS cache poisoning (also called DNS spoofing) is a security attack where a malicious actor inserts forged DNS records into a resolver's cache. When poisoned, the resolver returns a fake IP address for a legitimate domain, redirecting users to malicious websites that may steal credentials or distribute malware. DNSSEC (DNS Security Extensions) was developed to prevent this by cryptographically signing DNS records." } },
            { "@type": "Question", "name": "How long does DNS cache last?", "acceptedAnswer": { "@type": "Answer", "text": "DNS cache duration is controlled by the TTL (Time to Live) value set on each DNS record. Common TTL values range from 300 seconds (5 minutes) to 86400 seconds (24 hours). When the TTL expires, the cached entry is discarded and a fresh lookup is performed. Some ISPs may cache records longer than the specified TTL to reduce their infrastructure load, which can cause propagation delays." } },
            { "@type": "Question", "name": "Why does DNS cache cause propagation delays?", "acceptedAnswer": { "@type": "Answer", "text": "When you change a DNS record, cached copies of the old record don't update immediately. Every DNS resolver that has cached the old record continues serving it until the TTL expires. Since there are thousands of ISP resolvers, corporate DNS servers, and public resolvers worldwide—each with its own independent cache—different locations update at different times, creating what we call 'propagation delay.'" } },
            { "@type": "Question", "name": "When should I flush my DNS cache?", "acceptedAnswer": { "@type": "Answer", "text": "You should flush your DNS cache when: 1) You've recently changed DNS records and want to verify the new settings immediately on your machine. 2) A website you can reach from other devices won't load on your computer. 3) You're getting redirected to an old server or wrong IP address. 4) You're testing DNS changes during a migration. 5) You suspect DNS cache poisoning or corrupted cache entries." } }
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
              What is DNS Cache?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              DNS cache is a <strong>temporary storage of DNS lookup results</strong> that speeds up browsing by avoiding repeated queries. It exists at every level—from your browser to your ISP—and is the primary reason DNS changes don't take effect instantly.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Database className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Stores DNS Results</h3>
                  <p className="text-sm text-gray-600">Domain-to-IP mappings saved locally</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">TTL Controlled</h3>
                  <p className="text-sm text-gray-600">Cache expires based on TTL value</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Multiple Layers</h3>
                  <p className="text-sm text-gray-600">Browser, OS, router, ISP caches</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <RefreshCw className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Flushable</h3>
                  <p className="text-sm text-gray-600">Clear cache to force fresh lookups</p>
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
                <Database className="h-6 w-6 text-blue-600 mr-2" />
                Simple Explanation
              </h2>
              <p className="text-gray-700 text-lg">
                Think of DNS cache like the <strong>contact list on your phone</strong>. Instead of looking up a person's phone number in a directory every time you call them, you save it once and use the saved number for future calls. DNS cache works the same way: your computer saves the IP address of websites you visit so it doesn't have to look them up again. The saved entry expires after a set time (the <Link href="/what-is-ttl-in-dns" className="text-blue-600 hover:underline font-medium">TTL</Link>), ensuring you eventually get updated information.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">Types of DNS Caches</h2>
            <p className="text-gray-700 mb-4">
              DNS caching happens at multiple levels between your browser and the authoritative DNS server. Each layer independently stores DNS results to minimize lookup times. Understanding these layers is key to troubleshooting DNS issues and propagation delays.
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                  Browser DNS Cache
                </h3>
                <p className="text-gray-700">Your web browser (Chrome, Firefox, Safari, Edge) maintains its own DNS cache. When you visit a website, the browser stores the DNS result and reuses it for subsequent requests to the same domain. Chrome's cache can be viewed and cleared at <code className="bg-gray-100 px-1 rounded">chrome://net-internals/#dns</code>. Browser caches typically have shorter lifetimes than OS-level caches.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                  Operating System (OS) DNS Cache
                </h3>
                <p className="text-gray-700">Your operating system maintains a system-wide DNS cache shared by all applications. On Windows, the DNS Client service handles caching. On macOS, <code className="bg-gray-100 px-1 rounded">mDNSResponder</code> manages the cache. On Linux, <code className="bg-gray-100 px-1 rounded">systemd-resolved</code> or <code className="bg-gray-100 px-1 rounded">nscd</code> handle DNS caching. This cache persists even after closing your browser.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                  Router DNS Cache
                </h3>
                <p className="text-gray-700">Most home and office routers cache DNS queries for all devices on the network. When any device on your network looks up a domain, the router stores the result so other devices (or the same device later) get an instant response. Rebooting your router clears this cache.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
                  ISP Recursive Resolver Cache
                </h3>
                <p className="text-gray-700">Your Internet Service Provider operates DNS resolvers that cache lookups for millions of customers. When any customer queries a domain, the ISP caches the result and serves it to all subsequent customers asking for the same domain—until the TTL expires. This is the largest and most impactful DNS cache layer, and the one most responsible for propagation delays.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How DNS Cache Works Step by Step</h2>
            <p className="text-gray-700 mb-4">
              Here's what happens when you type <code className="bg-gray-100 px-1 rounded">www.example.com</code> into your browser for the first time and then visit it again:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Step 1: Browser Checks Its Cache
                </h3>
                <p className="text-gray-700">The browser checks if it has a cached DNS entry for <code className="bg-gray-100 px-1 rounded">www.example.com</code>. On the first visit, the cache is empty, so the request is passed to the operating system.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Step 2: OS Checks Its Cache
                </h3>
                <p className="text-gray-700">The operating system checks its DNS cache and the <code className="bg-gray-100 px-1 rounded">hosts</code> file. If no entry is found, it forwards the query to the configured DNS resolver (usually your router or ISP).</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Step 3: Router Checks Its Cache
                </h3>
                <p className="text-gray-700">If your router has DNS caching enabled, it checks its local cache. If the domain was recently looked up by any device on the network, the cached result is returned. Otherwise, the query is forwarded to the ISP's resolver.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Step 4: ISP Resolver Checks Its Cache
                </h3>
                <p className="text-gray-700">The ISP's recursive resolver checks its cache. If another customer recently looked up the same domain and the TTL hasn't expired, the cached result is returned instantly. If not cached, the resolver performs a full recursive DNS lookup.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Step 5: Full Recursive Lookup (Cache Miss)
                </h3>
                <p className="text-gray-700">On a complete cache miss, the ISP resolver queries root DNS servers → TLD servers (.com) → authoritative nameservers for the domain. The authoritative server returns the IP address along with a TTL value. The resolver caches this result for the duration specified by the TTL.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Step 6: Result Cached at Every Level
                </h3>
                <p className="text-gray-700">The DNS response flows back through each layer, and every layer caches the result independently. Your ISP caches it, your router caches it, your OS caches it, and your browser caches it. The next time you visit the same site, the browser returns the IP instantly from its own cache—no network requests needed.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Why DNS Caching Exists</h2>
            <p className="text-gray-700 mb-4">
              DNS caching is essential for internet performance. Without caching, every single website visit, API call, and email delivery would require a full recursive DNS lookup—a process that involves querying multiple servers across the internet. Here's why caching matters:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Speed</h3>
                <p className="text-gray-700">A cached DNS lookup takes less than 1 millisecond. A full recursive lookup can take 50–200 milliseconds depending on geographic distance to the authoritative servers. For a page that loads 30+ resources from a domain, caching saves hundreds of milliseconds on every page load.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Reduced Server Load</h3>
                <p className="text-gray-700">Root DNS servers handle billions of queries daily. Without caching, the load would be thousands of times higher, making the DNS infrastructure unsustainable. Caching ensures that only unique, expired, or new domain lookups reach the authoritative servers.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Network Efficiency</h3>
                <p className="text-gray-700">Caching reduces the amount of DNS traffic crossing the internet. ISP resolvers serve millions of customers from their local cache, preventing redundant queries from consuming bandwidth on backbone networks.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">DNS Cache and Propagation Delays</h2>
            <p className="text-gray-700 mb-4">
              DNS caching is directly responsible for what we call <Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline font-medium">DNS propagation delays</Link>. When you change a DNS record, every cached copy of the old record across the internet must expire before resolvers fetch the updated value.
            </p>
            <p className="text-gray-700 mb-4">
              Since there are thousands of ISP resolvers, corporate DNS servers, and public resolvers (Google 8.8.8.8, Cloudflare 1.1.1.1, OpenDNS)—each maintaining their own independent cache—different users in different locations see the updated DNS record at different times. This "rolling update" process is what makes DNS propagation appear to take hours.
            </p>
            <p className="text-gray-700 mb-8">
              The <Link href="/what-is-ttl-in-dns" className="text-blue-600 hover:underline font-medium">TTL (Time to Live)</Link> value on your DNS record directly controls how long caches hold onto your record. A TTL of 3600 (1 hour) means resolvers will cache your record for up to 1 hour. A TTL of 300 (5 minutes) means caches refresh every 5 minutes. This is why <Link href="/dns-not-propagating" className="text-blue-600 hover:underline font-medium">lowering TTL before making DNS changes</Link> significantly reduces propagation time.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How TTL Controls Cache Duration</h2>
            <p className="text-gray-700 mb-4">
              Every DNS record has a TTL value (in seconds) that tells resolvers how long to cache the record. When the TTL countdown reaches zero, the cached entry is discarded and the resolver must perform a fresh lookup on the next request.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">TTL Value</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Cache Duration</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">60</td>
                    <td className="py-3 px-4">1 minute</td>
                    <td className="py-3 px-4">Failover systems, dynamic DNS, testing</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">300</td>
                    <td className="py-3 px-4">5 minutes</td>
                    <td className="py-3 px-4">Pre-migration TTL, frequently updated records</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">3600</td>
                    <td className="py-3 px-4">1 hour</td>
                    <td className="py-3 px-4">Standard production records (recommended default)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">14400</td>
                    <td className="py-3 px-4">4 hours</td>
                    <td className="py-3 px-4">Stable records, many registrar defaults</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">86400</td>
                    <td className="py-3 px-4">24 hours</td>
                    <td className="py-3 px-4">Rarely changed records, maximum caching benefit</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">DNS Cache Poisoning</h2>
            <p className="text-gray-700 mb-4">
              DNS cache poisoning (also known as DNS spoofing) is a security attack where an attacker injects forged DNS records into a resolver's cache. When a resolver's cache is poisoned, it returns a malicious IP address instead of the legitimate one, redirecting users to fake websites without their knowledge.
            </p>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Shield className="h-5 w-5 text-red-500 mr-2" />
                How Cache Poisoning Works
              </h3>
              <p className="text-gray-700">An attacker sends forged DNS responses to a resolver, racing the legitimate response from the authoritative server. If the forged response arrives first with a matching transaction ID, the resolver caches the fake record. All users of that resolver are then redirected to the attacker's server for the duration of the poisoned record's TTL.</p>
            </div>
            <p className="text-gray-700 mb-8">
              <strong>DNSSEC</strong> (DNS Security Extensions) was developed to combat cache poisoning by adding cryptographic signatures to DNS records. When a resolver supports DNSSEC, it can verify that DNS responses haven't been tampered with. Learn more in our <Link href="/dnssec" className="text-blue-600 hover:underline font-medium">DNSSEC guide</Link>. You can also use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">DNS propagation checker</Link> to verify your records are returning the correct values across global servers.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Flush DNS Cache on Every OS</h2>
            <p className="text-gray-700 mb-4">
              Flushing your DNS cache forces your system to perform fresh DNS lookups instead of using cached results. This is essential after making DNS changes or when troubleshooting connectivity issues.
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Windows</h3>
                <p className="text-gray-700 mb-2">Open Command Prompt as Administrator and run:</p>
                <code className="block bg-gray-800 text-green-400 px-4 py-2 rounded text-sm">ipconfig /flushdns</code>
                <p className="text-gray-500 text-sm mt-2">You should see: "Successfully flushed the DNS Resolver Cache."</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">macOS</h3>
                <p className="text-gray-700 mb-2">Open Terminal and run:</p>
                <code className="block bg-gray-800 text-green-400 px-4 py-2 rounded text-sm">sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code>
                <p className="text-gray-500 text-sm mt-2">No output is shown on success. Enter your admin password when prompted.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Linux (systemd)</h3>
                <p className="text-gray-700 mb-2">Open Terminal and run:</p>
                <code className="block bg-gray-800 text-green-400 px-4 py-2 rounded text-sm">sudo systemd-resolve --flush-caches</code>
                <p className="text-gray-500 text-sm mt-2">To verify, run: <code className="bg-gray-700 px-1 rounded">sudo systemd-resolve --statistics</code> and check that the cache size is 0.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Google Chrome</h3>
                <p className="text-gray-700 mb-2">Navigate to this URL in Chrome's address bar:</p>
                <code className="block bg-gray-800 text-green-400 px-4 py-2 rounded text-sm">chrome://net-internals/#dns</code>
                <p className="text-gray-500 text-sm mt-2">Click the "Clear host cache" button to flush Chrome's internal DNS cache.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">When to Flush Your DNS Cache</h2>
            <p className="text-gray-700 mb-4">
              You don't need to flush your DNS cache regularly—it's designed to work automatically. However, there are specific situations where flushing is helpful:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  After Making DNS Changes
                </h3>
                <p className="text-gray-700">If you've updated DNS records and want to verify the changes on your own machine immediately, flush your cache first. Otherwise, your system may continue showing the old record until its local cache expires.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Website Not Loading
                </h3>
                <p className="text-gray-700">If a website works for others but not for you, a stale DNS cache entry might be pointing your machine to an old or incorrect IP address. Flushing the cache forces a fresh lookup that may resolve the issue.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  During DNS Migration or Testing
                </h3>
                <p className="text-gray-700">When migrating DNS providers or testing new configurations, flush your cache between tests to ensure you're seeing the latest DNS state rather than cached results from a previous test.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Redirected to Wrong Server
                </h3>
                <p className="text-gray-700">If you're being redirected to an old server, staging environment, or the wrong IP address after a migration, your local DNS cache likely has a stale entry. Flushing resolves this immediately.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Related DNS Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link href="/what-is-ttl-in-dns" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">What Is TTL in DNS? →</h3>
                  <p className="text-sm text-gray-700">Understand how TTL values control DNS cache duration and propagation speed.</p>
                </div>
              </Link>
              <Link href="/dns-not-propagating" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">DNS Not Propagating? →</h3>
                  <p className="text-sm text-gray-700">Troubleshoot why your DNS changes aren't taking effect and how to fix it.</p>
                </div>
              </Link>
              <Link href="/how-long-does-dns-propagation-take" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">How Long Does DNS Propagation Take? →</h3>
                  <p className="text-sm text-gray-700">Detailed propagation timelines by record type and provider.</p>
                </div>
              </Link>
              <Link href="/dns-propagation-checker" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">DNS Propagation Checker →</h3>
                  <p className="text-sm text-gray-700">Check if your DNS changes have propagated across 50+ global servers.</p>
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
              <Link href="/what-is-ttl-in-dns" className="hover:text-white">TTL Guide</Link>
              <Link href="/dns-record-types-explained" className="hover:text-white">Record Types</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}