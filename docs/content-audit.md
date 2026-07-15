# Paritsea — Content Audit (Full)
**Status:** Historical / superseded as a decision source. Retained as the 2026-06 evidence snapshot.
**Document type:** Audit. Read-only findings. No copy changes made.
**Audit date:** 2026-06
**Scope:** Site pages + Content collections + UX copy
**Audited against:** architecture.md · navigation-model.md · ux-blueprint.md · language-system.md · paritsea-principles.md

> This document records findings only. No content has been modified.
> All recommended actions require explicit author approval before any rewrite begins.

---

## Part 1 — Site Pages

---

### HOME `/`

**Current Purpose**
Entry point introducing Paritsea worldview. Sections: Hero → Worldview → What Paritsea Covers → Latest Journal entries → YouTube Videos → Ecosystem links → Closing quote. Also contains: Sessions block (not in approved blueprint).

**Approved Purpose**
Hero + Worldview + Pathway/Topics + Journal records + Ecosystem + Closing quote. Exactly 2 hero CTAs only. No service offering, no community solicitation.

**Alignment Score: 6 / 10**

**Strengths**
- Worldview copy (all 4 locked statements) present and unaltered ✅
- Hero headline "A way of thinking that understands both the complexity of the world — and the depth of people" — correct altitude
- 2 hero CTAs in hero section (Read Framework + Explore Journal) — correct pattern
- Closing quote is a coda only — correct function
- `"Sometimes we talk about dashboards. But really we're talking about 'people inside systems.'"` — exemplary concrete-image entry, P-05 compliant
- Thai heroSub is well-written and altitude-appropriate
- Topics grid (Life & Meaning / Work & Organizations / People & Mind / Growth & Transition) — correct altitude for Home surface
- Content breadth examples follow "sometimes" entry pattern correctly

**Issues**

*Structural violation — Sessions block absent from approved blueprint:*
A full "Online Sessions" section appears with daily 8 PM scheduling, a join CTA, and session descriptions. This section is not in ux-blueprint.md §1 required sections. Specific violations:
- EN `"Join Today's Session →"` contains urgency word `Today` — explicitly prohibited in language-system.md §8 P-08
- TH `"เข้าร่วม Session วันนี้ →"` — urgency word `วันนี้`
- `"Safe, private, no-pressure."` and `"You don't have to carry everything alone."` — therapy-register framing, prohibited in language-system.md §3
- `"Every day at 8 PM"` — scheduling/community content belongs on a separate page, not the worldview entry point
- `"Explore Paritsea first"` as secondary CTA creates a third CTA — blueprint specifies exactly two hero CTAs; this secondary is additional

*Language register violation — comparative framing:*
- EN `"Ideas that go beyond Motivation"` — comparative positioning ("beyond X"). Paritsea does not position itself against categories. Prohibited in language-system.md §1 ("position itself against other systems").
- TH `"แนวคิดที่ไม่ได้หยุดแค่ Motivation"` — identical violation
- This is a section heading, not body copy — the violation is visible at high prominence

*Ambiguous vocabulary in Start Here section:*
- EN `startHereDesc`: `"to understand a method that reads people and systems together"` — lowercase "method" is ambiguous in a context where "The Method" was the former Journal name. This is not a direct violation but creates confusion.

*Ecosystem section scope:*
- LinkedIn, Facebook, and LINE Group are listed. These platforms are not documented in About or paritsea-principles.md as core to Paritsea's platform identity. The addition of community/social channels expands past the documented ecosystem.

**Rewrite Risk:** Medium — core worldview copy is immutable; risk is in removing Sessions block if it serves live operational function.

**Recommended Action: Partial Rewrite**
- Remove or relocate Sessions section to a separate page or remove entirely
- Fix comparative framing in Content breadth heading
- Clarify lowercase "method" ambiguity in startHereDesc
- Retain: hero, worldview, topics, Journal records, ecosystem, closing quote

---

### JOURNAL `/journal`

**Current Purpose**
Index page listing observation entries from the Journal collection (framework_page: `the-method`). Rendered via `StructuralIndexPage` component. Eyebrow: "ANALYTICAL REGISTRY." No breadcrumb (correct per navigation-model.md §6).

**Approved Purpose**
Layer intro (1–2 sentences: observation, not yet governed) + entry list. No CTA.

**Alignment Score: 7 / 10**

**Strengths**
- No CTA on the index page — correct ✅
- `"These are reference observations, not opinion pieces."` — altitude-correct boundary declaration
- `"ANALYTICAL REGISTRY"` eyebrow — correct signal for the seeing layer
- Thai version carries equivalent altitude

**Issues**

*Critical terminology — "The Method" persists throughout StructuralIndexPage:*
The `StructuralIndexPage` component references "The Method" in all body copy, despite the page h1 rendering as "Journal." This creates a split identity: headline says Journal, all explanatory copy says The Method.
- `methodDescription`: `"The Method is the analytical registry of the framework."` — must say "The Journal"
- `methodSecondary` key references "The Method" throughout
- `methodFlowNote` key references "The Method"
- TH: `"The Method รวมทั้งบทความและวิดีโอสะท้อนคิด"` — same violation

*Wrong intro content — format description instead of layer role:*
`"The Method includes both essays and video reflections inside one knowledge flow."` — this describes format mix (essays + video). The intro should define what this layer IS: observation, not yet governed. Format is irrelevant at intro level.

*Promise language:*
`"Further instruments forthcoming"` — a forward promise. Governance-level copy describes current state only, not future state.

**Rewrite Risk:** Low — terminology replacements only; no new content decisions required.

**Recommended Action: Light Revision**
- Replace all `"The Method"` references → `"Journal"` / `"the Journal"` in StructuralIndexPage
- Replace format description with layer role definition
- Remove `"Further instruments forthcoming"`

---

### SYSTEM `/system`

**Current Purpose**
Hub page for the Structuring layer. Five sections: layer definition → Framework card → Protocols card → Standards card → Derivation order → Layer spine. Bilingual (TH/EN).

**Approved Purpose**
Layer definition + three equal-weight cards + derivation order made explicit. Junction page, not a funnel.

**Alignment Score: 9 / 10**

