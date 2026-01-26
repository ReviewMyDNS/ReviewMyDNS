import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface EmailCapturePopupProps {
  triggerOnLookup?: boolean;
}

export function EmailCapturePopup({ triggerOnLookup = false }: EmailCapturePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already captured email, dismissed, or seen the popup
    const hasSeenPopup = localStorage.getItem("emailPopupSeen");
    const hasDismissed = localStorage.getItem("emailPopupDismissed");
    const hasCaptured = localStorage.getItem("emailCaptured");
    
    if (!hasSeenPopup && !hasDismissed && !hasCaptured) {
      // Show popup after first lookup OR after 30 seconds (whichever comes first)
      if (triggerOnLookup) {
        setIsOpen(true);
        localStorage.setItem("emailPopupSeen", "true");
      } else {
        const timer = setTimeout(() => {
          setIsOpen(true);
          localStorage.setItem("emailPopupSeen", "true");
        }, 30000); // Increased to 30s - less annoying
        return () => clearTimeout(timer);
      }
    }
  }, [triggerOnLookup]);

  const emailCaptureMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/email-capture", {
        email,
        source: "popup",
        referrer: document.referrer || window.location.href,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You'll get notified about DNS monitoring features",
      });
      setIsOpen(false);
      localStorage.setItem("emailCaptured", "true");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save email",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    emailCaptureMutation.mutate(email);
  };

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("emailPopupDismissed", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <button 
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          data-testid="close-popup"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Get DNS Monitoring Alerts
          </DialogTitle>
          <DialogDescription className="text-center">
            Be the first to know when we launch real-time DNS monitoring with instant change alerts
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            data-testid="input-email-capture"
          />
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={emailCaptureMutation.isPending}
              data-testid="button-notify-me"
            >
              {emailCaptureMutation.isPending ? "Saving..." : "Notify Me"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleDismiss}
              className="flex-1"
              data-testid="button-no-thanks"
            >
              No Thanks
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
