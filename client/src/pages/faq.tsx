import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { getFaqGuide } from "@/data/faq-guides";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { SocialShareButtons } from "@/components/social-share-buttons";

export default function FaqPage() {
  const [, params] = useRoute("/faq/:slug");
  const slug = params?.slug || "";
  const faq = getFaqGuide(slug);

  if (!faq) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">FAQ Not Found</h1>
          <p className="text-gray-600 mb-8">The FAQ you're looking for doesn't exist.</p>
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
        <title>{faq.title} | ReviewMyDNS</title>
        <meta name="description" content={faq.metaDescription} />
        <meta name="keywords" content={`${faq.category}, DNS FAQ, frequently asked questions, ${faq.category.toLowerCase()}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={faq.title} />
        <meta property="og:description" content={faq.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://reviewmydns.com/faq/${faq.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={faq.title} />
        <meta name="twitter:description" content={faq.metaDescription} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://reviewmydns.com/faq/${faq.slug}`} />
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
          <span className="text-gray-900 font-medium">{faq.category}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-block mb-3">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {faq.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{faq.h1}</h1>
          <p className="text-xl text-gray-700 mb-6">{faq.metaDescription}</p>
          
          {/* Social Share Buttons */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <SocialShareButtons 
              url={typeof window !== 'undefined' ? window.location.href : ''} 
              title={faq.title}
              description={faq.metaDescription}
            />
          </div>
          
          {/* CTA to DNS Checker */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Ready to test your DNS?</p>
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

        {/* FAQ Items */}
        <section className="mb-12">
          <div className="space-y-6">
            {faq.faqs.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Verify Your DNS?</h3>
            <p className="text-blue-100 mb-6">
              Use our global DNS propagation checker to verify your DNS records are working correctly across all servers worldwide.
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
