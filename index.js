
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

app.use(express.raw({ type: '*/json' }))
app.use(middlewareSetup)
app.use(middlewareAuth)

app.post('/multiply', routesMultiply);

app.post('/log', () => {

})

app.post('/api', () => {

})

app.use(middlewareErrorHandler)

module.exports.server = app.listen(8080)
