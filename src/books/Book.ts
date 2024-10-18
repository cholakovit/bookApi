import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../category/Category';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @ManyToMany(() => Category, (category) => category.books, { cascade: true })
  @JoinTable()
  categories!: Category[];
}
