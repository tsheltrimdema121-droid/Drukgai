import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/ikigai", label: "Reflect" },
  { to: "/quiz", label: "Readiness" },
  { to: "/paths", label: "Paths" },
  { to: "/stories", label: "Druk Stories" },
  { to: "/checkin", label: "Check-in" },
  { to: "/festivals", label: "Prayer Wheel" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="prayer-flags h-1 w-full opacity-80" />
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="size-9 rounded-full bg-warm grid place-items-center text-primary-foreground font-display text-lg shadow-soft">
            ༀ
          </span>
          <span className="font-display text-xl text-foreground">
            Drukgai <span className="text-muted-foreground font-sans text-sm">· Bhutanese Ikigai</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 rounded-md text-sm text-foreground/75 hover:text-foreground hover:bg-secondary transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-md text-sm text-primary bg-secondary font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/quiz"
          className="md:hidden inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm"
        >
          Start
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60">
      <div className="prayer-flags h-1 w-full opacity-70" />
      <div className="mx-auto max-w-6xl px-5 py-10 grid gap-6 md:grid-cols-3 text-sm text-muted-foreground">
        <div>
          <p className="font-display text-lg text-foreground">Drukgai</p>
          <p className="mt-2 max-w-sm">A Bhutanese take on Ikigai — built for Class 12 students standing at the edge of what's next.</p>
        </div>
        <div>
          <p className="font-medium text-foreground mb-2">Explore</p>
          <ul className="space-y-1">
            <li><Link to="/ikigai" className="hover:text-foreground">Reflect (Ikigai)</Link></li>
            <li><Link to="/quiz" className="hover:text-foreground">Readiness Check</Link></li>
            <li><Link to="/paths" className="hover:text-foreground">Bhutanese Paths</Link></li>
            <li><Link to="/stories" className="hover:text-foreground">Druk Stories</Link></li>
            <li><Link to="/insights" className="hover:text-foreground">Survey Insights</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-foreground mb-2">Behind the project</p>
          <p>Based on a survey of 50 Class 12 graduates exploring career readiness, confidence, and the questions we all carry after school ends.</p>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground pb-6">© {new Date().getFullYear()} Drukgai · Made with care in Bhutan.</p>
    </footer>
  );
}
