import { MobileShell } from "../../components/mobile-shell";

const items = [
  "Notifications",
  "Privacy",
  "Add Another Parent",
  "Help Center",
  "About AB Family Shield"
];

export default function SettingsPage() {
  return (
    <MobileShell title="Settings" backHref="/dashboard" activeTab="settings">
      <div className="featureScreen">
        <div className="settingsStack">
          {items.map((item) => (
            <div className="settingsRow" key={item}>
              <span>{item}</span>
              <span>›</span>
            </div>
          ))}
        </div>

        <button className="logoutWideButton" type="button">
          Logout
        </button>
      </div>
    </MobileShell>
  );
}
