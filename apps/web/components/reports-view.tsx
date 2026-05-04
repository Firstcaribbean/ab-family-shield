import type { DashboardSnapshot } from "../lib/shared-types";

export function ReportsView({ snapshot }: { snapshot: DashboardSnapshot }) {
  return (
    <section className="pageSection">
      <div className="sectionHeader">
        <div>
          <span className="eyebrow">Analytics</span>
          <h1>Weekly Reports</h1>
        </div>
        <p className="muted">
          Consolidated safety scoring, usage totals, and risk summaries for each child.
        </p>
      </div>

      <div className="grid">
        {snapshot.weeklyReports.map((report) => {
          const child = snapshot.children.find((item) => item.id === report.childId);

          return (
            <article className="card" key={report.childId}>
              <div className="label">{child?.name ?? "Child"} Report</div>
              <div className="stat">{report.safetyScore}</div>
              <p className="muted">{report.summary}</p>
              <div className="list">
                <div className="listItem">
                  <strong>Screen Time</strong>
                  <span className="label">{report.totalScreenTimeMinutes} min</span>
                </div>
                <div className="listItem">
                  <strong>Blocked Sites</strong>
                  <span className="label">{report.blockedSitesCount}</span>
                </div>
                <div className="listItem">
                  <strong>Alerts</strong>
                  <span className="label">{report.alertsCount}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
