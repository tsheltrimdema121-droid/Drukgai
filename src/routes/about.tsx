import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Drukgai — A Bhutanese Ikigai" },
      { name: "description", content: "Why this project exists, who it's for, and how it was built." },
      { property: "og:title", content: "About Drukgai" },
      { property: "og:description", content: "A student project turning a survey into something useful." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <p className="text-sm uppercase tracking-widest text-primary font-medium">About</p>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">A small idea, made out of confusion.</h1>
          <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
            I built Drukgai as part of my project on developing a <strong>Bhutanese version of Ikigai</strong> —
            a tool to help Class 12 students understand how ready they are for their future careers.
          </p>
          <p className="mt-4 text-lg text-foreground/85 leading-relaxed">
            I'm creating this because I have personally felt confused about my own future, and I know many students feel
            the same. I wish there was something simple that could guide us, help us understand ourselves better,
            and make career choices less stressful.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 space-y-10">
        <Card title="What is Ikigai?">
          <p>
            Ikigai is a Japanese idea that means <em>"a reason to live"</em> or <em>"a reason to wake up every day."</em>
            It is about finding a balance between what you love, what you are good at, what the world needs, and what you can earn money from.
          </p>
        </Card>

        <Card title="How it was built">
          <p>I ran a structured survey with <strong>50 Class 12 graduates</strong> covering their current status, confidence,
            influences on their decisions, and how prepared they felt school made them.</p>
          <p>The findings shaped three small tools on this site: a guided ikigai reflection, a readiness self-check, and an
            interactive insights dashboard.</p>
        </Card>

        <Card title="What I hope it does">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Makes career decisions feel less lonely.</li>
            <li>Gives students a simple language for what they're feeling.</li>
            <li>Shows schools, parents and policymakers where to step in.</li>
          </ul>
        </Card>

        <div className="flex flex-wrap gap-3 pt-4">
          <Link to="/ikigai" className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium">Find your ikigai</Link>
          <Link to="/insights" className="rounded-full border border-foreground/20 px-6 py-3 font-medium hover:border-primary">See the survey</Link>
        </div>
      </section>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border p-7 md:p-9 shadow-soft">
      <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      <div className="mt-3 space-y-3 text-foreground/85 leading-relaxed">{children}</div>
    </div>
  );
}
