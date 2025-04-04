import authRoutes from './auth/routes.js';
import userRoutes from './users/routes.js';



export default async function (fastify) {
    await fastify.register(userRoutes, { prefix: '/users' });
    await fastify.register(authRoutes, {prefix: '/auth'});

  } 
  
