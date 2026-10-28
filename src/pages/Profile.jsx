import React, { useState, useContext } from "react";
import { Link } from "react-router";
import {
  Shield,
  Trophy,
  Star,
  Settings,
  Sparkles,
  ExternalLink,
  Calendar,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { Switch } from "../components/ui/switch";

const favoriteClubs = [
  {
    id: 1,
    name: "Real Madrid",
    league: "La Liga",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    stadium: "Santiago Bernabéu",
    ucl: 15,
    status: "Primary Club",
  },
  {
    id: 4,
    name: "Arsenal FC",
    league: "Premier League",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    stadium: "Emirates Stadium",
    ucl: 0,
    status: "Secondary Club",
  },
  {
    id: 2,
    name: "FC Barcelona",
    league: "La Liga",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    stadium: "Spotify Camp Nou",
    ucl: 5,
    status: "Rivalry Tracker",
  },
];

const collectedCards = [
  {
    id: "kylian-mbappe",
    name: "Kylian Mbappé",
    club: "Real Madrid",
    pos: "FWD",
    rating: 8.92,
    tier: "Iconic Gold",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRin_hXretTz2zqtgry2DU4Si6CuPGzHuyczMphM_25vzVmua5anta5ASA&s=10",
  },
  {
    id: "erling-haaland",
    name: "Erling Haaland",
    club: "Man City",
    pos: "FWD",
    rating: 8.88,
    tier: "Iconic Gold",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2XNFB5wGfBgK-i1NuGcmFYuWJIWEHcUJwLRuFeieIs32mXhkI4N3e3Id&s=10",
  },
  {
    id: "lamine-yamal",
    name: "Lamine Yamal",
    club: "FC Barcelona",
    pos: "FWD",
    rating: 8.85,
    tier: "Wonderkid Diamond",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gOPDnlymyyZwOJa79aru7oiaeDESuziOBldLNbmIZgHSRD1wEOWDAHg&s=10",
  },
  {
    id: "jude-bellingham",
    name: "Jude Bellingham",
    club: "Real Madrid",
    pos: "MID",
    rating: 8.82,
    tier: "Special Edition",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Jude_Bellingham_2024.jpg",
  },
];

const matchPredictions = [
  {
    id: "m1",
    home: "Real Madrid",
    homeLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    away: "FC Barcelona",
    awayLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    competition: "Champions League Quarter-Final",
    date: "April 9, 2026",
    prediction: "Home Win (2-1)",
    status: "Pending",
  },
  {
    id: "m2",
    home: "Arsenal",
    homeLogo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    away: "Manchester City",
    awayLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    competition: "Premier League Title Clash",
    date: "April 18, 2026",
    prediction: "Draw (1-1)",
    status: "Pending",
  },
  {
    id: "m3",
    home: "Liverpool",
    homeLogo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    away: "Real Madrid",
    awayLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    competition: "UCL Round of 16 Leg 2",
    date: "March 11, 2026",
    prediction: "Correct (2-0)",
    status: "Won",
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("clubs");
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);
  const [favoriteLeague, setFavoriteLeague] = useState("Premier League");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
      {/* ---------- 1. PROFILE BANNER & USER HEADER ---------- */}
      <div className="relative rounded-xl overflow-hidden border border-border bg-card">
        {/* Understated Pitch Header Banner */}
        <div className="h-32 sm:h-40 w-full bg-surface-elevated border-b border-border relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-md bg-card border border-border text-foreground text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-warning" />
            <span>VIP Collector Level 8</span>
          </div>
        </div>

        {/* User Identity Section */}
        <div className="px-6 pb-6 pt-0 sm:px-8 sm:pb-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-14 sm:-mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-background border-2 border-border p-1 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-primary text-2xl font-black">
                AR
              </div>
            </div>

            {/* User Meta */}
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="font-black text-2xl sm:text-3xl text-foreground">
                  Alex Rossi
                </span>
                <span className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-primary text-xs font-semibold">
                  @rossi_football
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                <span>🇪🇸 Madrid, Spain</span>
                <span>•</span>
                <span>Member since Oct 2024</span>
              </p>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/teams"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Browse Teams</span>
            </Link>
            <button
              onClick={() => setActiveTab("settings")}
              className="p-2 rounded-md border border-border bg-surface-elevated text-foreground hover:border-primary transition-colors cursor-pointer"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Stat Strip */}
        <div className="border-t border-border bg-surface-base px-6 py-4 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-lg sm:text-2xl font-black text-foreground block">
              42 / 96
            </span>
            <span className="text-[11px] text-muted-foreground uppercase font-medium">
              Clubs Discovered
            </span>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-black text-primary block">
              84.6%
            </span>
            <span className="text-[11px] text-muted-foreground uppercase font-medium">
              Prediction Accuracy
            </span>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-black text-warning block">
              18 Cards
            </span>
            <span className="text-[11px] text-muted-foreground uppercase font-medium">
              Star Collection
            </span>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-black text-foreground block">
              #14 Global
            </span>
            <span className="text-[11px] text-muted-foreground uppercase font-medium">
              Community Rank
            </span>
          </div>
        </div>
      </div>

      {/* ---------- 2. TAB CONTROLS ---------- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "clubs", label: "Favorite Clubs", icon: Shield },
          { id: "cards", label: "Collected Star Cards", icon: Sparkles },
          { id: "predictions", label: "Matchday Predictions", icon: TrendingUp },
          { id: "settings", label: "Preferences & Settings", icon: Settings },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface-elevated border-border text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- 3. TAB 1: FAVORITE CLUBS ---------- */}
      {activeTab === "clubs" && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Pinned Club Roster
              </h3>
              <p className="text-xs text-muted-foreground">
                Clubs you are actively following for score updates and squad transfers.
              </p>
            </div>
            <Link
              to="/teams"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Add More Clubs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favoriteClubs.map((club) => (
              <div
                key={club.id}
                className="group p-5 rounded-xl border border-border bg-card flex flex-col justify-between hover:border-primary transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-primary font-semibold">
                      {club.status}
                    </span>
                    <span className="text-muted-foreground font-medium">
                      {club.league}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 my-3">
                    <div className="w-16 h-16 p-2 rounded-lg bg-background border border-border flex items-center justify-center shrink-0">
                      <img
                        src={club.logo}
                        alt={club.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {club.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {club.stadium}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>Champions Leagues</span>
                    <span className="font-bold text-warning flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" /> {club.ucl} UCL
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <Link
                    to="/teams"
                    className="w-full py-2 rounded-md bg-surface-elevated hover:bg-primary hover:text-primary-foreground border border-border text-foreground text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>View Club In Directory</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------- 4. TAB 2: COLLECTED CARDS ---------- */}
      {activeTab === "cards" && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                My Star Card Showcase
              </h3>
              <p className="text-xs text-muted-foreground">
                Rare footballer cards earned from active matchday participation.
              </p>
            </div>
            <Link
              to="/players"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Explore Player Directory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {collectedCards.map((card) => (
              <div
                key={card.id}
                className="group relative p-4 rounded-xl border border-border bg-card hover:border-primary transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-surface-elevated text-warning border border-border font-semibold text-[10px]">
                      {card.tier}
                    </span>
                    <span className="flex items-center gap-0.5 text-xs font-bold text-warning">
                      <Star className="w-3 h-3 fill-warning" />
                      {card.rating}
                    </span>
                  </div>

                  <div className="my-3 h-36 rounded-lg overflow-hidden bg-background border border-border">
                    <img
                      src={card.photo}
                      alt={card.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="text-center">
                    <h4 className="font-bold text-foreground text-sm truncate">
                      {card.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {card.club} • {card.pos}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2">
                  <Link
                    to={`/players/${card.id}`}
                    className="w-full py-1.5 rounded-md bg-surface-elevated hover:bg-primary hover:text-primary-foreground border border-border text-foreground text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Inspect Career</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------- 5. TAB 3: MATCHDAY PREDICTIONS ---------- */}
      {activeTab === "predictions" && (
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Matchday Predictor
            </h3>
            <p className="text-xs text-muted-foreground">
              Test your tactical knowledge on upcoming European heavyweight ties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchPredictions.map((pred) => (
              <div
                key={pred.id}
                className="p-5 rounded-xl border border-border bg-card flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-3">
                    <span className="text-muted-foreground font-medium">
                      {pred.competition}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                        pred.status === "Won"
                          ? "bg-surface-elevated text-success border border-success/40"
                          : "bg-surface-elevated text-primary border border-border"
                      }`}
                    >
                      {pred.status}
                    </span>
                  </div>

                  {/* Clash Display */}
                  <div className="flex items-center justify-between my-2">
                    <div className="flex flex-col items-center text-center w-24">
                      <div className="w-12 h-12 p-1.5 rounded-lg bg-background border border-border flex items-center justify-center mb-1">
                        <img
                          src={pred.homeLogo}
                          alt={pred.home}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground truncate w-full">
                        {pred.home}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-surface-elevated border border-border">
                      VS
                    </span>

                    <div className="flex flex-col items-center text-center w-24">
                      <div className="w-12 h-12 p-1.5 rounded-lg bg-background border border-border flex items-center justify-center mb-1">
                        <img
                          src={pred.awayLogo}
                          alt={pred.away}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground truncate w-full">
                        {pred.away}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-surface-elevated border border-border text-xs flex justify-between items-center">
                    <span className="text-muted-foreground">Your Pick:</span>
                    <span className="font-bold text-foreground">
                      {pred.prediction}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Scheduled: {pred.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------- 6. TAB 4: PREFERENCES & SETTINGS ---------- */}
      {activeTab === "settings" && (
        <div className="max-w-2xl rounded-xl border border-border bg-card p-6 sm:p-8 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Account Preferences
            </h3>
            <p className="text-xs text-muted-foreground">
              Customize your Football Collect experience and notification alerts.
            </p>
          </div>

          {/* Theme Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-surface-elevated border border-border">
            <div>
              <h5 className="text-sm font-semibold text-foreground">Pitch Dark Mode</h5>
              <p className="text-xs text-muted-foreground">
                High contrast pitch dark theme
              </p>
            </div>
            <Switch checked={isDark} onCheckedChange={setIsDark} />
          </div>

          {/* Favorite League Selector */}
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-surface-elevated border border-border">
            <label className="text-sm font-semibold text-foreground">
              Default Homepage League
            </label>
            <select
              value={favoriteLeague}
              onChange={(e) => setFavoriteLeague(e.target.value)}
              className="h-10 px-3 rounded-md bg-background border border-border text-foreground text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="Premier League">Premier League (England)</option>
              <option value="La Liga">La Liga (Spain)</option>
              <option value="Serie A">Serie A (Italy)</option>
              <option value="Bundesliga">Bundesliga (Germany)</option>
              <option value="Ligue 1">Ligue 1 (France)</option>
            </select>
          </div>

          {/* Match Alerts Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-surface-elevated border border-border">
            <div>
              <h5 className="text-sm font-semibold text-foreground">
                Transfer & Goal Alerts
              </h5>
              <p className="text-xs text-muted-foreground">
                Receive notifications when your pinned clubs confirm transfers
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert("Preferences updated successfully!")}
              className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary-hover active:scale-[0.98] transition-all cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
