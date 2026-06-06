# Paritsea — Editorial Decisions
**Document type:** Pre-rewrite decision register. Read-only until decisions are made.
**Created:** 2026-06
**Status:** Open — awaiting author review
**Source:** Derived from content-audit.md (2026-06) against architecture.md, language-system.md, paritsea-principles.md

> This document converts audit findings into explicit decisions before any rewrite begins.
> No content has been modified. No pages have been changed.
> Every section below is a prerequisite to implementation — not an implementation.

---

## How to use this document

**Section A** — Terminology fixes that can be implemented immediately. No judgment needed. Author may approve the entire section in one decision.

**Section B** — Six editorial decisions that require author judgment. Each decision has material trade-offs. No recommendation is made. Author selects an option — or proposes a third path.

**Section C** — Content that cannot be written without author input. Author must provide the raw material; it cannot be derived from existing documents. Includes an interview questionnaire for the About page rewrite.

**After all decisions are made:** return to content-audit.md Rewrite Priority Matrix and implementation may proceed in order (Priority 1 → Priority 2 → Priority 3).

---

## Section A — Approved Terminology Fixes

**Status:** READY FOR IMPLEMENTATION

These fixes are deterministic. They require no editorial judgment. Each is a direct consequence of already-approved decisions (D-002, D-004, D-029) and documented naming rules in architecture.md and language-system.md §9.

No author input is required. The full list may be approved and implemented in one session.

---

### A-01 — "The Method" → "Journal" in StructuralIndexPage

| Field | Detail |
|-------|--------|
| **Current term** | `"The Method"` |
| **Replacement term** | `"Journal"` / `"the Journal"` (context-dependent) |
| **Affected file** | `src/components/StructuralIndexPage.astro` |
| **Rationale** | "The Method" was the pre-Phase 1 name for the Journal layer. D-002 renamed it "Journal." The i18n keys `methodDescription`, `methodSecondary`, `methodFlowNote` still carry the old name in their copy strings. The h1 renders "Journal" but all explanatory copy beneath it says "The Method" — a split identity on the same page. |
| **Scope** | All instances of "The Method" in EN copy strings. TH equivalent (`"The Method"` used directly) — same replacement. |

---

### A-02 — "The Method" → "Journal" in Implementation integrationNote

| Field | Detail |
|-------|--------|
| **Current term** | `"The Method"` (in `integrationNote` copy string) |
| **Replacement term** | `"Journal"` |
| **Affected file** | `src/pages/implementation.astro` (EN and TH copy objects) |
| **Rationale** | Same root cause as A-01. The Implementation page references the old Journal name in the integration note. EN: `"This layer connects back to The Method and YouTube reflections"`. TH: `"ชั้นนี้เชื่อมกลับไปยัง The Method และ YouTube"`. |

---

### A-03 — "enforce doctrine" → "apply the Framework" in Implementation description

| Field | Detail |
|-------|--------|
| **Current term** | `"enforce doctrine, protocols, and standards"` |
| **Replacement term** | `"apply the Framework, Protocols, and Standards"` |
| **Affected file** | `src/pages/implementation.astro` (EN description copy) |
| **Rationale** | Two violations in one phrase. (1) "Doctrine" is the old Framework name — D-004. (2) "Enforce" is compliance/legal register; Paritsea vocabulary uses "apply." language-system.md §6 Avoid Vocabulary prohibits compliance-register verbs. The TH equivalent should follow the same correction. |

---

### A-04 — "derived from the Doctrine" → "derived from the Framework" in Protocols copy

| Field | Detail |
|-------|--------|
| **Current term** | `"Protocols are formal structural instruments derived from the Doctrine."` |
| **Replacement term** | `"Protocols are formal structural instruments derived from the Framework."` |
| **Affected file** | `src/components/StructuralIndexPage.astro` (Protocols description copy) |
| **Rationale** | "Doctrine" is the pre-Phase 1 name for Framework. D-004 archived this name. Its presence in the Protocols page description contradicts the renamed architecture. |

