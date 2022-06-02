
const Ajv = require('ajv')

const ajv = new Ajv()

/**
 * @type {import('ajv').ValidateFunction}
 */
const validate = ajv.compile({
  type: 'object',
  properties: {
    'message': { type: 'string' }
  },
  required: ['message'],
  additionalProperties: false
})

module.exports = {
  validate
}
