import "reflect-metadata";
import kafka from "./kafka";
import { Book } from "./entities/Book";
import { createConnection, getRepository } from "typeorm";

const startServer = async () => {
  await createConnection();
  const repository = getRepository(Book);

  const consumer = kafka.consumer({ groupId: "mutation-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "book.create", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { name, nbOfPages } = JSON.parse(message!.value!.toString());
      const book = new Book();
      book.name = name;
      book.nbOfPages = nbOfPages;
      await repository.save(book);
      console.log("saved book!");
    },
  });
};

startServer();
