import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { UserService } from "./Service";

const userService = container.resolve(UserService)

export class UserController {
    public async createUser(request: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply) {
        const { name, email, password, role } = request.body
        const user = await userService.createUser(name, email, password, role)
        reply.send(user)
    }   

    public async getUsers(request: FastifyRequest, reply: FastifyReply) {
        const users = await userService.getUsers()
        reply.send(users)
    }

    public async getUserById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const user = await userService.getUserById(Number(request.params.id))
        if(user) {
            reply.send(user)
        } else {
            reply.status(404).send({ error: 'User not found' })
        }
    }

    public async updateUser(request: FastifyRequest<{ Params: { id: string }; Body: CreateUserRequest }>, reply: FastifyReply) {
        const { name, email, password, role } = request.body
        const roleAsNumber = Number(role);
        const updateUser = await userService.updateUser(Number(request.params.id), { name, email, password, role: roleAsNumber })
        if(updateUser) {
            reply.send(updateUser)
        } else {
            reply.status(404).send({ error: 'User not found' })
        }
    }

    public async deleteUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const deleted = await userService.deleteUser(Number(request.params.id))
        if(deleted) {
            reply.send({ message: 'User deleted' })
        } else {
            reply.status(404).send({ error: 'User not found' })
        }
    }
}
