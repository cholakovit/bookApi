import { In, Repository } from "typeorm";
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

    async getTagsByIds(ids: number[]) {
        return await this.tagRepository.findBy({ id: In(ids) })
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