# Paritsea Content and IP Governance

Status: Canonical

## Content types

- Journal: a signed observation, interpretation, or proposition. It may remain unresolved.
- Concept: a named pattern stable enough to reference but not yet a governed instrument.
- Framework: a formal model that organises related concepts and constraints.
- Protocol: a governed obligation derived from a Framework.
- Standard: a threshold used to evaluate whether a Protocol holds.
- Official Use: a public record of a named implementation. It is not proof of universal validity or certification.
- Applied Context: reviewed external evidence or application linked to its canonical source.

## Required metadata

Each intellectual work records content type, intellectual stage, lifecycle status, version, author, provenance summary, scope, non-claims, evidence note, and last-reviewed date. Relationships are first-class records rather than prose-only links.

## Locale and editorial workflow

English and Thai are distinct EmDash entries linked by `translationOf` and a
shared translation group. They use the same English slug; English is served at
the root route and Thai under `/th`.

The author may create and write either locale manually. The optional Translation
Assistant may translate from EN to TH or TH to EN, but it creates a draft only.
It never publishes, replaces an existing locale, or changes synchronized
governance fields. The author must review phrasing, especially Thai reading
rhythm and conceptual terms, before publication.

Translatable fields are title, excerpt, body, provenance summary, scope note,
non-claims, and evidence note. Content type, stage, lifecycle status, version,
review date, byline, topics, URLs, YouTube URL, and canonical identity remain
synchronized unless governance explicitly requires a locale-specific value.

`content_type` is the routing and archive source of truth. `framework_page` is a
legacy compatibility field for existing records and is not required for new
work. Topic taxonomy describes subject matter; it must never double as document
type, lifecycle status, or route selection.

## Lifecycle

`exploring → developing → current → superseded → retired`

Publication state and intellectual status are different. A published Journal entry may remain exploring. A superseded Standard remains publicly available with a clear successor link.

## Revisions

Semantic changes require a new version and revision note. Corrections that do not change meaning may update the current version but must retain revision history in EmDash. Canonical content is never silently rewritten to make earlier reasoning appear more certain.

## Applied evidence

Evidence from SE Ocean or another practice enters Paritsea only after confidentiality, attribution, and disclosure review. The public record links to the application; it does not reproduce client information or commercial claims. Applied evidence does not automatically change canonical work.

## Rights language

Parit Ritchai is identified as author/originator and Paritsea as public steward/publisher. A legal rights holder is named only when documented. Reuse terms are governed by the canonical licensing page and version-specific notices.
