import "reflect-metadata"; 

import dotenv from 'dotenv';
dotenv.config();
    
import Fastify from 'fastify'
import './di-container'
import { Routes } from "./router";
import { createErrorHandler, getLogStreams } from "./utils/settings";
import { multistream } from "pino-multi-stream";
import keyclockPlugin from './utils/keyclock'

const isProduction = process.env.NODE_ENV === 'production';
const logStreams = getLogStreams(isProduction); 

const app = Fastify({
    logger: {
        level: 'trace', // Log EVERYTHING (trace, debug, info, warn, error, fatal)
        stream: multistream(logStreams), // Use pino-multi-stream for multiple outputs
      },
})

app.register(keyclockPlugin, { prefix: '/users' })

Routes(app);

app.setErrorHandler(createErrorHandler(isProduction));

export default app;
    