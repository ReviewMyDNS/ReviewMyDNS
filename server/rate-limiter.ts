import { db } from "./db";
import { usageLogs } from "@shared/schema";
import { eq, and, gte, lt, sql } from "drizzle-orm";
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
  // Use UTC time to ensure consistent daily reset across timezones
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  
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
  
  // Reset at midnight UTC (next day at 00:00:00 UTC)
  const resetAt = new Date(today);
  resetAt.setUTCDate(resetAt.getUTCDate() + 1);
  
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

// Cleanup function to remove old usage logs (prevent database bloat)
export async function cleanupOldUsageLogs(retentionDays: number = 30): Promise<number> {
  const cutoffDate = new Date();
  cutoffDate.setUTCDate(cutoffDate.getUTCDate() - retentionDays);
  cutoffDate.setUTCHours(0, 0, 0, 0);
  
  try {
    const result = await db
      .delete(usageLogs)
      .where(lt(usageLogs.date, cutoffDate));
    
    const deletedCount = result.rowCount || 0;
    if (deletedCount > 0) {
      console.log(`[Cleanup] Removed ${deletedCount} usage logs older than ${retentionDays} days`);
    }
    return deletedCount;
  } catch (error) {
    console.error('[Cleanup] Error removing old usage logs:', error);
    return 0;
  }
}

// Start daily cleanup job
let cleanupJobStarted = false;
export function startCleanupJob(intervalHours: number = 24): void {
  if (cleanupJobStarted) {
    console.log('[Cleanup] Job already running');
    return;
  }
  
  cleanupJobStarted = true;
  console.log(`[Cleanup] Starting daily cleanup job (runs every ${intervalHours} hours)`);
  
  // Run immediately on startup
  cleanupOldUsageLogs();
  
  // Then run at intervals
  setInterval(() => {
    cleanupOldUsageLogs();
  }, intervalHours * 60 * 60 * 1000);
}
