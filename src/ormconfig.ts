import { DataSource } from "typeorm";
import { Book } from './books/Book'

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [Book],  // Include both entities here
    migrations: [],
    subscribers: [],
  });
  
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });