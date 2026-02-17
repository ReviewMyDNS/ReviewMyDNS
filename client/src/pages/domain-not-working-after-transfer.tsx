import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, AlertTriangle, Clock, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function DomainNotWorkingAfterTransfer() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Domain Not Working After Transfer? Fix It Now (2026) | ReviewMyDNS</title>
        <meta name="description" content="Domain not working after transfer? Fix your website down after domain transfer with our step-by-step recovery guide. Diagnose DNS issues, missing records, and nameserver problems after registrar transfer." />
        <meta name="keywords" content="domain not working after transfer, website down after domain transfer, dns not working after registrar transfer, domain transfer dns issues, fix domain after transfer, domain transfer problems" />
        <link rel="canonical" href="https://reviewmydns.com/domain-not-working-after-transfer" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Why is my domain not working after transferring to a new registrar?", "acceptedAnswer": { "@type": "Answer", "text": "The most common reason is that your DNS records did not transfer with the domain. When you transfer a domain to a new registrar, only the domain registration moves — your DNS records (A, MX, CNAME, TXT) at the old registrar are typically deleted or become inaccessible. You need to manually re-create all DNS records at your new registrar or point your nameservers to your DNS provider." } },
            { "@type": "Question", "name": "How long does it take for a domain to work after transfer?", "acceptedAnswer": { "@type": "Answer", "text": "A domain transfer itself can take 5-7 days to complete due to ICANN's mandatory transfer process. After the transfer completes, if nameservers change, DNS propagation takes an additional 24-48 hours. If you pre-configure DNS records at the new registrar before the transfer completes, downtime can be minimized to just the propagation window." } },
            { "@type": "Question", "name": "Do DNS records transfer when I move my domain to a new registrar?", "acceptedAnswer": { "@type": "Answer", "text": "No. DNS records do NOT automatically transfer with your domain. Only the domain registration (ownership) transfers. If your DNS was hosted at your old registrar, those records are lost when the transfer completes. You must manually export or screenshot all DNS records before transferring and re-create them at your new registrar." } },
            { "@type": "Question", "name": "My website is down after domain transfer — what should I check first?", "acceptedAnswer": { "@type": "Answer", "text": "Check three things immediately: 1) Verify your nameservers are correct by doing an NS record lookup. 2) Check if your A record points to the correct server IP address. 3) Confirm the transfer has actually completed at both registrars. Use a DNS propagation checker like ReviewMyDNS to see what DNS servers worldwide are returning for your domain." } },
            { "@type": "Question", "name": "Can I speed up DNS propagation after a domain transfer?", "acceptedAnswer": { "@type": "Answer", "text": "You can minimize propagation time by: 1) Lowering TTL values on all DNS records to 300 seconds at least 48 hours before the transfer. 2) Pre-configuring all DNS records at the new registrar before the transfer completes. 3) Using a fast DNS provider like Cloudflare with global anycast. However, you cannot force ISP resolvers to refresh their cache faster than the TTL allows." } },
            { "@type": "Question", "name": "How do I transfer a domain from GoDaddy to Cloudflare without downtime?", "acceptedAnswer": { "@type": "Answer", "text": "To transfer from GoDaddy to Cloudflare with minimal downtime: 1) Add your domain to Cloudflare and import existing DNS records. 2) Change your nameservers at GoDaddy to Cloudflare's nameservers. 3) Wait for nameserver propagation (24-48 hours). 4) Only then initiate the domain transfer to Cloudflare Registrar. This way your DNS is already on Cloudflare before the registration moves." } },
            { "@type": "Question", "name": "What is the ICANN 60-day transfer lock?", "acceptedAnswer": { "@type": "Answer", "text": "ICANN requires a 60-day lock on domain transfers after initial registration or after a previous transfer. This means you cannot transfer a domain to another registrar within 60 days of registering it or transferring it. Some registrars also impose a 60-day lock after changing WHOIS contact information. Check with your registrar if you're unable to initiate a transfer." } }
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
              Domain Not Working After Transfer?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your domain transfer went through but your website is down. Don't panic — this is fixable. Use our free tool to diagnose the problem and follow our step-by-step recovery guide.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <AlertTriangle className="h-10 w-10 mx-auto mb-4 text-amber-500" />
                  <h3 className="font-semibold mb-2">DNS Records Missing</h3>
                  <p className="text-sm text-gray-600">Records don't transfer automatically</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Nameserver Issues</h3>
                  <p className="text-sm text-gray-600">NS records may have reset</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Propagation Delay</h3>
                  <p className="text-sm text-gray-600">Changes take 24-48 hours</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Transfer Pending</h3>
                  <p className="text-sm text-gray-600">ICANN 5-day transfer window</p>
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Emergency Checklist: Domain Down After Transfer
              </h2>
              <p className="text-red-700 mb-4">If your website is down after a domain transfer, check these three things immediately:</p>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-red-200 text-red-800 font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-red-900">Check DNS Resolution</strong>
                    <p className="text-red-700 text-sm">Enter your domain in the tool above and select "A" record type. If no results appear or you see the wrong IP, your DNS records are missing or incorrect.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-red-200 text-red-800 font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-red-900">Check Nameservers</strong>
                    <p className="text-red-700 text-sm">Run an NS record lookup for your domain. Your nameservers should point to your DNS provider (e.g., Cloudflare, your hosting company). If they point to your new registrar's default nameservers, that's likely the problem.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-red-200 text-red-800 font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-red-900">Check Registrar Transfer Status</strong>
                    <p className="text-red-700 text-sm">Log in to both your old and new registrar. Confirm the transfer has completed. If it's still "pending," the domain may be in limbo between providers.</p>
                  </div>
                </li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold mb-6">Why Domains Break After Transfer</h2>
            <p className="text-gray-700 mb-4">
              Domain transfers are one of the most common causes of unexpected website downtime. When you transfer a domain from one registrar to another, several things can go wrong. Understanding these failure modes helps you diagnose and fix the problem faster.
            </p>

            <div className="space-y-6 mb-12">
              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-yellow-300 text-yellow-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  DNS Records Didn't Transfer (Most Common)
                </h3>
                <p className="text-gray-700">This is the number one reason domains stop working after a transfer. When you transfer a domain, only the domain registration moves to the new registrar. Your DNS records — A records, MX records, CNAME records, TXT records — stay at the old registrar. Once the transfer completes, the old registrar deletes or disables those records, and your domain suddenly has no DNS configuration. Your website, email, and all services stop working.</p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-yellow-300 text-yellow-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  Nameservers Reset to New Registrar Defaults
                </h3>
                <p className="text-gray-700">Many registrars automatically set the domain's nameservers to their own default nameservers after a transfer completes. If you were using a third-party DNS provider like Cloudflare, AWS Route 53, or your hosting company's nameservers, these get overwritten. The new registrar's nameservers have no records configured, so your domain resolves to nothing.</p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-yellow-300 text-yellow-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  Transfer Still in Progress (ICANN 5-Day Window)
                </h3>
                <p className="text-gray-700">ICANN requires a 5-day waiting period for domain transfers. During this window, the old registrar can approve or deny the transfer. If neither registrar has confirmed, your domain is in a transitional state. DNS may intermittently fail as the domain bounces between registrars. The transfer typically auto-completes after 5 days if not explicitly approved or denied.</p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-yellow-300 text-yellow-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  Domain Lock Wasn't Removed
                </h3>
                <p className="text-gray-700">Domains have a transfer lock (also called "registrar lock" or "clientTransferProhibited") that prevents unauthorized transfers. If you didn't unlock the domain at the old registrar before initiating the transfer, the transfer will fail silently or get stuck. Check your old registrar dashboard for the lock status.</p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-yellow-300 text-yellow-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                  WHOIS Email Verification Failed
                </h3>
                <p className="text-gray-700">Domain transfers require approval via the WHOIS registrant email. If that email address is outdated, invalid, or you didn't receive the confirmation email, the transfer either fails or gets stuck. Some registrars also require identity verification within a specific timeframe. Check your spam folder for transfer approval emails.</p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-yellow-300 text-yellow-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
                  DNS Propagation of New Nameservers (24-48 Hours)
                </h3>
                <p className="text-gray-700">Even if everything is configured correctly, changing nameservers triggers DNS propagation that can take 24-48 hours. During this period, some DNS resolvers worldwide will still query the old nameservers while others have updated to the new ones. This causes intermittent availability — your site works for some visitors but not others. Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS propagation checker</Link> to monitor the rollout.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Step-by-Step Recovery Guide</h2>
            <p className="text-gray-700 mb-6">
              Follow these steps in order to get your domain working again after a transfer. Most issues can be resolved within an hour, though propagation may take additional time.
            </p>

            <div className="space-y-6 mb-12">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  Step 1: Check If Your Domain Resolves
                </h3>
                <p className="text-gray-700 mb-2">Use the <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">ReviewMyDNS propagation checker</Link> above to look up your domain's A record. This tells you what IP address (if any) your domain currently points to across 50+ global DNS servers.</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li><strong>No results:</strong> Your DNS records are missing entirely. Skip to Step 3.</li>
                  <li><strong>Wrong IP address:</strong> Your A record points to the wrong server. You need to update it.</li>
                  <li><strong>Correct IP but mixed results:</strong> Propagation is still in progress. Wait and re-check.</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  Step 2: Check Nameserver Status
                </h3>
                <p className="text-gray-700 mb-2">Run an NS record lookup for your domain using the tool above. Your nameservers determine where DNS queries for your domain are sent. They should point to your intended DNS provider.</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li><strong>New registrar defaults:</strong> The transfer reset your nameservers. Change them back to your DNS provider.</li>
                  <li><strong>Old registrar nameservers:</strong> The transfer may not have completed yet. Check both registrar dashboards.</li>
                  <li><strong>Third-party DNS (Cloudflare, etc.):</strong> Your nameservers are fine. The issue is likely missing records at that DNS provider.</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  Step 3: Re-Add DNS Records at New Registrar
                </h3>
                <p className="text-gray-700 mb-2">Log in to your new registrar and add all the DNS records your domain needs. At minimum, you'll need:</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li><strong>A record:</strong> Points your domain (@ or root) to your web server's IP address</li>
                  <li><strong>CNAME record:</strong> Points "www" to your root domain or hosting provider</li>
                  <li><strong>MX records:</strong> Required for email delivery (Google Workspace, Microsoft 365, etc.)</li>
                  <li><strong>TXT records:</strong> SPF, DKIM, and domain verification records</li>
                </ul>
                <p className="text-gray-700 text-sm mt-2">If you didn't save your old records, check your web host or email provider's documentation for the correct values.</p>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  Step 4: Wait for Propagation
                </h3>
                <p className="text-gray-700 mb-2">After updating DNS records or nameservers, you need to wait for propagation. Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">propagation checker</Link> to monitor progress in real-time.</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li><strong>A/CNAME records:</strong> Typically propagate within 5 minutes to 4 hours</li>
                  <li><strong>NS record changes:</strong> Can take 24-48 hours for full global propagation</li>
                  <li><strong>MX records:</strong> Usually propagate within 1-4 hours</li>
                </ul>
                <p className="text-gray-700 text-sm mt-2">Learn more about propagation timing in our guide: <Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline">How Long Does DNS Propagation Take?</Link></p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Prevent Issues During Future Transfers</h2>
            <p className="text-gray-700 mb-6">
              Planning ahead can eliminate downtime entirely during a domain transfer. Follow this pre-transfer checklist to ensure a smooth migration:
            </p>

            <div className="space-y-4 mb-12">
              <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Screenshot & Export All DNS Records Before Transferring
                </h3>
                <p className="text-gray-700">Before initiating any domain transfer, log in to your current registrar and export or screenshot every DNS record. This includes A, AAAA, CNAME, MX, TXT, NS, and SRV records. Many registrars offer a "Zone File Export" option. If not, manually document each record's type, name, value, TTL, and priority. This is your insurance policy if anything goes wrong.</p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Lower TTL Values 48 Hours Before Transfer
                </h3>
                <p className="text-gray-700">Reduce the TTL (Time to Live) on all DNS records to 300 seconds (5 minutes) at least 48 hours before the transfer. This ensures that when the transfer completes and records change, DNS resolvers worldwide will refresh quickly. If your current TTL is 86400 (24 hours), it means resolvers will cache old records for up to a full day after the transfer.</p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Keep Old Registrar Active Until Propagation Completes
                </h3>
                <p className="text-gray-700">Don't delete your account or DNS records at the old registrar immediately after initiating a transfer. Keep them active as a fallback until you've confirmed that all DNS records at the new registrar are working and propagation is complete. Some registrars automatically remove DNS records once a transfer is initiated, so set up records at the new provider first.</p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Use a Third-Party DNS Provider
                </h3>
                <p className="text-gray-700">The safest approach is to use a separate DNS provider (like Cloudflare) that is independent of your registrar. When your DNS is hosted separately, transferring the domain registration has zero impact on DNS resolution. Your nameservers remain pointing to the DNS provider throughout the entire transfer process.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Provider-Specific Transfer Guides</h2>
            <p className="text-gray-700 mb-6">
              The exact steps vary depending on which registrars you're transferring between. Here are guides for the most common transfer scenarios:
            </p>

            <div className="space-y-4 mb-12">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">GoDaddy to Namecheap</h3>
                <p className="text-gray-700 mb-2">One of the most common transfer paths. Before transferring: export all DNS records from GoDaddy, unlock the domain, get the EPP/authorization code from GoDaddy's domain settings, and add the records to Namecheap's BasicDNS or PremiumDNS. Initiate the transfer at Namecheap using the auth code and confirm via email.</p>
                <Link href="/guides" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                  View all DNS setup guides <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">GoDaddy to Cloudflare</h3>
                <p className="text-gray-700 mb-2">Cloudflare Registrar offers at-cost domain pricing. The recommended approach: first add your domain to Cloudflare's DNS (free plan), change nameservers at GoDaddy to Cloudflare's nameservers, wait for propagation, then transfer the registration. Cloudflare automatically imports your DNS records when you add the domain, reducing the risk of missing records.</p>
                <Link href="/guides/cloudflare-dns-setup" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                  Cloudflare DNS setup guide <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Namecheap to Cloudflare</h3>
                <p className="text-gray-700 mb-2">Similar to GoDaddy to Cloudflare: add your domain to Cloudflare first, let it scan and import DNS records, update nameservers at Namecheap, wait for propagation, then initiate the transfer to Cloudflare Registrar. Namecheap provides the EPP code under Domain List → Manage → Sharing & Transfer.</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Any Registrar to AWS Route 53</h3>
                <p className="text-gray-700 mb-2">AWS Route 53 is an enterprise-grade DNS service. Create a hosted zone in Route 53, add all your DNS records, update nameservers at your current registrar to Route 53's NS records, verify propagation, then transfer the registration. Route 53 charges $0.50/month per hosted zone plus per-query fees.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-12">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Why is my domain not working after transferring to a new registrar?</h3>
                <p className="text-gray-700">The most common cause is that DNS records did not transfer with your domain. Only the registration moves — DNS records at the old registrar become inaccessible. You must re-create all records at the new registrar or point nameservers to your DNS provider.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">How long does it take for a domain to work after transfer?</h3>
                <p className="text-gray-700">The transfer itself takes 5-7 days. After completion, DNS propagation of new nameservers takes 24-48 hours. If you pre-configure records, total downtime can be minimized to just the propagation window.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Do DNS records transfer when I move my domain?</h3>
                <p className="text-gray-700">No. DNS records do NOT automatically transfer. Only the domain registration (ownership) moves. You must manually export/screenshot records before transferring and re-create them at the new registrar.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">My email stopped working after domain transfer — what do I do?</h3>
                <p className="text-gray-700">Email requires MX records, SPF (TXT), and DKIM (TXT) records. If these were at your old registrar, they're gone after transfer. Re-add your MX records pointing to your email provider (e.g., Google Workspace: ASPMX.L.GOOGLE.COM) and re-add SPF/DKIM TXT records. Check your provider's documentation for exact values.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Can I cancel a domain transfer that's in progress?</h3>
                <p className="text-gray-700">Yes, most registrars allow you to cancel a pending transfer. At the old registrar, look for a "deny transfer" or "cancel transfer" option. The domain will remain at the original registrar with its existing DNS configuration intact.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">What is the ICANN 60-day transfer lock?</h3>
                <p className="text-gray-700">ICANN mandates a 60-day lock on domain transfers after initial registration, a previous transfer, or (at some registrars) after changing WHOIS contact information. You cannot transfer the domain to another registrar during this period.</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Related Tools & Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/dns-propagation-checker" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <ArrowRight className="h-4 w-4" />
                  DNS Propagation Checker
                </Link>
                <Link href="/how-long-does-dns-propagation-take" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <ArrowRight className="h-4 w-4" />
                  How Long Does DNS Propagation Take?
                </Link>
                <Link href="/dns-not-propagating" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <ArrowRight className="h-4 w-4" />
                  DNS Not Propagating? Fix Guide
                </Link>
                <Link href="/guides" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <ArrowRight className="h-4 w-4" />
                  All DNS Setup Guides
                </Link>
                <Link href="/mx-record-lookup" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <ArrowRight className="h-4 w-4" />
                  MX Record Lookup
                </Link>
                <Link href="/google-workspace-mx-not-working" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <ArrowRight className="h-4 w-4" />
                  Google Workspace MX Not Working
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="mb-4">&copy; 2026 ReviewMyDNS. Free DNS propagation checker and diagnostic tool.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/dns-propagation-checker" className="hover:text-white">DNS Checker</Link>
              <Link href="/guides" className="hover:text-white">Guides</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
