import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Search, AlertTriangle, ExternalLink, Copy } from "lucide-react";
import { getPlatformBySlug, platformDnsGuides } from "@/data/platform-dns";
import { useToast } from "@/hooks/use-toast";

export default function PlatformDnsPage() {
  const params = useParams<{ slug: string }>();
  const platform = getPlatformBySlug(params.slug || "");
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: "Copied to clipboard" });
  };

  if (!platform) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Platform Not Found</h1>
          <Link href="/dns-for">
            <Button>View All Platforms</Button>
          </Link>
        </div>
      </div>
    );
  }

  const otherPlatforms = platformDnsGuides
    .filter(p => p.slug !== platform.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{platform.title} | ReviewMyDNS</title>
        <meta name="description" content={platform.metaDescription} />
        <meta name="keywords" content={platform.keywords.join(", ")} />
        <meta property="og:title" content={platform.title} />
        <meta property="og:description" content={platform.metaDescription} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://reviewmydns.com/dns-for/${platform.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": platform.title,
            "description": platform.metaDescription,
            "step": platform.steps.map((step, i) => ({
              "@type": "HowToStep",
              "position": i + 1,
              "name": step.title,
              "text": step.content
            }))
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
            <Link href="/dns-for" className="text-gray-500 hover:text-gray-700">DNS for Platforms</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{platform.platform}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-700">
            Platform Guide
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {platform.title}
          </h1>
          <p className="text-xl text-gray-600">
            {platform.intro}
          </p>
        </div>

        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Verify Your {platform.platform} DNS</h3>
                <p className="text-blue-700 mb-3">
                  Check if your DNS is correctly configured for {platform.platform} across 50+ global servers.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Setup</h2>
          <div className="space-y-4">
            {platform.steps.map((step, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Required DNS Records</h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Value</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {platform.commonRecords.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Badge variant="outline">{record.type}</Badge>
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">{record.name}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm break-all">
                              {record.value}
                            </code>
                            <button 
                              onClick={() => copyToClipboard(record.value)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{record.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 text-amber-500 mr-2" />
            Common Issues & Solutions
          </h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {platform.troubleshooting.map((issue, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{issue}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Platform Guides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherPlatforms.map((p) => (
              <Link key={p.slug} href={`/dns-for/${p.slug}`}>
                <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium text-gray-900">{p.platform}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/dns-for">
              <Button variant="outline">
                View All Platforms <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Having DNS Issues?</h2>
          <p className="mb-6 text-blue-100">
            Check out our comprehensive DNS error guides and troubleshooting resources.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/errors">
              <Button variant="secondary">
                DNS Error Codes
              </Button>
            </Link>
            <Link href="/guides">
              <Button variant="outline" className="text-white border-white hover:bg-blue-600">
                All Guides
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
