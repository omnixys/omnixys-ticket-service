import { PresenceState } from '../enums/presence-state.enum.js';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Used to confirm a manual gate direction change for a ticket.',
})
export class GateScanInput {
  @Field(() => ID)
  ticketId!: string;

  @Field(() => PresenceState)
  direction!: PresenceState;

  @Field(() => String, { nullable: true })
  gate?: string | null;
}
