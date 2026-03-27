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

## Open Items (from skill guide — as of March 2026)

- [ ] Fill in actual flight details, layover info, and airline for the NYC departure
- [ ] Add travel logistics for each stop (transfer times, car hire, ferry/flight details)
- [ ] Fill in day-by-day activities for all stops (currently placeholder text)
- [ ] Add restaurant recommendations for each destination
- [ ] Confirm and book the 7 remaining nights (Nov 21–28) and add them to the site
- [ ] Add actual booking/reservation reference numbers and check-in times

---

## Ideas to Consider

- Add a packing list section (collapsible, destination-aware)
- Add a budget tracker or cost summary section
- Add weather info for each destination and travel month
- Add a "getting there" section per stop (transport between destinations)
- Add a shared notes or memory section for the couple

---

## Review Prompt (use this to kick off a session)

Paste this into Claude Code or use it as a scheduled task prompt:

```
Read index.html and PROJECT-GOALS.md in this directory.

Review the current state of the site against the open items list.
Pick the 3–5 highest-value items to address next — prioritize things
that are close to complete or need the least new information.

For each item:
- Summarize what's missing
- Research and propose 2–3 options where applicable (restaurants, hotels, etc.)
- Draft the copy or code change

Push the drafts to a branch (claude/review-YYYY-MM-DD) and open a pull request
summarizing what was done and what still needs human input (e.g. personal
booking references, preferences between options).

Keep the tone consistent with the existing site: refined travel luxury,
dark theme, gold accents.
```

---

## Notifications Setup

Two-channel approach: **GitHub email** (automatic, no setup) + **Telegram** (instant ping with PR link).

### Telegram Bot Setup (one-time, ~5 minutes)

1. Open Telegram and message `@BotFather`
2. Send `/newbot` and follow the prompts — choose a name and username for your bot
3. BotFather gives you a **bot token** (looks like `123456789:ABCdef...`) — save this
4. Search for your new bot in Telegram and send it any message (this lets it find your chat ID)
5. Get your **chat ID** by visiting this URL in a browser (replace TOKEN with yours):
   `https://api.telegram.org/bot{TOKEN}/getUpdates`
   Look for `"chat":{"id":XXXXXXXXX}` in the response — that number is your chat ID

6. When setting up the scheduled task on claude.ai, add these as environment variables:
   - `TELEGRAM_TOKEN` = your bot token (store in password manager, never commit to repo)
   - `TELEGRAM_CHAT_ID` = `-5200165090` (Honeymoon Planning group — this is safe to store)

### Notification Command (Claude adds this at the end of each task run)

```bash
curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage" \
  -d "chat_id=$TELEGRAM_CHAT_ID" \
  -d "text=Honeymoon site review complete. PR ready for your review: {PR_URL}"
```

### Add this line to the Review Prompt

At the end of the review prompt, append:
```
When the PR is created, send a Telegram notification using the TELEGRAM_TOKEN
and TELEGRAM_CHAT_ID environment variables with the PR URL and a one-line summary
of what was changed.
```

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
