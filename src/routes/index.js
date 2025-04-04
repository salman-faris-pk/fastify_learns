import userRoutes from './users/routes.js';



export default async function (fastify) {
    await fastify.register(userRoutes, { prefix: '/users' });

  }
  
