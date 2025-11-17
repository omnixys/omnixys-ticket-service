import { PresenceState } from '../enums/presence-state.enum.js';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ScanTicketInput {
  @Field(() => String)
  ticketId!: string;

  @Field(() => PresenceState)
  direction!: PresenceState;

  @Field(() => String)
  gate!: string;

  @Field(() => String)
  deviceHash!: string;

  @Field(() => Number)
  nonce!: number;
}
