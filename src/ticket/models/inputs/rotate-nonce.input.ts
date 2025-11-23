import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RotateNonceInput {
  @Field(() => ID)
  ticketId!: string;
}
