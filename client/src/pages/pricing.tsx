import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Globe, Check, X, Zap, Crown, Users, BarChart3, Bell, Shield, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfect for personal use and testing",
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: Globe,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      features: [
        { name: "50 DNS lookups per day", included: true },
        { name: "Basic DNS record types (A, AAAA, CNAME)", included: true },
        { name: "Global server network", included: true },
        { name: "Basic propagation checking", included: true },
        { name: "Export results (CSV)", included: false },
        { name: "Query history", included: false },
        { name: "Custom monitoring alerts", included: false },
        { name: "API access", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Team collaboration", included: false },
        { name: "Priority support", included: false },
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      description: "For developers and small teams",
      monthlyPrice: 19,
      yearlyPrice: 190,
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      popular: true,
      features: [
        { name: "Unlimited DNS lookups", included: true },
        { name: "All DNS record types", included: true },
        { name: "Global server network", included: true },
        { name: "Advanced propagation checking", included: true },
        { name: "Export results (CSV, JSON)", included: true },
        { name: "30-day query history", included: true },
        { name: "Custom monitoring alerts", included: true },
        { name: "API access (10k requests/month)", included: true },
        { name: "Performance analytics", included: true },
        { name: "Team collaboration (5 members)", included: false },
        { name: "Priority support", included: true },
      ],
      buttonText: "Start Pro Trial",
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      description: "For organizations and large teams",
      monthlyPrice: 49,
      yearlyPrice: 490,
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      features: [
        { name: "Unlimited DNS lookups", included: true },
        { name: "All DNS record types", included: true },
        { name: "Global server network", included: true },
        { name: "Advanced propagation checking", included: true },
        { name: "Export results (all formats)", included: true },
        { name: "Unlimited query history", included: true },
        { name: "Custom monitoring alerts", included: true },
        { name: "API access (unlimited)", included: true },
        { name: "Advanced analytics & reporting", included: true },
        { name: "Team collaboration (unlimited)", included: true },
        { name: "Dedicated support", included: true },
      ],
      buttonText: "Start Enterprise Trial",
      buttonVariant: "default" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to DNS Checker
                </Button>
              </Link>
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">ReviewMyDNS</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signin?tab=signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
              <div className="sm:hidden flex items-center space-x-1">
                <Link href="/signin">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/signin?tab=signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
            Choose the perfect plan for your DNS monitoring needs. Start free and upgrade as you grow.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
              Save 17%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const savings = plan.monthlyPrice * 12 - plan.yearlyPrice;
            
            return (
              <Card
                key={plan.name}
                className={`relative ${plan.borderColor} ${plan.bgColor} ${
                  plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg ${plan.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ${price}
                      </span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-gray-500 ml-1">
                          /{isYearly ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    {isYearly && savings > 0 && (
                      <div className="text-sm text-green-600 mt-1">
                        Save ${savings}/year
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Link href={
                    plan.name === "Free" ? "/api/login" :
                    plan.name === "Enterprise" ? "/subscribe?plan=enterprise" :
                    "/subscribe?plan=pro"
                  }>
                    <Button 
                      className={`w-full mb-6 ${
                        plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''
                      }`}
                      variant={plan.buttonVariant}
                      data-testid={`button-${plan.name.toLowerCase()}-plan`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sponsored Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Our Partners</span>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Trusted by Leading Companies
                </h3>
                <p className="text-gray-600">
                  Join thousands of developers and organizations using ReviewMyDNS
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-lg font-bold text-gray-400">TechCorp</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-lg font-bold text-gray-400">StartupXYZ</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-lg font-bold text-gray-400">DevCo</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-lg font-bold text-gray-400">CloudInc</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Compare All Features
          </h2>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-medium text-gray-900">Features</th>
                      <th className="text-center p-4 font-medium text-gray-900">Free</th>
                      <th className="text-center p-4 font-medium text-gray-900 bg-blue-50">Pro</th>
                      <th className="text-center p-4 font-medium text-gray-900">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "DNS Lookups", free: "50/day", pro: "Unlimited", enterprise: "Unlimited" },
                      { name: "DNS Record Types", free: "Basic", pro: "All Types", enterprise: "All Types" },
                      { name: "Global Servers", free: "✓", pro: "✓", enterprise: "✓" },
                      { name: "Query History", free: "✗", pro: "30 days", enterprise: "Unlimited" },
                      { name: "Export Formats", free: "✗", pro: "CSV, JSON", enterprise: "All formats" },
                      { name: "Monitoring Alerts", free: "✗", pro: "✓", enterprise: "✓" },
                      { name: "API Access", free: "✗", pro: "10k/month", enterprise: "Unlimited" },
                      { name: "Team Members", free: "1", pro: "5", enterprise: "Unlimited" },
                      { name: "Support", free: "Community", pro: "Priority", enterprise: "Dedicated" },
                    ].map((feature, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-b-0">
                        <td className="p-4 font-medium text-gray-900">{feature.name}</td>
                        <td className="p-4 text-center text-gray-600">{feature.free}</td>
                        <td className="p-4 text-center text-gray-600 bg-blue-50">{feature.pro}</td>
                        <td className="p-4 text-center text-gray-600">{feature.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade or downgrade anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can change your plan at any time. Upgrades take effect immediately, 
                  and downgrades take effect at the next billing cycle.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major credit cards (Visa, MasterCard, American Express) 
                  and offer invoice billing for Enterprise customers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Pro and Enterprise plans include a 14-day free trial. 
                  No credit card required to start your trial.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What about data security?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All data is encrypted in transit and at rest. We follow industry 
                  best practices and comply with SOC 2 Type II standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}