import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { PerformanceChart } from "@/components/performance-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function DnsPropagationChecker() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>DNS Propagation Checker (2026) - Test 50+ Global DNS Servers Free | ReviewMyDNS</title>
        <meta name="description" content="Instant DNS propagation checker. Verify A, MX, CNAME, TXT records across 50+ servers worldwide in real-time. See which regions have updated and which are lagging." />
        <meta name="keywords" content="dns propagation checker, check dns propagation, dns propagation test, verify dns changes, global dns checker, dns lookup tool" />
        <link rel="canonical" href="https://reviewmydns.com/dns-propagation-checker" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How long does DNS propagation take?", "acceptedAnswer": { "@type": "Answer", "text": "DNS propagation typically takes 15 minutes to 48 hours depending on the record type, TTL settings, and DNS provider. A records with low TTL values (300 seconds) can propagate in under 30 minutes. Changes involving nameserver delegation (NS records) or records with high TTL values (86400 seconds) can take up to 48 hours. Cloudflare and other modern providers often propagate changes within minutes." } },
            { "@type": "Question", "name": "Why are my DNS changes not showing up?", "acceptedAnswer": { "@type": "Answer", "text": "DNS changes may not appear immediately due to caching at multiple levels: your local machine DNS cache, your ISP's recursive resolver cache, and intermediate DNS caches. The most common cause is high TTL values on the old records. Try flushing your local DNS cache, testing from a different network, or using our propagation checker to see which global servers have updated." } },
            { "@type": "Question", "name": "What is a DNS propagation checker?", "acceptedAnswer": { "@type": "Answer", "text": "A DNS propagation checker is a tool that queries DNS servers around the world to verify whether your DNS changes have been updated globally. Instead of checking from just your location, it tests from 50+ servers across North America, Europe, Asia, and other regions, giving you a complete picture of propagation status." } },
            { "@type": "Question", "name": "How can I speed up DNS propagation?", "acceptedAnswer": { "@type": "Answer", "text": "To speed up DNS propagation: 1) Lower the TTL on your DNS records to 300 seconds (5 minutes) at least 24-48 hours before making changes. 2) Use a DNS provider with a fast global anycast network like Cloudflare. 3) After making changes, flush your local DNS cache. 4) Some providers like Cloudflare propagate changes within seconds to their edge network." } },
            { "@type": "Question", "name": "What DNS record types can I check?", "acceptedAnswer": { "@type": "Answer", "text": "Our DNS propagation checker supports all common record types: A (IPv4 address), AAAA (IPv6 address), CNAME (canonical name alias), MX (mail exchange for email), TXT (text records for SPF, DKIM, domain verification), NS (nameserver delegation), SOA (start of authority with zone metadata), and more." } },
            { "@type": "Question", "name": "Does changing DNS affect email?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, changing MX records directly affects email delivery. If you update MX records incorrectly, incoming emails may bounce or be delivered to the wrong server. Always verify MX records are correctly configured using a DNS checker before and after making changes. SPF and DKIM TXT records also affect email deliverability and spam filtering." } },
            { "@type": "Question", "name": "Why does DNS work in one location but not another?", "acceptedAnswer": { "@type": "Answer", "text": "This happens because DNS changes propagate at different speeds to different servers worldwide. Each DNS resolver caches records independently based on the TTL value. Servers closer to your authoritative DNS or with shorter cache lifetimes update faster. Use our global propagation checker to see exactly which regions have updated and which are still serving old records." } },
            { "@type": "Question", "name": "How do I check DNS propagation for a specific nameserver?", "acceptedAnswer": { "@type": "Answer", "text": "Enter your domain in our checker above and select the NS record type to check nameserver propagation specifically. For checking a domain against a specific DNS server, you can also use the command line: dig @8.8.8.8 example.com A (to query Google DNS) or nslookup example.com 1.1.1.1 (to query Cloudflare). Our tool automates this across 50+ servers simultaneously." } }
          ]
        }) }} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
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

        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Free DNS Propagation Checker
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Check DNS propagation across 50+ global servers instantly. Verify your DNS changes have propagated worldwide with our free DNS testing tool.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">50+ Global Servers</h3>
                  <p className="text-sm text-gray-600">Check DNS from servers worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Real-Time Results</h3>
                  <p className="text-sm text-gray-600">Instant propagation status</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">All Record Types</h3>
                  <p className="text-sm text-gray-600">A, AAAA, MX, CNAME, TXT, NS & more</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">100% Free</h3>
                  <p className="text-sm text-gray-600">50 lookups/day forever</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* DNS Lookup Form */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <DnsLookupForm onLookupComplete={handleLookupComplete} isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
        </section>

        {/* Results Section */}
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

        {/* SEO Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">What is DNS Propagation?</h2>
            <p className="text-gray-700 mb-4">
              DNS propagation is the time it takes for DNS changes to update across the internet's DNS servers. When you update DNS records (like changing nameservers or adding A records), these changes don't happen instantly everywhere.
            </p>
            <p className="text-gray-700 mb-6">
              Our DNS propagation checker lets you verify these changes across 50+ global DNS servers, so you know exactly when your DNS updates have propagated worldwide.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Check DNS Propagation</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Enter your domain name above</li>
              <li>Select the DNS record type you want to check (A, AAAA, MX, etc.)</li>
              <li>Click "Check DNS" to see real-time propagation status</li>
              <li>View results from 50+ global DNS servers on an interactive map</li>
            </ol>

            <h2 className="text-3xl font-bold mb-6 mt-12">Why Use Our DNS Checker?</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
              <li><strong>Global Coverage:</strong> Check DNS from 50+ servers across all continents</li>
              <li><strong>All Record Types:</strong> Support for A, AAAA, MX, CNAME, TXT, NS, SOA, and more</li>
              <li><strong>Real-Time Results:</strong> See propagation status within seconds</li>
              <li><strong>Visual Map:</strong> Interactive world map shows which regions have propagated</li>
              <li><strong>Free Forever:</strong> 50 lookups per day at no cost</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">Understanding DNS Propagation Times</h2>
            <p className="text-gray-700 mb-4">
              DNS propagation speed depends on the record type, TTL (Time to Live) values, and your DNS provider's infrastructure. Below is a general guide to expected propagation times for different DNS record types:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Record Type</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Typical Propagation Time</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Common Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">A / AAAA</td>
                    <td className="py-3 px-4">5 minutes – 24 hours</td>
                    <td className="py-3 px-4">Pointing domain to web server IP</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">CNAME</td>
                    <td className="py-3 px-4">5 minutes – 24 hours</td>
                    <td className="py-3 px-4">Aliasing subdomains (e.g., www → root)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">MX</td>
                    <td className="py-3 px-4">1 – 24 hours</td>
                    <td className="py-3 px-4">Email server routing</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">TXT</td>
                    <td className="py-3 px-4">5 minutes – 24 hours</td>
                    <td className="py-3 px-4">SPF, DKIM, domain verification</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">NS</td>
                    <td className="py-3 px-4">24 – 48 hours</td>
                    <td className="py-3 px-4">Nameserver delegation changes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">SOA</td>
                    <td className="py-3 px-4">Varies by zone</td>
                    <td className="py-3 px-4">Zone authority and refresh intervals</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">DNS Propagation by Provider</h2>
            <p className="text-gray-700 mb-4">
              Different DNS providers have varying propagation speeds based on their infrastructure, anycast networks, and caching strategies. Here is what to expect from major providers:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Cloudflare</h3>
                <p className="text-gray-700">Cloudflare's anycast network propagates changes within seconds to their edge servers worldwide. If your domain uses Cloudflare DNS, changes typically appear within 5 minutes globally. Cloudflare also offers a "purge cache" option to force immediate propagation.</p>
                <Link href="/guides/cloudflare-dns-setup" className="text-blue-600 hover:underline text-sm">→ Cloudflare DNS Setup Guide</Link>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">GoDaddy</h3>
                <p className="text-gray-700">GoDaddy DNS changes typically propagate within 1-4 hours for A records and TXT records. NS record changes (nameserver delegation) at GoDaddy can take up to 48 hours. GoDaddy uses a standard DNS infrastructure without anycast, so propagation may be slower compared to Cloudflare or Google Cloud DNS.</p>
                <Link href="/guides/godaddy-dns-setup" className="text-blue-600 hover:underline text-sm">→ GoDaddy DNS Setup Guide</Link>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Namecheap</h3>
                <p className="text-gray-700">Namecheap DNS propagation typically takes 30 minutes to 24 hours. Their BasicDNS and PremiumDNS services both handle record updates reliably, though PremiumDNS offers faster propagation and higher uptime guarantees.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">AWS Route 53 / Google Cloud DNS</h3>
                <p className="text-gray-700">Enterprise DNS providers like Route 53 and Google Cloud DNS propagate changes within 60 seconds to their global anycast networks. These are ideal for production workloads requiring fast, reliable DNS updates with 100% uptime SLAs.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common DNS Propagation Issues</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">High TTL on Old Records</h3>
                <p className="text-gray-700">If your previous DNS records had a TTL of 86400 (24 hours), resolvers worldwide will cache the old value for up to 24 hours. Solution: Lower TTL to 300 seconds 24-48 hours before making changes, then restore it afterward.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">ISP DNS Cache Not Refreshing</h3>
                <p className="text-gray-700">Some ISPs aggressively cache DNS records beyond their TTL to reduce load. This can cause DNS changes to appear stuck for certain users. Solution: Try using Google DNS (8.8.8.8) or Cloudflare (1.1.1.1) instead of your ISP's default resolver.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Local DNS Cache</h3>
                <p className="text-gray-700">Your operating system caches DNS lookups locally. Even if DNS has propagated globally, your machine might still show old results. Solution: Flush your local DNS cache (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on macOS).</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Wrong Nameservers Configured</h3>
                <p className="text-gray-700">If you changed DNS records at one provider but your domain's nameservers point to a different provider, the changes will never take effect. Solution: Verify which nameservers your domain is delegated to (check NS records) and make changes at the correct provider.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Conflicting DNS Records</h3>
                <p className="text-gray-700">Having both a CNAME and other record types (A, MX, TXT) on the same hostname violates DNS standards and causes unpredictable behavior. Solution: Remove conflicting records. A CNAME must be the only record at a given hostname (except at the zone apex, where CNAME is not allowed).</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Still experiencing issues? Check out our detailed guide on <Link href="/faq/why-dns-not-updating-24-hours" className="text-blue-600 hover:underline">why DNS changes take up to 24 hours</Link> for more troubleshooting steps.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">DNS Record Types Explained</h2>
            <p className="text-gray-700 mb-4">
              Understanding the different DNS record types is essential for proper DNS management. Here is a quick reference for each record type supported by our propagation checker:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">A Record</h3>
                <p className="text-sm text-gray-700">Maps a domain name to an IPv4 address. The most fundamental DNS record type. Example: example.com → 93.184.216.34</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">AAAA Record</h3>
                <p className="text-sm text-gray-700">Maps a domain name to an IPv6 address. Essential for modern internet connectivity. Example: example.com → 2606:2800:220:1:248:1893:25c8:1946</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">CNAME Record</h3>
                <p className="text-sm text-gray-700">Creates an alias from one domain name to another. Often used for www subdomains. Example: www.example.com → example.com</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">MX Record</h3>
                <p className="text-sm text-gray-700">Specifies mail servers for receiving email. Includes a priority value for failover. Example: mail.example.com (priority 10)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">TXT Record</h3>
                <p className="text-sm text-gray-700">Stores text strings for SPF email authentication, DKIM signatures, domain verification (Google, Microsoft), and other purposes.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">NS Record</h3>
                <p className="text-sm text-gray-700">Delegates a DNS zone to specific authoritative nameservers. Changing NS records redirects all DNS queries to a different provider.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">SOA Record</h3>
                <p className="text-sm text-gray-700">Contains zone metadata including the primary nameserver, admin email, serial number, and refresh/retry intervals.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">PTR Record</h3>
                <p className="text-sm text-gray-700">Maps an IP address back to a domain name (reverse DNS). Essential for email deliverability and server identification.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">How long does DNS propagation take?</h3>
                <p className="text-gray-700">DNS propagation typically takes 15 minutes to 48 hours depending on the record type, TTL settings, and DNS provider. A records with low TTL values can propagate in under 30 minutes. NS record changes can take up to 48 hours.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Why are my DNS changes not showing up?</h3>
                <p className="text-gray-700">DNS changes may not appear due to caching at multiple levels: your local machine, your ISP's recursive resolver, and intermediate caches. The most common cause is high TTL values. Try flushing your local DNS cache or using our checker to verify global status.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">How can I speed up DNS propagation?</h3>
                <p className="text-gray-700">Lower TTL to 300 seconds 24-48 hours before making changes. Use a provider with a fast anycast network like Cloudflare. Flush your local DNS cache after changes. Some providers propagate within seconds to their edge network.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Does changing DNS affect email?</h3>
                <p className="text-gray-700">Yes, MX record changes directly affect email delivery. Incorrect MX records can cause bounced emails. SPF and DKIM TXT records also impact email deliverability. Always verify these records before and after changes.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Why does DNS work in one location but not another?</h3>
                <p className="text-gray-700">Each DNS resolver caches records independently based on the TTL value. Servers with shorter cache lifetimes or closer to your authoritative DNS update faster. Our global checker shows exactly which regions have updated.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">What is TTL and how does it affect propagation?</h3>
                <p className="text-gray-700">TTL (Time to Live) tells DNS resolvers how long to cache a record before checking for updates. A TTL of 3600 means resolvers cache the record for 1 hour. Lower TTL values mean faster propagation but slightly more DNS traffic.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Can I force DNS to propagate faster?</h3>
                <p className="text-gray-700">You cannot force global DNS caches to expire early. However, you can pre-lower your TTL before changes, use providers with fast anycast networks, and flush local caches. Google and Cloudflare public DNS resolvers tend to respect TTL values accurately.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Is this DNS checker really free?</h3>
                <p className="text-gray-700">Yes, our DNS propagation checker is free with 50 lookups per day. This is sufficient for most individual users and small businesses. For unlimited lookups, monitoring, and analytics, see our <Link href="/pricing" className="text-blue-600 hover:underline">Pro plans</Link>.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Related DNS Tools and Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">GoDaddy DNS Setup</h3>
                <p className="text-sm text-gray-600 mb-2">Step-by-step guide to configuring DNS records on GoDaddy, including A records, CNAME, and MX setup.</p>
                <Link href="/guides/godaddy-dns-setup" className="text-blue-600 hover:underline text-sm">Read Guide →</Link>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Cloudflare DNS Setup</h3>
                <p className="text-sm text-gray-600 mb-2">Configure DNS on Cloudflare with proxy, SSL, and performance features. Includes DNSSEC activation.</p>
                <Link href="/guides/cloudflare-dns-setup" className="text-blue-600 hover:underline text-sm">Read Guide →</Link>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Why DNS Not Updating?</h3>
                <p className="text-sm text-gray-600 mb-2">Troubleshoot DNS changes that are not propagating within 24 hours, including common causes and fixes.</p>
                <Link href="/faq/why-dns-not-updating-24-hours" className="text-blue-600 hover:underline text-sm">Read FAQ →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need More DNS Checks?</h2>
            <p className="text-xl mb-8">Upgrade to Pro for unlimited lookups, monitoring, and analytics</p>
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
