// ---------------------------------------------------------------
// PE INTELLIGENCE™ — MOCK DATA LAYER
// All figures are illustrative, generated for demo/pitch purposes.
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
};

const DEALS = [
  {
    id: "greentech", name: "GreenTech Solar", sector: "Renewable Energy · Series C",
    investment: "$12M", score: 87, rec: "INVEST", confidence: 94, priority: "HIGH",
    reasons: [], color: "emerald"
  },
  {
    id: "fintechafrica", name: "Fintech Africa", sector: "Payments · Series B",
    investment: "$5M", score: 71, rec: "PROCEED WITH CAUTION", confidence: 68, priority: "MEDIUM",
    reasons: ["Customer concentration — top 3 clients = 61% of revenue"], color: "amber"
  },
  {
    id: "medrobotics", name: "Medical Robotics", sector: "MedTech · Series A",
    investment: "$8M", score: 42, rec: "REJECT", confidence: 88, priority: "LOW",
    reasons: ["Unrealistic revenue projections", "Weak management execution history", "Unresolved legal IP dispute"], color: "red"
  }
];

const ACTIVITY = [
  { label: "Deals Reviewed", value: "12", delta: "+4 this week" },
  { label: "Documents Analyzed", value: "684", delta: "+112 today" },
  { label: "Contracts Reviewed", value: "38", delta: "+6 today" },
  { label: "Memos Generated", value: "12", delta: "100% on-time" },
  { label: "Avg. Review Time", value: "11 min", delta: "vs 6.5 days manual" },
  { label: "Risks Detected", value: "49", delta: "9 high severity" },
];

const ENGINES = [
  "Financial Model Engine", "Due Diligence Engine", "Legal Contract Analyzer",
  "Risk Scoring Engine", "Market Intelligence", "ESG Analysis", "Portfolio Manager"
];

const SECURITY_BADGES = ["SOC 2", "ISO 27001", "RBAC", "Encrypted Data Rooms", "Audit Log", "Version History", "Private LLM", "Offline Mode"];

const DOC_UPLOAD_PROGRESS = [
  { label: "Financial Statements", pct: 100 },
  { label: "Contracts", pct: 100 },
  { label: "Legal Documents", pct: 100 },
  { label: "Forecasts", pct: 90 },
  { label: "Cap Tables", pct: 100 },
];

const CHECKLIST = [
  { name: "Financial Statements", status: "ok", note: "Complete", explain: null },
  {
    name: "Tax Returns", status: "bad", note: "Missing FY2023", severity: "Medium",
    explain: "Absence of the latest tax filings increases uncertainty around reported EBITDA. The AI cross-checked available filings against management accounts and found no FY2023 return on file.",
    recommendation: "Request FY2023 tax filings before proceeding to term sheet."
  },
  { name: "Customer Contracts", status: "ok", note: "Complete", explain: null },
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
  { name: "Intellectual Property", status: "ok", note: "Verified", explain: null },
  {
    name: "Cybersecurity", status: "warn", note: "Weak", severity: "Medium",
    explain: "No evidence of SOC 2 or penetration testing was found. The company's SCADA monitoring stack for its solar farms is internet-facing with limited access controls.",
    recommendation: "Require a third-party penetration test as a condition of the term sheet."
  },
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
  { name: "Shareholder Agreement", parties: "GreenTech Solar Holdings", risk: "high", flags: 3 },
  { name: "Customer MSA — UtilityCo Ghana", parties: "GreenTech Solar / UtilityCo", risk: "medium", flags: 1 },
  { name: "Land Lease Agreement", parties: "GreenTech Solar / Tema Lands Ltd", risk: "low", flags: 0 },
  { name: "Senior Debt Facility", parties: "GreenTech Solar / Absa Bank", risk: "medium", flags: 2 },
  { name: "IP Licensing Agreement", parties: "GreenTech Solar / SolarCore Tech", risk: "low", flags: 0 },
  { name: "Executive Employment — CEO", parties: "GreenTech Solar / K. Owusu", risk: "medium", flags: 1 },
];

const CONTRACT_DETAIL = {
  summary: "A standard Series C shareholder agreement governing GreenTech Solar Holdings. Broadly market-standard on governance and anti-dilution, but contains one material outlier on indemnification that is unusual for a minority investment of this size.",
  clauses: [
    { name: "Termination Rights", risk: "low" },
    { name: "Change of Control", risk: "medium" },
    { name: "Non-compete (24 months)", risk: "low" },
    { name: "IP Ownership Assignment", risk: "low" },
    { name: "Representations & Warranties", risk: "medium" },
    { name: "Indemnification (Clause 17.4)", risk: "high" },
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
    { name: "SunGrid West Africa / Series C", ev: "$68M", multiple: "3.4x rev" },
    { name: "Helios Power / Series B", ev: "$41M", multiple: "3.1x rev" },
    { name: "M-KOPA Solar / Growth round", ev: "$210M", multiple: "4.0x rev" },
  ],
  ceo: { name: "Kwabena Owusu", background: "12 yrs renewable infra, ex-Actis", exit: "Yes", bankruptcy: "None", reputation: 92, execution: 89, leadershipRisk: "Low" }
};

