import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useState } from "react";

interface AdBannerProps {
  placement: "header" | "sidebar" | "footer" | "content";
  title: string;
  description: string;
  ctaText: string;
  ctaUrl?: string;
  sponsor?: string;
  closeable?: boolean;
}

export function AdBanner({ 
  placement, 
  title, 
  description, 
  ctaText, 
  ctaUrl = "#", 
  sponsor,
  closeable = false 
}: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getAdStyles = () => {
    switch (placement) {
      case "header":
        return "bg-gradient-to-r from-blue-600 to-purple-600 text-white";
      case "sidebar":
        return "bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200";
      case "footer":
        return "bg-gray-800 text-white";
      case "content":
        return "bg-gradient-to-r from-green-50 to-blue-50 border border-blue-200";
      default:
        return "bg-gray-50 border border-gray-200";
    }
  };

  const getSizeClasses = () => {
    switch (placement) {
      case "header":
        return "py-2 px-4";
      case "sidebar":
        return "p-4";
      case "footer":
        return "py-3 px-4";
      case "content":
        return "p-6";
      default:
        return "p-4";
    }
  };

  return (
    <Card className={`${getAdStyles()} relative overflow-hidden`}>
      <CardContent className={getSizeClasses()}>
        {/* Close button for closeable ads */}
        {closeable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 opacity-60 hover:opacity-100"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        )}

        {/* Sponsor label */}
        {sponsor && (
          <div className="text-xs opacity-60 mb-2 uppercase tracking-wide">
            Sponsored by {sponsor}
          </div>
        )}

        <div className={`flex ${placement === "header" ? "items-center justify-between" : "flex-col space-y-3"}`}>
          <div className={placement === "header" ? "flex-1" : ""}>
            <h3 className={`font-semibold ${
              placement === "header" ? "text-sm" : 
              placement === "sidebar" ? "text-base" : 
              "text-lg"
            }`}>
              {title}
            </h3>
            <p className={`${
              placement === "header" ? "text-xs" : "text-sm"
            } opacity-80 ${placement === "header" ? "mt-0" : "mt-1"}`}>
              {description}
            </p>
          </div>

          <div className={placement === "header" ? "ml-4" : ""}>
            <Button
              variant={placement === "header" || placement === "footer" ? "secondary" : "default"}
              size={placement === "header" ? "sm" : "default"}
              className={placement === "header" ? "text-xs" : ""}
              onClick={() => window.open(ctaUrl, '_blank')}
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}