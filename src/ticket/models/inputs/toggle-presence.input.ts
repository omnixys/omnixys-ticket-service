import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TogglePresenceInput {
  @Field(() => ID)
  ticketId!: string;
  @Field(() => String)
  gate!: string;
  @Field(() => ID)
  userId!: string;
}
