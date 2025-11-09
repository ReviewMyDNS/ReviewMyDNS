import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "h-14 w-14 md:h-16 md:w-16",
    md: "h-16 w-16 md:h-24 md:w-24",
    lg: "h-24 w-24 md:h-28 md:w-28"
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
