import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, BaseEntity, Column, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity({ name: "books" })
export class Book extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  nbOfPages: number;
}
