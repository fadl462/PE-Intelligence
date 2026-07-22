// ---------------------------------------------------------------
// PE INTELLIGENCE™ — MOCK DATA LAYER
// All figures are illustrative demo data, not real financials.
// ---------------------------------------------------------------

const ICONS = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`,
  deals: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  models: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-4 4"/></svg>`,
  contracts: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>`,
  market: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  risk: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  ic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg>`,
  portfolio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21V12h6v9"/></svg>`,
  fundadmin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  investors: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.36.36.68.63.94"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>`,
  warn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h8l-1 8 10-12h-8z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 17 6-5-6-5M12 19h8"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
};

const DUMMY_NOTE = "Demo data — every figure, name, and document on this platform is illustrative.";

// ---------------- THEMES ----------------
const THEMES = [
  { id: "obsidian", name: "Obsidian", icon: "terminal", note: "Bloomberg-terminal dark · emerald signal" },
  { id: "midnight", name: "Midnight", icon: "moon", note: "Deep navy · cyan signal" },
  { id: "ivory", name: "Ivory", icon: "sun", note: "Light desk mode · client-facing" },
];

// ---------------- HOUN ACTIVITY (live ticker + activity log) ----------------
const HOUN_TICKER = [
  "Lani is re-scoring GreenTech Solar against the latest cap table…",
  "Lani is cross-referencing Fintech Africa's customer contracts…",
  "Lani is drafting the ESG section of the Medical Robotics memo…",
  "Lani is pulling comparable transactions from Capital IQ…",
  "Lani is checking Nova Freightlink's insurance certificates…",
  "Lani is reconciling AgroChain Ghana's EBITDA add-backs…",
  "Lani is updating the risk heat map for 3 open deals…",
  "Lani is watching for covenant breaches across the portfolio…",
];

const HOUN_ACTIVITY_LOG = [
  { time: "2 min ago", text: "Flagged an uncapped indemnity clause in GreenTech Solar's shareholder agreement.", tag: "Contracts" },
  { time: "14 min ago", text: "Completed document checklist for Fintech Africa — 3 items missing.", tag: "Data Room" },
  { time: "31 min ago", text: "Rebuilt the 3-statement model for Nova Freightlink after new FY25 actuals arrived.", tag: "Models" },
  { time: "48 min ago", text: "Generated a 5-page investment memo draft for Medical Robotics.", tag: "IC Memo" },
  { time: "1 hr ago", text: "Detected customer concentration risk in Fintech Africa (top 3 clients = 61% of revenue).", tag: "Risk" },
  { time: "2 hrs ago", text: "Matched 4 comparable transactions for GreenTech Solar from Crunchbase + Capital IQ.", tag: "Market" },
  { time: "3 hrs ago", text: "Sent a document request for AgroChain Ghana's FY2023 tax filings.", tag: "Data Room" },
  { time: "Yesterday", text: "Closed the quarter-end NAV reconciliation — no variances found.", tag: "Fund Admin" },
];

const NOTIFICATIONS = [
  { title: "New AI Alert", body: "Unlimited indemnity clause detected in GreenTech Solar shareholder agreement.", severity: "high", view: "contracts" },
  { title: "Deal Score Updated", body: "Fintech Africa dropped from 74 to 71 after customer-concentration reweighting.", severity: "medium", view: "risk" },
  { title: "Document Missing", body: "AgroChain Ghana — FY2023 tax filings still outstanding.", severity: "medium", view: "deals" },
  { title: "Memo Ready", body: "Medical Robotics investment memo drafted and ready for review.", severity: "low", view: "ic" },
  { title: "Capital Call Due", body: "Meridian Family Office capital call reminder — due in 5 days.", severity: "low", view: "fundadmin" },
];