**Strengths**
- All 5 ux-blueprint §4 required sections present ✅
- Intro: `"When observations in the Journal layer become patterns consistent enough to govern, they are formalized here."` — precisely correct altitude
- `"STRUCTURING"` eyebrow — correct layer signal
- Three equal-weight navigation cards — correct junction pattern, no dominant CTA ✅
- Derivation chain (Framework → Protocols → Standards) explicitly visualized ✅
- Layer spine section places System within seeing → structuring → doing ✅
- `"System is not an opinion archive. And it is not Implementation."` — correct disambiguation
- Thai version operates at identical altitude to English ✅
- No raw document content, no sequential stepper, no marketing language ✅

**Issues**
Minor only: Thai eyebrow `"STRUCTURING"` is English in a Thai-locale page. This is acceptable per D-029 (nav and structural labels fully English) but the eyebrow functions as an orientation label, not a nav item. Worth noting for future copy decisions.

**Rewrite Risk:** Negligible

**Recommended Action: Leave As-Is**

---

### FRAMEWORK `/system/framework`

**Current Purpose**
Constitutional Foundation page. Renders the `doctrine` post from CMS. Breadcrumb: System / Framework. Badge: "Constitutional Document — Immutable." Contains TOC, utility rail, comments section.

**Approved Purpose**
Immutable foundational document. Authoritative, sparse, fixed. No changelog, opinion framing, or hedging.

**Alignment Score: 8 / 10**

**Strengths**
- Breadcrumb: System / Framework ✅
- `doctrineNotice`: `"This document forms the foundational authority for all Paritsea Protocols and Standards."` — correct position statement
- `"Constitutional Foundation — Immutable"` italic header in document body — correct
- Section structure (Foundational Premise → Structural Coherence → Legitimacy Conditions) follows governed, declarative architecture ✅
- `"Legitimacy arises from structural coherence. Legitimacy, within Paritsea, is a structural condition — not a moral endorsement."` — correct Framework register
- `"Legitimacy is not conferred by: — Consensus, — Popularity, — Longevity..."` — declarative list, correct altitude ✅
- No opinion framing, no hedging, no first-person ✅
- Language is authoritative and sparse — matches Framework register specification ✅

**Issues**

*Terminology — page label still uses "Doctrine":*
The i18n label `constitutionalDoctrine` renders as `"Constitutional Doctrine"` and `labels.doctrine` renders as `"Doctrine"` on this page. "Doctrine" is the pre-Phase 1 name for the Framework. This label inconsistency appears at the highest-authority page in the system. The correct label is `"Constitutional Framework"`.

*Position note visibility:*
ux-blueprint §5 requires a position note as the first required section. The `doctrineNotice` label provides correct content but renders as a `<span>` inside a notice badge, not a distinct structural statement. The content is right; the prominence is insufficient.

**Rewrite Risk:** Low — label changes only; document content is immutable.

**Recommended Action: Light Revision**
- Change `constitutionalDoctrine` → `"Constitutional Framework"` in i18n.ts
- Change `labels.doctrine` → `"Framework"` where user-facing on this page
- Elevate doctrineNotice text to a visible position statement above document body

---

### PROTOCOLS `/system/protocols`

**Current Purpose**
Index page for Protocols collection (framework_page: `protocols`). Shows 1 published entry (STP). Aside blocks: About Protocols, Derived From, Further Info. Breadcrumb: System / Protocols.

**Approved Purpose**
Position note (derives from Framework, sits above Standard) + protocol entry list + "derives authority from Framework" statement.

**Alignment Score: 6 / 10**

**Strengths**
- Breadcrumb: System / Protocols ✅
- About Protocols aside: `"Each protocol is a public structural instrument. Protocols are not tips, best practices, or style recommendations."` — excellent negative-definition, correct register
- Derivation link to Framework in aside ✅
- Entry list structure is clean and functional

**Issues**

*Critical terminology — "Doctrine" persists in descriptions:*
- EN `protocolsDescription`: `"Protocols are formal structural instruments derived from the Doctrine."` — "the Doctrine" is the old name. Must say "the Framework."
- EN `noContradiction`: `"No protocol may contradict the foundational doctrine."` — same violation. Must say "foundational Framework."
- TH `protocolsDescription`: `"โปรโตคอลคือเครื่องมือเชิงโครงสร้างที่สืบเนื่องจากหลักการ"` — uses `หลักการ` (principles) rather than `Framework`; slightly vague in Thai body context.

*Missing position note in primary column:*
The "About Protocols" and "Derived From" content sits in the aside. The primary column has no position statement. ux-blueprint §6 requires a position note first.

*Promise language:*
`"Further instruments forthcoming"` — prohibited forward promise. Current state only.

**Rewrite Risk:** Low

**Recommended Action: Light Revision**
- Replace `"derived from the Doctrine"` → `"derived from the Framework"`
- Replace `"foundational doctrine"` → `"foundational Framework"`
- Add position note to primary column: "Protocols derive from the Framework. Each defines an obligation — what must hold in practice."
- Remove `"Further instruments forthcoming"`

---

### STANDARDS `/system/standards`

**Current Purpose**
Index page for Standards collection (framework_page: `standards`). Shows 1 published entry (ASLS-01). Aside: About Standards, Relationship to Protocols. Breadcrumb: System / Standards.

**Approved Purpose**
Position note (operates beneath Protocols) + standard entry list + obligation/threshold disambiguation.

**Alignment Score: 7 / 10**

**Strengths**
- Breadcrumb: System / Standards ✅
- `"A Protocol establishes the obligation; a Standard defines the threshold."` — perfect disambiguation, exactly as specified in ux-blueprint §7 ✅
- About Standards: `"Standards translate structural obligations into verifiable conditions."` — correct altitude
- Derivation relationship expressed in aside ✅

**Issues**

*Terminology — "doctrine" in description:*
- EN `standardsDescription`: `"Standards translate doctrine into measurable conditions."` — "doctrine" is old name. Must say "the Framework."

*Missing derivation declaration in primary column:*
Standards derive from Protocols (not directly from Framework). This derivation path exists in the aside but is not declared as a structural statement in the primary column. The spec requires this position note as the first section.

*Promise language:*
`"Further instruments forthcoming"` — same issue as Protocols.

**Rewrite Risk:** Low

