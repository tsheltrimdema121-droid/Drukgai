// Gentle Check-in — students tap how they feel + which Gross National
// Happiness pillar they want to nurture today. Saves anonymously to the
// database so we can see how Bhutanese students are doing.
//
// Frontend (React form) + Backend (Lovable Cloud insert) in one file
// so it's easy to follow line by line.

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/checkin")({
  head: () => ({
    meta: [
      { title: "Gentle Check-in — Drukgai" },
      { name: "description", content: "A short, kind check-in for Bhutanese students. Inspired by Gross National Happiness." },
    ],
  }),
  component: CheckinPage,
});

// 5 simple moods with Dzongkha-feeling labels.
const moods = [
  { key: "happy",   emoji: "😊", label: "Happy",   sub: "སྐྱིད་པོ" },
  { key: "okay",    emoji: "🙂", label: "Okay",    sub: "འགྲིགས་པ" },
  { key: "tired",   emoji: "😴", label: "Tired",   sub: "ཐང་ཆད" },
  { key: "worried", emoji: "😟", label: "Worried", sub: "སེམས་འཁྲལ" },
  { key: "sad",     emoji: "😔", label: "Sad",     sub: "སྐྱོ་པོ" },
];

// The 4 pillars of Gross National Happiness — Bhutan's national framework.
const pillars = [
  { key: "Sustainable development", tip: "Study, work, future plans" },
  { key: "Cultural preservation",   tip: "Family, traditions, festivals" },
  { key: "Environmental conservation", tip: "Nature, walks, fresh air" },
  { key: "Good governance",         tip: "Community, fairness, voice" },
];

function CheckinPage() {
  // 3 simple pieces of state — like beginner React.
  const [mood, setMood] = useState("");
  const [pillar, setPillar] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  // Save the check-in to the database.
  async function handleSubmit() {
    if (!mood || !pillar) {
      toast.error("Please pick a mood and a GNH pillar.");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("mood_checkins").insert({
      mood: mood,
      gnh_pillar: pillar,
      note: note.trim(),
    });
    setSaving(false);
    if (error) {
      toast.error("Could not save. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Tashi delek — thank you for checking in.");
  }

  // Thank-you screen after submitting.
  if (done) {
    const m = moods.find((x) => x.key === mood);
    return (
      <main className="mx-auto max-w-2xl px-5 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-10 text-center shadow-soft">
          <div className="text-6xl mb-4">{m?.emoji ?? "🙏"}</div>
          <h1 className="font-display text-3xl text-foreground">Tashi delek</h1>
          <p className="mt-3 text-muted-foreground">
            Your feeling is noted. Today, give a little care to{" "}
            <span className="text-foreground font-medium">{pillar.toLowerCase()}</span>.
          </p>
          <p className="mt-6 text-sm text-muted-foreground italic">
            "May all beings be happy. May all beings be free from suffering."
          </p>
          <button
            onClick={() => {
              setMood(""); setPillar(""); setNote(""); setDone(false);
            }}
            className="mt-8 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm"
          >
            Check in again
          </button>
        </div>
      </main>
    );
  }

  // Main check-in form.
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <header className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Gentle check-in · སེམས་ཀྱི་གཏམ
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground">How is your heart today?</h1>
        <p className="mt-3 text-muted-foreground">
          Inspired by Bhutan's Gross National Happiness. Anonymous and short.
        </p>
      </header>

      {/* Step 1 — pick a mood */}
      <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
        <p className="text-sm font-medium text-foreground mb-4">1. Pick how you feel</p>
        <div className="grid grid-cols-5 gap-2">
          {moods.map((m) => (
            <button
              key={m.key}
              onClick={() => setMood(m.key)}
              className={
                "rounded-xl border p-3 flex flex-col items-center gap-1 transition-all " +
                (mood === m.key
                  ? "border-primary bg-secondary scale-105"
                  : "border-border/60 hover:bg-secondary/50")
              }
            >
              <span className="text-3xl">{m.emoji}</span>
              <span className="text-xs text-foreground">{m.label}</span>
              <span className="text-[10px] text-muted-foreground">{m.sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2 — pick a GNH pillar */}
      <section className="mt-6 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
        <p className="text-sm font-medium text-foreground mb-1">2. Which GNH pillar do you want to nurture today?</p>
        <p className="text-xs text-muted-foreground mb-4">The 4 pillars of Gross National Happiness.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {pillars.map((p) => (
            <button
              key={p.key}
              onClick={() => setPillar(p.key)}
              className={
                "text-left rounded-xl border p-4 transition-all " +
                (pillar === p.key
                  ? "border-primary bg-secondary"
                  : "border-border/60 hover:bg-secondary/50")
              }
            >
              <p className="text-sm font-medium text-foreground">{p.key}</p>
              <p className="text-xs text-muted-foreground mt-1">{p.tip}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Step 3 — optional note */}
      <section className="mt-6 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
        <p className="text-sm font-medium text-foreground mb-2">
          3. One small thought (optional)
        </p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={300}
          rows={3}
          placeholder="A worry, a hope, a small win from today…"
          className="w-full rounded-lg border border-border/60 bg-background p-3 text-sm text-foreground"
        />
        <p className="text-xs text-muted-foreground text-right mt-1">{note.length}/300</p>
      </section>

      <button
        onClick={handleSubmit}
        disabled={saving}
        className="mt-8 w-full rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium disabled:opacity-50"
      >
        {saving ? "Saving…" : "Send my check-in 🙏"}
      </button>
      <p className="text-center text-xs text-muted-foreground mt-3">
        Anonymous — your name is never asked or stored.
      </p>
    </main>
  );
}
