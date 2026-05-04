import type { DashboardSnapshot } from "../lib/shared-types";

export function getPrimaryChild(snapshot: DashboardSnapshot) {
  return snapshot.children[0];
}

export function getPrimaryReport(snapshot: DashboardSnapshot) {
  return snapshot.weeklyReports.find((report) => report.childId === snapshot.children[0]?.id);
}
