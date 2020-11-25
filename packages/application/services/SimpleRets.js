const base64 = require('base-64');
const fetch = require('node-fetch');

let url = 'https://api.simplyrets.com';
let username = process.env.API_USER;
let password = process.env.API_PASSWORD;

/**
 * Simple service wrapping all Rets functionality. 
 * Important to keep view logic in resolvers, and application logic in services
 */
class SimpleRets {
    constructor (username, password) {
        if (!username || !password) {
            throw new Error('Cannot initialize SimpleRets without a username and password')
        }

        this.username = username;
        this.password = password;
    }

    _getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64.encode(this.username + ":" + this.password)}`
        }
    }

    /**
     * Returns all listings that match query
     * @param {Object} modifier - Modifiers for the query (atm just city)
     * @param {string} modifier.city - a city to filter on
     */
    async getProperties ({ city }) {
        city = city ? `?q=${decodeURIComponent(city)}` : ''

        const response = await fetch(`${url}/properties${city}`, {
            method:'GET',
            headers: this._getHeaders()
        });

        const body = await response.json();

        return body;
    }

    /**
     * returns a specific listing
     * @param {string} mlsId 
     */
    async getProperty (mlsId) {
        const response = await fetch(`${url}/properties/${mlsId}`, {
            method:'GET',
            headers: this._getHeaders()
        });

        const body = await response.json();

        return body;
    }
}

module.exports = {
    SimpleRets: new SimpleRets(username, password)
}

