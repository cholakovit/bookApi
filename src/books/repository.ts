import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { Book } from "./Book";
import { AppDataSource } from "../ormconfig";
import { Tag } from "../tags/Tag";


@injectable()
export class BookRepository {
    private bookRepository: Repository<Book>

    constructor() {
        this.bookRepository = AppDataSource.getRepository(Book)
    }

    async createBook(title: string, author: string, categoryIds: number[], tags: Tag[]): Promise<Book> {
        const book = this.bookRepository.create({ title, author, categoryIds, tags })
        return await this.bookRepository.save(book)
    }

    async getBooks(): Promise<Book[]> {
        return await this.bookRepository.find()
    }

    async getBookById(id: number): Promise<Book | null> {
        return await this.bookRepository.findOneBy({ id })
    }

    async updateBook(id: number, updateData: Partial<Book>): Promise<Book | null> {
        await this.bookRepository.update(id, updateData)
        return await this.bookRepository.findOneBy({ id })
    }

    async deleteBook(id: number): Promise<boolean> {
        const result = await this.bookRepository.delete(id)
        return result.affected !== null && result.affected !== undefined && result.affected > 0
    }
}