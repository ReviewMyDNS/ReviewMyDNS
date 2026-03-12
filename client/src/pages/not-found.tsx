import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>404 - Page Not Found | ReviewMyDNS</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500 shrink-0" />
            <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link href="/" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Go to DNS Checker
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
