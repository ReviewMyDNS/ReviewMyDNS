import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Copy, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { Link } from "wouter";
import MobileMenu from "@/components/mobile-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Widget() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const embedCode = `<iframe
  src="https://reviewmydns.com/embed"
  width="100%"
  height="800"
  frameborder="0"
  style="border: none; border-radius: 8px;"
  title="DNS Propagation Checker"
></iframe>`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Embed code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the code manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size="sm" className="mr-2" />
              <span className="text-base md:text-xl font-bold text-gray-900">ReviewMyDNS</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              <Link href="/signin">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Code2 className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Embed DNS Checker on Your Site
          </h1>
          <p className="text-xl text-gray-600">
            Add a free DNS propagation checker to your website with a single line of code
          </p>
        </div>

        {/* Embed Code Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Embed Code</CardTitle>
            <CardDescription>
              Copy and paste this code into your HTML
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{embedCode}</code>
              </pre>
              <Button
                onClick={handleCopyCode}
                size="sm"
                className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700"
                data-testid="button-copy-embed"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">100% Free</h3>
              <p className="text-sm text-gray-600">No API keys or accounts needed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Fully Responsive</h3>
              <p className="text-sm text-gray-600">Works on all devices automatically</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">50+ Servers</h3>
              <p className="text-sm text-gray-600">Global DNS checking built-in</p>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>
              See how it looks on your site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              <iframe
                src="/embed"
                width="100%"
                height="800"
                title="DNS Checker Preview"
                className="border-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Benefits */}
        <div className="mt-12 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Why Embed Our DNS Checker?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
              <span><strong>Add Value:</strong> Give your visitors a free DNS tool without building one</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
              <span><strong>Zero Maintenance:</strong> We handle updates, bug fixes, and server costs</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
              <span><strong>Increase Engagement:</strong> Keep visitors on your site longer with useful tools</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
              <span><strong>SEO Boost:</strong> Fresh, interactive content improves search rankings</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Features?</h2>
          <p className="text-gray-600 mb-6">
            Get unlimited lookups, API access, and custom branding with Pro
          </p>
          <Link href="/pricing">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View Pricing Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
