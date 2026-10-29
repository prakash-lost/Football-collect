/**
 * Football Collect - API-Football Client Service Layer
 * Communicates strictly with our secure server route `/api/football`
 * Normalizes all API responses into predictable, UI-ready structures
 */

const inFlightRequests = new Map();

/**
 * Fetch helper with parameter validation, caching & in-flight deduplication
 */
async function fetchFromBackend(endpoint, params = {}) {
  const query = new URLSearchParams();
  query.set("endpoint", endpoint);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  }

  const url = `/api/football?${query.toString()}`;

  // In-flight deduplication: return the active promise if same request is already pending
  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url);
  }

  const promise = (async () => {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      return data;
    } finally {
      inFlightRequests.delete(url);
    }
  })();

  inFlightRequests.set(url, promise);
  return promise;
}

/**
 * Timezone & Kickoff formatting utilities
 */
export function formatLocalKickoff(dateStr) {
  if (!dateStr) return "TBD";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function formatNepalKickoff(dateStr) {
  if (!dateStr) return "TBD";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d) + " NPT";
  } catch {
    return dateStr;
  }
}

export function formatHumanDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return dateStr;
  }
}

/**
 * Classify API-Football match status into standard UI state
 */
export function classifyStatus(statusObj = {}) {
  const short = (statusObj.short || "").toUpperCase();
  const elapsed = statusObj.elapsed || null;

  // Live in-play matches
  if (["1H", "2H", "HT", "ET", "BT", "P", "LIVE", "INT"].includes(short)) {
    let label = short === "HT" ? "Half Time" : `${elapsed || 45}'`;
    if (short === "P") label = "Penalties";
    if (short === "ET") label = `ET ${elapsed || 90}'`;

    return {
      type: "live",
      label,
      isLive: true,
      isFinished: false,
      isPostponed: false,
      isUpcoming: false,
      elapsed,
    };
  }

  // Finished matches
  if (["FT", "AET", "PEN"].includes(short)) {
    const label = short === "AET" ? "After ET" : short === "PEN" ? "Pens" : "Full Time";
    return {
      type: "finished",
      label,
      isLive: false,
      isFinished: true,
      isPostponed: false,
      isUpcoming: false,
      elapsed: 90,
    };
  }

  // Postponed / Cancelled / Suspended
  if (["PST", "CANC", "ABD", "AWD", "WO"].includes(short)) {
    const label = short === "PST" ? "Postponed" : short === "CANC" ? "Cancelled" : "Abandoned";
    return {
      type: "interrupted",
      label,
      isLive: false,
      isFinished: false,
      isPostponed: true,
      isUpcoming: false,
      elapsed: null,
    };
  }

  // Upcoming / Scheduled
  return {
    type: "upcoming",
    label: "Upcoming",
    isLive: false,
    isFinished: false,
    isPostponed: false,
    isUpcoming: true,
    elapsed: null,
  };
}

/**
 * Normalize a single raw API fixture item
 */
export function normalizeFixture(item) {
  if (!item || !item.fixture) return null;

  const { fixture, league, teams, goals, score } = item;
  const statusInfo = classifyStatus(fixture.status);

  return {
    id: fixture.id,
    date: fixture.date,
    timestamp: fixture.timestamp,
    localKickoff: formatLocalKickoff(fixture.date),
    nepalKickoff: formatNepalKickoff(fixture.date),
    formattedDate: formatHumanDate(fixture.date),
    status: statusInfo,
    rawStatus: fixture.status,
    referee: fixture.referee || "Match Official",
    venue: {
      name: fixture.venue?.name || "Stadium",
      city: fixture.venue?.city || "",
    },
    competition: {
      id: league?.id,
      name: league?.name || "Football Match",
      country: league?.country || "",
      logo: league?.logo || "",
      flag: league?.flag || "",
      round: league?.round || "",
      season: league?.season,
    },
    home: {
      id: teams?.home?.id,
      name: teams?.home?.name || "Home Team",
      short: teams?.home?.name ? teams.home.name.slice(0, 3).toUpperCase() : "HOM",
      logo: teams?.home?.logo || "",
      winner: teams?.home?.winner,
      score: statusInfo.isUpcoming ? null : goals?.home ?? null,
    },
    away: {
      id: teams?.away?.id,
      name: teams?.away?.name || "Away Team",
      short: teams?.away?.name ? teams.away.name.slice(0, 3).toUpperCase() : "AWY",
      logo: teams?.away?.logo || "",
      winner: teams?.away?.winner,
      score: statusInfo.isUpcoming ? null : goals?.away ?? null,
    },
    halftimeScore: score?.halftime || null,
    fulltimeScore: score?.fulltime || null,
  };
}

/**
 * Normalizer for match statistics
 */
