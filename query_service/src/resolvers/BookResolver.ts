import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getRepository } from "typeorm";
import { Book } from "../entities/Book";
import kafka from "../kafka";
@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return await Book.find();
  }

  @Mutation(() => Book!)
  async addBook(
    @Arg("name") name: string,
    @Arg("nbOfPages") nbOfPages: number
  ): Promise<Book> {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: "test-topic",
      messages: [{ value: "Hello KafkaJS user!" }],
    });

    const book = Book.create({
      name,
      nbOfPages,
    });
    return await book.save();
  }

  @Query(() => Book!, { nullable: true })
  async findBookByID(
    @Arg("bookID") bookID: string
  ): Promise<Book | undefined | null> {
    return await Book.findOne(bookID);
  }

  @Mutation(() => Book!, { nullable: true })
  async deleteBookByID(
    @Arg("bookID") bookID: string
  ): Promise<Book | undefined | null> {
    const allBook = await getRepository(Book);
    const book = await allBook.findOne(bookID);
    if (book) {
      await allBook.delete(bookID);
      return book;
    }
    return null;
  }

  @Mutation(() => Book!)
  async updateBook(
    @Arg("bookID") bookID: string,
    @Arg("name") name: string,
    @Arg("nbOfPages") nbOfPages: number
  ): Promise<Book | null> {
    let book = await Book.findOne(bookID);
    if (book) {
      book.name = name;
      book.nbOfPages = nbOfPages;
      await getRepository(Book).update(bookID, book);
      return book;
    }
    return null;
  }
}
