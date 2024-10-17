import { injectable } from "tsyringe";
import { createBookRepository, deleteBookRepository, getBookByIdRepository, getBooksRepository, updateBookRepository } from "./repository";


@injectable()
export class BookService {
    async createBook(title: string, author: string) {
        if(!title || !author) {
            throw new Error('Title and author are required')
        }

        return await createBookRepository(title, author);
    }

    async getBooks() {
        const books = await getBooksRepository();
        if(!books.length) {
            throw new Error('No books found')
        }
        return books
    }

    async getBookById(id: number) {
        const book = await getBookByIdRepository(id)
        if(!book) {
            throw new Error('Book not found')
        }
        return book
    }

    async updateBook(id: number, data: Partial<CreateBookRequest>) {
        const book = await getBookByIdRepository(id)
        if(!book) {
            throw new Error('Book not found')
        }
        return await updateBookRepository(id, data)
    }

    async deleteBook(id: number) {
        const book = await getBookByIdRepository(id)
        if(!book) {
            throw await deleteBookRepository(id)
        }
        return await deleteBookRepository(id)
    }
}