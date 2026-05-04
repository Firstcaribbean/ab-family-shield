import type { FastifyInstance } from "fastify";
import { registerAuthRoutes } from "./auth";
import { registerChildrenRoutes } from "./children";
import { registerMonitoringRoutes } from "./monitoring";

export async function registerRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({
    status: "ok",
    timestamp: new Date().toISOString()
  }));

  await registerAuthRoutes(app);
  await registerChildrenRoutes(app);
  await registerMonitoringRoutes(app);
}
