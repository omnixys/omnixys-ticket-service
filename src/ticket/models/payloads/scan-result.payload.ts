// src/ticket/models/payload/scan-result.payload.ts
import { ScanLog } from '../entities/scan-log.entity.js';
import { ScanVerdict } from '../enums/scan-verdict.enum.js';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScanResultPayload {
  @Field()
  ok!: boolean;

  @Field(() => ScanVerdict)
  verdict!: ScanVerdict;

  @Field(() => ScanLog, { nullable: true })
  log?: ScanLog | null;

  @Field({ nullable: true })
  message?: string | null;
}
