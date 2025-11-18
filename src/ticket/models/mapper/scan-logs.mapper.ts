/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/ticket/models/mapper/scan-log.mapper.ts
import type { ScanLog as ScanLogEntity } from '../entities/scan-log.entity.js';
import type { PresenceState } from '../enums/presence-state.enum.js';
import type { ScanVerdict } from '../enums/scan-verdict.enum.js';
import type { ScanLog as PrismaScanLog } from '@prisma/client';

/**
 * Maps a Prisma ScanLog row → GraphQL ScanLog Entity.
 */
export function mapScanLog(row: PrismaScanLog): ScanLogEntity {
  return {
    id: row.id,
    ticketId: row.ticketId,
    eventId: row.eventId,

    byUserId: row.byUserId ?? null,

    direction: row.direction as PresenceState,
    verdict: row.verdict as ScanVerdict,

    gate: row.gate ?? null,
    deviceHash: row.deviceHash ?? null,
    nonce: row.nonce ?? null,

    createdAt: row.createdAt,
  };
}

/**
 * Maps an array of Prisma ScanLog rows → GraphQL ScanLog Entities.
 */
export function mapScanLogs(rows: PrismaScanLog[]): ScanLogEntity[] {
  return rows.map(mapScanLog);
}
