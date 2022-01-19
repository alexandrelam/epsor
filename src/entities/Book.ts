import { ObjectType, Field, Int, ID } from "type-graphql";
import { getModelForClass, Prop } from "@typegoose/typegoose";
import { AuthorClass } from "./Author";

@ObjectType()
export class BookClass {
  @Field(() => ID)
  readonly _id: string;

  @Field()
  @Prop()
  public name: string;

  @Field(() => Int)
  @Prop()
  public nbOfPages: number;

  @Field(() => AuthorClass)
  @Prop({ type: () => AuthorClass })
  public author?: AuthorClass;
}

export const BookModel = getModelForClass(BookClass, {
  schemaOptions: { collection: "books" },
});
