# Paritsea — Production Roadmap
**Status:** Active planning document.
**Last reviewed:** 2026-06-03
**Architecture locked:** Yes — do not modify structure without a new IA decision record.
**Current phase:** Phase 4 — UX Copy (Language System sync applied)

---

## Governing structure

This roadmap is an execution plan subordinate to `docs/semantic-constitution.md` and all source-of-truth docs. Authority hierarchy:

1. Semantic Constitution
2. Model A — Structural Pipeline (Journal → System → Implementation)
3. Model B — Language Hierarchy (Entry → Gateway → Core)
4. UX / Copy / Implementation
5. This roadmap

**Model A** is the architectural truth: where content lives, how pages and routes are organized.
**Model B** is the cognitive vocabulary exposure overlay applied *on top of* Model A — governing which words may appear at which reading depth. Model B does not compete with or replace Model A. They operate on different axes.

Pipeline terms (Journal / System / Implementation / Framework) are **Entry-layer vocabulary** and are permitted in navigation and user-facing UI. Core ontology vocabulary (Cognitive Pattern, Recursive Thought Structure, Perception Architecture) is reserved for deep content only — never navigation or onboarding.

---

## Completed phases (summary only)

| Phase | Name | Completed | Key deliverables |
|-------|------|-----------|-----------------|
| Phase 0 | Documentation | ✅ 2026-06 | All source-of-truth docs authored and approved |
| Phase 1 | Routing & Redirects | ✅ 2026-06 | All 9 redirect patterns; `/system` hub route; sitemap + RSS + llms.txt verified |
| Phase 2 | Navigation | ✅ 2026-06 | Seed menu restructure; System dropdown + mobile accordion; navLabels updated; footer nav; `nav-doctrine` → `nav-framework`; active states |
| Phase 3 | Home Labels | ✅ 2026-06 | Hero CTA labels + hrefs; hero-map labels + hrefs; records eyebrow + link; closing attribution; B-01 TypeScript fix |

---

## NEXT ACTIONS ONLY

---

### PHASE 4 — UX Copy (CURRENT ⏳)

**Type:** UX copy · Language System implementation
**Objective:** Apply the reconciled two-model language system across all UX copy. Every page has copy at the correct altitude. Navigation is fully English. Thai Implementation body copy updated to approved term.
**Dependencies:** Phase 3 complete (✅).

---

#### Language system rulings governing this phase (D-028, D-029)

1. **Model A** (Journal / System / Implementation) = structural truth; governs pages, routes, navigation.
2. **Model B** (Entry / Gateway / Core) = vocabulary depth overlay applied *on top of* Model A.
3. Pipeline terms (Journal / System / Implementation / Framework) = **Entry-layer** vocabulary — allowed in nav and user-facing UI.
4. `language-hierarchy.md` vocabulary lists are **prescriptive**, not illustrative.
5. **Navigation is fully English.** No Thai navigation terms remain in any locale.
6. **Thai body content** for Implementation: **"การนำไปปรับใช้จริง"**. Legacy **"การประยุกต์ใช้" is deprecated** — remove from all source.
7. Attribution format: name only — `— Parit Ritchai` (EN) / `— ปาริศ ฤทธิ์ชัย` (TH). No source label appended.

---

#### Deliverables — Language system code changes (D-029)

| File | Change |
|------|--------|
| `src/utils/i18n.ts` | TH navLabels: `โปรโตคอล` → `Protocols`; `มาตรฐาน` → `Standards`; `labels.implementation` + `viewImplementations` → `การนำไปปรับใช้จริง` |
| `src/pages/implementation.astro` | All `การประยุกต์ใช้` → `การนำไปปรับใช้จริง` |
| `src/components/UsageGuidance.astro` | All `การประยุกต์ใช้` → `การนำไปปรับใช้จริง` |
| `src/layouts/Base.astro` | Nav fallback for Implementation → English `"Implementation"` |
| `src/pages/index.astro` | `viewImplementations` Thai term → `การนำไปปรับใช้จริง` |

**Verification:** Zero occurrences of `การประยุกต์ใช้` in `src/` after this step.

---

#### Deliverables — Per-page UX copy (per `docs/ux-blueprint.md`)

| Page | Copy needed |
|------|-------------|
| `/system` (hub) | Layer definition (1–2 sentences); 3 sub-page card descriptions (one-line role each); derivation statement |
| `/journal` | Layer intro (1–2 lines: observation, not yet governed) |
| `/implementation` | Layer intro (applied systems); "the rule behind this →" tail text |
| `/system/framework` | Immutability/authority note; derivation statement ("Protocols & Standards derive from this") |
| `/system/protocols` | Position note ("derives from Framework, sits above Standard"); `derivedFromText` |
| `/system/standards` | Position note ("operates beneath Protocols"); obligation/threshold disambiguation |
| `About` | All sections per `ux-blueprint.md`; LinkedIn badge in founder bio section (D-025) |

---

#### LinkedIn Badge — About page (D-025)

