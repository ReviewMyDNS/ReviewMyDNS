import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Book, Globe, Zap, Shield, AlertCircle } from "lucide-react";
import { Link } from "wouter";

const dnsRecordTypes = [
  {
    type: "A",
    description: "Address record that maps a domain to an IPv4 address",
    example: "example.com → 93.184.216.34",
    use: "Standard web hosting, email servers"
  },
  {
    type: "AAAA",
    description: "IPv6 address record that maps a domain to an IPv6 address",
    example: "example.com → 2606:2800:220:1:248:1893:25c8:1946",
    use: "IPv6 web hosting and services"
  },
  {
    type: "CNAME",
    description: "Canonical name record that creates an alias from one domain to another",
    example: "www.example.com → example.com",
    use: "Subdomain redirects, CDN aliases"
  },
  {
    type: "MX",
    description: "Mail exchange record that specifies mail servers for a domain",
    example: "example.com → 10 mail.example.com",
    use: "Email routing and delivery"
  },
  {
    type: "NS",
    description: "Name server record that specifies authoritative DNS servers",
    example: "example.com → ns1.example.com",
    use: "DNS delegation and authority"
  },
  {
    type: "TXT",
    description: "Text record used for various verification and configuration purposes",
    example: 'v=spf1 include:_spf.google.com ~all',
    use: "SPF, DKIM, DMARC, domain verification"
  },
  {
    type: "SOA",
    description: "Start of Authority record containing administrative information",
    example: "ns1.example.com admin.example.com 2023010101",
    use: "DNS zone configuration"
  },
  {
    type: "PTR",
    description: "Pointer record used for reverse DNS lookups",
    example: "34.216.184.93.in-addr.arpa → example.com",
    use: "Reverse IP to domain mapping"
  }
];

const troubleshootingGuide = [
  {
    problem: "DNS propagation taking too long",
    solutions: [
      "Check TTL values - lower TTL means faster propagation",
      "Verify changes were made correctly at your DNS provider",
      "Use multiple DNS checkers to confirm propagation status",
      "Consider that full global propagation can take up to 48 hours"
    ]
  },
  {
    problem: "Some servers show different results",
    solutions: [
      "This is normal during propagation periods",
      "Check if you have multiple DNS records for the same domain",
      "Verify your DNS provider has updated all their servers",
      "Consider using our expected value validation feature"
    ]
  },
  {
    problem: "DNS resolution failures",
    solutions: [
      "Check if the domain exists and is properly registered",
      "Verify DNS records exist for the queried record type",
      "Check for DNSSEC validation issues",
      "Try different DNS servers to isolate the problem"
    ]
  },
  {
    problem: "Slow DNS response times",
    solutions: [
      "Consider using geographically closer DNS servers",
      "Check your DNS provider's performance metrics",
      "Implement DNS caching strategies",
      "Consider switching to a faster DNS provider"
    ]
  }
];

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to DNS Checker
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Documentation</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            DNS Guide & Documentation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn about DNS concepts, record types, troubleshooting, and best practices. 
            Everything you need to understand and optimize your DNS configuration.
          </p>
        </div>

        <Tabs defaultValue="records" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="records">DNS Records</TabsTrigger>
            <TabsTrigger value="propagation">Propagation</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">DNS Record Types</h3>
              <p className="text-gray-600 mb-8">
                Understanding different DNS record types and their purposes is essential for proper DNS configuration.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dnsRecordTypes.map((record, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono mr-3">
                          {record.type}
                        </span>
                        Record
                      </CardTitle>
                      <CardDescription>{record.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-1">Example:</h4>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded block">
                          {record.example}
                        </code>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-1">Common Use:</h4>
                        <p className="text-sm text-gray-600">{record.use}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="propagation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Understanding DNS Propagation
                </CardTitle>
                <CardDescription>
                  How DNS changes spread across the global internet infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What is DNS Propagation?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    DNS propagation refers to the time it takes for DNS changes to be updated across all DNS servers worldwide. 
                    When you update a DNS record, it doesn't instantly appear everywhere due to caching mechanisms.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Propagation Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span>Local DNS Cache</span>
                      <span className="font-mono">0-15 minutes</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span>Regional DNS Servers</span>
                      <span className="font-mono">15 minutes - 4 hours</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span>Global DNS Servers</span>
                      <span className="font-mono">4-24 hours</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span>Complete Propagation</span>
                      <span className="font-mono">24-48 hours</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Factors Affecting Propagation Speed</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>TTL (Time To Live):</strong> Lower TTL values result in faster propagation</li>
                    <li>• <strong>DNS Provider:</strong> Some providers update their servers faster than others</li>
                    <li>• <strong>Record Type:</strong> Different record types may propagate at different speeds</li>
                    <li>• <strong>Geographic Location:</strong> Changes appear in some regions before others</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Speeding Up Propagation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>Lower TTL before changes:</strong> Set TTL to 300 seconds (5 minutes) before making changes</li>
                  <li>• <strong>Plan changes during low traffic:</strong> Make changes during maintenance windows</li>
                  <li>• <strong>Use authoritative DNS:</strong> Ensure you're checking authoritative name servers</li>
                  <li>• <strong>Clear local cache:</strong> Flush DNS cache on your local machine after changes</li>
                  <li>• <strong>Monitor multiple locations:</strong> Use tools like ReviewMyDNS to check global status</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">DNS Troubleshooting Guide</h3>
              <div className="space-y-6">
                {troubleshootingGuide.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                        {item.problem}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="font-semibold mb-2">Solutions:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {item.solutions.map((solution, solutionIndex) => (
                            <li key={solutionIndex}>• {solution}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="best-practices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    Security Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>Enable DNSSEC:</strong> Protect against DNS spoofing attacks</li>
                    <li>• <strong>Use reputable DNS providers:</strong> Choose providers with strong security</li>
                    <li>• <strong>Regular monitoring:</strong> Set up alerts for DNS changes</li>
                    <li>• <strong>Access control:</strong> Limit who can modify DNS records</li>
                    <li>• <strong>Backup configurations:</strong> Keep records of your DNS setup</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    Performance Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>Optimize TTL values:</strong> Balance between performance and flexibility</li>
                    <li>• <strong>Use anycast DNS:</strong> Improve response times globally</li>
                    <li>• <strong>Minimize DNS lookups:</strong> Reduce the number of required queries</li>
                    <li>• <strong>CDN integration:</strong> Use CDN-friendly DNS configurations</li>
                    <li>• <strong>Monitor response times:</strong> Track DNS performance metrics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-purple-600" />
                    Reliability & Redundancy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>Multiple name servers:</strong> Use at least two authoritative servers</li>
                    <li>• <strong>Geographic distribution:</strong> Spread servers across different regions</li>
                    <li>• <strong>Health monitoring:</strong> Implement automated DNS health checks</li>
                    <li>• <strong>Failover mechanisms:</strong> Plan for DNS provider outages</li>
                    <li>• <strong>Regular testing:</strong> Periodically verify DNS functionality</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="h-5 w-5 mr-2 text-orange-600" />
                    Management Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>Documentation:</strong> Maintain records of all DNS configurations</li>
                    <li>• <strong>Change management:</strong> Implement approval processes for DNS changes</li>
                    <li>• <strong>Version control:</strong> Track DNS configuration changes over time</li>
                    <li>• <strong>Testing procedures:</strong> Test changes in staging environments first</li>
                    <li>• <strong>Rollback plans:</strong> Have procedures for reverting problematic changes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Check Your DNS?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our DNS propagation checker to verify your DNS configuration across global servers.
          </p>
          <Link href="/">
            <Button size="lg">Check DNS Propagation</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}