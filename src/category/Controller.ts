import { container, injectable } from "tsyringe";
import { CategoryService } from "./Service";
import { FastifyReply, FastifyRequest } from "fastify";

const categoryService = container.resolve(CategoryService)

@injectable()
export class CategoryController {

    async createCategory(request: FastifyRequest<{ Body: CategoryRequest }>, reply: FastifyReply): Promise<void> {
        const { name } = request.body
        const category = await categoryService.createCategory(name)
        return reply.code(201).send(category);
    }

    async getCategoryById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
        const { id } = request.params
        const category = await categoryService.getCategoryById(Number(id))
        if(!category) {
            return reply.status(404).send({ error: 'Category not found' })
        }
        return reply.send(category)
    }

    async getCategories(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const categories = await categoryService.getCategories()
        return reply.send(categories)
    }

    async updateCategory(request: FastifyRequest<{ Params: { id: string }; Body: CategoryRequest }>, reply: FastifyReply): Promise<void> {
        const { id } = request.params;
        const { name } = request.body;
      
        const category = await categoryService.updateCategory(Number(id), name);
      
        if (!category) {
          return reply.status(404).send({ error: 'Category not found' });
        }
      
        return reply.send(category);
      }

    async deleteCategory(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
        const deleted = await categoryService.deleteCategory(Number(request.params.id))
        if(deleted) {
          reply.send({ message: 'Book deleted' })
        } else {
          reply.status(404).send({ error: 'Book not found' })
        }
    }
}




