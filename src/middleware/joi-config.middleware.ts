import * as Joi from 'joi';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class JoiConfigMiddleware implements NestMiddleware {
  use(_req: any, _res: any, next: () => void) {
    Joi.defaults((schema) => schema.options({ abortEarly: false }));
    next();
  }
}
