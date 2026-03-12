import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield, AlertTriangle, Zap } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function DnsPropagationTime() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>How Long Does DNS Propagation Take? (2026 Guide) | ReviewMyDNS</title>
        <meta name="description" content="How long does DNS propagation take? Typically 5 minutes to 48 hours depending on record type, TTL settings, and provider. Check real-time propagation status across 50+ global servers." />
        <meta name="keywords" content="how long does dns propagation take, dns propagation time, dns update time, dns ttl, dns cache, dns propagation speed" />
        <link rel="canonical" href="https://reviewmydns.com/how-long-does-dns-propagation-take" />
        <meta property="og:title" content="How Long Does DNS Propagation Take? (2026 Guide) | ReviewMyDNS" />
        <meta property="og:description" content="DNS propagation takes 5 minutes to 48 hours. Learn exactly how long each record type takes, why it varies, and how to speed it up." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/how-long-does-dns-propagation-take" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How long does DNS propagation take?", "acceptedAnswer": { "@type": "Answer", "text": "DNS propagation typically takes between 5 minutes and 48 hours. Simple A record changes with low TTL values (300 seconds) can propagate in under 30 minutes. MX record changes usually take 1–24 hours. Nameserver (NS) changes take the longest at 24–48 hours because they involve updating the domain registry. The exact time depends on the record type, your TTL settings, and which DNS provider you use." } },
            { "@type": "Question", "name": "What is TTL and how does it affect DNS propagation?", "acceptedAnswer": { "@type": "Answer", "text": "TTL (Time to Live) is a value in seconds that tells DNS resolvers how long to cache a record before checking for updates. A TTL of 300 means resolvers cache the record for 5 minutes. A TTL of 86400 means they cache it for 24 hours. Lower TTL values result in faster propagation because resolvers check for updates more frequently, but slightly increase DNS query load." } },
            { "@type": "Question", "name": "Why is DNS propagation not instant?", "acceptedAnswer": { "@type": "Answer", "text": "DNS propagation isn't instant because DNS uses a hierarchical caching system. When you change a DNS record, existing cached copies across thousands of ISP resolvers, corporate DNS servers, and public resolvers (like Google 8.8.8.8 and Cloudflare 1.1.1.1) don't expire until their TTL countdown finishes. Each resolver independently manages its cache, so different locations update at different times." } },
            { "@type": "Question", "name": "How can I speed up DNS propagation?", "acceptedAnswer": { "@type": "Answer", "text": "To speed up propagation: 1) Lower your TTL to 300 seconds at least 24–48 hours before making DNS changes. 2) Use a DNS provider with a fast anycast network like Cloudflare (propagates in seconds). 3) Flush your local DNS cache after making changes. 4) Ask users experiencing issues to switch to Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1) temporarily." } },
            { "@type": "Question", "name": "Does Cloudflare DNS propagate faster than GoDaddy?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, significantly. Cloudflare propagates DNS changes within seconds to their global anycast edge network—most changes are live worldwide in under 5 minutes. GoDaddy typically takes 1–4 hours for A and TXT records. AWS Route 53 and Google Cloud DNS also propagate within 60 seconds. The difference comes from Cloudflare's anycast architecture and aggressive cache invalidation." } },
            { "@type": "Question", "name": "Can I check if my DNS has propagated?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Use a DNS propagation checker like ReviewMyDNS to query 50+ DNS servers worldwide and see which regions have received your updated records. This gives you a real-time view of propagation status instead of guessing. Enter your domain, select the record type, and see results from servers across North America, Europe, Asia, and other regions." } },
            { "@type": "Question", "name": "What should I do while waiting for DNS propagation?", "acceptedAnswer": { "@type": "Answer", "text": "While waiting: 1) Keep your old hosting/server running until propagation completes—some users will still reach the old server. 2) Monitor propagation progress with a tool like ReviewMyDNS. 3) Don't make additional DNS changes, as this can reset the propagation timer. 4) If it's been over 48 hours, verify your records are correct and check for conflicting entries." } },
            { "@type": "Question", "name": "Do all DNS record types propagate at the same speed?", "acceptedAnswer": { "@type": "Answer", "text": "No. A and AAAA records typically propagate in 5 minutes to 24 hours. CNAME records take a similar timeframe. MX records for email usually take 1–24 hours. TXT records (SPF, DKIM, verification) propagate in 5 minutes to 24 hours. NS (nameserver) records take the longest at 24–48 hours because the change must be registered at the domain registry level." } }
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
              How Long Does DNS Propagation Take?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              DNS propagation takes <strong>5 minutes to 48 hours</strong> depending on your record type, TTL settings, and DNS provider. Use our free tool below to check your domain's real-time propagation status across 50+ global servers.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">5 Min – 48 Hours</h3>
                  <p className="text-sm text-gray-600">Typical propagation range</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Zap className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">TTL Dependent</h3>
                  <p className="text-sm text-gray-600">Lower TTL = faster updates</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">50+ Servers</h3>
                  <p className="text-sm text-gray-600">Check propagation worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Real-Time Status</h3>
                  <p className="text-sm text-gray-600">See which regions updated</p>
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
                <ResultsTable results={lookupResults.results} />
              </div>
            </section>
          </>
        )}

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <Zap className="h-6 w-6 text-blue-600 mr-2" />
                Quick Answer
              </h2>
              <p className="text-gray-700 text-lg">
                DNS propagation takes <strong>5 minutes to 48 hours</strong>, with most changes completing within <strong>1–4 hours</strong>. The exact time depends on three factors: the <strong>DNS record type</strong> you changed, the <strong>TTL (Time to Live)</strong> value on the old record, and your <strong>DNS provider's infrastructure</strong>. Simple A record changes with a low TTL on Cloudflare can propagate in seconds, while nameserver changes at traditional registrars can take the full 48 hours.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">DNS Propagation Timeline by Record Type</h2>
            <p className="text-gray-700 mb-4">
              Not all DNS records propagate at the same speed. The type of record you changed has a significant impact on how long you'll wait. Here's a detailed breakdown of expected propagation times for each common DNS record type:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Record Type</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Propagation Time</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Why This Long?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">A / AAAA</td>
                    <td className="py-3 px-4">5 minutes – 24 hours</td>
                    <td className="py-3 px-4">Depends entirely on the previous TTL value. With TTL 300, resolvers refresh in 5 minutes.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">CNAME</td>
                    <td className="py-3 px-4">5 minutes – 24 hours</td>
                    <td className="py-3 px-4">Same caching behavior as A records. Often used for www subdomains and CDN aliases.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">MX</td>
                    <td className="py-3 px-4">1 – 24 hours</td>
                    <td className="py-3 px-4">Email servers cache MX records aggressively. Keep the old mail server running until fully propagated.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">TXT</td>
                    <td className="py-3 px-4">5 minutes – 24 hours</td>
                    <td className="py-3 px-4">Used for SPF, DKIM, and domain verification. Verification services may have their own cache on top of DNS.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">NS</td>
                    <td className="py-3 px-4">24 – 48 hours</td>
                    <td className="py-3 px-4">Nameserver changes update at the registry level (Verisign, etc.), which adds significant delay.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">SOA</td>
                    <td className="py-3 px-4">Varies by zone</td>
                    <td className="py-3 px-4">SOA records control zone refresh intervals. Changes propagate based on the zone's refresh timer.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-8">
              Want to check your specific record type right now? Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">DNS propagation checker</Link> above to see real-time status across 50+ global servers.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">What Is TTL and How Does It Affect Propagation?</h2>
            <p className="text-gray-700 mb-4">
              TTL (Time to Live) is the single most important factor in how quickly DNS changes propagate. It's a value (in seconds) attached to every DNS record that tells resolvers how long to cache the record before asking for a fresh copy. Think of it as an expiration date on cached DNS data.
            </p>
            <p className="text-gray-700 mb-4">
              When you change a DNS record, resolvers that already have the old record cached will continue serving it until the TTL expires. Only after the TTL countdown finishes will they query your authoritative nameserver and receive the new value.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">TTL Value</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Cache Duration</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">300</td>
                    <td className="py-3 px-4">5 minutes</td>
                    <td className="py-3 px-4">Before planned DNS changes, failover scenarios, dynamic DNS</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">3600</td>
                    <td className="py-3 px-4">1 hour</td>
                    <td className="py-3 px-4">Standard production records, good balance of speed and caching</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">14400</td>
                    <td className="py-3 px-4">4 hours</td>
                    <td className="py-3 px-4">Stable records that rarely change (many registrars use this default)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">86400</td>
                    <td className="py-3 px-4">24 hours</td>
                    <td className="py-3 px-4">Records that never change, reduces DNS query load significantly</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Pro tip:</strong> If you know you'll be making DNS changes soon, lower your TTL to 300 seconds at least 24–48 hours in advance. This ensures that by the time you make the actual change, most resolvers are already checking every 5 minutes instead of every 24 hours. After the change has fully propagated, raise the TTL back to its normal value.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Why DNS Propagation Isn't Instant</h2>
            <p className="text-gray-700 mb-4">
              Many people expect DNS changes to take effect immediately, similar to saving a file. But DNS uses a distributed caching architecture designed for performance—not instant updates. Here's what happens behind the scenes:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  ISP Recursive Resolvers Cache Records
                </h3>
                <p className="text-gray-700">Your ISP operates DNS resolvers that cache DNS records to speed up browsing for millions of customers. When you visit a website, your ISP's resolver stores the DNS answer and serves it to all customers asking for the same domain—until the TTL expires. Some ISPs even ignore TTL values and cache records for longer than specified to reduce their infrastructure costs.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  Public DNS Resolvers Have Their Own Cache
                </h3>
                <p className="text-gray-700">Services like Google Public DNS (8.8.8.8), Cloudflare DNS (1.1.1.1), and OpenDNS (208.67.222.222) each maintain their own independent cache. Even if your ISP's resolver has updated, users relying on a different public resolver may still see old records until that resolver's cache expires independently.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  Your Local Machine Caches DNS
                </h3>
                <p className="text-gray-700">Both your operating system and web browser maintain local DNS caches. Even after a resolver has the updated record, your computer may still show old results from its own cache. This is why flushing your local DNS cache is often the first troubleshooting step.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  NS Changes Go Through the Registry
                </h3>
                <p className="text-gray-700">When you change nameservers, the update must propagate through the domain registry (like Verisign for .com domains). The registry operates on its own refresh schedule, which adds an extra layer of delay on top of normal DNS caching. This is why NS changes consistently take 24–48 hours.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Speed Up DNS Propagation</h2>
            <p className="text-gray-700 mb-4">
              While you can't force every DNS resolver on the internet to update instantly, you can take several steps to minimize propagation time significantly:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  1. Lower TTL Before Making Changes
                </h3>
                <p className="text-gray-700">Set your TTL to 300 seconds (5 minutes) at least 24–48 hours before your planned DNS change. Wait for the old TTL to expire across all resolvers, then make the change. With a 5-minute TTL, most resolvers will pick up the new record within minutes.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  2. Use a Fast DNS Provider
                </h3>
                <p className="text-gray-700">Switch to a provider with a global anycast network like <Link href="/guides/cloudflare-dns-setup" className="text-blue-600 hover:underline">Cloudflare</Link>, which propagates changes within seconds to their 300+ edge locations. AWS Route 53 and Google Cloud DNS also offer sub-minute propagation.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  3. Flush Your Local DNS Cache
                </h3>
                <p className="text-gray-700">After making changes, clear your local DNS cache to see results immediately on your own machine. On Windows, run <code className="bg-gray-100 px-1 rounded">ipconfig /flushdns</code>. On macOS, run <code className="bg-gray-100 px-1 rounded">sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code>. On Linux, run <code className="bg-gray-100 px-1 rounded">sudo systemd-resolve --flush-caches</code>.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  4. Use Google or Cloudflare DNS for Testing
                </h3>
                <p className="text-gray-700">Switch your device to use Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1) temporarily. These resolvers typically respect TTL values accurately and update faster than many ISP resolvers that may over-cache.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  5. Monitor with a Propagation Checker
                </h3>
                <p className="text-gray-700">Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS propagation checker</Link> to monitor progress in real time. Instead of guessing, you'll see exactly which global regions have updated and which are still serving cached data.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">DNS Propagation Speed by Provider</h2>
            <p className="text-gray-700 mb-4">
              Your choice of DNS provider dramatically affects propagation speed. Here's what to expect from the most popular providers:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Cloudflare</h3>
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">Seconds</span>
                </div>
                <p className="text-gray-700">Cloudflare's anycast network with 300+ global edge locations propagates changes within seconds. Most records are live worldwide in under 5 minutes. They also offer a one-click cache purge and automatic DNSSEC signing.</p>
                <Link href="/guides/cloudflare-dns-setup" className="text-blue-600 hover:underline text-sm">→ Cloudflare DNS Setup Guide</Link>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">GoDaddy</h3>
                  <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded">1–4 Hours</span>
                </div>
                <p className="text-gray-700">GoDaddy DNS changes typically propagate within 1–4 hours for A and TXT records. NS record changes at GoDaddy can take up to 48 hours. GoDaddy uses standard DNS infrastructure without anycast, resulting in slower propagation compared to Cloudflare or enterprise providers.</p>
                <Link href="/guides/godaddy-dns-setup" className="text-blue-600 hover:underline text-sm">→ GoDaddy DNS Setup Guide</Link>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Namecheap</h3>
                  <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded">30 Min – 24 Hours</span>
                </div>
                <p className="text-gray-700">Namecheap DNS propagation typically takes 30 minutes to 24 hours. Their PremiumDNS service offers faster propagation and higher uptime guarantees compared to BasicDNS. For time-sensitive changes, consider pairing Namecheap domain registration with Cloudflare DNS hosting.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">AWS Route 53</h3>
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">~60 Seconds</span>
                </div>
                <p className="text-gray-700">AWS Route 53 propagates changes within 60 seconds to their global anycast network. Designed for production workloads with a 100% uptime SLA. Supports advanced features like weighted routing, latency-based routing, and health checks.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Google Cloud DNS</h3>
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">~60 Seconds</span>
                </div>
                <p className="text-gray-700">Google Cloud DNS also propagates within 60 seconds using Google's massive global infrastructure. Offers a 100% uptime SLA and integrates seamlessly with other Google Cloud services. Ideal for organizations already in the Google ecosystem.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">What to Do While Waiting for DNS Propagation</h2>
            <p className="text-gray-700 mb-4">
              DNS propagation requires patience, but there are productive steps you can take while waiting. Follow this checklist to avoid common pitfalls:
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Keep your old server running</p>
                  <p className="text-sm text-gray-600">During propagation, some users will reach your old server while others reach the new one. Don't shut down the old hosting until propagation is 100% complete across all regions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Globe className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Monitor propagation progress</p>
                  <p className="text-sm text-gray-600">Use the <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">propagation checker</Link> to track which regions have updated. Check periodically until you see green across all servers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Don't make additional DNS changes</p>
                  <p className="text-sm text-gray-600">Making further DNS edits while propagation is in progress can create inconsistencies and effectively reset the propagation timer. Wait until the first change has fully propagated.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Verify your records are correct</p>
                  <p className="text-sm text-gray-600">Double-check that the new DNS records are entered correctly. A typo in an IP address or missing trailing dot on a CNAME can cause the change to appear "stuck" when it's actually pointing to the wrong place.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Check for conflicting records</p>
                  <p className="text-sm text-gray-600">Ensure you don't have conflicting DNS entries. For example, having both a CNAME and an A record on the same hostname violates DNS standards and causes unpredictable behavior. Check our <Link href="/faq" className="text-blue-600 hover:underline">FAQ</Link> for more troubleshooting tips.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Verify DNSSEC if enabled</p>
                  <p className="text-sm text-gray-600">If your domain uses <Link href="/dnssec" className="text-blue-600 hover:underline">DNSSEC</Link>, ensure the DS records at the registrar match the new zone's DNSKEY records. Mismatched DNSSEC signatures will cause DNS resolution failures, not just slow propagation.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Can DNS propagation take more than 48 hours?</h3>
                <p className="text-gray-700">In rare cases, yes. Some ISPs cache DNS records beyond the specified TTL, and a few corporate networks run their own resolvers with non-standard caching policies. If it's been over 48 hours and certain regions still show old records, the issue is likely ISP-level caching or an incorrect DNS configuration rather than normal propagation delay.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Does changing DNS affect my website's SEO?</h3>
                <p className="text-gray-700">DNS changes themselves don't affect SEO directly, but downtime during propagation can. If search engine crawlers hit your domain during the transition and get errors, it could temporarily impact rankings. Minimize this risk by keeping both old and new servers running during propagation and using a low TTL.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Is there a way to make DNS propagation instant?</h3>
                <p className="text-gray-700">There's no way to force every DNS resolver on the internet to update simultaneously. However, providers like Cloudflare propagate changes to their own network within seconds. The closest you can get to "instant" is using a low TTL (300 seconds) with a fast anycast DNS provider.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Should I change my DNS provider for faster propagation?</h3>
                <p className="text-gray-700">If you frequently make DNS changes and need fast propagation, switching to Cloudflare, AWS Route 53, or Google Cloud DNS is worth considering. These providers propagate changes within seconds to minutes versus hours for traditional registrar DNS. Cloudflare's free plan includes fast DNS hosting.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Why does DNS work in one location but not another?</h3>
                <p className="text-gray-700">Each DNS resolver around the world caches records independently based on the TTL value. Some resolvers may have queried your domain recently and cached the old record, while others may have already expired their cache and fetched the new one. This creates a window where different locations see different results—which is exactly what "propagation" means.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Does email delivery get affected during DNS propagation?</h3>
                <p className="text-gray-700">Yes, especially when changing MX records. During propagation, some mail servers will deliver to the old MX target while others deliver to the new one. To avoid lost emails, keep both old and new mail servers running during propagation, and ensure both can accept mail for your domain. Also verify your <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">SPF and DKIM TXT records</Link> are correct.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Check Your DNS Propagation Now</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Stop guessing whether your DNS changes have propagated. Use our free tool to query 50+ global servers and see real-time results.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/dns-propagation-checker">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Globe className="h-5 w-5 mr-2" />
                    Open Propagation Checker
                  </Button>
                </Link>
                <Link href="/guides/cloudflare-dns-setup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Zap className="h-5 w-5 mr-2" />
                    Cloudflare Setup Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Tools</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/dns-propagation-checker" className="hover:text-white">DNS Propagation Checker</Link></li>
                  <li><Link href="/tools" className="hover:text-white">All DNS Tools</Link></li>
                  <li><Link href="/dnssec" className="hover:text-white">DNSSEC Checker</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Guides</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/guides/cloudflare-dns-setup" className="hover:text-white">Cloudflare DNS Setup</Link></li>
                  <li><Link href="/guides/godaddy-dns-setup" className="hover:text-white">GoDaddy DNS Setup</Link></li>
                  <li><Link href="/guides" className="hover:text-white">All Guides</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                  <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                  <li><Link href="/documentation" className="hover:text-white">Terminology</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                  <li><Link href="/api-docs" className="hover:text-white">API</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} ReviewMyDNS. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}