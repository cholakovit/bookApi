import { injectable } from "tsyringe";
import { createCategoryRepository, deleteCategoryRepository, getCategoriesRepository, getCategoryByIdRepository, updateCategoryRepository } from "./repository";
import { Category } from "./Category";


@injectable()
export class CategoryService {
    async createCategory(name: string): Promise<Category> {
        if(!name) {
            throw new Error('Name is required')
        }
        return await createCategoryRepository(name)
    }

    async getCategories() {
        const categories = await getCategoriesRepository()
        if(!categories.length) {
            throw new Error('No categories found')
        }
        return categories
    }

    async getCategoryById(id: number) {
        const category = await getCategoryByIdRepository(id)
        if(!category) {
            throw new Error('Category not found')
        }
        return category
    }

    async updateCategory(id: number, name: string) {
        const category = await getCategoryByIdRepository(id)
        if(!category) {
            throw new Error('Category not found')
        }
        return await updateCategoryRepository(id, { name })
    }

    async deleteCategory(id: number) {
        const category = await getCategoryByIdRepository(id)
        if(!category) {
            throw new Error('Category not found')
        }
        return await deleteCategoryRepository(id)
    }
}


