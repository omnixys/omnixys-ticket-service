import { PresenceState } from '../enums/presence-state.enum.js';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Manually override a scan result, bypassing nonce/device rules.',
})
export class ManualOverrideScanInput {
  @Field(() => ID)
  ticketId!: string;

  @Field(() => PresenceState)
  direction!: PresenceState;

  @Field(() => String, {
    nullable: true,
    description: 'Optional reason for audit logs.',
  })
  reason?: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'ID of the admin/security performing the override.',
  })
  overriddenByUserId?: string | null;
}
