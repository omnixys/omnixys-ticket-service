/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/ticket/service/ticket-read.service.ts

import { PrismaService } from '../../prisma/prisma.service.js';
import { ScanLog } from '../models/entities/scan-log.entity.js';
import { Ticket } from '../models/entities/ticket.entity.js';
import { mapScanLogs } from '../models/mapper/scan-logs.mapper.js';
import { mapTicket, mapTickets } from '../models/mapper/ticket.mapper.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketReadService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find a ticket by ID.
   */
  async findById(id: string): Promise<Ticket> {
    const row = await this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!row) {
      throw new NotFoundException('Ticket not found');
    }

    return mapTicket(row);
  }

  /**
   * Find all tickets matching arbitrary filters.
   */
  async findMany(params?: Prisma.TicketFindManyArgs): Promise<Ticket[]> {
    const rows = await this.prisma.ticket.findMany(params);
    return mapTickets(rows);
  }

  /**
   * Find ticket by invitationId (unique).
   */
  async findByInvitation(invitationId: string): Promise<Ticket> {
    const row = await this.prisma.ticket.findUnique({
      where: { invitationId },
    });

    if (!row) {
      throw new NotFoundException('Ticket not found for invitation');
    }

    return mapTicket(row);
  }

  /**
   * Find all tickets belonging to an event.
   */
  async findByEvent(eventId: string): Promise<Ticket[]> {
    const rows = await this.prisma.ticket.findMany({
      where: { eventId },
      orderBy: { createdAt: 'asc' },
    });

    return mapTickets(rows);
  }

  /**
   * Find ticket by guestProfileId (unique).
   */
  async findByGuest(guestProfileId: string): Promise<Ticket> {
    const row = await this.prisma.ticket.findUnique({
      where: { guestProfileId },
    });

    if (!row) {
      throw new NotFoundException('Ticket not found for guest');
    }

    return mapTicket(row);
  }

  /**
   * Read scan logs of a ticket.
   */
  async scanLogs(ticketId: string): Promise<ScanLog[]> {
    const logs = await this.prisma.scanLog.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'desc' },
    });

    return mapScanLogs(logs);
  }

  /**
   * Find a ticket by device hash. (Fingerprint binding)
   */
  async findByDeviceHash(deviceHash: string): Promise<Ticket> {
    const row = await this.prisma.ticket.findFirst({
      where: { deviceHash },
    });

    if (!row) {
      throw new NotFoundException('Ticket not bound to this device');
    }

    return mapTicket(row);
  }
}
