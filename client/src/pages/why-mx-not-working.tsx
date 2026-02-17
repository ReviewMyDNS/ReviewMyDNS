import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield, Mail, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function WhyMxNotWorking() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Why Is My MX Record Not Working? Fix Email DNS Issues (2026) | ReviewMyDNS</title>
        <meta name="description" content="MX record not working? Diagnose and fix email DNS issues fast. Learn the top 8 reasons MX records fail, how to test them, and step-by-step fixes for Google Workspace, Microsoft 365, and Zoho Mail." />
        <meta name="keywords" content="why mx record not working, mx record not working, email not working dns, mx record issues, fix mx record, email dns troubleshooting" />
        <link rel="canonical" href="https://reviewmydns.com/why-mx-record-not-working" />
        <meta property="og:title" content="Why Is My MX Record Not Working? Fix Email DNS Issues (2026) | ReviewMyDNS" />
        <meta property="og:description" content="MX record not working? Diagnose and fix email DNS issues with our step-by-step guide covering the top 8 reasons MX records fail." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/why-mx-record-not-working" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Why is my MX record not working?", "acceptedAnswer": { "@type": "Answer", "text": "The most common reasons MX records fail are: pointing to an IP address instead of a hostname, missing MX records entirely, wrong priority values, the MX hostname not resolving (no A record for the mail server), a conflicting CNAME record on the same domain, old MX records not deleted after a provider change, DNS propagation not being complete, or SPF records blocking email delivery. Use a tool like ReviewMyDNS to check your MX records and diagnose the issue." } },
            { "@type": "Question", "name": "Can an MX record point to an IP address?", "acceptedAnswer": { "@type": "Answer", "text": "No. MX records must point to a hostname (like mail.example.com or aspmx.l.google.com), never directly to an IP address. This is defined in RFC 2181. If you enter an IP address as the MX target, email servers will reject it and mail delivery will fail. Create an A record for your mail server hostname, then point the MX record to that hostname." } },
            { "@type": "Question", "name": "What priority should I set for my MX records?", "acceptedAnswer": { "@type": "Answer", "text": "MX priority values determine which mail server is tried first. Lower numbers mean higher priority. For Google Workspace, use priority 1 for ASPMX.L.GOOGLE.COM and 5/10 for backup servers. For Microsoft 365, use priority 0. If you have a single mail server, priority 10 is standard. Backup servers should have higher numbers (like 20 or 30) so they're only used when the primary server is unavailable." } },
            { "@type": "Question", "name": "How long does it take for MX records to propagate?", "acceptedAnswer": { "@type": "Answer", "text": "MX record changes typically take 1 to 24 hours to fully propagate across the internet. The exact time depends on the TTL (Time to Live) value set on the old record. During propagation, some email servers may still use the old MX records, so keep your old mail server running until propagation is complete. Use ReviewMyDNS to check propagation status in real time." } },
            { "@type": "Question", "name": "Why is my email going to spam after changing MX records?", "acceptedAnswer": { "@type": "Answer", "text": "After changing MX records, email may go to spam if your SPF record doesn't include the new mail server's IP addresses or domain. Update your SPF TXT record to include the correct 'include:' mechanism for your new provider (e.g., include:_spf.google.com for Google Workspace). Also ensure DKIM is configured and DMARC is set up to improve deliverability." } },
            { "@type": "Question", "name": "How do I test if my MX records are correct?", "acceptedAnswer": { "@type": "Answer", "text": "You can test MX records using several methods: 1) Use ReviewMyDNS MX Record Lookup to check from 50+ global servers. 2) Run 'nslookup -type=mx yourdomain.com' in your terminal. 3) Run 'dig mx yourdomain.com' on macOS or Linux. 4) Send a test email to an external address and check if it arrives. The results should show your mail server hostname(s) with correct priority values." } },
            { "@type": "Question", "name": "Can I have a CNAME and MX record on the same domain?", "acceptedAnswer": { "@type": "Answer", "text": "No. According to DNS standards (RFC 1034), a CNAME record cannot coexist with any other record type at the same name. If your root domain has a CNAME record, MX records on that domain will not work. This is one of the most common causes of email delivery failure. You need to use an A record (or ALIAS/ANAME at some providers) for the root domain instead of a CNAME, then add your MX records separately." } }
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
              Why Is My MX Record Not Working?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Email not arriving? Your MX records might be misconfigured. Use our free tool below to <strong>check your MX records</strong> across 50+ global DNS servers, then follow our diagnostic guide to fix the issue.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Mail className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">MX Lookup</h3>
                  <p className="text-sm text-gray-600">Check MX records globally</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <AlertTriangle className="h-10 w-10 mx-auto mb-4 text-amber-500" />
                  <h3 className="font-semibold mb-2">8 Common Issues</h3>
                  <p className="text-sm text-gray-600">Diagnose why MX fails</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">Step-by-Step Fixes</h3>
                  <p className="text-sm text-gray-600">For every email provider</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">SPF Alignment</h3>
                  <p className="text-sm text-gray-600">Prevent spam & bounces</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                Quick Diagnostic Checklist
              </h2>
              <p className="text-gray-700 mb-4">Before diving into the details, run through this quick checklist to identify the most common MX record problems:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>Check your MX records exist</strong> — Use the <Link href="/mx-record-lookup" className="text-blue-600 hover:underline">ReviewMyDNS MX Lookup</Link> tool above to verify MX records are published for your domain.</li>
                <li><strong>Verify MX points to a hostname</strong> — MX records must point to a hostname (e.g., <code className="bg-gray-100 px-1 rounded">aspmx.l.google.com</code>), never an IP address.</li>
                <li><strong>Confirm the mail server resolves</strong> — The hostname in your MX record must have a valid A record. If it doesn't resolve, mail can't be delivered.</li>
                <li><strong>Check for CNAME conflicts</strong> — Your domain must not have a CNAME record at the same level as MX records.</li>
                <li><strong>Verify priority values</strong> — Ensure priority numbers are correct for your provider (lower = higher priority).</li>
                <li><strong>Check DNS propagation</strong> — If you recently changed MX records, wait 1–24 hours for full <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS propagation</Link>.</li>
                <li><strong>Review your SPF record</strong> — Make sure your <Link href="/spf-dkim-dmarc-explained" className="text-blue-600 hover:underline">SPF record</Link> includes your mail provider's servers.</li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold mb-6">Top 8 Reasons MX Records Fail</h2>
            <p className="text-gray-700 mb-6">
              MX (Mail Exchange) records tell the internet which servers handle email for your domain. When they're misconfigured, email stops flowing — messages bounce, get lost, or never arrive. Here are the eight most common reasons MX records fail and how to fix each one.
            </p>

            <div className="space-y-6 mb-12">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  1. MX Record Pointing to an IP Address Instead of a Hostname
                </h3>
                <p className="text-gray-700 mb-2">
                  This is the most common mistake. MX records <strong>must</strong> point to a fully qualified domain name (FQDN), not an IP address. According to RFC 2181, an MX record's value must be a hostname that can be resolved to an A or AAAA record separately.
                </p>
                <div className="bg-white p-3 rounded border border-gray-200 mb-2">
                  <p className="text-sm font-mono"><span className="text-red-600">❌ Wrong:</span> example.com MX 10 192.168.1.25</p>
                  <p className="text-sm font-mono"><span className="text-green-600">✅ Correct:</span> example.com MX 10 mail.example.com</p>
                </div>
                <p className="text-gray-700">
                  <strong>Fix:</strong> Change the MX record value to a hostname. Then create an A record for that hostname pointing to your mail server's IP address.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  2. Missing MX Records Entirely
                </h3>
                <p className="text-gray-700 mb-2">
                  If your domain has no MX records published, sending servers have no way to know where to deliver email. Some servers will fall back to the domain's A record as a last resort (per RFC 5321), but most modern mail servers will simply bounce the message with a "no MX record found" error.
                </p>
                <p className="text-gray-700">
                  <strong>Fix:</strong> Add MX records for your email provider in your DNS management panel. Every email provider publishes the exact records you need — check their documentation or see the provider-specific section below.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  3. Wrong Priority Values
                </h3>
                <p className="text-gray-700 mb-2">
                  MX priority (also called "preference") determines which server receives mail first. <strong>Lower numbers = higher priority.</strong> A server with priority 1 is tried before priority 10. If you set all servers to the same priority, mail is distributed randomly between them — which may not be what you want.
                </p>
                <div className="bg-white p-3 rounded border border-gray-200 mb-2">
                  <p className="text-sm font-mono">example.com MX <strong>1</strong> ASPMX.L.GOOGLE.COM (primary)</p>
                  <p className="text-sm font-mono">example.com MX <strong>5</strong> ALT1.ASPMX.L.GOOGLE.COM (backup)</p>
                  <p className="text-sm font-mono">example.com MX <strong>10</strong> ALT2.ASPMX.L.GOOGLE.COM (backup)</p>
                </div>
                <p className="text-gray-700">
                  <strong>Fix:</strong> Match the exact priority values specified by your email provider. Don't guess — incorrect priorities can cause mail to be delivered to the wrong server or create routing loops.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  4. MX Hostname Doesn't Resolve (No A Record)
                </h3>
                <p className="text-gray-700 mb-2">
                  Your MX record points to a hostname like <code className="bg-gray-100 px-1 rounded">mail.example.com</code>, but that hostname has no A record. When a sending server looks up your MX record, it gets the hostname, then tries to resolve it to an IP — and fails. The result is a bounce with "host not found" or "unresolvable MX host."
                </p>
                <p className="text-gray-700">
                  <strong>Fix:</strong> Ensure the hostname in your MX record has a valid A record (or AAAA for IPv6). If you're using a third-party provider like Google Workspace, their hostnames (aspmx.l.google.com) already resolve — make sure you've typed them correctly.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  5. Conflicting CNAME Record on the Same Domain
                </h3>
                <p className="text-gray-700 mb-2">
                  DNS standards (RFC 1034) strictly prohibit a CNAME record from coexisting with any other record type at the same name. If your root domain (<code className="bg-gray-100 px-1 rounded">example.com</code>) has a CNAME record, then MX records at that same name will be ignored by compliant resolvers. This is one of the sneakiest causes of email failure.
                </p>
                <p className="text-gray-700">
                  <strong>Fix:</strong> Replace the CNAME on your root domain with an A record (or ALIAS/ANAME if your DNS provider supports it). Then add your MX records. CNAME records on subdomains (like <code className="bg-gray-100 px-1 rounded">www.example.com</code>) are fine and don't affect root MX records.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  6. Old MX Records Not Deleted After Provider Change
                </h3>
                <p className="text-gray-700 mb-2">
                  When switching email providers (e.g., from GoDaddy email to Google Workspace), you must delete the old MX records before adding new ones. Having both sets of MX records active means some email will be delivered to the old server (which may no longer accept mail) and some to the new server, causing lost messages and bouncebacks.
                </p>
                <p className="text-gray-700">
                  <strong>Fix:</strong> Delete all existing MX records from your DNS zone, then add only the MX records for your new email provider. Verify with the <Link href="/mx-record-lookup" className="text-blue-600 hover:underline">MX Record Lookup</Link> tool to confirm only the correct records are live.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  7. DNS Propagation Not Complete
                </h3>
                <p className="text-gray-700 mb-2">
                  MX record changes take 1–24 hours to propagate across the internet, depending on the TTL value on the old record. During this window, some DNS resolvers will return the old MX records while others return the new ones. If you just made changes, this is likely the cause.
                </p>
                <p className="text-gray-700">
                  <strong>Fix:</strong> Wait for propagation to complete. Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS Propagation Checker</Link> to monitor real-time status across 50+ global servers. Keep your old mail server running during this transition period to avoid lost email.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  8. SPF Record Blocking Email Delivery
                </h3>
                <p className="text-gray-700 mb-2">
                  Even when MX records are correct, email can still fail or go to spam if your SPF (Sender Policy Framework) record doesn't authorize your mail server. Receiving servers check SPF to verify that the sending server is allowed to send mail on behalf of your domain. A strict <code className="bg-gray-100 px-1 rounded">-all</code> mechanism with missing includes will cause legitimate email to be rejected.
                </p>
                <p className="text-gray-700">
                  <strong>Fix:</strong> Update your SPF TXT record to include your email provider. For example, add <code className="bg-gray-100 px-1 rounded">include:_spf.google.com</code> for Google Workspace. Learn more in our <Link href="/spf-dkim-dmarc-explained" className="text-blue-600 hover:underline">SPF, DKIM & DMARC guide</Link>.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Fix MX Records for Your Email Provider</h2>
            <p className="text-gray-700 mb-6">
              Each email provider requires specific MX records. Here are the exact records you need for the three most popular providers:
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Google Workspace MX Records</h3>
                <p className="text-gray-700 mb-3">
                  Delete all existing MX records, then add these five records. For detailed troubleshooting, see our <Link href="/google-workspace-mx-not-working" className="text-blue-600 hover:underline">Google Workspace MX Not Working</Link> guide.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold border-b">Priority</th>
                        <th className="text-left py-3 px-4 font-semibold border-b">Mail Server</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="py-2 px-4">1</td><td className="py-2 px-4 font-mono text-sm">ASPMX.L.GOOGLE.COM</td></tr>
                      <tr className="border-b"><td className="py-2 px-4">5</td><td className="py-2 px-4 font-mono text-sm">ALT1.ASPMX.L.GOOGLE.COM</td></tr>
                      <tr className="border-b"><td className="py-2 px-4">5</td><td className="py-2 px-4 font-mono text-sm">ALT2.ASPMX.L.GOOGLE.COM</td></tr>
                      <tr className="border-b"><td className="py-2 px-4">10</td><td className="py-2 px-4 font-mono text-sm">ALT3.ASPMX.L.GOOGLE.COM</td></tr>
                      <tr><td className="py-2 px-4">10</td><td className="py-2 px-4 font-mono text-sm">ALT4.ASPMX.L.GOOGLE.COM</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-600 text-sm mt-2">SPF record: <code className="bg-gray-100 px-1 rounded">v=spf1 include:_spf.google.com ~all</code></p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Microsoft 365 MX Records</h3>
                <p className="text-gray-700 mb-3">
                  Microsoft 365 uses a single MX record unique to your tenant. Find your exact value in the Microsoft 365 admin center under Settings → Domains.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold border-b">Priority</th>
                        <th className="text-left py-3 px-4 font-semibold border-b">Mail Server</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="py-2 px-4">0</td><td className="py-2 px-4 font-mono text-sm">example-com.mail.protection.outlook.com</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-600 text-sm mt-2">SPF record: <code className="bg-gray-100 px-1 rounded">v=spf1 include:spf.protection.outlook.com ~all</code></p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Zoho Mail MX Records</h3>
                <p className="text-gray-700 mb-3">
                  Zoho Mail requires three MX records. Choose the records for your region (these are for the US region):
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold border-b">Priority</th>
                        <th className="text-left py-3 px-4 font-semibold border-b">Mail Server</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="py-2 px-4">10</td><td className="py-2 px-4 font-mono text-sm">mx.zoho.com</td></tr>
                      <tr className="border-b"><td className="py-2 px-4">20</td><td className="py-2 px-4 font-mono text-sm">mx2.zoho.com</td></tr>
                      <tr><td className="py-2 px-4">50</td><td className="py-2 px-4 font-mono text-sm">mx3.zoho.com</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-600 text-sm mt-2">SPF record: <code className="bg-gray-100 px-1 rounded">v=spf1 include:zoho.com ~all</code></p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Test Your MX Records</h2>
            <p className="text-gray-700 mb-4">
              After making changes, always verify your MX records are correct. Here are three ways to check:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Method 1: ReviewMyDNS MX Lookup (Recommended)
                </h3>
                <p className="text-gray-700">Use our <Link href="/mx-record-lookup" className="text-blue-600 hover:underline">MX Record Lookup</Link> tool to check your MX records from 50+ DNS servers worldwide. This shows you whether your records have propagated and identifies inconsistencies across regions.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Method 2: nslookup (Windows, macOS, Linux)
                </h3>
                <p className="text-gray-700 mb-2">Open your terminal or command prompt and run:</p>
                <code className="bg-white px-3 py-2 rounded border border-gray-200 block text-sm font-mono">nslookup -type=mx yourdomain.com</code>
                <p className="text-gray-700 mt-2">This queries your system's default DNS resolver and returns the MX records with their priority values.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Method 3: dig (macOS, Linux)
                </h3>
                <p className="text-gray-700 mb-2">The <code className="bg-gray-100 px-1 rounded">dig</code> command provides more detailed output:</p>
                <code className="bg-white px-3 py-2 rounded border border-gray-200 block text-sm font-mono">dig mx yourdomain.com +short</code>
                <p className="text-gray-700 mt-2">Add <code className="bg-gray-100 px-1 rounded">@8.8.8.8</code> to query Google's DNS specifically: <code className="bg-gray-100 px-1 rounded">dig mx yourdomain.com @8.8.8.8</code></p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">SPF Record Alignment with MX Records</h2>
            <p className="text-gray-700 mb-4">
              Your SPF record and MX records must work together. The SPF record tells receiving servers which IPs are authorized to send email for your domain. If your MX records point to Google Workspace but your SPF record doesn't include Google's servers, outbound email from your domain will fail authentication checks and may be rejected or marked as spam.
            </p>
            <p className="text-gray-700 mb-4">
              Always ensure your SPF <code className="bg-gray-100 px-1 rounded">include:</code> mechanisms cover the same providers as your MX records. If you use multiple services that send email (like a CRM, marketing platform, or transactional email service), each needs to be included in your SPF record.
            </p>
            <p className="text-gray-700 mb-4">
              Be careful not to exceed the 10 DNS lookup limit for SPF records. Each <code className="bg-gray-100 px-1 rounded">include:</code> mechanism counts as at least one lookup, and nested includes count too. Exceeding this limit causes an SPF PermError and all email authentication fails. Learn more about SPF limits in our <Link href="/spf-dkim-dmarc-explained" className="text-blue-600 hover:underline">SPF, DKIM & DMARC guide</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common MX Error Messages Explained</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Error Message</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">What It Means</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">How to Fix</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">550 No MX record found</td>
                    <td className="py-3 px-4">Your domain has no MX records published</td>
                    <td className="py-3 px-4">Add MX records for your email provider</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">Host not found</td>
                    <td className="py-3 px-4">The MX hostname doesn't resolve to an IP</td>
                    <td className="py-3 px-4">Check spelling of MX hostname; add A record</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">Connection refused</td>
                    <td className="py-3 px-4">Mail server exists but isn't accepting connections</td>
                    <td className="py-3 px-4">Check mail server is running; firewall port 25</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">550 Relay not permitted</td>
                    <td className="py-3 px-4">Domain not configured on the mail server</td>
                    <td className="py-3 px-4">Add domain to mail server's accepted domains</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs">SPF fail / DMARC fail</td>
                    <td className="py-3 px-4">Email authentication records don't match</td>
                    <td className="py-3 px-4">Update SPF and DMARC records for your provider</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Globe className="h-5 w-5 text-blue-600 mr-2" />
                Related Tools & Guides
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>→ <Link href="/mx-record-lookup" className="text-blue-600 hover:underline font-medium">MX Record Lookup</Link> — Check MX records from 50+ global servers</li>
                <li>→ <Link href="/google-workspace-mx-not-working" className="text-blue-600 hover:underline font-medium">Google Workspace MX Not Working</Link> — Specific Google Workspace troubleshooting</li>
                <li>→ <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">DNS Propagation Checker</Link> — Monitor propagation status in real time</li>
                <li>→ <Link href="/spf-dkim-dmarc-explained" className="text-blue-600 hover:underline font-medium">SPF, DKIM & DMARC Explained</Link> — Complete email authentication guide</li>
                <li>→ <Link href="/dns-record-types-explained" className="text-blue-600 hover:underline font-medium">DNS Record Types Explained</Link> — Learn about all DNS record types</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="mb-4">&copy; {new Date().getFullYear()} ReviewMyDNS. Free DNS propagation and MX record diagnostic tools.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/tools" className="hover:text-white">Tools</Link>
              <Link href="/mx-record-lookup" className="hover:text-white">MX Lookup</Link>
              <Link href="/dns-propagation-checker" className="hover:text-white">Propagation Checker</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}