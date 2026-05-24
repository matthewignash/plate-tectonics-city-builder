# Tectonic City Builder v2

In-development rewrite of the v1 simulator at the repo root. v2.0 is **functionally complete client-side**; the Google Apps Script backend (Phase E execution) is scaffolded and ready to deploy when you are.

## Run it locally

No build step. Open `index.html` in any modern browser. That's it.

```bash
open index.html
```

For better routing while testing:

```bash
python3 -m http.server 8765
# then visit http://localhost:8765/
```

## Phase status

| Phase | Status | What it adds |
|---|---|---|
| **A** — Foundation + 5 scenarios | ✓ Complete | v2 codebase split, 5 scenarios (Tōhoku, Cascadia, Anatolian, Merapi, Hawaii), gameplay loop, NGSS standards on briefing/debrief |
| **B** — Visual building system | ✓ Complete | Inline SVG flat-isometric sprites, composable tech overlays, hover-demo animations |
| **C** — Damage state system | ✓ Complete | 4 visual damage states (intact / cracked / heavy / destroyed), on-grid disaster animation (≤3s) with scenario-specific hazard visualisations |
| **D** — Historical case studies | ✓ Complete | 9 case studies, briefing "Real events" panel, failure-mode-aware "Compare to history" panel in debrief, standalone Case Study Library |
| **E prep** — GAS scaffolding | ✓ Scaffolded | `Code.gs`, `appsscript.json`, `SETUP.md` — Matthew runs deploy steps when ready |
| **E execution** — Live GAS deploy | ⏳ Deferred | Port HTML/CSS/JS to GAS HTML-include format, wire google.script.run calls, build "My Cities" past-attempts screen, build teacher dashboard route |
| **F** — Polish + DoD | ✓ Complete | Historical-accuracy scoring (4th component, 10%), assessment rubric template, this README + DoD audit |

## File layout

```
v2/
├── README.md            (this file)
├── SETUP.md             (Phase E deploy walkthrough — run when ready)
├── ASSESSMENT_RUBRIC.md (rubric for Engineering Portfolio + Final Defense)
├── index.html           (single HTML page hosting all 6 screens)
├── styles.css           (palette + screen layouts + grid + animations)
├── scenarios.js         (5 scenario definitions)
├── tech.js              (engineering catalog: 9 tech)
├── sprites.js           (isometric building SVGs + tech overlays + demos +
│                         damage states + rubble + hazard visuals)
├── case-studies.js      (9 historical events + HAZARD_TO_CASE_STUDY map)
├── game.js              (state, render, place, run, score, animation)
├── Code.gs              (Phase E — GAS server-side; setupSheets + save/load)
└── appsscript.json      (Phase E — GAS manifest with OAuth scopes)
```

## Scoring (post-Phase F)

Final score = `popPct × 45 + critPct × 25 + costEff × 20 + histAccPct × 10` (max 100)

- **Population saved (45%)** — what fraction of your total population survived
- **Critical infra intact (25%)** — what fraction of hospitals/schools/power stayed up
- **Cost efficiency (20%)** — peaks at 75% budget spent (penalises hoarders and over-builders alike)
- **Historical Awareness (10%)** — what fraction of placements made the historically-correct tech call for the dominant hazard at that tile (Phase F addition per brief §11 open Q7)

Grade bands: 90+ A, 80+ B, 70+ C, 60+ D, else F.

## Definition of Done audit (brief §12)

| # | Item | Status |
|---|---|---|
| 1 | Three Asian-focused scenarios playable (Tōhoku, Anatolian, Merapi) with new pyroclastic / lahar / reclaimed-land hazards | ✓ Done (Phase A) — plus Cascadia + Hawaii as alternates per user pick |
| 2 | All buildings rendered as SVG sprites (no emoji) | ✓ Done (Phase B) |
| 3 | Visible tech upgrades on tile sprites | ✓ Done (Phase B) |
| 4 | Four damage states render correctly post-disaster | ✓ Done (Phase C) |
| 5 | Disaster animation sequence (≤3 seconds) | ✓ Done (Phase C — total 2.5s) |
| 6 | 9 case studies included with text content | ✓ Done (Phase D) |
| 7 | Case studies surface in briefing + debrief contextually | ✓ Done (Phase D — debrief uses failure-mode-aware surfacing) |
| 8 | Standalone Case Study Library screen accessible from title | ✓ Done (Phase D) |
| 9 | GAS web app deployed; authenticated student identification works | ⏳ Phase E execution |
| 10 | Sessions sheet records all attempts with full placement JSON | ⏳ Phase E execution (Code.gs scaffolded) |
| 11 | "My Cities" past-attempts screen with view-only replay | ⏳ Phase E execution |
| 12 | Matthew can play through all three scenarios start-to-finish without bugs | 🟡 Manual verification needed |
| 13 | Matthew can open the Sheet and see his attempts logged | ⏳ Phase E execution |
| 14 | NGSS standards display on every scenario briefing and on the debrief screen | ✓ Done (Phase A) |
| 15 | Case Study Library includes NGSS tags per case study | ✓ Done (Phase D) |
| 16 | Teacher dashboard surfaces NGSS-by-scenario coverage matrix | ⏳ Phase E execution |
| 17 | At least one rubric template exists for the recommended Option A assessment | ✓ Done (Phase F — `ASSESSMENT_RUBRIC.md`) |

Legend: ✓ shipped · ⏳ deferred to Phase E execution · 🟡 needs your manual play-through

## Architecture notes

- Vanilla JS + inline SVG. No framework, no build step.
- Stays runnable as a single HTML page through Phase D + F.
- Phase E execution (when you run the deploy in SETUP.md) converts the file structure into the GAS HTML-include split (`index.html` + `styles.html` + `game.html` + `Code.gs`).
- DOM rendering only — no `innerHTML` anywhere. SVG sprites use DOMParser, which keeps the code XSS-safe by construction.
- Until Phase E execution lands, the public site at `/units/unit-3/tectonic-city-builder/` continues to iframe **v1**. When the GAS web app is live, update that page's iframe `src` (one-line change) to point at the GAS URL.

See `/CLAUDE.md` for the full v2 spec.
