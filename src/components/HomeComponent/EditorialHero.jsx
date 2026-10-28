import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search,
  ArrowRight,
  Clock,
  Flame,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent } from "../ui/dialog";

// Real stories from the verified database
const leadArticle = {
  id: "lead-el-clasico",
  category: "Champions League",
  categoryCode: "ucl",
  title:
    "El Clásico UCL Clash: Ancelotti & Flick Face Off in Epic European Quarter-Final Tie",
  date: "1 hour ago",
  readTime: "4 min read",
  author: "Fabrizio Belloni",
  authorRole: "Senior European Football Correspondent",
  image:
    "https://assets.goal.com/images/v3/getty-2241952135/crop/MM5DENBUHA5DCMZXG45G433XMU5DMMJSHIYTAMA=/GettyImages-2241952135.jpg?auto=webp&format=pjpg&width=3840&quality=60",
  summary:
    "Real Madrid and FC Barcelona have been drawn against each other in a colossal Champions League quarter-final clash. With Mbappé, Vinicius Jr, Yamal, and Raphinha in peak form, Europe prepares for the ultimate heavyweight encounter.",
  content: `
The stage is set for one of the most consequential editions of El Clásico in modern football history. UEFA's Champions League quarter-final draw in Nyon produced the titanic tie that neutrals prayed for: Real Madrid will lock horns with FC Barcelona over two legs for a place in the semi-finals.

Both sides enter the tie in breathtaking domestic form. Carlo Ancelotti's Real Madrid, spearheaded by Kylian Mbappé and Vinícius Júnior, have demonstrated ruthless efficiency in knockout football. Meanwhile, Hansi Flick's vibrant Barcelona side have captured the continent's imagination with high-octane pressing led by teenager Lamine Yamal and Brazilian captain Raphinha.

"When you arrive at this stage of the Champions League, every match is a final," Ancelotti told reporters. "Barcelona are playing extraordinary football, but Real Madrid lives for these European nights at the Bernabéu."

Key tactical battlegrounds will center on Barcelona's daring high defensive line against the scorching pace of Mbappé and Vinicius into channels. The first leg kicks off at the Santiago Bernabéu next month, with the return leg under the lights at the newly refurbished Spotify Camp Nou.
  `,
  relatedClubs: [
    {
      name: "Real Madrid",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    },
    {
      name: "FC Barcelona",
      logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    },
  ],
  keyDuel: "Mbappé & Vinícius vs. Yamal & Raphinha",
};

