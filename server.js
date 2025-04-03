import Fastify from "fastify";

const fastify= Fastify({
    logger: true
});



fastify.get('/',()=>{
    return ({message:'welcome to code world',success:true})
});


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