Placement: `.about-founder` block, below bio text, above social links. Wrapped in `<div class="about-founder-linkedin">`.

**Constraint:** Verify at implementation that SE Ocean's visual weight does not exceed "Parit Ritchai / Architect of Paritsea" identity. If SE Ocean dominates visually, fall back to a plain `<a href>` LinkedIn link instead.

```html
<!-- Light -->
<div class="badge-base LI-profile-badge" data-locale="th_TH" data-size="medium" data-theme="light" data-type="HORIZONTAL" data-vanity="parit-ritchai" data-version="v1">
  <a class="badge-base__link LI-simple-link" href="https://th.linkedin.com/in/parit-ritchai?trk=profile-badge">Parit Ritchai</a>
</div>

<!-- Dark -->
<div class="badge-base LI-profile-badge" data-locale="th_TH" data-size="medium" data-theme="dark" data-type="HORIZONTAL" data-vanity="parit-ritchai" data-version="v1">
  <a class="badge-base__link LI-simple-link" href="https://th.linkedin.com/in/parit-ritchai?trk=profile-badge">Parit Ritchai</a>
</div>
```

```html
<script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
```

Implementation rules:
- Render **both** light + dark variants in HTML; CSS show/hide responds to `.dark` class
- Size `data-size="medium"` — large may overflow at mobile
- Load LinkedIn script on About page only (not global)
- Plain `<a>` inside badge div is the automatic fallback if script is blocked

---

#### Success criteria

- Zero `การประยุกต์ใช้` in `src/`
- TH nav renders `Protocols` / `Standards` in English — no `โปรโตคอล` / `มาตรฐาน`
- Implementation body copy reads `การนำไปปรับใช้จริง` consistently
- Each page intro answers its one permitted question at the correct altitude
- No page borrows vocabulary from a neighboring altitude
- TH and EN carry identical altitude and meaning
- No worldview paragraph changed

#### Risks

- `StructuralIndexPage.astro` is shared across Protocols / Standards / Journal — may need conditional copy paths
- Thai UX copy for System hub and per-layer intros warrants native-speaker review for correct register
- LinkedIn badge is third-party — must degrade gracefully (plain `<a>` fallback)

**Gate:** Phase 4 approved before Phase 5. Copy altitude defines what users read — incorrect altitude here undermines all UX blueprint work.

---

### PHASE 5 — Breadcrumbs & Contextual Navigation (DEPENDS ON PHASE 4)

**Type:** UX blueprint · Navigation
**Objective:** Users inside System sub-pages always know their altitude. Contextual bridge links implemented on Journal Posts and Implementation entries.
**Dependencies:** Phase 4 complete.

**Deliverables:**
1. Breadcrumb component — `System / Framework`, `System / Protocols`, `System / Standards`
   - Required on all three System sub-pages (D-018 — mandatory, not optional)
   - Never on Journal, Implementation, or support pages
   - Uses existing token/style patterns
2. Journal Post — end-of-article template:
   - 2 related Journal entries (lateral)
   - 1 optional System bridge (contextual — only if a governed pattern exists for that entry)
3. Implementation entry — tail: "The rule behind this →" link to System/Protocol
4. Technical debt from Phase 2 (low priority):
   - F-01: Plain nav items (`Journal`, `Implementation`, `About`) have no server-side active state — `aria-current` not auto-injected by Astro SSR
   - F-02: JS `mobileBreakpoint` uses `max-width: 760px`; CSS hamburger activates at ≤960px — menu close-on-link-click gap between 760–960px

**Open items to resolve before implementation:**

| ID | Issue |
|----|-------|
| MD-06 | Journal Post → System bridge mechanism undefined |
| MD-07 | "Related Journal entries" algorithm undefined |
| MD-08 | Implementation → "which Protocol to link" decision undefined |

**Success criteria:**
- Breadcrumb visible at `/system/framework`, `/system/protocols`, `/system/standards`
- No breadcrumb on `/journal`, `/implementation`, `/about`
- Journal Post tail: lateral first, optional vertical bridge second (never forced)
- Implementation entry: upward System/Protocol link present

**Gate:** Final structural gate before SEO audit and launch.

---

### PHASE 6 — SEO Audit & Verification (DEPENDS ON PHASE 5)

**Type:** SEO verification
**Objective:** All SEO equity from old URLs preserved. New URLs indexable, canonical, and internally consistent.
**Dependencies:** Phases 1–5 complete.

**Deliverables:**
1. Full 301 crawl — every old URL from Phase 1 confirmed redirecting correctly
2. Sitemap audit — only new URL patterns present
3. RSS feed audit — new slugs only
4. Canonical tags — verified on all dynamic post routes
5. `hreflang` — EN/TH alternates updated to new URL patterns
6. `llms.txt.ts` — confirm paths derive correctly
7. Search Console — new sitemap submitted post-deploy

**Open items to resolve before verification:**

| ID | Issue |
|----|-------|
| SEO-01 | `/system` hub canonical + hreflang strategy undefined |
| SEO-02 | RSS feed scope (Journal-only vs all) undefined |
| SEO-03 | OG image fallback for static/hub pages missing |

