import { container } from "tsyringe";
import { createBookRepository } from "./books/repository";
import { createCategoryRepository } from "./category/repository";


container.register('BookRepository', { useValue: createBookRepository })
container.register('CategoryRepository', { useValue: createCategoryRepository })