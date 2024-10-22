import { container } from "tsyringe";
import { createBookRepository } from "./books/repository";
import { createCategoryRepository } from "./category/repository";
import { createTagRepository } from "./tags/repository";


container.register('BookRepository', { useValue: createBookRepository })
container.register('CategoryRepository', { useValue: createCategoryRepository })
container.register('TagRepository', { useValue: createTagRepository })