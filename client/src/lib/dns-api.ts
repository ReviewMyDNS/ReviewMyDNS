import { apiRequest } from "./queryClient";
import type { DnsLookupWithResults, InsertDnsLookup, DnsServer } from "@shared/schema";

export const dnsApi = {
  // Perform DNS lookup
  async performLookup(data: InsertDnsLookup): Promise<DnsLookupWithResults> {
    const response = await apiRequest("POST", "/api/dns/lookup", data);
    return response.json();
  },

  // Get lookup results by ID
  async getLookupResults(id: number): Promise<DnsLookupWithResults> {
    const response = await apiRequest("GET", `/api/dns/lookup/${id}`);
    return response.json();
  },

  // Get all DNS servers
  async getDnsServers(): Promise<DnsServer[]> {
    const response = await apiRequest("GET", "/api/dns/servers");
    return response.json();
  },

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await apiRequest("GET", "/api/health");
    return response.json();
  }
};
