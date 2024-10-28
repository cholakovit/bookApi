import { inject, injectable } from "tsyringe";
import { BookRepository } from "./Repository";
import { TagRepository } from "../tags/Repository";


@injectable()
export class BookService {
    constructor(private bookRepository: BookRepository, private tagRepository: TagRepository) { }

    async createBook(title: string, author: string, categoryIds: number[], tagIds: number[]) {
        const tags = await this.tagRepository.getTagsByIds(tagIds)
        return await this.bookRepository.createBook(title, author, categoryIds, tags)
    }

    async getBooks() {
        const books = await this.bookRepository.getBooks()
        if(!books.length) {
            throw new Error('No books found')
        }
        return books
    }

    async getBookById(id: number) {
        const book = await this.bookRepository.getBookById(id)
        if(!book) {
            throw new Error('Book not found')
        }
        return book
    }

    async updateBook(id: number, data: Partial<CreateBookRequest>) {
        const book = await this.bookRepository.getBookById(id)
        if(!book) {
            throw new Error('Book not found')
        }
        return await this.bookRepository.updateBook(id, data as any)
    }

    async deleteBook(id: number) {
        const book = await this.bookRepository.getBookById(id)
        if(!book) {
            throw new Error('Book not found')
        }
        return await this.bookRepository.deleteBook(id)
    }
}