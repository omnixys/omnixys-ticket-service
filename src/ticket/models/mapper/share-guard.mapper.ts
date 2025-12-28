import type { ShareGuard } from '../../../prisma/generated/client.js';
import type { ShareGuard as ShareGuardEntity } from '../entities/share-guard.entity.js';

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
