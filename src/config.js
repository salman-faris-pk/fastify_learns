import dotenv from 'dotenv';

dotenv.config();


const config ={

    PORT: process.env.PORT || 6005,
    MONGODB_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fastifyLearns',

};

if (!config.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }
  

export default config;