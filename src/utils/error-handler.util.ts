import * as Joi from 'joi';
import { BadRequestException } from '@nestjs/common';

export const joiErrorHandler = (e: any) => {
  const error: Joi.ValidationError = e as Joi.ValidationError;
  throw new BadRequestException(error.details.map(({ message }) => message));
};

export const badRequestHandler = (e: string[]) => {
  throw new BadRequestException(e);
};
