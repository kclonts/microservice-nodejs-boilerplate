
class UnauthorizedError extends Error {
  constructor() {
    super()

    this.statusCode = 401
    this.statusMessage = 'Unauthorized Credentials'
  }
}

module.exports = UnauthorizedError
