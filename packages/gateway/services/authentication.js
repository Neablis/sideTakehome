const authorization = require('auth-header');

/**
 * User Authentication service
 */
class Authentication {
    constructor() {
        this.users = [{ 
            "email": "user1@sideinc.com", 
            "token": "676cfd34-e706-4cce-87ca-97f947c43bd4", 
        }, { 
            "email": "user2@sideinc.com", 
            "token": "2f403433-ba0b-4ce9-be02-d1cf4ad6f453", 
        }]    
    }

    /**
     * Parses a base64 encoded token
     * https://en.wikipedia.org/wiki/Basic_access_authentication
     * @param {*} token 
     */
    _parseToken(token) {
        return authorization.parse(token)
    }

    /**
     * Not used, but easy util function to add new users to system when auth is made
     * @param {string} email 
     * @param {string} token 
     */
    addUser(email, token) {
        this.users.push({email, token})
    }
    
    /**
     * Validates a base64 authorization header is a user in system, single place for metrics and security
     * @param {string} header 
     */
    validateCredentials(header) {
        if (!header) {
            throw new Error('Missing authorization header');
        }

        const auth = this._parseToken(header);

        if (auth.scheme !== 'Basic') {
            throw new Error('Invalid Auth scheme')
        }
     
        const [parsedUser, parsedPassword] = Buffer.from(auth.token, 'base64').toString().split(':', 2);

        const foundUser = this.users.find((user) => user.email === parsedUser);

        if (!foundUser) {
            // Would not do this in production since it allows for easily farming accounts
            throw new Error('User doesnt exist');
        }

        if (foundUser.token !== parsedPassword) {
            throw new Error('Password is invalid');
        }
    }
}

module.exports = Authentication;