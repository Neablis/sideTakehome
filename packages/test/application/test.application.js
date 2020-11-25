const { createTestClient } = require('apollo-server-testing');
const { expect } = require('chai');
const nock = require('nock');
const server = require('../../application');

let url = 'https://api.simplyrets.com';

const { query } = createTestClient(server);

const fakeListings = [
  {
    "mlsId": 1005192,
  }
]

// graphl query
const GET_LISTINGS = `
  query getListings($city: String) {
    listings(city: $city) {
      mlsId
    }
  }
`;

// graphl query
const GET_LISTING = `
  query getListing($mlsId: Int!) {
    listing(mlsId: $mlsId) {
      mlsId
    }
  }
`;

describe('Queries', () => {
  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  })

  describe('Listings', () => {
    it('fetches listings of properties', async () => {
      const scope = nock(`${url}/`)
        .get('/properties')
        .reply(200, fakeListings)
  
      const { errors, data } = await query({
        query: GET_LISTINGS,
      });
  
      expect(data.listings).to.have.length(fakeListings.length)
    });
  
    it('fetches listings properties filtered by city', async () => {
      const scope = nock(`${url}/`)
        .get('/properties?q=san francisco')
        .reply(200, fakeListings)
  
      const { errors, data } = await query({
        query: GET_LISTINGS,
        variables: { city: 'san francisco'}
      });
  
      expect(data.listings).to.have.length(fakeListings.length)
    });
  })

  describe('Listing', () => {
    it('fetches a single listing with mlsId', async () => {
      const fakeId = 1005192;

      const scope = nock(`${url}/`)
        .get(`/properties/${fakeId}`)
        .reply(200, fakeListings[0])
  
      const { errors, data } = await query({
        query: GET_LISTING,
        variables: { mlsId: fakeId}
      });

  
      expect(data.listing).to.have.property('mlsId', fakeId)
    });
  })
});
