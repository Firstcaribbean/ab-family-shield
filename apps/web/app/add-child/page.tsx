import { MobileAddChildForm } from "../../components/mobile-add-child-form";
import { MobileShell } from "../../components/mobile-shell";

export default async function AddChildPage() {
  return (
    <MobileShell
      title="Add Child"
      backHref="/login"
      nextHref="/dashboard"
      nextLabel="Next"
    >
      <MobileAddChildForm
        defaults={{
          name: "",
          age: 12,
          grade: "",
          deviceId: "",
          avatarLabel: "CH"
        }}
      />
    </MobileShell>
  );
}
