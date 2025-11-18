import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessPayload {
  @Field()
  ok!: boolean;

  @Field({ nullable: true })
  message?: string | null;
}
