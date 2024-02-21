import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponseForm } from './global.filter';
import { ErrorMessageType } from 'src/utils/types/error-message.type';

interface ErrorData {
  code?: number;
  statusCode?: number;
  message: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const data = exception.getResponse() as ErrorData;
    const timestamp = new Date().toISOString();

    const code = data.code ?? data.statusCode ?? 500;

    const log = {
      timestamp,
      method: request.method,
      path: request.url,
      code,
      message: data.message,
      ip: request.ip,
    };

    this.logger.error(log);

    response.status(code).json({
      success: false,
      timestamp,
      path: request.url,
      code,
      message: data.message,
    } as ErrorResponseForm<ErrorMessageType>);
  }
}
