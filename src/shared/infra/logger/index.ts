import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export function createLogger() {
  return WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss.SSS.Z' }),
          winston.format.align(),
          winston.format.printf(
            (info) =>
              `[Easy Pack] ${info.timestamp} [${info.level}]: ${info.message} ${
                info.stack ? info.stack : ''
              }`,
          ),
        ),
        level: process.env.LOGGING_LVL || 'debug',
      }),
    ],
  });
}
