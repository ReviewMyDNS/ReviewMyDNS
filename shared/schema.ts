import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const dnsLookups = pgTable("dns_lookups", {
  id: serial("id").primaryKey(),
  domain: text("domain").notNull(),
  recordType: text("record_type").notNull(),
  expectedValue: text("expected_value"),
  matchType: text("match_type").default("exact"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dnsServers = pgTable("dns_servers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ip: text("ip").notNull(),
  location: text("location").notNull(),
  country: text("country").notNull(),
  provider: text("provider").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  active: boolean("active").default(true),
});

export const dnsResults = pgTable("dns_results", {
  id: serial("id").primaryKey(),
  lookupId: integer("lookup_id").notNull(),
  serverId: integer("server_id").notNull(),
  status: text("status").notNull(), // resolved, failed, timeout
  response: text("response"),
  responseTime: integer("response_time"), // in milliseconds
  timestamp: timestamp("timestamp").defaultNow(),
});

// Insert schemas
export const insertDnsLookupSchema = createInsertSchema(dnsLookups).pick({
  domain: true,
  recordType: true,
  expectedValue: true,
  matchType: true,
});

export const insertDnsServerSchema = createInsertSchema(dnsServers).pick({
  name: true,
  ip: true,
  location: true,
  country: true,
  provider: true,
  latitude: true,
  longitude: true,
  active: true,
});

export const insertDnsResultSchema = createInsertSchema(dnsResults).pick({
  lookupId: true,
  serverId: true,
  status: true,
  response: true,
  responseTime: true,
});

// Types
export type InsertDnsLookup = z.infer<typeof insertDnsLookupSchema>;
export type DnsLookup = typeof dnsLookups.$inferSelect;

export type InsertDnsServer = z.infer<typeof insertDnsServerSchema>;
export type DnsServer = typeof dnsServers.$inferSelect;

export type InsertDnsResult = z.infer<typeof insertDnsResultSchema>;
export type DnsResult = typeof dnsResults.$inferSelect;

// Extended types for API responses
export type DnsLookupWithResults = DnsLookup & {
  results: (DnsResult & { server: DnsServer })[];
  stats: {
    totalServers: number;
    resolvedCount: number;
    unresolvedCount: number;
    averageResponseTime: number;
    globalCoverage: number;
  };
};

export type DnsRecordType = "A" | "AAAA" | "CNAME" | "MX" | "NS" | "TXT" | "SOA" | "PTR" | "SRV" | "CAA" | "DS" | "DNSKEY";

export const DNS_RECORD_TYPES: DnsRecordType[] = [
  "A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA", "PTR", "SRV", "CAA", "DS", "DNSKEY"
];
