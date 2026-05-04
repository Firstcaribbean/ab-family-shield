import type { DashboardSnapshot } from "../lib/shared-types";

export function ControlsView({ snapshot }: { snapshot: DashboardSnapshot }) {
  return (
    <section className="pageSection">
      <div className="sectionHeader">
        <div>
          <span className="eyebrow">Digital Safety</span>
          <h1>Screen Time and Browsing Controls</h1>
        </div>
        <p className="muted">
          Review active schedules, app restrictions, and harmful-domain protection rules.
        </p>
      </div>

      <div className="grid">
        <article className="card wide">
          <div className="label">Screen Time Rules</div>
          <div className="list">
            {snapshot.screenTimeRules.map((rule) => (
              <div className="listItem" key={rule.id}>
                <div>
                  <strong>{rule.name}</strong>
                  <div className="label">{rule.schedule}</div>
                </div>
                <span className="label">{rule.dailyLimitMinutes} min/day</span>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="label">Browsing Protection</div>
          <div className="list">
            {snapshot.browsingRules.map((rule) => (
              <div className="listItem" key={rule.id}>
                <div>
                  <strong>{rule.safeSearchEnabled ? "Safe Search On" : "Safe Search Off"}</strong>
                  <div className="label">{rule.blockedCategories.join(", ")}</div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card full">
          <div className="label">Recent Browsing Activity</div>
          <div className="list">
            {snapshot.browsingLogs.map((log) => (
              <div className="listItem" key={log.id}>
                <div>
                  <strong>{log.domain}</strong>
                  <div className="label">{log.category}</div>
                </div>
                <span className={`label ${log.blocked ? "severity-high" : "severity-low"}`}>
                  {log.blocked ? "Blocked" : "Allowed"}
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
