# Paritsea — Editorial Rewrite Plan
**Document type:** Editorial execution roadmap. Phases activate when their dependencies are met.
**Created:** 2026-06
**Source:** Derived from editorial-decisions.md (D-039–D-042), content-audit.md (D-038), language-system.md (D-037)

> All six B-decisions are locked. Section A is approved. C-01 and C-02 await author input.
> This document is the execution sequence. It does not authorize content rewrites — each phase must be executed against the governance documents.

---

## Phase Overview Table

| Phase | Name | Track | Status | Can start |
|-------|------|-------|--------|-----------|
| 0 | Decision Closure | — | ✅ Complete | Done |
| 1 | Founder Narrative Extraction | A | 🔲 Blocked | After author available |
| 2 | About Strategy | A | 🔲 Blocked | After Phase 1 |
| 3 | About Rewrite | A | 🔲 Blocked | After Phase 2 |
| 4 | System Rewrite Planning | B | 🔲 Ready | **Now** |
| 5 | System Rewrite | B | 🔲 Ready | After Phase 4 |
| 6 | Implementation Rewrite | C | 🔲 Partial | B-04 now; C-02 after author |
| 7 | Journal Audit Refresh | B | 🔲 Ready | After Phase 5 |
| 8 | Journal Revision | B | 🔲 Ready | After Phase 7 |
| 9 | Sitewide Microcopy Pass | D | 🔲 Ready | After Phase 5 |
| 10 | Editorial QA | — | 🔲 Blocked | After all others |

---

## Dependency Map

```
Phase 0 (Decision Closure) ── ✅ COMPLETE
    │
    ├── Track B (unblocked)
    │   Phase 4 (System Planning)
    │       └── Phase 5 (System Rewrite)
    │               ├── Phase 7 (Journal Audit Refresh)
    │               │       └── Phase 8 (Journal Revision)
    │               └── Phase 9 (Microcopy Pass)
    │
    ├── Track C (partial)
    │   Phase 6 (Implementation Rewrite)
    │       B-04 fix: ready now
    │       C-02 (AgenSea): blocked on author
    │
    └── Track A (blocked — author required)
        Phase 1 (Founder Narrative Extraction)
            └── Phase 2 (About Strategy)
                    └── Phase 3 (About Rewrite)

All tracks ──► Phase 10 (Editorial QA)
```

---

## Critical Path

**Phase 4 → Phase 5 → Phase 7 → Phase 8 → Phase 10**

Track B is the only fully unblocked path to Phase 10. Track A (About) must also complete before Phase 10 may close. Track C and Track D are not on the critical path but must complete before Phase 10.

---

## Phase 0 — Decision Closure

| Field | Detail |
|-------|--------|
| **Status** | ✅ Complete |
| **Objective** | Lock all pre-rewrite editorial decisions |
| **Scope** | All six B-decisions; Section A approval; C-01/C-02 identification |
| **Deliverables** | `docs/editorial-decisions.md` (complete); D-039–D-042 logged |
| **Exit criteria** | All six B-decisions locked; Section A approved; rewrite-plan.md created |
| **Risk** | None — complete |

---

## Phase 1 — Founder Narrative Extraction

| Field | Detail |
|-------|--------|
| **Track** | A |
| **Status** | 🔲 Blocked — author availability required |
| **Objective** | Conduct the C-01a interview; extract raw origin story from author |
| **Scope** | Author answers the 20-question questionnaire in `editorial-decisions.md §C-01a` |
| **Inputs** | `docs/editorial-decisions.md §C-01a` (20-question questionnaire) |
| **Deliverables** | Raw written answers from author — unedited, in any form |
| **Dependencies** | Author must be available and willing to answer |
| **Exit criteria** | At minimum: one formative experience (Q1–Q5); one account of the lens (Q6–Q10); one answer to why systems + people are inseparable (Q6 or Q7); one answer to why Paritsea was built as it was (Q12–Q13) |
| **Risk** | HIGH — this content cannot be generated or inferred; only the author can provide it |

**Note:** The author does not need to answer all 20 questions. Depth on 6–8 questions is more valuable than surface answers to 20. Raw answers are better than edited ones.

---

## Phase 2 — About Strategy

| Field | Detail |
|-------|--------|
| **Track** | A |
| **Status** | 🔲 Blocked — Phase 1 required |
| **Objective** | Transform raw interview transcript into a structured About page content outline |
| **Scope** | Map interview responses to the About page role: origin of the lens, who holds it, why systems + people together |
| **Inputs** | Phase 1 interview transcript; `docs/ux-blueprint.md §8 About`; `docs/language-system.md §7 §8 About`; `docs/architecture.md` (About role: "Origin of the system + founder lens") |
| **Deliverables** | About page content outline — sections with copy direction per section; proposed EN and TH register notes |
| **Dependencies** | Phase 1 complete |
| **Exit criteria** | Outline covers: (1) origin — what happened that created the beneath-the-surface habit; (2) the lens — who holds it and from where they have stood; (3) why systems and people are inseparable in the author's experience; outline passes language-system.md §8 About altitude check (personal, first-person, non-promotional) |
| **Risk** | MEDIUM — depends on interview quality; if answers are thin, outline may require a second interview pass |

