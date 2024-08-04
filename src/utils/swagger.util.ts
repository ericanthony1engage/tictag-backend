import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponseDto, JsonResponseDto } from './json-response.util';

class SwaggerEndpointParamDto {
  summary: string;
  bodyType?: any;
  successResponse: { description?: string; type?: any; status?: HttpStatus };
}

export const SwaggerUtil = (param: SwaggerEndpointParamDto) => {
  let data_properties: Record<any, any>;
  let extra_model: ClassDecorator | MethodDecorator | PropertyDecorator;

  if (param.successResponse.type === null) {
    extra_model = ApiExtraModels(JsonResponseDto, ErrorResponseDto);
    data_properties = { type: 'null', default: null };
  } else {
    extra_model = ApiExtraModels(
      JsonResponseDto,
      param.successResponse.type,
      ErrorResponseDto,
    );
    data_properties = {
      $ref: getSchemaPath(param.successResponse.type),
    };
  }

  const decorators = [
    extra_model,
    ApiOperation({ summary: param.summary }),
    ApiOkResponse({
      status: param.successResponse.status ?? HttpStatus.OK,
      description: param.successResponse.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(JsonResponseDto) },
          {
            properties: {
              message: { type: 'string', default: 'Success' },
              data: data_properties,
              error: { type: 'null', default: null },
            },
          },
        ],
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        allOf: [
          { $ref: getSchemaPath(JsonResponseDto) },
          {
            properties: {
              message: { type: 'string', default: 'Failed' },
              data: { type: 'null', default: null },
              error: { $ref: getSchemaPath(ErrorResponseDto) },
            },
          },
        ],
      },
    }),
  ];

  if (param.bodyType) {
    decorators.splice(1, 0, ApiBody({ type: param.bodyType }));
  }

  return applyDecorators(...decorators);
};
