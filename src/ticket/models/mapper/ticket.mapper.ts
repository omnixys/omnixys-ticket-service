// src/ticket/models/mapper/ticket.mapper.ts
import type { Ticket as PrismaTicket } from '../../../prisma/generated/client.js';
import type { Ticket as TicketEntity } from '../entities/ticket.entity.js';
import type { PresenceState } from '../enums/presence-state.enum.js';

/**
 * Maps a Prisma Ticket row → GraphQL Ticket Entity
 */
export function mapTicket(row: PrismaTicket): TicketEntity {
  return {
    id: row.id,

    eventId: row.eventId,
    invitationId: row.invitationId,
    seatId: row.seatId ?? null,
    guestProfileId: row.guestProfileId ?? null,

    // --- Device Binding ---
    deviceHash: row.deviceHash ?? null,
    devicePublicKey: row.devicePublicKey ?? null,
    deviceActivationAt: row.deviceActivationAt ?? null,
    deviceActivationIP: row.deviceActivationIP ?? null,

    // --- Token Rotation ---
    lastNonce: row.lastNonce ?? null,
    nextNonce: row.nextNonce ?? null,
    rotationSeconds: row.rotationSeconds,
    lastRotatedAt: row.lastRotatedAt ?? null,

    // --- State ---
    currentState: row.currentState as PresenceState,
    revoked: row.revoked,

    // --- Timestamps ---
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Maps an array of Prisma Ticket rows → GraphQL Ticket Entities
 */
export function mapTickets(rows: PrismaTicket[]): TicketEntity[] {
  return rows.map(mapTicket);
}
