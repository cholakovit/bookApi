import "reflect-metadata"; 

import dotenv from 'dotenv';
dotenv.config();
    
import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import './di-container'
import { bookRoutes } from "./router";
import { getLogStreams } from "./utils/settings";
import { multistream } from "pino-multi-stream";

const isProduction = process.env.NODE_ENV === 'production';

const logStreams = getLogStreams(isProduction); // Get log streams

const app = Fastify({
    logger: {
        level: 'trace', // Log EVERYTHING (trace, debug, info, warn, error, fatal)
        stream: multistream(logStreams), // Use pino-multi-stream for multiple outputs
      },
})

bookRoutes(app);

app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  request.log.error(error);
  
  const statusCode = error.statusCode ?? 500
  const errorMessage = isProduction ? 'Internal server error' : error.message

  reply.code(statusCode).send({ error: errorMessage })
})

export default app;
    