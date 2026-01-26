import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

const SAMPLE_DOMAINS = [
  "example.com", "mysite.org", "api.company.io", "mail.business.net",
  "shop.store.com", "blog.tech.io", "app.startup.co", "cdn.media.net",
  "auth.service.com", "dev.project.io", "staging.app.co", "prod.saas.io"
];

const SAMPLE_TYPES = ["A", "MX", "TXT", "CNAME", "AAAA", "NS"];

export function LiveActivity() {
  const [recentLookups, setRecentLookups] = useState<Array<{ domain: string; type: string; time: string }>>([]);
  const [totalToday, setTotalToday] = useState(Math.floor(Math.random() * 50) + 127);

  useEffect(() => {
    const generateLookup = () => ({
      domain: SAMPLE_DOMAINS[Math.floor(Math.random() * SAMPLE_DOMAINS.length)],
      type: SAMPLE_TYPES[Math.floor(Math.random() * SAMPLE_TYPES.length)],
      time: "just now"
    });

    setRecentLookups([generateLookup(), generateLookup(), generateLookup()]);

    const interval = setInterval(() => {
      setRecentLookups(prev => {
        const updated = prev.map((l, i) => ({
          ...l,
          time: i === 0 ? "just now" : i === 1 ? "30s ago" : "1m ago"
        }));
        return [generateLookup(), ...updated.slice(0, 2)];
      });
      setTotalToday(prev => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3 mt-6">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-green-400">
          <Activity className="h-4 w-4 animate-pulse" />
          <span className="font-medium">{totalToday} lookups today</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-blue-200 text-xs">
          {recentLookups.slice(0, 2).map((lookup, i) => (
            <span key={i} className="opacity-75">
              {lookup.domain} ({lookup.type}) • {lookup.time}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
