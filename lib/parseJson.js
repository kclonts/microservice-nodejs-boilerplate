
const BadInputError = require('./errors/badInput')
const { logger } = require('./logger')

module.exports = {
  parseJson
}

/**
 *
 * @param {string} json
 * @param {import('ajv').ValidateFunction} [schemaValidator]
 * @returns
 */
function parseJson(json, schemaValidator) {
  let parsed
  try {
    parsed = JSON.parse(json)
  }
  catch (err) {
    err.statusCode = 400
    err.statusMessage = 'invalid JSON data'
    throw err
  }

  if (!schemaValidator || schemaValidator(parsed)) return parsed

  throw new BadInputError(`Bad input: ${createHumanReadableErrorMessage(schemaValidator.errors)}`)
}

/**
 *
 * @param {import('ajv').ErrorObject[]} errors
 */
function createHumanReadableErrorMessage(errors) {
  logger.silly('ajv errors', { errors })
  return errors
    .map(e => {
      const path = e.instancePath
        .slice(1)
        .replace('/', '.')
        || 'Root'
      return `${path} ${e.message}`
    })
    .join('; ')
}
