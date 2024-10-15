import { FastifyInstance } from "fastify"
import { BookController } from "./books/Controller";


const bookController = new BookController();

export const bookRoutes = (app: FastifyInstance) => {
    app.post('/books', bookController.createBook.bind(bookController));
    app.get('/books', bookController.getBooks.bind(bookController));
};