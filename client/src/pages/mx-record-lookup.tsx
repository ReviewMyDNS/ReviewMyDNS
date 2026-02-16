import { useState } from "react";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Globe, Shield, Clock } from "lucide-react";
import { Link } from "wouter";
import type { DnsLookupWithResults } from "@shared/schema";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Helmet } from "react-helmet-async";

export default function MxRecordLookup() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Free MX Record Lookup (2026) - Check Mail Server DNS Instantly | ReviewMyDNS</title>
        <meta name="description" content="Look up MX records across 50+ global servers in seconds. Troubleshoot email delivery issues, verify mail server configuration, and check email routing for any domain." />
        <meta name="keywords" content="mx record lookup, check mx records, mail server dns, email dns lookup, mx record checker, verify email dns" />
        <link rel="canonical" href="https://reviewmydns.com/mx-record-lookup" />
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
              <Mail className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Free MX Record Lookup Tool
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Check MX (Mail Exchange) records globally. Verify email server configuration, troubleshoot delivery issues, and test mail routing across 50+ DNS servers worldwide.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Mail className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Email Server Check</h3>
                  <p className="text-sm text-gray-600">Verify mail server DNS records</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Global Testing</h3>
                  <p className="text-sm text-gray-600">50+ worldwide DNS servers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-600">Real-time MX record analysis</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Free to Use</h3>
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
            <h2 className="text-3xl font-bold mb-6">What are MX Records?</h2>
            <p className="text-gray-700 mb-4">
              MX (Mail Exchange) records are DNS records that specify which mail servers are responsible for accepting email messages on behalf of your domain. They direct email to the correct mail server and include a priority value to determine the order in which servers should be used.
            </p>
            <p className="text-gray-700 mb-6">
              When someone sends an email to your domain, their mail server queries DNS for your MX records to find out where to deliver the message.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">How to Check MX Records</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Enter your domain name in the lookup tool above</li>
              <li>Select "MX" as the record type (pre-selected for you)</li>
              <li>Click "Check DNS" to query 50+ global DNS servers</li>
              <li>Review your mail server configuration and priority values</li>
            </ol>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common MX Record Issues</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
              <li><strong>No MX Records:</strong> Email delivery will fail if no MX records exist</li>
              <li><strong>Wrong Priority:</strong> Incorrect priority values can cause delivery delays</li>
              <li><strong>Propagation Delays:</strong> Changes can take 24-48 hours to propagate globally</li>
              <li><strong>Multiple Providers:</strong> Using multiple email providers requires careful MX configuration</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">MX Record Format</h2>
            <p className="text-gray-700 mb-4">
              MX records consist of two parts: a priority number and the mail server hostname. Lower priority numbers are preferred.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-6">
              <p>example.com. MX 10 mail.example.com.</p>
              <p>example.com. MX 20 backup-mail.example.com.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Monitor Your Email DNS 24/7</h2>
            <p className="text-xl mb-8">Get instant alerts when your MX records change with Pro monitoring</p>
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
