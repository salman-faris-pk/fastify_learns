import Fastify from "fastify";
import dotenv from "dotenv";
import connectDB from "./plugins/db.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const fastify= Fastify({
    logger: true
});

fastify.register(connectDB)

fastify.register(userRoutes)
  

const start= async() => {
    try {
    const PORT=process.env.PORT || 6005;
    await fastify.listen({port: PORT});
    console.log(`Server runs on ${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1)
    }
};

  start();