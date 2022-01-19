import { ObjectType, Field, Int } from "type-graphql";
import { getModelForClass, Prop } from "@typegoose/typegoose";
import { AuthorClass } from "./Author";

@ObjectType()
export class BookClass {
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
