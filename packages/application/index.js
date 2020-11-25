const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
      tracing: true
    }
  ])
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Application successfully started on ${PORT}`);
});