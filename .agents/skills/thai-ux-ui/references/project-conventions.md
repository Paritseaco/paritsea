# Project Conventions — Paritsea (Thai UX/UI)

These are locked decisions. Do not propose alternatives without explicit author instruction.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro (server-rendered, `output: "server"`) |
| Runtime | Cloudflare Workers via Astro adapter |
| Styling | Vanilla CSS (CSS custom properties) — no Tailwind, no CSS-in-JS |
| CMS | EmDash (D1 SQLite, Portable Text) |
| Fonts | Google Fonts via `@astrojs/fonts` or `<Font>` component |

**No `getStaticPaths()` for CMS content.** All content pages are server-rendered.

---

## Token System — CSS Custom Properties

This project uses CSS custom properties in `src/styles/theme.css`. **Not DTCG JSON. Not Tailwind classes.**

When proposing design changes, express values as CSS custom properties, not raw values.

### Typography tokens

```css
--font-sans: 'Inter', system-ui, sans-serif;       /* EN body/UI */
--font-serif: 'Playfair Display', serif;           /* EN headings/editorial */
/* Thai overrides (applied via :lang(th)) */
--font-sans (th): 'Sarabun', system-ui, sans-serif;
--font-serif (th): 'Sarabun', system-ui, sans-serif;

--font-size-2xs: /* ~10px */
--font-size-xs:  /* ~12px */
--font-size-sm:  /* ~14px */
--font-size-base: /* 16px */
--font-size-lg:  /* ~18px */
--font-size-xl:  /* ~20px */
--font-size-2xl: /* ~24px */
```

### Line-height tokens

```css
--leading-none:    1
--leading-tight:   1.08
--leading-snug:    1.25
--leading-normal:  1.5
--leading-relaxed: 1.72
--leading-loose:   2
--leading-display: 0.95
```

> ⚠️ **None of these are safe for Thai body text.** See `thai-typography.md` for correct values.

### Spacing tokens (4px base)

```css
--spacing-1: 4px   --spacing-8: 32px
--spacing-2: 8px   --spacing-10: 40px
--spacing-3: 12px  --spacing-12: 48px
--spacing-4: 16px  --spacing-14: 56px
--spacing-5: 20px  --spacing-16: 64px
--spacing-6: 24px  --spacing-20: 80px
--spacing-7: 28px  --spacing-24: 96px
```

---

## Thai Typography — Current Applied Rules (Base.astro)

These are the **live rules** in `src/layouts/Base.astro`. New Thai components must be consistent.

```css
/* Thai font override */
:lang(th) {
  --font-sans: 'Sarabun', system-ui, sans-serif;
  --font-serif: 'Sarabun', system-ui, sans-serif;
}

/* Thai body */
:lang(th) body {
  font-size: 1.0625rem;    /* 17px — slightly larger than EN 16px */
  line-height: 1.85;
  letter-spacing: 0;       /* NEVER non-zero for Thai */
  word-break: keep-all;
}

/* Thai headings */
:lang(th) h2–h6 {
  font-weight: 300;        /* Sarabun Light — heavier weights look overcooked */
  letter-spacing: 0;
  line-height: 1.4;
}

/* Thai article body */
:lang(th) .article-content p,
:lang(th) .article-content li {
  letter-spacing: 0;
  line-height: 1.9;
}

/* Thai blockquotes */
:lang(th) blockquote {
  font-weight: 300;
  font-style: normal;      /* italic is wrong for Thai script */
  line-height: 1.7;
}
```

---

## i18n Pattern

- Thai pages: root path with English slug → `/the-method/automation-fear`
- English pages: `/en/` prefix → `/en/the-method/automation-fear`
- Locale detection: `getAstroLocale(Astro)` from `src/utils/i18n.ts`
- Thai locale is `"th"`, not `"th-TH"` in route logic
- Translations: `postTranslations` object in `src/utils/i18n.ts` — span text → Thai text mapping
- `html[lang]` is set by `localeToHtmlLang(locale)` in Base.astro → enables `:lang(th)` CSS selectors

---

## Token Naming Conventions (settled — do not re-litigate)

- Spacing: `--spacing-{n}` (4px steps, power-of-2 increments)
- Font size: `--font-size-{name}` (xs/sm/base/lg/xl/2xl/3xl)
- Line height: `--leading-{name}` (none/tight/snug/normal/relaxed/loose/display)
- Colors: `--color-{role}` (text/text-secondary/muted/accent/accent-hover/bg/bg-subtle/border/border-subtle)
- Transitions: `--transition-fast` / `--transition-base`
- Widths: `--wide-width` / `--content-width` / `--narrow-width`

---

## What Must Not Change Without Author Approval

- Font choices (Sarabun for Thai, Inter + Playfair Display for EN)
- Token naming scheme
- `letter-spacing: 0` for Thai — this is non-negotiable (see `thai-typography.md`)
- `word-break: keep-all` for Thai body text
- `font-style: normal` on Thai headings and blockquotes (no italic)
