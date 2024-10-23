import { container } from "tsyringe";
import { BookRepository } from "./books/Repository";
import { CategoryRepository } from "./category/Repository";
import { TagRepository } from "./tags/Repository";

//container.register('BookRepository', { useValue: createBookRepository })
//container.register('CategoryRepository', { useValue: createCategoryRepository })

container.register(TagRepository, { useClass: TagRepository })
container.register(BookRepository, { useClass: BookRepository })
container.register(CategoryRepository, { useClass: CategoryRepository })