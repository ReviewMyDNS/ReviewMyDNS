import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Calendar, Database, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";
import { PlanGate } from "@/components/plan-gate";

interface HistoryRecord {
  date: string;
  domain: string;
  recordType: string;
  value: string;
  status: 'changed' | 'stable' | 'failed';
  responseTime: number;
}

export default function HistoryPage() {
  const [selectedDomain, setSelectedDomain] = useState("example.com");
  const [timeRange, setTimeRange] = useState("7d");

  // Mock historical data
  const mockHistory: HistoryRecord[] = [
    {
      date: "2025-07-24 20:30",
      domain: "example.com",
      recordType: "A",
      value: "93.184.216.34",
      status: "stable",
      responseTime: 23
    },
    {
      date: "2025-07-24 19:30",
      domain: "example.com", 
      recordType: "A",
      value: "93.184.216.34",
      status: "stable",
      responseTime: 31
    },
    {
      date: "2025-07-24 18:30",
      domain: "example.com",
      recordType: "A", 
      value: "93.184.216.35",
      status: "changed",
      responseTime: 28
    },
    {
      date: "2025-07-23 20:30",
      domain: "example.com",
      recordType: "A",
      value: "93.184.216.34",
      status: "changed",
      responseTime: 19
    },
    {
      date: "2025-07-23 19:30",
      domain: "example.com",
      recordType: "A",
      value: "timeout",
      status: "failed",
      responseTime: 3000
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>DNS History Tracking - Monitor Record Changes | ReviewMyDNS</title>
        <meta name="description" content="Track DNS record changes over time. See when records changed, identify trends, and maintain a complete audit trail of your DNS configuration." />
        <meta name="keywords" content="DNS history, DNS change tracking, DNS audit log, record history" />
        <meta property="og:title" content="DNS History Tracking - ReviewMyDNS" />
        <meta property="og:description" content="Monitor DNS record changes over time." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/history" />
      </Helmet>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Logo size="sm" className="mr-2" />
                  <h1 className="text-xl font-bold text-gray-900">ReviewMyDNS</h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* SEO Intro Content */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            DNS History Tracking - Monitor Record Changes Over Time
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            Track your domain's DNS record history with our comprehensive logging system. 
            See when records changed, identify performance trends, and maintain a complete audit 
            trail of your DNS configuration.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Change Detection</h3>
              <p className="text-sm text-gray-600">
                Automatic detection when DNS records change, with timestamps and old/new values.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Performance Trends</h3>
              <p className="text-sm text-gray-600">
                Track response time trends to identify DNS performance degradation early.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Audit Trail</h3>
              <p className="text-sm text-gray-600">
                Complete historical log for compliance, security reviews, and troubleshooting.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Why Track DNS History?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Detect unauthorized DNS changes that could indicate security breaches</li>
            <li>Troubleshoot "when did this break?" by reviewing historical records</li>
            <li>Maintain compliance audit trails for regulated industries</li>
            <li>Correlate DNS changes with website issues or outages</li>
            <li>Track TTL changes and their impact on propagation speed</li>
          </ul>
        </div>
      </section>

      <PlanGate feature="history" requiredPlan="pro">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              DNS History Lookup
            </CardTitle>
            <CardDescription>
              Track DNS record changes and performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                  Domain
                </label>
                <input
                  id="domain"
                  type="text"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example.com"
                />
              </div>
              <div>
                <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-2">
                  Time Range
                </label>
                <select
                  id="timeRange"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
              </div>
              <Button className="whitespace-nowrap">
                View History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-500">Total Checks</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">95.8%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">28ms</div>
              <div className="text-sm text-gray-500">Avg Response</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-500">Changes Detected</div>
            </CardContent>
          </Card>
        </div>

        {/* History Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              DNS Record History
            </CardTitle>
            <CardDescription>
              Chronological view of DNS record changes for {selectedDomain}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHistory.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500 w-24">
                      {record.date}
                    </div>
                    <div className="font-medium">
                      {record.recordType} Record
                    </div>
                    <div className="text-sm text-gray-600 font-mono">
                      {record.value}
                    </div>
                    <Badge variant={
                      record.status === 'stable' ? 'default' : 
                      record.status === 'changed' ? 'secondary' : 'destructive'
                    }>
                      {record.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {record.responseTime}ms
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Response Time Trends
            </CardTitle>
            <CardDescription>
              Performance trends over the selected time period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Trend chart visualization</p>
                <p className="text-sm text-gray-400 mt-2">Historical performance data for {selectedDomain}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      </PlanGate>
    </div>
  );
}