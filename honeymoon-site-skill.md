# Honeymoon Website Enhancement Guide

This guide defines standards and best practices for enhancing a vanilla HTML/CSS/JS honeymoon itinerary website. The site is a personal travel planning tool and shareable page — not a production SaaS app. Prioritize visual polish, usability, and progressive enhancement over framework complexity.

## Current Status

### Last Updated
February 28, 2026

### What's Been Done
- Hero section with a 4-photo crossfading carousel (Milford Sound, Queenstown, Manapouri, Waiheke Island)
- Live countdown timer ticking down to departure (Nov 6, 2026, NYC)
- "At a Glance" summary table listing all 14 confirmed nights with dates, locations, and hotels
- Interactive Leaflet.js map using CartoDB Voyager tiles with numbered color-coded teardrop pins and a dashed route polyline
- Map pins pulse/enlarge as the user scrolls to the corresponding stop card
- Clicking a map pin scrolls to and auto-expands the relevant stop card
- Sticky navigation bar with per-destination color dots and active-section highlighting via IntersectionObserver
- Collapsible stop cards using native `<details>`/`<summary>` with animated chevron
- Per-destination hero photo backgrounds on each stop card
- Day-by-day nested accordion (Morning / Afternoon / Evening time slots) for each stop
- Expand / Collapse All button for the full itinerary
- Scroll-to-top floating button
- Full print stylesheet (hides hero, map, nav; forces all details open)
- Mobile-responsive layout (single-column glance table, static map, horizontal-scroll nav)
- Open Graph / Twitter Card meta tags for social sharing
- Google Maps address links on each stop card
- Emoji favicon and Inter font loaded via Google Fonts
- **Accessibility / contrast pass (Feb 2026):** bumped `--text-muted` and `--text-placeholder` CSS variables for ≥ 4:1 contrast on dark surfaces; added `text-shadow` to all hero text; darkened hero overlay (center zone 18% → 48%); bumped small body text to ≥ 14–16 px across the full page; strengthened stop-card gradient overlays
- **Mobile image fix (Feb 2026):** hero carousel photos converted from CSS `background-image` to real `<img>` tags with `object-fit: cover` so browsers can't skip them in data-saver mode; added `top/right/bottom/left: 0` fallbacks alongside every `inset: 0` to fix invisible hero on iOS < 14.5 (which doesn't support the `inset` shorthand); added `fetchpriority="high"` on the first carousel frame and a `<link rel="preload">` hint; fixed `crossorigin` mismatch on the Wikimedia preconnect

### What's Next
- Fill in actual flight details, layover info, and airline for the NYC departure
- Add travel logistics for each stop (transfer times, car hire, ferry/flight details)
- Fill in day-by-day activities for all stops (currently all placeholder text)
- Add restaurant recommendations for each destination
- Confirm and book the 7 remaining nights (Nov 21–28) and add them to the site
- Add actual booking/reservation reference numbers and check-in times

## Project Context

- **Stack**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Hosting**: GitHub Pages (static files only, no backend)
- **Audience**: The couple planning the trip + friends/family they share it with
- **Skill level of owner**: Beginner — keep code readable and well-commented

## Design Direction

The site uses a dark theme with gold accents. Maintain this palette and feel across all enhancements. The tone is **refined travel luxury** — think boutique hotel website, not generic travel blog.

- Keep the existing color scheme consistent when adding new elements
- New sections should match the visual weight and spacing of existing ones
- Avoid introducing new fonts or colors without clear justification

## External Links & Resources

When adding links to hotels, activities, restaurants, or other external resources:

- Open all external links in a new tab: `target="_blank"` with `rel="noopener noreferrer"`
- Add a small external link icon (↗ or SVG) next to external links so users can distinguish them from internal navigation
- Group related links clearly (e.g., "Book This Hotel", "View on Google Maps", "Official Website")
- Use descriptive link text — "Book Kamana Lakehouse" not "Click here"
- Style external links consistently: same color, same hover behavior, same icon treatment throughout the site

## Maps Integration

Use **Leaflet.js** (free, no API key required) for interactive maps. Do not use Google Maps JavaScript API (requires billing setup).

- Use OpenStreetMap tiles: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- Add attribution as required by OpenStreetMap
- Pin markers should be color-coded to match destination accent colors used elsewhere on the page
- Each marker popup should show: destination name, dates, accommodation name, and a link to Google Maps for driving directions
- Google Maps links for directions use this format: `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}`
- Google Maps links for places use: `https://www.google.com/maps/search/?api=1&query={place+name+address}`
- Keep maps responsive — they should work on mobile without horizontal scrolling
- Set a sensible default zoom level that shows all of New Zealand with all pins visible