---

## Phase 3 — About Rewrite

| Field | Detail |
|-------|--------|
| **Track** | A |
| **Status** | 🔲 Blocked — Phase 2 required |
| **Objective** | Write the About page body (EN + TH) |
| **Scope** | Full rewrite of About page content — replaces current sections which answer the wrong question |
| **Inputs** | Phase 2 content outline; Phase 1 interview transcript; current About page; `docs/language-system.md §8 About`; `docs/paritsea-principles.md §Authorial voice` |
| **Deliverables** | About page copy — EN and TH; submitted to CMS or staged for author review |
| **Dependencies** | Phase 2 complete; author approval of the outline before writing begins |
| **Exit criteria** | Copy answers "Where does this lens come from, and who holds it?"; first-person voice; no promotional register; no credential enumeration; passes `language-system.md §10` rewrite evaluation checklist; content-audit.md About score rises from 5/10 to ≥ 8/10 |
| **Risk** | MEDIUM — voice match requires calibration; author review cycle expected |

**Affected file:** About page content in D1 (slug: `about`); rendered via `src/pages/[page_slug].astro`

---

## Phase 4 — System Rewrite Planning

| Field | Detail |
|-------|--------|
| **Track** | B |
| **Status** | 🔲 Ready — no prerequisites |
| **Objective** | Plan the B-03 split before execution: define the new Journal entry and produce the STP edit list |
| **Scope** | (1) Map the eight Journal-altitude sentences from the B-03 classification table into a new Journal entry outline; (2) define the new entry's slug, title, and thematic arc; (3) produce a line-by-line STP edit list — what to retain, what to move, what to delete |
| **Inputs** | `docs/editorial-decisions.md §B-03` (sentence-level classification table); `docs/language-system.md §8 Journal`; `docs/paritsea-principles.md §Tone calibration by layer` |
| **Deliverables** | (1) New Journal entry outline with slug, proposed title, thematic arc, and ordered observation sentences; (2) STP edit list (per-section: retain / extract / delete for every paragraph) |
| **Dependencies** | None — B-03 is locked (D-041) |
| **Exit criteria** | New entry outline is coherent at Journal altitude (essayistic, narrative, emotionally precise); STP edit list accounts for every sentence in the four mixed sections; both deliverables reviewed and approved before Phase 5 execution |
| **Risk** | LOW — planning only; no content changes |

---

## Phase 5 — System Rewrite

| Field | Detail |
|-------|--------|
| **Track** | B |
| **Status** | 🔲 Ready — after Phase 4 |
| **Objective** | Execute all System-layer content changes |
| **Scope** | Apply Section A (11 terminology fixes) + B-03 (STP split) + B-05 (position notes) + B-06 (Framework prominence) |
| **Inputs** | `docs/editorial-decisions.md §A`, `§B-03`, `§B-05`, `§B-06`; Phase 4 Journal entry outline and STP edit list |
| **Deliverables** | — |
| **Dependencies** | Phase 4 complete |
| **Exit criteria** | Zero "Doctrine" / "The Method" / "enforce" in `src/`; STP Protocol contains only Protocol-altitude content throughout; new Journal entry published and linked from STP as traceable precursor; Protocols and Standards pages have position notes in primary column; Framework authority section rendered at distinct structural prominence above document body |
| **Risk** | LOW (code/copy fixes); MEDIUM (D1 content edits — must use correct database path per CLAUDE.md) |

**Affected files:**

| Change | File |
|--------|------|
| A-01, A-04–A-06, A-10, A-11 | `src/components/StructuralIndexPage.astro` |
| A-07, A-08 | `src/utils/i18n.ts` |
| B-05 position notes | `src/components/StructuralIndexPage.astro` |
| B-06 Framework prominence | `src/pages/system/framework.astro` |
| B-03 STP edit | STP document in D1 via `npx emdash` admin or direct seed |
| B-03 new Journal entry | New entry in D1 (admin UI or seed) |

**D1 database note:** Seed to the active Miniflare file, not `data.db`. See CLAUDE.md for the correct path and `--on-conflict update` flag.

---

## Phase 6 — Implementation Rewrite

| Field | Detail |
|-------|--------|
| **Track** | C |
| **Status** | 🔲 Partial — B-04 fix ready now; C-02 blocked on author |
| **Objective** | Apply B-04 upward reference; update AgenSea entry when C-02 is available |
| **Scope** | `implementation.astro` integrationNote → upward reference (B-04); A-02 / A-03 / A-09 terminology fixes; AgenSea D1 entry update (C-02, when available) |
| **Inputs** | `docs/editorial-decisions.md §B-04`, `§A-02`, `§A-03`, `§A-09`; C-02 author response (when provided) |
| **Deliverables** | Updated `src/pages/implementation.astro`; updated AgenSea entry in D1 (when C-02 available) |
| **Dependencies** | B-04 fix: none. C-02 update: author must provide observable evidence sentence and active/provisional determination |
| **Exit criteria** | integrationNote replaced with one-line upward reference ("Governed by Protocols and Standards"); "The Method" and "enforce doctrine" absent from implementation.astro; H1 reads "Implementation" (singular); AgenSea entry contains an observable evidence sentence (not scope declaration) when C-02 is provided |
| **Risk** | LOW (B-04 + A fixes); MEDIUM (AgenSea — depends on current platform state) |

