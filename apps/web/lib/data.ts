import { dashboardSnapshot } from "./shared-mock-data";
import type { DashboardSnapshot } from "./shared-types";

function getServerApiUrl() {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  return envUrl || "http://127.0.0.1:4000";
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const apiUrl = getServerApiUrl();

  const response = await fetch(`${apiUrl}/v1/dashboard`, {
    cache: "no-store"
  }).catch((error: unknown) => {
    console.error("Dashboard request failed:", error);
    return null;
  });

  if (!response) {
    return dashboardSnapshot;
  }

  if (!response.ok) {
    console.error(`Dashboard request failed with status ${response.status}.`);
    return dashboardSnapshot;
  }

  return (await response.json()) as DashboardSnapshot;
}
