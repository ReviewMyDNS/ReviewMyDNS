import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, Eye, MousePointerClick, Monitor, Smartphone, Tablet, Globe, Activity } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Logo } from '@/components/logo';

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

export default function SiteAnalyticsPage() {
  const [days, setDays] = useState(30);
  
  const { data: analytics, isLoading, error } = useQuery<AnalyticsSummary>({
    queryKey: ['/api/analytics/summary', days],
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Helmet>
          <title>Site Analytics - ReviewMyDNS Admin</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view site analytics.</p>
          <Link href="/signin">
            <Button>Sign In</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Site Analytics - ReviewMyDNS Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Logo size="sm" className="mr-2" />
                  <h1 className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</h1>
                </div>
              </Link>
              <span className="text-sm text-gray-500 hidden sm:inline">/ Site Analytics</span>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Website Visitor Analytics</h1>
          <div className="flex gap-2">
            {[7, 30, 90].map((d) => (
              <Button
                key={d}
                variant={days === d ? "default" : "outline"}
                size="sm"
                onClick={() => setDays(d)}
                data-testid={`btn-days-${d}`}
              >
                {d} Days
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900" data-testid="text-pageviews">
                        {(analytics?.totalPageviews || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Total Pageviews</div>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900" data-testid="text-visitors">
                        {(analytics?.uniqueVisitors || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Unique Visitors</div>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900" data-testid="text-events">
                        {(analytics?.totalEvents || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Custom Events</div>
                    </div>
                    <MousePointerClick className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900" data-testid="text-avg-views">
                        {analytics?.uniqueVisitors ? (analytics.totalPageviews / analytics.uniqueVisitors).toFixed(1) : '0'}
                      </div>
                      <div className="text-sm text-gray-500">Pages/Visitor</div>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Daily Pageviews</CardTitle>
                <CardDescription>Last {days} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-end gap-1">
                  {(analytics?.pageviewsByDay || []).length > 0 ? (
                    analytics?.pageviewsByDay.map((day, i) => {
                      const max = Math.max(...(analytics?.pageviewsByDay || []).map(d => d.count), 1);
                      const height = (day.count / max) * 100;
                      return (
                        <div 
                          key={i} 
                          className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-t transition-colors cursor-pointer"
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
                        <p className="text-sm">Data appears as visitors browse your site</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Top Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(analytics?.topPages || []).length > 0 ? (
                      analytics?.topPages.map((page, i) => {
                        const maxCount = analytics?.topPages[0]?.count || 1;
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-40 truncate text-sm" title={page.pathname}>
                              {page.pathname}
                            </div>
                            <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className="bg-blue-500 h-full rounded-full"
                                style={{ width: `${(page.count / maxCount) * 100}%` }}
                              />
                            </div>
                            <div className="w-12 text-right text-sm font-medium">{page.count}</div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-center py-4">No data yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Devices</CardTitle>
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
                            {analytics?.totalPageviews ? ((item.count / analytics.totalPageviews) * 100).toFixed(0) : 0}%
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No data yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Browsers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(analytics?.topBrowsers || []).length > 0 ? (
                      analytics?.topBrowsers.map((browser, i) => {
                        const maxCount = analytics?.topBrowsers[0]?.count || 1;
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-24 text-sm">{browser.browser}</div>
                            <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className="bg-green-500 h-full rounded-full"
                                style={{ width: `${(browser.count / maxCount) * 100}%` }}
                              />
                            </div>
                            <div className="w-12 text-right text-sm font-medium">{browser.count}</div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-center py-4">No data yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(analytics?.topReferrers || []).length > 0 ? (
                      analytics?.topReferrers.map((ref, i) => {
                        const maxCount = analytics?.topReferrers[0]?.count || 1;
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-40 truncate text-sm" title={ref.referrer}>
                              {ref.referrer || 'Direct'}
                            </div>
                            <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className="bg-purple-500 h-full rounded-full"
                                style={{ width: `${(ref.count / maxCount) * 100}%` }}
                              />
                            </div>
                            <div className="w-12 text-right text-sm font-medium">{ref.count}</div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-center py-4">No data yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
