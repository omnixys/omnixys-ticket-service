// src/common/payloads/error.payload.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorPayload {
  @Field()
  ok!: boolean;

  @Field()
  error!: string;

  @Field({ nullable: true })
  code?: string | null;
}
