import kafka from "../kafka";
import Book from "../models/Book";

const deleteBook = async () => {
  const consumer = kafka.consumer({ groupId: "mutation-delete-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "book.delete", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const bookID = message!.value!.toString();
      try {
        await Book.deleteOne({ _id: bookID });
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export default deleteBook;
