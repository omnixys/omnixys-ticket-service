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