export function normalizeStatistics(statsArray = []) {
  if (!Array.isArray(statsArray) || statsArray.length === 0) return null;

  // Usually array of 2 teams: [ { team, statistics: [ { type, value } ] }, ... ]
  const homeStats = statsArray[0]?.statistics || [];
  const awayStats = statsArray[1]?.statistics || [];

  const statMap = new Map();

  homeStats.forEach((s) => {
    statMap.set(s.type, { label: s.type, home: s.value ?? 0, away: 0 });
  });

  awayStats.forEach((s) => {
    const existing = statMap.get(s.type) || { label: s.type, home: 0, away: 0 };
    existing.away = s.value ?? 0;
    statMap.set(s.type, existing);
  });

  const formattedStats = [];

  // Key performance indicators in priority order
  const priorityTypes = [
    { key: "Ball Possession", label: "Ball Possession" },
    { key: "Total Shots", label: "Total Shots" },
    { key: "Shots on Goal", label: "Shots on Target" },
    { key: "Shots off Goal", label: "Shots off Target" },
    { key: "Corner Kicks", label: "Corner Kicks" },
    { key: "Fouls", label: "Fouls Committed" },
    { key: "Offsides", label: "Offsides" },
    { key: "Yellow Cards", label: "Yellow Cards" },
    { key: "Red Cards", label: "Red Cards" },
    { key: "Goalkeeper Saves", label: "Goalkeeper Saves" },
    { key: "Passes accurate", label: "Passes Completed" },
    { key: "Passes %", label: "Pass Accuracy" },
    { key: "expected_goals", label: "Expected Goals (xG)" },
  ];

  priorityTypes.forEach(({ key, label }) => {
    const found = statMap.get(key);
    if (found) {
      formattedStats.push({
        label,
        home: found.home,
        away: found.away,
      });
    }
  });

  return formattedStats.length > 0 ? formattedStats : null;
}

/**
 * Normalizer for match events
 */
export function normalizeEvents(eventsArray = []) {
  if (!Array.isArray(eventsArray)) return [];

  return eventsArray.map((ev, index) => {
    const type = (ev.type || "").toLowerCase();
    const detail = ev.detail || "";

    let eventType = "other";
    let icon = "⚡";

    if (type.includes("goal")) {
      eventType = "goal";
      icon = "⚽";
      if (detail.toLowerCase().includes("own goal")) icon = "⚠️ OG";
      if (detail.toLowerCase().includes("penalty")) icon = "🎯 PEN";
    } else if (type.includes("card")) {
      eventType = "card";
      icon = detail.toLowerCase().includes("red") ? "🟥" : "🟨";
    } else if (type.includes("subst")) {
      eventType = "sub";
      icon = "🔄";
    } else if (type.includes("var")) {
      eventType = "var";
      icon = "📺";
    }

    return {
      id: `ev-${index}`,
      time: ev.time?.elapsed ? `${ev.time.elapsed}'` : "—",
      extraTime: ev.time?.extra ? `+${ev.time.extra}` : "",
      minute: ev.time?.elapsed || 0,
      teamId: ev.team?.id,
      teamName: ev.team?.name || "",
      teamLogo: ev.team?.logo || "",
      player: ev.player?.name || "Player",
      assist: ev.assist?.name || null,
      type: eventType,
      detail,
      icon,
      comments: ev.comments || null,
    };
  });
}

/**
 * Normalizer for match lineups
 */
export function normalizeLineups(lineupArray = []) {
  if (!Array.isArray(lineupArray) || lineupArray.length === 0) return null;

  return lineupArray.map((side) => ({
    team: {
      id: side.team?.id,
      name: side.team?.name || "Team",
      logo: side.team?.logo || "",
      colors: side.team?.colors?.player || { primary: "10b981", number: "ffffff" },
    },
    coach: {
      name: side.coach?.name || "Manager",
      photo: side.coach?.photo || "",
    },
    formation: side.formation || "4-3-3",
    startXI: (side.startXI || []).map((p) => ({
      id: p.player?.id,
      name: p.player?.name || "Player",
      number: p.player?.number || "",
      pos: p.player?.pos || "M",
      grid: p.player?.grid || null,
    })),
    substitutes: (side.substitutes || []).map((p) => ({
      id: p.player?.id,
      name: p.player?.name || "Substitute",
      number: p.player?.number || "",
      pos: p.player?.pos || "M",
    })),
  }));
}

/**
 * Public Football API Service Methods
 */
