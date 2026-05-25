import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/festivals")({
  component: PrayerWheelPage,
  head: () => ({
    meta: [
      { title: "Prayer Wheel · Drukgai" },
      { name: "description", content: "Spin the prayer wheel for a Bhutanese blessing — wisdom from the mountains for your path ahead." },
    ],
  }),
});

type Blessing = {
  dz: string;
  en: string;
  meaning: string;
  emoji: string;
};

const BLESSINGS: Blessing[] = [
  { dz: "ལམ་ཡག་པོ་འགྲོ", en: "Lam yagpo dro", meaning: "May your path be good. Trust the next small step — even when the valley is full of mist.", emoji: "🏔️" },
  { dz: "བསམ་པ་འགྲུབ་ཤོག", en: "Sampa drub shog", meaning: "May your wishes ripen. What you water with patience becomes a forest.", emoji: "🌲" },
  { dz: "ཤེས་རབ་སྐྱེ", en: "Sherab kye", meaning: "May wisdom be born in you. The wise yak knows which slope to climb.", emoji: "🐃" },
  { dz: "སྙིང་སྟོབས་ལྡན", en: "Nying-tob den", meaning: "May you have courage. The dragon does not roar — it simply flies.", emoji: "🐉" },
  { dz: "འཁོར་བ་སྐྱིད", en: "Khorwa kyi", meaning: "May your journey be joyful. The road home is also the road forward.", emoji: "🛤️" },
  { dz: "ཆོས་ཀྱི་སྒྲོན་མེ", en: "Chö kyi drönme", meaning: "Be a lamp of dharma. One honest student lights a whole dzongkhag.", emoji: "🪔" },
  { dz: "བཟོད་པ་སྒོམ", en: "Zöpa gom", meaning: "Cultivate patience. Rice does not ripen because you shout at it.", emoji: "🌾" },
  { dz: "རང་ལུགས་སྲུང", en: "Rang-lug sung", meaning: "Honor your own way. A borrowed gho never quite fits.", emoji: "👘" },
  { dz: "བརྩེ་བ་ཆེན་པོ", en: "Tsewa chenpo", meaning: "Great kindness. Begin with your aama, your friend, the stray dog at the door.", emoji: "🤍" },
  { dz: "དུས་ལ་བབ", en: "Dü la bab", meaning: "The time has come. The crane does not ask permission to migrate.", emoji: "🕊️" },
  { dz: "ངོ་ཚ་མེད", en: "Ngo-tsha med", meaning: "Without shame. Ask the question. Apply for the thing. Send the message.", emoji: "✉️" },
  { dz: "ལས་འབྲས", en: "Lé-dré", meaning: "Cause and fruit. Every honest hour studying is a seed you will eat from later.", emoji: "🌱" },
];

function PrayerWheelPage() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [blessing, setBlessing] = useState<Blessing | null>(null);
  const [count, setCount] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setBlessing(null);
    const extra = 1440 + Math.floor(Math.random() * 720);
    setRotation((r) => r + extra);
    setTimeout(() => {
      const pick = BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)];
      setBlessing(pick);
      setSpinning(false);
      setCount((c) => c + 1);
    }, 2400);
  };

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-12">
        <header className="mb-10 text-center">
          <p className="font-display text-sm text-primary tracking-wider uppercase">མ་ཎི་འཁོར་ལོ · Mani Khorlo</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mt-2">Spin the Prayer Wheel</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            In every Bhutanese village, prayer wheels turn — sending blessings into the wind.
            Spin yours for a wisdom whisper to carry through the day.
          </p>
        </header>

        <div className="flex flex-col items-center gap-8">
          <button
            onClick={spin}
            disabled={spinning}
            aria-label="Spin the prayer wheel"
            className="group relative outline-none"
          >
            <div
              className="size-56 md:size-72 rounded-full grid place-items-center shadow-soft border-4 border-primary/30 bg-gradient-to-br from-primary/20 via-warm/30 to-primary/10 transition-transform ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: spinning ? "2400ms" : "0ms",
              }}
            >
              <div className="absolute inset-3 rounded-full border-2 border-dashed border-primary/40" />
              <div className="absolute inset-0 grid place-items-center">
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <span
                    key={i}
                    className="absolute font-display text-2xl text-primary"
                    style={{
                      transform: `rotate(${deg}deg) translateY(-90px) md:translateY(-110px)`,
                    }}
                  >
                    ༀ
                  </span>
                ))}
              </div>
              <span className="font-display text-5xl md:text-6xl text-foreground relative z-10">
                ཨོཾ
              </span>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-display group-hover:scale-105 group-active:scale-95 transition disabled:opacity-60">
              {spinning ? "Turning..." : blessing ? "Spin again" : "Tap to spin"}
            </div>
          </button>

          {count > 0 && (
            <p className="text-xs text-muted-foreground">
              You've sent {count} blessing{count === 1 ? "" : "s"} into the wind 🌬️
            </p>
          )}

          {blessing && !spinning && (
            <article className="w-full max-w-xl rounded-2xl border border-primary/30 bg-card p-8 shadow-soft animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-5xl text-center mb-3">{blessing.emoji}</div>
              <p className="font-display text-3xl text-center text-foreground">{blessing.dz}</p>
              <p className="text-center text-sm text-muted-foreground italic mt-1">{blessing.en}</p>
              <div className="prayer-flags h-px w-2/3 mx-auto my-5 opacity-70" />
              <p className="text-center text-foreground/85 leading-relaxed">{blessing.meaning}</p>
            </article>
          )}
        </div>

        <section className="mt-16 rounded-2xl border border-border/60 bg-secondary/40 p-8 text-center relative overflow-hidden">
          <div className="prayer-flags h-1 w-full absolute top-0 left-0" />
          <p className="font-display text-2xl text-foreground">ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ</p>
          <p className="mt-2 text-sm text-muted-foreground">Om Mani Padme Hum</p>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
            Each spin is a small act of generosity — for yourself, your classmates, your aama and apa
            waiting for news of what you'll choose next.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
