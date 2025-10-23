import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from 'drizzle-orm';

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

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (for email/password auth + Stripe)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  passwordHash: varchar("password_hash").notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status"),
  subscriptionPlan: varchar("subscription_plan"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Auth schemas for signup and signin
export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