**Recommended Action: Light Revision**
- Replace `"translate doctrine"` → `"translate Framework obligations"`
- Add primary-column position note: "Standards derive from Protocols. Each defines a verifiable condition — the threshold by which a Protocol's obligation is assessed."
- Remove `"Further instruments forthcoming"`

---

### IMPLEMENTATION `/implementation`

**Current Purpose**
Applied reference layer index. One documented entry (AgenSea). Sections: page header (intro + cross-links + usage guidance) → implementation list → qualification aside. Hardcoded in `implementation.astro`.

**Approved Purpose**
Applied reference layer. Shows systems where the Framework, Protocols, and Standards operate in real environments. Evidential, concrete, demonstrative.

**Alignment Score: 6 / 10**

**Strengths**
- `"An implementation must apply Paritsea structurally, not cosmetically."` — excellent precision ✅
- `"Applied Reference Layer"` eyebrow — correct
- Reference Integrity section: prohibition against star ratings, leaderboard mechanics, raw score exposure — well-written, correct altitude ✅
- AgenSea description is factual and concrete ✅
- `"Implements structural legitimacy rather than reputation signals."` — strong note ✅

**Issues**

*Critical terminology — "The Method":*
- EN `integrationNote`: `"This layer connects back to The Method and YouTube reflections"` — "The Method" is the old Journal name.
- TH: `"ชั้นนี้เชื่อมกลับไปยัง The Method และ YouTube"` — same violation.

*Critical terminology — "enforce doctrine":*
- EN `description`: `"documented systems that enforce doctrine, protocols, and standards"` — two violations:
  1. `"enforce"` is compliance/legal register. Paritsea vocabulary uses "apply."
  2. `"doctrine"` is old name. Must say "the Framework."
- Correction: `"documented systems that apply the Framework, Protocols, and Standards"`

*Architecture — title singular/plural mismatch:*
- Page H1 title: `"Implementations"` (plural)
- Nav label: `"Implementation"` (singular)
- architecture.md: "Hub pages — singular." The title must match the nav label.

*Wrong altitude — integrationNote is System-level framing:*
The sentence explaining how Implementation connects to Journal through observation → structure → application is pipeline-level framing. This belongs on the System hub, not the Implementation page. Implementation's role is to show applied systems, not explain the pipeline.

**Rewrite Risk:** Low

**Recommended Action: Light Revision**
- Replace `"The Method"` → `"Journal"` in integrationNote (EN + TH)
- Replace `"enforce doctrine, protocols, and standards"` → `"apply the Framework, Protocols, and Standards"`
- Fix title: `"Implementations"` → `"Implementation"`
- Remove or relocate integrationNote to System hub

---

### ABOUT `/about`

**Current Purpose**
Introduces Paritsea origin and founder. Three sections: "What often goes unseen" / "How Paritsea reads" / "Open to use." CTAs: Read Framework + Explore Journal. Hardcoded in `[page_slug].astro`. Content is not CMS-managed.

**Approved Purpose**
Origin of the lens + founder context. Must answer: "Where does this lens come from, and who holds it?" Must NOT answer: "What does the system contain?" or "How do I license it?"

**Alignment Score: 5 / 10**

**Strengths**
- Eyebrow `"Where this lens comes from"` / TH `"สายตานี้มาจากไหน"` — correct framing ✅
- Hero headline (`"What lies beneath the surface / usually explains everything we don't understand."`) — works as orientation statement
- `"Not judgment. Understanding."` — correct register, P-04 compliant
- `"Not a perspective built from theory. But from observing people in real situations..."` — correct P-04 and P-03 patterns ✅
- LinkedIn link present — appropriate without promotional framing

**Issues**

*Critical structural gap — sections answer wrong questions:*

| Current section | What it answers | What About should answer |
|----------------|----------------|--------------------------|
| "What often goes unseen" | What Paritsea observes (worldview) | Origin story |
| "How Paritsea reads" | Methodology description | Who holds this lens and how it formed |
| "Open to use" | Licensing terms | One-line pointer to Licensing only |

The page answers "What Paritsea sees" and "What you can do with it." Both are wrong for this page role. It does not answer "where this lens came from." The origin question — formative experience, why the beneath-the-surface movement formed — is entirely absent.

*Content displacement:*
- "What often goes unseen" contains Home-level worldview observations ("Why do capable people burn out..."). This content belongs on Home, not About.
- "How Paritsea reads" is Home/System methodology framing. This belongs there.
- "Open to use" is a full licensing section. content-audit rules: About must NOT answer "How do I license it?" — it should contain only a one-line pointer.

*Founder bio register — credential/capability framing:*
`"I draw on perspectives across multiple dimensions — psychology, systems, organizations, and human relationships — to read situations with depth and precision."` — this lists dimension domains, which functions as a credential claim rather than an origin statement. language-system.md P-07: "First person is honest, not promotional." The list of dimensions ("psychology, systems, organizations") is a CV entry, not an origin story.

`"Building frameworks that work for people, work, and business."` — value proposition sentence. Does not belong on About.

*CTA lead is onboarding framing:*
`"Start where Paritsea starts"` is Home onboarding copy, not About outro. About's job is to provide origin context and then release users back to a layer — not to onboard them.

*Missing content:*
The page contains no answer to: Why does Paritsea exist? What experience formed the beneath-the-surface movement? Why does the founder read beneath? This is the content the page was built to carry. It is entirely absent.

**Rewrite Risk:** High — requires author-provided origin narrative. Cannot be AI-generated without author input on formative experience.

**Recommended Action: Full Rewrite**
Cannot proceed without author content. Required author input:
1. Formative experience(s) that created the beneath-the-surface movement
2. Origin of the multi-dimensional lens (not as a list — as a story)
3. Honest self-description that is not a capability list

Suggested structure (for author approval):
1. Eyebrow (keep)
2. Hero (keep or minor revision)
3. Origin section — actual formative experience(s) [requires author input]
4. Who holds this lens — honest contextual description (replace résumé bio)
5. One-line licensing pointer → link only (replace "Open to use" section)
6. CTAs (keep; update `ctaLead` away from onboarding framing)

---

### LICENSING `/licensing`

**Current Purpose**
Governance page for use permissions. Structure: Plain-language summary → Allowed uses → Needs-permission uses → Forbidden claims → CC BY-NC 4.0 statement → FAQ → Attribution format → Contact bridge. CMS-managed (pages collection).

