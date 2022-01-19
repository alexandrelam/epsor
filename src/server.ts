import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { BookResolver } from "./resolvers/BookResolver";
import { AuthorResolver } from "./resolvers/AuthorResolver";
import mongoose from "mongoose";

const startServer = async () => {
  await createConnection();
  await mongoose.connect("mongodb://mongo:27017/book");

  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver],
  });

  const app = Express();
  const apolloServer = new ApolloServer({ schema });
  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
      console.log("server started");
    });
  });
};

startServer();
