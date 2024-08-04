import { FastifyRequest } from 'fastify';
import { JwtPayloadDto } from './jwt-payload.dto';

export interface RequestWithUser extends FastifyRequest {
  user: JwtPayloadDto;
}
