import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, HelpCircle, Clock, Mail, Shield, Globe, Server } from "lucide-react";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { faqGuides } from "@/data/faq-guides";

const categoryIcons: Record<string, typeof HelpCircle> = {
  "DNS Propagation": Clock,
  "DNS Tools": Globe,
  "DNS Records": Server,
  "Email Configuration": Mail,
  "DNS Security": Shield,
};

const categories = Array.from(new Set(faqGuides.map(f => f.category)));

const popularFaqs = [
  { question: "Why is my DNS not updating after 24 hours?", slug: "why-dns-not-updating-24-hours" },
  { question: "How do I check if DNS has propagated?", slug: "how-to-check-dns-propagation" },
  { question: "What's the difference between A, CNAME, MX records?", slug: "difference-between-a-record-cname-mx-txt" },
  { question: "How do I set up SPF, DKIM, and DMARC?", slug: "how-to-set-up-spf-dkim-dmarc" },
];

export default function FaqIndex() {
  const faqsByCategory = categories.reduce((acc, category) => {
    acc[category] = faqGuides.filter(f => f.category === category);
    return acc;
  }, {} as Record<string, typeof faqGuides>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>DNS FAQ - Common Questions About DNS Records, Propagation & Email | ReviewMyDNS</title>
        <meta name="description" content="Answers to common DNS questions. Learn about DNS propagation times, record types, email authentication, and troubleshooting DNS issues." />
        <meta name="keywords" content="DNS FAQ, DNS questions, DNS propagation FAQ, DNS record questions, email DNS FAQ" />
        <meta property="og:title" content="DNS FAQ - Common Questions Answered | ReviewMyDNS" />
        <meta property="og:description" content="Answers to common DNS questions about propagation, records, and email configuration." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/faq" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Why is my DNS not updating after 24 hours?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "DNS propagation can take longer than expected due to high TTL values, ISP caching, or issues with authoritative nameservers. Use a global DNS checker to verify propagation status."
                }
              },
              {
                "@type": "Question",
                "name": "How do I check if DNS has propagated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use a DNS propagation checker like ReviewMyDNS that queries multiple DNS servers worldwide to see if your records have updated globally."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between A, CNAME, and MX records?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A records point a domain to an IP address. CNAME records create aliases pointing to other domains. MX records specify mail servers for email delivery."
                }
              },
              {
                "@type": "Question",
                "name": "How long does DNS propagation take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "DNS propagation typically takes 15 minutes to 48 hours, depending on TTL settings. Most changes complete within a few hours."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size="sm" className="mr-2" />
              <Link href="/">
                <span className="text-base md:text-xl font-bold text-gray-900 cursor-pointer">ReviewMyDNS</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                DNS Checker
              </Link>
              <Link href="/tools" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Tools
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Guides
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700">Help Center</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common DNS questions. From propagation delays to email authentication, we've got you covered.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularFaqs.map((faq, index) => (
              <Link key={index} href={`/faq/${faq.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{faq.question}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="space-y-8">
            {categories.map(category => {
              const Icon = categoryIcons[category] || HelpCircle;
              const faqs = faqsByCategory[category];
              
              return (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                    <Badge variant="outline">{faqs.length} articles</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {faqs.map((faq: typeof faqGuides[0], index: number) => (
                      <Link key={index} href={`/faq/${faq.slug}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base text-gray-800 line-clamp-2">
                              {faq.h1}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="line-clamp-2">
                              {faq.metaDescription}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Can't find what you're looking for?</h3>
                  <p className="text-gray-600">Check our in-depth guides or use our DNS checker to diagnose issues.</p>
                </div>
                <div className="flex gap-3">
                  <Link href="/blog">
                    <Button variant="outline" data-testid="view-guides-btn">View Guides</Button>
                  </Link>
                  <Link href="/">
                    <Button data-testid="check-dns-btn">Check DNS</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Diagnose Your DNS?</h3>
            <p className="text-blue-100 mb-6">
              Use our global DNS propagation checker to verify your records across 50+ servers worldwide.
            </p>
            <Link href="/">
              <Button size="lg" variant="secondary" data-testid="final-cta">
                Check DNS Propagation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-300 text-sm">
          © 2025 ReviewMyDNS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
