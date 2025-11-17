import { Ticket } from '../entities/ticket.entity.js';
import { ScanVerdict } from '../enums/scan-verdict.enum.js';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScanResultPayload {
  @Field()
  ok!: boolean;

  @Field(() => ScanVerdict)
  verdict!: ScanVerdict;

  @Field(() => Ticket, { nullable: true })
  ticket?: Ticket;

  @Field(() => String, { nullable: true })
  reason?: string;
}
