This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
npx emdash dev        # Start dev server (runs migrations, seeds, generates types)
npx emdash types      # Regenerate TypeScript types from schema
npx emdash seed seed/seed.json --validate  # Validate seed file
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Local Cloudflare D1 Dev Database

When the site is running through the Cloudflare/Astro dev runtime, the app reads
the local D1 sqlite database under `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/`.
Do not assume `data.db` is the active dev database.

`npx emdash seed seed/seed.json` defaults to `./data.db`; that can validate or
seed the wrong database for browser/dev-server checks. If seeded content is not
appearing in `npx emdash dev`, locate the active Miniflare sqlite file and seed
that file explicitly, for example:

```bash
npx emdash seed seed/seed.json --database .wrangler/state/v3/d1/miniflare-D1DatabaseObject/<hash>.sqlite --on-conflict update
```

## URL Slug Rules

Slugs must be SEO-friendly English URL segments. Do not use Thai text in URLs.
They do not need to contain the full page or The Method title; prefer short,
readable slugs that clearly signal the content.

English pages use the canonical root path with the English slug, for example
`/journal/automation-fear`. Thai pages keep the same English slug under `/th`,
for example `/th/journal/automation-fear`.

Legacy `/en/...` paths may redirect to the canonical root English URL. Do not add
new `/en` routes unless the locale strategy is explicitly changed.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, taxonomies, menus, widgets) |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, search, page contributions)                 |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.
- **thai-ux-ui** -- **REQUIRED for any Thai-locale UX/UI work.** Load before designing Thai components, auditing Thai pages, writing Thai UX copy, or proposing changes to `:lang(th)` typography rules. Supersedes `a11y-audit`, `design-tokens`, and `ux-writing` for Thai pages.
- **a11y-audit** -- WCAG 2.2 AA/AAA audit, contrast measurement, ARIA patterns. For Thai pages: load **thai-ux-ui first**.
- **ux-writing** -- Interface copy, error messages, button text. For Thai copy: load **thai-ux-ui first**.
- **design-tokens** -- Design token generation. Note: this project uses CSS custom properties (`--spacing-*`, `--font-size-*`), not DTCG JSON.

### Thai UX/UI — when to load thai-ux-ui

**Load thai-ux-ui whenever the work touches Thai-locale rendering.** Specifically:

- Designing or modifying a component that renders Thai text (`:lang(th)`)
- Writing labels, errors, or microcopy for Thai pages
- Auditing Thai pages for accessibility or typography
- Proposing changes to `line-height`, `letter-spacing`, `font-weight`, or `font-size` in the Thai CSS block in `Base.astro`
- Adding a new Astro page that has a Thai locale version

**Do not use a11y-audit or ux-writing alone for Thai work.** Generic skills assume Latin script and will produce incorrect values: `line-height: 1.5` clips สระอุ/สระบน; non-zero `letter-spacing` breaks Thai glyph stacking; `font-style: italic` misaligns vowels. These rules are documented and enforced by the thai-ux-ui skill.

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- Always call `Astro.cache.set(cacheHint)` on pages that query content.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).
