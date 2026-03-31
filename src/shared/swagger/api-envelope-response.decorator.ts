import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiCreatedResponse, getSchemaPath } from '@nestjs/swagger';

type ApiEnvelopeOptions = {
  status?: number;
  isArray?: boolean;
  extraModels?: Type<unknown>[];
};

export function ApiEnvelopeResponse(
  model: Type<unknown>,
  options: ApiEnvelopeOptions = {},
): MethodDecorator & ClassDecorator {
  const status = options.status ?? 200;
  const models = [model, ...(options.extraModels ?? [])];
  const schema = options.isArray
    ? {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      }
    : {
        type: 'object',
        properties: {
          data: { $ref: getSchemaPath(model) },
        },
      };

  const responseDecorator = status === 201 ? ApiCreatedResponse : ApiOkResponse;

  return applyDecorators(
    ApiExtraModels(...models),
    responseDecorator({ status, schema }),
  );
}
