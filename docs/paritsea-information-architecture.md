# Paritsea Information Architecture

Status: Canonical

## Navigation

Primary navigation follows the visitor's reason for arriving rather than the internal production pipeline:

- Journal / บันทึก — observations and questions still in motion
- Concepts / แนวคิด — named patterns that can be referenced
- Reference work / งานอ้างอิง — Frameworks, Protocols, and Standards
- About / เกี่ยวกับ — author, source, boundary, and change authority
- Use and citation / การใช้และอ้างอิง — permissions, limits, and Official Use

Search, locale, and theme are utilities. Media and Contact are footer destinations. The term `System` remains the stable route namespace for reference work, but it is not the public navigation label because it describes the site's internal model more than the reader's intent.

## Visitor intents

| Visitor need | Primary entry |
| --- | --- |
| I can see something but cannot name it yet | Journal |
| I need a stable name for a recurring pattern | Concepts |
| I need the versioned source, method, or threshold | Reference work |
| I need to know who is speaking and who can change the source | About |
| I need to cite, adapt, teach, or verify an applied use | Use and citation |

## Page roles

| Route | Role |
| --- | --- |
| `/` | Orientation and entry point |
| `/about` | Lens, authorship, and boundary |
| `/author/parit-ritchai` | Bibliographic author record |
| `/journal` | Observation archive |
| `/journal/[slug]` | Journal full entry |
| `/concepts` | Concept-record archive; relationship discovery only |
| `/concepts/[slug]` | Named concept record |
| `/system` | Reference-work hub and provenance map |
| `/system/frameworks` | Framework hub |
| `/system/frameworks/[slug]` | Framework full document |
| `/system/protocols` | Protocol hub |
| `/system/protocols/[slug]` | Protocol full document |
| `/system/standards` | Standard hub |
| `/system/standards/[slug]` | Standard full document |
| `/ip` | IP hub |
| `/ip/licensing` | Use-boundary document |
| `/ip/official-use` | Official-use registry |
| `/ip/official-use/[slug]` | Official-use record |
| `/media` | Channel archive |
| `/contact` | Correspondence utility |

## Intellectual path

Journal observation → Concept → Framework → Protocol → Standard

This is a relationship graph, not a mandatory funnel. A work may stop at any stage. Field evidence can connect to any stage. Commercial application is a contextual reference, not the final stage of every idea.

## Page-role contract

Every hub states that it is an archive or hub and does not render full documents. Every full document exposes breadcrumb, content type, author, intellectual stage, lifecycle status, version, provenance, scope, non-claims, relationships, and applied context when reviewed evidence exists.

## Redirect contract

- `/system/framework` → `/system/frameworks/paritsea-framework`
- `/licensing` → `/ip/licensing`
- `/implementation` and `/implementations` → `/ip/official-use`
- legacy AgenSea routes → `/ip/official-use/agensea`
- `/en/*` → the English root canonical route

Redirects are one-hop permanent redirects and are excluded from sitemap output.
