# Paritsea — Decision Log
**Document type:** Chronological record of approved architectural and strategic decisions.
**Purpose:** Long-term memory layer. Every major decision is logged here. Future sessions, contributors, and governance reviews begin here.
**Last updated:** 2026-06 (Phase 2 complete; D-025, D-026 added)

---

## How to use this log

- **Entries are immutable once approved.** If a decision is reversed, a new entry is added (STATUS: Superseded) referencing the original.
- **Decisions are numbered sequentially.** Never re-number.
- **Related documents** link to the source-of-truth files where the decision is enforced.
- **Rationale is required.** A decision without reasoning cannot be audited or challenged correctly.

---

## Decision index

| ID | Date | Decision | Status |
|----|------|----------|--------|
| D-001 | 2026-06 | Seeing → Structuring → Doing as foundational pipeline | ✅ Active |
| D-002 | 2026-06 | Three-layer public vocabulary: Journal / System / Implementation | ✅ Active |
| D-003 | 2026-06 | System as hub page with real nested children | ✅ Active |
| D-004 | 2026-06 | The Doctrine (แก่น) → Framework tier inside System | ✅ Active |
| D-005 | 2026-06 | Framework / Protocol / Standard derivation hierarchy | ✅ Active |
| D-006 | 2026-06 | Internal taxonomy keys frozen — no content migration | ✅ Active |
| D-007 | 2026-06 | Homepage copy protected — labels only | ✅ Active |
| D-008 | 2026-06 | About: origin context, not portfolio | ✅ Active |
| D-009 | 2026-06 | Licensing: terminal governance page, footer only | ✅ Active |
| D-010 | 2026-06 | Contact: terminal conversation page, footer only | ✅ Active |
| D-011 | 2026-06 | Source-of-truth documentation model | ✅ Active |
| D-012 | 2026-06 | Roadmap phase model (Phases 0–9) | ✅ Active |
| D-013 | 2026-06 | Navigation intent model (4 intent states, not personas) | ✅ Active |
| D-014 | 2026-06 | Depth is pulled, never pushed | ✅ Active |
| D-015 | 2026-06 | Journal → Implementation direct link prohibited | ✅ Active |
| D-016 | 2026-06 | Content altitude law — one altitude per page | ✅ Active |
| D-017 | 2026-06 | Page taxonomy is closed | ✅ Active |
| D-018 | 2026-06 | Breadcrumbs required on all System sub-pages | ✅ Active |
| D-019 | 2026-06 | Thai Journal nav label = "Journal" (English word retained) | ✅ Active |
| D-020 | 2026-06 | System hub Phase 1 = structural HTML only, copy in Phase 4 | ✅ Active |
| D-021 | 2026-06 | System dropdown active-state on all /system/* routes | ✅ Active |
| D-022 | 2026-06 | System dropdown mobile = accordion inline expand | ✅ Active |
| D-023 | 2026-06 | Thai locale + 301 redirect: preserve /th/ prefix | ✅ Active |
| D-024 | 2026-06 | `nav-doctrine` CSS class renamed `nav-framework` in Phase 2 | ✅ Active |
| D-025 | 2026-06 | LinkedIn profile badge planned for About page (Phase 4) | ✅ Active |
| D-026 | 2026-06 | `resolveMenuItem` recursive helper for nav item processing | ✅ Active |
| D-027 | 2026-06 | Language governance: layer names use English in TH+EN; แก่น is banned | ✅ Active |
| D-028 | 2026-06 | Two-model language system: Model A (IA) + Model B (exposure overlay) | ✅ Active |
| D-029 | 2026-06 | Thai Implementation body term = การนำไปปรับใช้จริง; nav fully English | ✅ Active |

---

## Full entries

---

### D-001 — Seeing → Structuring → Doing as foundational pipeline

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Foundational / Architecture |

**Decision:** The entire site architecture, content model, navigation, and content governance are organized around one pipeline: **seeing → structuring → doing**. This is not a sequential reading path — it is the natural movement of thought from raw observation to formalized knowledge to applied reality. Any architectural, design, or content decision that contradicts this pipeline is incorrect by definition.

**Rationale:** Paritsea exists to help people see what is hidden. The three movements mirror the epistemological process: first you see, then you give it structure, then you act on it. Making this visible in the architecture removes the need to explain it — visitors feel it.

**Related documents:** `paritsea-principles.md` (The three-layer pipeline), `architecture.md` (Governing principle), `content-governance.md` (Three altitudes)

---

### D-002 — Three-layer public vocabulary: Journal / System / Implementation

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Architecture / Naming |

**Decision:** The three primary layers use functional vocabulary that names what they do: **Journal** (the act of seeing/observing), **System** (the act of structuring/governing), **Implementation** (the act of doing/applying). Previous names (The Method, [no parent], Implementations) were branded names that obscured the pipeline.

**Rationale:** The old flat-peer naming (The Doctrine · Protocols · Standards · The Method · Implementations) hid the three-layer structure. The new vocabulary makes the pipeline legible at the navigation level without requiring explanation.

**Supersedes:** The Method → Journal; The Doctrine+Protocols+Standards → System (with Framework/Protocols/Standards as children); Implementations → Implementation.

**Related documents:** `architecture.md` (Page role table), `navigation-model.md` (Global nav)

---

### D-003 — System as hub page with real nested children

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Architecture / Navigation |

**Decision:** System is a real page at `/system` — a hub page that orients visitors to the structuring layer and routes to three real sub-pages (Framework, Protocols, Standards). Sub-pages are **first-class navigable pages**, not hidden components or tabs. They appear individually in the System dropdown in global nav.

**Rationale:** Collapsing the three System sub-pages into one undifferentiated link would hide the Protocol/Standard/Framework derivation structure. The hub exists to express "these three are one layer" while keeping each individually addressable by intent.

**Related documents:** `architecture.md` (Refined architecture), `navigation-model.md` (§3 Forbidden behaviors, §6 Global nav), `ux-blueprint.md` (System hub)

---

### D-004 — The Doctrine (แก่น) → Framework tier inside System

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Architecture / Naming |

**Decision:** "The Doctrine" (แก่น), previously a standalone peer page at `/the-doctrine`, is renamed **Framework** and moved to `/system/framework` as a child of the System hub. It is the immutable foundational document from which all Protocols and Standards derive authority.

**Rationale:** The Doctrine was the highest-authority document but was rendered as a peer of Protocols and Standards — obscuring its altitude. Moving it into System as "Framework" correctly expresses that it is the *foundation* of the structuring layer, not a peer entry within it.

**URL change:** `/the-doctrine` → `/system/framework` (301 in Phase 1)

**Internal taxonomy key:** `the-doctrine` (frozen — unchanged in CMS)

**Related documents:** `architecture.md` (Page role table, URL segment map), `ux-blueprint.md` (Framework page), `content-governance.md` (Framework)

---

### D-005 — Framework / Protocol / Standard derivation hierarchy

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Architecture / Content Governance |

**Decision:** Within System, the three documents have an explicit derivation order: **Framework** (immutable root) → **Protocols** (obligations derived from Framework) → **Standards** (thresholds that measure Protocol compliance). This hierarchy is expressed in the System hub section order, the breadcrumb altitude, and all cross-linking rules. Framework does not version. Protocols and Standards are versioned.

**Rationale:** Without an explicit derivation order, Protocol/Standard/Framework appear as equivalent peers, making it impossible to understand which governs which. The hierarchy makes authority visible.

**Related documents:** `architecture.md` (Refined architecture), `content-governance.md` (Framework vs Protocol/Standard boundary), `ux-blueprint.md` (System hub, Protocol, Standard, Framework pages)

---

### D-006 — Internal taxonomy keys frozen — no content migration

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Architecture / Engineering |

**Decision:** The internal `framework_page` taxonomy keys in `seed/seed.json` and the CMS (`the-doctrine`, `the-method`, `protocols`, `standards`, `implementations`) are **frozen and must not change**. Only public URL segments, nav labels, and hierarchy change. The mapping between internal key and public URL segment lives in `src/utils/public-paths.ts`.

**Rationale:** Changing taxonomy keys would require re-tagging every existing content entry — a migration risk with no benefit. By keeping keys stable and mapping them to new public segments in one file, the architecture becomes zero-migration.

**Related documents:** `architecture.md` (Internal taxonomy keys, URL segment map), `src/utils/public-paths.ts`

---

### D-007 — Homepage copy protected — labels only

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Content / Architecture |

**Decision:** The homepage (`src/pages/index.astro`) worldview copy is **protected**. No paragraph, sentence, or structural section may be rewritten without a new architectural decision record. Only proper-noun *labels* may change to reflect the new vocabulary (The Method → Journal, The Doctrine → Framework, etc.) and corresponding href values.

**Rationale:** The homepage copy establishes the worldview with precision. It was authored with care for the specific way Paritsea reads the world. Rewriting it risks diluting or misrepresenting the core lens.

**Labels changed:**
- `readDoctrine` → "Read the Framework" / "อ่านแก่น"
- `exploreMethod` → "Open the Journal" / "เปิด Journal"
- `openMethod` → "Open the Journal →"
- `attr` → "— Parit Ritchai, Framework"

**Related documents:** `architecture.md` (Homepage protection), `docs/paritsea-principles.md` (The worldview — locked copy)

---

### D-008 — About: origin context, not portfolio

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Content / UX |

**Decision:** The About page answers one question: *"Where does this lens come from, and who holds it?"* It is context injection — it receives visitors and re-injects them into a layer. It is not a portfolio, CV, service page, or credential showcase. The founder's multi-dimensional perspective and the origin of the system are its sole content.

**Rationale:** About pages that become CVs or marketing pages undermine the philosophical tone of the rest of the site. About must be personal without being promotional, grounded without being credential-heavy.

**Related documents:** `ux-blueprint.md` (About page), `content-governance.md` (About), `paritsea-principles.md` (Who Paritsea is)

---

### D-009 — Licensing: terminal governance page, footer only

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Architecture / Content |

**Decision:** Licensing is a terminal page — visitors arrive from System, Implementation, or About when they need permission clarity. It lives in the footer, not global nav. It does not carry worldview or content. It answers one question: *"What am I permitted to do with Paritsea?"* Plain-language summary always precedes formal terms.

**Rationale:** Licensing is governance, not content. Placing it in primary nav would suggest it is a browsing destination, which it is not. Footer placement signals "reference when needed" not "read first."

**Related documents:** `ux-blueprint.md` (Licensing), `content-governance.md` (Licensing), `navigation-model.md` (§3 Global rules)

---

### D-010 — Contact: terminal conversation page, footer only

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Architecture / UX |

**Decision:** Contact is a terminal page — visitors arrive when they are ready for a real conversation or commercial inquiry. It lives in footer only. It explicitly states what the channel is and is not for. Exploratory users must not be routed here unprompted.

**Rationale:** Contact pages that try to serve all users at all times become noise. Routing an exploratory visitor to Contact is an intent mismatch that damages trust. Footer placement preserves Contact as a destination for demonstrated intent.

**Related documents:** `ux-blueprint.md` (Contact), `navigation-model.md` (§5 — Contact entry logic)

---

### D-011 — Source-of-truth documentation model

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Governance / Process |

**Decision:** All approved architectural, navigational, UX, and content governance decisions are stored in `docs/` as production-locked markdown files. These files are the authoritative reference for all future design, content, development, and AI-assisted work. Code, copy, or structure that contradicts a `docs/` file is incorrect by definition. Docs are updated only when a decision is formally revised.

**Rationale:** Without a documented source of truth, decisions erode through accumulated interpretation drift. A persistent `docs/` layer means every session — human or AI — can anchor to the same ground truth.

**Files:**
- `docs/architecture.md` — site structure
- `docs/navigation-model.md` — intent and nav behavior
- `docs/ux-blueprint.md` — per-page structure
- `docs/content-governance.md` — altitude law
- `docs/paritsea-principles.md` — voice and worldview
- `docs/roadmap.md` — execution phases
- `docs/project-state.md` — operational snapshot
- `docs/decision-log.md` — this file

**Related documents:** All `docs/*.md`

---

### D-012 — Roadmap phase model (Phases 0–9)

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Process / Governance |

**Decision:** Work is organized into 9 sequential phases, each with a gate that must pass before the next begins. Phases 1–3 are technical (no editorial approval needed). Phases 4–5 require editorial altitude review. Phase 6 is a verification pass. Phase 7 is deploy. Phase 8 is content. Phase 9 is recurring annual audit.

**Rationale:** Ungated sequential execution allows broken routing to be compounded by nav work built on top of it, then copy built on top of that. Each gate prevents downstream work from being invalidated by upstream failures.

**Related documents:** `docs/roadmap.md`

---

### D-013 — Navigation intent model (4 intent states, not personas)

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | UX / Navigation |

**Decision:** Navigation is designed for **4 intent states** (Exploratory / Analytical / Builder / Returning), not for fixed user personas. The same person is in a different state on different visits. Navigation serves the current intent state, not an assumed identity.

**Rationale:** Persona-based navigation creates false assumptions about who the user "is." Intent-based navigation serves the user's current need without requiring them to self-identify.

**Related documents:** `navigation-model.md` (§1 User intent types, §2 Entry point mapping)

---

### D-014 — Depth is pulled, never pushed

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | UX / Navigation |

**Decision:** No page auto-advances users to a deeper layer. The next layer is always offered as an option; the choice belongs to the reader. Mandatory sequential navigation (steppers, "continue to →" prompts) is forbidden on all pages.

**Rationale:** Paritsea is not a conversion funnel. Forcing depth onto exploratory users causes disorientation and contradicts the worldview that every reader is in a different place.

**Related documents:** `navigation-model.md` (§3 Global rules, Forbidden behaviors), `paritsea-principles.md` (In design decisions), `ux-blueprint.md` (Universal behavioral constraints)

---

### D-015 — Journal → Implementation direct link prohibited

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Navigation / Content |

**Decision:** No Journal Post may carry a direct editorial link to the Implementation layer. Seeing→doing must route through structuring. If a Journal entry implies application, it bridges via System (one optional link to the governing Protocol/Standard). Users may navigate to Implementation via global nav at any time — the restriction is on **placed editorial links**, not on navigation possibility.

**Rationale:** A direct Journal→Implementation shortcut breaks the seeing→structuring→doing pipeline integrity. It allows ungoverned observation to appear as direct application, which is an altitude violation. The pipeline is available, not required — but editorial links must respect it.

**Related documents:** `navigation-model.md` (§4 Not modeled), `ux-blueprint.md` (Journal Post — Never appears, Internal linking)

---

### D-016 — Content altitude law — one altitude per page

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Content Governance |

**Decision:** Every page has exactly one altitude (Seeing / Structuring / Doing / Support). Content that would fit better at a different altitude must be moved to the correct page or held back. No page may borrow a neighbor's altitude to seem richer or more complete. The governing sentence: *"Does this content answer the one question this page owns — at this page's altitude — without borrowing from its neighbors?"*

**Rationale:** Altitude drift is the primary failure mode of content-heavy knowledge systems. Once a Protocol starts narrating and a Journal entry starts prescribing, the entire system loses coherence. The law is absolute so that enforcement is unambiguous.

**Related documents:** `content-governance.md` (all sections), `paritsea-principles.md` (Altitude discipline)

---

### D-017 — Page taxonomy is closed

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Architecture / Content Governance |

**Decision:** The current page taxonomy (Home, Journal, System[Framework/Protocol/Standard], Implementation, About, Licensing, Contact) is **closed**. New content that does not fit an existing page's altitude is either reframed to fit an existing page or held back. No new page types are added without a new foundational architectural decision.

**Rationale:** Adding pages for convenience creates structural drift. The taxonomy was designed to cover the full surface of Paritsea's worldview system. Content that doesn't fit is either misclassified or truly outside the system's scope.

**Related documents:** `content-governance.md` (Future content classification — Tie-breakers), `paritsea-principles.md` (Principle 7)

---

### D-018 — Breadcrumbs required on all System sub-pages

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | UX / Navigation |
| **Resolves** | Consistency audit C-01 |

**Decision:** Breadcrumbs (`System / Framework`, `System / Protocols`, `System / Standards`) are **required** on all three System sub-pages. They are the altitude marker that prevents disorientation inside the structuring layer. Breadcrumbs do not appear on Journal, Implementation, or any support page.

**Rationale:** System sub-pages are the only pages in the architecture that sit at a nested depth. A visitor who arrives directly at `/system/protocols/stp` has no way to know they are inside a parent layer without a breadcrumb. Journal and Implementation are flat and single-level — their global nav anchor already names the location.

**Supersedes:** Earlier `ux-blueprint.md` listing of Framework breadcrumb as optional.

**Related documents:** `navigation-model.md` (§6 Breadcrumb rules), `ux-blueprint.md` (Framework, Protocol, Standard pages)

---

### D-019 — Thai Journal nav label = "Journal" (English word retained)

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Naming / i18n |
| **Resolves** | Consistency audit MD-01 |

**Decision:** The Thai nav label for the Journal layer is **"Journal"** (the English word, untranslated). This is consistent with System and Implementation, which are also used untranslated or as direct transliterations in Thai context. The system vocabulary is cross-lingual by design.

**Rationale:** Using "บันทึก" (Thai word for journal/diary) would connote personal diary rather than a layer of a thinking system. "Journal" as system vocabulary carries the correct register alongside System and Implementation.

**Related documents:** `architecture.md` (Naming conventions), `roadmap.md` Phase 2 (i18n.ts navLabels)

---

### D-020 — System hub Phase 1 = structural HTML only; copy in Phase 4

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Process / Engineering |
| **Resolves** | Consistency audit MD-02 |

**Decision:** Phase 1 creates `src/pages/system/index.astro` as a structural HTML shell with placeholder headings only. Final copy (layer definition, sub-page card descriptions, derivation statement) is a Phase 4 deliverable per `ux-blueprint.md`. Phase 1 must not frontload editorial work.

**Rationale:** Phase 1 is a routing and redirect phase — its success criteria is that URLs resolve, not that copy is correct. Mixing editorial and routing work creates a confused gate: a page with wrong copy cannot be distinguished from a routing failure during verification.

**Related documents:** `roadmap.md` (Phase 1 deliverables, Phase 4 deliverables), `ux-blueprint.md` (System hub)

---

### D-021 — System dropdown active-state on all /system/* routes

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Navigation / UX |
| **Resolves** | Consistency audit MD-03 |

**Decision:** The System nav anchor is highlighted (active class) whenever the current URL begins with `/system` — including `/system`, `/system/framework`, `/system/protocols`, `/system/protocols/[slug]`, `/system/standards`, and `/system/standards/[slug]`. The matching dropdown child item (Framework / Protocols / Standards) is also highlighted simultaneously. Both states being active at the same time is correct behavior, not a bug.

**Rationale:** Without parent-active-state on nested routes, a user inside `/system/protocols/stp` would see no nav item highlighted, creating disorientation. The double-active state (parent + child) gives users two signals: which layer they are in, and which sub-page within it.

**Related documents:** `navigation-model.md` (§6 System dropdown active-state rules), `roadmap.md` (Phase 2 deliverables, completion checklist)

---

### D-022 — System dropdown mobile = accordion inline expand

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Navigation / UX |
| **Resolves** | Consistency audit MD-04 |

**Decision:** On mobile viewports (≤960px, hamburger breakpoint), the System nav anchor expands **inline using an accordion pattern** — the three children (Framework / Protocols / Standards) appear indented beneath System within the hamburger panel. No new overlay, slide-over panel, or separate component is needed.

**Rationale:** An accordion pattern is consistent with the existing hamburger open/close behavior and requires no new component investment. A slide-over or nested modal would add complexity disproportionate to the feature.

**Related documents:** `navigation-model.md` (§6 System dropdown mobile behavior), `roadmap.md` (Phase 2 deliverables)

---

### D-023 — Thai locale + 301 redirect: preserve /th/ prefix

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Engineering / SEO |
| **Resolves** | Consistency audit SEO-04 |

**Decision:** When implementing 301 redirects in `src/middleware.ts`, Thai-origin requests must be detected (via the `__locale` query param or original `__path` param set by middleware rewrite) and the `/th/` prefix must be prepended to the target URL. A request to `/th/the-doctrine` must return `301 Location: /th/system/framework`, not `/system/framework`.

**Rationale:** Thai URLs have independent SEO equity. A redirect that strips the locale prefix sends Thai users to English pages and destroys Thai-language indexing.

**Test:** `curl -I paritsea.co/th/the-doctrine` must return `301 Location: /th/system/framework`

**Related documents:** `roadmap.md` (Phase 1 risks, Phase 1 checklist), `src/middleware.ts`

---

### D-024 — `nav-doctrine` CSS class renamed `nav-framework` in Phase 2

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Engineering / Navigation |
| **Resolves** | Consistency audit IMP-02 |

**Decision:** The `nav-doctrine` CSS class in `src/layouts/Base.astro`, which previously applied special styling to the `/the-doctrine` nav link, is renamed `nav-framework` and updated to apply on `/system/framework` URL match. This rename happens in **Phase 2** (nav implementation), not Phase 5 (breadcrumbs).

**Rationale:** The CSS class names what it styles. `nav-doctrine` is semantically incorrect after The Doctrine becomes Framework. Deferring the rename to Phase 5 meant shipping Phase 2 with a misleading class name.

**Related documents:** `roadmap.md` (Phase 2 deliverables, Phase 5 — crossed out), `navigation-model.md` (§6 active-state rules)

---

### D-025 — LinkedIn profile badge planned for About page (Phase 4)

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active (planned — Phase 4 deliverable) |
| **Type** | UX / Content |
| **Resolves** | N/A |
| **Supersedes** | N/A |

**Decision:** A LinkedIn profile badge for Parit Ritchai will be embedded in the About page founder bio section (`.about-founder` block), below the bio text and above the social links. Both light and dark badge variants are rendered in HTML; CSS show/hide responds to the site's `.dark` class. The LinkedIn script tag is loaded on the About page only (not globally). Size: `medium`. Fallback: the `<a>` tag inside the badge div renders as a plain link if the LinkedIn script is blocked.

**Constraint:** The badge must not make SE Ocean the visually dominant identity in the founder section (`ux-blueprint.md`: "SE Ocean as a primary identity" must never appear). At implementation, if SE Ocean's visual weight exceeds "Architect of Paritsea", fall back to a plain `<a>` link. This must be assessed at implementation time before Phase 4 ships.

**Rationale:** A LinkedIn badge serves as an authentic professional identity anchor — it signals a real person behind the lens without being a credentials parade. It is contextually appropriate in the founder bio section, which is the one place on the site where the person behind the system is foregrounded.

**Implementation note:** `data-locale="th_TH"`, `data-type="HORIZONTAL"`, `data-vanity="parit-ritchai"`. Both light/dark variants must be present to respond to theme changes without a JS observer.

**Related documents:** `roadmap.md` (Phase 4 LinkedIn badge section), `ux-blueprint.md` (About page — Never appears), `paritsea-principles.md` (Who Paritsea is — SE Ocean not primary identity)

---

### D-026 — `resolveMenuItem` recursive helper pattern for nav item processing

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Engineering |
| **Resolves** | N/A |
| **Supersedes** | N/A |

**Decision:** The nav item URL/label resolution in `src/layouts/Base.astro` is handled by a `resolveMenuItem` recursive function that processes both top-level items and their children in a single pass, replacing the previous flat if-else chain. Children are resolved to localized URLs and translated labels before reaching the render template.

**Rationale:** The old resolution chain only handled top-level items. With System having nested children (Framework/Protocols/Standards), a recursive approach was the only way to correctly localize child URLs without a separate processing step. The recursive function is also more maintainable if additional nested items are added in future.

**Related documents:** `src/layouts/Base.astro` (navItems mapping), `architecture.md` (D-003 — System as hub with nested children)

---

### D-027 — Language governance: layer names use English in TH+EN; แก่น is banned

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Content / UX / Governance |
| **Resolves** | N/A |
| **Supersedes** | N/A |

**Decision:** The three core layer names (Journal / System / Implementation) and Framework use **English in both TH and EN** interfaces. They are system vocabulary, not translated. The word **แก่น** is permanently banned from all UI copy, labels, CTAs, and documentation references — even though it is the precise Thai translation. "Framework" is more recognizable to Thai readers in a digital context.

Mixing Thai verbs with English nouns is approved where natural (e.g., `อ่าน Framework`, `สำรวจ Journal`). When a Thai word is archaic, formal, or cognitively heavy, use the English equivalent instead.

**Canonical layer labels:**

| Term | EN | TH |
|------|----|----|
| Layer 1 | Journal | Journal |
| Layer 2 | System | System |
| Layer 3 | Implementation | Implementation |
| Root | Framework | Framework |
| Sub-layer | Protocols | โปรโตคอล |
| Sub-layer | Standards | มาตรฐาน |

**Attribution format:** Name only — `— Parit Ritchai` (EN) / `— ปาริศ ฤทธิ์ชัย` (TH). No source label appended.

**Rationale:** แก่น may be accurate but it is too archaic for UX contexts. English layer names are already used for Journal and System — consistency requires Framework and Implementation to follow the same pattern. Thai readers in digital contexts recognize English system vocabulary more readily than formal Thai equivalents.

**Phase 4 implication:** All UX copy must use these canonical terms. Any occurrence of แก่น, การประยุกต์ใช้ (as a layer name), or old source labels in attributions is a violation of this governance rule.

**Related documents:** `paritsea-principles.md` (Language and terminology governance), `src/utils/i18n.ts` (navLabels)

---

### D-028 — Two-model language system: Model A (IA) + Model B (exposure overlay)

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Architecture / Content / Governance |
| **Resolves** | System-sync contradictions C-1, C-2, C-3 |

**Decision:** Paritsea operates **two distinct, complementary language models on different axes**:

- **Model A — Structural architecture (IA truth):** `Journal → System → Implementation` (seeing → structuring → doing). This is *where content lives* — URLs, nav, page roles. It is the structural truth of the system and supersedes any other layer model when they appear to conflict.
- **Model B — Language exposure overlay:** `Entry → Gateway → Core` (per `language-hierarchy.md`). This governs *vocabulary depth and cognitive load over time* — which words appear at which reading depth. It is applied **on top of** Model A, never replacing it.

The two are orthogonal: Model A says *where*; Model B says *how heavy the words may be*.

**Rulings:**
1. Pipeline terms (Journal / System / Implementation / Framework) are classified as **Entry-layer** vocabulary — instantly understandable, allowed in user-facing UI and navigation. Surfacing them in nav (D-027) is therefore **not** a violation of Model B's "no Core vocabulary in onboarding" rule.
2. `language-hierarchy.md` example words (Entry: Explore Journal, Reflection, Thinking Model · Gateway: Mindset, Approach, Perspective Shift · Core: Cognitive Pattern, Recursive Thought Structure, Perception Architecture) are **PRESCRIPTIVE** — they are the approved vocabulary for each exposure layer, to be adopted in Phase 4+ copy, not merely illustrative.
3. Core ontology vocabulary is reserved for deep content / framework explanation — never onboarding or nav.

**Rationale:** A system sync detected that two "3-layer models" existed without a stated relationship, risking a parallel competing lexicon. This decision fixes their relationship permanently: Model A is structure, Model B is exposure, and pipeline terms live at the Entry layer.

**Related documents:** `architecture.md` (Model A), `language-hierarchy.md` (Model B), `paritsea-principles.md` (Language and terminology governance), `project-state.md`

---

### D-029 — Thai Implementation body term = การนำไปปรับใช้จริง; navigation fully English

| Field | Value |
|-------|-------|
| **Date** | 2026-06 |
| **Status** | ✅ Active |
| **Type** | Content / UX |
| **Resolves** | System-sync contradiction C-4, risk L-3 |
| **Supersedes** | D-027 partial (Implementation Thai handling) |

**Decision:**
- **Navigation is fully English.** No Thai navigation terms remain. `โปรโตคอล` → Protocols, `มาตรฐาน` → Standards in nav. (Journal / System / Framework / Implementation were already English.)
- **Thai body content** for the Implementation layer uses **"การนำไปปรับใช้จริง"**. The legacy term **"การประยุกต์ใช้" is deprecated and must be removed** from all source.
- The nav label for the layer remains the English word **"Implementation"**; only *body/content* prose uses การนำไปปรับใช้จริง.

**Rationale:** "การประยุกต์ใช้" is functional but flat; "การนำไปปรับใช้จริง" ("putting into real applied use") better carries the *doing/applied-in-reality* altitude of the Implementation layer for Thai readers. Navigation stays English for cross-lingual consistency with the rest of the pipeline vocabulary.

**Related documents:** `paritsea-principles.md` (Language and terminology governance), `src/utils/i18n.ts`, `src/pages/implementation.astro`, `src/components/UsageGuidance.astro`

---

## Template for future entries

When adding new decisions:

```markdown
### D-[next number] — [Short title]

| Field | Value |
|-------|-------|
| **Date** | YYYY-MM |
| **Status** | ✅ Active |
| **Type** | [Architecture / Navigation / Content / Engineering / Process / Governance / UX] |
| **Resolves** | [Audit ID or N/A] |
| **Supersedes** | [D-XXX or N/A] |

**Decision:** [One or two sentences. What was decided?]

**Rationale:** [Why? What problem does this solve?]

**Related documents:** [Which docs/*.md files enforce or reference this decision?]
```
