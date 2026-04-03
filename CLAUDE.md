# Honeymoon Itinerary Site — CLAUDE.md

A personal honeymoon itinerary website for a New Zealand trip (Nov 6, 2026, departing NYC).
Vanilla HTML/CSS/JS, hosted on GitHub Pages.

## Before You Start

Read these two files first:
- `PROJECT-GOALS.md` — open items, ideas, decisions, and session history
- `honeymoon-site-skill.md` — full design standards, code rules, and what not to do

## Workflow

- Pick 3–5 highest-value open items from PROJECT-GOALS.md
- Push changes to a `claude/review-YYYY-MM-DD` branch and open a GitHub PR
- Nothing goes live without a PR merge — the PR is the approval gate
- After opening a PR, send two Telegram messages to the Honeymoon Planning group
  (chat ID and bot token are in the scheduled trigger prompt — not stored here)

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks, no build tools, no npm
- GitHub Pages (static files only, no backend)
- Leaflet.js for maps, Inter font via Google Fonts

## Hard Rules

- No frameworks, no backend, no API keys for core features
- Do not change the dark theme or gold accent color scheme
- Do not open a PR without a clear summary of what changed and what still needs human input
- Keep code commented and readable — the site owner is learning
- Whenever you modify index.html, also update TRIP-CONTEXT.md to reflect the current state of the trip — this file is read by the Telegram bot and must stay accurate
