import { FastifyInstance } from "fastify"
import { BookController } from "./books/Controller";


const bookController = new BookController();

export const bookRoutes = (app: FastifyInstance) => {
    app.post('/books', bookController.createBook.bind(bookController));
    app.get('/books', bookController.getBooks.bind(bookController));
    app.get('/books/:id', bookController.getBookById.bind(bookController));
    app.put('/books/:id', bookController.updateBook.bind(bookController));
    app.delete('/books/:id', bookController.deleteBook.bind(bookController));
};