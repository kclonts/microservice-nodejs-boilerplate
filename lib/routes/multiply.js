
const BigDecimal = require('js-big-decimal')
const schemaValidator = require('../requestSchemas/multiply')

module.exports = main

function main(req, res) {
  schemaValidator.validate(req.data)

  const { multiplicand, multiplier } = req.data

  const product = BigDecimal.getPrettyValue(BigDecimal.multiply(multiplicand, multiplier))

  res.status(200).send({ result: product })
}
