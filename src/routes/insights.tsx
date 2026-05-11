import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Survey Insights — Drukgai" },
      { name: "description", content: "What 50 Bhutanese Class 12 students told us about confidence, careers, and what comes next." },
      { property: "og:title", content: "Survey Insights — 50 Class 12 students" },
      { property: "og:description", content: "Status, confidence, influences, and the questions students still carry." },
    ],
  }),
  component: InsightsPage,
});

// ---- Survey data (n = 50) ----
const N = 50;

type Gender = "All" | "Female" | "Male";
const status = [
  { label: "Pursuing higher education", value: 28, color: "bg-maroon" },
  { label: "Employed",                  value: 6,  color: "bg-jade" },
  { label: "Job seeking",               value: 9,  color: "bg-saffron" },
  { label: "Undecided",                 value: 7,  color: "bg-sky" },
];

const confidence = [
  { label: "Very low",  value: 3 },
  { label: "Low",       value: 7 },
  { label: "Moderate",  value: 22 },
  { label: "High",      value: 13 },
  { label: "Very high", value: 5 },
];

const factors = [
  { label: "Family advice",        value: 38 },
  { label: "Personal interest",    value: 31 },
  { label: "Financial situation",  value: 24 },
  { label: "Academic performance", value: 20 },
  { label: "Teachers' guidance",   value: 14 },
  { label: "Online information",   value: 12 },
  { label: "Peer influence",       value: 9 },
];

const preparation = [
  { label: "Very well",     value: 4 },
  { label: "Adequately",    value: 12 },
  { label: "Somewhat",      value: 20 },
  { label: "Not really",    value: 11 },
  { label: "Not at all",    value: 3 },
];

// gender split for confidence
const confidenceByGender: Record<Exclude<Gender, "All">, { label: string; value: number }[]> = {
  Female: [
    { label: "Very low", value: 2 }, { label: "Low", value: 4 }, { label: "Moderate", value: 12 }, { label: "High", value: 6 }, { label: "Very high", value: 2 },
  ],
  Male: [
    { label: "Very low", value: 1 }, { label: "Low", value: 3 }, { label: "Moderate", value: 10 }, { label: "High", value: 7 }, { label: "Very high", value: 3 },
  ],
};

const challenges = [
  "Confusion about which course suits me",
  "Lack of work experience",
  "Financial constraints",
  "Family pressure",
  "Average academic marks",
  "Lack of proper guidance",
  "Fear of choosing wrong",
];

const suggestions = [
  "Stronger career counselling",
  "Internships & workshops",
  "CV & interview training",
  "Real exposure to workplaces",
  "Scholarship information",
  "Life skills training",
  "Early career awareness",
];