**Affected files:** `src/pages/implementation.astro`; AgenSea entry in D1

---

## Phase 7 — Journal Audit Refresh

| Field | Detail |
|-------|--------|
| **Track** | B |
| **Status** | 🔲 Ready — after Phase 5 |
| **Objective** | Re-audit all Journal entries against language-system.md after the new Journal entry (from B-03 split) is live |
| **Scope** | All Journal entries; focus on the new entry for altitude accuracy and register consistency with existing entries |
| **Inputs** | `docs/language-system.md §8 Journal`; new Journal entry (Phase 5); all existing Journal entries |
| **Deliverables** | Refresh audit — list of Journal entries passing or requiring revision; new entry assessed |
| **Dependencies** | Phase 5 complete (new Journal entry must be live) |
| **Exit criteria** | All Journal entries assessed; entries requiring revision listed with specific issues; new entry confirmed at Journal altitude |
| **Risk** | LOW |

---

## Phase 8 — Journal Revision

| Field | Detail |
|-------|--------|
| **Track** | B |
| **Status** | 🔲 Ready — after Phase 7 |
| **Objective** | Apply revision findings from Phase 7 to flagged Journal entries |
| **Scope** | Only entries flagged in Phase 7 audit |
| **Inputs** | Phase 7 audit findings; `docs/language-system.md §8 Journal`; `docs/paritsea-principles.md §Authorial voice` |
| **Deliverables** | Revised Journal entries in D1 |
| **Dependencies** | Phase 7 complete |
| **Exit criteria** | All flagged entries pass `language-system.md §10` rewrite evaluation checklist; no entry carries System or Implementation altitude language |
| **Risk** | LOW |

---

## Phase 9 — Sitewide Microcopy Pass

| Field | Detail |
|-------|--------|
| **Track** | D |
| **Status** | 🔲 Ready — after Phase 5 recommended (can run independently) |
| **Objective** | Apply B-01 (remove Sessions block) and B-02 (replace comparative heading) to Home; verify no remaining microcopy violations |
| **Scope** | `src/pages/index.astro` — Sessions block removal, heading replacement; any remaining microcopy issues not covered in Phase 5 |
| **Inputs** | `docs/editorial-decisions.md §B-01`, `§B-02`; `docs/language-system.md`; `docs/ux-blueprint.md §1 Home` |
| **Deliverables** | Updated `src/pages/index.astro` — Sessions block removed; comparative heading replaced with blueprint-approved label |
| **Dependencies** | B-01 and B-02 are locked (D-040); no technical dependencies. Run after Phase 5 to avoid coordination overhead |
| **Exit criteria** | Sessions block absent from Home; no "Ideas that go beyond Motivation" heading; no comparative framing anywhere on Home; worldview copy lines (four locked sentences in `paritsea-principles.md`) unchanged; hero blueprint matches `ux-blueprint.md §1` |
| **Risk** | LOW for Sessions removal and heading; HIGH risk of worldview damage is avoided by strict scope constraint — no worldview lines may be touched |

**Affected file:** `src/pages/index.astro`

---

## Phase 10 — Editorial QA

| Field | Detail |
|-------|--------|
| **Track** | — |
| **Status** | 🔲 Blocked — all other phases must complete first |
| **Objective** | Final pre-publish editorial review across all pages and content entries |
| **Scope** | All pages; all content entries; all UX copy — assessed against all governance documents |
| **Inputs** | All updated files; `docs/language-system.md §10` (rewrite evaluation checklist); `docs/content-audit.md` (scoring rubric); `docs/content-governance.md` (altitude law) |
| **Deliverables** | QA report — per-page scores and pass/fail; sign-off or remediation list |
| **Dependencies** | Phases 1–9 all complete (or explicitly deferred with rationale) |
| **Exit criteria** | All pages score ≥ 8/10 on content-audit.md rubric; zero governance violations (altitude, terminology, register); zero instances of deprecated vocabulary; worldview sentences intact; all A and B terminology fixes confirmed applied |
| **Risk** | LOW if all prior phases are executed correctly; any skipped phase creates latent risk |

---

## Current Next Action

**Phase 4 — System Rewrite Planning**

Begin immediately. No prerequisites.

1. Read the B-03 classification table in `docs/editorial-decisions.md §B-03`
2. Map the eight Journal-altitude sentences into a coherent narrative arc — this becomes the new Journal entry
3. Propose a slug and title for the new entry (must be an SEO-friendly English URL segment per CLAUDE.md)
4. Produce a per-section STP edit list (retain / extract / delete for each paragraph across all four mixed sections)
5. Present for author review before Phase 5 execution begins

---

*Created 2026-06 from editorial-decisions.md (D-041) and all prior governance documents. Update phase statuses as each phase completes.*