---

### A-05 — "foundational doctrine" → "foundational Framework" in Protocols copy

| Field | Detail |
|-------|--------|
| **Current term** | `"No protocol may contradict the foundational doctrine."` |
| **Replacement term** | `"No protocol may contradict the foundational Framework."` |
| **Affected file** | `src/components/StructuralIndexPage.astro` (Protocols no-contradiction copy) |
| **Rationale** | Same root cause as A-04. Uppercase "Framework" aligns with the naming convention in architecture.md §Naming conventions. |

---

### A-06 — "translate doctrine" → "translate Framework obligations" in Standards copy

| Field | Detail |
|-------|--------|
| **Current term** | `"Standards translate doctrine into measurable conditions."` |
| **Replacement term** | `"Standards translate Framework obligations into measurable conditions."` |
| **Affected file** | `src/components/StructuralIndexPage.astro` (Standards description copy) |
| **Rationale** | "Doctrine" is the old name — D-004. The replacement "Framework obligations" also introduces the correct precision: Standards sit beneath Protocols (which carry obligations), so "Framework obligations" (as expressed through Protocols) is the accurate chain. |

---

### A-07 — "Constitutional Doctrine" → "Constitutional Framework" in i18n label

| Field | Detail |
|-------|--------|
| **Current term** | i18n key `constitutionalDoctrine` renders as `"Constitutional Doctrine"` |
| **Replacement term** | `"Constitutional Framework"` |
| **Affected file** | `src/utils/i18n.ts` (key value, both EN and TH) |
| **Rationale** | The Framework page badge — the most visible label on the highest-authority page in the System layer — still carries the old name. The i18n key name (`constitutionalDoctrine`) may be left as-is for now; only the rendered string value changes. |

---

### A-08 — `labels.doctrine` → "Framework" where user-facing on Framework page

| Field | Detail |
|-------|--------|
| **Current term** | `labels.doctrine` renders as `"Doctrine"` |
| **Replacement term** | `"Framework"` |
| **Affected file** | `src/utils/i18n.ts` (EN and TH value for this key) |
| **Rationale** | Any user-facing surface that renders `labels.doctrine` as "Doctrine" carries the old name. The Framework page is the only page where this label appears. The key name is internal and may be preserved. |

---

### A-09 — `"Implementations"` H1 title → `"Implementation"` (singular)

| Field | Detail |
|-------|--------|
| **Current term** | H1 page title: `"Implementations"` (plural) |
| **Replacement term** | `"Implementation"` (singular) |
| **Affected file** | `src/pages/implementation.astro` (EN and TH title copy) |
| **Rationale** | architecture.md §Naming conventions: "Hub pages (Journal / System / Implementation) — singular." The nav label is "Implementation" (singular). The page title is "Implementations" (plural). This mismatch is architectural. |

---

### A-10 — Remove `"Further instruments forthcoming"` from Protocols and Standards

| Field | Detail |
|-------|--------|
| **Current term** | `"Further instruments forthcoming"` |
| **Replacement term** | *(remove — no replacement)* |
| **Affected file** | `src/components/StructuralIndexPage.astro` (appears in both Protocols and Standards copy) |
| **Rationale** | language-system.md §2 P-08: "unhurried rhythm; never rushed." Forward promises ("forthcoming") describe a future state. language-system.md §8 for Protocol and Standard: the page answers what the obligation IS or what the condition IS — not what is planned. Current-state only. |

---

### A-11 — Journal intro: format description → layer role definition

