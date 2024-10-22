import { container } from "tsyringe";
import { TagService } from "./Service";
import { validateFields } from "../utils/decorators";
import { FastifyReply, FastifyRequest } from "fastify";


const tagService = container.resolve(TagService)

export class TagController {

    @validateFields([{ field: 'name', minLength: 3 }])
    public async createTag(request: FastifyRequest<{ Body: CreateTagRequest }>, reply: FastifyReply) {
        const { name } = request.body;
        const tag = await tagService.createTag(name);
        reply.send(tag);
    }

    public async getTags(request: FastifyRequest, reply: FastifyReply) {
        const tags = await tagService.getTags();
        reply.send(tags);
    }

    public async getTagById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const tag = await tagService.getTagsById(Number(request.params.id))
        if(tag) {
            reply.send(tag)
        }else {
            reply.status(404).send({ error: 'Tag not found' })
        }
    }

    @validateFields([{ field: 'name', minLength: 3 }])
    public async updateTag(request: FastifyRequest<{ Params: { id: string }; Body: CreateTagRequest }>, reply: FastifyReply) {
        const { name } = request.body
        const updateTag = await tagService.updateTag(Number(request.params.id), name)
        if(updateTag) {
            reply.send(updateTag)
        } else {
            reply.status(404).send({ error: 'Tag not found' })
        }
    }

    @validateFields([{ field: 'name', minLength: 3 }])
    public async deleteTag(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const deleted = await tagService.deleteTag(Number(request.params.id))
        if(deleted) {
            reply.send({ message: 'Tag deleted' })
        } else {
            reply.status(404).send({ error: 'Tag not found' })
        }
    }
}



