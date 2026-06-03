# Paritsea — System Freeze: Phase 4 UX Entry Point
**Status:** READ-ONLY. This document is a frozen snapshot of system state at the moment Phase 4 UX execution begins.
**Frozen:** 2026-06
**Authority:** Semantic Constitution §0 — this document is a reference artifact, not an authority document. It summarises locked authorities for UX execution. It CANNOT be modified by UX work.
**Any change to this document requires:** explicit user instruction + Semantic Constitution §9 compliance.

---

## MODE SEPARATION

| Mode | Allowed actions | NOT allowed |
|------|----------------|-------------|
| **SYSTEM MODE** | Modify architecture, routing, docs, roadmap, ontology, vocabulary rules | Must not touch UX copy |
| **UX MODE** | Modify copy only — page intros, descriptions, CTAs, section text | Must NOT modify system rules, ontology, vocabulary tables, navigation structure, roadmap structure, or any document in `docs/` except under explicit instruction |

**Current session: UX MODE.** Phase 4 copy work is in progress.

---

## 1. Model A — Structural Pipeline (Frozen)

**Authority:** `architecture.md`, `semantic-constitution.md §1.1`
**Status:** Locked. Cannot be changed by UX work.

```
Home  /
│
├─ Journal  /journal              ← SEEING (framework_page: the-method)
│    └─ /journal/[slug]
│
├─ System  /system                ← STRUCTURING (hub)
│    ├─ Framework  /system/framework   (framework_page: the-doctrine)
│    ├─ Protocols  /system/protocols   (framework_page: protocols)
│    │     └─ /system/protocols/[slug]
│    └─ Standards  /system/standards  (framework_page: standards)
│          └─ /system/standards/[slug]
│
├─ Implementation  /implementation ← DOING (framework_page: implementations)
│    └─ /implementation/[slug]
│
├─ About  /about
├─ Licensing  /licensing
└─ Contact  /contact
```

**Internal taxonomy keys are frozen** (`the-method`, `the-doctrine`, `protocols`, `standards`, `implementations`). UX work cannot rename or restructure these.

---

## 2. Model B — Language Hierarchy (Frozen)

**Authority:** `language-hierarchy.md`, `semantic-constitution.md §1.2`, `decision-log.md D-028`
**Status:** Locked. Vocabulary lists are PRESCRIPTIVE.

| Layer | Purpose | Approved vocabulary |
|-------|---------|-------------------|
| **Entry** (Surface) | Immediate comprehension, low friction | Explore Journal · Reflection · Thinking Model · Journal · System · Implementation · Framework |
| **Gateway** (Transition) | Cognitive reframing, subtle shift | Mindset · Approach · Perspective Shift |
| **Core** (Foundational Ontology) | Deep structural reasoning | Cognitive Pattern · Recursive Thought Structure · Perception Architecture |

**Rules:**
- Core vocabulary MUST NOT appear in onboarding, nav, or first-touch UI.
- Entry vocabulary MUST NOT be overloaded with abstract meaning.
- Language progression is structural: Entry → Gateway → Core.
- Pipeline terms (Journal / System / Implementation / Framework) = Entry layer. Confirmed safe in nav and onboarding (D-028).

---

## 3. Navigation Terms (Frozen)

**Authority:** `decision-log.md D-029`, `paritsea-principles.md §Language governance`
**Status:** Fully implemented and locked. UX cannot alter navigation labels.

| Nav item | EN | TH |
|----------|----|----|
| Layer 1 | Journal | Journal |
| Layer 2 | System | System |
| System → sub | Framework | Framework |
| System → sub | Protocols | Protocols |
| System → sub | Standards | Standards |
| Layer 3 | Implementation | Implementation |
| Support | About | เกี่ยวกับ |

**No Thai nav terms remain.** Fully English for both locales.

---

## 4. Banned Terms (Frozen)

**Authority:** `decision-log.md D-027`, `paritsea-principles.md §Language governance`

