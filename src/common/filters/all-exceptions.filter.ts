// src/common/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch() // Catches all unhandled exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default to Internal Server Error
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let detail = 'An unexpected error occurred on the server.';

    // Attempt to extract the message from the unknown exception type
    if (exception instanceof Error) {
      // For all standard JavaScript/Node.js errors
      message = exception.message;
      detail = exception.stack || exception.message; // Use stack trace for detail
    } else if (typeof exception === 'object' && exception !== null && 'message' in exception) {
      // For objects that look like errors
      message = (exception as { message: string }).message;
    } else if (typeof exception === 'string') {
      // For string errors
      message = exception;
    }

    // Log the error for server-side debugging
    this.logger.error(`[${request.method}] ${request.url} - ${message}`, detail);

    // Send the detailed error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message, // The exact error message
      error: 'Uncaught Server Error',
    });
  }
}