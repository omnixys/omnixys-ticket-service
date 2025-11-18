import { env } from '../../config/env.js';
import * as jose from 'jose';

export interface TicketTokenPayload {
  tid: string; // TicketId
  eid: string; // EventId
  gid?: string | null; // GuestProfileId
  sid?: string | null; // SeatId
  dn: number; // next nonce
  ts: number; // timestamp (epoch ms)
  dh?: string | null; // deviceHash (optional)
}

const { PC_JWE_KEY } = env;
export class TokenGenerator {
  private static getKey(): Uint8Array {
    const raw = PC_JWE_KEY;
    if (!raw) {
      throw new Error('TICKET_JWE_KEY missing (32 bytes base64 recommended)');
    }

    try {
      const buf = Buffer.from(raw, 'base64');
      if (buf.length === 32) {
        return buf;
      }
    } catch {
      /* ignore */
    }

    return new TextEncoder().encode(raw);
  }

  /**
   * Generates an encrypted JWE token for QR Codes.
   */
  static async generate(payload: TicketTokenPayload): Promise<string> {
    const key = this.getKey();

    return new jose.CompactEncrypt(new TextEncoder().encode(JSON.stringify(payload)))
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .encrypt(key);
  }

  /**
   * Decrypts and validates the token.
   */
  static async decode(token: string): Promise<TicketTokenPayload> {
    const key = this.getKey();
    const { plaintext } = await jose.compactDecrypt(token, key);

    return JSON.parse(new TextDecoder().decode(plaintext)) as TicketTokenPayload;
  }
}