const RISK_CATEGORIES = [
  { name: "Market", score: 92 }, { name: "Financial", score: 89 }, { name: "Management", score: 81 },
  { name: "Legal", score: 76 }, { name: "Technology", score: 94 }, { name: "ESG", score: 82 },
  { name: "Operational", score: 85 }, { name: "Customer", score: 78 }, { name: "Supplier", score: 91 },
  { name: "Cybersecurity", score: 74 }, { name: "Regulatory", score: 88 },
];

const ESG = {
  environmental: 82, social: 91, governance: 74, overall: 82,
  flags: [
    { name: "Board diversity", status: "Positive" },
    { name: "Environmental compliance filing", status: "Pending" },
  ]
};

const MEMO_SECTIONS = [
  "Investment Summary", "Executive Summary", "Business Overview", "Market Opportunity",
  "Financial Performance", "Competition", "Growth Drivers", "Management Assessment",
  "Legal Review", "ESG Assessment", "Risk Assessment", "Investment Thesis",
  "Recommendation", "Appendices"
];

const IC_SLIDES = ["Executive Summary", "Investment Highlights", "Financial Analysis", "Risk Matrix", "Competitive Position", "Management", "Scenario Analysis", "Recommendation", "Voting Page"];

const PORTFOLIO_COMPANIES = [
  { name: "GreenTech Solar", stage: "Series C", irr: "31%", moic: "3.8x", status: "On Track" },
  { name: "AgroChain Ghana", stage: "Series B", irr: "24%", moic: "2.6x", status: "On Track" },
  { name: "MediPay Africa", stage: "Series A", irr: "19%", moic: "2.1x", status: "Watch" },
  { name: "UrbanFreight Logistics", stage: "Growth", irr: "27%", moic: "3.1x", status: "On Track" },
  { name: "EduBridge Learning", stage: "Series B", irr: "12%", moic: "1.4x", status: "Watch" },
  { name: "NovaCommerce", stage: "Series A", irr: "-4%", moic: "0.8x", status: "At Risk" },
];

const FUND_STATS = [
  { label: "Portfolio Companies", value: "12" },
  { label: "Fund Value (NAV)", value: "$245M" },
  { label: "Unrealized Gain", value: "$82M" },
  { label: "Cash Remaining", value: "$64M" },
  { label: "Average IRR", value: "24%" },
];

const COMPLIANCE = [
  { name: "KYC", status: "Complete" }, { name: "AML", status: "Complete" }, { name: "Tax Reporting", status: "Filed Q2" }
];

const COPILOT_RESPONSES = {
  "Why is this deal risky?": "GreenTech Solar's overall score is 87/100, but three flags keep it from a clean pass: (1) expired insurance coverage — high severity, (2) an unlimited indemnity clause in Section 17.4 of the shareholder agreement, and (3) missing FY2023 tax filings, which adds uncertainty to reported EBITDA. None are deal-breakers, but I'd resolve all three before wiring funds.",
  "Compare this company with competitors.": "GreenTech Solar holds ~6% share in a fragmented market (TAM $48.2B, 18.4% CAGR). SunGrid West Africa (11% share) is the closest peer and raised its Series C at 3.4x revenue — GreenTech's implied 3.8x is a premium, justified by a stronger utility offtake pipeline and higher EBITDA margin (26% vs. sector average ~19%).",
  "Build downside case.": "Downside case applied: revenue growth cut to 9%, exit multiple compressed to 8x, exit pushed to 2033. Resulting IRR falls to ~14% and MOIC to ~1.9x — still capital-preserving, but well below the base case. Switch to the Downside scenario tab in Financial Models to see it live.",
  "Summarize all contracts.": "6 contracts reviewed, 7 flagged clauses total. Highest-severity item: an uncapped indemnity obligation in the Shareholder Agreement (Clause 17.4). Two contracts — the Senior Debt Facility and CEO employment agreement — carry medium-risk change-of-control language worth reviewing with counsel.",
  "Explain EBITDA adjustments.": "Reported EBITDA of $4.3M (FY24) includes two add-backs: $210K of one-time legal fees related to a resolved land dispute, and $340K of non-recurring recruiting costs. Adjusted EBITDA net of both is $3.75M — still supports the model, but I'd verify the add-backs against invoices during confirmatory diligence.",
  "Generate IC memo.": "Drafting a 5-page Investment Committee memo now — Investment Summary, Market Opportunity, Financial Performance, Management Assessment, Risk Assessment, and Recommendation sections populated from this data room. Head to the Investment Committee tab to review and export as Word, PDF, or PowerPoint.",
  "Draft investor update.": "Draft ready: \"This quarter, the fund deployed $12M into GreenTech Solar (Series C, projected 31% IRR) following a full AI-assisted due diligence cycle completed in 11 minutes of review time. NAV stands at $245M, up from $228M last quarter...\" — full letter available under Investor Portal → Quarterly Letters.",
  "What information is still missing?": "Three open items: FY2023 tax returns, a renewed general liability insurance certificate, and 8 outstanding senior employment agreements for engineering leads. I've queued a document request to send to the deal team — none of these block preliminary review, but all three should close before final investment committee sign-off.",
};
