import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/festivals")({
  component: FestivalsPage,
  head: () => ({
    meta: [
      { title: "Tshechu Calendar · Drukgai" },
      { name: "description", content: "Bhutanese festivals through the year — moments to pause, reflect, and reset on your path." },
    ],
  }),
});

type Festival = {
  name: string;
  dz: string;
  month: string;
  dzongkhag: string;
  blessing: string;
  vibe: string;
};

const FESTIVALS: Festival[] = [
  { name: "Punakha Drubchen & Tshechu", dz: "སྤུ་ན་ཁ་གྲུབ་ཆེན", month: "Feb – Mar", dzongkhag: "Punakha", blessing: "Courage to face new beginnings.", vibe: "warriors" },
  { name: "Paro Tshechu", dz: "སྤ་གྲོ་ཚེས་བཅུ", month: "March – April", dzongkhag: "Paro", blessing: "Clarity in the year ahead.", vibe: "thongdrel" },
  { name: "Rhododendron Festival", dz: "ཨེ་ཏོ་མེ་ཏོག", month: "April", dzongkhag: "Lamperi", blessing: "Bloom in your own time.", vibe: "spring" },
  { name: "Nimalung Tshechu", dz: "ཉི་མ་ལུང", month: "June", dzongkhag: "Bumthang", blessing: "Patience builds quiet strength.", vibe: "highland" },
  { name: "Haa Summer Festival", dz: "ཧཱ་དབྱར་དུས", month: "July", dzongkhag: "Haa", blessing: "Simplicity is a kind of wealth.", vibe: "valley" },
  { name: "Matsutake Mushroom Festival", dz: "ཤ་མོང", month: "August", dzongkhag: "Ura, Bumthang", blessing: "What you seek is already growing nearby.", vibe: "forest" },
  { name: "Thimphu Tshechu", dz: "ཐིམ་ཕུག་ཚེས་བཅུ", month: "September – October", dzongkhag: "Thimphu", blessing: "Dance through what scares you.", vibe: "masks" },
  { name: "Jambay Lhakhang Drup", dz: "བྱམས་པ་ལྷ་ཁང", month: "October – November", dzongkhag: "Bumthang", blessing: "Light a lamp for the road ahead.", vibe: "fire" },
  { name: "Black-Necked Crane Festival", dz: "བྱ་ཐུང་ཐུང་ནག་པོ", month: "November 11", dzongkhag: "Phobjikha", blessing: "Migrate when the season calls.", vibe: "crane" },
  { name: "Druk Wangyel Tshechu", dz: "འབྲུག་དབང་རྒྱལ", month: "December 13", dzongkhag: "Dochula", blessing: "Look back with gratitude. Walk forward.", vibe: "passes" },
];

function FestivalsPage() {
  const now = new Date().getMonth();
  const monthMap: Record<number, string[]> = {
    0: ["Feb"], 1: ["Feb"], 2: ["March"], 3: ["April"], 4: ["April"],
    5: ["June"], 6: ["July"], 7: ["August"], 8: ["September"],
    9: ["October"], 10: ["November"], 11: ["December"],
  };
  const upcoming = (f: Festival) => (monthMap[now] ?? []).some((m) => f.month.includes(m));

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-12">
        <header className="mb-10">
          <p className="font-display text-sm text-primary tracking-wider uppercase">Tshechu · ཚེས་བཅུ</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mt-2">A year of pauses</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            In Bhutan, time isn't a straight line — it loops through tshechus, harvests, and crane migrations.
            Each festival is a chance to stop, breathe, and ask: <em>am I still walking the path I chose?</em>
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {FESTIVALS.map((f) => (
            <article
              key={f.name}
              className={`relative rounded-2xl border p-6 shadow-soft transition hover:shadow-lg ${
                upcoming(f)
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/60 bg-card"
              }`}
            >
              {upcoming(f) && (
                <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground">
                  This month
                </span>
              )}
              <p className="font-display text-2xl text-foreground">{f.name}</p>
              <p className="text-muted-foreground text-sm mt-1">{f.dz}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-secondary text-foreground/70">{f.month}</span>
                <span className="px-2 py-1 rounded-full bg-secondary text-foreground/70">{f.dzongkhag}</span>
              </div>
              <blockquote className="mt-4 pl-4 border-l-2 border-primary/40 italic text-foreground/85">
                "{f.blessing}"
              </blockquote>
            </article>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-border/60 bg-secondary/40 p-8 text-center overflow-hidden relative">
          <div className="prayer-flags h-1 w-full absolute top-0 left-0" />
          <p className="font-display text-2xl text-foreground">A blessing for the road</p>
          <p className="mt-3 max-w-2xl mx-auto text-foreground/80">
            ཀུན་ལ་བདེ་སྐྱིད་ཕུན་སུམ་ཚོགས་པར་ཤོག · May all beings be happy and at ease.
            Whichever path you choose after Class 12 — engineer, monk, farmer, designer, dzongkhag officer —
            walk it like you'd walk a tshechu: with care, with company, and with your whole heart.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
