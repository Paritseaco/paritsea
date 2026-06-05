# Paritsea — Content Audit
**Document type:** Audit. Read-only findings. No copy changes made.
**Audit date:** 2026-06
**Auditor:** AI — reverse-engineered from page sources vs governance documents
**Sources audited against:** architecture.md, navigation-model.md, ux-blueprint.md, language-system.md, paritsea-principles.md

> This document records findings only. Nothing in this file modifies live content.
> All recommended actions require explicit author approval before any rewrite begins.

---

## Audit Method

For each page, the current rendered copy (from `src/pages/`, `src/components/`, `src/utils/i18n.ts`) was compared against:
1. The page's **approved purpose** (ux-blueprint.md)
2. The **language system rules** (language-system.md)
3. The **page role** (content-governance.md, architecture.md)
4. The **terminology standards** (paritsea-principles.md, decision-log D-029)

---

## HOME `/`

### Current Purpose
Entry point introducing Paritsea as a thinking system. Routes to Journal and Framework. Also currently houses: sessions block, YouTube section, content breadth, worldview, ecosystem links.

### Approved Purpose (ux-blueprint.md §1)
Hero + Worldview + Pathway/Topics + Journal records + Ecosystem + Closing quote. Exactly 2 CTAs in hero. No sessions, no broad promotional content.

### Alignment Score: 6 / 10

### What Works

- **Worldview copy is locked and correct.** The four worldview statements (`Real understanding sees both the world outside — and the person within it.` etc.) are present and unaltered.
- **Hero headline structure** is aligned: `A way of thinking that understands both the complexity of the world — and the depth of people` — correct altitude, no marketing register.
- **2 hero CTAs** (Read Framework + Explore Journal) — correct.
- **Closing quote** is present (`The problem with problems isn't just that they are problems...`) — correct function as coda.
- **"Sometimes we talk about dashboards..."** example — correct use of the concrete-image entry pattern.
- **Thai heroSub** is well-written and matches altitude: not over-philosophical, not sales-y.

### What Violates the Language System

**Structural issue — Sessions block:**
The page currently includes a full "Online Sessions" section (daily sessions at 8 PM, CTA to join). This does not appear in the approved blueprint and introduces a **commercial/service layer** that conflicts with the "never on this page" rule. Specifically:
- `sessionsCTA: "Join Today's Session →"` — urgency CTA, commercial register
- `sessionsNote: "Safe, private, no-pressure."` — therapy-adjacent language
- The entire sessions concept implies live facilitation (a service), not open IP

This content belongs on a **separate page** or not at the site at all, not on Home.

**Vocabulary violation — Content breadth section:**
- EN: `"Ideas that go beyond Motivation"` — comparative framing ("beyond X") is not Paritsea register. Paritsea does not compare itself to categories.
- TH: `"แนวคิดที่ไม่ได้หยุดแค่ Motivation"` — same issue in Thai

**Vocabulary violations in TH ecosystem section:**
- `"เข้าร่วม Session วันนี้ →"` — urgency (`วันนี้` = today) is explicitly prohibited
- `"ดูแนวคิดจาก Paritsea ก่อน"` — `ก่อน` (first/before) implies pressure ordering

**About section (embedded in Home) — register drift:**
- `"ไม่ใช่แค่การแชร์ความรู้"` / `"Not just sharing knowledge"` — the "just" framing is mild but edges toward positioning
- `"understanding the world more deeply"` — aspiration language

### What Violates the Page Role

- **Sessions block does not belong on Home.** Per ux-blueprint §1, Home must never contain: pricing, feature lists, testimonials, founder CV, "newsletter signup." A live community session block is in the same category — it's a service offering, not a lens introduction.
- **Facebook and LINE Group** in ecosystem section are not core to the Paritsea identity as expressed in About or paritsea-principles. Their inclusion expands scope beyond the stated platform identity.
- **Content breadth section:** The copy `"covers life and meaning, work and organizations, human psychology, decision-making..."` reads as a topic menu, not a worldview. This is functional content that pushes toward positioning.

### Rewrite Risk: Medium
The core copy (hero, worldview, coda) is correct. The risk is in removing the Sessions block — that may affect live usage if people rely on it.

### Rewrite Priority: High
The Sessions block is the most urgent violation. The comparative framing in the content breadth section is secondary.

