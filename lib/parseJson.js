
const BadInputError = require('./errors/badInput')

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

  throw new BadInputError(`Bad input: ${schemaValidator.errors}`)
}
