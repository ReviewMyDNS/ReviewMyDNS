import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24"
  };

  return (
    <img 
      src="/logo.png" 
      alt="ReviewMyDNS Logo"
      className={cn(sizeClasses[size], className)}
      data-testid="logo-image"
    />
  );
}
