import { FastifyReply, FastifyRequest } from "fastify";
import { createBookRepository } from "./repository";

export const createBook = async(
    request: FastifyRequest<{ Body: CreateBookBody }>,
    reply: FastifyReply
) => {
    try {
        const { title, author, categories, tags } = request.body;
        const book = await createBookRepository(title, author);
        reply.send(book);
    } catch (error) {
        console.error(error);
        reply.code(500).send({ error: "Unable to create book" });
    }
}



















