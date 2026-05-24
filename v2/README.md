# Tectonic City Builder v2

In-development rewrite of the v1 simulator at the repo root.

## Run it locally

No build step. Open `index.html` in any modern browser. That's it.

```bash
open index.html
```

## Phase status

| Phase | Status | What it adds |
|---|---|---|
| **A** — Foundation + 5 scenarios | In progress | v2/ codebase split, 5 scenarios (Tōhoku, Cascadia, Anatolian, Merapi, Hawaii), gameplay loop with emoji buildings, NGSS standards on briefing/debrief |
| **B** — Visual building system | Planned | Inline SVG sprite library, composable tech overlays |
| **C** — Damage state system | Planned | 4 visual damage states, disaster animation sequence |
| **D** — Historical case studies | Planned | 9 case studies + briefing/debrief integration + standalone library |
| **E** — Google Sheets backend | Planned | clasp setup, Code.gs, Sessions Sheet, "My Cities", teacher dashboard |
| **F** — Polish + Definition-of-Done | Planned | Historical-accuracy scoring multiplier, rubric template, full playthrough verification |

## File layout

```
v2/
├── README.md         (this file)
├── index.html        (single HTML page hosting all screens)
├── styles.css        (palette + screen layouts + grid)
├── scenarios.js      (5 scenario definitions with full data)
├── tech.js           (engineering catalog: 9 tech)
└── game.js           (state, render, place, run, score, screen transitions)
```

## Architecture notes

- Vanilla JS + inline SVG (planned for Phase B). No framework, no build step.
- Stays runnable as a single HTML page through Phase D.
- Phase E converts the file structure into the GAS-friendly split (`index.html` + `styles.html` + `game.html` + `Code.gs`) per the brief.
- Until v2 reaches Phase C/D, the site at `/units/unit-3/tectonic-city-builder/` continues to iframe v1.

See `../CLAUDE.md` for the full v2 spec.
