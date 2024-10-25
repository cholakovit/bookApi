import { FastifyInstance } from "fastify"
import { BookController } from "./books/Controller";
import { CategoryController } from "./category/Controller";
import { TagController } from "./tags/Controller";
import { UserController } from "./users/Controller";

const categoryController = new CategoryController();
const bookController = new BookController();
const tagController = new TagController();
const userController = new UserController();

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

    app.post('/tags', tagController.createTag.bind(tagController));
    app.get('/tags', tagController.getTags.bind(tagController));
    app.get('/tags/:id', tagController.getTagById.bind(tagController));
    app.put('/tags/:id', tagController.updateTag.bind(tagController));
    app.delete('/tags/:id', tagController.deleteTag.bind(tagController));

    app.post('/users', userController.createUser.bind(userController));
    app.get('/users', userController.getUsers.bind(userController));
    app.get('/users/:id', userController.getUserById.bind(userController));
    app.put('/users/:id', userController.updateUser.bind(userController));
    app.delete('/users/:id', userController.deleteUser.bind(userController));
};