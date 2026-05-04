import Link from "next/link";
import { MobileShell } from "../components/mobile-shell";

export default function SplashPage() {
  return (
    <MobileShell title="Splash Screen" nextHref="/login" nextLabel="Next">
      <div className="splashScreen">
        <div className="heroShield">AB</div>
        <h2>AB FAMILY SHIELD</h2>
        <p>Protecting Families Together</p>

        <div className="mobileActionStack">
          <Link className="primaryMobileButton" href="/login">
            Get Started
          </Link>
          <Link className="secondaryMobileButton" href="/login">
            Login
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}
