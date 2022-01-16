import createBook from "./operations/create";
import deleteBook from "./operations/delete";
import mongoose from "mongoose";

const startServer = async () => {
  mongoose.connect("mongodb://mongo:27017/book");
  createBook();
  deleteBook();
};

startServer();
