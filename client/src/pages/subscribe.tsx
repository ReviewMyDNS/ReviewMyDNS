import { useEffect, useState, useCallback } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/logo";

export default function Subscribe() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Get plan from URL query parameter (default to 'pro')
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan') || 'pro';

  const handleCheckout = useCallback(async () => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    
    try {
      const res = await apiRequest("POST", "/api/create-checkout-session", { plan });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
      setIsRedirecting(false);
    }
  }, [plan, toast, isRedirecting]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = `/signin?redirect=/subscribe?plan=${plan}`;
      }, 1000);
    }
  }, [isAuthenticated, isLoading, toast, plan]);

  // Auto-start checkout when authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated && !isRedirecting) {
      handleCheckout();
    }
  }, [isLoading, isAuthenticated, handleCheckout]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  const planDetails = plan === 'enterprise' ? {
    name: 'Enterprise',
    price: '$149',
    features: [
      "Everything in Team, plus:",
      "Unlimited team seats",
      "SSO authentication (SAML, OAuth)",
      "Advanced audit logs",
      "Custom API quotas",
      "Dedicated account manager",
      "99.9% SLA guarantee",
      "24/7 premium support"
    ]
  } : plan === 'team' ? {
    name: 'Team',
    price: '$59',
    features: [
      "Everything in Pro, plus:",
      "5 team seats included",
      "Shared lookup history",
      "Scheduled monitoring",
      "Slack/Webhook integrations",
      "Advanced alerting rules",
      "Team dashboard",
      "API access (100k calls/month)"
    ]
  } : {
    name: 'Pro',
    price: '$19',
    features: [
      "Unlimited DNS lookups",
      "All DNS record types",
      "Bulk lookup (500 domains/day)",
      "30-day historical tracking",
      "Performance analytics dashboard",
      "API access (25,000 calls/month)",
      "Email alerts for DNS changes",
      "Priority support"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Logo size="sm" className="mr-2" />
                  <h1 className="text-xl font-bold text-gray-900">ReviewMyDNS</h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Button */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ready to subscribe?</CardTitle>
                <CardDescription>
                  You'll be redirected to Stripe's secure checkout page to complete your payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleCheckout} 
                  disabled={isRedirecting} 
                  className="w-full" 
                  size="lg"
                  data-testid="button-checkout"
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Redirecting to Checkout...
                    </>
                  ) : (
                    "Continue to Checkout"
                  )}
                </Button>
                
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Secure payment with Stripe
                  </p>
                  <p className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Cancel anytime
                  </p>
                  <p className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    30-day money-back guarantee
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plan Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{planDetails.name} Plan - {planDetails.price}/month</CardTitle>
                <CardDescription>
                  {plan === 'enterprise' 
                    ? 'Complete DNS monitoring for organizations and large teams'
                    : 'Everything you need for professional DNS monitoring'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {planDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-blue-900 mb-2">Money-Back Guarantee</h4>
                <p className="text-sm text-blue-700">
                  Try ReviewMyDNS Pro risk-free. Cancel within 30 days for a full refund, no questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
