

export const getUsers = async (req, reply) => {
    try {
      const users = await req.fastify.models.User.find();
      return reply.send(users);
    } catch (error) {
      reply.code(500).send({ error: "Internal Server Error" });
    }
  };

  export const createUser = async (req, reply) => {
    try {       
      console.log("🔥 Request body:", req.body);
      console.log("🔥 Available models:", req.fastify.models);

      const { name, email, password } = req.body;
      const newUser = new req.fastify.models.User({ name, email, password });
      await newUser.save();
      return reply.code(201).send({ message: "User created", user: newUser });
    } catch (error) {
      console.log(error);
      
      reply.code(500).send({ error: "Internal Server Error" });
    }
  };