import { loadAppState, saveAppState } from "../data/store";
import type {
  AddChildPayload,
  Alert,
  AppState,
  AuthResult,
  CheckInPayload,
  ChildProfile,
  CreateLinkInviteResult,
  DashboardSnapshot,
  DeviceLinkInvite,
  LocationPoint,
  LoginPayload,
  OAuthProvider,
  OAuthStartResult,
  RedeemLinkInvitePayload,
  RedeemLinkInviteResult,
  RegisterPayload,
  SosPayload
} from "@family-safety/shared";

export interface DashboardRepository {
  getDashboardSnapshot(): Promise<DashboardSnapshot>;
  registerParent(payload: RegisterPayload): Promise<AuthResult>;
  loginParent(payload: LoginPayload): Promise<AuthResult>;
  startOAuth(provider: OAuthProvider): Promise<OAuthStartResult>;
  listChildren(): Promise<ChildProfile[]>;
  getChild(id: string): Promise<ChildProfile | null>;
  createChild(payload: AddChildPayload): Promise<ChildProfile>;
  getLatestLocation(childId: string): Promise<DashboardSnapshot["latestLocations"][string] | null>;
  getLocationHistory(childId: string): Promise<DashboardSnapshot["locationHistory"][string]>;
  createLinkInvite(childId: string, baseUrl?: string): Promise<CreateLinkInviteResult | null>;
  getLinkInvite(childId: string): Promise<DeviceLinkInvite | null>;
  getLinkInviteByCode(code: string): Promise<DeviceLinkInvite | null>;
  redeemLinkInvite(code: string, payload: RedeemLinkInvitePayload): Promise<RedeemLinkInviteResult | null>;
  triggerSos(payload: SosPayload): Promise<{ status: string; message: string; childId: string }>;
  checkInChild(payload: CheckInPayload): Promise<Alert | null>;
  getAlerts(): Promise<DashboardSnapshot["alerts"]>;
  getReports(): Promise<DashboardSnapshot["weeklyReports"]>;
  getSettings(): Promise<DashboardSnapshot["settings"]>;
  getScreenTimeRules(): Promise<DashboardSnapshot["screenTimeRules"]>;
  getBrowsingRules(): Promise<DashboardSnapshot["browsingRules"]>;
  getBrowsingLogs(): Promise<DashboardSnapshot["browsingLogs"]>;
  getSosEvents(): Promise<AppState["sosEvents"]>;
}

function nowIso() {
  return new Date().toISOString();
}

