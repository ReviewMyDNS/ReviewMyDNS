import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, Globe, Target, Users, MessageSquare, BookOpen, Zap, Star } from "lucide-react";
import { Logo } from "@/components/logo";
import { Link } from "wouter";
import MobileMenu from "@/components/mobile-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

function CopyBlock({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: "Copied!", description: `${label} copied to clipboard` });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", description: "Please copy manually", variant: "destructive" });
    }
  };

  return (
    <div className="relative">
      <div className="bg-gray-50 rounded-md p-3 pr-20">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{text}</p>
      </div>
      <Button variant="ghost" size="sm" onClick={handleCopy} className="absolute top-2 right-2 gap-1 text-xs">
        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

const SHORT_DESC = `ReviewMyDNS is a free DNS propagation checker that queries 50+ global DNS servers to verify DNS records instantly. Check A, AAAA, MX, CNAME, TXT, NS, and SOA records with detailed diagnostics, interactive maps, and performance metrics.`;

const MEDIUM_DESC = `ReviewMyDNS is a free, no-signup DNS propagation checker built for DevOps teams, MSPs, and IT professionals. It queries 50+ DNS servers worldwide to verify record propagation, detect misconfigurations, and troubleshoot email delivery issues.

Key features:
• Check A, AAAA, MX, CNAME, TXT, NS, SOA records across 50+ global servers
• Auto-diagnostic insights for SPF, DKIM, DMARC, and MX configuration
• Interactive world map showing propagation status by region
• Response time performance charts
• Shareable results with unique URLs
• Embeddable DNS checker widget for your own site
• Comprehensive DNS error reference and troubleshooting guides

Website: https://reviewmydns.com`;

const LONG_DESC = `ReviewMyDNS is a comprehensive, free DNS lookup and propagation checker designed for system administrators, DevOps engineers, MSPs, and anyone who manages domains. Unlike basic DNS tools, ReviewMyDNS provides deep diagnostic analysis alongside standard lookups.

What makes it different:
• Queries 50+ DNS servers across North America, Europe, Asia, and Oceania simultaneously
• Auto-interprets results with actionable insights — detects Google Workspace/Microsoft 365 MX misconfigurations, validates SPF/DKIM/DMARC records, identifies Cloudflare proxy detection, and flags propagation inconsistencies
• Interactive propagation map shows DNS status by geographic region
• Response time performance charts help identify slow-resolving servers
• Results are shareable via unique URLs — great for team collaboration and client communication
• Completely free embeddable DNS checker widget for blogs, documentation, and hosting dashboards

The tool supports all major record types (A, AAAA, MX, CNAME, TXT, NS, SOA) and includes an extensive library of DNS setup guides for 25+ hosting providers, troubleshooting guides for common errors, and educational content covering DNS fundamentals.

No signup required for basic lookups. Pro plans available for bulk lookups, monitoring, and API access.

Website: https://reviewmydns.com
Embed Widget: https://reviewmydns.com/widget`;

const REDDIT_POST = `I built a free DNS propagation checker that queries 50+ servers worldwide

Hey everyone — I've been working on ReviewMyDNS (https://reviewmydns.com), a free DNS propagation checker.

What it does:
- Checks DNS records (A, MX, CNAME, TXT, NS, etc.) across 50+ global servers
- Shows propagation status on an interactive world map
- Auto-diagnoses common issues (SPF/DKIM/DMARC misconfigs, MX problems, propagation delays)
- Generates shareable result URLs for team collaboration

I built it because existing tools either had limited server coverage, required signups, or didn't provide diagnostic context for the results.

Would love feedback from anyone who manages DNS regularly. What features would make your workflow easier?`;

const HN_POST = `ReviewMyDNS – Free DNS propagation checker with auto-diagnostics

https://reviewmydns.com

ReviewMyDNS checks DNS records across 50+ global servers with auto-diagnostic insights. It detects common misconfigurations (SPF/DKIM/DMARC, MX routing, nameserver delegation) and shows propagation on an interactive map.

Built with React, Express, and PostgreSQL. No signup required.`;

interface Directory {
  name: string;
  url: string;
  category: string;
  description: string;
  priority: "high" | "medium" | "low";
}

const DIRECTORIES: Directory[] = [
  { name: "Product Hunt", url: "https://www.producthunt.com/posts/new", category: "Launch Platform", description: "Submit as a new product. Best to launch on a Tuesday-Thursday. Prepare screenshots, a tagline, and maker story.", priority: "high" },
  { name: "AlternativeTo", url: "https://alternativeto.net/manage/submit/", category: "Tool Directory", description: "List as an alternative to MXToolbox, DNSChecker.org, and WhatsMyDNS. Strong for comparison traffic.", priority: "high" },
  { name: "ToolsFinder", url: "https://toolsfinder.co/submit", category: "Tool Directory", description: "Developer and IT tool directory. Submit under 'DNS Tools' or 'Network Tools' category.", priority: "high" },
  { name: "Free for Dev", url: "https://github.com/ripienaar/free-for-dev", category: "GitHub List", description: "Open a PR to add ReviewMyDNS under the 'DNS' section. High traffic curated list.", priority: "high" },
  { name: "awesome-selfhosted", url: "https://github.com/awesome-selfhosted/awesome-selfhosted", category: "GitHub List", description: "If applicable, contribute to the DNS section. Very high visibility among sysadmins.", priority: "medium" },
  { name: "Hacker News (Show HN)", url: "https://news.ycombinator.com/submit", category: "Community", description: "Post as 'Show HN: ReviewMyDNS – Free DNS propagation checker with auto-diagnostics'. Best on weekday mornings EST.", priority: "high" },
  { name: "Reddit r/sysadmin", url: "https://www.reddit.com/r/sysadmin/", category: "Community", description: "Share as a useful tool post. Focus on the diagnostic features and how it helps troubleshooting.", priority: "high" },
  { name: "Reddit r/selfhosted", url: "https://www.reddit.com/r/selfhosted/", category: "Community", description: "Frame as a tool for self-hosters managing their own DNS. Mention the free embeddable widget.", priority: "medium" },
  { name: "Reddit r/webdev", url: "https://www.reddit.com/r/webdev/", category: "Community", description: "Post about the tool or write about the tech stack. Developers appreciate technical details.", priority: "medium" },
  { name: "Reddit r/devops", url: "https://www.reddit.com/r/devops/", category: "Community", description: "Focus on the monitoring and bulk lookup features. DevOps teams need reliable DNS verification.", priority: "high" },
  { name: "Dev.to", url: "https://dev.to/enter", category: "Blog/Content", description: "Write a technical article about building the DNS checker or about DNS propagation concepts. Include tool link.", priority: "high" },
  { name: "Hashnode", url: "https://hashnode.com/onboard", category: "Blog/Content", description: "Publish a DNS tutorial or case study. Good for developer-focused backlinks.", priority: "medium" },
  { name: "IndieHackers", url: "https://www.indiehackers.com/products", category: "Launch Platform", description: "Create a product page and share your building journey. The community loves indie tool makers.", priority: "medium" },
  { name: "BetaList", url: "https://betalist.com/submit", category: "Launch Platform", description: "Submit for early-stage product exposure. Good for initial traction and backlinks.", priority: "medium" },
  { name: "Slant", url: "https://www.slant.co/", category: "Tool Directory", description: "Answer questions about DNS tools and recommend ReviewMyDNS where relevant.", priority: "low" },
  { name: "StackShare", url: "https://stackshare.io/", category: "Tool Directory", description: "Create a tool profile. Developers use StackShare to discover and compare tools.", priority: "medium" },
  { name: "G2", url: "https://www.g2.com/products/new", category: "Review Platform", description: "List the product for reviews. Business buyers check G2 before choosing tools.", priority: "medium" },
  { name: "Capterra", url: "https://www.capterra.com/vendors/sign-up", category: "Review Platform", description: "Similar to G2 — list for visibility among IT buyers comparing DNS/network tools.", priority: "low" },
  { name: "SaaSHub", url: "https://www.saashub.com/submit", category: "Tool Directory", description: "SaaS comparison platform. List as an alternative to DNSChecker, MXToolbox, IntoDNS.", priority: "medium" },
  { name: "ToolPilot.ai", url: "https://www.toolpilot.ai/", category: "Tool Directory", description: "AI and developer tool directory. Growing audience of technical users.", priority: "low" },
  { name: "Web Tool Hub", url: "https://www.webtoolhub.com/", category: "Tool Directory", description: "General web tools directory. Good for a quick, easy backlink.", priority: "low" },
  { name: "DNS-related GitHub READMEs", url: "https://github.com/search?q=dns+tools+awesome&type=repositories", category: "GitHub List", description: "Search for curated 'awesome' lists related to DNS, networking, or sysadmin tools and submit PRs to add ReviewMyDNS.", priority: "high" },
];

const priorityColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-gray-100 text-gray-600",
};

