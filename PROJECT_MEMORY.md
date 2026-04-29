# Paritsea Project Memory

This file captures architecture knowledge and implementation decisions for the Paritsea site so future work does not depend on re-explaining the same context.

## Stack

- Framework: Astro
- CMS/runtime: EmDash CMS
- Hosting/runtime: Cloudflare Workers
- Database: Cloudflare D1
- Media: Cloudflare R2
- Sessions: Cloudflare KV

## Local Tooling

- A project-local Python virtualenv for the OpenAI Agents SDK now exists at:
  - `/Users/paritr/Desktop/paritsea/.venv-openai-agents`
- Installed and verified packages in that environment include:
  - `openai-agents==0.14.2`
  - `openai==2.32.0`
- Basic usage pattern:
  - activate: `source .venv-openai-agents/bin/activate`
  - or run directly: `./.venv-openai-agents/bin/python ...`
- A repo-native example agent script now exists at:
  - `/Users/paritr/Desktop/paritsea/scripts/paritsea_reference_agent.py`
- Helpful shortcut:
  - `npm run agent:reference -- "Your question here"`
- LiteLLM support is installed in the same virtualenv for non-OpenAI providers.
- The example agent currently defaults to:
  - `gemini/gemini-2.5-flash-lite` when `GEMINI_API_KEY` or `GOOGLE_API_KEY` is present
  - `dashscope/qwen-turbo` when Gemini is not configured but `DASHSCOPE_API_KEY` is present
- The example agent should not silently default to OpenAI for normal usage because the project preference is:
  - Gemini Developer API free tier as primary
  - Qwen + Free Quota Only as backup
- This environment is intentionally separate from the site runtime so Python agent experiments do not affect the Astro / Node deployment stack.

## Core Architecture

- EmDash content is not stored in a plain `posts` table.
- The production D1 schema stores post content in `ec_posts`.
- EmDash taxonomy relationships are stored in `content_taxonomies` and `taxonomies`.
- EmDash bylines are stored in `_emdash_bylines` and `_emdash_content_bylines`.
- Redirect rules are stored in `_emdash_redirects`.
- The site uses EmDash query helpers such as `getEmDashCollection()`, `getEmDashEntry()`, `getEntryTerms()`, and `getSiteSettings()`.

## Verified Production Schema Notes

- Post table: `ec_posts`
- Page table: `ec_pages`
- Important post columns include:
  - `id`
  - `slug`
  - `status`
  - `published_at`
  - `updated_at`
  - `featured_image`
  - `content`
  - `excerpt`
- Taxonomy table columns include:
  - `name`
  - `slug`
  - `label`
- Redirect table columns are:
  - `source`
  - `destination`
  - `type`
  - `enabled`
  - `auto`

## Content Model

- `The Doctrine`, `Protocols`, `Standards`, `The Method`, and `Implementations` are the current top-level architectural layers.
- They should not be treated as `/category/...` archive URLs.
- Valid public structural page URLs are:
  - `/the-doctrine`
  - `/protocols`
  - `/standards`
  - `/the-method`
  - `/implementations`
- Old archive-style URLs like `/category/the-method` should redirect to the top-level structural page.

## Architecture Wording

- Public architecture wording should prefer:
  - `The Doctrine`
  - `Protocols`
  - `Standards`
  - `The Method`
  - `Implementations`
- `Implementations` is the correct fifth public layer for products or enforcement systems that apply Paritsea logic in live environments.
- Avoid using `Practical Application` as the primary architectural label; it is too generic and less durable as IP vocabulary.
- Avoid user-facing `record` / `records` wording for The Method. Prefer `entry` / `entries` / `analytical entries`.
- AgenSea currently counts as the first live implementation layer:
  - product status: MVP / implementation in development
  - framework relationship: implementation of the STP / ASLS family
  - authoritative implementation reference: `/Users/paritr/Desktop/AgenSea/docs/protocol/ASLS_IMPLEMENTATION.md`

## Editorial Data Model

- `The Doctrine`, `Protocols`, `Standards`, `The Method`, and `Implementations` should now be stored as an explicit post field:
  - `framework_page`
