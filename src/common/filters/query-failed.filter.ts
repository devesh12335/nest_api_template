import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const errorDetails = this.extractPostgresError(exception);

    if (errorDetails.code === '23505') {
      // 409 Conflict for Unique Constraint Violation
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: `Resource Conflict: A record with the same unique ${errorDetails.column || 'field'} already exists.`,
        detail: errorDetails.detail,
      });
      return;
    }

    // Default handling for other QueryFailedErrors
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'A database query failed unexpectedly.',
      detail: exception.message,
    });
  }

  /**
   * Helper to extract details from the PostgreSQL driver error object embedded in TypeORM's error.
   */
  private extractPostgresError(exception: QueryFailedError): {
    code: string;
    detail: string;
    table?: string;
    column?: string;
  } {
    // The PostgreSQL driver error is often attached to the TypeORM error
    const driverError = (exception as any).driverError; 
    
    if (driverError) {
        // Extract column name from the detail (e.g., Key (name)=(Asia) already exists.)
        const match = driverError.detail.match(/\((.*?)\)=\(/);
        const column = match ? match[1] : undefined;
        
        return {
            code: driverError.code,
            detail: driverError.detail,
            table: driverError.table,
            column: column
        };
    }

    return { code: '', detail: exception.message };
  }
}