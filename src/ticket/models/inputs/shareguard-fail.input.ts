// src/ticket/models/input/shareguard-fail.input.ts
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Register a ShareGuard failure event for a ticket.',
})
export class ShareGuardFailInput {
  @Field(() => ID)
  ticketId!: string;

  @Field(() => String, {
    nullable: true,
    description: 'Optional reason for the failure record.',
  })
  reason?: string | null;
}
