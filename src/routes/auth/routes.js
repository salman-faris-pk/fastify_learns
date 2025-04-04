import { authSchema } from "./schemas.js"
import { loginUser } from "./service.js"

export default async function authRoutes(fastify) {

    fastify.post('/login', { schema: authSchema.login }, async (req, reply) => {
      const user = await loginUser(req.body.email, req.body.password);
      const token = fastify.jwt.sign({ id: user._id });
      reply.send({ token });
    });
 

    fastify.get('/me', { 
        preValidation: [fastify.authenticate]
      }, async (req) => {
        return { user: req.user };
      });


}