- `framework_page` is the real routing / destination source for entries and replaces the old misuse of the `category` taxonomy for structural placement.
- The `category` taxonomy is now the real multi-select content classification layer.
- Current canonical content categories include:
  - `Seeing Clearly`
  - `Human Cost`
  - `Structural Tension`
  - `Foundational`
  - `Active`
- `tag` should no longer be treated as an active taxonomy in Paritsea once the production migration has run.

## UI Rules Already Chosen

- On a `The Method` article detail page:
  - the top badge should show the content tag label, not `The Method`
  - the left sidebar should not show `Categories`
  - the left sidebar should show `Readership` instead
- In article lists/cards for `The Method`:
  - display the content tag label, not `The Method`
- Avoid using the old label `Record` for `The Method` entries.
- In EmDash admin, editors should choose the destination page from `Page Destination` and use `Categories` only for content classification.
- `Ownership` and `Bylines` are intentionally hidden in the content editor because `authorId` is auto-assigned from the logged-in user and byline fallback is handled structurally.

## Routing Rules

- Navigation links should point to:
  - `The Doctrine` -> `/the-doctrine`
  - `Protocols` -> `/protocols`
  - `Standards` -> `/standards`
  - `The Method` -> `/the-method`
- Article detail routes currently live under:
  - `/protocols/[slug]`
  - `/standards/[slug]`
  - `/the-method/[slug]`
- `The Doctrine` is a standalone page and not a nested slug route.

## Important Current Findings

- Production content rows for the main structural articles and The Method entries exist in D1 and are published.
- Example published slugs in production include:
  - `when-the-tool-was-not-the-problem`
  - `when-ownership-thinking-collides-with-system-reality`
  - `on-automation-that-still-requires-fear`
  - `when-monitoring-becomes-emotional-labour`
  - `when-everything-works-and-something-is-still-wrong`
  - `stp`
  - `asls-01`
  - `doctrine`
- No redirect rules were found in `_emdash_redirects` for `/the-method/...` paths at the time this memory was written.

## Implementation Notes

- EmDash route helpers should be preferred first.
- If `getEmDashEntry("posts", slug)` behaves inconsistently for article detail pages, a direct D1 fallback can query `ec_posts` plus taxonomy/byline joins without changing the public URL contract.
- The current detail-page fallback uses `getDb()` from `emdash/runtime` rather than relying on `Astro.locals.runtime.env.DB`.
- The direct fallback is currently implemented in [src/utils/direct-post.ts](/Users/paritr/Desktop/paritsea/src/utils/direct-post.ts).
- `src/utils/public-paths.ts` is now the shared routing source for converting `framework_page` into public URLs.
- When rendering card labels, do not assume `/tag/[slug]` exists as a public route.
- If a card/tag label needs to be shown only as taxonomy context, render it as text instead of forcing a tag URL.

## Readership Notes

- Article detail pages currently show `Readership` in the left metadata rail instead of `Categories`.
- Read counts are stored in a dedicated `post_views` table.
- The helper lives in [src/utils/view-count.ts](/Users/paritr/Desktop/paritsea/src/utils/view-count.ts).
- The current implementation increments reads on page request and renders values like `1 read` / `N reads`.

## Verified Live Behavior

- As of April 19, 2026, all linked detail pages under `/the-method` return HTTP 200 on the live site.
- As of April 19, 2026, The Method article detail pages show:
  - top badge = content tag label
  - sidebar metric = `Readership`
  - continue reading cards = content tag labels instead of `The Method`
- As of April 19, 2026, pages without an explicit SEO canonical override still emit a self-canonical URL via the site layout.

## Cloudflare Runtime Notes

- `wrangler.jsonc` binds:
  - `DB` -> D1 database `paritsea-site`
  - `MEDIA` -> R2 bucket `paritsea-media`
  - `SESSION` -> KV namespace
  - `IMAGES` -> Cloudflare Images binding used for upload/delivery transforms
- The site deploys with:
  - `npm run deploy`
- As of April 19, 2026, production `options.emdash:site_url` is set to `https://paritsea.co` and stored as a JSON string.
- As of April 19, 2026, Cloudflare Worker secrets include:
  - `EMDASH_OAUTH_GITHUB_CLIENT_ID`
  - `EMDASH_OAUTH_GITHUB_CLIENT_SECRET`

