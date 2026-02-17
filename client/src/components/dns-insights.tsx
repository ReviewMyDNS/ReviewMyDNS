import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, Lightbulb, Clock, Globe, Mail, Shield, Server, ExternalLink, ChevronDown, ChevronUp, AlertCircle, Zap } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { useState } from "react";

interface DnsInsightsProps {
  results: DnsLookupWithResults;
}

type InsightSeverity = "critical" | "warning" | "info" | "success" | "tip";

interface Insight {
  severity: InsightSeverity;
  title: string;
  description: string;
  fix?: string;
  icon: typeof CheckCircle;
  learnMoreUrl?: string;
}

const INITIAL_DISPLAY_COUNT = 6;

export function DnsInsights({ results }: DnsInsightsProps) {
  const [showAll, setShowAll] = useState(false);
  const insights = generateInsights(results);

  if (insights.length === 0) return null;

  const issues = insights.filter(i => i.severity === "critical" || i.severity === "warning");
  const displayed = showAll ? insights : insights.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            DNS Diagnostic Report
          </CardTitle>
          {issues.length > 0 ? (
            <Badge variant="destructive" className="text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              {issues.length} issue{issues.length !== 1 ? "s" : ""} found
            </Badge>
          ) : (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              All checks passed
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayed.map((insight, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${getSeverityStyles(insight.severity)}`}
          >
            <div className="flex items-start gap-3">
              <insight.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getSeverityIconColor(insight.severity)}`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{insight.title}</p>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                {insight.fix && (
                  <p className="text-sm mt-2 font-medium text-gray-800">
                    <Zap className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                    Fix: {insight.fix}
                  </p>
                )}
                {insight.learnMoreUrl && (
                  <Link href={insight.learnMoreUrl} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2">
                    <ExternalLink className="w-3 h-3" />
                    Learn More
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
        {insights.length > INITIAL_DISPLAY_COUNT && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-blue-600 hover:text-blue-800"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show fewer insights
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show all {insights.length} insights
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function getSeverityStyles(severity: InsightSeverity): string {
  switch (severity) {
    case "critical":
      return "bg-red-50 border-red-200";
    case "warning":
      return "bg-amber-50 border-amber-200";
    case "info":
      return "bg-blue-50 border-blue-200";
    case "success":
      return "bg-green-50 border-green-200";
    case "tip":
      return "bg-purple-50 border-purple-200";
  }
}

function getSeverityIconColor(severity: InsightSeverity): string {
  switch (severity) {
    case "critical":
      return "text-red-600";
    case "warning":
      return "text-amber-600";
    case "info":
      return "text-blue-600";
    case "success":
      return "text-green-600";
    case "tip":
      return "text-purple-600";
  }
}

function getAllResponses(results: DnsLookupWithResults): string[] {
  return results.results
    .filter(r => r.status === "resolved" && r.response)
    .map(r => r.response!);
}

function getUniqueValues(responses: string[]): string[] {
  return Array.from(new Set(responses.map(r => r.trim().toLowerCase())));
}

function generateInsights(results: DnsLookupWithResults): Insight[] {
  const insights: Insight[] = [];
  const { stats, recordType, results: dnsResults, domain } = results;
  const responses = getAllResponses(results);
  const resolvedResults = dnsResults.filter(r => r.status === "resolved" && r.response);
  const failedResults = dnsResults.filter(r => r.status !== "resolved");

  analyzePropagation(insights, stats, dnsResults, domain, responses);
  analyzePerformance(insights, stats, dnsResults);

  switch (recordType) {
    case "MX":
      analyzeMxRecords(insights, responses, domain);
      break;
    case "A":
    case "AAAA":
      analyzeARecords(insights, responses, recordType, domain);
      break;
    case "NS":
      analyzeNsRecords(insights, responses, domain, dnsResults);
      break;
    case "TXT":
      analyzeTxtRecords(insights, responses, domain);
      break;
    case "CNAME":
      analyzeCnameRecords(insights, responses, domain);
      break;
  }

  analyzeRegionalIssues(insights, dnsResults);

  insights.sort((a, b) => {
    const order: Record<InsightSeverity, number> = { critical: 0, warning: 1, info: 2, tip: 3, success: 4 };
    return order[a.severity] - order[b.severity];
  });

  return insights;
}

function analyzePropagation(
  insights: Insight[],
  stats: DnsLookupWithResults["stats"],
  dnsResults: DnsLookupWithResults["results"],
  domain: string,
  responses: string[]
) {
  const propagationPercent = stats.totalServers > 0
    ? (stats.resolvedCount / stats.totalServers) * 100
    : 0;

  if (propagationPercent === 100) {
    insights.push({
      severity: "success",
      title: "Full DNS Propagation",
      description: `${domain} has fully propagated across all ${stats.totalServers} DNS servers worldwide.`,
      icon: CheckCircle,
    });
  } else if (propagationPercent >= 80) {
    insights.push({
      severity: "info",
      title: "DNS Propagation In Progress",
      description: `${stats.resolvedCount} of ${stats.totalServers} servers (${propagationPercent.toFixed(0)}%) have updated records. Full propagation typically completes within 24-48 hours.`,
      fix: "Wait for TTL expiry on remaining servers. Lower your TTL to 300 seconds before making future changes for faster propagation.",
      icon: Clock,
      learnMoreUrl: "/dns-propagation-time",
    });
  } else if (propagationPercent > 0) {
    insights.push({
      severity: "warning",
      title: "Partial Propagation Detected",
      description: `Only ${propagationPercent.toFixed(0)}% of servers are returning results. This may indicate recent DNS changes or a configuration issue.`,
      fix: "Check that your DNS records are correctly configured at your registrar or DNS provider. If you recently made changes, wait 24-48 hours for full propagation.",
      icon: AlertTriangle,
      learnMoreUrl: "/dns-not-propagating",
    });
  } else {
    insights.push({
      severity: "critical",
      title: "DNS Resolution Failure",
      description: `No DNS servers could resolve ${domain}. The domain may not exist, DNS may not be configured, or nameservers may be down.`,
      fix: "Verify the domain is registered and that nameservers are correctly set at your registrar. Check for typos in the domain name.",
      icon: AlertCircle,
    });
  }

  if (responses.length >= 2) {
    const uniqueValues = getUniqueValues(responses);
    if (uniqueValues.length > 1) {
      const valueGroups = new Map<string, number>();
      responses.forEach(r => {
        const key = r.trim().toLowerCase();
        valueGroups.set(key, (valueGroups.get(key) || 0) + 1);
      });
      const sorted = Array.from(valueGroups.entries()).sort((a, b) => b[1] - a[1]);
      const oldValue = sorted.length > 1 ? sorted[1][0] : "";
      const newValue = sorted[0][0];

      insights.push({
        severity: "warning",
        title: "Inconsistent DNS Responses (TTL Transition)",
        description: `Servers are returning ${uniqueValues.length} different values. Some still return "${oldValue.substring(0, 60)}${oldValue.length > 60 ? "..." : ""}" while others return "${newValue.substring(0, 60)}${newValue.length > 60 ? "..." : ""}".`,
        fix: "This is normal during DNS propagation. Wait for TTL to expire on all caching resolvers. The new value will eventually replace the old one globally.",
        icon: AlertTriangle,
        learnMoreUrl: "/what-is-ttl-in-dns",
      });
    }
  }
}

function analyzePerformance(
  insights: Insight[],
  stats: DnsLookupWithResults["stats"],
  dnsResults: DnsLookupWithResults["results"]
) {
  if (stats.averageResponseTime > 200) {
    insights.push({
      severity: "warning",
      title: "Slow DNS Response Times",
      description: `Average response time is ${stats.averageResponseTime}ms, which is above the recommended 200ms threshold.`,
      fix: "Consider switching to a faster DNS provider like Cloudflare (1.1.1.1), Google (8.8.8.8), or a premium DNS service like AWS Route 53 or NS1.",
      icon: Clock,
    });
  } else if (stats.averageResponseTime > 0 && stats.averageResponseTime < 50) {
    insights.push({
      severity: "success",
      title: "Excellent DNS Performance",
      description: `Average response time of ${stats.averageResponseTime}ms is very fast. Your DNS infrastructure is well-optimized.`,
      icon: Zap,
    });
  }

  const responseTimes = dnsResults
    .filter(r => r.responseTime && r.responseTime > 0)
    .map(r => ({ time: r.responseTime!, server: r.server }));

  if (responseTimes.length >= 3 && stats.averageResponseTime > 0) {
    const outliers = responseTimes.filter(r => r.time > stats.averageResponseTime * 3);
    if (outliers.length > 0 && outliers.length <= 3) {
      const serverNames = outliers.map(o => o.server?.name || o.server?.location || "Unknown").join(", ");
      insights.push({
        severity: "info",
        title: "Slow Outlier Servers Detected",
        description: `${outliers.length} server${outliers.length > 1 ? "s" : ""} responded significantly slower than average: ${serverNames}. This may indicate regional network latency.`,
        icon: Clock,
      });
    }
  }
}

function analyzeMxRecords(insights: Insight[], responses: string[], domain: string) {
  if (responses.length === 0) {
    insights.push({
      severity: "critical",
      title: "No MX Records Found",
      description: `${domain} has no MX records. Email sent to this domain will not be delivered.`,
      fix: "Add MX records at your DNS provider pointing to your email service (Google Workspace, Microsoft 365, Zoho, etc.).",
      icon: Mail,
      learnMoreUrl: "/why-mx-not-working",
    });
    return;
  }

  const allMxData = responses.join(" ").toLowerCase();

  const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  if (ipPattern.test(allMxData)) {
    insights.push({
      severity: "critical",
      title: "MX Record Points to IP Address",
      description: "One or more MX records point to an IP address instead of a hostname. This violates RFC 5321 and will cause email delivery failures with many mail servers.",
      fix: "Change your MX records to use hostnames (e.g., mail.example.com) instead of IP addresses. Create an A record for the hostname pointing to the IP.",
      icon: AlertCircle,
    });
  }

  const providers: string[] = [];
  const isGoogle = allMxData.includes("aspmx") || allMxData.includes("google") || allMxData.includes("googlemail");
  const isMicrosoft = allMxData.includes("outlook") || allMxData.includes("microsoft") || allMxData.includes("protection.outlook");
  const isZoho = allMxData.includes("zoho");

  if (isGoogle) providers.push("Google Workspace");
  if (isMicrosoft) providers.push("Microsoft 365");
  if (isZoho) providers.push("Zoho Mail");

  if (providers.length > 1) {
    insights.push({
      severity: "critical",
      title: "Conflicting Email Provider MX Records",
      description: `MX records point to multiple email providers: ${providers.join(", ")}. This will cause unpredictable email routing and potential message loss.`,
      fix: "Remove MX records for providers you are not using. Keep only the records for your active email service.",
      icon: AlertCircle,
    });
  }

  if (isGoogle) {
    const googleMxHosts = [
      "aspmx.l.google.com",
      "alt1.aspmx.l.google.com",
      "alt2.aspmx.l.google.com",
      "alt3.aspmx.l.google.com",
      "alt4.aspmx.l.google.com",
    ];
    const foundHosts = googleMxHosts.filter(h => allMxData.includes(h));
    if (foundHosts.length === 5) {
      insights.push({
        severity: "success",
        title: "Google Workspace MX Records Complete",
        description: "All 5 required Google Workspace MX records are present. Email routing to Gmail is correctly configured.",
        icon: Mail,
        learnMoreUrl: "/google-workspace-mx-not-working",
      });
    } else {
      insights.push({
        severity: "warning",
        title: "Incomplete Google Workspace MX Records",
        description: `Only ${foundHosts.length} of 5 required Google MX records found. Missing records reduce email reliability and failover capability.`,
        fix: `Add all 5 Google MX records with correct priorities: aspmx.l.google.com (1), alt1/alt2.aspmx.l.google.com (5), alt3/alt4.aspmx.l.google.com (10).`,
        icon: Mail,
        learnMoreUrl: "/google-workspace-mx-not-working",
      });
    }

    const priorities = allMxData.match(/(\d+)\s+\S*aspmx/g);
    if (priorities) {
      const prioValues = priorities.map(p => parseInt(p));
      const hasCorrectPriorities = prioValues.includes(1) || prioValues.includes(5) || prioValues.includes(10);
      if (!hasCorrectPriorities && prioValues.length > 0) {
        insights.push({
          severity: "warning",
          title: "Non-Standard Google MX Priorities",
          description: "Google Workspace MX record priorities may not follow the recommended values (1, 5, 5, 10, 10).",
          fix: "Set priorities to: aspmx.l.google.com = 1, alt1/alt2 = 5, alt3/alt4 = 10.",
          icon: Mail,
        });
      }
    }
  }

  if (isMicrosoft) {
    insights.push({
      severity: "info",
      title: "Microsoft 365 Email Detected",
      description: "MX records point to Microsoft 365 (Exchange Online). Ensure SPF includes 'include:spf.protection.outlook.com'.",
      fix: "Verify your SPF, DKIM, and DMARC records are also configured for Microsoft 365 to maximize email deliverability.",
      icon: Mail,
      learnMoreUrl: "/spf-dkim-dmarc-explained",
    });
  }

  if (isZoho) {
    insights.push({
      severity: "info",
      title: "Zoho Mail Detected",
      description: "MX records point to Zoho Mail. Ensure SPF includes 'include:zoho.com' or the appropriate regional Zoho SPF.",
      fix: "Add SPF, DKIM, and DMARC records as specified in Zoho's email setup guide.",
      icon: Mail,
      learnMoreUrl: "/spf-dkim-dmarc-explained",
    });
  }

  const mxPriorities = allMxData.match(/\b(\d+)\s/g);
  if (mxPriorities) {
    const numericPriorities = mxPriorities.map(p => parseInt(p.trim()));
    const maxPriority = Math.max(...numericPriorities);
    if (maxPriority > 100) {
      insights.push({
        severity: "warning",
        title: "Unusually High MX Priority Values",
        description: `MX priority values go up to ${maxPriority}. While technically valid, most email services use priorities between 1-50.`,
        fix: "Consider normalizing MX priorities to standard ranges (1-50). Lower numbers = higher priority.",
        icon: Mail,
      });
    }
  }
}

function analyzeARecords(insights: Insight[], responses: string[], recordType: string, domain: string) {
  if (responses.length === 0) return;

  const allIps = responses.join(" ");

  if (/\b104\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(allIps) || /\b172\.6[4-9]\.\d{1,3}\.\d{1,3}\b/.test(allIps) || /\b173\.245\.\d{1,3}\.\d{1,3}\b/.test(allIps)) {
    insights.push({
      severity: "info",
      title: "Proxied Through Cloudflare",
      description: "This domain's A record points to Cloudflare proxy IPs. Traffic is routed through Cloudflare's CDN and security layer, hiding the origin server IP.",
      icon: Shield,
      learnMoreUrl: "/check-cloudflare-dns",
    });
  }

  const hostingDetections: string[] = [];
  if (/\b(13\.\d{1,3}\.\d{1,3}\.\d{1,3}|52\.\d{1,3}\.\d{1,3}\.\d{1,3}|54\.\d{1,3}\.\d{1,3}\.\d{1,3}|18\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/.test(allIps)) {
    hostingDetections.push("AWS");
  }
  if (/\b(35\.\d{1,3}\.\d{1,3}\.\d{1,3}|34\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/.test(allIps)) {
    hostingDetections.push("Google Cloud");
  }
  if (/\b(20\.\d{1,3}\.\d{1,3}\.\d{1,3}|40\.\d{1,3}\.\d{1,3}\.\d{1,3}|52\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/.test(allIps)) {
    if (!hostingDetections.includes("AWS")) hostingDetections.push("Azure");
  }
  if (/\b76\.76\.\d{1,3}\.\d{1,3}\b/.test(allIps)) {
    hostingDetections.push("Vercel");
  }
  if (/\b75\.2\.\d{1,3}\.\d{1,3}\b/.test(allIps) || /\b99\.83\.\d{1,3}\.\d{1,3}\b/.test(allIps)) {
    hostingDetections.push("Netlify");
  }

  if (hostingDetections.length > 0) {
    insights.push({
      severity: "info",
      title: `Hosted on ${hostingDetections.join(" / ")}`,
      description: `The ${recordType} record IP addresses are associated with ${hostingDetections.join(", ")} infrastructure.`,
      icon: Server,
    });
  }

  const uniqueIps = getUniqueValues(responses);
  const ipList = uniqueIps.flatMap(r => r.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g) || []);
  const distinctIps = Array.from(new Set(ipList));
  if (distinctIps.length > 1) {
    insights.push({
      severity: "info",
      title: `Multiple ${recordType} Records (${distinctIps.length} IPs)`,
      description: `${domain} resolves to ${distinctIps.length} different IP addresses. This typically indicates DNS round-robin load balancing or a CDN.`,
      icon: Server,
    });
  }

  const parkingIps = ["34.102.136.180", "185.53.179.29", "52.0.217.44"];
  const matchedParking = distinctIps.filter(ip => parkingIps.includes(ip));
  if (matchedParking.length > 0) {
    insights.push({
      severity: "warning",
      title: "Possible Domain Parking Page",
      description: `The IP ${matchedParking[0]} is commonly associated with domain parking or placeholder pages. This domain may not be actively serving content.`,
      fix: "If this domain should be live, update the A record to point to your actual web server IP.",
      icon: AlertTriangle,
    });
  }
}

function analyzeNsRecords(
  insights: Insight[],
  responses: string[],
  domain: string,
  dnsResults: DnsLookupWithResults["results"]
) {
  if (responses.length === 0) return;

  const allNs = responses.join(" ").toLowerCase();

  const providerMap: Record<string, string> = {
    "cloudflare": "Cloudflare",
    "awsdns": "AWS Route 53",
    "google": "Google Cloud DNS",
    "azure-dns": "Azure DNS",
    "digitalocean": "DigitalOcean",
    "linode": "Linode/Akamai",
    "domaincontrol": "GoDaddy",
    "godaddy": "GoDaddy",
    "registrar-servers": "Namecheap",
    "dns.he.net": "Hurricane Electric",
    "ns.hover": "Hover",
    "name-services": "Enom",
    "nsone": "NS1",
    "dynect": "Oracle Dyn",
    "ultradns": "Neustar/UltraDNS",
  };

  const detectedProviders: string[] = [];
  for (const [key, name] of Object.entries(providerMap)) {
    if (allNs.includes(key)) {
      if (!detectedProviders.includes(name)) detectedProviders.push(name);
    }
  }

  if (detectedProviders.length > 0) {
    insights.push({
      severity: "info",
      title: `DNS Provider: ${detectedProviders.join(", ")}`,
      description: `Nameservers indicate this domain uses ${detectedProviders.join(" and ")} for DNS hosting.`,
      icon: Server,
    });
  }

  const uniqueNsValues = getUniqueValues(responses);
  const nsHostnames: string[] = [];
  uniqueNsValues.forEach(v => {
    const matches = v.match(/[a-z0-9.-]+\.[a-z]{2,}/g);
    if (matches) nsHostnames.push(...matches);
  });
  const distinctNs = Array.from(new Set(nsHostnames));

  if (distinctNs.length === 1) {
    insights.push({
      severity: "critical",
      title: "Single Nameserver — No Redundancy",
      description: "Only one nameserver is configured. If it goes down, the entire domain will become unreachable. RFC 1035 requires at least 2 nameservers.",
      fix: "Add at least one secondary nameserver for redundancy. Most DNS providers offer multiple nameservers automatically.",
      icon: AlertCircle,
    });
  }

  if (detectedProviders.length > 1) {
    insights.push({
      severity: "warning",
      title: "Mixed DNS Providers in Nameservers",
      description: `Nameservers point to ${detectedProviders.join(" and ")}. This could indicate an incomplete migration.`,
      fix: "Ensure all nameservers point to your intended DNS provider. Mixed providers can cause inconsistent resolution.",
      icon: AlertTriangle,
    });
  }

  if (detectedProviders.includes("GoDaddy") && detectedProviders.length === 1) {
    insights.push({
      severity: "tip",
      title: "Using Default GoDaddy Nameservers",
      description: "This domain uses GoDaddy's default nameservers. If you've migrated hosting or DNS management elsewhere, you may need to update your nameservers.",
      fix: "If you've set up DNS elsewhere (e.g., Cloudflare, Route 53), update nameservers at your domain registrar.",
      icon: Info,
      learnMoreUrl: "/check-godaddy-dns",
    });
  }

  const resolvedNsResults = dnsResults.filter(r => r.status === "resolved" && r.response);
  if (resolvedNsResults.length >= 2) {
    const nsResponseGroups = new Map<string, number>();
    resolvedNsResults.forEach(r => {
      const key = (r.response || "").trim().toLowerCase();
      nsResponseGroups.set(key, (nsResponseGroups.get(key) || 0) + 1);
    });
    if (nsResponseGroups.size > 1) {
      insights.push({
        severity: "warning",
        title: "Nameserver Response Mismatch",
        description: "Different DNS servers are returning different NS records. This can indicate a delegation issue or ongoing migration.",
        fix: "Verify your domain's NS delegation at the registrar matches what your DNS provider expects.",
        icon: AlertTriangle,
        learnMoreUrl: "/how-to-check-nameservers",
      });
    }
  }
}

function analyzeTxtRecords(insights: Insight[], responses: string[], domain: string) {
  if (responses.length === 0) return;

  const allTxt = responses.join(" ");
  const allTxtLower = allTxt.toLowerCase();

  const hasSpf = allTxtLower.includes("v=spf1");
  const hasDkim = allTxtLower.includes("v=dkim1") || domain.includes("._domainkey");
  const hasDmarc = allTxtLower.includes("v=dmarc1") || domain.startsWith("_dmarc.");

  if (hasSpf) {
    const spfMatch = allTxt.match(/v=spf1[^"']*/i);
    const spfRecord = spfMatch ? spfMatch[0] : "";

    if (spfRecord.includes("-all")) {
      insights.push({
        severity: "success",
        title: "Strong SPF Policy (-all)",
        description: "Your SPF record uses '-all' (hard fail), which rejects emails from unauthorized senders. This is the recommended setting for maximum protection.",
        icon: Shield,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    } else if (spfRecord.includes("~all")) {
      insights.push({
        severity: "warning",
        title: "SPF Soft Fail (~all)",
        description: "Your SPF record uses '~all' (soft fail). Unauthorized emails are marked as suspicious but not rejected. This provides weaker protection than '-all'.",
        fix: "Once you've confirmed all legitimate senders are included, change '~all' to '-all' for stronger email security.",
        icon: Shield,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    } else if (spfRecord.includes("?all")) {
      insights.push({
        severity: "critical",
        title: "SPF Neutral Policy (?all)",
        description: "Your SPF record uses '?all' (neutral), which provides NO protection against email spoofing. Any server can send email as your domain.",
        fix: "Change '?all' to '~all' (soft fail) or '-all' (hard fail) immediately to protect against spoofing.",
        icon: AlertCircle,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    } else if (spfRecord.includes("+all")) {
      insights.push({
        severity: "critical",
        title: "SPF Allows All Senders (+all)",
        description: "Your SPF record uses '+all' which explicitly allows ANY server to send email on behalf of your domain. This is a serious security risk.",
        fix: "Remove '+all' and replace with '-all' or '~all'. Add 'include:' mechanisms only for your legitimate email services.",
        icon: AlertCircle,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    }

    const includeMatches = spfRecord.match(/include:/gi) || [];
    const aMatches = spfRecord.match(/\ba\b/gi) || [];
    const mxMatches = spfRecord.match(/\bmx\b/gi) || [];
    const redirectMatches = spfRecord.match(/redirect=/gi) || [];
    const existsMatches = spfRecord.match(/exists:/gi) || [];
    const lookupCount = includeMatches.length + aMatches.length + mxMatches.length + redirectMatches.length + existsMatches.length;

    if (lookupCount > 8) {
      insights.push({
        severity: "critical",
        title: `SPF Record Near Lookup Limit (${lookupCount}/10)`,
        description: `Your SPF record requires ${lookupCount} DNS lookups. The RFC limit is 10. Exceeding this causes SPF to fail completely (PermError).`,
        fix: "Consolidate SPF includes by replacing nested includes with direct IP ranges, or use an SPF flattening service.",
        icon: AlertCircle,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    } else if (lookupCount > 6) {
      insights.push({
        severity: "warning",
        title: `SPF Lookups Approaching Limit (${lookupCount}/10)`,
        description: `Your SPF record uses ${lookupCount} of the 10 allowed DNS lookups. Adding more email services may push you over the limit.`,
        fix: "Plan ahead before adding new email services. Consider SPF flattening if you need more includes.",
        icon: AlertTriangle,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    }

    const spfIncludes: string[] = [];
    if (spfRecord.includes("google")) spfIncludes.push("Google Workspace");
    if (spfRecord.includes("outlook") || spfRecord.includes("microsoft") || spfRecord.includes("protection.outlook")) spfIncludes.push("Microsoft 365");
    if (spfRecord.includes("mailchimp") || spfRecord.includes("mandrillapp")) spfIncludes.push("Mailchimp");
    if (spfRecord.includes("sendgrid")) spfIncludes.push("SendGrid");
    if (spfRecord.includes("amazonses")) spfIncludes.push("Amazon SES");
    if (spfRecord.includes("zendesk")) spfIncludes.push("Zendesk");
    if (spfRecord.includes("freshdesk")) spfIncludes.push("Freshdesk");
    if (spfRecord.includes("zoho")) spfIncludes.push("Zoho");
    if (spfRecord.includes("mailgun")) spfIncludes.push("Mailgun");
    if (spfRecord.includes("postmarkapp")) spfIncludes.push("Postmark");

    if (spfIncludes.length > 0) {
      insights.push({
        severity: "info",
        title: `SPF Authorized Senders: ${spfIncludes.join(", ")}`,
        description: `Your SPF record authorizes these services to send email on behalf of ${domain}.`,
        icon: Mail,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    }
  } else {
    insights.push({
      severity: "warning",
      title: "No SPF Record Found",
      description: `${domain} has no SPF record. Without SPF, anyone can send email pretending to be from your domain, and your legitimate emails are more likely to land in spam.`,
      fix: "Add a TXT record with 'v=spf1 include:<your-email-provider> -all'. For Google Workspace: 'v=spf1 include:_spf.google.com -all'.",
      icon: Shield,
      learnMoreUrl: "/spf-dkim-dmarc-explained",
    });
  }

  if (hasDmarc) {
    const dmarcMatch = allTxt.match(/v=DMARC1[^"']*/i);
    const dmarcRecord = dmarcMatch ? dmarcMatch[0] : "";

    if (/p=reject/i.test(dmarcRecord)) {
      insights.push({
        severity: "success",
        title: "DMARC Policy: Reject",
        description: "Your DMARC policy is set to 'reject', the strongest setting. Emails that fail authentication are rejected outright.",
        icon: Shield,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    } else if (/p=quarantine/i.test(dmarcRecord)) {
      insights.push({
        severity: "info",
        title: "DMARC Policy: Quarantine",
        description: "Your DMARC policy is set to 'quarantine'. Emails that fail authentication are sent to spam. Consider upgrading to 'p=reject' for maximum protection.",
        fix: "After monitoring DMARC reports and confirming no legitimate emails fail, change to 'p=reject'.",
        icon: Shield,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    } else if (/p=none/i.test(dmarcRecord)) {
      insights.push({
        severity: "warning",
        title: "DMARC Policy: None (Monitoring Only)",
        description: "Your DMARC policy is set to 'p=none', which monitors email authentication but does NOT block spoofed emails. Your domain is still vulnerable.",
        fix: "Review your DMARC aggregate reports, then gradually move to 'p=quarantine' and finally 'p=reject'.",
        icon: AlertTriangle,
        learnMoreUrl: "/spf-dkim-dmarc-explained",
      });
    }
  }

  if (hasSpf && !hasDmarc && !domain.startsWith("_dmarc.")) {
    insights.push({
      severity: "warning",
      title: "SPF Without DMARC",
      description: "You have SPF configured but no DMARC record. Without DMARC, receiving mail servers don't know what to do when SPF fails — your emails may still be spoofed.",
      fix: "Add a DMARC TXT record at _dmarc." + domain + ". Start with: 'v=DMARC1; p=none; rua=mailto:dmarc-reports@" + domain + "' to begin monitoring.",
      icon: Shield,
      learnMoreUrl: "/spf-dkim-dmarc-explained",
    });
  }

  if (hasDkim) {
    insights.push({
      severity: "success",
      title: "DKIM Record Present",
      description: "A DKIM signing key is published for this domain, enabling receiving servers to verify email authenticity.",
      icon: Shield,
      learnMoreUrl: "/spf-dkim-dmarc-explained",
    });
  }

  const verificationPatterns = [
    { pattern: "google-site-verification", name: "Google Search Console" },
    { pattern: "facebook-domain-verification", name: "Facebook/Meta" },
    { pattern: "ms=", name: "Microsoft 365" },
    { pattern: "apple-domain-verification", name: "Apple" },
    { pattern: "adobe-idp-site-verification", name: "Adobe" },
    { pattern: "atlassian-domain-verification", name: "Atlassian" },
    { pattern: "docusign", name: "DocuSign" },
    { pattern: "hubspot-developer-verification", name: "HubSpot" },
    { pattern: "stripe-verification", name: "Stripe" },
    { pattern: "have-i-been-pwned-verification", name: "Have I Been Pwned" },
  ];

  const foundVerifications: string[] = [];
  for (const vp of verificationPatterns) {
    if (allTxtLower.includes(vp.pattern.toLowerCase())) {
      foundVerifications.push(vp.name);
    }
  }

  if (foundVerifications.length > 0) {
    insights.push({
      severity: "info",
      title: `Domain Verified With: ${foundVerifications.join(", ")}`,
      description: `TXT records contain domain verification tokens for ${foundVerifications.join(", ")}. These confirm domain ownership with external services.`,
      icon: Info,
    });
  }
}

function analyzeCnameRecords(insights: Insight[], responses: string[], domain: string) {
  if (responses.length === 0) return;

  const allCname = responses.join(" ").toLowerCase();

  const domainParts = domain.split(".");
  const isRootDomain = domainParts.length <= 2 || (domainParts.length === 3 && domainParts[0] === "www");
  if (isRootDomain && domainParts[0] !== "www" && domainParts.length <= 2) {
    insights.push({
      severity: "critical",
      title: "CNAME at Root Domain (RFC Violation)",
      description: `A CNAME record exists at the root domain (${domain}). Per RFC 1034, CNAME records cannot coexist with other record types at the zone apex. This can break MX, NS, and TXT records.`,
      fix: "Use an A/AAAA record at the root domain instead. Some DNS providers (Cloudflare, Route 53) offer CNAME flattening as an alternative.",
      icon: AlertCircle,
    });
  }

  const cdnDetections: string[] = [];
  if (allCname.includes("cloudflare")) cdnDetections.push("Cloudflare");
  if (allCname.includes("akamai") || allCname.includes("edgekey") || allCname.includes("edgesuite")) cdnDetections.push("Akamai");
  if (allCname.includes("fastly")) cdnDetections.push("Fastly");
  if (allCname.includes("cloudfront")) cdnDetections.push("AWS CloudFront");
  if (allCname.includes("azureedge") || allCname.includes("azurefd")) cdnDetections.push("Azure CDN");

  if (cdnDetections.length > 0) {
    insights.push({
      severity: "info",
      title: `CDN Detected: ${cdnDetections.join(", ")}`,
      description: `This CNAME points to ${cdnDetections.join(" / ")} CDN infrastructure, providing content delivery acceleration and edge caching.`,
      icon: Zap,
    });
  }

  const platformDetections: string[] = [];
  if (allCname.includes("vercel") || allCname.includes("vercel-dns")) platformDetections.push("Vercel");
  if (allCname.includes("netlify")) platformDetections.push("Netlify");
  if (allCname.includes("herokuapp") || allCname.includes("heroku")) platformDetections.push("Heroku");
  if (allCname.includes("shopify") || allCname.includes("myshopify")) platformDetections.push("Shopify");
  if (allCname.includes("github.io") || allCname.includes("githubusercontent")) platformDetections.push("GitHub Pages");
  if (allCname.includes("wordpress") || allCname.includes("wpengine") || allCname.includes("wp.com")) platformDetections.push("WordPress");
  if (allCname.includes("squarespace")) platformDetections.push("Squarespace");
  if (allCname.includes("webflow")) platformDetections.push("Webflow");

  if (platformDetections.length > 0) {
    insights.push({
      severity: "info",
      title: `Hosted on ${platformDetections.join(", ")}`,
      description: `This CNAME points to ${platformDetections.join(" / ")} hosting. The domain is configured to serve content from this platform.`,
      icon: Globe,
    });
  }
}

function analyzeRegionalIssues(
  insights: Insight[],
  dnsResults: DnsLookupWithResults["results"]
) {
  const failedServers = dnsResults.filter(r => r.status !== "resolved");
  if (failedServers.length === 0) return;

  const regionMap: Record<string, string[]> = {};
  failedServers.forEach(r => {
    const country = r.server?.country || "Unknown";
    if (!regionMap[country]) regionMap[country] = [];
    regionMap[country].push(r.server?.name || r.server?.location || "Unknown");
  });

  const failedCountries = Object.keys(regionMap).filter(c => c !== "Unknown");

  if (failedCountries.length >= 2) {
    const continentMap: Record<string, string[]> = {};
    const countryToContinent: Record<string, string> = {
      "US": "North America", "CA": "North America", "MX": "North America",
      "BR": "South America", "AR": "South America", "CL": "South America", "CO": "South America",
      "GB": "Europe", "DE": "Europe", "FR": "Europe", "NL": "Europe", "SE": "Europe", "IT": "Europe", "ES": "Europe", "PL": "Europe", "CH": "Europe", "AT": "Europe", "BE": "Europe", "CZ": "Europe", "FI": "Europe", "NO": "Europe", "DK": "Europe", "IE": "Europe", "PT": "Europe", "RO": "Europe",
      "JP": "Asia", "CN": "Asia", "KR": "Asia", "IN": "Asia", "SG": "Asia", "HK": "Asia", "TW": "Asia", "TH": "Asia", "MY": "Asia", "ID": "Asia", "PH": "Asia", "VN": "Asia",
      "AU": "Oceania", "NZ": "Oceania",
      "ZA": "Africa", "NG": "Africa", "KE": "Africa", "EG": "Africa",
      "AE": "Middle East", "SA": "Middle East", "IL": "Middle East", "TR": "Middle East",
    };

    failedCountries.forEach(c => {
      const continent = countryToContinent[c] || "Other";
      if (!continentMap[continent]) continentMap[continent] = [];
      continentMap[continent].push(c);
    });

    const resolvedCountries = new Set(
      dnsResults.filter(r => r.status === "resolved").map(r => r.server?.country).filter(Boolean)
    );

    const failedRegions = Object.keys(continentMap);
    const workingRegions = Array.from(resolvedCountries)
      .map(c => countryToContinent[c!] || "Other")
      .filter((v, i, a) => a.indexOf(v) === i);

    const regionOnlyFailing = failedRegions.filter(r => !workingRegions.includes(r));

    if (regionOnlyFailing.length > 0) {
      insights.push({
        severity: "warning",
        title: `Regional DNS Failure: ${regionOnlyFailing.join(", ")}`,
        description: `DNS resolution is failing specifically in ${regionOnlyFailing.join(" and ")} while working in other regions. Users in these areas may be unable to reach your site.`,
        fix: "This could indicate regional nameserver issues or geo-blocking. Check with your DNS provider about their points of presence in affected regions.",
        icon: Globe,
      });
    } else if (failedCountries.length >= 2) {
      insights.push({
        severity: "warning",
        title: `DNS Failing in ${failedCountries.length} Countries`,
        description: `Resolution failed in: ${failedCountries.slice(0, 5).join(", ")}${failedCountries.length > 5 ? ` and ${failedCountries.length - 5} more` : ""}.`,
        fix: "Check for transient network issues or verify your DNS provider has adequate global coverage.",
        icon: Globe,
      });
    }
  }
}
