
const { expect } = require('chai');
const sinon = require('sinon')
const axios = require('axios').default

const apiKey = process.env.API_KEY

describe('/getUser', () => {
  describe('authentication', () => {
    it('errors with wrong password', async () => {
      try {
        await axios.post('http://localhost:8080/getUser', { headers: { Authorization: 'not the pass' } })
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
          url: 'http://localhost:8080/getUser',
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
          url: 'http://localhost:8080/getUser',
          data: { userName: 123 },
          headers: { Authorization: apiKey }
        })
      }
      catch (error) {
        expect(axios.isAxiosError(error)).to.equal(true)
        expect(error.response.status).to.equal(400)
        expect(error.response.data.message).to.equal('Bad input: userName must be string')
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

    const exampleUser = {
      name: 'BobTheBuilder',
      id: 'abcxyz123',
      created: '1605603660',
      favoriteColor: 'Drake\'s Neck Green'
    }

    beforeEach(() => {
      sinonSandbox = sinon.createSandbox()
    })

    afterEach(() => {
      sinonSandbox.restore()
    })

    it('works', async () => {
      const axiosStub = sinonSandbox
        .stub(axios, 'post')
        .withArgs(sinon.match('/some/other/service'), sinon.match.any)
        .resolves({ data: JSON.parse(JSON.stringify(exampleUser)) })

      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/getUser',
        data: { userName: exampleUser.name },
        headers: { Authorization: apiKey }
      })

      expect(response.status).to.equal(200)
      expect(response.data).to.deep.equal({ userData: exampleUser })
      expect(axiosStub.callCount).to.equal(1)
      expect(axiosStub.firstCall.args).to.deep.equal([
        '/some/other/service',
        {
          data: { userName: exampleUser.name }
        }
      ])
    })
  })
})
