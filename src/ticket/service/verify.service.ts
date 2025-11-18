/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/ticket/service/verify-token.service.ts
import { PrismaService } from '../../prisma/prisma.service.js';
import { ScanVerdict } from '../models/enums/scan-verdict.enum.js';
import { mapTicket } from '../models/mapper/ticket.mapper.js';
import { TicketTokenPayload, TokenGenerator } from '../utils/token.service.js';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class VerifyTokenService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Verify QR token (JWE), device hash, nonce and ticket state.
   * This performs a full security validation without modifying state.
   *
   * Used by both:
   *  - securityScan() in TicketWriteService (pre-check)
   *  - "preview scans" or validators
   */
  async verify(input: {
    token: string;
    deviceHash?: string | null;
    gate?: string | null;
  }){
    const { token, deviceHash, gate: _gate } = input;

    // ---------------------------------------------------------
    // 1) Decode JWE and validate structure
    // ---------------------------------------------------------
    let payload: TicketTokenPayload;
    try {
      payload = await TokenGenerator.decode(token);
    } catch (e) {
      throw new BadRequestException('Invalid QR token (cannot decrypt)');
    }

    const { tid, eid, gid: _gid, sid: _sid, dn, ts, dh } = payload;

    if (!tid || !eid || !dn || !ts) {
      throw new BadRequestException('Malformed QR payload');
    }

    // ---------------------------------------------------------
    // 2) Fetch ticket
    // ---------------------------------------------------------
    const ticket = await this.prisma.ticket.findUnique({ where: { id: tid } });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    // ---------------------------------------------------------
    // 3) Core security validations
    // ---------------------------------------------------------
    let verdict: ScanVerdict = ScanVerdict.OK;

    // Ticket revoked?
    if (ticket.revoked) {
      verdict = ScanVerdict.REVOKED;
    }

    // Device binding mismatch
    if (ticket.deviceHash && deviceHash && ticket.deviceHash !== deviceHash) {
      verdict = ScanVerdict.DEVICE_MISMATCH;
    }

    // QR encrypted deviceHash mismatch?
    if (dh && deviceHash && dh !== deviceHash) {
      verdict = ScanVerdict.DEVICE_MISMATCH;
    }

    // Replay protection
    if (ticket.lastNonce !== null && dn <= (ticket.lastNonce ?? 0)) {
      verdict = ScanVerdict.REPLAY;
    }

    // Nonce invalid (future mismatch)
    if (ticket.nextNonce !== null && dn !== ticket.nextNonce) {
      verdict = ScanVerdict.INVALID_NONCE;
    }

    // Token age validation (optional)
    const TOKEN_LIFETIME_MS = Number(process.env.QR_TOKEN_MAX_AGE_MS ?? 60_000);
    if (Date.now() - ts > TOKEN_LIFETIME_MS) {
      verdict = ScanVerdict.REPLAY;
    }

    // ---------------------------------------------------------
    // 4) Result structure (no state update here)
    // ---------------------------------------------------------
    return {
      ticket: mapTicket(ticket),
      payload,
      verdict,
      valid: verdict === ScanVerdict.OK,
      expectedNonce: ticket.nextNonce,
      receivedNonce: dn,
      deviceMatched: !ticket.deviceHash || !deviceHash || ticket.deviceHash === deviceHash,
    };
  }

  /**
   * A convenience method used for "dry-runs".
   * Does NOT write ScanLog or update Ticket.
   */
  async preview(token: string, deviceHash?: string | null) {
    return this.verify({ token, deviceHash });
  }
}
