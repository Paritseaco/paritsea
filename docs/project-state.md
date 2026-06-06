# Paritsea — Project State
**Document type:** Operational snapshot. Update after every approved phase.
**Last updated:** 2026-06
**Updated by:** Phase 8 — 5 editorial decisions locked (D-040); B-03 open; Section A + B-01/B-02/B-04/B-05/B-06 ready to implement

---

## Current phase

**Phase 8 — Content Activation** (complete — soft gate passed)

Phase 6 is complete and approved. All SEO requirements verified. Canonical bug fixed. RSS scoped. OG fallback active.

**Active priorities:**
1. ✅ Altitude check passed on all published content
2. ✅ CG-01 versioning governance defined (D-035)
3. ✅ CG-02 mixed-language rule defined (D-036)
4. ✅ Language system created — editorial governance for all future copy (D-037)
5. ✅ Full content audit created — 7.0/10 overall; 3-priority rewrite plan defined (D-038)
6. ⚠️ Implementation layer empty (optional — soft gate permits this)
7. ✅ Editorial decisions document created — 11 approved fixes + 6 author decisions + author interview questionnaire (D-039)
8. ✅ 5 editorial decisions locked — B-01/B-02/B-04/B-05/B-06 approved (D-040)
9. 🔲 **Section A (11 terminology fixes) — READY TO IMPLEMENT** — no prerequisites remain
10. 🔲 **B-01/B-02/B-04/B-05/B-06 — READY TO IMPLEMENT** — no prerequisites remain
11. 🔲 B-03 (STP full document) — OPEN — author selects Option A (split) / Option B (remove) / Option C (retain)
12. 🔲 C-01 (About origin narrative) — BLOCKED — author interview responses required
13. 🔲 C-02 (AgenSea evidence) — BLOCKED — author knowledge required
14. 🔲 Search Console sitemap submission (manual action)

**Next: Phase 9 — Annual Drift Audit** (recurring, first audit in 2027)

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
| Architecture | /system Hub | ✅ 2026-06 | Full hub page: 5 blueprint sections + bilingual copy + derivation chain + layer spine; D-034 |

---

## Approved documentation

All files in `docs/` are production-locked source-of-truth documents.

| File | Status | Purpose |
|------|--------|---------|
| `docs/architecture.md` | ✅ Approved | Site structure, URL map, taxonomy keys, homepage protection |
| `docs/language-system.md` | ✅ Approved | Editorial and language governance — all future copy must pass this system |
| `docs/content-audit.md` | ✅ Approved | Full content audit — 10 pages + 5 collections + 7 UX copy categories; 3-priority rewrite plan; overall 7.0/10 |
| `docs/editorial-decisions.md` | ✅ Active | Pre-rewrite decision register — 11 approved terminology fixes (Section A); B-01/B-02/B-04/B-05/B-06 locked; B-03 open; About interview questionnaire (Section C) |
| `docs/navigation-model.md` | ✅ Approved | Intent mapping, nav behavior rules, cross-layer flows |
| `docs/ux-blueprint.md` | ✅ Approved | Per-page section structure, CTAs, linking rules |
| `docs/content-governance.md` | ✅ Approved | Content altitude law, anti-drift rules, classification tree |
| `docs/paritsea-principles.md` | ✅ Approved | Voice, worldview, IP, long-term coherence principles |
| `docs/roadmap.md` | ✅ Approved | Phase roadmap, dependencies, gates, completion checklist |
| `docs/project-state.md` | ✅ Active | This file — operational snapshot |
| `docs/decision-log.md` | ✅ Active | Chronological decision record |

---

## Active blockers

**None blocking Phase 4.**

### Open items from consistency audit (non-blocking)

| ID | Issue | Blocks | Due before |
|----|-------|--------|-----------|
| MD-05 | Protocol/Standard list vs document structure ambiguous | Phase 4 UX copy | Phase 4 |
| MD-06 | Journal Post System bridge mechanism undefined | Phase 5 | Phase 5 |
| MD-07 | "Related Journal entries" algorithm undefined | Phase 5 | Phase 5 |
| MD-08 | Implementation → "which Protocol to link" undefined | Phase 5 | Phase 5 |
| SEO-01 | `/system` hub canonical + hreflang strategy missing | Phase 6 | Phase 6 |
| SEO-02 | RSS feed scope (Journal-only vs all) undefined | Phase 6 | Phase 6 |
| SEO-03 | OG image fallback for static/hub pages missing | Phase 6 | Phase 6 |
| CG-01 | Protocol/Standard versioning governance undefined | Phase 8 | Phase 8 |
| CG-02 | Mixed-language post handling undefined | Phase 8 | Phase 8 |
| CG-03 | Content retirement governance undefined | Phase 9 | Phase 9 |

