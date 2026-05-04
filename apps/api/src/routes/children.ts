import type { FastifyInstance } from "fastify";
import type { AddChildPayload, RedeemLinkInvitePayload } from "@family-safety/shared";
import { createFamilySafetyService } from "../services/family-safety-service";

export async function registerChildrenRoutes(app: FastifyInstance) {
  const service = createFamilySafetyService();

  app.get("/v1/children", async () => service.listChildren());

  app.get("/v1/children/:id", async (request) => {
    const { id } = request.params as { id: string };
    return service.getChild(id);
  });

  app.post("/v1/children", async (request) => {
    const payload = (request.body ?? {}) as AddChildPayload;
    const child = await service.createChild(payload);
    return {
      message: "Child profile created.",
      child
    };
  });

  app.get("/v1/children/:id/location", async (request) => {
    const { id } = request.params as { id: string };
    return service.getLatestLocation(id);
  });

  app.get("/v1/children/:id/location-history", async (request) => {
    const { id } = request.params as { id: string };
    return service.getLocationHistory(id);
  });

  app.get("/v1/children/:id/link-invite", async (request) => {
    const { id } = request.params as { id: string };
    return service.getLinkInvite(id);
  });

  app.post("/v1/children/:id/link-invite", async (request) => {
    const { id } = request.params as { id: string };
    const invite = await service.createLinkInvite(id, request.headers.origin);

    return {
      message: invite ? "Invite link created." : "Child not found.",
      invite
    };
  });

  app.get("/v1/link-invites/:code", async (request) => {
    const { code } = request.params as { code: string };
    const invite = await service.getLinkInviteByCode(code);

    if (!invite) {
      return {
        valid: false,
        message: "Invite link not found."
      };
    }

    const child = await service.getChild(invite.childId);
    const expired = new Date(invite.expiresAt).getTime() < Date.now();

    return {
      valid: !expired && !invite.redeemedAt && !!child,
      expired,
      redeemed: Boolean(invite.redeemedAt),
      invite,
      child: child
        ? {
            id: child.id,
            name: child.name,
            avatarLabel: child.avatarLabel
          }
        : null,
      message: expired
        ? "Invite link has expired."
        : invite.redeemedAt
          ? "Invite link has already been used."
          : "Invite link is ready."
    };
  });

  app.post("/v1/link-invites/:code/redeem", async (request) => {
    const { code } = request.params as { code: string };
    const payload = (request.body ?? {}) as RedeemLinkInvitePayload;
    const result = await service.redeemLinkInvite(code, payload);

    return {
      message: result?.message ?? "Invite link is invalid or expired.",
      child: result?.child ?? null
    };
  });

  app.post("/v1/children/:id/check-in", async (request) => {
    const { id } = request.params as { id: string };
    const alert = await service.checkInChild({ childId: id });

    return {
      message: alert ? "Child checked in." : "Child not found.",
      alert
    };
  });
}
