import { DnsToolsGrid } from "@/components/dns-tools-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Zap, Shield, Database, GitCompare, History, Code, List } from "lucide-react";
import { Link } from "wouter";

const toolCategories = [
  {
    title: "DNS Analysis Tools",
    description: "Comprehensive DNS record analysis and troubleshooting",
    tools: [
      {
        name: "DNS Propagation Checker",
        description: "Check DNS propagation across 50+ global servers",
        icon: Globe,
        status: "Active",
        path: "/"
      },
      {
        name: "Bulk DNS Lookup",
        description: "Check multiple domains simultaneously",
        icon: List,
        status: "Active",
        path: "/bulk-lookup"
      },
      {
        name: "DNS Comparison Tool",
        description: "Compare DNS records between providers",
        icon: GitCompare,
        status: "Active",
        path: "/compare"
      }
    ]
  },
  {
    title: "Performance & Monitoring",
    description: "Real-time DNS performance analysis and monitoring",
    tools: [
      {
        name: "Response Time Monitor",
        description: "Track DNS response times globally",
        icon: Zap,
        status: "Active",
        path: "/monitor"
      },
      {
        name: "Historical Tracking",
        description: "Monitor DNS changes over time",
        icon: History,
        status: "Active",
        path: "/history"
      },
      {
        name: "Performance Analytics",
        description: "Detailed DNS performance reports",
        icon: Database,
        status: "Active",
        path: "/analytics"
      }
    ]
  },
  {
    title: "Security & Validation",
    description: "DNS security assessment and validation tools",
    tools: [
      {
        name: "DNS Security Check",
        description: "Validate DNS security configurations",
        icon: Shield,
        status: "Active",
        path: "/security"
      },
      {
        name: "DNSSEC Validator",
        description: "Check DNSSEC implementation",
        icon: Shield,
        status: "Active",
        path: "/dnssec"
      }
    ]
  },
  {
    title: "Developer Tools",
    description: "APIs and integration tools for developers",
    tools: [
      {
        name: "DNS API",
        description: "RESTful API for DNS lookups",
        icon: Code,
        status: "Active",
        path: "/api-docs"
      }
    ]
  }
];

export default function Tools() {
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
              <h1 className="text-xl font-bold text-gray-900">DNS Tools Suite</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Complete DNS Analysis Toolkit
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
            Professional-grade DNS tools for developers, system administrators, and IT professionals. 
            Analyze, monitor, and troubleshoot DNS configurations with our comprehensive suite.
          </p>
        </div>

        {/* Tool Categories */}
        <div className="space-y-12">
          {toolCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {category.tools.map((tool, toolIndex) => {
                  const IconComponent = tool.icon;
                  const isActive = tool.status === "Active";
                  
                  return (
                    <Card key={toolIndex} className={`group hover:shadow-lg transition-all duration-200 ${isActive ? 'hover:border-blue-200 cursor-pointer' : 'opacity-75'}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-blue-600">
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <Badge variant={isActive ? "default" : "secondary"}>
                            {tool.status}
                          </Badge>
                        </div>
                        <CardTitle className={`text-lg font-semibold ${isActive ? 'group-hover:text-blue-600' : ''} transition-colors`}>
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          {tool.description}
                        </CardDescription>
                        {isActive ? (
                          <Link href={tool.path}>
                            <Button variant="outline" size="sm" className="w-full">
                              Open Tool
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="outline" size="sm" disabled className="w-full">
                            Coming Soon
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sponsored Tools Section */}
        <div className="mt-12 mb-8">
          <div className="text-center mb-6">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Partner Tools</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">CF</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cloudflare DNS</h4>
                    <span className="text-xs text-gray-500">Sponsored</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Fast, secure, and reliable DNS with global anycast network. Free tier available.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">R53</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Route 53</h4>
                    <span className="text-xs text-gray-500">Sponsored</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  AWS managed DNS service with health checks and traffic routing.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need More Tools?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're constantly adding new DNS analysis and monitoring tools. 
            Request specific functionality or suggest improvements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button onClick={() => window.open('mailto:info@reviewmydns.com?subject=Tool Request', '_blank')}>
              Request a Tool
            </Button>
            <Link href="/api-docs">
              <Button variant="outline">View API Documentation</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}