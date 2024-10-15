import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { BookService } from "./Service";
import { validateFields } from "../utils/decorators";

const bookService = container.resolve(BookService)

export class BookController {
    @validateFields([
      { field: 'title', minLength: 3 },
      { field: 'author', minLength: 3 },
    ])
    public async createBook(
      request: FastifyRequest<{ Body: CreateBookBody }>,
      reply: FastifyReply
    ) {
      const { title, author, categories, tags } = request.body;
      const book = await bookService.createBook(title, author);
      reply.send(book);
    }
  
    public async getBooks(request: FastifyRequest, reply: FastifyReply) {
      const books = await bookService.getBooks();
      reply.send(books);
    }
  }



















