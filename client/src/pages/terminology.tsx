import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";

interface Term {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
  example?: string;
}

const dnsTerms: Term[] = [
  {
    term: "A Record",
    definition: "An Address record that maps a domain name to an IPv4 address. This is the most fundamental DNS record type, telling browsers which server IP to connect to when visiting a domain.",
    category: "Record Types",
    relatedTerms: ["AAAA Record", "CNAME Record"],
    example: "example.com → 93.184.216.34"
  },
  {
    term: "AAAA Record",
    definition: "Similar to an A record but maps a domain to an IPv6 address instead of IPv4. Essential for IPv6 connectivity as the internet transitions to the newer protocol.",
    category: "Record Types",
    relatedTerms: ["A Record"],
    example: "example.com → 2606:2800:220:1:248:1893:25c8:1946"
  },
  {
    term: "CNAME Record",
    definition: "Canonical Name record that creates an alias pointing one domain to another. Cannot be used on the root domain (@), only on subdomains.",
    category: "Record Types",
    relatedTerms: ["A Record", "ALIAS Record"],
    example: "www.example.com → example.com"
  },
  {
    term: "MX Record",
    definition: "Mail Exchange record that specifies the mail server responsible for receiving email for a domain. Multiple MX records with priority values enable email failover.",
    category: "Record Types",
    relatedTerms: ["SPF", "DKIM", "DMARC"],
    example: "example.com → mail.example.com (priority 10)"
  },
  {
    term: "TXT Record",
    definition: "Text record that holds arbitrary text data. Commonly used for domain verification, email authentication (SPF, DKIM, DMARC), and other validation purposes.",
    category: "Record Types",
    relatedTerms: ["SPF", "DKIM", "DMARC"]
  },
  {
    term: "NS Record",
    definition: "Nameserver record that specifies the authoritative DNS servers for a domain. These servers hold the actual DNS records for your domain.",
    category: "Record Types",
    relatedTerms: ["Authoritative DNS", "DNS Resolver"]
  },
  {
    term: "SOA Record",
    definition: "Start of Authority record containing administrative information about a DNS zone, including the primary nameserver, admin email, serial number, and refresh intervals.",
    category: "Record Types",
    relatedTerms: ["NS Record", "DNS Zone"]
  },
  {
    term: "PTR Record",
    definition: "Pointer record used for reverse DNS lookups - mapping an IP address back to a domain name. Important for email deliverability and security verification.",
    category: "Record Types",
    relatedTerms: ["Reverse DNS", "A Record"]
  },
  {
    term: "SRV Record",
    definition: "Service record that specifies the location (hostname and port) of servers for specific services like SIP, XMPP, or LDAP.",
    category: "Record Types",
    example: "_sip._tcp.example.com → sipserver.example.com:5060"
  },
  {
    term: "CAA Record",
    definition: "Certificate Authority Authorization record that specifies which certificate authorities are allowed to issue SSL/TLS certificates for a domain.",
    category: "Record Types",
    relatedTerms: ["SSL/TLS", "HTTPS"]
  },
  {
    term: "TTL",
    definition: "Time To Live - the duration (in seconds) that a DNS record is cached by resolvers. Lower TTL means faster propagation but more DNS queries; higher TTL means better performance but slower updates.",
    category: "DNS Concepts",
    example: "TTL 300 = 5 minutes, TTL 86400 = 24 hours"
  },
  {
    term: "DNS Propagation",
    definition: "The process of DNS changes spreading across all DNS servers worldwide. Typically takes 15 minutes to 48 hours depending on TTL values and server caching.",
    category: "DNS Concepts",
    relatedTerms: ["TTL", "DNS Cache"]
  },
  {
    term: "DNS Cache",
    definition: "Stored DNS query results on resolvers and local devices to speed up future lookups. Cached records are served until TTL expires, which can delay seeing DNS changes.",
    category: "DNS Concepts",
    relatedTerms: ["TTL", "DNS Propagation"]
  },
  {
    term: "DNS Zone",
    definition: "A portion of the DNS namespace managed by a specific organization or administrator. Contains all DNS records for a domain and its subdomains.",
    category: "DNS Concepts",
    relatedTerms: ["Zone File", "SOA Record"]
  },
  {
    term: "Authoritative DNS",
    definition: "DNS servers that hold the original, definitive DNS records for a domain. When you update DNS at your provider, you're updating authoritative servers.",
    category: "DNS Infrastructure",
    relatedTerms: ["DNS Resolver", "NS Record"]
  },
  {
    term: "DNS Resolver",
    definition: "A server that receives DNS queries from clients and fetches answers from authoritative servers. Examples include Google DNS (8.8.8.8) and Cloudflare DNS (1.1.1.1).",
    category: "DNS Infrastructure",
    relatedTerms: ["Authoritative DNS", "Recursive DNS"]
  },
  {
    term: "Recursive DNS",
    definition: "A DNS query type where the resolver does all the work of finding the answer by querying multiple servers on behalf of the client.",
    category: "DNS Infrastructure",
    relatedTerms: ["DNS Resolver", "Iterative DNS"]
  },
  {
    term: "SPF",
    definition: "Sender Policy Framework - an email authentication method using TXT records to specify which mail servers can send email on behalf of your domain. Helps prevent email spoofing.",
    category: "Email Authentication",
    relatedTerms: ["DKIM", "DMARC", "TXT Record"],
    example: "v=spf1 include:_spf.google.com ~all"
  },
  {
    term: "DKIM",
    definition: "DomainKeys Identified Mail - email authentication that adds a digital signature to outgoing messages. Receiving servers verify the signature using a public key in your DNS.",
    category: "Email Authentication",
    relatedTerms: ["SPF", "DMARC"]
  },
  {
    term: "DMARC",
    definition: "Domain-based Message Authentication, Reporting & Conformance - a policy that tells receiving servers what to do when SPF or DKIM checks fail, and provides reporting.",
    category: "Email Authentication",
    relatedTerms: ["SPF", "DKIM"],
    example: "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"
  },
  {
    term: "DNSSEC",
    definition: "DNS Security Extensions - a suite of specifications that add cryptographic signatures to DNS records, protecting against DNS spoofing and cache poisoning attacks.",
    category: "DNS Security",
    relatedTerms: ["DS Record", "DNSKEY Record"]
  },
  {
    term: "DNS Hijacking",
    definition: "An attack where DNS queries are redirected to malicious servers, potentially sending users to fake websites. DNSSEC helps prevent this.",
    category: "DNS Security",
    relatedTerms: ["DNSSEC", "DNS Cache Poisoning"]
  },
  {
    term: "Nameserver",
    definition: "A server that translates domain names to IP addresses. Your domain's nameservers are configured at your registrar and point to your DNS provider.",
    category: "DNS Infrastructure",
    relatedTerms: ["NS Record", "DNS Provider"]
  },
  {
    term: "Root Domain",
    definition: "The base domain without any subdomain prefix, also called the apex domain. Example: example.com (not www.example.com).",
    category: "DNS Concepts",
    relatedTerms: ["Subdomain", "CNAME Record"]
  },
  {
    term: "Subdomain",
    definition: "A domain that is part of a larger domain. Examples: www.example.com, blog.example.com, api.example.com.",
    category: "DNS Concepts",
    relatedTerms: ["Root Domain", "CNAME Record"]
  },
  {
    term: "Wildcard DNS",
    definition: "A DNS record using an asterisk (*) that matches any subdomain not explicitly defined. Useful for catching all subdomains with one record.",
    category: "DNS Concepts",
    example: "*.example.com → 93.184.216.34"
  },
  {
    term: "Reverse DNS",
    definition: "The process of resolving an IP address back to a domain name using PTR records. Important for email servers and security verification.",
    category: "DNS Concepts",
    relatedTerms: ["PTR Record", "Forward DNS"]
  },
  {
    term: "ALIAS Record",
    definition: "A proprietary record type (not standard DNS) that allows CNAME-like functionality on the root domain. Supported by some DNS providers as a workaround.",
    category: "Record Types",
    relatedTerms: ["CNAME Record", "A Record"]
  },
  {
    term: "Glue Record",
    definition: "An A record provided at the registry level that breaks circular dependencies when nameservers are hosted on the same domain they serve.",
    category: "DNS Infrastructure",
    relatedTerms: ["NS Record", "Nameserver"]
  }
];

