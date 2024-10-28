import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { BookService } from "./Service";
import { validateFields } from "../utils/decorators";

const bookService = container.resolve(BookService)

export class BookController {
    @validateFields([{ field: 'title', minLength: 3 }, { field: 'author', minLength: 3 }, { field: 'categoryIds', isArray: true }])
    public async createBook(request: FastifyRequest<{ Body: CreateBookRequest }>, reply: FastifyReply) {
      const { title, author, categoryIds, tagIds } = request.body;
      const book = await bookService.createBook(title, author, categoryIds, tagIds);
      reply.send(book);
    }
  
    public async getBooks(request: FastifyRequest, reply: FastifyReply) {
      const books = await bookService.getBooks();
      reply.send(books);
    }

    public async getBookById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
      const book = await bookService.getBookById(Number(request.params.id))
      if(book) {
        reply.send(book)
      }else {
        reply.status(404).send({ error: 'Book not found' })
      }
    }

    @validateFields([{ field: 'title', minLength: 3 }, { field: 'author', minLength: 3 }])
    public async updateBook(request: FastifyRequest<{ Params: { id: string }; Body: CreateBookRequest }>, reply: FastifyReply) {
      const { title, author, categoryIds } = request.body
      const updateBook = await bookService.updateBook(Number(request.params.id), { title, author })
      if(updateBook) {
        reply.send(updateBook)
      } else {
        reply.status(404).send({ error: 'Book not found' })
      }
    }

    public async deleteBook(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
      const deleted = await bookService.deleteBook(Number(request.params.id))
      if(deleted) {
        reply.send({ message: 'Book deleted' })
      } else {
        reply.status(404).send({ error: 'Book not found' })
      }
    }
  }