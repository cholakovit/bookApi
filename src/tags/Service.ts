import { injectable } from "tsyringe";
import { createTagRepository, deleteTagRepository, getTagByIdRepositry, getTagsRepositry, updateTagRepository } from "./repository";


@injectable()
export class TagService {
    async createTag(name: string) {
        return await createTagRepository(name)
    }

    async getTags() {
        const tags = await getTagsRepositry()
        if(!tags.length) {
            throw new Error('No tags found')
        }
        return tags
    }

    async getTagsById(id: number) {
        const tag = await getTagByIdRepositry(id)
        if(!tag) {
            throw new Error('Tag not found')
        }
        return tag
    }

    async updateTag(id: number, name: string) {
        const tag = await getTagByIdRepositry(id)
        if(!tag) {
            throw new Error('Tag not found')
        }
        return await updateTagRepository(id, { name })
    }

    async deleteTag(id: number) {
        const tag = await getTagByIdRepositry(id)
        if(!tag) {
            throw await deleteTagRepository(id)
        }
        return await deleteTagRepository(id)
    }
}


