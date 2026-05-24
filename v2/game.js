/**
 * Tectonic City Builder v2 — game logic.
 *
 * Phase A scope: gameplay loop with 5 scenarios, emoji buildings (sprites
 * in Phase B), text-only damage outcomes (visual damage states in Phase C),
 * no case-study integration (Phase D), no Sheet logging (Phase E).
 *
 * Rendering uses DOM construction (createElement + textContent), not
 * innerHTML — keeps everything XSS-safe by construction.
 */

// ════════════════════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════════════════════

const STARTING_BUDGET = 1500000; // $1.5M per scenario, matches v1

const state = {
  scenarioKey: null,
  grid: [],
  placements: new Map(),       // "col,row" -> { building, tech: Set<string> }
  budget: STARTING_BUDGET,
  selected: null,              // { type: 'building'|'tech', key }
  citywideEarlyWarning: false,
  lastOutcome: null,
};

// ════════════════════════════════════════════════════════════════════
// DOM HELPERS — no innerHTML anywhere
// ════════════════════════════════════════════════════════════════════

function el(tag, props, ...children) {
  const e = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (k === "class") e.className = v;
      else if (k === "style") Object.assign(e.style, v);
      else if (k === "text") e.textContent = v;
      else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
      else if (k === "title") e.title = v;
      else if (k === "id") e.id = v;
      else e.setAttribute(k, v);
    }
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    if (typeof c === "string" || typeof c === "number") e.appendChild(document.createTextNode(String(c)));
    else e.appendChild(c);
  }
  return e;
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

// ════════════════════════════════════════════════════════════════════
// SVG HELPERS — DOMParser turns trusted sprite strings into safe DOM nodes
// ════════════════════════════════════════════════════════════════════

const SVG_NS = "http://www.w3.org/2000/svg";

function svgChildrenFromString(s) {
  const wrapper = `<svg xmlns="${SVG_NS}">${s}</svg>`;
  const doc = new DOMParser().parseFromString(wrapper, "image/svg+xml");
  const root = doc.documentElement;
  if (root.getElementsByTagName("parsererror").length) {
    console.error("SVG parse error in fragment:", root.textContent);
    return [];
  }
  return Array.from(root.childNodes);
}

function appendSvgChildren(parent, svgFragmentString) {
  for (const node of svgChildrenFromString(svgFragmentString)) {
    parent.appendChild(node);
  }
}

function appendOverlay(parent, techKey) {
  const overlay = TECH_OVERLAYS[techKey];
  if (!overlay) return;
  appendSvgChildren(parent, overlay.svg);
}

function buildBuildingNode(buildingKey, techSet) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 72 64");
  svg.setAttribute("preserveAspectRatio", "xMidYMax meet");
  svg.classList.add("tile-sprite");

  // Behind layer (foundations under, lahar trench)
  for (const tk of behindLayerOrder(techSet)) appendOverlay(svg, tk);
  // Front-tile layer (tsunami wall — in front of tile but behind building base)
  for (const tk of frontTileLayerOrder(techSet)) appendOverlay(svg, tk);
  // Building body
  appendSvgChildren(svg, BUILDING_SPRITES[buildingKey]);
  // Roof — steep if ash_roof installed, else flat
  const roofKey = techSet.has("ash_roof") ? `${buildingKey}_steep` : `${buildingKey}_flat`;
  appendSvgChildren(svg, BUILDING_ROOFS[roofKey]);
  // Front layer (overlays drawn on top of building)
  for (const tk of frontLayerOrder(techSet)) appendOverlay(svg, tk);
  return svg;
}

// ════════════════════════════════════════════════════════════════════
// SCREEN MANAGEMENT
// ════════════════════════════════════════════════════════════════════

function showScreen(name) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById("screen-" + name).classList.add("active");
  window.scrollTo(0, 0);
}

// ════════════════════════════════════════════════════════════════════
// TITLE / SCENARIO PICKER
// ════════════════════════════════════════════════════════════════════

const SCENARIO_HAZARD_SUMMARY = {
  tohoku: "M9 megathrust + 30 m tsunami + reclaimed-land liquefaction",
  cascadia: "M9 megathrust + tsunami — 300+ years overdue",
  anatolian: "M7.6 strike-slip rupture + fire — fault under the city",
  merapi: "VEI 4 explosion — pyroclastic flow, lahar, ashfall",
  hawaii: "Effusive lava flows — distance is your only defense",
};

