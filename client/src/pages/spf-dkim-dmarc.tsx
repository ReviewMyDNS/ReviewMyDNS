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

export default function SpfDkimDmarc() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>SPF, DKIM & DMARC Explained: Email Authentication Guide (2026) | ReviewMyDNS</title>
        <meta name="description" content="Learn how SPF, DKIM, and DMARC work together to protect your email. Complete 2026 guide with setup instructions for Google Workspace and Microsoft 365, examples, and troubleshooting tips." />
        <meta name="keywords" content="spf dkim dmarc explained, what is spf dkim dmarc, email authentication dns, spf vs dkim vs dmarc, email security dns records" />
        <link rel="canonical" href="https://reviewmydns.com/spf-dkim-dmarc-explained" />
        <meta property="og:title" content="SPF, DKIM & DMARC Explained: Email Authentication Guide (2026) | ReviewMyDNS" />
        <meta property="og:description" content="Complete guide to SPF, DKIM, and DMARC email authentication. Learn how they work, how to set them up, and how to verify your configuration." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/spf-dkim-dmarc-explained" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What are SPF, DKIM, and DMARC?", "acceptedAnswer": { "@type": "Answer", "text": "SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain-based Message Authentication, Reporting & Conformance) are three email authentication protocols that work together to prevent email spoofing and phishing. SPF specifies which servers can send email for your domain. DKIM adds a cryptographic signature to verify email hasn't been tampered with. DMARC ties them together with a policy that tells receiving servers what to do when authentication fails." } },
            { "@type": "Question", "name": "What is an SPF record and how does it work?", "acceptedAnswer": { "@type": "Answer", "text": "An SPF record is a DNS TXT record that lists the servers authorized to send email on behalf of your domain. When a receiving server gets an email claiming to be from your domain, it checks your SPF record to verify the sending server is authorized. Example: v=spf1 include:_spf.google.com ~all. The 'include' mechanism authorizes Google's servers, and '~all' soft-fails any other server. SPF has a 10 DNS lookup limit — exceeding this causes all SPF checks to fail." } },
            { "@type": "Question", "name": "What is DKIM and how do I set it up?", "acceptedAnswer": { "@type": "Answer", "text": "DKIM uses public/private key cryptography to sign outgoing emails. The sending server signs each email with a private key, and the receiving server verifies the signature using a public key published in your DNS as a TXT or CNAME record at selector._domainkey.yourdomain.com. To set up DKIM, generate a key pair through your email provider, then add the public key as a DNS record. The selector name varies by provider — Google uses 'google', Microsoft uses 'selector1' and 'selector2'." } },
            { "@type": "Question", "name": "What is DMARC and what policy should I use?", "acceptedAnswer": { "@type": "Answer", "text": "DMARC is a DNS TXT record at _dmarc.yourdomain.com that tells receiving servers what to do when SPF or DKIM checks fail. It has three policy levels: p=none (monitor only, no action), p=quarantine (send failures to spam), and p=reject (block failures entirely). Start with p=none to monitor your email traffic via DMARC reports, then gradually move to p=quarantine and finally p=reject once you're confident all legitimate email passes authentication." } },
            { "@type": "Question", "name": "What is the SPF 10 DNS lookup limit?", "acceptedAnswer": { "@type": "Answer", "text": "SPF records can trigger a maximum of 10 DNS lookups during evaluation. Each 'include', 'a', 'mx', and 'redirect' mechanism counts as at least one lookup, and nested includes within included records count too. If the limit is exceeded, the SPF check returns a PermError and all emails fail authentication. To stay under the limit, consolidate includes, use ip4/ip6 mechanisms (which don't count as lookups), or use an SPF flattening service." } },
            { "@type": "Question", "name": "How do SPF, DKIM, and DMARC work together?", "acceptedAnswer": { "@type": "Answer", "text": "The three protocols form layered email authentication. SPF verifies the sending server's IP is authorized. DKIM verifies the email content hasn't been modified in transit using cryptographic signatures. DMARC checks that at least one of SPF or DKIM passes AND aligns with the From domain, then applies your policy (none, quarantine, or reject) to messages that fail. Together, they prevent spoofing, protect your brand, and improve email deliverability." } },
            { "@type": "Question", "name": "How do I check if my SPF, DKIM, and DMARC records are set up correctly?", "acceptedAnswer": { "@type": "Answer", "text": "Use ReviewMyDNS TXT Record Checker to look up your domain's TXT records from 50+ global servers. Check for: 1) An SPF record starting with v=spf1. 2) A DKIM record at selector._domainkey.yourdomain.com. 3) A DMARC record at _dmarc.yourdomain.com starting with v=DMARC1. You can also use command-line tools: dig txt yourdomain.com for SPF, dig txt selector._domainkey.yourdomain.com for DKIM, and dig txt _dmarc.yourdomain.com for DMARC." } },
            { "@type": "Question", "name": "Do I need all three — SPF, DKIM, and DMARC?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you should implement all three for maximum email security and deliverability. SPF alone can be bypassed by forwarded emails. DKIM alone doesn't tell receivers what to do on failure. DMARC requires at least one of SPF or DKIM to pass with alignment. Major email providers like Google and Microsoft now require SPF, DKIM, and DMARC for bulk senders. Without all three, your email is more likely to be flagged as spam or rejected." } }
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
              SPF, DKIM & DMARC Explained
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Email authentication protects your domain from spoofing, improves deliverability, and prevents phishing attacks. Learn how <strong>SPF, DKIM, and DMARC</strong> work together — and use our free tool to check your records.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">SPF</h3>
                  <p className="text-sm text-gray-600">Authorize sending servers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">DKIM</h3>
                  <p className="text-sm text-gray-600">Sign & verify email content</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <AlertTriangle className="h-10 w-10 mx-auto mb-4 text-amber-500" />
                  <h3 className="font-semibold mb-2">DMARC</h3>
                  <p className="text-sm text-gray-600">Policy for authentication failures</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Mail className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Check Records</h3>
                  <p className="text-sm text-gray-600">Verify with TXT lookup below</p>
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                Why Email Authentication Matters
              </h2>
              <p className="text-gray-700 text-lg mb-3">
                Without SPF, DKIM, and DMARC, anyone can send email pretending to be from your domain. This leads to phishing attacks targeting your customers, your legitimate email landing in spam folders, and damage to your brand reputation.
              </p>
              <p className="text-gray-700 text-lg">
                As of 2024, <strong>Google and Microsoft require SPF, DKIM, and DMARC</strong> for bulk email senders. Without these records, your email will be throttled, flagged, or outright rejected by major providers. Setting them up correctly is no longer optional — it's essential for email deliverability.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">SPF (Sender Policy Framework)</h2>
            <p className="text-gray-700 mb-4">
              SPF is the first layer of email authentication. It's a DNS TXT record published on your domain that lists every server, IP address, and third-party service authorized to send email on your behalf. When a receiving mail server gets a message claiming to come from your domain, it looks up your SPF record and checks whether the sending server's IP is on the authorized list.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">How SPF Works</h3>
            <p className="text-gray-700 mb-3">
              An SPF record is a single TXT record on your root domain. Here's an example for a domain using Google Workspace:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <code className="text-sm font-mono block">v=spf1 include:_spf.google.com ~all</code>
            </div>
            <p className="text-gray-700 mb-4">
              Let's break this down:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><code className="bg-gray-100 px-1 rounded">v=spf1</code> — Declares this is an SPF record (version 1)</li>
              <li><code className="bg-gray-100 px-1 rounded">include:_spf.google.com</code> — Authorizes all of Google's mail servers to send on your behalf</li>
              <li><code className="bg-gray-100 px-1 rounded">~all</code> — Soft-fail any server not listed (mark as suspicious but don't reject)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">SPF Mechanisms Explained</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Mechanism</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">What It Does</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">include:</td>
                    <td className="py-3 px-4">Includes another domain's SPF record (delegates authorization)</td>
                    <td className="py-3 px-4 font-mono text-xs">include:_spf.google.com</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">ip4:</td>
                    <td className="py-3 px-4">Authorizes a specific IPv4 address or range</td>
                    <td className="py-3 px-4 font-mono text-xs">ip4:203.0.113.0/24</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">a</td>
                    <td className="py-3 px-4">Authorizes the IP from the domain's A record</td>
                    <td className="py-3 px-4 font-mono text-xs">a</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">mx</td>
                    <td className="py-3 px-4">Authorizes the IPs of the domain's MX servers</td>
                    <td className="py-3 px-4 font-mono text-xs">mx</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">-all</td>
                    <td className="py-3 px-4">Hard fail — reject unauthorized senders outright</td>
                    <td className="py-3 px-4 font-mono text-xs">-all</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">~all</td>
                    <td className="py-3 px-4">Soft fail — accept but mark as suspicious (recommended to start)</td>
                    <td className="py-3 px-4 font-mono text-xs">~all</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono">?all</td>
                    <td className="py-3 px-4">Neutral — no assertion about unauthorized senders</td>
                    <td className="py-3 px-4 font-mono text-xs">?all</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                SPF 10 DNS Lookup Limit
              </h3>
              <p className="text-gray-700">
                SPF evaluation is limited to a maximum of <strong>10 DNS lookups</strong>. Each <code className="bg-gray-100 px-1 rounded">include:</code>, <code className="bg-gray-100 px-1 rounded">a</code>, <code className="bg-gray-100 px-1 rounded">mx</code>, and <code className="bg-gray-100 px-1 rounded">redirect</code> mechanism triggers at least one lookup. Nested includes within included records count toward your total. If you exceed 10 lookups, SPF returns a <strong>PermError</strong> and all email fails authentication. Use <code className="bg-gray-100 px-1 rounded">ip4:</code> and <code className="bg-gray-100 px-1 rounded">ip6:</code> mechanisms (which don't count as lookups) to stay under the limit, or use an SPF flattening service for complex setups.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">DKIM (DomainKeys Identified Mail)</h2>
            <p className="text-gray-700 mb-4">
              DKIM is the second layer of email authentication. It uses public/private key cryptography to add a digital signature to every outgoing email. The receiving server verifies this signature against a public key published in your DNS records. If the signature matches, it proves two things: the email actually came from your domain, and the content hasn't been modified in transit.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">How DKIM Works</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Step 1:</strong> Your email provider generates a public/private key pair. The private key stays on the mail server; the public key gets published in your DNS.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Step 2:</strong> When sending an email, the server creates a hash of certain email headers and the body, then encrypts it with the private key. This encrypted hash is added as a DKIM-Signature header.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Step 3:</strong> The receiving server extracts the selector from the DKIM-Signature header, looks up the public key at <code className="bg-gray-100 px-1 rounded">selector._domainkey.yourdomain.com</code>, and uses it to verify the signature.</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Setting Up DKIM</h3>
            <p className="text-gray-700 mb-4">
              DKIM is published as a TXT or CNAME record at <code className="bg-gray-100 px-1 rounded">selector._domainkey.yourdomain.com</code>. The selector name varies by provider:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Google Workspace:</strong> Selector is <code className="bg-gray-100 px-1 rounded">google</code> → record at <code className="bg-gray-100 px-1 rounded">google._domainkey.yourdomain.com</code></li>
              <li><strong>Microsoft 365:</strong> Selectors are <code className="bg-gray-100 px-1 rounded">selector1</code> and <code className="bg-gray-100 px-1 rounded">selector2</code> → CNAME records pointing to Microsoft's DKIM keys</li>
              <li><strong>Custom mail servers:</strong> Use tools like <code className="bg-gray-100 px-1 rounded">opendkim-genkey</code> to generate your own key pair</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Verify DKIM Is Working</h3>
            <p className="text-gray-700 mb-6">
              Send a test email to a Gmail or Outlook account, then check the email headers. Look for <code className="bg-gray-100 px-1 rounded">DKIM=pass</code> in the Authentication-Results header. You can also use command-line tools to query your DKIM DNS record directly:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
              <code className="text-sm font-mono block">dig txt google._domainkey.yourdomain.com +short</code>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">DMARC (Domain-based Message Authentication)</h2>
            <p className="text-gray-700 mb-4">
              DMARC is the third and final layer. It's a DNS TXT record at <code className="bg-gray-100 px-1 rounded">_dmarc.yourdomain.com</code> that ties SPF and DKIM together with a policy. DMARC tells receiving servers what to do when an email fails both SPF and DKIM authentication — and optionally sends you reports about authentication results so you can monitor who's sending email as your domain.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">DMARC Record Example</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <code className="text-sm font-mono block">v=DMARC1; p=reject; rua=mailto:dmarc@example.com; pct=100; adkim=s; aspf=s</code>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><code className="bg-gray-100 px-1 rounded">v=DMARC1</code> — DMARC version identifier</li>
              <li><code className="bg-gray-100 px-1 rounded">p=reject</code> — Policy: reject emails that fail authentication</li>
              <li><code className="bg-gray-100 px-1 rounded">rua=mailto:dmarc@example.com</code> — Where to send aggregate reports</li>
              <li><code className="bg-gray-100 px-1 rounded">pct=100</code> — Apply policy to 100% of failing messages</li>
              <li><code className="bg-gray-100 px-1 rounded">adkim=s</code> — Strict DKIM alignment (domain must exactly match)</li>
              <li><code className="bg-gray-100 px-1 rounded">aspf=s</code> — Strict SPF alignment</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">DMARC Policy Options</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Policy</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Action</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">When to Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">p=none</td>
                    <td className="py-3 px-4">Monitor only — no action on failures</td>
                    <td className="py-3 px-4">Starting out; collecting data on who sends as your domain</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono">p=quarantine</td>
                    <td className="py-3 px-4">Send failures to spam/junk folder</td>
                    <td className="py-3 px-4">After verifying all legitimate senders pass SPF/DKIM</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono">p=reject</td>
                    <td className="py-3 px-4">Block failing emails entirely</td>
                    <td className="py-3 px-4">Full protection; all legitimate email is properly authenticated</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Understanding DMARC Reports</h3>
            <p className="text-gray-700 mb-6">
              When you set up the <code className="bg-gray-100 px-1 rounded">rua=</code> tag, receiving servers send daily XML reports showing which IPs sent email as your domain and whether they passed or failed SPF and DKIM. These reports are invaluable for discovering unauthorized senders and verifying your authentication setup. Use a DMARC report analyzer service to parse the XML into readable dashboards — raw XML reports are difficult to read manually.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How SPF, DKIM & DMARC Work Together</h2>
            <p className="text-gray-700 mb-4">
              Think of email authentication as three layers of defense, each protecting against different attack vectors:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  Layer 1: SPF — "Is this server allowed to send?"
                </h3>
                <p className="text-gray-700">SPF checks the sending server's IP address against the authorized list in your DNS. It answers: "Is this server permitted to send email for this domain?" If the sending server isn't listed, SPF fails.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Layer 2: DKIM — "Is this email authentic and unmodified?"
                </h3>
                <p className="text-gray-700">DKIM verifies the email's cryptographic signature against the public key in DNS. It answers: "Was this email actually sent by the domain owner, and has it been tampered with?" If the signature doesn't match, DKIM fails.</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  Layer 3: DMARC — "What should we do about failures?"
                </h3>
                <p className="text-gray-700">DMARC checks that at least one of SPF or DKIM passes <strong>and</strong> aligns with the From: domain. It then applies your policy: do nothing (none), quarantine (spam folder), or reject (block entirely). DMARC also generates reports so you can monitor results.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Setup Guide: Google Workspace</h2>
            <p className="text-gray-700 mb-4">
              Complete email authentication setup for Google Workspace requires three DNS records:
            </p>
            <div className="space-y-3 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">SPF Record (TXT at root domain):</p>
                <code className="text-sm font-mono block">v=spf1 include:_spf.google.com ~all</code>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">DKIM Record (TXT at google._domainkey):</p>
                <p className="text-sm text-gray-700">Generate in Google Admin Console → Apps → Google Workspace → Gmail → Authenticate email. Add the provided TXT record at <code className="bg-gray-100 px-1 rounded">google._domainkey.yourdomain.com</code>.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">DMARC Record (TXT at _dmarc):</p>
                <code className="text-sm font-mono block">v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com</code>
                <p className="text-sm text-gray-600 mt-1">Start with p=none, then progress to p=quarantine and p=reject.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Setup Guide: Microsoft 365</h2>
            <p className="text-gray-700 mb-4">
              Microsoft 365 email authentication setup:
            </p>
            <div className="space-y-3 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">SPF Record (TXT at root domain):</p>
                <code className="text-sm font-mono block">v=spf1 include:spf.protection.outlook.com ~all</code>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">DKIM Records (CNAME):</p>
                <p className="text-sm text-gray-700 mb-1"><code className="bg-gray-100 px-1 rounded">selector1._domainkey</code> → CNAME to <code className="bg-gray-100 px-1 rounded">selector1-yourdomain-com._domainkey.yourtenant.onmicrosoft.com</code></p>
                <p className="text-sm text-gray-700"><code className="bg-gray-100 px-1 rounded">selector2._domainkey</code> → CNAME to <code className="bg-gray-100 px-1 rounded">selector2-yourdomain-com._domainkey.yourtenant.onmicrosoft.com</code></p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">DMARC Record (TXT at _dmarc):</p>
                <code className="text-sm font-mono block">v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com</code>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Checking Your Records with ReviewMyDNS</h2>
            <p className="text-gray-700 mb-4">
              Use our <Link href="/txt-record-checker" className="text-blue-600 hover:underline font-medium">TXT Record Checker</Link> to look up your domain's SPF, DKIM, and DMARC records from 50+ DNS servers worldwide. This helps you verify that your records are published correctly and have propagated across the internet.
            </p>
            <div className="space-y-2 mb-8">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-gray-700"><strong>Check SPF:</strong> Look up TXT records for <code className="bg-gray-100 px-1 rounded">yourdomain.com</code> — find the record starting with <code className="bg-gray-100 px-1 rounded">v=spf1</code></p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-gray-700"><strong>Check DKIM:</strong> Look up TXT records for <code className="bg-gray-100 px-1 rounded">selector._domainkey.yourdomain.com</code></p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-gray-700"><strong>Check DMARC:</strong> Look up TXT records for <code className="bg-gray-100 px-1 rounded">_dmarc.yourdomain.com</code> — find the record starting with <code className="bg-gray-100 px-1 rounded">v=DMARC1</code></p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Globe className="h-5 w-5 text-blue-600 mr-2" />
                Related Tools & Guides
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>→ <Link href="/txt-record-checker" className="text-blue-600 hover:underline font-medium">TXT Record Checker</Link> — Verify SPF, DKIM, and DMARC records globally</li>
                <li>→ <Link href="/mx-record-lookup" className="text-blue-600 hover:underline font-medium">MX Record Lookup</Link> — Check mail server records</li>
                <li>→ <Link href="/why-mx-record-not-working" className="text-blue-600 hover:underline font-medium">Why Is My MX Record Not Working?</Link> — Troubleshoot email DNS issues</li>
                <li>→ <Link href="/google-workspace-mx-not-working" className="text-blue-600 hover:underline font-medium">Google Workspace MX Not Working</Link> — Google-specific email troubleshooting</li>
                <li>→ <Link href="/dns-record-types-explained" className="text-blue-600 hover:underline font-medium">DNS Record Types Explained</Link> — Learn about all DNS record types</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="mb-4">&copy; {new Date().getFullYear()} ReviewMyDNS. Free DNS and email authentication tools.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/tools" className="hover:text-white">Tools</Link>
              <Link href="/txt-record-checker" className="hover:text-white">TXT Checker</Link>
              <Link href="/mx-record-lookup" className="hover:text-white">MX Lookup</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}