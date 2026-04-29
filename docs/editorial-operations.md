# Editorial Operations

This project carries a small set of deliberate package-level overrides for EmDash. They are stored as repo-owned patches so a fresh install can reproduce the runtime and admin behavior Paritsea expects.

## Patch System

- Install-time patch application is handled by `patch-package` through the `postinstall` script in [package.json](/Users/paritr/Desktop/paritsea/package.json).
- The maintained patch files live in [patches/emdash+0.4.0.patch](/Users/paritr/Desktop/paritsea/patches/emdash+0.4.0.patch) and [patches/@emdash-cms+admin+0.4.0.patch](/Users/paritr/Desktop/paritsea/patches/@emdash-cms+admin+0.4.0.patch).
- If a future EmDash update requires re-cutting those patches, edit the installed package locally, then run `npm run patch:refresh`.

## What The Patches Do

- `emdash`:
  - fixes OAuth env access for Astro v6 on Cloudflare Workers
  - disables EmDash root SEO routes so Paritsea can own `robots.txt` and sitemap output
  - adds computed self-canonical defaults in the content API
  - prettifies generated select labels such as `the-doctrine`
  - preserves Paritsea media handling changes
- `@emdash-cms/admin`:
  - adds editorial guidance for Featured Image and OG Image fields
  - hides Ownership and Bylines panels in the content editor

## Editorial Data Rollout

The editorial model depends on both code changes and a production D1 migration.

1. Deploy the compatible code first.
2. Run [sql/2026-04-20-editorial-structure.remote.sql](/Users/paritr/Desktop/paritsea/sql/2026-04-20-editorial-structure.remote.sql) against production D1 once when using `wrangler d1 execute --remote`.
3. Keep [sql/2026-04-20-editorial-structure.sql](/Users/paritr/Desktop/paritsea/sql/2026-04-20-editorial-structure.sql) as the transaction-wrapped source version for reference.
4. Verify the live site and admin after migration.

Do not run the SQL migration before the compatible code is live. The production database still uses the legacy structural category model until the new code is deployed.

Cloudflare D1 remote file execution rejects explicit `BEGIN TRANSACTION` / `COMMIT` statements. That is why the repo keeps a separate `.remote.sql` variant for production use through Wrangler.

## Verification Checklist

- Frontend:
  - `/the-doctrine`
  - `/protocols`
  - `/standards`
  - `/the-method`
  - article detail routes under their framework page
- Article detail behavior:
  - top badge shows the content category for The Method entries
  - left rail shows `Readership`
  - continue reading cards use content categories instead of the framework label
- Admin editor:
  - collection label is `Content`
  - `Page Destination` select is present
  - taxonomy selector is `Categories`
  - Ownership and Bylines are hidden
  - blank canonical fields resolve to the self-canonical URL