| Term | Status | Replacement |
|------|--------|-------------|
| **แก่น** | ❌ BANNED — everywhere, all contexts | Framework |
| **การประยุกต์ใช้** | ❌ DEPRECATED — removed from `src/` | การนำไปปรับใช้จริง (body content) |
| Core ontology in nav/onboarding | ❌ FORBIDDEN | Entry vocabulary only |
| Source-labelled attribution | ❌ NEVER | Name-only: `— Parit Ritchai` / `— ปาริศ ฤทธิ์ชัย` |

---

## 5. Approved Body-Content Terms (Thai)

| Concept | Thai body term | Notes |
|---------|---------------|-------|
| Implementation (doing layer) | **การนำไปปรับใช้จริง** | Nav stays "Implementation" |
| Framework | Framework | English even in TH body |
| Explore Journal | สำรวจ Journal | Mixing Thai verb + English noun approved |
| Read Framework | อ่าน Framework | Mixing Thai verb + English noun approved |

---

## 6. Attribution Format (Frozen)

**Authority:** `paritsea-principles.md §Attribution and authorial voice`

- EN: `— Parit Ritchai`
- TH: `— ปาริศ ฤทธิ์ชัย`
- **Never** append source label, document name, or framework title.

---

## 7. Resolved Conflicts (Frozen)

All previously identified contradictions are resolved. The following will NOT recur in Phase 4:

| Conflict | Resolution | Decision |
|----------|-----------|---------|
| Two competing "3-layer models" | Model A = structure, Model B = exposure overlay (orthogonal) | D-028 |
| Pipeline terms vs Core vocabulary in nav | Pipeline terms = Entry layer, safe in nav | D-028 |
| Thai nav terms remaining | Removed: fully English | D-029 |
| แก่น in codebase | Fully purged — 0 occurrences in `src/` | D-027 |
| การประยุกต์ใช้ in codebase | Fully purged — 0 occurrences in `src/` | D-029 |
| Attribution source labels | Name-only format enforced | D-027 |

---

## 8. UX-Safe Boundaries for Phase 4

**UX MODE may modify:**

| Target | Scope |
|--------|-------|
| `/system/index.astro` | System hub copy: layer definition (1–2 sentences), 3 sub-page card descriptions, derivation statement |
| `/journal.astro` | Journal layer intro (1–2 lines) |
| `/implementation.astro` | Implementation layer intro, "rule behind this →" tail text |
| `system/framework.astro` | Immutability/authority note, derivation statement |
| `system/protocols.astro` | Position note, derivedFromText |
| `system/standards.astro` | Position note, obligation/threshold disambiguation |
| `[page_slug].astro` About content | All sections per ux-blueprint.md; LinkedIn badge (D-025) |

**UX MODE may NOT modify:**

- URL structure or routing
- `seed/seed.json` menu
- `src/middleware.ts`
- `src/utils/public-paths.ts`
- `src/utils/i18n.ts` navLabels
- Any file in `docs/`
- Vocabulary rules, ontology definitions, banned-term lists
- Page hierarchy or navigation structure

---

## 9. System Stability Assessment

| Check | Status |
|-------|--------|
| Semantic Constitution present and complete (§0–§9) | ✅ |
| Model A implemented and verified in routes | ✅ |
| Model B vocabulary defined and prescriptive | ✅ |
| Nav fully English (EN + TH) | ✅ |
| แก่น = 0 in `src/` | ✅ |
| การประยุกต์ใช้ = 0 in `src/` | ✅ |
| Attribution format enforced | ✅ |
| Conflicts resolved and logged (D-027–D-029) | ✅ |
| Semantic Constitution §8 (Historical Integrity) | ✅ |
| Semantic Constitution §9 (Edit Authority Constraint) | ✅ |

**All checks pass. System is stable.**

---

## ✅ SYSTEM FREEZE ACHIEVED — PHASE 4 UX EXECUTION IS CLEARED TO BEGIN
