import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Key, Zap, Globe } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";

const endpoints = [
  {
    method: "POST",
    endpoint: "/api/dns/lookup",
    description: "Perform DNS lookup across global servers",
    parameters: [
      { name: "domain", type: "string", required: true, description: "Domain to lookup (e.g., example.com)" },
      { name: "recordType", type: "string", required: true, description: "DNS record type (A, AAAA, CNAME, MX, NS, TXT, SOA, PTR, SRV, CAA, DS, DNSKEY)" },
      { name: "expectedValue", type: "string", required: false, description: "Expected DNS value for validation" },
      { name: "matchType", type: "string", required: false, description: "Match type: exact, contains, regex" }
    ],
    response: `{
  "id": 1,
  "domain": "example.com",
  "recordType": "A",
  "expectedValue": null,
  "matchType": "exact",
  "createdAt": "2025-01-24T20:54:54.000Z",
  "results": [
    {
      "id": 1,
      "status": "resolved",
      "response": "93.184.216.34",
      "responseTime": 45,
      "server": {
        "name": "Google DNS",
        "ip": "8.8.8.8",
        "location": "Mountain View, CA",
        "country": "US"
      }
    }
  ],
  "stats": {
    "totalServers": 20,
    "resolvedCount": 18,
    "unresolvedCount": 2,
    "averageResponseTime": 67,
    "globalCoverage": 90
  }
}`
  },
  {
    method: "GET",
    endpoint: "/api/dns/lookup/{id}",
    description: "Get DNS lookup results by ID",
    parameters: [
      { name: "id", type: "number", required: true, description: "Lookup ID from POST response" }
    ],
    response: "Same as POST /api/dns/lookup response"
  },
  {
    method: "GET",
    endpoint: "/api/dns/servers",
    description: "Get all DNS servers",
    parameters: [],
    response: `[
  {
    "id": 1,
    "name": "Google DNS",
    "ip": "8.8.8.8",
    "location": "Mountain View, CA",
    "country": "US",
    "provider": "Google",
    "latitude": "37.4056",
    "longitude": "-122.0775",
    "active": true
  }
]`
  }
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    requests: "1,000/month",
    rateLimit: "1 req/sec",
    features: ["Basic DNS records", "20+ global servers", "Standard support"]
  },
  {
    name: "Starter",
    price: "$9.99",
    requests: "10,000/month",
    rateLimit: "10 req/sec",
    features: ["All DNS record types", "Priority support", "Historical data", "Expected value validation"]
  },
  {
    name: "Professional",
    price: "$29.99",
    requests: "100,000/month",
    rateLimit: "100 req/sec",
    features: ["Bulk lookups", "Webhooks", "Advanced analytics", "White-label options"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    requests: "Unlimited",
    rateLimit: "Custom",
    features: ["SLA guarantee", "Dedicated support", "Custom integrations", "On-premise options"]
  }
];

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50">
      <Helmet>
        <title>DNS API Documentation - REST API Reference | ReviewMyDNS</title>
        <meta name="description" content="Complete DNS API documentation. RESTful endpoints for DNS lookups, propagation checking, and global server queries. Includes code examples and pricing." />
        <meta name="keywords" content="DNS API, DNS lookup API, REST API DNS, DNS developer API" />
        <meta property="og:title" content="DNS API Documentation - ReviewMyDNS" />
        <meta property="og:description" content="RESTful DNS API with global coverage. Full documentation and examples." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/api-docs" />
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
            <div className="flex items-center space-x-2">
              <Button className="hidden md:block">Get API Key</Button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            DNS Lookup API
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Integrate DNS propagation checking into your applications with our RESTful API. 
            Get real-time DNS data from 20+ global servers with comprehensive analytics.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-green-100 text-green-800">
              <Zap className="h-3 w-3 mr-1" />
              99.9% Uptime
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Globe className="h-3 w-3 mr-1" />
              Global Coverage
            </Badge>
            <Badge className="bg-purple-100 text-purple-800">
              <Key className="h-3 w-3 mr-1" />
              API Keys
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="endpoints" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h3>
              <div className="space-y-6">
                {endpoints.map((endpoint, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Badge variant={endpoint.method === "POST" ? "default" : "secondary"}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <CardDescription>{endpoint.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {endpoint.parameters.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="space-y-2">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <div key={paramIndex} className="flex items-center space-x-4 text-sm">
                                <code className="bg-gray-100 px-2 py-1 rounded min-w-0">
                                  {param.name}
                                </code>
                                <Badge variant="outline" className="text-xs">
                                  {param.type}
                                </Badge>
                                <Badge variant={param.required ? "destructive" : "secondary"} className="text-xs">
                                  {param.required ? "Required" : "Optional"}
                                </Badge>
                                <span className="text-gray-600">{param.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold mb-2">Response</h4>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-x-auto">
                          {endpoint.response}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quickstart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Quick Start Guide
                </CardTitle>
                <CardDescription>
                  Get started with the DNS Lookup API in minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Get Your API Key</h4>
                  <p className="text-sm text-gray-600 mb-2">Sign up and get your free API key to start making requests.</p>
                  <Button>Get API Key</Button>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">2. Make Your First Request</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-x-auto">
{`curl -X POST "https://reviewmydns.com/api/dns/lookup" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "domain": "example.com",
    "recordType": "A"
  }'`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. Handle the Response</h4>
                  <p className="text-sm text-gray-600 mb-2">Process the JSON response with DNS results from global servers.</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-x-auto">
{`// JavaScript Example
const response = await fetch('/api/dns/lookup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    domain: 'example.com',
    recordType: 'A'
  })
});

const data = await response.json();
console.log(\`Global coverage: \${data.stats.globalCoverage}%\`);`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">API Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pricingTiers.map((tier, index) => (
                  <Card key={index} className={index === 1 ? 'border-blue-500 relative' : ''}>
                    {index === 1 && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge>Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{tier.name}</CardTitle>
                      <div className="text-3xl font-bold">{tier.price}</div>
                      <CardDescription>
                        {tier.requests} • {tier.rateLimit}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" variant={index === 1 ? "default" : "outline"}>
                        {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Code Examples</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Python</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-x-auto">
{`import requests

def check_dns(domain, record_type="A"):
    response = requests.post(
        "https://reviewmydns.com/api/dns/lookup",
        headers={
            "Authorization": "Bearer YOUR_API_KEY",
            "Content-Type": "application/json"
        },
        json={
            "domain": domain,
            "recordType": record_type
        }
    )
    return response.json()

result = check_dns("example.com")
print(f"Coverage: {result['stats']['globalCoverage']}%")`}
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Node.js</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-x-auto">
{`const axios = require('axios');

async function checkDNS(domain, recordType = 'A') {
  try {
    const response = await axios.post(
      'https://reviewmydns.com/api/dns/lookup',
      {
        domain: domain,
        recordType: recordType
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('DNS lookup failed:', error);
  }
}

checkDNS('example.com').then(result => {
  console.log(\`Coverage: \${result.stats.globalCoverage}%\`);
});`}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}