import { getPrimaryChild } from "../../components/mobile-data";
import { MobileShell } from "../../components/mobile-shell";
import { SosButton } from "../../components/sos-button";
import { getDashboardSnapshot } from "../../lib/data";

export default async function SosPage() {
  const snapshot = await getDashboardSnapshot();
  const child = getPrimaryChild(snapshot);

  return (
    <MobileShell title="SOS Emergency" backHref="/dashboard" activeTab="alerts">
      <div className="sosScreen">
        <h2>Emergency</h2>
        <SosButton childId={child.id} childName={child.name} />
        <p className="smallMuted centerText">
          Press and hold the button to send an emergency alert to your parents.
        </p>
      </div>
    </MobileShell>
  );
}
