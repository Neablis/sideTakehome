const fetch = require('node-fetch');
const { SimpleRets } = require('../services/SimpleRets');

const resolvers = {
  Query: { 
    listings: async (_, { city }) => {
      return SimpleRets.getProperties({
        city
      });
    },
    listing: (_, { mlsId }) => {
      return SimpleRets.getProperty(mlsId);
    },
    health: () => {
      return 'OK';  
    }
  },
};

module.exports = resolvers;