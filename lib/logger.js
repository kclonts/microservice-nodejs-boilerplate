
const Winston = require('winston')

const logger = Winston.createLogger({
  level: process.env.LOGGING_LEVEL || 'info',
  format: Winston.format.printf(
    ({ timestamp, level, message, context }) => `${level} ${timestamp} ${message} ${JSON.stringify(context)}`
  ),
  transports: [
    new Winston.transports.File({ filename: 'latest.logs' }),
    new Winston.transports.Console()
  ]
})

module.exports = { logger }
