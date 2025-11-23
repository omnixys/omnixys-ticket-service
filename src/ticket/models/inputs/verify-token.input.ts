import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyTokenInput {
  @Field(() => ID)
  token!: string;

  @Field(() => String, { nullable: true })
  deviceHash?: string;
  @Field(() => String, { nullable: true })
  gate?: string;
}
