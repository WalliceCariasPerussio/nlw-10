import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function userRoutes(fastify: FastifyInstance){

  fastify.get('/me',{
    onRequest: [authenticate]
  }, async (request) => {
    return { user: request.user }
  });


  fastify.get('/users/count', async () => {

    const count = await prisma.user.count();

    return { count };
  });

}