**Approved Purpose**
Plain-language first. What is permitted and what is not. No worldview content.

**Alignment Score: 9 / 10**

**Strengths**
- Plain-language summary appears first ✅
- Three-tier structure (allowed / needs permission / forbidden) is well-organized ✅
- `"Using Paritsea does not create endorsement, certification, or official implementation status."` — precise boundary declaration
- FAQ section answers real questions with direct answers ✅
- Attribution format example is actionable and clear ✅
- TH version carries equivalent register ✅
- No worldview framing, no marketing language ✅

**Issues**
Minor only:
- FAQ answer: `"must be explicitly documented by Paritsea"` — slightly institutional phrasing. Not a violation.
- `"Formal Policy"` section label — slightly bureaucratic; not a register violation.

**Rewrite Risk:** Negligible

**Recommended Action: Leave As-Is**

---

### CONTACT `/contact`

**Current Purpose**
Entry point for serious correspondence. Structure: What channel is for → What it is not for → Email address → Response expectation. CMS-managed (pages collection).

**Approved Purpose**
Direct, minimal, honest. Email address is the action.

**Alignment Score: 9 / 10**

**Strengths**
- "Not Intended For" list is precisely right: no general inquiries, no pitches, no press requests ✅
- Pre-qualification ("Before You Write") framing — correct
- `"Messages are reviewed carefully, but response is discretionary and not guaranteed."` — honest, non-performative ✅
- No form walls; email address is the action ✅
- TH version maintains equivalent directness ✅
- No marketing warmth, no urgency, no broad solicitation ✅

**Issues**
Minor only:
- EN copy: `"serious framework correspondence"` — the word "serious" appears twice in close proximity in the contact summary.
- `"Published Contact Note"` section label — slightly institutional; not a violation.

**Rewrite Risk:** Negligible

**Recommended Action: Leave As-Is**

---

## Part 2 — Content Collections

---

### Journal

**Collection:** `posts` (framework_page: `the-method`)
**Total Entries:** 5 published
**Language Consistency Score: 8 / 10**
**Role Consistency Score: 7 / 10**

---

#### Special Audit — Observation → Naming Pattern

All 5 entries are evaluated against the governing pattern: **Observation → Naming**, NOT **Observation → Conclusion**.

Advisory, motivational, coaching-like, or consulting-like registers are flagged.

---

**Entry 1: "When the Tool Was Not the Problem" — Seeing Clearly**
*Quote:* `"Tools are rarely the problem. They only reveal it."`

**Strengths:**
- Quote is precise and observation-level ✅
- Opening scenario (automation request received) — concrete entry into universal insight, P-05 compliant ✅
- `"Building without answering these questions does not create systems. It creates fragile arrangements."` — strong naming sentence
- No advisory register present ✅

**Issues:**
- `"Paritsea did not refuse the work. It refused construction without..."` — Paritsea-as-actor sentence. The Journal layer should observe patterns in reality; it should not describe what "Paritsea" (as a subject) did or decided. This is an altitude slip: the author's lens observes; the lens is not itself the subject of the observation.
- Entry is brief (approximately 1 min read) — the observation is named but depth is minimal.

**Altitude:** ✅ (with Paritsea-as-actor caveat)
**Observation → Naming:** ✅
**Advisory/Prescriptive/Coaching drift:** Absent ✅

---

**Entry 2: "When Ownership Thinking Collides with System Reality" — Structural Tension**
*Quote:* `"As long as carrying remains possible, the system appears functional. The cost is paid elsewhere. Quietly. By people."`

**Strengths:**
- Opening quote is the strongest in the collection — three-beat observation building to human cost ✅
- `"Some leaders carry everything themselves. Not because they are incapable of delegation, but because they do not trust structures to hold without them."` — exemplary naming of the invisible pattern ✅
- `"The system appears functional. The cost is paid elsewhere."` — the below-the-surface move executed perfectly, P-03 compliant ✅
- No Paritsea-as-actor sentence ✅

**Issues:**
None significant. This entry is the strongest in the collection.

**Altitude:** ✅ Exemplary
**Observation → Naming:** ✅ Perfect execution
**Advisory/Prescriptive/Coaching drift:** Absent ✅

---

**Entry 3: "When Monitoring Becomes Emotional Labour" — Human Cost**
*Quote:* `"When systems rely on emotional vigilance, they do not scale. They drain."`

**Strengths:**
- Opens with technical description, pivots to human cost — correct Journal move, P-03 compliant ✅
- Three-part list (someone must constantly worry / stay alert so others feel safe / absorb uncertainty) — precise naming of invisible labour ✅
- `"This labour is rarely visible in architecture documents."` — observation-level naming ✅

**Issues:**
- Entry is brief (approximately 1 min read). The observation is named but not fully developed. The pattern is correctly identified; the depth is thin compared to Entry 2.
- The ending lacks a closing naming-moment that lets the reader feel "I felt this but couldn't say it." The observation is stated and left; it could benefit from one closing line that solidifies the naming.

**Altitude:** ✅
**Observation → Naming:** ✅
**Advisory/Prescriptive/Coaching drift:** Absent ✅

---

**Entry 4: "When Everything Works — and Something Is Still Wrong" — Seeing Clearly**
*Quote:* `"If everything is working, why does it feel like something is wrong?"`

**Strengths:**
- `"This work did not begin with broken systems. It began with systems that worked."` — excellent contrast entry, strong opening ✅
- `"people were tired in ways that could not be explained by workload alone"` — precise naming of an invisible state ✅
- `"Silence filled the spaces where clarity should have been."` — strong observation

**Issues:**
- The question-as-opening `"If everything is working, why does it feel like something is wrong?"` borders on the prohibited hook pattern (P-09: questions hold tension, they do not ask the reader if they feel something). This specific question works because it holds tension; it is close to the line but acceptable.
- The entry ends near a conclusion rather than a naming. The final paragraph resolves slightly more than it names. Minor register drift toward summary/conclusion altitude.

**Altitude:** ✅
**Observation → Naming:** ✅ (borderline on ending)
**Advisory/Prescriptive/Coaching drift:** Absent ✅

---

**Entry 5: "On Automation That Still Requires Fear" — Human Cost**
*Quote:* `"If a system collapses without human vigilance, it is not a system. It is deferred responsibility."`

