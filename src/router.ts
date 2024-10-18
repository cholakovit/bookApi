import { FastifyInstance } from "fastify"
import { BookController } from "./books/Controller";
import { CategoryController } from "./category/Controller";

const categoryController = new CategoryController();
const bookController = new BookController();

export const Routes = (app: FastifyInstance) => {
    app.post('/books', bookController.createBook.bind(bookController));
    app.get('/books', bookController.getBooks.bind(bookController));
    app.get('/books/:id', bookController.getBookById.bind(bookController));
    app.put('/books/:id', bookController.updateBook.bind(bookController));
    app.delete('/books/:id', bookController.deleteBook.bind(bookController));

    app.post('/categories', categoryController.createCategory.bind(categoryController));
    app.get('/categories', categoryController.getCategories.bind(categoryController));
    app.get('/categories/:id', categoryController.getCategoryById.bind(categoryController));
    app.put('/categories/:id', categoryController.updateCategory.bind(categoryController));
    app.delete('/categories/:id', categoryController.deleteCategory.bind(categoryController));
};