import Link from "next/link";
import type { ReactNode } from "react";

type TabKey = "home" | "map" | "alerts" | "reports" | "settings";

const tabs: Array<{ key: TabKey; href: string; label: string }> = [
  { key: "home", href: "/dashboard", label: "Home" },
  { key: "map", href: "/live-location", label: "Map" },
  { key: "alerts", href: "/sos", label: "SOS" },
  { key: "reports", href: "/reports", label: "Reports" },
  { key: "settings", href: "/settings", label: "Settings" }
];

export function MobileShell({
  title,
  children,
  activeTab,
  backHref,
  nextHref,
  nextLabel
}: {
  title: string;
  children: ReactNode;
  activeTab?: TabKey;
  backHref?: string;
  nextHref?: string;
  nextLabel?: string;
}) {
  return (
    <main className="mobileAppPage">
      <div className="mobileAppFrame">
        <div className="mobileStatusBar">
          <span>9:41</span>
          <span>AB Family Shield</span>
          <span>LTE</span>
        </div>

        <header className="mobileHeader">
          <div className="mobileHeaderSide">
            {backHref ? (
              <Link className="iconButton" href={backHref}>
                {"<"}
              </Link>
            ) : (
              <span />
            )}
          </div>
          <h1>{title}</h1>
          <div className="mobileHeaderSide">
            {nextHref ? (
              <Link className="headerLink" href={nextHref}>
                {nextLabel ?? "Next"}
              </Link>
            ) : (
              <span />
            )}
          </div>
        </header>

        <section className="mobileScreen">{children}</section>

        {activeTab ? (
          <nav className="mobileTabBar">
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                className={tab.key === activeTab ? "tabItem activeTab" : "tabItem"}
                href={tab.href}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </main>
  );
}
