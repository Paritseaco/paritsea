# Paritsea — UX Blueprint (per page)
**Status:** Production. Page structure, section order, and behavioral rules are approved.
**Last reviewed:** 2026-06

---

## How to use this document

For each page the blueprint defines: what the user arrives expecting, what they leave with, the required and optional sections, section order, CTA rules, internal linking rules, and what must never appear. Architecture and copy are fixed; this governs *behavior and structure* only.

---

## 1. HOME `/`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | First contact — "what is this, does it speak to me?" |
| **Leaves with** | The lens installed + one chosen direction (Journal or Framework) |

### Required sections (in order)

1. Hero — worldview statement + exactly 2 CTAs (one into seeing, one into structuring)
2. Worldview — depth of sight, not comparison
3. Pathway / Topics
4. Journal records (latest entries)
5. Ecosystem (follow channels)
6. Closing quote (coda — not a CTA)

### Optional sections
- Latest videos

### CTA rules
- Exactly two primary CTAs in hero: one to Journal (seeing), one to System/Framework (structuring).
- No third competing CTA above fold.
- Closing is a coda — no action expected.
- Commercial / contact CTAs: never on this page.

### Internal linking
- Outbound to Journal + System/Framework + Implementation only.
- Home is a fan-out — never a dead-end.

### Never appears
Pricing, feature lists, testimonials, founder CV, licensing legalese, newsletter signup, "start here" stepper.

---

## 2. JOURNAL `/journal`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | Wants to *see* — read observations, feel the perspective |
| **Leaves with** | One entry opened, or a felt sense of the recurring themes |

### Required sections (in order)

1. Layer intro — 1–2 lines: this is observation, not yet governed
2. Entry list — title + excerpt + category + date, reverse-chronological

### Optional sections
- Category filter
- "What the Journal is / is not" micro-note

### CTA rules
- No CTA. Entry titles *are* the only action.
- Never a newsletter wall.

### Internal linking
- Into Journal Posts only.
- One optional contextual System link in the intro ("patterns here may later be governed under System →") — optional, never per-entry.

### Never appears
Rules, thresholds, how-to, commercial language, "continue to System" stepper.

---

## 3. JOURNAL POST `/journal/[slug]`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | A specific observation pulled them in (direct link or from list) |
| **Leaves with** | A named pattern — "I felt this but couldn't say it" |

### Required sections (in order)

1. Title + meta (category / date)
2. Body — uninterrupted
3. End-of-read tail — back to Journal + 1–2 related entries

### Optional sections
- One bridge into the relevant Protocol/Standard **only if** this entry's pattern is formally governed there
- Embedded video (if entry has one)

### CTA rules
- No CTA above the fold.
- No CTA mid-text.
- Tail offers lateral (more Journal) before vertical (System).
- Never "apply this now."

### Internal linking
- Primary: lateral to 2 related Journal entries.
- Secondary: one optional vertical bridge to the governing Protocol/Standard.
- Never direct to Implementation.

### Never appears
Sidebars competing with text, share-bait, popups, ads, marketing register.

---

## 4. SYSTEM `/system` (hub)

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | Wants to understand *how knowledge is structured* before choosing a sub-page |
| **Leaves with** | The derivation model (Framework → Protocol → Standard) + a chosen sub-page |

### Required sections (in order)

1. Layer definition — what "structuring" means
2. Framework card — immutable root, one-line role
3. Protocols card — obligations, one-line role
4. Standards card — thresholds, one-line role
5. Derivation order made explicit

### Optional sections
- Link to Licensing (governance applies to this layer)
- "System is *not* application" disambiguation vs Implementation

### CTA rules
- Three equal-weight entry cards to sub-pages. No single dominant CTA.
- This is a junction, not a funnel.

### Internal linking
- Down to Framework / Protocols / Standards.
- Optional sideways to Journal (grounding) and Implementation (application).
- Out to Licensing permitted.

### Never appears
Raw entry content, sequential "start here → next" arrows, marketing language.

---

## 5. FRAMEWORK `/system/framework`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | Needs the immutable foundation everything derives from |
| **Leaves with** | The authoritative basis understood as fixed |

### Required sections (in order)

1. Title + immutability/authority note
2. The foundational text
3. Derivation statement — "Protocols & Standards derive from this"

### Required sections (continued)
- Breadcrumb: `System / Framework` — **required, not optional** (C-01 resolved: breadcrumbs are always present on all three System sub-pages per navigation-model.md §6)

### Optional sections
- Link to Licensing (immutability + IP)

### CTA rules
- None in body.
- Single tail link to Protocols/Standards ("what derives →") is allowed.

### Internal linking
- Down to Protocol / Standard.
- Up to System hub (breadcrumb — always present).
- Out to Licensing.

### Never appears
Versioning / changelog (Framework is immutable), opinion framing, "draft," edit log.

---

## 6. PROTOCOLS `/system/protocols`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | Needs the *obligation* — what must hold |
| **Leaves with** | The obligation understood + its derivation from Framework |

### Required sections (in order)

1. Position note — derives from Framework, sits above Standard
2. Protocol entry list (or single protocol body)
3. "Derives authority from Framework →"

### Optional sections
- Version indicator
- Related Standard link
- Usage guidance (non-commercial reference)

### CTA rules
- No commercial CTA.
- Tail may link to the Standard that measures this Protocol.

### Internal linking
- Up to Framework (authority).
- Down/lateral to Standard (threshold).
- Out to Licensing.

