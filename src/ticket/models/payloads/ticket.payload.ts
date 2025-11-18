// src/ticket/models/payload/ticket.payload.ts
import { Ticket } from '../entities/ticket.entity.js';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TicketPayload {
  @Field()
  ok!: boolean;

  @Field(() => Ticket, { nullable: true })
  ticket?: Ticket | null;

  @Field({ nullable: true })
  message?: string | null;
}