### Recommended Action: Partial Rewrite
- Remove or relocate Sessions section
- Remove or rewrite "goes beyond Motivation" framing
- Retain: hero, worldview, Journal records, ecosystem (trim to YouTube/Instagram/Threads as in About), closing quote

---

## JOURNAL `/journal`

### Current Purpose
Index of analytical observations. Shows entry list. StructuralIndexPage component renders this as "The Method" in some descriptor copy.

### Approved Purpose (ux-blueprint.md §2)
Layer intro (1–2 lines: observation, not yet governed) + entry list. No CTA. No newsletter.

### Alignment Score: 7 / 10

### What Works

- **"ANALYTICAL REGISTRY"** eyebrow on the live page — correct altitude signal
- **ProtocolsDescription/methodDescription** in EN: `"The Method is the analytical registry of the framework. It identifies structural tension, names operational cost, and holds recurring patterns still long enough to be understood before they are formalised elsewhere."` — well-written, correct altitude
- `"These are reference observations, not opinion pieces."` — correct register
- `"The Method includes both essays and video reflections inside one knowledge flow."` — technically correct
- Thai version is accurate and carries the same altitude

### What Violates the Language System

**Terminology violation — stale name "The Method":**
The approved architecture renamed "The Method" to "Journal" (Phase 1–2). However, the StructuralIndexPage component's copy still uses "The Method" extensively in its descriptive text:
- EN: `"The Method is the analytical registry..."` — should read `"Journal"`
- EN: `methodDescription`, `methodSecondary`, `methodFlowNote` keys all use "The Method"
- TH: `"The Method รวมทั้งบทความและวิดีโอสะท้อนคิด..."` — same violation

The UI renders the h1 as "Journal" (via `navLabels.Protocols` / `navLabels` mapping) which is correct. But the descriptive text beneath still calls it "The Method." This creates a terminology split on the same page: headline says Journal, body says The Method.

**Architecture violation — "integrationNote" on Implementation page references "The Method":**
Implementation's `integrationNote` EN: `"This layer connects back to The Method and YouTube reflections"` — should say "Journal."

### What Violates the Page Role

- **`methodFlowNote`**: `"The Method includes both essays and video reflections inside one knowledge flow."` — The page intro should define the layer (seeing → observation) not describe its format mix. Format description is not a layer definition.
- **`further: "Further instruments forthcoming"`** — forward-looking promise. The page should serve current content only.

### Rewrite Risk: Low
Descriptive text is secondary to the entry list. Swapping "The Method" → "Journal" throughout is a targeted find-and-replace operation on the component.

### Rewrite Priority: Medium
The terminology inconsistency is a discoverability issue (confusing for returning readers who know the old name) but does not break the page's function.

### Recommended Action: Light Revision
- Replace all `The Method` references in copy with `Journal`
- Update `methodFlowNote` to define the layer, not the format mix
- Remove `further: "Further instruments forthcoming"` (a promise, not a description)

---

## SYSTEM `/system`

### Current Purpose
Hub page orienting the user to the Structuring layer. Shows three sub-page cards + derivation chain + layer spine.

### Approved Purpose (ux-blueprint.md §4)
Layer definition + three cards + derivation order explicit. Junction, not funnel.

### Alignment Score: 9 / 10

### What Works

- **All 5 required blueprint sections present:** layer definition, Framework card, Protocols card, Standards card, derivation order.
- **Layer spine section** (Journal → System → Implementation) — beyond spec, useful without violating rules.
- **Eyebrow "STRUCTURING"** — correct altitude signal.
- **Intro copy:** `"When observations in the Journal layer become patterns consistent enough to govern, they are formalized here."` — exactly right.
- **Three equal-weight cards** — correct junction pattern.
- **"System is not an opinion archive."** disambiguation — correct, not over-explained.
- **Thai version** carries identical altitude — well-written.

### What Violates the Language System

Minor issue only:
- **Thai eyebrow** `"STRUCTURING"` — this is English in Thai context. This is fine (nav is all-English per D-029), but it's worth noting that it's a label not a Thai translation.

### What Violates the Page Role

Nothing significant. This page was built to spec after Phase 4–6.

### Rewrite Risk: Negligible

### Rewrite Priority: Low

### Recommended Action: Leave As-Is

---

## FRAMEWORK `/system/framework`

