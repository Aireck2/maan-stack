import { createLogger, format, transports } from 'winston';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logFormat = format.combine(
  format.timestamp({ format: 'DD.MM.YYYY HH:mm:ss a' }),
  format.prettyPrint(),
  format.printf(
    (content) =>
      `[${content.timestamp}] - [${content.level.toUpperCase()}] [${
        content.context
      }] - ${content.message}`
  )
);

const logger = createLogger({
  levels: logLevels,
  format: logFormat,
  defaultMeta: {
    service: 'process',
  },
  transports: [new transports.Console()],
  exceptionHandlers: [
    new transports.File({ filename: `${process.cwd()}/exceptions.log` }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: `${process.cwd()}/rejections.log` }),
  ],
});

export default logger;
