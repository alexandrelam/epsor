import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, BaseEntity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  nbOfPages: number;
}