### Current Purpose
Renders the constitutional Framework document ("The Paritsea Doctrine of Structural Coherence and Legitimacy") from the CMS. Marked "Constitutional Document — Immutable."

### Approved Purpose (ux-blueprint.md §5 / content-governance.md)
Immutable foundational document. Authoritative, sparse, fixed. No changelog, no opinion framing.

### Alignment Score: 8 / 10

### What Works

- **"Constitutional Document"** badge — correct signal
- **"This document forms the foundational authority for all Paritsea Protocols and Standards. It is immutable."** — correct framing
- **"Constitutional Doctrine"** badge label — appropriate (though note: the document is the Framework, previously called Doctrine)
- Section structure (Foundational Premise, Structural Coherence, etc.) is authoritative and sparse
- **"Legitimacy arises from structural coherence."** — exemplary Framework register

### What Violates the Language System

**Label inconsistency — "Constitutional Doctrine":**
The UI badge reads "Constitutional Doctrine" but the nav and governance call this the Framework. The ux-blueprint refers to it as Framework. "Doctrine" is the old name (The Doctrine, pre-Phase 1). In the Admin UI, the document might be internally named "doctrine" but the user-facing badge should use "Framework."

Specifically:
- `constitutionalDoctrine: "Constitutional Doctrine"` in i18n.ts — should be "Constitutional Framework"
- `labels.doctrine: "Doctrine"` — referenced in the doc badge; should align with "Framework"

**Eyebrow / page position note:**
ux-blueprint specifies that Framework page should have: "1. Position note — immutable root, one-line; 2. Derivation statement; 3. Document content." Currently the Framework page is the full document without a distinct position note ABOVE the document itself. The breadcrumb (System / Framework) serves the navigation function, but there's no one-line position statement on the page.

### What Violates the Page Role

- Minor: The "About Framework" section from the parent Protocols page (not on Framework directly) calls it "derived from the Doctrine" — should say "derived from the Framework." This is in StructuralIndexPage copy.

### Rewrite Risk: Low

### Rewrite Priority: Medium
The "Constitutional Doctrine" label is a visible terminology inconsistency on a high-authority page.

### Recommended Action: Light Revision
- Change `constitutionalDoctrine` label to "Constitutional Framework"
- Consider adding a one-line position note above the document content on the Framework page

---

## PROTOCOLS `/system/protocols`

### Current Purpose
Index of published Protocols. Currently shows: eyebrow, description, "About Protocols" aside, "Derived From" aside, entry list.

### Approved Purpose (ux-blueprint.md §6)
Position note + Protocols list + derivation from Framework.

### Alignment Score: 6 / 10

### What Works

- **"About Protocols" aside** — well-written: `"Each protocol is a public structural instrument. Protocols are not tips, best practices, or style recommendations."` — exactly the right negative-definition pattern.
- **Derivation statement** with link to Framework — structurally correct.
- `"No protocol may contradict the foundational doctrine."` — correct authority line.
- **Breadcrumb: System / Protocols** — present ✅

### What Violates the Language System

**Critical terminology violation — "Doctrine" still used:**

EN `protocolsDescription`: `"Protocols are formal structural instruments derived from the Doctrine."` — **"the Doctrine" is the old name.** Should say "the Framework."

EN `noContradiction`: `"No protocol may contradict the foundational doctrine."` — same violation. Should say "the foundational Framework."

EN `derivedFromText`: `"All protocols derive authority from"` → link says "Paritsea Framework" ✅ — this one is correct, but the description above it still says "Doctrine."

**TH version — partially correct:**
- TH `protocolsDescription`: `"โปรโตคอลคือเครื่องมือเชิงโครงสร้างที่สืบเนื่องจากหลักการ"` — uses "หลักการ" (principles) not "Framework" — this is acceptable in Thai body copy, but slightly inconsistent with the EN version's intent.
- TH `noContradiction` does not appear in the TH copy checked — needs verification.

**Register issue — `further: "Further instruments forthcoming"`:**
This is a forward-looking promise at the bottom of a governed reference index. It does not belong on a governance page — governance pages describe what is, not what will be.

### What Violates the Page Role

- **`integrationNote` in Implementation** (not this page, but referenced here): `"This layer connects back to The Method"` — still uses old name.
- **Position note partially missing**: ux-blueprint §6 requires: "Position note — derives from Framework, sits above Standard." The current page does not have an explicit single-line position statement in the main column.