### Never appears
Measurable cutoffs (Standard's job), application stories (Implementation's), philosophy re-explanation (Framework's).

---

## 7. STANDARDS `/system/standards`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | Needs the *threshold* — how a claim is measured |
| **Leaves with** | The measurable condition + which Protocol it serves |

### Required sections (in order)

1. Position note — operates beneath Protocols
2. Standard entry / body
3. "A Protocol sets obligation; a Standard sets threshold" disambiguation

### Optional sections
- Version indicator
- Link to parent Protocol
- Usage guidance

### CTA rules
- None commercial.
- Tail links to governing Protocol or Licensing.

### Internal linking
- Up to Protocol / Framework.
- Out to Licensing.

### Never appears
Obligation rationale (Protocol's), worldview prose (Framework's), product examples (Implementation's).

---

## 8. IMPLEMENTATION `/implementation`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | Wants to *do* — see the system applied in reality |
| **Leaves with** | Proof it applies + (if a builder) a path to conditions/contact |

### Required sections (in order)

1. Layer intro — applied systems
2. Implementation list / cards
3. "The rule behind this →" — back to System/Protocol

### Optional sections
- Licensing link (commercial use)
- Contact bridge for builders

### CTA rules
- One builder-facing CTA permitted at bottom only (Licensing or Contact).
- Never above content.
- This is the *only* page where a commercial-adjacent CTA is appropriate.

### Internal linking
- Back up to System/Protocol (reflection).
- Out to Licensing / Contact.
- Not back to Journal directly.

### Never appears
Theory dumps, worldview re-pitch, observation entries, philosophical prose.

---

## 9. ABOUT `/about`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | Wants origin — who/why behind the lens |
| **Leaves with** | The founder lens + trust, then re-injected into a layer |

### Required sections (in order)

1. Hero — origin statement (depth of sight, not comparison)
2. Founder bio — identity + multi-dimensional perspective (photo, name, role, body)
3. "How Paritsea reads" — the method/approach
4. Open-to-use note + Licensing link
5. Social tail

### Optional sections
- Soft CTA back to Framework or Journal

### CTA rules
- Soft. About is context injection — it returns users *to* layers, never captures them.

### Internal linking
- Out to any layer + Licensing.
- Receives, then releases.

### Never appears
CV / résumé tables, portfolio, hype, "hire me," credentials parade, SE Ocean as a primary identity.

---

## 10. LICENSING `/licensing`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | Needs permission boundaries / IP / commercial conditions |
| **Leaves with** | Clear yes/no on their intended use |

### Required sections (in order)

1. Plain-language summary (first — always)
2. Allowed uses
3. Needs-permission uses
4. Forbidden claims
5. CC BY-NC 4.0 + IP model
6. FAQ
7. Contact bridge

### Optional sections
- Version note
- Link to Framework (immutability context)

### CTA rules
- One CTA only: Contact (for commercial / permission requests).
- Terminal page — links in, rarely out except Contact.

### Internal linking
- In from System / Implementation / About.
- Out only to Contact + Framework.

### Never appears
Marketing, worldview prose, content entries, unexplained legalese without plain-language first.

---

## 11. CONTACT `/contact`

| Attribute | Definition |
|-----------|-----------|
| **Arrives because** | Ready for conversation / a real request |
| **Leaves with** | A sent message or clarity about what this channel is for |

### Required sections (in order)

1. What this channel *is* for — licensing, implementation, serious correspondence
2. What it is *not* for
3. The address / form
4. Response expectation (discretionary, not guaranteed)

### Optional sections
- Reference-the-relevant-page note

### CTA rules
- Single action: send. No secondary distractions.

### Internal linking
- Minimal — back to Licensing if mis-routed. Otherwise terminal.

### Never appears
Marketing forms, newsletter signup, support-ticket framing, social-media wall, broad solicitation.

---

## Cross-cutting density & behavior

| Dimension | Seeing (Journal) | Structuring (System + children) | Doing (Implementation) | Support (About / License / Contact) |
|-----------|------------------|---------------------------------|------------------------|-------------------------------------|
| **Density** | Sparse, breathing | Dense, precise | Medium, evidential | Low, functional |
| **Reading behavior** | Immersive, linear | Reference, scannable | Scannable + proof | Skim-to-answer |
| **CTA pressure** | Zero | Zero (junctions only) | One, at end | One, single-purpose |
| **Transition style** | Lateral-first | Vertical-aware (breadcrumbs) | Up to System | Release back to layers |

---

## Universal behavioral constraints

- No popups.
- No signup walls.
- No urgency / scarcity language.
- No role-switching nav (nav is stable for all intent states).
- No flattening System into one link.
- Depth is always *pulled*, never pushed.
- Every page lets the reader rest.
- Every deeper move is an open door, not a corridor.

---

## Language Layer UX Constraints

All UI text must comply with the Language Hierarchy System.

### Rules

1. Entry Layer must dominate all first-touch UI
2. Gateway vocabulary is used for transformation points only
3. Core vocabulary is restricted to deep content contexts only

### UI Exposure Rules

- Homepage: Entry only
- Navigation: Entry + minimal Gateway
- Reflection flow: Gateway allowed
- Deep articles / system pages: Core allowed

### Anti-patterns

- Using Cognitive Pattern in onboarding
- Exposing ontology terms without progression
- Mixing all layers in a single UI surface

UX must never flatten cognitive depth into a single layer.