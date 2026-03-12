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

export default function CheckGodaddyDns() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Check GoDaddy DNS Propagation (2026) - Free GoDaddy DNS Checker | ReviewMyDNS</title>
        <meta name="description" content="Check GoDaddy DNS propagation instantly across 50+ global servers. Verify if your GoDaddy DNS changes have propagated, troubleshoot GoDaddy DNS not working issues, and monitor GoDaddy DNS propagation status in real-time." />
        <meta name="keywords" content="check godaddy dns, godaddy dns propagation, godaddy dns not working, godaddy dns checker, godaddy nameserver check, godaddy dns lookup" />
        <link rel="canonical" href="https://reviewmydns.com/check-godaddy-dns" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How long does GoDaddy DNS propagation take?", "acceptedAnswer": { "@type": "Answer", "text": "GoDaddy DNS propagation typically takes 1 to 4 hours for A records and TXT records. Nameserver (NS) changes at GoDaddy can take up to 48 hours to fully propagate worldwide. If you lowered the TTL on your records before making changes, propagation can be faster — sometimes under 30 minutes for A records." } },
            { "@type": "Question", "name": "Why is my GoDaddy DNS not working?", "acceptedAnswer": { "@type": "Answer", "text": "Common reasons GoDaddy DNS stops working include: incorrect nameserver configuration (your domain might still point to old nameservers), DNS records not saved properly in GoDaddy's dashboard, high TTL values causing caches to serve stale data, or domain expiration. Check your NS records first to confirm your domain is delegated to GoDaddy's nameservers (ns77.domaincontrol.com, ns78.domaincontrol.com) or your intended DNS provider." } },
            { "@type": "Question", "name": "What are GoDaddy's default nameservers?", "acceptedAnswer": { "@type": "Answer", "text": "GoDaddy's default nameservers follow the pattern nsXX.domaincontrol.com. Common examples include ns77.domaincontrol.com and ns78.domaincontrol.com, though the exact numbers may vary. You can find your specific nameservers in GoDaddy's DNS Management panel under your domain settings. If you use a third-party DNS provider like Cloudflare, you'll need to update these to point to that provider's nameservers instead." } },
            { "@type": "Question", "name": "How do I change DNS records at GoDaddy?", "acceptedAnswer": { "@type": "Answer", "text": "To change DNS records at GoDaddy: 1) Log in to your GoDaddy account. 2) Go to My Products and find your domain. 3) Click DNS or Manage DNS. 4) You'll see your existing records listed. 5) Click the pencil icon next to the record you want to edit, or click Add to create a new record. 6) Enter the record type, name, value, and TTL. 7) Click Save. Changes typically propagate within 1-4 hours." } },
            { "@type": "Question", "name": "How do I check if my GoDaddy DNS changes have propagated?", "acceptedAnswer": { "@type": "Answer", "text": "Use our free DNS propagation checker above to verify your GoDaddy DNS changes. Enter your domain name, select the record type you changed (A, CNAME, MX, TXT, etc.), and click Check DNS. The tool queries 50+ DNS servers worldwide and shows you exactly which servers have the updated records and which are still serving old cached data." } },
            { "@type": "Question", "name": "Can I speed up GoDaddy DNS propagation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can speed up GoDaddy DNS propagation by: 1) Lowering the TTL on your records to 600 seconds (10 minutes) at least 24-48 hours before making changes. 2) Flushing your local DNS cache after making changes (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on macOS). 3) Using Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1) instead of your ISP's resolver, as they tend to respect TTL values more accurately." } },
            { "@type": "Question", "name": "Why does GoDaddy DNS work in some locations but not others?", "acceptedAnswer": { "@type": "Answer", "text": "DNS changes propagate at different speeds to different servers worldwide. Each DNS resolver caches records independently based on the TTL value. Servers closer to GoDaddy's authoritative DNS infrastructure or with shorter cache lifetimes update faster. Use our global propagation checker to see exactly which regions have updated and which are still serving old GoDaddy DNS records." } }
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
              Check GoDaddy DNS Propagation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Verify your GoDaddy DNS changes have propagated across 50+ global servers. Instantly check if your GoDaddy DNS records are live worldwide.
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
                  <p className="text-sm text-gray-600">Check GoDaddy DNS worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Real-Time Results</h3>
                  <p className="text-sm text-gray-600">Instant GoDaddy propagation status</p>
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
            <h2 className="text-3xl font-bold mb-6">GoDaddy DNS Propagation: What You Need to Know</h2>
            <p className="text-gray-700 mb-4">
              GoDaddy is one of the world's largest domain registrars and DNS hosting providers, managing over 80 million domain names. When you make DNS changes through GoDaddy's DNS Management panel, those changes need to propagate across the global DNS infrastructure before they take effect everywhere. This process is called DNS propagation, and understanding how it works with GoDaddy is essential for managing your domains effectively.
            </p>
            <p className="text-gray-700 mb-4">
              GoDaddy uses its own authoritative nameservers (commonly ns77.domaincontrol.com and ns78.domaincontrol.com, though the numbers may vary) to serve DNS records for domains using GoDaddy DNS. When you update a record in GoDaddy's dashboard, the change is applied to these authoritative servers almost immediately. However, DNS resolvers around the world cache records based on their TTL (Time to Live) values, which means it takes time for all resolvers to pick up the new data.
            </p>
            <p className="text-gray-700 mb-6">
              Our free GoDaddy DNS checker above lets you verify whether your DNS changes have propagated by querying 50+ DNS servers worldwide. Simply enter your domain, select the record type, and see real-time results from every region.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">GoDaddy DNS Propagation Times</h2>
            <p className="text-gray-700 mb-4">
              DNS propagation times at GoDaddy vary depending on the record type and your TTL settings. Here is what to expect for each record type when using GoDaddy DNS:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Record Type</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">GoDaddy Propagation Time</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">A / AAAA</td>
                    <td className="py-3 px-4">1 – 4 hours</td>
                    <td className="py-3 px-4">Can be faster with low TTL (600s)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">CNAME</td>
                    <td className="py-3 px-4">1 – 4 hours</td>
                    <td className="py-3 px-4">Common for www subdomain aliases</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">MX</td>
                    <td className="py-3 px-4">1 – 4 hours</td>
                    <td className="py-3 px-4">Critical for email delivery</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">TXT</td>
                    <td className="py-3 px-4">1 – 4 hours</td>
                    <td className="py-3 px-4">SPF, DKIM, domain verification</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">NS (Nameserver)</td>
                    <td className="py-3 px-4">24 – 48 hours</td>
                    <td className="py-3 px-4">Changing away from GoDaddy DNS</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">SOA</td>
                    <td className="py-3 px-4">Varies</td>
                    <td className="py-3 px-4">Managed automatically by GoDaddy</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-6">
              For a deeper understanding of propagation timelines, see our guide on <Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline">how long DNS propagation takes</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Change DNS Records at GoDaddy (Step-by-Step)</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li><strong>Log in to GoDaddy:</strong> Go to godaddy.com and sign in to your account.</li>
              <li><strong>Navigate to My Products:</strong> Click on your name in the top-right corner, then select "My Products" from the dropdown.</li>
              <li><strong>Find your domain:</strong> Locate the domain you want to manage and click "DNS" or "Manage DNS" next to it.</li>
              <li><strong>View existing records:</strong> You'll see a list of all current DNS records for your domain including A, CNAME, MX, TXT, and NS records.</li>
              <li><strong>Edit or add records:</strong> Click the pencil icon next to an existing record to edit it, or click "Add" at the bottom to create a new record.</li>
              <li><strong>Configure the record:</strong> Select the record type, enter the host/name (e.g., @ for root domain, www for subdomain), enter the value (IP address, hostname, or text string), and set the TTL.</li>
              <li><strong>Save changes:</strong> Click "Save" to apply the changes. GoDaddy updates its authoritative servers within minutes.</li>
              <li><strong>Verify propagation:</strong> Use the <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS propagation checker</Link> above to monitor when your changes go live globally.</li>
            </ol>
            <p className="text-gray-700 mb-6">
              For a complete walkthrough with screenshots, visit our <Link href="/guides/godaddy-dns-setup" className="text-blue-600 hover:underline">GoDaddy DNS setup guide</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">GoDaddy Nameservers</h2>
            <p className="text-gray-700 mb-4">
              When your domain uses GoDaddy's DNS hosting, it is delegated to GoDaddy's nameservers. These typically follow the pattern <code className="bg-gray-100 px-2 py-1 rounded text-sm">nsXX.domaincontrol.com</code>. Common GoDaddy nameservers include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">ns77.domaincontrol.com</code></li>
              <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">ns78.domaincontrol.com</code></li>
            </ul>
            <p className="text-gray-700 mb-6">
              If you are migrating away from GoDaddy DNS to another provider (like Cloudflare, AWS Route 53, or Google Cloud DNS), you will need to update your domain's nameservers in GoDaddy's "Domain Settings" section. This nameserver change can take 24-48 hours to propagate fully. During this transition, make sure all your DNS records are configured at your new provider before changing nameservers to avoid downtime.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">TTL Settings at GoDaddy</h2>
            <p className="text-gray-700 mb-4">
              GoDaddy's default TTL for DNS records is 3600 seconds (1 hour). This means DNS resolvers worldwide will cache your records for up to one hour before checking for updates. GoDaddy allows you to customize TTL values with the following options:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>600 seconds (10 minutes):</strong> Ideal for records you plan to change frequently or during migration periods.</li>
              <li><strong>1 hour (3600 seconds):</strong> GoDaddy's default. Good balance between propagation speed and DNS query efficiency.</li>
              <li><strong>12 hours (43200 seconds):</strong> Suitable for stable records that rarely change.</li>
              <li><strong>1 day (86400 seconds):</strong> Best for records that are permanent. Reduces DNS query load but means slow propagation when changed.</li>
              <li><strong>1 week (604800 seconds):</strong> Maximum TTL option at GoDaddy. Only use for records that will never change.</li>
            </ul>
            <p className="text-gray-700 mb-6">
              <strong>Pro tip:</strong> If you're planning DNS changes, lower your TTL to 600 seconds at least 24-48 hours before making the actual change. This ensures that when you update the record, global resolvers will pick up the new value within 10 minutes instead of waiting for the old, longer TTL to expire.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common GoDaddy DNS Issues and Fixes</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">GoDaddy DNS Not Updating</h3>
                <p className="text-gray-700">If your GoDaddy DNS changes are not reflecting, first verify you saved the record correctly in the dashboard. Check that your domain's nameservers are actually pointing to GoDaddy (nsXX.domaincontrol.com). If you recently changed nameservers to a different provider, you need to make DNS changes at that provider, not GoDaddy. Use our checker to see if the old or new records are being served.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Domain Not Resolving After Transfer to GoDaddy</h3>
                <p className="text-gray-700">When transferring a domain to GoDaddy, the nameservers may revert to GoDaddy's defaults, overwriting your existing DNS configuration. Before transferring, note your current DNS records. After transfer, verify the nameservers and re-create any missing records in GoDaddy's DNS Management panel.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">GoDaddy Email DNS Issues (MX Records)</h3>
                <p className="text-gray-700">If email stops working after DNS changes, check your MX records in GoDaddy's DNS panel. For Microsoft 365, you need MX records pointing to your-domain.mail.protection.outlook.com. For Google Workspace, MX records should point to ASPMX.L.GOOGLE.COM. Ensure no conflicting MX records exist and that SPF/DKIM TXT records are also properly configured.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">GoDaddy Forwarding vs DNS Records Conflict</h3>
                <p className="text-gray-700">GoDaddy offers domain forwarding which can conflict with manually set A records or CNAME records. If you have forwarding enabled and also set A records, the behavior may be unpredictable. Disable forwarding if you are manually managing DNS records, or remove manual records if you want forwarding to work.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">SSL Certificate Not Working with GoDaddy DNS</h3>
                <p className="text-gray-700">SSL certificates require your A record to point to the correct server IP address. If you recently changed your A record and your SSL certificate shows errors, the old IP may still be cached. Wait for DNS propagation to complete, then verify with our checker. You may also need to re-issue or re-validate your SSL certificate with the new DNS configuration.</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Still having trouble? Read our comprehensive guide on <Link href="/dns-not-propagating" className="text-blue-600 hover:underline">DNS not propagating</Link> for detailed troubleshooting steps that apply to GoDaddy and all other DNS providers.
            </p>

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
              <Link href="/guides/godaddy-dns-setup" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">GoDaddy DNS Setup Guide</h3>
                  <p className="text-sm text-gray-700">Complete step-by-step guide to configuring DNS at GoDaddy</p>
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
              &copy; {new Date().getFullYear()} ReviewMyDNS. Free DNS propagation checker for GoDaddy domains.
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