// ---------------- DEALS ----------------
const DEALS = [
  {
    id: "greentech", name: "GreenTech Solar", sector: "Renewable Energy · Series C",
    investment: "$12M", score: 87, rec: "INVEST", confidence: 94, priority: "HIGH",
    reasons: [], color: "emerald",
    tip: "Utility-scale solar EPC + O&M platform in Ghana. Click to open its data room."
  },
  {
    id: "fintechafrica", name: "Fintech Africa", sector: "Payments · Series B",
    investment: "$5M", score: 71, rec: "PROCEED WITH CAUTION", confidence: 68, priority: "MEDIUM",
    reasons: ["Customer concentration — top 3 clients = 61% of revenue"], color: "amber",
    tip: "Mobile payments rail across 4 West African markets. Click to open its data room."
  },
  {
    id: "medrobotics", name: "Medical Robotics", sector: "MedTech · Series A",
    investment: "$8M", score: 42, rec: "REJECT", confidence: 88, priority: "LOW",
    reasons: ["Unrealistic revenue projections", "Weak management execution history", "Unresolved legal IP dispute"], color: "red",
    tip: "Surgical-assist robotics spin-out. Click to open its data room."
  },
  {
    id: "novafreight", name: "Nova Freightlink", sector: "Logistics · Growth",
    investment: "$9M", score: 79, rec: "PROCEED", confidence: 81, priority: "MEDIUM",
    reasons: ["Fuel cost exposure not fully hedged"], color: "amber",
    tip: "Pan-regional freight brokerage platform. Click to open its data room."
  },
  {
    id: "agrochain", name: "AgroChain Ghana", sector: "AgriTech · Series B",
    investment: "$6.5M", score: 83, rec: "INVEST", confidence: 90, priority: "MEDIUM",
    reasons: [], color: "emerald",
    tip: "Cocoa and cashew supply-chain traceability platform. Click to open its data room."
  },
];

const ACTIVITY = [
  { label: "Deals Reviewed", value: "17", delta: "+4 this week", view: "deals", tip: "See every deal Lani has reviewed" },
  { label: "Documents Analyzed", value: "1,204", delta: "+112 today", view: "deals", tip: "See the data rooms behind this number" },
  { label: "Contracts Reviewed", value: "52", delta: "+6 today", view: "contracts", tip: "Open Contract Intelligence" },
  { label: "Memos Generated", value: "17", delta: "100% on-time", view: "ic", tip: "Open the Investment Committee workspace" },
  { label: "Avg. Review Time", value: "11 min", delta: "vs 6.5 days manual", view: "risk", tip: "See how Lani scores every deal this fast" },
  { label: "Risks Detected", value: "63", delta: "9 high severity", view: "risk", tip: "Open the Risk Engine" },
];

const ENGINES = [
  { name: "Financial Model Engine", detail: "Builds 3-statement models, LBO structures, and Monte Carlo stress tests for every deal automatically.", view: "models" },
  { name: "Due Diligence Engine", detail: "Runs 200+ automated checks across every data room and flags what's missing or inconsistent.", view: "deals" },
  { name: "Legal Contract Analyzer", detail: "Reads every uploaded contract and tags clauses by risk severity.", view: "contracts" },
  { name: "Risk Scoring Engine", detail: "Converts qualitative findings into a consistent, weighted 0–100 investment score.", view: "risk" },
  { name: "Market Intelligence", detail: "Pulls market sizing, comps, and competitor data from PitchBook, Capital IQ, Bloomberg, and more.", view: "market" },
  { name: "ESG Analysis", detail: "Scores environmental, social, and governance factors against your fund's investment policy.", view: "risk" },
  { name: "Portfolio Manager", detail: "Tracks covenants, board cadence, and exit readiness across every portfolio company.", view: "portfolio" },
];

const SECURITY_BADGES = [
  { name: "SOC 2", detail: "Type II audited annually." },
  { name: "ISO 27001", detail: "Certified information security management." },
  { name: "RBAC", detail: "Role-based access — analysts, partners, and LPs each see only what they should." },
  { name: "Encrypted Data Rooms", detail: "AES-256 at rest, TLS 1.3 in transit." },
  { name: "Audit Log", detail: "Every document view and AI action is logged and timestamped." },
  { name: "Version History", detail: "Full history of every memo, model, and edit — nothing is overwritten." },
  { name: "Private LLM", detail: "Deployable inside your own VPC — deal data never leaves your environment." },
  { name: "Offline Mode", detail: "Air-gapped deployment available for the most sensitive mandates." },
];

