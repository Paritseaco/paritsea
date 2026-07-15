# Paritsea — Navigation Behavior & Intent-Flow Model
> Historical navigation record. Superseded on 2026-07-15 by `paritsea-information-architecture.md`.
**Status:** Historical / superseded.
**Last reviewed:** 2026-06

---

## Core principle

This is not a website navigation spec.
This is: **designing how human intent moves through a fixed cognitive system.**

Navigation serves the *intent state*, not a persona identity. The same person is exploratory on Monday and a builder on Friday. Four intent states, not four user types.

---

## 1. User intent types

| State | Mental condition on arrival | What they need |
|-------|----------------------------|----------------|
| **Exploratory** | "What *is* this? Does it speak to me?" | Resonance before structure — a feeling, not a map |
| **Analytical** | "How is this *organized*? Is it rigorous?" | See the skeleton — how knowledge is governed |
| **Builder** | "Can I *use* this?" | Application, conditions of use, proof it runs in reality |
| **Returning** | "Take me to the part I came for." | Speed — direct re-entry, no re-onboarding |

---

## 2. Entry point mapping

| State | Primary entry | Natural path | Satisfaction / exit |
|-------|--------------|--------------|---------------------|
| **Exploratory** | Home → Journal | Home → Journal entry → maybe one System bridge if curiosity sharpens | Leaves from Journal or About — resonance achieved |
| **Analytical** | System hub | System → Framework → Protocol → Standard, lateral within layer | Exits a System sub-page having understood the structure |
| **Builder** | Implementation *or* System/Protocol | Implementation → System (rule) → Licensing (conditions) | Exits at Licensing or Contact |
| **Returning** | Direct deep link (any page) | Global nav → target, one hop | Exits from target — no funnel required |

**Guarantee:** every state must be able to *land deep and feel oriented*. Direct entry to Journal, Protocol, Standard, Framework, or Implementation is first-class. No "you skipped a step" experience exists.

---

## 3. Navigation behavior rules

### Global rules

1. **Global nav is the spine, always visible, never changes:** `Journal · System ▾ · Implementation · About`
2. **System dropdown exposes Framework / Protocol / Standard** in one move from anywhere — they are never buried.
3. **Global nav expresses the layer model, not the page count.** Four anchors = three cognitive layers + origin context.
4. **Licensing + Contact live in footer.** Governance and conversation are not browsing destinations.
5. **Depth is pulled, never pushed.** A surface user is never auto-advanced. The next layer is offered; the choice stays theirs.

### Contextual rules

6. **Push deeper only at demonstrated intent.** A Journal entry touching a structured idea may offer *one* contextual link to the relevant Protocol/Standard. One, not a menu.
7. **Push laterally within a layer freely.** Framework ↔ Protocol ↔ Standard cross-links are encouraged — same altitude, low cognitive cost. Related Journal entries: lateral, always safe.
8. **System hub orients before it routes.** `/system` first answers "what is this layer?" then presents three sub-pages as deliberate choices — no forced reading order.

### Forbidden behaviors

- ✗ Never collapse System into one undifferentiated link. Sub-pages remain individually addressable in nav.
- ✗ Never make cross-layer movement mandatory (no "continue to Implementation →" stepper).
- ✗ Never suggest navigation on a focus page (Framework, a Standard entry) where intent is to *read*.
- ✗ Never reorder or hide global nav by intent state — the spine is stable for everyone.
- ✗ Never route unexplored users to Licensing unprompted.

---

## 4. Cross-layer flow map

```
        ┌──────────── About ─────────────┐   (context injection → any layer, one-way)
        ▼          ▼             ▼        ▼
   ┌─────────┐  ┌────────┐  ┌──────────────┐
   │ Journal │⇄ │ System │⇄ │Implementation│
   │ seeing  │  │structur│  │    doing     │
   └─────────┘  └────────┘  └──────────────┘
                    │
                    ├─ Framework (foundation, internal anchor)
                    ├─ Protocol  ──┐ lateral within System
                    └─ Standard  ──┘
                    │
                    └──→ Licensing (governance reference, terminal)
```

### Permitted intent-based transitions (all optional)

| From | To | When |
|------|----|------|
| Journal | System | Observation hardens into a structured idea |
| System | Implementation | A rule becomes applicable |
| Implementation | System | Applied experience needs the rule behind it |
| System | Journal | Abstraction needs grounding in lived observation |
| About | Any layer | Context injection — one-way only |
| Any System sub-page | Licensing | When use-conditions become relevant |

### Not modeled

**Journal → Implementation (direct)** is not a permitted shortcut. Seeing→doing routes through structuring. If a Journal entry implies application, it bridges via System. This preserves the pipeline integrity without forcing a sequence.

---

## 5. Page entry logic

