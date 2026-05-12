// Druk Stories — a wall where Bhutanese students share their journey
// after Class 12. Frontend (React form + list) + Backend (Lovable Cloud)
// in one file so it's easy to follow.

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Druk Stories — Drukgai" },
      { name: "description", content: "Real journeys from Bhutanese Class 12 students. Share yours, read others'." },
    ],
  }),
  component: StoriesPage,
});

// All 20 Dzongkhags of Bhutan.
const dzongkhags = [
  "Bumthang", "Chhukha", "Dagana", "Gasa", "Haa",
  "Lhuentse", "Mongar", "Paro", "Pemagatshel", "Punakha",
  "Samdrup Jongkhar", "Samtse", "Sarpang", "Thimphu", "Trashigang",
  "Trashiyangtse", "Trongsa", "Tsirang", "Wangdue Phodrang", "Zhemgang",
];

// Common paths a Bhutanese Class 12 graduate may take.
const statuses = [
  "Studying at RUB college",
  "Studying abroad",
  "Preparing for BCSE / RCSC",
  "Working in private sector",
  "In monastic studies",
  "Helping family / farming",
  "Job seeking",
  "Still deciding",
];

type Story = {
  id: string;
  name: string;
  dzongkhag: string;
  status: string;
  story: string;
  advice: string;
  created_at: string;
};

function StoriesPage() {
  // Form state
  const [name, setName] = useState("");
  const [dzongkhag, setDzongkhag] = useState("");
  const [status, setStatus] = useState("");
  const [story, setStory] = useState("");
  const [advice, setAdvice] = useState("");
  const [posting, setPosting] = useState(false);

  // List state
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all stories from the database when the page opens.
  async function loadStories() {
    setLoading(true);
    const { data, error } = await supabase
      .from("druk_stories")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setLoading(false);
    if (error) {
      toast.error("Could not load stories.");
      return;
    }
    setStories((data || []) as Story[]);
  }

  useEffect(() => {
    loadStories();
  }, []);

  // Post a new story to the database.
  async function postStory() {
    if (posting) return;

    // Simple checks (the database also checks lengths).
    if (name.trim().length < 1) { toast.error("Please add a name (or nickname)."); return; }
    if (dzongkhag === "") { toast.error("Please pick your Dzongkhag."); return; }
    if (status === "") { toast.error("Please pick what you are doing now."); return; }
    if (story.trim().length < 10) { toast.error("Please write a few words about your journey."); return; }
    if (advice.trim().length < 5) { toast.error("Please share one piece of advice."); return; }

    setPosting(true);
    const { error } = await supabase.from("druk_stories").insert({
      name: name.trim(),
      dzongkhag: dzongkhag,
      status: status,
      story: story.trim(),
      advice: advice.trim(),
    });
    setPosting(false);

    if (error) {
      toast.error("Could not post your story.");
      return;
    }

    toast.success("Kadrinche! Your story is on the wall.");
    // Reset the form and reload the list.
    setName("");
    setDzongkhag("");
    setStatus("");
    setStory("");
    setAdvice("");
    loadStories();
  }

  return (
    <div className="bg-hero">
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">
          Druk Stories · འབྲུག་གི་གཏམ་རྒྱུད
        </p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">You are not alone on this path.</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Real notes from Bhutanese students who finished Class 12 — what they're doing now,
          and one thing they wish someone had told them.
        </p>

        {/* ---------- Post a story ---------- */}
        <section className="mt-12 rounded-3xl bg-card border border-border p-7 md:p-9 shadow-soft">
          <h2 className="font-display text-2xl md:text-3xl">Share your journey</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Anonymous is fine — use a nickname. Be kind, be honest.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Field label="Name or nickname">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tashi, or Druk Lover"
                maxLength={40}
                className="w-full rounded-lg border border-border bg-background p-3"
              />
            </Field>

            <Field label="Your Dzongkhag">
              <select
                value={dzongkhag}
                onChange={(e) => setDzongkhag(e.target.value)}
                className="w-full rounded-lg border border-border bg-background p-3"
              >
                <option value="">— Select —</option>
                {dzongkhags.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>

            <Field label="What are you doing now?">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-border bg-background p-3"
              >
                <option value="">— Select —</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Your story (a few sentences)">
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="What happened after Class 12? What was hard, what helped?"
                rows={4}
                maxLength={600}
                className="w-full rounded-lg border border-border bg-background p-3 resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">{story.length} / 600</p>
            </Field>
          </div>

          <div className="mt-4">
            <Field label="One piece of advice for a junior">
              <input
                type="text"
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                placeholder="e.g. Don't be afraid to ask elders. They want to help."
                maxLength={200}
                className="w-full rounded-lg border border-border bg-background p-3"
              />
            </Field>
          </div>

          <button
            onClick={postStory}
            disabled={posting}
            className="mt-6 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium disabled:opacity-60 hover:opacity-90"
          >
            {posting ? "Posting…" : "Post my story"}
          </button>
        </section>

        {/* ---------- Read the wall ---------- */}
        <section className="mt-14">
          <h2 className="font-display text-3xl">From the wall</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? "Loading…" : `${stories.length} ${stories.length === 1 ? "story" : "stories"} so far`}
          </p>

          {!loading && stories.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No stories yet. Be the first — your words may help a junior in another Dzongkhag.
            </div>
          )}

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {stories.map((s) => (
              <article key={s.id} className="rounded-2xl bg-card border border-border p-6 shadow-soft relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 prayer-flags h-1" />
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-xl text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.dzongkhag}</p>
                </div>
                <p className="text-xs uppercase tracking-wider text-primary font-medium mt-1">
                  {s.status}
                </p>
                <p className="mt-4 text-foreground/85 leading-relaxed whitespace-pre-line">
                  {s.story}
                </p>
                <div className="mt-5 rounded-xl bg-secondary/60 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Advice</p>
                  <p className="mt-1 text-foreground italic">"{s.advice}"</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}
