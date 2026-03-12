import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DnsLookupForm } from "@/components/dns-lookup-form";
import { PropagationMap } from "@/components/propagation-map";
import { ResultsTable } from "@/components/results-table";
import type { DnsLookupWithResults, DnsResult, DnsServer } from "@shared/schema";

// Minimal embeddable DNS checker (no header/footer for iframe)
export default function Embed() {
  const [lookupResults, setLookupResults] = useState<DnsLookupWithResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookupComplete = (results: DnsLookupWithResults) => {
    setLookupResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <Helmet>
        <title>DNS Propagation Checker Widget - ReviewMyDNS</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        {/* Compact header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">DNS Propagation Checker</h2>
          <p className="text-sm text-gray-600">
            Powered by{" "}
            <a 
              href="https://reviewmydns.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ReviewMyDNS
            </a>
          </p>
        </div>

        {/* DNS Lookup Form */}
        <DnsLookupForm onLookupComplete={handleLookupComplete} isLoading={isLoading} setIsLoading={setIsLoading} />

        {/* Results */}
        {lookupResults && lookupResults.results && (
          <div className="mt-6 space-y-6">
            <PropagationMap results={lookupResults.results} />
            <ResultsTable results={lookupResults.results} />
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <a 
            href="https://reviewmydns.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Get Your Own DNS Checker
          </a>
        </div>
      </div>
    </div>
  );
}
