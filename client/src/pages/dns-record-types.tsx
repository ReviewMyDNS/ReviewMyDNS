import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield, BookOpen, Info } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function DnsRecordTypes() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>DNS Record Types Explained: Complete Guide (2026) | ReviewMyDNS</title>
        <meta name="description" content="DNS record types explained: A, AAAA, CNAME, MX, TXT, NS, SOA, PTR, SRV, and CAA records. Learn what each DNS record does, when to use it, and see real syntax examples in this complete guide." />
        <meta name="keywords" content="dns record types explained, types of dns records, dns record types list, a record, cname record, mx record, txt record, ns record" />
        <link rel="canonical" href="https://reviewmydns.com/dns-record-types-explained" />
        <meta property="og:title" content="DNS Record Types Explained: Complete Guide (2026) | ReviewMyDNS" />
        <meta property="og:description" content="Complete guide to every DNS record type: A, AAAA, CNAME, MX, TXT, NS, SOA, PTR, SRV, and CAA. Learn what each does, syntax examples, and when to use them." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://reviewmydns.com/dns-record-types-explained" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What are the main types of DNS records?", "acceptedAnswer": { "@type": "Answer", "text": "The main DNS record types are: A (maps domain to IPv4 address), AAAA (maps to IPv6), CNAME (creates an alias to another domain), MX (routes email to mail servers), TXT (stores text data like SPF and DKIM), NS (delegates to nameservers), SOA (contains zone authority info), PTR (reverse DNS lookup), SRV (locates services), and CAA (controls SSL certificate issuance). A and CNAME records are the most commonly used for websites." } },
            { "@type": "Question", "name": "What is the difference between an A record and a CNAME record?", "acceptedAnswer": { "@type": "Answer", "text": "An A record maps a domain directly to an IPv4 address (e.g., example.com → 93.184.216.34). A CNAME record maps a domain to another domain name as an alias (e.g., www.example.com → example.com). Key differences: A records resolve to IP addresses directly; CNAME records add an extra DNS lookup. CNAME records cannot be used at the zone apex (root domain) per DNS standards, while A records can. Use A records for root domains and CNAME for subdomains that should follow another domain." } },
            { "@type": "Question", "name": "What DNS records do I need for email?", "acceptedAnswer": { "@type": "Answer", "text": "For email you need: 1) MX records pointing to your mail server (e.g., Google Workspace uses mx1.smtp.google.com with priority 1). 2) TXT record with SPF to authorize sending servers (e.g., 'v=spf1 include:_spf.google.com ~all'). 3) TXT record with DKIM for email authentication. 4) TXT record with DMARC policy. 5) Optionally, PTR records for reverse DNS to improve deliverability. Missing or incorrect email DNS records will cause emails to bounce or land in spam." } },
            { "@type": "Question", "name": "What is a TXT record used for?", "acceptedAnswer": { "@type": "Answer", "text": "TXT records store text strings in DNS and are used for: 1) SPF records to specify which servers can send email for your domain. 2) DKIM records for email authentication signatures. 3) DMARC policies for email handling instructions. 4) Domain verification for services like Google Workspace, Microsoft 365, and SSL certificate providers. 5) Site verification for Google Search Console and other tools. A domain can have multiple TXT records simultaneously." } },
            { "@type": "Question", "name": "What is an MX record and how does priority work?", "acceptedAnswer": { "@type": "Answer", "text": "An MX (Mail Exchange) record tells the internet which mail servers accept email for your domain. Each MX record has a priority value (lower number = higher priority). When sending email, mail servers try the MX record with the lowest priority number first. If that server is unavailable, they try the next highest priority. For example, Google Workspace uses priority 1 for ASPMX.L.GOOGLE.COM and priorities 5, 5, 10, 10 for backup servers." } },
            { "@type": "Question", "name": "Can I have multiple DNS records of the same type?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, most record types allow multiple entries. You can have multiple A records for round-robin load balancing, multiple MX records for email failover, multiple TXT records for different verification and authentication purposes, and multiple NS records for nameserver redundancy. The exception is CNAME: a hostname with a CNAME record cannot have any other record types (except DNSSEC-related records). SOA records are also limited to one per zone." } },
            { "@type": "Question", "name": "What is a CAA record and do I need one?", "acceptedAnswer": { "@type": "Answer", "text": "A CAA (Certificate Authority Authorization) record specifies which certificate authorities (CAs) are allowed to issue SSL/TLS certificates for your domain. For example, setting a CAA record to 'letsencrypt.org' means only Let's Encrypt can issue certificates. CAA records are recommended for security—they prevent unauthorized CAs from issuing certificates for your domain, reducing the risk of man-in-the-middle attacks. If you don't have CAA records, any CA can issue certificates." } }
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
              DNS Record Types Explained
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A complete guide to every DNS record type: <strong>A, AAAA, CNAME, MX, TXT, NS, SOA, PTR, SRV, and CAA</strong>. Learn what each record does, see real syntax examples, and understand which records you need for your website, email, and SSL.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <BookOpen className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">10 Record Types</h3>
                  <p className="text-sm text-gray-600">Complete coverage of all DNS records</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Real Examples</h3>
                  <p className="text-sm text-gray-600">Actual syntax and use cases</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Test Any Record</h3>
                  <p className="text-sm text-gray-600">Look up records across 50+ servers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Best Practices</h3>
                  <p className="text-sm text-gray-600">Which records for each scenario</p>
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
                <Info className="h-6 w-6 text-blue-600 mr-2" />
                How the DNS Record System Works
              </h2>
              <p className="text-gray-700 text-lg">
                DNS (Domain Name System) translates human-readable domain names like <strong>example.com</strong> into the data computers need to route traffic—IP addresses, mail servers, verification codes, and more. This is done through <strong>DNS records</strong>, each serving a specific purpose. Think of DNS as a phonebook where each entry type gives different information: the A record is the street address, the MX record is the email address, and the TXT record is a sticky note with extra info.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">A Record (Address Record)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Maps a domain name to an IPv4 address</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">example.com.    3600    IN    A    93.184.216.34</code>
            </div>
            <p className="text-gray-700 mb-4">
              The A record is the most fundamental DNS record type. It maps a domain name directly to a 32-bit IPv4 address, telling browsers and other clients exactly which server to connect to. When someone types your domain into their browser, the A record is what ultimately resolves to the server's IP address.
            </p>
            <p className="text-gray-700 mb-4">
              You can have multiple A records for the same hostname to enable round-robin load balancing—DNS will rotate through the IP addresses, distributing traffic across servers. A records are used for root domains (example.com) and subdomains (app.example.com, api.example.com). For more on how A records compare to CNAME records, see our guide on <Link href="/a-record-vs-cname" className="text-blue-600 hover:underline">A record vs CNAME</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">AAAA Record (IPv6 Address Record)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Maps a domain name to an IPv6 address</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">example.com.    3600    IN    AAAA    2606:2800:0220:0001:0248:1893:25c8:1946</code>
            </div>
            <p className="text-gray-700 mb-4">
              The AAAA record (pronounced "quad-A") is the IPv6 equivalent of the A record. As the internet runs out of IPv4 addresses, IPv6 adoption is growing rapidly. AAAA records map domain names to 128-bit IPv6 addresses, which are much longer than IPv4 addresses but provide a virtually unlimited address space.
            </p>
            <p className="text-gray-700 mb-8">
              Modern best practice is to configure both A and AAAA records for your domain (called "dual-stack"). This ensures your website is accessible to all visitors regardless of whether their network uses IPv4 or IPv6. Most major hosting providers and CDNs now support IPv6 out of the box.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">CNAME Record (Canonical Name)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Creates an alias from one domain name to another</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">www.example.com.    3600    IN    CNAME    example.com.</code>
            </div>
            <p className="text-gray-700 mb-4">
              A CNAME record creates an alias, pointing one domain name to another domain name (not an IP address). The most common use is pointing <code className="bg-gray-100 px-1 rounded">www.example.com</code> to <code className="bg-gray-100 px-1 rounded">example.com</code>, so both addresses reach the same website. CNAME records are also used for CDN setups, SaaS platform custom domains, and subdomain routing.
            </p>
            <p className="text-gray-700 mb-8">
              <strong>Important limitation:</strong> A CNAME record cannot exist at the zone apex (root domain). You cannot have a CNAME for <code className="bg-gray-100 px-1 rounded">example.com</code>—only for subdomains like <code className="bg-gray-100 px-1 rounded">www.example.com</code> or <code className="bg-gray-100 px-1 rounded">blog.example.com</code>. This is because CNAME records cannot coexist with other record types at the same name, and the root domain typically needs SOA and NS records. Some providers like Cloudflare offer "CNAME flattening" to work around this.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">MX Record (Mail Exchange)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Routes email to the correct mail servers</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm mb-1">example.com.    3600    IN    MX    1 aspmx.l.google.com.</code>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">example.com.    3600    IN    MX    5 alt1.aspmx.l.google.com.</code>
            </div>
            <p className="text-gray-700 mb-4">
              MX records tell the internet which mail servers accept email for your domain. Each MX record includes a <strong>priority value</strong>—a lower number means higher priority. When someone sends email to you@example.com, their mail server looks up your MX records and tries the server with the lowest priority number first. If that server is down, it tries the next one.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Google Workspace</strong> uses five MX records with priorities 1, 5, 5, 10, and 10. <strong>Microsoft 365</strong> typically uses a single MX record pointing to <code className="bg-gray-100 px-1 rounded">your-domain.mail.protection.outlook.com</code> with priority 0. Always verify your MX records after setup using our <Link href="/mx-record-lookup" className="text-blue-600 hover:underline">MX record lookup tool</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">TXT Record (Text Record)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Stores text-based data for verification and authentication</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm mb-1">example.com.    3600    IN    TXT    "v=spf1 include:_spf.google.com ~all"</code>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">example.com.    3600    IN    TXT    "google-site-verification=abc123..."</code>
            </div>
            <p className="text-gray-700 mb-4">
              TXT records store arbitrary text strings in DNS. While originally designed for human-readable notes, they're now primarily used for machine-readable data. The most common uses include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>SPF (Sender Policy Framework):</strong> Specifies which servers can send email on behalf of your domain</li>
              <li><strong>DKIM (DomainKeys Identified Mail):</strong> Provides cryptographic signatures for email authentication</li>
              <li><strong>DMARC:</strong> Sets policy for handling emails that fail SPF/DKIM checks</li>
              <li><strong>Domain verification:</strong> Proves domain ownership to Google Search Console, Microsoft 365, SSL providers, and other services</li>
            </ul>
            <p className="text-gray-700 mb-8">
              A domain can have multiple TXT records, and each can serve a different purpose. Use our <Link href="/txt-record-checker" className="text-blue-600 hover:underline">TXT record checker</Link> to verify your SPF, DKIM, and other TXT records are correctly configured.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">NS Record (Nameserver)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Delegates DNS authority to specific nameservers</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm mb-1">example.com.    86400    IN    NS    ns1.cloudflare.com.</code>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">example.com.    86400    IN    NS    ns2.cloudflare.com.</code>
            </div>
            <p className="text-gray-700 mb-4">
              NS records define which nameservers are authoritative for a domain. When a DNS resolver needs to look up records for your domain, it first finds the NS records to know which servers to ask. Changing NS records effectively redirects all DNS for your domain to a different provider—this is how you "switch DNS providers" from GoDaddy to Cloudflare, for example.
            </p>
            <p className="text-gray-700 mb-8">
              NS record changes are the slowest to propagate (24–48 hours) because they must be updated at the domain registry level (Verisign for .com, etc.). Always have at least two NS records for redundancy. Most DNS providers assign 2–4 nameservers automatically. Learn more about propagation timing in our guide on <Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline">how long DNS propagation takes</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">SOA Record (Start of Authority)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Contains zone metadata and authority information</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">example.com.    3600    IN    SOA    ns1.example.com. admin.example.com. 2026010101 7200 3600 1209600 86400</code>
            </div>
            <p className="text-gray-700 mb-4">
              The SOA record is the first record in every DNS zone and contains critical zone metadata. It includes: the primary nameserver, the zone administrator's email (with @ replaced by .), a serial number (incremented on every change), refresh interval (how often secondary nameservers check for updates), retry interval, expire time, and the minimum TTL for negative caching.
            </p>
            <p className="text-gray-700 mb-8">
              You rarely need to edit SOA records directly—most DNS providers manage them automatically. The serial number is important for zone transfers between primary and secondary nameservers; it must increase with every zone change for secondary servers to detect updates.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">PTR Record (Pointer / Reverse DNS)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Maps an IP address back to a domain name (reverse DNS)</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">34.216.184.93.in-addr.arpa.    3600    IN    PTR    example.com.</code>
            </div>
            <p className="text-gray-700 mb-4">
              PTR records are the reverse of A records—they map an IP address to a domain name. When a mail server receives an email, it performs a reverse DNS lookup on the sender's IP to verify the server's identity. If the PTR record doesn't match the sending domain's forward DNS (A record), many mail servers will flag or reject the email as suspicious.
            </p>
            <p className="text-gray-700 mb-8">
              PTR records are managed by whoever controls the IP address block (typically your hosting provider or ISP), not in your domain's DNS zone. To set up PTR records, you'll usually need to contact your hosting provider or configure it through their control panel. Proper PTR records are essential for email deliverability—without them, your emails are more likely to land in spam folders.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">SRV Record (Service Locator)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Specifies the location of specific services (host, port, priority)</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">_sip._tcp.example.com.    3600    IN    SRV    10 60 5060 sipserver.example.com.</code>
            </div>
            <p className="text-gray-700 mb-4">
              SRV records define the hostname and port number for specific services. The format includes service name, protocol, priority, weight, port, and target. SRV records are used by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Microsoft 365:</strong> For Skype for Business, Teams, and autodiscover functionality</li>
              <li><strong>SIP/VoIP:</strong> For voice-over-IP service discovery</li>
              <li><strong>XMPP:</strong> For instant messaging protocols (Jabber)</li>
              <li><strong>Gaming:</strong> For Minecraft servers and other multiplayer game server discovery</li>
              <li><strong>LDAP:</strong> For Active Directory and directory service location</li>
            </ul>
            <p className="text-gray-700 mb-8">
              Unlike MX records which only specify a host and priority, SRV records also include the port number and a weight value for load distribution among servers with the same priority. This makes them more flexible for service-oriented architectures.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">CAA Record (Certificate Authority Authorization)</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-500 mb-1">Purpose: Controls which certificate authorities can issue SSL/TLS certificates</p>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm mb-1">example.com.    3600    IN    CAA    0 issue "letsencrypt.org"</code>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">example.com.    3600    IN    CAA    0 iodef "mailto:security@example.com"</code>
            </div>
            <p className="text-gray-700 mb-4">
              CAA records are a security measure that specifies which Certificate Authorities (CAs) are authorized to issue SSL/TLS certificates for your domain. Before issuing a certificate, CAs are required to check your CAA records. If a CAA record exists and doesn't list them, they must refuse to issue the certificate.
            </p>
            <p className="text-gray-700 mb-8">
              CAA records support three tags: <code className="bg-gray-100 px-1 rounded">issue</code> (authorizes regular certificates), <code className="bg-gray-100 px-1 rounded">issuewild</code> (authorizes wildcard certificates), and <code className="bg-gray-100 px-1 rounded">iodef</code> (specifies where violation reports should be sent). If you don't have CAA records, any CA can issue certificates for your domain—adding CAA records is a simple but effective security improvement.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Quick Reference: DNS Record Types Comparison</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold border-b">Record</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Purpose</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Example Value</th>
                    <th className="text-left py-3 px-4 font-semibold border-b">Common TTL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">A</td>
                    <td className="py-3 px-4">Domain → IPv4</td>
                    <td className="py-3 px-4">93.184.216.34</td>
                    <td className="py-3 px-4">3600</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">AAAA</td>
                    <td className="py-3 px-4">Domain → IPv6</td>
                    <td className="py-3 px-4">2606:2800:220:1:...</td>
                    <td className="py-3 px-4">3600</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">CNAME</td>
                    <td className="py-3 px-4">Alias → Domain</td>
                    <td className="py-3 px-4">example.com</td>
                    <td className="py-3 px-4">3600</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">MX</td>
                    <td className="py-3 px-4">Email routing</td>
                    <td className="py-3 px-4">10 mail.example.com</td>
                    <td className="py-3 px-4">3600–14400</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">TXT</td>
                    <td className="py-3 px-4">Text data (SPF, DKIM)</td>
                    <td className="py-3 px-4">v=spf1 include:...</td>
                    <td className="py-3 px-4">3600</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">NS</td>
                    <td className="py-3 px-4">Nameserver delegation</td>
                    <td className="py-3 px-4">ns1.cloudflare.com</td>
                    <td className="py-3 px-4">86400</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">SOA</td>
                    <td className="py-3 px-4">Zone authority</td>
                    <td className="py-3 px-4">ns1... admin... serial...</td>
                    <td className="py-3 px-4">3600</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">PTR</td>
                    <td className="py-3 px-4">IP → Domain (reverse)</td>
                    <td className="py-3 px-4">example.com</td>
                    <td className="py-3 px-4">3600–86400</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">SRV</td>
                    <td className="py-3 px-4">Service location</td>
                    <td className="py-3 px-4">10 60 5060 sip.example.com</td>
                    <td className="py-3 px-4">3600</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">CAA</td>
                    <td className="py-3 px-4">SSL CA authorization</td>
                    <td className="py-3 px-4">0 issue "letsencrypt.org"</td>
                    <td className="py-3 px-4">3600</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-8">
              Understanding TTL values for each record type is crucial for DNS management. Learn more in our detailed guide on <Link href="/what-is-ttl-in-dns" className="text-blue-600 hover:underline font-medium">what TTL is and how it works</Link>.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Which DNS Records Do You Need?</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-2" />
                  For a Website
                </h3>
                <ul className="text-gray-700 space-y-1 ml-7 list-disc">
                  <li><strong>A record</strong> pointing your root domain to your server's IP</li>
                  <li><strong>CNAME record</strong> pointing www to your root domain</li>
                  <li><strong>AAAA record</strong> if your server supports IPv6 (recommended)</li>
                  <li><strong>CAA record</strong> to restrict SSL certificate issuance (recommended)</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  For Email (Google Workspace)
                </h3>
                <ul className="text-gray-700 space-y-1 ml-7 list-disc">
                  <li><strong>MX records</strong> pointing to Google's mail servers (5 records)</li>
                  <li><strong>TXT record</strong> with SPF: <code className="bg-gray-100 px-1 rounded text-sm">v=spf1 include:_spf.google.com ~all</code></li>
                  <li><strong>TXT record</strong> with DKIM signature (provided by Google)</li>
                  <li><strong>TXT record</strong> with DMARC policy</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-purple-600 mr-2" />
                  For Email (Microsoft 365)
                </h3>
                <ul className="text-gray-700 space-y-1 ml-7 list-disc">
                  <li><strong>MX record</strong> pointing to your-domain.mail.protection.outlook.com</li>
                  <li><strong>CNAME record</strong> for autodiscover (autodiscover.outlook.com)</li>
                  <li><strong>TXT record</strong> with SPF: <code className="bg-gray-100 px-1 rounded text-sm">v=spf1 include:spf.protection.outlook.com ~all</code></li>
                  <li><strong>SRV records</strong> for Teams/Skype for Business connectivity</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mr-2" />
                  For SSL Security
                </h3>
                <ul className="text-gray-700 space-y-1 ml-7 list-disc">
                  <li><strong>CAA record</strong> restricting certificate issuance to your chosen CA</li>
                  <li><strong>TXT record</strong> for domain validation (if required by your CA)</li>
                  <li><strong>CNAME record</strong> for ACME DNS-01 challenges (Let's Encrypt automated renewal)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">How do I check what DNS records my domain has?</h3>
                <p className="text-gray-700">Use the DNS lookup tool above—enter your domain, select the record type, and check results from 50+ global servers. You can also use command line tools: <code className="bg-gray-100 px-1 rounded">dig example.com ANY</code> on macOS/Linux or <code className="bg-gray-100 px-1 rounded">nslookup -type=ANY example.com</code> on Windows. Our <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline">propagation checker</Link> shows results from multiple locations simultaneously.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">What happens if I have conflicting DNS records?</h3>
                <p className="text-gray-700">Conflicting records cause unpredictable behavior. The most common conflict is having a CNAME and another record type (A, MX, TXT) at the same hostname—this violates DNS standards. Remove the CNAME or move the other records to a different hostname. Also check for duplicate A records pointing to different IPs, which causes round-robin behavior (may not be intended).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">How long do DNS record changes take to propagate?</h3>
                <p className="text-gray-700">Most record types (A, AAAA, CNAME, TXT) propagate within 5 minutes to 24 hours, depending on the TTL value. MX records typically take 1–24 hours. NS record changes take 24–48 hours because they must update at the registry level. Read our complete <Link href="/how-long-does-dns-propagation-take" className="text-blue-600 hover:underline">DNS propagation time guide</Link> for detailed timelines by record type and provider.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Can I use a CNAME at the root domain?</h3>
                <p className="text-gray-700">No, per DNS standards (RFC 1034), a CNAME cannot coexist with other record types, and root domains require SOA and NS records. Some providers like Cloudflare offer "CNAME flattening" which simulates a CNAME at the root by resolving it to an A record automatically. If your provider doesn't support this, use an A record at the root and a CNAME for www.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Do I need AAAA records?</h3>
                <p className="text-gray-700">While not strictly required today, AAAA records are increasingly important. Some mobile networks and ISPs are IPv6-only, and visitors on those networks may experience slower connections or failures without AAAA records. Adding IPv6 support is free and future-proofs your domain. Check with your hosting provider for their IPv6 address.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Look Up Any DNS Record Type</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Check A, AAAA, CNAME, MX, TXT, NS, and SOA records for any domain across 50+ global DNS servers—free.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/dns-propagation-checker">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Globe className="h-5 w-5 mr-2" />
                    Open DNS Checker
                  </Button>
                </Link>
                <Link href="/what-is-ttl-in-dns">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Clock className="h-5 w-5 mr-2" />
                    Learn About TTL
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