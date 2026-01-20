import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info, Lightbulb, Clock, Globe, Mail, Shield } from "lucide-react";
import type { DnsLookupWithResults } from "@shared/schema";

interface DnsInsightsProps {
  results: DnsLookupWithResults;
}

interface Insight {
  type: "success" | "warning" | "info" | "tip";
  title: string;
  description: string;
  icon: typeof CheckCircle;
}

export function DnsInsights({ results }: DnsInsightsProps) {
  const insights = generateInsights(results);
  
  if (insights.length === 0) return null;

  return (
    <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          AI-Powered DNS Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border ${getInsightStyles(insight.type)}`}
          >
            <div className="flex items-start gap-3">
              <insight.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getIconColor(insight.type)}`} />
              <div>
                <p className="font-medium text-gray-900">{insight.title}</p>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function getInsightStyles(type: Insight["type"]): string {
  switch (type) {
    case "success":
      return "bg-green-50 border-green-200";
    case "warning":
      return "bg-amber-50 border-amber-200";
    case "info":
      return "bg-blue-50 border-blue-200";
    case "tip":
      return "bg-purple-50 border-purple-200";
  }
}

function getIconColor(type: Insight["type"]): string {
  switch (type) {
    case "success":
      return "text-green-600";
    case "warning":
      return "text-amber-600";
    case "info":
      return "text-blue-600";
    case "tip":
      return "text-purple-600";
  }
}

function generateInsights(results: DnsLookupWithResults): Insight[] {
  const insights: Insight[] = [];
  const { stats, recordType, results: dnsResults, domain } = results;

  // Propagation status
  const propagationPercent = (stats.resolvedCount / stats.totalServers) * 100;
  
  if (propagationPercent === 100) {
    insights.push({
      type: "success",
      title: "Full DNS Propagation",
      description: `${domain} has fully propagated across all ${stats.totalServers} DNS servers worldwide. Your DNS changes are visible globally.`,
      icon: CheckCircle,
    });
  } else if (propagationPercent >= 80) {
    insights.push({
      type: "info",
      title: "DNS Propagation In Progress",
      description: `${stats.resolvedCount} of ${stats.totalServers} servers have the updated records. Full propagation typically completes within 24-48 hours.`,
      icon: Clock,
    });
  } else if (propagationPercent > 0) {
    insights.push({
      type: "warning",
      title: "Partial Propagation Detected",
      description: `Only ${propagationPercent.toFixed(0)}% of servers are returning results. This could indicate recent DNS changes or configuration issues.`,
      icon: AlertTriangle,
    });
  } else {
    insights.push({
      type: "warning",
      title: "DNS Resolution Issues",
      description: `No DNS servers could resolve ${domain}. This could indicate the domain doesn't exist, DNS isn't configured, or there's a temporary outage.`,
      icon: AlertTriangle,
    });
  }

  // Response time analysis
  if (stats.averageResponseTime > 200) {
    insights.push({
      type: "warning",
      title: "Slow DNS Response Times",
      description: `Average response time is ${stats.averageResponseTime}ms. Consider using a faster DNS provider like Cloudflare (1.1.1.1) or Google (8.8.8.8) for better performance.`,
      icon: Clock,
    });
  } else if (stats.averageResponseTime < 50) {
    insights.push({
      type: "success",
      title: "Excellent DNS Performance",
      description: `Average response time of ${stats.averageResponseTime}ms is very fast. Your DNS provider is performing well.`,
      icon: CheckCircle,
    });
  }

  // Record type specific insights
  if (recordType === "MX" && dnsResults.length > 0) {
    const resolvedResults = dnsResults.filter(r => r.status === "resolved" && r.response);
    if (resolvedResults.length > 0) {
      const sampleResponse = resolvedResults[0].response || "";
      
      if (sampleResponse.toLowerCase().includes("google") || sampleResponse.includes("aspmx")) {
        insights.push({
          type: "info",
          title: "Google Workspace Email Detected",
          description: "Your MX records point to Google Workspace (Gmail for business). Make sure SPF and DKIM are also configured for email deliverability.",
          icon: Mail,
        });
      } else if (sampleResponse.toLowerCase().includes("outlook") || sampleResponse.toLowerCase().includes("microsoft")) {
        insights.push({
          type: "info",
          title: "Microsoft 365 Email Detected",
          description: "Your MX records point to Microsoft 365. Ensure your SPF record includes 'include:spf.protection.outlook.com' for proper email delivery.",
          icon: Mail,
        });
      }
    }
  }

  if (recordType === "TXT" && dnsResults.length > 0) {
    const resolvedResults = dnsResults.filter(r => r.status === "resolved" && r.response);
    if (resolvedResults.length > 0) {
      const sampleResponse = resolvedResults[0].response || "";
      
      if (!sampleResponse.includes("v=spf1")) {
        insights.push({
          type: "tip",
          title: "Consider Adding SPF Record",
          description: "No SPF record detected. Adding an SPF record helps prevent email spoofing and improves email deliverability.",
          icon: Shield,
        });
      }
      
      if (sampleResponse.includes("v=spf1") && sampleResponse.includes("-all")) {
        insights.push({
          type: "success",
          title: "Strong SPF Policy",
          description: "Your SPF record uses '-all' (hard fail) which provides strong protection against email spoofing.",
          icon: Shield,
        });
      }
    }
  }

  // Geographic distribution insight
  if (dnsResults.length > 0) {
    const failedServers = dnsResults.filter(r => r.status !== "resolved");
    const failedCountries = Array.from(new Set(failedServers.map(r => r.server?.country).filter(Boolean)));
    
    if (failedCountries.length >= 2) {
      insights.push({
        type: "warning",
        title: "Regional DNS Issues",
        description: `DNS resolution is failing in ${failedCountries.length} regions: ${failedCountries.slice(0, 3).join(", ")}${failedCountries.length > 3 ? "..." : ""}. This may affect users in those areas.`,
        icon: Globe,
      });
    }
  }

  // TTL insight based on record type
  if (recordType === "A" || recordType === "AAAA") {
    insights.push({
      type: "tip",
      title: "TTL Recommendation",
      description: "For A/AAAA records, a TTL of 300-3600 seconds (5-60 minutes) balances performance and flexibility for DNS changes.",
      icon: Info,
    });
  }

  return insights.slice(0, 4); // Limit to 4 insights
}
