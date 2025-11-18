// src/ticket/models/payload/scan-log-list.payload.ts
import { ScanLog } from '../entities/scan-log.entity.js';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScanLogListPayload {
  @Field()
  ok!: boolean;

  @Field(() => [ScanLog])
  logs!: ScanLog[];
}
