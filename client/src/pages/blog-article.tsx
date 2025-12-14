import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { getBlogArticle, blogArticles } from "@/data/blog-articles";
import NotFound from "./not-found";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getBlogArticle(slug || "");

  if (!article) {
    return <NotFound />;
  }

  const shareUrl = `https://reviewmydns.com/blog/${article.slug}`;

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
  };

  const relatedArticles = blogArticles
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{article.title} | ReviewMyDNS Blog</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="article:published_time" content={article.publishedDate} />
        <meta property="article:author" content={article.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <link rel="canonical" href={shareUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.description,
            "datePublished": article.publishedDate,
            "author": {
              "@type": "Organization",
              "name": article.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "ReviewMyDNS",
              "url": "https://reviewmydns.com"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": shareUrl
            }
          })}
        </script>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog">
          <Button variant="ghost" className="mb-6" data-testid="button-back-to-blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary">{article.category}</Badge>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(article.publishedDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="article-title">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {article.description}
            </p>

            <div className="flex items-center justify-between border-y border-gray-200 py-4 mb-8">
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2" />
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 mr-2">Share:</span>
                <Button variant="outline" size="sm" onClick={shareOnTwitter} data-testid="button-share-twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnLinkedIn} data-testid="button-share-linkedin">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={copyLink} data-testid="button-copy-link">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded"
              dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
              data-testid="article-content"
            />
          </div>
        </article>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your DNS Configuration</h2>
          <p className="text-gray-600 mb-4">
            Use our free DNS lookup tool to verify your domain's configuration across 50+ global DNS servers.
          </p>
          <Link href="/">
            <Button data-testid="button-try-tool">
              Try ReviewMyDNS Free
            </Button>
          </Link>
        </div>

        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`}>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer" data-testid={`related-article-${related.slug}`}>
                    <Badge variant="secondary" className="mb-2">{related.category}</Badge>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ReviewMyDNS. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function formatContent(content: string): string {
  let html = content
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/<\/li>\n<li>/g, '</li><li>');
  
  html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, (match) => {
    return `<ul class="list-disc list-inside mb-4 space-y-1">${match}</ul>`;
  });

  return `<p class="mb-4">${html}</p>`;
}