**Strengths:**
- Quote is definitionally precise — naming at the highest level ✅
- `"many automated systems do the opposite. They require constant monitoring."` — correct contrast pivot ✅
- `"When people are afraid to leave an automated workflow unattended, the automation has not reduced labour. It has relocated it."` — strongest naming line in this entry, P-02 compliant ✅

**Issues:**
- `"To free people from unnecessary labour"` as the third item in the opening rhythm list edges toward aspirational framing (what people hope automation will do) rather than pure observation. Minor register slip — the first two items are observational; the third is aspirational.

**Altitude:** ✅
**Observation → Naming:** ✅
**Advisory/Prescriptive/Coaching drift:** Absent ✅

---

**Collection Summary:**

| Entry | Altitude | Obs→Naming | Prescriptive | Strength |
|-------|----------|------------|--------------|----------|
| When the Tool Was Not the Problem | ✅ | ✅ | No | Strong |
| When Ownership Thinking Collides | ✅ | ✅ | No | Exemplary |
| When Monitoring Becomes Emotional Labour | ✅ | ✅ | No | Strong |
| When Everything Works — Still Wrong | ✅ | ✅ | Borderline | Strong |
| On Automation That Still Requires Fear | ✅ | ✅ | No | Strong |

**Common Problems:**
1. Brief entries (1 min read) — three entries name the pattern but do not develop it to full observation depth
2. Entry 1 contains one Paritsea-as-actor sentence
3. No entry drifts into advisory, motivational, consulting, or coaching register — this is a significant collection-level strength

**Examples of Strong Entries:** Entry 2 (Ownership Thinking) is exemplary and the model for this collection. Entry 5 (Automation Fear) and Entry 3 (Monitoring) are strong.

**Examples of Weak Entries:** None fail; Entry 1 has the Paritsea-actor issue; Entry 4 has the borderline ending.

**Patterns That Match the Language System:** ✅
- Below-the-surface move present in all 5 entries (P-03)
- Naming before explaining in all entries (P-02)
- Observation before conclusion in all entries (P-01)
- No "you should" construction anywhere (P-10)
- No motivational, urgency, or coaching vocabulary

**Patterns That Drift From Language System:**
- Paritsea-as-actor construction (Entry 1) — the lens observes; the lens is not the subject
- Aspirational register in a supporting clause (Entry 5, one sentence)

**Recommended Collection Action: Leave As-Is**
The Journal collection is the strongest part of the site. No entry requires revision. The issues noted are single-sentence observations, not collection-level patterns.

---

### Framework

**Collection:** `posts` (framework_page: `the-doctrine`)
**Total Entries:** 1 — "The Paritsea Doctrine of Structural Coherence and Legitimacy"
**Language Consistency Score: 9 / 10**
**Role Consistency Score: 8 / 10**

---

#### Special Audit — Governed, Declarative, Structurally Precise

The Framework document must be: governed (formalized, not an opinion), declarative (states what is, not what might be), and structurally precise (exact language with no hedging). It must not be essay-like, reflective, or journal-style.

**Strengths:**
- Section structure (Foundational Premise → Structural Coherence → Legitimacy Conditions) — governed, declarative architecture ✅
- `"Constitutional Foundation — Immutable"` italic header — correct immutability signal ✅
- `"Legitimacy arises from structural coherence. Legitimacy, within Paritsea, is a structural condition — not a moral endorsement."` — exactly right Framework register ✅
- `"Legitimacy is not conferred by: — Consensus, — Popularity, — Longevity, — Institutional endorsement, — Market scale"` — declarative list pattern, correct altitude ✅
- No opinion framing anywhere ✅
- No hedging language ("it could be argued," "this might suggest") ✅
- No first-person voice ✅
- Language is authoritative and sparse throughout ✅

**Issues:**
- Document-level page label uses "Doctrine" — this is a page-layer issue, not a document content issue (documented in Site Pages / Framework section above)
- Some structural sections flow as paragraphs within the declared section heading rather than as standalone declarative statements. This is a stylistic note, not a violation — the content is correct, the visual formatting could be more explicitly sectioned in future.

**Altitude:** ✅ Framework register maintained throughout
**Declarative:** ✅
**Essay-like/Journal-style drift:** Absent ✅
**Opinion framing:** Absent ✅

**Examples of Strong Entries:** The entire document. Particularly: the Legitimacy Conditions section with its explicit not-list.

**Recommended Collection Action: Leave As-Is**
The Framework document is well-executed. The only required action is the badge label on the page (handled in Site Pages). Document content is immutable.

---

### Protocols

**Collection:** `posts` (framework_page: `protocols`)
**Total Entries:** 1 — "Structural Transparency Protocol (STP) v1.0"
**Language Consistency Score: 5 / 10**
**Role Consistency Score: 4 / 10**

---

#### Special Audit — Governed, Declarative, Structurally Precise

**Strengths:**
- Version header: `"v1.0 · Foundational · Authored by Parit Ritchai"` — correct protocol metadata ✅
- The Five Structural Exposures section is the correct altitude for Protocol content:
  - Human Visibility, Capacity Integrity, Choice & Representation Rights, Conflict & Competitive Boundaries, Power & Responsibility Mapping — all well-named structural domains ✅
  - Each exposure uses declarative format with `"Required disclosure:"` sub-items — correct Protocol register ✅
- `"This document is not a guideline."` — correct boundary declaration ✅
- `"Required disclosure"` pattern — obligation language, correct ✅

**Issues:**

*Critical altitude violation — introductory sections are essay-register, not Protocol-register:*

The STP has approximately 600 words of preamble before the Protocol content begins. Two sections:

**"An Industry Challenge to Agencies":**
> *"Most agencies speak about transparency. Very few structure themselves around it. The modern agency industry has evolved into a performance-driven ecosystem where velocity is rewarded, visibility is curated, and responsibility is often diffused."*

This is essay/journal-altitude writing. It observes an industry problem with narrative prose. A Protocol does not critique an industry; it declares an obligation. This entire section belongs in a Journal entry, not a Protocol preamble. language-system.md §8 Protocol: the page answers "What obligation does this establish?" — not "Why does the industry have this problem?"

**"Why This Protocol Exists":**
> *"Agencies today operate at the intersection of technology, data, performance metrics, and human labour. They promise efficiency. They promise optimisation. They promise measurable results. What is rarely disclosed is: who is actually doing the work..."*

