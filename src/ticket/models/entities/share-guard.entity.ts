import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class ShareGuard {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  ticketId!: string;

  @Field(() => Number)
  failCount!: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  lastFailAt?: Date | null;

  @Field(() => GraphQLISODateTime, { nullable: true })
  blockedUntil?: Date | null;

  @Field(() => String, { nullable: true })
  reason?: string | null;
}
