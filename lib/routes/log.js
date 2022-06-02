
const schemaValidator = require('../requestSchemas/log')
const { parseJson } = require('../parseJson')
const { logger } = require('../logger')

module.exports = main

function main(req, res) {
  const data = parseJson(req.body, schemaValidator.validate)

  const { message } = data

  logger.info(message, { context: req.context })

  res.status(204).send()
}
