// src/ticket/models/payload/shareguard-list.payload.ts
import { ShareGuard } from '../entities/share-guard.entity.js';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShareGuardListPayload {
  @Field()
  ok!: boolean;

  @Field(() => [ShareGuard])
  guards!: ShareGuard[];
}
