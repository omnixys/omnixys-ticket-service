// src/ticket/graphql/input/security-scan.input.ts
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SecurityScanInput {
  @Field(() => ID)
  ticketId!: string;

  @Field(() => Int)
  nonce!: number;

  @Field(() => String, { nullable: true })
  deviceHash?: string | null;

  @Field(() => String, { nullable: true })
  byUserId?: string | null;

  @Field(() => String, { nullable: true })
  gate?: string | null;
}
