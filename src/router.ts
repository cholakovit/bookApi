import { FastifyInstance } from "fastify"
import { createBook } from "./books/controller"

export const bookRoutes = (app: FastifyInstance) => {
    app.post('/books', createBook);  
}