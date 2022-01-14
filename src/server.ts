import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4001 }, () =>
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
  );
});
