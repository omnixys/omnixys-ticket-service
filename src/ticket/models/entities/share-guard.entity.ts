import {
  Field,
  ID,
  ObjectType,
  GraphQLISODateTime,
  Int,
} from '@nestjs/graphql';

@ObjectType()
export class ShareGuard {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  ticketId!: string;

  @Field(() => Int)
  failCount!: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  lastFailAt?: Date | null;

  @Field(() => GraphQLISODateTime, { nullable: true })
  blockedUntil?: Date | null;

  @Field(() => String, { nullable: true })
  reason?: string | null;
}
