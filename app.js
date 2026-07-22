// ---------------------------------------------------------------
// PE INTELLIGENCE™ — APP LOGIC
// ---------------------------------------------------------------
Chart.defaults.font.family = "'JetBrains Mono', monospace";
Chart.defaults.color = "#8C97A8";
Chart.defaults.borderColor = "#1A212C";

const NAV_META = {
  dashboard:  { label: "Dashboard",            crumb: "workspace / dashboard" },
  deals:      { label: "Deals & Data Rooms",   crumb: "workspace / deals" },
  models:     { label: "Financial Models",     crumb: "workspace / financial models" },
  contracts:  { label: "Contract Intelligence",crumb: "workspace / contracts" },
  market:     { label: "Market Intelligence",  crumb: "workspace / market" },
  risk:       { label: "Risk Engine",          crumb: "workspace / risk engine" },
  ic:         { label: "Investment Committee", crumb: "workspace / investment committee" },
  portfolio:  { label: "Portfolio",            crumb: "fund / portfolio" },
  fundadmin:  { label: "Fund Administration",  crumb: "fund / administration" },
  investors:  { label: "Investor Portal",      crumb: "fund / investor portal" },
  settings:   { label: "Settings & Security",  crumb: "system / settings" },
};

let currentView = "dashboard";
let activeChartInstances = [];

function destroyCharts() {
  activeChartInstances.forEach(c => { try { c.destroy(); } catch (e) {} });
  activeChartInstances = [];
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerHTML = `<span class="dot-anim"></span> ${msg}`;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

// ---------- DETAIL MODAL (generic "what's embedded here" popup) ----------
function openDetail(title, body, eyebrow) {
  document.getElementById("detail-eyebrow").textContent = eyebrow || "HOUN INSIGHT";
  document.getElementById("detail-title").textContent = title;
  document.getElementById("detail-body").textContent = body;
  document.getElementById("detail-overlay").classList.add("open");
}
function closeDetail() { document.getElementById("detail-overlay").classList.remove("open"); }

// Safe string escaper for embedding data in onclick="" attributes
function esc(str) {
  return String(str).replace(/'/g, "\\'").replace(/"/g, "&quot;").replace(/\n/g, " ");
}

// ---------- SIDEBAR NAV BUILD ----------
function buildSidebarNav() {
  document.querySelectorAll(".nav-item").forEach(el => {
    const key = el.dataset.view;
    const meta = NAV_META[key];
    el.innerHTML = `${ICONS[key]}<span>${meta.label}</span>`;
    el.setAttribute("data-tip", `Open ${meta.label}`);
    el.addEventListener("click", () => navigate(key));
  });
  const strip = document.getElementById("sec-strip");
  strip.innerHTML = SECURITY_BADGES.slice(0, 4).map(b =>
    `<span class="sec-pill" data-tip="${esc(b.detail)}" onclick="openDetail('${esc(b.name)}', '${esc(b.detail)}', 'SECURITY & COMPLIANCE')">${b.name}</span>`
  ).join("");
}

function navigate(view) {
  currentView = view;
  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.toggle("active", el.dataset.view === view);
  });
  document.getElementById("topbar-title").textContent = NAV_META[view].label;
  document.getElementById("topbar-crumb").textContent = NAV_META[view].crumb;
  render();
}

// ---------- RENDER DISPATCH ----------
function render() {
  destroyCharts();
  const main = document.getElementById("main");
  const renderers = {
    dashboard: renderDashboard, deals: renderDeals, models: renderModels,
    contracts: renderContracts, market: renderMarket, risk: renderRisk,
    ic: renderIC, portfolio: renderPortfolio, fundadmin: renderFundAdmin,
    investors: renderInvestors, settings: renderSettings,
  };
  main.innerHTML = `<div class="view">${renderers[currentView]()}</div>`;
  afterRenderHooks[currentView] && afterRenderHooks[currentView]();
  main.scrollTop = 0;
}

const afterRenderHooks = {};

// ---------- DASHBOARD ----------
function renderDashboard() {
  return `
    <div class="view-header">
      <div class="view-title">Good morning, David.</div>
      <div class="view-desc">Houn has analyzed 3 new investment opportunities overnight across 1,204 documents.</div>
    </div>

    <div class="section-label">Engine Status <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click an engine to see what it does</span></div>
    <div class="engine-row" style="margin-bottom:22px;">
      ${ENGINES.map(e => `<div class="engine-chip" data-tip="${esc(e.detail)}" onclick="openDetail('${esc(e.name)}', '${esc(e.detail)}', 'ENGINE')"><span class="led"></span>${e.name}</div>`).join("")}
    </div>

    <div class="section-label">Today's Activity</div>
    <div class="grid grid-6" style="margin-bottom:24px;">
      ${ACTIVITY.map(a => `
        <div class="card stat-card clickable" data-tip="${esc(a.tip)}" onclick="navigate('${a.view}')">
          <div class="stat-label">${a.label}</div>
          <div class="stat-value">${a.value}</div>
          <div class="stat-delta up">${a.delta}</div>
        </div>`).join("")}
    </div>

    <div class="section-label">Priority Deals <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click a deal to open its data room</span></div>
    <div class="grid grid-3" style="margin-bottom:24px;">
      ${DEALS.slice(0, 3).map(d => `
        <div class="deal-card" data-tip="${esc(d.tip)}" onclick="navigate('deals')">
          <div class="deal-top">
            <div>
              <div class="pill ${d.color === 'emerald' ? 'green' : d.color}">${d.priority} PRIORITY</div>
              <div class="deal-name" style="margin-top:8px;">${d.name}</div>
              <div class="deal-amount">${d.sector} · ${d.investment}</div>
            </div>
            <div style="text-align:right;">
              <div class="deal-score" style="color:var(--${d.color === 'emerald' ? 'emerald' : d.color});">${d.score}</div>
              <div class="deal-score-label">/ 100</div>
            </div>
          </div>
          <div class="pill ${d.color === 'emerald' ? 'green' : d.color}" style="width:fit-content;">${d.rec}</div>
          ${d.reasons.length ? `<ul class="deal-reasons">${d.reasons.map(r => `<li>${r}</li>`).join("")}</ul>` : `<div class="deal-reasons">Confidence: ${d.confidence}% · Houn recommends proceeding to term sheet.</div>`}
        </div>`).join("")}
    </div>

    <div class="section-label">Houn Activity Log <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— live feed, click any entry</span></div>
    <div class="card" style="margin-bottom:24px;">
      ${HOUN_ACTIVITY_LOG.map(a => `
        <div class="check-row" data-tip="Click to see which engine produced this" onclick="openDetail('${esc(a.tag)}', '${esc(a.text)}', 'HOUN ACTIVITY · ' + '${esc(a.time)}'.toUpperCase())">
          <div class="check-left">
            <div class="check-icon ok" style="background:var(--emerald-dim);">${ICONS.bolt}</div>
            <div>
              <div class="check-name" style="font-weight:500;">${a.text}</div>
              <div style="font-size:11px; color:var(--text-faint); margin-top:2px;">${a.time}</div>
            </div>
          </div>
          <span class="pill gray">${a.tag}</span>
        </div>`).join("")}
    </div>

    <div class="section-label">Review Velocity — Last 14 Days</div>
    <div class="card">
      <div class="chart-box"><canvas id="chart-velocity"></canvas></div>
    </div>
  `;
}
afterRenderHooks.dashboard = () => {
  const ctx = document.getElementById("chart-velocity");
  const days = Array.from({length:14}, (_,i)=>`D${i+1}`);
  const data = [3,5,4,6,5,8,7,9,8,11,10,13,12,15];
  activeChartInstances.push(new Chart(ctx, {
    type: "line",
    data: { labels: days, datasets: [{ data, borderColor:getCssVar('--emerald'), backgroundColor:"rgba(47,223,160,.08)", fill:true, tension:.4, pointRadius:0, borderWidth:2 }]},
    options: { plugins:{legend:{display:false}}, scales:{ x:{grid:{display:false}}, y:{grid:{color:"#1A212C"}} } }
  }));
};

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#2FDFA0";
}

