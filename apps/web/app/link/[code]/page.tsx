import { ChildDeviceLinkForm } from "../../../components/child-device-link-form";
import { MobileShell } from "../../../components/mobile-shell";

export default async function DeviceLinkPage({
  params
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <MobileShell title="Child Device Link" backHref="/login">
      <ChildDeviceLinkForm code={code} />
    </MobileShell>
  );
}
