import { PrismaClient } from '../generated/prisma';

// ═══════════════════════════════════════════════════════════════════════════════
// Prisma Client Singleton
// ═══════════════════════════════════════════════════════════════════════════════
// Prevents exhausting database connection limits in development mode due to
// Next.js hot module replacement (HMR) repeatedly instantiating PrismaClient.
// ═══════════════════════════════════════════════════════════════════════════════

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