### Rewrite Risk: Low

### Rewrite Priority: High
"Derived from the Doctrine" is a visible terminology violation on a governance page. Easy to fix; important to fix.

### Recommended Action: Light Revision
- Replace `"derived from the Doctrine"` → `"derived from the Framework"` in EN description
- Replace `"foundational doctrine"` → `"foundational Framework"` in noContradiction
- Remove `"Further instruments forthcoming"` (forward promise, not governance language)
- Add a one-line position note in the primary column

---

## STANDARDS `/system/standards`

### Current Purpose
Index of published Standards. Currently shows: eyebrow, description, "About Standards" aside, "Relationship to Protocols" aside, entry list.

### Approved Purpose (ux-blueprint.md §7)
Position note + Standards list + obligation/threshold disambiguation.

### Alignment Score: 7 / 10

### What Works

- **"About Standards" aside** copy is well-written: `"Standards translate structural obligations into verifiable conditions."` — correct altitude.
- **Relationship to Protocols** section: `"A Protocol establishes the obligation; a Standard defines the threshold."` — this is the exact obligation/threshold disambiguation required by the spec.
- **Breadcrumb: System / Standards** — present ✅
- **Standards description** is technically accurate.

### What Violates the Language System

**Terminology issue — "doctrine" references in description:**
EN `standardsDescription`: `"Standards translate doctrine into measurable conditions."` — **"doctrine" is the old name.** Should say "Standards translate the Framework into measurable conditions."

