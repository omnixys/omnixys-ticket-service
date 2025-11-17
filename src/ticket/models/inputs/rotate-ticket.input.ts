import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RotateTicketInput {
  @Field(() => String)
  ticketId!: string;

  @Field(() => Number)
  currentNonce!: number;
}
