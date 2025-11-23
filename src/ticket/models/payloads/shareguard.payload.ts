// src/ticket/models/payload/shareguard.payload.ts
import { ShareGuard } from '../entities/share-guard.entity.js';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShareGuardPayload {
  @Field()
  ok!: boolean;

  @Field(() => ShareGuard, { nullable: true })
  shareGuard?: ShareGuard | null;
}
