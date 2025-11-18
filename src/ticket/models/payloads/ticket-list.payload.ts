// src/ticket/models/payload/ticket-list.payload.ts
import { Ticket } from '../entities/ticket.entity.js';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TicketListPayload {
  @Field()
  ok!: boolean;

  @Field(() => [Ticket])
  tickets!: Ticket[];
}
