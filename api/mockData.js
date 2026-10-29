// Realistic API-Football (v3.football.api-sports.io) mock responses for graceful fallback & local demo
// Matches the exact API response shape: { get, parameters, errors: [], results, response: [...] }

export const MAJOR_LEAGUES = [
  { id: 39, name: "Premier League", country: "England", logo: "https://media.api-sports.io/football/leagues/39.png", flag: "https://media.api-sports.io/flags/gb.svg", season: 2024 },
  { id: 140, name: "La Liga", country: "Spain", logo: "https://media.api-sports.io/football/leagues/140.png", flag: "https://media.api-sports.io/flags/es.svg", season: 2024 },
  { id: 2, name: "UEFA Champions League", country: "World", logo: "https://media.api-sports.io/football/leagues/2.png", flag: null, season: 2024 },
  { id: 135, name: "Serie A", country: "Italy", logo: "https://media.api-sports.io/football/leagues/135.png", flag: "https://media.api-sports.io/flags/it.svg", season: 2024 },
  { id: 78, name: "Bundesliga", country: "Germany", logo: "https://media.api-sports.io/football/leagues/78.png", flag: "https://media.api-sports.io/flags/de.svg", season: 2024 },
  { id: 61, name: "Ligue 1", country: "France", logo: "https://media.api-sports.io/football/leagues/61.png", flag: "https://media.api-sports.io/flags/fr.svg", season: 2024 },
];

