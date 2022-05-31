
const { logger } = require('../logger')

module.exports = main

/**
 *
 * @param {Error & { statusCode: number, statusMessage: string }} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function main(err, req, res, next) {
  logger.error(err)
  res.status(err.statusCode).send(err.statusMessage)
}
