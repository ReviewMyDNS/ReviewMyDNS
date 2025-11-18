import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { PerformanceChart } from "@/components/performance-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, CheckCircle2, Clock, Shield } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function DnsPropagationChecker() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Free DNS Propagation Checker - Check DNS Records Globally | ReviewMyDNS</title>
        <meta name="description" content="Instant DNS propagation checker. Verify DNS changes across 50+ global servers in real-time. Check A, AAAA, MX, CNAME, TXT, NS records for free. Fast and accurate DNS testing tool." />
        <meta name="keywords" content="dns propagation checker, check dns propagation, dns propagation test, verify dns changes, global dns checker, dns lookup tool" />
        <link rel="canonical" href="https://reviewmydns.com/dns-propagation-checker" />
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Free DNS Propagation Checker
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Check DNS propagation across 50+ global servers instantly. Verify your DNS changes have propagated worldwide with our free DNS testing tool.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">50+ Global Servers</h3>
                  <p className="text-sm text-gray-600">Check DNS from servers worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Real-Time Results</h3>
                  <p className="text-sm text-gray-600">Instant propagation status</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">All Record Types</h3>
                  <p className="text-sm text-gray-600">A, AAAA, MX, CNAME, TXT, NS & more</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">100% Free</h3>
                  <p className="text-sm text-gray-600">50 lookups/day forever</p>
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

            <section className="pb-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <ResultsTable results={lookupResults} />
              </div>
            </section>
          </>
        )}

        {/* SEO Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">What is DNS Propagation?</h2>
            <p className="text-gray-700 mb-4">
              DNS propagation is the time it takes for DNS changes to update across the internet's DNS servers. When you update DNS records (like changing nameservers or adding A records), these changes don't happen instantly everywhere.
            </p>
            <p className="text-gray-700 mb-6">
              Our DNS propagation checker lets you verify these changes across 50+ global DNS servers, so you know exactly when your DNS updates have propagated worldwide.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Check DNS Propagation</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Enter your domain name above</li>
              <li>Select the DNS record type you want to check (A, AAAA, MX, etc.)</li>
              <li>Click "Check DNS" to see real-time propagation status</li>
              <li>View results from 50+ global DNS servers on an interactive map</li>
            </ol>

            <h2 className="text-3xl font-bold mb-6 mt-12">Why Use Our DNS Checker?</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
              <li><strong>Global Coverage:</strong> Check DNS from 50+ servers across all continents</li>
              <li><strong>All Record Types:</strong> Support for A, AAAA, MX, CNAME, TXT, NS, SOA, and more</li>
              <li><strong>Real-Time Results:</strong> See propagation status within seconds</li>
              <li><strong>Visual Map:</strong> Interactive world map shows which regions have propagated</li>
              <li><strong>Free Forever:</strong> 50 lookups per day at no cost</li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need More DNS Checks?</h2>
            <p className="text-xl mb-8">Upgrade to Pro for unlimited lookups, monitoring, and analytics</p>
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