## Accessibility Basics

These are non-negotiable even for a personal site:

- All images need `alt` text (descriptive for content images, `alt=""` for decorative)
- All interactive elements (buttons, links, toggles) must be keyboard accessible
- Use semantic HTML: `<button>` for actions, `<a>` for links, `<nav>` for navigation, `<section>` for content blocks
- Collapse/expand toggles need `aria-expanded` attribute
- Color contrast: ensure text is readable against backgrounds (especially gold text on dark backgrounds)
- Icon-only buttons need `aria-label`

## Collapsible Sections

When implementing expand/collapse behavior:

- Use `<details>` and `<summary>` where possible (native HTML, no JS required, accessible by default)
- If custom JS is needed for styling reasons, include `aria-expanded` on the trigger and toggle `hidden` or a CSS class on the content
- Add a smooth height transition for opening/closing (CSS `max-height` transition or similar)
- Include a visual indicator of state: chevron/arrow that rotates, +/− icon, or similar
- Remember the design: collapsed state should still show enough info to be useful (location name, dates, accommodation)

## Sticky Navigation

- Keep the nav bar slim — destination names only, no excessive detail
- Highlight the currently visible section as the user scrolls (use `IntersectionObserver`)
- On mobile, the nav should either scroll horizontally or collapse into a dropdown
- Ensure the sticky nav doesn't obscure content — add `scroll-margin-top` to section headings to account for nav height
- Style should be semi-transparent or blurred background to maintain the dark luxury feel

## Images & Media

- Always include `width` and `height` attributes on `<img>` tags to prevent layout shift
- Use `loading="lazy"` on images below the fold
- Hero/banner images for destinations should use high-quality landscape photos
- Free image sources (no API key needed): Unsplash (`https://images.unsplash.com/`), Pexels
- Optimize images for web — large hero images should be ~200KB max, not multi-MB originals
- Consider using `<picture>` with `srcset` for responsive image sizes on mobile vs desktop

## Animation & Motion

- Keep animations subtle and purposeful — this is a travel site, not a tech demo
- Honor `prefers-reduced-motion`: wrap animations in `@media (prefers-reduced-motion: no-preference)`
- Only animate `transform` and `opacity` for smooth performance
- Never use `transition: all` — always list specific properties
- Good candidates for animation: section reveals on scroll, hover effects on cards, countdown timer digit transitions, map marker bounce on load

## Typography & Content Polish

- Use proper ellipsis character `…` not three dots `...`
- Use curly quotes `"` `"` not straight quotes where they appear in content
- Non-breaking spaces between numbers and units: `20&nbsp;nights`, `2.5&nbsp;hrs`
- Use `text-wrap: balance` on headings to prevent awkward line breaks
- Use `font-variant-numeric: tabular-nums` on the countdown timer and any number columns for consistent alignment

## Mobile Responsiveness

- Test all changes at mobile widths (375px) — the site will likely be viewed on phones
- Maps must be touch-friendly: pinch to zoom, tap markers to open popups
- Sticky nav must not take up excessive vertical space on small screens
- Collapsible sections are especially important on mobile to reduce scrolling
- External link icons should not cause text to wrap awkwardly on narrow screens

## Code Quality

Since the site owner is learning to code:

- Add clear comments explaining what each section of code does
- Keep JavaScript in a separate file (`script.js`), CSS in `style.css`, structure in `index.html`
- Use meaningful variable and function names (not `x`, `temp`, `foo`)
- Avoid deeply nested code — keep functions short and focused
- When adding new libraries (like Leaflet), load them from a CDN, not npm
- Include the CDN link in a comment so the owner understands where it comes from

## File Structure

Keep it simple and flat:

```
/
├── index.html
├── style.css
├── script.js
├── images/          (destination photos if added locally)
└── README.md        (brief description of the project)
```

Do not introduce build tools, bundlers, package managers, or framework dependencies unless explicitly requested.

## What NOT to Do

- Do not add a backend, database, or server-side code — this is a GitHub Pages static site
- Do not introduce React, Vue, Next.js, or any framework — stay vanilla
- Do not require API keys for core functionality (use free/open alternatives)
- Do not add cookie banners, analytics, or tracking scripts
- Do not over-engineer — this is a personal project, not a production app
- Do not remove the existing dark theme / gold accent color scheme
- Do not use `localStorage` for critical features — the site should work without it
