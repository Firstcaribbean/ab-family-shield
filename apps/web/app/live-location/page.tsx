import { getDashboardSnapshot } from "../../lib/data";
import { CheckInButton } from "../../components/check-in-button";
import { getPrimaryChild } from "../../components/mobile-data";
import { MobileShell } from "../../components/mobile-shell";
import { LiveTrackingMap } from "../../components/live-tracking-map";

export default async function LiveLocationPage() {
  const snapshot = await getDashboardSnapshot();
  const child = getPrimaryChild(snapshot);
  const location = snapshot.latestLocations[child.id];
  const locationLabel = location?.placeLabel ?? "Location not available yet";
  const batteryLabel = child.status.batteryLevel ?? 0;
  const fallbackZone = child.safeZones[0];
  const initialLatitude = location?.latitude ?? fallbackZone?.latitude ?? 34.0522;
  const initialLongitude = location?.longitude ?? fallbackZone?.longitude ?? -118.2437;

  return (
    <MobileShell title="Live Location" backHref="/dashboard" activeTab="map">
      <div className="locationScreen">
        <div className="locationCardTop">{child.name} is at {locationLabel}</div>
        <LiveTrackingMap
          childName={child.name}
          avatarLabel={child.avatarLabel}
          safeZones={child.safeZones}
          initialLatitude={initialLatitude}
          initialLongitude={initialLongitude}
        />
        {!location ? (
          <p className="smallMuted centerText">
            This child has not checked in yet. Use the Check In button to create the first live location.
          </p>
        ) : null}
        <div className="locationBottomCard">
          <div>
            <strong>{child.name}</strong>
            <div className="smallText">Battery {batteryLabel}%</div>
          </div>
          <CheckInButton childId={child.id} />
        </div>
      </div>
    </MobileShell>
  );
}
