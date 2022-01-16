import kafka from "../kafka";
import { getRepository } from "typeorm";
import { Book } from "../entities/Book";

const deleteBook = async () => {
  const consumer = kafka.consumer({ groupId: "mutation-delete-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "book.delete", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const bookID = message!.value!.toString();
      const allBook = await getRepository(Book);
      const book = await allBook.findOne(bookID);
      if (book) {
        await allBook.delete(bookID);
        console.log("book deleted!");
      }
    },
  });
};

export default deleteBook;
