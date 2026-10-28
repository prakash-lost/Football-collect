import React, { useState, useMemo } from "react";
import {
  Newspaper,
  Search,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  Trophy,
  ArrowRightLeft,
  CheckCircle2,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { EmptyState } from "../components/ui/empty-state";
import { Dialog, DialogContent } from "../components/ui/dialog";

const newsArticles = [
  {
    id: "news-1",
    featured: true,
    title: "El Clásico UCL Clash: Ancelotti & Flick Face Off in Epic European Quarter-Final Tie",
    category: "Champions League",
    categoryCode: "ucl",
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
    relatedClub: "Real Madrid & Barcelona",
    tags: ["UCL", "El Clasico", "Mbappe", "Yamal", "Real Madrid", "Barcelona"],
  },
  {
    id: "news-2",
    featured: false,
    title: "Erling Haaland Smashes 35-Goal Landmark in Relentless City Title Campaign",
    category: "Premier League",
    categoryCode: "epl",
    date: "3 hours ago",
    readTime: "3 min read",
    author: "Liam Henderson",
    authorRole: "Chief Premier League Reporter",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2XNFB5wGfBgK-i1NuGcmFYuWJIWEHcUJwLRuFeieIs32mXhkI4N3e3Id&s=10",
    summary:
      "The Norwegian phenomenon hit his 35th goal across all competitions with a thunderous left-foot volley at the Etihad, cementing his status as Europe's most feared finisher.",
    content: `
Erling Haaland has once again rewritten the record books, surpassing the 35-goal milestone in all competitions before March for the third consecutive season.

Manchester City's Norwegian striker delivered a vintage performance against Tottenham, netting twice and creating three big chances in a commanding 3-1 victory. His opening goal was a pure display of physical power, shrugging off two center-backs before burying a low drive inside the far post.

Pep Guardiola praised Haaland's evolving link-up game: "People always judge Erling strictly on goals, but his pressing, his hold-up play, and the spaces he creates for Phil and Kevin are just as important to our team dynamic."
    `,
    relatedClub: "Manchester City",
    tags: ["Haaland", "Man City", "Premier League", "Golden Boot"],
  },
  {
    id: "news-3",
    featured: false,
    title: "Lamine Yamal Signs Long-Term Extension with €1B Release Clause at Camp Nou",
    category: "Transfers",
    categoryCode: "transfer",
    date: "5 hours ago",
    readTime: "2 min read",
    author: "Matteo Silva",
    authorRole: "Transfer Insider",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gOPDnlymyyZwOJa79aru7oiaeDESuziOBldLNbmIZgHSRD1wEOWDAHg&s=10",
    summary:
      "Barcelona have officially secured the long-term future of wonderkid Lamine Yamal, locking down the 19-year-old superstar through 2031 with a historic buyout clause.",
    content: `
In a defining statement of intent, FC Barcelona have confirmed that Lamine Yamal has put pen to paper on a new six-year contract extension that keeps the Spanish sensation in Catalonia until 2031.

The agreement includes an astronomical €1 Billion release clause, shutting down speculative inquiries from rival European financial heavyweights.

"Barcelona is my home, my family, and where my dreams came true," Yamal stated during the presentation at the Auditori 1899. "I want to bring every trophy back to our supporters."
    `,
    relatedClub: "FC Barcelona",
    tags: ["Yamal", "Barcelona", "Contract Extension", "La Liga"],
  },
  {
    id: "news-4",
    featured: false,
    title: "Florian Wirtz Transfer Race: Real Madrid & Man City Prepare Record Bids",
    category: "Transfers",
    categoryCode: "transfer",
    date: "7 hours ago",
    readTime: "3 min read",
    author: "Matteo Silva",
    authorRole: "Transfer Insider",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Florian_Wirtz_2024.jpg",
    summary:
      "Bayer Leverkusen's German playmaker has become the most coveted player heading into the summer window, with bids exceeding €130M expected from across the continent.",
    content: `
The race for Florian Wirtz is heating up into one of the biggest transfer sagas of the decade. Both Real Madrid and Manchester City have initiated formal contact with Leverkusen representatives to sound out summer terms.

Leverkusen CEO Fernando Carro previously declared that Wirtz would not leave the BayArena for anything less than €130M. With Kevin De Bruyne entering the twilight of his career and Real Madrid looking to secure midfield dominance for the next decade, a bidding showdown looms.
    `,
    relatedClub: "Bayer Leverkusen",
    tags: ["Wirtz", "Transfers", "Leverkusen", "Real Madrid", "Man City"],
  },
  {
    id: "news-5",
    featured: false,
    title: "Liverpool's Title Machine: How Arne Slot's High Press Revitalized Anfield",
    category: "Tactics",
    categoryCode: "tactics",
    date: "12 hours ago",
    readTime: "5 min read",
    author: "Jonathan Pierce",
    authorRole: "Senior Tactical Analyst",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Mohamed_Salah_2018.jpg",
    summary:
      "Detailed tactical breakdown of Liverpool's league-leading season: controlling midfield transitions, Salah's creative playmaking, and Virgil van Dijk's imperious form.",
    content: `
When Arne Slot arrived on Merseyside, the challenge of succeeding Jürgen Klopp seemed monumental. Yet eight months into his tenure, Liverpool sit atop the Premier League table with the lowest goals-conceded tally in Europe's top 5 leagues.

Tactical metrics reveal a fascinating shift: Liverpool are pressing with slightly deeper triggers, drawing opposition midfields forward before executing lethal vertical passes into Mohamed Salah and Luis Díaz. 

With Ryan Gravenberch anchoring the pivot and Virgil van Dijk reading counter-attacks with unmatched anticipation, the Reds are playing with an ominous aura of control.
    `,
    relatedClub: "Liverpool",
    tags: ["Liverpool", "Arne Slot", "Tactics", "Salah", "Van Dijk"],
    tacticalPhases: [
      { phase: "Defensive Shape", detail: "Mid-block 4-2-3-1 pressing trigger keyed to opposition full-back reception." },
      { phase: "Transition", detail: "Vertical direct balls into half-spaces targeting Salah and Díaz." },
      { phase: "Midfield Anchor", detail: "Gravenberch leading Europe in progressive carries through central channels." },
    ],
  },
  {
    id: "news-6",
    featured: false,
    title: "Kylian Mbappé Scores Stunning Hat-Trick in 4-1 Bernabéu Masterclass",
    category: "La Liga",
    categoryCode: "laliga",
    date: "14 hours ago",
    readTime: "3 min read",
    author: "Fabrizio Belloni",
    authorRole: "Senior European Football Correspondent",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRin_hXretTz2zqtgry2DU4Si6CuPGzHuyczMphM_25vzVmua5anta5ASA&s=10",
    summary:
      "Mbappé dazzled the Santiago Bernabéu with a breathtaking 22-minute hat-trick as Los Blancos maintained their relentless pursuit of another La Liga crown.",
    content: `
Kylian Mbappé silenced any lingering skeptics with an irresistible display of attacking royalty against Sevilla, netting three goals in just twenty-two minutes.

His first was a blistering sprint that left the defense helpless before clipping the ball over the goalkeeper; his second, a curled strike from outside the box into the top corner; and his third, an ice-cold penalty sent into the roof of the net.

The French captain now leads the European Golden Shoe race alongside Erling Haaland and Harry Kane.
    `,
    relatedClub: "Real Madrid",
    tags: ["Mbappe", "Real Madrid", "La Liga", "Hat-Trick"],
  },
  {
    id: "news-7",
    featured: false,
    title: "The Cole Palmer Blueprint: Decoding Maresca's Inverted Playmaker at Chelsea",
    category: "Tactics",
    categoryCode: "tactics",
    date: "1 day ago",
    readTime: "4 min read",
    author: "Jonathan Pierce",
    authorRole: "Senior Tactical Analyst",
    image:
      "https://i.pinimg.com/736x/87/0c/33/870c33a3915bc5c9ae1994e098a5840d.jpg",
    summary:
      "Statistical analysis of Cole Palmer's role as Chelsea's primary attacking orchestrator, creating 3.4 chances per 90 from the right half-space.",
    content: `
Cole Palmer has cemented himself as the Premier League's most versatile attacking playmaker. Operating nominally on the right flank, Palmer routinely drifts inside into zone 14 to exploit the gaps between opponent central midfields and defensive lines.

Under Enzo Maresca, Palmer's creative responsibilities have expanded. With inverted full-backs tucking inside to provide defensive rest, Palmer is given complete freedom to dictate passing tempo, take set pieces, and unlock low blocks with disguised through-balls.
    `,
    relatedClub: "Chelsea",
    tags: ["Cole Palmer", "Chelsea", "Premier League", "Tactics"],
    tacticalPhases: [
      { phase: "Positioning", detail: "Inverted right winger with free roaming license across zone 14." },
      { phase: "Chance Creation", detail: "3.4 big chances created per 90 minutes; 88% passing accuracy in final third." },
      { phase: "Rest Defense", detail: "Supported by inverted left-back Cucurella occupying central midfield pivot." },
    ],
  },
  {
    id: "news-8",
    featured: false,
    title: "Harry Kane Reaches 30 Bundesliga Goals as Bayern Crush Frankfurt 3-0",
    category: "Bundesliga",
    categoryCode: "bundesliga",
    date: "1 day ago",
    readTime: "2 min read",
    author: "Liam Henderson",
    authorRole: "Chief European Reporter",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
    summary:
      "The England captain reached the 30-goal milestone in just 24 league outings, driving Bayern Munich back to the summit of German football.",
    content: `
Harry Kane continues to turn the Bundesliga into his personal playground. The Bayern Munich center-forward scored two headers in a 3-0 rout of Frankfurt, reaching 30 league goals faster than any debut or sophomore player in German football history.

Kane's synergy with Jamal Musiala and Michael Olise has given Bayern an irresistible attacking punch as they target both the Meisterschale and the Champions League trophy.
    `,
    relatedClub: "Bayern Munich",
    tags: ["Kane", "Bayern Munich", "Bundesliga", "Top Scorer"],
  },
  {
    id: "news-9",
    featured: false,
    title: "Derby della Madonnina: Lautaro Brace Inspires Inter to Thrilling Milan Derby Win",
    category: "Serie A",
    categoryCode: "seriea",
    date: "2 days ago",
    readTime: "3 min read",
    author: "Fabrizio Belloni",
    authorRole: "Senior European Football Correspondent",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/23/Lautaro_Mart%C3%ADnez_2024.jpg",
    summary:
      "San Siro erupted as Inter Milan claimed local bragging rights over fierce rivals AC Milan, fueled by two instinctive finishes from captain Lautaro Martínez.",
    content: `
The 240th Derby della Madonnina lived up to its legendary reputation. In front of 75,000 impassioned fans at the San Siro, Inter Milan claimed a crucial 2-1 victory over AC Milan to tighten their grip on the Scudetto race.

Lautaro Martínez proved the decisive factor, heading home an in-swinging corner before sliding home a 78th-minute winner after a sweeping team counter-attack.
    `,
    relatedClub: "Inter Milan",
    tags: ["Inter Milan", "AC Milan", "Serie A", "Lautaro Martinez"],
  },
];

// Structured transfer desk records with confirmed vs rumored differentiation
const transferRadar = [
  {
    id: "tr-1",
    status: "confirmed",
    statusLabel: "Official Extension",
    player: "Lamine Yamal",
    position: "Right Winger",
    age: 19,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gOPDnlymyyZwOJa79aru7oiaeDESuziOBldLNbmIZgHSRD1wEOWDAHg&s=10",
    fromClub: "FC Barcelona",
    toClub: "FC Barcelona",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    dealType: "Contract Extension",
    fee: "€1.0B Release Clause",
    contract: "June 2031",
    date: "5 hours ago",
    articleId: "news-3",
  },
  {
    id: "tr-2",
    status: "confirmed",
    statusLabel: "Official Signing",
    player: "Kylian Mbappé",
    position: "Striker",
    age: 26,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRin_hXretTz2zqtgry2DU4Si6CuPGzHuyczMphM_25vzVmua5anta5ASA&s=10",
    fromClub: "Paris Saint-Germain",
    toClub: "Real Madrid",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    dealType: "Free Transfer",
    fee: "Free (Signing Bonus)",
    contract: "June 2029",
    date: "Official",
    articleId: "news-6",
  },
  {
    id: "tr-3",
    status: "rumored",
    statusLabel: "Active Bidding War",
    player: "Florian Wirtz",
    position: "Attacking Midfielder",
    age: 22,
    photo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Florian_Wirtz_2024.jpg",
    fromClub: "Bayer Leverkusen",
    toClub: "Real Madrid / Man City",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg",
    dealType: "Summer Window Target",
    fee: "€130M Asking Price",
    contract: "Expected 2030",
    date: "7 hours ago",
    articleId: "news-4",
  },
  {
    id: "tr-4",
    status: "rumored",
    statusLabel: "Contract Negotiation",
    player: "Trent Alexander-Arnold",
    position: "Right Back",
    age: 26,
    photo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    fromClub: "Liverpool",
    toClub: "Real Madrid",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    dealType: "Free Agent Pursuit",
    fee: "Pre-Contract Talk",
    contract: "Pending",
    date: "1 day ago",
    articleId: "news-1",
  },
];

const categoryTabs = [
  { id: "all", name: "All Stories", icon: Newspaper },
  { id: "Transfers", name: "Transfer Radar 🔄", icon: ArrowRightLeft },
  { id: "Tactics", name: "Tactics & Analysis 📊", icon: BarChart3 },
  { id: "Champions League", name: "Champions League 🏆", icon: Trophy },
  { id: "Premier League", name: "Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿", icon: Sparkles },
  { id: "La Liga", name: "La Liga 🇪🇸", icon: Sparkles },
];

const NewsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [transferFilter, setTransferFilter] = useState("all"); // "all" | "confirmed" | "rumored"

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setSavedArticles((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Filtered stories
  const filteredArticles = useMemo(() => {
    return newsArticles.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase()) ||
        item.relatedClub.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchCat =
        selectedCat === "all" || item.category === selectedCat;

      return matchSearch && matchCat;
    });
  }, [search, selectedCat]);

  // Lead story is the featured one, or the first in the filtered list
  const leadStory = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const secondaryStories = filteredArticles.filter((a) => a.id !== leadStory?.id);

  // Filtered transfers
  const filteredTransfers = useMemo(() => {
    return transferRadar.filter((t) => {
      const matchSearch =
        t.player.toLowerCase().includes(search.toLowerCase()) ||
        t.fromClub.toLowerCase().includes(search.toLowerCase()) ||
        t.toClub.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;
      if (transferFilter === "all") return true;
      return t.status === transferFilter;
    });
  }, [search, transferFilter]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-6">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-elevated border border-border text-foreground text-xs font-semibold tracking-wider uppercase mb-2">
            <Newspaper className="size-3.5 text-primary" />
            <span>Football Gazette & News Desk • 2026/27</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
            Football News, Transfers & Tactics
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Exclusive European dispatches, verified transfer radar, and detailed tactical breakdowns.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <Input
            leftIcon={Search}
            placeholder="Search news, transfers, tactics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9.5 text-xs"
          />
        </div>
      </div>

      {/* ---------- 2. CATEGORY TABS ---------- */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-border pb-3">
        {categoryTabs.map((tab) => {
          const isSelected = selectedCat === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCat(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
              }`}
            >
              <Icon className="size-3.5" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* ---------- CONTENT PATTERN 1: TRANSFERS DESK (COMPACT RADAR) ------ */}
      {/* =================================================================== */}
      {selectedCat === "Transfers" ? (
        <div className="flex flex-col gap-5">
          {/* Transfer Filter Controls */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5">
              {[
                { id: "all", label: "All Movements" },
                { id: "confirmed", label: "Official & Confirmed" },
                { id: "rumored", label: "Rumored & In Negotiations" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTransferFilter(f.id)}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer border ${
                    transferFilter === f.id
                      ? "bg-surface-elevated text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-muted-foreground">
              {filteredTransfers.length} Tracked Deal{filteredTransfers.length === 1 ? "" : "s"}
            </span>
          </div>

          {/* Compact Transfer Rows Table/List */}
          <div className="rounded-lg border border-border bg-card overflow-hidden divide-y divide-border/60">
            {filteredTransfers.map((tr) => {
              const isConfirmed = tr.status === "confirmed";

              return (
                <div
                  key={tr.id}
                  onClick={() => {
                    const matched = newsArticles.find((a) => a.id === tr.articleId);
                    if (matched) setSelectedArticle(matched);
                  }}
                  className="px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-elevated/40 transition-colors cursor-pointer group"
                >
                  {/* Status Badge + Player Identity */}
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <div className="relative size-11 rounded-md bg-surface-elevated border border-border overflow-hidden shrink-0">
                      <img
                        src={tr.photo}
                        alt={tr.player}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isConfirmed
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {isConfirmed ? (
                            <CheckCircle2 className="size-2.5" />
                          ) : (
                            <HelpCircle className="size-2.5" />
                          )}
                          <span>{isConfirmed ? "Confirmed" : "Rumor"}</span>
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {tr.date}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {tr.player}
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        {tr.position} • Age {tr.age}
                      </p>
                    </div>
                  </div>

                  {/* Club Movement (From -> To) */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-muted-foreground truncate max-w-[110px]">
                      {tr.fromClub}
                    </span>
                    <ArrowRight className="size-3 text-primary shrink-0" />
                    <span className="font-bold text-foreground truncate max-w-[140px] flex items-center gap-1">
                      <img
                        src={tr.clubLogo}
                        alt={tr.toClub}
                        className="size-4 object-contain inline"
                      />
                      <span>{tr.toClub}</span>
                    </span>
                  </div>

                  {/* Financial Terms & Contract */}
                  <div className="flex items-center justify-between md:justify-end gap-5 text-right">
                    <div>
                      <span className="font-mono font-bold text-xs text-primary block">
                        {tr.fee}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {tr.contract}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                      <span className="hidden sm:inline">Details</span>
                      <ArrowRight className="size-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : selectedCat === "Tactics" ? (
        /* =================================================================== */
        /* ---------- CONTENT PATTERN 2: TACTICAL ANALYSIS DESK -------------- */
        /* =================================================================== */
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="rounded-lg border border-border bg-card p-5 flex flex-col justify-between hover:border-primary transition-colors cursor-pointer group"
              >
                <div>
                  {/* Top Bar: Tactical Category & Read time */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <Badge variant="default" size="sm">
                      Tactical Blueprint
                    </Badge>
                    <span className="text-muted-foreground font-mono text-[11px] flex items-center gap-1">
                      <Clock className="size-3 text-primary" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  {/* Image with 16:9 ratio */}
                  <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden bg-surface-elevated mb-4">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-card/90 border border-border text-[10px] font-bold text-primary">
                      {art.relatedClub}
                    </div>
                  </div>

                  <h2 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                    {art.title}
                  </h2>

                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>

                  {/* Structured Tactical Phases Preview */}
                  {art.tacticalPhases && (
                    <div className="mt-4 pt-3 border-t border-border flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Tactical Execution Triggers
                      </span>
                      {art.tacticalPhases.map((phase, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded bg-surface-elevated/60 border border-border text-xs flex flex-col gap-0.5"
                        >
                          <span className="font-bold text-primary text-[11px]">
                            {phase.phase}
                          </span>
                          <span className="text-muted-foreground text-[11px] leading-tight">
                            {phase.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground text-[11px]">
                    By <strong className="text-foreground">{art.author}</strong>
                  </span>
                  <span className="font-bold text-primary inline-flex items-center gap-1">
                    <span>Read Full Tactical Breakdown</span>
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        /* =================================================================== */
        /* ---------- CONTENT PATTERN 3: EDITORIAL NEWS HIERARCHY ------------ */
        /* =================================================================== */
        filteredArticles.length === 0 ? (
          <EmptyState
            icon={Newspaper}
            title="No news dispatches found"
            description="Try searching with different terms or reset your filters."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSelectedCat("All");
                }}
              >
                Reset News Filters
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-6">
          {/* 1. Lead Editorial Story */}
          {leadStory && !search && (
            <article
              onClick={() => setSelectedArticle(leadStory)}
              className="rounded-lg border border-border bg-card overflow-hidden group cursor-pointer hover:border-primary transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* 16:9 Image on Desktop (7 Cols) */}
                <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto w-full overflow-hidden bg-surface-elevated">
                  <img
                    src={leadStory.image}
                    alt={leadStory.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="eager"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge variant="default" size="sm">
                      Lead Dispatch
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      {leadStory.category}
                    </Badge>
                  </div>
                </div>

                {/* Lead Headline & Excerpt (5 Cols) */}
                <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground mb-2">
                      <Clock className="size-3 text-primary" />
                      <span>{leadStory.date}</span>
                      <span>•</span>
                      <span>{leadStory.readTime}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                      {leadStory.title}
                    </h2>

                    <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {leadStory.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <div className="text-[11px] leading-tight">
                      <span className="font-bold text-foreground block">
                        {leadStory.author}
                      </span>
                      <span className="text-muted-foreground">
                        {leadStory.authorRole}
                      </span>
                    </div>

                    <Button variant="default" size="sm">
                      <span>Read Story</span>
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* 2. Secondary Editorial Grid (2 Columns, consistent 16:9 image ratios) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {secondaryStories.map((art) => (
              <article
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="rounded-lg border border-border bg-card p-4 flex flex-col justify-between group cursor-pointer hover:border-primary transition-colors"
              >
                <div>
                  {/* Consistent 16:9 Image Thumbnail */}
                  <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden bg-surface-elevated mb-3.5">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <Badge variant="secondary" size="sm">
                        {art.category}
                      </Badge>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(art.id, e)}
                      className={`absolute top-2.5 right-2.5 p-1.5 rounded-md transition-colors cursor-pointer ${
                        savedArticles.includes(art.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-card/90 border border-border text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label="Save story"
                    >
                      <Bookmark className="size-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground mb-1.5">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>By {art.author}</span>
                  <span className="font-bold text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1 text-[11px]">
                    <span>Read Article</span>
                    <ArrowRight className="size-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
        )
      )}

      {/* ---------- ARTICLE DETAIL DIALOG MODAL ---------- */}
      <Dialog
        open={Boolean(selectedArticle)}
        onOpenChange={(open) => !open && setSelectedArticle(null)}
      >
        <DialogContent
          title={selectedArticle?.title || "Article Dispatch"}
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
                <Badge variant="default" size="sm">
                  {selectedArticle.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed font-sans">
                {selectedArticle.content.trim()}
              </div>

              {selectedArticle.tacticalPhases && (
                <div className="p-3.5 rounded-lg bg-surface-elevated border border-border flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Tactical Phase Key Takeaways
                  </span>
                  {selectedArticle.tacticalPhases.map((tp, i) => (
                    <div key={i} className="text-xs">
                      <strong className="text-foreground">{tp.phase}:</strong>{" "}
                      <span className="text-muted-foreground">{tp.detail}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  By <strong className="text-foreground">{selectedArticle.author}</strong> ({selectedArticle.authorRole})
                </div>
                <Button
                  onClick={() => setSelectedArticle(null)}
                  variant="outline"
                  size="sm"
                >
                  Close Dispatch
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsPage;
