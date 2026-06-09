---
name: thai-ux-ui
description: |
  Thai-locale UX/UI design skill for the Paritsea site. Supersedes the generic a11y-audit,
  design-tokens, and ux-writing skills for any work on Thai-language pages or components.
  Covers Thai script typography (Sarabun, line-height, no letter-spacing), Thai accessibility
  (WCAG 2.1 AA + Thai screen reader behaviour, lang tag, ETDA standards), and locked project
  conventions (Astro/Cloudflare, CSS custom properties, settled token names).
  Use when: designing new Thai components, auditing Thai pages for accessibility, writing UX
  copy for Thai locale, proposing typography or layout changes that affect :lang(th) rules.
---

# Skill: Thai UX/UI — Paritsea Site

This skill is the **Thai-locale override layer** over the upstream UX/UI skill library
(https://github.com/plugin87/ux-ui-agent-skills). Where this skill conflicts with upstream
defaults, this skill wins.

---

## Step 0 — Always read these first

Before any Thai UX/UI work, read all three reference documents in this skill directory:

1. `references/project-conventions.md` — stack, token names, locked conventions, font setup
2. `references/thai-typography.md` — Thai script rules (line-height, letter-spacing, font-weight, italic ban)
3. `references/thai-a11y.md` — Thai accessibility standards, screen reader behaviour, ETDA

Do not skip these. The generic skill defaults are wrong for Thai.

---

## Decision framework (Thai-adapted)

Same priority order as upstream, with Thai-specific notes:

1. **User needs** — Thai user, Thai reading patterns, Thai mobile-first context (Thailand is >75% mobile browsing)
2. **Accessibility** — WCAG 2.1 AA + Thai-specific requirements from `references/thai-a11y.md`
3. **Consistency** — matches existing `:lang(th)` rules in `Base.astro` and project token system
4. **Aesthetics** — Sarabun renders differently from Latin; verify visually, don't rely on Latin intuitions
5. **Developer experience** — CSS custom properties, Astro components, no framework UI libraries

---

## Typography rules (Thai — non-negotiable)

These override all upstream `design-tokens` and `ux-writing` defaults:

| Property | Thai value | Why |
|----------|-----------|-----|
| `font-family` | `'Sarabun', system-ui, sans-serif` | Only Thai font in the project |
| `letter-spacing` | **`0` always** | Breaks glyph stacking; never non-zero |
| `font-style` | **`normal` always** | No italic concept in Thai; synthetic italic misaligns glyphs |
| `font-weight` headings | **`300`** | Sarabun 300 = visual weight of Latin 400; heavier looks overcooked |
| `font-size` body | `1.0625rem` (17px) | Thai glyphs optically smaller at 16px |
| `line-height` body | **≥ 1.85** | Accommodates upper vowels + tone marks above cap height |
| `line-height` article | **≥ 1.9** | Long-form reading, full vowel/tone mark clearance |
| `line-height` headings | **1.4–1.5** | Display — verify no สระอุ clipping |
| `word-break` | `keep-all` | Thai has no spaces; `break-all` breaks mid-syllable |

**Any proposed change to these values requires author approval.** They were arrived at through
iteration, not defaults.

---

## Accessibility checklist (Thai-specific)

Run in addition to WCAG 2.1 AA:

- [ ] `<html lang="th">` present on every Thai-locale page
- [ ] Mixed EN text within Thai content: `<span lang="en">` wraps EN runs
- [ ] VoiceOver (iOS) tested with Thai language enabled
- [ ] All `aria-label`, `aria-describedby`, `placeholder`, error text in Thai on Thai pages
- [ ] No fixed-height containers with `overflow: hidden` on Thai text (clips สระบน/วรรณยุกต์)
- [ ] Focus indicators: `outline-offset ≥ 3px` on Thai display-size elements
- [ ] Minimum font size: 14px (`--font-size-sm`) floor for Thai body text
- [ ] Touch targets ≥ 44×44px — test after Thai text wraps with `word-break: keep-all`
- [ ] Contrast: 4.5:1 for Thai text ≤ 17px (treat Thai 14px as "small text" per `thai-a11y.md`)

---

## UX writing rules (Thai)

Extends upstream `ux-writing` skill:

- **Sentence case** applies in Thai too — do not use ALL CAPS for Thai labels
- **Action buttons:** Thai buttons use the verb first (same pattern as EN) — ยืนยัน, บันทึก, ลบ, ยกเลิก
- **Confirmation dialogs:** confirm button restates action in Thai — "ลบบัญชี" not "ตกลง"
- **Errors:** what + why + how in Thai — never a bare "เกิดข้อผิดพลาด" (Error) with no context
- **Tone register:** Paritsea Thai copy uses ภาษากลาง (standard/formal register) — not casual social media register (ภาษาพูด), not royal register (ราชาศัพท์)
- **No เนื้อหา/content hybrid:** keep Thai text in Thai; keep EN terms (Protocol, Framework, Journal, Implementation) as EN — these are proper nouns in this project
- **Honorifics:** do not add ท่าน/คุณ/คะ/ครับ to UI copy — Paritsea's register is direct, not service-industry polite

---

## Token usage (Thai)

The project uses **CSS custom properties**, not DTCG JSON. When proposing Thai design changes:

1. Use existing tokens: `--font-size-sm`, `--spacing-4`, `--color-accent`, etc.
2. New Thai-specific values go in `src/layouts/Base.astro` under `:lang(th) { }` — **not** in `theme.css`
   (Thai overrides are locale-scoped; global theme must remain clean for EN)
3. Do not add new token names without checking `references/project-conventions.md` for naming convention

---

## Component design — Thai-specific patterns

### Text containers
```css
/* Thai body container — required pattern */
:lang(th) .container {
  font-family: 'Sarabun', system-ui, sans-serif;
  font-size: 1.0625rem;
  line-height: 1.85;
  letter-spacing: 0;
  word-break: keep-all;
  /* DO NOT: overflow: hidden */
}
```

### Headings
```css
:lang(th) .heading {
  font-family: 'Sarabun', system-ui, sans-serif;
  font-weight: 300;     /* NOT 700 */
  font-style: normal;   /* NOT italic */
  letter-spacing: 0;    /* NOT any positive value */
  line-height: 1.4;
}
```

### Buttons and labels
```css
/* Thai button — no letter-spacing, no italic */
:lang(th) .btn {
  font-family: 'Sarabun', system-ui, sans-serif;
  letter-spacing: 0;
  font-style: normal;
  min-height: 44px;   /* Touch target */
  line-height: 1.5;   /* Accommodate vowels in button label text */
}
```

### Stress test strings — use these when testing Thai layouts
```
สระล่าง: อุ้ม, ดู, รู้, กลุ้ม, ปลูก, ชุ่ม, คุณ
สระบน + วรรณยุกต์: เปลี้ย, เกี้ยว, เสี่ยง, เลี้ยว
Long title: กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม
Full alphabet: กขคงจฉชซญดตถทนบปผฝพฟภมยรลวสหอฬฮ
```

---

## Upstream skills — when to use them

These upstream skills were installed alongside this one:

| Skill | Use when | Thai note |
|-------|---------|----------|
| `a11y-audit` | Full WCAG audit tool, contrast measurement | **After this skill** — run its checklist on top of Thai checklist |
| `design-tokens` | Generating new token files | **Not applicable** — this project uses CSS vars, not DTCG |
| `ux-writing` | EN copy review, error formulas, button text patterns | **After this skill** — apply to EN pages; Thai copy follows Thai rules above |

For Thai pages: **this skill first, then upstream skills for gaps it doesn't cover.**

---

## What this skill does NOT cover

- Figma files (no Figma access in this project)
- Design system JSON tokens (project uses CSS vars)
- Dark mode Thai specifics (project has dark mode but Thai overrides inherit it)
- Thai government site compliance audit (ETDA certification) — see `references/thai-a11y.md` for reference, but Paritsea is private sector

---

## Upstream library origin

Installed from: https://github.com/plugin87/ux-ui-agent-skills

This skill adapts the upstream library for:
1. Thai script requirements (typography, font behaviour, glyph stacking)
2. Thai accessibility standards (WCAG 2.1 AA, ETDA, Thai screen reader behaviour)
3. This project's specific stack and locked conventions

The upstream SKILL.md files in `a11y-audit/`, `design-tokens/`, and `ux-writing/` are
installed verbatim — they cover EN/Latin workflows. For Thai pages, load **this skill** instead.
