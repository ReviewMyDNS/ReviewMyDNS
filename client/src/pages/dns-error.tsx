import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, ArrowRight, Search, BookOpen, ExternalLink } from "lucide-react";
import { getDnsErrorBySlug, dnsErrors } from "@/data/dns-errors";

export default function DnsErrorPage() {
  const params = useParams<{ slug: string }>();
  const error = getDnsErrorBySlug(params.slug || "");

  if (!error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Not Found</h1>
          <Link href="/errors">
            <Button>View All DNS Errors</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedErrorData = error.relatedErrors
    .map(slug => dnsErrors.find(e => e.slug === slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{error.title} | ReviewMyDNS</title>
        <meta name="description" content={error.metaDescription} />
        <meta name="keywords" content={error.keywords.join(", ")} />
        <meta property="og:title" content={error.title} />
        <meta property="og:description" content={error.metaDescription} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://reviewmydns.com/errors/${error.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": error.title,
            "description": error.metaDescription,
            "author": {
              "@type": "Organization",
              "name": "ReviewMyDNS"
            },
            "publisher": {
              "@type": "Organization",
              "name": "ReviewMyDNS",
              "url": "https://reviewmydns.com"
            }
          })}
        </script>
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

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/errors" className="text-gray-500 hover:text-gray-700">DNS Errors</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{error.code}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 text-red-600 border-red-200 bg-red-50">
            <AlertTriangle className="w-3 h-3 mr-1" />
            DNS Error
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {error.title}
          </h1>
          <p className="text-xl text-gray-600">
            {error.description}
          </p>
        </div>

        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Check Your DNS Now</h3>
                <p className="text-blue-700 mb-3">
                  Use our free DNS checker to diagnose {error.code} errors across 50+ global servers.
                </p>
                <Link href="/">
                  <Button size="sm">
                    Run DNS Lookup <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 text-amber-500 mr-2" />
            Common Causes
          </h2>
          <ul className="space-y-3">
            {error.causes.map((cause, index) => (
              <li key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                <span className="bg-amber-100 text-amber-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{cause}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            How to Fix It
          </h2>
          <ul className="space-y-3">
            {error.solutions.map((solution, index) => (
              <li key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{solution}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
            Technical Details
          </h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                {error.technicalDetails}
              </p>
            </CardContent>
          </Card>
        </section>

        {relatedErrorData.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Errors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedErrorData.map((related) => related && (
                <Link key={related.slug} href={`/errors/${related.slug}`}>
                  <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer h-full">
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">{related.code}</Badge>
                      <p className="text-sm text-gray-600">{related.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="mb-6 text-blue-100">
            Our comprehensive guides cover DNS troubleshooting, email authentication, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/guides">
              <Button variant="secondary">
                Browse Guides <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/terminology">
              <Button variant="outline" className="text-white border-white hover:bg-blue-600">
                DNS Glossary
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} ReviewMyDNS. Free DNS lookup and analysis tool.
          </p>
        </div>
      </footer>
    </div>
  );
}
