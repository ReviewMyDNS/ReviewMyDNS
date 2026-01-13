import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowRight, Search, Mail, Shield } from "lucide-react";
import { dnsErrors } from "@/data/dns-errors";

export default function ErrorsIndex() {
  const coreErrors = dnsErrors.filter(e => 
    ["nxdomain", "servfail", "refused", "timeout", "noerror-empty"].includes(e.slug)
  );
  const configErrors = dnsErrors.filter(e => 
    ["cname-loop", "lame-delegation", "missing-glue", "soa-mismatch", "truncated-response"].includes(e.slug)
  );
  const securityErrors = dnsErrors.filter(e => 
    ["dnssec-validation-failed", "formerr", "notimpl"].includes(e.slug)
  );
  const emailErrors = dnsErrors.filter(e => 
    ["spf-permerror", "dkim-signature-invalid", "dmarc-failure", "ptr-missing"].includes(e.slug)
  );
  const networkErrors = dnsErrors.filter(e => 
    ["network-unreachable", "connection-refused", "ttl-expired"].includes(e.slug)
  );

  const ErrorCard = ({ error }: { error: typeof dnsErrors[0] }) => (
    <Link href={`/errors/${error.slug}`}>
      <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer h-full">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="outline" className="text-red-600 border-red-200">
              {error.code}
            </Badge>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{error.description}</p>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>DNS Error Codes Explained - Troubleshooting Guide | ReviewMyDNS</title>
        <meta name="description" content="Complete guide to DNS error codes: NXDOMAIN, SERVFAIL, REFUSED, TIMEOUT, and more. Learn causes and step-by-step solutions for each DNS error." />
        <meta name="keywords" content="DNS errors, NXDOMAIN, SERVFAIL, DNS troubleshooting, DNS error codes, fix DNS" />
        <meta property="og:title" content="DNS Error Codes Explained - ReviewMyDNS" />
        <meta property="og:description" content="Comprehensive guide to understanding and fixing DNS errors." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/errors" />
      </Helmet>

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Logo size="sm" className="mr-2" />
                <span className="text-xl font-bold text-gray-900">ReviewMyDNS</span>
              </div>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-red-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-red-100 text-red-700">
              <AlertTriangle className="w-3 h-3 mr-1" />
              20+ Error Codes Explained
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              DNS Error Codes Reference
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Complete guide to understanding DNS errors. Find the cause and fix any DNS issue fast.
            </p>
            <Link href="/">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Test Your Domain Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
            Core DNS Errors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreErrors.map(error => <ErrorCard key={error.slug} error={error} />)}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 text-purple-500 mr-2" />
            Configuration & Zone Errors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {configErrors.map(error => <ErrorCard key={error.slug} error={error} />)}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Mail className="w-6 h-6 text-green-500 mr-2" />
            Email Authentication Errors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emailErrors.map(error => <ErrorCard key={error.slug} error={error} />)}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Security & Protocol Errors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityErrors.map(error => <ErrorCard key={error.slug} error={error} />)}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Network & Connectivity Errors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {networkErrors.map(error => <ErrorCard key={error.slug} error={error} />)}
          </div>
        </section>

        <section className="bg-blue-50 rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Having Issues?</h2>
            <p className="text-gray-600 mb-6">
              Check our comprehensive guides for in-depth DNS troubleshooting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/dns-misconfigurations">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Common Misconfigurations
                </button>
              </Link>
              <Link href="/guides">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                  All Guides
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} ReviewMyDNS. Free DNS lookup and analysis tool.
          </p>
        </div>
      </footer>
    </div>
  );
}
