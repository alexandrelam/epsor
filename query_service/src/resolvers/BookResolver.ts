import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
} from "type-graphql";
import { Book } from "../entities/Book";
import kafka from "../kafka";

type OrderDirection = "ASC" | "DESC";

@InputType()
class PaginationInputType {
  @Field(() => Int)
  take: number;

  @Field(() => Int)
  skip: number;
}

@InputType()
class OrderByInputType {
  @Field()
  fieldName: string;

  @Field()
  direction: OrderDirection;
}

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books(
    @Arg("OrderBy", { nullable: true }) OrderBy?: OrderByInputType,
    @Arg("Pagination", { nullable: true }) Pagination?: PaginationInputType
  ): Promise<Book[]> {
    let args = {};

    if (OrderBy) {
      args = {
        ...args,
        order: {
          [OrderBy.fieldName]: OrderBy.direction,
        },
      };
    }

    if (Pagination) {
      args = {
        ...args,
        skip: Pagination.skip,
        take: Pagination.take,
      };
    }

    return await Book.find(args);
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
