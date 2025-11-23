import { Ticket } from '../entities/ticket.entity.js';
import { ScanVerdict } from '../enums/scan-verdict.enum.js';
import { Field, ObjectType, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class TicketTokenPayload {
  @Field(() => String)
  tid!: string; // TicketId

  @Field(() => String)
  eid!: string; // EventId

  @Field(() => String, { nullable: true })
  gid?: string | null; // GuestProfileId

  @Field(() => String, { nullable: true })
  sid?: string | null; // SeatId

  @Field(() => Int)
  dn!: number; // next nonce

  @Field(() => Float)
  ts!: number; // timestamp (epoch ms)

  @Field(() => String, { nullable: true })
  dh?: string | null; // deviceHash (optional)
}

@ObjectType()
export class VerifyPayload {
  @Field(() => Ticket)
  ticket!: Ticket;

  @Field(() => TicketTokenPayload)
  payload!: TicketTokenPayload;

  @Field(() => ScanVerdict)
  verdict!: ScanVerdict;

  @Field(() => Boolean)
  valid!: boolean;

  @Field(() => Int, { nullable: true })
  expectedNonce!: number | null;

  @Field(() => Int)
  receivedNonce!: number;

  @Field(() => Boolean)
  deviceMatched!: boolean;
}
