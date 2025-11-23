// src/ticket/models/entities/scan-log.entity.ts
import { PresenceState } from '../enums/presence-state.enum.js';
import { ScanVerdict } from '../enums/scan-verdict.enum.js';
import {
  Field,
  ID,
  ObjectType,
  GraphQLISODateTime,
  Int,
} from '@nestjs/graphql';

@ObjectType()
export class ScanLog {
  // -----------------------------------------------------
  // Core identifiers
  // -----------------------------------------------------
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  ticketId!: string;

  @Field(() => String)
  eventId!: string;

  @Field(() => String, { nullable: true })
  byUserId?: string | null;

  // -----------------------------------------------------
  // Scan details
  // -----------------------------------------------------
  @Field(() => PresenceState)
  direction!: PresenceState;

  @Field(() => ScanVerdict)
  verdict!: ScanVerdict;

  @Field(() => String, { nullable: true })
  gate?: string | null;

  // -----------------------------------------------------
  // Security metadata
  // -----------------------------------------------------
  @Field(() => String, { nullable: true })
  deviceHash?: string | null;

  @Field(() => Int, { nullable: true })
  nonce?: number | null;

  // -----------------------------------------------------
  // Timestamps
  // -----------------------------------------------------
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}
