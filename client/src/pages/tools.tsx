import { Helmet } from "react-helmet-async";
import { DnsToolsGrid } from "@/components/dns-tools-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Zap, Shield, Database, GitCompare, History, Code, List } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";

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
        path: "/bulk-lookup",
        badge: "Pro"
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
        path: "/monitor",
        badge: "Pro"
      },
      {
        name: "Historical Tracking",
        description: "Monitor DNS changes over time",
        icon: History,
        status: "Active",
        path: "/history",
        badge: "Pro"
      },
      {
        name: "Performance Analytics",
        description: "Detailed DNS performance reports",
        icon: Database,
        status: "Active",
        path: "/analytics",
        badge: "Pro"
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
        path: "/api-docs",
        badge: "Pro"
      }
    ]
  }
];

export default function Tools() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>Free DNS Tools (2026) - Propagation Checker, Security Scan & More | ReviewMyDNS</title>
        <meta name="description" content="10+ free DNS tools: propagation checker, bulk lookup, provider comparison, security scanner, DNSSEC validator, MX lookup, and developer API. No signup required." />
        <meta name="keywords" content="DNS tools, DNS propagation checker, DNSSEC validator, DNS security check, bulk DNS lookup" />
        <meta property="og:title" content="DNS Tools - ReviewMyDNS" />
        <meta property="og:description" content="Complete DNS analysis toolkit for developers and IT professionals." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/tools" />
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
                    <Card 
                      key={toolIndex} 
                      className={`group hover:shadow-lg transition-all duration-200 ${isActive ? 'hover:border-blue-200 cursor-pointer' : 'opacity-75'}`}
                      data-testid={`tool-card-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-blue-600">
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <div className="flex gap-2" data-testid={`badge-container-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            {tool.badge && (
                              <Badge 
                                variant="default" 
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                data-testid={`badge-${tool.badge.toLowerCase()}`}
                              >
                                {tool.badge}
                              </Badge>
                            )}
                          </div>
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