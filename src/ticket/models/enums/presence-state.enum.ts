// TODO resolve eslint
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { registerEnumType } from '@nestjs/graphql';

export enum PresenceState {
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE',
}

registerEnumType(PresenceState, {
  name: 'PresenceState',
  description:
    'Whether the ticket holder is currently INSIDE or OUTSIDE the venue.',
});

/**
 * Convert string verdict → GraphQL ScanVerdict
 */
export function mapState(v: string): PresenceState {
  return (PresenceState as any)[v] ?? PresenceState.OUTSIDE;
}
