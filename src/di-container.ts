import { container } from "tsyringe";
import { createBookRepository } from "./books/repository";


container.register('BookRepository', { useValue: createBookRepository })



// import { container } from "tsyringe";

// import { BookService } from "./books/repository";

// container.register('BookService', { useClass: BookService })