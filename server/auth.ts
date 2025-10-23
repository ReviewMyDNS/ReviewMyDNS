import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import ConnectPgSimple from 'connect-pg-simple';
import bcrypt from 'bcrypt';
import { storage } from './storage';
import type { User } from '@shared/schema';

const SALT_ROUNDS = 10;

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createSessionMiddleware() {
  const PgStore = ConnectPgSimple(session);
  
  return session({
    store: new PgStore({
      conString: process.env.DATABASE_URL,
      tableName: 'sessions',
      createTableIfMissing: false,
    }),
    secret: process.env.SESSION_SECRET || 'reviewmydns-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'lax',
    },
  });
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const user = await storage.getUser(req.session.userId);
  if (!user) {
    req.session.userId = undefined;
    return res.status(401).json({ error: 'User not found' });
  }

  req.user = user;
  next();
}

export function sanitizeUser(user: User): Omit<User, 'passwordHash'> {
  const { passwordHash, ...sanitized } = user;
  return sanitized;
}
