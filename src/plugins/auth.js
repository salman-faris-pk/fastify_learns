import fastfyPlugin from "fastify-plugin";
import fastifyJwt from "fastify-jwt";
import fastifyAuth from "@fastify/auth";


export default fastfyPlugin(async(fastify,opts) => {

    await fastify.register(fastifyJwt, {
        secret: fastify.config.JWT_SECRET,
        sign: { expiresIn : '1d'}
    });

    await fastify.register(fastifyAuth);

    fastify.decorate('authenticate', async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          reply.code(401).send({ error: 'Unauthorized' });
        }
      });
})