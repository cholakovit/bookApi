import { DataSource } from "typeorm";
import { Book } from "./books/Book";




export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: true,
    logging: false,
    entities: [Book],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
  .then(() => console.log("Connection to DB established"))
  .catch(err => console.error("Unable to connect to the database: ", err));











