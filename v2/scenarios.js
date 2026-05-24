/**
 * SCENARIOS — Tectonic City Builder v2
 *
 * Each scenario provides the geological setup, the disaster that runs, and the
 * NGSS standards the playthrough exercises. The zoning grid is 8 cols × 6 rows;
 * (col, row) addressing. Per-tile hazards are 0–100 intensities; the run logic
 * in game.js combines tile hazard × tech protections to compute building damage.
 *
 * Zone vocabulary:
 *   ocean         — un-buildable water
 *   coastal       — first inland strip; high tsunami risk
 *   fill          — sediment fill (Cascadia-style); high liquefaction
 *   reclaimed_land — engineered fill on former ocean (Tōhoku, Tokyo Bay); higher liquefaction than fill
 *   bedrock       — safest ground; some shaking but no liquefaction
 *   urban         — dense city tiles off-fault (Anatolian); high fire risk
 *   fault         — directly on a strike-slip rupture line; rupture = 100, anything here dies
 *   pyroclastic_zone — within reach of a pyroclastic flow; no engineering defense for structures
 *   lahar_valley  — downslope path of volcanic mudflows
 *   ashfall_plume — downwind ash deposition zone (heavy roof loading)
 *   lava_path     — shield-volcano lava flow path
 *   lava_adjacent — tiles bordering the lava path
 *   volcano       — the cone itself; un-buildable
 */

