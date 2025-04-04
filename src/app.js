import fastify from "fastify"
import config from './config.js'
import routes from "./routes/index.js"
import errorHandler from "./utils/error-handler.js";

export default async function buildApp() {
  
    const app= fastify({
        logger: true
    });

    errorHandler(app);

    await app.register(import('./plugins/mongoose.js'), {
        uri: config.MONGODB_URI,
    });
 

    await app.register(routes, { prefix: '/api/v1' });


     return app;
}