// src/ticket/graphql/input/create-ticket.input.ts
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field(() => ID)
  eventId!: string;

  @Field(() => ID)
  invitationId!: string;

  @Field(() => String, { nullable: true })
  guestProfileId?: string | null;

  @Field(() => String, { nullable: true })
  seatId?: string | null;
}
