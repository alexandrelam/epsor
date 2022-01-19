import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { BookClass, BookModel } from "../entities/Book";
import { AuthorModel } from "../entities/Author";

@Resolver()
export class BookResolver {
  @Query(() => [BookClass])
  async books(): Promise<BookClass[]> {
    return await BookModel.find();
  }

  @Mutation(() => BookClass!)
  async addBook(
    @Arg("name") name: string,
    @Arg("nbOfPages") nbOfPages: number,
    @Arg("authorID") authorID: string
  ): Promise<BookClass> {
    const author = await AuthorModel.findById(authorID);
    const book = new BookModel({
      name,
      nbOfPages,
      author,
    });
    return book.save();
  }
}
