// src/common/filters/entity-not-found.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { Response } from 'express';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // This error always maps to 404 Not Found
    const status = HttpStatus.NOT_FOUND;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Resource Not Found.',
      detail: exception.message.includes('No entity was found')
        ? 'The requested resource could not be found with the given identifier.'
        : exception.message,
    });
  }
}