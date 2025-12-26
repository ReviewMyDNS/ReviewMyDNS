import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { apiRequest } from "@/lib/queryClient";
import { PlanGate } from "@/components/plan-gate";

interface BulkResult {
  domain: string;
  recordType: string;
  status: 'pending' | 'resolved' | 'failed';
  resolvedCount: number;
  totalServers: number;
  averageResponseTime: number;
  results?: any[];
}

export default function BulkLookup() {
  const [domains, setDomains] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [bulkResults, setBulkResults] = useState<BulkResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const bulkLookupMutation = useMutation({
    mutationFn: async (data: { domains: string[]; recordType: string }) => {
      const results: BulkResult[] = [];
      const total = data.domains.length;
      
      for (let i = 0; i < data.domains.length; i++) {
        const domain = data.domains[i];
        setProgress(((i + 1) / total) * 100);
        
        // Update status to pending
        const pendingResult: BulkResult = {
          domain,
          recordType: data.recordType,
          status: 'pending',
          resolvedCount: 0,
          totalServers: 20,
          averageResponseTime: 0
        };
        results[i] = pendingResult;
        setBulkResults([...results]);
        
        try {
          const response = await apiRequest('POST', '/api/dns/lookup', {
            domain,
            recordType: data.recordType
          });
          
          const data_response = await response.json();
          
          results[i] = {
            domain,
            recordType: data.recordType,
            status: 'resolved',
            resolvedCount: data_response.stats.resolvedCount,
            totalServers: data_response.stats.totalServers,
            averageResponseTime: data_response.stats.averageResponseTime,
            results: data_response.results
          };
        } catch (error) {
          results[i] = {
            domain,
            recordType: data.recordType,
            status: 'failed',
            resolvedCount: 0,
            totalServers: 20,
            averageResponseTime: 0
          };
        }
        
        setBulkResults([...results]);
      }
      
      return results;
    },
    onMutate: () => {
      setIsProcessing(true);
      setProgress(0);
    },
    onSettled: () => {
      setIsProcessing(false);
      setProgress(100);
    }
  });

  const handleBulkLookup = () => {
    const domainList = domains
      .split('\n')
      .map(domain => domain.trim())
      .filter(domain => domain && domain.length > 0);
    
    if (domainList.length === 0) return;
    
    setBulkResults([]);
    bulkLookupMutation.mutate({ domains: domainList, recordType });
  };

  const exportResults = () => {
    const csv = [
      ['Domain', 'Record Type', 'Status', 'Resolved Servers', 'Total Servers', 'Avg Response Time (ms)', 'Coverage %'].join(','),
      ...bulkResults.map(result => [
        result.domain,
        result.recordType,
        result.status,
        result.resolvedCount,
        result.totalServers,
        result.averageResponseTime,
        ((result.resolvedCount / result.totalServers) * 100).toFixed(1) + '%'
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-dns-results-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Bulk DNS Lookup - Check Multiple Domains at Once | ReviewMyDNS</title>
        <meta name="description" content="Bulk DNS lookup tool to check hundreds of domains simultaneously. Perfect for IT admins, domain portfolio managers, and security professionals." />
        <meta name="keywords" content="bulk DNS lookup, mass DNS check, multiple domain lookup, DNS batch query" />
        <meta property="og:title" content="Bulk DNS Lookup - ReviewMyDNS" />
        <meta property="og:description" content="Check DNS records for multiple domains at once." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/bulk-lookup" />
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
            Bulk DNS Lookup Tool - Check Multiple Domains at Once
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            Our bulk DNS lookup tool allows you to query DNS records for hundreds of domains simultaneously. 
            Perfect for IT administrators, domain portfolio managers, and security professionals who need to 
            audit multiple domains efficiently.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Check 100+ Domains</h3>
              <p className="text-sm text-gray-600">
                Process up to 100 domains in a single batch, saving hours of manual lookups.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">All Record Types</h3>
              <p className="text-sm text-gray-600">
                Query A, AAAA, CNAME, MX, TXT, NS, and SOA records for each domain.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Export Results</h3>
              <p className="text-sm text-gray-600">
                Download comprehensive CSV reports with response times and propagation status.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">When to Use Bulk DNS Lookup</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Auditing DNS configuration across a domain portfolio</li>
            <li>Verifying DNS migration for multiple domains</li>
            <li>Checking MX records to troubleshoot email delivery issues</li>
            <li>Security audits to find misconfigured DNS records</li>
            <li>Competitive analysis of how domains are configured</li>
          </ul>
        </div>
      </section>

      <PlanGate feature="bulkLookup" requiredPlan="pro">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Domain Input</CardTitle>
                <CardDescription>
                  Enter multiple domains to check (one per line)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="example.com&#10;google.com&#10;github.com&#10;stackoverflow.com"
                  value={domains}
                  onChange={(e) => setDomains(e.target.value)}
                  rows={8}
                  className="resize-none"
                  data-testid="input-domains"
                />
                
                <Select value={recordType} onValueChange={setRecordType}>
                  <SelectTrigger data-testid="select-record-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A Record</SelectItem>
                    <SelectItem value="AAAA">AAAA Record</SelectItem>
                    <SelectItem value="CNAME">CNAME Record</SelectItem>
                    <SelectItem value="MX">MX Record</SelectItem>
                    <SelectItem value="NS">NS Record</SelectItem>
                    <SelectItem value="TXT">TXT Record</SelectItem>
                    <SelectItem value="SOA">SOA Record</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  onClick={handleBulkLookup}
                  disabled={!domains.trim() || isProcessing}
                  className="w-full"
                  data-testid="button-bulk-lookup"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Start Bulk Lookup
                    </>
                  )}
                </Button>
                
                {isProcessing && (
                  <div className="space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-gray-600 text-center">
                      {progress.toFixed(0)}% Complete
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Bulk Results</CardTitle>
                    <CardDescription>
                      DNS lookup results for all domains
                    </CardDescription>
                  </div>
                  {bulkResults.length > 0 && (
                    <Button onClick={exportResults} variant="outline" size="sm" data-testid="button-export">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {bulkResults.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No results yet. Enter domains and start lookup.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bulkResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg" data-testid={`result-row-${index}`}>
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {result.status === 'pending' && (
                              <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
                            )}
                            {result.status === 'resolved' && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {result.status === 'failed' && (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{result.domain}</p>
                            <p className="text-sm text-gray-500">{result.recordType} Record</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {result.resolvedCount}/{result.totalServers} servers
                            </p>
                            <p className="text-xs text-gray-500">
                              {result.averageResponseTime > 0 ? `${result.averageResponseTime}ms avg` : '—'}
                            </p>
                          </div>
                          <Badge variant={
                            result.status === 'resolved' ? 'default' : 
                            result.status === 'failed' ? 'destructive' : 'secondary'
                          }>
                            {result.status === 'pending' ? 'Processing' : 
                             result.status === 'resolved' ? 'Success' : 'Failed'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      </PlanGate>
    </div>
  );
}