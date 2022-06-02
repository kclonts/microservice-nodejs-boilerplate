
const { expect } = require('chai')
const axios = require('axios').default

describe('Generic Express Errors', () => {
  it('handles 404 errors with 401 response', async () => {
    try {
      await axios.get('http://localhost:8080/some/nonexistent/route')
    }
    catch (err) {
      expect(err.message).to.equal('Request failed with status code 401')
      expect(err.response.status).to.equal(401)
      return
    }

    expect.fail('no error was thrown')
  })

  it('returns 404 on 404 errors with credentials', async () => {
    try {
      await axios.get('http://localhost:8080/some/nonexistent/route', { headers: { Authorization: process.env.API_KEY } })
    }
    catch(err) {
      expect(err.message).to.equal('Request failed with status code 404')
      expect(err.response.status).to.equal(404)
    }
  })
})
