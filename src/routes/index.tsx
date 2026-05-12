import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Drukgai — A Bhutanese Ikigai for Class 12 Students" },
      { name: "description", content: "Confused after Class 12? Discover your ikigai, check your readiness, and explore what 50 Bhutanese students said about life after school." },
      { property: "og:title", content: "Drukgai — Bhutanese Ikigai" },
      { property: "og:description", content: "A simple guide to help Class 12 students understand themselves and feel ready for what's next." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-hero relative overflow-hidden">
        <div className="absolute -top-24 -right-24 size-[28rem] rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-[26rem] rounded-full bg-jade/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              <span className="size-1.5 rounded-full bg-saffron" /> Kuzuzangpo · For Class 12 students in Bhutan
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.02] text-foreground">
              What now,<br/>
              <span className="italic text-primary">after Class 12?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              I built Drukgai because I felt lost after my own board exams — and I knew
              many Bhutanese students feel the same. It is a small, gentle space to find
              your <em>ikigai</em>, check how ready you feel, and see what other
              Druk youth are going through.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/ikigai" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium shadow-glow hover:opacity-90 transition">
                Find your ikigai →
              </Link>
              <Link to="/quiz" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-card px-6 py-3 font-medium hover:border-primary transition">
                Take the readiness check
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div><span className="font-display text-2xl text-foreground">50</span> students surveyed</div>
              <div className="h-8 w-px bg-border" />
              <div><span className="font-display text-2xl text-foreground">4</span> questions of the heart</div>
            </div>
          </div>

          {/* Ikigai diagram */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <IkigaiDiagram />
          </div>
        </div>
      </section>

      {/* DAILY DRUK WISDOM */}
      <DailyWisdom />

      {/* IKIGAI EXPLAINER */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2">
            <p className="text-sm tracking-widest uppercase text-primary font-medium">生き甲斐 · Ikigai</p>
            <h2 className="mt-3 font-display text-4xl">A reason to wake up every day.</h2>
          </div>
          <p className="md:col-span-3 text-lg text-foreground/85 leading-relaxed">
            Ikigai is a Japanese idea that means <em>"a reason to live"</em> or <em>"a reason to wake up every day."</em>
            It's about finding a balance between what you <strong className="text-primary">love</strong>,
            what you are <strong className="text-primary">good at</strong>,
            what the <strong className="text-primary">world needs</strong>,
            and what you can <strong className="text-primary">earn money</strong> from.
          </p>
        </div>
      </section>

      {/* THREE PATHS */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="font-display text-3xl md:text-4xl text-center">Three small steps</h2>
        <p className="text-center text-muted-foreground mt-3">Pick whichever feels right today. There's no wrong order.</p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <PathCard
            tag="01"
            color="saffron"
            title="Reflect"
            body="Four small questions to find what you love, do well, and can offer Bhutan."
            to="/ikigai"
            cta="Begin reflection"
          />
          <PathCard
            tag="02"
            color="jade"
            title="Check readiness"
            body="A short, kind quiz to see where you feel solid and where you need support."
            to="/quiz"
            cta="Take the check"
          />
          <PathCard
            tag="03"
            color="sky"
            title="Explore paths"
            body="Real Bhutanese career routes — RCSC, RUB, tourism, farming, tech and more."
            to="/paths"
            cta="See the paths"
          />
          <PathCard
            tag="04"
            color="saffron"
            title="Read stories"
            body="Notes from Class 12 graduates across all 20 Dzongkhags. Share yours too."
            to="/stories"
            cta="Open the wall"
          />
        </div>
      </section>

      {/* QUOTE */}
      <section className="mx-auto max-w-4xl px-5 pb-24">
        <figure className="rounded-3xl bg-card border border-border p-10 md:p-14 shadow-soft relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 prayer-flags h-1.5" />
          <blockquote className="font-display text-2xl md:text-3xl leading-snug text-foreground">
            "I wish there was something simple that could guide us, help us understand ourselves
            better, and make career choices less stressful."
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted-foreground">— the reason this exists.</figcaption>
        </figure>
      </section>
    </>
  );
}

function PathCard({ tag, title, body, to, cta, color }: { tag: string; title: string; body: string; to: string; cta: string; color: "saffron" | "jade" | "sky" }) {
  const ring = { saffron: "ring-saffron/30 hover:ring-saffron", jade: "ring-jade/30 hover:ring-jade", sky: "ring-sky/30 hover:ring-sky" }[color];
  const dot = { saffron: "bg-saffron", jade: "bg-jade", sky: "bg-sky" }[color];
  return (
    <Link to={to} className={`group rounded-3xl bg-card p-7 ring-1 ${ring} transition-all hover:-translate-y-1 hover:shadow-glow`}>
      <div className="flex items-center justify-between">
        <span className={`size-8 rounded-full ${dot} grid place-items-center text-xs font-medium text-primary-foreground`}>{tag}</span>
        <span className="text-xl text-muted-foreground group-hover:text-primary transition">→</span>
      </div>
      <h3 className="mt-6 font-display text-2xl">{title}</h3>
      <p className="mt-2 text-muted-foreground">{body}</p>
      <p className="mt-6 text-sm font-medium text-primary">{cta}</p>
    </Link>
  );
}

function IkigaiDiagram() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%"><stop offset="0%" stopColor="oklch(0.74 0.17 55)" stopOpacity="0.85"/><stop offset="100%" stopColor="oklch(0.74 0.17 55)" stopOpacity="0.55"/></radialGradient>
        <radialGradient id="g2" cx="50%" cy="50%"><stop offset="0%" stopColor="oklch(0.55 0.11 165)" stopOpacity="0.85"/><stop offset="100%" stopColor="oklch(0.55 0.11 165)" stopOpacity="0.55"/></radialGradient>
        <radialGradient id="g3" cx="50%" cy="50%"><stop offset="0%" stopColor="oklch(0.62 0.12 230)" stopOpacity="0.85"/><stop offset="100%" stopColor="oklch(0.62 0.12 230)" stopOpacity="0.55"/></radialGradient>
        <radialGradient id="g4" cx="50%" cy="50%"><stop offset="0%" stopColor="oklch(0.82 0.14 85)" stopOpacity="0.9"/><stop offset="100%" stopColor="oklch(0.82 0.14 85)" stopOpacity="0.55"/></radialGradient>
      </defs>
      <g style={{ mixBlendMode: "multiply" }}>
        <circle cx="150" cy="150" r="110" fill="url(#g1)"/>
        <circle cx="250" cy="150" r="110" fill="url(#g4)"/>
        <circle cx="150" cy="250" r="110" fill="url(#g2)"/>
        <circle cx="250" cy="250" r="110" fill="url(#g3)"/>
      </g>
      <text x="80" y="100" fontSize="13" fill="oklch(0.18 0.02 40)" fontWeight="600">What you LOVE</text>
      <text x="270" y="100" fontSize="13" fill="oklch(0.18 0.02 40)" fontWeight="600">What you're GOOD at</text>
      <text x="50" y="320" fontSize="13" fill="oklch(0.18 0.02 40)" fontWeight="600">What the WORLD needs</text>
      <text x="265" y="320" fontSize="13" fill="oklch(0.18 0.02 40)" fontWeight="600">What PAYS you</text>
      <text x="200" y="205" textAnchor="middle" fontSize="22" fontFamily="Fraunces, serif" fontStyle="italic" fill="oklch(0.18 0.02 40)">ikigai</text>
    </svg>
  );
}

