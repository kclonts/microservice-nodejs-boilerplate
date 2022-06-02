
const Winston = require('winston')
const path = require('path')
const safeStringify = require('safe-json-stringify')

// Stack trace format :
// https://github.com/v8/v8/wiki/Stack%20Trace%20API
const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
const stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;

// a good logger will also include log rotation and support some third party
// data collection system e.g. Datadog/Prometheus/Cloudwatch
const logger = Winston.createLogger({
  level: process.env.LOGGING_LEVEL || 'info',
  format: Winston.format.combine(
    Winston.format.timestamp(),
    Winston.format.printf(customFormat)
  ),
  transports: [
    new Winston.transports.File({ filename: 'latest.log' }),
    new Winston.transports.Console()
  ]
})

module.exports = { logger }

function customFormat({ timestamp, level, message, context }) {
  const { method, folder, file, line } = getStack()
  return safeStringify({
    level,
    timestamp,
    trace: `${method}:${folder}/${file}:${line}`,
    message: level === 'error' && message instanceof Error? { message: `${message.name} ${message.message}`, ...message } : message,
    context: context || {}
  })
}

function getStack() {
  const data = {};

  // get call stack, and analyze it
  // get all files, method, and line number
  // slice up the stack to get originating code in your application
  const stacklist = (new Error()).stack.split('\n').slice(13);
  const s = stacklist[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);

  if (!sp || sp.length !== 5) return data;

  data.method = sp[1];
  data.path = sp[2];
  data.line = sp[3];
  data.pos = sp[4];
  data.folder = path.dirname(path.resolve(data.path));
  data.file = path.basename(data.path);

  data.stack = stacklist.join('\n');

  return data;
}