export default function BacklinkGuide() {
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(DIRECTORIES.map(d => d.category)))];
  const filtered = filter === "all" ? DIRECTORIES : DIRECTORIES.filter(d => d.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>Backlink & Submission Guide - ReviewMyDNS</title>
        <meta name="robots" content="noindex, nofollow" />
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
              <Link href="/link-to-us" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Link to Us</Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Backlink & Submission Guide</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pre-written descriptions and a curated list of 20+ directories, communities, and platforms to submit ReviewMyDNS for backlinks and visibility.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Ready-to-Use Descriptions
          </h2>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Short Description (1-2 sentences)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CopyBlock text={SHORT_DESC} label="Short description" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Medium Description (with features list)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CopyBlock text={MEDIUM_DESC} label="Medium description" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  Full Description (for detailed listings)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CopyBlock text={LONG_DESC} label="Full description" />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Community Post Templates
          </h2>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Reddit Post Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CopyBlock text={REDDIT_POST} label="Reddit post" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Hacker News (Show HN) Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CopyBlock text={HN_POST} label="HN post" />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Directory & Submission Targets ({DIRECTORIES.length} sites)
          </h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className="text-xs capitalize"
              >
                {cat === "all" ? `All (${DIRECTORIES.length})` : `${cat} (${DIRECTORIES.filter(d => d.category === cat).length})`}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((dir) => (
              <Card key={dir.name} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <a
                          href={dir.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {dir.name}
                        </a>
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{dir.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${priorityColors[dir.priority]}`}>
                          {dir.priority} priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{dir.description}</p>
                    </div>
                    <a href={dir.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="shrink-0">
                        Visit
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Submission Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Start with high-priority targets first — they have the most impact on SEO and traffic.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Space out Reddit posts across different subreddits (1-2 per week max). Don't spam.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  For Product Hunt, prep your launch page with screenshots, description, and maker comment in advance.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  When submitting to GitHub lists, follow the repo's contribution guidelines exactly.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Engage genuinely in communities — answer DNS questions and mention the tool where helpful.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Track which submissions are completed using a spreadsheet to avoid duplicates.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Need badges or embed codes? Visit the <Link href="/link-to-us" className="text-blue-600 hover:underline">Link to Us</Link> page.
          </p>
        </div>
      </main>
    </div>
  );
}
