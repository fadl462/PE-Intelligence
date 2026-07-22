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
  activeChartInstances.forEach(c => c.destroy());
  activeChartInstances = [];
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerHTML = `<span class="dot-anim"></span> ${msg}`;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

// ---------- SIDEBAR NAV BUILD ----------
function buildSidebarNav() {
  document.querySelectorAll(".nav-item").forEach(el => {
    const key = el.dataset.view;
    const meta = NAV_META[key];
    el.innerHTML = `${ICONS[key]}<span>${meta.label}</span>`;
    el.addEventListener("click", () => navigate(key));
  });
  const strip = document.getElementById("sec-strip");
  strip.innerHTML = SECURITY_BADGES.slice(0, 4).map(b => `<span class="sec-pill">${b}</span>`).join("");
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
      <div class="view-desc">Your AI has analyzed 3 new investment opportunities overnight across 684 documents.</div>
    </div>

    <div class="section-label">Engine Status</div>
    <div class="engine-row" style="margin-bottom:22px;">
      ${ENGINES.map(e => `<div class="engine-chip"><span class="led"></span>${e}</div>`).join("")}
    </div>

    <div class="section-label">Today's Activity</div>
    <div class="grid grid-6" style="margin-bottom:24px;">
      ${ACTIVITY.map(a => `
        <div class="card stat-card">
          <div class="stat-label">${a.label}</div>
          <div class="stat-value">${a.value}</div>
          <div class="stat-delta up">${a.delta}</div>
        </div>`).join("")}
    </div>

    <div class="section-label">Priority Deals</div>
    <div class="grid grid-3">
      ${DEALS.map(d => `
        <div class="deal-card" onclick="navigate('deals')">
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
          ${d.reasons.length ? `<ul class="deal-reasons">${d.reasons.map(r => `<li>${r}</li>`).join("")}</ul>` : `<div class="deal-reasons">Confidence: ${d.confidence}% · AI recommends proceeding to term sheet.</div>`}
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
    data: { labels: days, datasets: [{ data, borderColor:"#2FDFA0", backgroundColor:"rgba(47,223,160,.08)", fill:true, tension:.4, pointRadius:0, borderWidth:2 }]},
    options: { plugins:{legend:{display:false}}, scales:{ x:{grid:{display:false}}, y:{grid:{color:"#1A212C"}} } }
  }));
};

// ---------- DEALS / DATA ROOM ----------
function renderDeals() {
  return `
    <div class="view-header">
      <div class="view-title">Deals &amp; Data Rooms</div>
      <div class="view-desc">Upload a data room and the Due Diligence Engine takes it from there.</div>
    </div>

    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Upload Data Room — GreenTech Solar</div>
        <div style="border:1.5px dashed var(--border); border-radius:12px; padding:30px; text-align:center; color:var(--text-dim);">
          ${ICONS.upload}
          <div style="margin-top:10px; font-size:13px;">Drag files here, or connect a source</div>
          <div class="btn-row" style="justify-content:center; margin-top:16px;">
            <button class="btn ghost">Zip Upload</button>
            <button class="btn ghost">Dropbox</button>
            <button class="btn ghost">Google Drive</button>
            <button class="btn ghost">OneDrive</button>
            <button class="btn ghost">Virtual Data Room</button>
          </div>
          <div class="btn-row" style="justify-content:center; margin-top:18px;">
            <button class="btn primary" id="simulate-upload-btn">Simulate Upload</button>
          </div>
        </div>

        <div id="upload-progress-wrap" style="margin-top:20px; display:none;">
          <div style="font-size:12px; color:var(--text-dim); margin-bottom:14px;"><span id="files-found" class="mono"></span> found — organizing by category…</div>
          <div id="progress-rows"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span class="dot"></span>AI Reads</div>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          ${["Financial statements","Contracts","Shareholder agreements","Tax records","Customer contracts","Cap tables","HR files","ESG reports","Legal documents","Intellectual property","Board minutes","Revenue schedules","Financial forecasts"].map(t=>`<span class="pill gray">${t}</span>`).join("")}
        </div>
      </div>
    </div>

    <div class="section-label">Document Checklist — AI Due Diligence Engine</div>
    <div class="card">
      <div style="font-size:12px; color:var(--text-dim); margin-bottom:14px;">The AI automatically performs 200+ checks across the data room. Click a flagged item for the AI's reasoning.</div>
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
      <div class="check-row" ${c.explain ? `onclick="toggleExplain(${i})"` : ""}>
        <div class="check-left">
          <div class="check-icon ${c.status}">${iconMap[c.status]}</div>
          <div class="check-name">${c.name}</div>
        </div>
        <div class="pill ${pillMap[c.status]}">${c.note}</div>
      </div>
      ${c.explain ? `
        <div class="check-explain" id="explain-${i}">
          <b>Potential issue:</b> ${c.explain}<br><br>
          <b>Recommendation:</b> ${c.recommendation}<br><br>
          <b>Risk Impact:</b> ${c.severity}
        </div>` : ""}
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
    const wrap = document.getElementById("upload-progress-wrap");
    wrap.style.display = "block";
    document.getElementById("files-found").textContent = "387 files";
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
    showToast("Data room organized — 387 files classified in 11 seconds.");
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
      <div class="view-desc">The AI builds a full 3-statement model and LBO structure automatically — every slider updates the return profile live.</div>
    </div>
    <div class="tabs">
      <div class="tab ${modelTab==='three-statement'?'active':''}" onclick="setModelTab('three-statement')">Three-Statement Model</div>
      <div class="tab ${modelTab==='lbo'?'active':''}" onclick="setModelTab('lbo')">LBO Model Builder</div>
      <div class="tab ${modelTab==='stress'?'active':''}" onclick="setModelTab('stress')">Stress Test &amp; Monte Carlo</div>
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
  return `
    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Income Statement (FY24 – FY27E)</div>
        <table>
          <thead><tr><th>Line Item</th>${THREE_STATEMENT.years.map(y=>`<th>${y}</th>`).join("")}</tr></thead>
          <tbody>${THREE_STATEMENT.income.map(row => `<tr><td>${row[0]}</td><td class="mono">${row[1]}</td><td class="mono">${row[2]}</td><td class="mono">${row[3]}</td><td class="mono">${row[4]}</td></tr>`).join("")}</tbody>
        </table>
        <div class="section-label">Balance Sheet</div>
        <table>
          <tbody>${THREE_STATEMENT.balance.map(row => `<tr><td>${row[0]}</td><td class="mono">${row[1]}</td><td class="mono">${row[2]}</td><td class="mono">${row[3]}</td><td class="mono">${row[4]}</td></tr>`).join("")}</tbody>
        </table>
        <div class="section-label">Cash Flow</div>
        <table>
          <tbody>${THREE_STATEMENT.cashflow.map(row => `<tr><td>${row[0]}</td><td class="mono">${row[1]}</td><td class="mono">${row[2]}</td><td class="mono">${row[3]}</td><td class="mono">${row[4]}</td></tr>`).join("")}</tbody>
        </table>
      </div>

      <div>
        <div class="card" style="margin-bottom:14px;">
          <div class="card-title"><span class="dot"></span>Scenario</div>
          <div class="scenario-row">
            ${["base","upside","downside","stress"].map(s=>`<div class="scenario-btn ${scenario===s?'active':''}" onclick="setScenario('${s}')">${s}</div>`).join("")}
          </div>
          ${renderSliders()}
        </div>
        <div class="card">
          <div class="card-title"><span class="dot"></span>Live Outputs</div>
          <div class="grid grid-2">
            <div class="stat-card card tight"><div class="stat-label">IRR</div><div class="stat-value" id="out-irr" style="color:var(--emerald)">${out.irr}%</div></div>
            <div class="stat-card card tight"><div class="stat-label">MOIC</div><div class="stat-value" id="out-moic">${out.moic}x</div></div>
            <div class="stat-card card tight"><div class="stat-label">NPV</div><div class="stat-value" id="out-npv">$${out.npv}M</div></div>
            <div class="stat-card card tight"><div class="stat-label">EBITDA Margin</div><div class="stat-value" id="out-margin">${out.ebitdaMargin}%</div></div>
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
      <div class="slider-label">Revenue Growth <b id="lbl-growth">${sliderState.growth}%</b></div>
      <input type="range" min="0" max="35" value="${sliderState.growth}" id="s-growth">
    </div>
    <div class="slider-group">
      <div class="slider-label">Exit Multiple <b id="lbl-exit">${sliderState.exit}x</b></div>
      <input type="range" min="4" max="18" value="${sliderState.exit}" id="s-exit">
    </div>
    <div class="slider-group">
      <div class="slider-label">Interest Rate <b id="lbl-rate">${sliderState.rate}%</b></div>
      <input type="range" min="2" max="14" value="${sliderState.rate}" id="s-rate">
    </div>
    <div class="slider-group">
      <div class="slider-label">Inflation <b id="lbl-inflation">${sliderState.inflation}%</b></div>
      <input type="range" min="0" max="12" value="${sliderState.inflation}" id="s-inflation">
    </div>
    <div class="slider-group">
      <div class="slider-label">Exit Year <b id="lbl-exitYear">${sliderState.exitYear}</b></div>
      <input type="range" min="2028" max="2035" value="${sliderState.exitYear}" id="s-exitYear">
    </div>
  `;
}

function setScenario(s) {
  scenario = s;
  sliderState = { ...SCENARIO_PRESETS[s] };
  renderModelTabContent();
  drawCashflowChart();
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
      // de-select scenario buttons since it's now custom
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
      { label:"Operating Cash Flow", data: base, backgroundColor:"#2FDFA0", borderRadius:4 },
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
          <div class="stat-card card tight"><div class="stat-label">Entry Leverage</div><div class="stat-value">3.2x</div></div>
          <div class="stat-card card tight"><div class="stat-label">Exit Leverage</div><div class="stat-value">1.1x</div></div>
          <div class="stat-card card tight"><div class="stat-label">5-Yr IRR</div><div class="stat-value" style="color:var(--emerald)">31%</div></div>
          <div class="stat-card card tight"><div class="stat-label">MOIC</div><div class="stat-value">3.8x</div></div>
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
      data: { labels:["Senior Debt","Sponsor Equity","Seller Note"], datasets:[{ data:[7.2,5.4,1.0], backgroundColor:["#2FDFA0","#5B8DEF","#F0A93F"], borderWidth:0 }]},
      options:{ plugins:{legend:{position:"bottom",labels:{color:"#8C97A8",boxWidth:10,font:{size:10}}}} }
    }));
  }
  const debt = document.getElementById("chart-debt");
  if (debt) {
    activeChartInstances.push(new Chart(debt, {
      type: "line",
      data: { labels:["Y0","Y1","Y2","Y3","Y4","Y5"], datasets:[{ data:[7.2,6.1,4.8,3.4,2.0,0.8], borderColor:"#F0A93F", backgroundColor:"rgba(240,169,63,.08)", fill:true, tension:.35, pointRadius:0, borderWidth:2 }]},
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
      <div class="card stat-card"><div class="stat-label">P10 IRR</div><div class="stat-value" style="color:var(--red)">6.2%</div></div>
      <div class="card stat-card"><div class="stat-label">P50 IRR</div><div class="stat-value">22.4%</div></div>
      <div class="card stat-card"><div class="stat-label">P90 IRR</div><div class="stat-value" style="color:var(--emerald)">38.1%</div></div>
      <div class="card stat-card"><div class="stat-label">Probability of Loss</div><div class="stat-value">4.8%</div></div>
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
    data:{ labels:buckets, datasets:[{ data:freq, backgroundColor:"#5B8DEF", borderRadius:4 }]},
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
        <div class="card-title"><span class="dot"></span>Contracts — GreenTech Solar Data Room</div>
        <table>
          <thead><tr><th>Contract</th><th>Parties</th><th>Risk</th><th>Flags</th></tr></thead>
          <tbody>
            ${CONTRACTS.map((c,i)=>`
              <tr class="clickable" onclick="selectContract(${i})" style="${i===selectedContract?'background:var(--bg-2)':''}">
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
        <div class="section-label">Clause Risk Breakdown</div>
        ${CONTRACT_DETAIL.clauses.map(cl=>`
          <div class="check-row" style="cursor:default;">
            <div class="check-name" style="font-weight:500;">${cl.name}</div>
            <span class="pill ${cl.risk==='high'?'red':cl.risk==='medium'?'amber':'green'}">${cl.risk}</span>
          </div>`).join("")}
        <div class="section-label">AI Alert</div>
        <div class="alert-box">
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
      <div class="view-desc">The AI cross-references live data across research providers, filings, and news to size the opportunity.</div>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <div class="card-title"><span class="dot"></span>Connected Sources</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">${MARKET.sources.map(s=>`<span class="pill gray">${s}</span>`).join("")}</div>
    </div>

    <div class="grid grid-4" style="margin-bottom:16px;">
      <div class="card stat-card"><div class="stat-label">TAM</div><div class="stat-value">${MARKET.tam}</div></div>
      <div class="card stat-card"><div class="stat-label">SAM</div><div class="stat-value">${MARKET.sam}</div></div>
      <div class="card stat-card"><div class="stat-label">SOM</div><div class="stat-value">${MARKET.som}</div></div>
      <div class="card stat-card"><div class="stat-label">Industry CAGR</div><div class="stat-value" style="color:var(--emerald)">${MARKET.cagr}</div></div>
    </div>

    <div class="two-col" style="margin-bottom:16px;">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Competitive Landscape — Market Share</div>
        <div class="chart-box"><canvas id="chart-competitors"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Management Team — CEO Assessment</div>
        <div style="font-weight:700; font-size:14px;">${MARKET.ceo.name}</div>
        <div style="font-size:12px; color:var(--text-dim); margin-bottom:12px;">${MARKET.ceo.background}</div>
        <div class="grid grid-2">
          <div class="stat-card card tight"><div class="stat-label">Successful Exit</div><div class="stat-value" style="font-size:16px; color:var(--emerald)">${MARKET.ceo.exit}</div></div>
          <div class="stat-card card tight"><div class="stat-label">Prior Bankruptcy</div><div class="stat-value" style="font-size:16px;">${MARKET.ceo.bankruptcy}</div></div>
          <div class="stat-card card tight"><div class="stat-label">Reputation Score</div><div class="stat-value" style="font-size:16px;">${MARKET.ceo.reputation}</div></div>
          <div class="stat-card card tight"><div class="stat-label">Execution Score</div><div class="stat-value" style="font-size:16px;">${MARKET.ceo.execution}</div></div>
        </div>
        <div class="pill green" style="margin-top:12px;">Leadership Risk: ${MARKET.ceo.leadershipRisk}</div>
      </div>
    </div>

    <div class="two-col" style="margin-bottom:16px;">
      <div class="card">
        <div class="card-title"><span class="dot"></span>SWOT</div>
        <div class="grid grid-2">
          <div class="card tight"><div class="stat-label" style="color:var(--emerald)">Strengths</div><ul class="deal-reasons" style="margin-top:8px;">${MARKET.swot.strengths.map(s=>`<li>${s}</li>`).join("")}</ul></div>
          <div class="card tight"><div class="stat-label" style="color:var(--red)">Weaknesses</div><ul class="deal-reasons" style="margin-top:8px;">${MARKET.swot.weaknesses.map(s=>`<li>${s}</li>`).join("")}</ul></div>
          <div class="card tight"><div class="stat-label" style="color:var(--blue)">Opportunities</div><ul class="deal-reasons" style="margin-top:8px;">${MARKET.swot.opportunities.map(s=>`<li>${s}</li>`).join("")}</ul></div>
          <div class="card tight"><div class="stat-label" style="color:var(--amber)">Threats</div><ul class="deal-reasons" style="margin-top:8px;">${MARKET.swot.threats.map(s=>`<li>${s}</li>`).join("")}</ul></div>
        </div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Comparable Transactions</div>
        <table>
          <thead><tr><th>Company / Round</th><th>EV</th><th>Multiple</th></tr></thead>
          <tbody>${MARKET.comps.map(c=>`<tr><td>${c.name}</td><td class="mono">${c.ev}</td><td class="mono">${c.multiple}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    </div>
  `;
}
afterRenderHooks.market = () => {
  const ctx = document.getElementById("chart-competitors");
  activeChartInstances.push(new Chart(ctx, {
    type:"doughnut",
    data:{ labels: MARKET.competitors.map(c=>c.name), datasets:[{ data: MARKET.competitors.map(c=>c.share), backgroundColor:["#2FDFA0","#5B8DEF","#F0A93F","#2A3140"], borderWidth:0 }]},
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
      <div class="card" style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <div class="stat-label">Overall Investment Score</div>
        <div class="mono" style="font-size:52px; font-weight:800; color:var(--emerald); margin:10px 0;">87<span style="font-size:22px; color:var(--text-faint);">/100</span></div>
        <div class="pill green">Recommendation: Invest</div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Category Radar</div>
        <div class="chart-box"><canvas id="chart-radar"></canvas></div>
      </div>
    </div>

    <div class="section-label">Risk Category Scorecard</div>
    <div class="grid grid-4" style="margin-bottom:20px;">
      ${RISK_CATEGORIES.map(r => `
        <div class="card tight">
          <div class="stat-label">${r.name}</div>
          <div style="display:flex; align-items:center; gap:10px; margin-top:8px;">
            <div class="progress-track" style="flex:1;"><div class="progress-fill" style="width:${r.score}%; background:${r.score>=85?'linear-gradient(90deg,#2FDFA0,#1a9c74)':r.score>=75?'linear-gradient(90deg,#F0A93F,#c98527)':'linear-gradient(90deg,#F0565C,#c23b41)'}"></div></div>
            <div class="mono" style="font-size:12px; width:28px; text-align:right;">${r.score}</div>
          </div>
        </div>`).join("")}
    </div>

    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Risk Heat Map</div>
        <div class="heat-row"><div class="heat-label" style="color:var(--emerald)">LOW</div><div class="heat-bar">${Array(10).fill(`<div class="heat-blip" style="background:var(--emerald)"></div>`).join("")}</div></div>
        <div class="heat-row"><div class="heat-label" style="color:var(--amber)">MEDIUM</div><div class="heat-bar">${Array(4).fill(`<div class="heat-blip" style="background:var(--amber)"></div>`).join("")}</div></div>
        <div class="heat-row"><div class="heat-label" style="color:var(--red)">HIGH</div><div class="heat-bar">${Array(1).fill(`<div class="heat-blip" style="background:var(--red)"></div>`).join("")}</div></div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>ESG Engine</div>
        <div class="grid grid-4" style="margin-bottom:14px;">
          <div class="stat-card card tight"><div class="stat-label">Environmental</div><div class="stat-value" style="font-size:18px;">${ESG.environmental}</div></div>
          <div class="stat-card card tight"><div class="stat-label">Social</div><div class="stat-value" style="font-size:18px;">${ESG.social}</div></div>
          <div class="stat-card card tight"><div class="stat-label">Governance</div><div class="stat-value" style="font-size:18px;">${ESG.governance}</div></div>
          <div class="stat-card card tight"><div class="stat-label">Overall</div><div class="stat-value" style="font-size:18px; color:var(--emerald)">${ESG.overall}</div></div>
        </div>
        ${ESG.flags.map(f=>`<div class="check-row" style="cursor:default;"><div class="check-name" style="font-weight:500;">${f.name}</div><span class="pill ${f.status==='Positive'?'green':'amber'}">${f.status}</span></div>`).join("")}
      </div>
    </div>
  `;
}
afterRenderHooks.risk = () => {
  const ctx = document.getElementById("chart-radar");
  activeChartInstances.push(new Chart(ctx, {
    type:"radar",
    data:{ labels: RISK_CATEGORIES.map(r=>r.name), datasets:[{ data: RISK_CATEGORIES.map(r=>r.score), backgroundColor:"rgba(47,223,160,.15)", borderColor:"#2FDFA0", pointBackgroundColor:"#2FDFA0", borderWidth:2 }]},
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
        ${MEMO_SECTIONS.map(s=>`<div class="check-row" style="cursor:default;"><div class="check-name" style="font-weight:500;">${s}</div><span class="pill green">Drafted</span></div>`).join("")}
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
            <button class="btn" onclick="simulateExport('PowerPoint')">${ICONS.download} PowerPoint</button>
            <button class="btn" onclick="simulateExport('PDF')">${ICONS.download} PDF</button>
            <button class="btn" onclick="simulateExport('Word')">${ICONS.download} Word</button>
          </div>
        </div>
      </div>
    </div>

    <div class="section-label">Committee Deck</div>
    <div class="card">
      <div class="deck-strip">
        ${IC_SLIDES.map((s,i)=>`<div class="deck-thumb"><b>${String(i+1).padStart(2,'0')}</b>${s}</div>`).join("")}
      </div>
    </div>
  `;
}
function simulateExport(kind) {
  showToast(`Generating ${kind} export of the GreenTech Solar IC memo…`);
  setTimeout(()=> showToast(`${kind} export ready — this is a prototype, so downloads aren't wired up yet.`), 1800);
}

// ---------- PORTFOLIO ----------
function renderPortfolio() {
  return `
    <div class="view-header">
      <div class="view-title">Portfolio Management</div>
      <div class="view-desc">Once invested, the AI keeps every position current — board cadence, covenants, and exit readiness.</div>
    </div>
    <div class="grid grid-6" style="margin-bottom:18px;">
      ${FUND_STATS.map(s=>`<div class="card stat-card"><div class="stat-label">${s.label}</div><div class="stat-value">${s.value}</div></div>`).join("")}
    </div>
    <div class="two-col" style="margin-bottom:16px;">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Portfolio Companies</div>
        <table>
          <thead><tr><th>Company</th><th>Stage</th><th>IRR</th><th>MOIC</th><th>Status</th></tr></thead>
          <tbody>${PORTFOLIO_COMPANIES.map(p=>`
            <tr>
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
        ${["Investment","Board Meetings","Quarterly Results","Covenants","Exit Readiness"].map((s,i,arr)=>`
          <div class="step ${i>2?'pending':''}">
            ${i<arr.length-1?'<div class="step-line"></div>':''}
            <div class="step-dot"></div>
            <div class="step-label">${s}</div>
          </div>`).join("")}
      </div>
    </div>
  `;
}
afterRenderHooks.portfolio = () => {
  const ctx = document.getElementById("chart-fundgrowth");
  activeChartInstances.push(new Chart(ctx, {
    type:"line",
    data:{ labels:["2021","2022","2023","2024","2025","2026"], datasets:[{ data:[120,148,172,198,222,245], borderColor:"#2FDFA0", backgroundColor:"rgba(47,223,160,.08)", fill:true, tension:.35, pointRadius:0, borderWidth:2 }]},
    options:{ plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}}, y:{grid:{color:"#1A212C"}}} }
  }));
};

// ---------- FUND ADMINISTRATION ----------
function renderFundAdmin() {
  return `
    <div class="view-header">
      <div class="view-title">Fund Administration</div>
      <div class="view-desc">The AI assists with the operational backbone of the fund alongside due diligence.</div>
    </div>
    <div class="grid grid-4" style="margin-bottom:16px;">
      <div class="card stat-card"><div class="stat-label">Capital Calls (YTD)</div><div class="stat-value">$18.2M</div></div>
      <div class="card stat-card"><div class="stat-label">Distributions (YTD)</div><div class="stat-value">$9.6M</div></div>
      <div class="card stat-card"><div class="stat-label">NAV</div><div class="stat-value">$245M</div></div>
      <div class="card stat-card"><div class="stat-label">Fund Expenses (QTD)</div><div class="stat-value">$410K</div></div>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Investor Registry</div>
        <table>
          <thead><tr><th>LP</th><th>Commitment</th><th>Called</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Sahara Capital Partners</td><td class="mono">$40M</td><td class="mono">$28M</td><td><span class="pill green">Current</span></td></tr>
            <tr><td>West Africa Pension Trust</td><td class="mono">$65M</td><td class="mono">$47M</td><td><span class="pill green">Current</span></td></tr>
            <tr><td>Meridian Family Office</td><td class="mono">$20M</td><td class="mono">$16M</td><td><span class="pill amber">Call Pending</span></td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Compliance</div>
        ${COMPLIANCE.map(c=>`<div class="check-row" style="cursor:default;"><div class="check-name" style="font-weight:500;">${c.name}</div><span class="pill green">${c.status}</span></div>`).join("")}
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
        <div class="card-title"><span class="dot"></span>Quarterly Letters</div>
        ${["Q2 2026 Letter","Q1 2026 Letter","Q4 2025 Letter"].map(l=>`<div class="check-row" style="cursor:default;"><div class="check-name" style="font-weight:500;">${l}</div><span class="pill gray">PDF</span></div>`).join("")}
        <div class="section-label">Portfolio Updates</div>
        <div style="font-size:12.5px; color:var(--text-dim); line-height:1.7;">"This quarter, the fund deployed $12M into GreenTech Solar following a full AI-assisted due diligence cycle completed in 11 minutes of review time..."</div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Distribution History</div>
        <table>
          <thead><tr><th>Date</th><th>Type</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Jun 2026</td><td>Return of Capital</td><td class="mono">$3.1M</td></tr>
            <tr><td>Mar 2026</td><td>Realized Gain</td><td class="mono">$4.2M</td></tr>
            <tr><td>Dec 2025</td><td>Return of Capital</td><td class="mono">$2.3M</td></tr>
          </tbody>
        </table>
        <div class="section-label">Tax Documents</div>
        <div class="check-row" style="cursor:default;"><div class="check-name" style="font-weight:500;">Schedule K-1 — FY2025</div><span class="pill gray">Ready</span></div>
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
      <div class="card-title"><span class="dot"></span>Security &amp; Compliance</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">${SECURITY_BADGES.map(b=>`<span class="pill gray">${b}</span>`).join("")}</div>
    </div>
    <div class="grid grid-2">
      <div class="card">
        <div class="card-title"><span class="dot"></span>Deployment</div>
        <div class="check-row" style="cursor:default;"><div class="check-name" style="font-weight:500;">Private LLM Deployment</div><span class="pill green">Enabled</span></div>
        <div class="check-row" style="cursor:default;"><div class="check-name" style="font-weight:500;">Offline Deployment Option</div><span class="pill gray">Available</span></div>
      </div>
      <div class="card">
        <div class="card-title"><span class="dot"></span>Access</div>
        <div class="check-row" style="cursor:default;"><div class="check-name" style="font-weight:500;">Role-Based Permissions</div><span class="pill green">Configured</span></div>
        <div class="check-row" style="cursor:default;"><div class="check-name" style="font-weight:500;">Audit Log Retention</div><span class="pill green">7 years</span></div>
      </div>
    </div>
  `;
}

// ---------- AI COPILOT ----------
function renderCopilotQuick() {
  const wrap = document.getElementById("copilot-quick");
  wrap.innerHTML = Object.keys(COPILOT_RESPONSES).map(q => `<button class="quick-btn" onclick="askCopilot(${JSON.stringify(q)})">${q}</button>`).join("");
}
function pushMsg(role, text) {
  const body = document.getElementById("copilot-body");
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}
function askCopilot(q) {
  pushMsg("user", q);
  setTimeout(() => {
    pushMsg("ai", COPILOT_RESPONSES[q] || "I've noted that — in the full deployment, I'd pull the relevant documents and data room context to answer precisely. For this prototype, try one of the suggested prompts below.");
  }, 500);
}
function initCopilot() {
  renderCopilotQuick();
  pushMsg("ai", "Hi David — I've finished reviewing the GreenTech Solar data room. Overall score: 87/100, recommendation: Invest. Ask me anything, or tap a suggestion below.");
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

// ---------- COMMAND PALETTE ----------
const CMDK_ITEMS = Object.keys(NAV_META).map(k => ({ key: k, label: NAV_META[k].label }));
let cmdkSel = 0;
function renderCmdkList(filter = "") {
  const list = document.getElementById("cmdk-list");
  const filtered = CMDK_ITEMS.filter(i => i.label.toLowerCase().includes(filter.toLowerCase()));
  cmdkSel = 0;
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
    if (e.key === "Escape") closeCmdk();
  });
}

// ---------- INIT ----------
buildSidebarNav();
navigate("dashboard");
initCopilot();
initCmdk();
