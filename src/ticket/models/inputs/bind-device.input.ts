import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Bind a device to a ticket using device hash + public key.',
})
export class BindDeviceInput {
  @Field(() => ID, { description: 'Ticket ID' })
  ticketId!: string;

  @Field(() => String, { description: 'Hashed device fingerprint' })
  deviceHash!: string;

  @Field(() => String, {
    description:
      'Client public key used for proof-of-possession (rotating tokens).',
  })
  devicePublicKey!: string;

  @Field(() => String, {
    nullable: true,
    description: 'Optional IP address where device activation happened.',
  })
  activationIP?: string | null;
}
