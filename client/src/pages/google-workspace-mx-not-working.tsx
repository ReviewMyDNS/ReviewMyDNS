import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, AlertTriangle, Clock, Shield, Mail, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function GoogleWorkspaceMxNotWorking() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Google Workspace MX Records Not Working? Fix Email Now (2026) | ReviewMyDNS</title>
        <meta name="description" content="Google Workspace MX records not working? Fix Gmail MX records setup issues fast. Step-by-step guide to resolve Google Workspace email not working with correct MX record values and priorities." />
        <meta name="keywords" content="google workspace mx records not working, gmail mx records setup, google workspace email not working, google mx records, fix gmail dns, google workspace mail not delivering" />
        <link rel="canonical" href="https://reviewmydns.com/google-workspace-mx-not-working" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What are the correct MX records for Google Workspace?", "acceptedAnswer": { "@type": "Answer", "text": "Google Workspace requires 5 MX records: ASPMX.L.GOOGLE.COM (priority 1), ALT1.ASPMX.L.GOOGLE.COM (priority 5), ALT2.ASPMX.L.GOOGLE.COM (priority 5), ALT3.ASPMX.L.GOOGLE.COM (priority 10), and ALT4.ASPMX.L.GOOGLE.COM (priority 10). All 5 records must be added for proper email delivery and redundancy." } },
            { "@type": "Question", "name": "Why is my Google Workspace email not receiving messages?", "acceptedAnswer": { "@type": "Answer", "text": "The most common reasons are: incorrect MX records, old MX records from a previous provider still present, DNS changes not yet propagated (can take up to 48 hours), domain verification not completed in Google Admin Console, or a missing SPF record. Use a DNS checker to verify your MX records are correctly pointing to Google's mail servers." } },
            { "@type": "Question", "name": "How long does it take for Google Workspace MX records to propagate?", "acceptedAnswer": { "@type": "Answer", "text": "MX record changes typically propagate within 1-4 hours, but can take up to 48 hours in some cases. During propagation, email delivery may be intermittent. You can use a DNS propagation checker to monitor the status of your MX records across global DNS servers in real-time." } },
            { "@type": "Question", "name": "Do I need to delete old MX records when switching to Google Workspace?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you must delete all old MX records from your previous email provider before adding Google Workspace MX records. Leaving old records can cause emails to be delivered to the wrong server or bounced. Only Google's 5 MX records should remain after setup." } },
            { "@type": "Question", "name": "What SPF record do I need for Google Workspace?", "acceptedAnswer": { "@type": "Answer", "text": "The correct SPF record for Google Workspace is: v=spf1 include:_spf.google.com ~all. This TXT record should be added to your domain's DNS settings. If you already have an SPF record, merge Google's include statement into it rather than creating a duplicate SPF record." } },
            { "@type": "Question", "name": "Should I add a period (dot) at the end of Google MX record hostnames?", "acceptedAnswer": { "@type": "Answer", "text": "It depends on your DNS provider. Some providers like Cloudflare automatically append the trailing dot, so you should NOT add it yourself. Other providers like GoDaddy require the fully qualified domain name without the trailing dot. Adding a double dot will cause MX records to fail. Check your DNS provider's documentation or use a DNS checker to verify." } },
            { "@type": "Question", "name": "How do I verify my Google Workspace MX records are working?", "acceptedAnswer": { "@type": "Answer", "text": "Use ReviewMyDNS MX Record Lookup to query your domain's MX records across 50+ global DNS servers. All 5 Google MX records should appear with correct priorities (1, 5, 5, 10, 10). You can also send a test email to your Google Workspace account from an external address to confirm delivery." } }
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
            <div className="inline-block mb-6">
              <Mail className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Google Workspace MX Records Not Working?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Fix your Google Workspace email delivery issues fast. Check your MX records across 50+ global DNS servers, identify misconfigurations, and get your Gmail working again.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Mail className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">MX Record Check</h3>
                  <p className="text-sm text-gray-600">Verify Google MX records globally</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">50+ DNS Servers</h3>
                  <p className="text-sm text-gray-600">Test propagation worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-600">Real-time MX record analysis</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Free to Use</h3>
                  <p className="text-sm text-gray-600">50 lookups/day at no cost</p>
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

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6" />
                Quick Fix Checklist
              </h2>
              <p className="text-green-700 mb-4">Run through this checklist to fix most Google Workspace MX issues in under 10 minutes:</p>
              <ol className="list-decimal list-inside space-y-2 text-green-800">
                <li className="font-medium">Delete ALL old MX records from your previous email provider</li>
                <li className="font-medium">Add all 5 Google Workspace MX records with correct priorities (see table below)</li>
                <li className="font-medium">Verify you did NOT add a trailing period if your provider auto-appends it</li>
                <li className="font-medium">Complete domain verification in Google Admin Console</li>
                <li className="font-medium">Add the SPF TXT record: <code className="bg-green-100 px-1 rounded text-sm">v=spf1 include:_spf.google.com ~all</code></li>
                <li className="font-medium">Wait 15-60 minutes for DNS propagation, then <Link href="/mx-record-lookup" className="text-green-600 underline">check MX records here</Link></li>
                <li className="font-medium">Send a test email from an external account (Gmail, Outlook, Yahoo)</li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold mb-6">Correct Google Workspace MX Records (2026)</h2>
            <p className="text-gray-700 mb-4">
              Google Workspace (formerly G Suite) requires exactly 5 MX records to handle email delivery and provide redundancy. These are the official Google Workspace MX records you must add to your domain's DNS settings:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Priority</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Mail Server (Value)</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-blue-50">
                    <td className="py-3 px-4 font-bold text-blue-700">1</td>
                    <td className="py-3 px-4 font-mono font-medium">ASPMX.L.GOOGLE.COM</td>
                    <td className="py-3 px-4">Primary mail server</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-bold">5</td>
                    <td className="py-3 px-4 font-mono">ALT1.ASPMX.L.GOOGLE.COM</td>
                    <td className="py-3 px-4">Secondary mail server</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-bold">5</td>
                    <td className="py-3 px-4 font-mono">ALT2.ASPMX.L.GOOGLE.COM</td>
                    <td className="py-3 px-4">Secondary mail server</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-bold">10</td>
                    <td className="py-3 px-4 font-mono">ALT3.ASPMX.L.GOOGLE.COM</td>
                    <td className="py-3 px-4">Tertiary mail server</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">10</td>
                    <td className="py-3 px-4 font-mono">ALT4.ASPMX.L.GOOGLE.COM</td>
                    <td className="py-3 px-4">Tertiary mail server</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-8">
              The priority value tells mail servers which Google server to try first. Lower numbers mean higher priority. ASPMX.L.GOOGLE.COM (priority 1) is always tried first, with the ALT servers acting as fallbacks if the primary server is unavailable.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common Mistakes When Setting Up Google Workspace MX</h2>
            <p className="text-gray-700 mb-6">
              Most Google Workspace email issues stem from one of these six mistakes. If your email is not working, check each one carefully:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Mistake #1: Forgot to Delete Old MX Records
                </h3>
                <p className="text-gray-700">This is the number one cause of Google Workspace email failures. If your domain previously used another email provider (e.g., Microsoft 365, Zoho, or your hosting company's email), those old MX records must be completely removed before adding Google's MX records. Having both sets of records will cause emails to be randomly delivered to the wrong server, resulting in lost messages. Delete every MX record that does not point to Google's servers.</p>
              </div>

              <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Mistake #2: Wrong Priority Values
                </h3>
                <p className="text-gray-700">The priority values for Google Workspace MX records must be exact: 1 for ASPMX, 5 for ALT1 and ALT2, and 10 for ALT3 and ALT4. Using incorrect priorities (such as 10, 20, 30, 40, 50) will not cause email to fail entirely, but may degrade performance and failover behavior. Some older guides list outdated priority values — always refer to the table above for the current correct values.</p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Mistake #3: Added a Period at the End of the Hostname
                </h3>
                <p className="text-gray-700">Some DNS providers automatically append a trailing dot (period) to fully qualified domain names. If you manually add a dot and your provider also adds one, you end up with <code className="bg-yellow-100 px-1 rounded">ASPMX.L.GOOGLE.COM..</code> — which is invalid and will cause MX lookups to fail. Check your provider's behavior: Cloudflare and Route 53 auto-append the dot, so enter the hostname without it. GoDaddy and Namecheap typically do not add it automatically.</p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Mistake #4: DNS Changes Not Propagated Yet
                </h3>
                <p className="text-gray-700">After adding or changing MX records, DNS changes need time to propagate across the internet. This can take anywhere from 15 minutes to 48 hours depending on your DNS provider and the TTL (Time to Live) settings on your records. During this time, email delivery may be inconsistent. Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS Propagation Checker</Link> to monitor when your MX records have updated globally.</p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Mistake #5: Domain Verification Not Completed
                </h3>
                <p className="text-gray-700">Google Workspace requires you to verify domain ownership before email can flow. This is done by adding a TXT record or CNAME record provided in your Google Admin Console. Until verification is complete, Google will not activate email services for your domain — even if your MX records are perfectly configured. Log into <strong>admin.google.com</strong>, navigate to Domains, and check the verification status.</p>
              </div>

              <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Mistake #6: SPF Record Missing or Incorrect
                </h3>
                <p className="text-gray-700">Without a proper SPF record, emails sent from your Google Workspace domain may be flagged as spam or rejected entirely by receiving servers. The correct SPF record for Google Workspace is:</p>
                <div className="bg-red-100 p-3 rounded font-mono text-sm mt-2 mb-2">
                  v=spf1 include:_spf.google.com ~all
                </div>
                <p className="text-gray-700">Add this as a TXT record for your root domain. If you already have an SPF record (e.g., from a previous provider), do not create a second one — merge the <code className="bg-red-100 px-1 rounded">include:_spf.google.com</code> statement into your existing SPF record. Multiple SPF records on the same domain will cause validation failures. Use our <Link href="/txt-record-checker" className="text-blue-600 hover:underline">TXT Record Checker</Link> to verify your SPF setup.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Verify Your Google Workspace MX Records Are Working</h2>
            <p className="text-gray-700 mb-4">
              After making DNS changes, you need to verify that your MX records are correctly configured and propagated worldwide. Here is how to check using ReviewMyDNS:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li>Go to the <Link href="/mx-record-lookup" className="text-blue-600 hover:underline">MX Record Lookup</Link> tool or use the checker above</li>
              <li>Enter your domain name (e.g., yourdomain.com)</li>
              <li>Select <strong>MX</strong> as the record type</li>
              <li>Click "Check DNS" to query 50+ global DNS servers simultaneously</li>
              <li>Verify that all 5 Google MX records appear with the correct priorities</li>
              <li>Check the propagation map — all regions should show green (consistent results)</li>
              <li>Send a test email from an external email address (non-Google) to confirm delivery</li>
            </ol>
            <p className="text-gray-700 mb-8">
              If some regions still show old MX records, your DNS changes are still propagating. Wait 30-60 minutes and check again. If propagation is not completing, review your DNS provider's settings — you may be editing the wrong zone file or have conflicting records.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Step-by-Step MX Setup by Provider</h2>

            <div className="space-y-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">GoDaddy</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Log into your GoDaddy account and go to <strong>My Products</strong></li>
                  <li>Click <strong>DNS</strong> next to your domain</li>
                  <li>Scroll to the <strong>MX</strong> records section</li>
                  <li>Delete all existing MX records</li>
                  <li>Click <strong>Add Record</strong>, select Type: <strong>MX</strong></li>
                  <li>Set Host to <strong>@</strong>, Points to: <strong>ASPMX.L.GOOGLE.COM</strong>, Priority: <strong>1</strong></li>
                  <li>Repeat for all 5 Google MX records with correct priorities</li>
                  <li>Click <strong>Save</strong> — changes typically propagate within 1-4 hours</li>
                </ol>
                <Link href="/guides/godaddy-dns-setup" className="text-blue-600 hover:underline text-sm mt-3 inline-block">→ Full GoDaddy DNS Setup Guide</Link>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Namecheap</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Log into Namecheap and go to <strong>Domain List</strong></li>
                  <li>Click <strong>Manage</strong> next to your domain</li>
                  <li>Select the <strong>Advanced DNS</strong> tab</li>
                  <li>In the <strong>Mail Settings</strong> section, select <strong>Custom MX</strong></li>
                  <li>Delete any existing MX records</li>
                  <li>Add <strong>ASPMX.L.GOOGLE.COM</strong> with priority <strong>1</strong></li>
                  <li>Add the remaining 4 Google MX records with priorities 5, 5, 10, 10</li>
                  <li>Click the green checkmark to save each record</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Cloudflare</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Log into Cloudflare and select your domain</li>
                  <li>Go to the <strong>DNS</strong> tab in the left sidebar</li>
                  <li>Delete all existing MX records</li>
                  <li>Click <strong>Add record</strong>, select Type: <strong>MX</strong></li>
                  <li>Name: <strong>@</strong> (or your domain), Mail server: <strong>ASPMX.L.GOOGLE.COM</strong>, Priority: <strong>1</strong></li>
                  <li>Do NOT add a trailing dot — Cloudflare handles this automatically</li>
                  <li>Add all 5 records, then click <strong>Save</strong></li>
                  <li>Cloudflare propagation is typically under 5 minutes</li>
                </ol>
                <Link href="/guides/cloudflare-dns-setup" className="text-blue-600 hover:underline text-sm mt-3 inline-block">→ Full Cloudflare DNS Setup Guide</Link>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">SPF, DKIM, and DMARC Setup for Google Workspace</h2>
            <p className="text-gray-700 mb-4">
              MX records alone are not enough for reliable email. You also need to configure SPF, DKIM, and DMARC to protect your domain from spoofing and improve deliverability. Without these records, your outgoing emails may land in spam folders or be rejected entirely.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  SPF (Sender Policy Framework)
                </h3>
                <p className="text-gray-700 mb-2">SPF tells receiving mail servers which servers are authorized to send email on behalf of your domain. Add this TXT record to your DNS:</p>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm mb-2">
                  v=spf1 include:_spf.google.com ~all
                </div>
                <p className="text-sm text-gray-600">If you use other email services alongside Google Workspace (e.g., Mailchimp, SendGrid), include them in the same SPF record: <code className="bg-gray-100 px-1 rounded">v=spf1 include:_spf.google.com include:servers.mcsv.net ~all</code></p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  DKIM (DomainKeys Identified Mail)
                </h3>
                <p className="text-gray-700 mb-2">DKIM adds a cryptographic signature to your outgoing emails, proving they genuinely came from your domain. To set up DKIM for Google Workspace:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                  <li>Go to Google Admin Console → Apps → Google Workspace → Gmail → Authenticate email</li>
                  <li>Click <strong>Generate New Record</strong> (select 2048-bit if your provider supports it)</li>
                  <li>Copy the generated TXT record value</li>
                  <li>Add a TXT record in your DNS with the hostname <code className="bg-gray-100 px-1 rounded">google._domainkey</code></li>
                  <li>Paste the DKIM value and save</li>
                  <li>Return to Google Admin Console and click <strong>Start Authentication</strong></li>
                </ol>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  DMARC (Domain-based Message Authentication)
                </h3>
                <p className="text-gray-700 mb-2">DMARC builds on SPF and DKIM to provide a policy for handling emails that fail authentication. Start with a monitoring policy and gradually enforce it:</p>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm mb-2">
                  v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com
                </div>
                <p className="text-sm text-gray-600">Add this as a TXT record for <code className="bg-gray-100 px-1 rounded">_dmarc.yourdomain.com</code>. After monitoring for a few weeks and confirming legitimate emails pass, tighten the policy to <code className="bg-gray-100 px-1 rounded">p=quarantine</code> and eventually <code className="bg-gray-100 px-1 rounded">p=reject</code>.</p>
              </div>
            </div>

            <p className="text-gray-700 mb-8">
              Use our <Link href="/txt-record-checker" className="text-blue-600 hover:underline">TXT Record Checker</Link> to verify that your SPF, DKIM, and DMARC records are correctly configured and propagated.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">What are the correct MX records for Google Workspace?</h3>
                <p className="text-gray-700">Google Workspace uses 5 MX records: ASPMX.L.GOOGLE.COM (priority 1), ALT1.ASPMX.L.GOOGLE.COM (priority 5), ALT2.ASPMX.L.GOOGLE.COM (priority 5), ALT3.ASPMX.L.GOOGLE.COM (priority 10), and ALT4.ASPMX.L.GOOGLE.COM (priority 10).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Why is my Google Workspace email not receiving messages?</h3>
                <p className="text-gray-700">Check that all old MX records have been removed, all 5 Google MX records are present with correct priorities, domain verification is complete in Google Admin Console, and your SPF record includes <code className="bg-gray-100 px-1 rounded">_spf.google.com</code>. Also allow up to 48 hours for DNS propagation.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">How long does it take for Google Workspace MX records to work?</h3>
                <p className="text-gray-700">MX records typically propagate within 1-4 hours, though it can take up to 48 hours in some cases. Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS propagation checker</Link> to monitor the real-time status of your MX records across global servers.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Do I need all 5 Google MX records or just the primary one?</h3>
                <p className="text-gray-700">While email will technically work with just the primary ASPMX.L.GOOGLE.COM record, Google strongly recommends adding all 5 records. The additional records provide redundancy — if the primary server is unavailable, email is automatically routed to the secondary and tertiary servers, preventing message loss.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Can I use Google Workspace MX records with Cloudflare proxy?</h3>
                <p className="text-gray-700">MX records cannot be proxied through Cloudflare — they must point directly to Google's mail servers. Cloudflare automatically handles this correctly; MX records in Cloudflare are always "DNS only" (gray cloud). Do not attempt to enable Cloudflare proxy (orange cloud) for MX records.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">I switched to Google Workspace but emails go to my old provider — what do I do?</h3>
                <p className="text-gray-700">This means old MX records from your previous provider are still present or have higher priority (lower numbers). Remove all non-Google MX records from your DNS settings, then <Link href="/mx-record-lookup" className="text-blue-600 hover:underline">check your MX records</Link> to confirm only Google's records remain. Allow up to 48 hours for the change to fully propagate.</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Related Tools & Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/mx-record-lookup" className="text-blue-600 hover:underline flex items-center gap-1">
                  <Mail className="h-4 w-4" /> MX Record Lookup Tool
                </Link>
                <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline flex items-center gap-1">
                  <Globe className="h-4 w-4" /> DNS Propagation Checker
                </Link>
                <Link href="/txt-record-checker" className="text-blue-600 hover:underline flex items-center gap-1">
                  <Shield className="h-4 w-4" /> TXT Record Checker (SPF/DKIM)
                </Link>
                <Link href="/guides" className="text-blue-600 hover:underline flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> All DNS Setup Guides
                </Link>
              </div>
            </div>

          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Monitor Your Google Workspace DNS 24/7</h2>
            <p className="text-xl mb-8">Get instant alerts if your MX records change or email delivery is at risk</p>
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                View Monitoring Plans
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}