export const footballApi = {
  /**
   * Fetch fixtures list by date, league, live status, etc.
   */
  async getFixtures({ date, live, league, season, team, next, last } = {}) {
    const raw = await fetchFromBackend("fixtures", {
      date,
      live,
      league,
      season,
      team,
      next,
      last,
    });

    const list = Array.isArray(raw?.response) ? raw.response : [];
    const normalized = list.map(normalizeFixture).filter(Boolean);

    return {
      fixtures: normalized,
      results: normalized.length,
      isFallback: Boolean(raw?.meta?.isFallback),
      fallbackReason: raw?.meta?.reason || null,
    };
  },

  /**
   * Fetch complete fixture details with events, stats and lineups
   */
  async getFixtureDetails(fixtureId) {
    // 1. Fetch fixture
    const rawFixture = await fetchFromBackend("fixtures", { id: fixtureId });
    const fixtureItem = rawFixture?.response?.[0];
    if (!fixtureItem) {
      throw new Error(`Fixture with id ${fixtureId} was not found.`);
    }

    const normalized = normalizeFixture(fixtureItem);

    // If API returned events, stats, lineups inline (like our fallback or full response)
    let events = normalizeEvents(fixtureItem.events || []);
    let statistics = normalizeStatistics(fixtureItem.statistics || []);
    let lineups = normalizeLineups(fixtureItem.lineups || []);

    // If not supplied inline, make concurrent calls to endpoints
    if (events.length === 0 && normalized.status.isFinished) {
      try {
        const eventsRes = await fetchFromBackend("fixtures/events", { fixture: fixtureId });
        if (Array.isArray(eventsRes?.response) && eventsRes.response.length > 0) {
          events = normalizeEvents(eventsRes.response);
        }
      } catch {
        // Continue gracefully
      }
    }

    if (!statistics && (normalized.status.isFinished || normalized.status.isLive)) {
      try {
        const statsRes = await fetchFromBackend("fixtures/statistics", { fixture: fixtureId });
        if (Array.isArray(statsRes?.response) && statsRes.response.length > 0) {
          statistics = normalizeStatistics(statsRes.response);
        }
      } catch {
        // Continue gracefully
      }
    }

    if (!lineups && (normalized.status.isFinished || normalized.status.isLive)) {
      try {
        const lineupsRes = await fetchFromBackend("fixtures/lineups", { fixture: fixtureId });
        if (Array.isArray(lineupsRes?.response) && lineupsRes.response.length > 0) {
          lineups = normalizeLineups(lineupsRes.response);
        }
      } catch {
        // Continue gracefully
      }
    }

    return {
      ...normalized,
      events,
      statistics,
      lineups,
      isFallback: Boolean(rawFixture?.meta?.isFallback),
      fallbackReason: rawFixture?.meta?.reason || null,
    };
  },

  /**
   * Fetch league standings
   */
  async getStandings({ league = 39, season = 2024 } = {}) {
    const raw = await fetchFromBackend("standings", { league, season });
    const responseArray = Array.isArray(raw?.response) ? raw.response : [];
    const leagueData = responseArray[0]?.league;

    if (!leagueData || !leagueData.standings) {
      return {
        league: null,
        standings: [],
        isFallback: Boolean(raw?.meta?.isFallback),
      };
    }

    // Flatten standings tables (some leagues have groups)
    const tables = leagueData.standings.map((groupTable, groupIdx) => ({
      groupName: groupTable[0]?.group || `Table ${groupIdx + 1}`,
      rows: groupTable.map((r) => ({
        pos: r.rank,
        teamId: r.team?.id,
        club: r.team?.name || "Club",
        logo: r.team?.logo || "",
        p: r.all?.played || 0,
        w: r.all?.win || 0,
        d: r.all?.draw || 0,
        l: r.all?.lose || 0,
        gf: r.all?.goals?.for || 0,
        ga: r.all?.goals?.against || 0,
        gd: r.goalsDiff > 0 ? `+${r.goalsDiff}` : String(r.goalsDiff || 0),
        pts: r.points || 0,
        form: r.form ? r.form.split("").slice(-5) : [],
        description: r.description || null,
      })),
    }));

    return {
      league: {
        id: leagueData.id,
        name: leagueData.name,
        country: leagueData.country,
        logo: leagueData.logo,
        flag: leagueData.flag,
        season: leagueData.season,
      },
      tables,
      isFallback: Boolean(raw?.meta?.isFallback),
      fallbackReason: raw?.meta?.reason || null,
    };
  },

  /**
   * Fetch status / quota indicator
   */
  async getQuotaStatus() {
    try {
      const data = await fetchFromBackend("status");
      return {
        active: Boolean(data?.response?.subscription?.active),
        plan: data?.response?.subscription?.plan || "Free",
        requestsCurrent: data?.response?.requests?.current ?? 0,
        requestsLimit: data?.response?.requests?.limit_day ?? 100,
        isFallback: Boolean(data?.meta?.isFallback),
      };
    } catch {
      return {
        active: false,
        plan: "Offline",
        requestsCurrent: 0,
        requestsLimit: 100,
        isFallback: true,
      };
    }
  },
};

export default footballApi;