function renderScenarioPicker() {
  const container = document.getElementById("scenario-picker");
  clear(container);
  for (const [key, sc] of Object.entries(SCENARIOS)) {
    const card = el("div", { class: "scenario-card", onclick: () => selectScenario(key) },
      el("h3", { text: sc.name }),
      el("div", { class: "scenario-meta", text: sc.boundary }),
      el("div", { class: "scenario-hazards", text: SCENARIO_HAZARD_SUMMARY[key] || sc.disaster })
    );
    container.appendChild(card);
  }
}

// ════════════════════════════════════════════════════════════════════
// BRIEFING
// ════════════════════════════════════════════════════════════════════

function selectScenario(key) {
  state.scenarioKey = key;
  renderBriefing();
  showScreen("briefing");
}

function renderBriefing() {
  const sc = SCENARIOS[state.scenarioKey];
  const root = document.getElementById("briefing-content");
  clear(root);

  root.append(
    el("h2", { text: sc.name }),
    el("div", { class: "briefing-meta", text: `${sc.location} · ${sc.boundary}` }),
    el("h3", { text: "The situation" }),
    el("p", { text: sc.intro }),
    el("h3", { text: "The geology" }),
    el("p", { text: sc.geology }),
    el("h3", { text: "Today's disaster (when you click Run)" }),
    el("p", { text: sc.disaster }),
    el("h3", { text: "Zone legend" }),
    buildLegend(sc.legend),
    el("h3", { text: "Engineering tech available for this scenario" }),
    buildTechList(sc.tech_relevant),
    buildNgssFooter(sc),
    buildBriefingActions()
  );
}

function buildLegend(legendItems) {
  const wrap = el("div", { class: "legend" });
  for (const l of legendItems) {
    wrap.appendChild(el("span", { class: "legend-item" },
      el("span", { class: "legend-swatch", style: { background: l.swatch.startsWith("var(") ? l.swatch : l.swatch } }),
      l.label
    ));
  }
  // Fix swatch background — el's style assignment needs the var(--x) syntax preserved as-is
  Array.from(wrap.querySelectorAll(".legend-swatch")).forEach((sw, i) => {
    sw.style.background = legendItems[i].swatch;
  });
  return wrap;
}

function buildTechList(techKeys) {
  const wrap = el("div", { class: "tech-list" });
  for (const k of techKeys) {
    const t = TECH[k];
    wrap.appendChild(el("span", { class: "tech-chip", text: `${t.icon} ${t.name}` }));
  }
  return wrap;
}

function buildNgssFooter(sc) {
  const wrap = el("div", { class: "ngss-footer" });
  wrap.append(
    el("strong", { text: "NGSS standards this scenario exercises: " }),
    sc.ngss.join(" · "),
    el("br"),
    el("strong", { text: "3D learning emphases: " }),
    `${sc.three_d.sep.join("; ")} | ${sc.three_d.dci.join("; ")} | ${sc.three_d.ccc.join("; ")}`
  );
  return wrap;
}

function buildBriefingActions() {
  return el("div", { class: "briefing-actions" },
    el("button", { class: "btn btn-primary", onclick: startBuild, text: "Start building →" }),
    el("button", { class: "btn btn-secondary", onclick: () => showScreen("title"), text: "← Pick a different scenario" })
  );
}

// ════════════════════════════════════════════════════════════════════
// BUILD SCREEN
// ════════════════════════════════════════════════════════════════════

function startBuild() {
  const sc = SCENARIOS[state.scenarioKey];
  state.grid = sc.zoning();
  state.placements.clear();
  state.budget = STARTING_BUDGET;
  state.selected = null;
  state.citywideEarlyWarning = false;
  document.getElementById("build-title").textContent = `Build: ${sc.name}`;
  document.getElementById("build-subtitle").textContent = sc.boundary;
  renderGrid();
  renderPalette();
  updateBudgetDisplay();
  showScreen("build");
}

function renderGrid() {
  const grid = document.getElementById("grid");
  clear(grid);
  for (const tile of state.grid) {
    const t = el("div", {
      class: `tile zone-${tile.zone}${isBuildable(tile) ? "" : " unbuildable"}`,
      title: tileTooltip(tile),
      onclick: () => placeOnTile(tile.col, tile.row),
    });
    const key = `${tile.col},${tile.row}`;
    const placement = state.placements.get(key);
    if (placement) {
      t.appendChild(buildBuildingNode(placement.building, placement.tech));
      if (placement.tech.size > 0) {
        t.appendChild(el("span", { class: "tile-tech", text: `+${placement.tech.size}` }));
      }
    }
    grid.appendChild(t);
  }
  renderCitywideBadge();
}

