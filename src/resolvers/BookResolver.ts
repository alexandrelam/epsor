import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Book } from "../entities/Book";
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
}
