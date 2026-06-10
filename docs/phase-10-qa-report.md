# Phase 10 — Editorial QA Report

**Date:** 2026-06-10
**Scope:** Final pre-publish review of all Phase 0–9 changes against `language-system.md §10` (Rewrite Evaluation Checklist), `content-audit.md` (scoring rubric), and `content-governance.md` (altitude law).
**Method:** Targeted re-verification of every issue flagged in `content-audit.md`, plus sitewide vocabulary/terminology sweeps across `src/` and the local dev D1 database. This is not a line-by-line re-read of every page from zero — it is confirmation that every previously-identified issue and every Section A/B decision has been correctly applied, plus a fresh sweep for anything missed.

---

## 1. Section A — Terminology Fixes (11/11 confirmed applied)

| Fix | Status |
|-----|--------|
| A-01 "The Method" → "Journal" (StructuralIndexPage) | ✅ `navLabels["The Method"]: "Journal"` |
| A-02 "The Method" → "Journal" (Implementation integrationNote) | ✅ implementation.astro contains no "The Method" |
| A-03 "enforce doctrine" → "apply the Framework" | ✅ no "doctrin" string in implementation.astro |
| A-04 "derived from the Doctrine" → "derived from the Framework" | ✅ string absent; replaced with `derivedFromText` + `doctrineLink: "Paritsea Framework"` |
| A-05 "foundational doctrine" → "foundational Framework" | ✅ string absent |
| A-06 "translate doctrine" → "translate Framework obligations" | ✅ Standards description now reads "Standards translate structural obligations into verifiable conditions." |
| A-07 "Constitutional Doctrine" → "Constitutional Framework" (i18n) | ✅ `constitutionalDoctrine: "Constitutional Framework"` (EN) / `"Paritsea Framework"` (TH) |
| A-08 `labels.doctrine` → "Framework" on Framework page | ✅ `doctrine: "Framework"` (both locales) |
| A-09 "Implementations" H1 → "Implementation" (singular) | ✅ EN `title: "Implementation"`; TH `navLabels.Implementations: "Implementation"` (proper noun kept in English per §9 Bilingual Check) |
| A-10 Remove "Further instruments forthcoming" | ✅ string absent from src/ |
| A-11 Journal intro: format description → layer role definition | ✅ `methodFlowNote`: "These are observations named before they become governed. Seeing before structuring." / TH equivalent |

---

## 2. Section B — Editorial Decisions (confirmed applied)

| Decision | Status |
|----------|--------|
| B-01 Home: Sessions block removed | ✅ No "Today's Session", "8 PM", "Safe, private, no-pressure", or "don't have to carry everything alone" in `index.astro`. Remaining `ecosystemSession*` keys refer only to the LinkedIn ecosystem link — not the removed promotional block. |
| B-02 Home: comparative framing heading replaced | ✅ No "Ideas that go beyond Motivation" or comparative framing in `index.astro`. |
| B-03 STP Protocol altitude split | ✅ STP (`POST:stp`) no longer contains the "An Industry Challenge to Agencies" essay preamble. That content now lives in the new Journal entry `aesthetic-transparency` ("Transparency Is Often Aesthetic. Rarely Structural."). STP links **down** to the Journal entry as its traceable precursor; the Journal entry links **up** to STP. Correct directional referencing per B-03. |
| B-04 Implementation integrationNote → upward reference | ✅ EN: "Governed by the Framework, Protocols, and Standards." TH equivalent present. One line, no pipeline framing. |
| B-05 Position notes in primary column (Protocols/Standards) | ✅ `protocolsPositionNote` / `standardsPositionNote` present in `StructuralIndexPage.astro`, both locales. |
| B-06 Framework prominence | ✅ `doctrine-authority` block renders the constitutional position statement at distinct structural prominence above the article body in `system/framework.astro`. |

---

## 3. Doctrine → Framework Terminology (D-004)

**Local dev D1 + `src/`:** Zero remaining user-facing "Doctrine"/"doctrine"/"doctrinal" instances.

