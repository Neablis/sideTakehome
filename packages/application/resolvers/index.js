const fetch = require('node-fetch');
const { rets } = require('../services/simpleRets');

const resolvers = {
  Query: { 
    listings: (_, { city }) => {
      return rets.getProperties({
        city
      })
    },
    listing: (_, { mlsId }) => {
      return rets.getProperty(mlsId)
    }
  },
};

module.exports = resolvers;