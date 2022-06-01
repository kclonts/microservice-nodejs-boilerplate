
const Ajv = require('ajv')

const ajv = new Ajv()

/**
 * @type {import('ajv').ValidateFunction}
 */
const validate = ajv.compile({
  type: 'object',
  properties: {
    'multiplicand': { type: 'string' },
    'multiplier': { type: 'string' }
  },
  required: ['multiplicand', 'multiplier'],
  additionalProperties: false
})

module.exports = {
  validate
}
