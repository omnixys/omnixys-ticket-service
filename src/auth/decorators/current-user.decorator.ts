// TODO resolve eslint
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { KeycloakRawOutput } from '../dto/kc-rwa.dto.js';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { FastifyRequest } from 'fastify';

export interface CurrentUserData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];

  access_token: string;
  refresh_token: string;

  raw: KeycloakRawOutput; // full KC payload

  // duplicated raw for convenience
  sub: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  realm_access: {
    roles: string[];
  };
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): CurrentUserData | null => {
    const gqlCtx = GqlExecutionContext.create(context);
    const req: FastifyRequest = gqlCtx.getContext().req;

    const ticket = req.ticket;

    if (!ticket) {
      return null;
    }

    return {
      id: ticket.sub,
      username: ticket.preferred_username,
      email: ticket.email,

      firstName: ticket.given_name,
      lastName: ticket.family_name,

      roles: ticket.realm_access?.roles ?? [],

      access_token: ticket.access_token,
      refresh_token: ticket.refresh_token,

      raw: ticket.raw,

      // duplicated raw fields
      sub: ticket.sub,
      preferred_username: ticket.preferred_username,
      given_name: ticket.given_name,
      family_name: ticket.family_name,
      realm_access: ticket.realm_access,
    };
  },
);
