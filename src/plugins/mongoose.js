import fastifyPlugin  from "fastify-plugin"
import mongoose from "mongoose"



async function mongooseConnector(fastify,options) {
   try {

      await mongoose.connect(options.uri);

      fastify.decorate('mongoose', mongoose);
      fastify.log.info('MongoDB connected');
    
   } catch (err) {
    fastify.log.error(err);
    throw new Error('DB connection failed');
   }
}

export default fastifyPlugin(mongooseConnector)
