// src/ticket/models/payload/device-unbind.payload.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeviceUnbindPayload {
  @Field()
  ok!: boolean;

  @Field({ nullable: true })
  message?: string | null;
}
