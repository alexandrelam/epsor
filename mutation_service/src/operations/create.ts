import Book from "../models/Book";
import kafka from "../kafka";
import mongoose from "mongoose";

const createBook = async () => {
  const consumer = kafka.consumer({ groupId: "mutation-create-group" });
  mongoose.connect("mongodb://mongo:27017/book");
  await consumer.connect();
  await consumer.subscribe({ topic: "book.create", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { id, name, nbOfPages } = JSON.parse(message!.value!.toString());
      const book = new Book({ _id: id, name, nbOfPages });

      try {
        await book.save(book);
      } catch (error) {
        console.log(error);
      }

      console.log(book);
      console.log("saved book!");
    },
  });
};

export default createBook;
