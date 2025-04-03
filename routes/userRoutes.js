import { createUser, getUsers } from "../controllers/userController.js"



export default async function(fastify, opts){
 fastify.get('/users',getUsers)
 fastify.post('/users',createUser)
}