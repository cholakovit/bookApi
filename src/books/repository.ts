import { Repository } from "typeorm";
import { Book } from "./Book";
import { AppDataSource } from "../ormconfig";

const getBookRepository = (): Repository<Book> => {
  return AppDataSource.getRepository(Book)
}

export const createBookRepository = async(title: string, author: string) => {
  const bookRepository = getBookRepository()
  const book = bookRepository.create({ title, author })
  return await bookRepository.save(book)
}
















// import { injectable } from 'tsyringe';
// import { Repository } from 'typeorm';
// import { Book } from '../entities/Book';
// import { AppDataSource } from '../ormconfig';

// @injectable()
// export class BookService {
//   private bookRepository: Repository<Book>;

//   constructor() {
//     this.bookRepository = AppDataSource.getRepository(Book);
//   }

//   async createBook(title: string, author: string, categories: any[], tags: any[]) {
//     // Ensure that the keys match exactly with the entity's properties
//     const book = this.bookRepository.create({ title, author });
//     return await this.bookRepository.save(book);
//   }
// }



