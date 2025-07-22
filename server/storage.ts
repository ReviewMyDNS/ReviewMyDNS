import { dnsLookups, dnsServers, dnsResults, type DnsLookup, type DnsServer, type DnsResult, type InsertDnsLookup, type InsertDnsServer, type InsertDnsResult, type DnsLookupWithResults } from "@shared/schema";

export interface IStorage {
  // DNS Lookups
  createDnsLookup(lookup: InsertDnsLookup): Promise<DnsLookup>;
  getDnsLookup(id: number): Promise<DnsLookup | undefined>;
  getDnsLookupWithResults(id: number): Promise<DnsLookupWithResults | undefined>;
  
  // DNS Servers
  getAllDnsServers(): Promise<DnsServer[]>;
  getActiveDnsServers(): Promise<DnsServer[]>;
  createDnsServer(server: InsertDnsServer): Promise<DnsServer>;
  
  // DNS Results
  createDnsResult(result: InsertDnsResult): Promise<DnsResult>;
  getDnsResultsByLookupId(lookupId: number): Promise<DnsResult[]>;
}

export class MemStorage implements IStorage {
  private dnsLookups: Map<number, DnsLookup>;
  private dnsServers: Map<number, DnsServer>;
  private dnsResults: Map<number, DnsResult>;
  private currentLookupId: number;
  private currentServerId: number;
  private currentResultId: number;

  constructor() {
    this.dnsLookups = new Map();
    this.dnsServers = new Map();
    this.dnsResults = new Map();
    this.currentLookupId = 1;
    this.currentServerId = 1;
    this.currentResultId = 1;
    
    // Initialize with default DNS servers
    this.initializeDefaultDnsServers();
  }

  private async initializeDefaultDnsServers() {
    const defaultServers: InsertDnsServer[] = [
      { name: "Google DNS", ip: "8.8.8.8", location: "Mountain View, CA", country: "US", provider: "Google", latitude: "37.4056", longitude: "-122.0775", active: true },
      { name: "Cloudflare DNS", ip: "1.1.1.1", location: "San Francisco, CA", country: "US", provider: "Cloudflare", latitude: "37.7749", longitude: "-122.4194", active: true },
      { name: "OpenDNS", ip: "208.67.222.222", location: "San Francisco, CA", country: "US", provider: "OpenDNS", latitude: "37.7749", longitude: "-122.4194", active: true },
      { name: "Quad9", ip: "9.9.9.9", location: "Berkeley, CA", country: "US", provider: "Quad9", latitude: "37.8715", longitude: "-122.2730", active: true },
      { name: "Level3", ip: "4.2.2.2", location: "Denver, CO", country: "US", provider: "Level3", latitude: "39.7392", longitude: "-104.9903", active: true },
      { name: "Comodo DNS", ip: "8.26.56.26", location: "New Jersey", country: "US", provider: "Comodo", latitude: "40.0583", longitude: "-74.4057", active: true },
      { name: "Cloudflare London", ip: "1.0.0.1", location: "London", country: "GB", provider: "Cloudflare", latitude: "51.5074", longitude: "-0.1278", active: true },
      { name: "FreeDNS", ip: "37.235.1.174", location: "Vienna", country: "AT", provider: "FreeDNS", latitude: "48.2082", longitude: "16.3738", active: true },
      { name: "CZ.NIC", ip: "217.31.204.130", location: "Prague", country: "CZ", provider: "CZ.NIC", latitude: "50.0755", longitude: "14.4378", active: true },
      { name: "DNS.WATCH", ip: "84.200.69.80", location: "Germany", country: "DE", provider: "DNS.WATCH", latitude: "51.1657", longitude: "10.4515", active: true },
      { name: "Yandex DNS", ip: "77.88.8.8", location: "Moscow", country: "RU", provider: "Yandex", latitude: "55.7558", longitude: "37.6176", active: true },
      { name: "Alibaba DNS", ip: "223.5.5.5", location: "Hangzhou", country: "CN", provider: "Alibaba", latitude: "30.2741", longitude: "120.1551", active: true },
      { name: "Baidu DNS", ip: "180.76.76.76", location: "Beijing", country: "CN", provider: "Baidu", latitude: "39.9042", longitude: "116.4074", active: true },
      { name: "KDDI DNS", ip: "210.196.3.183", location: "Tokyo", country: "JP", provider: "KDDI", latitude: "35.6762", longitude: "139.6503", active: true },
      { name: "IIJ DNS", ip: "210.130.163.82", location: "Tokyo", country: "JP", provider: "IIJ", latitude: "35.6762", longitude: "139.6503", active: true },
      { name: "KT DNS", ip: "168.126.63.1", location: "Seoul", country: "KR", provider: "KT", latitude: "37.5665", longitude: "126.9780", active: true },
      { name: "Telstra DNS", ip: "139.130.4.4", location: "Sydney", country: "AU", provider: "Telstra", latitude: "-33.8688", longitude: "151.2093", active: true },
      { name: "Optus DNS", ip: "211.29.132.12", location: "Sydney", country: "AU", provider: "Optus", latitude: "-33.8688", longitude: "151.2093", active: true },
      { name: "Bharti Airtel", ip: "124.124.124.124", location: "New Delhi", country: "IN", provider: "Bharti Airtel", latitude: "28.7041", longitude: "77.1025", active: true },
      { name: "BSNL DNS", ip: "61.1.64.1", location: "Mumbai", country: "IN", provider: "BSNL", latitude: "19.0760", longitude: "72.8777", active: true },
    ];

    for (const server of defaultServers) {
      await this.createDnsServer(server);
    }
  }

