import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { PerformanceChart } from "@/components/performance-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Lock, Share2, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { SocialShare } from "@/components/social-share";

export default function SharedResult() {
  const [, params] = useRoute("/r/:shareId");
  const shareId = params?.shareId;
  const { toast } = useToast();
  const shareUrl = `${window.location.origin}/r/${shareId}`;

  const { data: lookupResults, isLoading, error } = useQuery<DnsLookupWithResults>({
    queryKey: [`/api/dns/share/${shareId}`],
    enabled: !!shareId,
  });

  const dynamicTitle = lookupResults
    ? `DNS Results: ${lookupResults.domain} (${lookupResults.recordType}) - ReviewMyDNS`
    : 'Shared DNS Results - ReviewMyDNS';
  const dynamicDescription = lookupResults
    ? `${lookupResults.stats.resolvedCount} of ${lookupResults.stats.totalServers} DNS servers resolved successfully. Average response time: ${lookupResults.stats.averageResponseTime.toFixed(0)}ms. Global coverage: ${lookupResults.stats.globalCoverage.toFixed(1)}%`
    : 'View shared DNS propagation results from ReviewMyDNS.';

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `DNS Results for ${lookupResults?.domain}`,
          text: `Check out my DNS propagation results for ${lookupResults?.domain}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Share this link to show your DNS results",
        });
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (isLoading) {
    return (
      <>
        <Helmet><title>Loading DNS Results - ReviewMyDNS</title></Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Loading DNS results...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !lookupResults) {
    return (
      <>
        <Helmet>
          <title>DNS Results Not Found - ReviewMyDNS</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardHeader>
              <CardTitle>Results Not Found</CardTitle>
              <CardDescription>
                This shared DNS result doesn't exist or may have expired.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/">
                <Button className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  Check Your DNS
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
      </Helmet>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Logo size="sm" className="mr-2" />
                <h1 className="text-xl font-bold text-gray-900">ReviewMyDNS</h1>
              </div>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-share">
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </Button>
              <Link href="/">
                <Button size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  Check Your DNS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Header Section */}
        <section className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Shared Result
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {lookupResults.createdAt ? new Date(lookupResults.createdAt).toLocaleString() : 'Just now'}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  DNS Results: {lookupResults.domain}
                </h2>
                <p className="text-gray-600">
                  Record Type: <span className="font-semibold">{lookupResults.recordType}</span>
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {lookupResults.stats.resolvedCount} Resolved
                </Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  {lookupResults.stats.unresolvedCount} Failed
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <SocialShare 
                url={shareUrl}
                title={`${lookupResults.stats.resolvedCount}/${lookupResults.stats.totalServers} servers resolved`}
                domain={lookupResults.domain}
              />
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Interactive World Map */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Global Propagation Map
              </CardTitle>
              <CardDescription>
                DNS propagation status across worldwide servers
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

            {/* Performance Chart */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                  <CardDescription>Response times across servers</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart results={lookupResults.results} />
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Average Response</span>
                      <span className="font-semibold">{lookupResults.stats.averageResponseTime.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Global Coverage</span>
                      <span className="font-semibold">{lookupResults.stats.globalCoverage.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="py-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Check Your Own DNS
                </h3>
                <p className="text-gray-600 mb-6">
                  Test your domain's DNS propagation across 50+ global servers
                </p>
                <Link href="/">
                  <Button size="lg">
                    <Globe className="h-5 w-5 mr-2" />
                    Start Free DNS Check
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 ReviewMyDNS. Powered by global DNS infrastructure.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
