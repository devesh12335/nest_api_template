// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // Check if the error is from the ValidationPipe
    const isValidationError =
      typeof errorResponse === 'object' &&
      'message' in errorResponse &&
      Array.isArray(errorResponse['message']);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      // For validation errors, return the array of messages
      message: isValidationError ? errorResponse['message'] : exception.message,
      // For standard errors, return the error type
      error: isValidationError ? 'Bad Request' : errorResponse['error'] || exception.name,
    });
  }
}