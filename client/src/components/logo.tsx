import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "h-14 w-14",
    md: "h-20 w-20",
    lg: "h-32 w-32"
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
