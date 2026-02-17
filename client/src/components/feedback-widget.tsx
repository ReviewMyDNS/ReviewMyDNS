import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, MessageSquare, CheckCircle, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackWidgetProps {
  domain: string;
  recordType: string;
}

type FeedbackState = "initial" | "yes" | "no" | "submitted";

export function FeedbackWidget({ domain, recordType }: FeedbackWidgetProps) {
  const storageKey = `reviewmydns_feedback_${domain}_${recordType}`;
  const [state, setState] = useState<FeedbackState>("initial");
  const [feedback, setFeedback] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(storageKey);
      if (existing) {
        setState("submitted");
      }
    } catch {}
  }, [storageKey]);

  const saveFeedback = (value: string) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch {}
  };

  const handleYes = () => {
    setState("yes");
    saveFeedback("yes");
  };

  const handleNo = () => {
    setState("no");
  };

  const handleSubmitFeedback = () => {
    saveFeedback(`no:${feedback}`);
    setState("submitted");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {}
  };

  if (state === "submitted") {
    return (
      <Card className="bg-white rounded-lg shadow-sm border">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Thanks for your feedback!</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === "yes") {
    return (
      <Card className="bg-white rounded-lg shadow-sm border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Glad we could help! Share ReviewMyDNS with your team.</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-1" />
              {linkCopied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === "no") {
    return (
      <Card className="bg-white rounded-lg shadow-sm border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">What were you hoping to find?</span>
          </div>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what would be more helpful..."
            className="min-h-[80px] text-sm"
          />
          <div className="flex justify-end">
            <Button size="sm" onClick={handleSubmitFeedback}>
              Submit Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-sm border">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-gray-600">Did this help you diagnose your DNS issue?</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleYes}>
              <ThumbsUp className="h-4 w-4 mr-1" />
              Yes
            </Button>
            <Button variant="outline" size="sm" onClick={handleNo}>
              <ThumbsDown className="h-4 w-4 mr-1" />
              No
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