| Page | When to enter | When not to enter | Intent match |
|------|--------------|-------------------|--------------|
| **Home** | First contact; need the worldview lens | Returning user with a known target | Exploratory |
| **Journal** | Want to *see* — observations, patterns made legible | Looking for rules, thresholds, how-to | Exploratory, Returning |
| **System** (hub) | Want to understand how knowledge is structured before choosing a sub-page | Already know target (go direct to Protocol/Standard/Framework) | Analytical |
| **→ Framework** | Need the immutable foundational basis | Want a specific obligation or threshold | Analytical, Builder |
| **→ Protocol** | Need the *obligation* — what must hold | Want measurable cutoffs (Standard) or philosophy (Framework) | Analytical, Builder |
| **→ Standard** | Need the *threshold* — how a claim is measured | Want the obligation's intent (Protocol) | Analytical, Builder |
| **Implementation** | Want to *do* — system applied in reality | Want theory first | Builder |
| **About** | Want origin / who / why | Want content or application | Any (on demand) |
| **Licensing** | Need permission boundaries / IP / commercial conditions | Still exploring — do not route here unprompted | Builder |
| **Contact** | Ready for a real conversation or request | Still exploring — premature | Builder, Returning |

**Direct-entry guarantee** applies to every row including all three System sub-pages. No page assumes a predecessor was visited.

---

## 6. Navigation structure

### Global nav
```
Journal  |  System ▾  |  Implementation  |  About  ||  [TH / EN]
                │
                ├── Framework
                ├── Protocols
                └── Standards
```

### Contextual nav patterns

**Inside a Journal Post:**
- End-of-article: lateral (2 related Journal entries) before vertical (1 optional System bridge)
- No nav during body — reading is uninterrupted

**Inside System sub-pages:**
- Breadcrumb: `System / [sub-page]` — altitude marker always visible
- Lateral links within System: Framework ↔ Protocol ↔ Standard
- No nav during body of Framework/Standard documents

**Inside Implementation:**
- After content: "The rule behind this →" (back to System/Protocol)

---

## Cognitive Navigation Model

User progression in Paritsea follows a structured cognitive path:

### Stage 1: Entry
User encounters surface vocabulary
→ immediate comprehension

### Stage 2: Transition
User is introduced to reframing language
→ subtle cognitive shift

### Stage 3: Core
User is exposed to structural ontology
→ reconstruction of thought model

---

### Navigation Principle

Navigation is not movement between pages.

It is movement between cognitive layers.

---

### Breadcrumb rules

Breadcrumbs appear **only inside System** (`System / Framework`, `System / Protocols`, `System / Standards`) — **required, not optional** on all three sub-pages. Journal, Implementation, and supporting pages need none — they are flat, single-level, and the global nav anchor already names the current location.

### System dropdown active-state rules (MD-03 resolved)

1. The **System nav anchor** is highlighted (active class) whenever the current URL begins with `/system` — including `/system`, `/system/framework`, `/system/protocols`, `/system/protocols/[slug]`, `/system/standards`, `/system/standards/[slug]`.
2. The **matching dropdown child item** (Framework / Protocols / Standards) is also highlighted when its segment is active. Both the parent anchor and the child item are active simultaneously — this is intentional and correct, not a double-highlight bug.
3. Implementation note: replace the existing `nav-doctrine` CSS class with `nav-framework`. Rename happens in **Phase 2**, not Phase 5.

### System dropdown mobile behavior (MD-04 resolved)

On viewports ≤ 960px (hamburger breakpoint):
- The System anchor renders as a top-level item inside the hamburger menu.
- Tapping System **expands inline** (accordion pattern — no new overlay or slide-over panel).
- The three children (Framework / Protocols / Standards) appear indented beneath System.
- Tapping a child navigates and closes the menu.
- This is consistent with the existing hamburger open/close pattern — no new component is needed.

### Internal linking budget per page

| Page | Lateral (same layer) | Vertical (different layer) |
|------|---------------------|---------------------------|
| Journal Post | 2 related entries | Max 1 (to System) |
| Framework | 1–2 (to Protocol/Standard below) | 1 (to Licensing) |
| Protocol | 1–2 (to Standard / Framework) | 1 (to Licensing or Implementation) |
| Standard | 1 (to parent Protocol) | 1 (to Licensing) |
| Implementation entry | 1–2 related | 1 (to System/Protocol) + 1 (to Licensing/Contact) |
| System hub | 3 (Framework / Protocol / Standard) | 1 (to Journal for grounding) |

---

## 7. Final navigation model summary

**Paritsea navigates by intent state, not hierarchy traversal.**

A stable 4-anchor spine makes the three cognitive layers permanently visible. System's dropdown keeps Framework/Protocol/Standard first-class and one hop away from anywhere.

Depth is always pulled, never pushed. Surface users rest in Journal; the next layer is offered at moments of demonstrated curiosity, never forced.

Lateral movement is free. Vertical movement is invited. Between layers: one intent-matched bridge.

Cross-layer flow is optional and non-sequential — any page is a valid entry — but seeing→doing routes *through* structuring to protect the model's integrity.

A reader never feels lost in abstraction because the spine always names where thought currently sits — and never feels herded, because every deeper move is an open door, not a corridor.
