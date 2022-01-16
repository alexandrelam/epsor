import createBook from "./operations/create";
import deleteBook from "./operations/delete";

const startServer = async () => {
  createBook();
  deleteBook();
};

startServer();