This is persuasion-register writing. Three consecutive "They promise..." sentences are rhetorical structure. A Protocol does not persuade; it declares. language-system.md §3 prohibits consulting register ("our recommendation") and language-system.md §4 prohibits "Furthermore," and transition-word padded prose.

Vocabulary violations in preamble sections:
- `"velocity is rewarded"` — editorial/opinion
- `"responsibility is often diffused"` — analytical (journal-altitude)
- `"Clients are sold clarity. What they receive is structure."` — this is actually a strong observational line — but it belongs in a Journal entry, not a Protocol preamble

*Register summary:*
The first ~600 words of STP are at Journal/essay altitude. The Protocol body (The Five Structural Exposures onward) is at correct Protocol altitude. The document contains two distinct registers. The opening is wrong for a Protocol.

*What should precede a Protocol per spec:*
ux-blueprint §6 requires a position note (derives from Framework, sits above Standard). There is currently a preamble that argues for why the Protocol should exist. A Protocol does not argue for itself; it declares itself.

**Altitude:** ❌ Mixed — opening sections are essay-altitude; body is protocol-altitude
**Declarative:** Partially — Exposures section is correct; preamble is narrative/persuasion
**Essay-like drift:** Present — opening sections
**Journal-style content mixed in:** Present — opening sections

**Examples of Strong Entries (within document):** The Five Structural Exposures section. Each Exposure name, its domain, and its Required Disclosure format are the model for Protocol content.

**Examples of Weak Entries (within document):** "An Industry Challenge to Agencies" and "Why This Protocol Exists" — both wrong altitude for this layer.

**Recommended Collection Action: Selective Revision**
The Five Structural Exposures (the actual Protocol body) should be retained without change. The "An Industry Challenge" and "Why This Protocol Exists" sections should either:
- Be replaced with a one-paragraph declarative position note: derived from Framework, establishes the obligation of structural transparency, sits above ASLS-01.
- Be extracted to a linked Journal entry that contextualizes the industry problem.

The Protocol should begin with its obligation, not its rationale.

---

### Standards

**Collection:** `posts` (framework_page: `standards`)
**Total Entries:** 1 — "Agency Structural Legitimacy Standard (ASLS-01) v1.0"
**Language Consistency Score: 8 / 10**
**Role Consistency Score: 9 / 10**

---

#### Special Audit — Governed, Declarative, Structurally Precise

**Strengths:**
- `"This standard does not regulate agencies. It establishes structural assessment conditions."` — excellent boundary declaration; exactly right for a Standard ✅
- `"Legitimacy, within this framework, is a structural condition — not a marketing claim, performance outcome, or reputational status."` — precise governance language ✅
- `"Constitutional Position: ASLS-01 remains subordinate to STP v1.0."` — explicit derivation declaration ✅
- Structured domains with verifiable sub-conditions — correct Standard architecture ✅
- `"Structural Condition: No strategic authority may be implied without structural presence."` — declarative, testable, correct ✅
- Agency Scorecard section — moves from declaration to verifiable assessment criteria ✅
- No essay-like introduction, no persuasion register ✅
- Derivation chain from STP to ASLS-01 is explicit ✅

**Issues:**
- `"Note: Legitimacy, within this framework, is a structural condition..."` — the "Note:" label is slightly informal for a Standard. This could be stated as a direct declaration without the label.
- One sentence in Purpose section runs all five domains in one clause, creating density. Readability note only — not a register violation.
- ASLS-01 is agency/service-specific. This is correctly scoped and labeled ("Agency" in title). Worth noting it is a domain-specific Standard derived from a general Protocol — the derivation logic holds.

**Altitude:** ✅ Correct throughout
**Declarative:** ✅
**Essay-like/Journal-style drift:** Absent ✅
**Technically precise:** ✅

ASLS-01 is significantly better-executed than STP in terms of altitude consistency. It is the model document for the Standards layer.

**Examples of Strong Entries:** The entire ASLS-01 document. Particularly: boundary declaration, derivation declaration, and Scorecard section.

**Recommended Collection Action: Leave As-Is**
Minor editorial polish only (the "Note:" label). No structural changes needed.

---

### Implementation

**Collection:** Hardcoded in `implementation.astro` — not CMS-managed
**Total Entries:** 1 — AgenSea (ASLS-01 v1.1 implementation)
**Language Consistency Score: 7 / 10**
**Role Consistency Score: 8 / 10**

---

#### Special Audit — Application vs Theory

The Implementation layer must demonstrate application, not merely describe theory. Each entry must provide observable evidence that the governed system operates in reality.

**Strengths:**
- `"A structural transparency platform for agency-client work that applies ASLS inside discovery, profile logic, trust surfaces, contracts, and operating workflows."` — concrete, demonstrative, evidential ✅
- Status: `"MVP in development"` — honest and factual ✅
- ASLS-01 v1.1 version reference — correct derivation traceability ✅
- `"Implements structural legitimacy rather than reputation signals."` — strong note ✅
- `"Translates ASLS into human-readable trust surfaces instead of raw score exposure."` — distinguishes structural from performative application ✅
- `"Treats structural scoring and operational trust signals as distinct layers."` — evidential precision ✅

**Issues:**

*Scope description without observable evidence:*
`"applies ASLS inside discovery, profile logic, trust surfaces, contracts, and operating workflows"` — this lists where it applies (scope) but does not show a single observable result of that application. An Implementation entry should give the reader something they can verify. Currently the description maps scope; it should also point to what is visible at the linked URL.

*Conditional qualification — "MVP in development":*
An Implementation entry implies a system that is operating in reality. "MVP in development" means the system is not yet complete. This qualifies conditionally. The entry documents a system being built, not one currently running. This is an editorial judgment call for the author; it is noted here as a consistency risk.

*No "what to look for" guidance:*
The entry links to `https://agensea-flame.vercel.app/` as its evidence anchor. The description does not guide the reader to what at that URL demonstrates the implementation. A one-sentence evidential pointer would strengthen the demonstrative function.

**Altitude:** ✅ Evidential/demonstrative
**Application vs theory:** Leans toward scope description over evidence display. Improvement possible.