const DOC_UPLOAD_PROGRESS = [
  { label: "Financial Statements", pct: 100 },
  { label: "Contracts", pct: 100 },
  { label: "Legal Documents", pct: 100 },
  { label: "Forecasts", pct: 90 },
  { label: "Cap Tables", pct: 100 },
  { label: "HR & Payroll Records", pct: 82 },
];

const CHECKLIST = [
  { name: "Financial Statements", status: "ok", note: "Complete", explain: "3 years of audited statements reconcile cleanly with management accounts and the bank confirmation letter.", recommendation: "No action needed.", severity: "None" },
  {
    name: "Tax Returns", status: "bad", note: "Missing FY2023", severity: "Medium",
    explain: "Absence of the latest tax filings increases uncertainty around reported EBITDA. Lani cross-checked available filings against management accounts and found no FY2023 return on file.",
    recommendation: "Request FY2023 tax filings before proceeding to term sheet."
  },
  { name: "Customer Contracts", status: "ok", note: "Complete", explain: "All 14 top-20 customer contracts are on file and auto-renewal clauses have been mapped against the revenue forecast.", recommendation: "No action needed.", severity: "None" },
  {
    name: "Employment Agreements", status: "warn", note: "Incomplete", severity: "Low",
    explain: "14 of 22 senior employment agreements are on file. The remaining 8 belong to engineering leads hired in the last 6 months and appear to be under standard offer letters rather than long-form contracts.",
    recommendation: "Request signed long-form agreements for all engineering leads before close."
  },
  {
    name: "Environmental Reports", status: "bad", note: "Missing", severity: "Medium",
    explain: "No third-party environmental compliance report was found in the data room, which is a standard requirement for utility-scale solar assets of this size.",
    recommendation: "Commission an independent Phase I environmental assessment."
  },
  {
    name: "Insurance", status: "bad", note: "Expired", severity: "High",
    explain: "The general liability and equipment insurance policies on file expired 3 months ago with no renewal certificate uploaded.",
    recommendation: "Confirm active coverage in writing from the broker before wiring funds."
  },
  { name: "Intellectual Property", status: "ok", note: "Verified", explain: "All core patents and trademarks are assigned to the operating entity with no liens on file.", recommendation: "No action needed.", severity: "None" },
  {
    name: "Cybersecurity", status: "warn", note: "Weak", severity: "Medium",
    explain: "No evidence of SOC 2 or penetration testing was found. The company's SCADA monitoring stack for its solar farms is internet-facing with limited access controls.",
    recommendation: "Require a third-party penetration test as a condition of the term sheet."
  },
  { name: "Cap Table", status: "ok", note: "Verified", explain: "Fully diluted cap table reconciles with the option pool and prior round SAFEs — no discrepancies found.", recommendation: "No action needed.", severity: "None" },
];

const THREE_STATEMENT = {
  income: [
    ["Revenue", "$18.2M", "$21.5M", "$25.9M", "$31.6M"],
    ["Cost of Revenue", "($9.8M)", "($11.2M)", "($13.1M)", "($15.6M)"],
    ["Gross Profit", "$8.4M", "$10.3M", "$12.8M", "$16.0M"],
    ["Operating Expenses", "($4.1M)", "($4.6M)", "($5.2M)", "($5.9M)"],
    ["EBITDA", "$4.3M", "$5.7M", "$7.6M", "$10.1M"],
  ],
  balance: [
    ["Cash & Equivalents", "$3.1M", "$4.6M", "$7.2M", "$11.8M"],
    ["Total Assets", "$22.4M", "$27.1M", "$33.8M", "$42.5M"],
    ["Total Liabilities", "$9.6M", "$10.2M", "$11.1M", "$12.0M"],
    ["Shareholder Equity", "$12.8M", "$16.9M", "$22.7M", "$30.5M"],
  ],
  cashflow: [
    ["Operating Cash Flow", "$3.8M", "$5.1M", "$6.9M", "$9.2M"],
    ["Capex", "($1.9M)", "($2.2M)", "($2.6M)", "($3.0M)"],
    ["Free Cash Flow", "$1.9M", "$2.9M", "$4.3M", "$6.2M"],
  ],
  years: ["FY24", "FY25E", "FY26E", "FY27E"]
};

