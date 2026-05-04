import type {
  AddChildPayload,
  CheckInPayload,
  RedeemLinkInvitePayload,
  LoginPayload,
  OAuthProvider,
  RegisterPayload,
  SosPayload
} from "@family-safety/shared";
import {
  FileDashboardRepository,
  type DashboardRepository
} from "../repositories/dashboard-repository";

export class FamilySafetyService {
  constructor(private readonly repository: DashboardRepository) {}

  async getDashboard() {
    return this.repository.getDashboardSnapshot();
  }

  async registerParent(payload: RegisterPayload) {
    return this.repository.registerParent(payload);
  }

  async loginParent(payload: LoginPayload) {
    return this.repository.loginParent(payload);
  }

  async startOAuth(provider: OAuthProvider) {
    return this.repository.startOAuth(provider);
  }

  async listChildren() {
    return this.repository.listChildren();
  }

  async getChild(id: string) {
    return this.repository.getChild(id);
  }

  async createChild(payload: AddChildPayload) {
    return this.repository.createChild(payload);
  }

  async getLatestLocation(childId: string) {
    return this.repository.getLatestLocation(childId);
  }

  async getLocationHistory(childId: string) {
    return this.repository.getLocationHistory(childId);
  }

  async createLinkInvite(childId: string, baseUrl?: string) {
    return this.repository.createLinkInvite(childId, baseUrl);
  }

  async getLinkInvite(childId: string) {
    return this.repository.getLinkInvite(childId);
  }

  async getLinkInviteByCode(code: string) {
    return this.repository.getLinkInviteByCode(code);
  }

  async redeemLinkInvite(code: string, payload: RedeemLinkInvitePayload) {
    return this.repository.redeemLinkInvite(code, payload);
  }

  async triggerSos(payload: SosPayload) {
    return this.repository.triggerSos(payload);
  }

  async checkInChild(payload: CheckInPayload) {
    return this.repository.checkInChild(payload);
  }

  async getAlerts() {
    return this.repository.getAlerts();
  }

  async getReports() {
    return this.repository.getReports();
  }

  async getSettings() {
    return this.repository.getSettings();
  }

  async getScreenTimeRules() {
    return this.repository.getScreenTimeRules();
  }

  async getBrowsingRules() {
    return this.repository.getBrowsingRules();
  }

  async getBrowsingLogs() {
    return this.repository.getBrowsingLogs();
  }

  async getSosEvents() {
    return this.repository.getSosEvents();
  }
}

const repository = new FileDashboardRepository();
const service = new FamilySafetyService(repository);

export function createFamilySafetyService() {
  return service;
}
