# Paritsea — Project State
**Document type:** Operational snapshot. Update after every approved phase.
**Last updated:** 2026-06
**Updated by:** Editorial rewrite complete (Phases 0–10); Phase 10 QA report delivered; project-state.md synced

---

## Current phase

**Phase 10 — Editorial QA** (complete — verified)

All 10 editorial phases delivered. Phase 10 QA report confirms:
- 11/11 Section A terminology fixes applied ✅
- All 6 B-decisions (B-01 through B-06) applied ✅
- Zero `การประยุกต์ใช้` in `src/` ✅
- Zero "Doctrine"/"The Method"/"enforce" in user-facing copy ✅
- STP B-03 split executed (Protocol-only + Journal entry `aesthetic-transparency`) ✅
- B-05 position notes in primary column ✅
- B-06 Framework prominence block ✅
- B-04 upward reference in Implementation ✅
- C-02 resolved (AgenSea: Provisional, observable evidence written) ✅
- C-01 (About origin narrative) — BLOCKED — author interview responses required
- Search Console sitemap submission (manual action)

**Next: Phase 9 — Annual Drift Audit** (recurring, first audit in 2027)

---

## Editorial Rewrite Status

All editorial rewrite phases from `docs/rewrite-plan.md` are complete.

| Phase | Name | Track | Status |
|-------|------|-------|--------|
| 0 | Decision Closure | — | ✅ Complete |
| 1 | Founder Narrative Extraction | A | ✅ Complete |
| 2 | About Strategy | A | ✅ Complete |
| 3 | About Rewrite | A | ✅ Complete |
| 4 | System Rewrite Planning | B | ✅ Complete — system-rewrite-plan.md delivered; author approved |
| 5 | System Rewrite | B | ✅ Complete — B-03 executed (STP + Journal), Section A + B-05 + B-06 applied |
| 6 | Implementation Rewrite | C | ✅ Complete — B-04 applied; C-02 resolved (AgenSea: Provisional) |
| 7 | Journal Audit Refresh | B | ✅ Complete — all 6 entries pass |
| 8 | Journal Revision | B | ✅ Complete — TH translation for aesthetic-transparency added |
| 9 | Sitewide Microcopy Pass | D | ✅ Complete — B-01/B-02 confirmed absent |
| 10 | Editorial QA | — | ✅ Complete — phase-10-qa-report.md delivered |

### Remaining items

1. 🔲 **Production D1 parity** — sync `paritsea-site` production D1 `licensing` and `contact` pages to match local dev (see phase-10-qa-report.md §6) — requires author sign-off on SQL
2. 🔲 **C-01 (About origin narrative)** — BLOCKED — author interview responses required
3. 🔲 **Search Console sitemap submission** — manual action

---

## Completed phases

| Phase | Name | Completed | Notes |
|-------|------|-----------|-------|
| Phase 0 | Documentation | ✅ 2026-06 | All 6 source-of-truth docs authored and approved |
| Phase 0 | Consistency Audit | ✅ 2026-06 | 22 issues identified; 6 critical blockers resolved |
| Phase 1 | Routing & Redirects | ✅ 2026-06 | All 9 redirect patterns verified; /system hub live; sitemap + RSS + llms.txt updated |
| Phase 2 | Navigation | ✅ 2026-06 | Seed menu updated; System dropdown + mobile accordion; navLabels; footer links; nav-doctrine→nav-framework; active states |
| Phase 3 | Home Labels | ✅ 2026-06 | Hero CTA labels + hrefs; hero-map labels + hrefs; records eyebrow + link; closing attr; B-01 TS fix |
| Phase 4 | UX Copy | ✅ 2026-06 | D-028/D-029 language system applied; all nav English; Thai body terms updated; LinkedIn link on About; TypeScript fixes |
| Phase 5 | Breadcrumbs & Contextual Nav | ✅ 2026-06 | System sub-page breadcrumbs (D-018); Journal lateral + System bridge tail; Implementation protocol tail; F-01/F-02 nav fixes |
| Phase 6 | SEO Audit & Verification | ✅ 2026-06 | All 301s verified; sitemap clean; canonical bug fixed (Astro.site.origin); RSS Journal-only; OG fallback image; hreflang verified |
| Phase 7 | Architecture: /system Hub | ✅ 2026-06 | Full hub page: 5 blueprint sections + bilingual copy + derivation chain + layer spine; D-034 |
| Phase 8 | Content Activation | ✅ 2026-06 | Soft gate passed; all SEO requirements verified; content altitude check passed |
| Phase 9 | Annual Drift Audit | 🔲 2027 | Recurring; first audit in 2027 |
| Phase 10 | Editorial QA | ✅ 2026-06 | Full QA report delivered; all Phases 0–9 verified |

