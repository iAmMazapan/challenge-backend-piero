import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppError, ErrorCode } from '../errors/app.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = ErrorCode.UNEXPECTED as string;
    let message = 'Internal server error';

    if (exception instanceof AppError) {
      code = exception.code;
      message = exception.message;
      if (exception.code === ErrorCode.ENTITY_NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
      } else if (exception.code === ErrorCode.VALIDATION_FAILED || exception.code === ErrorCode.BUSINESS_RULE_VIOLATION) {
        status = HttpStatus.BAD_REQUEST;
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responsePayload = exception.getResponse() as any;
      code = ErrorCode.VALIDATION_FAILED;
      message = typeof responsePayload === 'string' ? responsePayload : responsePayload.message || exception.message;
      if (Array.isArray(message)) {
        message = message.join(', ');
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      error: {
        code,
        message,
      },
    });
  }
}
