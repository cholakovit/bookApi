import { container } from "tsyringe";
import { BookRepository } from "./books/Repository";
import { CategoryRepository } from "./category/Repository";
import { TagRepository } from "./tags/Repository";
import { UserRepository } from "./users/Repository";

container.register(TagRepository, { useClass: TagRepository })
container.register(BookRepository, { useClass: BookRepository })
container.register(CategoryRepository, { useClass: CategoryRepository })
container.register(UserRepository, { useClass: UserRepository })