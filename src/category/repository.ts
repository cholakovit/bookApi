import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { Category } from "./Category";
import { AppDataSource } from "../ormconfig";


@injectable()
export class CategoryRepository {
  private categoryRepository: Repository<Category>

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category)
  }

  async createCategory(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name })
    return await this.categoryRepository.save(category)
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOneBy({ id })
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }

  async updateCategory(id: number, updateData: Partial<Category>): Promise<Category | null> {
    await this.categoryRepository.update(id, updateData)
    return await this.categoryRepository.findOneBy({ id })
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id)
    return result.affected !== null && result.affected !== undefined && result.affected > 0
  }
}