import { Repository } from "typeorm";
import { AppDataSource } from "../ormconfig";
import { Tag } from "./Tag";
import { injectable } from "tsyringe";

@injectable()
export class TagRepository {
    private tagRepository: Repository<Tag>

    constructor() {
        this.tagRepository = AppDataSource.getRepository(Tag)
    }

    async createTag(name: string): Promise<Tag> {
        const tag = this.tagRepository.create({ name })
        return await this.tagRepository.save(tag)
    }

    async getTags(): Promise<Tag[]> {
        return await this.tagRepository.find()
    }

    async getTagById(id: number): Promise<Tag | null> {
        return await this.tagRepository.findOneBy({ id })
    }

    async updateTag(id: number, updateData: Partial<Tag>): Promise<Tag | null> {
        await this.tagRepository.update(id, updateData)
        return await this.tagRepository.findOneBy({ id })
    }

    async deleteTag(id: number): Promise<boolean> {
        const result = await this.tagRepository.delete(id)
        return result.affected !== null && result.affected !== undefined && result.affected > 0
    }
}



















// const getTagRepository = (): Repository<Tag> => {
//   return AppDataSource.getRepository(Tag)
// }

// export const createTagRepository = async (name: string) => {
//     const tagRepository = getTagRepository()
//     const tag = tagRepository.create({ name })
//     return await tagRepository.save(tag)
// }

// export const getTagsRepositry = async () => {
//     const tagRepository = getTagRepository()
//     return await tagRepository.find()
// }

// export const getTagByIdRepositry = async (id: number) => {
//     const tagRepository = getTagRepository()
//     return await tagRepository.findOneBy({ id })
// }

// export const updateTagRepository = async (id: number, updateData: Partial<Tag>) => {
//     const tagRepository = getTagRepository()
//     const result = await tagRepository.update(id, updateData)
//     return await tagRepository.findOneBy({ id })
// }

// export const deleteTagRepository = async (id: number) => {
//     const tagRepository = getTagRepository()
//     const result = await tagRepository.delete(id)
//     return result.affected !== null && result.affected !== undefined && result.affected > 0
// }