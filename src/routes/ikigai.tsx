import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/ikigai")({
  head: () => ({
    meta: [
      { title: "Find Your Ikigai — Drukgai" },
      { name: "description", content: "Reflect on four simple questions to discover your ikigai — what you love, what you're good at, what the world needs, and what you can earn from." },
      { property: "og:title", content: "Find Your Ikigai" },
      { property: "og:description", content: "A reflection space for Class 12 students." },
    ],
  }),
  component: IkigaiPage,
});

type Key = "love" | "good" | "world" | "pay";
const fields: { key: Key; label: string; prompt: string; placeholder: string; color: string }[] = [
  { key: "love",  label: "What you LOVE",         prompt: "Activities that make you lose track of time.", placeholder: "drawing, helping friends, football, coding…", color: "bg-saffron/15 border-saffron/40" },
  { key: "good",  label: "What you're GOOD at",    prompt: "Skills people compliment you on.",             placeholder: "math, listening, organising, languages…",      color: "bg-gold/20 border-gold/50" },
  { key: "world", label: "What the WORLD needs",   prompt: "Problems in Bhutan or beyond you'd love to fix.", placeholder: "mental health, farming, education access…",  color: "bg-jade/15 border-jade/40" },
  { key: "pay",   label: "What can PAY you",       prompt: "Work people are willing to pay for.",          placeholder: "tourism, software, teaching, civil service…",  color: "bg-sky/15 border-sky/40" },
];

export function IkigaiPage() {
  const [v, setV] = useState<Record<Key, string>>({ love: "", good: "", world: "", pay: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const filled = useMemo(() => Object.values(v).filter((x) => x.trim().length > 2).length, [v]);

  const save = async () => {
    if (filled < 4 || saving) return;
    setSaving(true);
    const { error } = await supabase.from("ikigai_reflections").insert({
      love: v.love.trim(), good: v.good.trim(), world: v.world.trim(), pay: v.pay.trim(),
    });
    setSaving(false);
    if (error) { toast.error("Couldn't save — try again."); return; }
    setSaved(true);
    toast.success("Reflection saved.");
  };

  const insight = useMemo(() => {
    if (filled < 4) return null;
    return [
      { title: "Passion", a: "love", b: "good", text: "Where what you love meets what you're good at." },
      { title: "Mission", a: "love", b: "world", text: "Where your love meets the world's needs." },
      { title: "Vocation", a: "world", b: "pay", text: "Where the world's needs meet what pays." },
      { title: "Profession", a: "good", b: "pay", text: "Where your skill meets what pays." },
    ];
  }, [filled]);

  return (
    <div className="bg-hero">
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <p className="text-sm tracking-widest uppercase text-primary font-medium">生き甲斐</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Find your ikigai.</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Take a breath. Answer honestly — there are no right answers. Even messy thoughts count.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {fields.map((f) => (
            <label key={f.key} className={`rounded-2xl border-2 ${f.color} bg-card/70 backdrop-blur p-6 transition focus-within:shadow-glow`}>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl">{f.label}</span>
                {v[f.key].trim().length > 2 && <span className="text-xs text-jade font-medium">✓ saved</span>}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{f.prompt}</p>
              <textarea
                value={v[f.key]}
                onChange={(e) => setV({ ...v, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                rows={3}
                className="mt-3 w-full rounded-lg border border-border bg-background/60 p-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </label>
          ))}
        </div>

        <div className="mt-8 h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-warm transition-all" style={{ width: `${(filled / 4) * 100}%` }} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{filled}/4 reflections filled</p>

        {insight && (
          <div className="mt-14">
            <h2 className="font-display text-3xl">Your overlaps</h2>
            <p className="text-muted-foreground mt-2">Look at the words you wrote. What pairs together?</p>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {insight.map((i) => (
                <div key={i.title} className="rounded-2xl bg-card border border-border p-6 shadow-soft">
                  <p className="text-xs tracking-widest uppercase text-primary font-medium">{i.title}</p>
                  <p className="mt-2 text-foreground">{i.text}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <Snippet label={fields.find(f => f.key === i.a)!.label} value={v[i.a as Key]} />
                    <Snippet label={fields.find(f => f.key === i.b)!.label} value={v[i.b as Key]} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-3xl bg-warm p-8 md:p-10 text-primary-foreground shadow-glow">
              <p className="font-display text-2xl md:text-3xl leading-snug">
                Your ikigai isn't a label you discover once. It's something you keep listening for.
              </p>
              <p className="mt-3 opacity-90">Save your reflections somewhere safe. Come back to them in a month.</p>
              <button
                onClick={save}
                disabled={saving || saved}
                className="mt-6 rounded-full bg-background text-foreground px-6 py-3 font-medium disabled:opacity-60 hover:opacity-90 transition"
              >
                {saved ? "✓ Saved to Drukgai" : saving ? "Saving…" : "Save my reflection"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Snippet({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/60 p-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 line-clamp-3 text-foreground/90">{value || "—"}</p>
    </div>
  );
}
