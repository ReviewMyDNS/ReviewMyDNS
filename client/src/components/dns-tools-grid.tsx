import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, GitCompare, History, Code, Zap, Globe, Shield, Database } from "lucide-react";
import { Link } from "wouter";
import { trackToolClick } from "@/lib/analytics";

const tools = [
  {
    title: "Bulk DNS Lookup",
    description: "Check 100+ domains in one batch with exportable results",
    benefit: "Save hours during migrations and monthly audits",
    icon: List,
    color: "text-blue-600",
    path: "/bulk-lookup",
    active: true
  },
  {
    title: "DNS Comparison",
    description: "Side-by-side diff between two nameservers or providers",
    benefit: "Catch missing records before you switch",
    icon: GitCompare,
    color: "text-green-600",
    path: "/compare",
    active: true
  },
  {
    title: "Historical Tracking",
    description: "See exactly when each record changed—and what it was before",
    benefit: "Debug outages fast with a clear audit trail",
    icon: History,
    color: "text-purple-600",
    path: "/history",
    active: true
  },
  {
    title: "Developer API",
    description: "REST API to integrate DNS checks into CI/CD pipelines",
    benefit: "Block deploys if DNS isn't healthy",
    icon: Code,
    color: "text-orange-600",
    path: "/api-docs",
    active: true
  },
  {
    title: "Performance Monitor",
    description: "Track DNS response times across all 50+ global servers",
    benefit: "Find slow resolvers before users complain",
    icon: Zap,
    color: "text-yellow-600",
    path: "/monitor",
    active: true
  },
  {
    title: "Global Propagation",
    description: "Query 50+ servers in one click to see global state",
    benefit: "Stop wondering 'is it just me?'",
    icon: Globe,
    color: "text-indigo-600",
    path: "/",
    active: true
  },
  {
    title: "Security Check",
    description: "Validate SPF, DKIM, DMARC, DNSSEC, and CAA in one scan",
    benefit: "Fix email deliverability and SSL issues",
    icon: Shield,
    color: "text-red-600",
    path: "/security",
    active: true
  },
  {
    title: "DNS Analytics",
    description: "Trends, performance graphs, and health scores over time",
    benefit: "Turn DNS data into actionable insights",
    icon: Database,
    color: "text-teal-600",
    path: "/analytics",
    active: true
  }
];

export function DnsToolsGrid() {
  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Complete DNS Toolkit for Professionals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage, monitor, and troubleshoot DNS
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card key={index} className={`group hover:shadow-lg hover:border-blue-200 transition-all duration-200 ${tool.active ? 'cursor-pointer' : 'opacity-75'}`}>
                <CardHeader>
                  <div className={`${tool.color} mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className={`text-lg font-semibold text-gray-900 ${tool.active ? 'group-hover:text-blue-600' : ''} transition-colors`}>
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                  <p className="text-xs text-gray-500 italic mb-4">{tool.benefit}</p>
                  {tool.active ? (
                    <Link href={tool.path} onClick={() => trackToolClick(tool.title.toLowerCase().replace(/\s+/g, '_'))}>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium w-full text-left">
                        {tool.title.includes('API') ? 'View Docs' : 'Try Tool'} →
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="ghost" size="sm" disabled className="text-gray-400 p-0 h-auto font-medium w-full text-left">
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
