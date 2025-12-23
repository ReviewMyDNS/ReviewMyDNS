import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackShareResult } from "@/lib/analytics";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  domain?: string;
}

export function SocialShareButtons({ url, title, description, domain }: SocialShareButtonsProps) {
  const encodeUrl = encodeURIComponent(url);
  const encodeTitle = encodeURIComponent(title);
  const encodeDesc = encodeURIComponent(description || "");
  const domainForTracking = domain || new URL(url).hostname;

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeUrl}&text=${encodeTitle}`,
      color: "hover:text-blue-400"
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeUrl}`,
      color: "hover:text-blue-600"
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`,
      color: "hover:text-blue-700"
    },
    {
      name: "Reddit",
      url: `https://reddit.com/submit?url=${encodeUrl}&title=${encodeTitle}`,
      color: "hover:text-orange-500"
    },
    {
      name: "HackerNews",
      url: `https://news.ycombinator.com/submitlink?u=${encodeUrl}&t=${encodeTitle}`,
      color: "hover:text-orange-600"
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    trackShareResult({ domain: domainForTracking, method: 'link' });
  };

  const handleSocialShare = (name: string, shareUrl: string) => {
    trackShareResult({ domain: domainForTracking, method: name.toLowerCase() });
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share:
      </span>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="sm"
          className={`${link.color} text-gray-600`}
          onClick={() => handleSocialShare(link.name, link.url)}
          data-testid={`share-${link.name.toLowerCase()}`}
        >
          {link.name}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-gray-900"
        onClick={handleCopyLink}
        data-testid="share-copy-link"
      >
        Copy Link
      </Button>
    </div>
  );
}