const categories = Array.from(new Set(dnsTerms.map(t => t.category)));

export default function Terminology() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = dnsTerms.filter(term => {
    const matchesSearch = searchQuery === "" || 
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedTerms = filteredTerms.reduce((acc, term) => {
    if (!acc[term.category]) acc[term.category] = [];
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, Term[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>DNS Glossary (2026) - A Record, CNAME, MX, TTL Explained Simply | ReviewMyDNS</title>
        <meta name="description" content="Plain-English DNS glossary. Learn what A records, CNAME, MX, TXT, TTL, SPF, DKIM, and DMARC mean with real examples. Perfect for beginners and IT professionals." />
        <meta name="keywords" content="DNS terminology, what is A record, what is CNAME, what is MX record, DNS glossary, TTL meaning, SPF explained, DKIM explained" />
        <meta property="og:title" content="DNS Terminology Glossary - ReviewMyDNS" />
        <meta property="og:description" content="Complete DNS terminology glossary with clear definitions and examples." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/terminology" />
      </Helmet>

      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size="sm" className="mr-2" />
              <Link href="/">
                <span className="text-base md:text-xl font-bold text-gray-900 cursor-pointer">ReviewMyDNS</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                DNS Checker
              </Link>
              <Link href="/tools" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Tools
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Guides
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
              </div>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700">DNS Reference</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DNS Terminology Glossary</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Clear definitions for every DNS term you'll encounter. From A records to DNSSEC, understand how DNS works.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search terms (e.g., 'A record', 'TTL', 'propagation')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
              data-testid="terminology-search"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            data-testid="filter-all"
          >
            All ({dnsTerms.length})
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category} ({dnsTerms.filter(t => t.category === category).length})
            </Button>
          ))}
        </div>

        <div className="space-y-8">
          {Object.entries(groupedTerms).map(([category, terms]) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                {category}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {terms.map((term, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow" id={term.term.toLowerCase().replace(/\s+/g, '-')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-700">{term.term}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">{term.definition}</p>
                      {term.example && (
                        <div className="bg-gray-100 rounded p-2 text-sm font-mono text-gray-600 mb-3">
                          {term.example}
                        </div>
                      )}
                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-gray-500">Related:</span>
                          {term.relatedTerms.map((related, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {related}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No terms found matching "{searchQuery}"</p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          </div>
        )}

        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Check Your DNS?</h3>
            <p className="text-blue-100 mb-6">
              Now that you understand DNS terminology, verify your records are configured correctly across 50+ global servers.
            </p>
            <Link href="/">
              <Button size="lg" variant="secondary" data-testid="check-dns-cta">
                Check DNS Propagation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-300 text-sm">
          © 2025 ReviewMyDNS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
