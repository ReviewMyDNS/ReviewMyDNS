import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-40 w-40"
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
