import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Zap } from "lucide-react";

interface ExitIntentPopupProps {
  hasUsedTool: boolean;
}

export function ExitIntentPopup({ hasUsedTool }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenExitPopup = localStorage.getItem("exitPopupSeen");
    
    if (hasSeenExitPopup || hasUsedTool) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasUsedTool) {
        setIsOpen(true);
        localStorage.setItem("exitPopupSeen", "true");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasUsedTool]);

  const handleTryNow = () => {
    setIsOpen(false);
    const input = document.querySelector('input[placeholder*="domain"]') as HTMLInputElement;
    if (input) {
      input.value = "google.com";
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
      const submitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitBtn) submitBtn.click();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-5 w-5 text-yellow-500" />
            Wait! See it in action first
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Try a quick DNS lookup before you go - it takes 2 seconds and shows you exactly how we check 50+ global servers.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={handleTryNow} className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Try with google.com
          </Button>
          <Button variant="ghost" onClick={() => setIsOpen(false)} className="w-full text-gray-500">
            No thanks, maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
