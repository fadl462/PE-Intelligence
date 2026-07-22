# PE Intelligence™ — AI Investment Operating System

A client-facing prototype for the "Venture and Private Equity Due-Diligence Specialist" bid — built to demonstrate an AI-powered alternative to hiring a full-time analyst.

**All data on this platform is illustrative demo data — company names, figures, and documents are fictional, prepared to make the pitch feel real.**

## What it shows
A full institutional workflow on one sample deal (GreenTech Solar), plus 4 supporting deals:

- **Dashboard** — engine status, today's activity, priority deal triage, and a live Houn activity log
- **Deals & Data Rooms** — simulated upload with a "Houn is reading…" working indicator + AI document checklist with reasoning
- **Financial Models** — live 3-statement model, LBO builder, and Monte Carlo stress test, with real-time slider-driven IRR/MOIC/NPV recompute
- **Contract Intelligence** — clause-level risk tagging + AI alert callouts
- **Market Intelligence** — TAM/SAM/SOM, competitor share, SWOT, comps, management assessment
- **Risk Engine** — category scorecard, radar chart, heat map, ESG scoring
- **Investment Committee** — auto-drafted memo outline with section previews, deck strip, mock PPT/PDF/Word export
- **Portfolio / Fund Administration / Investor Portal** — post-investment lifecycle
- **Houn** — the AI assistant, docked bottom-right, with a pulsing "working" indicator and a typing animation while it "thinks"
- **⌘K command palette** — jump to any section instantly
- **3 themes** — Obsidian (dark, emerald), Midnight (navy, cyan), Ivory (light, client-facing) — switch from the topbar or Settings
- **Hover tooltips + click-through on nearly every element** — cards, chips, rows, and badges all say what they represent and open a detail popover on click

## Deploying to GitHub Pages
1. Push `index.html`, `app.js`, and `data.js` to this repo's root (already done).
2. Settings → Pages → Deploy from branch → `main` / root.
3. Done — no build step, it's plain HTML/CSS/JS + Chart.js from CDN.

## Notes for the pitch
- Mention up front that the data is illustrative — every number, name, and document is a demo placeholder.
- Houn's chat gives scripted answers here; in the real build, it would call an LLM grounded in the actual data room.
- Export buttons simulate the action (toast notification) — real export wiring (PPTX/PDF/DOCX generation) is a build-phase task, not a prototype one.

