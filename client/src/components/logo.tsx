import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "h-10 w-10 md:h-12 md:w-12",
    md: "h-14 w-14 md:h-20 md:w-20",
    lg: "h-20 w-20 md:h-24 md:w-24"
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
