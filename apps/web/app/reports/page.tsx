import { getDashboardSnapshot } from "../../lib/data";
import { getPrimaryReport } from "../../components/mobile-data";
import { MobileShell } from "../../components/mobile-shell";

export default async function ReportsPage() {
  const snapshot = await getDashboardSnapshot();
  const report = getPrimaryReport(snapshot);

  return (
    <MobileShell title="Reports" backHref="/dashboard" activeTab="reports">
      <div className="featureScreen">
        <h2>Weekly Report</h2>
        <div className="reportTopCard">
          <div>
            <div className="smallText">Safety Score</div>
            <strong>Excellent</strong>
          </div>
          <div className="scoreCircle">{report?.safetyScore ?? 95}%</div>
        </div>

        <div className="reportMetricCard">
          <span>Screen Time</span>
          <strong>18h 30m</strong>
        </div>
        <div className="chartPlaceholder" />

        <div className="reportMetricCard">
          <span>Safe Browsing</span>
          <strong>{report?.blockedSitesCount ?? 0}</strong>
        </div>
        <div className="chartPlaceholder greenChartPlaceholder" />

        <div className="reportMetricCard">
          <span>SOS Alerts</span>
          <strong>0</strong>
        </div>
      </div>
    </MobileShell>
  );
}
