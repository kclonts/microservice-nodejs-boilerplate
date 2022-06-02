
const { expect } = require('chai');
const axios = require('axios').default
const sinon = require('sinon')
const { logger } = require('../lib/logger')

const apiKey = process.env.API_KEY

describe('/log', () => {
  describe('authentication', () => {
    it('errors with wrong password', async () => {
      try {
        await axios.post('http://localhost:8080/log', { headers: { Authorization: 'not the pass' } })
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
    // normally, we'd want to test every __realistic__ possibility, like extra random
    // inputs and every datatype other than a string. But for time's sake, I'm only doing a few
    it('fails without sending data', async () => {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8080/log',
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

    it('fails with wrong datatype', async () => {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8080/log',
          data: { message: [] },
          headers: { Authorization: apiKey }
        })
      }
      catch (error) {
        expect(axios.isAxiosError(error)).to.equal(true)
        expect(error.response.status).to.equal(400)
        expect(error.response.data.message).to.equal('Bad input: message must be string')
        return
      }

      expect.fail('error not thrown')
    })
  })

  describe('happy path', () => {
    /**
     * @type {import('sinon').SinonSandbox}
     */
    let sinonSandbox

    beforeEach(() => {
      sinonSandbox = sinon.createSandbox()
    })

    afterEach(() => {
      sinonSandbox.restore()
    })

    it('works', async () => {
      const loggerInfoSpy = sinonSandbox.spy(logger, 'info')

      const testMessage = 'this is a test message'

      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/log',
        data: { message: testMessage },
        headers: { Authorization: apiKey }
      })

      expect(response.status).to.equal(204)
      expect(response.data).to.equal('')
      expect(loggerInfoSpy.callCount).to.equal(1)
      expect(loggerInfoSpy.firstCall.args).to.have.length(2)
      expect(loggerInfoSpy.firstCall.args[0]).to.equal(testMessage)
      expect(loggerInfoSpy.firstCall.args[1])
        .to.be.an('object')
        .and.haveOwnProperty('context')
    })
  })
})
