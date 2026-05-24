# Build Progress — `Plate-Tectonics-City-Builder`

> **Purpose:** Living status doc for the simulator. Charter is in `CLAUDE.md` — do NOT modify that. Update this file at the end of each build session.

**Last updated:** 2026-05-24

---

## TL;DR — pick up here

v1 (`tectonic-city-builder.html`) is a working single-file simulator used in U3 Block 5+. v2 is scaffolded (separated into `index.html` / `game.js` / `scenarios.js` / `tech.js` / `styles.css`) but not feature-complete relative to the v2 brief in `CLAUDE.md`. Next session: read `CLAUDE.md` v2 spec, diff against current v2 files, identify missing features, build in priority order.

---

## What's built

### v1 — production
- `tectonic-city-builder.html` (~52KB single file, inline CSS+JS)
- Used in production from U3 Block 5 onward
- Embedded via iframe in `hs-earth-env-site/src/units/unit-3/tectonic-city-builder.njk`

### v2 — scaffolding
- `v2/index.html` (~4KB, HTML shell)
- `v2/styles.css` (~10KB)
- `v2/game.js` (~21KB — core simulation logic, partial)
- `v2/scenarios.js` (~19KB — pre-built scenarios for class use)
- `v2/tech.js` (~3KB — engineering tech tree, stub)
- `v2/README.md`

---

## What's missing in v2 (priority order)

1. **Verify against `CLAUDE.md` v2 spec** — read the v2 goals section, compare against current files, list every spec item as DONE / PARTIAL / MISSING. This is the necessary first step before any further build.
2. **Tech tree expansion** — `tech.js` is only ~3KB, likely needs the full engineering interventions described in the spec (base isolation, shear walls, retrofit programs, building code upgrades, etc.).
3. **Scenario completeness** — `scenarios.js` should contain at least 5-7 class-ready scenarios (one per major plate boundary type + Chennai-specific + a chosen historical city). Verify each runs end-to-end.
4. **UI polish** — the v1 had a single-file UI. v2 needs the multi-panel layout per the spec (control panel / map / stats / event log).
5. **Save/load** — students need to save their city scenario for the next class. localStorage is fine for v2; export-as-JSON if time allows.
6. **Embed-friendliness** — v2 needs to work cleanly in an iframe from the site (no fixed dimensions, responsive).

---

## Conventions

- Pure HTML/CSS/JS — no build step
- No external dependencies beyond what's in the v1 file (likely just vanilla JS)
- Single-page app structure in v2 (index.html + linked JS/CSS modules)
- Keep v1 untouched while v2 is in development — v1 is in production use

---

## Future simulator companions (NOT in this repo)

If new simulators get briefs (Cauvery, Habitability, Land Allocation, Energy Mix — see `hs-earth-env-site/BUILD_PROGRESS.md` for context), they should be sibling Claude Code projects, each with their own `CLAUDE.md` charter and `BUILD_PROGRESS.md`. Do NOT build them inside this repo.
