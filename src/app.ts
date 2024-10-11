import "reflect-metadata"; 

import dotenv from 'dotenv';
dotenv.config();
    
import Fastify from 'fastify'
import './di-container'
import { bookRoutes } from "./router";

const app = Fastify({ logger: true })

bookRoutes(app)


export default app;

