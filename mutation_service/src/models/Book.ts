import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  _id: String,
  name: String,
  nbOfPages: Number,
});

const Book = mongoose.model("Book", BookSchema);

export default Book;
