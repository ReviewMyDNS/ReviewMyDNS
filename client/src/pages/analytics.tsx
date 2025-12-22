import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, PieChart, Activity, Globe, Users, Eye, MousePointerClick, Monitor, Smartphone, Tablet } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { PlanGate } from "@/components/plan-gate";
import { Helmet } from "react-helmet-async";

interface AnalyticsSummary {
  totalPageviews: number;
  uniqueVisitors: number;
  totalEvents: number;
  topPages: { pathname: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  topBrowsers: { browser: string; count: number }[];
  topDevices: { device: string; count: number }[];
  pageviewsByDay: { date: string; count: number }[];
  visitorsByDay: { date: string; count: number }[];
}

function DeviceIcon({ device }: { device: string }) {
  switch (device) {
    case 'mobile': return <Smartphone className="h-4 w-4" />;
    case 'tablet': return <Tablet className="h-4 w-4" />;
    default: return <Monitor className="h-4 w-4" />;
  }
}

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  
  const days = selectedPeriod === '24h' ? 1 : selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
  
  const { data: analytics, isLoading } = useQuery<AnalyticsSummary>({
    queryKey: ['/api/analytics/summary', days],
  });

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* SEO Intro Content */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            DNS Analytics Dashboard - Performance Insights & Reporting
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            Get comprehensive insights into your DNS performance with our analytics dashboard. 
            Track query volumes, response times, success rates, and geographic performance 
            across all your monitored domains.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Performance Metrics</h3>
              <p className="text-sm text-gray-600">
                Track average response times, p95/p99 latencies, and success rates over time.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Geographic Analysis</h3>
              <p className="text-sm text-gray-600">
                See DNS performance breakdown by region: Americas, Europe, Asia, and more.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Export Reports</h3>
              <p className="text-sm text-gray-600">
                Download CSV or PDF reports for stakeholders, audits, and SLA reviews.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">What You Can Track</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Total DNS queries and trends over 24 hours, 7 days, 30 days, or 90 days</li>
            <li>Success rate and failure patterns by DNS server and region</li>
            <li>Response time distribution and performance outliers</li>
            <li>Top performing and worst performing DNS servers</li>
            <li>Regional performance comparison across continents</li>
          </ul>

          <p className="text-gray-600">
            Use these insights to optimize your DNS configuration, choose better DNS providers, 
            and ensure fast, reliable DNS resolution for users worldwide.
          </p>
        </div>
      </section>

      <PlanGate feature="analytics" requiredPlan="pro">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>
              Comprehensive DNS performance analytics and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {['24h', '7d', '30d', '90d'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period === '24h' ? 'Last 24 Hours' : 
                   period === '7d' ? 'Last 7 Days' : 
                   period === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900" data-testid="text-pageviews">
                    {isLoading ? '...' : (analytics?.totalPageviews || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Total Pageviews</div>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 text-sm text-gray-500">Last {days} days</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900" data-testid="text-visitors">
                    {isLoading ? '...' : (analytics?.uniqueVisitors || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Unique Visitors</div>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2 text-sm text-gray-500">Last {days} days</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900" data-testid="text-events">
                    {isLoading ? '...' : (analytics?.totalEvents || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Custom Events</div>
                </div>
                <MousePointerClick className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="mt-2 text-sm text-gray-500">Last {days} days</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900" data-testid="text-avg-views">
                    {isLoading ? '...' : analytics?.uniqueVisitors ? (analytics.totalPageviews / analytics.uniqueVisitors).toFixed(1) : '0'}
                  </div>
                  <div className="text-sm text-gray-500">Pages/Visitor</div>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 text-sm text-gray-500">Avg pages per visitor</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages in the last {days} days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(analytics?.topPages || []).length > 0 ? (
                  analytics?.topPages.map((page, i) => {
                    const maxCount = analytics?.topPages[0]?.count || 1;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-40 truncate text-sm text-gray-600" title={page.pathname}>
                          {page.pathname}
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full transition-all"
                            style={{ width: `${(page.count / maxCount) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 text-right text-sm font-medium">{page.count}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No pageview data yet</p>
                    <p className="text-sm">Data will appear as visitors browse your site</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Devices */}
          <Card>
            <CardHeader>
              <CardTitle>Devices</CardTitle>
              <CardDescription>Visitor device breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(analytics?.topDevices || []).length > 0 ? (
                  analytics?.topDevices.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <DeviceIcon device={item.device} />
                      <span className="capitalize flex-1">{item.device}</span>
                      <span className="font-medium">{item.count.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm w-16 text-right">
                        {analytics?.totalPageviews ? ((item.count / analytics.totalPageviews) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Monitor className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No device data yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Browsers */}
          <Card>
            <CardHeader>
              <CardTitle>Browsers</CardTitle>
              <CardDescription>Browser distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(analytics?.topBrowsers || []).length > 0 ? (
                  analytics?.topBrowsers.map((browser, i) => {
                    const maxCount = analytics?.topBrowsers[0]?.count || 1;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-24 text-sm text-gray-600">{browser.browser}</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-green-500 h-full rounded-full transition-all"
                            style={{ width: `${(browser.count / maxCount) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 text-right text-sm font-medium">{browser.count}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No browser data yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Referrers */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(analytics?.topReferrers || []).length > 0 ? (
                  analytics?.topReferrers.map((ref, i) => {
                    const maxCount = analytics?.topReferrers[0]?.count || 1;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-40 truncate text-sm text-gray-600" title={ref.referrer}>
                          {ref.referrer || 'Direct'}
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-purple-500 h-full rounded-full transition-all"
                            style={{ width: `${(ref.count / maxCount) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 text-right text-sm font-medium">{ref.count}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No referrer data yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pageviews Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daily Pageviews</CardTitle>
            <CardDescription>Pageview trend over the last {days} days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-1">
              {(analytics?.pageviewsByDay || []).length > 0 ? (
                analytics?.pageviewsByDay.slice(-30).map((day, i) => {
                  const max = Math.max(...(analytics?.pageviewsByDay || []).map(d => d.count), 1);
                  const height = (day.count / max) * 100;
                  return (
                    <div 
                      key={i} 
                      className="flex-1 bg-blue-500/80 hover:bg-blue-600 rounded-t transition-colors cursor-pointer"
                      style={{ height: `${Math.max(height, 2)}%` }}
                      title={`${day.date}: ${day.count} views`}
                    />
                  );
                })
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No pageview data yet</p>
                    <p className="text-sm">Data will appear as visitors browse your site</p>
                  </div>
                </div>
              )}
            </div>
            {(analytics?.pageviewsByDay || []).length > 0 && (
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{analytics?.pageviewsByDay[0]?.date}</span>
                <span>{analytics?.pageviewsByDay[analytics.pageviewsByDay.length - 1]?.date}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Analytics</CardTitle>
            <CardDescription>Download detailed reports and data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">Export CSV Report</Button>
              <Button variant="outline">Download PDF Summary</Button>
              <Button variant="outline">API Access</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      </PlanGate>
    </div>
  );
}