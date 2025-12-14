import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { blogArticles } from "@/data/blog-articles";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>DNS Blog - Tutorials, Guides & Best Practices | ReviewMyDNS</title>
        <meta name="description" content="Expert DNS tutorials, troubleshooting guides, and best practices. Learn about DNS propagation, email delivery, TTL optimization, and more." />
        <meta property="og:title" content="DNS Blog - Tutorials & Best Practices | ReviewMyDNS" />
        <meta property="og:description" content="Expert DNS tutorials, troubleshooting guides, and best practices. Learn about DNS propagation, email delivery, TTL optimization, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reviewmydns.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://reviewmydns.com/blog" />
      </Helmet>

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Logo size="sm" className="mr-2" />
                  <h1 className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</h1>
                </div>
              </Link>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            DNS Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert tutorials, troubleshooting guides, and best practices for DNS management, 
            email delivery, and domain configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogArticles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group" data-testid={`blog-card-${article.slug}`}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.publishedDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className="mt-4 text-blue-600 flex items-center group-hover:underline">
                    Read article <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <section className="mt-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Blog</h2>
          <p className="text-gray-600 mb-4">
            The ReviewMyDNS blog is your go-to resource for everything DNS. Whether you're troubleshooting 
            email delivery issues, planning a DNS migration, or trying to understand how DNS propagation works, 
            our expert guides provide clear, actionable information.
          </p>
          <p className="text-gray-600">
            Our articles are written by DNS professionals with years of experience managing enterprise 
            infrastructure, debugging complex issues, and optimizing DNS performance for millions of users.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100">
              DNS Basics
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100">
              Tutorials
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100">
              Email
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100">
              Comparisons
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100">
              Troubleshooting
            </Badge>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ReviewMyDNS. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
