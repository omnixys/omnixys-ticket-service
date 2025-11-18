// src/ticket/models/input/shareguard-reset.input.ts
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Reset ShareGuard counters and remove block state.',
})
export class ShareGuardResetInput {
  @Field(() => ID)
  ticketId!: string;
}
