import buildApp from "./app.js";
import config from "./config.js";


const start = async()=>{

    const app=await buildApp();

   try {
    
    await app.listen({ port: config.PORT});
    console.log(`Server running on ${app.server.address().port}`);
    
   } catch (err) {
    app.log.error(err);
    process.exit(1);
   }
}


start();