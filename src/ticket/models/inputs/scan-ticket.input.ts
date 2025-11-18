import { PresenceState } from '../enums/presence-state.enum.js';
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType({
  description: 'Payload sent by a scanning device when validating a ticket.',
})
export class ScanTicketInput {
  @Field(() => ID, { description: 'Ticket ID extracted from the QR code.' })
  ticketId!: string;

  @Field(() => Int, {
    description: 'Nonce sent by the client for replay protection.',
  })
  nonce!: number;

  @Field(() => String, {
    nullable: true,
    description: 'Device fingerprint hash used for device binding validation.',
  })
  deviceHash?: string | null;

  @Field(() => PresenceState, {
    description: 'Requested direction: INSIDE or OUTSIDE.',
  })
  direction!: PresenceState;

  @Field(() => String, {
    nullable: true,
    description: 'Optional gate name (security checkpoint).',
  })
  gate?: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'ID of the user performing the scan (security team).',
  })
  scannedByUserId?: string | null;
}
