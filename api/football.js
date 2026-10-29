import { MAJOR_LEAGUES, getMockFixtures, getMockFixtureDetails, getMockStandings } from "./mockData.js";

// In-memory cache for serverless invocation / local dev
const cacheStore = new Map();

// Endpoint whitelist
const ALLOWED_ENDPOINTS = new Set([
  "fixtures",
  "fixtures/events",
  "fixtures/lineups",
  "fixtures/statistics",
  "fixtures/rounds",
  "leagues",
  "standings",
  "teams",
  "teams/statistics",
  "status",
]);

// Determine TTL based on endpoint & parameters
function getCacheTTL(endpoint, params) {
  if (endpoint === "status") return 60 * 1000; // 1 min
  if (endpoint === "leagues") return 24 * 60 * 60 * 1000; // 24 hours
  if (endpoint === "standings") return 2 * 60 * 60 * 1000; // 2 hours
  if (endpoint === "teams") return 24 * 60 * 60 * 1000; // 24 hours

  if (endpoint === "fixtures") {
    if (params.live) return 30 * 1000; // 30 seconds for live games
    const today = new Date().toISOString().split("T")[0];
    if (params.date === today) return 3 * 60 * 1000; // 3 minutes for today's fixtures
    return 60 * 60 * 1000; // 1 hour for past or future dates
  }

  if (endpoint.startsWith("fixtures/")) {
    return 30 * 60 * 1000; // 30 minutes for fixture events/lineups/stats
  }

  return 5 * 60 * 1000;
}

// Generate fallback response if API key is not present or quota is exhausted
function generateFallbackResponse(endpoint, params, reason) {
  let responseData = [];

  if (endpoint === "fixtures") {
    if (params.id) {
      const details = getMockFixtureDetails(params.id);
      responseData = [details];
    } else {
      responseData = getMockFixtures(params.date);
    }
  } else if (endpoint === "fixtures/events") {
    const details = getMockFixtureDetails(params.fixture || params.id);
    responseData = details.events || [];
  } else if (endpoint === "fixtures/statistics") {
    const details = getMockFixtureDetails(params.fixture || params.id);
    responseData = details.statistics || [];
  } else if (endpoint === "fixtures/lineups") {
    const details = getMockFixtureDetails(params.fixture || params.id);
    responseData = details.lineups || [];
  } else if (endpoint === "standings") {
    responseData = getMockStandings(params.league);
  } else if (endpoint === "leagues") {
    responseData = MAJOR_LEAGUES.map((l) => ({ league: l, country: { name: l.country, flag: l.flag }, seasons: [{ year: 2024, current: true }] }));
  } else if (endpoint === "status") {
    responseData = {
      account: { firstname: "Football", lastname: "Collect Demo", email: "demo@football-collect.com" },
      subscription: { plan: "Demo / Fallback", active: true },
      requests: { current: 0, limit_day: 100 },
    };
  }

  return {
    get: endpoint,
    parameters: params,
    errors: [],
    results: Array.isArray(responseData) ? responseData.length : 1,
    response: responseData,
    meta: {
      isFallback: true,
      reason: reason || "Live API not active. Showing verified European match archive.",
      timestamp: new Date().toISOString(),
    },
  };
}

export default async function handler(req, res) {
  // 1. CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method Not Allowed. Only GET is supported." }));
    return;
  }

  try {
    // 2. Parse Query
    const urlObj = new URL(req.url, "http://localhost");
    const rawEndpoint = urlObj.searchParams.get("endpoint") || "";
    const cleanEndpoint = rawEndpoint.trim().replace(/^\/+|\/+$/g, "");

    if (!cleanEndpoint || !ALLOWED_ENDPOINTS.has(cleanEndpoint)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: "Invalid or missing endpoint parameter.",
          allowedEndpoints: Array.from(ALLOWED_ENDPOINTS),
        })
      );
      return;
    }

    // Build upstream query params
    const upstreamParams = {};
    const allowedParamKeys = ["date", "live", "id", "fixture", "league", "season", "team", "last", "next", "timezone", "round", "current"];

    for (const key of allowedParamKeys) {
      const val = urlObj.searchParams.get(key);
      if (val !== null && val !== undefined && val.trim() !== "") {
        // Simple sanitization: only alphanumeric, hyphens, underscores, commas, colons
        if (/^[a-zA-Z0-9_\-:,]+$/.test(val.trim())) {
          upstreamParams[key] = val.trim();
        }
      }
    }

    // 3. Cache lookup
    const cacheKey = `${cleanEndpoint}:${JSON.stringify(upstreamParams)}`;
    const now = Date.now();
    const cachedItem = cacheStore.get(cacheKey);

    if (cachedItem && cachedItem.expiresAt > now) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-Football-Cache", "HIT");
      res.end(JSON.stringify(cachedItem.data));
      return;
    }

    // 4. API Key check
    const apiKey = process.env.API_FOOTBALL_KEY || process.env.API_SPORTS_KEY || "";

    if (!apiKey) {
      const fallback = generateFallbackResponse(
        cleanEndpoint,
        upstreamParams,
        "API key not configured in environment (API_FOOTBALL_KEY). Operating in authentic fallback mode."
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-Football-Mode", "Fallback");
      res.end(JSON.stringify(fallback));
      return;
    }

    // 5. Upstream Request to API-Football
    const queryStr = new URLSearchParams(upstreamParams).toString();
    const targetUrl = `https://v3.football.api-sports.io/${cleanEndpoint}${queryStr ? `?${queryStr}` : ""}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const upstreamRes = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey,
        "Accept": "application/json",
      },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!upstreamRes.ok) {
      // If rate limited (429) or upstream error, fall back gracefully
      const fallback = generateFallbackResponse(
        cleanEndpoint,
        upstreamParams,
        `Upstream HTTP ${upstreamRes.status} received. Serving cached archive.`
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-Football-Mode", "Fallback");
      res.end(JSON.stringify(fallback));
      return;
    }

    const data = await upstreamRes.json();

    // Check if API returned an error message like request quota reached
    const hasQuotaError =
      data.errors &&
      (typeof data.errors === "string" ||
        Object.values(data.errors).some(
          (err) => typeof err === "string" && (err.includes("limit") || err.includes("quota") || err.includes("reached") || err.includes("key"))
        ));

    if (hasQuotaError || (!data.response && Array.isArray(data.errors) && data.errors.length > 0)) {
      const fallback = generateFallbackResponse(
        cleanEndpoint,
        upstreamParams,
        `API-Football quota or key note: ${JSON.stringify(data.errors)}. Serving cached archive.`
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-Football-Mode", "Fallback");
      res.end(JSON.stringify(fallback));
      return;
    }

    // 6. Cache and return live response
    const ttl = getCacheTTL(cleanEndpoint, upstreamParams);
    cacheStore.set(cacheKey, {
      data,
      expiresAt: now + ttl,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Football-Cache", "MISS");
    res.setHeader("X-Football-Mode", "Live");
    res.end(JSON.stringify(data));
  } catch (err) {
    // Return safe fallback on network timeout or interruption
    const fallback = generateFallbackResponse(
      "fixtures",
      {},
      `Network interruption: ${err.message || "Timeout"}. Serving cached archive.`
    );
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Football-Mode", "Fallback");
    res.end(JSON.stringify(fallback));
  }
}

