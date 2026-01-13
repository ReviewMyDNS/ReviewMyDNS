import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SiX, SiLinkedin, SiReddit, SiFacebook } from "react-icons/si";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  domain?: string;
}

export function SocialShare({ url, title, description, domain }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const tweetText = domain 
    ? encodeURIComponent(`Just checked DNS propagation for ${domain} - ${title}\n\nCheck your DNS: `)
    : encodeURIComponent(`${title} - `);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ description: "Link copied to clipboard!" });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({ description: "Failed to copy", variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-500 mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3"
        onClick={() => window.open(shareLinks.twitter, '_blank', 'width=550,height=420')}
      >
        <SiX className="h-4 w-4" />
        <span className="sr-only">Share on X</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3"
        onClick={() => window.open(shareLinks.linkedin, '_blank', 'width=550,height=420')}
      >
        <SiLinkedin className="h-4 w-4" />
        <span className="sr-only">Share on LinkedIn</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3"
        onClick={() => window.open(shareLinks.reddit, '_blank', 'width=550,height=420')}
      >
        <SiReddit className="h-4 w-4" />
        <span className="sr-only">Share on Reddit</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3"
        onClick={() => window.open(shareLinks.facebook, '_blank', 'width=550,height=420')}
      >
        <SiFacebook className="h-4 w-4" />
        <span className="sr-only">Share on Facebook</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3"
        onClick={handleCopy}
      >
        {copied ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">Copy link</span>
      </Button>
    </div>
  );
}
