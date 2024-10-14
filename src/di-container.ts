import { container } from "tsyringe";
import { createBookRepository } from "./books/repository";


container.register('BookRepository', { useValue: createBookRepository })