const SCENARIOS = {
  // ────────────────────────────────────────────────────────────────────────
  // 1. TŌHOKU COAST — primary subduction scenario
  // ────────────────────────────────────────────────────────────────────────
  tohoku: {
    name: "Tōhoku Coast, Japan",
    location: "Sanriku coast, northeastern Honshu",
    boundary: "Convergent (subduction): Pacific Plate diving beneath the Okhotsk Plate",
    intro:
      "You're planning a coastal city on the Sanriku coast of northeastern Japan — above one of the world's most active subduction zones. " +
      "The last megathrust here, in 2011, ruptured ~500 km of the Japan Trench and sent tsunami waves over 40 m high into coastal bays. " +
      "Much of this coastline is reclaimed land — engineered fill on what used to be ocean — which liquefies dramatically under strong shaking.",
    geology:
      "Subduction zones produce the largest earthquakes on Earth (M9+) when the locked interface between plates suddenly slips. " +
      "The seafloor itself jumps upward several metres, lifting the entire water column above it — the tsunami. " +
      "Megathrust shaking lasts 3–5 minutes; reclaimed land and saturated coastal sediments turn to slurry. " +
      "Modern Japanese building codes shaking-survive M9s; the killer is water and what it does to what stood up.",
    zoning: function () {
      const z = [];
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          let zone, hazards;
          if (c === 0) {
            zone = "ocean";
            hazards = { shaking: 0, tsunami: 0, liquefaction: 0, fire: 0 };
          } else if (c === 1) {
            zone = "coastal";
            hazards = { shaking: 80, tsunami: 95, liquefaction: 50, fire: 20 };
          } else if (c === 2 || c === 3) {
            zone = "reclaimed_land";
            hazards = { shaking: 80, tsunami: c === 2 ? 45 : 15, liquefaction: 90, fire: 30 };
          } else {
            zone = "bedrock";
            hazards = { shaking: 65, tsunami: 0, liquefaction: 10, fire: 15 };
          }
          z.push({ row: r, col: c, zone, hazards });
        }
      }
      return z;
    },
    legend: [
      { swatch: "var(--tile-ocean)", label: "Ocean — can't build" },
      { swatch: "var(--tile-coast)", label: "Coastal — tsunami catastrophic" },
      { swatch: "var(--tile-reclaimed)", label: "Reclaimed land — severe liquefaction" },
      { swatch: "var(--tile-bedrock)", label: "Bedrock — safest ground" },
    ],
    disaster: "M9.0 megathrust earthquake + tsunami inundation",
    disaster_banner: "⚠️ M9.0 MEGATHRUST + 30m TSUNAMI INCOMING ⚠️",
    tech_relevant: ["base_isolation", "shear_walls", "tsunami_wall", "deep_foundation", "early_warning"],
    case_studies: ["tohoku-2011", "anchorage-1964"], // Phase D will surface these
    ngss: ["HS-ESS2-1", "HS-ESS3-1", "HS-ETS1-3", "HS-ETS1-4"],
    three_d: {
      sep: ["SEP-2 Developing and Using Models", "SEP-6 Constructing Explanations and Designing Solutions"],
      dci: ["ESS2.B Plate Tectonics", "ESS3.B Natural Hazards", "ETS1.B Developing Possible Solutions"],
      ccc: ["CCC-2 Cause and Effect", "CCC-7 Stability and Change"],
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // 2. CASCADIA COAST — alternate subduction scenario
  // ────────────────────────────────────────────────────────────────────────
  cascadia: {
    name: "Cascadia Coast, USA",
    location: "Pacific Northwest coast — Oregon / Washington",
    boundary: "Convergent (subduction): Juan de Fuca Plate diving beneath the North American Plate",
    intro:
      "You're planning a coastal city above the Cascadia Subduction Zone. " +
      "The last megathrust here was January 1700 — over 300 years of stress has been building. " +
      "Geologic evidence (ghost forests, Japanese tsunami records) tells us this fault produces M9+ events on a 200–500 year cycle. We are overdue.",
    geology:
      "Subduction zones produce the largest earthquakes on Earth (M9+) and the tsunamis that follow. " +
      "When the megathrust slips, the seafloor snaps upward and lifts the water column. " +
      "Coastal sediment fill liquefies under prolonged shaking — solid ground becomes quicksand. " +
      "Cascadia's hazard profile mirrors Tōhoku's; the difference is local geography and historical preparedness, not physics.",
    zoning: function () {
      const z = [];
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          let zone, hazards;
          if (c === 0) {
            zone = "ocean";
            hazards = { shaking: 0, tsunami: 0, liquefaction: 0, fire: 0 };
          } else if (c === 1) {
            zone = "coastal";
            hazards = { shaking: 80, tsunami: 95, liquefaction: 50, fire: 20 };
          } else if (c === 2 || c === 3) {
            zone = "fill";
            hazards = { shaking: 75, tsunami: c === 2 ? 40 : 10, liquefaction: 85, fire: 15 };
          } else {
            zone = "bedrock";
            hazards = { shaking: 60, tsunami: 0, liquefaction: 10, fire: 10 };
          }
          z.push({ row: r, col: c, zone, hazards });
        }
      }
      return z;
    },
    legend: [
      { swatch: "var(--tile-ocean)", label: "Ocean — can't build" },
      { swatch: "var(--tile-coast)", label: "Coastal — tsunami catastrophic" },
      { swatch: "var(--tile-fill)", label: "Sediment fill — liquefaction high" },
      { swatch: "var(--tile-bedrock)", label: "Bedrock — safest ground" },
    ],
    disaster: "M9.0 megathrust earthquake + tsunami inundation",
    disaster_banner: "⚠️ M9.0 MEGATHRUST + TSUNAMI INCOMING ⚠️",
    tech_relevant: ["base_isolation", "shear_walls", "tsunami_wall", "deep_foundation", "early_warning"],
    case_studies: ["tohoku-2011", "anchorage-1964"],
    ngss: ["HS-ESS2-1", "HS-ESS3-1", "HS-ETS1-3", "HS-ETS1-4"],
    three_d: {
      sep: ["SEP-2 Developing and Using Models", "SEP-6 Constructing Explanations and Designing Solutions"],
      dci: ["ESS2.B Plate Tectonics", "ESS3.B Natural Hazards"],
      ccc: ["CCC-2 Cause and Effect", "CCC-7 Stability and Change"],
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // 3. ANATOLIAN / ISTANBUL — primary transform scenario
  // ────────────────────────────────────────────────────────────────────────
  anatolian: {
    name: "Anatolian Fault, Istanbul",
    location: "Northwestern Türkiye — Marmara Sea region",
    boundary: "Transform: North Anatolian Fault — Anatolian Plate sliding west past the Eurasian Plate",
    intro:
      "You're planning expansion of a dense urban district near Istanbul, with the North Anatolian Fault running diagonally beneath the city. " +
      "Stress has migrated westward along this fault for a century — the 1999 İzmit earthquake was the most recent major release. " +
      "The next major rupture is expected on the segment directly under the Marmara Sea, immediately south of central Istanbul.",
    geology:
      "Transform faults like the North Anatolian don't produce tsunamis — the plates slide horizontally past each other, not vertically. " +
      "They produce strong, sometimes catastrophic shaking and surface rupture: the ground tears along the fault line, displacing several metres horizontally. " +
      "No building tech survives sitting directly on a rupturing fault. " +
      "Off-fault shaking damage depends on building code; urban fire risk after the quake is often the second-biggest killer.",
    zoning: function () {
      const z = [];
      // Fault runs diagonally: at row r, fault is at col = 1 + r
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          let zone, hazards;
          const faultCol = 1 + r;
          if (c === faultCol) {
            zone = "fault";
            hazards = { shaking: 95, rupture: 100, fire: 50 };
          } else if (Math.abs(c - faultCol) === 1) {
            zone = "urban";
            hazards = { shaking: 85, rupture: 0, fire: 50, liquefaction: 30 };
          } else {
            zone = "urban";
            hazards = { shaking: 70, rupture: 0, fire: 35, liquefaction: 15 };
          }
          z.push({ row: r, col: c, zone, hazards });
        }
      }
      return z;
    },
    legend: [
      { swatch: "var(--tile-fault)", label: "Fault — surface rupture, 100% structural loss" },
      { swatch: "var(--tile-urban-near)", label: "Near-fault urban — severe shaking + fire" },
      { swatch: "var(--tile-urban)", label: "Urban — moderate shaking + fire risk" },
    ],
    disaster: "M7.6 strike-slip rupture on the North Anatolian Fault",
    disaster_banner: "⚠️ M7.6 STRIKE-SLIP RUPTURE — NORTH ANATOLIAN FAULT ⚠️",
    tech_relevant: ["base_isolation", "shear_walls", "early_warning"],
    case_studies: ["kobe-1995", "bhuj-2001"], // İzmit/Kocaeli 1999 would be ideal — add later
    ngss: ["HS-ESS2-1", "HS-ESS3-1", "HS-ETS1-3"],
    three_d: {
      sep: ["SEP-2 Developing and Using Models", "SEP-6 Constructing Explanations and Designing Solutions"],
      dci: ["ESS2.B Plate Tectonics", "ESS3.B Natural Hazards"],
      ccc: ["CCC-2 Cause and Effect"],
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // 4. MT. MERAPI — stratovolcano (NEW HAZARD TYPE)
  // ────────────────────────────────────────────────────────────────────────
  merapi: {
    name: "Mt. Merapi, Indonesia",
    location: "Central Java — Yogyakarta is ~30 km from the summit",
    boundary: "Convergent (subduction-derived stratovolcano): Indo-Australian Plate beneath the Sunda Plate; magma rises in the arc above",
    intro:
      "You're planning settlement on the southern flank of Mt. Merapi, one of the most active stratovolcanoes on Earth. " +
      "Merapi has erupted dozens of times in recorded history. Its 2010 eruption killed ~350 people, including the volcano's spiritual guardian who refused to evacuate. " +
      "The hazard here is unlike anything earthquake engineering can address.",
    geology:
      "Stratovolcanoes produce pyroclastic flows — 700°C avalanches of hot gas, ash, and rock that move at 100+ km/h. " +
      "No wall, no berm, no roof stops a pyroclastic flow. The only defense for people in their path is distance plus advance evacuation. " +
      "Lahars — volcanic mudflows of ash + water — follow valleys for kilometres after eruptions, destroying villages downstream for years. " +
      "Ashfall loads roofs heavily; lava bombs ignite buildings; lava flows are slow but un-divertible. " +
      "This is the entire point of the simulator: not every hazard has an engineering solution.",
    zoning: function () {
      const z = [];
      // Volcano at (col=7, row=0). Pyroclastic zone within 2 tiles of summit.
      // Lahar valley downslope: rows 3-5, cols 4-6 (diagonal from summit toward SW).
      // Ashfall plume downwind: rows 0-2, cols 0-3.
      const vCol = 7, vRow = 0;
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          let zone, hazards;
          const dx = c - vCol;
          const dy = r - vRow;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (r === vRow && c === vCol) {
            zone = "volcano";
            hazards = { pyroclastic: 100, ashfall: 100 };
          } else if (dist <= 2.5) {
            zone = "pyroclastic_zone";
            hazards = { pyroclastic: 100, ashfall: 90, shaking: 30 };
          } else if (r >= 3 && c >= 4 && c <= 6) {
            zone = "lahar_valley";
            hazards = { lahar: 75, ashfall: 40, shaking: 20 };
          } else if (r <= 2 && c <= 3) {
            zone = "ashfall_plume";
            hazards = { ashfall: 60, shaking: 20 };
          } else {
            zone = "bedrock";
            hazards = { ashfall: 25, shaking: 20 };
          }
          z.push({ row: r, col: c, zone, hazards });
        }
      }
      return z;
    },
    legend: [
      { swatch: "var(--tile-volcano)", label: "Volcano cone — can't build" },
      { swatch: "var(--tile-pyroclastic)", label: "Pyroclastic zone — lethal, no defense" },
      { swatch: "var(--tile-lahar)", label: "Lahar valley — mudflow path" },
      { swatch: "var(--tile-ash)", label: "Ashfall plume — heavy roof loading" },
      { swatch: "var(--tile-bedrock)", label: "Safer ground — distance is the defense" },
    ],
    disaster: "VEI 4 explosive eruption — pyroclastic flow + lahar + ashfall",
    disaster_banner: "⚠️ VEI 4 ERUPTION — PYROCLASTIC FLOW INCOMING ⚠️",
    tech_relevant: ["ash_roof", "lahar_diversion", "pyroclastic_shelter", "early_warning"],
    case_studies: ["pinatubo-1991", "merapi-2010", "pompeii-79ce"],
    ngss: ["HS-ESS2-1", "HS-ESS3-1", "HS-ETS1-3", "HS-ETS1-4"],
    three_d: {
      sep: ["SEP-2 Developing and Using Models", "SEP-7 Engaging in Argument from Evidence"],
      dci: ["ESS2.B Plate Tectonics", "ESS3.B Natural Hazards"],
      ccc: ["CCC-2 Cause and Effect", "CCC-7 Stability and Change"],
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // 5. HAWAII BIG ISLAND — hotspot shield volcano (contrast with stratovolcano)
  // ────────────────────────────────────────────────────────────────────────
  hawaii: {
    name: "Hawaii Big Island",
    location: "Kīlauea / Mauna Loa flanks, Island of Hawaiʻi",
    boundary: "Hotspot: mantle plume punching through the Pacific Plate (no plate boundary nearby)",
    intro:
      "You're planning settlement on the southern flank of Kīlauea, one of the most active shield volcanoes on Earth. " +
      "Hawaiian eruptions are spectacular but slow — effusive lava flows, not explosive pyroclastic events. " +
      "The 2018 Lower Puna eruption destroyed 700 homes, but no one died from the lava itself — there was time to evacuate. " +
      "The lesson here is the opposite of Merapi: with shield volcanoes, geographic distance matters more than tech.",
    geology:
      "Shield volcanoes are built by repeated effusive (non-explosive) eruptions of low-viscosity basaltic lava. " +
      "Lava flows are slow (walking pace at the front) and follow topography, but they're un-divertible at scale — they bury whatever they reach. " +
      "Hawaiian eruptions rarely produce pyroclastic flows or lahars at any consequential scale; ashfall is minimal. " +
      "The defence is siting: don't build in the flow path. Berms can deflect small flows but can't stop a major eruption.",
    zoning: function () {
      const z = [];
      // Volcano at (col=7, row=0). Lava path zigzags toward (col=0, row=5).
      // Path: (7,0) → (6,1) → (5,1) → (5,2) → (4,2) → (4,3) → (3,3) → (3,4) → (2,4) → (2,5) → (1,5) → (0,5)
      const lavaPath = new Set([
        "7,0", "6,1", "5,1", "5,2", "4,2", "4,3", "3,3", "3,4", "2,4", "2,5", "1,5", "0,5",
      ]);
      const lavaAdj = new Set([
        "6,0", "5,0", "7,1", "6,2", "4,1", "5,3", "3,2", "4,4", "2,3", "3,5", "1,4", "0,4", "1,6",
      ]);
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          let zone, hazards;
          const key = `${c},${r}`;
          if (r === 0 && c === 7) {
            zone = "volcano";
            hazards = { lava: 100 };
          } else if (lavaPath.has(key)) {
            zone = "lava_path";
            hazards = { lava: 100, ashfall: 10 };
          } else if (lavaAdj.has(key)) {
            zone = "lava_adjacent";
            hazards = { lava: 40, ashfall: 10 };
          } else {
            zone = "bedrock";
            hazards = { lava: 0, ashfall: 5 };
          }
          z.push({ row: r, col: c, zone, hazards });
        }
      }
      return z;
    },
    legend: [
      { swatch: "var(--tile-volcano)", label: "Volcano cone — can't build" },
      { swatch: "var(--tile-lava-hi)", label: "Lava flow path — buildings destroyed" },
      { swatch: "var(--tile-lava-med)", label: "Adjacent to flow — partial damage" },
      { swatch: "var(--tile-bedrock)", label: "Safer ground — distance is the defense" },
    ],
    disaster: "Major effusive eruption — lava flow toward southern coast",
    disaster_banner: "⚠️ LAVA FLOW ADVANCING DOWN SOUTHERN FLANK ⚠️",
    tech_relevant: ["lava_berm", "early_warning"],
    case_studies: [], // Hawaii Big Island doesn't have a major historical-disaster anchor in our case library
    ngss: ["HS-ESS2-1", "HS-ESS3-1"],
    three_d: {
      sep: ["SEP-2 Developing and Using Models"],
      dci: ["ESS2.B Plate Tectonics", "ESS3.B Natural Hazards"],
      ccc: ["CCC-2 Cause and Effect", "CCC-7 Stability and Change"],
    },
  },
};