// ---------- DEALS / DATA ROOM ----------
function renderDeals() {
  return `
    <div class="view-header">
      <div class="view-title">Deals &amp; Data Rooms</div>
      <div class="view-desc">Upload a data room and Houn's Due Diligence Engine takes it from there.</div>
    </div>

    <div class="section-label">All Deals <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click a deal to view its data room below</span></div>
    <div class="card" style="margin-bottom:18px;">
      <table>
        <thead><tr><th>Deal</th><th>Sector / Stage</th><th>Investment</th><th>Score</th><th>Recommendation</th></tr></thead>
        <tbody>
          ${DEALS.map(d => `
            <tr class="clickable" data-tip="${esc(d.tip)}" onclick="openDetail('${esc(d.name)}', '${esc(d.tip)} Overall score ${d.score}/100 — ${esc(d.rec)}.', 'DEAL SUMMARY')">
              <td><b>${d.name}</b></td>
              <td style="color:var(--text-dim)">${d.sector}</td>
              <td class="mono">${d.investment}</td>
              <td class="mono" style="color:var(--${d.color === 'emerald' ? 'emerald' : d.color})">${d.score}</td>
              <td><span class="pill ${d.color === 'emerald' ? 'green' : d.color}">${d.rec}</span></td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>

    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Upload Data Room — GreenTech Solar</div>
        <div style="border:1.5px dashed var(--border); border-radius:12px; padding:30px; text-align:center; color:var(--text-dim);">
          ${ICONS.upload}
          <div style="margin-top:10px; font-size:13px;">Drag files here, or connect a source</div>
          <div class="btn-row" style="justify-content:center; margin-top:16px;">
            <button class="btn ghost" data-tip="Upload a .zip archive" onclick="showToast('Zip upload is simulated in this prototype.')">Zip Upload</button>
            <button class="btn ghost" data-tip="Connect Dropbox" onclick="showToast('Dropbox connection is simulated in this prototype.')">Dropbox</button>
            <button class="btn ghost" data-tip="Connect Google Drive" onclick="showToast('Google Drive connection is simulated in this prototype.')">Google Drive</button>
            <button class="btn ghost" data-tip="Connect OneDrive" onclick="showToast('OneDrive connection is simulated in this prototype.')">OneDrive</button>
            <button class="btn ghost" data-tip="Connect a Virtual Data Room provider (Intralinks, Datasite…)" onclick="showToast('Virtual Data Room connection is simulated in this prototype.')">Virtual Data Room</button>
          </div>
          <div class="btn-row" style="justify-content:center; margin-top:18px;">
            <button class="btn primary" id="simulate-upload-btn" data-tip="Watch Houn classify a sample data room">Simulate Upload</button>
          </div>
        </div>

        <div id="upload-progress-wrap" style="margin-top:20px; display:none;">
          <div class="working-banner" id="upload-working-banner"><span class="spin"></span> Houn is reading the data room…</div>
          <div style="font-size:12px; color:var(--text-dim); margin-bottom:14px;"><span id="files-found" class="mono"></span> found — organizing by category…</div>
          <div id="progress-rows"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span class="dot"></span>Houn Reads</div>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          ${["Financial statements","Contracts","Shareholder agreements","Tax records","Customer contracts","Cap tables","HR files","ESG reports","Legal documents","Intellectual property","Board minutes","Revenue schedules","Financial forecasts"].map(t=>`<span class="pill gray" data-tip="Houn extracts structured data from every ${t.toLowerCase()} document" style="cursor:pointer;" onclick="openDetail('${esc(t)}', 'Houn extracts structured data points from every ${esc(t.toLowerCase())} document it finds, then cross-references them against the rest of the data room for inconsistencies.', 'DOCUMENT TYPE')">${t}</span>`).join("")}
        </div>
      </div>
    </div>

    <div class="section-label">Document Checklist — Due Diligence Engine</div>
    <div class="card">
      <div style="font-size:12px; color:var(--text-dim); margin-bottom:14px;">Houn automatically performs 200+ checks across the data room. Click any item for its reasoning.</div>
      <div id="checklist-wrap">
        ${CHECKLIST.map((c, i) => renderCheckRow(c, i)).join("")}
      </div>
    </div>
  `;
}

function renderCheckRow(c, i) {
  const iconMap = { ok: ICONS.check, warn: ICONS.warn, bad: ICONS.x };
  const pillMap = { ok: "green", warn: "amber", bad: "red" };
  return `
    <div>
      <div class="check-row" data-tip="Click for Houn's reasoning" onclick="toggleExplain(${i})">
        <div class="check-left">
          <div class="check-icon ${c.status}">${iconMap[c.status]}</div>
          <div class="check-name">${c.name}</div>
        </div>
        <div class="pill ${pillMap[c.status]}">${c.note}</div>
      </div>
      <div class="check-explain" id="explain-${i}">
        <b>Houn's finding:</b> ${c.explain}<br><br>
        <b>Recommendation:</b> ${c.recommendation}<br><br>
        <b>Risk Impact:</b> ${c.severity}
      </div>
    </div>
  `;
}

function toggleExplain(i) {
  const el = document.getElementById(`explain-${i}`);
  if (el) el.classList.toggle("open");
}

afterRenderHooks.deals = () => {
  const btn = document.getElementById("simulate-upload-btn");
  btn.addEventListener("click", () => {
    setHounWorking(true, "Houn is reading the GreenTech Solar data room…");
    const wrap = document.getElementById("upload-progress-wrap");
    wrap.style.display = "block";
    document.getElementById("files-found").textContent = "412 files";
    const rows = document.getElementById("progress-rows");
    rows.innerHTML = DOC_UPLOAD_PROGRESS.map(p => `
      <div class="progress-row">
        <div class="progress-label">${p.label}</div>
        <div class="progress-track"><div class="progress-fill" style="width:0%" data-target="${p.pct}"></div></div>
        <div class="progress-pct">${p.pct}%</div>
      </div>`).join("");
    requestAnimationFrame(() => {
      rows.querySelectorAll(".progress-fill").forEach(f => f.style.width = f.dataset.target + "%");
    });
    showToast("Houn organized 412 files in 11 seconds.");
    setTimeout(() => {
      const banner = document.getElementById("upload-working-banner");
      if (banner) banner.innerHTML = `${ICONS.check.replace('stroke-width="2.5"','stroke-width="2.5" style="width:14px;height:14px;color:var(--emerald)"')} Houn finished reading the data room — checklist updated below.`;
      setHounWorking(false);
    }, 1400);
  });
};

// ---------- FINANCIAL MODELS ----------
let modelTab = "three-statement";
let scenario = "base";
const SCENARIO_PRESETS = {
  base:     { growth: 18, exit: 12, rate: 6, inflation: 4, exitYear: 2032 },
  upside:   { growth: 26, exit: 14, rate: 5, inflation: 3, exitYear: 2031 },
  downside: { growth: 9,  exit: 8,  rate: 8, inflation: 6, exitYear: 2033 },
  stress:   { growth: 3,  exit: 6,  rate: 10, inflation: 8, exitYear: 2034 },
};
let sliderState = { ...SCENARIO_PRESETS.base };

function computeModelOutputs(s) {
  // Illustrative live-recompute formula for demo purposes (not audited finance).
  const irr = Math.max(2, (s.growth * 0.95) + (s.exit * 0.7) - (s.rate * 0.6) - (s.inflation * 0.4));
  const moic = Math.max(0.5, 1 + (irr / 100) * 4.4);
  const npv = Math.max(0.5, (s.growth * 0.9 + s.exit * 1.1 - s.rate * 0.5) * 0.95);
  const ebitdaMargin = Math.min(38, 16 + s.growth * 0.4 - s.inflation * 0.3);
  return { irr: irr.toFixed(1), moic: moic.toFixed(1), npv: npv.toFixed(1), ebitdaMargin: ebitdaMargin.toFixed(1) };
}

function renderModels() {
  return `
    <div class="view-header">
      <div class="view-title">Financial Modelling Engine</div>
      <div class="view-desc">Houn builds a full 3-statement model and LBO structure automatically — every slider updates the return profile live.</div>
    </div>
    <div class="tabs">
      <div class="tab ${modelTab==='three-statement'?'active':''}" data-tip="Income statement, balance sheet, cash flow" onclick="setModelTab('three-statement')">Three-Statement Model</div>
      <div class="tab ${modelTab==='lbo'?'active':''}" data-tip="Sources & uses, debt paydown, returns" onclick="setModelTab('lbo')">LBO Model Builder</div>
      <div class="tab ${modelTab==='stress'?'active':''}" data-tip="10,000-run simulated IRR distribution" onclick="setModelTab('stress')">Stress Test &amp; Monte Carlo</div>
    </div>
    <div id="model-tab-content"></div>
  `;
}

function setModelTab(tab) { modelTab = tab; render(); }

function renderModelTabContent() {
  const el = document.getElementById("model-tab-content");
  if (!el) return;
  if (modelTab === "three-statement") el.innerHTML = threeStatementHTML();
  else if (modelTab === "lbo") el.innerHTML = lboHTML();
  else el.innerHTML = stressHTML();
  wireModelInteractivity();
}

function threeStatementHTML() {
  const out = computeModelOutputs(sliderState);
  const rowTip = (label) => `data-tip="Click for Houn's note on ${esc(label)}"`;
  const lineNote = (label) => `Houn flags this line automatically if it moves more than 15% quarter-over-quarter. ${label} is currently tracking in line with the model.`;
  return `
    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Income Statement (FY24 – FY27E)</div>
        <table>
          <thead><tr><th>Line Item</th>${THREE_STATEMENT.years.map(y=>`<th>${y}</th>`).join("")}</tr></thead>
          <tbody>${THREE_STATEMENT.income.map(row => `<tr class="clickable" ${rowTip(row[0])} onclick="openDetail('${esc(row[0])}', '${esc(lineNote(row[0]))}', 'INCOME STATEMENT')"><td>${row[0]}</td><td class="mono">${row[1]}</td><td class="mono">${row[2]}</td><td class="mono">${row[3]}</td><td class="mono">${row[4]}</td></tr>`).join("")}</tbody>
        </table>
        <div class="section-label">Balance Sheet</div>
        <table>
          <tbody>${THREE_STATEMENT.balance.map(row => `<tr class="clickable" ${rowTip(row[0])} onclick="openDetail('${esc(row[0])}', '${esc(lineNote(row[0]))}', 'BALANCE SHEET')"><td>${row[0]}</td><td class="mono">${row[1]}</td><td class="mono">${row[2]}</td><td class="mono">${row[3]}</td><td class="mono">${row[4]}</td></tr>`).join("")}</tbody>
        </table>
        <div class="section-label">Cash Flow</div>
        <table>
          <tbody>${THREE_STATEMENT.cashflow.map(row => `<tr class="clickable" ${rowTip(row[0])} onclick="openDetail('${esc(row[0])}', '${esc(lineNote(row[0]))}', 'CASH FLOW')"><td>${row[0]}</td><td class="mono">${row[1]}</td><td class="mono">${row[2]}</td><td class="mono">${row[3]}</td><td class="mono">${row[4]}</td></tr>`).join("")}</tbody>
        </table>
      </div>

      <div>
        <div class="card" style="margin-bottom:14px;">
          <div class="card-title"><span class="dot"></span>Scenario</div>
          <div class="scenario-row">
            ${["base","upside","downside","stress"].map(s=>`<div class="scenario-btn ${scenario===s?'active':''}" data-tip="Load the ${s} case" onclick="setScenario('${s}')">${s}</div>`).join("")}
          </div>
          ${renderSliders()}
        </div>
        <div class="card">
          <div class="card-title"><span class="dot"></span>Live Outputs</div>
          <div class="grid grid-2">
            <div class="stat-card card tight clickable" data-tip="Internal Rate of Return" onclick="openDetail('IRR', 'The annualized return Houn projects across the hold period, given the current sliders.', 'LIVE OUTPUT')"><div class="stat-label">IRR</div><div class="stat-value" id="out-irr" style="color:var(--emerald)">${out.irr}%</div></div>
            <div class="stat-card card tight clickable" data-tip="Multiple on Invested Capital" onclick="openDetail('MOIC', 'How many times the fund gets its invested capital back at exit, before fees and carry.', 'LIVE OUTPUT')"><div class="stat-label">MOIC</div><div class="stat-value" id="out-moic">${out.moic}x</div></div>
            <div class="stat-card card tight clickable" data-tip="Net Present Value" onclick="openDetail('NPV', 'The present value of projected free cash flows and terminal value, discounted at the current interest rate assumption.', 'LIVE OUTPUT')"><div class="stat-label">NPV</div><div class="stat-value" id="out-npv">$${out.npv}M</div></div>
            <div class="stat-card card tight clickable" data-tip="EBITDA as % of revenue" onclick="openDetail('EBITDA Margin', 'Projected EBITDA as a share of revenue by exit year under the current scenario.', 'LIVE OUTPUT')"><div class="stat-label">EBITDA Margin</div><div class="stat-value" id="out-margin">${out.ebitdaMargin}%</div></div>
          </div>
          <div class="subtle-note">Everything updates live as you move the sliders.</div>
        </div>
      </div>
    </div>

    <div class="section-label">Cash Flow Projection by Scenario</div>
    <div class="card"><div class="chart-box"><canvas id="chart-cashflow"></canvas></div></div>
  `;
}

function renderSliders() {
  return `
    <div class="slider-group">
      <div class="slider-label" data-tip="Assumed annual revenue growth">Revenue Growth <b id="lbl-growth">${sliderState.growth}%</b></div>
      <input type="range" min="0" max="35" value="${sliderState.growth}" id="s-growth">
    </div>
    <div class="slider-group">
      <div class="slider-label" data-tip="EV / EBITDA multiple assumed at exit">Exit Multiple <b id="lbl-exit">${sliderState.exit}x</b></div>
      <input type="range" min="4" max="18" value="${sliderState.exit}" id="s-exit">
    </div>
    <div class="slider-group">
      <div class="slider-label" data-tip="Assumed cost of debt">Interest Rate <b id="lbl-rate">${sliderState.rate}%</b></div>
      <input type="range" min="2" max="14" value="${sliderState.rate}" id="s-rate">
    </div>
    <div class="slider-group">
      <div class="slider-label" data-tip="Assumed annual inflation">Inflation <b id="lbl-inflation">${sliderState.inflation}%</b></div>
      <input type="range" min="0" max="12" value="${sliderState.inflation}" id="s-inflation">
    </div>
    <div class="slider-group">
      <div class="slider-label" data-tip="Planned exit year">Exit Year <b id="lbl-exitYear">${sliderState.exitYear}</b></div>
      <input type="range" min="2028" max="2035" value="${sliderState.exitYear}" id="s-exitYear">
    </div>
  `;
}

function setScenario(s) {
  scenario = s;
  sliderState = { ...SCENARIO_PRESETS[s] };
  renderModelTabContent();
  drawCashflowChart();
  showToast(`Houn loaded the ${s} case.`);
}

function wireModelInteractivity() {
  if (modelTab !== "three-statement") { drawLBOCharts(); return; }
  ["growth","exit","rate","inflation","exitYear"].forEach(key => {
    const input = document.getElementById("s-" + key);
    if (!input) return;
    input.addEventListener("input", (e) => {
      sliderState[key] = Number(e.target.value);
      document.getElementById("lbl-" + key).textContent = key === "exitYear" ? sliderState[key] : sliderState[key] + (key === "exit" ? "x" : "%");
      const out = computeModelOutputs(sliderState);
      document.getElementById("out-irr").textContent = out.irr + "%";
      document.getElementById("out-moic").textContent = out.moic + "x";
      document.getElementById("out-npv").textContent = "$" + out.npv + "M";
      document.getElementById("out-margin").textContent = out.ebitdaMargin + "%";
      scenario = "custom";
      document.querySelectorAll(".scenario-btn").forEach(b => b.classList.remove("active"));
      drawCashflowChart();
    });
  });
  drawCashflowChart();
}

function drawCashflowChart() {
  const canvas = document.getElementById("chart-cashflow");
  if (!canvas) return;
  const years = ["FY24","FY25E","FY26E","FY27E","FY28E"];
  const base = [3.8,5.1,6.9,9.2,12.1].map(v => v * (sliderState.growth/18));
  destroyChartById("chart-cashflow");
  const c = new Chart(canvas, {
    type: "bar",
    data: { labels: years, datasets: [
      { label:"Operating Cash Flow", data: base, backgroundColor: getCssVar('--emerald'), borderRadius:4 },
    ]},
    options: { plugins:{legend:{labels:{color:"#8C97A8"}}}, scales:{ x:{grid:{display:false}}, y:{grid:{color:"#1A212C"}} } }
  });
  activeChartInstances.push(c);
}

function destroyChartById(id) {
  const existing = Chart.getChart(id);
  if (existing) {
    existing.destroy();
    activeChartInstances = activeChartInstances.filter(c => c !== existing);
  }
}

function lboHTML() {
  return `
    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Sources &amp; Uses</div>
        <table>
          <thead><tr><th>Sources</th><th>Amount</th><th>Uses</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Senior Debt</td><td class="mono">$7.2M</td><td>Equity Purchase</td><td class="mono">$12.0M</td></tr>
            <tr><td>Sponsor Equity</td><td class="mono">$5.4M</td><td>Transaction Fees</td><td class="mono">$0.4M</td></tr>
            <tr><td>Seller Note</td><td class="mono">$1.0M</td><td>Working Capital</td><td class="mono">$1.2M</td></tr>
            <tr><td><b>Total</b></td><td class="mono"><b>$13.6M</b></td><td><b>Total</b></td><td class="mono"><b>$13.6M</b></td></tr>
          </tbody>
        </table>
        <div class="section-label">Returns Analysis</div>
        <div class="grid grid-2">
          <div class="stat-card card tight clickable" data-tip="Debt / EBITDA at close" onclick="openDetail('Entry Leverage', 'Total senior debt divided by trailing EBITDA at the time of investment.', 'LBO METRIC')"><div class="stat-label">Entry Leverage</div><div class="stat-value">3.2x</div></div>
          <div class="stat-card card tight clickable" data-tip="Debt / EBITDA at exit" onclick="openDetail('Exit Leverage', 'Remaining debt divided by EBITDA at the modeled exit year, after paydown.', 'LBO METRIC')"><div class="stat-label">Exit Leverage</div><div class="stat-value">1.1x</div></div>
          <div class="stat-card card tight clickable" data-tip="5-year annualized return" onclick="openDetail('5-Yr IRR', 'Annualized return to the sponsor over the modeled 5-year hold.', 'LBO METRIC')"><div class="stat-label">5-Yr IRR</div><div class="stat-value" style="color:var(--emerald)">31%</div></div>
          <div class="stat-card card tight clickable" data-tip="Multiple on invested capital" onclick="openDetail('MOIC', 'Total proceeds returned divided by capital invested.', 'LBO METRIC')"><div class="stat-label">MOIC</div><div class="stat-value">3.8x</div></div>
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:14px;">
          <div class="card-title"><span class="dot"></span>Sources of Funds</div>
          <div class="chart-box"><canvas id="chart-sources"></canvas></div>
        </div>
        <div class="card">
          <div class="card-title"><span class="dot"></span>Debt Paydown Over Hold Period</div>
          <div class="chart-box"><canvas id="chart-debt"></canvas></div>
        </div>
      </div>
    </div>
  `;
}

function drawLBOCharts() {
  const src = document.getElementById("chart-sources");
  if (src) {
    activeChartInstances.push(new Chart(src, {
      type: "doughnut",
      data: { labels:["Senior Debt","Sponsor Equity","Seller Note"], datasets:[{ data:[7.2,5.4,1.0], backgroundColor:[getCssVar('--emerald'),getCssVar('--blue'),getCssVar('--amber')], borderWidth:0 }]},
      options:{ plugins:{legend:{position:"bottom",labels:{color:"#8C97A8",boxWidth:10,font:{size:10}}}} }
    }));
  }
  const debt = document.getElementById("chart-debt");
  if (debt) {
    activeChartInstances.push(new Chart(debt, {
      type: "line",
      data: { labels:["Y0","Y1","Y2","Y3","Y4","Y5"], datasets:[{ data:[7.2,6.1,4.8,3.4,2.0,0.8], borderColor:getCssVar('--amber'), backgroundColor:"rgba(240,169,63,.08)", fill:true, tension:.35, pointRadius:0, borderWidth:2 }]},
      options:{ plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}}, y:{grid:{color:"#1A212C"}}} }
    }));
  }
}

function stressHTML() {
  return `
    <div class="card" style="margin-bottom:14px;">
      <div class="card-title"><span class="dot"></span>Monte Carlo Simulation — 10,000 Runs</div>
      <div class="chart-box tall"><canvas id="chart-montecarlo"></canvas></div>
      <div class="subtle-note">Distribution of simulated IRR outcomes across randomized growth, exit multiple, and rate paths.</div>
    </div>
    <div class="grid grid-4">
      <div class="card stat-card clickable" data-tip="10th percentile outcome" onclick="openDetail('P10 IRR', 'In 90% of simulated paths, the IRR was at or above this figure — a proxy for downside risk.', 'MONTE CARLO')"><div class="stat-label">P10 IRR</div><div class="stat-value" style="color:var(--red)">6.2%</div></div>
      <div class="card stat-card clickable" data-tip="Median outcome" onclick="openDetail('P50 IRR', 'The median simulated IRR across all 10,000 runs.', 'MONTE CARLO')"><div class="stat-label">P50 IRR</div><div class="stat-value">22.4%</div></div>
      <div class="card stat-card clickable" data-tip="90th percentile outcome" onclick="openDetail('P90 IRR', 'In only 10% of simulated paths did the IRR exceed this figure — a proxy for upside potential.', 'MONTE CARLO')"><div class="stat-label">P90 IRR</div><div class="stat-value" style="color:var(--emerald)">38.1%</div></div>
      <div class="card stat-card clickable" data-tip="Share of runs with a negative return" onclick="openDetail('Probability of Loss', 'The percentage of the 10,000 simulated paths that resulted in an IRR below 0%.', 'MONTE CARLO')"><div class="stat-label">Probability of Loss</div><div class="stat-value">4.8%</div></div>
    </div>
  `;
}

function drawMonteCarlo() {
  const canvas = document.getElementById("chart-montecarlo");
  if (!canvas) return;
  const buckets = ["<0%","0-10%","10-20%","20-30%","30-40%","40-50%",">50%"];
  const freq = [4.8, 12, 24, 31, 19, 7, 2.2];
  activeChartInstances.push(new Chart(canvas, {
    type:"bar",
    data:{ labels:buckets, datasets:[{ data:freq, backgroundColor:getCssVar('--blue'), borderRadius:4 }]},
    options:{ plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}}, y:{grid:{color:"#1A212C"}}} }
  }));
}

afterRenderHooks.models = () => {
  renderModelTabContent();
  if (modelTab === "stress") drawMonteCarlo();
};

// ---------- CONTRACTS ----------
let selectedContract = 0;
function renderContracts() {
  return `
    <div class="view-header">
      <div class="view-title">Contract Intelligence</div>
      <div class="view-desc">Every uploaded contract receives an executive summary, clause-level risk tagging, and a negotiation recommendation.</div>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Contracts — All Data Rooms</div>
        <table>
          <thead><tr><th>Contract</th><th>Parties</th><th>Risk</th><th>Flags</th></tr></thead>
          <tbody>
            ${CONTRACTS.map((c,i)=>`
              <tr class="clickable" data-tip="${esc(c.tip)}" onclick="selectContract(${i})" style="${i===selectedContract?'background:var(--bg-2)':''}">
                <td><b>${c.name}</b></td>
                <td style="color:var(--text-dim)">${c.parties}</td>
                <td><span class="pill ${c.risk==='high'?'red':c.risk==='medium'?'amber':'green'}">${c.risk}</span></td>
                <td class="mono">${c.flags}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>${CONTRACTS[selectedContract].name} — Executive Summary</div>
        <div style="font-size:12.5px; color:var(--text-dim); line-height:1.7; margin-bottom:16px;">${CONTRACT_DETAIL.summary}</div>
        <div class="section-label">Clause Risk Breakdown <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click a clause</span></div>
        ${CONTRACT_DETAIL.clauses.map(cl=>`
          <div class="check-row" data-tip="${esc(cl.detail)}" onclick="openDetail('${esc(cl.name)}', '${esc(cl.detail)}', 'CLAUSE DETAIL')">
            <div class="check-name" style="font-weight:500;">${cl.name}</div>
            <span class="pill ${cl.risk==='high'?'red':cl.risk==='medium'?'amber':'green'}">${cl.risk}</span>
          </div>`).join("")}
        <div class="section-label">AI Alert</div>
        <div class="alert-box clickable-item" data-tip="Click for Houn's negotiation recommendation" onclick="openDetail('${esc(CONTRACT_DETAIL.alert.clause)}', '${esc(CONTRACT_DETAIL.alert.text)} Recommendation: ${esc(CONTRACT_DETAIL.alert.recommendation)}', 'AI ALERT · SEVERITY ' + '${esc(CONTRACT_DETAIL.alert.severity)}')">
          ${ICONS.alert}
          <div>
            <div style="font-weight:700; font-size:13px; margin-bottom:4px;">${CONTRACT_DETAIL.alert.clause} — Severity: ${CONTRACT_DETAIL.alert.severity}</div>
            <div style="font-size:12.5px; color:var(--text-dim); line-height:1.6;">${CONTRACT_DETAIL.alert.text}</div>
            <div style="font-size:12.5px; margin-top:8px;"><b>Recommendation:</b> ${CONTRACT_DETAIL.alert.recommendation}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
function selectContract(i) { selectedContract = i; render(); }

// ---------- MARKET INTELLIGENCE ----------
function renderMarket() {
  return `
    <div class="view-header">
      <div class="view-title">Market Intelligence</div>
      <div class="view-desc">Houn cross-references live data across research providers, filings, and news to size the opportunity.</div>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <div class="card-title"><span class="dot"></span>Connected Sources <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click a source</span></div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">${MARKET.sources.map(s=>`<span class="pill gray" style="cursor:pointer;" data-tip="Houn queries ${esc(s)} for this deal" onclick="openDetail('${esc(s)}', 'Houn pulls market sizing, comparable transactions, and news signal from ${esc(s)} and reconciles it against the other connected sources.', 'DATA SOURCE')">${s}</span>`).join("")}</div>
    </div>

    <div class="grid grid-4" style="margin-bottom:16px;">
      <div class="card stat-card clickable" data-tip="Total Addressable Market" onclick="openDetail('TAM', 'Total Addressable Market — the full revenue opportunity if GreenTech Solar captured 100% of the renewable energy market it operates in.', 'MARKET SIZING')"><div class="stat-label">TAM</div><div class="stat-value">${MARKET.tam}</div></div>
      <div class="card stat-card clickable" data-tip="Serviceable Addressable Market" onclick="openDetail('SAM', 'Serviceable Addressable Market — the portion of the TAM reachable given GreenTech Solar\\'s current geography and license.', 'MARKET SIZING')"><div class="stat-label">SAM</div><div class="stat-value">${MARKET.sam}</div></div>
      <div class="card stat-card clickable" data-tip="Serviceable Obtainable Market" onclick="openDetail('SOM', 'Serviceable Obtainable Market — Houn\\'s realistic 3-year capture estimate given the current pipeline and competitive set.', 'MARKET SIZING')"><div class="stat-label">SOM</div><div class="stat-value">${MARKET.som}</div></div>
      <div class="card stat-card clickable" data-tip="Industry compound annual growth rate" onclick="openDetail('Industry CAGR', 'Compound annual growth rate of the utility-scale solar market in West Africa, per Bloomberg NEF and Capital IQ estimates.', 'MARKET SIZING')"><div class="stat-label">Industry CAGR</div><div class="stat-value" style="color:var(--emerald)">${MARKET.cagr}</div></div>
    </div>

    <div class="two-col" style="margin-bottom:16px;">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Competitive Landscape — Market Share <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click a competitor</span></div>
        <div class="chart-box"><canvas id="chart-competitors"></canvas></div>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
          ${MARKET.competitors.map(c=>`<span class="pill gray" style="cursor:pointer;" data-tip="Growth: ${esc(c.growth)} YoY" onclick="openDetail('${esc(c.name)}', 'Estimated market share of ${c.share}%, growing ${esc(c.growth)} year-over-year.', 'COMPETITOR')">${c.name} · ${c.share}%</span>`).join("")}
        </div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Management Team — CEO Assessment</div>
        <div style="font-weight:700; font-size:14px;">${MARKET.ceo.name}</div>
        <div style="font-size:12px; color:var(--text-dim); margin-bottom:12px;">${MARKET.ceo.background}</div>
        <div class="grid grid-2">
          <div class="stat-card card tight clickable" data-tip="Has this founder exited a company before?" onclick="openDetail('Successful Exit', 'Kwabena Owusu previously led the Series B exit of a renewable infrastructure business acquired by a regional utility in 2019.', 'MANAGEMENT')"><div class="stat-label">Successful Exit</div><div class="stat-value" style="font-size:16px; color:var(--emerald)">${MARKET.ceo.exit}</div></div>
          <div class="stat-card card tight clickable" data-tip="Any prior bankruptcy filings?" onclick="openDetail('Prior Bankruptcy', 'No bankruptcy filings found across any entity linked to this founder in public records checks.', 'MANAGEMENT')"><div class="stat-label">Prior Bankruptcy</div><div class="stat-value" style="font-size:16px;">${MARKET.ceo.bankruptcy}</div></div>
          <div class="stat-card card tight clickable" data-tip="Composite reputation score" onclick="openDetail('Reputation Score', 'Composite score from press sentiment, LinkedIn recommendations, and reference calls conducted by Houn.', 'MANAGEMENT')"><div class="stat-label">Reputation Score</div><div class="stat-value" style="font-size:16px;">${MARKET.ceo.reputation}</div></div>
          <div class="stat-card card tight clickable" data-tip="Track record of hitting plan" onclick="openDetail('Execution Score', 'Historical accuracy of this management team\\'s forecasts vs. actuals across prior ventures.', 'MANAGEMENT')"><div class="stat-label">Execution Score</div><div class="stat-value" style="font-size:16px;">${MARKET.ceo.execution}</div></div>
        </div>
        <div class="pill green" style="margin-top:12px; width:fit-content; cursor:pointer;" data-tip="Composite leadership risk rating" onclick="openDetail('Leadership Risk', 'Overall leadership risk is rated Low, driven by a clean legal history and a prior successful exit.', 'MANAGEMENT')">Leadership Risk: ${MARKET.ceo.leadershipRisk}</div>
      </div>
    </div>

    <div class="two-col" style="margin-bottom:16px;">
      <div class="card">
        <div class="card-title"><span class="dot"></span>SWOT <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click any point</span></div>
        <div class="grid grid-2">
          <div class="card tight"><div class="stat-label" style="color:var(--emerald)">Strengths</div><ul class="deal-reasons" style="margin-top:8px;">${MARKET.swot.strengths.map(s=>`<li class="clickable" data-tip="Click for more" onclick="openDetail('Strength', '${esc(s)}', 'SWOT')">${s}</li>`).join("")}</ul></div>
          <div class="card tight"><div class="stat-label" style="color:var(--red)">Weaknesses</div><ul class="deal-reasons" style="margin-top:8px;">${MARKET.swot.weaknesses.map(s=>`<li class="clickable" data-tip="Click for more" onclick="openDetail('Weakness', '${esc(s)}', 'SWOT')">${s}</li>`).join("")}</ul></div>
          <div class="card tight"><div class="stat-label" style="color:var(--blue)">Opportunities</div><ul class="deal-reasons" style="margin-top:8px;">${MARKET.swot.opportunities.map(s=>`<li class="clickable" data-tip="Click for more" onclick="openDetail('Opportunity', '${esc(s)}', 'SWOT')">${s}</li>`).join("")}</ul></div>
          <div class="card tight"><div class="stat-label" style="color:var(--amber)">Threats</div><ul class="deal-reasons" style="margin-top:8px;">${MARKET.swot.threats.map(s=>`<li class="clickable" data-tip="Click for more" onclick="openDetail('Threat', '${esc(s)}', 'SWOT')">${s}</li>`).join("")}</ul></div>
        </div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Comparable Transactions</div>
        <table>
          <thead><tr><th>Company / Round</th><th>EV</th><th>Multiple</th></tr></thead>
          <tbody>${MARKET.comps.map(c=>`<tr class="clickable" data-tip="${esc(c.tip)}" onclick="openDetail('${esc(c.name)}', '${esc(c.tip)} Enterprise value ${esc(c.ev)} at ${esc(c.multiple)}.', 'COMPARABLE TRANSACTION')"><td>${c.name}</td><td class="mono">${c.ev}</td><td class="mono">${c.multiple}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    </div>
  `;
}
afterRenderHooks.market = () => {
  const ctx = document.getElementById("chart-competitors");
  activeChartInstances.push(new Chart(ctx, {
    type:"doughnut",
    data:{ labels: MARKET.competitors.map(c=>c.name), datasets:[{ data: MARKET.competitors.map(c=>c.share), backgroundColor:[getCssVar('--emerald'),getCssVar('--blue'),getCssVar('--amber'),"#2A3140"], borderWidth:0 }]},
    options:{ plugins:{legend:{position:"bottom",labels:{color:"#8C97A8",boxWidth:10,font:{size:10}}}} }
  }));
};

// ---------- RISK ENGINE ----------
function renderRisk() {
  return `
    <div class="view-header">
      <div class="view-title">Risk Engine</div>
      <div class="view-desc">The client's requested scoring framework, applied consistently and made institutional.</div>
    </div>

    <div class="two-col" style="margin-bottom:16px;">
      <div class="card clickable" data-tip="Weighted average across all 11 categories" onclick="openDetail('Overall Investment Score', 'Houn combines all 11 weighted risk categories into a single 0–100 score. 87 corresponds to a clear Invest recommendation under this fund\\'s policy thresholds.', 'RISK ENGINE')" style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <div class="stat-label">Overall Investment Score</div>
        <div class="mono" style="font-size:52px; font-weight:800; color:var(--emerald); margin:10px 0;">87<span style="font-size:22px; color:var(--text-faint);">/100</span></div>
        <div class="pill green">Recommendation: Invest</div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Category Radar</div>
        <div class="chart-box"><canvas id="chart-radar"></canvas></div>
      </div>
    </div>

    <div class="section-label">Risk Category Scorecard <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click any category</span></div>
    <div class="grid grid-4" style="margin-bottom:20px;">
      ${RISK_CATEGORIES.map(r => `
        <div class="card tight clickable" data-tip="${esc(r.detail)}" onclick="openDetail('${esc(r.name)} Risk', '${esc(r.detail)}', 'RISK CATEGORY · SCORE ' + ${r.score})">
          <div class="stat-label">${r.name}</div>
          <div style="display:flex; align-items:center; gap:10px; margin-top:8px;">
            <div class="progress-track" style="flex:1;"><div class="progress-fill" style="width:${r.score}%; background:${r.score>=85?'linear-gradient(90deg,var(--emerald),var(--emerald))':r.score>=75?'linear-gradient(90deg,var(--amber),var(--amber))':'linear-gradient(90deg,var(--red),var(--red))'}"></div></div>
            <div class="mono" style="font-size:12px; width:28px; text-align:right;">${r.score}</div>
          </div>
        </div>`).join("")}
    </div>

    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Risk Heat Map</div>
        <div class="heat-row"><div class="heat-label" style="color:var(--emerald)">LOW</div><div class="heat-bar">${Array(10).fill(0).map(()=>`<div class="heat-blip" style="background:var(--emerald)" data-tip="10 items scored low risk"></div>`).join("")}</div></div>
        <div class="heat-row"><div class="heat-label" style="color:var(--amber)">MEDIUM</div><div class="heat-bar">${Array(4).fill(0).map(()=>`<div class="heat-blip" style="background:var(--amber)" data-tip="4 items scored medium risk"></div>`).join("")}</div></div>
        <div class="heat-row"><div class="heat-label" style="color:var(--red)">HIGH</div><div class="heat-bar">${Array(1).fill(0).map(()=>`<div class="heat-blip" style="background:var(--red)" data-tip="1 item scored high risk — the Clause 17.4 indemnity issue"></div>`).join("")}</div></div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>ESG Engine</div>
        <div class="grid grid-4" style="margin-bottom:14px;">
          <div class="stat-card card tight clickable" data-tip="Environmental sub-score" onclick="openDetail('Environmental Score', 'Driven by land use, emissions offset, and the pending EPA compliance filing.', 'ESG')"><div class="stat-label">Environmental</div><div class="stat-value" style="font-size:18px;">${ESG.environmental}</div></div>
          <div class="stat-card card tight clickable" data-tip="Social sub-score" onclick="openDetail('Social Score', 'Driven by local job creation, board diversity, and community engagement programs.', 'ESG')"><div class="stat-label">Social</div><div class="stat-value" style="font-size:18px;">${ESG.social}</div></div>
          <div class="stat-card card tight clickable" data-tip="Governance sub-score" onclick="openDetail('Governance Score', 'Pulled down by the pending environmental compliance filing and the Clause 17.4 indemnity issue.', 'ESG')"><div class="stat-label">Governance</div><div class="stat-value" style="font-size:18px;">${ESG.governance}</div></div>
          <div class="stat-card card tight clickable" data-tip="Composite ESG score" onclick="openDetail('Overall ESG Score', 'Weighted average of Environmental, Social, and Governance sub-scores.', 'ESG')"><div class="stat-label">Overall</div><div class="stat-value" style="font-size:18px; color:var(--emerald)">${ESG.overall}</div></div>
        </div>
        ${ESG.flags.map(f=>`<div class="check-row" data-tip="${esc(f.detail)}" onclick="openDetail('${esc(f.name)}', '${esc(f.detail)}', 'ESG FLAG')"><div class="check-name" style="font-weight:500;">${f.name}</div><span class="pill ${f.status==='Positive'?'green':'amber'}">${f.status}</span></div>`).join("")}
      </div>
    </div>
  `;
}
afterRenderHooks.risk = () => {
  const ctx = document.getElementById("chart-radar");
  activeChartInstances.push(new Chart(ctx, {
    type:"radar",
    data:{ labels: RISK_CATEGORIES.map(r=>r.name), datasets:[{ data: RISK_CATEGORIES.map(r=>r.score), backgroundColor:"rgba(47,223,160,.15)", borderColor:getCssVar('--emerald'), pointBackgroundColor:getCssVar('--emerald'), borderWidth:2 }]},
    options:{ plugins:{legend:{display:false}}, scales:{ r:{ grid:{color:"#1A212C"}, angleLines:{color:"#1A212C"}, pointLabels:{color:"#8C97A8", font:{size:10}}, ticks:{display:false}, min:0, max:100 } } }
  }));
};

// ---------- INVESTMENT COMMITTEE ----------
function renderIC() {
  return `
    <div class="view-header">
      <div class="view-title">Investment Committee</div>
      <div class="view-desc">Committee-ready memo and deck, generated automatically and capped at 5 pages.</div>
    </div>

    <div class="grid grid-4" style="margin-bottom:18px;">
      <div class="card stat-card"><div class="stat-label">Investment Requested</div><div class="stat-value">$15M</div></div>
      <div class="card stat-card"><div class="stat-label">Enterprise Value</div><div class="stat-value">$92M</div></div>
      <div class="card stat-card"><div class="stat-label">Expected IRR</div><div class="stat-value" style="color:var(--emerald)">28%</div></div>
      <div class="card stat-card"><div class="stat-label">Confidence</div><div class="stat-value">95%</div></div>
    </div>

    <div class="two-col" style="margin-bottom:16px;">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Investment Memo — Auto-Generated <span class="pill gray" style="margin-left:auto;">Max 5 pages</span></div>
        ${MEMO_SECTIONS.map(s=>`<div class="check-row" data-tip="Click to preview this section" onclick="openDetail('${esc(s.name)}', '${esc(s.preview)}', 'MEMO SECTION — DRAFTED BY HOUN')"><div class="check-name" style="font-weight:500;">${s.name}</div><span class="pill green">Drafted</span></div>`).join("")}
      </div>
      <div>
        <div class="card" style="margin-bottom:14px;">
          <div class="card-title"><span class="dot"></span>Recommendation</div>
          <div class="pill green" style="font-size:13px; padding:8px 14px;">Proceed</div>
          <div class="subtle-note">Human sign-off required before capital is committed.</div>
        </div>
        <div class="card">
          <div class="card-title"><span class="dot"></span>Export</div>
          <div class="btn-row">
            <button class="btn" data-tip="Export as .pptx" onclick="simulateExport('PowerPoint')">${ICONS.download} PowerPoint</button>
            <button class="btn" data-tip="Export as .pdf" onclick="simulateExport('PDF')">${ICONS.download} PDF</button>
            <button class="btn" data-tip="Export as .docx" onclick="simulateExport('Word')">${ICONS.download} Word</button>
          </div>
        </div>
      </div>
    </div>

    <div class="section-label">Committee Deck <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click a slide to preview</span></div>
    <div class="card">
      <div class="deck-strip">
        ${IC_SLIDES.map((s,i)=>`<div class="deck-thumb" data-tip="Preview slide ${i+1}" onclick="openDetail('Slide ${i+1} — ${esc(s)}', 'This slide is auto-generated from the ${esc(s)} section of the investment memo, formatted for committee presentation.', 'IC DECK')"><b>${String(i+1).padStart(2,'0')}</b>${s}</div>`).join("")}
      </div>
    </div>
  `;
}
function simulateExport(kind) {
  setHounWorking(true, `Houn is generating the ${kind} export…`);
  showToast(`Houn is generating a ${kind} export of the GreenTech Solar IC memo…`);
  setTimeout(()=> {
    showToast(`${kind} export ready — this is a prototype, so downloads aren't wired up yet.`);
    setHounWorking(false);
  }, 1800);
}

// ---------- PORTFOLIO ----------
function renderPortfolio() {
  return `
    <div class="view-header">
      <div class="view-title">Portfolio Management</div>
      <div class="view-desc">Once invested, Houn keeps every position current — board cadence, covenants, and exit readiness.</div>
    </div>
    <div class="grid grid-6" style="margin-bottom:18px;">
      ${FUND_STATS.map(s=>`<div class="card stat-card"><div class="stat-label">${s.label}</div><div class="stat-value">${s.value}</div></div>`).join("")}
    </div>
    <div class="two-col" style="margin-bottom:16px;">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Portfolio Companies <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click a row</span></div>
        <table>
          <thead><tr><th>Company</th><th>Stage</th><th>IRR</th><th>MOIC</th><th>Status</th></tr></thead>
          <tbody>${PORTFOLIO_COMPANIES.map(p=>`
            <tr class="clickable" data-tip="${esc(p.detail)}" onclick="openDetail('${esc(p.name)}', '${esc(p.detail)} Currently tracking ${esc(p.irr)} IRR / ${esc(p.moic)} MOIC.', 'PORTFOLIO COMPANY')">
              <td><b>${p.name}</b></td><td style="color:var(--text-dim)">${p.stage}</td>
              <td class="mono" style="color:${p.irr.includes('-')?'var(--red)':'var(--emerald)'}">${p.irr}</td>
              <td class="mono">${p.moic}</td>
              <td><span class="pill ${p.status==='On Track'?'green':p.status==='Watch'?'amber':'red'}">${p.status}</span></td>
            </tr>`).join("")}</tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Fund Value Growth Since Inception</div>
        <div class="chart-box"><canvas id="chart-fundgrowth"></canvas></div>
      </div>
    </div>
    <div class="section-label">GreenTech Solar — Lifecycle Timeline</div>
    <div class="card">
      <div class="stepper">
        ${[
          {s:"Investment", d:"Closed Q2 2026 at a $92M enterprise value."},
          {s:"Board Meetings", d:"Quarterly cadence — next meeting in 3 weeks."},
          {s:"Quarterly Results", d:"Q2 results tracking 4% ahead of the base case."},
          {s:"Covenants", d:"All covenants currently in compliance."},
          {s:"Exit Readiness", d:"Not yet applicable — earliest modeled exit is 2032."}
        ].map((step,i,arr)=>`
          <div class="step ${i>2?'pending':''} clickable" data-tip="${esc(step.d)}" onclick="openDetail('${esc(step.s)}', '${esc(step.d)}', 'LIFECYCLE STAGE')">
            ${i<arr.length-1?'<div class="step-line"></div>':''}
            <div class="step-dot"></div>
            <div class="step-label">${step.s}</div>
          </div>`).join("")}
      </div>
    </div>
  `;
}
afterRenderHooks.portfolio = () => {
  const ctx = document.getElementById("chart-fundgrowth");
  activeChartInstances.push(new Chart(ctx, {
    type:"line",
    data:{ labels:["2021","2022","2023","2024","2025","2026"], datasets:[{ data:[120,148,172,198,222,268], borderColor:getCssVar('--emerald'), backgroundColor:"rgba(47,223,160,.08)", fill:true, tension:.35, pointRadius:0, borderWidth:2 }]},
    options:{ plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}}, y:{grid:{color:"#1A212C"}}} }
  }));
};

// ---------- FUND ADMINISTRATION ----------
function renderFundAdmin() {
  return `
    <div class="view-header">
      <div class="view-title">Fund Administration</div>
      <div class="view-desc">Houn assists with the operational backbone of the fund alongside due diligence.</div>
    </div>
    <div class="grid grid-4" style="margin-bottom:16px;">
      <div class="card stat-card"><div class="stat-label">Capital Calls (YTD)</div><div class="stat-value">$18.2M</div></div>
      <div class="card stat-card"><div class="stat-label">Distributions (YTD)</div><div class="stat-value">$9.6M</div></div>
      <div class="card stat-card"><div class="stat-label">NAV</div><div class="stat-value">$268M</div></div>
      <div class="card stat-card"><div class="stat-label">Fund Expenses (QTD)</div><div class="stat-value">$410K</div></div>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Investor Registry <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click an LP</span></div>
        <table>
          <thead><tr><th>LP</th><th>Commitment</th><th>Called</th><th>Status</th></tr></thead>
          <tbody>
            ${LP_REGISTRY.map(lp => `
              <tr class="clickable" data-tip="${esc(lp.detail)}" onclick="openDetail('${esc(lp.name)}', '${esc(lp.detail)} Committed ${esc(lp.commitment)}, called ${esc(lp.called)} to date.', 'LIMITED PARTNER')">
                <td>${lp.name}</td><td class="mono">${lp.commitment}</td><td class="mono">${lp.called}</td>
                <td><span class="pill ${lp.status==='Current'?'green':'amber'}">${lp.status}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Compliance</div>
        ${COMPLIANCE.map(c=>`<div class="check-row" data-tip="${esc(c.detail)}" onclick="openDetail('${esc(c.name)}', '${esc(c.detail)}', 'COMPLIANCE')"><div class="check-name" style="font-weight:500;">${c.name}</div><span class="pill green">${c.status}</span></div>`).join("")}
      </div>
    </div>
  `;
}

// ---------- INVESTOR PORTAL ----------
function renderInvestors() {
  return `
    <div class="view-header">
      <div class="view-title">Investor Portal</div>
      <div class="view-desc">Preview of what each LP sees when they log in.</div>
    </div>
    <div class="grid grid-4" style="margin-bottom:16px;">
      <div class="card stat-card"><div class="stat-label">Capital Account Balance</div><div class="stat-value">$28.4M</div></div>
      <div class="card stat-card"><div class="stat-label">Net IRR to LP</div><div class="stat-value" style="color:var(--emerald)">21.6%</div></div>
      <div class="card stat-card"><div class="stat-label">DPI</div><div class="stat-value">0.9x</div></div>
      <div class="card stat-card"><div class="stat-label">TVPI</div><div class="stat-value">1.8x</div></div>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Quarterly Letters <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click to preview</span></div>
        ${["Q2 2026 Letter","Q1 2026 Letter","Q4 2025 Letter"].map(l=>`<div class="check-row" data-tip="Preview this letter" onclick="openDetail('${esc(l)}', 'Auto-drafted by Houn from the quarter\\'s deal activity, NAV movement, and portfolio updates, then reviewed by the investor relations team before send.', 'QUARTERLY LETTER')"><div class="check-name" style="font-weight:500;">${l}</div><span class="pill gray">PDF</span></div>`).join("")}
        <div class="section-label">Portfolio Updates</div>
        <div class="clickable-item" data-tip="Click to read the full update" onclick="openDetail('Q2 2026 Portfolio Update', 'This quarter, the fund deployed $12M into GreenTech Solar following a full AI-assisted due diligence cycle completed in 11 minutes of review time. NAV rose to $268M, up from $245M last quarter, driven by markups at GreenTech Solar and Nova Freightlink.', 'PORTFOLIO UPDATE')" style="font-size:12.5px; color:var(--text-dim); line-height:1.7; cursor:pointer;">"This quarter, the fund deployed $12M into GreenTech Solar following a full AI-assisted due diligence cycle completed in 11 minutes of review time..."</div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Distribution History <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click a row</span></div>
        <table>
          <thead><tr><th>Date</th><th>Type</th><th>Amount</th></tr></thead>
          <tbody>
            <tr class="clickable" data-tip="Click for detail" onclick="openDetail('Jun 2026 Distribution', 'Return of capital following the partial realization of an earlier fund position.', 'DISTRIBUTION')"><td>Jun 2026</td><td>Return of Capital</td><td class="mono">$3.1M</td></tr>
            <tr class="clickable" data-tip="Click for detail" onclick="openDetail('Mar 2026 Distribution', 'Realized gain distributed following the exit of a Fund II portfolio company.', 'DISTRIBUTION')"><td>Mar 2026</td><td>Realized Gain</td><td class="mono">$4.2M</td></tr>
            <tr class="clickable" data-tip="Click for detail" onclick="openDetail('Dec 2025 Distribution', 'Return of capital from a partial secondary sale.', 'DISTRIBUTION')"><td>Dec 2025</td><td>Return of Capital</td><td class="mono">$2.3M</td></tr>
          </tbody>
        </table>
        <div class="section-label">Tax Documents</div>
        <div class="check-row" data-tip="Click to preview" onclick="openDetail('Schedule K-1 — FY2025', 'Generated and reviewed by the fund administrator; ready for LP download.', 'TAX DOCUMENT')"><div class="check-name" style="font-weight:500;">Schedule K-1 — FY2025</div><span class="pill gray">Ready</span></div>
      </div>
    </div>
  `;
}

// ---------- SETTINGS ----------
function renderSettings() {
  return `
    <div class="view-header">
      <div class="view-title">Settings &amp; Security</div>
      <div class="view-desc">Enterprise-grade controls for a firm handling confidential deal data.</div>
    </div>
    <div class="card" style="margin-bottom:16px;">
      <div class="card-title"><span class="dot"></span>Security &amp; Compliance <span style="text-transform:none; font-weight:400; color:var(--text-faint);">— click a badge</span></div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">${SECURITY_BADGES.map(b=>`<span class="pill gray" style="cursor:pointer;" data-tip="${esc(b.detail)}" onclick="openDetail('${esc(b.name)}', '${esc(b.detail)}', 'SECURITY & COMPLIANCE')">${b.name}</span>`).join("")}</div>
    </div>
    <div class="grid grid-2" style="margin-bottom:16px;">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Deployment</div>
        <div class="check-row" data-tip="Deploy Houn inside your own VPC" onclick="openDetail('Private LLM Deployment', 'Houn can run entirely inside your own VPC — deal data never leaves your environment, and no data is used to train shared models.', 'DEPLOYMENT')"><div class="check-name" style="font-weight:500;">Private LLM Deployment</div><span class="pill green">Enabled</span></div>
        <div class="check-row" data-tip="Fully air-gapped option" onclick="openDetail('Offline Deployment Option', 'For the most sensitive mandates, Houn can run fully air-gapped with no external network calls.', 'DEPLOYMENT')"><div class="check-name" style="font-weight:500;">Offline Deployment Option</div><span class="pill gray">Available</span></div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Access</div>
        <div class="check-row" data-tip="Analysts, partners, and LPs each see only what they should" onclick="openDetail('Role-Based Permissions', 'Analysts, partners, and LPs each see only the screens and data appropriate to their role.', 'ACCESS')"><div class="check-name" style="font-weight:500;">Role-Based Permissions</div><span class="pill green">Configured</span></div>
        <div class="check-row" data-tip="How long audit logs are kept" onclick="openDetail('Audit Log Retention', 'Every document view and Houn action is logged and retained for 7 years, matching standard fund audit requirements.', 'ACCESS')"><div class="check-name" style="font-weight:500;">Audit Log Retention</div><span class="pill green">7 years</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-title"><span class="dot"></span>Appearance</div>
      <div style="font-size:12.5px; color:var(--text-dim); margin-bottom:12px;">Switch themes from the topbar, or here.</div>
      <div class="theme-switcher" id="theme-switcher-settings" style="width:fit-content;"></div>
    </div>
    <div class="subtle-note" style="margin-top:18px;">${DUMMY_NOTE}</div>
  `;
}
afterRenderHooks.settings = () => { buildThemeSwitcher("theme-switcher-settings"); };

// ---------- HOUN: WORKING INDICATOR ----------
function setHounWorking(isWorking, tickerText) {
  const ring = document.getElementById("houn-toggle-pulse");
  const tickerEl = document.getElementById("houn-ticker-text");
  if (ring) ring.classList.toggle("thinking", isWorking);
  if (isWorking && tickerText) {
    clearInterval(window.__hounTickerInterval);
    tickerEl.textContent = tickerText;
  } else if (!isWorking) {
    startHounTicker();
  }
}

let hounTickerIndex = 0;
function startHounTicker() {
  clearInterval(window.__hounTickerInterval);
  const el = document.getElementById("houn-ticker-text");
  if (!el) return;
  el.textContent = HOUN_TICKER[hounTickerIndex % HOUN_TICKER.length];
  window.__hounTickerInterval = setInterval(() => {
    el.classList.add("fade");
    setTimeout(() => {
      hounTickerIndex++;
      el.textContent = HOUN_TICKER[hounTickerIndex % HOUN_TICKER.length];
      el.classList.remove("fade");
    }, 320);
  }, 4200);
}

// ---------- HOUN AI ASSISTANT (chat) ----------
function renderCopilotQuick() {
  const wrap = document.getElementById("copilot-quick");
  wrap.innerHTML = Object.keys(COPILOT_RESPONSES).map((q, i) => `<button class="quick-btn" data-q-index="${i}">${q}</button>`).join("");
  const quickKeys = Object.keys(COPILOT_RESPONSES);
  wrap.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => askCopilot(quickKeys[Number(btn.dataset.qIndex)]));
  });
}
function pushMsg(role, text) {
  const body = document.getElementById("copilot-body");
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
  return div;
}
function pushTyping() {
  const body = document.getElementById("copilot-body");
  const div = document.createElement("div");
  div.className = "msg ai";
  div.id = "typing-indicator";
  div.innerHTML = `<span class="typing-dots"><span></span><span></span><span></span></span>`;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}
function askCopilot(q) {
  pushMsg("user", q);
  setHounWorking(true, "Houn is thinking…");
  document.getElementById("houn-status-line").textContent = "Thinking…";
  pushTyping();
  setTimeout(() => {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
    pushMsg("ai", COPILOT_RESPONSES[q] || "Noted — in the full deployment, I'd pull the relevant documents and data room context to answer precisely. For this prototype, try one of the suggested prompts below.");
    document.getElementById("houn-status-line").textContent = "Grounded in the open deal · GreenTech Solar";
    setHounWorking(false);
  }, 1100);
}
function initCopilot() {
  renderCopilotQuick();
  pushMsg("ai", "Hi David — I'm Houn. I've finished reviewing the GreenTech Solar data room. Overall score: 87/100, recommendation: Invest. Ask me anything, or tap a suggestion below.");
  document.getElementById("copilot-toggle").addEventListener("click", () => {
    document.getElementById("copilot-panel").classList.toggle("open");
  });
  document.getElementById("copilot-send").addEventListener("click", sendCopilotInput);
  document.getElementById("copilot-input-field").addEventListener("keydown", (e) => { if (e.key === "Enter") sendCopilotInput(); });
}
function sendCopilotInput() {
  const field = document.getElementById("copilot-input-field");
  const val = field.value.trim();
  if (!val) return;
  askCopilot(val);
  field.value = "";
}

// ---------- NOTIFICATIONS ----------
function severityColor(sev) { return sev === "high" ? "var(--red)" : sev === "medium" ? "var(--amber)" : "var(--emerald)"; }
function buildNotifBell() {
  const btn = document.getElementById("notif-btn");
  btn.innerHTML = ICONS.bell;
  const dd = document.getElementById("notif-dropdown");
  dd.innerHTML = `
    <div class="notif-head">Houn Alerts (${NOTIFICATIONS.length})</div>
    ${NOTIFICATIONS.map(n => `
      <div class="notif-item" onclick="handleNotifClick('${n.view}')">
        <div class="notif-title"><span class="notif-dot" style="background:${severityColor(n.severity)}"></span>${n.title}</div>
        <div class="notif-body">${n.body}</div>
      </div>`).join("")}
  `;
  btn.addEventListener("click", (e) => { e.stopPropagation(); dd.classList.toggle("open"); });
  document.addEventListener("click", (e) => { if (!dd.contains(e.target) && e.target !== btn) dd.classList.remove("open"); });
}
function handleNotifClick(view) {
  document.getElementById("notif-dropdown").classList.remove("open");
  navigate(view);
}

// ---------- THEME SWITCHER ----------
function buildThemeSwitcher(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const current = localStorage.getItem("pe-theme") || "obsidian";
  el.innerHTML = THEMES.map(t => `<div class="theme-swatch ${t.id===current?'active':''}" data-tip="${t.name} — ${esc(t.note)}" onclick="setTheme('${t.id}')">${ICONS[t.icon]}</div>`).join("");
}
function setTheme(id) {
  document.documentElement.setAttribute("data-theme", id === "obsidian" ? "" : id);
  localStorage.setItem("pe-theme", id);
  buildThemeSwitcher("theme-switcher");
  buildThemeSwitcher("theme-switcher-settings");
  showToast(`Switched to ${THEMES.find(t=>t.id===id).name} theme.`);
  // redraw charts so colors follow the new theme
  setTimeout(() => render(), 50);
}
function initTheme() {
  const saved = localStorage.getItem("pe-theme") || "obsidian";
  document.documentElement.setAttribute("data-theme", saved === "obsidian" ? "" : saved);
  buildThemeSwitcher("theme-switcher");
}

// ---------- COMMAND PALETTE ----------
const CMDK_ITEMS = Object.keys(NAV_META).map(k => ({ key: k, label: NAV_META[k].label }));
function renderCmdkList(filter = "") {
  const list = document.getElementById("cmdk-list");
  const filtered = CMDK_ITEMS.filter(i => i.label.toLowerCase().includes(filter.toLowerCase()));
  list.innerHTML = filtered.map((i, idx) => `<div class="cmdk-item ${idx===0?'sel':''}" data-key="${i.key}">${ICONS[i.key]}<span>${i.label}</span></div>`).join("") || `<div class="cmdk-item">No results</div>`;
  list.querySelectorAll(".cmdk-item").forEach(el => el.addEventListener("click", () => { navigate(el.dataset.key); closeCmdk(); }));
}
function openCmdk() {
  document.getElementById("cmdk-overlay").classList.add("open");
  document.getElementById("cmdk-input").value = "";
  renderCmdkList();
  document.getElementById("cmdk-input").focus();
}
function closeCmdk() { document.getElementById("cmdk-overlay").classList.remove("open"); }

function initCmdk() {
  document.getElementById("open-cmdk").addEventListener("click", openCmdk);
  document.getElementById("cmdk-overlay").addEventListener("click", (e) => { if (e.target.id === "cmdk-overlay") closeCmdk(); });
  document.getElementById("cmdk-input").addEventListener("input", (e) => renderCmdkList(e.target.value));
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openCmdk(); }
    if (e.key === "Escape") { closeCmdk(); closeDetail(); }
  });
}

function initDetailModal() {
  document.getElementById("detail-close").addEventListener("click", closeDetail);
  document.getElementById("detail-overlay").addEventListener("click", (e) => { if (e.target.id === "detail-overlay") closeDetail(); });
}

// ---------- INIT ----------
initTheme();
buildSidebarNav();
navigate("dashboard");
initCopilot();
initCmdk();
initDetailModal();
buildNotifBell();
startHounTicker();
