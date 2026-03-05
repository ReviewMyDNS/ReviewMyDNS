import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Copy, CheckCircle2, Globe, Code2, Award, ExternalLink, Heart } from "lucide-react";
import { Logo } from "@/components/logo";
import { Link } from "wouter";
import MobileMenu from "@/components/mobile-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: "Copied!", description: `${label || "Text"} copied to clipboard` });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", description: "Please copy manually", variant: "destructive" });
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
      {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

const TEXT_BADGE_LIGHT = `<a href="https://reviewmydns.com" title="Free DNS Propagation Checker - ReviewMyDNS" target="_blank" rel="noopener">
  <img src="https://reviewmydns.com/badge-light.svg" alt="Check DNS with ReviewMyDNS" width="200" height="40" />
</a>`;

const TEXT_BADGE_DARK = `<a href="https://reviewmydns.com" title="Free DNS Propagation Checker - ReviewMyDNS" target="_blank" rel="noopener">
  <img src="https://reviewmydns.com/badge-dark.svg" alt="Check DNS with ReviewMyDNS" width="200" height="40" />
</a>`;

const TEXT_LINK_SIMPLE = `<a href="https://reviewmydns.com" title="Free DNS Propagation Checker">ReviewMyDNS - Free DNS Checker</a>`;

const TEXT_LINK_DESCRIPTIVE = `<a href="https://reviewmydns.com" title="Free DNS Propagation Checker - ReviewMyDNS">ReviewMyDNS</a> — Free DNS propagation checker with 50+ global servers. Check A, MX, CNAME, TXT, NS records instantly.`;

const MARKDOWN_LINK = `[ReviewMyDNS - Free DNS Propagation Checker](https://reviewmydns.com)`;

const MARKDOWN_BADGE = `[![Check DNS with ReviewMyDNS](https://reviewmydns.com/badge-light.svg)](https://reviewmydns.com)`;

export default function LinkToUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>Link to Us - ReviewMyDNS Badges & Assets</title>
        <meta name="description" content="Link to ReviewMyDNS from your website, blog, or documentation. Download badges, grab embed codes, and help spread the word about free DNS checking tools." />
      </Helmet>

      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size="sm" className="mr-2" />
              <span className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/widget" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Embed Widget</Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Link to ReviewMyDNS</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help your audience discover free DNS tools. Grab a badge, text link, or embed code below — every link helps us keep the tool free for everyone.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Badges
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Light Badge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6 flex items-center justify-center mb-3">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Check DNS — ReviewMyDNS
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md p-3 mb-3">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all">{TEXT_BADGE_LIGHT}</pre>
                </div>
                <CopyButton text={TEXT_BADGE_LIGHT} label="Light badge code" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Dark Badge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 border rounded-lg p-6 flex items-center justify-center mb-3">
                  <div className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Check DNS — ReviewMyDNS
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md p-3 mb-3">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all">{TEXT_BADGE_DARK}</pre>
                </div>
                <CopyButton text={TEXT_BADGE_DARK} label="Dark badge code" />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-blue-600" />
            Text Links
          </h2>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Simple Link</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-4 mb-3">
                  <a href="https://reviewmydns.com" className="text-blue-600 hover:underline font-medium">ReviewMyDNS - Free DNS Checker</a>
                </div>
                <div className="bg-gray-50 rounded-md p-3 mb-3">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all">{TEXT_LINK_SIMPLE}</pre>
                </div>
                <CopyButton text={TEXT_LINK_SIMPLE} label="Simple link" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Descriptive Link</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-4 mb-3">
                  <span>
                    <a href="https://reviewmydns.com" className="text-blue-600 hover:underline font-medium">ReviewMyDNS</a>
                    {" — Free DNS propagation checker with 50+ global servers. Check A, MX, CNAME, TXT, NS records instantly."}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-md p-3 mb-3">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all">{TEXT_LINK_DESCRIPTIVE}</pre>
                </div>
                <CopyButton text={TEXT_LINK_DESCRIPTIVE} label="Descriptive link" />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600" />
            Markdown (GitHub, Reddit, Forums)
          </h2>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Markdown Text Link</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-md p-3 mb-3">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all">{MARKDOWN_LINK}</pre>
                </div>
                <CopyButton text={MARKDOWN_LINK} label="Markdown link" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Markdown Badge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-md p-3 mb-3">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all">{MARKDOWN_BADGE}</pre>
                </div>
                <CopyButton text={MARKDOWN_BADGE} label="Markdown badge" />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Embed the Full DNS Checker
          </h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-4">
                Want to embed the full DNS propagation checker on your site? Our embeddable widget is completely free.
              </p>
              <Link href="/widget">
                <Button className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Get Embed Code
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Brand Guidelines</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Name</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Always write as <strong>ReviewMyDNS</strong> (one word, capital R, M, D, N, S). Not "Review My DNS" or "reviewmydns".
                  </p>
                  <h3 className="font-medium text-gray-900 mb-2">Tagline</h3>
                  <p className="text-gray-600 text-sm">
                    "Free DNS Propagation Checker" or "Check DNS Records Across 50+ Global Servers"
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Colors</h3>
                  <div className="flex gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md bg-blue-600 border"></div>
                      <span className="text-sm text-gray-600">#2563EB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md bg-gray-900 border"></div>
                      <span className="text-sm text-gray-600">#111827</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Logo</h3>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <Logo size="sm" />
                    <span className="font-bold text-gray-900">ReviewMyDNS</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Questions about linking or partnership opportunities? <Link href="/contact" className="text-blue-600 hover:underline">Get in touch</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
