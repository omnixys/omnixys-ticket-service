import { Ticket } from '../entities/ticket.entity.js';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TicketPayload {
  @Field()
  ok!: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Ticket, { nullable: true })
  ticket?: Ticket;
}
