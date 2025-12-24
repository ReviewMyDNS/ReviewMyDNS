import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Globe, Lock, ArrowRight, Terminal, BookOpen } from "lucide-react";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";

const features = [
  {
    icon: Globe,
    title: "50+ Global DNS Servers",
    description: "Query DNS servers across North America, Europe, Asia, and more in a single API call."
  },
  {
    icon: Zap,
    title: "Sub-100ms Response Times",
    description: "Fast, reliable DNS lookups with built-in retry logic and failover handling."
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Security",
    description: "HTTPS-only endpoints, API key authentication, and rate limiting protection."
  },
  {
    icon: Code,
    title: "Simple REST API",
    description: "JSON responses, clear error messages, and comprehensive documentation."
  }
];

const useCases = [
  {
    title: "CI/CD Pipeline Integration",
    description: "Verify DNS changes before deploying. Catch propagation issues before they affect users.",
    audience: "DevOps & SRE Teams"
  },
  {
    title: "Client DNS Monitoring",
    description: "Monitor client domains programmatically. Get alerts when DNS records change unexpectedly.",
    audience: "MSPs & Agencies"
  },
  {
    title: "Email Deliverability Checks",
    description: "Validate SPF, DKIM, and DMARC records across global servers before sending campaigns.",
    audience: "Email & Security Teams"
  },
  {
    title: "Domain Portfolio Management",
    description: "Bulk verify DNS configurations across hundreds of domains in your portfolio.",
    audience: "Domain Registrars"
  }
];

export default function Api() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Helmet>
        <title>DNS Lookup API - Programmatic DNS Verification | ReviewMyDNS</title>
        <meta name="description" content="Integrate global DNS lookups into your applications. Query 50+ DNS servers worldwide with our REST API. Perfect for DevOps, monitoring, and automation." />
        <meta name="keywords" content="DNS API, DNS lookup API, DNS verification API, programmatic DNS, REST API DNS" />
        <meta property="og:title" content="DNS Lookup API - ReviewMyDNS" />
        <meta property="og:description" content="Integrate global DNS lookups into your applications. Query 50+ DNS servers worldwide." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/api" />
      </Helmet>

      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size="sm" className="mr-2" />
              <Link href="/">
                <span className="text-base md:text-xl font-bold text-white cursor-pointer">ReviewMyDNS</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                DNS Checker
              </Link>
              <Link href="/tools" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Tools
              </Link>
              <Link href="/api-docs" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                API Docs
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/signin">
                  <Button variant="ghost" className="text-gray-300 hover:text-white">Sign In</Button>
                </Link>
              </div>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Developer API
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DNS Verification API for<br />Modern Infrastructure
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Query 50+ global DNS servers programmatically. Verify propagation, monitor changes, and automate DNS validation in your pipelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/api-docs">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" data-testid="view-docs-btn">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Documentation
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-slate-800" data-testid="view-pricing-btn">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-12">Why Use Our API?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-emerald-400 mb-2" />
                    <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-4">Quick Start</h2>
            <p className="text-gray-400 text-center mb-8">Make your first DNS lookup in seconds</p>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-400 text-sm">cURL Example</span>
                </div>
                <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">
{`curl -X POST https://reviewmydns.com/api/dns/lookup \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "domain": "example.com",
    "recordType": "A"
  }'`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-4">Built For Your Team</h2>
            <p className="text-gray-400 text-center mb-12">Common use cases from our customers</p>
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2 text-emerald-400 border-emerald-400/30">
                      {useCase.audience}
                    </Badge>
                    <CardTitle className="text-white">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">{useCase.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8">
              Start with 1,000 free API calls per month. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signin">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" data-testid="get-api-key-btn">
                  Get Your API Key <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-slate-800" data-testid="read-docs-btn">
                  Read the Docs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          © 2025 ReviewMyDNS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