| Field | Detail |
|-------|--------|
| **Current term** | `"The Method includes both essays and video reflections inside one knowledge flow."` |
| **Replacement term** | A one-sentence layer role definition: what the Journal IS (observation made legible, not yet governed), not what format it uses |
| **Affected file** | `src/components/StructuralIndexPage.astro` (Journal intro copy — `methodFlowNote` key or equivalent) |
| **Rationale** | language-system.md §7 Page introductions: "States what the layer IS, not what it does for the reader." The current intro describes format mix (essays + video). This is the wrong answer. The intro should define the Journal layer's altitude: observations named before they are formalized. |
| **Note** | The replacement sentence must be authored; this is not a find-and-replace. Proposed draft for author review: `"These are observations named before they become governed. Seeing before structuring."` Author may approve, modify, or write an alternative. |

---

**Summary of Section A — 11 fixes, all READY FOR IMPLEMENTATION**

| Fix ID | File | Type |
|--------|------|------|
| A-01 | StructuralIndexPage.astro | Terminology — old layer name |
| A-02 | implementation.astro | Terminology — old layer name |
| A-03 | implementation.astro | Terminology + register |
| A-04 | StructuralIndexPage.astro | Terminology — old document name |
| A-05 | StructuralIndexPage.astro | Terminology — old document name |
| A-06 | StructuralIndexPage.astro | Terminology — old document name |
| A-07 | i18n.ts | Label — old document name |
| A-08 | i18n.ts | Label — old document name |
| A-09 | implementation.astro | Structural — singular/plural |
| A-10 | StructuralIndexPage.astro | Register — promise language |
| A-11 | StructuralIndexPage.astro | UX copy — intro purpose |

---

## Section B — Editorial Decisions Required

Each item below requires author judgment before implementation may proceed. Trade-offs are presented. No final recommendation is made.

The author must select an option — or propose a different path — before this section moves to implementation.

---

### B-01 — Home: Sessions block

**Issue**
The Home page contains a full "Online Sessions" section that does not appear in ux-blueprint.md §1 approved sections. It includes daily scheduling copy, a join CTA, and session descriptions. The section carries multiple violations flagged in the content audit:
- EN `"Join Today's Session →"` / TH `"เข้าร่วม Session วันนี้ →"` — urgency words prohibited in language-system.md §8 P-08
- `"Safe, private, no-pressure."` / `"You don't have to carry everything alone."` — therapy-register framing, prohibited in language-system.md §3
- `"Explore Paritsea first"` adds a third CTA; blueprint specifies exactly two hero CTAs

**Current state**
The Sessions block is live on the Home page. It is presumed to be operationally active (real sessions at a real time). The section is currently functional.

**The core question**
Does the sessions offering belong in this architecture? If yes, where?

**Option 1 — Remove from Home; create a dedicated `/sessions` page**

The sessions content is moved to its own page outside the current page taxonomy. The Home page reverts to its approved blueprint. The sessions page is linked from the ecosystem section or footer only.

*Architectural impact:* Adds a page outside the current closed taxonomy (D-017: page taxonomy is closed; new page types require a new foundational decision). Would require a new architectural decision record.

*Language-system impact:* The sessions content itself still needs register revision before it appears anywhere. The therapy framing (`"You don't have to carry everything alone"`) violates the language system at any location.

---

**Option 2 — Remove from Home; move sessions CTA to About or footer**

Sessions content is removed from Home entirely. A single line or link pointing to the sessions offering appears in the footer or About page, without structural expansion.

*Architectural impact:* Preserves closed taxonomy. Does not require a new architectural decision. Minor About or footer edit only.

*Language-system impact:* The sessions offering still needs a compliant one-line description; the current copy cannot be used as-is anywhere.

---

**Option 3 — Remove sessions content from Home; operate sessions separately (outside Paritsea)**

Sessions are not referenced anywhere on the Paritsea site. They are managed through a different channel (LinkedIn, direct, SE Ocean, or other). Paritsea's Home returns to its approved purpose: worldview entry point, not scheduling interface.

*Architectural impact:* None — restores approved blueprint.

*Language-system impact:* None — the violation is removed, not relocated.

---

