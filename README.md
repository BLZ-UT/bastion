# infraAnalysis

Live public market intelligence for critical infrastructure: Energy, Defense, AI Infrastructure,
Space, and Cybersecurity. Sector indexes, comps tables, and market coverage refresh from live
public data feeds; original research and podcast content sit alongside them.

## Development

```
npm install
npm run dev
```

## Data

- **Live quotes & returns** (`lib/marketData.ts`) — fetched from Stooq's free daily-history feed,
  cached briefly server-side, and merged onto the static fundamentals in `data/companies.ts`. If
  the feed is unreachable, the UI falls back to the last-known figures.
- **Live sector news** (`lib/newsFeed.ts`) — headlines pulled from Google News RSS per sector.
- **Fundamentals, curated insights, and podcast episodes** in `data/` remain static/editorial since
  they reflect periodic filings and authored research rather than a real-time feed.
