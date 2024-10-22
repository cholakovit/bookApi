import { Repository } from "typeorm";
import { AppDataSource } from "../ormconfig";
import { Tag } from "./Tag";


const getTagRepository = (): Repository<Tag> => {
  return AppDataSource.getRepository(Tag)
}

export const createTagRepository = async (name: string) => {
    const tagRepository = getTagRepository()
    const tag = tagRepository.create({ name })
    return await tagRepository.save(tag)
}

export const getTagsRepositry = async () => {
    const tagRepository = getTagRepository()
    return await tagRepository.find()
}

export const getTagByIdRepositry = async (id: number) => {
    const tagRepository = getTagRepository()
    return await tagRepository.findOneBy({ id })
}

export const updateTagRepository = async (id: number, updateData: Partial<Tag>) => {
    const tagRepository = getTagRepository()
    const result = await tagRepository.update(id, updateData)
    return await tagRepository.findOneBy({ id })
}

export const deleteTagRepository = async (id: number) => {
    const tagRepository = getTagRepository()
    const result = await tagRepository.delete(id)
    return result.affected !== null && result.affected !== undefined && result.affected > 0
}