import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { getProviderGuide } from "@/data/provider-guides";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, ArrowRight, ExternalLink } from "lucide-react";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";

export default function Guide() {
  const [, params] = useRoute("/guides/:slug");
  const slug = params?.slug || "";
  const guide = getProviderGuide(slug);

  if (!guide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Guide Not Found</h1>
          <p className="text-gray-600 mb-8">The guide you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>{guide.title} | ReviewMyDNS</title>
        <meta name="description" content={guide.metaDescription} />
        <meta name="keywords" content={`${guide.provider} DNS, DNS setup, ${guide.provider} DNS records, configure DNS ${guide.provider}, ${guide.provider} nameserver`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={guide.title} />
        <meta property="og:description" content={guide.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://reviewmydns.com/guides/${guide.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guide.title} />
        <meta name="twitter:description" content={guide.metaDescription} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://reviewmydns.com/guides/${guide.slug}`} />
      </Helmet>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Logo size="sm" className="mr-2" />
                <Link href="/">
                  <span className="text-base md:text-xl font-bold text-gray-900 cursor-pointer">ReviewMyDNS</span>
                </Link>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                DNS Checker
              </Link>
              <Link href="/tools" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Tools
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
              </div>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{guide.provider} DNS Setup</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{guide.h1}</h1>
          <p className="text-xl text-gray-700 mb-6">{guide.introduction}</p>
          
          {/* CTA to DNS Checker */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Verify your DNS changes globally</p>
                <p className="text-xs text-blue-700">Check propagation across 50+ servers worldwide</p>
              </div>
              <Link href="/">
                <Button variant="outline" className="bg-white" data-testid="check-dns-cta">
                  Check DNS Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Instructions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Step-by-Step Setup Guide</h2>
          <div className="space-y-6">
            {guide.steps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    {step.title}
                  </CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                {step.details && (
                  <CardContent>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* DNS Record Types */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common DNS Record Types on {guide.provider}</h2>
          <div className="space-y-6">
            {guide.recordTypes.map((record, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{record.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">{record.instructions}</p>
                  <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-800">
                    {record.example}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Troubleshooting Common Issues</h2>
          <div className="space-y-6">
            {guide.troubleshooting.map((item, index) => (
              <Card key={index} className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                    {item.issue}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{item.solution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {guide.faq.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Verify Your DNS Changes Now</h3>
            <p className="text-blue-100 mb-6">
              Use our global DNS propagation checker to ensure your {guide.provider} DNS records are working correctly across all servers worldwide.
            </p>
            <Link href="/">
              <Button size="lg" variant="secondary" data-testid="final-cta">
                Check DNS Propagation <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-300 text-sm">
            © 2025 ReviewMyDNS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
