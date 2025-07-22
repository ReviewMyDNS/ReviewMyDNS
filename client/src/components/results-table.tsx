import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DnsResult, DnsServer } from "@shared/schema";

interface ResultsTableProps {
  results: (DnsResult & { server: DnsServer })[];
}

const getFlagEmoji = (countryCode: string): string => {
  const flagMap: Record<string, string> = {
    'US': '🇺🇸',
    'GB': '🇬🇧',
    'CA': '🇨🇦',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
    'JP': '🇯🇵',
    'CN': '🇨🇳',
    'AU': '🇦🇺',
    'IN': '🇮🇳',
    'RU': '🇷🇺',
    'KR': '🇰🇷',
    'AT': '🇦🇹',
    'CZ': '🇨🇿',
  };
  return flagMap[countryCode] || '🌐';
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'resolved':
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
          Resolved
        </Badge>
      );
    case 'failed':
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
          Failed
        </Badge>
      );
    case 'timeout':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
          Timeout
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          <div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div>
          Unknown
        </Badge>
      );
  }
};

const formatResponseTime = (responseTime: number | null): string => {
  if (responseTime === null) return 'N/A';
  if (responseTime >= 1000) {
    return `${(responseTime / 1000).toFixed(2)}s`;
  }
  return `${responseTime}ms`;
};

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">📊</div>
        <p>DNS results will appear here after lookup</p>
      </div>
    );
  }

  // Sort results by response time (resolved first, then by time)
  const sortedResults = [...results].sort((a, b) => {
    if (a.status === 'resolved' && b.status !== 'resolved') return -1;
    if (a.status !== 'resolved' && b.status === 'resolved') return 1;
    
    const aTime = a.responseTime || 9999;
    const bTime = b.responseTime || 9999;
    return aTime - bTime;
  });

  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>DNS Server</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Response</TableHead>
            <TableHead>Response Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedResults.map((result) => (
            <TableRow key={result.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center">
                  <span className="text-lg mr-2">{getFlagEmoji(result.server.country)}</span>
                  <span className="text-sm font-medium">{result.server.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="text-sm font-medium">{result.server.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{result.server.ip}</div>
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(result.status)}
              </TableCell>
              <TableCell>
                <div className="max-w-xs">
                  {result.response ? (
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded break-all">
                      {result.response.length > 50 
                        ? `${result.response.substring(0, 50)}...` 
                        : result.response
                      }
                    </code>
                  ) : (
                    <span className="text-gray-400 text-sm">No response</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className={`text-sm ${
                  result.responseTime && result.responseTime < 100 
                    ? 'text-green-600 font-medium' 
                    : result.responseTime && result.responseTime < 500
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}>
                  {formatResponseTime(result.responseTime)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
