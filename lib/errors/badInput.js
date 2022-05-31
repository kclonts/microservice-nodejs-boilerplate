
class badInput extends Error {
  constructor() {
    super()

    this.statusCode = 400
    this.statusMessage = 'Invalid Input'
  }
}

module.exports = badInput
