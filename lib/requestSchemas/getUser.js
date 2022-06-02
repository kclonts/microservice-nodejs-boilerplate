
const Ajv = require('ajv')

const ajv = new Ajv()

/**
 * @type {import('ajv').ValidateFunction}
 */
const validate = ajv.compile({
  type: 'object',
  properties: {
    'userName': { type: 'string' }
  },
  required: ['userName'],
  additionalProperties: false
})

module.exports = {
  validate
}
