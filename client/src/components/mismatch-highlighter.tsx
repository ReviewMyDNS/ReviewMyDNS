import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import type { DnsResult, DnsServer } from "@shared/schema";

interface MismatchHighlighterProps {
  results: (DnsResult & { server: DnsServer })[];
}

export function MismatchHighlighter({ results }: MismatchHighlighterProps) {
  const resolvedResults = results.filter((r) => r.status === "resolved" && r.response);
  const failedCount = results.filter((r) => r.status !== "resolved").length;

  if (resolvedResults.length === 0) {
    return null;
  }

  const grouped: Record<string, (DnsResult & { server: DnsServer })[]> = {};
  for (const result of resolvedResults) {
    const value = result.response || "";
    if (!grouped[value]) {
      grouped[value] = [];
    }
    grouped[value].push(result);
  }

  const uniqueValues = Object.keys(grouped);
  const isConsistent = uniqueValues.length === 1;

  if (isConsistent) {
    return (
      <Card className="mb-6 border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Consistent{failedCount > 0 ? ` (with ${failedCount} failure${failedCount > 1 ? "s" : ""})` : ""}
              </Badge>
              <span className="text-sm text-gray-600">All {resolvedResults.length} servers returned:</span>
              <code className="text-xs bg-white px-2 py-1 rounded border border-green-200 font-mono">
                {uniqueValues[0].length > 60 ? uniqueValues[0].substring(0, 60) + "..." : uniqueValues[0]}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedEntries = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);
  const totalResolved = resolvedResults.length;

  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <span>{uniqueValues.length} different values detected across {totalResolved} servers</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {sortedEntries.map(([value, servers], index) => {
            const percentage = Math.round((servers.length / totalResolved) * 100);
            const isMajority = index === 0;

            return (
              <div key={value} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                <ArrowRight className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono break-all">
                      {value.length > 60 ? value.substring(0, 60) + "..." : value}
                    </code>
                    <Badge variant="outline" className={isMajority ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-orange-50 text-orange-700 border-orange-200"}>
                      {isMajority ? "Current" : "Possible old/transitioning value"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 max-w-[120px]">
                      <div
                        className={`h-1.5 rounded-full ${isMajority ? "bg-blue-500" : "bg-orange-400"}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {servers.length} server{servers.length > 1 ? "s" : ""} ({percentage}%)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {failedCount > 0 && (
          <p className="text-xs text-gray-500 mt-3">
            {failedCount} server{failedCount > 1 ? "s" : ""} failed to respond and {failedCount > 1 ? "are" : "is"} not included in this analysis.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
