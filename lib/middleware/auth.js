
const crypto = require('crypto')
const { nanoid } = require('nanoid')
const { logger } = require('../logger')
const UnauthorizedError = require('../errors/unauthorized')

module.exports = main

const salt = nanoid()

// API_KEY env var is still technically readable on the machine in plaintext
// and regardless this is probably not a reasonably secure system; however this
// is just an example to show possibly the start of a good solution and usage of the
// crypto API in Node
const apiKeyHash = createHash(process.env.API_KEY)

function main(req, res, next) {
  logger.debug('checking auth', { context: req.context })
  if (!isCorrectKey(req.get('Authorization'))) {
    throw new UnauthorizedError()
  }

  next()
}

/**
 *
 * @param {string} str
 */
function createHash(str) {
  return crypto
    .createHash('sha256')
    .update(salt + str)
    .digest('base64')
}

/**
 *
 * @param {string} key
 * @returns
 */
function isCorrectKey(key) {
  return createHash(key) === apiKeyHash
}
