import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, Zap, Shield, Globe } from "lucide-react";

// Sidebar sponsored tools component
export function SponsoredToolsSidebar() {
  const sponsoredTools = [
    {
      name: "DNS Made Easy",
      description: "Premium DNS hosting with instant propagation",
      icon: Globe,
      tier: "Premium Partner",
      ctaText: "Try Free",
      url: "#",
      color: "bg-blue-600"
    },
    {
      name: "NS1",
      description: "Enterprise DNS platform with traffic steering",
      icon: Zap,
      tier: "Featured",
      ctaText: "Learn More",
      url: "#",
      color: "bg-purple-600"
    },
    {
      name: "DNS Filter",
      description: "Secure DNS filtering for businesses",
      icon: Shield,
      tier: "Security Partner",
      ctaText: "Get Quote",
      url: "#",
      color: "bg-green-600"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <span className="text-xs text-gray-500 uppercase tracking-wide">Featured Partners</span>
      </div>
      {sponsoredTools.map((tool, index) => {
        const IconComponent = tool.icon;
        return (
          <Card key={index} className="border-gray-200 hover:border-blue-300 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{tool.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {tool.tier}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {tool.description}
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-xs"
                    onClick={() => window.open(tool.url, '_blank')}
                  >
                    {tool.ctaText}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Header banner for special promotions
export function HeaderPromoBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4" />
          <span>Special Offer: Get 50% off premium DNS hosting for new users</span>
        </div>
        <Button variant="secondary" size="sm" className="text-xs">
          Claim Deal
        </Button>
      </div>
    </div>
  );
}

// Footer sponsor showcase
export function FooterSponsors() {
  const sponsors = [
    { name: "Cloudflare", logo: "CF" },
    { name: "AWS Route 53", logo: "R53" },
    { name: "Google Cloud DNS", logo: "GCD" },
    { name: "Azure DNS", logo: "AZ" },
    { name: "DigitalOcean", logo: "DO" },
    { name: "Vultr", logo: "VU" }
  ];

  return (
    <div className="border-t border-gray-700 pt-8 mt-8">
      <div className="text-center mb-6">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
          Trusted DNS Providers
        </h4>
        <p className="text-xs text-gray-400">
          ReviewMyDNS is proudly supported by leading DNS infrastructure providers
        </p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="text-center">
            <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-colors cursor-pointer">
              <div className="text-sm font-bold text-gray-300 mb-1">{sponsor.logo}</div>
              <div className="text-xs text-gray-400">{sponsor.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Content marketing sponsored posts
export function SponsoredContent() {
  const articles = [
    {
      title: "Best Practices for DNS Security in 2025",
      description: "Learn how to protect your DNS infrastructure with these expert recommendations",
      sponsor: "DNS Filter",
      readTime: "5 min read",
      url: "#"
    },
    {
      title: "Scaling DNS for Global Applications",
      description: "How enterprise companies handle DNS at scale with advanced traffic management",
      sponsor: "NS1",
      readTime: "8 min read",
      url: "#"
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Sponsored Content</span>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">DNS Industry Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    Sponsored by {article.sponsor}
                  </Badge>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                <Button variant="outline" size="sm" onClick={() => window.open(article.url, '_blank')}>
                  Read Article
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}