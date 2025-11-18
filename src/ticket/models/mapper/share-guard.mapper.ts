/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ShareGuard as ShareGuardEntity } from '../entities/share-guard.entity.js';
import type { ShareGuard } from '@prisma/client';

/**
 * Maps a Prisma ShareGuard row → GraphQL ShareGuard Entity.
 */
export function mapShareGuard(row: ShareGuard): ShareGuardEntity {
  return {
    id: row.id,
    ticketId: row.ticketId,

    failCount: row.failCount,
    lastFailAt: row.lastFailAt ?? null,
    blockedUntil: row.blockedUntil ?? null,
    reason: row.reason ?? null,
  };
}
