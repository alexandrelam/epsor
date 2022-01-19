import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AuthorClass, AuthorModel } from "../entities/Author";
import { BookClass, BookModel } from "../entities/Book";

@Resolver()
export class AuthorResolver {
  @Query(() => [AuthorClass])
  async authors(): Promise<AuthorClass[]> {
    return await AuthorModel.find();
  }

  @Query(() => [BookClass], {
    description: "Get all books from a specific author",
  })
  async booksFromAuthor(
    @Arg("authorID", { description: "author name" }) authorID: string
  ): Promise<BookClass[]> {
    return await BookModel.find({ "author._id": { $eq: authorID } });
  }

  @Mutation(() => AuthorClass!)
  async addAuthor(
    @Arg("name") name: string,
    @Arg("age") age: number
  ): Promise<AuthorClass> {
    const author = new AuthorModel({
      name,
      age,
    });
    return author.save();
  }
}
