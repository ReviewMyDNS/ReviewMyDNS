import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";

interface DNSSECRecord {
  type: string;
  algorithm: string;
  keyTag: string;
  digest: string;
  status: 'valid' | 'invalid' | 'missing';
}

interface DNSSECValidation {
  domain: string;
  enabled: boolean;
  chainOfTrust: boolean;
  records: DNSSECRecord[];
  errors: string[];
  warnings: string[];
}

export default function DNSSEC() {
  const [domain, setDomain] = useState("cloudflare.com");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<DNSSECValidation | null>(null);

  const validateDNSSEC = async () => {
    setIsValidating(true);
    
    // Simulate validation
    setTimeout(() => {
      const mockResult: DNSSECValidation = {
        domain: domain,
        enabled: true,
        chainOfTrust: true,
        records: [
          {
            type: "DS",
            algorithm: "RSA/SHA-256",
            keyTag: "2371",
            digest: "32996839a6d808afe3eb1bd058a1e4",
            status: "valid"
          },
          {
            type: "DNSKEY", 
            algorithm: "RSA/SHA-256",
            keyTag: "34505",
            digest: "ab1234567890abcdef1234567890ab",
            status: "valid"
          },
          {
            type: "RRSIG",
            algorithm: "RSA/SHA-256", 
            keyTag: "34505",
            digest: "cd9876543210cdef9876543210cd98",
            status: "valid"
          }
        ],
        errors: [],
        warnings: domain === "example.com" ? ["DNSSEC validation chain has expired signatures"] : []
      };

      if (domain === "example.com") {
        mockResult.enabled = false;
        mockResult.chainOfTrust = false;
        mockResult.records = [];
        mockResult.errors = ["DNSSEC is not enabled for this domain"];
      }

      setValidationResult(mockResult);
      setIsValidating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Validation Control */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              DNSSEC Validation
            </CardTitle>
            <CardDescription>
              Validate DNSSEC implementation and check digital signature chains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                  Domain to Validate
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
                onClick={validateDNSSEC}
                disabled={isValidating}
                className="whitespace-nowrap"
              >
                {isValidating ? "Validating..." : "Validate DNSSEC"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Validation Status */}
        {isValidating && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center">
                <div className="animate-pulse flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-blue-800 font-medium">
                    Validating DNSSEC for {domain}...
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Validation Results */}
        {validationResult && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>DNSSEC Status for {validationResult.domain}</span>
                  <Badge 
                    variant={validationResult.enabled ? "default" : "destructive"}
                    className="ml-2"
                  >
                    {validationResult.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    {validationResult.enabled ? 
                      <CheckCircle className="h-8 w-8 text-green-600" /> : 
                      <XCircle className="h-8 w-8 text-red-600" />
                    }
                    <div>
                      <div className="font-semibold">DNSSEC Enabled</div>
                      <div className="text-sm text-gray-500">
                        {validationResult.enabled ? "Domain has DNSSEC enabled" : "DNSSEC not configured"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {validationResult.chainOfTrust ? 
                      <CheckCircle className="h-8 w-8 text-green-600" /> : 
                      <XCircle className="h-8 w-8 text-red-600" />
                    }
                    <div>
                      <div className="font-semibold">Chain of Trust</div>
                      <div className="text-sm text-gray-500">
                        {validationResult.chainOfTrust ? "Valid signature chain" : "Broken or missing"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {validationResult.errors.length === 0 ? 
                      <CheckCircle className="h-8 w-8 text-green-600" /> : 
                      <XCircle className="h-8 w-8 text-red-600" />
                    }
                    <div>
                      <div className="font-semibold">Validation Status</div>
                      <div className="text-sm text-gray-500">
                        {validationResult.errors.length === 0 ? "No errors found" : `${validationResult.errors.length} errors`}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DNSSEC Records */}
            {validationResult.records.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>DNSSEC Records</CardTitle>
                  <CardDescription>
                    Cryptographic records found for {validationResult.domain}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {validationResult.records.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          {record.status === 'valid' ? 
                            <CheckCircle className="h-5 w-5 text-green-600" /> : 
                            <XCircle className="h-5 w-5 text-red-600" />
                          }
                          <div>
                            <div className="font-medium">{record.type} Record</div>
                            <div className="text-sm text-gray-600">
                              Algorithm: {record.algorithm} | Key Tag: {record.keyTag}
                            </div>
                            <div className="text-xs text-gray-500 font-mono mt-1">
                              {record.digest.substring(0, 40)}...
                            </div>
                          </div>
                        </div>
                        <Badge variant={record.status === 'valid' ? 'default' : 'destructive'}>
                          {record.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Errors and Warnings */}
            {(validationResult.errors.length > 0 || validationResult.warnings.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Issues Found</CardTitle>
                  <CardDescription>
                    Errors and warnings in DNSSEC configuration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {validationResult.errors.map((error, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-red-800">Error</div>
                          <div className="text-sm text-red-700">{error}</div>
                        </div>
                      </div>
                    ))}
                    
                    {validationResult.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-yellow-800">Warning</div>
                          <div className="text-sm text-yellow-700">{warning}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* DNSSEC Information */}
            <Card>
              <CardHeader>
                <CardTitle>About DNSSEC</CardTitle>
                <CardDescription>
                  Understanding DNS Security Extensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What is DNSSEC?</h4>
                    <p className="text-sm text-gray-600">
                      DNSSEC (DNS Security Extensions) adds cryptographic signatures to DNS records, 
                      preventing DNS spoofing and cache poisoning attacks.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Prevents DNS cache poisoning</li>
                      <li>• Protects against man-in-the-middle attacks</li>
                      <li>• Ensures DNS response authenticity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Record Types</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>DS:</strong> Delegation Signer</li>
                      <li>• <strong>DNSKEY:</strong> Public Key</li>
                      <li>• <strong>RRSIG:</strong> Resource Record Signature</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Implementation</h4>
                    <p className="text-sm text-gray-600">
                      DNSSEC requires coordination between domain registrar, 
                      DNS hosting provider, and proper key management.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}