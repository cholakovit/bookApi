import { injectable } from "tsyringe";
import { createBookRepository, getBooksRepository } from "./repository";


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
    }
}