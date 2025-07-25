import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Lock, 
  BarChart3, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Crown, 
  Zap,
  Globe,
  TrendingUp,
  Shield,
  Users
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  // Mock user data - in real app, this would come from authentication
  const user = {
    name: "John Doe",
    email: "john@example.com",
    plan: "Free",
    queriesUsed: 23,
    queriesLimit: 50,
    joinDate: "2025-01-15"
  };

  const recentQueries = [
    { domain: "example.com", type: "A", status: "Success", timestamp: "2 hours ago" },
    { domain: "google.com", type: "MX", status: "Success", timestamp: "5 hours ago" },
    { domain: "github.com", type: "CNAME", status: "Success", timestamp: "1 day ago" },
    { domain: "stackoverflow.com", type: "A", status: "Failed", timestamp: "2 days ago" },
  ];

  const upgradeFeatures = [
    { name: "Unlimited DNS Queries", current: "50/day", pro: "Unlimited" },
    { name: "Query History", current: "None", pro: "30 days" },
    { name: "Custom Alerts", current: "None", pro: "Unlimited" },
    { name: "API Access", current: "None", pro: "10k/month" },
    { name: "Export Data", current: "None", pro: "CSV, JSON" },
    { name: "Team Access", current: "1 user", pro: "5 users" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center">
                  <Lock className="h-8 w-8 text-blue-600 mr-2" />
                  <h1 className="text-xl font-bold text-gray-900">ReviewMyDNS</h1>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {user.plan} Plan
              </Badge>
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Monitor your DNS queries and manage your account settings.
          </p>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">DNS Queries Today</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.queriesUsed}</div>
              <Progress value={(user.queriesUsed / user.queriesLimit) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {user.queriesUsed} of {user.queriesLimit} daily limit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-muted-foreground mt-2">
                Member since {user.joinDate}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.plan}</div>
              <Link href="/pricing">
                <Button variant="outline" size="sm" className="mt-2">
                  Upgrade Plan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Query History</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent DNS Queries</CardTitle>
                <CardDescription>
                  Your latest DNS lookups and their results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQueries.map((query, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{query.domain}</div>
                          <div className="text-sm text-gray-500">{query.type} Record</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={query.status === "Success" ? "default" : "destructive"}>
                          {query.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{query.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Run New DNS Query
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Globe className="h-6 w-6" />
                      <span className="text-sm">DNS Lookup</span>
                    </Button>
                  </Link>
                  <Link href="/bulk-lookup">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <BarChart3 className="h-6 w-6" />
                      <span className="text-sm">Bulk Lookup</span>
                    </Button>
                  </Link>
                  <Link href="/monitor">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Clock className="h-6 w-6" />
                      <span className="text-sm">Monitor</span>
                    </Button>
                  </Link>
                  <Link href="/security">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Shield className="h-6 w-6" />
                      <span className="text-sm">Security</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Query History</span>
                  <Badge variant="outline">Pro Feature</Badge>
                </CardTitle>
                <CardDescription>
                  Track all your DNS queries over time
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Query History Unavailable
                </h3>
                <p className="text-gray-600 mb-6">
                  Upgrade to Pro to access your complete DNS query history, export data, and set up monitoring alerts.
                </p>
                <Link href="/pricing">
                  <Button>
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upgrade" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade Your Experience</CardTitle>
                <CardDescription>
                  See what you're missing with our Pro features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upgradeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-sm text-gray-500">
                          Current: {feature.current}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">
                          Pro: {feature.pro}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold">$19/month</div>
                      <div className="text-sm text-gray-500">or $190/year (save 17%)</div>
                    </div>
                    <Link href="/pricing">
                      <Button size="lg">
                        <Zap className="h-4 w-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}