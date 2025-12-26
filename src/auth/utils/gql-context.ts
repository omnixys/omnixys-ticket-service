import type { FastifyReply, FastifyRequest } from 'fastify';

export interface GqlContext {
  req: FastifyRequest;
  res: FastifyReply;

  /**
   * Auth information (optional)
   * Typically injected by a Guard or plugin
   */
  user?: {
    id: string;
    roles?: string[];
    realm?: string;
  };
}
