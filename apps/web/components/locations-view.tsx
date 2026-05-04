import type { DashboardSnapshot } from "../lib/shared-types";
import { formatTime } from "./format";

export function LocationsView({ snapshot }: { snapshot: DashboardSnapshot }) {
  return (
    <section className="pageSection">
      <div className="sectionHeader">
        <div>
          <span className="eyebrow">Live Tracking</span>
          <h1>Location Monitoring</h1>
        </div>
        <p className="muted">
          Realtime position, zone awareness, and recent movement history for every child.
        </p>
      </div>

      <div className="stack">
        {snapshot.children.map((child) => {
          const latestLocation = snapshot.latestLocations[child.id];
          const history = snapshot.locationHistory[child.id] ?? [];

          return (
            <article className="card full" key={child.id}>
              <div className="splitRow">
                <div>
                  <h2>{child.name}</h2>
                  <p className="muted">
                    {latestLocation.placeLabel} • updated {formatTime(latestLocation.recordedAt)}
                  </p>
                </div>
                <div className="pill">
                  {child.status.network} • {child.status.batteryLevel}% battery
                </div>
              </div>

              <div className="grid compact">
                <div className="card nested">
                  <div className="label">Current Coordinates</div>
                  <strong>
                    {latestLocation.latitude.toFixed(4)}, {latestLocation.longitude.toFixed(4)}
                  </strong>
                </div>

                <div className="card nested">
                  <div className="label">Safe Zones</div>
                  <div className="list">
                    {child.safeZones.map((zone) => (
                      <div className="listItem" key={zone.id}>
                        <strong>{zone.name}</strong>
                        <span className="label">{zone.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card nested">
                  <div className="label">Recent Trail</div>
                  <div className="list">
                    {history.map((point) => (
                      <div className="listItem" key={point.id}>
                        <strong>{point.placeLabel}</strong>
                        <span className="label">{formatTime(point.recordedAt)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
