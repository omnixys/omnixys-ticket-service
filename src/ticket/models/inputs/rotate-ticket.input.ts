// src/ticket/models/input/rotate-ticket.input.ts
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType({
  description: 'Rotate a ticket token and generate a new nonce pair.',
})
export class RotateTicketInput {
  @Field(() => ID, { description: 'Ticket ID' })
  ticketId!: string;

  @Field(() => Int, {
    description: 'Current last nonce value to validate replay protection.',
  })
  lastNonce!: number;
}
