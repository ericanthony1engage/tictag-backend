import { PipeTransform } from '@nestjs/common';
import { LoginRequestDto } from '../dto/auth/login.dto';
import { joiErrorHandler } from '../utils/error-handler.util';
import joi from '../utils/joi.util';

export class LoginValidationPipe implements PipeTransform {
  schema() {
    return joi
      .object<LoginRequestDto>({
        username: joi.string().required(),
        password: joi.string().required(),
      })
      .required();
  }

  async transform(value: LoginRequestDto) {
    try {
      return await this.schema().validateAsync(value);
    } catch (e) {
      joiErrorHandler(e);
    }
  }
}
