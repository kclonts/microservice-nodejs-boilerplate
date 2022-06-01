
const express = require('express')
const middlewareSetup = require('./lib/middleware/setup')
const middlewareAuth = require('./lib/middleware/auth')
const middlewareErrorHandler = require('./lib/middleware/errorhandler')
const routesMultiply = require('./lib/routes/multiply')

const app = express()

app.use(express.json())
app.use(middlewareSetup)
app.use(middlewareAuth)
app.use(middlewareErrorHandler)

app.get('/multiply', routesMultiply);

app.get('/log', () => {

})

app.post('/api', () => {

})

/**
 * @type {import('http').Server}
 */
const server = app.listen(8080)

module.exports = {
  server,
  app
}
