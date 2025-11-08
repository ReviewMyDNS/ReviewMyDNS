import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { PerformanceChart } from "@/components/performance-chart";
import { DnsToolsGrid } from "@/components/dns-tools-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Globe, User, Menu, Lock, BarChart3, Zap, Share2, Copy, Check } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
    setCopied(false); // Reset copied state for new results
  };

  const handleShare = async () => {
    if (!lookupResults?.shareId) return;
    
    const shareUrl = `${window.location.origin}/r/${lookupResults.shareId}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `DNS Results for ${lookupResults.domain}`,
          text: `Check out my DNS propagation results for ${lookupResults.domain}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast({
          title: "Link copied!",
          description: "Share this link to show your DNS results",
        });
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Lock className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">ReviewMyDNS</h1>
              </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-blue-600">
                DNS Checker
              </Link>
              <Link href="/tools" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Tools
              </Link>
              <Link href="/api-docs" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                API
              </Link>
              <Link href="/documentation" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Terminology
              </Link>
            </nav>
            
            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/pricing">
                  <Button variant="ghost">Pricing</Button>
                </Link>
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signin?tab=signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
              
              {/* Mobile Actions */}
              <div className="md:hidden flex items-center space-x-2">
                <Link href="/signin">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/signin?tab=signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Main Search Section */}
        <section className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Global DNS Propagation Checker
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Check DNS records and propagation status across 50+ worldwide servers
              </p>
            </div>
            
            <DnsLookupForm 
              onLookupComplete={handleLookupComplete}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </section>

        {/* Results Section */}
        {lookupResults && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Results Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Propagation Results</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {lookupResults.stats.resolvedCount} Resolved
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    {lookupResults.stats.unresolvedCount} Failed
                  </Badge>
                  <span className="text-gray-600">
                    Last updated: {lookupResults.createdAt ? new Date(lookupResults.createdAt).toLocaleTimeString() : 'Just now'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-share-results">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied!' : 'Share Results'}
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  Monitor
                </Button>
              </div>
            </div>

            {/* Interactive World Map */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Global Propagation Map
                </CardTitle>
                <CardDescription>
                  Interactive visualization of DNS propagation status worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PropagationMap results={lookupResults.results} />
              </CardContent>
            </Card>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Detailed Results Table */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2" />
                      DNS Server Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResultsTable results={lookupResults.results} />
                  </CardContent>
                </Card>
              </div>
              
              {/* Quick Stats */}
              <div className="space-y-6">
                {/* Sponsor Ad Slot */}
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <span className="text-xs text-gray-500 mb-2 block">Ad</span>
                      <div className="bg-white rounded p-3 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">Cloud Infrastructure</h4>
                        <p className="text-xs text-gray-600 mb-2">Deploy your apps with 99.9% uptime</p>
                        <Button size="sm" variant="outline" className="text-xs">
                          Try Free
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Propagation Status Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Propagation Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Global Coverage</span>
                        <span className="text-lg font-semibold text-green-600">
                          {lookupResults.stats.globalCoverage}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${lookupResults.stats.globalCoverage}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{lookupResults.stats.resolvedCount} of {lookupResults.stats.totalServers} servers</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Average Response Time */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {lookupResults.stats.averageResponseTime}ms
                    </div>
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">Performance optimal</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Record Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Record Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-mono font-medium">{lookupResults.recordType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domain:</span>
                        <span className="font-mono text-xs">{lookupResults.domain}</span>
                      </div>
                      {lookupResults.expectedValue && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expected:</span>
                          <span className="font-mono text-xs">{lookupResults.expectedValue}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart results={lookupResults.results} />
              </CardContent>
            </Card>
          </section>
        )}

        {/* Sponsored Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
          <div className="text-center mb-6">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Sponsored</span>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional DNS Hosting</h3>
                <p className="text-gray-600 text-sm">Get enterprise-grade DNS hosting with 99.99% uptime SLA. Perfect for production workloads.</p>
              </div>
              <div className="flex-shrink-0">
                <Button variant="outline" className="bg-white hover:bg-gray-50">
                  Learn More →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* DNS Tools Section */}
        <DnsToolsGrid />

        {/* Footer */}
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <Lock className="h-8 w-8 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold">ReviewMyDNS</h3>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  Professional DNS propagation checking and analysis tools used by developers and system administrators worldwide.
                </p>
              </div>
              
              {/* Tools */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">DNS Tools</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-300 hover:text-white text-sm">DNS Checker</Link></li>
                  <li><Link href="/tools" className="text-gray-300 hover:text-white text-sm">All Tools</Link></li>
                  <li><Link href="/bulk-lookup" className="text-gray-300 hover:text-white text-sm">Bulk Lookup</Link></li>
                  <li><Link href="/tools" className="text-gray-300 hover:text-white text-sm">Historical Tracking</Link></li>
                </ul>
              </div>
              
              {/* Resources */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="/documentation" className="text-gray-300 hover:text-white text-sm">Documentation</Link></li>
                  <li><Link href="/api-docs" className="text-gray-300 hover:text-white text-sm">API Reference</Link></li>
                  <li><Link href="/documentation" className="text-gray-300 hover:text-white text-sm">DNS Guide</Link></li>
                  <li><Link href="/tools" className="text-gray-300 hover:text-white text-sm">Status Page</Link></li>
                </ul>
              </div>
            </div>
            
            <Separator className="my-8 bg-gray-700" />
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-300 text-sm">
                © 2025 ReviewMyDNS. All rights reserved.
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/documentation" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link>
                <Link href="/documentation" className="text-gray-300 hover:text-white text-sm">Terms of Service</Link>
                <a href="mailto:info@reviewmydns.com" className="text-gray-300 hover:text-white text-sm">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
