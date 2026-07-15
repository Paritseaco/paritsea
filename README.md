# Paritsea

Paritsea is an author-led intellectual practice with an independent public
record. Parit Ritchai originates and signs the observation and judgement;
Paritsea preserves provenance, versions, relationships, scope, and use
boundaries.

This is not a monetized service website. Commercial service expression belongs
to SE Ocean. SE Ocean may interpret and apply selected work, but it is not the
canonical source and does not gain authority to silently change it.

Canonical governance lives in the five `docs/paritsea-*` source-of-truth
documents covering boundary, identity, IA, content governance, and release.

## Canonical Structure

| Layer | Route | Role |
| --- | --- | --- |
| Home | `/` | First orientation to Paritsea as the source-of-record |
| Lens | `/about` | Authorship, way of seeing, and project boundary |
| Journal | `/journal` | Observations before they become governed instruments |
| Concepts | `/concepts` | Named patterns not yet governed instruments |
| System | `/system` | Structuring layer for Framework, Protocols, and Standards |
| Frameworks | `/system/frameworks` | Hub for versioned canonical frameworks |
| Protocols | `/system/protocols` | Obligations derived from the Framework |
| Standards | `/system/standards` | Verifiable conditions derived from Protocols |
| IP | `/ip` | Use boundaries and public stewardship hub |
| Official Use | `/ip/official-use` | Recorded application, not certification |
| Licensing | `/ip/licensing` | Citation, adaptation, commercial use, and official-status rules |

English is canonical at the root path. Thai pages use `/th` with the same
English slug, for example `/th/system/protocols/stp`.

## Stack

- Astro, server-rendered with `output: "server"`
- EmDash CMS
- Cloudflare Workers, D1, R2, KV, and Cloudflare Images bindings
- Vanilla CSS with project CSS custom properties
- Thai UI rules are governed by `.agents/skills/thai-ux-ui`

## Local Development

```bash
npx emdash dev
npx emdash types
npx emdash seed seed/seed.json --validate
npm run test:smoke
```

The admin UI is available at `http://localhost:4321/_emdash/admin` when the dev
server is running.

When testing with the Cloudflare/Astro dev runtime, content comes from the
Miniflare D1 sqlite database under
`.wrangler/state/v3/d1/miniflare-D1DatabaseObject/`, not necessarily `data.db`.
See `AGENTS.md` before seeding or comparing local content.

## Release Notes

Do not treat a successful HTTP status alone as proof that a content route is
healthy. For Framework, Protocol, and Standard pages, verify the rendered
HTML/title/body and the backing D1 rows.