**Decision required from author:**
Where does the sessions offering live — within Paritsea, adjacent to it, or fully separate from it?

---

### B-02 — Home: Comparative framing in content breadth heading

**Issue**
The section heading currently reads:
- EN: `"Ideas that go beyond Motivation"`
- TH: `"แนวคิดที่ไม่ได้หยุดแค่ Motivation"`

Both position Paritsea against a category ("Motivation"). language-system.md §1 explicitly prohibits this: "Position itself against other systems." This is a section heading — visible at high prominence. The heading intends to signal content breadth (Life & Meaning / Work & Organizations / People & Mind / Growth & Transition) but does so through comparative framing.

**Current state**
The four-topic grid (Life & Meaning / Work & Organizations / People & Mind / Growth & Transition) is correctly altitude-appropriate for the Home surface. Only the heading over the grid is the violation. The topics themselves are unaffected.

**Option 1 — Rename to describe what the topics ARE, not what they go beyond**

Replace with a heading that names what the topics share — the lens applied across human experience — without naming what category is being surpassed.

Examples of compliant directions (for author to refine or replace):
- `"Where this lens reads"` — describes the domains the lens applies to
- `"Across systems and people"` — states the two dimensions Paritsea holds simultaneously
- `"What Paritsea covers"` — direct, functional, no comparative framing

*Architectural impact:* None — one heading change.

*Language-system impact:* Resolves the §1 violation. The new heading must pass language-system.md §7 Section headings rules: "Descriptive, not imperative. No 'How to,' 'Top X,' 'Why you should.'"

---

**Option 2 — Remove the heading; let the topic grid stand without an overarching label**

The four topics appear without an introductory section heading. The grid is self-explanatory.

*Architectural impact:* None.

*Language-system impact:* Resolves the violation by removal. Valid approach if the author finds that no heading better than the current one can be written without forced phrasing.

---

**Decision required from author:**
What should the content breadth section heading say, or should it be removed?

---

### B-03 — STP Protocol: Essay-altitude preamble

**Issue**
The Structural Transparency Protocol (STP) opens with approximately 600 words of preamble across two sections:
- `"An Industry Challenge to Agencies"` — observational essay critiquing the agency industry
- `"Why This Protocol Exists"` — persuasion-register rationale for the protocol

The content audit identified these as Journal/essay altitude writing embedded inside a Protocol document. The Protocol body (The Five Structural Exposures) is correctly written at Protocol altitude. The two sections before it are not.

Per language-system.md §8 Protocol: the page answers "What obligation does this establish?" — not "Why does the industry have this problem?"

**Current state**
The preamble sections are live in the STP document. They contain some strong observational writing — particularly: `"Clients are sold clarity. What they receive is structure."` — but the sections as a whole operate at the wrong altitude for a Protocol.

**Option 1 — Remove preamble entirely; replace with one-paragraph declarative position note**

The "An Industry Challenge" and "Why This Protocol Exists" sections are deleted. A short declarative position note replaces them, stating: what STP derives from (Framework), what obligation it establishes (structural transparency), and how it sits above ASLS-01.

Example draft (for author to approve or revise): `"Structural Transparency Protocol derives from the Paritsea Framework. It establishes the obligation of structural transparency as a non-negotiable condition of legitimate agency-client practice. This document is not a guideline — it is a declaration of what must hold."`

*Architectural impact:* The Protocol becomes 600 words shorter. The Five Structural Exposures section (the actual protocol content) is not touched.

*Language-system impact:* Resolves the altitude violation. The preamble's strong observational sentences ("Clients are sold clarity. What they receive is structure.") would be lost unless extracted.

---

**Option 2 — Extract preamble to a linked Journal entry; replace with position note**

The content of "An Industry Challenge to Agencies" and "Why This Protocol Exists" is moved to a new Journal entry that contextualizes the industry problem before the reader enters the Protocol. The Protocol itself begins with a position note (per Option 1). A one-line bridge links to the Journal entry: `"The industry context that prompted this Protocol →"`

