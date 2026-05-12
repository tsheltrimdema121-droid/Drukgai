// Readiness Check — a simple 8 question quiz for Bhutanese Class 12 students.
// Frontend (React) + Backend (Lovable Cloud / Supabase) in one file so it's
// easy to explain to a tutor: questions -> answers -> score -> save to database.

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Readiness Check — Drukgai" },
      { name: "description", content: "A short, gentle self-check for Bhutanese Class 12 students." },
    ],
  }),
  component: QuizPage,
});

// The 8 questions. "dim" = which area of life it checks.
const questions = [
  { q: "I have a clear idea of what I want to do after Class 12.",                dim: "Direction" },
  { q: "I know which careers exist in Bhutan and outside.",                       dim: "Awareness" },
  { q: "I feel confident about my practical skills (not only book theory).",      dim: "Skills" },
  { q: "I know how to write a CV and prepare for an interview.",                  dim: "Job Skills" },
  { q: "I have a teacher, parent or elder I can talk to about my career.",        dim: "Support" },
  { q: "I can make a decision without depending fully on my family.",             dim: "Independence" },
  { q: "I understand my own strengths and what I enjoy doing.",                   dim: "Self-Awareness" },
  { q: "I feel calm — not anxious — when I think about my future.",               dim: "Wellbeing" },
];

// Five answer choices, from 0 to 4.
const labels = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

function QuizPage() {
  // answers is an array of numbers (or null if not answered yet).
  const [answers, setAnswers] = useState<(number | null)[]>([
    null, null, null, null, null, null, null, null,
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [didSave, setDidSave] = useState(false);

  // Count how many questions have been answered.
  let completed = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== null) completed = completed + 1;
  }

  // Add up the total score.
  let score = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== null) score = score + (answers[i] as number);
  }

  const maxScore = questions.length * 4; // 8 questions x max 4 = 32
  const percentage = Math.round((score / maxScore) * 100);

  // Decide a tier based on the percentage.
  let tier = "Just beginning";
  let tierColor = "text-primary";
  let tierMessage = "Be kind to yourself — this is a starting line, not a verdict.";
  if (percentage >= 75) {
    tier = "Grounded";
    tierColor = "text-jade";
    tierMessage = "You feel solid. Keep building, keep listening.";
  } else if (percentage >= 50) {
    tier = "Finding your footing";
    tierColor = "text-saffron";
    tierMessage = "You are on your way. Some areas need a little care.";
  } else if (percentage >= 25) {
    tier = "Still searching";
    tierColor = "text-primary";
    tierMessage = "That is okay. Most students feel exactly this way.";
  }

  // When the student picks an answer, update that one position.
  function pickAnswer(questionIndex: number, value: number) {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  }

  // Save the result to the database when the student submits.
  async function submitQuiz() {
    if (completed < questions.length) return;
    setSubmitted(true);

    if (didSave) return;
    setDidSave(true);

    const { error } = await supabase.from("quiz_responses").insert({
      answers: answers,
      score: score,
      max_score: maxScore,
      percentage: percentage,
      tier: tier,
    });

    if (error) {
      toast.error("Could not save your result.");
    } else {
      toast.success("Result saved.");
    }
  }

  // Reset everything if the student wants to retake.
  function retake() {
    setAnswers([null, null, null, null, null, null, null, null]);
    setSubmitted(false);
    setDidSave(false);
  }

  // Make a list of weak areas (where the student answered 0 or 1).
  const weakAreas = [];
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] !== null && (answers[i] as number) <= 1) {
      weakAreas.push(questions[i]);
    }
  }

  // ---------- Result screen ----------
  if (submitted) {
    return (
      <div className="bg-hero min-h-[80vh]">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <p className="text-sm uppercase tracking-widest text-primary font-medium">Your snapshot</p>
          <h1 className={`mt-2 font-display text-6xl ${tierColor}`}>{tier}.</h1>
          <p className="mt-3 text-lg text-foreground/85">{tierMessage}</p>

          <div className="mt-10 rounded-3xl bg-card border border-border p-8 shadow-soft">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Readiness score</p>
                <p className="font-display text-5xl text-foreground">
                  {percentage}
                  <span className="text-2xl text-muted-foreground">%</span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{score} of {maxScore}</p>
            </div>
            <div className="mt-4 h-3 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-warm" style={{ width: `${percentage}%` }} />
            </div>
          </div>

          {weakAreas.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl">Areas where a little support could help</h2>
              <ul className="mt-4 grid gap-3">
                {weakAreas.map((w) => (
                  <li key={w.q} className="rounded-2xl bg-card border border-border p-5">
                    <p className="text-xs uppercase tracking-wider text-primary font-medium">{w.dim}</p>
                    <p className="mt-1 text-foreground">{w.q}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/ikigai" className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium">
              Try the ikigai reflection
            </Link>
            <button
              onClick={retake}
              className="rounded-full border border-foreground/20 px-6 py-3 font-medium hover:border-primary"
            >
              Retake the check
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Quiz screen ----------
  return (
    <div className="bg-hero">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">
          Readiness check · ག་དེ་སྦེ་གྲ་སྒྲིག་ཡོད
        </p>
        <h1 className="mt-2 font-display text-5xl">8 questions. No judgement.</h1>
        <p className="mt-3 text-muted-foreground">
          Pick the answer closest to how you actually feel — not how you think you should feel.
          Inspired by the spirit of Gross National Happiness: honesty over performance.
        </p>

        {/* Progress bar */}
        <div className="mt-6 sticky top-16 z-10 bg-background/85 backdrop-blur rounded-full border border-border p-1 flex items-center gap-3">
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-warm"
              style={{ width: `${(completed / questions.length) * 100}%` }}
            />
          </div>
          <span className="px-3 text-xs text-muted-foreground">
            {completed}/{questions.length}
          </span>
        </div>

        {/* List of questions */}
        <ol className="mt-10 space-y-5">
          {questions.map((question, i) => (
            <li key={question.q} className="rounded-2xl bg-card border border-border p-5 md:p-6 shadow-soft">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground text-lg">{question.q}</p>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-1.5">
                {labels.map((lbl, idx) => {
                  const isActive = answers[i] === idx;
                  return (
                    <button
                      key={lbl}
                      onClick={() => pickAnswer(i, idx)}
                      className={
                        "rounded-lg py-2.5 text-xs md:text-sm " +
                        (isActive
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "bg-secondary hover:bg-accent/30 text-foreground/80")
                      }
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
          onClick={submitQuiz}
          disabled={completed < questions.length}
          className="mt-10 w-full rounded-full bg-primary text-primary-foreground py-4 font-medium disabled:opacity-40 disabled:cursor-not-allowed shadow-glow hover:opacity-90"
        >
          {completed < questions.length
            ? `Answer all ${questions.length} questions to see your snapshot`
            : "See my snapshot →"}
        </button>
      </div>
    </div>
  );
}
