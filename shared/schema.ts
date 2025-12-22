import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from 'drizzle-orm';

export const dnsLookups = pgTable("dns_lookups", {
  id: serial("id").primaryKey(),
  shareId: varchar("share_id", { length: 12 }),
  userId: varchar("user_id"),
  domain: text("domain").notNull(),
  recordType: text("record_type").notNull(),
  expectedValue: text("expected_value"),
  matchType: text("match_type").default("exact"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  shareIdIdx: index("share_id_idx").on(table.shareId),
  userIdIdx: index("user_id_idx").on(table.userId),
}));

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
  userId: true,
}).partial({ userId: true });

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

// Usage tracking table for rate limiting
export const usageLogs = pgTable("usage_logs", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  anonymousId: varchar("anonymous_id"), // IP-based tracking for non-authenticated users
  action: text("action").notNull(), // 'dns_lookup', 'api_call', 'export'
  date: timestamp("date").defaultNow(),
}, (table) => ({
  userIdIdx: index("usage_user_id_idx").on(table.userId),
  anonymousIdIdx: index("usage_anonymous_id_idx").on(table.anonymousId),
  dateIdx: index("usage_date_idx").on(table.date),
}));

export type InsertUsageLog = typeof usageLogs.$inferInsert;
export type UsageLog = typeof usageLogs.$inferSelect;

// Plan configuration constants
export const PLAN_LIMITS = {
  anonymous: {
    dailyLookups: 5,
    allowedRecordTypes: ["A", "AAAA", "CNAME"],
    features: {
      history: false,
      export: false,
      api: false,
      alerts: false,
      analytics: false,
      bulkLookup: false,
      monitoring: false,
    }
  },
  free: {
    dailyLookups: 50,
    allowedRecordTypes: ["A", "AAAA", "CNAME"],
    features: {
      history: false,
      export: false,
      api: false,
      alerts: false,
      analytics: false,
      bulkLookup: false,
      monitoring: false,
    }
  },
  pro: {
    dailyLookups: -1, // unlimited
    allowedRecordTypes: ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA", "PTR", "SRV", "CAA", "DS", "DNSKEY"],
    features: {
      history: true,
      export: true,
      api: true,
      alerts: true,
      analytics: true,
      bulkLookup: true,
      monitoring: true,
    }
  },
  team: {
    dailyLookups: -1, // unlimited
    allowedRecordTypes: ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA", "PTR", "SRV", "CAA", "DS", "DNSKEY"],
    features: {
      history: true,
      export: true,
      api: true,
      alerts: true,
      analytics: true,
      bulkLookup: true,
      monitoring: true,
    }
  },
  enterprise: {
    dailyLookups: -1, // unlimited
    allowedRecordTypes: ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA", "PTR", "SRV", "CAA", "DS", "DNSKEY"],
    features: {
      history: true,
      export: true,
      api: true,
      alerts: true,
      analytics: true,
      bulkLookup: true,
      monitoring: true,
    }
  }
} as const;

export type PlanTier = keyof typeof PLAN_LIMITS;

// Email captures for marketing and remarketing
export const emailCaptures = pgTable("email_captures", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  source: varchar("source", { length: 100 }), // 'popup', 'landing-page', 'widget'
  referrer: text("referrer"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  emailIdx: index("email_capture_email_idx").on(table.email),
}));

export const insertEmailCaptureSchema = createInsertSchema(emailCaptures).pick({
  email: true,
  source: true,
  referrer: true,
});

export type InsertEmailCapture = z.infer<typeof insertEmailCaptureSchema>;
export type EmailCapture = typeof emailCaptures.$inferSelect;

// Analytics events table for self-hosted analytics
export const analyticsEvents = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  visitorId: varchar("visitor_id", { length: 64 }).notNull(),
  eventType: varchar("event_type", { length: 50 }).notNull(), // 'pageview', 'event', 'identify'
  eventName: varchar("event_name", { length: 100 }), // for custom events
  pathname: text("pathname"),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  country: varchar("country", { length: 2 }),
  browser: varchar("browser", { length: 50 }),
  os: varchar("os", { length: 50 }),
  device: varchar("device", { length: 20 }), // 'desktop', 'mobile', 'tablet'
  screenWidth: integer("screen_width"),
  screenHeight: integer("screen_height"),
  properties: jsonb("properties"), // custom event properties
  userId: varchar("user_id"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  sessionIdx: index("analytics_session_idx").on(table.sessionId),
  visitorIdx: index("analytics_visitor_idx").on(table.visitorId),
  createdAtIdx: index("analytics_created_at_idx").on(table.createdAt),
  eventTypeIdx: index("analytics_event_type_idx").on(table.eventType),
}));

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).pick({
  sessionId: true,
  visitorId: true,
  eventType: true,
  eventName: true,
  pathname: true,
  referrer: true,
  userAgent: true,
  country: true,
  browser: true,
  os: true,
  device: true,
  screenWidth: true,
  screenHeight: true,
  properties: true,
  userId: true,
});

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
