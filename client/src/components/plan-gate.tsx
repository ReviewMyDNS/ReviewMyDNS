import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Crown, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

interface UsageStats {
  plan: string;
  dailyLimit: number | null;
  used: number;
  remaining: number;
  resetAt: string;
  allowedRecordTypes: string[];
}

interface PlanGateProps {
  feature: "bulkLookup" | "analytics" | "history" | "monitoring" | "api";
  requiredPlan?: "pro" | "team" | "enterprise";
  children: React.ReactNode;
  previewMode?: boolean;
}

const FEATURE_DETAILS = {
  bulkLookup: {
    title: "Bulk DNS Lookup",
    description: "Check hundreds of domains simultaneously with automated reporting",
    icon: Zap,
    benefits: [
      "Process up to 500 domains per day",
      "Automated CSV export",
      "Real-time progress tracking",
      "Comprehensive reporting"
    ]
  },
  analytics: {
    title: "Performance Analytics",
    description: "Deep insights into your DNS performance and trends",
    icon: Zap,
    benefits: [
      "Response time analytics",
      "Historical trend charts",
      "Global coverage insights",
      "Performance benchmarking"
    ]
  },
  history: {
    title: "Historical Tracking",
    description: "Monitor DNS changes over time with detailed history logs",
    icon: Zap,
    benefits: [
      "30-day lookup history",
      "Change detection alerts",
      "Trend analysis",
      "Exportable reports"
    ]
  },
  monitoring: {
    title: "DNS Monitoring",
    description: "Real-time monitoring and alerts for DNS changes",
    icon: Zap,
    benefits: [
      "Real-time DNS monitoring",
      "Instant change alerts",
      "Scheduled health checks",
      "Email/Webhook notifications"
    ]
  },
  api: {
    title: "Developer API",
    description: "Integrate DNS checking into your applications",
    icon: Zap,
    benefits: [
      "RESTful API access",
      "25,000 calls per month",
      "Complete documentation",
      "Code examples included"
    ]
  }
};

// Plan hierarchy for tier-based access control
const PLAN_RANKS = {
  anonymous: 0,
  free: 1,
  pro: 2,
  team: 3,
  enterprise: 4
} as const;

export function PlanGate({ feature, requiredPlan = "pro", children, previewMode = false }: PlanGateProps) {
  const { data: usageStats } = useQuery<UsageStats>({
    queryKey: ['/api/usage/stats'],
    refetchInterval: 30000,
  });

  const currentPlan = usageStats?.plan?.toLowerCase() || "anonymous";
  const currentRank = PLAN_RANKS[currentPlan as keyof typeof PLAN_RANKS] || 0;
  const requiredRank = PLAN_RANKS[requiredPlan];
  const hasAccess = currentRank >= requiredRank;

  // If user has access, show the actual content
  if (hasAccess && !previewMode) {
    return <>{children}</>;
  }

  // Otherwise show upgrade prompt
  const details = FEATURE_DETAILS[feature];
  const Icon = details.icon;
  
  // Dynamic upgrade messaging based on required plan
  const planNames = { pro: "Pro", team: "Team", enterprise: "Enterprise" };
  const planPrices = { pro: "$29", team: "$59", enterprise: "$129" };
  const requiredPlanName = planNames[requiredPlan];
  const requiredPlanPrice = planPrices[requiredPlan];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-blue-200 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <Lock className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {details.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {details.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center">
                <Crown className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800 font-medium">
                  This is a {requiredPlanName} feature. Upgrade to unlock unlimited access.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">What you'll get:</h3>
              {details.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Crown className="h-5 w-5 mr-2" />
                    Upgrade to {requiredPlanName} - {requiredPlanPrice}/month
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                7-day free trial • Cancel anytime • No credit card required for trial
              </p>
            </div>
          </CardContent>
        </Card>
        
        {previewMode && (
          <div className="mt-6">
            <div className="bg-white rounded-lg p-4 opacity-50 pointer-events-none blur-sm">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
