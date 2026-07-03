# Paritsea

Paritsea is the public source of record for the Paritsea thinking system: its
Framework, Protocols, Standards, Journal observations, implementation records,
and use/licensing boundaries.

This is not a monetized service website. Commercial service expression belongs
to SE Ocean; Paritsea holds the original reference layer and the public IP
context that others can cite, study, adapt, license, or translate into practice
under the published use policy.

## Canonical Structure

| Layer | Route | Role |
| --- | --- | --- |
| Home | `/` | First orientation to Paritsea as the source-of-record |
| Journal | `/journal` | Observations before they become governed instruments |
| System | `/system` | Structuring layer for Framework, Protocols, and Standards |
| Framework | `/system/framework` | Immutable root reference |
| Protocols | `/system/protocols` | Obligations derived from the Framework |
| Standards | `/system/standards` | Verifiable conditions derived from Protocols |
| Implementation | `/implementation` | Documented applied systems |
| Licensing | `/licensing` | Citation, adaptation, commercial use, and official-status rules |

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