Two additional instances found and fixed during this QA pass (not caught by the earlier i18n sync, since they were EN source text issues, not translation-key mismatches):

1. **Local dev D1 — `licensing` page**, "Version Sovereignty" section: *"No commercial agreement may redefine or reinterpret the **Doctrine**."* → *"...the **Framework**."* (This also resolved a pre-existing i18n.ts key/D1 mismatch — the i18n key already said "Framework" but D1 still said "Doctrine", so this sentence was silently falling back to English on the Thai page.)
2. **`src/pages/[page_slug].astro`** — licensing forbidden-claims list (EN + TH): *"Presenting an adaptation as official Paritsea **doctrine**, protocol, standard, or implementation."* → *"...official Paritsea **Framework**, protocol, standard, or implementation."* TH: "หลักคำสอน" → "Framework".

All remaining `doctrine`/`Doctrine` matches in `src/` (route aliases `the-doctrine` → `/system/framework` for legacy URL redirects, CSS class names like `.doctrine-authority`, internal i18n key names like `doctrineNotice`/`readDoctrine` whose **values** already render "Framework"/"Read Framework") are internal identifiers, not user-facing copy. These are intentional and out of scope for D-004 (which governs displayed text, not code identifiers).

**Production D1 (`paritsea-site`):** `doctrine` post and `licensing` page confirmed Framework-clean (verified separately, see prior session). However, production `licensing` and `contact` pages are **structurally behind** local dev — see §6 below.

---

## 4. Vocabulary Check (Avoid Vocabulary list, `language-system.md §6`)

Sitewide sweep of local dev D1 content + `src/` UI copy for all terms on the Avoid list. 5 raw matches found, all reviewed in context:

| Match | Location | Verdict |
|-------|----------|---------|
| "Alignment between declared function and operational behaviour" | ASLS-01 (Standard) | **Acceptable.** Standards-altitude is the one layer where structural/technical precision terms are correct register (`language-system.md §10.C`: "layer-specific terms used at the correct layer only"). This is a precise structural criterion, not corporate "team alignment" register. |
| "clarity of authority and risk alignment" | ASLS-01 (Standard) | Same as above — Standard-altitude structural precision. **Acceptable.** |
| "It is leverage" (in "Silence is not neutrality. It is leverage.") | `aesthetic-transparency` Journal entry | **Acceptable.** Used as a precise noun describing a structural power dynamic (P-05: specific over general), not corporate "leverage our strengths" register. TH translation renders it as "อำนาจต่อรอง" (bargaining power) — a deliberate, sharp word choice. |
| "They promise optimisation" | STP / `aesthetic-transparency` | **Acceptable.** This is Paritsea *describing/critiquing* what agencies promise (P-01 observation), not Paritsea using "optimization" in its own voice. |
| "Protocols are not tips, best practices, or style recommendations." | `StructuralIndexPage.astro` (aboutProtocolsText) | **Acceptable — correct usage.** This explicitly *negates* "best practices" as a category Protocols belong to (P-04: contrasting pair NOT X but Y). The opposite of a violation. |

**No exclamation marks** found in any D1 content or UI copy strings (45 raw `!` matches in `src/` are all TypeScript operators — `!==`, `!=`, boolean negation — not copy).

**No instances** of `แก่น`, `การประยุกต์ใช้`, `พลังงาน` (woo-woo sense), `แรงบันดาลใจ`, or `การพัฒนาตนเอง` in any D1 content.

---

## 5. Per-Page Re-Score (against `content-audit.md` baseline)