*Architectural impact:* Creates a new Journal entry. Adds a cross-layer link (Journal → Protocol, which is directional from seeing → structuring — a permitted link direction per navigation-model.md §5).

*Language-system impact:* Resolves the altitude violation. The observational content is preserved at its correct altitude. The Journal entry will need register revision to ensure it operates at Journal altitude (not persuasion altitude).

---

**Option 3 — Retain preamble; add a register disclaimer**

No structural change. A short notice appears at the top: `"The following sections provide industry context. The Protocol itself begins at The Five Structural Exposures."` This is a structural workaround, not a resolution.

*Architectural impact:* None to file structure. The Protocol continues to contain content at the wrong altitude.

*Language-system impact:* Does not resolve the altitude violation — it labels it. This option is inconsistent with the content governance model (D-016: one altitude per page) but may be preferable if the author wants to preserve the preamble in its current form as a deliberate choice.

---

**Decision required from author:**
Should the STP preamble be removed, extracted to Journal, or retained with a structural note?

---

### B-04 — Implementation: integrationNote (pipeline framing on the wrong page)

**Issue**
The Implementation page contains an `integrationNote` that reads:
- EN: `"This layer connects back to The Method and YouTube reflections"` (post A-02 fix: `"...connects back to the Journal and YouTube reflections"`)
- The note explains how Implementation connects through the pipeline back to Journal

Content audit finding: this is pipeline-level framing that belongs on the System hub, not on the Implementation page. Implementation's role is to show applied systems — not to explain the pipeline architecture. The pipeline is the System hub's job (language-system.md §8 System: "Orient the reader to the structuring layer before routing to sub-pages").

**Current state**
The note is live in `implementation.astro`. After the A-02 terminology fix, the old name issue is resolved, but the architectural placement issue remains.

**Option 1 — Remove integrationNote from Implementation**

The note is deleted from the Implementation page. Implementation's intro focuses on what the applied reference layer IS and what qualifies as an implementation — no pipeline explanation.

*Architectural impact:* Cleaner page. The pipeline framing exists correctly on the System hub already. No content is lost architecturally.

*Language-system impact:* Resolves the altitude issue. Implementation page answers its permitted question ("Where and how does this actually work in reality?") without borrowing System's altitude.

---

**Option 2 — Move integrationNote to System hub**

The note is removed from Implementation and a parallel expression of the pipeline link (seeing → structuring → doing) is added to or reinforced in the System hub.

*Architectural impact:* System hub already has a layer spine section (`Journal → System → Implementation`). This option would be an addition to existing System content. May be redundant given what the hub already contains.

*Language-system impact:* Neutral if the System hub already covers it. The move is architectural housekeeping.

---

**Option 3 — Retain integrationNote in shortened form**

Keep a one-line version that names the connection without explaining the pipeline. Example: `"Implementations are governed by Protocols and Standards."` — this states what governs them (upward link) without narrating the pipeline.

*Architectural impact:* None.

*Language-system impact:* The shortened version must pass language-system.md §8 Implementation altitude. "Governed by Protocols and Standards" is an upward architectural reference — appropriate for the Implementation layer.

---

**Decision required from author:**
Should the integrationNote be removed, moved to System, or replaced with a shorter upward reference?

---

### B-05 — Protocols and Standards: position notes in primary column

**Issue**
ux-blueprint.md §6 (Protocols) and §7 (Standards) require a position note as the first structural element in the primary column. Currently, position-context content lives in the aside blocks ("About Protocols," "Derived From," "Relationship to Protocols"). The primary column has no opening orientation statement.

**Current state**
Aside blocks carry the correct content. Primary column opens directly into the entry list or entry cards. The position note function is partially fulfilled — but not in the specified location.

This applies to both the Protocols index page and the Standards index page.

