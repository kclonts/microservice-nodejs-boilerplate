
class UnauthorizedError extends Error {
  constructor() {
    super()

    this.name = 'UnauthorizedError'
    this.statusCode = 401
    this.statusMessage = 'Unauthorized Credentials'
  }
}

module.exports = UnauthorizedError
