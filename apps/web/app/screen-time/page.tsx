import { getDashboardSnapshot } from "../../lib/data";
import { MobileShell } from "../../components/mobile-shell";

export default async function ScreenTimePage() {
  const snapshot = await getDashboardSnapshot();

  return (
    <MobileShell title="Screen Time" backHref="/dashboard" activeTab="home">
      <div className="featureScreen">
        <h2>Screen Time Control</h2>
        <p className="smallMuted">Manage screen time and device usage.</p>

        <div className="ruleStack">
          {snapshot.screenTimeRules.map((rule) => (
            <div className="ruleRow" key={rule.id}>
              <div>
                <strong>{rule.name}</strong>
                <div className="smallText">{rule.schedule}</div>
              </div>
              <div className="toggleMock" />
            </div>
          ))}

          <div className="ruleRow">
            <div>
              <strong>Daily Limit</strong>
              <div className="smallText">3 hours per day</div>
            </div>
          </div>

          <div className="ruleRow">
            <div>
              <strong>Weekend Rules</strong>
              <div className="smallText">Sat - Sun custom routine</div>
            </div>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
