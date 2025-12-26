// src/ticket/models/input/assign-seat.input.ts
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Assign a seat to a ticket.',
})
export class AssignSeatInputTicket {
  @Field(() => ID)
  ticketId!: string;

  @Field(() => ID)
  seatId!: string;
}
