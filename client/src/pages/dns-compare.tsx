import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GitCompare, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { apiRequest } from "@/lib/queryClient";

interface ComparisonResult {
  domain: string;
  recordType: string;
  providers: {
    name: string;
    results: any[];
    resolvedCount: number;
    responses: string[];
  }[];
  differences: {
    type: 'missing' | 'different' | 'extra';
    provider: string;
    details: string;
  }[];
}

const dnsProviders = [
  { name: "Google DNS", servers: ["8.8.8.8", "8.8.4.4"] },
  { name: "Cloudflare", servers: ["1.1.1.1", "1.0.0.1"] },
  { name: "OpenDNS", servers: ["208.67.222.222", "208.67.220.220"] },
  { name: "Quad9", servers: ["9.9.9.9", "149.112.112.112"] }
];

export default function DnsCompare() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [selectedProviders, setSelectedProviders] = useState<string[]>(["Google DNS", "Cloudflare"]);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  const compareMutation = useMutation({
    mutationFn: async (data: { domain: string; recordType: string; providers: string[] }) => {
      const providerResults: {
        name: string;
        results: any[];
        resolvedCount: number;
        responses: string[];
      }[] = [];
      
      for (const providerName of data.providers) {
        try {
          const response = await apiRequest('POST', '/api/dns/lookup', {
            domain: data.domain,
            recordType: data.recordType
          });
          
          const responseData = await response.json();
          
          // Filter results for this provider
          const provider = dnsProviders.find(p => p.name === providerName);
          const providerServerResults = responseData.results.filter((result: any) => 
            provider?.servers.includes(result.server.ip)
          );
          
          const resolvedResults = providerServerResults.filter((r: any) => r.status === 'resolved');
          const responses = resolvedResults.map((r: any) => r.response).filter(Boolean);
          
          providerResults.push({
            name: providerName,
            results: providerServerResults,
            resolvedCount: resolvedResults.length,
            responses: Array.from(new Set(responses)) // Remove duplicates
          });
        } catch (error) {
          providerResults.push({
            name: providerName,
            results: [],
            resolvedCount: 0,
            responses: []
          });
        }
      }
      
      // Analyze differences
      const differences: {
        type: 'missing' | 'different' | 'extra';
        provider: string;
        details: string;
      }[] = [];
      const allResponses = new Set<string>();
      
      providerResults.forEach(provider => {
        provider.responses.forEach(response => allResponses.add(response));
      });
      
      // Check for missing responses
      providerResults.forEach(provider => {
        Array.from(allResponses).forEach(response => {
          if (!provider.responses.includes(response)) {
            differences.push({
              type: 'missing' as const,
              provider: provider.name,
              details: `Missing response: ${response}`
            });
          }
        });
      });
      
      // Check for provider-specific responses
      providerResults.forEach(provider => {
        provider.responses.forEach(response => {
          const otherProvidersHaveThis = providerResults
            .filter(p => p.name !== provider.name)
            .some(p => p.responses.includes(response));
          
          if (!otherProvidersHaveThis && providerResults.length > 1) {
            differences.push({
              type: 'extra' as const,
              provider: provider.name,
              details: `Unique response: ${response}`
            });
          }
        });
      });
      
      return {
        domain: data.domain,
        recordType: data.recordType,
        providers: providerResults,
        differences
      };
    },
    onSuccess: (result) => {
      setComparisonResult(result);
    }
  });

  const handleCompare = () => {
    if (!domain.trim() || selectedProviders.length < 2) return;
    compareMutation.mutate({ domain: domain.trim(), recordType, providers: selectedProviders });
  };

  const toggleProvider = (providerName: string) => {
    setSelectedProviders(prev => 
      prev.includes(providerName)
        ? prev.filter(p => p !== providerName)
        : [...prev, providerName]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Compare DNS Providers - Google vs Cloudflare vs OpenDNS | ReviewMyDNS</title>
        <meta name="description" content="Compare DNS resolution across Google DNS, Cloudflare, OpenDNS, and Quad9. Identify caching differences and propagation issues." />
        <meta name="keywords" content="compare DNS providers, DNS comparison, Google DNS vs Cloudflare, DNS resolver comparison" />
        <meta property="og:title" content="Compare DNS Providers - ReviewMyDNS" />
        <meta property="og:description" content="Test DNS resolution across major providers." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/compare" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Which DNS provider is fastest: Google, Cloudflare, OpenDNS, or Quad9?", "acceptedAnswer": { "@type": "Answer", "text": "Cloudflare DNS (1.1.1.1) consistently ranks as the fastest public DNS resolver with median response times under 12ms globally. Google DNS (8.8.8.8) typically averages 15-35ms. OpenDNS and Quad9 fall slightly behind at 20-40ms. However, actual performance depends on your geographic location and network conditions. Use our comparison tool to test which provider is fastest from your specific location." } },
            { "@type": "Question", "name": "Why do different DNS providers return different results?", "acceptedAnswer": { "@type": "Answer", "text": "DNS providers may return different results due to: different cache expiration times (each provider caches records independently based on TTL), geo-based DNS responses (CDNs return different IPs based on the resolver's location), propagation timing (providers check authoritative servers at different intervals), and EDNS Client Subnet support (some providers forward your approximate location for geo-optimized responses)." } },
            { "@type": "Question", "name": "What is the difference between Google DNS and Cloudflare DNS?", "acceptedAnswer": { "@type": "Answer", "text": "Google DNS (8.8.8.8) focuses on reliability and global reach with one of the largest resolver networks. Cloudflare DNS (1.1.1.1) prioritizes privacy (they don't sell data and purge logs within 24 hours) and speed. Both support DNSSEC validation, DNS over HTTPS, and DNS over TLS. Cloudflare is generally faster; Google has a longer track record. Both are excellent choices for most users." } },
            { "@type": "Question", "name": "When should I switch DNS providers?", "acceptedAnswer": { "@type": "Answer", "text": "Consider switching DNS providers when: you experience slow page load times (DNS is the first step in loading any website), your ISP's DNS is unreliable or censors content, you want DNSSEC validation that your current provider doesn't support, you need privacy features like DNS over HTTPS, or you notice DNS resolution failures for specific domains using your current provider." } },
            { "@type": "Question", "name": "Does Quad9 block malicious domains?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Quad9 (9.9.9.9) is unique among public DNS providers because it integrates threat intelligence from 20+ security partners to block queries to known malicious domains. When you query a phishing or malware domain, Quad9 returns an NXDOMAIN response instead of the malicious IP. This provides network-level security without installing software. If you need unfiltered DNS, Quad9 offers 9.9.9.10 as an unfiltered alternative." } },
            { "@type": "Question", "name": "How does DNS caching affect provider comparison results?", "acceptedAnswer": { "@type": "Answer", "text": "DNS caching is the primary reason providers show different results. Each provider maintains its own cache with different population patterns. If you recently changed a DNS record, providers that haven't queried your domain since the change will still show the old cached value until their cache expires (based on the record's TTL). This is normal behavior and resolves itself as caches refresh." } }
          ]
        }) }} />
      </Helmet>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Logo size="sm" className="mr-2" />
                  <h1 className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</h1>
                </div>
              </Link>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* SEO Intro Content */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compare DNS Providers - Test DNS Resolution Across Services
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            Compare how major DNS providers like Google DNS, Cloudflare, OpenDNS, and Quad9 resolve your domain. 
            Identify inconsistencies, caching differences, and propagation issues across different DNS infrastructure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Provider Testing</h3>
              <p className="text-sm text-gray-600">
                Test your domain against Google, Cloudflare, OpenDNS, and Quad9 simultaneously.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Identify Differences</h3>
              <p className="text-sm text-gray-600">
                Automatically detect when different DNS providers return different results.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Propagation Insights</h3>
              <p className="text-sm text-gray-600">
                See which providers have propagated your DNS changes and which are lagging behind.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Why Compare DNS Providers?</h2>
          <p className="text-gray-600 mb-4">
            Different DNS providers may cache your records differently, propagate changes at different speeds, 
            or even return different results due to geo-location or load balancing. Understanding these differences 
            helps you troubleshoot issues where "it works for some users but not others."
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Debug "works for me" issues where different users see different DNS results</li>
            <li>Verify DNS propagation across major public resolvers</li>
            <li>Identify caching inconsistencies between providers</li>
            <li>Test before recommending users switch DNS providers</li>
          </ul>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Compare DNS Providers</CardTitle>
            <CardDescription>
              Compare DNS responses between different providers to identify inconsistencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Input
                placeholder="Enter domain (e.g., example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              
              <Select value={recordType} onValueChange={setRecordType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A Record</SelectItem>
                  <SelectItem value="AAAA">AAAA Record</SelectItem>
                  <SelectItem value="CNAME">CNAME Record</SelectItem>
                  <SelectItem value="MX">MX Record</SelectItem>
                  <SelectItem value="NS">NS Record</SelectItem>
                  <SelectItem value="TXT">TXT Record</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Select Providers to Compare:</p>
                <div className="flex flex-wrap gap-2">
                  {dnsProviders.map(provider => (
                    <Button
                      key={provider.name}
                      variant={selectedProviders.includes(provider.name) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleProvider(provider.name)}
                    >
                      {provider.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleCompare}
              disabled={!domain.trim() || selectedProviders.length < 2 || compareMutation.isPending}
              className="w-full md:w-auto"
            >
              <GitCompare className="h-4 w-4 mr-2" />
              {compareMutation.isPending ? "Comparing..." : "Compare Providers"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {comparisonResult && (
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Comparison Summary</CardTitle>
                <CardDescription>
                  DNS comparison for {comparisonResult.domain} ({comparisonResult.recordType} record)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{comparisonResult.providers.length}</p>
                    <p className="text-sm text-gray-600">Providers Tested</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {comparisonResult.providers.filter(p => p.resolvedCount > 0).length}
                    </p>
                    <p className="text-sm text-gray-600">Responding</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{comparisonResult.differences.length}</p>
                    <p className="text-sm text-gray-600">Differences Found</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {comparisonResult.providers.map((provider, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <Badge variant={provider.resolvedCount > 0 ? "default" : "destructive"}>
                        {provider.resolvedCount > 0 ? "Responding" : "No Response"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {provider.resolvedCount > 0 ? (
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Responses:</p>
                          {provider.responses.map((response, idx) => (
                            <div key={idx} className="p-2 bg-gray-50 rounded text-sm font-mono">
                              {response}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">
                          {provider.resolvedCount} of {provider.results.length} servers responded
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <XCircle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No responses received</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Differences Analysis */}
            {comparisonResult.differences.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                    Detected Differences
                  </CardTitle>
                  <CardDescription>
                    Inconsistencies found between DNS providers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {comparisonResult.differences.map((diff, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className="flex-shrink-0 mt-0.5">
                          {diff.type === 'missing' && <XCircle className="h-4 w-4 text-red-500" />}
                          {diff.type === 'extra' && <CheckCircle className="h-4 w-4 text-blue-500" />}
                          {diff.type === 'different' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{diff.provider}</p>
                          <p className="text-sm text-gray-600">{diff.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* No Results State */}
        {!comparisonResult && !compareMutation.isPending && (
          <Card>
            <CardContent className="text-center py-12">
              <GitCompare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Enter a domain and select providers to start comparison</p>
            </CardContent>
          </Card>
        )}

        {/* SEO Educational Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding DNS Provider Differences</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                When you type a domain name into your browser, your device sends a DNS query to a recursive resolver — the DNS provider configured on your device or network. Different DNS providers operate independent infrastructure with different caching strategies, geographic coverage, security features, and privacy policies. This means the same domain can resolve differently (or at different speeds) depending on which DNS provider you use.
              </p>
              <p>
                Public DNS resolvers like Google DNS, Cloudflare, OpenDNS, and Quad9 each query authoritative nameservers independently and maintain their own caches. When you change a DNS record, each provider's cache expires at a different time based on when they last queried your domain and the record's TTL (Time to Live) value. This is why a DNS change might appear instantly on Cloudflare but take hours to show up on Google DNS — it depends on when each resolver's cache was last populated.
              </p>
              <p>
                Beyond caching differences, providers also differ in how they handle edge cases. CDNs and load balancers often return different IP addresses based on the resolver's geographic location (using EDNS Client Subnet). This means Google DNS users in Tokyo might get a different A record than Cloudflare users in London for the same domain — and both responses are correct. Our comparison tool helps you understand these legitimate differences versus actual DNS misconfigurations.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Google DNS vs Cloudflare vs OpenDNS vs Quad9</h2>
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-700">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Feature</th>
                        <th className="text-left py-3 px-4 font-semibold">Google DNS</th>
                        <th className="text-left py-3 px-4 font-semibold">Cloudflare</th>
                        <th className="text-left py-3 px-4 font-semibold">OpenDNS</th>
                        <th className="text-left py-3 px-4 font-semibold">Quad9</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Primary IP</td>
                        <td className="py-3 px-4 font-mono text-xs">8.8.8.8</td>
                        <td className="py-3 px-4 font-mono text-xs">1.1.1.1</td>
                        <td className="py-3 px-4 font-mono text-xs">208.67.222.222</td>
                        <td className="py-3 px-4 font-mono text-xs">9.9.9.9</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Speed</td>
                        <td className="py-3 px-4">Fast (15-35ms)</td>
                        <td className="py-3 px-4">Fastest (&lt;12ms)</td>
                        <td className="py-3 px-4">Good (20-40ms)</td>
                        <td className="py-3 px-4">Good (20-40ms)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Privacy</td>
                        <td className="py-3 px-4">Logs queries 24-48h</td>
                        <td className="py-3 px-4">No logging, audited</td>
                        <td className="py-3 px-4">Logs queries (Cisco)</td>
                        <td className="py-3 px-4">No personal data logged</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">DNSSEC</td>
                        <td className="py-3 px-4">Yes</td>
                        <td className="py-3 px-4">Yes</td>
                        <td className="py-3 px-4">Yes</td>
                        <td className="py-3 px-4">Yes</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">DoH / DoT</td>
                        <td className="py-3 px-4">Both</td>
                        <td className="py-3 px-4">Both</td>
                        <td className="py-3 px-4">Both</td>
                        <td className="py-3 px-4">Both</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Malware Blocking</td>
                        <td className="py-3 px-4">No</td>
                        <td className="py-3 px-4">Optional (1.1.1.2)</td>
                        <td className="py-3 px-4">Yes (built-in)</td>
                        <td className="py-3 px-4">Yes (built-in)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">Best For</td>
                        <td className="py-3 px-4">General use, reliability</td>
                        <td className="py-3 px-4">Speed, privacy</td>
                        <td className="py-3 px-4">Content filtering</td>
                        <td className="py-3 px-4">Security-focused</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Google DNS (8.8.8.8)</h3>
                  <p className="text-gray-700 text-sm">Google Public DNS is the world's largest public DNS service, handling over 1 trillion queries per day. It offers excellent reliability with a massive global anycast network. Google DNS supports EDNS Client Subnet for geo-optimized CDN responses. While Google logs queries temporarily for debugging, they do not correlate DNS data with user accounts.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Cloudflare DNS (1.1.1.1)</h3>
                  <p className="text-gray-700 text-sm">Cloudflare's DNS resolver is consistently the fastest public DNS service, leveraging their 300+ data center anycast network. Privacy is a core principle — Cloudflare commits to never selling user data, never logging the requesting IP, and wiping all logs within 24 hours. They publish annual audits by KPMG to verify these claims.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">OpenDNS (208.67.222.222)</h3>
                  <p className="text-gray-700 text-sm">Now owned by Cisco, OpenDNS provides both standard and family-safe DNS resolvers. Its content filtering capabilities make it popular with businesses and parents. OpenDNS FamilyShield (208.67.222.123) automatically blocks adult content. The enterprise version, Cisco Umbrella, adds advanced threat intelligence and logging.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Quad9 (9.9.9.9)</h3>
                  <p className="text-gray-700 text-sm">Quad9 is a nonprofit DNS service that blocks known malicious domains using threat intelligence from 20+ cybersecurity partners including IBM X-Force. It is operated by the Quad9 Foundation based in Switzerland, subject to Swiss privacy laws. For unfiltered DNS, use 9.9.9.10 instead.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">When to Switch DNS Providers</h2>
            <div className="text-gray-700 space-y-4 mb-6">
              <p>
                Your default DNS provider is typically set by your ISP, and most users never change it. However, switching to a public DNS provider can significantly improve your internet experience. Here are scenarios where switching makes sense:
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Slow Page Load Times</h3>
                <p className="text-gray-700">DNS resolution is the first step in loading any webpage. If your ISP's DNS is slow, every website feels slower. Switching to Cloudflare (1.1.1.1) or Google DNS (8.8.8.8) can shave 50-200ms off each page load.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">DNS Outages or Reliability Issues</h3>
                <p className="text-gray-700">ISP DNS servers occasionally go down or become overloaded. Public DNS providers like Google and Cloudflare have 99.99%+ uptime guarantees with redundant infrastructure worldwide.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Concerns</h3>
                <p className="text-gray-700">Many ISPs log and sell DNS query data. If privacy matters, switch to Cloudflare (no logging, audited), Quad9 (Swiss privacy laws), or use DNS over HTTPS to encrypt your queries entirely.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Security Threats</h3>
                <p className="text-gray-700">If you want automatic protection against phishing and malware domains, switch to Quad9 (9.9.9.9) or Cloudflare for Families (1.1.1.2). These block known malicious domains at the DNS level before your browser even connects.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How DNS Caching Affects Provider Comparison</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                DNS caching is a fundamental optimization that reduces query load on authoritative nameservers and speeds up resolution for end users. When a recursive resolver (like Google DNS or Cloudflare) queries an authoritative server for a record, it stores the response in its cache for the duration specified by the TTL (Time to Live) value. Subsequent queries for the same record are answered from cache without contacting the authoritative server again.
              </p>
              <p>
                This means that if you change a DNS record, different providers will show the old value until their individual cache entries expire. A provider that cached your record 5 minutes ago will show the old value for nearly the full TTL period, while a provider whose cache just expired will show the new value immediately. This is the most common reason for "it works on Cloudflare but not on Google DNS" discrepancies.
              </p>
              <p>
                Some providers implement "serve stale" behavior, where they continue serving expired cache entries while refreshing in the background. This improves availability but can make DNS changes appear to propagate even more slowly. Understanding these caching behaviors is essential for troubleshooting DNS propagation issues.
              </p>
              <p>
                To minimize caching-related discrepancies during DNS changes, lower your TTL to 300 seconds (5 minutes) at least 24-48 hours before making the change. After the change, you can raise the TTL back to a higher value (3600-86400 seconds) once propagation is confirmed.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Which DNS provider is fastest?</h3>
                  <p className="text-gray-700">Cloudflare DNS (1.1.1.1) is consistently the fastest with median response times under 12ms globally. Google DNS averages 15-35ms. Performance varies by location — use our tool to test from your area.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Why do providers return different results for the same domain?</h3>
                  <p className="text-gray-700">Cache timing differences, geo-based CDN responses, EDNS Client Subnet support, and propagation timing all contribute. These differences are usually temporary and legitimate, not errors.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Does Quad9 block malicious domains?</h3>
                  <p className="text-gray-700">Yes, Quad9 integrates threat intelligence from 20+ security partners to block queries to known malicious domains. For unfiltered DNS, use 9.9.9.10 instead of 9.9.9.9.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Should I use the same DNS provider for all my devices?</h3>
                  <p className="text-gray-700">It's recommended to use the same provider across devices for consistency. Configure it at the router level to apply to all devices on your network. Mobile devices may need separate configuration since they bypass home router DNS when on cellular.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">How do I change my DNS provider?</h3>
                  <p className="text-gray-700">On your router: access the admin panel and update the DNS server settings. On Windows: go to Network Settings → Change adapter options → IPv4 → DNS. On macOS: System Preferences → Network → DNS. On mobile: search your device settings for "Private DNS" or "DNS."</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What is DNS over HTTPS and do these providers support it?</h3>
                  <p className="text-gray-700">DNS over HTTPS (DoH) encrypts DNS queries to prevent eavesdropping. All four providers — Google, Cloudflare, OpenDNS, and Quad9 — support both DoH and DNS over TLS (DoT). Modern browsers like Firefox and Chrome have built-in DoH support.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related DNS Tools and Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">DNS Propagation Checker</h3>
                  <p className="text-gray-600 text-sm mb-3">Check DNS propagation across 50+ servers worldwide after making DNS changes.</p>
                  <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline text-sm font-medium">Check Propagation →</Link>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">DNSSEC Validator</h3>
                  <p className="text-gray-600 text-sm mb-3">Verify DNSSEC is properly configured and the chain of trust is valid for your domain.</p>
                  <Link href="/dnssec" className="text-blue-600 hover:underline text-sm font-medium">Validate DNSSEC →</Link>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">DNS Setup Guides</h3>
                  <p className="text-gray-600 text-sm mb-3">Step-by-step guides for GoDaddy, Cloudflare, Namecheap, and other providers.</p>
                  <Link href="/guides" className="text-blue-600 hover:underline text-sm font-medium">Browse Guides →</Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}