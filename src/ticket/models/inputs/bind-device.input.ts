import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BindDeviceInput {
  @Field(() => String)
  ticketId!: string;

  @Field(() => String)
  deviceHash!: string;

  @Field(() => String, { nullable: true })
  devicePublicKey?: string;
}
