
const { expect } = require('chai');
const axios = require('axios').default

describe('/multiply', () => {
  describe('authentication', async () => {
    try {
      await axios.get('localhost:8080/multiply', { headers: { Authorization: 'not the pass' } })
    }
    catch (error) {
      expect(error).to.be.an('error')
      console.log(error)
      expect(error.message).to.equal('')
      return
    }

    expect.fail('Auth error not thrown')
  })

  describe('bad input', () => {

  })

  describe('happy path', () => {

  })
})
