import fp from 'fastify-plugin';
import { FastifyRequest, FastifyReply } from 'fastify';

async function keyclockPlugin(fastify: any) {
    fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
        const apiKey = request.headers['x-api-key'];

        if(apiKey !== process.env.KEYCLOCK_API) {
            reply.status(401).send({ error: 'Unauthorized' })
        }
    })
}

export default fp(keyclockPlugin);