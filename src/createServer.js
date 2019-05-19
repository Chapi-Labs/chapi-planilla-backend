const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');
const { ApolloEngine } = require('apollo-engine');

// Create the GraphQL Yoga Server

function createServer() {
    const engine = new ApolloEngine({
      apiKey: process.env.APOLLO_ENGINE_KEY
    });
    const server =  new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query,
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false,
        },
        context: req => ({ ...req, db }),
    });
    return { engine, server };
}

module.exports = createServer;