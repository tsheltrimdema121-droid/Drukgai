import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "../components/SiteHeader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-primary">404</h1>
        <h2 className="mt-4 font-display text-2xl">This path isn't on the map</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something went sideways</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Drukgai — Bhutanese Ikigai for Class 12 Students" },
      { name: "description", content: "A gentle, data-informed guide to help Bhutanese Class 12 students discover their ikigai and feel ready for what comes next." },
      { property: "og:title", content: "Drukgai — Bhutanese Ikigai for Class 12 Students" },
      { name: "twitter:title", content: "Drukgai — Bhutanese Ikigai for Class 12 Students" },
      { property: "og:description", content: "A gentle, data-informed guide to help Bhutanese Class 12 students discover their ikigai and feel ready for what comes next." },
      { name: "twitter:description", content: "A gentle, data-informed guide to help Bhutanese Class 12 students discover their ikigai and feel ready for what comes next." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e77b6e65-210c-4716-93a4-adf348083aa9/id-preview-c564bb20--10d42414-2cd9-472b-8580-30bf51c7134c.lovable.app-1778453287612.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e77b6e65-210c-4716-93a4-adf348083aa9/id-preview-c564bb20--10d42414-2cd9-472b-8580-30bf51c7134c.lovable.app-1778453287612.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1"><Outlet /></main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
