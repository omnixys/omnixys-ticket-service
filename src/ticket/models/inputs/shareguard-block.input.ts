// src/ticket/models/input/shareguard-block.input.ts
import { Field, ID, InputType, GraphQLISODateTime } from '@nestjs/graphql';

@InputType({
  description:
    'Temporarily block a ticket due to repeated suspicious activity.',
})
export class ShareGuardBlockInput {
  @Field(() => ID)
  ticketId!: string;

  @Field(() => GraphQLISODateTime, {
    description: 'Datetime until the ticket remains blocked.',
  })
  blockedUntil!: Date;

  @Field(() => String, {
    nullable: true,
    description: 'Optional reason for blocking the ticket.',
  })
  reason?: string | null;
}
