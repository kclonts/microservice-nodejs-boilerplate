
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
  logger.error(err, { context: req.context })
  res.status(err.statusCode || 500).send({ message: err.statusMessage || 'There was an error' })
}
