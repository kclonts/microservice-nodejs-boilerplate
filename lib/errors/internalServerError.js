
class InternalServerError extends Error {
  constructor() {
    super()

    this.statusCode = 500
    this.statusMessage = 'Internal Server Error'
  }
}

module.exports = InternalServerError