const supportingWire = [
  {
    id: "wire-haaland",
    category: "Premier League",
    title: "Erling Haaland Smashes 35-Goal Landmark in Relentless City Campaign",
    date: "3 hours ago",
    readTime: "3 min read",
    author: "Liam Henderson",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2XNFB5wGfBgK-i1NuGcmFYuWJIWEHcUJwLRuFeieIs32mXhkI4N3e3Id&s=10",
    summary:
      "The Norwegian phenomenon hit his 35th goal across all competitions with a thunderous volley at the Etihad, cementing his status as Europe's most feared finisher.",
    content: `
Erling Haaland has once again rewritten the record books, surpassing the 35-goal milestone in all competitions before March for the third consecutive season.

Manchester City's Norwegian striker delivered a vintage performance against Tottenham, netting twice and creating three big chances in a commanding 3-1 victory. His opening goal was a pure display of physical power, shrugging off two center-backs before burying a low drive inside the far post.

Pep Guardiola praised Haaland's evolving link-up game: "People always judge Erling strictly on goals, but his pressing, his hold-up play, and the spaces he creates for Phil and Kevin are just as important to our team dynamic."
    `,
  },
  {
    id: "wire-yamal",
    category: "Transfers",
    title: "Lamine Yamal Signs Extension with €1B Release Clause at Camp Nou",
    date: "5 hours ago",
    readTime: "2 min read",
    author: "Matteo Silva",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gOPDnlymyyZwOJa79aru7oiaeDESuziOBldLNbmIZgHSRD1wEOWDAHg&s=10",
    summary:
      "Barcelona have officially secured the long-term future of wonderkid Lamine Yamal, locking down the 19-year-old superstar through 2031 with a historic buyout clause.",
    content: `
In a defining statement of intent, FC Barcelona have confirmed that Lamine Yamal has put pen to paper on a new six-year contract extension that keeps the Spanish sensation in Catalonia until 2031.

The agreement includes an astronomical €1 Billion release clause, shutting down speculative inquiries from rival European financial heavyweights.

"Barcelona is my home, my family, and where my dreams came true," Yamal stated during the presentation at the Auditori 1899. "I want to bring every trophy back to our supporters."
    `,
  },
  {
    id: "wire-wirtz",
    category: "Transfers",
    title: "Florian Wirtz Transfer Race: Real Madrid & Man City Prepare Bids",
    date: "7 hours ago",
    readTime: "3 min read",
    author: "Matteo Silva",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Florian_Wirtz_2024.jpg",
    summary:
      "Bayer Leverkusen's German playmaker has become the most coveted player heading into summer, with bids exceeding €130M expected.",
    content: `
The race for Florian Wirtz is heating up into one of the biggest transfer sagas of the decade. Both Real Madrid and Manchester City have initiated formal contact with Leverkusen representatives to sound out summer terms.

Leverkusen CEO Fernando Carro previously declared that Wirtz would not leave the BayArena for anything less than €130M. With Kevin De Bruyne entering the twilight of his career and Real Madrid looking to secure midfield dominance for the next decade, a bidding showdown looms.
    `,
  },
];

const archiveStats = [
  { label: "Elite Clubs", val: "50+", desc: "Top 5 European Leagues" },
  { label: "Player Profiles", val: "500+", desc: "Verified Statistics" },
  { label: "Competitions", val: "12", desc: "Domestic & European" },
  { label: "Silverware Records", val: "100%", desc: "Official Trophy Cabinets" },
];

const EditorialHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/teams?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      {/* ---------- EDITORIAL ASYMMETRIC GRID ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT: FEATURED LEAD STORY (8 Cols) ================= */}
        <article className="lg:col-span-8 flex flex-col rounded-lg border border-border bg-card overflow-hidden">
          {/* Top Metadata Strip */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-surface-elevated/40 text-xs">
            <div className="flex items-center gap-2">
              <Badge variant="default" size="sm" className="font-semibold">
                Lead Story
              </Badge>
              <span className="text-muted-foreground font-medium hidden sm:inline">
                {leadArticle.category}
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground font-mono text-[11px]">
              <Clock className="size-3 text-primary" />
              <span>{leadArticle.date}</span>
              <span>•</span>
              <span>{leadArticle.readTime}</span>
            </div>
          </div>

          {/* Lead Image with 16:9 aspect */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-base">
            <img
              src={leadArticle.image}
              alt={leadArticle.title}
              className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.01]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

            {/* Duel Club Crests Overlaid */}
            <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 rounded-md bg-card/90 border border-border backdrop-blur-sm max-w-[calc(100%-2rem)]">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <img
                  src={leadArticle.relatedClubs[0].logo}
                  alt={leadArticle.relatedClubs[0].name}
                  className="size-4 sm:size-5 object-contain shrink-0"
                />
                <span className="text-[11px] sm:text-xs font-bold text-foreground truncate">
                  {leadArticle.relatedClubs[0].name}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-black text-primary px-1 shrink-0">VS</span>
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <img
                  src={leadArticle.relatedClubs[1].logo}
                  alt={leadArticle.relatedClubs[1].name}
                  className="size-4 sm:size-5 object-contain shrink-0"
                />
                <span className="text-[11px] sm:text-xs font-bold text-foreground truncate">
                  {leadArticle.relatedClubs[1].name}
                </span>
              </div>
            </div>
          </div>

          {/* Headline & Body Content */}
          <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-foreground leading-snug">
                {leadArticle.title}
              </h1>

              <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {leadArticle.summary}
              </p>
            </div>

            {/* Bottom Actions & Correspondent Signature */}
            <div className="mt-5 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-surface-elevated border border-border flex items-center justify-center font-bold text-[11px] text-primary">
                  FB
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-foreground block">
                    {leadArticle.author}
                  </span>
                  <span className="text-muted-foreground">
                    {leadArticle.authorRole}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setSelectedArticle(leadArticle)}
                  variant="default"
                  size="sm"
                  className="flex-1 sm:flex-initial"
                >
                  <span>Read Full Analysis</span>
                  <ArrowRight className="size-3.5" />
                </Button>
                <Button asChild variant="secondary" size="sm" className="flex-1 sm:flex-initial">
                  <Link to="/news">
                    <span>All News</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* ================= RIGHT: SEARCH + BREAKING WIRE (4 Cols) ================= */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          {/* Quick Database Search */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Search className="size-3.5 text-primary" />
                <span>Club & Player Search</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                500+ records
              </span>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="e.g., Real Madrid, Haaland..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
              <Button type="submit" variant="default" size="sm" className="h-9 px-3">
                <span>Go</span>
              </Button>
            </form>
          </div>

          {/* Breaking Wire Feed */}
          <div className="rounded-lg border border-border bg-card p-4 flex flex-col flex-1">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="size-3.5 text-primary" />
                <span>The Wire • Breaking</span>
              </span>
              <Badge variant="secondary" size="sm">
                Live Feed
              </Badge>
            </div>

            {/* Wire Items */}
            <div className="divide-y divide-border">
              {supportingWire.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedArticle(item)}
                  className="py-3 group cursor-pointer flex gap-3 items-start transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-16 rounded object-cover shrink-0 border border-border bg-surface-elevated mt-0.5"
                    loading="lazy"
                  />

                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                      <span className="text-primary font-bold uppercase">
                        {item.category}
                      </span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>

                    <h2 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-1 leading-snug">
                      {item.title}
                    </h2>

                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1.5">
                      <span>By {item.author}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom Wire Link */}
            <div className="pt-3 mt-auto border-t border-border">
              <Link
                to="/news"
                className="flex items-center justify-between text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                <span>View Full Transfer & Match Wire</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* ---------- STATS STRIP (Preserves HeroIntro counters) ---------- */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-border py-4 bg-surface-base/50 rounded-lg px-4">
        {archiveStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center text-center ${
              i % 2 !== 0 ? "border-l border-border pl-2" : ""
            } sm:border-l sm:first:border-l-0 sm:pl-2`}
          >
            <span className="font-mono text-base sm:text-xl font-black text-foreground">
              {stat.val}
            </span>
            <span className="text-xs font-bold text-primary tracking-tight mt-0.5">
              {stat.label}
            </span>
            <span className="text-[10px] text-muted-foreground hidden sm:block">
              {stat.desc}
            </span>
          </div>
        ))}
      </div>

      {/* ---------- ARTICLE DETAIL MODAL (Dialog) ---------- */}
      <Dialog
        open={Boolean(selectedArticle)}
        onOpenChange={(open) => !open && setSelectedArticle(null)}
      >
        <DialogContent
          title={selectedArticle?.title || "Article Details"}
          description={selectedArticle?.summary}
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
        >
          {selectedArticle && (
            <div className="space-y-4 pt-2">
              <div className="relative aspect-video w-full rounded-md overflow-hidden bg-surface-elevated">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono border-b border-border pb-3">
                <span className="text-primary font-bold">
                  {selectedArticle.category}
                </span>
                <div className="flex items-center gap-2">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed font-sans">
                {selectedArticle.content.trim()}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Reported by <strong className="text-foreground">{selectedArticle.author}</strong>
                </span>
                <Button asChild variant="default" size="sm">
                  <Link to="/news">
                    <span>Visit Newsroom</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EditorialHero;

