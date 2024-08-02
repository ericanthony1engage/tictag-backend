import { PipeTransform } from '@nestjs/common';
import { RegisterRequestDto } from '../dto/auth/register.dto';
import { joiErrorHandler } from '../utils/error-handler.util';
import joi from '../utils/joi.util';

export class RegisterValidationPipe implements PipeTransform {
  schema() {
    return joi
      .object<RegisterRequestDto>({
        username: joi.string().required(),
        password: joi.string().required(),
      })
      .required();
  }

  async transform(value: RegisterRequestDto) {
    try {
      return await this.schema().validateAsync(value);
    } catch (e) {
      joiErrorHandler(e);
    }
  }
}