export function getMockFixtures(dateStr) {
  // Generate date-aware matches for the requested date (YYYY-MM-DD)
  const baseDate = dateStr || new Date().toISOString().split("T")[0];
  const now = new Date();
  const queryDate = new Date(baseDate);
  const isToday = queryDate.toDateString() === now.toDateString();
  const isPast = queryDate < new Date(now.toDateString());

  const makeMatch = (id, league, home, away, kickoffHour, statusShort, statusLong, elapsed, homeScore, awayScore, venue) => ({
    fixture: {
      id,
      referee: "Michael Oliver, England",
      timezone: "UTC",
      date: `${baseDate}T${kickoffHour}:00:00+00:00`,
      timestamp: Math.floor(new Date(`${baseDate}T${kickoffHour}:00:00Z`).getTime() / 1000),
      periods: { first: null, second: null },
      venue: { id: 500 + id, name: venue.name, city: venue.city },
      status: {
        long: statusLong,
        short: statusShort,
        elapsed: elapsed,
      },
    },
    league: {
      id: league.id,
      name: league.name,
      country: league.country,
      logo: league.logo,
      flag: league.flag,
      season: 2024,
      round: "Matchday 28",
    },
    teams: {
      home: { id: home.id, name: home.name, logo: home.logo, winner: homeScore > awayScore ? true : homeScore < awayScore ? false : null },
      away: { id: away.id, name: away.name, logo: away.logo, winner: awayScore > homeScore ? true : awayScore < homeScore ? false : null },
    },
    goals: {
      home: statusShort === "NS" ? null : homeScore,
      away: statusShort === "NS" ? null : awayScore,
    },
    score: {
      halftime: { home: statusShort === "NS" ? null : Math.floor(homeScore / 2), away: statusShort === "NS" ? null : Math.floor(awayScore / 2) },
      fulltime: { home: statusShort === "NS" ? null : homeScore, away: statusShort === "NS" ? null : awayScore },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null },
    },
  });

  const pLeague = MAJOR_LEAGUES[0];
  const laLiga = MAJOR_LEAGUES[1];
  const ucl = MAJOR_LEAGUES[2];
  const serieA = MAJOR_LEAGUES[3];
  const bLiga = MAJOR_LEAGUES[4];

  // Depending on whether date is today, past, or future:
  if (isPast) {
    return [
      makeMatch(1001, pLeague, { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" }, "16:30", "FT", "Match Finished", 90, 2, 1, { name: "Anfield", city: "Liverpool" }),
      makeMatch(1002, pLeague, { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" }, { id: 49, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" }, "14:00", "FT", "Match Finished", 90, 3, 0, { name: "Emirates Stadium", city: "London" }),
      makeMatch(1003, laLiga, { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" }, { id: 529, name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" }, "20:00", "FT", "Match Finished", 90, 3, 2, { name: "Santiago Bernabéu", city: "Madrid" }),
      makeMatch(1004, laLiga, { id: 530, name: "Atletico Madrid", logo: "https://media.api-sports.io/football/teams/530.png" }, { id: 536, name: "Sevilla", logo: "https://media.api-sports.io/football/teams/536.png" }, "17:30", "FT", "Match Finished", 90, 1, 0, { name: "Civitas Metropolitano", city: "Madrid" }),
      makeMatch(1005, ucl, { id: 157, name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" }, { id: 505, name: "Inter Milan", logo: "https://media.api-sports.io/football/teams/505.png" }, "20:00", "FT", "Match Finished", 90, 2, 0, { name: "Allianz Arena", city: "München" }),
    ];
  }

  if (isToday) {
    return [
      makeMatch(1001, pLeague, { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" }, "16:30", "2H", "Second Half", 74, 2, 1, { name: "Anfield", city: "Liverpool" }),
      makeMatch(1002, pLeague, { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" }, { id: 49, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" }, "14:00", "FT", "Match Finished", 90, 3, 1, { name: "Emirates Stadium", city: "London" }),
      makeMatch(1006, pLeague, { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" }, { id: 47, name: "Tottenham", logo: "https://media.api-sports.io/football/teams/47.png" }, "19:00", "NS", "Not Started", null, null, null, { name: "Old Trafford", city: "Manchester" }),
      makeMatch(1003, laLiga, { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" }, { id: 529, name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" }, "20:00", "NS", "Not Started", null, null, null, { name: "Santiago Bernabéu", city: "Madrid" }),
      makeMatch(1004, laLiga, { id: 530, name: "Atletico Madrid", logo: "https://media.api-sports.io/football/teams/530.png" }, { id: 536, name: "Sevilla", logo: "https://media.api-sports.io/football/teams/536.png" }, "17:30", "1H", "First Half", 38, 1, 0, { name: "Civitas Metropolitano", city: "Madrid" }),
      makeMatch(1007, serieA, { id: 505, name: "Inter Milan", logo: "https://media.api-sports.io/football/teams/505.png" }, { id: 489, name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png" }, "19:45", "NS", "Not Started", null, null, null, { name: "San Siro", city: "Milano" }),
      makeMatch(1008, bLiga, { id: 157, name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" }, { id: 165, name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png" }, "17:30", "FT", "Match Finished", 90, 3, 2, { name: "Allianz Arena", city: "München" }),
    ];
  }

  // Future matches
  return [
    makeMatch(1010, ucl, { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" }, { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, "20:00", "NS", "Not Started", null, null, null, { name: "Santiago Bernabéu", city: "Madrid" }),
    makeMatch(1011, ucl, { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" }, { id: 157, name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" }, "20:00", "NS", "Not Started", null, null, null, { name: "Etihad Stadium", city: "Manchester" }),
    makeMatch(1012, pLeague, { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" }, { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" }, "16:30", "NS", "Not Started", null, null, null, { name: "Emirates Stadium", city: "London" }),
    makeMatch(1013, laLiga, { id: 529, name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" }, { id: 530, name: "Atletico Madrid", logo: "https://media.api-sports.io/football/teams/530.png" }, "19:00", "NS", "Not Started", null, null, null, { name: "Spotify Camp Nou", city: "Barcelona" }),
  ];
}

export function getMockFixtureDetails(fixtureId) {
  const id = parseInt(fixtureId, 10) || 1001;
  const fixtures = getMockFixtures(new Date().toISOString().split("T")[0]);
  const matched = fixtures.find((f) => f.fixture.id === id) || fixtures[0];

  return {
    ...matched,
    events: [
      {
        time: { elapsed: 24, extra: null },
        team: { id: matched.teams.home.id, name: matched.teams.home.name, logo: matched.teams.home.logo },
        player: { id: 110, name: "Mohamed Salah" },
        assist: { id: 111, name: "Trent Alexander-Arnold" },
        type: "Goal",
        detail: "Normal Goal",
        comments: null,
      },
      {
        time: { elapsed: 38, extra: null },
        team: { id: matched.teams.away.id, name: matched.teams.away.name, logo: matched.teams.away.logo },
        player: { id: 120, name: "Bernardo Silva" },
        assist: null,
        type: "Card",
        detail: "Yellow Card",
        comments: "Rough tackle",
      },
      {
        time: { elapsed: 53, extra: null },
        team: { id: matched.teams.away.id, name: matched.teams.away.name, logo: matched.teams.away.logo },
        player: { id: 125, name: "Erling Haaland" },
        assist: { id: 126, name: "Kevin De Bruyne" },
        type: "Goal",
        detail: "Header",
        comments: null,
      },
      {
        time: { elapsed: 68, extra: null },
        team: { id: matched.teams.home.id, name: matched.teams.home.name, logo: matched.teams.home.logo },
        player: { id: 115, name: "Dominik Szoboszlai" },
        assist: { id: 110, name: "Mohamed Salah" },
        type: "Goal",
        detail: "Normal Goal",
        comments: null,
      },
      {
        time: { elapsed: 78, extra: null },
        team: { id: matched.teams.away.id, name: matched.teams.away.name, logo: matched.teams.away.logo },
        player: { id: 127, name: "Jeremy Doku" },
        assist: { id: 128, name: "Jack Grealish" },
        type: "subst",
        detail: "Substitution 1",
        comments: null,
      },
    ],
    statistics: [
      {
        team: { id: matched.teams.home.id, name: matched.teams.home.name, logo: matched.teams.home.logo },
        statistics: [
          { type: "Ball Possession", value: "54%" },
          { type: "Total Shots", value: 16 },
          { type: "Shots on Goal", value: 7 },
          { type: "Shots off Goal", value: 6 },
          { type: "Blocked Shots", value: 3 },
          { type: "Corner Kicks", value: 8 },
          { type: "Offsides", value: 2 },
          { type: "Fouls", value: 9 },
          { type: "Yellow Cards", value: 1 },
          { type: "Red Cards", value: 0 },
          { type: "Goalkeeper Saves", value: 4 },
          { type: "Total passes", value: 489 },
          { type: "Passes accurate", value: 418 },
          { type: "Passes %", value: "85%" },
          { type: "expected_goals", value: "2.15" },
        ],
      },
      {
        team: { id: matched.teams.away.id, name: matched.teams.away.name, logo: matched.teams.away.logo },
        statistics: [
          { type: "Ball Possession", value: "46%" },
          { type: "Total Shots", value: 11 },
          { type: "Shots on Goal", value: 5 },
          { type: "Shots off Goal", value: 4 },
          { type: "Blocked Shots", value: 2 },
          { type: "Corner Kicks", value: 4 },
          { type: "Offsides", value: 1 },
          { type: "Fouls", value: 12 },
          { type: "Yellow Cards", value: 2 },
          { type: "Red Cards", value: 0 },
          { type: "Goalkeeper Saves", value: 5 },
          { type: "Total passes", value: 412 },
          { type: "Passes accurate", value: 345 },
          { type: "Passes %", value: "83%" },
          { type: "expected_goals", value: "1.42" },
        ],
      },
    ],
    lineups: [
      {
        team: {
          id: matched.teams.home.id,
          name: matched.teams.home.name,
          logo: matched.teams.home.logo,
          colors: { player: { primary: "c8102e", number: "ffffff", border: "ffffff" } },
        },
        coach: { id: 18, name: "Arne Slot", photo: "https://media.api-sports.io/football/coachs/18.png" },
        formation: "4-3-3",
        startXI: [
          { player: { id: 101, name: "Alisson Becker", number: 1, pos: "G", grid: "1:1" } },
          { player: { id: 102, name: "Trent Alexander-Arnold", number: 66, pos: "D", grid: "2:4" } },
          { player: { id: 103, name: "Ibrahima Konate", number: 5, pos: "D", grid: "2:3" } },
          { player: { id: 104, name: "Virgil van Dijk", number: 4, pos: "D", grid: "2:2" } },
          { player: { id: 105, name: "Andy Robertson", number: 26, pos: "D", grid: "2:1" } },
          { player: { id: 106, name: "Ryan Gravenberch", number: 38, pos: "M", grid: "3:3" } },
          { player: { id: 107, name: "Alexis Mac Allister", number: 10, pos: "M", grid: "3:2" } },
          { player: { id: 108, name: "Dominik Szoboszlai", number: 8, pos: "M", grid: "3:1" } },
          { player: { id: 110, name: "Mohamed Salah", number: 11, pos: "F", grid: "4:3" } },
          { player: { id: 112, name: "Luis Diaz", number: 7, pos: "F", grid: "4:2" } },
          { player: { id: 113, name: "Cody Gakpo", number: 18, pos: "F", grid: "4:1" } },
        ],
        substitutes: [
          { player: { id: 114, name: "Caoimhin Kelleher", number: 62, pos: "G" } },
          { player: { id: 115, name: "Joe Gomez", number: 2, pos: "D" } },
          { player: { id: 116, name: "Curtis Jones", number: 17, pos: "M" } },
          { player: { id: 117, name: "Darwin Nunez", number: 9, pos: "F" } },
          { player: { id: 118, name: "Harvey Elliott", number: 19, pos: "M" } },
        ],
      },
      {
        team: {
          id: matched.teams.away.id,
          name: matched.teams.away.name,
          logo: matched.teams.away.logo,
          colors: { player: { primary: "6cabdd", number: "ffffff", border: "001838" } },
        },
        coach: { id: 4, name: "Pep Guardiola", photo: "https://media.api-sports.io/football/coachs/4.png" },
        formation: "4-2-3-1",
        startXI: [
          { player: { id: 201, name: "Ederson", number: 31, pos: "G", grid: "1:1" } },
          { player: { id: 202, name: "Kyle Walker", number: 2, pos: "D", grid: "2:4" } },
          { player: { id: 203, name: "Ruben Dias", number: 3, pos: "D", grid: "2:3" } },
          { player: { id: 204, name: "Manuel Akanji", number: 25, pos: "D", grid: "2:2" } },
          { player: { id: 205, name: "Josko Gvardiol", number: 24, pos: "D", grid: "2:1" } },
          { player: { id: 206, name: "Rodri", number: 16, pos: "M", grid: "3:2" } },
          { player: { id: 207, name: "Mateo Kovacic", number: 8, pos: "M", grid: "3:1" } },
          { player: { id: 208, name: "Bernardo Silva", number: 20, pos: "M", grid: "4:3" } },
          { player: { id: 209, name: "Kevin De Bruyne", number: 17, pos: "M", grid: "4:2" } },
          { player: { id: 210, name: "Phil Foden", number: 47, pos: "M", grid: "4:1" } },
          { player: { id: 125, name: "Erling Haaland", number: 9, pos: "F", grid: "5:1" } },
        ],
        substitutes: [
          { player: { id: 212, name: "Stefan Ortega", number: 18, pos: "G" } },
          { player: { id: 213, name: "Nathan Ake", number: 6, pos: "D" } },
          { player: { id: 214, name: "John Stones", number: 5, pos: "D" } },
          { player: { id: 127, name: "Jeremy Doku", number: 11, pos: "F" } },
          { player: { id: 128, name: "Jack Grealish", number: 10, pos: "F" } },
        ],
      },
    ],
  };
}

export function getMockStandings(leagueId = 39) {
  const league = MAJOR_LEAGUES.find((l) => l.id === Number(leagueId)) || MAJOR_LEAGUES[0];

  const premClubs = [
    { rank: 1, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png", p: 27, w: 20, d: 4, l: 3, gf: 66, ga: 26, gd: 40, pts: 64, form: "WWWDW", desc: "Champions League Group Stage" },
    { rank: 2, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png", p: 27, w: 18, d: 6, l: 3, gf: 60, ga: 24, gd: 36, pts: 60, form: "WDWWW", desc: "Champions League Group Stage" },
    { rank: 3, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png", p: 27, w: 17, d: 5, l: 5, gf: 58, ga: 29, gd: 29, pts: 56, form: "LWDWW", desc: "Champions League Group Stage" },
    { rank: 4, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png", p: 27, w: 15, d: 7, l: 5, gf: 53, ga: 34, gd: 19, pts: 52, form: "WWDLW", desc: "Champions League Group Stage" },
    { rank: 5, name: "Aston Villa", logo: "https://media.api-sports.io/football/teams/66.png", p: 27, w: 14, d: 7, l: 6, gf: 48, ga: 37, gd: 11, pts: 49, form: "DWWLD", desc: "Europa League Group Stage" },
    { rank: 6, name: "Newcastle", logo: "https://media.api-sports.io/football/teams/34.png", p: 27, w: 13, d: 5, l: 9, gf: 46, ga: 36, gd: 10, pts: 44, form: "WLWWL", desc: "Conference League Playoff" },
    { rank: 7, name: "Tottenham", logo: "https://media.api-sports.io/football/teams/47.png", p: 27, w: 12, d: 4, l: 11, gf: 52, ga: 41, gd: 11, pts: 40, form: "LWLWW", desc: null },
    { rank: 8, name: "Brighton", logo: "https://media.api-sports.io/football/teams/51.png", p: 27, w: 10, d: 9, l: 8, gf: 41, ga: 39, gd: 2, pts: 39, form: "DDLWD", desc: null },
    { rank: 9, name: "Fulham", logo: "https://media.api-sports.io/football/teams/36.png", p: 27, w: 10, d: 8, l: 9, gf: 38, ga: 37, gd: 1, pts: 38, form: "WLDDW", desc: null },
    { rank: 10, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png", p: 27, w: 10, d: 6, l: 11, gf: 35, ga: 38, gd: -3, pts: 36, form: "LLWLD", desc: null },
    { rank: 11, name: "Brentford", logo: "https://media.api-sports.io/football/teams/55.png", p: 27, w: 10, d: 4, l: 13, gf: 44, ga: 46, gd: -2, pts: 34, form: "WLLWL", desc: null },
    { rank: 12, name: "Bournemouth", logo: "https://media.api-sports.io/football/teams/35.png", p: 27, w: 9, d: 7, l: 11, gf: 36, ga: 40, gd: -4, pts: 34, form: "LWDDL", desc: null },
  ];

  return [
    {
      league: {
        id: league.id,
        name: league.name,
        country: league.country,
        logo: league.logo,
        flag: league.flag,
        season: 2024,
        standings: [
          premClubs.map((c, i) => ({
            rank: c.rank,
            team: { id: 30 + i, name: c.name, logo: c.logo },
            points: c.pts,
            goalsDiff: c.gd,
            group: "Regular Season",
            form: c.form,
            status: "same",
            description: c.desc,
            all: { played: c.p, win: c.w, draw: c.d, lose: c.l, goals: { for: c.gf, against: c.ga } },
          })),
        ],
      },
    },
  ];
}

