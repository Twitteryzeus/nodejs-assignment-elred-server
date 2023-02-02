const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, simple, splat } = format;

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: combine(
    splat(),
    simple(),
    colorize(),
    timestamp()
  ),
  transports: [
    new transports.Console()
  ],
});

module.exports = logger;