### Low-priority technical debt from Phase 2 review

| ID | Finding | Priority | Phase |
|----|---------|---------|-------|
| F-01 | Plain nav items (`Journal`, `Implementation`, `About`) have no server-side active state. CSS rule `a[aria-current="page"]` exists but Astro SSR does not auto-inject `aria-current`. | Low | Phase 5 |
| F-02 | JS `mobileBreakpoint` uses `max-width: 760px`; CSS hamburger activates at `≤960px`. Gap: menu close-on-link-click doesn't fire between 760–960px (pre-existing, not Phase 2 regression). | Low | Phase 5 |

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
| UX copy per page (per ux-blueprint.md) | ❌ Phase 4 |
| Breadcrumb component (`System / [sub-page]`) | ❌ Phase 5 |
| Journal Post end-of-article tail template | ❌ Phase 5 |
| Production deploy | ❌ Phase 7 |

---

## Current implementation target (Phase 4 — UX Copy + Language System)

**Objective:** Apply the reconciled two-model language system across all UX copy, fully English nav, and the Thai Implementation terminology change.

**Confirmed rulings (this sync):**
1. **Model A** (Journal / System / Implementation) = structural architecture truth.
2. **Model B** (Entry / Gateway / Core) = language-exposure overlay applied *on top of* Model A.
3. Pipeline terms (Journal / System / Implementation / Framework) are **Entry-layer** vocabulary — allowed in user-facing UI and nav.
4. `language-hierarchy.md` example words are **PRESCRIPTIVE** vocabulary, not illustrative.
5. Thai Implementation **body content** uses **"การนำไปปรับใช้จริง"**. Legacy **"การประยุกต์ใช้" is deprecated and removed.**
6. **Navigation is fully English** — no Thai nav terms remain (โปรโตคอล → Protocols, มาตรฐาน → Standards).

**Code deliverables:**
- `src/utils/i18n.ts` — TH navLabels Protocols/Standards → English; `labels.implementation` + `viewImplementations` → การนำไปปรับใช้จริง
- `src/pages/implementation.astro` — all body การประยุกต์ใช้ → การนำไปปรับใช้จริง
- `src/components/UsageGuidance.astro` — same
- `src/layouts/Base.astro` — nav fallback → English "Implementation"
- `src/pages/index.astro` — `viewImplementations` Thai term

**Success criteria:**
- Zero `การประยุกต์ใช้` in `src/`
- TH nav renders Protocols / Standards in English (no โปรโตคอล / มาตรฐาน)
- Implementation body copy reads การนำไปปรับใช้จริง consistently
- No worldview paragraph changed

---

## Next milestone

**Phase 4 gate:** Language system applied + per-page UX copy verified in dev → Phase 5 (Breadcrumbs + Contextual Nav) may begin.

---

## Future phases

| Phase | Name | Depends on | Approx scope |
|-------|------|------------|-------------|
| Phase 3 | Home Labels | Phase 2 ✅ | `index.astro` label strings + hrefs — **current** |
| Phase 4 | UX Copy | Phase 3 | Per-page intros, System hub copy, altitude-correct text, LinkedIn badge on About |
| Phase 5 | Breadcrumbs + Contextual Nav | Phase 4 | Breadcrumb component, Journal Post tail, Implementation tail; F-01 + F-02 fixes |
| Phase 6 | SEO Audit | Phase 5 | 301 crawl, sitemap, canonicals, hreflang, OG images |
| Phase 7 | Production Deploy | Phase 6 | `npm run deploy` + post-deploy validation |
| Phase 8 | Content Activation | Phase 7 | Publish first complete content set per Content Governance altitude rules |
| Phase 9 | Annual Drift Audit | Phase 8 | Recurring; altitude check, link audit, docs review |

---

## Convention

When a phase completes:
1. Move the phase entry to "Completed phases" table with date.
2. Update the "Implementation status" table.
3. Clear resolved blockers from "Active blockers."
4. Update "Current phase" and "Current implementation target."
5. Add decisions to `decision-log.md`.
6. Update `Last updated` and `Updated by` fields at the top.
