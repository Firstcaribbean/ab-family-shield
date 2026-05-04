import { MobileLoginForm } from "../../components/mobile-login-form";
import { MobileShell } from "../../components/mobile-shell";

export default function LoginPage() {
  return (
    <MobileShell title="Login / Register" backHref="/">
      <MobileLoginForm />
    </MobileShell>
  );
}
