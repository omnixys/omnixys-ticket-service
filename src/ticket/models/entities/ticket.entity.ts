// src/ticket/models/entities/ticket.entity.ts
import { PresenceState } from '../enums/presence-state.enum.js';
import {
  Field,
  ID,
  ObjectType,
  GraphQLISODateTime,
  Int,
} from '@nestjs/graphql';

@ObjectType()
export class Ticket {
  // ----------------------------------------------------------
  // Core fields
  // ----------------------------------------------------------
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

  // ----------------------------------------------------------
  // Device Binding
  // ----------------------------------------------------------
  @Field(() => String, { nullable: true })
  deviceHash?: string | null;

  @Field(() => String, { nullable: true })
  devicePublicKey?: string | null;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deviceActivationAt?: Date | null;

  @Field(() => String, { nullable: true })
  deviceActivationIP?: string | null;

  // ----------------------------------------------------------
  // Token Rotation
  // ----------------------------------------------------------
  @Field(() => Int, { nullable: true })
  lastNonce?: number | null;

  @Field(() => Int, { nullable: true })
  nextNonce?: number | null;

  @Field(() => Int)
  rotationSeconds!: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  lastRotatedAt?: Date | null;

  // ----------------------------------------------------------
  // Status
  // ----------------------------------------------------------
  @Field(() => PresenceState)
  currentState!: PresenceState;

  @Field(() => Boolean)
  revoked!: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  checkedInAt?: Date;

  // ----------------------------------------------------------
  // Timestamps
  // ----------------------------------------------------------
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
