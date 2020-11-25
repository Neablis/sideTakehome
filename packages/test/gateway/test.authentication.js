const { expect } = require('chai');
const base64 = require('base-64');
const Authentication = require('../../gateway/services/authentication');

describe('Authentication', () => {
  let authentication;

  beforeEach(() => {
    authentication = new Authentication()
  })

  describe('BasicAuth', () => {
    it('Throws a error if a invalid auth scheme is passed in', async () => {
      const badParse = () => authentication.validateCredentials('Fake Header')

      expect(badParse).to.throw('Invalid Auth scheme')
    })

    it('Throws a error if no header is passed', async () => {
      const badParse = () => authentication.validateCredentials()

      expect(badParse).to.throw('Missing authorization header')
    })

    it('Doesnt throw a error if correct username/password is passed', () => {
      const {email, token} = authentication.users[0]
      const header = `Basic ${base64.encode(email + ":" + token)}`

      const goodParse = () => authentication.validateCredentials(header)
      expect(goodParse).to.not.throw()
    })

    it('Throws a error if incorrect password is passed', () => {
      const {email} = authentication.users[0]
      const header = `Basic ${base64.encode(email + ":fake")}`

      const goodParse = () => authentication.validateCredentials(header)
      expect(goodParse).to.throw('Password is invalid')
    })
  })
})
  