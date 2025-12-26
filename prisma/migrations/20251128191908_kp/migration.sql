/*
  Warnings:

  - A unique constraint covering the columns `[device_public_key]` on the table `ticket` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[event_id,guest_profile_id]` on the table `ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "ScanVerdict" ADD VALUE 'EXPIRED_EVENT';

-- CreateIndex
CREATE INDEX "idx_scanlog_nonce" ON "scan_log"("nonce");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_device_public_key_key" ON "ticket"("device_public_key");

-- CreateIndex
CREATE INDEX "idx_device_hash_nonce" ON "ticket"("device_hash", "last_nonce");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_event_id_guest_profile_id_key" ON "ticket"("event_id", "guest_profile_id");
