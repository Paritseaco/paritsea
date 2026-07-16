# Paritsea Release and Verification

Status: Canonical

## Release chain

Run sequentially because concurrent EmDash/Astro commands can contend for the local Miniflare D1 database.

1. `npx emdash seed seed/seed.json --validate`
2. `npx emdash types`
3. `npm run typecheck`
4. `npm run build`
5. `npm run test:smoke`

## Content migration

The schema seed and intellectual-record migration are separate so existing CMS entries retain their IDs, bylines, revisions, media, and translation groups.

1. Validate `seed/seed.json`.
2. Run `npm run migrate:intellectual-schema -- --url=<target-url>` with `EMDASH_TOKEN` from an authenticated EmDash CLI session. This uses EmDash schema and menu HTTP interfaces, including validation, reference-target, and translation metadata that the current CLI flags do not expose.
3. Run `npm run migrate:intellectual-registry -- --url=<target-url>` with the authenticated EmDash CLI session.
4. The content migration reads each item and its `_rev` before writing. It adds stage, status, version, provenance, scope, non-claims, evidence notes, explicit relationships, reviewed applied contexts, and the provisional AgenSea Official Use record.
5. Framework revision 1.1 replaces the absolute immutability claim with explicit, attributable, version-governed change. EmDash revisions preserve version 1.0 as prior evidence.
6. Verify `knowledge.json`, the Framework page, STP, ASLS-01, the Official Use registry, and the three reviewed SE Ocean context links before deployment.

The migration uses EmDash content CRUD only. Application code and release scripts do not use raw SQL.

## Smoke coverage

- English and Thai canonical route matrix
- one-hop legacy redirects
- canonical and hreflang output
- breadcrumb, page role, status, version, provenance, and scope on full documents
- absence of duplicate metadata
- page-appropriate structured data
- sitemap URLs resolve directly with 200
- real 404 responses
- `llms.txt`, `ai.txt`, and `knowledge.json`
- keyboard navigation, visible focus, and reduced motion
- Thai computed typography
- overflow and hierarchy at 390, 768, 1440, 1920, and 3840px

## Deployment gate

Passing local verification authorizes commit and push, not production deployment. Before deployment, provide the implementation summary, final boundary model, content migration state, verification results, dependency status, known limitations, rollback plan, and request explicit approval.

No production D1 mutation or Worker deployment occurs before that approval.

## Rollback

- Application rollback: redeploy the previous Worker deployment.
- Content rollback: use EmDash revisions to republish the previous intellectual-work revision; retire newly created relationship or applied-context records rather than deleting their history.
- Route rollback: retain the one-hop redirects even when rolling back UI code so legacy links do not regress.

## Production D1 identity and auth repair

- The canonical Worker binding is `DB` → `paritsea-site-prod` (`4c6bb48c-a21c-48dc-991d-be155946e6db`). Keep the resource name and ID aligned in `wrangler.jsonc` so operator commands do not resolve the legacy database by name.
- On 2026-07-16, the existing administrator and GitHub account linkage were restored from the legacy `paritsea-site` database after the production binding was found to contain content but no EmDash owner state. No passkey credential or session token was copied.
- The pre-repair Time Travel bookmark is `00000d52-00000000-000050aa-aad65476145e2e4174e4ca20cb0d0152`.
- A redirect from `/_emdash/admin/device` to `/_emdash/admin/setup` now indicates a regression in `emdash:setup_complete`, owner state, or the active D1 binding; do not initialize a second owner before checking those three conditions.
