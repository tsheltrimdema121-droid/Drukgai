import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Readiness Check — Drukgai" },
      { name: "description", content: "A short, gentle self-check to see how ready you feel for life after Class 12." },
      { property: "og:title", content: "Readiness Check" },
      { property: "og:description", content: "8 questions. No judgement. Just a snapshot." },
    ],
  }),
  component: QuizPage,
});

const questions = [
  { q: "I have a clear idea of what I want to do after Class 12.",          dim: "Direction" },
  { q: "I know which fields and careers exist in Bhutan and beyond.",       dim: "Awareness" },
  { q: "I feel confident about my practical skills (not just theory).",     dim: "Skills" },
  { q: "I know how to write a CV and prepare for an interview.",            dim: "Job Skills" },
  { q: "I have someone I can talk to about my career — a mentor or guide.", dim: "Support" },
  { q: "I can make a decision without depending entirely on my family.",    dim: "Independence" },
  { q: "I understand my own strengths and what I enjoy doing.",             dim: "Self-Awareness" },
  { q: "I feel calm — not anxious — when I think about the future.",        dim: "Wellbeing" },
] as const;

const labels = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

export function QuizPage() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const completed = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const max = questions.length * 4;
  const pct = Math.round((score / max) * 100);

  const tier =
    pct >= 75 ? { label: "Grounded", color: "text-jade", desc: "You feel solid. Keep building, keep listening." } :
    pct >= 50 ? { label: "Finding your footing", color: "text-saffron", desc: "You're on your way. Some areas need a little care." } :
    pct >= 25 ? { label: "Still searching", color: "text-primary", desc: "That's okay. Most students feel exactly this." } :
                { label: "Just beginning", color: "text-primary", desc: "Be kind to yourself — this is a starting line, not a verdict." };

  const savedRef = useRef(false);
  useEffect(() => {
    if (!submitted || savedRef.current) return;
    savedRef.current = true;
    supabase.from("quiz_responses").insert({
      answers, score, max_score: max, percentage: pct, tier: tier.label,
    }).then(({ error }) => {
      if (error) toast.error("Couldn't save your result.");
      else toast.success("Result saved.");
    });
  }, [submitted, answers, score, max, pct, tier.label]);

  if (submitted) {
    const lows = questions.map((q, i) => ({ ...q, score: answers[i] ?? 0 })).filter((q) => q.score <= 1);
    return (
      <div className="bg-hero min-h-[80vh]">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <p className="text-sm uppercase tracking-widest text-primary font-medium">Your snapshot</p>
          <h1 className={`mt-2 font-display text-6xl ${tier.color}`}>{tier.label}.</h1>
          <p className="mt-3 text-lg text-foreground/85">{tier.desc}</p>

          <div className="mt-10 rounded-3xl bg-card border border-border p-8 shadow-soft">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Readiness score</p>
                <p className="font-display text-5xl text-foreground">{pct}<span className="text-2xl text-muted-foreground">%</span></p>
              </div>
              <p className="text-sm text-muted-foreground">{score} of {max}</p>
            </div>
            <div className="mt-4 h-3 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-warm" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {lows.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl">Areas where a little support could help</h2>
              <ul className="mt-4 grid gap-3">
                {lows.map((l) => (
                  <li key={l.q} className="rounded-2xl bg-card border border-border p-5">
                    <p className="text-xs uppercase tracking-wider text-primary font-medium">{l.dim}</p>
                    <p className="mt-1 text-foreground">{l.q}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/ikigai" className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium">Try the ikigai reflection</Link>
            <button onClick={() => { savedRef.current = false; setAnswers(Array(questions.length).fill(null)); setSubmitted(false); }} className="rounded-full border border-foreground/20 px-6 py-3 font-medium hover:border-primary">Retake the check</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-hero">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">Readiness check</p>
        <h1 className="mt-2 font-display text-5xl">8 questions. No judgement.</h1>
        <p className="mt-3 text-muted-foreground">Choose the answer closest to how you actually feel — not how you think you should feel.</p>

        <div className="mt-6 sticky top-16 z-10 bg-background/85 backdrop-blur rounded-full border border-border p-1 flex items-center gap-3">
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-warm transition-all" style={{ width: `${(completed / questions.length) * 100}%` }} />
          </div>
          <span className="px-3 text-xs text-muted-foreground">{completed}/{questions.length}</span>
        </div>

        <ol className="mt-10 space-y-5">
          {questions.map((q, i) => (
            <li key={q.q} className="rounded-2xl bg-card border border-border p-5 md:p-6 shadow-soft">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-foreground text-lg">{q.q}</p>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-1.5">
                {labels.map((lbl, idx) => {
                  const active = answers[i] === idx;
                  return (
                    <button
                      key={lbl}
                      onClick={() => setAnswers((p) => p.map((v, j) => j === i ? idx : v))}
                      className={`rounded-lg py-2.5 text-xs md:text-sm transition ${active ? "bg-primary text-primary-foreground shadow-soft" : "bg-secondary hover:bg-accent/30 text-foreground/80"}`}
                    >
                      <span className="hidden md:inline">{lbl}</span>
                      <span className="md:hidden">{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>

        <button
          onClick={() => setSubmitted(true)}
          disabled={completed < questions.length}
          className="mt-10 w-full rounded-full bg-primary text-primary-foreground py-4 font-medium disabled:opacity-40 disabled:cursor-not-allowed shadow-glow hover:opacity-90 transition"
        >
          {completed < questions.length ? `Answer all ${questions.length} questions to see your snapshot` : "See my snapshot →"}
        </button>
      </div>
    </div>
  );
}
