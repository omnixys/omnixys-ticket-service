import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description:
    'Revoke a ticket. Revoked tickets can no longer be used at gates.',
})
export class RevokeTicketInput {
  @Field(() => ID, { description: 'ID of the ticket to be revoked' })
  ticketId!: string;

  @Field(() => String, {
    nullable: true,
    description: 'Optional admin/user reason for audit logs.',
  })
  reason?: string | null;
}
