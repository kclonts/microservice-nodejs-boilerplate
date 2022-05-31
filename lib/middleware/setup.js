
const nanoid = require('nanoid')
const { logger } = require('../logger')

module.exports = main

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {(route?: string) => void} next
 */
function main(req, res, next) {
  req.context = {
    requestTime: Date.now(),
    reqId: nanoid
  }

  logger.debug('setup middleware', { context: req.context})

  next()
}
