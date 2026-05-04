import Link from "next/link";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "/locations", label: "Locations" },
  { href: "/alerts", label: "Alerts" },
  { href: "/controls", label: "Controls" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" }
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brandMark">FS</span>
        <div>
          <strong>Family Safety</strong>
          <div className="label">Parent command center</div>
        </div>
      </div>

      <nav className="nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="navLink">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
