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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How many domains can I check at once with bulk DNS lookup?", "acceptedAnswer": { "@type": "Answer", "text": "Our bulk DNS lookup tool supports up to 100 domains per batch on Pro plans. Enter one domain per line in the input field, select the record type you want to query, and click Start Bulk Lookup. Results are processed sequentially with real-time progress updates for each domain." } },
            { "@type": "Question", "name": "What record types does bulk DNS lookup support?", "acceptedAnswer": { "@type": "Answer", "text": "Bulk DNS lookup supports all major record types: A (IPv4 addresses), AAAA (IPv6 addresses), CNAME (canonical names), MX (mail exchange servers), NS (nameservers), TXT (text records for SPF, DKIM, verification), and SOA (start of authority). Each batch query checks one record type across all domains." } },
            { "@type": "Question", "name": "Can I export bulk DNS lookup results?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, after completing a bulk lookup, click the Export CSV button to download a comprehensive report. The CSV includes domain name, record type, status (resolved/failed), number of responding servers, total servers tested, average response time, and coverage percentage for each domain." } },
            { "@type": "Question", "name": "Who uses bulk DNS lookup tools?", "acceptedAnswer": { "@type": "Answer", "text": "Bulk DNS lookup tools are commonly used by IT administrators auditing corporate domain portfolios, web agencies managing client domains, security professionals conducting DNS audits, domain investors analyzing large domain portfolios, and DevOps teams verifying DNS migrations across multiple services." } },
            { "@type": "Question", "name": "Is bulk DNS lookup free?", "acceptedAnswer": { "@type": "Answer", "text": "Bulk DNS lookup is available on our Pro plan. Individual DNS lookups are free with 50 queries per day on the free tier. The Pro plan provides unlimited individual lookups and access to bulk lookup, DNS monitoring, comparison tools, and CSV export functionality." } },
            { "@type": "Question", "name": "How accurate is the bulk DNS lookup?", "acceptedAnswer": { "@type": "Answer", "text": "Our bulk DNS lookup queries 20+ authoritative and recursive DNS servers worldwide for each domain, providing a comprehensive view of DNS resolution. Results show how many servers successfully resolved each domain, the average response time, and any failures. This multi-server approach ensures accurate, real-world results rather than checking a single resolver." } }
          ]
        }) }} />
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

      {/* SEO Educational Content */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Bulk DNS Lookup Works</h2>
          <div className="text-gray-700 space-y-4 mb-8">
            <p>
              Bulk DNS lookup automates the process of querying DNS records for multiple domains simultaneously. Instead of manually checking one domain at a time, you can enter up to 100 domains and our system will query each one against 20+ DNS servers worldwide. For each domain, the tool performs a full DNS resolution, records the responses from each server, measures response times, and calculates the propagation coverage percentage.
            </p>
            <p>
              The process works sequentially to avoid overwhelming DNS servers and to comply with rate limits. As each domain is resolved, you see real-time status updates showing pending, resolved, or failed states. Once complete, all results can be exported as a CSV file for further analysis in spreadsheet software, reporting tools, or automated workflows.
            </p>
            <p>
              Under the hood, bulk DNS lookup uses the same resolution infrastructure as our single-domain DNS propagation checker. Each query is distributed across authoritative and recursive DNS servers across North America, Europe, Asia-Pacific, and other regions. This gives you a true global view of DNS health, not just what a single local resolver reports.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices for Bulk DNS Auditing</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Start with A Records</h3>
              <p className="text-gray-700">Begin your audit by checking A records across all domains. This confirms that every domain resolves to an IP address. Domains returning zero resolved servers may be expired, parked, or misconfigured.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Check MX Records Separately</h3>
              <p className="text-gray-700">Run a separate batch for MX records to verify email configuration. Missing or incorrect MX records are a common cause of email delivery failures. Compare results against your expected mail server configuration.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Verify TXT Records for Security</h3>
              <p className="text-gray-700">TXT record audits reveal SPF, DKIM, and DMARC configurations. Missing email authentication records make domains vulnerable to spoofing. Run TXT checks to identify domains lacking proper email security.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Export and Compare Over Time</h3>
              <p className="text-gray-700">Export CSV results regularly and compare them to previous audits. This helps detect unauthorized DNS changes, expired records, or configuration drift that could indicate a security compromise or administrative error.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Monitor Response Times</h3>
              <p className="text-gray-700">Average response times above 500ms may indicate DNS performance issues. Consistently slow responses could mean your DNS provider is overloaded, your domain has too many records, or there are network routing problems.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Use Cases for Bulk DNS Checking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">IT Administrators</h3>
                <p className="text-gray-700 text-sm">Manage corporate domain portfolios by auditing DNS records across all company domains. Verify that internal services, email, and web properties resolve correctly. Detect unauthorized DNS changes that could indicate a security breach. Schedule regular audits to maintain DNS hygiene across your organization.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Web Agencies</h3>
                <p className="text-gray-700 text-sm">Agencies managing DNS for dozens of client domains can verify all configurations in minutes instead of hours. After a DNS migration or hosting change, bulk check confirms all domains propagated correctly. Use CSV exports to provide clients with DNS health reports as part of managed services.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Security Teams</h3>
                <p className="text-gray-700 text-sm">Conduct DNS audits to find misconfigured records, dangling CNAME entries pointing to decommissioned services, or domains with missing email authentication (SPF/DKIM/DMARC). Bulk DNS checks are essential for identifying subdomain takeover vulnerabilities across large domain portfolios.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Domain Investors</h3>
                <p className="text-gray-700 text-sm">Monitor large domain portfolios to ensure all domains remain active and properly configured. Identify domains that have stopped resolving (potentially expired or seized). Verify parking page DNS is correctly configured for monetized domains in your portfolio.</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">How many domains can I check at once?</h3>
              <p className="text-gray-700">Our bulk DNS lookup supports up to 100 domains per batch on Pro plans. Enter one domain per line and select the record type you want to query. Results are processed sequentially with real-time progress updates.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">What record types does bulk lookup support?</h3>
              <p className="text-gray-700">All major DNS record types: A, AAAA, CNAME, MX, NS, TXT, and SOA. Each batch checks one record type across all domains. Run separate batches for different record types.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Can I export the results?</h3>
              <p className="text-gray-700">Yes, click "Export CSV" after the lookup completes. The CSV includes domain name, record type, status, server counts, average response time, and coverage percentage.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">What does coverage percentage mean?</h3>
              <p className="text-gray-700">Coverage shows what percentage of queried DNS servers successfully resolved the domain. 100% means all servers returned results. Lower percentages may indicate propagation issues, regional outages, or misconfigured DNS.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Why did some domains fail?</h3>
              <p className="text-gray-700">Domains may fail due to: expired domain registration, incorrect nameserver delegation, DNS provider outages, or the domain not having the requested record type configured. Check failed domains individually for more details.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">How is this different from the single DNS checker?</h3>
              <p className="text-gray-700">The single DNS checker provides detailed propagation results from 50+ servers for one domain with a visual map. Bulk lookup checks multiple domains against 20+ servers with summary statistics, optimized for auditing large domain portfolios efficiently.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related DNS Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">DNS Propagation Checker</h3>
              <p className="text-sm text-gray-600 mb-2">Check detailed propagation for a single domain across 50+ global servers with an interactive map.</p>
              <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline text-sm">Check Propagation →</Link>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Compare DNS Providers</h3>
              <p className="text-sm text-gray-600 mb-2">See how Google DNS, Cloudflare, OpenDNS, and Quad9 resolve your domains differently.</p>
              <Link href="/compare" className="text-blue-600 hover:underline text-sm">Compare Providers →</Link>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">DNS Setup Guides</h3>
              <p className="text-sm text-gray-600 mb-2">Step-by-step guides for configuring DNS on GoDaddy, Cloudflare, Namecheap, and more.</p>
              <Link href="/guides" className="text-blue-600 hover:underline text-sm">Browse Guides →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}