**Recommended Collection Action: Selective Revision**
Light revision: add one sentence of observable evidence pointing to what the reader will see at the linked URL that demonstrates ASLS-01 application. Consider whether "MVP in development" entry qualifies as a documented implementation or should be flagged as provisional.

---

## Part 3 — UX Copy

---

### Navigation Labels

**Score: 10 / 10**

All labels comply with D-029 (fully English in both locales):
- `Journal` ✅ · `System` ✅ · `Framework` ✅ · `Protocols` ✅ · `Standards` ✅ · `Implementation` ✅ · `About` ✅

No Thai nav labels present anywhere in either locale. System dropdown children are correctly English in TH locale. Footer nav links match approved labels.

**Recommended Action: Leave As-Is**

---

### CTA Labels

**Score: 8 / 10**

**Correct CTAs:**
- `"Read Framework"` / `"อ่าน Framework"` — Verb + Object ✅
- `"Explore Journal"` / `"สำรวจ Journal"` — Verb + Object ✅
- `"View Implementations"` — Verb + Object ✅
- `"Open implementation →"` — Verb + Object (functional; see note below)
- `"View YouTube Channel →"` — Verb + Object ✅

**Issues:**
- `"Join Today's Session →"` — urgency word `Today` is explicitly prohibited in language-system.md §8 P-08
- TH `"เข้าร่วม Session วันนี้ →"` — urgency word `วันนี้` — same violation
- `"Explore Paritsea first"` — the word "first" implies sequencing pressure. Paritsea: "depth is pulled, never pushed" — navigation-model.md §3
- `"Start Here"` block — acceptable as a label; `startHereDesc` uses lowercase "method" ambiguously (`"a method that reads people and systems together"`) — could be read as referencing "The Method" (old Journal name)
- `"Open implementation →"` is functional. `"View implementation →"` would better match the vocabulary register (`View` aligns with `"View Implementations"` CTA).

**Recommended Action: Light Revision**
- Remove `"Today"` / `"วันนี้"` from Sessions CTA (or remove Sessions block entirely)
- Remove `"first"` from secondary sessions CTA
- Clarify `startHereDesc` lowercase "method" to remove The Method ambiguity
- Optionally align `"Open"` → `"View"` for CTA vocabulary consistency

---

### Section Headings

**Score: 8 / 10**

**Correct headings:**
- `"What often goes unseen"` — observational, correct altitude ✅
- `"How Paritsea reads"` — descriptive, correct ✅
- `"Derivation order"` — architectural, sparse, correct for System hub ✅
- `"STRUCTURING"` eyebrow — correct altitude signal ✅
- `"ANALYTICAL REGISTRY"` eyebrow — correct for Journal ✅
- `"Applied Reference Layer"` eyebrow — correct for Implementation ✅

**Issues:**
- Home: `"Ideas that go beyond Motivation"` — comparative framing, prohibited. Must describe what Paritsea is, not what it surpasses.
- Implementation: `"Current Reading"` — slightly informal for a governance layer. "Current Implementations" or no label would be more appropriate.
- Protocols + Standards: missing position-note heading in primary column (required by ux-blueprint §6 and §7).

**Recommended Action: Light Revision**

---

### Card Descriptions (System Hub)

**Score: 9 / 10**

Framework card: `"The immutable root. Every Protocol and Standard derives from here. The Framework is fixed — it is referenced, not revised."` — excellent ✅

Protocols card: `"What must hold in practice. Protocols derive from the Framework and define what must be true."` — correct ✅

Standards card: `"How Protocol obligations are verified. Standards sit beneath Protocols and set concrete criteria."` — correct ✅

**Issues:** None significant. All three cards use correct vocabulary and maintain correct derivation order.

**Recommended Action: Leave As-Is**

---

### Footer Copy

**Score: 8 / 10**

EN tagline: `"Where systems meet humanity — a way of thinking that understands both the complexity of the world and the depth of human experience."` — acceptable; close to worldview register but slightly descriptive rather than declarative. Not a violation.

TH tagline: `"ที่ที่ระบบและมนุษย์มาบรรจบกัน — วิธีคิดที่เข้าใจทั้งความซับซ้อนของโลกและความรู้สึกของคน"` — equivalent altitude ✅

Footer section labels: `"Framework Layers"` / `"Legal & Contact"` — appropriate ✅
TH: `"สถาปัตยกรรมอ้างอิง"` / `"สิทธิ์ & ติดต่อ"` — correct ✅

**Issues:**
- Author role line: `"Philosophy Architecture of Paritsea · Authority Director of SE Ocean"` — "Philosophy Architecture" and "Authority Director" are uncommon compound titles. Not a register violation; distinctive but unusual.
- `"Follow on"` ecosystem label is generic — acceptable, not a violation.

**Recommended Action: Leave As-Is**

---

### Empty States

**Score: 7 / 10**

Current: `"No protocols published yet."` / `"No standards published yet."` — functional, but empty states are an opportunity for altitude-appropriate orientation.

The current states are honest. An enhancement would carry a brief layer-orientation line that serves arriving readers who find an empty index. Example altitude-appropriate alternative: "Protocols are formalized when recurring Journal observations become structural obligations." — this maintains altitude while explaining the current state.

**Recommended Action: Optional Enhancement**

---

### Collection Intros (Protocols / Standards / Journal)

**Score: 6 / 10**

Downgraded due to "The Method" and "Doctrine" terminology throughout `StructuralIndexPage`. Once terminology is corrected (Priority 1 fixes), the intros themselves are structurally sound. The main structural issue is that the Journal intro describes format mix rather than layer role.

**Recommended Action: Light Revision (follow Priority 1 terminology fixes)**

---

## Site Health Summary

**Overall Alignment Score: 7.0 / 10**

The site's governance and structural backbone are largely correct. Worldview copy, System hub, Licensing, and Contact are well-executed. The primary issues fall into two categories: (1) legacy terminology that survived Phase 1 ("The Method," "Doctrine") and (2) two pages that do not fulfill their approved purpose (About, Home Sessions block).

---

### Critical Issues (must fix)

