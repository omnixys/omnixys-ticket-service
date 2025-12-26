/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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

/* ---------------------------------------------------------------
 * Key Management
 * ------------------------------------------------------------- */
const {
  PC_JWE_KEY,
  // PC_SIMPLE_KEY
} = env;

/**
 * Returns a 32-byte encryption key (for JWE)
 */
function getJweKey(): Uint8Array {
  const buf = Buffer.from(PC_JWE_KEY, 'base64');
  if (buf.length === 32) {
    return buf;
  }

  return new TextEncoder().encode(PC_JWE_KEY).slice(0, 32);
}

/**
 * Returns a simple key (for Base64 mode)
 */
// function getSimpleKey(): Uint8Array {
//   const buf = Buffer.from(PC_SIMPLE_KEY, 'base64');
//   if (buf.length > 0) return buf;

//   return new TextEncoder().encode(PC_SIMPLE_KEY);
// }

/* ===============================================================
 * 1) JWE — Token mit Punkten (ENCRYPTED)
 * =============================================================*/

/**
 * Generate Token WITH DOTS (JWE Compact Encryption)
 */
export async function generateWithDots(payload: TicketTokenPayload): Promise<string> {
  const key = getJweKey();
  const plaintext = new TextEncoder().encode(JSON.stringify(payload));

  return new jose.CompactEncrypt(plaintext)
    .setProtectedHeader({
      alg: 'dir',
      enc: 'A256GCM',
    })
    .encrypt(key);
}

/**
 * Decode Token WITH DOTS (decrypt JWE)
 */
export async function decodeWithDots(token: string): Promise<TicketTokenPayload> {
  const key = getJweKey();
  const { plaintext } = await jose.compactDecrypt(token, key);
  return JSON.parse(new TextDecoder().decode(plaintext));
}

/* ===============================================================
 * 2) Base64URL — Token OHNE Punkte (COMPACT)
 * =============================================================*/

/**
 * Base64URL encode without padding
 */
function encodeBase64Url(data: Uint8Array): string {
  return Buffer.from(data).toString('base64url');
}

function decodeBase64Url(str: string): Uint8Array {
  return Buffer.from(str, 'base64url');
}

/**
 * Generate Token WITHOUT DOTS (simple, no encryption)
 */
export function generateWithoutDots(payload: TicketTokenPayload): string {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);

  return encodeBase64Url(bytes); // → compact string with no dots
}

/**
 * Decode Token WITHOUT DOTS
 */
export function decodeWithoutDots(token: string): TicketTokenPayload {
  const bytes = decodeBase64Url(token);
  const json = new TextDecoder().decode(bytes);

  return JSON.parse(json);
}
