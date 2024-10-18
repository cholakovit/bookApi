import { Repository } from "typeorm"
import { Category } from "./Category"
import { AppDataSource } from "../ormconfig"


const getCategoryRepository = (): Repository<Category> => {
  return AppDataSource.getRepository(Category)
}

export const createCategoryRepository = async(name: string) => {
  const categoryRepository = getCategoryRepository()
  const category = categoryRepository.create({ name })
  return await categoryRepository.save(category)
}

export const getCategoriesRepository = async() => {
  const categoryRepository = getCategoryRepository()
  return await categoryRepository.find()
}

export const getCategoryByIdRepository = async (id: number) => {
    const categoryRepository = getCategoryRepository();
    return await categoryRepository.findOneBy({ id });
};

export const updateCategoryRepository = async (id: number, updateData: Partial<Category>) => {
    const categoryRepository = getCategoryRepository();
    await categoryRepository.update(id, updateData);
    return await categoryRepository.findOneBy({ id });
};

export const deleteCategoryRepository = async (id: number) => {
    const categoryRepository = getCategoryRepository();
    const result = await categoryRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};


