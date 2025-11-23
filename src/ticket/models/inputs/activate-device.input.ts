// src/ticket/graphql/input/activate-device.input.ts
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ActivateDeviceInput {
  @Field(() => String)
  ticketId!: string;

  @Field(() => String)
  deviceHash!: string;

  @Field(() => String)
  devicePublicKey!: string;

  @Field(() => String, { nullable: true })
  ip?: string | null;
}
