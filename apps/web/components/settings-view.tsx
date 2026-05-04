import type { DashboardSnapshot } from "../lib/shared-types";

export function SettingsView({ snapshot }: { snapshot: DashboardSnapshot }) {
  const { settings, linkedParents } = snapshot;

  return (
    <section className="pageSection">
      <div className="sectionHeader">
        <div>
          <span className="eyebrow">Account</span>
          <h1>Settings</h1>
        </div>
        <p className="muted">
          Notification preferences, privacy controls, and linked family guardians.
        </p>
      </div>

      <div className="grid">
        <article className="card">
          <div className="label">Preferences</div>
          <div className="list">
            <div className="listItem">
              <strong>Notifications</strong>
              <span className="label">
                {settings.notificationsEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <div className="listItem">
              <strong>Weekly Reports</strong>
              <span className="label">
                {settings.weeklyReportsEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <div className="listItem">
              <strong>Privacy Mode</strong>
              <span className="label">{settings.privacyMode}</span>
            </div>
          </div>
        </article>

        <article className="card">
          <div className="label">Location Retention</div>
          <div className="stat">{settings.locationHistoryDays} days</div>
          <p className="muted">Keep recent movement available for school, pickup, and audit review.</p>
        </article>

        <article className="card wide">
          <div className="label">Emergency Contacts</div>
          <div className="list">
            {linkedParents.map((contact) => (
              <div className="listItem" key={contact.id}>
                <div>
                  <strong>{contact.name}</strong>
                  <div className="label">{contact.relationship}</div>
                </div>
                <span className="label">{contact.email}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
