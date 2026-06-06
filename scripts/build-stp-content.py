#!/usr/bin/env python3
"""Build the cleaned STP Portable Text content for B-03 split."""
import json

blocks = [
    # 1. Version line
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "marks": ["em"], "text": "v1.0 · Foundational · Authored by Parit Ritchai"}]
    },
    # 2. Protocol intro
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "This protocol establishes foundational principles of structural transparency as a constitutional requirement."}]
    },
    # 3. Position statement (from original "If an agency claims strategic capability...")
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "If an agency claims strategic capability, it must be willing to expose the structure that produces its work. If it cannot, the problem is not messaging. It is design."}]
    },
    # 4. Disclosure scope (from original "What is rarely disclosed is...")
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "What is rarely disclosed is: who is actually doing the work, how capacity is distributed, where incentives are misaligned, whether conflicts of interest exist, and who absorbs the risk when outcomes fail."}]
    },
    # 5. Cross-layer link to Journal entry (B-03 traceable precursor)
    {
        "_type": "block", "style": "normal",
        "markDefs": [{"_key": "lnk1", "_type": "link", "href": "/journal/aesthetic-transparency"}],
        "children": [
            {"_type": "span", "text": "The observation that named this gap is in the Journal: "},
            {"_type": "span", "marks": ["lnk1"], "text": "Transparency Is Often Aesthetic. Rarely Structural."}
        ]
    },
    # 6. Five Structural Exposures heading
    {
        "_type": "block", "style": "h2",
        "children": [{"_type": "span", "text": "The Five Structural Exposures"}]
    },
    # 7. Exposures intro
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "This protocol is built on five non-negotiable exposures. If an agency cannot meet these conditions, it is not structurally transparent."}]
    },
    # I. Human Visibility
    {
        "_type": "block", "style": "h3",
        "children": [{"_type": "span", "text": "I. Human Visibility"}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "Clients must know who is doing the work. Not the pitch team. Not the logo slide. Not the senior partner who appears once a quarter. The actual operators."}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "Required disclosure: full team assignment before contract signing, clear role mapping (strategist, executor, reviewer), senior involvement defined in percentage and decision authority, experience level declared without abstraction."}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "If strategy is sold at a senior rate, senior thinking must be structurally present. Anything else is narrative arbitrage."}]
    },
    # II. Capacity Integrity
    {
        "_type": "block", "style": "h3",
        "children": [{"_type": "span", "text": "II. Capacity Integrity"}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "Overbooking is an unspoken norm in agency economics. Clients are rarely told how many accounts a team is handling, whether the team assigned is already operating at capacity, or whether onboarding requires shifting attention from existing clients."}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "Capacity must be disclosed as structure, not promise. If delivery quality depends on hidden overtime, burnout, or reactive staffing, it is not performance. It is deferred instability."}]
    },
    # III. Choice & Representation Rights
    {
        "_type": "block", "style": "h3",
        "children": [{"_type": "span", "text": "III. Choice & Representation Rights"}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "In most agencies, account managers and specialists are assigned. Clients are rarely given a say in who represents them, who interprets their data, or who shapes their strategy. This protocol rejects silent assignment."}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "Selecting a strategic lead should resemble selecting a specialist in a medical context. Assignment by convenience protects the agency. Choice protects the client."}]
    },
    # IV. Conflict & Competitive Boundaries
    {
        "_type": "block", "style": "h3",
        "children": [{"_type": "span", "text": "IV. Conflict & Competitive Boundaries"}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "Agencies frequently operate across competing brands, markets, and verticals. True structural transparency requires disclosure of brand positioning overlap, audience overlap analysis, geo-targeting conflict exposure, and strategic intent conflict declaration."}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "Silence is not neutrality. It is leverage. Clients deserve to know whether their competitive edge is structurally diluted before it is measured."}]
    },
    # V. Power & Responsibility Mapping
    {
        "_type": "block", "style": "h3",
        "children": [{"_type": "span", "text": "V. Power & Responsibility Mapping"}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "This is the exposure most agencies avoid. Who makes the final strategic decision? Who owns KPI definition? Who carries reputational risk? Who absorbs failure?"}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "Performance metrics without power mapping create a predictable outcome: execution absorbs blame, strategy remains insulated. Transparency without accountability is branding."}]
    },
    # Protocol Position (condensed from "The Industry Challenge")
    {
        "_type": "block", "style": "h2",
        "children": [{"_type": "span", "text": "Protocol Position"}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "This protocol is not a certification. It is not a badge. It is not a differentiator for marketing decks. It is a structural position."}]
    },
    {
        "_type": "block", "style": "normal",
        "children": [{"_type": "span", "text": "Any agency that cannot publicly commit to these five exposures must reconsider how it defines transparency. Any agency that can, changes the power relationship between agency and client."}]
    },
]

print(json.dumps(blocks, ensure_ascii=False))
