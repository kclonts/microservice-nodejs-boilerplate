
const express = require('express')
const middlewareSetup = require('./lib/middleware/setup')
const middlewareAuth = require('./lib/middleware/auth')
const middlewareErrorHandler = require('./lib/middleware/errorhandler')
const routesMultiply = require('./lib/routes/multiply')

const app = express()

module.exports = {
  /**
  * @type {import('http').Server}
  */
  server: null,
  app
}

app.use(express.json())
app.use(middlewareSetup)
app.use(middlewareAuth)
app.use(middlewareErrorHandler)

app.get('/multiply', routesMultiply);

app.get('/log', () => {

})

app.post('/api', () => {

})

module.exports.server = app.listen(8080)
