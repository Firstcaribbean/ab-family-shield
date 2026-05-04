import Link from "next/link";
import { CheckInButton } from "../../components/check-in-button";
import { getPrimaryChild } from "../../components/mobile-data";
import { MobileShell } from "../../components/mobile-shell";
import { getDashboardSnapshot } from "../../lib/data";

function formatRelativeLastSeen(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  return `${diffHours} hr ago`;
}

export default async function DashboardPage() {
  const snapshot = await getDashboardSnapshot();
  const child = getPrimaryChild(snapshot);
  const statusLabel = child.status.isOnline ? "Online" : "Offline";

  return (
    <MobileShell title="Home Dashboard" backHref="/add-child" activeTab="home">
      <div className="dashboardScreen">
        <div className="dashboardBanner">
          <div>
            <div className="smallText brightText">Welcome,</div>
            <strong>{snapshot.parent.name}</strong>
          </div>
          <div className="profileAvatarSmall">{child.avatarLabel}</div>
        </div>

        <div className="childCardMobile">
          <div className="profileAvatarSmall altAvatar">{child.avatarLabel}</div>
          <div className="childCardInfo">
            <strong>{child.name}</strong>
            <div className="greenText">{statusLabel}</div>
            <div className="smallText">
              Last seen: {formatRelativeLastSeen(child.lastSeenAt)} - {child.status.batteryLevel}%
            </div>
          </div>
        </div>

        <div className="featureActionGrid">
          <Link className="miniFeatureCard" href="/live-location">
            View Location
          </Link>
          <div className="miniFeatureCard paddedFeatureCard">
            <CheckInButton childId={child.id} />
          </div>
          <Link className="miniFeatureCard" href="/sos">
            SOS Alerts
          </Link>
          <Link className="miniFeatureCard" href="/screen-time">
            Rules
          </Link>
        </div>

        <div className="sectionLine">
          <strong>Recent Alerts</strong>
          <Link href="/safe-browsing">View All</Link>
        </div>

        <div className="mobileList">
          {snapshot.alerts.slice(0, 4).map((alert) => (
            <div className="mobileListRow" key={alert.id}>
              <span>{alert.message}</span>
              <span>
                {new Date(alert.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit"
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
