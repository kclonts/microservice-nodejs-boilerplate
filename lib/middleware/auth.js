
const crypto = require('crypto')
const { nanoid } = require('nanoid')
const UnauthorizedError = require('../errors/unauthorized')

module.exports = main

const salt = nanoid()

// API_KEY env var is still technically readable on the machine in plaintext
// but I just wanted to give an example of a more secure option in the application
const apiKeyHash = createHash(process.env.API_KEY)

function main(req, res, next) {
  if (!isCorrectKey(req.param.apiKey)) {
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
