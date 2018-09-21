import * as path from 'path';
import {createLogger, transports, stream} from 'winston';

const appRoot = path.dirname(require.main.filename);

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export const logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// stream({ start: -1 }).on('info', function(log) {
//   console.info(log);
// });
