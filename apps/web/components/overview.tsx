import type { DashboardSnapshot } from "../lib/shared-types";
import { formatTime } from "./format";

export function Overview({ snapshot }: { snapshot: DashboardSnapshot }) {
  const featuredChild = snapshot.children[0];
  const latestLocation = snapshot.latestLocations[featuredChild.id];
  const report = snapshot.weeklyReports.find(
    (item) => item.childId === featuredChild.id
  );

  return (
    <>
      <section className="hero">
        <span className="eyebrow">Family Safety</span>
        <h1>Protect what matters with one calm, high-visibility control center.</h1>
        <p>
          Track live movement, respond to emergencies, tune digital safety rules,
          and review weekly behavior trends from a single dashboard.
        </p>
        <div className="pillRow">
          <div className="pill">Live tracking active</div>
          <div className="pill">2 children connected</div>
          <div className="pill">1 high-priority alert needs review</div>
        </div>
      </section>

      <section className="metricGrid">
        {snapshot.metrics.map((metric) => (
          <article className="metricCard" key={metric.id}>
            <div className="label">{metric.label}</div>
            <div className="stat">{metric.value}</div>
            <div className="label">{metric.trend}</div>
          </article>
        ))}
      </section>

      <section className="grid">
        <article className="card">
          <div className="label">Featured Child</div>
          <h2>{featuredChild.name}</h2>
          <p className="muted">
            {featuredChild.grade} • {featuredChild.status.osName} • battery{" "}
            {featuredChild.status.batteryLevel}%
          </p>
          <div className="list">
            <div className="listItem">
              <strong>Status</strong>
              <span className="label">
                {featuredChild.status.isOnline ? "Online" : "Offline"}
              </span>
            </div>
            <div className="listItem">
              <strong>Last Seen</strong>
              <span className="label">{formatTime(featuredChild.lastSeenAt)}</span>
            </div>
          </div>
        </article>

        <article className="card wide">
          <div className="label">Live Location</div>
          <h2>{latestLocation.placeLabel}</h2>
          <p className="muted">
            {latestLocation.latitude.toFixed(4)}, {latestLocation.longitude.toFixed(4)} •{" "}
            {latestLocation.accuracyMeters}m accuracy
          </p>
          <div className="mapPlaceholder">Map and geofence visualization</div>
        </article>

        <article className="card">
          <div className="label">Weekly Safety Score</div>
          <div className="stat">{report?.safetyScore ?? "--"}</div>
          <p className="muted">{report?.summary}</p>
        </article>

        <article className="card full">
          <div className="label">Recent Alerts</div>
          <div className="list">
            {snapshot.alerts.map((alert) => (
              <div className="listItem" key={alert.id}>
                <div>
                  <strong>{alert.message}</strong>
                  <div className={`label severity-${alert.severity}`}>
                    {alert.type.replace("_", " ")}
                  </div>
                </div>
                <span className="label">{formatTime(alert.createdAt)}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
