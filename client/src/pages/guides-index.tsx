import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Server, Shield, Mail, AlertTriangle } from "lucide-react";
import { providerGuides } from "@/data/provider-guides";
import { faqGuides } from "@/data/faq-guides";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";

export default function GuidesIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>DNS Setup Guides - ReviewMyDNS</title>
        <meta name="description" content="Step-by-step DNS setup guides for all major domain registrars and hosting providers. Learn how to configure DNS records on Cloudflare, GoDaddy, Namecheap, AWS Route 53, and more." />
      </Helmet>

      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex-shrink-0 flex items-center cursor-pointer">
                  <Logo size="sm" className="mr-2" />
                  <span className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</span>
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                DNS Checker
              </Link>
              <Link href="/tools" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Tools
              </Link>
              <Link href="/guides" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-blue-600">
                Guides
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Blog
              </Link>
              <Link href="/api-docs" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                API
              </Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/pricing">
                  <Button variant="ghost">Pricing</Button>
                </Link>
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signin?tab=signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DNS Setup Guides</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Step-by-step tutorials for configuring DNS records on all major domain registrars and hosting providers.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-600" />
            Provider Setup Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providerGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-gray-200 hover:border-blue-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{guide.provider}</span>
                      <Server className="h-5 w-5 text-gray-400" />
                    </CardTitle>
                    <CardDescription>{guide.metaDescription.slice(0, 100)}...</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                      Read Guide <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            Troubleshooting Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqGuides.map((guide) => (
              <Link key={guide.slug} href={`/faq/${guide.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-gray-200 hover:border-orange-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>{guide.title.replace(' - Causes and Solutions', '').replace('How to ', '')}</span>
                      {guide.category === 'email' ? (
                        <Mail className="h-5 w-5 text-gray-400" />
                      ) : guide.category === 'security' ? (
                        <Shield className="h-5 w-5 text-gray-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-gray-400" />
                      )}
                    </CardTitle>
                    <CardDescription>{guide.metaDescription.slice(0, 100)}...</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="p-0 h-auto text-orange-600 hover:text-orange-800">
                      Read Guide <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need to Check Your DNS?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Use our free DNS propagation checker to verify your DNS records are configured correctly across 50+ global servers.
          </p>
          <Link href="/">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Check DNS Now <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 ReviewMyDNS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
