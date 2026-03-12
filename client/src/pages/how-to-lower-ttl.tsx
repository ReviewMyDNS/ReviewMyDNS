import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, AlertTriangle, Zap, ArrowDown, ListChecks, Timer } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function HowToLowerTtl() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>How to Lower TTL Before DNS Migration (Step-by-Step 2026) | ReviewMyDNS</title>
        <meta name="description" content="Lower your DNS TTL to 300 seconds before migration to ensure fast propagation. Step-by-step guide for Cloudflare, GoDaddy, Namecheap & AWS Route 53 with a complete migration timeline." />
        <meta name="keywords" content="how to lower ttl before migration, lower ttl dns, reduce ttl before dns change, ttl 300, dns migration ttl, lower ttl cloudflare, lower ttl godaddy" />
        <link rel="canonical" href="https://reviewmydns.com/how-to-lower-ttl-before-migration" />
        <meta property="og:title" content="How to Lower TTL Before DNS Migration (Step-by-Step 2026) | ReviewMyDNS" />
        <meta property="og:description" content="The #1 DNS migration mistake: not lowering TTL first. Learn the exact timeline, commands, and steps to ensure a smooth DNS migration." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/how-to-lower-ttl-before-migration" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Why should I lower TTL before a DNS migration?", "acceptedAnswer": { "@type": "Answer", "text": "Lowering TTL before migration ensures that DNS resolvers worldwide are checking for updates frequently (every 5 minutes instead of every 24 hours). This means when you make the actual DNS change, it propagates globally in minutes instead of hours or days. If you skip this step, resolvers will continue serving the old IP address until the original high TTL expires, potentially causing 24-48 hours of downtime or split traffic." } },
            { "@type": "Question", "name": "What TTL value should I set before migration?", "acceptedAnswer": { "@type": "Answer", "text": "Set your TTL to 300 seconds (5 minutes). This is the sweet spot—low enough that resolvers check for updates every 5 minutes, but not so low that it creates excessive DNS query load on your authoritative servers. Going below 300 seconds (like 60 seconds) provides minimal additional benefit but significantly increases DNS traffic. Some resolvers also enforce minimum TTL values and may ignore values below 300." } },
            { "@type": "Question", "name": "How long before migration should I lower TTL?", "acceptedAnswer": { "@type": "Answer", "text": "Lower your TTL at least 24-48 hours before your planned DNS change. You need to wait for the old, higher TTL to expire across all DNS resolvers worldwide. For example, if your current TTL is 86400 (24 hours), you need to wait at least 24 hours after lowering TTL before making the actual DNS change. This ensures all resolvers have picked up the new lower TTL value." } },
            { "@type": "Question", "name": "Should I raise TTL back after migration?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, always raise your TTL back to a normal value (3600-86400 seconds) after your DNS migration is complete and verified. Keeping TTL at 300 permanently increases DNS query volume to your authoritative nameservers, slightly increases page load times for first-time visitors, and provides no benefit once your records are stable. Wait until propagation is 100% confirmed, then raise TTL." } },
            { "@type": "Question", "name": "What happens if I change DNS without lowering TTL first?", "acceptedAnswer": { "@type": "Answer", "text": "If you change DNS records without lowering TTL first, resolvers that cached the old record will continue serving it until the original TTL expires. With a default TTL of 86400 (24 hours), some users could be directed to your old server for up to 24 hours. This can cause split traffic, where some visitors reach the new server and others still hit the old one, leading to inconsistent experiences and potential email delivery issues." } },
            { "@type": "Question", "name": "How do I verify my TTL was lowered successfully?", "acceptedAnswer": { "@type": "Answer", "text": "Use a DNS propagation checker like ReviewMyDNS to query your domain from 50+ global servers. Check the TTL values returned—they should show your new lower TTL (e.g., 300 seconds) across all regions. You can also use the command line: run 'dig yourdomain.com' and check the TTL column in the response. If some servers still show the old TTL, wait longer for the previous TTL to expire." } },
            { "@type": "Question", "name": "Do I need to lower TTL on all record types?", "acceptedAnswer": { "@type": "Answer", "text": "Lower TTL on ALL records that you plan to change during the migration. If you're only changing A records, lower TTL on A records. If you're doing a full migration (new nameservers, new hosting), lower TTL on A, AAAA, CNAME, MX, and TXT records. Don't forget MX records—email delivery issues are the most common post-migration problem because people overlook email-related DNS records." } }
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
              How to Lower TTL Before DNS Migration
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The <strong>#1 DNS migration mistake</strong> is changing records without lowering TTL first. Follow this step-by-step timeline to ensure your migration propagates in <strong>minutes, not days</strong>.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <ArrowDown className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Lower to 300s</h3>
                  <p className="text-sm text-gray-600">Recommended pre-migration TTL</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">48 Hours Before</h3>
                  <p className="text-sm text-gray-600">When to lower TTL</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Verify Globally</h3>
                  <p className="text-sm text-gray-600">Check across 50+ servers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Zap className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Minutes Not Days</h3>
                  <p className="text-sm text-gray-600">Fast propagation guaranteed</p>
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                The #1 DNS Migration Mistake
              </h2>
              <p className="text-gray-700 text-lg">
                Changing DNS records without lowering TTL first is the most common cause of prolonged downtime during migrations. If your current TTL is <strong>86400 seconds (24 hours)</strong>, DNS resolvers worldwide will continue serving your <strong>old IP address for up to 24 hours</strong> after you make the change. Lowering TTL to 300 seconds beforehand means resolvers refresh every 5 minutes—so your migration propagates almost instantly.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">Why Lowering TTL Before Migration Is Critical</h2>
            <p className="text-gray-700 mb-4">
              <Link href="/what-is-ttl-in-dns" className="text-blue-600 hover:underline font-medium">TTL (Time to Live)</Link> tells DNS resolvers how long to cache a record before checking for updates. Most DNS providers set default TTL values between 3600 (1 hour) and 86400 (24 hours). When you change a DNS record, resolvers that cached the old value will keep serving it until the TTL countdown expires.
            </p>
            <p className="text-gray-700 mb-4">
              Imagine you have a TTL of 86400 and you change your A record to point to a new server. A resolver that cached your old A record just 1 hour ago will continue directing visitors to your old server for the next 23 hours. Meanwhile, another resolver that just refreshed its cache will send visitors to the new server. You now have split traffic—some users reach the new site, others hit the old one.
            </p>
            <p className="text-gray-700 mb-8">
              By lowering TTL to 300 seconds 48 hours in advance, you ensure that by the time you make the actual DNS change, every resolver in the world is already checking for updates every 5 minutes. Your migration propagates to nearly 100% of users within minutes.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Step-by-Step DNS Migration Timeline</h2>
            <p className="text-gray-700 mb-6">
              Follow this exact timeline for a seamless DNS migration with minimal downtime:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 relative">
                <div className="absolute -left-3 top-5 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="font-semibold text-gray-900 mb-2 ml-4 flex items-center">
                  <Timer className="h-5 w-5 text-blue-600 mr-2" />
                  48 Hours Before: Lower TTL to 300 Seconds
                </h3>
                <p className="text-gray-700 ml-4">Log into your DNS provider and change the TTL on <strong>every record you plan to modify</strong> to 300 seconds. This includes A, AAAA, CNAME, MX, and TXT records. Don't change the record values yet—only change the TTL value.</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 relative">
                <div className="absolute -left-3 top-5 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="font-semibold text-gray-900 mb-2 ml-4 flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  Wait for Old TTL to Expire (24–48 Hours)
                </h3>
                <p className="text-gray-700 ml-4">This is the step most people skip. You must wait for the <strong>old</strong> TTL value to expire across all DNS resolvers. If your old TTL was 86400 (24 hours), wait at least 24 hours. If it was 14400 (4 hours), wait at least 4 hours. This ensures every resolver worldwide now has the new low TTL and is checking every 5 minutes.</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 relative">
                <div className="absolute -left-3 top-5 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="font-semibold text-gray-900 mb-2 ml-4 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2" />
                  Verify New TTL with ReviewMyDNS
                </h3>
                <p className="text-gray-700 ml-4">Use the <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">DNS propagation checker</Link> above to verify that your new TTL value (300) is showing across all global servers. If any region still shows the old TTL, wait longer before proceeding.</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 relative">
                <div className="absolute -left-3 top-5 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                <h3 className="font-semibold text-gray-900 mb-2 ml-4 flex items-center">
                  <Zap className="h-5 w-5 text-blue-600 mr-2" />
                  Make Your DNS Changes
                </h3>
                <p className="text-gray-700 ml-4">Now update your DNS records to point to the new server/hosting. Since resolvers are checking every 5 minutes, the change will propagate globally within minutes. Keep your old server running during this transition.</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 relative">
                <div className="absolute -left-3 top-5 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                <h3 className="font-semibold text-gray-900 mb-2 ml-4 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  Monitor Propagation
                </h3>
                <p className="text-gray-700 ml-4">Use ReviewMyDNS to monitor propagation in real-time. Check that all 50+ servers worldwide are resolving to your new IP address. <Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline font-medium">Most changes will propagate within 5–30 minutes</Link> with a 300-second TTL.</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 relative">
                <div className="absolute -left-3 top-5 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">6</div>
                <h3 className="font-semibold text-gray-900 mb-2 ml-4 flex items-center">
                  <ListChecks className="h-5 w-5 text-blue-600 mr-2" />
                  After Confirmed: Raise TTL Back to 3600–86400
                </h3>
                <p className="text-gray-700 ml-4">Once propagation is 100% confirmed and your new server is stable, raise TTL back to a normal production value. <strong>3600 (1 hour)</strong> is a good default for most records. Higher values like 86400 (24 hours) are fine for records that never change. This reduces DNS query load on your nameservers.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Lower TTL at Each Provider</h2>
            <p className="text-gray-700 mb-6">
              The exact steps to change TTL vary by DNS provider. Here's how to do it at the most popular providers:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Cloudflare</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Log into Cloudflare Dashboard → select your domain</li>
                  <li>Go to <strong>DNS → Records</strong></li>
                  <li>Click <strong>Edit</strong> on the record you want to modify</li>
                  <li>Change the <strong>TTL</strong> dropdown from "Auto" to a custom value</li>
                  <li>Enter <strong>300</strong> (or select "5 min") and click Save</li>
                </ol>
                <p className="text-gray-700 mt-2 text-sm">Note: Cloudflare's "Auto" TTL is already 300 seconds for proxied (orange cloud) records. You only need to change TTL for DNS-only (grey cloud) records.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">GoDaddy</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Log into GoDaddy → <strong>My Products → DNS</strong></li>
                  <li>Find the record you want to modify and click the <strong>pencil icon</strong></li>
                  <li>Change the <strong>TTL</strong> field. GoDaddy's minimum TTL is 600 seconds (10 minutes)</li>
                  <li>Set it to <strong>600</strong> (the lowest available) and click Save</li>
                </ol>
                <p className="text-gray-700 mt-2 text-sm">GoDaddy's default TTL is 3600 seconds. Their minimum is 600 seconds—set it as low as possible before migration.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Namecheap</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Log into Namecheap → <strong>Domain List → Manage</strong></li>
                  <li>Go to <strong>Advanced DNS</strong> tab</li>
                  <li>Click on the record to edit it</li>
                  <li>Change the <strong>TTL</strong> dropdown to <strong>"1 min"</strong> or <strong>"5 min"</strong></li>
                  <li>Click the <strong>green checkmark</strong> to save</li>
                </ol>
                <p className="text-gray-700 mt-2 text-sm">Namecheap allows TTL as low as 60 seconds on some plans. Use 300 seconds for the best balance.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">AWS Route 53</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Open the <strong>Route 53 console → Hosted Zones</strong></li>
                  <li>Select your domain and click on the record</li>
                  <li>Click <strong>Edit</strong></li>
                  <li>Change the <strong>TTL (seconds)</strong> field to <strong>300</strong></li>
                  <li>Click <strong>Save changes</strong></li>
                </ol>
                <p className="text-gray-700 mt-2 text-sm">Route 53 supports TTL as low as 0 seconds, but 300 is the recommended minimum. Route 53 changes propagate within 60 seconds to their global network.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">What TTL Value to Use</h2>
            <p className="text-gray-700 mb-4">
              <strong>300 seconds (5 minutes)</strong> is the recommended TTL for pre-migration preparation. Here's why:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">TTL Value</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Refresh Rate</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">60 seconds</td>
                    <td className="py-3 px-4">Every minute</td>
                    <td className="py-3 px-4">Too aggressive. Some resolvers ignore TTLs below 300. High DNS query load.</td>
                  </tr>
                  <tr className="border-b bg-green-50">
                    <td className="py-3 px-4 font-medium">300 seconds ✓</td>
                    <td className="py-3 px-4">Every 5 minutes</td>
                    <td className="py-3 px-4"><strong>Recommended.</strong> Fast enough for quick propagation, respected by all resolvers.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">900 seconds</td>
                    <td className="py-3 px-4">Every 15 minutes</td>
                    <td className="py-3 px-4">Acceptable alternative. Slightly slower propagation but lower query volume.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">3600 seconds</td>
                    <td className="py-3 px-4">Every hour</td>
                    <td className="py-3 px-4">Good post-migration production TTL. Too slow for active migration.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common Mistakes to Avoid</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Mistake #1: Changing DNS the Same Day You Lower TTL
                </h3>
                <p className="text-gray-700">This is the most common mistake. If your old TTL was 86400 (24 hours), resolvers worldwide still have the old TTL cached. Changing the record value immediately means those resolvers won't check for the new value for up to 24 hours—the TTL change hasn't propagated yet. <strong>Always wait for the old TTL to expire first.</strong></p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Mistake #2: Not Waiting for the Old TTL to Expire
                </h3>
                <p className="text-gray-700">Even though you set TTL to 300 seconds, resolvers that cached your record with the old TTL (e.g., 86400) will continue using the old TTL until it expires. The new TTL only takes effect after the old cached entry expires. This is why the 48-hour wait is essential.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Mistake #3: Only Lowering TTL on A Records
                </h3>
                <p className="text-gray-700">If you're migrating hosting, you probably also need to update MX records (email), TXT records (SPF/DKIM), and CNAME records. Lower TTL on ALL records you plan to change, not just the A record. Forgetting MX records is the #1 cause of post-migration email delivery problems.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Mistake #4: Forgetting to Raise TTL After Migration
                </h3>
                <p className="text-gray-700">Keeping TTL at 300 permanently creates unnecessary DNS query load. Once your migration is confirmed successful, raise TTL back to 3600 (1 hour) or higher. This reduces DNS traffic and slightly improves page load performance for returning visitors.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Real-World Example: Migrating from GoDaddy to Cloudflare</h2>
            <p className="text-gray-700 mb-4">
              Here's a practical walkthrough of a typical DNS migration scenario using the TTL lowering strategy:
            </p>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Scenario: Moving example.com from GoDaddy hosting to Cloudflare</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Day 1 (Monday):</strong> Your current DNS at GoDaddy has an A record pointing to <code className="bg-gray-100 px-1 rounded">192.168.1.100</code> (GoDaddy server) with TTL 3600 (1 hour). Log into GoDaddy and change the TTL on your A record, CNAME (www), MX records, and TXT records to 600 seconds (GoDaddy's minimum). Don't change any values—only the TTL.</p>
                <p><strong>Day 1 (Monday, +1 hour later):</strong> Use ReviewMyDNS to check your domain. Verify TTL values across global servers are showing 600 seconds instead of 3600. If any regions still show 3600, wait a bit longer.</p>
                <p><strong>Day 2 (Tuesday):</strong> All resolvers worldwide have now picked up the 600-second TTL. It's safe to proceed. Change your nameservers at GoDaddy to point to Cloudflare's nameservers. On Cloudflare, configure your A record to point to your new server IP.</p>
                <p><strong>Day 2 (Tuesday, +30 minutes):</strong> Monitor propagation with ReviewMyDNS. With 600-second TTL, most resolvers pick up the new nameservers within 30 minutes. Nameserver changes at the registry level may take additional time (up to 24 hours).</p>
                <p><strong>Day 3 (Wednesday):</strong> Propagation is 100% confirmed globally. All traffic is reaching Cloudflare. Raise TTL on all records to 3600 seconds (1 hour) in the Cloudflare dashboard. Decommission the old GoDaddy hosting.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Pre-Migration Checklist</h2>
            <div className="bg-green-50 p-5 rounded-lg border border-green-200 mb-8">
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Note your current TTL values for all records (A, AAAA, CNAME, MX, TXT)</span>
                </label>
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Lower TTL to 300 seconds on ALL records you'll be changing</span>
                </label>
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Wait for old TTL to expire (24–48 hours)</span>
                </label>
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Verify new TTL with <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">ReviewMyDNS propagation checker</Link></span>
                </label>
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Set up the new server/hosting before making DNS changes</span>
                </label>
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Keep the old server running during the transition period</span>
                </label>
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Make DNS changes and monitor propagation in real-time</span>
                </label>
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Test website, email, and all services on the new server</span>
                </label>
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Raise TTL back to 3600–86400 after confirmed propagation</span>
                </label>
                <label className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Decommission old server only after 48+ hours of stable operation</span>
                </label>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Related DNS Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <Link href="/what-is-ttl-in-dns" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-blue-600 mb-2">What Is TTL in DNS?</h3>
                    <p className="text-sm text-gray-600">Deep dive into how TTL works, recommended values, and how it controls DNS caching behavior.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dns-propagation-checker" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-blue-600 mb-2">DNS Propagation Checker</h3>
                    <p className="text-sm text-gray-600">Check your DNS propagation status across 50+ global servers in real-time.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/how-long-does-dns-propagation-take" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-blue-600 mb-2">How Long Does DNS Propagation Take?</h3>
                    <p className="text-sm text-gray-600">Detailed breakdown of propagation times by record type, provider, and TTL settings.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/domain-not-working-after-transfer" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-blue-600 mb-2">Domain Not Working After Transfer?</h3>
                    <p className="text-sm text-gray-600">Troubleshoot common issues when your domain stops working after a registrar or hosting transfer.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} ReviewMyDNS. Free DNS propagation checker and network diagnostic tools.</p>
          </div>
        </footer>
      </div>
    </>
  );
}