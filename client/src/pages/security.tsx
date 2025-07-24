import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { Link } from "wouter";

interface SecurityCheck {
  category: string;
  test: string;
  status: 'pass' | 'fail' | 'warning' | 'info';
  description: string;
  recommendation?: string;
}

export default function Security() {
  const [domain, setDomain] = useState("example.com");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const runSecurityScan = async () => {
    setIsScanning(true);
    // Simulate scan time
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  // Mock security check results
  const securityChecks: SecurityCheck[] = [
    {
      category: "DNS Infrastructure",
      test: "Multiple DNS Servers",
      status: "pass",
      description: "Domain uses multiple authoritative DNS servers",
      recommendation: "Good redundancy setup detected"
    },
    {
      category: "DNS Infrastructure", 
      test: "DNS Response Consistency",
      status: "pass",
      description: "All DNS servers return consistent responses"
    },
    {
      category: "Security Configuration",
      test: "DNSSEC Status",
      status: "fail",
      description: "DNSSEC is not enabled for this domain",
      recommendation: "Enable DNSSEC to prevent DNS spoofing attacks"
    },
    {
      category: "Security Configuration",
      test: "SPF Record",
      status: "pass",
      description: "Valid SPF record found"
    },
    {
      category: "Security Configuration",
      test: "DMARC Policy",
      status: "warning",
      description: "DMARC policy is set to 'none'",
      recommendation: "Consider setting DMARC policy to 'quarantine' or 'reject'"
    },
    {
      category: "Security Configuration",
      test: "DKIM Signatures",
      status: "pass",
      description: "DKIM signatures are properly configured"
    },
    {
      category: "Network Security",
      test: "Open DNS Resolvers",
      status: "pass",
      description: "No open DNS resolvers detected"
    },
    {
      category: "Network Security",
      test: "DNS Amplification Risk",
      status: "pass",
      description: "DNS servers are not vulnerable to amplification attacks"
    },
    {
      category: "Best Practices",
      test: "TTL Configuration",
      status: "info",
      description: "TTL values are within recommended ranges",
      recommendation: "Consider shorter TTLs for critical records"
    },
    {
      category: "Best Practices",
      test: "Wildcard DNS Usage",
      status: "warning",
      description: "Wildcard DNS records detected",
      recommendation: "Review wildcard usage for security implications"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'fail': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass': return <Badge className="bg-green-100 text-green-800">Pass</Badge>;
      case 'fail': return <Badge variant="destructive">Fail</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'info': return <Badge variant="secondary">Info</Badge>;
      default: return null;
    }
  };

  const groupedChecks = securityChecks.reduce((acc, check) => {
    if (!acc[check.category]) {
      acc[check.category] = [];
    }
    acc[check.category].push(check);
    return acc;
  }, {} as Record<string, SecurityCheck[]>);

  const summary = {
    total: securityChecks.length,
    passed: securityChecks.filter(c => c.status === 'pass').length,
    failed: securityChecks.filter(c => c.status === 'fail').length,
    warnings: securityChecks.filter(c => c.status === 'warning').length
  };

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
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">DNS Security Check</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scan Control */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              DNS Security Assessment
            </CardTitle>
            <CardDescription>
              Comprehensive security analysis of DNS configuration and best practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                  Domain to Analyze
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
                onClick={runSecurityScan}
                disabled={isScanning}
                className="whitespace-nowrap"
              >
                {isScanning ? "Scanning..." : "Run Security Scan"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scanning Status */}
        {isScanning && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center">
                <div className="animate-pulse flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-blue-800 font-medium">
                    Analyzing DNS security for {domain}...
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Summary */}
        {scanComplete && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gray-900">{summary.total}</div>
                <div className="text-sm text-gray-500">Total Checks</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{summary.passed}</div>
                <div className="text-sm text-gray-500">Passed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">{summary.failed}</div>
                <div className="text-sm text-gray-500">Failed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600">{summary.warnings}</div>
                <div className="text-sm text-gray-500">Warnings</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security Check Results */}
        {scanComplete && (
          <div className="space-y-8">
            {Object.entries(groupedChecks).map(([category, checks]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                  <CardDescription>
                    Security checks for {category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {checks.map((check, index) => (
                      <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(check.status)}
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{check.test}</div>
                            <div className="text-sm text-gray-600 mt-1">{check.description}</div>
                            {check.recommendation && (
                              <div className="text-sm text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                                <strong>Recommendation:</strong> {check.recommendation}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          {getStatusBadge(check.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Security Tips */}
        {scanComplete && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Security Recommendations</CardTitle>
              <CardDescription>
                Best practices to improve your DNS security posture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Enable DNSSEC</h4>
                  <p className="text-sm text-gray-600">
                    Implement DNSSEC to protect against DNS spoofing and cache poisoning attacks.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Configure Email Security</h4>
                  <p className="text-sm text-gray-600">
                    Set up SPF, DKIM, and DMARC records to prevent email spoofing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Monitor DNS Changes</h4>
                  <p className="text-sm text-gray-600">
                    Regularly monitor your DNS records for unauthorized changes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Use Multiple DNS Providers</h4>
                  <p className="text-sm text-gray-600">
                    Implement DNS redundancy with multiple authoritative servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}