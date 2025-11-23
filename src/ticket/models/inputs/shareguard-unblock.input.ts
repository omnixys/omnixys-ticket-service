// src/ticket/models/input/shareguard-unblock.input.ts
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Manually unblock a ticket previously blocked by ShareGuard.',
})
export class ShareGuardUnblockInput {
  @Field(() => ID)
  ticketId!: string;
}