const CONTRACTS = [
  { name: "Shareholder Agreement", parties: "GreenTech Solar Holdings", risk: "high", flags: 3, tip: "3 flagged clauses, including one high-severity item" },
  { name: "Customer MSA — UtilityCo Ghana", parties: "GreenTech Solar / UtilityCo", risk: "medium", flags: 1, tip: "Standard MSA, one termination clause worth a second look" },
  { name: "Land Lease Agreement", parties: "GreenTech Solar / Tema Lands Ltd", risk: "low", flags: 0, tip: "Clean — market-standard terms throughout" },
  { name: "Senior Debt Facility", parties: "GreenTech Solar / Absa Bank", risk: "medium", flags: 2, tip: "2 covenant clauses flagged for review" },
  { name: "IP Licensing Agreement", parties: "GreenTech Solar / SolarCore Tech", risk: "low", flags: 0, tip: "Clean — ownership fully assigned" },
  { name: "Executive Employment — CEO", parties: "GreenTech Solar / K. Owusu", risk: "medium", flags: 1, tip: "Change-of-control clause flagged" },
  { name: "Customer MSA — Accra Power Co-op", parties: "Fintech Africa / Accra Power", risk: "high", flags: 2, tip: "Concentration risk — this client alone is 28% of revenue" },
  { name: "Series B Preferred Share Agreement", parties: "AgroChain Ghana Holdings", risk: "low", flags: 0, tip: "Clean — standard anti-dilution and liquidation terms" },
];

const CONTRACT_DETAIL = {
  summary: "A standard Series C shareholder agreement governing GreenTech Solar Holdings. Broadly market-standard on governance and anti-dilution, but contains one material outlier on indemnification that is unusual for a minority investment of this size.",
  clauses: [
    { name: "Termination Rights", risk: "low", detail: "Standard 90-day notice period, mutual — no red flags." },
    { name: "Change of Control", risk: "medium", detail: "Requires board approval but the investor consent threshold is lower than typical (60% vs. the usual 75%)." },
    { name: "Non-compete (24 months)", risk: "low", detail: "Standard scope and geography, enforceable under Ghanaian law." },
    { name: "IP Ownership Assignment", risk: "low", detail: "All IP created by founders and employees is cleanly assigned to the company." },
    { name: "Representations & Warranties", risk: "medium", detail: "Warranty survival period (36 months) is longer than the market-standard 18–24 months." },
    { name: "Indemnification (Clause 17.4)", risk: "high", detail: "No liability cap for the founder — see the AI Alert below." },
  ],
  alert: {
    clause: "Clause 17.4",
    text: "Unlimited indemnity obligation detected — the founder's personal indemnification cap was not carved out, exposing them (and by extension the cap table) to uncapped liability for breaches of the operating warranties.",
    severity: "HIGH",
    recommendation: "Negotiate a liability cap (typically 1–1.5x investment amount) before signing."
  }
};

const MARKET = {
  sources: ["PitchBook", "Capital IQ", "Bloomberg", "Crunchbase", "SEC EDGAR", "Companies House", "News & Filings", "Academic Research"],
  tam: "$48.2B", sam: "$6.4B", som: "$310M", cagr: "18.4%",
  competitors: [
    { name: "GreenTech Solar", share: 6, growth: "+42%" },
    { name: "SunGrid West Africa", share: 11, growth: "+18%" },
    { name: "Helios Power", share: 9, growth: "+22%" },
    { name: "Others (fragmented)", share: 74, growth: "+9%" },
  ],
  swot: {
    strengths: ["Vertically integrated EPC + O&M", "18% YoY revenue CAGR", "Strong utility offtake pipeline"],
    weaknesses: ["Customer concentration in 2 states", "Thin balance sheet cash buffer"],
    opportunities: ["Ghana renewable mandate expansion", "Regional West Africa expansion"],
    threats: ["Grid tariff policy risk", "New entrant with cheaper Chinese panels"]
  },
  comps: [
    { name: "SunGrid West Africa / Series C", ev: "$68M", multiple: "3.4x rev", tip: "Closest peer by geography and stage" },
    { name: "Helios Power / Series B", ev: "$41M", multiple: "3.1x rev", tip: "Earlier stage, lower margin profile" },
    { name: "M-KOPA Solar / Growth round", ev: "$210M", multiple: "4.0x rev", tip: "Aspirational comp — pan-African scale" },
  ],
  ceo: { name: "Kwabena Owusu", background: "12 yrs renewable infra, ex-Actis", exit: "Yes", bankruptcy: "None", reputation: 92, execution: 89, leadershipRisk: "Low" }
};

