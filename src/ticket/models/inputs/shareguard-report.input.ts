// src/ticket/models/input/shareguard-report.input.ts
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Request ShareGuard information for a specific ticket.',
})
export class ShareGuardReportInput {
  @Field(() => ID, {
    description: 'The ticket ID for which ShareGuard information is requested.',
  })
  ticketId!: string;
}
