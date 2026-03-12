import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield, Server, Search } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function HowToCheckNameservers() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>How to Check Nameservers for Any Domain (2026) | ReviewMyDNS</title>
        <meta name="description" content="Learn how to check nameservers for any domain using free online tools, nslookup, dig, and whois. Find your domain's nameservers instantly with ReviewMyDNS." />
        <meta name="keywords" content="how to check nameservers, find my nameservers, check nameservers for domain, what are my nameservers, nameserver lookup, NS record check" />
        <link rel="canonical" href="https://reviewmydns.com/how-to-check-nameservers" />
        <meta property="og:title" content="How to Check Nameservers for Any Domain (2026) | ReviewMyDNS" />
        <meta property="og:description" content="Find your domain's nameservers instantly. Check NS records using our free tool, command line (nslookup, dig), or whois lookup." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/how-to-check-nameservers" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How do I check the nameservers for my domain?", "acceptedAnswer": { "@type": "Answer", "text": "You can check nameservers using an online tool like ReviewMyDNS (enter your domain and select NS record type), via command line with nslookup (Windows) or dig (Mac/Linux), or by running a whois lookup on your domain. Each method queries the DNS system and returns the authoritative nameservers assigned to your domain." } },
            { "@type": "Question", "name": "What are nameservers and what do they do?", "acceptedAnswer": { "@type": "Answer", "text": "Nameservers are specialized DNS servers that store DNS records for your domain and respond to queries about it. Think of them like a phone book for the internet—when someone types your domain name, nameservers tell their browser which IP address (server) to connect to. Every domain must have at least two nameservers for redundancy." } },
            { "@type": "Question", "name": "How long does it take for nameserver changes to propagate?", "acceptedAnswer": { "@type": "Answer", "text": "Nameserver changes typically take 24 to 48 hours to fully propagate worldwide. This is longer than regular DNS record changes because nameserver updates must be processed at the domain registry level (such as Verisign for .com domains). Some regions may see the update within a few hours, while others take the full 48 hours." } },
            { "@type": "Question", "name": "What is the difference between nameservers and DNS records?", "acceptedAnswer": { "@type": "Answer", "text": "Nameservers are the servers that host your DNS zone, while DNS records (A, CNAME, MX, TXT, etc.) are the individual entries stored on those nameservers. Changing nameservers is like moving your entire phone book to a different location, while changing a DNS record is like updating a single phone number in the book. Nameservers are set at your domain registrar, while DNS records are managed at your DNS hosting provider." } },
            { "@type": "Question", "name": "What does 'lame delegation' mean for nameservers?", "acceptedAnswer": { "@type": "Answer", "text": "Lame delegation occurs when a domain's registered nameservers do not actually have the DNS zone configured for that domain. This means the nameserver cannot answer queries for your domain, causing DNS resolution failures. It commonly happens when you change DNS providers but forget to update the nameservers at your registrar, or when a nameserver is decommissioned without updating the delegation." } },
            { "@type": "Question", "name": "Can I use different nameservers from my domain registrar?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can use any nameservers you want regardless of where your domain is registered. For example, you can register your domain at GoDaddy but use Cloudflare's nameservers for DNS hosting. This is a common practice to take advantage of faster DNS providers, better security features like DNSSEC, or CDN integration while keeping your domain registration elsewhere." } },
            { "@type": "Question", "name": "How many nameservers should a domain have?", "acceptedAnswer": { "@type": "Answer", "text": "A domain should have at least two nameservers for redundancy, and most providers assign two to four. Having multiple nameservers ensures that if one server goes down, DNS queries can still be answered by the others. Some enterprise providers like AWS Route 53 assign four nameservers across different top-level domains for maximum reliability." } }
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
              How to Check Nameservers for Any Domain
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find your domain's nameservers instantly using our free tool. Check NS records across <strong>50+ global servers</strong>, or use command-line tools like <strong>nslookup</strong>, <strong>dig</strong>, and <strong>whois</strong>.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Server className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">NS Record Lookup</h3>
                  <p className="text-sm text-gray-600">Find authoritative nameservers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">50+ Servers</h3>
                  <p className="text-sm text-gray-600">Check nameservers worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Search className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-600">See NS records in seconds</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Detect Problems</h3>
                  <p className="text-sm text-gray-600">Spot mismatches & lame delegation</p>
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
                <Search className="h-6 w-6 text-blue-600 mr-2" />
                Quick Answer
              </h2>
              <p className="text-gray-700 text-lg">
                To check nameservers for any domain, enter the domain above and select <strong>NS</strong> as the record type. You'll see the authoritative nameservers assigned to that domain across 50+ global DNS servers. Alternatively, open a terminal and run <code className="bg-gray-100 px-1 rounded">nslookup -type=ns example.com</code> on Windows or <code className="bg-gray-100 px-1 rounded">dig NS example.com</code> on Mac/Linux.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">What Are Nameservers?</h2>
            <p className="text-gray-700 mb-4">
              Nameservers are the backbone of the Domain Name System (DNS). Think of them as the <strong>phone book of the internet</strong>—when someone types your domain name into a browser, nameservers are the servers that look up the address and direct traffic to your website's actual server.
            </p>
            <p className="text-gray-700 mb-4">
              Every domain on the internet is assigned at least two nameservers. These servers store all of your domain's DNS records—A records (website IP addresses), MX records (email servers), TXT records (verification and security), and more. When a visitor looks up your domain, their browser asks the nameservers "where is this domain hosted?" and the nameservers respond with the correct IP address.
            </p>
            <p className="text-gray-700 mb-4">
              Nameservers are set at your <strong>domain registrar</strong> (where you purchased the domain, like GoDaddy, Namecheap, or Google Domains). They can point to the registrar's own DNS hosting, or to a third-party DNS provider like Cloudflare or AWS Route 53. Understanding which nameservers your domain uses is crucial for troubleshooting DNS issues, migrating hosting providers, or setting up services like CDNs and email.
            </p>
            <p className="text-gray-700 mb-8">
              For a deeper understanding of different DNS record types and what they do, see our <Link href="/dns-record-types-explained" className="text-blue-600 hover:underline font-medium">complete guide to DNS record types</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Check Nameservers Using ReviewMyDNS</h2>
            <p className="text-gray-700 mb-4">
              The easiest way to check nameservers for any domain is with our free tool above. Here's how:
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <div>
                  <p className="font-medium text-gray-900">Enter your domain name</p>
                  <p className="text-sm text-gray-600">Type the domain you want to check (e.g., example.com) into the lookup form above. Don't include "www" or "https://"—just the bare domain.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <div>
                  <p className="font-medium text-gray-900">Select "NS" as the record type</p>
                  <p className="text-sm text-gray-600">Choose NS from the record type dropdown. This tells the tool to query nameserver records specifically, rather than A, MX, or other record types.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <div>
                  <p className="font-medium text-gray-900">Review the results</p>
                  <p className="text-sm text-gray-600">You'll see the nameservers returned by 50+ global DNS servers. All servers should return the same nameservers—if they don't, your nameserver change may still be propagating or there could be a configuration issue.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Check Nameservers via Command Line</h2>
            <p className="text-gray-700 mb-4">
              If you prefer the command line, there are several built-in tools you can use to look up nameservers. Here are the most common methods for each operating system:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Server className="h-5 w-5 text-blue-600 mr-2" />
                  nslookup (Windows, Mac, Linux)
                </h3>
                <p className="text-gray-700 mb-2">The <code className="bg-gray-100 px-1 rounded">nslookup</code> command is available on all major operating systems and is the simplest way to check nameservers from the terminal:</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                  <p>nslookup -type=ns example.com</p>
                </div>
                <p className="text-gray-600 text-sm">This returns the authoritative nameservers for the domain. You can also specify a DNS server to query against, such as <code className="bg-gray-100 px-1 rounded">nslookup -type=ns example.com 8.8.8.8</code> to use Google's DNS.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Server className="h-5 w-5 text-blue-600 mr-2" />
                  dig (Mac / Linux)
                </h3>
                <p className="text-gray-700 mb-2">The <code className="bg-gray-100 px-1 rounded">dig</code> command provides more detailed output and is the preferred tool for DNS administrators:</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                  <p>dig NS example.com</p>
                  <p className="text-gray-500 mt-1"># For a shorter output:</p>
                  <p>dig NS example.com +short</p>
                </div>
                <p className="text-gray-600 text-sm">The <code className="bg-gray-100 px-1 rounded">+short</code> flag gives you just the nameserver hostnames without the full DNS response. To query a specific resolver, add <code className="bg-gray-100 px-1 rounded">@8.8.8.8</code> before the domain.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Search className="h-5 w-5 text-blue-600 mr-2" />
                  whois
                </h3>
                <p className="text-gray-700 mb-2">The <code className="bg-gray-100 px-1 rounded">whois</code> command shows the nameservers registered at the domain registry level, which is useful for verifying that your registrar has the correct NS records:</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-2">
                  <p>whois example.com | grep -i "name server"</p>
                </div>
                <p className="text-gray-600 text-sm">This shows the nameservers as registered with the TLD registry (e.g., Verisign for .com). If these don't match what DNS returns, there may be a propagation delay or configuration error.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common Nameserver Formats by Provider</h2>
            <p className="text-gray-700 mb-4">
              Each DNS provider uses a distinctive nameserver naming format. Knowing these formats helps you quickly identify which provider is hosting DNS for any domain:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Provider</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Nameserver Format</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">GoDaddy</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded">ns*.domaincontrol.com</code></td>
                    <td className="py-3 px-4">ns77.domaincontrol.com, ns78.domaincontrol.com</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Cloudflare</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded">*.ns.cloudflare.com</code></td>
                    <td className="py-3 px-4">anna.ns.cloudflare.com, bob.ns.cloudflare.com</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Namecheap</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded">dns*.registrar-servers.com</code></td>
                    <td className="py-3 px-4">dns1.registrar-servers.com, dns2.registrar-servers.com</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">AWS Route 53</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded">ns-*.awsdns-*.com</code></td>
                    <td className="py-3 px-4">ns-123.awsdns-45.com, ns-678.awsdns-90.net</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Google Cloud DNS</td>
                    <td className="py-3 px-4"><code className="bg-gray-100 px-1 rounded">ns-cloud-*.googledomains.com</code></td>
                    <td className="py-3 px-4">ns-cloud-a1.googledomains.com, ns-cloud-b1.googledomains.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-8">
              Cloudflare assigns random first names (like anna, bob, diana) to each domain's nameservers. AWS Route 53 assigns four nameservers across different TLDs (.com, .net, .org, .co.uk) for maximum redundancy. If you see nameservers you don't recognize, use our tool above to verify they're correctly responding for your domain.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Nameservers vs DNS Records: What's the Difference?</h2>
            <p className="text-gray-700 mb-4">
              This is one of the most common points of confusion in DNS management. Here's the key distinction:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Server className="h-5 w-5 text-blue-600 mr-2" />
                  Nameservers (NS Records)
                </h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Tell the internet <strong>where</strong> to find your DNS records</li>
                  <li>• Set at your <strong>domain registrar</strong></li>
                  <li>• Changing them is like <strong>moving your entire phone book</strong> to a new location</li>
                  <li>• Changes take <strong>24–48 hours</strong> to propagate</li>
                  <li>• You typically have 2–4 nameservers per domain</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  DNS Records (A, CNAME, MX, TXT, etc.)
                </h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Contain the actual <strong>data</strong> (IP addresses, mail servers, etc.)</li>
                  <li>• Managed at your <strong>DNS hosting provider</strong></li>
                  <li>• Changing them is like <strong>updating a single entry</strong> in the phone book</li>
                  <li>• Changes take <strong>5 minutes to 24 hours</strong> depending on TTL</li>
                  <li>• You can have dozens or hundreds of records per domain</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mb-8">
              <strong>Important:</strong> If your registrar and DNS host are the same company (e.g., you registered at GoDaddy and use GoDaddy's DNS), you may not notice the distinction. But if you use a different DNS provider (e.g., domain at Namecheap, DNS at Cloudflare), understanding this difference is essential. Learn more about individual record types in our <Link href="/dns-record-types-explained" className="text-blue-600 hover:underline font-medium">DNS record types guide</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">When to Change Your Nameservers</h2>
            <p className="text-gray-700 mb-4">
              There are several common scenarios where you'll need to update your domain's nameservers:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  Moving to Cloudflare for DNS and CDN
                </h3>
                <p className="text-gray-700">Cloudflare requires you to change your nameservers to theirs to activate their CDN, DDoS protection, and DNS hosting. This is the most common reason people change nameservers. Cloudflare's free plan includes fast DNS hosting with sub-second propagation.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Server className="h-5 w-5 text-blue-600 mr-2" />
                  Switching DNS Hosting Providers
                </h3>
                <p className="text-gray-700">If you're moving from your registrar's default DNS to a dedicated DNS provider like AWS Route 53, Google Cloud DNS, or Cloudflare for better performance, reliability, or features like geo-routing and failover.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  Transferring Your Domain to a New Registrar
                </h3>
                <p className="text-gray-700">When transferring a domain between registrars, you may need to update nameservers—especially if you were using the old registrar's DNS hosting. See our guide on <Link href="/domain-not-working-after-transfer" className="text-blue-600 hover:underline">fixing domains not working after transfer</Link> for step-by-step help.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  Setting Up a New Website or Hosting
                </h3>
                <p className="text-gray-700">Some hosting providers (like Wix, Squarespace, and Shopify) require or recommend pointing nameservers to their servers for full integration with their platform features, SSL certificates, and content delivery.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common Nameserver Problems and How to Fix Them</h2>
            <p className="text-gray-700 mb-4">
              Misconfigured nameservers are one of the most common causes of DNS resolution failures. Here are the problems we see most frequently and how to resolve them:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2">Wrong Nameservers at Registrar</h3>
                <p className="text-gray-700 mb-2">Your registrar still points to old or incorrect nameservers. This is the #1 cause of "my domain isn't working" issues after switching DNS providers.</p>
                <p className="text-gray-700 text-sm"><strong>Fix:</strong> Log into your domain registrar, navigate to the nameserver settings, and update them to your current DNS provider's nameservers. Use the tool above to verify the change has propagated.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2">Nameserver Mismatch</h3>
                <p className="text-gray-700 mb-2">Different DNS resolvers around the world return different nameservers for your domain. This usually indicates a nameserver change is still propagating.</p>
                <p className="text-gray-700 text-sm"><strong>Fix:</strong> Wait 24–48 hours for full propagation. Use our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">DNS propagation checker</Link> to monitor progress. If the mismatch persists beyond 48 hours, verify the correct nameservers are set at your registrar.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2">Lame Delegation</h3>
                <p className="text-gray-700 mb-2">The nameservers listed at the registry don't have your domain's DNS zone configured. This means the nameserver receives queries for your domain but can't answer them, resulting in DNS resolution failures for all visitors.</p>
                <p className="text-gray-700 text-sm"><strong>Fix:</strong> Either configure your DNS zone on the listed nameservers, or update the nameserver records at your registrar to point to servers that actually host your zone. This is a critical issue—your domain will be completely unreachable until it's resolved.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-gray-900 mb-2">Missing or Expired Nameserver</h3>
                <p className="text-gray-700 mb-2">One of your nameservers is offline, decommissioned, or no longer resolving. While your domain may still work (since most domains have 2+ nameservers), performance and reliability are degraded.</p>
                <p className="text-gray-700 text-sm"><strong>Fix:</strong> Replace the broken nameserver with a working one from your DNS provider. Always ensure you have at least two functioning nameservers for redundancy.</p>
              </div>
            </div>
            <p className="text-gray-700 mb-8">
              If your DNS changes aren't taking effect, check our detailed guide on <Link href="/dns-not-propagating" className="text-blue-600 hover:underline font-medium">why DNS is not propagating</Link> for more troubleshooting steps.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How Long Do Nameserver Changes Take to Propagate?</h2>
            <p className="text-gray-700 mb-4">
              Nameserver changes are one of the slowest DNS changes to propagate, typically taking <strong>24 to 48 hours</strong> to complete worldwide. This is significantly longer than regular DNS record changes (which can propagate in minutes) because nameserver updates involve a different process:
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Registry-level update required</p>
                  <p className="text-sm text-gray-600">When you change nameservers at your registrar, the registrar submits the change to the domain registry (e.g., Verisign for .com). The registry updates its zone files on its own schedule, which introduces the first delay.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">TLD nameserver cache</p>
                  <p className="text-sm text-gray-600">The TLD nameservers (e.g., the .com servers) cache NS delegation records with their own TTL, typically 48 hours. Until this cache expires, some resolvers may still be directed to your old nameservers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Recursive resolver cache</p>
                  <p className="text-sm text-gray-600">ISP and public DNS resolvers (like Google 8.8.8.8 and Cloudflare 1.1.1.1) also cache the NS delegation, adding another layer of delay on top of the registry update.</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Pro tip:</strong> Before changing nameservers, ensure your new DNS provider has all your DNS records configured and tested. Once you switch, any records missing from the new nameservers will cause those services to stop working. Learn more about TTL and caching in our <Link href="/what-is-ttl-in-dns" className="text-blue-600 hover:underline font-medium">guide to TTL in DNS</Link>.
            </p>
            <p className="text-gray-700 mb-8">
              You can monitor the progress of your nameserver change using our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline font-medium">DNS propagation checker</Link>—select NS as the record type and watch as servers around the world update to your new nameservers.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">How do I find my nameservers?</h3>
                <p className="text-gray-700">The fastest method is to use the lookup tool at the top of this page—enter your domain and select NS. You can also check your domain registrar's control panel (the nameservers are usually listed under "Domain Settings" or "DNS Management"), or run <code className="bg-gray-100 px-1 rounded">nslookup -type=ns yourdomain.com</code> from your terminal.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Can I use Cloudflare nameservers with any registrar?</h3>
                <p className="text-gray-700">Yes. You can register your domain at any registrar (GoDaddy, Namecheap, Google Domains, etc.) and point the nameservers to Cloudflare. Cloudflare's free plan includes DNS hosting. Simply add your domain to Cloudflare, and they'll provide you with two nameservers to set at your registrar.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Why do I have two (or more) nameservers?</h3>
                <p className="text-gray-700">DNS requires at least two nameservers for redundancy. If one nameserver goes down, the other can still answer queries and keep your domain working. Enterprise DNS providers like AWS Route 53 assign four nameservers across different network infrastructures for even higher availability.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">What happens if I set the wrong nameservers?</h3>
                <p className="text-gray-700">If you point your domain to nameservers that don't have your DNS records configured, your website, email, and all other services on that domain will stop working. This is called "lame delegation." Always verify that your new nameservers have all your DNS records before making the switch. You can test by querying the new nameservers directly before updating them at the registrar.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">My nameserver change has been 48+ hours—what now?</h3>
                <p className="text-gray-700">If your nameserver change hasn't propagated after 48 hours, verify the nameservers are correctly entered at your registrar (check for typos). Run a whois lookup to confirm the registry has the updated nameservers. Test that the new nameservers are actually responding by querying them directly. If the issue persists, contact your registrar's support team.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Do nameserver changes affect email delivery?</h3>
                <p className="text-gray-700">Yes. During nameserver propagation, some mail servers may query the old nameservers (which may no longer have your MX records) while others query the new ones. To avoid lost email, ensure both old and new nameservers have identical MX records during the transition, or set up mail forwarding from the old provider until propagation completes.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Check Your Nameservers Now</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Instantly see which nameservers are assigned to any domain. Query 50+ global DNS servers and detect mismatches, lame delegation, and propagation issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/dns-propagation-checker">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Globe className="h-5 w-5 mr-2" />
                    Open DNS Propagation Checker
                  </Button>
                </Link>
                <Link href="/dns-record-types-explained">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Server className="h-5 w-5 mr-2" />
                    DNS Record Types Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Tools</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/dns-propagation-checker" className="hover:text-white">DNS Propagation Checker</Link></li>
                  <li><Link href="/tools" className="hover:text-white">All DNS Tools</Link></li>
                  <li><Link href="/dnssec" className="hover:text-white">DNSSEC Checker</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Guides</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/guides/cloudflare-dns-setup" className="hover:text-white">Cloudflare DNS Setup</Link></li>
                  <li><Link href="/guides/godaddy-dns-setup" className="hover:text-white">GoDaddy DNS Setup</Link></li>
                  <li><Link href="/guides" className="hover:text-white">All Guides</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                  <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                  <li><Link href="/documentation" className="hover:text-white">Terminology</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                  <li><Link href="/api-docs" className="hover:text-white">API</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} ReviewMyDNS. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}