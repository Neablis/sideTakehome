const base64 = require('base-64');
const fetch = require('node-fetch');

let url = 'https://api.simplyrets.com';
let username = process.env.API_USER;
let password = process.env.API_PASSWORD;

class SimpleRets {
    constructor () {}

    _getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64.encode(username + ":" + password)}`
        }
    }

    async getProperties ({ city }) {
        city = city ? `?q=${decodeURIComponent(city)}` : ''

        console.log(`${url}/properties${city}`)

        const response = await fetch(`${url}/properties${city}`, {
            method:'GET',
            headers: this._getHeaders()
        });

        const body = await response.json();

        return body;
    }

    async getProperty (mlsId) {
        console.log(`${url}/properties/${mlsId}`)
        const response = await fetch(`${url}/properties/${mlsId}`, {
            method:'GET',
            headers: this._getHeaders()
        });

        const body = await response.json();

        return body;
    }
}

module.exports = {
    rets: new SimpleRets()
}

