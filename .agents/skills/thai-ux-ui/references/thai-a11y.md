# Thai Accessibility Standards — Reference

---

## Which standard applies

**For Thai public-sector / government digital services:**

Thailand has adopted **WCAG 2.1 Level AA** as the minimum requirement under the:
- มาตรฐาน WCAG 2.1 ระดับ AA (referenced in ETDA and DSI guidance)
- พ.ร.บ. ส่งเสริมและพัฒนาคุณภาพชีวิตคนพิการ พ.ศ. 2550 (Persons with Disabilities Empowerment Act)
- ระเบียบกระทรวงดิจิทัลว่าด้วยมาตรฐานเว็บไซต์ภาครัฐ (MDES Web Accessibility Guidelines)
- สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA) audit checklist

**Government audit scope:** ETDA audits typically check WCAG 2.1 AA. AAA is not required but earns recognition.

**For Paritsea (private, non-government):**
- Target: WCAG 2.1 AA minimum, WCAG 2.2 AA where feasible
- No statutory obligation — but AA is the professional floor for Thai digital content

---

## Thai-specific accessibility issues

These are NOT covered by the upstream a11y-audit skill (which has no Thai knowledge).

### 1. Language tag — critical

Thai screen readers (e.g. NVDA + eSpeak Thai, VoiceOver iOS Thai) require `lang="th"` on the `<html>` element or the specific element containing Thai text.

Without `lang="th"`:
- Screen readers read Thai with a Latin phonetic engine (incomprehensible)
- Windows Narrator switches to system default language
- iOS VoiceOver falls back to English pronunciation

**Check:** Every Thai page must have `<html lang="th">`. This project sets it via `localeToHtmlLang(locale)` — verify it is applied on every rendered page.

**Mixed content:** If a Thai page contains EN passages (headers, proper nouns), wrap the EN portion: `<span lang="en">Structural Transparency Protocol</span>`. Screen readers switch engines automatically.

### 2. Thai screen readers — behavior

Thai screen readers:
- **Read character-by-character** if they cannot segment words (no spaces in Thai)
- Word segmentation quality varies significantly between readers
- Do NOT assume TTS output is coherent without testing

Popular assistive technology in Thai:
| Tool | Platform | Notes |
|------|---------|-------|
| VoiceOver (iOS/macOS) | Apple | Best Thai TTS quality |
| TalkBack | Android | Acceptable for common words |
| NVDA + eSpeak Thai | Windows | Word segmentation is poor |
| JAWS | Windows | Limited Thai TTS support |
| Dolphin SuperNova | Windows | Used in Thai government offices |

**Test with VoiceOver (iOS) at minimum** — highest Thai TTS quality and most common among Thai disabled users.

### 3. Focus indicators — contrast requirements

Standard WCAG focus indicator contrast (3:1 against adjacent colors) applies.
Additional Thai consideration: focus rings on Thai text containers must not clip สระบน/วรรณยุกต์.

If using `outline: 2px solid var(--color-accent)` + `outline-offset: 2px`, verify the offset is sufficient to clear ascending Thai diacritics.

Recommended: `outline-offset: 3px` minimum for components containing Thai text at display size.

### 4. Target size — Thai mobile context

WCAG 2.2 SC 2.5.8 requires 24×24px minimum target. Thai mobile usage note:
- Thailand is predominantly mobile-first
- iOS with accessibility zoom enabled: ensure targets remain tappable
- Thai text buttons with `word-break: keep-all` may wrap unexpectedly → minimum touch target may split across lines

**Test:** Resize button text to 200% and verify tap target remains ≥44×44px (WCAG 2.5.5 enhanced).

### 5. Color contrast — Thai text at reduced size

Due to the 17px base font size for Thai (vs 16px EN), contrast requirements are technically the same as EN at 16px (4.5:1 for text under 18.67px / 14px bold).

However: Thai glyphs at small sizes have thinner stroke weights due to the complex glyph shapes. Consider treating **14px Thai text as "small text"** even if Latin 14px would be considered normal text — use 4.5:1 contrast ratio rather than 3:1.

### 6. Cognitive accessibility — Thai reading patterns

Thai users exhibit F-pattern and Z-pattern reading similar to other scripts. However:
- Thai has no word spaces → visual chunking relies entirely on font rendering
- Dense Thai text paragraphs read slower than equivalent Latin
- Recommended Thai paragraph max-width: 65–70 characters per line (wider than Latin 60-65 because Thai characters are narrower)
- Use `max-width: 70ch` for Thai content blocks OR a fixed value equivalent to ~520px at Sarabun 17px

### 7. Form labels — Thai assistive technology

Thai screen readers expect `<label for="...">` or `aria-label` in Thai.
If using `aria-label` with English text on a Thai page, the screen reader may switch to English voice — confusing for users who have Thai as primary.

**Rule:** `aria-label`, `aria-describedby`, and `placeholder` text must be in Thai on Thai-locale pages.

---

## Thai accessibility audit checklist

Run this in addition to the standard WCAG checklist:

- [ ] `<html lang="th">` on all Thai-locale pages
- [ ] Mixed EN text within Thai content wrapped with `<span lang="en">`
- [ ] Tested with VoiceOver (iOS) in Thai language setting
- [ ] All `aria-label`, `placeholder`, error messages in Thai on Thai pages
- [ ] `line-height ≥ 1.8` on all Thai body text (prevents clipping = perceivable)
- [ ] `letter-spacing: 0` on all Thai text (structural correctness)
- [ ] No `overflow: hidden` on containers with Thai text without height accommodation
- [ ] Focus indicator `outline-offset ≥ 3px` on Thai display elements
- [ ] Thai body text `font-size ≥ 14px` (Sarabun rendering floor)
- [ ] `word-break: keep-all` on Thai body content
- [ ] Date/number formatting via `Intl` or `formatDateForLocale(date, "th")`
- [ ] Touch targets ≥ 44×44px tested with Thai text wrapping at 200% zoom

---

## ETDA Web Accessibility Compliance (ภาครัฐ)

If auditing a Thai government project (not Paritsea, but for reference):

ETDA uses a point-based scoring system (คะแนนการประเมิน) across:
1. Perceivable (มองเห็นได้)
2. Operable (ใช้งานได้)
3. Understandable (เข้าใจได้)
4. Robust (เข้ากันได้)

Minimum passing score: 60/100 (Tier 1 certification).
Bronze = 60–74, Silver = 75–89, Gold = 90+.

Key items audited in Thai government reviews:
- Document language tag (lang attribute) — weighted heavily
- Alternative text for images in Thai
- Keyboard navigation completeness
- Form error identification in Thai
- Skip navigation link (ข้ามไปยังเนื้อหาหลัก)
- Consistent navigation across pages
