import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10 md:h-16 md:w-16",
    lg: "h-16 w-16 md:h-20 md:w-20"
  };

  return (
    <img 
      src="/globe-icon-new.png" 
      alt="ReviewMyDNS Globe"
      className={cn(sizeClasses[size], className)}
      data-testid="logo-image"
    />
  );
}
