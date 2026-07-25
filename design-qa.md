# Paritsea Home — design QA

Date: 2026-07-22

Scope: Thai/English Home, shared primary navigation, author presentation, and responsive behavior

Reference direction: Product Design option 2, revised after the content-boundary discussion

Reference image: `/Users/paritr/.codex/generated_images/019f6663-ab3d-71c2-b2dc-c59fcbf04719/exec-435c1a58-46a0-4e4a-8c36-8dd9b72c2da4.png`

## Intended first read

The Home page must answer, in order:

1. What Paritsea is.
2. What a visitor can read, study, or apply.
3. When attribution, review, or commercial permission becomes relevant.
4. Who writes and stewards the source work.
5. Why YouTube and SE Ocean are separate channels with different jobs.

The author portrait is used as evidence of authorship and stewardship. It is deliberately below the work and permission sections so Paritsea does not become a personal portfolio.

## Visual comparison

The reference and the final 1440 × 1100 Thai implementation were compared in one side-by-side image:

`.codex-qa/home-target-vs-implementation.jpg`

The implementation keeps the warm archive surface, strong editorial opening, physical intellectual-work volumes, oxide intervention color, and clear vertical reading path. Intentional changes from the reference are:

- a problem-led headline reflecting the user's revised language direction;
- numbered entry paths instead of decorative icons;
- explicit permission levels and commercial-use boundary;
- the supplied portrait of ปาริศ ฤทธิ์ชัย in a dedicated author section;
- a direct channel boundary for YouTube and SE Ocean.

## Responsive verification

| Viewport | Result | Evidence |
|---|---|---|
| 390 × 844 | Passed | Single-column hero, 44px menu controls, full-width primary action, no horizontal overflow |
| 768 × 900 | Passed | Stacked hero, readable Thai line length, image preserved below copy, no horizontal overflow |
| 1440 × 1100 | Passed | Clear two-column hero and visible transition into the next section |
| 1920 × 1200 | Passed | Hero, primary action, use note, and work image all remain in the first viewport |
| 3840 × 2160 | Passed | Content frame remains centered at 1760px; reading measure does not widen; no horizontal overflow |

Thai computed styles at each breakpoint use Sarabun, normal font style, and zero/normal letter spacing. The 768px state also represents the reflow pressure of a 1440px display at approximately 200% zoom.

## Interaction and accessibility checks

- Mobile navigation opens and closes through the localized controls and locks background scrolling while open.
- Mobile links and controls expose at least 44px targets.
- Home has one visible H1 and a logical sequence of H2 section headings.
- The skip link, semantic header/main/footer landmarks, light/dark/system theme controls, and language switch remain intact.
- The author portrait and intellectual-work image have meaningful localized alt text.
- The Thai H1 exposes spaces between visual line groups to assist screen-reader phrasing.
- No horizontal overflow was measured at the five required viewports.

## P0–P2 issues resolved

- P0: removed React icon rendering from the Astro page after browser QA exposed an SSR `useContext` crash that typecheck did not detect.
- P1: replaced the process-heavy Home narrative with a direct explanation of Paritsea, applicable work, and use rights.
- P1: made the commercial-permission boundary visible without turning the page into a service or pricing funnel.
- P1: rebalanced the 1920px/4K hero so the primary action remains visible and headline line-height stays controlled.
- P1: integrated the supplied portrait without presenting Paritsea as a personal portfolio.
- P2: simplified navigation labels around visitor intent and removed generic decorative iconography.
- P2: preserved natural Thai typography, correct author name, and first-person `ฉัน` voice.

## Verification chain

- `npm run typecheck` — passed, 0 errors/warnings/hints
- `npm run build` — passed; existing Vite large-chunk advisory remains
- `npm run test:smoke` — passed: 41 canonical routes, 5 redirects, detail metadata, 404, sitemap, and machine-readable registry
- Browser visual and interaction QA — passed for Thai and English Home
- Reference/implementation side-by-side review — passed

## Final result

**Passed.** No open P0, P1, or P2 visual defects remain in the implemented Home and shared navigation scope.
