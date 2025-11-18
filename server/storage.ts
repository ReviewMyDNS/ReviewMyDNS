import { dnsLookups, dnsServers, dnsResults, users, emailCaptures, type DnsLookup, type DnsServer, type DnsResult, type InsertDnsLookup, type InsertDnsServer, type InsertDnsResult, type DnsLookupWithResults, type User, type UpsertUser, type InsertEmailCapture, type EmailCapture } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export interface IStorage {
  // DNS Lookups
  createDnsLookup(lookup: InsertDnsLookup): Promise<DnsLookup>;
  getDnsLookup(id: number): Promise<DnsLookup | undefined>;
  getDnsLookupByShareId(shareId: string): Promise<DnsLookupWithResults | undefined>;
  getDnsLookupWithResults(id: number): Promise<DnsLookupWithResults | undefined>;
  
  // DNS Servers
  getAllDnsServers(): Promise<DnsServer[]>;
  getActiveDnsServers(): Promise<DnsServer[]>;
  createDnsServer(server: InsertDnsServer): Promise<DnsServer>;
  
  // DNS Results
  createDnsResult(result: InsertDnsResult): Promise<DnsResult>;
  getDnsResultsByLookupId(lookupId: number): Promise<DnsResult[]>;
  
  // User operations (email/password auth + Stripe)
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(email: string, passwordHash: string, firstName?: string, lastName?: string): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  
  // Email capture
  captureEmail(capture: InsertEmailCapture): Promise<EmailCapture>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize with default DNS servers
    this.initializeDefaultDnsServers();
  }

  private async initializeDefaultDnsServers() {
    // Check if servers already exist
    const existingServers = await db.select().from(dnsServers);
    if (existingServers.length > 0) {
      return; // Already initialized
    }

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
    const shareId = nanoid(10); // Generate unique 10-character ID
    const [lookup] = await db
      .insert(dnsLookups)
      .values({ ...insertLookup, shareId })
      .returning();
    return lookup;
  }

  async getDnsLookup(id: number): Promise<DnsLookup | undefined> {
    const [lookup] = await db.select().from(dnsLookups).where(eq(dnsLookups.id, id));
    return lookup || undefined;
  }

  async getDnsLookupByShareId(shareId: string): Promise<DnsLookupWithResults | undefined> {
    const [lookup] = await db.select().from(dnsLookups).where(eq(dnsLookups.shareId, shareId));
    if (!lookup) return undefined;

    const results = await db
      .select({
        id: dnsResults.id,
        lookupId: dnsResults.lookupId,
        serverId: dnsResults.serverId,
        status: dnsResults.status,
        response: dnsResults.response,
        responseTime: dnsResults.responseTime,
        timestamp: dnsResults.timestamp,
        server: dnsServers,
      })
      .from(dnsResults)
      .innerJoin(dnsServers, eq(dnsResults.serverId, dnsServers.id))
      .where(eq(dnsResults.lookupId, lookup.id));

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
      averageResponseTime,
      globalCoverage,
    };

    return {
      ...lookup,
      results: results as any,
      stats,
    };
  }

  async getDnsLookupWithResults(id: number): Promise<DnsLookupWithResults | undefined> {
    const [lookup] = await db.select().from(dnsLookups).where(eq(dnsLookups.id, id));
    if (!lookup) return undefined;

    const results = await db
      .select({
        id: dnsResults.id,
        lookupId: dnsResults.lookupId,
        serverId: dnsResults.serverId,
        status: dnsResults.status,
        response: dnsResults.response,
        responseTime: dnsResults.responseTime,
        timestamp: dnsResults.timestamp,
        server: dnsServers,
      })
      .from(dnsResults)
      .innerJoin(dnsServers, eq(dnsResults.serverId, dnsServers.id))
      .where(eq(dnsResults.lookupId, id));

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
    return await db.select().from(dnsServers);
  }

  async getActiveDnsServers(): Promise<DnsServer[]> {
    return await db.select().from(dnsServers).where(eq(dnsServers.active, true));
  }

  async createDnsServer(insertServer: InsertDnsServer): Promise<DnsServer> {
    const [server] = await db
      .insert(dnsServers)
      .values(insertServer)
      .returning();
    return server;
  }

  async createDnsResult(insertResult: InsertDnsResult): Promise<DnsResult> {
    const [result] = await db
      .insert(dnsResults)
      .values(insertResult)
      .returning();
    return result;
  }

  async getDnsResultsByLookupId(lookupId: number): Promise<DnsResult[]> {
    return await db.select().from(dnsResults).where(eq(dnsResults.lookupId, lookupId));
  }

  // User operations (email/password auth + Stripe)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(email: string, passwordHash: string, firstName?: string, lastName?: string): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        firstName,
        lastName,
      })
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId,
        stripeSubscriptionId,
        subscriptionStatus: 'active',
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async captureEmail(capture: InsertEmailCapture): Promise<EmailCapture> {
    const [captured] = await db
      .insert(emailCaptures)
      .values(capture)
      .returning();
    return captured;
  }
}

export const storage = new DatabaseStorage();
