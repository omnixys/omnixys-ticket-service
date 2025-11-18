// src/ticket/models/payload/device-bind.payload.ts
import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class DeviceBindPayload {
  @Field()
  ok!: boolean;

  @Field({ nullable: true })
  message?: string | null;

  @Field(() => GraphQLISODateTime, { nullable: true })
  activationAt?: Date | null;

  @Field(() => String, { nullable: true })
  deviceHash?: string | null;
}
