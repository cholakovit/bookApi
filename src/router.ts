import { FastifyInstance } from "fastify"
import { createBook, getBooks } from "./books/controller"

export const bookRoutes = (app: FastifyInstance) => {
    app.post('/books', createBook);
    app.get('/books', getBooks)
}