import { Book } from "../entities/Book";
import kafka from "../kafka";

const createBook = async () => {
  const consumer = kafka.consumer({ groupId: "mutation-create-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "book.create", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { name, nbOfPages } = JSON.parse(message!.value!.toString());
      const book = Book.create({ name: name, nbOfPages: nbOfPages });
      book.save();
      console.log("saved book!");
    },
  });
};

export default createBook;
