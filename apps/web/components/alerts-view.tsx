import type { DashboardSnapshot } from "../lib/shared-types";
import { formatTime } from "./format";

export function AlertsView({ snapshot }: { snapshot: DashboardSnapshot }) {
  return (
    <section className="pageSection">
      <div className="sectionHeader">
        <div>
          <span className="eyebrow">Response Center</span>
          <h1>Alerts and SOS</h1>
        </div>
        <p className="muted">
          Prioritize high-severity events, review acknowledgements, and respond fast.
        </p>
      </div>

      <div className="stack">
        {snapshot.alerts.map((alert) => (
          <article className="card full" key={alert.id}>
            <div className="splitRow">
              <div>
                <h2>{alert.message}</h2>
                <p className={`label severity-${alert.severity}`}>
                  {alert.type.replace("_", " ")} • {alert.acknowledged ? "acknowledged" : "open"}
                </p>
              </div>
              <span className="pill">{formatTime(alert.createdAt)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