**Vocabulary register issue:**
EN `aboutStandardsText`: `"turning abstract claims into criteria that can be tested, interpreted, and implemented."` — the word "implemented" at the end of a Standards description is ambiguous (it could mean the Standard is then used in an Implementation, but the sentence doesn't make that clear). Minor but worth noting.

### What Violates the Page Role

- **Missing explicit derivation statement**: Unlike Protocols, Standards don't have a clear "derives from Protocol" derivation statement in the UI. The relationship is described in `aboutStandards` but not positioned as a structural declaration.
- **`further: "Further instruments forthcoming"`** — same as Protocols, this is a promise not a description.

### Rewrite Risk: Low

### Rewrite Priority: Medium
The "doctrine" → "Framework" replacement is the main fix needed.

### Recommended Action: Light Revision
- Replace `"Standards translate doctrine into..."` → `"Standards translate the Framework into..."`
- Add explicit derivation statement: "Standards derive from Protocols, which derive from the Framework."
- Remove `"Further instruments forthcoming"`

---

## IMPLEMENTATION `/implementation`

### Current Purpose
Index of documented system implementations. Currently shows one entry (AgenSea). Includes qualification rule, reference integrity statement, current reading note.

### Approved Purpose (ux-blueprint.md §9 / content-governance.md)
Applied Reference Layer. Shows systems that enforce doctrine/protocols/standards in real environments. Evidence-based, demonstrative.

### Alignment Score: 6 / 10

### What Works

- **"Applied Reference Layer"** eyebrow — correct altitude signal.
- **Qualification Rule** section: `"An implementation must apply Paritsea structurally, not cosmetically."` — excellent. This is exactly the right precision language.
- **Reference Integrity section**: The prohibition against converting Standards into "star ratings, leaderboard mechanics, sponsored discovery" — well-written and precise.
- **AgenSea entry** — the description is factual and concrete (correct Implementation altitude).
- **Breadcrumb would work here** — however, Implementation doesn't have a breadcrumb (correct per spec: breadcrumbs only on `/system/*`).

### What Violates the Language System

**Critical terminology violation — "The Method" reference:**
EN `integrationNote`: `"This layer connects back to The Method and YouTube reflections"` — **"The Method" is the old name for Journal.** Should say `"This layer connects back to the Journal and YouTube reflections."`

TH `integrationNote`: `"ชั้นนี้เชื่อมกลับไปยัง The Method และ YouTube"` — same violation.

**Terminology issue — "enforce doctrine":**
EN `description`: `"Implementations are the applied layer of Paritsea: documented systems that enforce doctrine, protocols, and standards in real environments."` — **two issues:**
1. "enforce" is too prescriptive/compliance-register for Paritsea. Better: "apply" or "embody."
2. "doctrine" is the old name — should be "Framework."
Full correction: `"documented systems that apply the Framework, Protocols, and Standards in real environments."`

**Title mismatch:**
The page title in i18n EN is `"Implementations"` (plural) but the nav label is `"Implementation"` (singular). This creates a title/nav discrepancy on the page itself. Per architecture.md: "Hub pages — singular."

### What Violates the Page Role

- **`integrationNote` section does not belong on Implementation per ux-blueprint.** The Implementation page's purpose is to show applied systems — not to explain where Implementation sits in the pipeline. That is System hub's job. The note about connecting back to Journal is System-level navigation framing appearing in Implementation.
- **"Current Reading"** framing implies more entries are coming — fine for now, but should be removed once multiple entries exist and replaced with standard listing.

### Rewrite Risk: Low

### Rewrite Priority: High
The "The Method" violation and "enforce doctrine" are both visible in the current page description. Two lines that need correction.

### Recommended Action: Light Revision
- Replace `"The Method"` → `"Journal"` in integrationNote (EN + TH)
- Replace `"enforce doctrine, protocols, and standards"` → `"apply the Framework, Protocols, and Standards"` in description
- Align page title to singular: `"Implementation"` (not `"Implementations"`)

---

## ABOUT `/about`

### Current Purpose
Introduces Paritsea origin, founder identity, open-to-use note.

### Approved Purpose (ux-blueprint.md §10 / content-governance.md)
Origin of the lens + founder context. Personal, first-person, non-promotional. Must answer: "Where does this lens come from, and who holds it?" Must NOT answer: "What does the system contain?" or "How do I license it?"

### Alignment Score: 5 / 10
*(The user asked for aggressive auditing. This score reflects real gaps against the spec.)*

### What Works

- **Eyebrow "Where this lens comes from" / "สายตานี้มาจากไหน"** — correct framing, correct altitude.
- **Hero headline** (EN): `"What lies beneath the surface / usually explains everything we don't understand. / Paritsea reads that layer."` — this is Home-level worldview copy, but as an About intro it works because it orients the reader before the origin story.
- **"Not judgment. Understanding."** — present in "How Paritsea reads" section — good register.
- **LinkedIn link** — appropriate, clean, no promotional framing.
- **Social links** at bottom — minimal, functional.

### What Violates the Language System

**Critical gap — The origin story is absent:**

The About page has three sections:
1. "What often goes unseen" — *This is a worldview description, not an origin story.* It explains what Paritsea observes, not why Paritsea came to exist or what formed the founder's lens.
2. "How Paritsea reads" — *This is a methodology description.* It belongs on the Home page or System hub, not About.
3. "Open to use" — *This is a licensing note.* Per content-governance.md: "Licensing governs all artifacts. Contact: terminal conversation. About: origin of the lens." The licensing note in About steps on Licensing's page role.

The actual question the page should answer — **"Where does this lens come from, and who holds it?"** — is not answered. The reader leaves knowing what Paritsea observes but not why Parit Ritchai sees this way, what experiences formed this lens, or why this perspective was built.

**What is missing that should be present:**
- The formative observation(s) that led to Paritsea — the lived experience that created the lens
- Why the seeing → structuring → doing pattern was recognized
- What dimension of Parit's actual life/work practice produced this perspective
- The honest version of "one person's perspective" — not a credential list, but an authentic origin

**What is present that should be elsewhere:**

| Section | Where it belongs instead |
|---------|--------------------------|
| "What often goes unseen" (worldview) | Home page — this is lens framing, not origin framing |
| "How Paritsea reads" (methodology) | Home page or System hub |
| "Open to use" (licensing note) | Licensing page — or a one-line pointer to Licensing |

**Founder bio register issue:**
The current bio reads:
> "I draw on perspectives across multiple dimensions — psychology, systems, organizations, and human relationships — to read situations with depth and precision. Building frameworks that work for people, work, and business."

This is a competence description — a **résumé sentence.** It describes capability dimensions, not origin or formation. Paritsea's language system explicitly says About must **not** be "Résumé tone, guru framing, credential-listing."

The sentence `"Building frameworks that work for people, work, and business"` is a value-proposition sentence, not a personal origin sentence.

**CTA mismatch:**
The CTAs at the bottom ("Start where Paritsea starts" → "Read Framework" + "Or Explore Journal") are correct by function (routing away), but the lead "Start where Paritsea starts" is the Home intro framing, not About outro framing. About's role is not to onboard; it's to provide origin context then release.

### What Violates the Page Role

About currently contains content from **three other pages**:
1. Home content (worldview observations)
2. System content (how the methodology works)
3. Licensing content (open-to-use terms)

None of these are "origin of the lens." The page answers: *what Paritsea sees* and *what you're allowed to do with it* — not *where this came from.*

Per ux-blueprint §10: About must NOT answer "What does the system contain / how do I license it?" Both of those are currently present.

### Rewrite Risk: High
The About page needs substantial structural rethinking. The current sections are the wrong content for the page's role. Removing them requires writing real origin content — which requires the author's input.

### Rewrite Priority: High
About is one of the highest-traffic entry points. It currently fails to answer the question it is supposed to answer.

### Recommended Action: Full Rewrite
This page needs structural redesign, not copy polishing. The three current sections should largely be replaced with:
- Actual origin story (what formed this lens)
- Founder context (honest, not credential-heavy)
- Brief pointer to Licensing (not a full licensing note)

*Note: A full rewrite of About requires the author's input on the origin narrative — the audit cannot supply that content.*

---

## LICENSING `/licensing`

### Current Purpose
Governance page for use permissions. Structured with: plain-language summary, allowed/permission/forbidden sections, FAQ, link to formal policy document.

### Approved Purpose (ux-blueprint.md §11 / content-governance.md)
Plain-language first. What is permitted and what is not. FAQ. No worldview content.

### Alignment Score: 9 / 10

### What Works

- **Plain-language summary** appears first — correct.
- **Three-tier structure** (What You May Do / What Requires Permission / What You Must Not Claim) — well-organized.
- **FAQ** section — appropriate, answers real questions without over-explaining.
- `"Using Paritsea does not create endorsement, certification, or official implementation status."` — precise governance language.
- TH version carries equivalent meaning and register.
- Attribution format section (`Based on Paritsea by Parit Ritchai`) — clear and actionable.

### What Violates the Language System

Minor issue only:
- **FAQ Q: "If I adapt it, does that make my system an official implementation?"** — The answer contains `"Official implementation status is separate and must be explicitly documented by Paritsea."` This uses "Paritsea" as an institutional voice, which is slightly inconsistent with the personal authorship framing. Minor.
- **"Formal Policy"** section label at the bottom — slightly bureaucratic tone. Not a violation but could be softened.

### What Violates the Page Role

- Nothing significant. This page is correctly scoped and well-executed.

### Rewrite Risk: Negligible

### Rewrite Priority: Low

### Recommended Action: Leave As-Is

---

## CONTACT `/contact`

### Current Purpose
Entry point for serious correspondence. Lists what the channel is/isn't for, the email address.

### Approved Purpose (ux-blueprint.md §12 / content-governance.md)
Direct, minimal, honest. The email address is the action. No broad solicitation. No support desk framing.

### Alignment Score: 9 / 10

### What Works

- **"Not Intended For"** section is exactly right: excludes mass marketing, unsolicited endorsement requests, off-topic support. This is the right boundary-setting for a personal IP contact page.
- **"Best Used For"** section is appropriately specific: licensing, permissions, implementation enquiries.
- **"Before You Write"** section — good pre-qualification. Sends users to Licensing before they email unnecessarily.
- **Email is the action** — correct, no form walls.
- **"Messages are reviewed carefully, but response is discretionary and not guaranteed."** — honest, non-performative.
- TH version maintains the same altitude and directness.

### What Violates the Language System

- **"Published Contact Note" heading** for the CMS post section — slightly institutional. The page intro works well but the label for the CMS post section is a bit bureaucratic. Minor.
- EN contactSummary uses "serious framework correspondence" — the word "serious" appears twice in proximity. Minor redundancy.

### What Violates the Page Role

Nothing significant.

### Rewrite Risk: Negligible

### Rewrite Priority: Low

### Recommended Action: Leave As-Is

---

# Audit Summary

| Page | Alignment Score | Recommended Action | Priority |
|------|----------------|-------------------|----------|
| Home | 6 / 10 | Partial Rewrite | **High** |
| Journal | 7 / 10 | Light Revision | Medium |
| System | 9 / 10 | Leave As-Is | Low |
| Framework | 8 / 10 | Light Revision | Medium |
| Protocols | 6 / 10 | Light Revision | **High** |
| Standards | 7 / 10 | Light Revision | Medium |
| Implementation | 6 / 10 | Light Revision | **High** |
| About | 5 / 10 | Full Rewrite | **High** |
| Licensing | 9 / 10 | Leave As-Is | Low |
| Contact | 9 / 10 | Leave As-Is | Low |

---

# Rewrite Order Recommendation

## Phase A — Terminology Fixes (Low Risk, High Impact, No Content Decision Required)

These are find-and-replace corrections that do not require authorial input. They fix violations that are visible on live pages.

| Fix | File | Violation |
|-----|------|-----------|
| "Doctrine" → "Framework" in Protocols description | StructuralIndexPage.astro | Old terminology |
| "Doctrine" → "Framework" in Standards description | StructuralIndexPage.astro | Old terminology |
| "enforce doctrine" → "apply the Framework" in Implementation | implementation.astro | Old terminology + wrong register |
| "The Method" → "Journal" in Implementation integrationNote | implementation.astro | Old terminology |
| "The Method" in Journal/StructuralIndexPage descriptions | StructuralIndexPage.astro | Old terminology |
| "Implementations" (title) → "Implementation" | implementation.astro | Architecture naming rule |
| "Constitutional Doctrine" → "Constitutional Framework" | i18n.ts labels | Old terminology |
| Remove "Further instruments forthcoming" from Protocols + Standards | StructuralIndexPage.astro | Promise language |

**Estimated effort:** 1–2 hours. No content decisions required. Build + deploy.

---

## Phase B — Structural Fixes (Medium Risk, Authorial Input Optional)

These fixes are structural adjustments that don't require new copy to be written — they either remove content or reframe existing copy.

| Fix | Page | What to do |
|-----|------|-----------|
| Remove "Sessions" block | Home | Remove or relocate sessions content |
| Replace "goes beyond Motivation" framing | Home | Remove comparative register; simplify |
| Add position note to Protocols page | Protocols | One-line: "Derives from Framework. Sits above Standards." |
| Add explicit derivation statement to Standards | Standards | One-line: "Derives from Protocols. Defines verifiable conditions." |
| Add position note to Framework page | Framework | One-line above document: "The immutable root." |
| Remove `integrationNote` from Implementation | Implementation | Remove (it's System-layer content on Implementation page) |

**Estimated effort:** Half day. Some author input needed on where Sessions content goes.

---

## Phase C — About Page (High Risk, Requires Authorial Input)

The About page cannot be rewritten without the author. The content needs to come from lived experience and personal reflection — not from pattern analysis of existing copy.

**What the author needs to provide:**
1. The formative experience(s) that created the Paritsea lens — not credentials, not a list of domains; a real moment or observation
2. Why this way of reading (beneath the surface) became the frame rather than other approaches
3. What dimension of practice (working with people, systems, organizations) produced the distinctive depth

**The audit cannot supply this content.** It can only confirm that the current sections do not answer these questions and that the page should be structured around them.

**Suggested structure for the rewrite (to be approved before writing):**
1. Eyebrow: "Where this lens comes from" (keep)
2. Hero: Short declarative (keep current — it works as orientation)
3. Origin section: The actual origin (new — requires author input)
4. Who holds it: Honest founder description (replace current résumé bio)
5. Brief licensing pointer (one line, link to Licensing — replace the full "Open to use" section)
6. CTAs: Keep (route to Framework + Journal)

---

## Pages Locked — Do Not Modify

| Page | Reason |
|------|--------|
| System hub | Recently built to spec; aligned with blueprint |
| Licensing | Well-executed; no violations |
| Contact | Well-executed; no violations |
| Framework document | Immutable per governance rules; only badge label needs updating |
| Worldview copy (Home) | Locked per paritsea-principles.md — these four statements must not be altered |

---

## Pages Requiring Revision (Author Approval Needed)

| Page | Type | Can proceed without author? |
|------|------|---------------------------|
| Protocols | Light revision (terminology) | Yes |
| Standards | Light revision (terminology) | Yes |
| Implementation | Light revision (terminology) | Yes |
| Journal | Light revision (terminology) | Yes |
| Home | Partial rewrite | Partially — Sessions removal needs author decision |
| About | Full rewrite | **No — requires author's origin narrative** |

---

*Audit complete. No copy has been modified. All findings are observational only.*
*Next step: Author review and approval of rewrite sequence before any changes begin.*
