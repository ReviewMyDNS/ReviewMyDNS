import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, PieChart, Activity, Globe } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { PlanGate } from "@/components/plan-gate";

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>DNS Analytics Dashboard - Performance Insights | ReviewMyDNS</title>
        <meta name="description" content="DNS analytics dashboard with performance metrics, response time tracking, and geographic analysis for all your monitored domains." />
        <meta name="keywords" content="DNS analytics, DNS performance dashboard, DNS monitoring, response time tracking" />
        <meta property="og:title" content="DNS Analytics Dashboard - ReviewMyDNS" />
        <meta property="og:description" content="Comprehensive DNS performance insights and reporting." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/analytics" />
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
                  <div className="text-2xl font-bold text-gray-900">1,247</div>
                  <div className="text-sm text-gray-500">Total Queries</div>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 text-sm text-green-600">+12% from last period</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">98.7%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
                <PieChart className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2 text-sm text-green-600">+0.3% from last period</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">24ms</div>
                  <div className="text-sm text-gray-500">Avg Response</div>
                </div>
                <BarChart3 className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="mt-2 text-sm text-red-600">+3ms from last period</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">47</div>
                  <div className="text-sm text-gray-500">Active Servers</div>
                </div>
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 text-sm text-gray-500">Across 25 countries</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Response Time Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Response Time Distribution</CardTitle>
              <CardDescription>DNS query response times across all servers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Response time histogram</p>
                  <p className="text-sm text-gray-400 mt-2">0-50ms: 87% | 50-100ms: 11% | 100ms+: 2%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Performance</CardTitle>
              <CardDescription>Average response times by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>North America</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">18ms</div>
                    <div className="text-sm text-gray-500">avg</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>Europe</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">24ms</div>
                    <div className="text-sm text-gray-500">avg</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span>Asia Pacific</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">31ms</div>
                    <div className="text-sm text-gray-500">avg</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span>Other Regions</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">45ms</div>
                    <div className="text-sm text-gray-500">avg</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Servers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top Performing DNS Servers</CardTitle>
            <CardDescription>Best performing servers in the last {selectedPeriod}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Google DNS", ip: "8.8.8.8", location: "Mountain View, CA", avgTime: "12ms", uptime: "99.9%" },
                { name: "Cloudflare DNS", ip: "1.1.1.1", location: "San Francisco, CA", avgTime: "15ms", uptime: "99.8%" },
                { name: "Quad9", ip: "9.9.9.9", location: "Berkeley, CA", avgTime: "18ms", uptime: "99.7%" },
                { name: "OpenDNS", ip: "208.67.222.222", location: "San Francisco, CA", avgTime: "21ms", uptime: "99.6%" },
                { name: "Level3", ip: "4.2.2.2", location: "Denver, CO", avgTime: "24ms", uptime: "99.5%" }
              ].map((server, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <div>
                      <div className="font-medium">{server.name}</div>
                      <div className="text-sm text-gray-500">{server.ip} • {server.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{server.avgTime}</div>
                    <div className="text-sm text-gray-500">{server.uptime} uptime</div>
                  </div>
                </div>
              ))}
            </div>
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
