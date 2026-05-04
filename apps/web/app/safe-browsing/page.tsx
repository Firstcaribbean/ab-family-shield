import { getDashboardSnapshot } from "../../lib/data";
import { MobileShell } from "../../components/mobile-shell";

export default async function SafeBrowsingPage() {
  const snapshot = await getDashboardSnapshot();

  return (
    <MobileShell title="Safe Browsing" backHref="/dashboard" activeTab="alerts">
      <div className="featureScreen">
        <div className="protectionBanner">
          <strong>Protection is ON</strong>
          <span>All dangerous sites are blocked</span>
        </div>

        <div className="sectionLabel">Blocked Today</div>
        <div className="mobileList">
          {snapshot.browsingLogs.map((log) => (
            <div className="mobileListRow" key={log.id}>
              <div>
                <strong>{log.domain}</strong>
                <div className="smallText">{log.category}</div>
              </div>
              <span>{log.blocked ? "Blocked" : "Allowed"}</span>
            </div>
          ))}
        </div>

        <button className="softWideButton" type="button">
          Add to Block List
        </button>
      </div>
    </MobileShell>
  );
}
