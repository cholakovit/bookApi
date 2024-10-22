import { container } from "tsyringe";
import { createBookRepository } from "./books/repository";
import { createCategoryRepository } from "./category/repository";
import { TagRepository } from "./tags/Repository";

container.register('BookRepository', { useValue: createBookRepository })
container.register('CategoryRepository', { useValue: createCategoryRepository })

container.register(TagRepository, { useClass: TagRepository })