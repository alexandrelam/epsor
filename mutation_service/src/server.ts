import { createConnection } from "typeorm";
import createBook from "./operations/create";
import deleteBook from "./operations/delete";

const startServer = async () => {
  await createConnection();
  createBook();
  deleteBook();
};

startServer();
