// Ikigai page — a simple reflection tool for Bhutanese Class 12 students.
// Frontend (React) + Backend (Lovable Cloud / Supabase) all in one file
// so it's easy to explain step by step.

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/ikigai")({
  head: () => ({
    meta: [
      { title: "Find Your Ikigai — Drukgai" },
      { name: "description", content: "Four small questions to help Bhutanese Class 12 students discover their ikigai." },
    ],
  }),
  component: IkigaiPage,
});

// The four ikigai questions, with Bhutanese examples a student would relate to.
const questions = [
  {
    key: "love",
    label: "What you LOVE",
    hint: "Things that make you forget time.",
    example: "archery, painting thangkas, football, helping my village…",
    color: "bg-saffron/15 border-saffron/40",
  },
  {
    key: "good",
    label: "What you are GOOD at",
    hint: "Things people often say you do well.",
    example: "math, Dzongkha writing, listening to friends, cooking ema datshi…",
    color: "bg-gold/20 border-gold/50",
  },
  {
    key: "world",
    label: "What BHUTAN / the world NEEDS",
    hint: "A problem you would love to solve.",
    example: "youth unemployment, mental health, organic farming, tourism…",
    color: "bg-jade/15 border-jade/40",
  },
  {
    key: "pay",
    label: "What can PAY you",
    hint: "Work people are willing to pay for in Bhutan.",
    example: "civil service, tour guide, software, teaching, hotel work…",
    color: "bg-sky/15 border-sky/40",
  },
];

function IkigaiPage() {
  // One state object that holds all four answers.
  const [answers, setAnswers] = useState({ love: "", good: "", world: "", pay: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Count how many boxes the student has filled (more than 2 letters).
  let filled = 0;
  if (answers.love.trim().length > 2) filled = filled + 1;
  if (answers.good.trim().length > 2) filled = filled + 1;
  if (answers.world.trim().length > 2) filled = filled + 1;
  if (answers.pay.trim().length > 2) filled = filled + 1;

  // When the student types in a textarea, update that one field.
  function handleChange(key: string, value: string) {
    setAnswers({ ...answers, [key]: value });
  }

  // Save the reflection to the database (Lovable Cloud / Supabase).
  async function saveReflection() {
    if (filled < 4) return;
    setSaving(true);

    const { error } = await supabase.from("ikigai_reflections").insert({
      love: answers.love.trim(),
      good: answers.good.trim(),
      world: answers.world.trim(),
      pay: answers.pay.trim(),
    });

    setSaving(false);

    if (error) {
      toast.error("Sorry, could not save. Please try again.");
      return;
    }

    setSaved(true);
    toast.success("Kadrinche! Your reflection is saved.");
  }

  return (
    <div className="bg-hero">
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <p className="text-sm tracking-widest uppercase text-primary font-medium">
          生き甲斐 · Ikigai · ག་ཅི་གི་དོན་ལུ་འཚོ་ནི
        </p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Find your ikigai.</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Take a deep breath. Write honestly — like you would in your own diary.
          There are no wrong answers. Even small thoughts count.
        </p>

        {/* The four question cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {questions.map((q) => (
            <label
              key={q.key}
              className={`rounded-2xl border-2 ${q.color} bg-card/70 backdrop-blur p-6`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl">{q.label}</span>
                {answers[q.key as keyof typeof answers].trim().length > 2 && (
                  <span className="text-xs text-jade font-medium">✓ filled</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{q.hint}</p>
              <textarea
                value={answers[q.key as keyof typeof answers]}
                onChange={(e) => handleChange(q.key, e.target.value)}
                placeholder={q.example}
                rows={3}
                className="mt-3 w-full rounded-lg border border-border bg-background/60 p-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </label>
          ))}
        </div>

        {/* Progress bar showing how many boxes are filled */}
        <div className="mt-8 h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-warm"
            style={{ width: `${(filled / 4) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {filled} out of 4 reflections filled
        </p>

        {/* Show the save card only when all four are answered */}
        {filled === 4 && (
          <div className="mt-12 rounded-3xl bg-warm p-8 md:p-10 text-primary-foreground shadow-glow">
            <p className="font-display text-2xl md:text-3xl leading-snug">
              Your ikigai is not one fixed thing. It grows like a prayer flag —
              shaped by the wind, the mountains, and your own heart.
            </p>
            <p className="mt-3 opacity-90">
              Save your reflection. Come back to it after a month and see what changed.
            </p>
            <button
              onClick={saveReflection}
              disabled={saving || saved}
              className="mt-6 rounded-full bg-background text-foreground px-6 py-3 font-medium disabled:opacity-60 hover:opacity-90"
            >
              {saved ? "✓ Saved" : saving ? "Saving…" : "Save my reflection"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
