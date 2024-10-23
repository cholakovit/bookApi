import { injectable } from "tsyringe";
import { CategoryRepository } from "./Repository";


@injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}

    async createCategory(name: string) {
        return await this.categoryRepository.createCategory(name)
    }

    async getCategories() {
        const categories = await this.categoryRepository.getCategories()
        if(!categories.length) {
            throw new Error('No categories found')
        }
        return categories
    }

    async getCategoryById(id: number) {
        const category =await this.categoryRepository.getCategoryById(id)
        if(!category) {
            throw new Error('Category not found')
        }
        return category
    }

    async updateCategory(id: number, name: string) {
        const category = await this.categoryRepository.getCategoryById(id)
        if(!category) {
            throw new Error('Category not found')
        }
        return await this.categoryRepository.updateCategory(id, { name })
    }

    async deleteCategory(id: number) {
        const category = await this.categoryRepository.getCategoryById(id)
        if(!category) {
            throw new Error('Category not found');
        }
        return await this.categoryRepository.deleteCategory(id)
    }
}