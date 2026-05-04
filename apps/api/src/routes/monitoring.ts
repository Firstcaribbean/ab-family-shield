import type { FastifyInstance } from "fastify";
import type { SosPayload } from "@family-safety/shared";
import { createFamilySafetyService } from "../services/family-safety-service";

export async function registerMonitoringRoutes(app: FastifyInstance) {
  const service = createFamilySafetyService();

  app.get("/v1/dashboard", async () => service.getDashboard());

  app.get("/v1/alerts", async () => service.getAlerts());

  app.post("/v1/alerts/sos", async (request) => {
    const payload = (request.body ?? {}) as SosPayload;
    return service.triggerSos(payload);
  });

  app.get("/v1/reports/weekly", async () => service.getReports());

  app.get("/v1/settings", async () => service.getSettings());

  app.get("/v1/rules/screen-time", async () => service.getScreenTimeRules());

  app.get("/v1/rules/browsing", async () => service.getBrowsingRules());

  app.get("/v1/browsing/logs", async () => service.getBrowsingLogs());

  app.get("/v1/sos-events", async () => service.getSosEvents());
}
