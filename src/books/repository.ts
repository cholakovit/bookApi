import { In, Repository } from "typeorm";
import { Book } from "./Book";
import { AppDataSource } from "../ormconfig";
import { Category } from "../category/Category";

const getBookRepository = (): Repository<Book> => {
  return AppDataSource.getRepository(Book)
}

// export const createBookRepository = async(title: string, author: string, categoryIds: number[]) => {
//   const bookRepository = getBookRepository()
//   const categoryRepository = AppDataSource.getRepository(Category)

//   const categories = await categoryRepository.findByIds(categoryIds)
//   if(!categories.length) {
//     throw new Error('No categories found')
//   }

//   const book = bookRepository.create({ title, author, categories })
//   return await bookRepository.save(book)
// }

export const createBookRepository = async (title: string, author: string, categoryIds: number[]) => {
  const bookRepository = getBookRepository()
  const categoryRepository = AppDataSource.getRepository(Category)

  const categories = await categoryRepository.findBy({ id: In(categoryIds) })

  if(categories.length !== categories.length) {
    throw new Error(`Some categories were not found ${categoryIds}`)
  }

  const book = bookRepository.create({ title, author, categoryIds })

  return bookRepository.save(book)
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