// A small daily-rotating Bhutanese wisdom card. Picks a proverb based on
// today's date so every student visiting on the same day sees the same one.
function DailyWisdom() {
  const wisdoms = [
    { dz: "ལས་འབྲས་", en: "Karma ripens slowly. Plant good seeds today; the harvest comes in its own time." },
    { dz: "དགའ་ཚོར་", en: "Happiness is not a destination — it is the path itself. (Gross National Happiness)" },
    { dz: "བློ་གྲོས་", en: "A wise person climbs the mountain step by step, not in one jump." },
    { dz: "བཟོད་པ་", en: "Patience is the strongest armour — stronger than any sword." },
    { dz: "མཐུན་པ་", en: "One bamboo bends, many bamboos make a forest. Lean on your friends and family." },
    { dz: "དྲང་པོ་", en: "An honest heart sleeps well at night. Choose truth, even when it is hard." },
    { dz: "རེ་བ་", en: "Hope is a butter lamp — small, but it lights the whole room." },
    { dz: "འབད་བརྩོན་", en: "Effort never lies. Even slow steps cross a long valley." },
    { dz: "བྱམས་སྙིང་རྗེ་", en: "Be kind first to yourself. The river must be full before it can give water." },
    { dz: "ཤེས་རབ་", en: "A book is a good teacher, but life is a better one. Listen to both." },
  ];
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const w = wisdoms[dayOfYear % wisdoms.length];

  return (
    <section className="mx-auto max-w-4xl px-5 pt-4">
      <div className="rounded-3xl border border-border bg-card p-7 md:p-9 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 prayer-flags h-1.5" />
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-primary font-medium">Today's Druk wisdom · ཉིན་གྱི་གཏམ་དཔེ</p>
          <span className="text-xs text-muted-foreground">{today.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
        </div>
        <p className="mt-4 font-display text-2xl md:text-3xl text-foreground italic leading-snug">"{w.en}"</p>
        <p className="mt-3 text-sm text-muted-foreground">{w.dz}</p>
      </div>
    </section>
  );
}
