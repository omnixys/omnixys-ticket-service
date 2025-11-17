import { PresenceState } from '../enums/presence-state.enum.js';
import { ScanVerdict } from '../enums/scan-verdict.enum.js';
import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class ScanLog {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  ticketId!: string;

  @Field(() => String)
  eventId!: string;

  @Field(() => String, { nullable: true })
  byUserId?: string | null;

  @Field(() => PresenceState)
  direction!: PresenceState;

  @Field(() => ScanVerdict)
  verdict!: ScanVerdict;

  @Field(() => String, { nullable: true })
  gate?: string | null;

  @Field(() => String, { nullable: true })
  deviceHash?: string | null;

  @Field(() => Number, { nullable: true })
  nonce?: number | null;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}
