# Honeymoon Site — Project Goals & Ongoing Review System

## Core Goal

Make the website self-improving through a scheduled Claude Code task that:
- Reviews the current state of the site
- Identifies gaps and open items
- Researches and proposes new ideas (restaurants, logistics, activities, copy)
- Surfaces a **digestible set of action items** — not everything at once
- Stages changes as a GitHub pull request for review and approval before anything goes live

Nothing gets implemented without approval. The PR is the gate.

---

## How the Review Loop Works

1. Scheduled task runs (weekly or on demand)
2. Claude reads `index.html` and this file for context
3. Claude identifies 3–5 prioritized action items from the open list below
4. Claude researches options where applicable (restaurants, hotels, transfers)
5. Claude drafts changes and pushes to a `claude/` branch on GitHub
6. A pull request is created — you review the diff, merge if happy
7. GitHub Pages auto-deploys on merge

---

## Open Items (updated May 2026)

- [ ] Confirm and add actual flight booking — Air NZ NZ2, JFK→AKL Nov 6. 6-month window now open; book before end of June for Business Premier availability.
- [x] Add travel logistics for each stop (transfer times, car hire, ferry/flight details) — done April 2026
- [x] Fill in day-by-day activities for all stops — done April 2026
- [x] Add restaurant recommendations for each destination — done April 2026
- [ ] Book Raglan accommodation (Stop 2) — URGENT, book before June 2026. All other accommodations confirmed.
- [ ] Add actual booking/reservation reference numbers and check-in times
- [ ] Activity bookings still needed: Hobbiton (hobbitontours.com), Kaituna rafting, OTT heli hike, Milford Sound cruise (realnz.com / goorange.co.nz), Cloud 9 (cloud9fiji.com), Reel Fiji (reelfiji.com), Aqua-Trek dive
- [ ] Restaurant bookings still needed: The Oyster Inn (Waiheke Day 1), Casita Miro + Tantalus or Mudbrick (Waiheke Day 2), Atticus Finch (Rotorua Day 1), Indigo (Fiji Days 3 & 5)
- [ ] Cancel Rātā Nov 13 reservation — keep Nov 14 (post-Ben Lomond). ~NZD 100/pp cancellation fee.

---

## Ideas to Consider

- Add a packing list section (collapsible, destination-aware)
- Add a budget tracker or cost summary section
- Add weather info for each destination and travel month
- Add a "getting there" section per stop (transport between destinations)
- Add a shared notes or memory section for the couple

---

## Notifications

Two-channel approach: GitHub email (automatic) + Telegram (instant ping with PR link).
Telegram notifications configured and running via scheduled remote trigger — see claude.ai/code/scheduled for details.

---

## Decisions Made

- Stack: Vanilla HTML/CSS/JS — no frameworks
- Hosting: GitHub Pages
- Map: Leaflet.js (no API key required)
- Theme: Dark background, gold accents, Inter font
- Mobile image fix completed March 2026 (opacity-only fade on mobile to avoid GPU layer issues)

---

## Session History

- **March 2026** — Discussed remote trigger / scheduled task approach for making site changes from any device. Decided on GitHub PR workflow as the approval mechanism. Chose GitHub email + Telegram bot for notifications. Telegram setup steps documented above.
- **April 2026 (Dispatch sessions)** — Filled in travel logistics for all NZ stops. Added weather sections for all destinations. Upgraded Raglan logistics. Added restaurant guides for Raglan, Queenstown, Rotorua. Added Fiji water activities and port logistics. Expanded Fiordland and Fiji day slots. Added TRIP-CONTEXT.md for Telegram bot context. Updated Fiji hotel to Marriott Resort Momi Bay.
- **April 2026 (Interactive)** — Added per-day Restaurants slot (restaurant options) and Resy's slot (confirmed reservations) to every day across all stops. Renamed general "Restaurant Guide" sections to "Other Restaurants". Clarified PR workflow (interactive vs. scheduled) and tightened TRIP-CONTEXT.md sync rule in CLAUDE.md.
- **May 2026 (Dispatch)** — Added 6-month booking urgency notes: flight booking window (NYC Departure Notes), Raglan accommodation deadline (book before June 2026), Milford Sound cruise booking reminder (Fiordland Day 2 Resy's), Cloud 9 day pass reminder (Fiji Day 4 Resy's), e-bike wine tour booking reminder (Queenstown Day 4 Resy's). Updated PROJECT-GOALS.md open items to reflect current state.
