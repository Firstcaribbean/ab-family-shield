import cors from "@fastify/cors";
import Fastify from "fastify";
import { registerRoutes } from "./routes";

export function createApp() {
  const app = Fastify({
    logger: true
  });

  app.register(cors, {
    origin: true
  });

  app.register(registerRoutes);

  return app;
}
