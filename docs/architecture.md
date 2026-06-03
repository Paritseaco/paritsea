# Paritsea — Site Architecture
**Status:** Production. Locked. Do not restructure without a new IA decision record.
**Last reviewed:** 2026-06

---

## Governing principle

Every page sits at one altitude on the **seeing → structuring → doing** spine. Architecture exists to make that spine visible — not as a reading requirement, but as a felt orientation for anyone who arrives anywhere.

The internal taxonomy keys (`framework_page` values in the CMS) are frozen. Only public URL segments, nav labels, and hierarchy change. This means no content migration is ever required when the presentation layer evolves.

---

## Structure health audit (baseline)

**Assessment at restructure:** 6/10 — correct conceptual parts, wrong expressed relationships. The three thinking layers existed in content but were rendered as five equal-weight nav siblings. No parent grouping. No derivation order. No pipeline visible from the outside.

**Post-restructure target:** 9/10 — spine expressed in URL hierarchy, nav grouping, and breadcrumb altitude.

---

## Page role table

| Page | IS | IS NOT | Status |
|------|----|--------|--------|
| **Home** `/` | Worldview entry point; the lens | A content index; a feed | KEEP (labels only) |
| **Journal** `/journal` | Seeing — observation entries, problems made legible | Governed doctrine; how-to | RENAME (was The Method) |
| **System** `/system` | Structuring — hub for the governed-knowledge layer | A blog; a single document | NEW HUB |
| → **Framework** `/system/framework` | Immutable foundation Protocols/Standards derive from | A changelog; opinion | MOVE + RENAME (was The Doctrine) |
| → **Protocols** `/system/protocols` | Obligations derived from Framework | Thresholds (Standards) | MOVE (was /protocols) |
| → **Standards** `/system/standards` | Measurable thresholds beneath Protocols | Obligations (Protocols) | MOVE (was /standards) |
| **Implementation** `/implementation` | Doing — system applied in real products | Theory; observation | RENAME (was Implementations) |
| **About** `/about` | Origin of the system + founder lens | Portfolio; CV | KEEP |
| **Licensing** `/licensing` | Governance of knowledge use | Content; ToS legalese | KEEP |
| **Contact** `/contact` | Entry point for conversation | Support desk | KEEP |

---

## Structural issues resolved

- **Flat peerage hiding the pipeline** — 5 siblings now become 3 tiers.
- **Doctrine/Protocols/Standards as three peers** — now one System layer with expressed derivation (Framework → Protocol → Standard).
- **Journal/System overlap risk** — fixed by the governing rule: Journal = *not yet governed*; System = *formalized*.
- **System/Implementation confusion** — fixed: System = the rule; Implementation = the rule running in reality.
- **Doctrine altitude orphaned** — Doctrine (แก่น) becomes the Framework tier *inside* System, correctly above Protocol/Standard.
- **No scalability** — `/system` hub absorbs future protocols and standards without nav growth.
- **Licensing ambiguity** — Licensing governs all System artifacts (and Journal); it links *into* System/Framework, no longer floating beside content.

---

## Refined site architecture

```
Home  /
│
├─ Journal  /journal                    ← SEEING
│    └─ /journal/[slug]
│
├─ System  /system                      ← STRUCTURING (hub)
│    ├─ Framework  /system/framework    ← immutable root (framework_page: the-doctrine)
│    ├─ Protocols  /system/protocols    ← obligations (framework_page: protocols)
│    │     └─ /system/protocols/[slug]
│    └─ Standards  /system/standards   ← thresholds (framework_page: standards)
│          └─ /system/standards/[slug]
│
├─ Implementation  /implementation      ← DOING (framework_page: implementations)
│    └─ /implementation/[slug]
│
├─ About  /about
├─ Licensing  /licensing
└─ Contact  /contact
```

**Primary nav:** `Journal · System ▾ · Implementation · About`
System dropdown exposes: Framework / Protocols / Standards
Licensing + Contact: footer only.

---

## Internal taxonomy keys (frozen — do not change)

| Public URL segment | Internal `framework_page` key |
|--------------------|-------------------------------|
| `journal` | `the-method` |
| `system/framework` | `the-doctrine` |
| `system/protocols` | `protocols` |
| `system/standards` | `standards` |
| `implementation` | `implementations` |

---

## URL segment map (`src/utils/public-paths.ts`)

```ts
const FRAMEWORK_PAGE_SEGMENTS = {
  "the-doctrine":    "system/framework",
  "protocols":       "system/protocols",
  "standards":       "system/standards",
  "the-method":      "journal",
  "implementations": "implementation",
}
```

`resolvePostPath` special case: `the-doctrine` returns `/system/framework` (standalone page, no slug child).

---

## SEO redirect table (301, preserve locale + querystring)

| From | To |
|------|----|
| `/the-doctrine` | `/system/framework` |
| `/the-method` | `/journal` |
| `/the-method/*` | `/journal/*` |
| `/protocols` | `/system/protocols` |
| `/protocols/*` | `/system/protocols/*` |
| `/standards` | `/system/standards` |
| `/standards/*` | `/system/standards/*` |
| `/implementations` | `/implementation` |
| `/implementations/*` | `/implementation/*` |

Follow the existing `/en/*` → root 301 pattern in `src/middleware.ts`.

---

## Naming conventions

- Hub pages (Journal / System / Implementation) — **singular**.
- Framework — **singular** (one foundational document).
- Protocols / Standards — **plural** (collections).
- Thai nav labels: แก่น (Framework), โปรโตคอล (Protocols), มาตรฐาน (Standards), **Journal** (Journal — English word retained, same as System and Implementation), การประยุกต์ใช้ or **Implementation** (Implementation — either accepted; default to Thai: การประยุกต์ใช้).
- **Resolved (MD-01):** Journal uses the English word "Journal" in both TH and EN nav. Rationale: the term is part of the system vocabulary, parallel to System/Implementation which are also used untranslated in Thai context. Thai readers see consistent vocabulary across layers.

---

## Homepage protection

**Status: PROTECTED.** Labels only are updated. No worldview sentence, section, or structural flow may change without a new architectural decision record.

Label changes made at restructure:
- `exploreMethod` → "Open the Journal" / "เปิด Journal", link `/the-method` → `/journal`
- `readDoctrine` → "Read the Framework" / "อ่านแก่น" (Thai keeps แก่น), link `/the-doctrine` → `/system/framework`
- `openMethod` / `registry` → "Open the Journal", link → `/journal`
- Closing attr `The Doctrine` → `Framework`
- Hero map links updated to new labels + links

No paragraph, worldview line, or section was rewritten.

---

## Key files

| File | Role |
|------|------|
| `src/utils/public-paths.ts` | URL segment map, `resolvePostPath` |
| `src/middleware.ts` | 301 redirects |
| `src/pages/` | Route files (see architecture tree above) |
| `src/pages/system/` | New nested route directory |
| `src/components/StructuralIndexPage.astro` | Landing component for Protocol/Standard/Journal |
| `src/utils/i18n.ts` | `navLabels`, all copy strings |
| `src/layouts/Base.astro` | Nav render, dropdown, footer nav |
| `seed/seed.json` | Menu structure (taxonomy keys frozen) |
