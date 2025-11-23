// src/ticket/models/payload/rotation.payload.ts
import { Field, ObjectType, Int, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class RotationPayload {
  @Field()
  ok!: boolean;

  @Field(() => Int)
  lastNonce!: number;

  @Field(() => Int)
  nextNonce!: number;

  @Field(() => GraphQLISODateTime)
  rotatedAt!: Date;
}