const RISK_CATEGORIES = [
  { name: "Market", score: 92, detail: "Large, growing TAM with a defensible position in utility-scale solar EPC." },
  { name: "Financial", score: 89, detail: "Strong margins and cash conversion; one open item on FY2023 tax filings." },
  { name: "Management", score: 81, detail: "CEO has a prior successful exit; two senior hires still ramping." },
  { name: "Legal", score: 76, detail: "Uncapped indemnity clause in the shareholder agreement is the main drag on this score." },
  { name: "Technology", score: 94, detail: "Proprietary O&M monitoring stack with strong uptime record." },
  { name: "ESG", score: 82, detail: "Strong social score; governance pulled down by a pending environmental filing." },
  { name: "Operational", score: 85, detail: "Field operations are well-documented; one weak spot in spare-parts logistics." },
  { name: "Customer", score: 78, detail: "Some concentration in two utility offtake contracts." },
  { name: "Supplier", score: 91, detail: "Diversified panel and inverter sourcing across 3 countries." },
  { name: "Cybersecurity", score: 74, detail: "SCADA monitoring stack is internet-facing with limited access controls." },
  { name: "Regulatory", score: 88, detail: "Compliant with current Ghana Energy Commission licensing requirements." },
];

const ESG = {
  environmental: 82, social: 91, governance: 74, overall: 82,
  flags: [
    { name: "Board diversity", status: "Positive", detail: "3 of 7 board seats held by women; exceeds fund policy minimum." },
    { name: "Environmental compliance filing", status: "Pending", detail: "Annual EPA filing is overdue by 6 weeks — Lani has queued a reminder." },
  ]
};

const MEMO_SECTIONS = [
  { name: "Investment Summary", preview: "GreenTech Solar — $12M Series C at an $92M enterprise value, targeting a 28% IRR over a 6-year hold." },
  { name: "Executive Summary", preview: "Overall AI score of 87/100. Recommend proceeding to term sheet subject to 3 closing conditions." },
  { name: "Business Overview", preview: "Vertically integrated solar EPC and O&M provider operating across 4 regions in Ghana." },
  { name: "Market Opportunity", preview: "TAM of $48.2B with an 18.4% industry CAGR; GreenTech holds ~6% of a fragmented market." },
  { name: "Financial Performance", preview: "Revenue CAGR of 18%, EBITDA margin expanding from 24% to 32% by FY27E." },
  { name: "Competition", preview: "SunGrid West Africa is the closest peer; GreenTech's margin profile justifies a premium multiple." },
  { name: "Growth Drivers", preview: "Ghana's renewable mandate expansion and a pipeline of 6 new utility offtake contracts." },
  { name: "Management Assessment", preview: "CEO Kwabena Owusu — prior successful exit, reputation score 92, execution score 89." },
  { name: "Legal Review", preview: "One high-severity item: uncapped indemnity clause in the shareholder agreement (Clause 17.4)." },
  { name: "ESG Assessment", preview: "Overall ESG score of 82; governance dragged down by a pending environmental filing." },
  { name: "Risk Assessment", preview: "Overall risk score 87/100 across 11 weighted categories; 1 high, 4 medium open items." },
  { name: "Investment Thesis", preview: "Category leader in a policy-tailwind market with a proven management team and clean unit economics." },
  { name: "Recommendation", preview: "Proceed to term sheet, subject to resolving the insurance, tax filing, and indemnity items." },
  { name: "Appendices", preview: "Full data room index, model outputs, and comparable transaction detail." },
];

