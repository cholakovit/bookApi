import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs';
import path from 'path';
import pinoPretty from 'pino-pretty';
import { QueryFailedError } from 'typeorm';

export const getLogStreams = (isProduction: boolean) => {
  const logPath = path.join(__dirname, '../logs/server.log');
  const logStream = fs.createWriteStream(logPath, { flags: 'a' });

  const fileStream = { stream: logStream };

  const prettyStream = pinoPretty({
    colorize: true, 
  });

  return isProduction
    ? [fileStream] 
    : [
        { stream: prettyStream }, 
        fileStream, 
      ];
};

export const createErrorHandler = (isProduction: boolean) => {
  return (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    request.log.error(error);

    let statusCode  = error.statusCode ?? 500;
    let errorMessage = isProduction ? 'Internal server error' : error.message;

    if(error instanceof QueryFailedError) {
      const dbError = error as any

      if(dbError.code === '23502') {
        errorMessage = `The field ${dbError.column} cannot be null.`
        statusCode = 400
      }
    }

    reply.code(statusCode).send({ error: errorMessage, statusCode });
  }
}
