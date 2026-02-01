/* ----------------------------------------------------------------------
 * Prisma Seed – Omnixys Ticket Service
 * Author: Caleb Gyamfi
 * License: GPL-3.0-or-later
 * -------------------------------------------------------------------- */

    import {
      PresenceState,
      PrismaClient,
      ScanVerdict,
    } from '../src/prisma/generated/client.js';
    import { PrismaPg } from '@prisma/adapter-pg';
    import 'dotenv/config';

    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    const prisma = new PrismaClient({ adapter });


/* ----------------------------------------------------------------------
 * Constants
 * -------------------------------------------------------------------- */
const EVENT_ID = 'cmk93ux98000nq00663i31s8h';
const GUEST_ID = 'ae489d9b-96ce-4942-bcb1-c2e2a0c92e83';
const SEAT_ID = 'cmk93w61f001031069znui39o';
const INVITATION_ID = 'cmk93xzwl0000im061rtro8yw';

/* ----------------------------------------------------------------------
 * Seed
 * -------------------------------------------------------------------- */
async function main(): Promise<void> {
  console.log('🌱 Seeding ticket domain…');

  /* ------------------------------------------------------------
   * Ticket
   * ---------------------------------------------------------- */
  const ticket = await prisma.ticket.upsert({
    where: { invitationId: INVITATION_ID },
    update: {},
    create: {
      eventId: EVENT_ID,
      invitationId: INVITATION_ID,
      guestProfileId: GUEST_ID,
      seatId: SEAT_ID,

      deviceHash: 'device_hash_demo_001',
      devicePublicKey: 'device_public_key_demo_001',
      deviceActivationAt: new Date(),
      deviceActivationIP: '88.130.219.21',

      lastNonce: 10,
      nextNonce: 11,
      rotationSeconds: 30,
      lastRotatedAt: new Date(),

      currentState: PresenceState.OUTSIDE,
      revoked: false,
    },
  });

  console.log('✅ Ticket created:', ticket.id);

  /* ------------------------------------------------------------
   * ShareGuard (initially clean)
   * ---------------------------------------------------------- */
  const shareGuard = await prisma.shareGuard.upsert({
    where: { ticketId: ticket.id },
    update: {},
    create: {
      ticketId: ticket.id,
      failCount: 0,
      reason: null,
    },
  });

  console.log('✅ ShareGuard created:', shareGuard.id);

  /* ------------------------------------------------------------
   * ScanLogs (realistic history)
   * ---------------------------------------------------------- */
  await prisma.scanLog.createMany({
    data: [
      {
        ticketId: ticket.id,
        eventId: EVENT_ID,
        direction: PresenceState.INSIDE,
        verdict: ScanVerdict.OK,
        nonce: 10,
        deviceHash: 'device_hash_demo_001',
        gate: 'Main Gate',
      },
      {
        ticketId: ticket.id,
        eventId: EVENT_ID,
        direction: PresenceState.OUTSIDE,
        verdict: ScanVerdict.OK,
        nonce: 11,
        deviceHash: 'device_hash_demo_001',
        gate: 'Main Gate',
      },
    ],
  });

  console.log('✅ ScanLogs created');

  console.log('--------------------------------------------------');
  console.log('🎫 TICKET SEED – CREATED IDS');
  console.log('--------------------------------------------------');

  console.log('Event ID:         ', EVENT_ID);
  console.log('Invitation ID:    ', INVITATION_ID);
  console.log('Guest Profile ID: ', GUEST_ID);
  console.log('Seat ID:          ', SEAT_ID);

  console.log('--------------------------------------------------');
  console.log('Ticket ID:        ', ticket.id);
  console.log('ShareGuard ID:    ', shareGuard.id);
  console.log('--------------------------------------------------');

}

/* ----------------------------------------------------------------------
 * Bootstrap
 * -------------------------------------------------------------------- */
main()
  .catch((e) => {
    console.error('❌ Seed failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
