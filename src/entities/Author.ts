import { ObjectType, Field, Int } from "type-graphql";
import { Prop, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
export class AuthorClass {
  @Prop()
  @Field()
  public name: string;

  @Prop()
  @Field(() => Int)
  public age: number;
}

export const AuthorModel = getModelForClass(AuthorClass, {
  schemaOptions: { collection: "author" },
});
