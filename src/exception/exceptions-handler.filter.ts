import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  ErrorResponseDto,
  JsonResponseUtil,
} from '../utils/json-response.util';
import { ConfigService } from '@nestjs/config';
import { IConfigDto } from '../dto/env.dto';
import { LoggerUtil } from '../utils/logger.util';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private _configService: ConfigService<IConfigDto, true>) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error_response: ErrorResponseDto = {
      message: exception.message,
      details: exception,
    };
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // for bad request error handling
    if (
      exception.name === 'BadRequestException' &&
      exception.status === HttpStatus.BAD_REQUEST
    ) {
      error_response.message = exception.response.message;
      error_response.details = null;
    }

    if (
      this._configService.get('NODE_ENV') === 'production' &&
      status >= HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      error_response.message = 'Internal Server Error';
      delete error_response.details;
      LoggerUtil.error('internal server error', exception);
    }

    response.status(status).send(
      new JsonResponseUtil()
        .setMessage(
          typeof exception.message == 'string' ? exception.message : 'Failed',
        )
        .setError(error_response)
        .toPlainObject(),
    );
  }
}
