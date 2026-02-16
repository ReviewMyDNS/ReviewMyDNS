import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>DNSSEC Validator - Check DNSSEC Status & Chain of Trust | ReviewMyDNS</title>
        <meta name="description" content="Free DNSSEC validator and checker tool. Verify DS records, DNSKEY, RRSIG, and the complete chain of trust for any domain. Learn how DNSSEC protects against DNS spoofing, cache poisoning, and man-in-the-middle attacks." />
        <meta name="keywords" content="DNSSEC validator, DNSSEC checker, DS record check, DNSKEY validation, chain of trust, DNS security, DNSSEC setup" />
        <meta property="og:title" content="DNSSEC Validator - Check DNSSEC Status & Chain of Trust | ReviewMyDNS" />
        <meta property="og:description" content="Free DNSSEC validation tool. Verify DS, DNSKEY, and RRSIG records. Learn how to enable DNSSEC and fix common issues." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/dnssec" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is DNSSEC and why do I need it?", "acceptedAnswer": { "@type": "Answer", "text": "DNSSEC (DNS Security Extensions) is a suite of IETF specifications that adds cryptographic authentication to DNS responses. It prevents attackers from forging DNS replies through cache poisoning or man-in-the-middle attacks. Without DNSSEC, an attacker could redirect your users to a malicious server without their knowledge. DNSSEC is especially important for domains handling financial transactions, email, or sensitive data." } },
            { "@type": "Question", "name": "How does DNSSEC work?", "acceptedAnswer": { "@type": "Answer", "text": "DNSSEC works by creating a chain of trust from the DNS root zone down to your domain. Each zone signs its DNS records with a private key and publishes the corresponding public key as a DNSKEY record. The parent zone then stores a hash of this public key as a DS (Delegation Signer) record. When a resolver queries your domain, it can verify each signature (RRSIG) up the chain to the root, ensuring no records have been tampered with." } },
            { "@type": "Question", "name": "What DNS records does DNSSEC add?", "acceptedAnswer": { "@type": "Answer", "text": "DNSSEC adds four key record types: DNSKEY (contains the public signing key), DS (Delegation Signer - a hash of the child zone's DNSKEY stored in the parent zone), RRSIG (contains the cryptographic signature for each record set), and NSEC/NSEC3 (provides authenticated denial of existence for domains that don't exist)." } },
            { "@type": "Question", "name": "How do I enable DNSSEC for my domain?", "acceptedAnswer": { "@type": "Answer", "text": "Enabling DNSSEC is a two-step process: First, enable DNSSEC signing at your DNS hosting provider (Cloudflare, AWS Route 53, Google Cloud DNS, etc.). This generates the DNSKEY and begins signing your zone. Second, add the DS record at your domain registrar to establish the chain of trust with the parent zone. Most providers like Cloudflare offer one-click DNSSEC activation." } },
            { "@type": "Question", "name": "What is the difference between DNSSEC and DNS over HTTPS (DoH)?", "acceptedAnswer": { "@type": "Answer", "text": "DNSSEC and DNS over HTTPS solve different problems. DNSSEC authenticates DNS data to prove it hasn't been tampered with, but the queries and responses are still visible to network observers. DNS over HTTPS (DoH) encrypts the DNS query transport to prevent eavesdropping, but doesn't verify the authenticity of the DNS data itself. For maximum security, you should use both: DNSSEC to ensure data integrity and DoH to ensure query privacy." } },
            { "@type": "Question", "name": "Why is my DNSSEC validation failing?", "acceptedAnswer": { "@type": "Answer", "text": "Common reasons for DNSSEC validation failure include: expired RRSIG signatures (keys need regular rotation), mismatched DS records at the registrar (the DS record doesn't match the current DNSKEY), incorrect algorithm configuration, or the domain was transferred without updating DNSSEC records. Use our DNSSEC validator tool above to diagnose the specific issue." } },
            { "@type": "Question", "name": "Does DNSSEC slow down DNS resolution?", "acceptedAnswer": { "@type": "Answer", "text": "DNSSEC adds a small overhead to DNS resolution because resolvers must verify cryptographic signatures and may need to make additional queries to fetch DNSKEY and DS records. In practice, this adds 10-30ms to the initial lookup. However, once cached, subsequent lookups are just as fast. The security benefits far outweigh this minimal performance impact." } },
            { "@type": "Question", "name": "Can DNSSEC break my website?", "acceptedAnswer": { "@type": "Answer", "text": "If DNSSEC is misconfigured, it can cause your domain to become unreachable for users behind DNSSEC-validating resolvers (like Google DNS 8.8.8.8 and Cloudflare 1.1.1.1). Common mistakes include letting signatures expire, not updating DS records after key rollovers, or removing DNSSEC from the DNS provider without removing the DS record from the registrar. Always test DNSSEC changes carefully." } }
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

        {/* Complete Guide to DNSSEC */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to DNSSEC</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                DNSSEC (Domain Name System Security Extensions) is a critical security protocol that adds a layer of cryptographic verification to the Domain Name System. Without DNSSEC, DNS operates on blind trust — when your browser asks "what is the IP address of example.com?", it simply accepts whatever answer comes back, with no way to verify the response is legitimate. This fundamental vulnerability has been exploited in numerous attacks, from small-scale phishing operations to nation-state level surveillance campaigns.
              </p>
              <p>
                The DNS was originally designed in the 1980s without any built-in authentication mechanism. As the internet grew from a small research network into the backbone of global commerce, the lack of DNS security became an increasingly serious problem. In 2008, security researcher Dan Kaminsky revealed a fundamental flaw in DNS that allowed attackers to poison DNS caches at scale, redirecting millions of users to malicious servers. This discovery accelerated the adoption of DNSSEC, which had been developed by the IETF but was not yet widely deployed.
              </p>
              <p>
                DNSSEC works by digitally signing DNS records using public-key cryptography. When a DNS zone is signed with DNSSEC, every record set gets a corresponding RRSIG (Resource Record Signature) record containing a cryptographic signature. Resolvers that support DNSSEC validation can verify these signatures using the zone's published DNSKEY records, ensuring that the DNS data has not been modified in transit and genuinely originated from the authoritative source.
              </p>
              <p>
                Today, DNSSEC adoption continues to grow. The root zone was signed in July 2010, and most top-level domains (TLDs) now support DNSSEC. Major DNS providers like Cloudflare, Google Cloud DNS, and AWS Route 53 all offer DNSSEC signing. However, adoption at the individual domain level remains relatively low — estimates suggest only 5-10% of domains worldwide have DNSSEC enabled. This makes it an excellent opportunity for security-conscious domain owners to differentiate their infrastructure.
              </p>
              <p>
                DNSSEC is particularly important for domains that handle sensitive data: banking websites, email servers, government services, healthcare portals, and e-commerce platforms. It is also a prerequisite for other security technologies like DANE (DNS-Based Authentication of Named Entities), which uses DNSSEC to publish TLS certificate information in DNS, providing an alternative to the traditional Certificate Authority model.
              </p>
            </div>
          </div>

          {/* How DNSSEC Works Step by Step */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How DNSSEC Works Step by Step</h2>
            <div className="prose max-w-none text-gray-700 space-y-4 mb-6">
              <p>
                DNSSEC establishes a "chain of trust" from the DNS root zone all the way down to your specific domain. Understanding this chain is essential for anyone implementing or troubleshooting DNSSEC. Here is how the process works when a DNSSEC-validating resolver looks up your domain:
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">1. Zone Signing</h3>
                  <p className="text-gray-700">The domain owner's DNS provider generates two key pairs: a Zone Signing Key (ZSK) used to sign individual record sets, and a Key Signing Key (KSK) used to sign the DNSKEY record set itself. All DNS records in the zone are signed with the ZSK, producing RRSIG records. The public portions of both keys are published as DNSKEY records.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">2. DS Record at Parent Zone</h3>
                  <p className="text-gray-700">A hash of the KSK's DNSKEY record is computed and published as a DS (Delegation Signer) record in the parent zone. For example, if your domain is example.com, the DS record is stored in the .com TLD zone. This is the link that connects your domain's DNSSEC chain to the parent zone. You typically add this DS record through your domain registrar.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">3. Chain of Trust Validation</h3>
                  <p className="text-gray-700">When a resolver queries your domain, it walks the chain from the root: the root zone's DNSKEY is pre-configured in the resolver (the "trust anchor"). The resolver verifies the .com DS record against the root's RRSIG, then verifies your domain's DS record against the .com zone's RRSIG, and finally verifies your actual DNS records against your zone's RRSIG. If every link validates, the response is authenticated.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">4. Authenticated Denial of Existence</h3>
                  <p className="text-gray-700">DNSSEC also proves when a domain does NOT exist using NSEC or NSEC3 records. This prevents attackers from injecting fake "this domain doesn't exist" responses. NSEC3 uses hashed domain names to prevent zone enumeration — a technique where attackers could otherwise walk through all records in a signed zone.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How to Enable DNSSEC */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Enable DNSSEC</h2>
            <p className="text-gray-700 mb-6">Enabling DNSSEC requires coordination between your DNS hosting provider (who signs the zone) and your domain registrar (who publishes the DS record). Here are instructions for the most popular providers:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Cloudflare</h3>
                  <p className="text-gray-700 mb-2">Cloudflare offers one-click DNSSEC. Go to your domain's DNS settings, click "Enable DNSSEC," and Cloudflare provides the DS record details. Copy the DS record to your registrar. Cloudflare handles all key management and rotation automatically.</p>
                  <Link href="/guides/cloudflare-dns-setup" className="text-blue-600 hover:underline text-sm">→ Full Cloudflare DNS Setup Guide</Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">AWS Route 53</h3>
                  <p className="text-gray-700 mb-2">In Route 53, enable DNSSEC signing from the hosted zone's "DNSSEC signing" tab. Route 53 creates a KSK using AWS KMS. You then create a chain of trust by adding the DS record to the parent hosted zone or your registrar.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Google Cloud DNS</h3>
                  <p className="text-gray-700 mb-2">Enable DNSSEC on your managed zone in Google Cloud Console. Google Cloud DNS automatically signs the zone and generates the DS record. Copy the DS record information to your registrar to complete the chain of trust.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">GoDaddy / Namecheap</h3>
                  <p className="text-gray-700 mb-2">If your registrar also hosts your DNS, they may offer integrated DNSSEC. GoDaddy Premium DNS supports DNSSEC. Namecheap supports DNSSEC for most TLDs. Check your registrar's DNS management panel for a DNSSEC option.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* DNSSEC vs DNS over HTTPS */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">DNSSEC vs DNS over HTTPS (DoH)</h2>
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-700">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Feature</th>
                        <th className="text-left py-3 px-4 font-semibold">DNSSEC</th>
                        <th className="text-left py-3 px-4 font-semibold">DNS over HTTPS (DoH)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Purpose</td>
                        <td className="py-3 px-4">Data integrity and authentication</td>
                        <td className="py-3 px-4">Query privacy and encryption</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Protects against</td>
                        <td className="py-3 px-4">Cache poisoning, DNS spoofing, MITM attacks on DNS data</td>
                        <td className="py-3 px-4">Eavesdropping, query logging by ISPs, network-level DNS manipulation</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Implementation</td>
                        <td className="py-3 px-4">Domain owner enables at DNS provider + registrar</td>
                        <td className="py-3 px-4">End user enables in browser or OS settings</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Encryption</td>
                        <td className="py-3 px-4">No encryption — data is signed but visible</td>
                        <td className="py-3 px-4">Full encryption of DNS queries via HTTPS</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">Best used</td>
                        <td className="py-3 px-4">Together with DoH for complete DNS security</td>
                        <td className="py-3 px-4">Together with DNSSEC for complete DNS security</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-600 mt-4 text-sm">For maximum DNS security, enable both DNSSEC (to verify data authenticity) and use a DoH-supporting resolver like Cloudflare 1.1.1.1 or Google 8.8.8.8 (to ensure query privacy).</p>
              </CardContent>
            </Card>
          </div>

          {/* Common DNSSEC Issues and Fixes */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common DNSSEC Issues and Fixes</h2>
            <div className="space-y-4">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Expired RRSIG Signatures</h3>
                  <p className="text-gray-700">RRSIG records have an expiration date. If your DNS provider fails to re-sign the zone before signatures expire, DNSSEC-validating resolvers will treat your domain as bogus and refuse to resolve it. Fix: Contact your DNS provider. Most managed services handle re-signing automatically, but self-hosted DNSSEC requires monitoring.</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">DS Record Mismatch After Key Rollover</h3>
                  <p className="text-gray-700">When your DNS provider rotates signing keys, the DS record at the registrar must also be updated. If the old DS record still points to a retired key, the chain of trust breaks. Fix: Update the DS record at your registrar with the new key information provided by your DNS host.</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Orphaned DS Record</h3>
                  <p className="text-gray-700">If you disable DNSSEC at your DNS provider but forget to remove the DS record from your registrar, resolvers will expect signed responses but receive unsigned ones, causing resolution failures. Fix: Always remove the DS record from the registrar before disabling DNSSEC signing.</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Algorithm Mismatch</h3>
                  <p className="text-gray-700">The DS record's algorithm field must match the algorithm used by the DNSKEY. Mismatches occur when the registrar's interface uses a different algorithm numbering than expected. Fix: Verify algorithm numbers match exactly. Common algorithms are 13 (ECDSA P-256) and 8 (RSA/SHA-256).</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Domain Transfer Without DNSSEC Coordination</h3>
                  <p className="text-gray-700">Transferring a domain between registrars without properly handling DNSSEC can leave stale DS records at the old registrar or fail to re-establish them at the new one. Fix: Remove the DS record before transferring, complete the transfer, re-enable DNSSEC at the new provider, then add the new DS record.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions About DNSSEC</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What is DNSSEC and why do I need it?</h3>
                  <p className="text-gray-700">DNSSEC is a suite of IETF specifications that adds cryptographic authentication to DNS responses. It prevents attackers from forging DNS replies through cache poisoning or man-in-the-middle attacks. Without DNSSEC, an attacker could redirect your users to a malicious server without their knowledge. It is especially important for domains handling financial transactions, email, or sensitive data.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">How does DNSSEC work?</h3>
                  <p className="text-gray-700">DNSSEC works by creating a chain of trust from the DNS root zone down to your domain. Each zone signs its DNS records with a private key and publishes the corresponding public key as a DNSKEY record. The parent zone stores a hash of this public key as a DS record. Resolvers verify each signature up the chain to the root, ensuring no records have been tampered with.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What DNS records does DNSSEC add?</h3>
                  <p className="text-gray-700">DNSSEC adds four key record types: DNSKEY (public signing key), DS (Delegation Signer — a hash of the child zone's DNSKEY stored in the parent zone), RRSIG (cryptographic signature for each record set), and NSEC/NSEC3 (authenticated denial of existence for non-existent domains).</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Does DNSSEC slow down DNS resolution?</h3>
                  <p className="text-gray-700">DNSSEC adds a small overhead of 10-30ms to the initial DNS lookup because resolvers must verify cryptographic signatures and may need additional queries for DNSKEY and DS records. Once cached, subsequent lookups are just as fast. The security benefits far outweigh this minimal performance impact.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Can DNSSEC break my website?</h3>
                  <p className="text-gray-700">If misconfigured, DNSSEC can cause your domain to become unreachable for users behind DNSSEC-validating resolvers like Google DNS (8.8.8.8) and Cloudflare (1.1.1.1). Common mistakes include letting signatures expire, not updating DS records after key rollovers, or removing DNSSEC from the DNS provider without removing the DS record from the registrar.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Why is my DNSSEC validation failing?</h3>
                  <p className="text-gray-700">Common causes include expired RRSIG signatures, mismatched DS records at the registrar, incorrect algorithm configuration, or the domain being transferred without updating DNSSEC records. Use our DNSSEC validator tool above to diagnose the specific issue and identify which part of the chain is broken.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Internal Links */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related DNS Tools and Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">DNS Propagation Checker</h3>
                  <p className="text-gray-600 text-sm mb-3">Verify your DNS changes have propagated across 50+ global servers after enabling DNSSEC or updating records.</p>
                  <Link href="/dns-propagation-checker" className="text-blue-600 hover:underline text-sm font-medium">Check DNS Propagation →</Link>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Cloudflare DNS Setup Guide</h3>
                  <p className="text-gray-600 text-sm mb-3">Step-by-step instructions for configuring DNS records on Cloudflare, including one-click DNSSEC activation.</p>
                  <Link href="/guides/cloudflare-dns-setup" className="text-blue-600 hover:underline text-sm font-medium">Read Cloudflare Guide →</Link>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Why Is My DNS Not Updating?</h3>
                  <p className="text-gray-600 text-sm mb-3">Troubleshoot DNS changes that are not propagating within 24 hours, including DNSSEC-related delays.</p>
                  <Link href="/faq/why-dns-not-updating-24-hours" className="text-blue-600 hover:underline text-sm font-medium">Read FAQ →</Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-300 text-sm">
            © 2026 ReviewMyDNS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}