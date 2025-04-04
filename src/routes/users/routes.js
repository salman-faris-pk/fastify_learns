import { createUser, getUser } from './service.js';
import { userSchema } from './schemas.js';

export default async function userRoutes(fastify) {
  
  fastify.post(
    '/user',
    { schema: { body: userSchema.create } },
    async (request, reply) => {
      const user = await createUser(request.body);
      reply.code(201).send(user);
    }
  );

  fastify.get(
    '/user/:id',
    { schema: { params: userSchema.idParam } },
    async (request, reply) => {
      const user = await getUser(request.params.id);
      reply.send(user);
    }
  );
}