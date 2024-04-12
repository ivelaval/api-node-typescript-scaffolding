import { createLogger, transports, format } from 'winston';
import 'winston-daily-rotate-file';

const customLogFormat = format.printf(
  ({ level, message, timestamp, label, stack }) => {
    return `[${label}:${timestamp}]  ${level}: ${stack || message}`;
  }
);

const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/combined.%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d'
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label: 'app name' }),
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    format.colorize(),
    format.errors({ stack: true }),
    customLogFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/global.errors.log',
      level: 'error'
    }),
    fileRotateTransport
  ]
});

export default logger;
