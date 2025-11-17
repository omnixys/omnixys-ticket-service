import { PresenceState } from '../enums/presence-state.enum.js';
import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Ticket {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  eventId!: string;

  @Field(() => ID)
  invitationId!: string;

  @Field(() => ID, { nullable: true })
  seatId?: string | null;

  @Field(() => ID, { nullable: true })
  guestProfileId?: string | null;

  @Field(() => PresenceState)
  currentState!: PresenceState;

  @Field(() => Boolean)
  revoked!: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  lastRotatedAt?: Date | null;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
