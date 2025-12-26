import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyTokenInput {
  @Field(() => ID)
  token!: string;
}
