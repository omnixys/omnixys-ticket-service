import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType({
  description: 'Validate nonce before performing a full scan.',
})
export class ValidateNonceInput {
  @Field(() => ID)
  ticketId!: string;

  @Field(() => Int)
  nonce!: number;
}
