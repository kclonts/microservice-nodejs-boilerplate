
class NotFound extends Error {
  constructor() {
    super()

    this.statusCode = 404
    this.statusMessage = 'Not Found'
  }
}

module.exports = NotFound
