import Fastify from "fastify";
import cors from "@fastify/cors";
import { pollRoutes } from "./routes/poll";
import { userRoutes } from "./routes/user";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";
import { guessRoutes } from "./routes/guess";
import jwt from "@fastify/jwt";


async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  fastify.register(cors,{
    origin: true
  })


  // Em producao isso precisa ser uma variavel ambiente
  await fastify.register(jwt,{
    secret: 'nlwcopa'
  });

  await fastify.register(pollRoutes);
  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}
bootstrap()