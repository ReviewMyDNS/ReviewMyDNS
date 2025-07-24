import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, Clock, Globe, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface MonitorResult {
  server: string;
  location: string;
  responseTime: number;
  status: 'online' | 'slow' | 'offline';
}

export default function Monitor() {
  const [domain, setDomain] = useState("google.com");
  const [isMonitoring, setIsMonitoring] = useState(false);

  const { data: monitorData, refetch } = useQuery({
    queryKey: ['/api/dns/lookup', domain, 'monitor'],
    enabled: false
  });

  const startMonitoring = async () => {
    setIsMonitoring(true);
    await refetch();
    
    // Simulate real-time monitoring
    const interval = setInterval(async () => {
      await refetch();
    }, 5000);

    setTimeout(() => {
      clearInterval(interval);
      setIsMonitoring(false);
    }, 30000);
  };

  // Mock data for demonstration
  const mockResults: MonitorResult[] = [
    { server: "Google DNS (8.8.8.8)", location: "Mountain View, CA", responseTime: 12, status: 'online' },
    { server: "Cloudflare DNS (1.1.1.1)", location: "San Francisco, CA", responseTime: 45, status: 'slow' },
    { server: "OpenDNS (208.67.222.222)", location: "San Francisco, CA", responseTime: 28, status: 'online' },
    { server: "Quad9 (9.9.9.9)", location: "Berkeley, CA", responseTime: 156, status: 'slow' },
    { server: "Level3 (4.2.2.2)", location: "Denver, CO", responseTime: 89, status: 'online' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/tools">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Tools
                </Button>
              </Link>
              <div className="flex items-center">
                <Activity className="h-6 w-6 text-blue-600 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">Response Time Monitor</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Monitor DNS Response Times
            </CardTitle>
            <CardDescription>
              Track DNS response times across global servers in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                  Domain to Monitor
                </label>
                <input
                  id="domain"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example.com"
                />
              </div>
              <Button 
                onClick={startMonitoring}
                disabled={isMonitoring}
                className="whitespace-nowrap"
              >
                {isMonitoring ? "Monitoring..." : "Start Monitor"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Status */}
        {isMonitoring && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center">
                <div className="animate-pulse flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-blue-800 font-medium">
                    Live monitoring {domain} - Updates every 5 seconds
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockResults.map((result, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{result.server}</CardTitle>
                  <Badge variant={
                    result.status === 'online' ? 'default' : 
                    result.status === 'slow' ? 'secondary' : 'destructive'
                  }>
                    {result.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center">
                  <Globe className="h-3 w-3 mr-1" />
                  {result.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {result.responseTime}ms
                </div>
                <div className="text-sm text-gray-500">Response Time</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Performance Trends
            </CardTitle>
            <CardDescription>
              Response time trends over the last hour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Performance chart will appear here</p>
                <p className="text-sm text-gray-400 mt-2">Start monitoring to see real-time trends</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}