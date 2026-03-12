import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield, AlertTriangle, Zap, Monitor, Terminal, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function HowToFlushDnsCache() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>How to Flush DNS Cache on Windows, Mac & Linux (2026) | ReviewMyDNS</title>
        <meta name="description" content="Step-by-step guide to flush DNS cache on Windows (ipconfig /flushdns), Mac (dscacheutil), Linux (systemd-resolve), Chrome, Firefox & Safari. Fix stale DNS records instantly." />
        <meta name="keywords" content="how to flush dns cache, clear dns cache, flush dns windows, flush dns mac, ipconfig flushdns, dscacheutil flushcache, clear dns cache chrome, flush dns linux" />
        <link rel="canonical" href="https://reviewmydns.com/how-to-flush-dns-cache" />
        <meta property="og:title" content="How to Flush DNS Cache on Windows, Mac & Linux (2026) | ReviewMyDNS" />
        <meta property="og:description" content="Complete guide to flushing DNS cache on every OS and browser. Fix DNS issues, stale records, and propagation problems in minutes." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/how-to-flush-dns-cache" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What does flushing DNS cache do?", "acceptedAnswer": { "@type": "Answer", "text": "Flushing DNS cache clears all stored DNS lookup results from your computer's memory. This forces your system to query DNS servers fresh for every domain you visit, ensuring you get the most up-to-date IP addresses. It's like clearing your browser history but specifically for DNS records that map domain names to IP addresses." } },
            { "@type": "Question", "name": "How do I flush DNS cache on Windows?", "acceptedAnswer": { "@type": "Answer", "text": "Open Command Prompt as Administrator (right-click Start menu → Command Prompt (Admin) or Windows Terminal (Admin)). Type 'ipconfig /flushdns' and press Enter. You'll see the message 'Successfully flushed the DNS Resolver Cache.' Alternatively, open PowerShell as Administrator and run 'Clear-DnsClientCache'." } },
            { "@type": "Question", "name": "How do I flush DNS cache on Mac?", "acceptedAnswer": { "@type": "Answer", "text": "On macOS Sonoma, Ventura, Monterey, and Big Sur, open Terminal and run: sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder. Enter your admin password when prompted. For older macOS versions (El Capitan through Catalina), the same command works. For macOS Sierra and earlier, use: sudo killall -HUP mDNSResponder." } },
            { "@type": "Question", "name": "How do I flush DNS cache on Linux?", "acceptedAnswer": { "@type": "Answer", "text": "On Linux systems using systemd-resolved (Ubuntu 18.04+, Fedora, etc.), run: sudo systemd-resolve --flush-caches. On systems using nscd, run: sudo service nscd restart. On systems using dnsmasq, run: sudo systemctl restart dnsmasq. You can verify the cache was cleared with: sudo systemd-resolve --statistics." } },
            { "@type": "Question", "name": "How do I clear DNS cache in Chrome?", "acceptedAnswer": { "@type": "Answer", "text": "Chrome maintains its own internal DNS cache separate from your operating system. To clear it: Type chrome://net-internals/#dns in the address bar and press Enter. Click the 'Clear host cache' button. Then go to chrome://net-internals/#sockets and click 'Flush socket pools' to ensure connections use the new DNS data." } },
            { "@type": "Question", "name": "When should I flush my DNS cache?", "acceptedAnswer": { "@type": "Answer", "text": "Flush your DNS cache when: 1) You just made DNS changes and want to see them immediately. 2) A website isn't loading but works for others. 3) You're seeing an old version of a website after a server migration. 4) You're getting DNS errors or being redirected to wrong pages. 5) You suspect DNS poisoning or security concerns. 6) You're testing DNS propagation after record changes." } },
            { "@type": "Question", "name": "Is it safe to flush DNS cache?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, flushing DNS cache is completely safe. It doesn't delete any personal data, passwords, or files. The only effect is that your first visit to each website after flushing will be slightly slower (by a few milliseconds) as your system re-queries DNS servers. The cache rebuilds automatically as you browse." } },
            { "@type": "Question", "name": "Why doesn't flushing DNS cache fix my issue?", "acceptedAnswer": { "@type": "Answer", "text": "If flushing doesn't help, the issue may be upstream: your ISP's DNS resolver may still have old cached records, the DNS change hasn't propagated to authoritative servers yet, or there's a configuration error in your DNS records. Use a DNS propagation checker like ReviewMyDNS to verify if your DNS changes have propagated globally across 50+ servers." } }
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
              How to Flush DNS Cache
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Clear your DNS cache on <strong>Windows, Mac, Linux</strong>, and all major browsers with simple commands. Fix stale DNS records, propagation issues, and website loading problems in seconds.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <RefreshCw className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Instant Fix</h3>
                  <p className="text-sm text-gray-600">Clear stale DNS in seconds</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Monitor className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Every OS</h3>
                  <p className="text-sm text-gray-600">Windows, Mac & Linux</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">All Browsers</h3>
                  <p className="text-sm text-gray-600">Chrome, Firefox & Safari</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">100% Safe</h3>
                  <p className="text-sm text-gray-600">No data loss, rebuilds automatically</p>
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
                To flush DNS cache: on <strong>Windows</strong>, open Command Prompt as Admin and run <code className="bg-gray-100 px-1 rounded">ipconfig /flushdns</code>. On <strong>Mac</strong>, open Terminal and run <code className="bg-gray-100 px-1 rounded">sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code>. On <strong>Linux</strong>, run <code className="bg-gray-100 px-1 rounded">sudo systemd-resolve --flush-caches</code>. This clears cached DNS records so your system fetches fresh data from DNS servers.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">What Is DNS Cache Flushing?</h2>
            <p className="text-gray-700 mb-4">
              Every time you visit a website, your computer performs a DNS lookup to translate the domain name (like <code className="bg-gray-100 px-1 rounded">example.com</code>) into an IP address. To speed things up, your operating system stores these lookups in a local <Link href="/what-is-dns-cache" className="text-blue-600 hover:underline font-medium">DNS cache</Link>—a temporary database of recent DNS queries and their results.
            </p>
            <p className="text-gray-700 mb-4">
              Flushing (or clearing) the DNS cache deletes all of these stored records, forcing your computer to look up fresh DNS information the next time you visit any website. Think of it like clearing your browser's auto-complete suggestions—it doesn't break anything, it just means your system starts fresh.
            </p>
            <p className="text-gray-700 mb-8">
              This is one of the most common and effective troubleshooting steps when you're experiencing DNS-related issues, and it takes only a few seconds on any operating system.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">When You Need to Flush DNS Cache</h2>
            <p className="text-gray-700 mb-4">
              You don't need to flush your DNS cache regularly—it's a troubleshooting tool for specific situations. Here are the five most common scenarios where flushing DNS is the right fix:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  1. After Making DNS Changes
                </h3>
                <p className="text-gray-700">You just updated your A record, CNAME, or MX records and want to see the changes immediately on your own machine. Your local cache is still serving the old IP address. Flushing forces a fresh lookup so you can verify your changes without waiting for the <Link href="/what-is-ttl-in-dns" className="text-blue-600 hover:underline">TTL</Link> to expire naturally.</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  2. Can't Reach a Website
                </h3>
                <p className="text-gray-700">A website works for other people but not for you, or you're getting "DNS_PROBE_FINISHED_NXDOMAIN" errors. Your cache may contain a stale or incorrect DNS entry. Flushing the cache clears the bad entry and lets your system resolve the domain fresh.</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-amber-500 mr-2" />
                  3. Security Concerns (DNS Poisoning)
                </h3>
                <p className="text-gray-700">If you suspect DNS cache poisoning—where a malicious actor has injected false DNS data—flushing the cache removes any potentially compromised entries. This is especially important if you've visited suspicious websites or if your network was recently compromised.</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  4. Testing DNS Configuration
                </h3>
                <p className="text-gray-700">You're a developer or system administrator testing DNS configurations and need to verify changes without cached data interfering. Flushing ensures every lookup goes directly to the DNS resolver chain, giving you accurate, real-time results.</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  5. Stale Records After Server Migration
                </h3>
                <p className="text-gray-700">You migrated a website to a new server and updated DNS, but your browser still loads the old server. The stale DNS cache is directing traffic to the old IP. Flush the cache and your system will resolve to the new server's IP address.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Flush DNS Cache on Windows</h2>
            <p className="text-gray-700 mb-4">
              The <code className="bg-gray-100 px-1 rounded">ipconfig /flushdns</code> command works on all Windows versions from Windows XP through Windows 11. Here's the step-by-step process:
            </p>

            <h3 className="text-2xl font-semibold mb-4 mt-8">Method 1: Command Prompt (All Windows Versions)</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Step 1:</strong> Press <code className="bg-gray-100 px-1 rounded">Windows + R</code> to open the Run dialog, type <code className="bg-gray-100 px-1 rounded">cmd</code>, and press <code className="bg-gray-100 px-1 rounded">Ctrl + Shift + Enter</code> to open Command Prompt as Administrator. Alternatively, right-click the Start button and select "Terminal (Admin)" or "Command Prompt (Admin)".</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Step 2:</strong> Type the following command and press Enter:</p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded mt-2 overflow-x-auto"><code>ipconfig /flushdns</code></pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Step 3:</strong> You should see the confirmation message: <code className="bg-gray-100 px-1 rounded">Successfully flushed the DNS Resolver Cache.</code> That's it—your DNS cache is now cleared.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4 mt-8">Method 2: Windows PowerShell</h3>
            <p className="text-gray-700 mb-3">
              PowerShell offers a dedicated cmdlet for DNS cache management with additional capabilities:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <p className="text-gray-700 mb-2">Open PowerShell as Administrator and run:</p>
              <pre className="bg-gray-900 text-green-400 p-3 rounded mt-2 overflow-x-auto"><code>Clear-DnsClientCache</code></pre>
              <p className="text-gray-700 mt-2 text-sm">To view the current cache before clearing, use: <code className="bg-gray-100 px-1 rounded">Get-DnsClientCache</code></p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Flush DNS Cache on macOS</h2>

            <h3 className="text-2xl font-semibold mb-4 mt-8">macOS Sonoma, Ventura, Monterey & Big Sur</h3>
            <p className="text-gray-700 mb-3">
              For macOS 11 (Big Sur) and later, including the latest Sonoma and Ventura releases:
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Step 1:</strong> Open Terminal (Applications → Utilities → Terminal, or press <code className="bg-gray-100 px-1 rounded">Cmd + Space</code> and search for "Terminal").</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Step 2:</strong> Run the following command:</p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded mt-2 overflow-x-auto"><code>sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code></pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Step 3:</strong> Enter your administrator password when prompted. There's no confirmation message—if no error appears, the flush was successful.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4 mt-8">Older macOS Versions</h3>
            <p className="text-gray-700 mb-3">
              Apple has changed the DNS flush command across different macOS versions. Here are the commands for older releases:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">macOS Version</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Command</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Catalina, Mojave, High Sierra</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">sudo killall -HUP mDNSResponder</code></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Sierra</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">sudo killall -HUP mDNSResponder</code></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">El Capitan</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">sudo killall -HUP mDNSResponder</code></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Yosemite (10.10.4+)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">sudo killall -HUP mDNSResponder</code></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Yosemite (10.10–10.10.3)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">sudo discoveryutil mdnsflushcache</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Mountain Lion, Lion</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">sudo killall -HUP mDNSResponder</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Flush DNS Cache on Linux</h2>

            <h3 className="text-2xl font-semibold mb-4 mt-8">Linux with systemd-resolved (Ubuntu, Fedora, etc.)</h3>
            <p className="text-gray-700 mb-3">
              Most modern Linux distributions (Ubuntu 18.04+, Fedora 33+, Arch Linux) use <code className="bg-gray-100 px-1 rounded">systemd-resolved</code> for DNS caching:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <pre className="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto"><code>sudo systemd-resolve --flush-caches</code></pre>
              <p className="text-gray-700 mt-2 text-sm">On newer systemd versions, use: <code className="bg-gray-100 px-1 rounded">sudo resolvectl flush-caches</code></p>
            </div>

            <h3 className="text-2xl font-semibold mb-4 mt-8">Linux with nscd</h3>
            <p className="text-gray-700 mb-3">
              Some Linux distributions use the Name Service Cache Daemon (nscd). To flush its cache:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <pre className="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto"><code>sudo service nscd restart</code></pre>
              <p className="text-gray-700 mt-2 text-sm">Or alternatively: <code className="bg-gray-100 px-1 rounded">sudo /etc/init.d/nscd restart</code></p>
            </div>

            <h3 className="text-2xl font-semibold mb-4 mt-8">Linux with dnsmasq</h3>
            <p className="text-gray-700 mb-3">
              If your system uses dnsmasq as a local DNS forwarder:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
              <pre className="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto"><code>sudo systemctl restart dnsmasq</code></pre>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Flush DNS Cache in Web Browsers</h2>
            <p className="text-gray-700 mb-4">
              Web browsers maintain their own DNS cache, separate from your operating system's cache. Even after flushing your OS cache, your browser may still serve stale DNS entries. Here's how to clear browser-level DNS cache:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-2" />
                  Google Chrome
                </h3>
                <p className="text-gray-700 mb-2">Chrome has a built-in DNS cache viewer and flush tool:</p>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Type <code className="bg-gray-100 px-1 rounded">chrome://net-internals/#dns</code> in the address bar</li>
                  <li>Click <strong>"Clear host cache"</strong></li>
                  <li>Then navigate to <code className="bg-gray-100 px-1 rounded">chrome://net-internals/#sockets</code></li>
                  <li>Click <strong>"Flush socket pools"</strong> to close existing connections</li>
                </ol>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-2" />
                  Mozilla Firefox
                </h3>
                <p className="text-gray-700 mb-2">Firefox also maintains its own DNS cache:</p>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Type <code className="bg-gray-100 px-1 rounded">about:networking#dns</code> in the address bar</li>
                  <li>Click <strong>"Clear DNS Cache"</strong></li>
                  <li>Alternatively, simply restart Firefox to clear all cached DNS entries</li>
                </ol>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-2" />
                  Microsoft Edge
                </h3>
                <p className="text-gray-700 mb-2">Edge uses the same Chromium engine as Chrome, so the process is nearly identical:</p>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Type <code className="bg-gray-100 px-1 rounded">edge://net-internals/#dns</code> in the address bar</li>
                  <li>Click <strong>"Clear host cache"</strong></li>
                  <li>Then navigate to <code className="bg-gray-100 px-1 rounded">edge://net-internals/#sockets</code></li>
                  <li>Click <strong>"Flush socket pools"</strong> to ensure connections are refreshed</li>
                </ol>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-2" />
                  Safari
                </h3>
                <p className="text-gray-700 mb-2">Safari requires enabling the Develop menu first:</p>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Go to <strong>Safari → Settings → Advanced</strong></li>
                  <li>Check <strong>"Show features for web developers"</strong> (or "Show Develop menu" on older versions)</li>
                  <li>Click <strong>Develop → Empty Caches</strong> from the menu bar</li>
                  <li>This clears all cached data, including DNS entries</li>
                </ol>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Quick Reference Table</h2>
            <p className="text-gray-700 mb-4">
              Here's a complete reference table with flush commands for every operating system and browser:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">OS / Browser</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Command</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Windows (CMD)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">ipconfig /flushdns</code></td>
                    <td className="py-3 px-4">Run as Administrator</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Windows (PowerShell)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">Clear-DnsClientCache</code></td>
                    <td className="py-3 px-4">Run as Administrator</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">macOS (Sonoma+)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder</code></td>
                    <td className="py-3 px-4">Requires admin password</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Linux (systemd)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">sudo systemd-resolve --flush-caches</code></td>
                    <td className="py-3 px-4">Ubuntu 18.04+, Fedora</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Linux (nscd)</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">sudo service nscd restart</code></td>
                    <td className="py-3 px-4">Older distributions</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Chrome</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">chrome://net-internals/#dns</code></td>
                    <td className="py-3 px-4">Click "Clear host cache"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Firefox</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">about:networking#dns</code></td>
                    <td className="py-3 px-4">Click "Clear DNS Cache"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Edge</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded text-xs">edge://net-internals/#dns</code></td>
                    <td className="py-3 px-4">Click "Clear host cache"</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Safari</td>
                    <td className="py-3 px-4">Develop → Empty Caches</td>
                    <td className="py-3 px-4">Enable Develop menu first</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Verify DNS Cache Was Flushed</h2>
            <p className="text-gray-700 mb-4">
              After flushing, you can verify the cache was successfully cleared:
            </p>
            <div className="space-y-3 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Windows</h3>
                <p className="text-gray-700 mb-2">View the current DNS cache contents with:</p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto"><code>ipconfig /displaydns</code></pre>
                <p className="text-gray-700 mt-2 text-sm">If the cache was flushed successfully, this will return minimal or no entries. As you browse, entries will start appearing again.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">macOS / Linux</h3>
                <p className="text-gray-700 mb-2">Use <code className="bg-gray-100 px-1 rounded">nslookup</code> or <code className="bg-gray-100 px-1 rounded">dig</code> to verify the domain resolves to the expected new IP:</p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto"><code>nslookup example.com{"\n"}dig example.com</code></pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Linux (systemd-resolved)</h3>
                <p className="text-gray-700 mb-2">Check cache statistics to confirm it was reset:</p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto"><code>sudo systemd-resolve --statistics</code></pre>
                <p className="text-gray-700 mt-2 text-sm">The "Current Cache Size" should show 0 or a very low number immediately after flushing.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">What If Flushing DNS Doesn't Fix the Issue?</h2>
            <p className="text-gray-700 mb-4">
              Flushing your local DNS cache only clears records stored on <strong>your specific device</strong>. If you're still seeing old DNS data after flushing, the issue is likely upstream:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  ISP Resolver Cache
                </h3>
                <p className="text-gray-700">Your ISP's DNS resolver still has the old record cached. You can bypass this by switching to Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1) temporarily. Some ISPs cache records longer than the TTL specifies.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  DNS Changes Haven't Propagated Yet
                </h3>
                <p className="text-gray-700">The DNS change hasn't reached all global DNS servers yet. This is normal—<Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline font-medium">DNS propagation takes 5 minutes to 48 hours</Link> depending on record type and TTL settings. Use the propagation checker above to see real-time status across 50+ servers.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  DNS Configuration Error
                </h3>
                <p className="text-gray-700">The DNS record itself may have an error. Double-check your DNS records at your registrar or DNS provider. Common mistakes include typos in IP addresses, missing trailing dots on CNAME records, and conflicting record types. Use <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">ReviewMyDNS</Link> to verify your records resolve correctly worldwide.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Browser Cache (Not DNS Cache)
                </h3>
                <p className="text-gray-700">Your browser may be caching the page itself (HTTP cache), not just the DNS entry. Try a hard refresh (<code className="bg-gray-100 px-1 rounded">Ctrl + Shift + R</code> or <code className="bg-gray-100 px-1 rounded">Cmd + Shift + R</code>), opening the page in an incognito/private window, or clearing your full browser cache.</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2" />
                Pro Tip: Check Global Propagation Status
              </h3>
              <p className="text-gray-700">
                If flushing your local DNS cache doesn't resolve your issue, use the <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">ReviewMyDNS propagation checker</Link> above to verify whether your DNS changes have actually propagated globally. This queries 50+ DNS servers worldwide and shows you exactly which regions have received the updated records and which are still serving cached data.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Related DNS Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <Link href="/what-is-dns-cache" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-blue-600 mb-2">What Is DNS Cache?</h3>
                    <p className="text-sm text-gray-600">Understand how DNS caching works, why it exists, and how it affects your browsing experience.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dns-not-propagating" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-blue-600 mb-2">DNS Not Propagating?</h3>
                    <p className="text-sm text-gray-600">Troubleshoot DNS propagation issues and learn why your changes might not be showing up.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/what-is-ttl-in-dns" className="block">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-blue-600 mb-2">What Is TTL in DNS?</h3>
                    <p className="text-sm text-gray-600">Learn how Time to Live values control DNS caching and affect propagation speed.</p>
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