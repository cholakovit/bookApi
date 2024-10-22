import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from '../tags/Tag';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column('int', { array: true })
  categoryIds!: number[];

  @ManyToMany(() => Tag, (tag) => tag.books)
  @JoinTable()
  tags!: Tag[]
}
