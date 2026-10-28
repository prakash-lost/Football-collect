import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Newspaper,
  Search,
  Flame,
  Clock,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Bookmark,
  Trophy,
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
    tags: ["Mbappe", "Real Madrid", "La Liga", "Hat Trick"],
  },
  {
    id: "news-7",
    featured: false,
    title: "Cole Palmer's Cold Precision: Why Chelsea's No. 20 is the Premier League's Most Composed Star",
    category: "Tactics",
    categoryCode: "tactics",
    date: "1 day ago",
    readTime: "4 min read",
    author: "Jonathan Pierce",
    authorRole: "Senior Tactical Analyst",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/07/Cole_Palmer_2024.jpg",
    summary:
      "Analytical breakdown of Cole Palmer's body posture, vision under pressure, and how his trademark low-tempo deceptive rhythm unlocks compact Premier League backlines.",
    content: `
Few players in European football manipulate time and space quite like Cole Palmer. While modern wingers and attacking midfielders often rely on explosive sprint metrics, Palmer excels through deception, hesitation, and immaculate spatial awareness.

Statistical data shows Palmer completes 88% of passes executed under high pressure inside the final third — the highest rate for any attacking midfielder in England this season.
    `,
    relatedClub: "Chelsea",
    tags: ["Palmer", "Chelsea", "Premier League", "Tactical Analysis"],
  },
  {
    id: "news-8",
    featured: false,
    title: "Harry Kane Hits 30 Bundesliga Goals in Record Time as Bayern March On",
    category: "Bundesliga",
    categoryCode: "bundesliga",
    date: "1 day ago",
    readTime: "3 min read",
    author: "Liam Henderson",
    authorRole: "Chief Premier League Reporter",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/22/Harry_Kane_2024.jpg",
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

const categoryTabs = [
  { id: "all", name: "All Stories", icon: Newspaper },
  { id: "Transfers", name: "Transfers 🔄", icon: Flame },
  { id: "Champions League", name: "Champions League 🏆", icon: Trophy },
  { id: "Premier League", name: "Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿", icon: Sparkles },
  { id: "La Liga", name: "La Liga 🇪🇸", icon: Sparkles },
  { id: "Tactics", name: "Tactics & Analysis 📊", icon: Sparkles },
];

const News = () => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);

  // Toggle bookmark
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

  const featuredStory = newsArticles.find((a) => a.featured) || newsArticles[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated border border-border text-foreground text-xs font-semibold tracking-wider uppercase mb-2">
            <Newspaper className="size-3.5 text-primary" />
            <span>Live Football Gazette • 2026 Season</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            News & Transfer Desk
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Live transfer news, matchday scoops, Champions League tactical breakdowns,
            and exclusive European football coverage.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <Input
            leftIcon={Search}
            placeholder="Search news, clubs, players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ---------- 2. CATEGORY FILTER TABS ---------- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryTabs.map((tab) => {
          const isSelected = selectedCat === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCat(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface-elevated border-border text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- 3. HERO FEATURED STORY (Shown when no search query) ---------- */}
      {!search && selectedCat === "all" && featuredStory && (
        <div
          onClick={() => setSelectedArticle(featuredStory)}
          className="group relative rounded-xl overflow-hidden border border-border bg-card cursor-pointer hover:border-primary transition-colors"
        >
          <div className="relative h-72 sm:h-96 md:h-[420px] w-full">
            <img
              src={featuredStory.image}
              alt={featuredStory.title}
              className="w-full h-full object-cover"
            />
            {/* Dark Pitch Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />

            {/* Content on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="default" size="sm">
                  Featured Breaking News
                </Badge>
                <Badge variant="secondary" size="sm">
                  {featuredStory.category}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Clock className="size-3.5" /> {featuredStory.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors max-w-4xl leading-tight">
                {featuredStory.title}
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl line-clamp-2 sm:line-clamp-3">
                {featuredStory.summary}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <div className="size-6 rounded-full bg-surface-elevated text-primary border border-border flex items-center justify-center font-bold">
                    FB
                  </div>
                  <span>{featuredStory.author}</span>
                  <span className="text-muted-foreground">• {featuredStory.readTime}</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  <span>Read Full Exclusive</span>
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- 4. NEWS ARTICLES GRID ---------- */}
      {filteredArticles.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="No articles match your query"
          description="Try checking for typos or resetting your category filter."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setSelectedCat("all");
              }}
            >
              Reset Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const isSaved = savedArticles.includes(article.id);

            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-card overflow-hidden hover:border-primary transition-colors cursor-pointer"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-background">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://assets.goal.com/images/v3/getty-2241952135/crop/MM5DENBUHA5DCMZXG45G433XMU5DMMJSHIYTAMA=/GettyImages-2241952135.jpg";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" size="sm">
                        {article.category}
                      </Badge>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(article.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-md transition-colors ${
                        isSaved
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface-elevated/90 border border-border text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label="Save story"
                    >
                      <Bookmark className="size-3.5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" /> {article.date}
                      </span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="px-5 pb-5 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">
                    By {article.author}
                  </span>
                  <span className="font-semibold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Story <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------- 5. ARTICLE READER MODAL ---------- */}
      <Dialog
        open={!!selectedArticle}
        onOpenChange={(isOpen) => !isOpen && setSelectedArticle(null)}
      >
        {selectedArticle && (
          <DialogContent size="xl" onClose={() => setSelectedArticle(null)}>
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="default" size="sm">
                  {selectedArticle.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Published {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-snug">
                {selectedArticle.title}
              </h1>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <div className="size-10 rounded-full bg-surface-elevated border border-border text-primary font-bold flex items-center justify-center">
                  {selectedArticle.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {selectedArticle.author}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {selectedArticle.authorRole}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Article Image */}
            <div className="h-64 sm:h-80 w-full rounded-lg overflow-hidden border border-border">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Story Text */}
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {selectedArticle.content
                .trim()
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="text-foreground/90">
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Tags Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
              <span className="text-xs font-semibold text-muted-foreground">Tags:</span>
              {selectedArticle.tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* CTA to Explore Team */}
            <div className="p-4 rounded-lg bg-surface-elevated border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="text-sm font-bold text-foreground">
                  Featured Club: {selectedArticle.relatedClub}
                </h5>
                <p className="text-xs text-muted-foreground">
                  View current squad, trophies, and fixtures in the club directory.
                </p>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => setSelectedArticle(null)}
                asChild
              >
                <Link to="/teams" className="inline-flex items-center gap-2">
                  <span>View Clubs</span>
                  <ExternalLink className="size-3.5" />
                </Link>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default News;