---

## Approved documentation

All files in `docs/` are production-locked source-of-truth documents.

| File | Status | Purpose |
|------|--------|---------|
| `docs/architecture.md` | ✅ Approved | Site structure, URL map, taxonomy keys, homepage protection |
| `docs/language-system.md` | ✅ Approved | Editorial and language governance — all future copy must pass this system |
| `docs/content-audit.md` | ✅ Approved | Full content audit — 10 pages + 5 collections + 7 UX copy categories; 3-priority rewrite plan; overall 7.0/10 |
| `docs/editorial-decisions.md` | ✅ Active | Pre-rewrite decision register — 11 approved terminology fixes (Section A); ALL B-decisions locked (B-01 through B-06); About interview questionnaire (Section C) |
| `docs/rewrite-plan.md` | ✅ Active | 10-phase editorial roadmap — Phase 0 (complete) through Phase 10 (QA); dependency map; critical path |
| `docs/system-rewrite-plan.md` | ✅ Active | Phase 4 deliverable — B-03 Journal entry outline + STP edit list; author-approved |
| `docs/phase-10-qa-report.md` | ✅ Active | Final QA verification — all terminology fixes, B-decisions confirmed applied |
| `docs/navigation-model.md` | ✅ Approved | Intent mapping, nav behavior rules, cross-layer flows |
| `docs/ux-blueprint.md` | ✅ Approved | Per-page section structure, CTAs, linking rules |
| `docs/content-governance.md` | ✅ Approved | Content altitude law, anti-drift rules, classification tree |
| `docs/paritsea-principles.md` | ✅ Approved | Voice, worldview, IP, long-term coherence principles |
| `docs/roadmap.md` | ✅ Approved | Phase roadmap, dependencies, gates, completion checklist |
| `docs/project-state.md` | ✅ Active | This file — operational snapshot |
| `docs/decision-log.md` | ✅ Active | Chronological decision record |

---

## Implementation status (code)

| Item | Status |
|------|--------|
| `src/utils/public-paths.ts` — new URL segment map | ✅ Done |
| Route files: `journal.astro`, `system/framework.astro`, `system/protocols.astro`, `system/standards.astro`, `implementation.astro` | ✅ Done |
| Catch-all post route `src/pages/[...path].astro` | ✅ Done |
| `src/pages/system/index.astro` — `/system` hub page (structural HTML) | ✅ Done |
| `src/middleware.ts` — 301 redirects (9 old URL patterns) | ✅ Done |
| `seed/seed.json` — primary menu restructure | ✅ Done |
| `src/layouts/Base.astro` — nav dropdown + active state + mobile accordion | ✅ Done |
| `src/utils/i18n.ts` — navLabels full update | ✅ Done |
| `src/pages/index.astro` — Home label updates (labels only, no copy) | ✅ Done |
| UX copy per page (per ux-blueprint.md) — language system applied, Implementation terms updated | ✅ Done |
| Breadcrumb component (`System / [sub-page]`) | ✅ Done |
| Journal Post end-of-article tail template | ✅ Done |
| Section A terminology fixes (11/11) — applied and QA-verified | ✅ Done |
| B-decisions (B-01 through B-06) — applied and QA-verified | ✅ Done |
| STP B-03 split — Journal entry `aesthetic-transparency` live | ✅ D1 |
| C-02 AgenSea — Provisional status applied | ✅ Done |
| Production deploy | ❌ Not yet |

---

## Active blockers

**None blocking editorial completion.**

### Open items

| ID | Issue | Status |
|----|-------|--------|
| C-01 | About origin narrative — requires author interview responses | 🔲 BLOCKED |
| — | Production D1 parity — sync `licensing`/`contact` pages (see phase-10-qa-report.md §6) — requires author sign-off | 🔲 Manual |
| — | Search Console sitemap submission | 🔲 Manual |

### Low-priority technical debt (Phase 2 review)

| ID | Finding | Priority |
|----|---------|---------|
| F-01 | Plain nav items have no server-side active state. CSS `a[aria-current="page"]` exists but Astro SSR does not auto-inject `aria-current`. | Low |
| F-02 | JS `mobileBreakpoint` uses `max-width: 760px`; CSS hamburger activates at `≤960px`. Menu close-on-link-click doesn't fire between 760–960px. | Low |

---

## Convention

When a phase completes:
1. Move the phase entry to "Completed phases" table with date.
2. Update the "Implementation status" table.
3. Clear resolved blockers from "Active blockers."
4. Update "Current phase" and "Current implementation target."
5. Add decisions to `decision-log.md`.
6. Update `Last updated` and `Updated by` fields at the top.