import mongoose from "mongoose";
import User from "../models/user.model.js"


const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fastifyLearns";


async function  connectDB(fastify){
    try {

        await mongoose.connect(MONGO_URI);
        
        fastify.log.info("MongoDB connected successfully")
        
        fastify.decorate("mongoose", mongoose);
        fastify.decorate("models", { User }); 
        console.log("✅ MongoDB connected");

    } catch (error) {
        fastify.log.error("MongoDB connection failed:", error);
        process.exit(1)
    }
}


export default connectDB;
