// TODO resolve eslint
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { registerEnumType } from '@nestjs/graphql';

export enum ScanVerdict {
  OK = 'OK',
  REPLAY = 'REPLAY',
  INVALID_NONCE = 'INVALID_NONCE',
  DEVICE_MISMATCH = 'DEVICE_MISMATCH',
  BLOCKED = 'BLOCKED',
  REVOKED = 'REVOKED',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(ScanVerdict, {
  name: 'ScanVerdict',
  description: 'The result of a ticket scan, including anti-sharing cases.',
});

/**
 * Convert string verdict → GraphQL ScanVerdict
 */
export function mapVerdict(v: string): ScanVerdict {
  return (ScanVerdict as any)[v] ?? ScanVerdict.UNKNOWN;
}
