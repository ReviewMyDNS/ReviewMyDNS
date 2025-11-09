import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertCircle, Crown, TrendingUp, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "wouter";

interface UsageStats {
  plan: string;
  dailyLimit: number | null;
  used: number;
  remaining: number;
  resetAt: string;
  allowedRecordTypes: string[];
}

export function UsageStats() {
  const { data: stats, isLoading } = useQuery<UsageStats>({
    queryKey: ['/api/usage/stats'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading || !stats) {
    return (
      <Card className="w-full" data-testid="usage-stats-loading">
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const isUnlimited = stats.dailyLimit === null;
  const usagePercent = isUnlimited ? 0 : Math.round((stats.used / (stats.dailyLimit || 1)) * 100);
  const isNearLimit = usagePercent >= 80 && !isUnlimited;
  const isAtLimit = stats.remaining === 0 && !isUnlimited;

  const planDisplayName = {
    anonymous: "Anonymous",
    free: "Free",
    pro: "Pro",
    enterprise: "Enterprise"
  }[stats.plan] || stats.plan;

  const planColor = {
    anonymous: "text-gray-600",
    free: "text-blue-600",
    pro: "text-purple-600",
    enterprise: "text-amber-600"
  }[stats.plan] || "text-gray-600";

  const isPaidPlan = stats.plan === "pro" || stats.plan === "enterprise";

  return (
    <Card className="w-full" data-testid="usage-stats-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Usage Statistics
              {isPaidPlan && <Crown className="h-5 w-5 text-amber-500" data-testid="premium-badge" />}
            </CardTitle>
            <CardDescription>
              Current Plan: <span className={`font-semibold ${planColor}`} data-testid="current-plan">{planDisplayName}</span>
            </CardDescription>
          </div>
          {!isPaidPlan && (
            <Link href="/pricing">
              <Button variant="outline" size="sm" className="gap-2" data-testid="upgrade-button">
                <TrendingUp className="h-4 w-4" />
                Upgrade
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Daily Lookups */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Daily DNS Lookups</span>
            <span className="text-muted-foreground" data-testid="usage-count">
              {isUnlimited ? (
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  Unlimited
                </span>
              ) : (
                <>
                  {stats.used} / {stats.dailyLimit}
                </>
              )}
            </span>
          </div>
          {!isUnlimited && (
            <>
              <Progress value={usagePercent} className="h-2" data-testid="usage-progress" />
              <p className="text-xs text-muted-foreground" data-testid="usage-remaining">
                {stats.remaining} lookups remaining today
              </p>
            </>
          )}
        </div>

        {/* Warning when near limit */}
        {isNearLimit && !isAtLimit && (
          <Alert variant="default" className="bg-amber-50 border-amber-200" data-testid="near-limit-warning">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              You're running low on lookups. Upgrade to Pro for unlimited DNS lookups!
            </AlertDescription>
          </Alert>
        )}

        {/* Error when at limit */}
        {isAtLimit && (
          <Alert variant="destructive" data-testid="at-limit-error">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You've reached your daily limit. Upgrade to continue using our service.
            </AlertDescription>
          </Alert>
        )}

        {/* Allowed Record Types */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Available Record Types</span>
            {!isPaidPlan && (
              <Lock className="h-4 w-4 text-muted-foreground" data-testid="locked-icon" />
            )}
          </div>
          <div className="flex flex-wrap gap-2" data-testid="allowed-record-types">
            {stats.allowedRecordTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                data-testid={`record-type-${type.toLowerCase()}`}
              >
                {type}
              </span>
            ))}
          </div>
          {!isPaidPlan && (
            <p className="text-xs text-muted-foreground">
              Upgrade to Pro for advanced record types (MX, TXT, SOA, NS, PTR)
            </p>
          )}
        </div>

        {/* Upgrade CTA */}
        {!isPaidPlan && (
          <div className="pt-4 border-t">
            <Link href="/pricing">
              <Button className="w-full gap-2" data-testid="upgrade-cta-button">
                <Crown className="h-4 w-4" />
                Upgrade to Pro - $19/month
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
