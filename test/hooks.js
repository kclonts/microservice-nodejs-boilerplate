
const { server } = require('../index')

exports.mochaHooks = {
  async afterAll() {
    await new Promise((res, rej) => {
      server.close(err => {
        if (err) rej(err)
        else res()
      })
    })
  }
}