  async createDnsLookup(insertLookup: InsertDnsLookup): Promise<DnsLookup> {
    const id = this.currentLookupId++;
    const lookup: DnsLookup = {
      ...insertLookup,
      id,
      createdAt: new Date(),
    };
    this.dnsLookups.set(id, lookup);
    return lookup;
  }

  async getDnsLookup(id: number): Promise<DnsLookup | undefined> {
    return this.dnsLookups.get(id);
  }

  async getDnsLookupWithResults(id: number): Promise<DnsLookupWithResults | undefined> {
    const lookup = this.dnsLookups.get(id);
    if (!lookup) return undefined;

    const results = Array.from(this.dnsResults.values())
      .filter(result => result.lookupId === id)
      .map(result => {
        const server = this.dnsServers.get(result.serverId);
        return { ...result, server: server! };
      });

    const resolvedCount = results.filter(r => r.status === 'resolved').length;
    const totalServers = results.length;
    const responseTimeSum = results
      .filter(r => r.responseTime !== null)
      .reduce((sum, r) => sum + (r.responseTime || 0), 0);
    const averageResponseTime = responseTimeSum / Math.max(resolvedCount, 1);
    const globalCoverage = totalServers > 0 ? (resolvedCount / totalServers) * 100 : 0;

    const stats = {
      totalServers,
      resolvedCount,
      unresolvedCount: totalServers - resolvedCount,
      averageResponseTime: Math.round(averageResponseTime),
      globalCoverage: Math.round(globalCoverage),
    };

    return { ...lookup, results, stats };
  }

  async getAllDnsServers(): Promise<DnsServer[]> {
    return Array.from(this.dnsServers.values());
  }

  async getActiveDnsServers(): Promise<DnsServer[]> {
    return Array.from(this.dnsServers.values()).filter(server => server.active);
  }

  async createDnsServer(insertServer: InsertDnsServer): Promise<DnsServer> {
    const id = this.currentServerId++;
    const server: DnsServer = { ...insertServer, id };
    this.dnsServers.set(id, server);
    return server;
  }

  async createDnsResult(insertResult: InsertDnsResult): Promise<DnsResult> {
    const id = this.currentResultId++;
    const result: DnsResult = {
      ...insertResult,
      id,
      timestamp: new Date(),
    };
    this.dnsResults.set(id, result);
    return result;
  }

  async getDnsResultsByLookupId(lookupId: number): Promise<DnsResult[]> {
    return Array.from(this.dnsResults.values()).filter(result => result.lookupId === lookupId);
  }
}

export const storage = new MemStorage();
