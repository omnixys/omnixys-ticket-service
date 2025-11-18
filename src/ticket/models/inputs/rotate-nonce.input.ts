// src/ticket/graphql/input/rotate-nonce.input.ts
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RotateNonceInput {
  @Field(() => ID)
  ticketId!: string;

  @Field(() => Int)
  nextNonce!: number;
}
