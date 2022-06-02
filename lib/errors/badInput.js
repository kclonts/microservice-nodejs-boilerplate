
class BadInputError extends Error {
  /**
   *
   * @param {string} message
   */
  constructor(message) {
    super()
    this.name = 'BadInputError'
    this.statusCode = 400
    this.statusMessage = message || 'Invalid Input'
  }
}

module.exports = BadInputError