const IC_SLIDES = [
  { name: "Executive Summary", body: "GreenTech Solar — $12M Series C investment at a $92M enterprise value. Overall Lani score: 87/100. Recommendation: Invest, subject to 3 closing conditions." },
  { name: "Investment Highlights", body: "18% revenue CAGR, expanding EBITDA margins (24% → 32% by FY27E), category-leading utility offtake pipeline, and a management team with a prior successful exit." },
  { name: "Financial Analysis", body: "Base case: 31% IRR, 3.8x MOIC, $18.4M NPV. Full 3-statement model and scenario sensitivity available in the Financial Models workspace." },
  { name: "Risk Matrix", body: "Overall risk score 87/100 across 11 categories. One high-severity item (uncapped indemnity clause), four medium items — none deal-breaking." },
  { name: "Competitive Position", body: "~6% share in a fragmented $48.2B market growing 18.4% annually. Closest peer, SunGrid West Africa, trades at a lower revenue multiple with weaker margins." },
  { name: "Management", body: "CEO Kwabena Owusu — 12 years in renewable infrastructure, ex-Actis, one prior successful exit. Reputation score 92, execution score 89, leadership risk Low." },
  { name: "Scenario Analysis", body: "Base case 31% IRR / 3.8x MOIC. Downside case (9% growth, 8x exit) still returns ~14% IRR / 1.9x MOIC — capital-preserving even under stress." },
  { name: "Recommendation", body: "Proceed to term sheet. Conditions: renew expired insurance, obtain FY2023 tax filings, and negotiate a liability cap on Clause 17.4 before signing." },
  { name: "Voting Page", body: "Committee vote: Invest (4), Proceed with conditions (1), Decline (0). Quorum met — recommendation carries to term sheet drafting." },
];

const PORTFOLIO_COMPANIES = [
  { name: "GreenTech Solar", stage: "Series C", irr: "31%", moic: "3.8x", status: "On Track", detail: "Deployed Q2 2026. Next board meeting in 3 weeks." },
  { name: "AgroChain Ghana", stage: "Series B", irr: "24%", moic: "2.6x", status: "On Track", detail: "Ahead of plan on traceability-node rollout." },
  { name: "MediPay Africa", stage: "Series A", irr: "19%", moic: "2.1x", status: "Watch", detail: "Burn rate slightly above plan; monitoring runway." },
  { name: "UrbanFreight Logistics", stage: "Growth", irr: "27%", moic: "3.1x", status: "On Track", detail: "Signed 2 new enterprise logistics contracts this quarter." },
  { name: "EduBridge Learning", stage: "Series B", irr: "12%", moic: "1.4x", status: "Watch", detail: "Enrollment growth slower than projected; reviewing go-to-market." },
  { name: "NovaCommerce", stage: "Series A", irr: "-4%", moic: "0.8x", status: "At Risk", detail: "Covenant breach flagged last quarter; workout plan in progress." },
  { name: "Nova Freightlink", stage: "Growth", irr: "22%", moic: "2.8x", status: "On Track", detail: "Fuel-hedging program now covers 70% of exposure." },
  { name: "SolCharge Mobility", stage: "Series A", irr: "16%", moic: "1.7x", status: "On Track", detail: "EV-charging network expanding to 2 new cities this quarter." },
];

const FUND_STATS = [
  { label: "Portfolio Companies", value: "14", detail: "14 active positions across renewable energy, fintech, logistics, agritech, and healthtech." },
  { label: "Fund Value (NAV)", value: "$268M", detail: "Net Asset Value across all active positions, up from $245M last quarter on markups at GreenTech Solar and Nova Freightlink." },
  { label: "Unrealized Gain", value: "$91M", detail: "Mark-to-market gain on positions not yet exited, based on the latest round valuations and comparable transactions." },
  { label: "Cash Remaining", value: "$58M", detail: "Dry powder available for new deployments and follow-on rounds in existing portfolio companies." },
  { label: "Average IRR", value: "23%", detail: "Weighted average annualized return across all active portfolio positions since initial investment." },
];

