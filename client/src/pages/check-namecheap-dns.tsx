import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function CheckNamecheapDns() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Check Namecheap DNS Propagation (2026) - Free Namecheap DNS Checker | ReviewMyDNS</title>
        <meta name="description" content="Check Namecheap DNS propagation instantly across 50+ global servers. Verify if your Namecheap DNS changes have propagated, troubleshoot Namecheap DNS not working issues, and compare BasicDNS vs PremiumDNS propagation." />
        <meta name="keywords" content="check namecheap dns, namecheap dns propagation, namecheap dns not working, namecheap dns checker, namecheap basicdns, namecheap premiumdns" />
        <link rel="canonical" href="https://reviewmydns.com/check-namecheap-dns" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How long does Namecheap DNS propagation take?", "acceptedAnswer": { "@type": "Answer", "text": "Namecheap DNS propagation typically takes 30 minutes to 24 hours for most record types (A, CNAME, MX, TXT). Nameserver changes can take 24-48 hours. If you're using Namecheap's PremiumDNS service, propagation tends to be faster due to their enhanced infrastructure. BasicDNS works reliably but may be slightly slower. Lowering TTL before making changes can significantly reduce propagation time." } },
            { "@type": "Question", "name": "What is the difference between Namecheap BasicDNS and PremiumDNS?", "acceptedAnswer": { "@type": "Answer", "text": "BasicDNS is Namecheap's free DNS hosting included with every domain. It provides standard DNS resolution with reasonable uptime. PremiumDNS is a paid upgrade ($4.88/year) that offers 100% uptime SLA, faster propagation, DDoS protection, DNSSEC support, and a global anycast network for faster DNS resolution worldwide. For business-critical domains, PremiumDNS is recommended for better reliability and speed." } },
            { "@type": "Question", "name": "Why is my Namecheap DNS not working?", "acceptedAnswer": { "@type": "Answer", "text": "Common reasons Namecheap DNS stops working include: 1) Your domain's nameservers are not set to Namecheap's BasicDNS or PremiumDNS nameservers. 2) DNS records were not saved properly — verify in the Advanced DNS tab. 3) You're editing DNS at Namecheap but your nameservers point to a different provider (like Cloudflare). 4) Domain expired or is in redemption period. 5) High TTL values from previous records are causing caching delays." } },
            { "@type": "Question", "name": "How do I change DNS records at Namecheap?", "acceptedAnswer": { "@type": "Answer", "text": "To change DNS records at Namecheap: 1) Log in to your Namecheap account. 2) Go to Domain List and click 'Manage' next to your domain. 3) Click the 'Advanced DNS' tab. 4) You'll see your existing records. Click 'Add New Record' to create a new one, or click the edit icon next to an existing record to modify it. 5) Select the record type, enter the host, value, and TTL. 6) Click the green checkmark to save. Changes are applied immediately to Namecheap's servers." } },
            { "@type": "Question", "name": "What are Namecheap's nameservers?", "acceptedAnswer": { "@type": "Answer", "text": "Namecheap's BasicDNS nameservers are dns1.registrar-servers.com and dns2.registrar-servers.com. For PremiumDNS, the nameservers are pdns01.registrar-servers.com through pdns05.registrar-servers.com (5 nameservers for redundancy). If you're using custom nameservers from a third-party provider like Cloudflare, you'll need to enter those instead in the Domain tab under Nameservers." } },
            { "@type": "Question", "name": "Can I use custom nameservers with Namecheap?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Namecheap supports custom nameservers. Go to your domain's settings, click the 'Domain' tab, and under 'Nameservers' select 'Custom DNS'. Enter your third-party nameservers (e.g., Cloudflare, AWS Route 53, Google Cloud DNS). Note that when using custom nameservers, you must manage all DNS records at the third-party provider, not at Namecheap. The nameserver change can take 24-48 hours to propagate." } },
            { "@type": "Question", "name": "How do I check if my Namecheap DNS changes have propagated?", "acceptedAnswer": { "@type": "Answer", "text": "Use our free DNS propagation checker above to verify your Namecheap DNS changes. Enter your domain name, select the record type you changed (A, CNAME, MX, TXT, etc.), and click Check DNS. The tool queries 50+ DNS servers worldwide and shows you exactly which servers have the updated records from Namecheap and which are still serving old cached data." } }
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
              Check Namecheap DNS Propagation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Verify your Namecheap DNS changes have propagated across 50+ global servers. Check BasicDNS and PremiumDNS propagation status instantly.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">50+ Global Servers</h3>
                  <p className="text-sm text-gray-600">Check Namecheap DNS worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Real-Time Results</h3>
                  <p className="text-sm text-gray-600">Instant Namecheap propagation status</p>
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
            <h2 className="text-3xl font-bold mb-6">Namecheap DNS Propagation: Complete Guide</h2>
            <p className="text-gray-700 mb-4">
              Namecheap is one of the most popular domain registrars, known for affordable domain registration and straightforward DNS management. Whether you're using Namecheap's free BasicDNS, their paid PremiumDNS service, or custom third-party nameservers, understanding how DNS propagation works with Namecheap is essential for managing your domains without downtime.
            </p>
            <p className="text-gray-700 mb-4">
              When you make DNS changes through Namecheap's Advanced DNS panel, the changes are applied to Namecheap's authoritative nameservers (dns1.registrar-servers.com and dns2.registrar-servers.com for BasicDNS) within minutes. However, DNS resolvers worldwide cache records based on TTL values, so it takes time for all resolvers to pick up the updated data. This caching behavior is what causes the propagation delay you experience after making DNS changes.
            </p>
            <p className="text-gray-700 mb-6">
              Our free Namecheap DNS checker lets you verify propagation status in real-time by querying 50+ DNS servers across every continent. Enter your domain above to see exactly which servers have your updated Namecheap DNS records.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Namecheap BasicDNS vs PremiumDNS vs Custom Nameservers</h2>
            <p className="text-gray-700 mb-4">
              Namecheap offers three DNS hosting options, each with different propagation characteristics and features:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">BasicDNS (Free)</h3>
                <p className="text-gray-700 mb-2">Included free with every Namecheap domain. Uses nameservers dns1.registrar-servers.com and dns2.registrar-servers.com.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Standard DNS resolution with reasonable reliability</li>
                  <li>Supports A, AAAA, CNAME, MX, TXT, NS, SRV records</li>
                  <li>Propagation: 30 minutes to 24 hours for most changes</li>
                  <li>No uptime SLA guarantee</li>
                  <li>No DNSSEC support</li>
                  <li>Suitable for personal websites and small projects</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">PremiumDNS ($4.88/year)</h3>
                <p className="text-gray-700 mb-2">Paid upgrade with enhanced infrastructure. Uses nameservers pdns01-05.registrar-servers.com (5 nameservers for redundancy).</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>100% DNS uptime SLA</li>
                  <li>Global anycast network for faster resolution</li>
                  <li>DDoS protection for DNS queries</li>
                  <li>DNSSEC support for enhanced security</li>
                  <li>Faster propagation compared to BasicDNS</li>
                  <li>Recommended for business and e-commerce domains</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Custom DNS (Third-Party)</h3>
                <p className="text-gray-700 mb-2">Use nameservers from Cloudflare, AWS Route 53, Google Cloud DNS, or any other provider.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>DNS records managed at the third-party provider, not Namecheap</li>
                  <li>Nameserver change takes 24-48 hours to propagate</li>
                  <li>Propagation speed depends on the chosen provider</li>
                  <li>Cloudflare custom DNS propagates within seconds</li>
                  <li>Configure in Namecheap Domain tab → Nameservers → Custom DNS</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Namecheap DNS Propagation Times</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Record Type</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">BasicDNS</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">PremiumDNS</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">A / AAAA</td>
                    <td className="py-3 px-4">30 min – 24 hours</td>
                    <td className="py-3 px-4">15 min – 12 hours</td>
                    <td className="py-3 px-4">Depends on TTL setting</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">CNAME</td>
                    <td className="py-3 px-4">30 min – 24 hours</td>
                    <td className="py-3 px-4">15 min – 12 hours</td>
                    <td className="py-3 px-4">Common for www aliases</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">MX</td>
                    <td className="py-3 px-4">30 min – 24 hours</td>
                    <td className="py-3 px-4">15 min – 12 hours</td>
                    <td className="py-3 px-4">Critical for email routing</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">TXT</td>
                    <td className="py-3 px-4">30 min – 24 hours</td>
                    <td className="py-3 px-4">15 min – 12 hours</td>
                    <td className="py-3 px-4">SPF, DKIM, domain verification</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">NS (Nameserver)</td>
                    <td className="py-3 px-4" colSpan={2}>24 – 48 hours</td>
                    <td className="py-3 px-4">Switching DNS providers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">SRV</td>
                    <td className="py-3 px-4">30 min – 24 hours</td>
                    <td className="py-3 px-4">15 min – 12 hours</td>
                    <td className="py-3 px-4">Service discovery records</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-6">
              For more comprehensive propagation time data across all providers, read our guide on <Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline">how long DNS propagation takes</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Change DNS Records at Namecheap (Step-by-Step)</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li><strong>Log in to Namecheap:</strong> Go to namecheap.com and sign in to your account.</li>
              <li><strong>Go to Domain List:</strong> Click "Domain List" in the left sidebar to see all your domains.</li>
              <li><strong>Manage your domain:</strong> Find the domain you want to configure and click "Manage" next to it.</li>
              <li><strong>Open Advanced DNS:</strong> Click the "Advanced DNS" tab at the top of the domain management page.</li>
              <li><strong>View existing records:</strong> You'll see all current DNS records. Namecheap shows the type, host, value, and TTL for each record.</li>
              <li><strong>Add or edit records:</strong> Click "Add New Record" to create a new DNS record, or click the edit (pencil) icon next to an existing record to modify it.</li>
              <li><strong>Configure the record:</strong> Select the record type (A, CNAME, MX, TXT, etc.), enter the host (@ for root, www for subdomain), the value, and optionally set the TTL (default is Automatic which is typically 1800 seconds).</li>
              <li><strong>Save changes:</strong> Click the green checkmark to save the record. Namecheap applies changes to its authoritative servers within minutes.</li>
              <li><strong>Verify propagation:</strong> Use the <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS propagation checker</Link> above to monitor when your changes go live globally.</li>
            </ol>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common Namecheap DNS Issues and Fixes</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Namecheap DNS Records Not Saving</h3>
                <p className="text-gray-700">If your DNS records are not saving in the Advanced DNS tab, ensure you clicked the green checkmark (not just entered the values). Also verify your domain's nameservers are set to BasicDNS or PremiumDNS — if you're using Custom DNS, records must be managed at your third-party DNS provider, and changes in Namecheap's Advanced DNS tab will have no effect.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Domain Pointing to Namecheap Parking Page</h3>
                <p className="text-gray-700">If your domain shows a Namecheap parking page instead of your website, the A record is either missing or pointing to the wrong IP address. Go to Advanced DNS and verify that your A record for @ (root domain) points to your web server's IP address. Also check that the CNAME record for www points to your root domain or server hostname.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Email Not Working After DNS Changes</h3>
                <p className="text-gray-700">If email stops working after DNS changes at Namecheap, check your MX records in the Advanced DNS tab. For Google Workspace, you need MX records pointing to ASPMX.L.GOOGLE.COM (priority 1), ALT1.ASPMX.L.GOOGLE.COM (priority 5), and others. For Microsoft 365, MX should point to your-domain.mail.protection.outlook.com. Also ensure SPF and DKIM TXT records are properly configured.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Namecheap URL Redirect vs DNS Records Conflict</h3>
                <p className="text-gray-700">Namecheap offers URL redirect records in the Advanced DNS panel. These can conflict with A records or CNAME records if both are set for the same hostname. If you're using A records to point to your server, remove any URL redirect records for the same host. URL redirects in Namecheap work by creating a special A record that points to Namecheap's redirect servers.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Switching from BasicDNS to PremiumDNS</h3>
                <p className="text-gray-700">When upgrading from BasicDNS to PremiumDNS, Namecheap automatically migrates your existing DNS records. However, the nameservers change from dns1/dns2.registrar-servers.com to pdns01-05.registrar-servers.com. This nameserver change propagates within 24-48 hours. During this transition, some resolvers may query the old nameservers. Your records should remain accessible throughout the migration since both sets of nameservers serve the same records during the transition period.</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              For more troubleshooting guidance, visit our <Link href="/dns-not-propagating" className="text-blue-600 hover:underline">DNS not propagating</Link> troubleshooting guide.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Namecheap Nameservers Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">BasicDNS Nameservers</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">dns1.registrar-servers.com</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">dns2.registrar-servers.com</code></li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">PremiumDNS Nameservers</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">pdns01.registrar-servers.com</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">pdns02.registrar-servers.com</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">pdns03.registrar-servers.com</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">pdns04.registrar-servers.com</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">pdns05.registrar-servers.com</code></li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Related DNS Tools and Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link href="/dns-propagation-checker" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">DNS Propagation Checker</h3>
                  <p className="text-sm text-gray-700">Check DNS propagation for any domain across 50+ global servers</p>
                </div>
              </Link>
              <Link href="/how-long-does-dns-propagation-take" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">How Long Does DNS Propagation Take?</h3>
                  <p className="text-sm text-gray-700">Detailed guide on DNS propagation times by record type and provider</p>
                </div>
              </Link>
              <Link href="/guides/namecheap-dns-setup" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">Namecheap DNS Setup Guide</h3>
                  <p className="text-sm text-gray-700">Complete step-by-step guide to configuring DNS at Namecheap</p>
                </div>
              </Link>
              <Link href="/dns-not-propagating" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">DNS Not Propagating?</h3>
                  <p className="text-sm text-gray-700">Troubleshoot and fix DNS propagation issues</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} ReviewMyDNS. Free DNS propagation checker for Namecheap domains.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/dns-propagation-checker" className="hover:text-white">DNS Checker</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}