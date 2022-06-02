
const { expect } = require('chai');
const axios = require('axios').default

const apiKey = process.env.API_KEY

describe('/multiply', () => {
  describe('authentication', () => {
    it('errors with wrong password', async () => {
      try {
        await axios.post('http://localhost:8080/multiply', { headers: { Authorization: 'not the pass' } })
      }
      catch (error) {
        expect(axios.isAxiosError(error)).to.equal(true)
        expect(error.message).to.equal('Request failed with status code 401')
        expect(error.response.status).to.equal(401)
        expect(error.response.data.message).to.equal('Unauthorized Credentials')
        return
      }

      expect.fail('error not thrown')
    })
  })

  describe('bad input', () => {
    // input is expected to be the multiplicand and multiplier with nothing else
    // e.g. { "multiplicand": "2", "multiplier": "4.8945" }
    // normally, we'd want to test every __realistic__ possibility, like extra random
    // inputs and every datatype other than a string. But for time's sake, I'm only doing a few
    it('fails without sending data', async () => {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8080/multiply',
          headers: { Authorization: apiKey }
        })
      }
      catch (error) {
        expect(axios.isAxiosError(error)).to.equal(true)
        expect(error.response.status).to.equal(400)
        expect(error.response.data.message).to.equal('invalid JSON data')
        return
      }

      expect.fail('error not thrown')
    })

    it('fails without the multiplicand', async () => {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8080/multiply',
          data: { multiplier: '10' },
          headers: { Authorization: apiKey }
        })
      }
      catch (error) {
        expect(axios.isAxiosError(error)).to.equal(true)
        expect(error.response.status).to.equal(400)
        expect(error.response.data.message).to.equal('Bad input: Root must have required property \'multiplicand\'')
        return
      }

      expect.fail('error not thrown')
    })

    it('fails with wrong datatype', async () => {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8080/multiply',
          data: { multiplier: '10', multiplicand: 2 },
          headers: { Authorization: apiKey }
        })
      }
      catch (error) {
        expect(axios.isAxiosError(error)).to.equal(true)
        expect(error.response.status).to.equal(400)
        expect(error.response.data.message).to.equal('Bad input: multiplicand must be string')
        return
      }

      expect.fail('error not thrown')
    })
  })

  describe('happy path', () => {
    it('works', async () => {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/multiply',
        data: { multiplier: '10.5938', multiplicand: '2' },
        headers: { Authorization: apiKey }
      })

      expect(response.status).to.equal(200)
      expect(response.data).to.deep.equal({
        result: '21.1876'
      })
    })
  })
})
