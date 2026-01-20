import { Card } from "@/components/ui/card";

type AdSize = "banner" | "rectangle" | "leaderboard" | "sidebar";

interface AdSlotProps {
  size: AdSize;
  className?: string;
}

const sizeConfig: Record<AdSize, { width: string; height: string; label: string }> = {
  banner: { width: "w-full", height: "h-[90px]", label: "728x90" },
  rectangle: { width: "w-[300px]", height: "h-[250px]", label: "300x250" },
  leaderboard: { width: "w-full", height: "h-[90px]", label: "970x90" },
  sidebar: { width: "w-[160px]", height: "h-[600px]", label: "160x600" },
};

export function AdSlot({ size, className = "" }: AdSlotProps) {
  const config = sizeConfig[size];
  
  return (
    <div className={`${config.width} ${className}`}>
      <Card className={`${config.height} flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-50 border-dashed border-2 border-slate-200`}>
        <div className="text-center text-slate-400">
          <p className="text-xs font-medium">Advertisement</p>
          <p className="text-[10px]">{config.label}</p>
        </div>
      </Card>
    </div>
  );
}
