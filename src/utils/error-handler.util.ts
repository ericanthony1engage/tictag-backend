import * as Joi from 'joi';
import { ErrorResponseDto } from './json-response.util';
import { BadRequestException } from '@nestjs/common';
import { BAD_REQUEST_RESPONSE } from '../constant/response';

export const joiErrorHandler = (e: any) => {
  const error: Joi.ValidationError = e as Joi.ValidationError;
  const response: ErrorResponseDto = {
    message: BAD_REQUEST_RESPONSE,
    details: error.details.map(({ message }) => message),
  };
  throw new BadRequestException(response);
};

export const badRequestHandler = (e: string[]) => {
  const response: ErrorResponseDto = {
    message: BAD_REQUEST_RESPONSE,
    details: e,
  };
  throw new BadRequestException(response);
};