function generateCode(prefix: string) {
  return `${prefix.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function buildAlert(childId: string, type: Alert["type"], message: string, severity: Alert["severity"]): Alert {
  return {
    id: `alert_${Date.now()}`,
    childId,
    type,
    message,
    severity,
    acknowledged: false,
    createdAt: nowIso()
  };
}

function buildLocationPoint(child: ChildProfile): LocationPoint {
  const homeZone = child.safeZones[0];

  return {
    id: `loc_${Date.now()}`,
    childId: child.id,
    latitude: homeZone?.latitude ?? 34.0522,
    longitude: homeZone?.longitude ?? -118.2437,
    speedMph: 0,
    accuracyMeters: 10,
    recordedAt: nowIso(),
    placeLabel: homeZone?.name ?? "Recent Check-In"
  };
}

function buildLinkedLocationPoint(child: ChildProfile, network: ChildProfile["status"]["network"]): LocationPoint {
  const firstZone = child.safeZones[0];

  return {
    id: `loc_${Date.now()}`,
    childId: child.id,
    latitude: firstZone?.latitude ?? 34.0522,
    longitude: firstZone?.longitude ?? -118.2437,
    speedMph: 0,
    accuracyMeters: 12,
    recordedAt: nowIso(),
    placeLabel: network === "wifi" ? "Linked from home network" : "Linked device online"
  };
}

export class FileDashboardRepository implements DashboardRepository {
  async getDashboardSnapshot() {
    return (await loadAppState()).dashboardSnapshot;
  }

  async registerParent(payload: RegisterPayload) {
    const state = await loadAppState();

    state.dashboardSnapshot.parent = {
      ...state.dashboardSnapshot.parent,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || state.dashboardSnapshot.parent.phone
    };
    state.auth.parentPassword = payload.password;

    await saveAppState(state);

    return {
      token: "demo-jwt-token",
      user: state.dashboardSnapshot.parent
    };
  }

  async loginParent(payload: LoginPayload) {
    const state = await loadAppState();

    if (
      payload.email.trim().toLowerCase() !== state.dashboardSnapshot.parent.email.trim().toLowerCase() ||
      payload.password !== state.auth.parentPassword
    ) {
      throw new Error("Invalid email or password.");
    }

    return {
      token: "demo-jwt-token",
      user: state.dashboardSnapshot.parent
    };
  }

  async startOAuth(provider: OAuthProvider) {
    const state = await loadAppState();
    const configured = false;
    const providerLabel = provider === "google" ? "Google" : "Apple";

    return {
      token: "",
      user: state.dashboardSnapshot.parent,
      provider,
      configured,
      authUrl: null,
      message: `${providerLabel} sign-in is wired to the backend, but real OAuth credentials are not configured yet.`
    };
  }

  async listChildren() {
    return (await loadAppState()).dashboardSnapshot.children;
  }

  async getChild(id: string) {
    return (await loadAppState()).dashboardSnapshot.children.find((child) => child.id === id) ?? null;
  }

  async createChild(payload: AddChildPayload) {
    const state = await loadAppState();

    const child: ChildProfile = {
      id: `child_${Date.now()}`,
      parentId: state.dashboardSnapshot.parent.id,
      name: payload.name,
      age: payload.age,
      grade: payload.grade,
      avatarLabel: payload.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      deviceId: payload.deviceId?.trim() || `pending-${Date.now()}`,
      status: {
        batteryLevel: 100,
        isOnline: false,
        network: "offline",
        osName: "Unknown",
        osVersion: "0",
        appVersion: "1.0.0",
        lowPowerMode: false
      },
      lastSeenAt: nowIso(),
      safeZones: []
    };

    state.dashboardSnapshot.children.unshift(child);
    state.dashboardSnapshot.locationHistory[child.id] = [];
    state.dashboardSnapshot.weeklyReports.unshift({
      childId: child.id,
      safetyScore: 100,
      totalScreenTimeMinutes: 0,
      blockedSitesCount: 0,
      alertsCount: 0,
      topRiskCategory: "education",
      summary: `${child.name} was added and is ready for monitoring.`
    });

    await saveAppState(state);
    return child;
  }

  async getLatestLocation(childId: string) {
    return (await loadAppState()).dashboardSnapshot.latestLocations[childId] ?? null;
  }

  async getLocationHistory(childId: string) {
    return (await loadAppState()).dashboardSnapshot.locationHistory[childId] ?? [];
  }

  async createLinkInvite(childId: string, baseUrl?: string) {
    const state = await loadAppState();
    const child = state.dashboardSnapshot.children.find((item) => item.id === childId);

    if (!child) {
      return null;
    }

    const invite: DeviceLinkInvite = {
      childId,
      code: generateCode(child.name),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
    };

    state.deviceLinkInvites = state.deviceLinkInvites.filter((item) => item.childId !== childId);
    state.deviceLinkInvites.push(invite);
    await saveAppState(state);

    return {
      invite,
      linkUrl: `${(baseUrl ?? "http://localhost:3000").replace(/\/$/, "")}/link/${invite.code}`
    };
  }

  async getLinkInvite(childId: string) {
    return (await loadAppState()).deviceLinkInvites.find((invite) => invite.childId === childId) ?? null;
  }

  async getLinkInviteByCode(code: string) {
    return (
      (await loadAppState()).deviceLinkInvites.find(
        (invite) => invite.code.toLowerCase() === code.toLowerCase()
      ) ?? null
    );
  }

  async redeemLinkInvite(code: string, payload: RedeemLinkInvitePayload) {
    const state = await loadAppState();
    const invite = state.deviceLinkInvites.find(
      (item) => item.code.toLowerCase() === code.toLowerCase()
    );

    if (!invite || invite.redeemedAt || new Date(invite.expiresAt).getTime() < Date.now()) {
      return null;
    }

    const child = state.dashboardSnapshot.children.find((item) => item.id === invite.childId);

    if (!child) {
      return null;
    }

    child.name = payload.childName.trim() || child.name;
    child.avatarLabel = child.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    child.deviceId = payload.deviceId.trim();
    child.status = {
      ...child.status,
      batteryLevel: Math.min(100, Math.max(0, payload.batteryLevel)),
      isOnline: true,
      network: payload.network ?? "wifi",
      osName: payload.osName.trim() || "Unknown",
      osVersion: payload.osVersion.trim() || "0",
      appVersion: payload.appVersion.trim() || "1.0.0"
    };
    child.lastSeenAt = nowIso();

    const point = buildLinkedLocationPoint(child, child.status.network);
    state.dashboardSnapshot.latestLocations[child.id] = point;
    state.dashboardSnapshot.locationHistory[child.id] = [
      point,
      ...(state.dashboardSnapshot.locationHistory[child.id] ?? [])
    ].slice(0, 10);

    const alert = buildAlert(
      child.id,
      "device_status",
      `${child.name}'s device was linked successfully.`,
      "low"
    );
    state.dashboardSnapshot.alerts.unshift(alert);

    invite.redeemedAt = nowIso();
    await saveAppState(state);

    return {
      message: `${child.name}'s device is now linked.`,
      child
    };
  }

  async triggerSos(payload: SosPayload) {
    const state = await loadAppState();
    const child = state.dashboardSnapshot.children.find((item) => item.id === payload.childId);
    const childName = child?.name ?? "Child";

    const alert = buildAlert(
      payload.childId,
      "sos",
      payload.message ?? `${childName} triggered an SOS alert.`,
      "high"
    );

    state.dashboardSnapshot.alerts.unshift(alert);
    state.sosEvents.unshift({
      id: `sos_${Date.now()}`,
      childId: payload.childId,
      message: alert.message,
      createdAt: alert.createdAt,
      status: "queued"
    });

    await saveAppState(state);

    return {
      status: "queued",
      message: alert.message,
      childId: payload.childId
    };
  }

  async checkInChild(payload: CheckInPayload) {
    const state = await loadAppState();
    const child = state.dashboardSnapshot.children.find((item) => item.id === payload.childId);

    if (!child) {
      return null;
    }

    child.lastSeenAt = nowIso();
    child.status.isOnline = true;
    child.status.network = "wifi";

    const point = buildLocationPoint(child);
    state.dashboardSnapshot.latestLocations[child.id] = point;
    state.dashboardSnapshot.locationHistory[child.id] = [
      point,
      ...(state.dashboardSnapshot.locationHistory[child.id] ?? [])
    ].slice(0, 10);

    const alert = buildAlert(child.id, "arrival", `${child.name} checked in safely.`, "low");
    state.dashboardSnapshot.alerts.unshift(alert);

    await saveAppState(state);
    return alert;
  }

  async getAlerts() {
    return (await loadAppState()).dashboardSnapshot.alerts;
  }

  async getReports() {
    return (await loadAppState()).dashboardSnapshot.weeklyReports;
  }

  async getSettings() {
    return (await loadAppState()).dashboardSnapshot.settings;
  }

  async getScreenTimeRules() {
    return (await loadAppState()).dashboardSnapshot.screenTimeRules;
  }

  async getBrowsingRules() {
    return (await loadAppState()).dashboardSnapshot.browsingRules;
  }

  async getBrowsingLogs() {
    return (await loadAppState()).dashboardSnapshot.browsingLogs;
  }

  async getSosEvents() {
    return (await loadAppState()).sosEvents;
  }
}
