import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Globe, Shield, Lock } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function TxtRecordChecker() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Free TXT Record Checker - Verify SPF, DKIM, DMARC Records | ReviewMyDNS</title>
        <meta name="description" content="Free TXT record checker tool. Verify SPF, DKIM, DMARC, and other TXT DNS records across 50+ global servers. Test email authentication and domain verification instantly." />
        <meta name="keywords" content="txt record checker, check txt records, spf lookup, dkim checker, dmarc verification, dns txt records" />
        <link rel="canonical" href="https://reviewmydns.com/txt-record-checker" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Logo size="sm" className="mr-2" />
                <span className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</span>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Pricing
                </Link>
              </nav>
              
              <div className="flex items-center space-x-2">
                <Link href="/signin">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                    Sign In
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 hidden sm:inline-flex">
                    Upgrade
                  </Button>
                </Link>
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block mb-6">
              <FileText className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Free TXT Record Checker
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Verify TXT DNS records globally. Check SPF, DKIM, DMARC, domain verification records, and more across 50+ DNS servers worldwide.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <FileText className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">TXT Record Lookup</h3>
                  <p className="text-sm text-gray-600">Check all TXT records instantly</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Lock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">SPF/DKIM/DMARC</h3>
                  <p className="text-sm text-gray-600">Verify email authentication</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Global Coverage</h3>
                  <p className="text-sm text-gray-600">50+ worldwide DNS servers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">100% Free</h3>
                  <p className="text-sm text-gray-600">50 lookups/day at no cost</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* DNS Lookup Form */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <DnsLookupForm onLookupComplete={handleLookupComplete} isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
        </section>

        {/* Results Section */}
        {lookupResults && (
          <>
            <section className="pb-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <PropagationMap results={lookupResults.results || []} />
              </div>
            </section>

            <section className="pb-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <ResultsTable results={lookupResults} />
              </div>
            </section>
          </>
        )}

        {/* SEO Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">What are TXT Records?</h2>
            <p className="text-gray-700 mb-4">
              TXT (Text) records are DNS records that allow domain owners to store arbitrary text data. They're commonly used for email authentication (SPF, DKIM, DMARC), domain verification for services like Google Workspace, and other security-related purposes.
            </p>
            <p className="text-gray-700 mb-6">
              TXT records are essential for email security and preventing spam, as they help verify that emails are actually coming from your domain.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common TXT Record Uses</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
              <li><strong>SPF Records:</strong> Specify which mail servers can send email for your domain</li>
              <li><strong>DKIM Records:</strong> Add digital signatures to verify email authenticity</li>
              <li><strong>DMARC Records:</strong> Set policies for how to handle failed authentication</li>
              <li><strong>Domain Verification:</strong> Prove ownership to Google, Microsoft, etc.</li>
              <li><strong>Site Verification:</strong> Verify your site for various services</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Check TXT Records</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Enter your domain name in the checker above</li>
              <li>Select "TXT" as the record type (pre-selected for you)</li>
              <li>Click "Check DNS" to query globally</li>
              <li>Review all TXT records configured for your domain</li>
            </ol>

            <h2 className="text-3xl font-bold mb-6 mt-12">SPF Record Example</h2>
            <p className="text-gray-700 mb-4">
              SPF (Sender Policy Framework) records list authorized mail servers:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-6">
              <p>example.com. TXT "v=spf1 include:_spf.google.com ~all"</p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">DMARC Record Example</h2>
            <p className="text-gray-700 mb-4">
              DMARC (Domain-based Message Authentication) policies:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-6">
              <p>_dmarc.example.com. TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Monitor TXT Record Changes</h2>
            <p className="text-xl mb-8">Get instant alerts when SPF, DKIM, or DMARC records change with Pro monitoring</p>
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
