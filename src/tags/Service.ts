import { inject, injectable } from "tsyringe";
import { TagRepository } from "./Repository";



@injectable()
export class TagService {
    constructor(@inject(TagRepository) private tagRepository: TagRepository) {}

    async createTag(name: string) {
        return await this.tagRepository.createTag(name)
    }

    async getTags() {
        const tags = await this.tagRepository.getTags()
        if(!tags.length) {
            throw new Error('No tags found')
        }
        return tags
    }

    async getTagsById(id: number) {
        const tag = await this.tagRepository.getTagById(id)
        if(!tag) {
            throw new Error('Tag not found')
        }
        return tag
    }

    async updateTag(id: number, name: string) {
        const tag = await this.tagRepository.getTagById(id)
        if(!tag) {
            throw new Error('Tag not found')
        }
        return await this.tagRepository.updateTag(id, { name })
    }

    async deleteTag(id: number) {
        const tag = await this.tagRepository.getTagById(id)
        if(!tag) {
            throw new Error('Tag not found');
        }
        return await this.tagRepository.deleteTag(id)
    }
}


