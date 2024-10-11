import { FastifyReply, FastifyRequest } from "fastify";
import { createBookRepository } from "./repository";

export const createBook = async(
    request: FastifyRequest<{ Body: CreateBookBody }>,
    replay: FastifyReply) => {
        try {
            const { title, author } = request.body as CreateBookBody
            const book = await createBookRepository(title, author)
            replay.send(book)
        } catch(error) {
            replay.code(500).send({ error: "Unable to create book" })
        }
}



















