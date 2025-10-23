import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function Subscribe() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Get plan from URL query parameter (default to 'pro')
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan') || 'pro';

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);
    }
  }, [isAuthenticated, isLoading, toast]);

  const handleCheckout = async () => {
    setIsRedirecting(true);
    
    try {
      const res = await apiRequest("POST", "/api/create-checkout-session", { plan });
      const data = await res.json();
      
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
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
  };

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
    price: '$49',
    features: [
      "Unlimited DNS lookups",
      "50+ global DNS servers",
      "Real-time propagation monitoring",
      "Historical DNS tracking",
      "Performance analytics",
      "Email notifications",
      "API access (unlimited)",
      "Dedicated support"
    ]
  } : {
    name: 'Pro',
    price: '$19',
    features: [
      "Unlimited DNS lookups",
      "50+ global DNS servers",
      "Real-time propagation monitoring",
      "Historical DNS tracking",
      "Performance analytics",
      "Email notifications",
      "API access (5,000 requests/month)",
      "Priority support"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/pricing">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Pricing
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Subscribe to ReviewMyDNS {planDetails.name}</h1>
            <div className="w-24"></div>
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
