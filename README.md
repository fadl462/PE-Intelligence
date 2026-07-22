# PE Intelligence™ — AI Investment Operating System

A client-facing prototype for the "Venture and Private Equity Due-Diligence Specialist" bid — built to demonstrate an AI-powered alternative to hiring a full-time analyst.

## What it shows
A full institutional workflow, all with illustrative mock data on one sample deal (GreenTech Solar):

- **Dashboard** — engine status, today's activity, priority deal triage
- **Deals & Data Rooms** — simulated upload + AI document checklist with reasoning ("why this is flagged")
- **Financial Models** — live 3-statement model, LBO builder, and Monte Carlo stress test, with real-time slider-driven IRR/MOIC/NPV recompute
- **Contract Intelligence** — clause-level risk tagging + AI alert callouts
- **Market Intelligence** — TAM/SAM/SOM, competitor share, SWOT, comps, management assessment
- **Risk Engine** — category scorecard, radar chart, heat map, ESG scoring
- **Investment Committee** — auto-drafted memo outline, deck strip, mock PPT/PDF/Word export
- **Portfolio / Fund Administration / Investor Portal** — post-investment lifecycle
- **AI Copilot** — docked assistant with example prompts (canned responses for this demo)
- **⌘K command palette** — jump to any section instantly

## Deploying to GitHub Pages
1. Push `index.html`, `app.js`, and `data.js` to a repo.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Done — no build step, it's plain HTML/CSS/JS + Chart.js from CDN.

## Notes for the pitch
- All numbers are illustrative/mock — swap `data.js` for a real data room once the client signs off.
- The AI Copilot gives scripted answers here; in the real build, it would call an LLM against the actual data room contents.
- Export buttons simulate the action (toast notification) — real export wiring (PPTX/PDF/DOCX generation) is a build-phase task, not a prototype one.