const COMPLIANCE = [
  { name: "KYC", status: "Complete", detail: "All LPs re-verified as of Q2 2026." },
  { name: "AML", status: "Complete", detail: "No flags across the current investor registry." },
  { name: "Tax Reporting", status: "Filed Q2", detail: "K-1s issued to all LPs 4 days ahead of deadline." },
];

const LP_REGISTRY = [
  { name: "Sahara Capital Partners", commitment: "$40M", called: "$28M", status: "Current", detail: "Institutional LP since Fund I. No outstanding items." },
  { name: "West Africa Pension Trust", commitment: "$65M", called: "$47M", status: "Current", detail: "Largest LP by commitment. Quarterly call scheduled." },
  { name: "Meridian Family Office", commitment: "$20M", called: "$16M", status: "Call Pending", detail: "Capital call notice sent — due in 5 days." },
  { name: "Tema Growth Fund of Funds", commitment: "$18M", called: "$11M", status: "Current", detail: "Joined in Fund II; re-upped for Fund III at 1.5x." },
  { name: "Kaya Diaspora Investors LLC", commitment: "$9M", called: "$6M", status: "Current", detail: "Syndicate of 40+ diaspora angel investors." },
];

const COPILOT_RESPONSES = {
  "Why is this deal risky?": "GreenTech Solar's overall score is 87/100, but three flags keep it from a clean pass: (1) expired insurance coverage — high severity, (2) an unlimited indemnity clause in Section 17.4 of the shareholder agreement, and (3) missing FY2023 tax filings, which adds uncertainty to reported EBITDA. None are deal-breakers, but I'd resolve all three before wiring funds.",
  "Compare this company with competitors.": "GreenTech Solar holds ~6% share in a fragmented market (TAM $48.2B, 18.4% CAGR). SunGrid West Africa (11% share) is the closest peer and raised its Series C at 3.4x revenue — GreenTech's implied 3.8x is a premium, justified by a stronger utility offtake pipeline and higher EBITDA margin (26% vs. sector average ~19%).",
  "Build downside case.": "Downside case applied: revenue growth cut to 9%, exit multiple compressed to 8x, exit pushed to 2033. Resulting IRR falls to ~14% and MOIC to ~1.9x — still capital-preserving, but well below the base case. Switch to the Downside scenario tab in Financial Models to see it live.",
  "Summarize all contracts.": "8 contracts reviewed across 2 deals, 9 flagged clauses total. Highest-severity item: an uncapped indemnity obligation in GreenTech Solar's Shareholder Agreement (Clause 17.4). Fintech Africa's Accra Power MSA is also worth a look — that single client is 28% of revenue.",
  "Explain EBITDA adjustments.": "Reported EBITDA of $4.3M (FY24) includes two add-backs: $210K of one-time legal fees related to a resolved land dispute, and $340K of non-recurring recruiting costs. Adjusted EBITDA net of both is $3.75M — still supports the model, but I'd verify the add-backs against invoices during confirmatory diligence.",
  "Generate IC memo.": "Drafting a 5-page Investment Committee memo now — Investment Summary, Market Opportunity, Financial Performance, Management Assessment, Risk Assessment, and Recommendation sections populated from this data room. Head to the Investment Committee tab to review and export as Word, PDF, or PowerPoint.",
  "Draft investor update.": "Draft ready: \"This quarter, the fund deployed $12M into GreenTech Solar (Series C, projected 31% IRR) following a full AI-assisted due diligence cycle completed in 11 minutes of review time. NAV stands at $268M, up from $245M last quarter...\" — full letter available under Investor Portal → Quarterly Letters.",
  "What information is still missing?": "Three open items on GreenTech Solar: FY2023 tax returns, a renewed general liability insurance certificate, and 8 outstanding senior employment agreements for engineering leads. On AgroChain Ghana, FY2023 tax filings are also outstanding. I've queued document requests for both — none of these block preliminary review, but all should close before final sign-off.",
};
