import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    example: 'something went wrong',
    description: 'indicates error message',
  })
  message?: string;
  @ApiProperty({
    example: ['first error message', 'second error message', 'etc'],
    description: 'list of error message details',
  })
  details: any | null;
}

export class JsonResponseUtil<D = any> {
  private _message: string | 'Success' | 'Failed' = 'Success';
  private _data: D = null;
  private _error: ErrorResponseDto = null;

  public setMessage = (
    message: (typeof JsonResponseUtil.prototype)['_message'],
  ) => {
    this._message = message;
    return this;
  };

  public setData = (data: D) => {
    this._data = data;
    return this;
  };

  public setError = (error: (typeof JsonResponseUtil.prototype)['_error']) => {
    this._error = error;
    return this;
  };

  public toPlainObject(): JsonResponseDto<D> {
    return {
      message: this._message,
      data: this._data,
      error: this._error,
    };
  }
}

export class JsonResponseDto<D = any> {
  message: string | 'Success' | 'Failed' = 'Success';
  data: D;
  error: ErrorResponseDto;
}
