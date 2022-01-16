import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Book } from "../entities/Book";
import kafka from "../kafka";

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books(): Promise<Book[]> {
    console.log("querying");
    console.log(await Book.find());
    return await Book.find();
  }

  @Mutation(() => Book!)
  async addBook(
    @Arg("id") id: string,
    @Arg("name") name: string,
    @Arg("nbOfPages") nbOfPages: number
  ): Promise<Book> {
    const payload = { id, name, nbOfPages };
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: "book.create",
      messages: [{ value: JSON.stringify(payload) }],
    });
    const book = Book.create({
      id,
      name,
      nbOfPages,
    });
    return book;
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
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: "book.delete",
      messages: [{ value: bookID }],
    });
    return null;
  }
}
