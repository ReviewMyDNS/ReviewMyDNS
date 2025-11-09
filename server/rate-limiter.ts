import { db } from "./db";
import { usageLogs } from "@shared/schema";
import { eq, and, gte, sql } from "drizzle-orm";
import type { Request } from "express";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: Date;
}

export async function checkRateLimit(
  userId: string | null,
  anonymousId: string | null,
  action: string,
  limit: number
): Promise<RateLimitResult> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Count usage for today
  const whereClause = userId 
    ? and(eq(usageLogs.userId, userId), eq(usageLogs.action, action), gte(usageLogs.date, today))
    : and(eq(usageLogs.anonymousId, anonymousId!), eq(usageLogs.action, action), gte(usageLogs.date, today));
  
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(usageLogs)
    .where(whereClause);
  
  const currentCount = Number(result[0]?.count || 0);
  
  // Unlimited = -1
  const allowed = limit === -1 || currentCount < limit;
  const remaining = limit === -1 ? -1 : Math.max(0, limit - currentCount);
  
  // Reset at midnight
  const resetAt = new Date(today);
  resetAt.setDate(resetAt.getDate() + 1);
  
  return {
    allowed,
    remaining,
    limit,
    resetAt,
  };
}

export async function logUsage(
  userId: string | null,
  anonymousId: string | null,
  action: string
): Promise<void> {
  await db.insert(usageLogs).values({
    userId,
    anonymousId,
    action,
    date: new Date(),
  });
}

export function getAnonymousId(req: Request): string {
  // Use IP + User Agent for anonymous tracking
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  return `${ip}-${userAgent.slice(0, 50)}`;
}
