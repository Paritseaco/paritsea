# Paritsea responsive redesign — design QA

Date: 2026-07-18
Reference direction: Product Design option 2, revised for the Thai author name and first-person voice
Reference image: `/Users/paritr/.codex/generated_images/019f6663-ab3d-71c2-b2dc-c59fcbf04719/exec-21f0cc13-58f7-404a-99bf-b91e2eb01a5e.png`

## Intended experience

- Separate the authored proposition from the governed intellectual record.
- Make the relationship between Journal, Concept, Framework, Protocol, and Standard visible without turning it into a mandatory funnel.
- Keep the source/application boundary with SE Ocean present but secondary.
- Prioritize reading on detail pages; expose provenance, version, scope, and non-claims on demand.
- Use natural Thai authored voice with `ฉัน` and the correct Thai name `ปาริศ ฤทธิ์ชัย`.

## Visual comparison

The selected reference and the implementation were compared side by side at the same 1487 × 1058 viewport:

`/Users/paritr/.codex/tmp/paritsea-redesign-qa-2026-07-18/home-reference-vs-implementation.png`

The implementation preserves the reference direction: a split authored/relationship field, archive-paper surface, oxide authored interventions, graphite metadata, and blue-green applied context. The production UI keeps a visible search input instead of reducing search to an icon because search is a core utility.

## Responsive verification

| Viewport | Result | Evidence |
|---|---|---|
| 390 × 844 | Passed | no horizontal overflow; Thai body 17px/1.85; mobile navigation; relationship field stacks below the authored opening |
| 768 × 1024 | Passed | no horizontal overflow; single-column opening with preserved hierarchy |
| 1440 × 1100 | Passed | split authored/relationship field; stable 680px detail reading measure |
| 1920 × 1080 | Passed | split layout expands without widening article measure |
| 3840 × 2160 | Passed | content frame remains centered at 1760px; no horizontal overflow |

The Thai route matrix was inspected at 390px and 1440px for Home, About, Journal, Concepts, System, Frameworks, Protocols, Standards, IP, Licensing, Official Use, AgenSea, and Media. All routes rendered a page title, had zero horizontal overflow, and kept Thai headings at normal style with zero/normal letter spacing.

## Interaction and accessibility checks

- Mobile menu opens, exposes the complete navigation, reports localized expanded state, and closes through the existing controls.
- Document provenance uses native `details`/`summary`, is keyboard operable, and preserves a minimum 44px summary target.
- Visible non-inline controls checked on mobile have at least 44px targets.
- Thai UI uses Sarabun, no italics, no tracking, body 17px with 1.85–1.9 line-height, and heading weight 300.
- `prefers-reduced-motion` remains supported globally.
- No browser console warnings or errors were recorded during local route QA.

Measured light-surface contrast ratios:

| Token | Ratio against paper | WCAG AA |
|---|---:|---|
| Ink / authored text | 14.66:1 | Passed |
| Secondary graphite | 7.32:1 | Passed |
| Muted graphite | 4.59:1 | Passed |
| Oxide intervention | 5.83:1 | Passed |
| Applied blue-green | 5.49:1 | Passed |

## P0–P2 issues resolved

- P0: eliminated horizontal overflow across the audited route and viewport matrix.
- P0: corrected the Thai author identity and first-person voice across public authored surfaces.
- P1: replaced the long institutional Home opening with the selected split field direction.
- P1: removed broken empty featured-image frames on detail pages.
- P1: changed document metadata from a large always-open block to an accessible disclosure.
- P1: changed detail pages from a three-column squeeze to a reading-first column with one utility rail.
- P1: removed duplicate applied-context links by URL.
- P2: reduced oversized hub counts, titles, section spacing, and repeated card-like treatment.
- P2: localized the mobile menu state labels.

## Verification chain

- `npm run typecheck` — passed
- `npm run build` — passed (existing Vite large-chunk advisory remains)
- `npm run test:smoke` — passed: 41 canonical routes, 5 redirects, detail metadata, 404, sitemap, and machine-readable registry
- `git diff --check` — passed
- Browser visual/interaction QA — passed

## Final result

**Passed.** No open P0, P1, or P2 visual defects remain in the audited responsive route matrix.
