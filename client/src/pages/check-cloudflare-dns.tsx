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

export default function CheckCloudflareDns() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Check Cloudflare DNS Propagation (2026) - Free Cloudflare DNS Checker | ReviewMyDNS</title>
        <meta name="description" content="Check Cloudflare DNS propagation instantly across 50+ global servers. Verify if your Cloudflare DNS changes have propagated, troubleshoot Cloudflare DNS not working issues including proxy mode, SSL, and redirect problems." />
        <meta name="keywords" content="check cloudflare dns, cloudflare dns propagation, cloudflare dns not working, cloudflare dns checker, cloudflare nameserver check, cloudflare proxy dns" />
        <link rel="canonical" href="https://reviewmydns.com/check-cloudflare-dns" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How long does Cloudflare DNS propagation take?", "acceptedAnswer": { "@type": "Answer", "text": "Cloudflare DNS propagation is extremely fast — typically within seconds to 5 minutes for records managed through Cloudflare's dashboard. Cloudflare uses a global anycast network with data centers in over 300 cities, which means changes are pushed to edge servers almost instantly. However, external DNS resolvers may still cache old records based on the previous TTL, so full global propagation can take up to a few hours depending on the old TTL value." } },
            { "@type": "Question", "name": "What is the difference between Cloudflare proxy (orange cloud) and DNS-only (grey cloud)?", "acceptedAnswer": { "@type": "Answer", "text": "In Cloudflare's DNS settings, the orange cloud icon means the record is proxied through Cloudflare's network — traffic passes through Cloudflare's CDN, WAF, and DDoS protection before reaching your origin server. The grey cloud (DNS-only) means Cloudflare only provides DNS resolution without proxying traffic. When proxied, the IP address visible in DNS lookups will be Cloudflare's edge IP, not your origin server IP. DNS-only mode exposes your origin server IP directly." } },
            { "@type": "Question", "name": "Why is my Cloudflare DNS not working?", "acceptedAnswer": { "@type": "Answer", "text": "Common Cloudflare DNS issues include: 1) Nameservers not updated at your registrar — you must change nameservers to the ones Cloudflare assigned (e.g., lia.ns.cloudflare.com). 2) Too many redirects error — usually caused by SSL/TLS mode set to 'Flexible' when your origin already has SSL. Set SSL to 'Full (strict)'. 3) DNS records not added in Cloudflare dashboard after onboarding. 4) Proxy mode causing issues with non-HTTP services (use DNS-only for MX, FTP, SSH)." } },
            { "@type": "Question", "name": "How do I fix 'too many redirects' error with Cloudflare?", "acceptedAnswer": { "@type": "Answer", "text": "The 'too many redirects' or ERR_TOO_MANY_REDIRECTS error with Cloudflare is almost always caused by SSL/TLS encryption mode mismatch. If your origin server has SSL, set Cloudflare's SSL/TLS mode to 'Full' or 'Full (strict)' in the SSL/TLS settings. If set to 'Flexible', Cloudflare connects to your origin over HTTP, and your origin redirects to HTTPS, creating an infinite loop. Also check for conflicting Page Rules that force HTTPS redirects." } },
            { "@type": "Question", "name": "What are Cloudflare's nameservers?", "acceptedAnswer": { "@type": "Answer", "text": "Cloudflare assigns unique nameservers to each domain when you add it to your account. They follow the pattern name.ns.cloudflare.com, for example: lia.ns.cloudflare.com and noah.ns.cloudflare.com. These nameservers are displayed in your Cloudflare dashboard under DNS > Nameservers. You must update your domain's nameservers at your registrar (GoDaddy, Namecheap, etc.) to point to these Cloudflare nameservers for Cloudflare DNS to work." } },
            { "@type": "Question", "name": "Can I use Cloudflare DNS without the proxy (CDN)?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Cloudflare allows you to use DNS-only mode (grey cloud) for any record. This gives you Cloudflare's fast, global DNS resolution without routing traffic through Cloudflare's proxy. DNS-only mode is required for MX records, non-HTTP services, and any record type that is not A, AAAA, or CNAME. You can toggle between proxy and DNS-only for each individual record in the Cloudflare dashboard." } },
            { "@type": "Question", "name": "Why does Cloudflare show a different IP than my server?", "acceptedAnswer": { "@type": "Answer", "text": "When a DNS record is proxied through Cloudflare (orange cloud), DNS lookups will return Cloudflare's edge IP addresses instead of your origin server's IP. This is by design — it hides your origin IP for security and routes traffic through Cloudflare's CDN and protection services. If you need to see your actual origin IP in DNS results, switch the record to DNS-only (grey cloud) mode temporarily." } }
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
              Check Cloudflare DNS Propagation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Verify your Cloudflare DNS changes have propagated across 50+ global servers. Instantly check Cloudflare proxy status, DNS records, and propagation worldwide.
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
                  <p className="text-sm text-gray-600">Check Cloudflare DNS worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Real-Time Results</h3>
                  <p className="text-sm text-gray-600">Instant Cloudflare propagation status</p>
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
                <ResultsTable results={lookupResults} />
              </div>
            </section>
          </>
        )}

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Cloudflare DNS Propagation: Lightning-Fast Updates</h2>
            <p className="text-gray-700 mb-4">
              Cloudflare is one of the fastest DNS providers in the world, operating a global anycast network with data centers in over 300 cities across 100+ countries. Unlike traditional DNS providers, Cloudflare pushes DNS changes to its edge servers within seconds, making it one of the best choices for domains that require rapid DNS updates and high availability.
            </p>
            <p className="text-gray-700 mb-4">
              When you manage DNS through Cloudflare, changes to your records are typically visible on Cloudflare's own resolvers (1.1.1.1) almost instantly. However, other DNS resolvers worldwide (like Google's 8.8.8.8 or your ISP's resolver) may still serve cached records based on the previous TTL value. This is why you may see your changes on some servers but not others when checking propagation.
            </p>
            <p className="text-gray-700 mb-6">
              Our free Cloudflare DNS checker queries 50+ DNS servers worldwide so you can see exactly which resolvers have picked up your updated Cloudflare DNS records and which are still serving cached data.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Cloudflare Proxy vs DNS-Only Mode</h2>
            <p className="text-gray-700 mb-4">
              One of Cloudflare's most important features is the ability to proxy traffic through its network. Understanding the difference between proxied and DNS-only records is critical for proper DNS configuration:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-3">Orange Cloud (Proxied)</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Traffic routes through Cloudflare's CDN</li>
                  <li>DDoS protection and WAF enabled</li>
                  <li>DNS lookups show Cloudflare's edge IPs</li>
                  <li>Origin server IP is hidden</li>
                  <li>SSL/TLS termination at Cloudflare's edge</li>
                  <li>Only works with A, AAAA, and CNAME records</li>
                  <li>HTTP/HTTPS traffic only</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Grey Cloud (DNS-Only)</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Cloudflare provides DNS resolution only</li>
                  <li>No CDN, WAF, or DDoS protection</li>
                  <li>DNS lookups show your actual server IP</li>
                  <li>Origin IP is exposed publicly</li>
                  <li>Required for MX, SRV, and other record types</li>
                  <li>Needed for non-HTTP services (FTP, SSH, email)</li>
                  <li>Direct connection to origin server</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              <strong>Important:</strong> When you check DNS for a proxied Cloudflare domain, you will see Cloudflare's edge IP addresses (e.g., 104.21.x.x or 172.67.x.x) instead of your origin server's IP. This is normal behavior and does not indicate a DNS issue. If you need to verify your origin IP is correctly configured, temporarily switch the record to DNS-only (grey cloud) or check it directly in the Cloudflare dashboard.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Cloudflare DNS Propagation Times</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Scenario</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Propagation Time</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Record change (proxied)</td>
                    <td className="py-3 px-4">Seconds – 5 minutes</td>
                    <td className="py-3 px-4">Cloudflare edge updates almost instantly</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Record change (DNS-only)</td>
                    <td className="py-3 px-4">5 min – 4 hours</td>
                    <td className="py-3 px-4">Depends on old TTL at external resolvers</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">New domain onboarding</td>
                    <td className="py-3 px-4">24 – 48 hours</td>
                    <td className="py-3 px-4">Waiting for NS change at registrar</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Proxy toggle (orange ↔ grey)</td>
                    <td className="py-3 px-4">Seconds – 5 minutes</td>
                    <td className="py-3 px-4">But cached IPs may linger at resolvers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Page Rules / redirect changes</td>
                    <td className="py-3 px-4">Seconds – 2 minutes</td>
                    <td className="py-3 px-4">Applied at Cloudflare edge immediately</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-6">
              For more details on propagation across all providers, read our guide on <Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline">how long DNS propagation takes</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common Cloudflare DNS Issues and Fixes</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">ERR_TOO_MANY_REDIRECTS</h3>
                <p className="text-gray-700">This is the most common Cloudflare issue. It happens when Cloudflare's SSL/TLS mode is set to "Flexible" but your origin server already has SSL and redirects HTTP to HTTPS. This creates an infinite redirect loop. Fix: Go to SSL/TLS settings in Cloudflare and change the encryption mode to "Full" or "Full (strict)" if your origin has a valid SSL certificate.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Cloudflare DNS Not Resolving (Nameserver Issue)</h3>
                <p className="text-gray-700">After adding your domain to Cloudflare, you must update your domain's nameservers at your registrar to the ones Cloudflare assigned (e.g., lia.ns.cloudflare.com and noah.ns.cloudflare.com). If you skip this step or enter the wrong nameservers, Cloudflare DNS will not work. Check your NS records using our tool to verify the correct nameservers are set.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">SSL Certificate Errors (Error 525, 526)</h3>
                <p className="text-gray-700">Error 525 (SSL handshake failed) and Error 526 (invalid SSL certificate) occur when Cloudflare's SSL/TLS mode is "Full (strict)" but your origin server does not have a valid SSL certificate. Fix: Either install a valid SSL certificate on your origin (including Cloudflare's free Origin CA certificate) or temporarily set SSL mode to "Full" (not strict) while you configure SSL on your server.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Email Not Working (MX Records)</h3>
                <p className="text-gray-700">MX records must not be proxied through Cloudflare (they should always show the grey cloud / DNS-only). If your MX records are proxied, email delivery will fail because SMTP traffic cannot pass through Cloudflare's HTTP proxy. Ensure MX records are set to DNS-only and point to your email provider's servers. Also verify SPF and DKIM TXT records are properly configured.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Origin IP Exposed Despite Cloudflare Proxy</h3>
                <p className="text-gray-700">If your origin IP is exposed through DNS history, subdomains that are not proxied, or email headers, attackers can bypass Cloudflare's protection by connecting directly to your origin. Ensure all A/AAAA records for web traffic are proxied (orange cloud), and consider changing your origin IP after enabling Cloudflare if it was previously exposed.</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              For more troubleshooting steps, visit our <Link href="/dns-not-propagating" className="text-blue-600 hover:underline">DNS not propagating</Link> guide.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Cloudflare Nameservers</h2>
            <p className="text-gray-700 mb-4">
              Unlike registrars that use fixed nameservers, Cloudflare assigns unique nameserver pairs to each domain. These follow the pattern <code className="bg-gray-100 px-2 py-1 rounded text-sm">name.ns.cloudflare.com</code>. When you add a domain to Cloudflare, you'll be given two nameservers to configure at your registrar. Common examples include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">lia.ns.cloudflare.com</code></li>
              <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">noah.ns.cloudflare.com</code></li>
              <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">aria.ns.cloudflare.com</code></li>
              <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">tony.ns.cloudflare.com</code></li>
            </ul>
            <p className="text-gray-700 mb-6">
              Your specific nameservers are shown in the Cloudflare dashboard under DNS &gt; Nameservers. You must update these at your domain registrar (GoDaddy, Namecheap, etc.) for Cloudflare DNS to become active. This nameserver change typically takes 24-48 hours to propagate.
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
              <Link href="/guides/cloudflare-dns-setup" className="block">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-blue-600 mb-1">Cloudflare DNS Setup Guide</h3>
                  <p className="text-sm text-gray-700">Complete step-by-step guide to configuring DNS at Cloudflare</p>
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
              &copy; {new Date().getFullYear()} ReviewMyDNS. Free DNS propagation checker for Cloudflare domains.
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