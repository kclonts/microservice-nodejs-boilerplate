
class NotFoundError extends Error {
  constructor() {
    super()

    this.name = 'NotFoundError'
    this.statusCode = 404
    this.statusMessage = 'Not Found'
  }
}

module.exports = NotFoundError
