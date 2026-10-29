# Football Collect ⚽

A football platform and European club archive featuring live matchdays, fixture calendars, tactical formations, Opta-style statistics, verified trophy records, and comprehensive player directories.

**Production Deployment**: [https://football-collect.vercel.app/](https://football-collect.vercel.app/)

---

## 1. API-Football Integration & Architecture

Football Collect integrates with **API-Football (API-Sports v3)** using a secure server-side proxy layer. The client browser communicates with the application's internal `/api/football` route, keeping secret API keys completely hidden from client bundles.

```
Browser (React SPA) ──▶ /api/football ──▶ API-Football (v3.football.api-sports.io)
                               ▲
                      API_FOOTBALL_KEY
                   (Serverless / Vite Dev)
```

### Implemented Upstream Endpoints
- `/fixtures`: Daily fixtures, live match scores, and status updates.
- `/fixtures/events`: Chronological goals, substitutions, cards, and VAR incidents.
- `/fixtures/statistics`: Dual-team comparative statistics (Possession, Shots, xG, Corners, Fouls).
- `/fixtures/lineups`: Starting XI formations, pitch grid positions, substitutes, and head coaches.
- `/standings`: European league tables and qualification zones.
- `/leagues`: Competition metadata and country flags.
- `/teams`: Club identities and venue details.
- `/status`: Account subscription status and daily quota monitoring.

---

## 2. Secure Server-Side Caching & Rate Limits

The free tier of API-Football provides **100 requests per day**. To optimize performance and respect rate limits:
- **Server-Side In-Memory Cache**:
  - `status`: 1 minute TTL
  - `fixtures (live)`: 30 seconds TTL
  - `fixtures (today)`: 3 minutes TTL
  - `fixtures (past/future)`: 1 hour TTL
  - `standings`: 2 hours TTL
  - `leagues` & `teams`: 24 hours TTL
- **In-Flight Request Deduplication**: Duplicate concurrent requests share the same promise.
- **Graceful Fallback Mode**: If `API_FOOTBALL_KEY` is not configured or the daily quota is exhausted, Football Collect automatically provides high-fidelity European match records (Premier League, La Liga, Champions League, Serie A, Bundesliga). The app never crashes or presents empty broken layouts.

---

## 3. Environment Setup & Configuration

1. Register for a free API key at [API-Football Dashboard](https://dashboard.api-football.com/).
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Set your secret API key in `.env`:
   ```env
   API_FOOTBALL_KEY=your_actual_api_key_here
   ```
   *(Note: Never prefix with `VITE_` to ensure it remains server-side only).*

---

## 4. Local Development & Deployment

### Run Locally
```bash
# Install dependencies
npm install

# Start development server with live /api/football proxy
npm run dev
```

### Production Build
```bash
# Production Vite build
npm run build

# Preview build locally
npm run preview
```

### Vercel Deployment
Deploying to Vercel requires zero extra configuration. Vercel automatically deploys `api/football.js` as a Serverless Function. In your Vercel Project Dashboard:
1. Go to **Settings** > **Environment Variables**.
2. Add `API_FOOTBALL_KEY` with your API-Sports key value.
3. Redeploy.

---

## 5. Timezone Support
Match dates and kickoff times are computed dynamically in the user's local timezone. Nepal Standard Time (**NPT / UTC+5:45**) is also calculated and displayed alongside international kickoffs.
