# Thai Script Typography — Reference

Thai script has structural requirements that Latin-trained systems routinely violate.
Every rule here overrides the upstream skill library defaults.

---

## Why Thai breaks Latin defaults

Thai uses a stacked glyph system. A single character position can contain:
- **สระบน (upper vowels):** อิ อี อึ อื อั — float above the consonant
- **สระล่าง (lower vowels):** อุ อู — hang below the consonant baseline
- **วรรณยุกต์ (tone marks):** ่ ้ ๊ ๋ — stack above upper vowels (third stack layer)
- **Compound clusters:** upper vowel + tone mark occupies ~2× the vertical space of a Latin cap

A Latin `line-height: 1.5` allocates ~8px of inter-line space at 16px body.
Thai descenders (สระอุ/อู) require ~4px below baseline; Thai ascenders (สระบน + วรรณยุกต์) require ~8–10px above cap height.

**Result: `line-height: 1.5` clips สระอุ/อู at the bottom and clips วรรณยุกต์ at the top.**

---

## Correct line-height values for Thai

| Context | Thai line-height | Latin equivalent |
|---------|-----------------|-----------------|
| Body text (paragraph) | **1.8–1.9** | 1.5 (normal) |
| Article long-form | **1.9** | 1.625 (relaxed) |
| Headings (display) | **1.4–1.5** | 1.25 (tight) |
| UI labels / buttons | **1.5–1.6** | 1.25 |
| Blockquotes | **1.7–1.8** | 1.5 |

Never use `line-height < 1.35` on Thai text — it will clip สระบน.
Never use `line-height < 1.6` for Thai body paragraphs.

### This project's applied values (Base.astro):
- Body: `1.85` ✅
- Article paragraphs: `1.9` ✅
- Headings: `1.4` ✅ (acceptable for display; verify no สระอุ clipping in context)
- Blockquotes: `1.7` ✅

---

## Letter-spacing — ALWAYS 0 for Thai

**Never apply `letter-spacing` to Thai text.**

Thai glyphs use spacing logic embedded in the font metrics. The vowels above/below are positioned relative to the preceding consonant via kerning tables. Adding letter-spacing:
1. Disconnects upper vowels from their consonants → looks misaligned
2. Separates สระเ/สระแ/สระโ (pre-placed vowels) from their consonants visually
3. Breaks ลิเกเจอร์ (ligature glyph pairs) in some fonts

**Always set:** `:lang(th) { letter-spacing: 0; }` — this is in this project already and must not be overridden.

Do not use `text-indent` on Thai paragraphs for the same reason.

---

## Font weight for Thai

Thai fonts differ from Latin in weight rendering:
- **Sarabun 300 (Light)** renders on-screen as visually equivalent to Latin 400 (Regular)
- **Sarabun 400 (Regular)** can look heavy at small sizes
- **Sarabun 600/700** looks very heavy in Thai headlines — avoid for headings

**This project uses:**
- `font-weight: 300` for Thai headings, hero, blockquotes
- `font-weight: 400` implied for body (default)

Never use bold (700) for Thai headings — 300 is the settled convention.

---

## Font-style: italic — do not use for Thai

`font-style: italic` has no equivalent concept in Thai script.
Synthetic italic (browser-generated) skews Thai glyphs, making stacked vowels misalign.

If the design calls for emphasis in Thai:
- Use `font-weight` increase (carefully)
- Use color
- Use `text-decoration: underline` (sparingly)
- Never use `font-style: italic`

**This project sets `font-style: normal` on Thai blockquotes explicitly.** Maintain this.

---

## Font size for Thai

Thai characters are optically smaller than Latin at the same em size.
Sarabun at 16px reads as ~14px Latin.

**This project uses `font-size: 1.0625rem` (17px) for Thai body** — 1px larger than the EN 16px base. This is correct. New Thai components should not revert to `1rem` body size.

Minimum legible Thai font size: **14px**. Never use `--font-size-xs` (12px) for Thai body or supporting text — use `--font-size-sm` (14px) as the floor.

---

## word-break: keep-all

Thai has no word spaces — the script uses no spaces between words.
`word-break: break-all` would break mid-syllable-cluster, making text unreadable.

**This project uses `word-break: keep-all`** — this tells the browser to only break on explicit break opportunities (punctuation, etc.).

Do not change this. Do not use `overflow-wrap: break-word` alone for Thai containers — it has the same problem.

---

## Container height with Thai text

Any `height: fixed` or `min-height` container holding Thai text must account for:
- Additional line height (~30% more than Latin)
- Possible overflow of สระบน/วรรณยุกต์ above the bounding box if `overflow: hidden` is set

**Checklist for any component with fixed height + Thai text:**
- [ ] `overflow: visible` or `overflow: clip` (not `hidden`) on text containers
- [ ] Height allows for `line-height: 1.85+`
- [ ] Test with สระอุ/อู characters: อุ้ม, ดู, รู้, กลุ้ม, ปลูก
- [ ] Test with triple-stack: สระบน + วรรณยุกต์: เปลี้ย, เกี้ยว, ประตู

---

## Sarabun font-specific notes

Sarabun is a Google Fonts typeface designed specifically for Thai UI use. Key properties:
- Complete Thai character coverage including all vowels and tone marks
- Optimized for screen rendering at small sizes
- Available weights: 100–800
- Has Latin characters — works for mixed Thai/EN text without a second font

**Loading:** This project uses `@astrojs/fonts` with `cssVariable="--font-sans"`. The Thai locale override in Base.astro sets `--font-sans: 'Sarabun'`. No additional font loading needed for Thai pages.

**If adding a new font for Thai:** verify it passes the stress test string:
`กรุงเทพมหานคร อมรรัตนโกสินทร์ มหินทรายุธยา มหาดิลกภพ นพรัตนราชธานีบูรีรมย์`

---

## Thai punctuation and number formatting

- Use Thai numerals (๐๑๒๓๔๕๖๗๘๙) only when explicitly requested — EN numerals are acceptable and standard in digital UI
- Thai punctuation: ไปยาลน้อย ฯ (abbreviation mark), ๆ (repetition mark) — render correctly with Sarabun
- Date/time formatting: use `date.toLocaleDateString("th-TH")` for Thai locale (this project uses `formatDateForLocale(date, locale)` in i18n.ts)
- Thai currency: ฿ — render with space: ฿ 1,500 (not ฿1,500)
