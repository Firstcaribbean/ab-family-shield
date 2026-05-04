export type UserRole = "parent" | "child" | "admin";
export type AlertType =
  | "arrival"
  | "sos"
  | "unsafe_activity"
  | "device_status"
  | "screen_time"
  | "geofence_exit";
export type AlertSeverity = "low" | "medium" | "high";
export type ZoneStatus = "inside" | "outside" | "approaching";
export type BrowsingCategory = "adult" | "malware" | "scam" | "social" | "education";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

export interface LinkedParent {
  id: string;
  name: string;
  email: string;
  relationship: string;
}

export interface SafeZone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  status: ZoneStatus;
}

export interface DeviceStatus {
  batteryLevel: number;
  isOnline: boolean;
  network: "wifi" | "cellular" | "offline";
  osName: string;
  osVersion: string;
  appVersion: string;
  lowPowerMode: boolean;
}

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  age: number;
  grade: string;
  avatarLabel: string;
  deviceId: string;
  status: DeviceStatus;
  lastSeenAt: string;
  safeZones: SafeZone[];
}

export interface LocationPoint {
  id: string;
  childId: string;
  latitude: number;
  longitude: number;
  speedMph: number;
  accuracyMeters: number;
  recordedAt: string;
  placeLabel: string;
}

export interface Alert {
  id: string;
  childId: string;
  type: AlertType;
  message: string;
  createdAt: string;
  severity: AlertSeverity;
  acknowledged: boolean;
}

export interface ScreenTimeRule {
  id: string;
  childId: string;
  name: string;
  schedule: string;
  dailyLimitMinutes: number;
  allowedApps: string[];
  blockedApps: string[];
  enabled: boolean;
}

export interface BrowsingRule {
  id: string;
  childId: string;
  blockedDomains: string[];
  blockedCategories: BrowsingCategory[];
  safeSearchEnabled: boolean;
}

export interface BrowsingLog {
  id: string;
  childId: string;
  domain: string;
  category: BrowsingCategory;
  blocked: boolean;
  recordedAt: string;
}

export interface WeeklyReport {
  childId: string;
  safetyScore: number;
  totalScreenTimeMinutes: number;
  blockedSitesCount: number;
  alertsCount: number;
  topRiskCategory: BrowsingCategory;
  summary: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
}

export interface SosEvent {
  id: string;
  childId: string;
  message: string;
  createdAt: string;
  status: "queued" | "sent" | "resolved";
}

export interface DeviceLinkInvite {
  childId: string;
  code: string;
  expiresAt: string;
  redeemedAt?: string;
}

export interface CreateLinkInviteResult {
  invite: DeviceLinkInvite;
  linkUrl: string;
}

export interface RedeemLinkInvitePayload {
  childName: string;
  deviceId: string;
  osName: string;
  osVersion: string;
  appVersion: string;
  batteryLevel: number;
  network?: "wifi" | "cellular" | "offline";
}

export interface RedeemLinkInviteResult {
  message: string;
  child: ChildProfile;
}

export interface SettingsSnapshot {
  notificationsEnabled: boolean;
  weeklyReportsEnabled: boolean;
  locationHistoryDays: number;
  privacyMode: "balanced" | "strict";
  emergencyContacts: LinkedParent[];
}

export interface DashboardSnapshot {
  parent: User;
  linkedParents: LinkedParent[];
  children: ChildProfile[];
  alerts: Alert[];
  latestLocations: Record<string, LocationPoint>;
  locationHistory: Record<string, LocationPoint[]>;
  screenTimeRules: ScreenTimeRule[];
  browsingRules: BrowsingRule[];
  browsingLogs: BrowsingLog[];
  weeklyReports: WeeklyReport[];
  metrics: DashboardMetric[];
  settings: SettingsSnapshot;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type OAuthProvider = "google" | "apple";

export interface OAuthStartPayload {
  provider: OAuthProvider;
}

export interface AuthResult {
  token: string;
  user: User;
}

export interface OAuthStartResult extends AuthResult {
  provider: OAuthProvider;
  configured: boolean;
  authUrl: string | null;
  message: string;
}

export interface AddChildPayload {
  name: string;
  age: number;
  grade: string;
  deviceId?: string;
}

export interface SosPayload {
  childId: string;
  message?: string;
}

export interface CheckInPayload {
  childId: string;
}

export interface AppState {
  dashboardSnapshot: DashboardSnapshot;
  deviceLinkInvites: DeviceLinkInvite[];
  sosEvents: SosEvent[];
  auth: {
    parentPassword: string;
  };
}