export function InsightsPage() {
  const [gender, setGender] = useState<Gender>("All");

  const conf = useMemo(() => {
    if (gender === "All") return confidence;
    return confidenceByGender[gender];
  }, [gender]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest text-primary font-medium">Survey insights</p>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">You are not alone.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            We asked <strong className="text-foreground">{N} Bhutanese Class 12 graduates</strong> what life looks like after school —
            their plans, their confidence, and what they wish was different.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat big="56%" small="continued to higher education" />
            <Stat big="44%" small="reported moderate confidence" />
            <Stat big="76%" small="said family most influences them" />
            <Stat big="68%" small="want stronger career guidance" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16 space-y-14">

        {/* Status */}
        <Panel title="What students are doing now" subtitle="Status of respondents after Class 12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <DonutChart data={status} total={N} />
            <ul className="space-y-3">
              {status.map((s) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span className={`size-3 rounded-full ${s.color}`} />
                  <span className="flex-1 text-foreground">{s.label}</span>
                  <span className="font-display text-lg">{Math.round((s.value / N) * 100)}%</span>
                  <span className="text-xs text-muted-foreground w-10 text-right">n={s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* Confidence with filter */}
        <Panel
          title="How confident do students feel?"
          subtitle="Confidence in skills for future work or study"
          right={
            <div className="inline-flex rounded-full bg-secondary p-1 text-sm">
              {(["All", "Female", "Male"] as Gender[]).map((g) => (
                <button key={g} onClick={() => setGender(g)} className={`px-3 py-1.5 rounded-full transition ${gender === g ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>{g}</button>
              ))}
            </div>
          }
        >
          <BarChart data={conf} max={Math.max(...conf.map(d => d.value))} />
          <p className="mt-4 text-sm text-muted-foreground">
            Most students sit in the <strong className="text-foreground">moderate</strong> band.
            High confidence is rarer — academic learning isn't fully translating into job-ready certainty.
          </p>
        </Panel>

        {/* Factors */}
        <Panel title="What shapes their decisions" subtitle="Top influences on career choice (multiple select)">
          <BarChart data={factors} max={Math.max(...factors.map(d => d.value))} accent />
          <p className="mt-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Family advice</strong> stands out as the strongest force — a reminder of how
            much weight parents and guardians carry in students' aspirations.
          </p>
        </Panel>

        {/* Preparation */}
        <Panel title="Did school prepare them?" subtitle="Perception of how well school education prepared them for real-world work">
          <StackedBar data={preparation} total={N} />
          <p className="mt-4 text-sm text-muted-foreground">
            Most students feel school covered theory well, but left them <strong className="text-foreground">somewhat or under-prepared</strong> for real work.
          </p>
        </Panel>

        {/* Open ended grids */}
        <div className="grid md:grid-cols-2 gap-8">
          <Panel title="Challenges they face" subtitle="From open-ended responses" tone="maroon">
            <ul className="grid gap-2">
              {challenges.map((c) => (
                <li key={c} className="rounded-xl bg-card border border-border p-4 text-foreground">{c}</li>
              ))}
            </ul>
          </Panel>
          <Panel title="What they're asking for" subtitle="Student suggestions for schools & organisations" tone="jade">
            <ul className="grid gap-2">
              {suggestions.map((c) => (
                <li key={c} className="rounded-xl bg-card border border-border p-4 text-foreground">{c}</li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="rounded-3xl bg-warm p-10 md:p-14 text-primary-foreground shadow-glow">
          <p className="font-display text-3xl md:text-4xl leading-snug">
            The data is clear: students don't lack ambition — they lack maps, mentors, and moments to practice.
          </p>
          <p className="mt-4 opacity-90 max-w-2xl">That's what Drukgai is trying, in a small way, to start fixing.</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ big, small }: { big: string; small: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
      <p className="font-display text-4xl text-primary">{big}</p>
      <p className="mt-1 text-sm text-muted-foreground">{small}</p>
    </div>
  );
}

function Panel({ title, subtitle, children, right, tone }: { title: string; subtitle?: string; children: React.ReactNode; right?: React.ReactNode; tone?: "maroon" | "jade" }) {
  const stripe = tone === "maroon" ? "bg-maroon" : tone === "jade" ? "bg-jade" : "bg-warm";
  return (
    <section className="rounded-3xl bg-card border border-border p-7 md:p-10 shadow-soft relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 ${stripe}`} />
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {right}
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function BarChart({ data, max, accent }: { data: { label: string; value: number }[]; max: number; accent?: boolean }) {
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-foreground">{d.label}</span>
            <span className="text-muted-foreground tabular-nums">{d.value}</span>
          </div>
          <div className="mt-1 h-3 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full ${accent ? "bg-warm" : "bg-primary"} transition-all`}
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function StackedBar({ data, total }: { data: { label: string; value: number }[]; total: number }) {
  const colors = ["bg-jade", "bg-sky", "bg-gold", "bg-saffron", "bg-maroon"];
  return (
    <div>
      <div className="flex h-10 rounded-full overflow-hidden border border-border">
        {data.map((d, i) => (
          <div key={d.label} className={`${colors[i]} flex items-center justify-center text-xs font-medium text-primary-foreground`} style={{ width: `${(d.value / total) * 100}%` }}>
            {d.value / total > 0.08 ? `${Math.round((d.value / total) * 100)}%` : ""}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {data.map((d, i) => (
          <span key={d.label} className="inline-flex items-center gap-1.5">
            <span className={`size-2.5 rounded-full ${colors[i]}`} />{d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ data, total }: { data: { label: string; value: number; color: string }[]; total: number }) {
  // Build conic-gradient
  let acc = 0;
  const stops = data.map((d) => {
    const start = (acc / total) * 360;
    acc += d.value;
    const end = (acc / total) * 360;
    const color =
      d.color === "bg-maroon" ? "oklch(0.38 0.13 25)" :
      d.color === "bg-jade"   ? "oklch(0.55 0.11 165)" :
      d.color === "bg-saffron"? "oklch(0.74 0.17 55)" :
                                "oklch(0.62 0.12 230)";
    return `${color} ${start}deg ${end}deg`;
  }).join(", ");

  return (
    <div className="relative mx-auto size-64">
      <div className="size-full rounded-full" style={{ background: `conic-gradient(${stops})` }} />
      <div className="absolute inset-6 rounded-full bg-card grid place-items-center text-center">
        <div>
          <p className="font-display text-4xl text-primary">{total}</p>
          <p className="text-xs text-muted-foreground tracking-widest uppercase">respondents</p>
        </div>
      </div>
    </div>
  );
}