## OAuth Notes

- GitHub sign-in is enabled in production for EmDash admin.
- As of April 19, 2026, GitHub account `@Paritseaco` (provider account ID `260097242`) is linked directly to the admin user `parit.ritchai@gmail.com` in `oauth_accounts`.
- EmDash `0.4.0` OAuth route code was incompatible with Astro v6 because it referenced the removed `Astro.locals.runtime.env` API.
- A local package patch was applied in:
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/src/astro/routes/api/auth/oauth/[provider].ts`
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/src/astro/routes/api/auth/oauth/[provider]/callback.ts`
- The patch switches OAuth env access to `import { env } from "cloudflare:workers"`.
- These package-level fixes are now formalized with `patch-package`:
  - install hook: `postinstall`
  - patch files live in `/Users/paritr/Desktop/paritsea/patches/`
- Additional local `node_modules` patches are now in use for media handling:
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/src/astro/routes/api/media.ts`
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/src/astro/routes/api/media/file/[...key].ts`
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/src/components/EmDashImage.astro`
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/src/components/EmDashMedia.astro`
  - `/Users/paritr/Desktop/paritsea/node_modules/@emdash-cms/admin/dist/index.js`
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/src/api/handlers/content.ts`
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/src/emdash-runtime.ts`
- These media patches do three things:
  - new raster uploads are transcoded to `image/webp` before being stored in R2
  - local media delivery supports Cloudflare-powered optimization params (`w`, `h`, `q`, `f`) and auto-WebP for compatible browsers
  - the admin UI now shows short editorial guidance for `Featured Image` and `OG Image` sizes / accepted formats
- Additional editor/runtime patches now also do three things:
  - prettify select option labels generated from slug values like `the-doctrine` -> `The Doctrine`
  - prefill SEO canonical fields with a computed self-canonical URL when no manual override exists
  - hide editor-side `Ownership` and `Bylines` panels so the author workflow stays streamlined
- The admin patch file was trimmed to keep only behavior-changing hunks in `dist/index.js`.
- Locale bundle diffs are intentionally not preserved because the English admin UI already reads the updated default messages from code.

## Migration Notes

- The production D1 migration for this editorial model lives in:
  - [2026-04-20-editorial-structure.sql](/Users/paritr/Desktop/paritsea/sql/2026-04-20-editorial-structure.sql)
  - [2026-04-20-editorial-structure.remote.sql](/Users/paritr/Desktop/paritsea/sql/2026-04-20-editorial-structure.remote.sql)
- That migration does all of the following:
  - adds `ec_posts.framework_page`
  - backfills existing entries from the old structural `category` assignments
  - repurposes `category` into true content categories
  - removes the legacy `tag` taxonomy definition and assignments
  - relabels the `posts` collection to `Content` / `Entry`
  - links the `Parit Ritchai` byline to the real admin user and backfills missing `author_id` values
- Cloudflare D1 remote SQL execution via Wrangler does not accept explicit `BEGIN TRANSACTION` / `COMMIT` statements in the uploaded file.
- Use the `.remote.sql` variant for production execution with `wrangler d1 execute --remote`.

## SEO Route Notes

- Paritsea uses project-owned root routes for:
  - `/robots.txt`
  - `/sitemap.xml`
  - `/sitemap-[collection].xml`
  - `/rss.xml`
  - `/llms.txt`
- EmDash's built-in root SEO routes were disabled locally in:
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/src/astro/integration/routes.ts`
  - `/Users/paritr/Desktop/paritsea/node_modules/emdash/dist/astro/index.mjs`
- This is intentional because EmDash's default sitemap logic generates `/posts/{slug}` URLs, which are not the canonical public URLs for Paritsea.
- Legacy per-collection sitemap requests now return `410 Gone` and instruct crawlers to use `/sitemap.xml` instead.
- If `emdash` is reinstalled or upgraded, these local patches may need to be re-applied unless upstream adds a first-class option to disable injected SEO root routes.

## Source References

- EmDash repo: <https://github.com/emdash-cms/emdash>
- Cloudflare post about EmDash and WordPress: <https://blog.cloudflare.com/emdash-wordpress/>
