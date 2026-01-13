import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Globe, Code, ShoppingCart, Briefcase } from "lucide-react";
import { platformDnsGuides } from "@/data/platform-dns";

export default function PlatformsIndex() {
  const websiteBuilders = platformDnsGuides.filter(p => 
    ["wordpress", "squarespace", "wix", "webflow", "ghost"].includes(p.slug)
  );
  const ecommerce = platformDnsGuides.filter(p => 
    ["shopify"].includes(p.slug)
  );
  const hosting = platformDnsGuides.filter(p => 
    ["vercel", "netlify", "github-pages", "heroku", "render", "digitalocean"].includes(p.slug)
  );
  const cloud = platformDnsGuides.filter(p => 
    ["aws", "google-cloud", "azure"].includes(p.slug)
  );
  const marketing = platformDnsGuides.filter(p => 
    ["hubspot"].includes(p.slug)
  );

  const PlatformCard = ({ platform }: { platform: typeof platformDnsGuides[0] }) => (
    <Link href={`/dns-for/${platform.slug}`}>
      <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-900">{platform.platform}</h3>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{platform.intro.substring(0, 120)}...</p>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>DNS Setup Guides for Every Platform - WordPress, Shopify, Vercel & More | ReviewMyDNS</title>
        <meta name="description" content="Platform-specific DNS configuration guides. Learn how to set up custom domains for WordPress, Shopify, Vercel, AWS, and 15+ other platforms." />
        <meta name="keywords" content="DNS setup guide, platform DNS, WordPress DNS, Shopify DNS, Vercel DNS, custom domain setup" />
        <meta property="og:title" content="DNS Setup Guides for Every Platform - ReviewMyDNS" />
        <meta property="og:description" content="Step-by-step DNS configuration for all major hosting platforms." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reviewmydns.com/dns-for" />
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

      <section className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              <Globe className="w-3 h-3 mr-1" />
              15+ Platform Guides
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              DNS Setup for Every Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Step-by-step DNS configuration guides for WordPress, Shopify, Vercel, AWS, and more. 
              Connect your custom domain in minutes.
            </p>
            <Link href="/">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Test Your DNS Configuration
              </button>
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Globe className="w-6 h-6 text-blue-500 mr-2" />
            Website Builders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {websiteBuilders.map(p => <PlatformCard key={p.slug} platform={p} />)}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ShoppingCart className="w-6 h-6 text-green-500 mr-2" />
            E-commerce
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ecommerce.map(p => <PlatformCard key={p.slug} platform={p} />)}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Code className="w-6 h-6 text-purple-500 mr-2" />
            Developer Hosting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hosting.map(p => <PlatformCard key={p.slug} platform={p} />)}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Briefcase className="w-6 h-6 text-orange-500 mr-2" />
            Cloud Providers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cloud.map(p => <PlatformCard key={p.slug} platform={p} />)}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Marketing Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketing.map(p => <PlatformCard key={p.slug} platform={p} />)}
          </div>
        </section>

        <section className="bg-blue-50 rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Not Listed?</h2>
            <p className="text-gray-600 mb-6">
              Most platforms follow similar DNS patterns. Check our general guides for help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Browse All Guides
                </button>
              </Link>
              <Link href="/errors">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                  DNS Error Reference
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
