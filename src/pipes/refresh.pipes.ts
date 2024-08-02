import { PipeTransform } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/auth/refresh-token.dto';
import { joiErrorHandler } from '../utils/error-handler.util';
import joi from '../utils/joi.util';

export class RefreshValidationPipe implements PipeTransform {
  schema() {
    return joi
      .object<RefreshTokenDto>({
        refresh_token: joi.string().required(),
      })
      .required();
  }

  async transform(value: RefreshTokenDto) {
    try {
      return await this.schema().validateAsync(value);
    } catch (e) {
      joiErrorHandler(e);
    }
  }
}
