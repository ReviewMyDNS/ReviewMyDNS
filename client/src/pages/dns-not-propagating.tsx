import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, AlertTriangle, Clock, Shield, Terminal, RefreshCw, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function DnsNotPropagating() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>DNS Not Propagating? Fix It Now (2026 Troubleshooting Guide) | ReviewMyDNS</title>
        <meta name="description" content="DNS not propagating? DNS not updating after changes? This step-by-step troubleshooting guide covers the top 7 reasons DNS changes aren't working and how to fix them fast." />
        <meta name="keywords" content="dns not propagating, dns not updating, dns changes not working, dns propagation fix, why is my dns not updating, dns not resolving, dns cache flush" />
        <link rel="canonical" href="https://reviewmydns.com/dns-not-propagating" />
        <meta property="og:title" content="DNS Not Propagating? Fix It Now (2026 Troubleshooting Guide)" />
        <meta property="og:description" content="Step-by-step guide to fix DNS propagation issues. Covers TTL caching, wrong nameservers, ISP cache, and more." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/dns-not-propagating" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Why is my DNS not propagating?", "acceptedAnswer": { "@type": "Answer", "text": "The most common reasons DNS isn't propagating are: high TTL values on old records causing extended caching, editing DNS records at the wrong provider (your nameservers point elsewhere), ISP-level DNS caching, local machine DNS cache, conflicting DNS records (e.g., CNAME alongside A or MX records), domain registrar holds or locks, and DNS provider outages. Use a global DNS propagation checker to verify which servers have updated and which are still serving stale data." } },
            { "@type": "Question", "name": "How long should I wait for DNS to propagate?", "acceptedAnswer": { "@type": "Answer", "text": "DNS propagation typically takes 15 minutes to 48 hours. A and CNAME records with low TTL (300 seconds) can propagate in under 30 minutes. MX records usually take 1-4 hours. NS record changes (nameserver delegation) can take 24-48 hours. If your records haven't updated after 48 hours, there is likely a configuration issue rather than a propagation delay." } },
            { "@type": "Question", "name": "How do I flush my DNS cache?", "acceptedAnswer": { "@type": "Answer", "text": "To flush DNS cache: On Windows, open Command Prompt as Administrator and run 'ipconfig /flushdns'. On macOS, open Terminal and run 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder'. On Linux, run 'sudo systemd-resolve --flush-caches' (systemd) or 'sudo /etc/init.d/nscd restart' (nscd). Also clear your browser cache or test in an incognito window, as browsers cache DNS independently." } },
            { "@type": "Question", "name": "Why does my DNS work on some networks but not others?", "acceptedAnswer": { "@type": "Answer", "text": "Different networks use different DNS resolvers, each with its own cache. Your home ISP, mobile carrier, and office network all cache DNS records independently. If DNS works on one network but not another, the non-working network's resolver is still serving cached old records. Try switching to Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1) to bypass your ISP's cache." } },
            { "@type": "Question", "name": "I changed my DNS but the website still shows old content. What's wrong?", "acceptedAnswer": { "@type": "Answer", "text": "This could be caused by: 1) Your browser caching the old IP address (clear browser cache or use incognito mode), 2) Your local OS DNS cache (flush it), 3) The old TTL hasn't expired yet on resolvers, 4) You made changes at the wrong DNS provider (check which nameservers your domain uses), or 5) CDN or web server caching at the hosting level. Use a DNS propagation checker to confirm the DNS records themselves have actually changed globally." } },
            { "@type": "Question", "name": "Should I contact my DNS provider or domain registrar?", "acceptedAnswer": { "@type": "Answer", "text": "Contact your domain registrar if: your domain is locked, expired, or on hold; you need to change nameservers; or WHOIS shows incorrect delegation. Contact your DNS provider (where your nameservers point) if: DNS records aren't updating in their control panel; you suspect a provider outage; or records appear correct in their panel but aren't resolving globally. Check your NS records first to determine which provider is authoritative for your domain." } },
            { "@type": "Question", "name": "Can I force DNS to propagate faster?", "acceptedAnswer": { "@type": "Answer", "text": "You cannot force global DNS propagation, but you can prepare for faster updates: 1) Lower your TTL to 300 seconds (5 minutes) at least 24-48 hours before making changes. 2) Use a DNS provider with a fast anycast network like Cloudflare, which propagates changes within seconds to their edge. 3) After making changes, flush your local DNS cache and test with public resolvers (8.8.8.8, 1.1.1.1). 4) Some providers offer a 'purge cache' option to force their edge servers to refresh." } }
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
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <AlertTriangle className="h-4 w-4" />
              Troubleshooting Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              DNS Not Propagating? Here's How to Fix It
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Made DNS changes but they're not showing up? You're not alone. Use our free tool below to check your DNS propagation status right now, then follow our troubleshooting guide to fix it.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Global DNS Check</h3>
                  <p className="text-sm text-gray-600">See which servers have your updated records</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">TTL Analysis</h3>
                  <p className="text-sm text-gray-600">Understand how long caching will delay your changes</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <AlertCircle className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Error Detection</h3>
                  <p className="text-sm text-gray-600">Identify misconfigurations and conflicts</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">100% Free</h3>
                  <p className="text-sm text-gray-600">50 lookups/day, no sign-up required</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your DNS Right Now</h2>
              <p className="text-gray-600">Enter your domain below to see real-time propagation status across 50+ global servers</p>
            </div>
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
            <h2 className="text-3xl font-bold mb-6">Why Is My DNS Not Propagating?</h2>
            <p className="text-gray-700 mb-4">
              You've updated your DNS records — maybe you switched hosting providers, pointed your domain to a new server, or added an MX record for email — but the changes aren't showing up. Hours have passed, maybe even a full day, and your old website (or worse, an error page) still appears. What's going on?
            </p>
            <p className="text-gray-700 mb-4">
              DNS propagation is the process by which updated DNS records spread to DNS resolvers around the world. When you make a change in your DNS provider's control panel, that change doesn't instantly reach every DNS server on the planet. Instead, each resolver holds a cached copy of your old records and only refreshes them when the cache expires (determined by the TTL — Time to Live).
            </p>
            <p className="text-gray-700 mb-6">
              However, many cases where DNS "isn't propagating" aren't actually propagation delays at all — they're configuration mistakes that prevent propagation from ever happening. Let's walk through the top 7 reasons your DNS changes aren't working and exactly how to fix each one.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <RefreshCw className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Quick Check: Is It Actually Propagating?</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Before troubleshooting, use our <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-blue-600 font-medium hover:underline">DNS checker above</a> to see the current state of your records across 50+ global servers. If some servers show the new value and others show the old one, propagation is in progress — just slow. If <strong>zero servers</strong> show the new value, you likely have a configuration issue.
                  </p>
                  <p className="text-blue-800 text-sm">
                    You can also use our dedicated <Link href="/dns-propagation-checker" className="text-blue-600 font-medium hover:underline">DNS Propagation Checker</Link> for a detailed analysis.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Top 7 Reasons DNS Isn't Propagating</h2>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  High TTL on Old Records
                </h3>
                <p className="text-gray-700 mb-3">
                  This is the most common reason DNS changes appear "stuck." TTL (Time to Live) tells DNS resolvers how long to cache a record before checking for updates. If your old A record had a TTL of 86400 (24 hours), every resolver worldwide will continue serving that cached value for up to 24 hours — even after you've changed the record at your DNS provider.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-800 font-medium text-sm">Common Mistake</p>
                      <p className="text-yellow-700 text-sm">Many people change their DNS records without lowering the TTL first. If your old record has a 24-hour TTL, you'll wait up to 24 hours regardless of how fast your DNS provider processes the change.</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-2"><strong>How to fix it:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Before making DNS changes, lower the TTL on the record to 300 seconds (5 minutes) at least 24-48 hours in advance</li>
                  <li>Wait for the old TTL period to expire so resolvers fetch the low-TTL version</li>
                  <li>Make your DNS change — it will now propagate within minutes</li>
                  <li>After confirming propagation, raise the TTL back to a normal value (3600-86400 seconds)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Wrong Nameservers Configured
                </h3>
                <p className="text-gray-700 mb-3">
                  This is the second most common — and most frustrating — cause of DNS not propagating. You're editing DNS records at Provider A, but your domain's nameservers actually point to Provider B. Your changes at Provider A are completely ignored because no resolver ever queries Provider A for your domain.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium text-sm">Critical Check</p>
                      <p className="text-red-700 text-sm">Run an NS record lookup on your domain. The nameservers listed are the ONLY place where your DNS records matter. If they don't match where you're editing records, your changes will never take effect.</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-2"><strong>How to fix it:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Check your domain's NS records using our tool above (select NS record type)</li>
                  <li>Log into the provider those nameservers belong to and make your DNS changes there</li>
                  <li>If you intentionally moved to a new DNS provider, update the nameservers at your domain registrar first</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  ISP DNS Cache
                </h3>
                <p className="text-gray-700 mb-3">
                  Your Internet Service Provider (ISP) runs recursive DNS resolvers that cache records aggressively — sometimes even beyond the TTL expiration. This means even after your DNS has propagated to most public resolvers, your ISP's DNS server may still serve the old cached value.
                </p>
                <p className="text-gray-700 mb-2"><strong>How to fix it:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Switch your device or router to use a public DNS resolver instead of your ISP's default:
                    <ul className="list-disc list-inside ml-6 mt-1">
                      <li>Google DNS: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">8.8.8.8</code> and <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">8.8.4.4</code></li>
                      <li>Cloudflare DNS: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">1.1.1.1</code> and <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">1.0.0.1</code></li>
                    </ul>
                  </li>
                  <li>Test from a mobile hotspot (uses your carrier's DNS, not your ISP)</li>
                  <li>Use our propagation checker to confirm global status independently of your ISP</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Local DNS Cache on Your Device
                </h3>
                <p className="text-gray-700 mb-3">
                  Your operating system and browser maintain their own DNS caches. Even if DNS has fully propagated globally, your computer might still show old results because it's serving a locally cached response. This is the most common reason it "works on my phone but not my laptop."
                </p>
                <p className="text-gray-700 mb-2"><strong>How to fix it — flush your DNS cache:</strong></p>

                <div className="space-y-4 mt-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">Windows (Run as Administrator)</span>
                    </div>
                    <code className="text-gray-100 text-sm block">ipconfig /flushdns</code>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">macOS (Terminal)</span>
                    </div>
                    <code className="text-gray-100 text-sm block">sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">Linux (systemd-resolved)</span>
                    </div>
                    <code className="text-gray-100 text-sm block">sudo systemd-resolve --flush-caches</code>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">Linux (nscd)</span>
                    </div>
                    <code className="text-gray-100 text-sm block">sudo /etc/init.d/nscd restart</code>
                  </div>
                </div>

                <p className="text-gray-700 mt-4">
                  After flushing your OS cache, also clear your browser cache or open an incognito/private window. Chrome, Firefox, and Safari all maintain separate DNS caches that can hold stale records.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Conflicting DNS Records
                </h3>
                <p className="text-gray-700 mb-3">
                  DNS standards prohibit certain record combinations. The most common conflict: having a CNAME record alongside other record types (A, MX, TXT) on the same hostname. When this happens, resolver behavior becomes unpredictable — some will return the CNAME, some the A record, and some will fail entirely.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-800 font-medium text-sm">Common Mistake</p>
                      <p className="text-yellow-700 text-sm">Adding a CNAME for "example.com" (the zone apex) alongside MX records. CNAME records are NOT allowed at the zone apex. Use an A record (or ALIAS/ANAME if your provider supports it) for the root domain instead.</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-2"><strong>How to fix it:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Review all records for the hostname you're changing</li>
                  <li>Remove duplicate or conflicting record types</li>
                  <li>A CNAME must be the only record at a given hostname (no other A, MX, TXT records alongside it)</li>
                  <li>For the zone apex (bare domain), use A records, not CNAME</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  For a deeper dive into record conflicts, see our <Link href="/errors" className="text-blue-600 hover:underline">DNS error reference</Link>.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  Domain Registrar Lock or Hold
                </h3>
                <p className="text-gray-700 mb-3">
                  Your domain registrar can place holds or locks on your domain that prevent DNS changes from taking effect. Common causes include: expired domains, registrar-level security locks (clientHold, serverHold), ICANN verification pending for new domains, or payment failures at the registrar.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium text-sm">Watch Out</p>
                      <p className="text-red-700 text-sm">A "clientHold" status on your domain means it's been suspended by the registrar. Your DNS records still exist but the domain won't resolve at all. Check your registrar account for pending actions, verification emails, or overdue payments.</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-2"><strong>How to fix it:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Log into your domain registrar and check the domain status</li>
                  <li>Look for pending ICANN email verification (check spam folders)</li>
                  <li>Ensure your domain registration hasn't expired</li>
                  <li>Verify there are no unpaid invoices blocking the domain</li>
                  <li>If a transfer lock is enabled, disable it temporarily if you need to change nameservers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">7</span>
                  DNS Provider Outage
                </h3>
                <p className="text-gray-700 mb-3">
                  Occasionally, your DNS provider may be experiencing an outage or degraded performance. If their authoritative nameservers are down or slow, resolvers worldwide will either return stale cached data or fail to resolve entirely. This is rare with major providers but can happen.
                </p>
                <p className="text-gray-700 mb-2"><strong>How to fix it:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Check your DNS provider's status page for reported incidents</li>
                  <li>Use our tool to check if your domain's NS records are resolving correctly</li>
                  <li>Query your authoritative nameservers directly to see if they respond</li>
                  <li>If the outage persists, consider migrating to a provider with better uptime (Cloudflare, Route 53, Google Cloud DNS)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Step-by-Step DNS Troubleshooting Checklist</h2>
            <p className="text-gray-700 mb-4">
              Follow this checklist in order to systematically diagnose why your DNS changes aren't working:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  <div><strong>Run a propagation check.</strong> Use our <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-blue-600 hover:underline">DNS checker above</a> to see which servers have your new records and which still show old values.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  <div><strong>Check your NS records.</strong> Verify which nameservers your domain uses. Are you editing records at the correct provider?</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  <div><strong>Verify the records at your authoritative DNS provider.</strong> Log in and confirm the records look correct in their control panel.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                  <div><strong>Check the TTL on your old records.</strong> If the TTL was 86400 (24 hours), you may need to wait up to 24 hours. Plan TTL reductions before future changes.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</span>
                  <div><strong>Flush your local DNS cache.</strong> Run the appropriate command for your OS (see commands above) and clear your browser cache.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">6</span>
                  <div><strong>Test with a public DNS resolver.</strong> Try querying <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">8.8.8.8</code> or <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">1.1.1.1</code> directly to bypass ISP caching.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">7</span>
                  <div><strong>Look for conflicting records.</strong> Check for CNAME conflicts, duplicate records, or records that shouldn't coexist.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">8</span>
                  <div><strong>Verify domain status.</strong> Check your registrar for locks, holds, expiration, or pending verification.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">9</span>
                  <div><strong>Check your DNS provider's status page.</strong> Rule out a provider-side outage.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">10</span>
                  <div><strong>Wait and re-check.</strong> If some servers show the new value and some don't, propagation is working — it just needs more time. Re-run the checker in 30-60 minutes.</div>
                </li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Flush DNS Cache (All Operating Systems)</h2>
            <p className="text-gray-700 mb-4">
              Flushing your DNS cache forces your computer to request fresh records from DNS servers instead of relying on potentially outdated cached copies. Here are the commands for every major operating system:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Operating System</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Command</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Windows 10/11</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">ipconfig /flushdns</code></td>
                    <td className="py-3 px-4">Run Command Prompt as Administrator</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">macOS (Ventura+)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code></td>
                    <td className="py-3 px-4">Enter your password when prompted</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Linux (systemd)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">sudo systemd-resolve --flush-caches</code></td>
                    <td className="py-3 px-4">For systems using systemd-resolved</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Linux (nscd)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">sudo /etc/init.d/nscd restart</code></td>
                    <td className="py-3 px-4">For systems using nscd</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Chrome Browser</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">chrome://net-internals/#dns</code></td>
                    <td className="py-3 px-4">Click "Clear host cache" button</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">When to Contact Your DNS Provider vs. Registrar</h2>
            <p className="text-gray-700 mb-4">
              People often confuse their domain registrar (where they bought the domain) with their DNS provider (where DNS records are hosted). Sometimes they're the same company, but often they're different. Here's when to contact each:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Contact Your DNS Provider When:
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• DNS records aren't updating in their control panel</li>
                  <li>• Records appear correct but aren't resolving globally</li>
                  <li>• You suspect a provider outage or API issue</li>
                  <li>• You need help configuring specific record types</li>
                  <li>• Zone file or DNSSEC configuration issues</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Contact Your Domain Registrar When:
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Your domain is locked, expired, or suspended</li>
                  <li>• You need to update nameservers (NS delegation)</li>
                  <li>• WHOIS shows incorrect or outdated information</li>
                  <li>• You have pending ICANN email verification</li>
                  <li>• Transfer locks are preventing changes</li>
                  <li>• Domain renewal or payment issues</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-800 font-medium text-sm">Pro Tip: Check Your NS Records First</p>
                  <p className="text-yellow-700 text-sm">Run an NS lookup on your domain before contacting support. The nameservers listed tell you exactly which company controls your DNS. If you see <code className="bg-yellow-100 px-1 rounded text-xs">ns1.cloudflare.com</code>, your DNS is at Cloudflare — even if you bought the domain at GoDaddy.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Prevent DNS Propagation Delays in the Future</h2>
            <p className="text-gray-700 mb-4">
              Once you've resolved your current DNS issue, follow these best practices to ensure smooth DNS changes going forward:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8 ml-4">
              <li><strong>Lower TTL before changes:</strong> Set TTL to 300 seconds 24-48 hours before any planned DNS change. This is the single most effective way to speed up propagation.</li>
              <li><strong>Use a modern DNS provider:</strong> Providers like Cloudflare propagate changes within seconds to their global anycast network. Legacy providers can take hours.</li>
              <li><strong>Document your DNS setup:</strong> Know which registrar and DNS provider you use, and where each record is managed. This prevents the "wrong provider" mistake.</li>
              <li><strong>Set up monitoring:</strong> Use a DNS monitoring tool to get alerts when records change unexpectedly. Catch issues before users notice.</li>
              <li><strong>Verify after every change:</strong> Always run a <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">propagation check</Link> after making DNS changes to confirm they're taking effect globally.</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">Related Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link href="/dns-propagation-checker" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-blue-600 mb-1">DNS Propagation Checker →</h3>
                <p className="text-sm text-gray-600">Check your DNS records across 50+ global servers instantly</p>
              </Link>
              <Link href="/how-long-does-dns-propagation-take" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-blue-600 mb-1">How Long Does DNS Propagation Take? →</h3>
                <p className="text-sm text-gray-600">Detailed breakdown of propagation times by record type and provider</p>
              </Link>
              <Link href="/guides" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-blue-600 mb-1">DNS Setup Guides →</h3>
                <p className="text-sm text-gray-600">Step-by-step guides for Cloudflare, GoDaddy, Namecheap, and more</p>
              </Link>
              <Link href="/faq" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-blue-600 mb-1">DNS FAQ →</h3>
                <p className="text-sm text-gray-600">Answers to the most common DNS questions</p>
              </Link>
              <Link href="/errors" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-blue-600 mb-1">DNS Error Reference →</h3>
                <p className="text-sm text-gray-600">Diagnose and fix common DNS errors like NXDOMAIN, SERVFAIL, and REFUSED</p>
              </Link>
              <Link href="/" className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-blue-600 mb-1">ReviewMyDNS Home →</h3>
                <p className="text-sm text-gray-600">Full-featured DNS checker with monitoring, alerts, and analytics</p>
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Logo size="sm" className="mx-auto mb-4" />
            <p className="text-sm mb-4">ReviewMyDNS — Free DNS Propagation Checker & Monitoring</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/dns-propagation-checker" className="hover:text-white">DNS Checker</Link>
              <Link href="/guides" className="hover:text-white">Guides</Link>
              <Link href="/faq" className="hover:text-white">FAQ</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}