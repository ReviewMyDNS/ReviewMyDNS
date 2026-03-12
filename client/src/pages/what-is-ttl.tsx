import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield, BookOpen, Info } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function WhatIsTtl() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>What is TTL in DNS? Time to Live Explained (2026) | ReviewMyDNS</title>
        <meta name="description" content="What is TTL in DNS? TTL (Time to Live) controls how long DNS records are cached. Learn common TTL values, when to use low vs high TTL, best practices, and how TTL affects DNS propagation speed." />
        <meta name="keywords" content="what is ttl in dns, dns ttl explained, time to live dns, ttl values, dns cache time, ttl best practices" />
        <link rel="canonical" href="https://reviewmydns.com/what-is-ttl-in-dns" />
        <meta property="og:title" content="What is TTL in DNS? Time to Live Explained (2026) | ReviewMyDNS" />
        <meta property="og:description" content="TTL (Time to Live) controls how long DNS records are cached by resolvers. Learn common TTL values, best practices, and how to use TTL to speed up DNS propagation." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/what-is-ttl-in-dns" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is TTL in DNS?", "acceptedAnswer": { "@type": "Answer", "text": "TTL (Time to Live) is a value in seconds on every DNS record that tells DNS resolvers how long to cache the record before requesting a fresh copy from the authoritative nameserver. For example, a TTL of 3600 means resolvers will cache the record for 1 hour before checking for updates. TTL controls how quickly DNS changes propagate across the internet." } },
            { "@type": "Question", "name": "What is a good TTL value for DNS?", "acceptedAnswer": { "@type": "Answer", "text": "A TTL of 3600 (1 hour) is a good default for most production DNS records. It balances fast updates with efficient caching. Use 300 (5 minutes) before planned migrations or DNS changes. Use 86400 (24 hours) for stable records that rarely change, like MX records for established email providers. Avoid TTL values below 60 seconds in production as they increase DNS query load without significant benefit." } },
            { "@type": "Question", "name": "How does TTL affect DNS propagation?", "acceptedAnswer": { "@type": "Answer", "text": "TTL directly controls DNS propagation speed. When you change a DNS record, resolvers that cached the old record will continue serving it until the TTL expires. A TTL of 300 seconds means resolvers refresh every 5 minutes, so changes propagate within minutes. A TTL of 86400 means resolvers may serve the old record for up to 24 hours. This is why lowering TTL before making changes is a critical best practice." } },
            { "@type": "Question", "name": "Should I lower TTL before changing DNS records?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, absolutely. Lower your TTL to 300 seconds (5 minutes) at least 24-48 hours before making any DNS changes. This ensures that by the time you make the actual change, most resolvers worldwide are already checking every 5 minutes instead of every few hours. After the change has fully propagated, raise the TTL back to its normal value (typically 3600 or higher)." } },
            { "@type": "Question", "name": "What happens if I set TTL too low?", "acceptedAnswer": { "@type": "Answer", "text": "Setting TTL too low (under 60 seconds) permanently increases the number of DNS queries your authoritative nameserver must handle, which can increase latency and costs. It also means every single DNS lookup requires a fresh query instead of using cached data, slightly slowing down page loads for visitors. Low TTL is fine temporarily before migrations, but keep it at 300-3600 for normal operations." } },
            { "@type": "Question", "name": "How do I check the current TTL on my DNS records?", "acceptedAnswer": { "@type": "Answer", "text": "Use a DNS propagation checker like ReviewMyDNS to look up your domain and see the TTL value returned by DNS servers worldwide. You can also use command-line tools: run 'dig example.com A' on macOS/Linux or 'nslookup -type=A example.com' on Windows. The TTL value appears in the response next to each DNS record." } },
            { "@type": "Question", "name": "Can I set different TTL values for different DNS records?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, each DNS record can have its own independent TTL value. This is a best practice—use lower TTL for records you change frequently (like A records for servers you might migrate) and higher TTL for stable records (like MX records pointing to Gmail or Microsoft 365). Most DNS providers let you set TTL per record in their management dashboard." } }
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
              What is TTL in DNS?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              TTL (Time to Live) controls <strong>how long DNS records are cached</strong> by resolvers worldwide. Understanding TTL is essential for managing DNS propagation speed, planning migrations, and optimizing your domain's performance.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Cache Duration</h3>
                  <p className="text-sm text-gray-600">TTL sets how long records are cached</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Propagation Speed</h3>
                  <p className="text-sm text-gray-600">Lower TTL = faster DNS updates</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">300 – 86400</h3>
                  <p className="text-sm text-gray-600">Common TTL range in seconds</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Per-Record Control</h3>
                  <p className="text-sm text-gray-600">Set different TTL per DNS record</p>
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
                <Info className="h-6 w-6 text-blue-600 mr-2" />
                Quick Answer
              </h2>
              <p className="text-gray-700 text-lg">
                TTL (Time to Live) is a value in <strong>seconds</strong> on every DNS record that tells DNS resolvers how long to <strong>cache</strong> the record before requesting a fresh copy. A TTL of 3600 means the record is cached for 1 hour. A TTL of 300 means it's cached for just 5 minutes. <strong>Lower TTL = faster DNS propagation</strong> when you make changes, but slightly more DNS query traffic.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">TTL Explained Simply: The Library Book Analogy</h2>
            <p className="text-gray-700 mb-4">
              Think of DNS like a library system. When you look up a domain name (like example.com), your DNS resolver is like a local librarian who checks their card catalog (cache) first. If the answer is there and hasn't expired, they give it to you immediately—no need to call the main library (authoritative nameserver).
            </p>
            <p className="text-gray-700 mb-4">
              The TTL is like a sticky note on the catalog card that says "this information is valid until 3:00 PM." Once that time passes, the librarian must call the main library to get updated information before answering the next request. If the author (you) changed their address, the librarian won't know until the sticky note expires and they make that call.
            </p>
            <p className="text-gray-700 mb-4">
              This is exactly how DNS caching works. Every DNS record has a TTL value (measured in seconds) that acts as an expiration timer. When a resolver receives a DNS record, it starts a countdown. Once the countdown hits zero, the resolver discards the cached copy and fetches a new one from the authoritative nameserver. During the countdown, any DNS queries for that domain get answered from cache—instantly, without contacting anyone.
            </p>
            <p className="text-gray-700 mb-8">
              This caching system is what makes the internet fast. Without it, every single website visit would require a full DNS lookup chain, adding hundreds of milliseconds of latency. But it also means that when you change a DNS record, the old cached copies don't disappear instantly—they hang around until their TTL expires at each individual resolver worldwide.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common TTL Values Reference Table</h2>
            <p className="text-gray-700 mb-4">
              Different situations call for different TTL values. Here are the most common TTL settings and when to use each one:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">TTL (Seconds)</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Human-Readable</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Best Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">300</td>
                    <td className="py-3 px-4">5 minutes</td>
                    <td className="py-3 px-4">Pre-migration preparation, failover setups, dynamic DNS, records you plan to change soon</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">900</td>
                    <td className="py-3 px-4">15 minutes</td>
                    <td className="py-3 px-4">Frequently updated records, staging environments, A/B testing DNS configurations</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">1800</td>
                    <td className="py-3 px-4">30 minutes</td>
                    <td className="py-3 px-4">Moderate change frequency, new domains still being configured, development environments</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">3600</td>
                    <td className="py-3 px-4">1 hour</td>
                    <td className="py-3 px-4">Standard production default, good balance of caching efficiency and update speed</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">14400</td>
                    <td className="py-3 px-4">4 hours</td>
                    <td className="py-3 px-4">Stable production records, many registrar defaults (GoDaddy, Namecheap), rarely changed records</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">86400</td>
                    <td className="py-3 px-4">24 hours</td>
                    <td className="py-3 px-4">Records that never change, maximum caching efficiency, reduces DNS query load significantly</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">When to Use Low vs. High TTL</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Use Low TTL (300–900 seconds) When:
                </h3>
                <ul className="text-gray-700 space-y-2 ml-7 list-disc">
                  <li>You're about to migrate servers, hosting providers, or DNS providers</li>
                  <li>You need fast failover for high-availability setups</li>
                  <li>You're setting up a new domain and still configuring records</li>
                  <li>You're troubleshooting DNS issues and need quick iteration</li>
                  <li>You use dynamic DNS for home servers or development environments</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  Use High TTL (3600–86400 seconds) When:
                </h3>
                <ul className="text-gray-700 space-y-2 ml-7 list-disc">
                  <li>Your DNS records are stable and rarely change</li>
                  <li>You want to minimize DNS query load on your nameservers</li>
                  <li>You want slightly faster page loads (cached DNS = zero lookup time)</li>
                  <li>Your MX records point to established providers like Google Workspace or Microsoft 365</li>
                  <li>You've completed a migration and propagation is done</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How TTL Affects DNS Propagation Speed</h2>
            <p className="text-gray-700 mb-4">
              TTL is the single biggest factor in how fast DNS changes propagate. When you change a DNS record, existing cached copies at thousands of resolvers worldwide don't disappear—they persist until their individual TTL timers expire. Here's a practical example:
            </p>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-gray-700 mb-3"><strong>Scenario:</strong> You want to change your A record from IP 1.2.3.4 to 5.6.7.8.</p>
              <p className="text-gray-700 mb-2">If your current TTL is <strong>86400 (24 hours)</strong>: Resolvers that cached your record just before you made the change will serve the old IP for up to 24 hours. Full propagation: <strong>up to 24 hours</strong>.</p>
              <p className="text-gray-700">If your current TTL is <strong>300 (5 minutes)</strong>: Those same resolvers will refresh within 5 minutes. Full propagation: <strong>under 30 minutes</strong> in most cases.</p>
            </div>
            <p className="text-gray-700 mb-4">
              This is why the golden rule of DNS management is: <strong>always lower your TTL before making changes</strong>. Lower it at least 24–48 hours in advance, so all resolvers have had time to see the low TTL. Then make your change, and propagation will happen quickly. After everything is settled, raise the TTL back up.
            </p>
            <p className="text-gray-700 mb-8">
              Want to see how fast your DNS changes are propagating right now? Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">DNS propagation checker</Link> to monitor real-time status across 50+ servers worldwide. For a deeper understanding of propagation timing, see our guide on <Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline font-medium">how long DNS propagation takes</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Check Your Current TTL</h2>
            <p className="text-gray-700 mb-4">
              Before changing DNS records, you should always check the current TTL value to understand how long propagation will take. Here are the easiest methods:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  Using ReviewMyDNS (Easiest)
                </h3>
                <p className="text-gray-700">Enter your domain in the lookup tool above and check the TTL column in the results table. You'll see the TTL value as reported by each DNS server worldwide, giving you a comprehensive view of what resolvers are actually caching.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  Using dig (macOS/Linux)
                </h3>
                <p className="text-gray-700 mb-2">Open your terminal and run:</p>
                <code className="block bg-gray-100 px-3 py-2 rounded text-sm">dig example.com A +noall +answer</code>
                <p className="text-gray-700 mt-2">The number in the second column of the output is the remaining TTL in seconds.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  Using nslookup (Windows)
                </h3>
                <p className="text-gray-700 mb-2">Open Command Prompt and run:</p>
                <code className="block bg-gray-100 px-3 py-2 rounded text-sm">nslookup -debug example.com</code>
                <p className="text-gray-700 mt-2">Look for the "ttl" line in the debug output to see the current value.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Change TTL at Popular DNS Providers</h2>
            <p className="text-gray-700 mb-4">
              Every DNS provider has a slightly different interface for setting TTL values. Here's how to change TTL at the three most popular providers:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Cloudflare</h3>
                <p className="text-gray-700 mb-2">Log in to your Cloudflare dashboard → select your domain → go to the DNS tab → click Edit on the record you want to change → set the TTL dropdown. Note: Cloudflare's proxied (orange cloud) records automatically use their edge cache TTL, so the TTL setting only affects DNS-only (gray cloud) records.</p>
                <p className="text-sm text-gray-500">Default TTL: Auto (typically 300 seconds for DNS-only records)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">GoDaddy</h3>
                <p className="text-gray-700 mb-2">Log in to GoDaddy → My Products → DNS → find the record → click Edit → change the TTL field. GoDaddy offers preset TTL options: 600, 1 hour, 12 hours, 1 day, 1 week. For pre-migration, select 600 seconds (10 minutes), the lowest GoDaddy allows.</p>
                <p className="text-sm text-gray-500">Default TTL: 1 hour (3600 seconds)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Namecheap</h3>
                <p className="text-gray-700 mb-2">Log in to Namecheap → Domain List → Manage → Advanced DNS → find the record → click Edit → enter the TTL value in seconds. Namecheap allows custom TTL values with a minimum of 60 seconds on their free BasicDNS and 1 second on PremiumDNS.</p>
                <p className="text-sm text-gray-500">Default TTL: Automatic (typically 1800 seconds)</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">TTL Best Practices by Scenario</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Scenario</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Recommended TTL</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Before a migration</td>
                    <td className="py-3 px-4">300 (5 min)</td>
                    <td className="py-3 px-4">Ensures resolvers refresh quickly after the actual change, minimizing downtime</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">New domain setup</td>
                    <td className="py-3 px-4">300–900</td>
                    <td className="py-3 px-4">You'll likely make several changes while configuring; low TTL means fast iteration</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Stable production</td>
                    <td className="py-3 px-4">3600 (1 hr)</td>
                    <td className="py-3 px-4">Good balance: fast enough to recover from issues, cached enough for performance</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Rarely changed records</td>
                    <td className="py-3 px-4">14400–86400</td>
                    <td className="py-3 px-4">Maximum caching efficiency, reduces DNS query load and slightly improves latency</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Failover / HA setup</td>
                    <td className="py-3 px-4">60–300</td>
                    <td className="py-3 px-4">Fast failover requires resolvers to check frequently for IP changes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">After migration complete</td>
                    <td className="py-3 px-4">3600–86400</td>
                    <td className="py-3 px-4">Raise TTL back up to reduce query load and improve caching once records are stable</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common TTL Mistakes to Avoid</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Info className="h-5 w-5 text-amber-500 mr-2" />
                  Forgetting to Lower TTL Before Migration
                </h3>
                <p className="text-gray-700">This is the #1 TTL mistake. If your records have a TTL of 86400 (24 hours) and you change DNS without lowering it first, you're stuck waiting up to 24 hours for full propagation. Always lower TTL to 300 at least 24–48 hours before any planned DNS change. See our guide on <Link href="/how-to-lower-ttl-before-migration" className="text-blue-600 hover:underline">how to lower TTL before migration</Link>.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Info className="h-5 w-5 text-amber-500 mr-2" />
                  Setting TTL Too Low Permanently
                </h3>
                <p className="text-gray-700">Running a TTL of 60 seconds permanently means your nameserver handles dramatically more queries, increasing costs and adding a few milliseconds of latency to every page load. Low TTL is a temporary strategy for migrations, not a permanent setting. After changes propagate, raise it to at least 3600.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Info className="h-5 w-5 text-amber-500 mr-2" />
                  Forgetting to Raise TTL After Migration
                </h3>
                <p className="text-gray-700">Many admins lower TTL for a migration and then forget to raise it back. Months later, their nameserver is still handling unnecessary query volume. Set a calendar reminder to raise TTL back to 3600+ once your migration is confirmed complete.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Info className="h-5 w-5 text-amber-500 mr-2" />
                  Assuming TTL Change Takes Effect Immediately
                </h3>
                <p className="text-gray-700">When you lower your TTL from 86400 to 300, the new TTL doesn't take effect instantly at all resolvers. Resolvers that just cached your record will still hold it for up to 24 more hours (the old TTL). That's why you need to lower TTL 24–48 hours <em>before</em> the actual DNS change.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Info className="h-5 w-5 text-amber-500 mr-2" />
                  Not Checking TTL Before Making Changes
                </h3>
                <p className="text-gray-700">Many people change DNS records without checking the current TTL first, then wonder why it's taking so long to propagate. Always check your current TTL with our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS propagation checker</Link> before making any changes. If it's high, plan your migration timeline accordingly or lower it in advance.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">What is the default TTL for DNS records?</h3>
                <p className="text-gray-700">Default TTL varies by provider: Cloudflare uses "Auto" (typically 300 seconds for DNS-only records), GoDaddy defaults to 3600 seconds (1 hour), Namecheap defaults to 1800 seconds (30 minutes), and AWS Route 53 defaults to 300 seconds. Most registrars use between 1800 and 14400 seconds as their default.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Does TTL affect website speed?</h3>
                <p className="text-gray-700">Indirectly, yes. A higher TTL means DNS results are cached longer, so repeat visitors skip the DNS lookup step entirely. A very low TTL means more frequent DNS lookups, adding 10–100ms per lookup. For most websites, the difference is negligible, but for performance-critical applications, a TTL of 3600+ can provide a small speed advantage.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Can ISPs ignore my TTL setting?</h3>
                <p className="text-gray-700">Some ISPs enforce minimum TTL values or cache records longer than the specified TTL to reduce their infrastructure load. While most major ISPs respect TTL accurately, a few may cache records for several hours regardless. This is why DNS propagation sometimes takes longer than the TTL would suggest. Using public resolvers like Google (8.8.8.8) or Cloudflare (1.1.1.1) typically gives accurate TTL behavior.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">What's the minimum TTL I should use?</h3>
                <p className="text-gray-700">For temporary pre-migration situations, 300 seconds (5 minutes) is the recommended minimum. Some providers allow TTL as low as 1 second, but going below 60 seconds rarely provides practical benefit and significantly increases DNS query volume. For production records, 3600 (1 hour) is a sensible minimum that balances update speed with caching efficiency.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Why is my DNS not propagating even though TTL is low?</h3>
                <p className="text-gray-700">If your TTL is low but propagation seems stuck, check: 1) Whether you're editing records at the correct DNS provider (check your NS records), 2) Whether your local DNS cache needs flushing, 3) Whether conflicting records exist, 4) Whether DNSSEC is misconfigured. See our <Link href="/dns-not-propagating" className="text-blue-600 hover:underline">DNS not propagating troubleshooting guide</Link> for detailed steps.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Check Your DNS TTL Now</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                See the current TTL values for your DNS records across 50+ global servers. Verify your TTL settings before making any DNS changes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/dns-propagation-checker">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Globe className="h-5 w-5 mr-2" />
                    Open Propagation Checker
                  </Button>
                </Link>
                <Link href="/dns-record-types-explained">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <BookOpen className="h-5 w-5 mr-2" />
                    DNS Record Types Guide
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