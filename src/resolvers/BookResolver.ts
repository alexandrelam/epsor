import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { BookClass, BookModel } from "../entities/Book";
import { AuthorModel } from "../entities/Author";

@Resolver()
export class BookResolver {
  @Query(() => [BookClass], { description: "Get all books" })
  async books(
    @Arg("page", { defaultValue: 0 }) page: number,
    @Arg("take", { nullable: true }) take?: number
  ): Promise<BookClass[]> {
    if (take)
      return await BookModel.find()
        .skip(page * take)
        .limit(take);
    return await BookModel.find();
  }

  @Mutation(() => BookClass!, { description: "Add a new book" })
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