**Proposed position notes (for author review):**

*Protocols:*
`"Protocols derive from the Framework. Each defines an obligation — what must hold in structural practice."`

*Standards:*
`"Standards derive from Protocols. Each defines a verifiable condition — the threshold by which a Protocol's obligation is assessed."`

**Option 1 — Add approved position notes to primary column**

The proposed one-liners above are added as the first visible text in the primary column, above the entry list. Author approves the exact wording.

*Architectural impact:* Adds 1–2 lines to each page's primary column. Entry list follows as before.

*Language-system impact:* Resolves the missing position note. Wording must pass language-system.md §7 Page introductions rules (1–2 sentences; states what the layer IS; does not start with "Welcome to").

---

**Option 2 — Move aside position content to primary column; remove aside**

The "About Protocols" and "About Standards" content is moved from the aside to the primary column intro. The aside is removed or repurposed.

*Architectural impact:* Page layout changes. Aside removal is a structural component decision.

*Language-system impact:* Neutral if the content moves unchanged. The longer aside content (4–6 lines) is more than a position note — it would need trimming to 1–2 sentences for the primary column intro role.

---

**Decision required from author:**
Approve the proposed position note wording above, or provide alternate text? Also: should the aside content change when the primary column gets a position note?

---

### B-06 — Framework: position statement prominence

**Issue**
ux-blueprint.md §5 requires the Framework page to open with a position statement as its first required section. The `doctrineNotice` copy provides correct content: `"This document forms the foundational authority for all Paritsea Protocols and Standards."` However, this content currently renders as a `<span>` inside a small notice badge — not as a distinct structural statement with appropriate prominence.

The content is right. The visual treatment does not match the authority of the statement.

**Current state**
The notice badge is visually small relative to the authority it declares. A reader scanning the page quickly sees the title and document body before the position statement. The hierarchy is inverted: the derivative content (the document) is visually louder than the governing statement (the position note).

**Option 1 — Elevate doctrineNotice to a full structural section above document body**

The notice text is promoted from a badge `<span>` to a clearly demarcated section — distinct from the document body, distinct from the badge. It appears above the document content, not inside it.

The promoted statement would read (for author to refine): `"This document forms the foundational authority for all Paritsea Protocols and Standards. It is immutable — it is referenced, not revised."`

*Architectural impact:* Component/layout change in `framework.astro`. The `doctrineNotice` text may be promoted to a new visual treatment (e.g., a full-width declarative block above the document renderer).

*Language-system impact:* Resolves the prominence issue. The statement already passes language-system.md §8 Framework: authoritative, sparse, fixed.

---

**Option 2 — Add a secondary heading below the page title, above the badge**

A second-level heading is added: `"Foundational position"` or `"Authority"` — followed by the position note text. The badge remains as a supplementary element.

*Architectural impact:* Minor. Adds a heading level before the badge.

*Language-system impact:* Neutral if the text is unchanged.

---

**Option 3 — Leave as-is; rely on badge**

The badge is trusted to carry the weight. No structural change.

*Architectural impact:* None.

*Language-system impact:* The audit finding stands — the content is correct; the prominence does not match the authority. This option is an acceptance of the current trade-off.

---

**Decision required from author:**
How prominently should the Framework position statement appear, and what visual treatment should it receive?

---

**Summary of Section B — 6 decisions required**

| ID | Issue | File(s) affected |
|----|-------|-----------------|
| B-01 | Home Sessions block — location decision | `implementation.astro` / new page / none |
| B-02 | Home comparative framing — new heading or remove | `index.astro` |
| B-03 | STP Protocol preamble — remove / extract / retain | STP document content |
| B-04 | Implementation integrationNote — remove / move / shorten | `implementation.astro` |
| B-05 | Protocols + Standards position notes — wording approval | `StructuralIndexPage.astro` |
| B-06 | Framework position statement prominence — layout decision | `system/framework.astro` |

