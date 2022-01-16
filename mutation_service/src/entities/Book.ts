import { ObjectId } from "mongodb";
import { Entity, BaseEntity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class Book extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  nbOfPages: number;
}
