# Engineering Design Portfolio + Final Defense — Rubric

Use this rubric for the **Engineering Design Portfolio + Final Defense** assessment described in `/CLAUDE.md` §1c (Option A — recommended). It scores the multi-week mini-project where students iterate on a chosen scenario in the Tectonic City Builder, log their reasoning, and defend their final design to a peer panel.

Four dimensions × 4 points each = **16 total**.

Aligns with AISC's K/U · T/T · C strand reporting: see `hs-earth-env-site/src/foundations/the-rubric.njk` for how these four dimensions map back to the three-strand course rubric.

---

## 1. Science Accuracy — 4 pts

How correctly does the student identify the boundary type, hazards, and tech needs for their chosen city?

| Band | Descriptor |
|---|---|
| **4 Exemplary** | Correctly identifies the boundary type, names the specific plate pair, accurately lists every dominant hazard for that boundary type with the geologic mechanism for each, and correctly matches engineering tech to hazards (including identifying hazards with *no* engineering defense). |
| **3 Proficient** | Correctly identifies the boundary type and dominant hazards; minor imprecision in mechanism (e.g. correct in spirit but missing a key step). Tech-to-hazard matches are mostly right. |
| **2 Developing** | Identifies the boundary type but blurs hazards or mechanisms (e.g. treats all volcanoes as the same; doesn't distinguish pyroclastic from lava). Some tech-to-hazard matches are wrong. |
| **1 Limited** | Misidentifies the boundary type, or names hazards generically without mechanism, or treats engineering tech as a generic "more = safer" rather than hazard-specific. |

## 2. Engineering Reasoning — 4 pts

Are decisions justified with cost / benefit / risk logic, not just "I bought everything"?

| Band | Descriptor |
|---|---|
| **4 Exemplary** | Every major placement is justified explicitly with reference to the tile's hazard profile, the budget trade-off, and what was *not* bought and why. Demonstrates clear understanding that engineering is trade-offs, not perfection. Includes at least one decision where the student deliberately accepted a known risk to optimise elsewhere. |
| **3 Proficient** | Most placements are justified with hazard-specific logic. Some decisions are explained generically ("I added more protection here"). Recognises the budget constraint but doesn't always weigh trade-offs. |
| **2 Developing** | Justifications are inconsistent — some placements are reasoned about, others appear arbitrary. "I bought everything I could afford" appears in the reasoning. Doesn't engage with trade-offs. |
| **1 Limited** | Decisions appear random or are justified by "I thought it would help." No engagement with budget as a constraint or with hazard specificity. |

## 3. Iteration Evidence — 4 pts

Did attempts show measurable learning across iterations (score growth, smarter placements over time)?

| Band | Descriptor |
|---|---|
| **4 Exemplary** | Three or more Sheet-logged attempts. Score growth across attempts is clear AND each iteration's journal entry names a specific decision change with a prediction-vs-outcome reflection. The student can articulate what they learned each time. Comparative reflection identifies a specific decision change and links it to a specific geology concept. |
| **3 Proficient** | Three Sheet-logged attempts. Score growth is present. Most iteration journals include prediction + reflection. Comparative reflection is present but covers expected rather than non-obvious learning. |
| **2 Developing** | Three attempts logged. Score growth modest or flat. Journal entries are present but generic ("I made some changes"). Comparative reflection summarises rather than analyses. |
| **1 Limited** | Fewer than three attempts logged, OR no journal entries, OR no comparative reflection. Iteration is mechanical rather than learning-driven. |

## 4. Historical Synthesis — 4 pts

Does the defense reference real case studies with accurate, substantive use of evidence?

| Band | Descriptor |
|---|---|
| **4 Exemplary** | Defense references at least *two* case studies. Each reference is specific to an engineering claim the student is making (e.g. "Tōhoku showed seawalls sized for the expected event fail at M9 run-up heights, which is why I spent on tsunami walls AND relocated my hospitals inland"). Cites the case studies in primary-source detail (date, magnitude, specific lesson). |
| **3 Proficient** | Two case studies referenced. Most are tied to engineering claims; one may be more general ("Tōhoku was a disaster"). Primary-source details mostly accurate. |
| **2 Developing** | One case study referenced substantively, with another mentioned in passing. References are general ("Pompeii happened a long time ago") rather than evidence-tied. |
| **1 Limited** | No case studies referenced, or references are factually wrong, or case studies are decorative ("Like in Kobe") without tying to a specific engineering claim. |

---

## Reporting

- Score each dimension 1–4, then sum for /16.
- Optionally translate to a letter grade: 14–16 A, 11–13 B, 8–10 C, 5–7 D, ≤4 F.
- Report as a 4-tuple (e.g. "SA 4 · ER 3 · IE 4 · HS 3 = 14/16") to preserve diagnostic signal across dimensions.

## Connecting to AISC strand reporting (K/U · T/T · C)

If you also need to report on the AISC three-strand structure used in `hs-earth-env-site/src/foundations/the-rubric/`:

| Strand | Maps to |
|---|---|
| **K/U Knowledge & Understanding** | Science Accuracy |
| **T/T Thinking & Transfer** | Engineering Reasoning + Iteration Evidence (average) |
| **C Communication** | Historical Synthesis + defense delivery quality |

The 4-point bands here translate to AISC's 1–8 band scale roughly as: 4 → 7–8 (exemplary), 3 → 5–6 (proficient), 2 → 3–4 (developing), 1 → 1–2 (limited).
