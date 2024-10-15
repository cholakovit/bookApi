import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { BookService } from "./BookService";

const bookService = container.resolve(BookService)

export const createBook = async(request: FastifyRequest<{ Body: CreateBookBody }>, reply: FastifyReply) => {
    const { title, author, categories, tags } = request.body;
    const book = await bookService.createBook(title, author);
    reply.send(book);
}

export const getBooks = async(request: FastifyRequest, reply: FastifyReply) => {
    const books = await bookService.getBooks();
    reply.send(books);
}



