function renderCitywideBadge() {
  const main = document.querySelector(".build-main");
  if (!main) return;
  const existing = main.querySelector(".citywide-badge");
  if (existing) existing.remove();
  if (state.citywideEarlyWarning) {
    main.appendChild(el("div", { class: "citywide-badge", text: "📡 City-wide alert active" }));
  }
}

function tileTooltip(tile) {
  const hazards = Object.entries(tile.hazards)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");
  return `${tile.zone}${hazards ? " · " + hazards : ""}`;
}

function isBuildable(tile) {
  return tile.zone !== "ocean" && tile.zone !== "volcano";
}

function renderPalette() {
  const sc = SCENARIOS[state.scenarioKey];
  const bList = document.getElementById("palette-buildings");
  clear(bList);
  for (const [key, b] of Object.entries(BUILDINGS)) {
    bList.appendChild(makePaletteItem("building", key, b));
  }
  const tList = document.getElementById("palette-tech");
  clear(tList);
  for (const key of sc.tech_relevant) {
    const t = TECH[key];
    tList.appendChild(makePaletteItem("tech", key, t));
  }
}

function makePaletteItem(type, key, item) {
  const isSelected = state.selected && state.selected.type === type && state.selected.key === key;
  const classes = ["palette-item"];
  if (item.cost > state.budget) classes.push("unaffordable");
  if (isSelected) classes.push("selected");
  const node = el("div", {
    class: classes.join(" "),
    onclick: () => selectItem(type, key),
  },
    el("span", { class: "palette-icon", text: item.icon }),
    el("span", { text: item.name }),
    el("span", { class: "palette-cost", text: `$${formatCost(item.cost)}` })
  );
  node.addEventListener("mouseenter", () => {
    setPaletteInfo(item.desc || `${item.name} — $${formatCost(item.cost)}`);
    if (type === "tech") showTechDemo(key, node);
  });
  node.addEventListener("mouseleave", () => {
    setPaletteInfo("Select a building or tech, then click a tile to place.");
    if (type === "tech") hideTechDemo();
  });
  return node;
}

function showTechDemo(techKey, sourceEl) {
  const demoSvg = TECH_DEMOS[techKey];
  const popover = document.getElementById("tech-demo-popover");
  if (!demoSvg || !popover) return;
  clear(popover);
  appendSvgChildren(popover, demoSvg);
  const rect = sourceEl.getBoundingClientRect();
  const popWidth = 200;
  const isMobile = window.innerWidth < 900;
  if (isMobile) {
    popover.style.left = `${rect.left}px`;
    popover.style.top = `${rect.bottom + 8}px`;
  } else {
    popover.style.left = `${Math.max(8, rect.left - popWidth - 8)}px`;
    popover.style.top = `${rect.top}px`;
  }
  popover.classList.add("visible");
}

function hideTechDemo() {
  const popover = document.getElementById("tech-demo-popover");
  if (popover) popover.classList.remove("visible");
}

function setPaletteInfo(text) {
  document.getElementById("palette-info").textContent = text;
}

function selectItem(type, key) {
  state.selected = { type, key };
  renderPalette();
}

function placeOnTile(col, row) {
  const tile = state.grid.find((t) => t.col === col && t.row === row);
  if (!tile) return;
  if (!state.selected) {
    setPaletteInfo("First select a building or tech from the palette.");
    return;
  }
  if (!isBuildable(tile)) {
    setPaletteInfo(`Can't build on ${tile.zone}.`);
    return;
  }
  const tileKey = `${col},${row}`;
  const placement = state.placements.get(tileKey);

  if (state.selected.type === "building") {
    if (placement) {
      setPaletteInfo("Tile already has a building. Right-click to remove (refunds 50%).");
      return;
    }
    const b = BUILDINGS[state.selected.key];
    if (b.cost > state.budget) {
      setPaletteInfo(`Not enough budget for ${b.name}.`);
      return;
    }
    state.placements.set(tileKey, { building: state.selected.key, tech: new Set() });
    state.budget -= b.cost;
  } else if (state.selected.type === "tech") {
    if (!placement) {
      setPaletteInfo("Place a building on this tile before adding tech.");
      return;
    }
    if (placement.tech.has(state.selected.key)) {
      setPaletteInfo("This tech is already installed here.");
      return;
    }
    const t = TECH[state.selected.key];
    if (t.cost > state.budget) {
      setPaletteInfo(`Not enough budget for ${t.name}.`);
      return;
    }
    placement.tech.add(state.selected.key);
    state.budget -= t.cost;
    if (state.selected.key === "early_warning") state.citywideEarlyWarning = true;
  }
  renderGrid();
  renderPalette();
  updateBudgetDisplay();
}

