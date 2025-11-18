// src/ticket/models/input/unbind-device.input.ts
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Remove the device binding from a ticket.',
})
export class UnbindDeviceInput {
  @Field(() => ID)
  ticketId!: string;
}
