import type { FastifyInstance } from "fastify";
import type {
  LoginPayload,
  OAuthProvider,
  OAuthStartPayload,
  RegisterPayload
} from "@family-safety/shared";
import { createFamilySafetyService } from "../services/family-safety-service";

export async function registerAuthRoutes(app: FastifyInstance) {
  const service = createFamilySafetyService();

  app.post("/v1/auth/register", async (request) => {
    const payload = (request.body ?? {}) as RegisterPayload;
    return service.registerParent(payload);
  });

  app.post("/v1/auth/login", async (request, reply) => {
    const payload = (request.body ?? {}) as LoginPayload;

    try {
      return await service.loginParent(payload);
    } catch (error) {
      return reply.code(401).send({
        message: error instanceof Error ? error.message : "Invalid email or password."
      });
    }
  });

  app.post("/v1/auth/oauth", async (request) => {
    const payload = (request.body ?? {}) as Partial<OAuthStartPayload>;
    const provider = (payload.provider ?? "google") as OAuthProvider;
    return service.startOAuth(provider);
  });

  app.post("/v1/auth/forgot-password", async () => {
    return {
      status: "queued",
      message: "Password recovery instructions have been queued."
    };
  });
}
