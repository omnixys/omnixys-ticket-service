// src/ticket/models/input/check-device-binding.input.ts
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Verify if provided deviceHash matches the bound ticket device.',
})
export class CheckDeviceBindingInput {
  @Field(() => ID)
  ticketId!: string;

  @Field(() => String, {
    description: 'Hashed fingerprint of requesting device.',
  })
  deviceHash!: string;
}