---

## Section C — Author Input Required

This section contains items that cannot be implemented without author-provided content or knowledge. No AI rewrite can substitute for this input. Each item specifies exactly what is needed.

---

### C-01 — About page: origin narrative

**What is missing**

The About page currently does not contain what it is supposed to contain. Its approved purpose (architecture.md, language-system.md §8 About, paritsea-principles.md §Who Paritsea is): `"Where does this lens come from, and who holds it?"`

The current About answers: "What Paritsea sees" and "What you can do with it." Neither is the right answer.

The origin question — the formative experience, the moment or pattern that created the beneath-the-surface movement — is entirely absent from the page. This cannot be inferred from any existing document or copy.

**What the author must provide**

1. The formative experience(s) that created the habit of reading beneath the surface — not a list of influences, but what actually happened
2. An honest account of who holds this lens — not as a credential claim, but as a person: where they have stood, what they have watched, what they could not unsee
3. The answer to: why do Paritsea's topics (systems AND people) always appear together — what in the author's experience made them inseparable

**What the rewrite team will do with the input**

The interview responses will be transformed into copy that passes language-system.md §7 and §8 About requirements: personal, first-person, grounded, non-promotional. The author does not need to write the final copy — only to provide the raw material. The raw material is the origin story.

---

### C-01a — About page interview questionnaire

The following 20 questions are designed to extract the origin story behind the lens. They are not biographical trivia. They are structured to surface formative experiences, pattern-recognition habits, and the reasons Paritsea exists as it does.

The author does not need to answer every question. The goal is to surface what is true — not to complete a form.

**Instructions for the interview:**
Write as if speaking directly to someone who understands the work. Do not edit for presentation. Raw answers are better than polished ones. Specificity is more valuable than comprehensiveness.

---

**I. Before the Framework**

1. What situation did you find yourself in — before you could name what you were actually seeing — that you now understand was the beginning of this?

2. When you look back at a specific moment where something became visible to you that was invisible to everyone else in the room — what was happening? What did you see?

3. What is the thing you have noticed most consistently across very different situations — in organizations, in relationships, in people — that others seem to walk past without registering?

4. Was there a time when you tried to explain what you were seeing to someone, and they could not see it? What did that experience feel like? What did it clarify for you?

5. What is the earliest situation you can recall where you understood that the visible surface of something was not the actual thing?

---

**II. The lens itself**

6. You hold two things together that are usually discussed separately: systems (organizations, structures, processes) and people (psychology, wounds, inner experience). When did you understand that separating them was a mistake?

7. Most people who notice structural problems stop at the structure. Most people who notice human problems stop at the human. Why do you not stop at either?

8. What did observing people in "real situations" actually look like? Where were you standing? What were you watching?

9. When you say Paritsea reads "what's behind" something — not what's visible — what does that act of reading feel like from the inside? What are you actually doing?

10. What is the pattern you have been naming your whole working life, even before you had language for it?

---

**III. Why Paritsea exists as it does**

11. What would go wrong — in the world, for the people you care about — if the beneath-the-surface layer remained unnamed?

12. You chose not to build a consulting practice, a self-help brand, or a content platform. You built a layered thinking system. What motivated that specific shape?

13. What is the thing Paritsea is designed to do that you believed could not be done by anything else you had encountered?

14. Why is it important that Paritsea is one person's lens — not a collective, not a curation? What would be lost if it became something that many voices contributed to?

15. The Framework document is immutable. What made you decide that something should not change — rather than versioning everything? What is at stake in that decision?

---

**IV. The cost of seeing**

16. What has it cost you to see things others do not see — in a relationship, in an organization, in yourself?

17. Is there something you have seen clearly for a long time that you still do not know how to name?

18. What is the hardest thing to make legible — the thing that resists naming even now?

19. Are there situations or types of people where your ability to read beneath the surface fails you? Where are the limits of this lens?

