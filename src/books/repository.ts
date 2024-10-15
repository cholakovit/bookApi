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

export const getBooksRepository = async() => {
  const bookRepository = getBookRepository()
  return await bookRepository.find()
}

