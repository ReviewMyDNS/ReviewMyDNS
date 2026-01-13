import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { Logo } from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Clock, Globe, Search, ArrowRight, RefreshCw } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { DnsLookupWithResults } from "@shared/schema";

interface DnsCheckResult {
  domain: string;
  status: 'up' | 'down' | 'partial' | 'checking';
  resolvedCount: number;
  totalServers: number;
  averageResponseTime: number;
  checkedAt: string;
}

export default function IsDown() {
  const params = useParams<{ domain?: string }>();
  const [, setLocation] = useLocation();
  const [inputDomain, setInputDomain] = useState(params.domain || "");
  const domainToCheck = params.domain?.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');

  const [checkResult, setCheckResult] = useState<DnsCheckResult | null>(null);

  const checkMutation = useMutation({
    mutationFn: async (domain: string) => {
      const response = await apiRequest("POST", "/api/dns/lookup", {
        domain,
        recordType: "A"
      });
      return response.json() as Promise<DnsLookupWithResults>;
    },
    onSuccess: (result) => {
      setCheckResult({
        domain: result.domain,
        status: result.stats.resolvedCount === result.stats.totalServers ? 'up' : 
                result.stats.resolvedCount === 0 ? 'down' : 'partial',
        resolvedCount: result.stats.resolvedCount,
        totalServers: result.stats.totalServers,
        averageResponseTime: result.stats.averageResponseTime,
        checkedAt: new Date().toISOString(),
      });
    },
  });

  useEffect(() => {
    if (domainToCheck && !checkResult) {
      checkMutation.mutate(domainToCheck);
    }
  }, [domainToCheck]);

  const isLoading = checkMutation.isPending;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputDomain) {
      const cleanDomain = inputDomain.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      setLocation(`/is-down/${cleanDomain}`);
    }
  };

  const popularDomains = [
    'google.com', 'facebook.com', 'twitter.com', 'instagram.com',
    'youtube.com', 'github.com', 'reddit.com', 'amazon.com'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{domainToCheck ? `Is ${domainToCheck} Down? Check Status Now` : 'Is It Down? - Website Status Checker'} | ReviewMyDNS</title>
        <meta name="description" content={domainToCheck ? `Check if ${domainToCheck} is down right now. Real-time DNS check across 50+ global servers.` : 'Free website status checker. Check if any website is down or just you.'} />
        <meta name="keywords" content={domainToCheck ? `is ${domainToCheck} down, ${domainToCheck} status, ${domainToCheck} not working` : 'is it down, website status, site down checker, DNS check'} />
        <meta property="og:title" content={domainToCheck ? `Is ${domainToCheck} Down?` : 'Website Status Checker'} />
        <meta property="og:description" content={domainToCheck ? `Real-time status check for ${domainToCheck}` : 'Check if any website is down'} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://reviewmydns.com/is-down${domainToCheck ? `/${domainToCheck}` : ''}`} />
        {domainToCheck && checkResult && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": `Is ${domainToCheck} Down?`,
              "description": `Status check for ${domainToCheck}`,
              "mainEntity": {
                "@type": "WebSite",
                "name": domainToCheck,
                "url": `https://${domainToCheck}`,
              }
            })}
          </script>
        )}
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {domainToCheck ? `Is ${domainToCheck} Down?` : 'Is It Down Right Now?'}
          </h1>
          <p className="text-xl text-gray-600">
            {domainToCheck 
              ? 'Real-time DNS check across 50+ global servers'
              : 'Check if a website is down for everyone or just you'
            }
          </p>
        </div>

        <form onSubmit={handleCheck} className="mb-8">
          <div className="flex gap-2 max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Enter domain (e.g., google.com)"
              value={inputDomain}
              onChange={(e) => setInputDomain(e.target.value)}
              className="flex-1 h-12 text-lg"
            />
            <Button type="submit" className="h-12 px-6">
              <Search className="w-5 h-5 mr-2" />
              Check
            </Button>
          </div>
        </form>

        {isLoading && (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">Checking {domainToCheck} across global servers...</p>
            </CardContent>
          </Card>
        )}

        {checkResult && !isLoading && (
          <Card className={`mb-8 border-2 ${
            checkResult.status === 'up' ? 'border-green-300 bg-green-50' :
            checkResult.status === 'down' ? 'border-red-300 bg-red-50' :
            'border-amber-300 bg-amber-50'
          }`}>
            <CardContent className="p-8">
              <div className="text-center">
                {checkResult.status === 'up' ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                ) : checkResult.status === 'down' ? (
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                ) : (
                  <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                )}
                
                <h2 className="text-2xl font-bold mb-2">
                  {checkResult.status === 'up' && `${domainToCheck} is UP`}
                  {checkResult.status === 'down' && `${domainToCheck} appears to be DOWN`}
                  {checkResult.status === 'partial' && `${domainToCheck} has partial issues`}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {checkResult.resolvedCount} of {checkResult.totalServers} DNS servers resolved successfully
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                  <Badge variant="outline" className="text-base py-1 px-3">
                    <Globe className="w-4 h-4 mr-1" />
                    {checkResult.resolvedCount}/{checkResult.totalServers} Servers
                  </Badge>
                  <Badge variant="outline" className="text-base py-1 px-3">
                    <Clock className="w-4 h-4 mr-1" />
                    {checkResult.averageResponseTime.toFixed(0)}ms avg
                  </Badge>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="outline" onClick={() => domainToCheck && checkMutation.mutate(domainToCheck)}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Check Again
                  </Button>
                  <Link href={`/?domain=${domainToCheck}`}>
                    <Button>
                      Full DNS Analysis <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!domainToCheck && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Popular Sites to Check</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularDomains.map((domain) => (
                <Link key={domain} href={`/is-down/${domain}`}>
                  <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <p className="font-medium text-gray-900">{domain}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="bg-white rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How This Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Global DNS Check</h3>
              <p className="text-sm text-gray-600">We query 50+ DNS servers worldwide to see if the domain resolves.</p>
            </div>
            <div>
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <span className="font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Response Analysis</h3>
              <p className="text-sm text-gray-600">We measure response times and check for DNS propagation issues.</p>
            </div>
            <div>
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <span className="font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Status Report</h3>
              <p className="text-sm text-gray-600">You get instant results showing if the site is up, down, or having issues.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Need More Details?</h2>
          <p className="text-gray-600 mb-6">
            Get a comprehensive DNS analysis with our full lookup tool.
          </p>
          <Link href="/">
            <Button size="lg">
              <Search className="w-5 h-5 mr-2" />
              Full DNS Propagation Check
            </Button>
          </Link>
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
