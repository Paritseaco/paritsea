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

1. Validate and apply `seed/seed.json` to the target EmDash database using the collection interface.
2. Run `npm run migrate:intellectual-registry -- --url=<target-url>` with an authenticated EmDash CLI session.
3. The migration reads each item and its `_rev` before writing. It adds stage, status, version, provenance, scope, non-claims, evidence notes, explicit relationships, and reviewed applied contexts.
4. Framework revision 1.1 replaces the absolute immutability claim with explicit, attributable, version-governed change. EmDash revisions preserve version 1.0 as prior evidence.
5. Verify `knowledge.json`, the Framework page, STP, ASLS-01, the Official Use registry, and the three reviewed SE Ocean context links before deployment.

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
