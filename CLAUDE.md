# Honeymoon Itinerary Site — CLAUDE.md

A personal honeymoon itinerary website for a New Zealand trip (Nov 6, 2026, departing NYC).
Vanilla HTML/CSS/JS, hosted on GitHub Pages.

## Before You Start

Read these two files first:
- `PROJECT-GOALS.md` — open items, ideas, decisions, and session history
- `honeymoon-site-skill.md` — full design standards, code rules, and what not to do

## Workflow

- Pick 3–5 highest-value open items from PROJECT-GOALS.md
- **Scheduled / autonomous sessions:** push to a `claude/review-YYYY-MM-DD` branch, open a GitHub PR, and send two Telegram messages to the Honeymoon Planning group (chat ID and bot token are in the scheduled trigger prompt — not stored here). Nothing goes live without a PR merge — the PR is the approval gate.
- **Interactive sessions (user present in chat):** may commit directly to `main` with user approval in conversation. PR flow not required when the user is reviewing live.

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks, no build tools, no npm
- GitHub Pages (static files only, no backend)
- Leaflet.js for maps, Inter font via Google Fonts

## Hard Rules

- No frameworks, no backend, no API keys for core features
- Do not change the dark theme or gold accent color scheme
- Do not open a PR without a clear summary of what changed and what still needs human input
- Keep code commented and readable — the site owner is learning
- Update TRIP-CONTEXT.md whenever you change trip details in index.html (dates, accommodations, flights, transfers, activities, bookings). UI or style-only changes (new sections, placeholder slots, visual tweaks) do not require a sync.