function updateBudgetDisplay() {
  const e = document.getElementById("budget-value");
  e.textContent = "$" + formatCost(state.budget);
  e.classList.toggle("low", state.budget < 300000 && state.budget > 0);
  e.classList.toggle("empty", state.budget <= 0);
}

function formatCost(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return String(n);
}

// ════════════════════════════════════════════════════════════════════
// RUN SIMULATION + SCORING
// ════════════════════════════════════════════════════════════════════

function runSimulation() {
  if (state.placements.size === 0) {
    setPaletteInfo("Place at least one building before running.");
    return;
  }
  const sc = SCENARIOS[state.scenarioKey];
  document.getElementById("disaster-banner").textContent = sc.disaster_banner;
  showScreen("disaster");
  setTimeout(() => {
    state.lastOutcome = computeOutcome();
    renderDebrief();
    showScreen("debrief");
  }, 2200);
}

function computeOutcome() {
  const perBuilding = [];
  let totalPopulation = 0;
  let populationSaved = 0;
  let criticalPlaced = 0;
  let criticalIntact = 0;

  for (const [tileKey, placement] of state.placements) {
    const [col, row] = tileKey.split(",").map(Number);
    const tile = state.grid.find((t) => t.col === col && t.row === row);
    const building = BUILDINGS[placement.building];
    totalPopulation += building.population;
    if (building.critical) criticalPlaced++;

    // Residual hazards after tech protections
    const residual = { ...tile.hazards };
    for (const techKey of placement.tech) {
      const t = TECH[techKey];
      for (const [hz, p] of Object.entries(t.protects || {})) {
        residual[hz] = Math.max(0, (residual[hz] || 0) - p);
      }
    }

    let damage = 0;
    for (const v of Object.values(residual)) damage += v;
    if ((residual.rupture || 0) >= 100) damage = 200;
    if ((residual.pyroclastic || 0) >= 100) damage = 200;
    if ((residual.lava || 0) >= 100) damage = 200;
    damage = Math.min(damage, 200);

    let casualtyMult = 1.0;
    if (state.citywideEarlyWarning) casualtyMult *= TECH.early_warning.casualty_multiplier;
    if (placement.tech.has("pyroclastic_shelter") && tile.zone === "pyroclastic_zone") {
      casualtyMult *= TECH.pyroclastic_shelter.casualty_multiplier_value;
    }

    let baseSurvival;
    if (damage < 30) baseSurvival = 1.0;
    else if (damage < 100) baseSurvival = 1.0 - (damage - 30) / 70;
    else baseSurvival = 0;
    const survival = 1 - (1 - baseSurvival) * casualtyMult;

    const saved = Math.round(building.population * survival);
    populationSaved += saved;

    const intact = damage < 60;
    if (building.critical && intact) criticalIntact++;

    perBuilding.push({
      tile,
      building,
      tech: Array.from(placement.tech),
      damage: Math.round(damage),
      saved,
      total: building.population,
      intact,
    });
  }

  const popPct = totalPopulation > 0 ? populationSaved / totalPopulation : 0;
  const critPct = criticalPlaced > 0 ? criticalIntact / criticalPlaced : 1;
  const spent = STARTING_BUDGET - state.budget;
  const spentPct = spent / STARTING_BUDGET;
  const costEff = 1 - Math.abs(spentPct - 0.75) * 1.2;
  const score = Math.round(
    Math.max(0, Math.min(100, popPct * 50 + critPct * 30 + Math.max(0, costEff) * 20))
  );
  const grade =
    score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";

  return { perBuilding, totalPopulation, populationSaved, criticalPlaced, criticalIntact, spent, score, grade };
}

// ════════════════════════════════════════════════════════════════════
// DEBRIEF
// ════════════════════════════════════════════════════════════════════