| Page | Baseline | Current | Basis |
|------|----------|---------|-------|
| HOME `/` | 6/10 | **9/10** | B-01 Sessions block removed, B-02 heading fixed (Phase 9). All worldview lines unchanged. |
| JOURNAL `/journal` | 7/10 | **9/10** | B-03 new entry live and at correct altitude; Phase 7/8 audit — all 6 entries pass (3 borderline sentences accepted as-is per author decision). |
| SYSTEM `/system` | 9/10 | **9/10** | No changes required; unchanged. |
| FRAMEWORK `/system/framework` | 8/10 | **9/10** | D-004 rename applied (title + body); B-06 prominence block confirmed. |
| PROTOCOLS `/system/protocols` | 6/10 | **9/10** | A-04/A-05 fixed; B-05 position note added. |
| STANDARDS `/system/standards` | 7/10 | **9/10** | A-06 "translate doctrine" fixed; B-05 position note added. |
| IMPLEMENTATION `/implementation` | 5/10 | **9/10** | A-02/A-03/A-09 fixed; B-04 integrationNote rewritten; C-02 AgenSea resolved (Provisional + observable evidence). |
| ABOUT `/about` | 5/10 | **9/10** | Phase 3 full rewrite — origin narrative, first-person founder section, inseparability section. |
| LICENSING `/licensing` | 9/10 | **9/10** (local dev) | D-004 fully applied including the newly-found "Doctrine" remnant in Version Sovereignty. **Production is at 7/10 — see §6.** |
| CONTACT `/contact` | 9/10 | **9/10** (local dev) | "doctrinal reference" → "framework reference" applied to D1 + i18n.ts. **Production not yet synced — see §6.** |

**Collections:**

| Collection | Baseline | Current |
|-----------|----------|---------|
| Journal | 8/7 | **9/9** |
| Framework | — | **9/9** |
| Protocols | 5/4 | **9/9** — B-03 split is the single largest improvement in this rewrite |
| Standards | 8/9 | **9/9** |
| Implementation | — | **9/9** |

All pages now score ≥ 8/10 in **local dev / codebase**. Exit criteria for Phase 10 are met for `src/` and the local dev database.

---

## 6. Open Item — Production/Local D1 Parity (deployment, not editorial, gap)

Production D1 (`paritsea-site`) lags local dev in two places:

1. **`licensing` page** — production is a structurally older/shorter version, missing the entire "Dual Licensing Framework" and "Version Sovereignty" sections (and the "This licence applies to: ..." line) that exist in local dev. i18n.ts already contains TH translations for these sections (added during the earlier Doctrine→Framework sync), so they are ready to render correctly once production content is brought up to parity.
2. **`contact` page** — production still reads "Paritsea is an independent **doctrinal** reference authored by Parit Ritchai." (just fixed in local dev D1 + i18n.ts to "framework reference").

**This is the one remaining blocker before Phase 10 can be marked fully complete end-to-end** (the editorial work itself — Section A, Section B, D-004, vocabulary — is done and verified). A production D1 write (full content replacement for `licensing` + a `replace()` for `contact`) was prepared but requires explicit author confirmation before execution, per the established production-write approval process. Preview of the exact SQL is ready to present on request.

---

## 7. Minor Cleanup (non-blocking, noted for future housekeeping)

- `i18n.ts` `postTranslations.stp.content` retains translation key/value pairs for "An Industry Challenge to Agencies", "Most agencies speak about transparency...", and "This document is not a guideline. It is a structural challenge." — these strings no longer appear in the STP D1 content (moved to `aesthetic-transparency` per B-03) and are now dead entries. They don't affect rendering (unused dictionary keys are simply never matched) but could be removed for maintainability.

---

## 8. Sign-off

**Section A (11/11):** ✅ Confirmed applied
**Section B (6/6):** ✅ Confirmed applied
**D-004 Doctrine→Framework:** ✅ Complete in `src/` and local dev D1 (2 additional instances found and fixed during this pass)
**Vocabulary check:** ✅ Pass (5 matches reviewed, all contextually correct)
**Exclamation marks:** ✅ Zero
**Per-page scores:** ✅ All ≥ 8/10 (local dev)

**Recommendation:** Phase 10 editorial work is **complete**. The only remaining action is the production D1 parity sync for `licensing` and `contact` (§6), which is an infrastructure/deployment step requiring author sign-off on the exact SQL, not an editorial decision.