20. What would you want someone to feel after spending time inside Paritsea — not understand, not learn — feel?

---

**V. The AgenSea connection** *(optional — addressed separately in C-02)*

21. AgenSea is described as a structural transparency platform applying ASLS-01. What does someone see when they arrive at it that demonstrates the Framework operating in reality — not just in documentation?

---

### C-02 — AgenSea: observable evidence statement

**What is missing**

The Implementation entry for AgenSea reads:
`"A structural transparency platform for agency-client work that applies ASLS inside discovery, profile logic, trust surfaces, contracts, and operating workflows."`

This describes where AgenSea applies the Standard (scope) but does not show what a reader will actually observe when they arrive at `https://agensea-flame.vercel.app/` that demonstrates the application.

An Implementation entry should give readers something they can verify — not a scope declaration.

**What the author must provide**

One or two sentences describing what is observable at the linked URL that demonstrates ASLS-01 operating in reality. Examples of the right level of specificity:

- `"The agency profile page surfaces disclosure across all five STP structural exposure domains. Each field is structurally required — not optional metadata."`
- `"Discovery intake forms are structured around STP's five exposure categories rather than conventional project brief fields. The form cannot be submitted incomplete."`

The author knows what exists at the platform. This sentence cannot be written without that knowledge.

**Also required (author judgment call)**

The current entry notes `"MVP in development"` — which means the system is not yet fully operational in production. The author must decide:

- Is AgenSea currently documented as an active implementation (with the above evidence), or as a provisional/forthcoming implementation?
- If provisional: should the Implementation page note this explicitly, and what language is appropriate that does not violate language-system.md §8 (current state only; no promise language)?

---

**Summary of Section C — author input required**

| Item | What is needed | Cannot proceed without |
|------|----------------|------------------------|
| C-01 | About page origin narrative | Author interview responses — formative experience, who holds the lens, why systems + people are inseparable |
| C-01a | Interview questionnaire | 20 questions above — raw answers from author |
| C-02 | AgenSea evidence sentence | What is observable at the linked URL demonstrating ASLS-01 application; author judgment on active vs. provisional status |

---

## Implementation Readiness Summary

| Section | Status | Prerequisite |
|---------|--------|-------------|
| **A — Terminology fixes (11 items)** | ✅ READY | Author approves Section A in full; no individual decisions needed |
| **B-01 — Sessions block** | 🔲 BLOCKED | Author chooses: separate page / footer link / remove entirely |
| **B-02 — Comparative heading** | 🔲 BLOCKED | Author approves replacement heading or removal |
| **B-03 — STP preamble** | 🔲 BLOCKED | Author chooses: remove / extract to Journal / retain with label |
| **B-04 — integrationNote** | 🔲 BLOCKED | Author chooses: remove / move to System / replace with upward reference |
| **B-05 — Position notes** | 🔲 BLOCKED | Author approves proposed wording or provides alternate |
| **B-06 — Framework prominence** | 🔲 BLOCKED | Author chooses visual treatment |
| **C-01 — About origin narrative** | 🔲 BLOCKED | Author provides interview responses |
| **C-02 — AgenSea evidence** | 🔲 BLOCKED | Author provides observable evidence sentence + active/provisional decision |

**Minimum required before any rewrite begins:**
Author approval of Section A (enables 11 fixes, ~1–2 hours of implementation).

**Required before About rewrite begins:**
C-01 interview responses.

**Required before Home partial rewrite begins:**
B-01 + B-02 decisions.

**Required before STP revision begins:**
B-03 decision.

**Required before Implementation full revision begins:**
B-04 + C-02 decisions.

**Required before Protocols/Standards position note fixes:**
B-05 approval.

**Required before Framework page restructure:**
B-06 decision.

---

*Document created from content-audit.md (2026-06). No content modified. No pages changed.*
*All items above are prerequisites to implementation — not implementations.*
