
const express = require('express')
const middlewareSetup = require('./lib/middleware/setup')
const middlewareAuth = require('./lib/middleware/auth')
const middlewareErrorHandler = require('./lib/middleware/errorhandler')
const routesMultiply = require('./lib/routes/multiply')
const routesLog = require('./lib/routes/log')
const routesGetUser = require('./lib/routes/getUser')

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

app.post('/multiply', routesMultiply)

app.post('/log', routesLog)

app.post('/getUser', errorWrapper(routesGetUser))

app.use(middlewareErrorHandler)

module.exports.server = app.listen(8080)

/**
 *
 * @param {(req, res) => Promise<any>} routeHandler
 */
function errorWrapper(routeHandler) {
  return (req, res, next) => routeHandler(req, res).catch(next)
}