| Issue | Location | Type |
|-------|----------|------|
| `"The Method"` still in StructuralIndexPage body copy | Journal index | Terminology |
| `"The Method"` still in Implementation integrationNote | Implementation | Terminology |
| `"enforce doctrine"` in Implementation description | Implementation | Terminology + register |
| `"Doctrine"` still in Protocols and Standards descriptions | Protocols, Standards | Terminology |
| `"Constitutional Doctrine"` badge label on Framework page | Framework (page labels) | Terminology |
| About page does not answer its approved question | About | Structural |
| About page sections answer wrong questions (worldview, methodology, licensing) | About | Structural |
| STP Protocol opening sections are essay-altitude, not protocol-altitude | STP document | Altitude |
| Sessions block on Home not in approved blueprint | Home | Structural |
| `"Ideas that go beyond Motivation"` comparative framing | Home | Language register |
| `"Join Today's Session →"` urgency CTA | Home | Language register |

---

### Medium Issues (should fix)

| Issue | Location | Type |
|-------|----------|------|
| Implementation title `"Implementations"` (should be singular) | Implementation | Architecture |
| Journal intro describes format mix, not layer role | Journal index | UX copy |
| Missing position notes in primary columns | Protocols, Standards | Structure |
| `"Further instruments forthcoming"` — promise language | Protocols, Standards | Register |
| AgenSea entry: scope description without observable evidence | Implementation entry | Altitude |
| integrationNote on Implementation is System-layer framing | Implementation | Page role |
| `startHereDesc` lowercase "method" ambiguity | Home | Terminology |
| `"Explore Paritsea first"` sequencing pressure | Home | Language register |

---

### Low Issues (optional polish)

| Issue | Location | Type |
|-------|----------|------|
| Entry 1: "Paritsea did X" authorial insertion | Journal entry 1 | Register |
| Entry 4: borderline ending approaching conclusion | Journal entry 4 | Altitude |
| `"Note:"` label in ASLS-01 Purpose | Standards document | Register |
| Empty states could carry altitude framing | Protocols, Standards | UX copy |
| Author role title compound phrasing | Footer | Polish |
| `"Current Reading"` label on Implementation | Implementation | UX copy |

---

## Rewrite Priority Matrix

### Priority 1 — No author input required; terminology fixes only

All fixes are find-and-replace or single-sentence corrections. No content decisions needed. Estimated 1–2 hours total.

| Fix | File | Notes |
|-----|------|-------|
| `"The Method"` → `"Journal"` / `"the Journal"` throughout StructuralIndexPage | `StructuralIndexPage.astro` | All instances including TH |
| `"The Method"` → `"Journal"` in Implementation integrationNote | `implementation.astro` | EN + TH |
| `"enforce doctrine, protocols, and standards"` → `"apply the Framework, Protocols, and Standards"` | `implementation.astro` | EN description |
| `"derived from the Doctrine"` → `"derived from the Framework"` | `StructuralIndexPage.astro` | Protocols copy |
| `"foundational doctrine"` → `"foundational Framework"` | `StructuralIndexPage.astro` | Protocols copy |
| `"Standards translate doctrine"` → `"Standards translate Framework obligations"` | `StructuralIndexPage.astro` | Standards copy |
| `"Constitutional Doctrine"` → `"Constitutional Framework"` | `i18n.ts` | `constitutionalDoctrine` label |
| `labels.doctrine` → `"Framework"` where user-facing | `i18n.ts` | Framework page badge |
| `"Implementations"` H1 title → `"Implementation"` | `implementation.astro` | Singular per architecture.md |
| Remove all instances of `"Further instruments forthcoming"` | `StructuralIndexPage.astro` | Protocols + Standards |
| Format description in Journal intro → layer role definition | `StructuralIndexPage.astro` | `methodFlowNote` key |

---

### Priority 2 — Author decision required before implementation

| Fix | Decision needed |
|-----|----------------|
| Remove Sessions block from Home | Where does sessions content go? Separate page, external link, or removal? |
| Replace `"Ideas that go beyond Motivation"` framing | What should the content breadth section heading say? |
| Add position notes to Protocols + Standards primary column | Approve proposed one-liners before implementation |
| STP Protocol opening sections (essay altitude) | Remove preamble, or extract to a linked Journal entry? |
| integrationNote on Implementation | Remove, or move to System hub? |
| Elevate doctrineNotice to explicit position statement | Approve restructured Framework page header |

---

### Priority 3 — Author content required; cannot proceed without input

| Fix | What is needed from author |
|-----|---------------------------|
| About page full rewrite | Origin narrative — what experience formed this beneath-the-surface movement; honest non-credential self-description |
| AgenSea evidence sentence | What is observable at the linked URL that demonstrates ASLS-01 application? |

---

## Rewrite Candidates

### Pages requiring full rewrite

| Page | Reason |
|------|--------|
| **About** | Wrong sections; page does not answer its approved question; no origin narrative present; requires author-provided content |

### Pages requiring partial rewrite

| Page | Scope |
|------|-------|
| **Home** | Sessions block structural violation; comparative framing in content breadth heading |

### Pages requiring light revision

| Page | Fixes needed |
|------|-------------|
| Journal index | Terminology only — "The Method" → "Journal" throughout; intro copy |
| Framework (page labels) | "Constitutional Doctrine" → "Constitutional Framework" in i18n.ts |
| Protocols index | Terminology ("Doctrine" → "Framework"); add position note in primary column |
| Standards index | Terminology ("doctrine" → "Framework"); add position note in primary column |
| Implementation | Terminology (3 fixes); singular title; remove/relocate integrationNote |

### Collections requiring selective revision

| Collection | Scope |
|-----------|-------|
| STP Protocol | Remove or relocate introductory essay sections ("An Industry Challenge," "Why This Protocol Exists"); retain Five Structural Exposures |

### Collections and pages to lock (no changes)

| Item | Reason |
|------|--------|
| System hub `/system` | Built to spec; 9/10 alignment |
| Licensing `/licensing` | Well-executed; 9/10 alignment |
| Contact `/contact` | Well-executed; 9/10 alignment |
| ASLS-01 Standard document | Model document for the Standards layer |
| All 5 Journal entries | Strong collection; no entry requires revision |
| Worldview copy on Home | Immutable per paritsea-principles.md; cannot be altered |
| Framework document content | Immutable per governance rules; only page labels need updating |

---

*Audit complete. No copy has been modified. All findings are observational only.*
*Next step: Author review of Priority 1 fixes (no decisions needed) and author decisions on Priority 2 before implementation.*
