# Tectonic City Builder — v2 Project Brief

> **Purpose of this document:** Hand-off brief for building v2 of the Tectonic City Builder in Claude Code. v1 is a working single-file HTML prototype (`tectonic-city-builder.html` in this folder). v2 expands scenarios, adds visual upgrades and damage representation, integrates historical case studies, and persists student progress to Google Sheets via a Google Apps Script (GAS) backend.

---

## 1. Context

**Audience:** Grade 9-12 Earth & Environmental Science students at AISC Chennai (American International School Chennai). Multi-day project unit on plate tectonics.

**Why this exists:** Plate boundary types (convergent / divergent / transform / hotspot) are abstract on paper. Students memorize "subduction zones cause megathrust earthquakes" without confronting why that matters for the cities sitting above them. This game forces students to make real engineering trade-offs against real geology, then shows them — visually and with historical evidence — what happened the last time humans got this wrong.

**Learning objectives (carried over from v1):**
1. Identify plate boundary types and their characteristic hazards
2. Match engineering technologies to specific hazards (and recognize when tech *doesn't* help)
3. Reason about cost / benefit / risk trade-offs under a fixed budget
4. Predict where and how disasters will occur based on tectonic setting

**New in v2:** Historical evidence layer. Students see real photos / accounts of what happened in Tōhoku, Kobe, Pompeii, Pinatubo, Sumatra, etc. — so their engineering choices are anchored in documented disasters, not abstractions.

---

## 1a. NGSS Standards Alignment

This game is engineered to be a **three-dimensional learning experience** in the NGSS sense — it integrates a Disciplinary Core Idea (plate tectonics + natural hazards) with Science & Engineering Practices (modeling, designing solutions, arguing from evidence) and Crosscutting Concepts (cause/effect, systems, stability/change). The standards below should be cited in the briefing screen of each scenario and in the teacher-facing case study notes.

### Primary standards addressed

| Code | Standard | How the game hits it |
|------|----------|---------------------|
| **HS-ESS2-1** | Develop a model to illustrate how Earth's internal and surface processes operate at different spatial and temporal scales to form continental and ocean-floor features. | Each scenario is a model of a plate boundary process operating across geologic and human timescales. |
| **HS-ESS3-1** | Construct an explanation based on evidence for how the availability of natural resources, occurrence of natural hazards, and changes in climate have influenced human activity. | The case studies provide the evidence; the engineering decisions force students to construct explanations of how hazards shape human settlement. |
| **HS-ETS1-3** | Evaluate a solution to a complex real-world problem based on prioritized criteria and trade-offs that include a range of considerations. | Budget vs. safety vs. critical infrastructure trade-offs are the core game loop. |
| **HS-ETS1-4** | Use a computer simulation to model the impact of proposed solutions to a complex real-world problem with numerous criteria and constraints on interactions within and between systems relevant to the problem. | The game *is* the computational simulation called for in this standard. |

### Secondary standards reinforced

| Code | Standard | How |
|------|----------|------|
| HS-ETS1-1 | Analyze a major global challenge to specify qualitative and quantitative criteria and constraints. | Briefing screens define the challenge; budget defines the constraint. |
| HS-ETS1-2 | Design a solution by breaking it down into smaller problems. | Per-tile and per-building decisions decompose the city-planning problem. |
| HS-ESS3-3 | Create a computational simulation to illustrate relationships among resource management, population sustainability, and biodiversity. | Population saved score connects engineering choices to human survival. |

### Three-Dimensional Learning components

- **Science & Engineering Practices (SEPs):** Developing and Using Models; Constructing Explanations and Designing Solutions; Engaging in Argument from Evidence; Using Mathematics and Computational Thinking
- **Disciplinary Core Ideas (DCIs):** ESS2.B (Plate Tectonics and Large-Scale System Interactions); ESS3.B (Natural Hazards); ETS1.B (Developing Possible Solutions)
- **Crosscutting Concepts (CCCs):** Cause and Effect; Systems and System Models; Stability and Change

### Where standards surface in the UI

- **Briefing screen:** Footer of each scenario displays the 2-3 primary standards addressed
- **Debrief screen:** A small "Standards practiced" chip row at the bottom of the score breakdown
- **Teacher dashboard:** Standards-by-scenario coverage matrix
- **Case Study Library:** Each case study tagged with which standards it supports

---

## 1b. Curricular Placement (Earth & Environmental Science)

The natural NGSS-aligned HS Earth & Env scope-and-sequence runs roughly: (1) Earth in the Universe → (2) Earth's Interior & Plate Tectonics → (3) Surface Processes → (4) Atmosphere & Climate → (5) Hydrosphere → (6) Biosphere & Ecology → (7) Human Impact & Sustainability.

**This game has TWO natural homes — and it's strongest when used in BOTH:**

### Primary home: Unit on Plate Tectonics & Earth's Interior (early in year)

Used as the **introduction-to-application** for plate tectonics. Students have just learned the boundary types and the mantle/crust mechanics — the game gives them an immediate "so what?" by forcing them to act on the consequences. The Tōhoku, Anatolian, and Merapi scenarios each correspond to a boundary type they've just studied. The focus here is on:
- Identifying which hazards come from which boundary type (HS-ESS2-1)
- Building intuition that "same plate boundary = same hazard family across the world"
- Letting students fail safely and see *why* boundaries matter

**Recommended use:** 2-3 class periods late in the unit. First period: structured intro + Tōhoku scenario. Second period: students choose Anatolian or Merapi. Third period: comparison + debrief discussion.

### Secondary home: Unit on Human Impact & Natural Hazards (later in year)

Returned to as the **engineering-design capstone**. By this point students have studied human impact across multiple Earth systems. The game shifts in emphasis from "understand the geology" to "design under constraint" — leaning hard on HS-ETS1-3 and HS-ETS1-4. The case studies become primary readings, not optional sidebars. Students iterate on the same scenario multiple times, with the Sheet logging their improvement. The focus here is on:
- Engineering design under multiple constraints (HS-ETS1-3)
- Computer simulation as a design tool (HS-ETS1-4)
- Evidence-based explanation of hazard / human-activity interaction (HS-ESS3-1)

**Recommended use:** 1-2 week mini-project. See end assessment below.

### Bridge units it touches

The game also has spillover into:
- **Surface Processes unit** — lahars, liquefaction, and pyroclastic flows are surface processes
- **Climate unit** — extreme tsunami inundation and sea-level rise interact (potential v2.1 expansion)

---

## 1c. End Assessment Design

Three assessment options below — listed in order of recommendation. The Google Sheets backend (§8) is essential for #1 to work.

### Option A (RECOMMENDED): Engineering Design Portfolio + Final Defense

**Format:** Two-week mini-project, ~6 class periods. Anchored in HS-ETS1-3 and HS-ETS1-4.

**Workflow:**
1. **Period 1 — Choose a city.** Each student picks a real city facing a tectonic hazard (from a curated list: Tokyo, Istanbul, Yogyakarta, Manila, Kathmandu, Anchorage, Lima, Wellington, etc.). They research and write a 1-page hazard profile.
2. **Periods 2-4 — Iterate in the game.** Students play the matching scenario at least 3 times. Each attempt logs to the Sheet. They keep an "engineering journal" documenting one major decision change per iteration and predicting its effect before running the simulation.
3. **Period 5 — Comparative analysis.** Students pull up another classmate's attempts at a *different* scenario and write a comparative reflection: why does the same building+tech yield different outcomes across boundary types?
4. **Period 6 — Final defense.** Each student presents their best city design as a 5-minute pitch, defending three engineering decisions with reference to (a) the relevant plate-boundary science and (b) at least one historical case study.

**Deliverables logged in Sheet automatically:**
- ≥3 game attempts with placement JSON, score, grade
- Iteration journal (free-text reflections from each attempt's reflection prompt)

**Deliverables submitted separately:**
- City hazard profile (1 page)
- Comparative reflection (1 page)
- Final defense slides (≤5 slides)

**Rubric dimensions (4-point each, 16 total):**
1. **Science accuracy:** Did the student correctly identify the boundary type, hazards, and tech needs?
2. **Engineering reasoning:** Are decisions justified with cost/benefit logic, not just "I bought everything"?
3. **Iteration evidence:** Did attempts show measurable learning (score growth, smarter placements over time)?
4. **Historical synthesis:** Does the defense reference real case studies with accurate, substantive use of evidence?

### Option B (Lighter weight): Disaster Forensics Paper

**Format:** 3-period assignment + paper. Anchored in HS-ESS3-1.

Students pick one historical disaster from the Case Study Library (Tōhoku, Kobe, Bhuj, Pompeii, etc.). They:
1. Reconstruct it in the game using period-appropriate technology (e.g., for Pompeii: no tech available)
2. Then redesign it with modern technology and quantify how many lives modern engineering would have saved
3. Write a 2-3 page paper explaining what failed historically, what would change today, and what hazard categories remain unsolvable even with current tech

Strong fit for students who prefer writing over presenting. Sheet still logs the two game attempts.

### Option C (Lowest stakes): Single-scenario challenge with reflection

**Format:** 1-2 class periods. Anchored in HS-ETS1-4.

Students play any one scenario three times, each time aiming to beat their previous score. Final deliverable is a single reflection (1 page) answering: "What did you change between attempts and why? Cite the relevant geology." Sheet logs all three attempts.

Useful for sections that aren't running the full unit-length engagement, or as a diagnostic at the start of the unit before re-engaging with the deeper Option A later.

### Cross-cutting assessment notes

- **The Sheet IS evidence.** Score growth across attempts is the most honest measure of learning. A student who goes from F → C → B over three attempts demonstrates engineering iteration more credibly than any essay.
- **Reflections should be specific.** Generic "I learned about earthquakes" reflections should be flagged in rubric language. Strong reflections name a specific decision and a specific reason.
- **Group variants possible.** Option A can run with pairs (one researches, one builds, both defend) for differentiation or large-class management.

---

## 2. What v1 already does (current state)

- Three scenarios: Cascadia Coast (subduction), San Andreas Crossing (transform), Volcano Island (hotspot shield volcano)
- 8 × 6 tile grid with zoning (ocean, coastal, fill, bedrock, fault, lava zones, ash zone)
- 5 building types (housing, hospital, school, power, commercial)
- 6 tech upgrades (base isolation, shear walls, tsunami wall, deep foundation, lava berm, ash roof) + 1 city system (early warning)
- $1.5M budget; placement + tech upgrades deduct from budget
- Disaster simulation calculates per-building survival from hazard exposure minus protection
- Debrief screen with score breakdown + scenario-specific written feedback
- Single 51KB self-contained HTML file (`tectonic-city-builder.html`)

**Where v1 lives:** `/Users/imatthew/Documents/Claude/Projects/Plate-Tectonics-City-Builder/tectonic-city-builder.html`. Open this in Claude Code as the starting reference — much of the data model, scoring formula, and screen flow should be preserved.

---

## 3. v2 Goals (the additions)

1. **Expanded scenarios with Asian focus** (most relevant to AISC students)
2. **Visual building & tech upgrade system** — replace emoji with SVG sprites that show installed tech visibly
3. **Visual damage states** — buildings change appearance after disaster (intact → cracked → smoke/fire → rubble)
4. **Historical case studies** integrated into briefing AND debrief screens — students see real photographs, dates, body counts, what failed and why
5. **Google Sheets backend** via Google Apps Script — student progress persists across sessions, students can review past attempts, teacher gets a single roster view

---

## 4. SPEC: Expanded Scenarios

Recommended scenario lineup for v2 (six total — three carried forward, three new):

| Slot | Scenario | Boundary | Status |
|------|----------|----------|--------|
| 1 | **Tōhoku Coast, Japan** | Convergent (subduction) | NEW — replaces Cascadia as primary subduction scenario |
| 2 | **Cascadia Coast, USA** | Convergent (subduction) | Keep as alternate — same hazard profile as Tōhoku |
| 3 | **Anatolian Fault, Istanbul** | Transform | NEW — replaces San Andreas as primary transform scenario |
| 4 | **San Andreas Crossing, California** | Transform | Keep as alternate |
| 5 | **Mt. Merapi / Yogyakarta, Indonesia** | Convergent (stratovolcano) | NEW — explosive volcano; this is the Pompeii-analog |
| 6 | **Hawaii Big Island** | Hotspot (shield volcano) | Keep current — note these are *different* from stratovolcanoes |

**Important geological note for Claude Code:** Do not lump volcanoes together. Shield volcanoes (Hawaii) produce slow effusive lava flows — the hazard is mostly geographic (build distance, not just build strong). Stratovolcanoes (Merapi, Vesuvius, Pinatubo) produce *pyroclastic flows* — 700°C avalanches of hot gas + rock that kill everything in their path within minutes. No berm stops a pyroclastic flow. The only defense is early warning + evacuation. This distinction is the entire educational point of including both.

### Scenario data each one needs

For each scenario, populate:
- **Name + location** (real place)
- **Boundary type** + plate names (e.g., "Pacific Plate subducting beneath the North American Plate")
- **Intro narrative** (3-4 sentences — sets the scene)
- **Geology explainer** (4-6 sentences — the science behind the hazard)
- **Zoning grid** (8 × 6) with per-tile hazard intensities
- **Disaster event description** (what triggers when the student clicks "Run Simulation")
- **Relevant tech list** (which upgrades actually help here)
- **Associated case studies** (link to historical events — see §7)
- **NGSS standards addressed** (2-4 codes from §1a — display in briefing footer)
- **Three-dimensional learning tags** (which SEP / DCI / CCC this scenario most emphasizes)

### New scenario specifics

#### Tōhoku Coast, Japan
- **Hazards:** M9 megathrust, 30m tsunami waves, liquefaction in reclaimed land, building fires from gas line rupture
- **Zoning:** Col 0 ocean; Col 1 coastal (tsunami high); Cols 2-3 reclaimed land / fill (liquefaction + tsunami medium); Cols 4-7 inland bedrock
- **Disaster:** M9.0 megathrust + tsunami inundation
- **Tech relevant:** base isolation, shear walls, tsunami wall, deep foundation, early warning
- **Case studies:** Tōhoku 2011, Seward/Anchorage 1964

#### Anatolian Fault, Istanbul
- **Hazards:** M7.4-7.6 strike-slip rupture, severe shaking, no tsunami (transform faults don't lift seafloor), urban fire risk
- **Zoning:** Fault line diagonal across center; off-fault is dense urban (modest shaking) and on-fault is doomed
- **Disaster:** M7.6 strike-slip on North Anatolian Fault
- **Tech relevant:** base isolation, shear walls, early warning
- **Case studies:** İzmit/Kocaeli 1999, Kobe 1995

#### Mt. Merapi, Indonesia (stratovolcano — NEW HAZARD TYPE)
- **Hazards:** Pyroclastic flows (NEW), lahars (volcanic mudflows, NEW), heavy ashfall, lava bombs
- **Zoning:** Volcano upper-right; tiles within 2 = pyroclastic-flow zone (lethal regardless of tech); tiles 2-4 = lahar/mudflow valleys (depends on slope); downwind tiles = ashfall
- **Disaster:** VEI 4 eruption with pyroclastic flow and lahar
- **Tech relevant:** ash roof, EARLY WARNING (critical — only thing that saves lives in pyroclastic zones), lahar diversion (NEW TECH)
- **Case studies:** Pompeii 79 CE, Merapi 2010, Pinatubo 1991

### New tech needed for stratovolcano scenario

- **Lahar diversion channel** — protects against volcanic mudflows in valley tiles ($60K, protects lahar: 70)
- **Pyroclastic shelter** — reinforced underground bunker; protects people only, building above-ground destroyed anyway ($100K, modifies casualty multiplier in pyroclastic zone from 1.0 → 0.5)

### New zone types needed

- `pyroclastic_zone` — high lethality, no engineering defense; the lesson IS that you don't build here
- `lahar_valley` — slope-determined mudflow path
- `reclaimed_land` — Japanese/Asian coastal cities frequently sit on reclaimed land; liquefaction-prone

---

## 5. SPEC: Visual Building System

**Current state:** Emoji icons (🏠🏥🏫⚡🏪). No visual indication of installed tech. No damage visual.

**Target:** Inline SVG building sprites with composable tech overlays and damage state modifiers.

### Approach (recommended)

Use **inline SVG** for buildings. Each building is a self-contained `<svg>` with named groups that can be hidden/shown via CSS classes or React-style props. Tech upgrades add visible elements:
- **Base isolation:** spring-pad bearings rendered at building base
- **Shear walls:** diagonal cross-bracing visible on building face
- **Tsunami wall:** masonry wall icon ringing the front of the tile
- **Deep foundation:** dotted piles extending below the building into the ground
- **Lava berm:** earth berm V-shape on the volcano-facing side of the tile
- **Ash roof:** steep pitched roof replacing default flat roof
- **Lahar diversion channel:** trench rendered on the slope side
- **Pyroclastic shelter:** small bunker icon next to building

Each tech upgrade should be visible at a glance on the tile — that's how students learn "what tech this hospital has" without clicking it.

### Hover/info system

When the student hovers a tech upgrade in the palette, show a small inset diagram or animation demonstrating what it does. Suggest: GIF-style SVG-CSS animation (e.g., for base isolation, animate the ground shaking while the building stays still). Keep these short (~2 seconds, looping).

### Building sprite library

Five core buildings, each ~80×80 SVG, drawn flat / isometric / pixel-art (pick one style and stick with it). Recommended style: **clean flat illustration** — works at small grid sizes, easy to color-shift for damage states. NOT photorealistic, NOT emoji.

Color palette should match existing CSS variables (`--ink`, `--accent`, etc.) — see v1 file.

### Asset storage

Store SVG assets either:
- **Inline in a `sprites.js` module** as template literals (simplest, no file loading)
- **As separate `.svg` files in `assets/buildings/`** and loaded via `fetch()` once at startup

Recommend the first approach for v2 — keeps deployment to GAS simpler (GAS doesn't serve static files well).

---

## 6. SPEC: Damage State System

After the disaster runs, each building should *visibly* change to reflect its outcome.

### Four damage states (matching existing scoring)

| State | Damage range | Visual treatment |
|-------|-------------|------------------|
| Intact | < 30 | No change — original sprite |
| Damaged | 30-59 | Diagonal cracks overlay; tilt 2-3°; dust particles |
| Heavily damaged | 60-99 | Broken roof; smoke wisps; visible structural failure (one wall missing) |
| Destroyed | ≥ 100 | Rubble pile sprite; fire emoji or smoke plume; no recognizable building |

### Implementation hint

Best implemented as CSS classes on the tile (`.damage-cracked`, `.damage-heavy`, `.damage-destroyed`) that overlay extra SVG elements or apply filters (`filter: hue-rotate(20deg) brightness(0.7)`). Keep the original building visible in damaged states so students can still tell what it WAS — that's important for the debrief reading.

### Animation during disaster

When student clicks "Run Simulation," instead of the current 2.2s text overlay, sequence:
1. **0.0-0.5s:** Hazard visualization appears (tsunami wave sweeping in from ocean tiles; fault line rupture animating along fault tiles; lava flow extending from volcano; pyroclastic flow as expanding red cone)
2. **0.5-1.5s:** Per-building damage applied progressively (one building per ~50ms — drama)
3. **1.5-2.0s:** Fires / smoke fade in on destroyed/heavily damaged buildings
4. **2.0s:** Transition to debrief screen

Don't make the animation longer than ~3s total — students will replay this 5+ times and it has to stay snappy.

---

## 7. SPEC: Historical Case Studies

**Where they appear:**
1. **Briefing screen** — "Real events this scenario is based on" (1-2 case studies linked from each scenario)
2. **Debrief screen** — "What happened in real life" panel that shows case studies where similar engineering choices succeeded or failed
3. **Standalone "Case Study Library"** accessible from title screen

### Case study data structure

Each case study needs:
- Title, location, year
- Magnitude / VEI / scale
- Death toll (with caveat about reporting uncertainty)
- 2-3 sentence event summary
- **What technology / lack-of-technology mattered** (this is the teaching content)
- One or two photographs (Wikimedia Commons — public domain or CC-licensed only)
- 1-2 primary source links (USGS, Smithsonian, news of record)
- Linked scenarios (which game scenario this case study illustrates)
- **NGSS standards** this case study most strongly supports (typically HS-ESS3-1 for "evidence of hazards influencing human activity")

### Case studies to include (content provided — Claude Code should treat this as the source-of-truth narrative)

#### Tōhoku, Japan — 11 March 2011 (M9.1)
A megathrust earthquake off the Sanriku coast triggered a tsunami with run-up heights exceeding 40 meters in some bays. Nearly 20,000 dead or missing; the Fukushima Daiichi nuclear plant suffered triple meltdown after its 10m seawall was overtopped by 14m waves. **Lesson:** Japan had world-class earthquake engineering — most buildings shaking-survived the M9. The killer was water. Tsunami walls sized for "expected" events were undersized for the actual event. Recovery has involved either raising seawalls dramatically or relocating coastal villages to higher ground.
*Scenarios:* Tōhoku Coast, Cascadia Coast

#### Kobe (Great Hanshin), Japan — 17 January 1995 (M6.9)
Strike-slip rupture directly beneath the city. Over 6,000 dead. The Hanshin Expressway — a "modern" elevated highway — collapsed onto its side; many "earthquake-resistant" buildings failed because their codes accounted for vertical loads but underestimated horizontal forces. Old wooden homes burned in post-quake fires. **Lesson:** Earthquake engineering is only as good as the assumptions in the code. Kobe rewrote Japan's seismic code; later quakes (Tōhoku) saw far better building performance because of what Kobe taught.
*Scenarios:* Anatolian Fault, San Andreas Crossing

#### Bhuj / Gujarat, India — 26 January 2001 (M7.7)
Intraplate quake (not on a plate boundary — a reactivated ancient fault). 20,000+ dead across Gujarat. Building collapse was widespread: poorly reinforced concrete-frame apartments with "soft story" ground floors (open parking) pancaked. **Lesson:** Hazard isn't only at plate boundaries — and building codes that aren't enforced don't protect anyone. Post-Bhuj, India strengthened building code enforcement, though unevenly.
*Scenarios:* Any with shaking (use as cautionary case)

#### Sumatra–Andaman, Indonesia — 26 December 2004 (M9.1)
Megathrust earthquake along the Sunda Trench triggered an Indian Ocean tsunami that killed ~230,000 people across 14 countries. Aceh province (Indonesia) and Sri Lanka were devastated. Notably, **there was no Indian Ocean tsunami warning system** at the time — the Pacific had one, but the Indian Ocean was considered low-risk. **Lesson:** Early warning systems matter — and they have to exist BEFORE the disaster, not after. The Indian Ocean Tsunami Warning System was built in the years following.
*Scenarios:* Tōhoku Coast, Cascadia Coast

#### Tangshan, China — 28 July 1976 (M7.6)
Intraplate strike-slip-like quake destroyed the industrial city of Tangshan. Official death toll 240,000; some estimates higher. The city had almost no earthquake-resistant construction. **Lesson:** Unprepared cities pay catastrophic prices. Modern China's much stronger seismic codes were partially driven by the lessons of Tangshan.
*Scenarios:* Anatolian Fault (parallels the Istanbul risk profile)

#### Pinatubo, Philippines — 15 June 1991 (VEI 6)
The second-largest volcanic eruption of the 20th century. Roughly 800 dead — but tens of thousands of lives were saved by an effective evacuation, ordered days in advance based on USGS + PHIVOLCS monitoring. Clark Air Base and Subic Bay Naval Base were destroyed by ashfall and lahars. **Lesson:** Volcanology + early warning + acting on warnings = lives saved. Pyroclastic flows are unsurvivable up close — distance + advance evacuation is the only defense.
*Scenarios:* Mt. Merapi

#### Merapi, Indonesia — 2010 eruption sequence
A series of explosive eruptions on Java killed ~350 people, including the volcano's spiritual guardian who refused to evacuate. Pyroclastic flows reached 17 km from the summit. Lahars contaminated water supplies and destroyed villages downstream for years afterward. **Lesson:** Even with sophisticated monitoring, the closest "danger zone" residents face an unsurvivable hazard. The hard question isn't engineering — it's how authorities convince people to leave.
*Scenarios:* Mt. Merapi

#### Pompeii & Herculaneum, Italy — 24 August 79 CE
Vesuvius erupted explosively, burying both cities. Pompeii covered in ~6m of ash and pumice; Herculaneum hit by pyroclastic flows that vaporized organic material instantly. Estimates of dead range from 2,000 to 16,000+. The cities had no concept of "active volcano" — Vesuvius had been quiet for ~700 years and was widely thought to be a normal mountain. **Lesson:** Without the science of volcanology, communities can't even classify their hazards. Modern volcanology — Volcanic Explosivity Index, magma chamber monitoring — exists in part because of careful study of Vesuvius's deposits.
*Scenarios:* Mt. Merapi (Pompeii is the historical anchor for "what happens without warning")

#### Seward & Anchorage, Alaska, USA — 27 March 1964 (M9.2)
The second-largest earthquake ever recorded. The Pacific-North American convergent boundary slipped along ~800 km. Tsunamis devastated Seward, Valdez, and Kodiak. In Anchorage, the Turnagain Heights neighborhood — built on saturated marine clay — flowed downhill in massive landslides; entire blocks of homes simply slid into Cook Inlet. **Lesson:** Liquefaction and lateral spreading on soft soils are as dangerous as the shaking itself. Don't build on saturated clay or fill in subduction-zone country.
*Scenarios:* Cascadia Coast, Tōhoku Coast

### How case studies surface in gameplay

- **Briefing screen:** Below the hazards list, add a "Real events" section showing 1-2 case study cards with thumbnail + name + year + 1-sentence hook. Click to expand into full content.
- **Debrief screen:** Add a "Compare to history" panel. Logic: if the student lost coastal buildings to a tsunami in Tōhoku Coast scenario, surface Sendai/Tōhoku 2011 with the takeaway "This is what happened in real Tōhoku — Japan's seawalls were undersized." If they put a building on the fault line in Anatolian Fault, surface Kobe/İzmit. Match case studies to the failure mode.
- **Case Study Library:** Accessible from title screen — students can browse all 9+ events independent of gameplay. Useful for unit reading assignments.

---

## 8. SPEC: Google Sheets Backend (NEW)

**Goal:** Every student session is saved. Students can revisit past attempts. Teacher gets a single roster view.

**Architecture (recommended):**

Deploy the entire v2 app as a **Google Apps Script Web App**. Single GAS project containing:
- `index.html` — the game (HTML/CSS/JS)
- `Code.gs` — server-side functions exposed via `google.script.run`
- A linked Google Sheet (one sheet per worksheet, see schema below)

Deploy with execution as **"User accessing the web app"** so `Session.getActiveUser().getEmail()` automatically identifies students via their AISC Google account. No login form needed.

### Why GAS-deployed (not static HTML calling GAS)

| Concern | Static HTML calls GAS | Fully GAS-deployed |
|---------|----------------------|-------------------|
| Student auth | Need to build login OR trust client | Automatic via Google session |
| Hosting | Need GitHub Pages / Vercel / similar | GAS handles everything |
| Sheet access security | Risk of CSRF; need shared secret | Locked to authenticated user |
| Distribution | Multiple URLs to manage | One GAS URL for everyone |

The user has prior GAS+Sheets experience (STEAM-CSP-CAS Planner, Theatre Booking Manager) — this pattern is familiar.

### Sheet schema

**Sheet: `Sessions`** (one row per student attempt)
| Column | Type | Notes |
|--------|------|-------|
| timestamp | datetime | When attempt finished |
| email | string | From `Session.getActiveUser()` |
| display_name | string | Student-provided OR Google profile name |
| class_section | string | e.g., "Earth-Env Pd 3" — set on first session |
| scenario_key | string | tohoku, anatolian, merapi, etc. |
| attempt_number | int | 1st attempt at this scenario? 5th? |
| budget_used | int | dollars spent |
| population_total | int | |
| population_saved | int | |
| critical_intact_pct | float | weighted critical infrastructure score |
| final_score | int | 0-100 |
| grade | string | A/B/C/D/F |
| time_spent_seconds | int | from start of build to clicking Run |
| placements_json | string | JSON blob of all building+tech placements |
| reflection_text | string | optional student reflection captured post-debrief |

**Sheet: `Roster`** (auto-populated as students join)
| email | display_name | class_section | first_seen | total_attempts |

**Sheet: `CaseStudyViews`** (optional — telemetry on what students actually read)
| timestamp | email | case_study_id | duration_seconds |

### GAS server functions to expose

```javascript
// Code.gs

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Tectonic City Builder')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getCurrentUser() {
  return {
    email: Session.getActiveUser().getEmail(),
    // Look up display_name + class_section from Roster if exists
  };
}

function registerStudent(displayName, classSection) {
  // Add or update Roster entry
}

function saveSession(sessionData) {
  // Append row to Sessions sheet
  // Return attempt_number + session_id for confirmation
}

function getMyHistory() {
  // Return all rows from Sessions where email matches current user
  // Used to populate "Past Attempts" view
}

function getCaseStudyContent(caseStudyId) {
  // Return case study HTML/data (could also be bundled in client)
}
```

### Student-side flow

1. Student loads GAS URL → game opens
2. Game calls `getCurrentUser()` on load
3. If new student: prompt for display name + class section, call `registerStudent()`
4. Student plays a scenario → on debrief screen, an optional reflection textbox appears
5. Student clicks "Save my work" (or auto-save on debrief shown) → `saveSession(...)` fires
6. New screen: **"My Cities"** accessible from title — shows all past attempts as cards with score, scenario, date. Clicking opens read-only replay of that attempt.

### Replay vs. fresh start

The "My Cities" screen should let students *view* their past cities (building placements + outcome) but NOT modify them. To play again with same scenario, they click "Rebuild this scenario from scratch" which is a fresh attempt (attempt_number increments).

### Teacher dashboard (suggested, optional for v2.0)

Either:
- **Option A:** Same GAS app, hidden route accessible only to specific emails (e.g., `matthew.ignash@aischennai.org`) — shows roster, attempts per student, score distributions, common failure modes per scenario
- **Option B:** Separate GAS web app reading from the same Sheet — keeps student app simpler

Recommend Option A — fewer moving parts.

---

## 9. Recommended Architecture for v2

```
Plate-Tectonics-City-Builder/
├── CLAUDE.md                          <- this file
├── tectonic-city-builder.html         <- v1 reference (do not modify)
├── v2/
│   ├── README.md
│   ├── .clasp.json                    <- GAS project link (after clasp clone)
│   ├── appsscript.json                <- GAS manifest
│   ├── index.html                     <- main game HTML (with <?!= include('styles') ?>)
│   ├── styles.html                    <- CSS as GAS HTML include
│   ├── game.html                      <- main JS as GAS HTML include
│   ├── sprites.html                   <- SVG sprite definitions as JS template literals
│   ├── data-scenarios.html            <- scenario definitions
│   ├── data-case-studies.html         <- case study content
│   └── Code.gs                        <- server-side
└── assets/
    └── case-studies/                  <- if images used, reference Wikimedia URLs directly
```

### Use `clasp` (Google Apps Script CLI)

`clasp` lets Claude Code work with GAS as local files. After installing:
```
npx @google/clasp login
npx @google/clasp clone <SCRIPT_ID>
```

This lets the entire v2 development happen in this folder with normal git/version control, and `clasp push` deploys to GAS.

### Tech stack inside the app

- **Vanilla JS + inline SVG** (no React, no build step needed for GAS)
- **CSS variables** for theming (carry forward v1 palette)
- **`google.script.run`** for client→server calls (replaces fetch())
- **No external libraries** unless absolutely necessary — keeps GAS deployment clean

If a library IS needed (e.g., for animations), use CDN-loaded scripts and accept the slight load delay.

---

## 10. Out of scope for v2

Things that are tempting but should wait for v3 or beyond:

- **Multiplayer / collaborative building** — interesting pedagogically (debate-driven city planning) but a huge complexity increase
- **3D rendering** — overkill for the educational point; 2D communicates the science fine
- **AI-driven adaptive difficulty** — the deterministic outcomes are part of what makes this teachable
- **Mobile app / native packaging** — browser app is sufficient; AISC students use Chromebooks
- **Integration with other LMS** — Sheet is enough; teacher can export
- **More than ~6 scenarios** — beyond this, players choose-fatigue. Better to deepen each scenario than add more

---

## 11. Open design questions (resolve with Matthew before building)

1. **Save trigger:** Auto-save on debrief, or require student to click "Save my work"? Implication: do unfinished/abandoned attempts get recorded? Recommend explicit save to avoid junk rows.
2. **Reflection prompt content:** What should the optional reflection text ask? E.g., "Which of your decisions cost the most lives?" vs. open-ended. Recommend: 2-3 specific prompts tied to scenario.
3. **Replay capability:** View-only past attempts (recommended) vs. forkable past attempts (clone-and-modify)? View-only is much simpler.
4. **Teacher dashboard scope:** Just a roster + scores table? Or full analytics (per-question difficulty, common failure patterns)? Recommend MVP = roster + scores; add analytics in v2.1.
5. **Case study primary sources:** Use Wikimedia images directly via URL? Or download into the repo and serve from GAS? Wikimedia URLs are easier but rely on uptime; GAS-served is more reliable but takes more space.
6. **Should v2 keep all 6 scenarios from the start, or ship with 3 (Tōhoku, Anatolian, Merapi) and add 3 alternates later?** Recommend ship with 3 (the new ones), retire v1's exact scenarios since they're now covered by Asian equivalents.
7. **Grade weighting:** Current scoring is 50% population / 30% critical infrastructure / 20% cost efficiency. Should v2 add a "historical accuracy" component (did you actually use the right tech for the right hazard)? Could be a 4th component or a multiplier.

---

## 12. Definition of done for v2.0

- [ ] Three Asian-focused scenarios playable (Tōhoku, Anatolian, Merapi) with new pyroclastic / lahar / reclaimed-land hazards
- [ ] All buildings rendered as SVG sprites (no emoji)
- [ ] Visible tech upgrades on tile sprites
- [ ] Four damage states render correctly post-disaster
- [ ] Disaster animation sequence (≤3 seconds)
- [ ] 9 case studies included with text content
- [ ] Case studies surface in briefing + debrief contextually
- [ ] Standalone Case Study Library screen accessible from title
- [ ] GAS web app deployed; authenticated student identification works
- [ ] Sessions sheet records all attempts with full placement JSON
- [ ] "My Cities" past-attempts screen with view-only replay
- [ ] Matthew can play through all three scenarios start-to-finish without bugs
- [ ] Matthew can open the Sheet and see his attempts logged
- [ ] NGSS standards display on every scenario briefing and on the debrief screen
- [ ] Case Study Library includes NGSS tags per case study
- [ ] Teacher dashboard surfaces NGSS-by-scenario coverage matrix
- [ ] At least one rubric template (CSV or Docs link) exists for the recommended Option A assessment

---

## 13. Out-of-bounds for Claude Code (Matthew should decide, not the agent)

- Final color palette / visual style direction (Matthew should approve sprite style before bulk asset work)
- Which specific case study images to use (copyright sensitivity — Matthew picks)
- Class section names / roster pre-population (Matthew provides his actual section list)
- Whether to add additional scenarios beyond the 3 prioritized
- Tone of teacher-facing feedback in debrief (Matthew may want to adjust phrasing for his classroom voice)
