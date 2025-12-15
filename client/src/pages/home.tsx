import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { PerformanceChart } from "@/components/performance-chart";
import { DnsToolsGrid } from "@/components/dns-tools-grid";
import { UsageStats } from "@/components/usage-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Globe, User, Menu, Lock, BarChart3, Zap, Share2, Copy, Check, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { EmailCapturePopup } from "@/components/email-capture-popup";

// Mobile-optimized home page
export default function Home() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastLookupParams, setLastLookupParams] = useState<{ domain: string; recordType: string } | null>(null);
  const { toast } = useToast();

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
    setLastLookupParams({ domain: results.domain, recordType: results.recordType });
    setCopied(false); // Reset copied state for new results
  };

  const refreshMutation = useMutation({
    mutationFn: async () => {
      if (!lastLookupParams) throw new Error("No previous lookup to refresh");
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/dns/lookup", lastLookupParams);
      return response.json() as Promise<DnsLookupWithResults>;
    },
    onSuccess: (data) => {
      setLookupResults(data);
      queryClient.invalidateQueries({ queryKey: ['/api/usage/stats'] });
      toast({
        title: "Results Refreshed",
        description: `Updated DNS propagation results for ${data.domain}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Refresh Failed",
        description: error.message || "An error occurred while refreshing results.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleRefresh = () => {
    if (!lastLookupParams) return;
    refreshMutation.mutate();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Logo size="sm" className="mr-2" />
                <span className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</span>
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
              <Link href="/guides" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Guides
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Blog
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
              
              {/* Mobile Menu */}
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Main Search Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
          <div className="absolute inset-0 opacity-20">
            <img src="/logo.png" alt="" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] object-contain blur-3xl" />
          </div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Free DNS Lookup & Propagation Checker
              </h1>
              <p className="text-blue-100 text-base md:text-xl mb-2">
                Check DNS records instantly across 50+ global servers
              </p>
              <p className="text-blue-200 text-sm md:text-base">
                Monitor DNS propagation, verify nameserver changes, and troubleshoot DNS issues in real-time
              </p>
            </div>
            
            <DnsLookupForm 
              onLookupComplete={handleLookupComplete}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </section>

        {/* Usage Stats Section - Always Visible */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UsageStats />
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
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh} 
                  disabled={!lastLookupParams || isLoading}
                  data-testid="button-refresh"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button variant="outline" size="sm" disabled data-testid="button-export">
                          <Zap className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming Soon - Export results to CSV/JSON (Pro Feature)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button size="sm" disabled data-testid="button-monitor">
                          <Globe className="h-4 w-4 mr-2" />
                          Monitor
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming Soon - Set up continuous DNS monitoring (Pro Feature)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                {/* Usage Statistics */}
                <UsageStats />
                
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

        {/* SEO Content Sections */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
          <div className="prose prose-blue max-w-none">
            {/* What is DNS Propagation */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is DNS Propagation?</h2>
            <p className="text-lg text-gray-700 mb-4">
              DNS propagation is the time it takes for DNS record changes to spread across the internet's global network of DNS servers. When you update your domain's DNS records—such as changing your website's IP address, modifying MX records for email, or updating nameservers—these changes don't happen instantly worldwide.
            </p>
            <p className="text-gray-700 mb-6">
              The propagation process involves updating thousands of DNS servers maintained by ISPs, hosting providers, and DNS services like Google DNS (8.8.8.8), Cloudflare (1.1.1.1), and OpenDNS. Each server caches DNS records based on their Time To Live (TTL) value, which determines how long the record should be stored before checking for updates. This caching mechanism improves internet performance but causes delays when DNS changes need to propagate globally.
            </p>

            {/* How Long Does DNS Propagation Take */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">How Long Does DNS Propagation Take?</h2>
            <p className="text-lg text-gray-700 mb-4">
              DNS propagation typically takes anywhere from <strong>15 minutes to 48 hours</strong>, though most changes complete within 2-6 hours. The propagation time depends on several key factors:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>TTL (Time To Live) Settings:</strong> Lower TTL values (like 300 seconds or 5 minutes) result in faster propagation, while higher values (86400 seconds or 24 hours) can significantly delay updates.</li>
              <li><strong>DNS Server Caching Policies:</strong> Different DNS providers have varying cache expiration policies. Some strictly honor TTL, while others may cache records longer.</li>
              <li><strong>Record Type:</strong> A records typically propagate faster than NS (nameserver) changes, which can take 24-48 hours for complete global propagation.</li>
              <li><strong>Previous TTL Value:</strong> If your previous record had a high TTL, servers must wait for that TTL to expire before fetching the new record.</li>
              <li><strong>Geographic Location:</strong> Changes may appear faster in some regions while taking longer in others, depending on local DNS infrastructure.</li>
            </ul>
            <p className="text-gray-700 mb-6">
              <strong>Pro Tip:</strong> Before making critical DNS changes (like migrating to a new host), lower your TTL to 300 seconds (5 minutes) at least 24-48 hours in advance. This ensures faster propagation when you make the actual change.
            </p>

            {/* Common DNS Issues During Propagation */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Common DNS Issues During Propagation</h2>
            <p className="text-gray-700 mb-4">
              DNS propagation can cause several temporary issues that resolve once propagation completes. Understanding these common problems helps you troubleshoot effectively:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">NXDOMAIN (Non-Existent Domain)</h3>
            <p className="text-gray-700 mb-4">
              This error occurs when a DNS server cannot find any records for your domain. During propagation, some servers may still have outdated information while others show NXDOMAIN, causing intermittent accessibility issues.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Inconsistent Responses Across Locations</h3>
            <p className="text-gray-700 mb-4">
              Users in different geographic locations may see different versions of your website or experience different email delivery behaviors. This happens because DNS servers in various regions update at different times. Our global DNS checker queries 50+ servers worldwide to identify these inconsistencies.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Email Delivery Failures</h3>
            <p className="text-gray-700 mb-4">
              When MX (Mail Exchange) records are propagating, some email servers may fail to deliver messages because they're querying DNS servers with outdated MX records. This can cause emails to bounce or be delayed during the propagation window.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">SSL Certificate Validation Issues</h3>
            <p className="text-gray-700 mb-4">
              If you're using DNS validation for SSL certificates (like Let's Encrypt), propagation delays in TXT records can prevent certificate issuance or renewal. Ensure your DNS changes are fully propagated before requesting SSL certificates.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">SERVFAIL Errors</h3>
            <p className="text-gray-700 mb-4">
              Server failure responses indicate the DNS server encountered an error while processing your query. During propagation, this can occur if there are misconfigurations in DNSSEC settings, conflicting records, or issues with authoritative nameservers.
            </p>

            {/* How to Use This Global DNS Checker */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">How to Use This Global DNS Propagation Checker</h2>
            <p className="text-gray-700 mb-4">
              Our DNS lookup tool queries 50+ DNS servers across six continents to provide comprehensive propagation status. Here's how to use it effectively:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 mb-6 space-y-4">
              <li>
                <strong>Enter Your Domain Name:</strong> Type the domain you want to check (e.g., example.com or subdomain.example.com).
              </li>
              <li>
                <strong>Select Record Type:</strong> Choose the DNS record type you've changed:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>A Record:</strong> Maps domain to IPv4 address (most common for websites)</li>
                  <li><strong>AAAA Record:</strong> Maps domain to IPv6 address</li>
                  <li><strong>CNAME Record:</strong> Creates domain alias (e.g., www to root domain)</li>
                  <li><strong>MX Record:</strong> Email server configuration</li>
                  <li><strong>TXT Record:</strong> Text data (SPF, DKIM, domain verification)</li>
                  <li><strong>NS Record:</strong> Nameserver delegation</li>
                  <li><strong>SOA Record:</strong> Zone authority information</li>
                </ul>
              </li>
              <li>
                <strong>Optional - Set Expected Value:</strong> Enter the value you expect to see (your new IP address, hostname, etc.). This helps identify servers still showing old data.
              </li>
              <li>
                <strong>Click "Check DNS Propagation":</strong> The tool will query DNS servers globally and display results in real-time.
              </li>
              <li>
                <strong>Analyze Results:</strong> Review the interactive world map and detailed server table to see which locations have received your DNS updates and which are still showing cached records.
              </li>
              <li>
                <strong>Share Results:</strong> Use the share button to generate a unique URL for your DNS check results, perfect for sharing with team members or support tickets.
              </li>
            </ol>

            {/* FAQ Section */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Frequently Asked Questions</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">How often should I check DNS propagation?</h3>
            <p className="text-gray-700 mb-6">
              Check immediately after making DNS changes, then recheck every 1-2 hours until you see consistent results across all global servers. Use our refresh button to rerun checks without re-entering your domain.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Why do some servers show different results?</h3>
            <p className="text-gray-700 mb-6">
              DNS servers cache records based on TTL values and have different update cycles. Servers geographically closer to your authoritative nameservers typically update faster, while distant servers may take longer to reflect changes.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I speed up DNS propagation?</h3>
            <p className="text-gray-700 mb-6">
              You cannot force global DNS servers to update immediately, but you can reduce propagation time by lowering TTL values 24-48 hours before making changes. Also ensure your authoritative nameservers are correctly configured and responding quickly.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">What's the difference between DNS propagation and DNS resolution?</h3>
            <p className="text-gray-700 mb-6">
              DNS resolution is the process of looking up a domain's DNS records, which happens instantly. DNS propagation refers to the time it takes for DNS record changes to spread across all global DNS servers after you make an update.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Is DNS propagation the same for all record types?</h3>
            <p className="text-gray-700 mb-6">
              No. Nameserver (NS) changes typically take the longest (24-48 hours) because they affect zone delegation. A, AAAA, MX, and TXT records usually propagate within 2-6 hours, depending on TTL settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">What should I do if DNS isn't propagating after 48 hours?</h3>
            <p className="text-gray-700 mb-6">
              First, verify your changes were saved correctly at your DNS provider. Check that your authoritative nameservers are responding with the new records using our DNS checker. If issues persist, contact your DNS provider as there may be a configuration problem or service outage.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Does clearing my browser cache help with DNS propagation?</h3>
            <p className="text-gray-700 mb-6">
              Browser cache is different from DNS cache. To see fresh DNS results, you need to flush your operating system's DNS cache (ipconfig /flushdns on Windows, sudo dscacheutil -flushcache on Mac). However, this only affects your local computer—our global checker shows real propagation status worldwide.
            </p>
          </div>
        </section>

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
      <EmailCapturePopup />
    </div>
  );
}
