/**
 * @tenerife.music/db - Database package
 * Exports Prisma client and Zod validation schemas
 */

export * from './zod';

// Re-export Prisma client (generated after prisma generate)
export { PrismaClient } from '@prisma/client';
export type * from '@prisma/client';
