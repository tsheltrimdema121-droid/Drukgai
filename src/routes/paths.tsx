// Bhutanese Career Paths — real routes a Class 12 graduate in Bhutan
// can take. Static page, no database. Easy to read, easy to extend.

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/paths")({
  head: () => ({
    meta: [
      { title: "Bhutanese Career Paths — Drukgai" },
      { name: "description", content: "Real routes Bhutanese Class 12 graduates can take — government, RUB, monastic, tourism, agriculture, tech and more." },
    ],
  }),
  component: PathsPage,
});

// Each path = one common direction in Bhutan with what it asks of you.
const paths = [
  {
    title: "Royal Civil Service (RCSC)",
    color: "bg-maroon",
    needs: "Strong academics. Patience for BCSE exam. Willingness to serve in any Dzongkhag.",
    suits: "Service-minded students who value stability and serving the country.",
    next: "Apply for BCSE after your degree. Volunteer with local Dzongkhag offices to learn how government works.",
  },
  {
    title: "RUB Colleges (Sherubtse, Gedu, RTC, etc.)",
    color: "bg-saffron",
    needs: "Class 12 marks meeting cut-off for your chosen course.",
    suits: "Students who want a structured degree without leaving Bhutan.",
    next: "Check the RUB admission portal each May–June. Have a backup course in mind.",
  },
  {
    title: "Studying Abroad",
    color: "bg-sky",
    needs: "Funding (family, scholarship, loan). IELTS / SAT for many countries. A clear plan.",
    suits: "Independent students with a specific course Bhutan does not offer.",
    next: "Talk to seniors who studied there. Apply for scholarships (Australia Awards, Indian ICCR, etc.) early.",
  },
  {
    title: "Tourism & Hospitality",
    color: "bg-jade",
    needs: "Good English / Hindi / a third language. Patience. Knowledge of Bhutanese culture.",
    suits: "Friendly students who love guiding people and storytelling about Bhutan.",
    next: "Train as a cultural / trekking guide via TCB-approved courses. Start as a hotel intern.",
  },
  {
    title: "Agriculture & Agri-business",
    color: "bg-jade",
    needs: "Willingness to work with land. Some capital or family farm. Curiosity about modern methods.",
    suits: "Students from farming families who want to modernise, not abandon, the land.",
    next: "Look at CNR Lobesa programs. Explore organic farming, dairy, or high-value crops like asparagus.",
  },
  {
    title: "Royal Bhutan Police / Army (RBP / RBA)",
    color: "bg-maroon",
    needs: "Physical fitness. Discipline. A clean record.",
    suits: "Students who thrive with structure and want to protect the country.",
    next: "Watch for recruitment notices. Train physically before applying.",
  },
  {
    title: "Teaching",
    color: "bg-gold",
    needs: "Patience with children. A B.Ed or PgDE after your degree.",
    suits: "Students who explained things well to classmates.",
    next: "Apply to Samtse or Paro College of Education. Volunteer-tutor in your village in the meantime.",
  },
  {
    title: "Tech & Software",
    color: "bg-sky",
    needs: "Self-learning habit. Internet access. Comfort with English documentation.",
    suits: "Students who enjoy puzzles and building things.",
    next: "Free courses online (freeCodeCamp, CS50). Look at GovTech, Selise, or freelance work.",
  },
  {
    title: "Monastic / Cultural Studies",
    color: "bg-maroon",
    needs: "Devotion. Patience for long study. A teacher / monastery to join.",
    suits: "Students drawn to dharma, philosophy, or preserving Bhutanese heritage.",
    next: "Visit a Shedra. Speak with monks before deciding — it is a long path, beautiful but serious.",
  },
  {
    title: "Entrepreneurship",
    color: "bg-saffron",
    needs: "An idea solving a real Bhutanese problem. A small starting fund. Willingness to fail and try again.",
    suits: "Students who already sell, build or organise things informally.",
    next: "Apply for support from Loden Foundation or Startup Centre. Start small, in your own town.",
  },
];

function PathsPage() {
  return (
    <div className="bg-hero">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">
          Career paths · ལས་གནས་ཀྱི་ལམ
        </p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Many paths. One Bhutan.</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          There is no single right road after Class 12. These are real routes Bhutanese
          students take — read them slowly, and notice which one makes your heart lean forward.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {paths.map((p) => (
            <article key={p.title} className="rounded-2xl bg-card border border-border p-6 md:p-7 shadow-soft relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 ${p.color}`} />
              <h2 className="font-display text-2xl">{p.title}</h2>

              <p className="mt-4 text-xs uppercase tracking-wider text-primary font-medium">What it asks of you</p>
              <p className="text-foreground/85">{p.needs}</p>

              <p className="mt-3 text-xs uppercase tracking-wider text-primary font-medium">Who it suits</p>
              <p className="text-foreground/85">{p.suits}</p>

              <p className="mt-3 text-xs uppercase tracking-wider text-primary font-medium">A small next step</p>
              <p className="text-foreground/85">{p.next}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-warm p-8 md:p-10 text-primary-foreground shadow-glow">
          <p className="font-display text-2xl md:text-3xl leading-snug">
            "The path is made by walking." — but in Bhutan, the path is also made by listening
            to elders, helping your village, and remembering that happiness matters as much as a salary.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/quiz" className="rounded-full bg-background text-foreground px-6 py-3 font-medium">
              Check how ready you feel
            </Link>
            <Link to="/stories" className="rounded-full border border-background/40 px-6 py-3 font-medium">
              Read student stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
