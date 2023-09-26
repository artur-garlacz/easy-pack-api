import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(exception);
    const stack = isHttpException ? undefined : exception.stack;
    const message = isHttpException
      ? exception.message
      : 'INTERNAL_SERVER_ERROR';

    this.logger.error(`[Error]: ${exception.message}`, stack);

    return response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
    });
  }
}