function renderDebrief() {
  const sc = SCENARIOS[state.scenarioKey];
  const o = state.lastOutcome;
  const root = document.getElementById("debrief-content");
  clear(root);

  const popRatio = o.populationSaved / Math.max(1, o.totalPopulation);
  const popClass = popRatio > 0.7 ? "ok" : popRatio > 0.4 ? "warn" : "bad";
  const critRatio = o.criticalIntact / Math.max(1, o.criticalPlaced);
  const critClass = critRatio > 0.7 ? "ok" : critRatio > 0.4 ? "warn" : "bad";

  root.append(
    el("h2", { text: `Debrief: ${sc.name}` }),
    el("div", { class: "debrief-meta", text: sc.disaster }),
    el("div", { class: `grade-banner grade-${o.grade}`, text: `Final grade: ${o.grade} (${o.score}/100)` }),
    buildScoreboard(o, popClass, critClass),
    buildPerBuildingSection(o),
    buildDebriefNgssSection(sc),
    buildDebriefActions()
  );
}

function buildScoreboard(o, popClass, critClass) {
  return el("div", { class: "scoreboard" },
    scoreCard("Population saved", `${o.populationSaved.toLocaleString()} / ${o.totalPopulation.toLocaleString()}`, popClass),
    scoreCard("Critical infra intact", `${o.criticalIntact} / ${o.criticalPlaced}`, critClass),
    scoreCard("Budget spent", `$${formatCost(o.spent)}`, ""),
    scoreCard("Final score", `${o.score} / 100`, "")
  );
}

function scoreCard(label, value, cls) {
  return el("div", { class: "score-card" },
    el("div", { class: "score-label", text: label }),
    el("div", { class: `score-value ${cls}`, text: value })
  );
}

function buildPerBuildingSection(o) {
  const section = el("div", { class: "debrief-section" }, el("h3", { text: "Per-building outcomes" }));
  const list = el("div", { class: "outcome-list" });
  for (const row of o.perBuilding) {
    const status = row.damage < 30 ? "Intact" : row.damage < 60 ? "Damaged" : row.damage < 100 ? "Heavily damaged" : "Destroyed";
    const statusClass = row.damage < 30 ? "ok" : row.damage < 60 ? "warn" : "bad";
    const techStr = row.tech.length > 0 ? row.tech.map((k) => TECH[k].name).join(", ") : "no upgrades";

    list.appendChild(el("div", { class: "outcome-row" },
      el("div", null,
        el("strong", { text: `${row.building.icon} ${row.building.name}` }),
        ` at (${row.tile.col + 1}, ${row.tile.row + 1})`,
        el("div", { class: "outcome-detail", text: `${row.tile.zone} · ${techStr}` })
      ),
      el("div", { style: { textAlign: "right" } },
        el("div", { style: { color: `var(--${statusClass})`, fontWeight: "600" }, text: status }),
        el("div", { class: "outcome-detail", text: `${row.saved} / ${row.total} people` })
      )
    ));
  }
  section.appendChild(list);
  return section;
}

function buildDebriefNgssSection(sc) {
  const section = el("div", { class: "debrief-section" },
    el("h3", { text: "What this run exercised" }),
    el("div", { class: "ngss-footer" },
      el("strong", { text: "NGSS standards: " }),
      sc.ngss.join(" · ")
    )
  );
  return section;
}

function buildDebriefActions() {
  return el("div", { class: "debrief-actions" },
    el("button", { class: "btn btn-primary", onclick: startBuild, text: "↺ Rebuild this scenario" }),
    el("button", { class: "btn btn-secondary", onclick: () => showScreen("title"), text: "← Pick a different scenario" })
  );
}

// ════════════════════════════════════════════════════════════════════
// BOOTSTRAP
// ════════════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  renderScenarioPicker();
  document.getElementById("run-button").addEventListener("click", runSimulation);
  document.getElementById("back-to-picker").addEventListener("click", () => showScreen("title"));

  // Right-click on tile removes placement (refunds 50%)
  document.getElementById("grid").addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const tileEl = e.target.closest(".tile");
    if (!tileEl) return;
    const idx = Array.from(tileEl.parentNode.children).indexOf(tileEl);
    if (idx < 0) return;
    const tile = state.grid[idx];
    if (!tile) return;
    const key = `${tile.col},${tile.row}`;
    const placement = state.placements.get(key);
    if (!placement) return;
    let refund = BUILDINGS[placement.building].cost * 0.5;
    for (const techKey of placement.tech) refund += TECH[techKey].cost * 0.5;
    state.budget += Math.round(refund);
    if (placement.tech.has("early_warning")) {
      let stillCitywide = false;
      for (const [k, p] of state.placements) {
        if (k === key) continue;
        if (p.tech.has("early_warning")) { stillCitywide = true; break; }
      }
      state.citywideEarlyWarning = stillCitywide;
    }
    state.placements.delete(key);
    renderGrid();
    renderPalette();
    updateBudgetDisplay();
  });
});
