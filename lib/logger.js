
const Winston = require('winston')

// a good logger will also include log rotation and support some third party
// data collection system e.g. Datadog/Prometheus/Cloudwatch
const logger = Winston.createLogger({
  level: process.env.LOGGING_LEVEL || 'info',
  format: Winston.format.printf(
    ({ timestamp, level, message, context }) => `${level} ${timestamp} ${message} ${JSON.stringify(context)}`
  ),
  transports: [
    new Winston.transports.File({ filename: 'latest.log' }),
    new Winston.transports.Console()
  ]
})

module.exports = { logger }
