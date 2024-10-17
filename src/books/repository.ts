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

export const getBookByIdRepository = async (id: number) => {
  const bookRepository = getBookRepository()
  return await bookRepository.findOneBy({ id })
}

export const updateBookRepository = async (id: number, updateData: Partial<Book>) => {
  const bookRepository = getBookRepository()
  await bookRepository.update(id, updateData)
  return await bookRepository.findOneBy({ id })
}

export const deleteBookRepository = async (id: number) => {
  const bookRepository = getBookRepository()
  const result = await bookRepository.delete(id)
  return result.affected !== null && result.affected !== undefined && result.affected > 0
}

