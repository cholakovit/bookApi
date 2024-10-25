import { DataSource } from "typeorm";
import { Book } from "./books/Book";
import { Category } from "./category/Category";
import { Tag } from "./tags/Tag";
import { User } from "./users/User";




export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: true,
    logging: false,
    entities: [Book, Category, Tag, User],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
  .then(() => console.log("Connection to DB established"))
  .catch(err => console.error("Unable to connect to the database: ", err));