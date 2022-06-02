
const axios = require('axios').default
const schemaValidator = require('../requestSchemas/getUser')
const { parseJson } = require('../parseJson')
const logger = require('../logger')
const InternalServerError = require('../errors/internalServerError')

module.exports = main

async function main(req, res) {
  const data = parseJson(req.body, schemaValidator.validate)

  const { userName } = data

  try {
    const response = await axios.post('/some/other/service', { data: { userName } })
    res.status(200).send({ userData: response.data })
    return
  }
  catch (err) {
    logger.error(err, { context: req.context })
    throw new InternalServerError()
  }
}
