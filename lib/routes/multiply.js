
const BigDecimal = require('js-big-decimal')
const schemaValidator = require('../requestSchemas/multiply')
const { parseJson } = require('../parseJson')

module.exports = main

function main(req, res) {
  const data = parseJson(req.body, schemaValidator.validate)

  const { multiplicand, multiplier } = data

  const product = BigDecimal.getPrettyValue(BigDecimal.multiply(multiplicand, multiplier))

  res.status(200).send({ result: product })
}