**Success criteria:**
- Zero 404s on any previously indexed URL
- Sitemap 100% matches live URL structure
- Canonical and hreflang correct on all post routes

**Gate:** Must pass before production deploy. No launch without 301 verification.

---

### PHASE 7 — Production Deploy (DEPENDS ON PHASE 6)

**Type:** Deployment
**Objective:** Restructured site live at paritsea.co with zero downtime.
**Dependencies:** Phases 0–6 complete and approved.

**Deliverables:**
1. `npm run deploy` (Cloudflare Workers)
2. Post-deploy crawl validation
3. Search Console new sitemap submission

**Success criteria:**
- All URLs resolve in production
- All 301s function in production (not just dev)
- No console errors on any page
- Cloudflare Worker startup within baseline

**Risks:**
- Miniflare dev redirect behavior may differ from production Worker
- Thai locale prefix rewrites + new URL redirects must be tested in sequence

**Gate:** Final gate. 301s preserve old URLs — no content loss risk.

---

### PHASE 8 — Content Activation (POST-LAUNCH)

**Type:** Content governance
**Objective:** Publish first complete content set for each layer per Content Governance altitude rules.
**Dependencies:** Phase 7 complete.

**Deliverables per layer:**

| Layer | Minimum content to activate |
|-------|----------------------------|
| Journal | 3+ observation entries at correct altitude (seeing — not instructional) |
| System/Framework | Foundational document (content exists — verify governance compliance at new URL) |
| System/Protocols | 1+ Protocol document(s) |
| System/Standards | 1+ Standard document(s) |
| Implementation | 1+ applied system entry |

**Open items to resolve before activation:**

| ID | Issue |
|----|-------|
| CG-01 | Protocol/Standard versioning governance undefined |
| CG-02 | Mixed-language post handling undefined |

**Success criteria:**
- Each published piece passes Content Governance altitude check
- No page empty at launch (except optionally Implementation if content not ready)
- About page copy complete and live

**Gate:** Soft gate. Site is functional at Phase 7; this completes the content layer.

---

### PHASE 9 — Annual Drift Audit (RECURRING)

**Type:** Governance · Architecture maintenance
**Cadence:** Once per year.

**Deliverables:**
1. Altitude check — every piece answers: *does this answer the one question this page owns at its altitude?*
2. Internal link audit — all cross-layer bridges intentional and correctly directional
3. 301 link audit — no old-URL traffic returning 404
4. Docs review — `docs/*.md` files updated if any architectural decision evolved
5. Content Governance `Last reviewed` field updated

**Open items to resolve before next audit:**

| ID | Issue |
|----|-------|
| CG-03 | Content retirement governance undefined |

**Success criteria:** No page answers a question it "must not answer" (per `content-governance.md`).
**Risks:** Journal entries gradually acquiring prescriptive language ("you should...") — most common drift pattern.

---

## Phase dependency graph (remaining phases)

```
Phase 4 (UX Copy — CURRENT ⏳)
    │
    └─► Phase 5 (Breadcrumbs + Contextual Nav)  ◄── GATE before 6
             │
             └─► Phase 6 (SEO Audit + Verification)  ◄── GATE before 7
                      │
                      └─► Phase 7 (Production Deploy)
                               │
                               └─► Phase 8 (Content Activation — soft gate)
                                        │
                                        └─► Phase 9 (Annual Drift Audit — recurring)
```

---

## Pre-launch completion checklist

All Phase 1–3 items are ✅ complete and verified. Checklist covers Phase 4 onward.

**Phase 4 gate:**
- [ ] Zero `การประยุกต์ใช้` in `src/`
- [ ] TH nav renders `Protocols` / `Standards` in English
- [ ] Implementation body reads `การนำไปปรับใช้จริง` consistently
- [ ] Each page intro at correct altitude
- [ ] No page answers a question it must not answer
- [ ] LinkedIn badge live on About page (or plain link fallback if SE Ocean visual weight dominates)

**Phase 5 gate:**
- [ ] Breadcrumbs visible only on `/system/*` sub-pages
- [ ] Journal Post tail: lateral links before optional vertical bridge
- [ ] Implementation entry has upward link to System/Protocol

**Phase 6 gate:**
- [ ] Zero 404s on any previously indexed URL
- [ ] Sitemap 100% matches live URL structure
- [ ] Canonical and hreflang correct on all post routes

**Phase 7:**
- [ ] All URLs resolve in production
- [ ] All 301s confirmed in production (not just dev)
- [ ] No console errors on any page

---

## Convention

When a phase completes:
1. Move the phase entry from "NEXT ACTIONS" to the "Completed phases" summary table.
2. Update `project-state.md` — "Completed phases" table + "Implementation status."
3. Clear resolved blockers from `project-state.md` "Active blockers."
4. Update "Current phase" in `project-state.md` header and in this file's header.
5. Log new decisions to `decision-log.md`.
6. Update `Last reviewed` date at top of this file.
