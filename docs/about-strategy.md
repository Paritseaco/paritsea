# Paritsea — About Page Strategy
**Phase:** Phase 2 — About Strategy
**Status:** ✅ Complete
**Source material:** `docs/founder-interview.md` (Phase 1, Session 1, Q1–Q8 + supplementary)
**Governs:** Phase 3 — About Rewrite (requires author approval of this document before copy writing begins)

> This document is the content outline. It is not copy. Phase 3 writes the actual words.
> Nothing in this document should appear verbatim on the page — it is strategy, not copy.

---

## Page Role (Locked)

**Answers:** "Where does this lens come from, and who holds it?"

**Does NOT answer:**
- What Paritsea contains
- How to license it
- What gap Paritsea identifies (that is Journal and Home altitude)
- What Paritsea does for you (that is Implementation altitude)

**Authority:** `docs/language-system.md §ABOUT` — altitude: Personal-contextual. The human behind the system.

---

## The Core Problem with the Current Page

The current About page (`src/pages/[page_slug].astro`, `aboutContent` object, lines 45–107) answers the wrong question throughout:

| Current element | What it answers | What it should answer |
|---|---|---|
| Hero headline: "What lies beneath the surface / usually explains everything we don't understand. / Paritsea reads that layer." | What Paritsea does | Where this lens came from |
| Hero body: "Not a perspective built from theory. But from observing people in real situations..." | How Paritsea is different | Who experienced what, and why |
| Bio: "I draw on perspectives across multiple dimensions — psychology, systems, organizations..." | What qualifications the author has | What formed the author |
| "What often goes unseen" section | What gap Paritsea identifies | — (wrong altitude for About) |
| "How Paritsea reads" section | What Paritsea does | — (wrong altitude for About) |

The origin narrative — the reset, the months of grief, the crystallization, the Synergy Architect experience, the ice moment — is entirely absent from the current page. The page describes the output without touching the source.

---

## Proposed Section Structure

```
Eyebrow (keep)
    │
Hero — rewrite
    │
Founder (origin narrative) — full replacement
    │
Why systems and humans together — new section
    │
What this sees — new section, replaces "What often goes unseen"
    │
Open to use — keep structure, refine copy
    │
CTA: "Start where Paritsea starts" → Framework + Journal (keep)
```

---

## Section 0 — Eyebrow

**EN:** "Where this lens comes from"
**TH:** "สายตานี้มาจากไหน"

**Action:** Keep as-is. Correct altitude and correct framing already.

---

## Section 1 — Hero

**Function:** Orient the reader immediately to origin, not capabilities. The first impression of the About page must be: *this page is about a person and where they stood when this formed* — not about what the system delivers.

### Copy direction

**Opening move:**
- First person from the first word. Not "Paritsea reads X." Not "What lies beneath the surface."
- The opening gesture: this lens was formed from a specific kind of experience — going through something that forced the surface reading to fail, and learning to see underneath.
- The formation is not named in full detail here (that's Section 2). The opening only establishes the register: *personal, grounded, from a specific location in lived experience.*
- EN register: spare. No metaphor-stacking. One image if any.
- TH register: ไม่ยกตัวเอง ไม่ขาย — เล่า ไม่อธิบาย

**What the hero body should do (currently missing):**
- Name that the lens is the result of a specific formation — not theory, not study, not a method adopted from elsewhere
- Signal: the person writing this went through something that made the surface-level reading impossible to trust
- NOT a summary of what Paritsea is or does
- NOT a capability statement — avoid "I see X" or "Paritsea reads X"

**Key source material:** Q5 raw answer — "ตัวตนของผู้สร้างที่ผ่านไฟมาจริง ผ่านความเจ็บ ความสูญเสีย ผ่านประสบการณ์ทั้งดีและร้ายมาจนตกผลึกเป็นมุมมองที่เห็นหลากมิติ" — The creator went through the fire. Through pain and loss. Both good and bad. Crystallized into multi-dimensional sight.

**Pitch of the EN hero headline:**
- Currently: "What lies beneath the surface / usually explains everything we don't understand. / Paritsea reads that layer."
- Needed: A line or two that signals this page is about *where the seeing came from* — not *what the seeing does*
- Direction (not copy): Something in the register of "I didn't learn to see this way. Something happened that made not-seeing impossible."

**Pitch of the TH hero:**
- Same altitude as EN. Personal. Not promotional.
- Avoid the formal register of "Paritsea คือ..." — that belongs on Home.
- ยิ่งเล่าน้อยในส่วนนี้ยิ่งดี ให้ Section 2 ทำงานหนัก

---

## Section 2 — Founder (Origin Narrative)

**Function:** Answer fully: "Who holds this lens, and where did they stand when it formed?"

**Current problem:** The bio block is a credentials list — "I draw on perspectives across multiple dimensions — psychology, systems, organizations, and human relationships — to read situations with depth and precision." This violates `language-system.md §ABOUT`: "Does not belong: Credentials list." It also answers the wrong question: it describes what the author can do, not what formed them.

### Copy direction

**Structure of the narrative (not the copy — the arc):**

1. **The peak — and the reset.** The author reached a point of external recognition that most people would call success. Then everything required a complete restart — not one rupture, but three at once: relationship, work, city. The specifics are not named (no company name, no personal details). Only the structural experience: carried everything alone while the structure held and then didn't.

2. **The months.** The reset led to months of grief. During those months — not passive — a certain kind of clarity emerged. The surface readings that had governed every decision (this partner is "good enough," this structure is "manageable") turned out to be wrong. Not the surface readings of others — the author's own. This is the formation moment: discovering that the surface lies, and that staying with that uncomfortable truth is what produces the clearer sight.

3. **The ice moment** (Q3). Do not name this as "the ice moment." Use the structural experience: the junior who simply noticed — without being asked, without a relationship built around performance — and the realization that being seen is not complicated, and that the relationship that professed to love had never provided it. This is the origin of the attention to what usually goes unnoticed.

4. **The Synergy Architect experience** (Q1). Do not name the company. Use only the structural experience: walked into an organization and found people who had been made invisible by the system they were working inside. The system couldn't see them. The author could. Named what the system couldn't name about itself. Placed the truth. Left.

5. **What all of this produced.** The crystallization. Not wisdom from study — sight from having been through something that forced the surface reading to fail repeatedly. From both sides: having been the one not seen; having been the one who named what others couldn't name.

**What this section does NOT include:**
- Credentials: no "I have worked with X" or "I draw on disciplines Y, Z"
- Service descriptions: no "I can help you with"
- Psychological framing: no "trauma," no "healing journey," no "breakdown/breakthrough" arc language
- Motivation language: no "this is why I do what I do"
- Names, company names, relationship details, locations beyond what is structurally necessary

**What stays:**
- The name ("Parit Ritchai" as header — keep)
- "Creator of Paritsea" or similar title — keep as anchor
- Photo — keep
- LinkedIn link — keep

**EN register:**
- First person throughout
- Direct, spare, no motivational warmth
- Observational — the author is describing what happened, not why the reader should care
- Sentence rhythm: short. Not literary complexity. Not consultant-speak.
- Allowed tone anchor: the same quality as the ice moment — noticing without announcing

**TH register:**
- เล่า ไม่ขาย ไม่โฆษณาตัวเอง
- ภาษาพูดเล็กน้อย — ไม่เป็นทางการเกินไป แต่ไม่ตลก
- ไม่ใช้ภาษา self-help ไทย: "ผ่านมรสุมชีวิต", "ลุกขึ้นยืนใหม่", "เปลี่ยนชีวิต"
- ไม่ใช้ภาษาธุรกิจ: "ผู้เชี่ยวชาญด้าน", "ประสบการณ์กว่า X ปี"
- ใช้: สายตา, ตกผลึก, บาดแผล (ที่ไม่เคยถูกยอมรับว่ามีอยู่), มองทะลุโครงสร้าง

**Key material references from interview:**
- Q2 raw: "ใช้เวลาหลายเดือนที่จะเสียใจ และแปลงความเจ็บนั้นเป็นการตกผลึกออกมาเป็นความจริง และมองทุกอย่างอย่างตรงไปตรงมา มองทะลุโครงสร้าง และกลายมาเป็นตัวตนฉันวันนี้"
- Q3 raw: "ฉันได้เริ่มมองมนุษย์อย่างตรงไปตรงมาครั้งแรกเริ่มจากจุดนั้น"
- Q3 raw: "มนุษย์หลายคนดูมีชีวิตที่ดี แต่ภายในจิตวิญญาณเหี่ยวแห้งหรือเต็มไปด้วยบาดแผลที่ไม่เคยถูกเยียวยา จุดเริ่มต้นคือมันไม่เคยถูกยอมรับว่ามีอยู่จริง"
- Q1 raw: "ฉันบอกว่า สถานการณ์ปัจจุบัน พวกเขาต้องแก้ระดับโครงสร้าง"
- Q5 raw: "ตัวตนของผู้สร้างที่ผ่านไฟมาจริง ผ่านความเจ็บ ความสูญเสีย"
- Extracted Theme 2: "The personal IS the organizational lens — the exact pattern diagnosed in the Synergy Architect organization was lived personally first."
- Extracted Theme 5: "Grief as crystallization — the months of pain were not passive. They were converted into clear sight."
- Extracted Theme 9: "'It was never acknowledged to exist' — the root wound of Paritsea's purpose."
- Extracted Theme 10: "The ice moment as origin of the seeing-humans principle."

---

## Section 3 — Why Systems and People Together

**Function:** Answer the inseparability principle in personal, concrete terms. Not abstract philosophy — a lived discovery.

**Current state:** This section does not exist in the current page. The bio moves from credentials directly to the "What often goes unseen" section, skipping this entirely.

### Copy direction

**The key insight to communicate (not the copy):**

The author did not decide that systems and humans should be analyzed together. They discovered that you cannot see either one clearly without the other. This is a finding, not a principle.

The family system story (Q6) is the clearest evidence: the same structure that silenced children also protected the inheritance from parents who would have burned it. If you "fix" the structure (end the veto culture), you might also dismantle the protection. You cannot evaluate structure by one dimension. You cannot see the structure without seeing the human (the grandmother's fear AND love) driving it. You cannot see the human without understanding the structural load they carry.

The corollary: sometimes neither the human nor the structure needs fixing. Sometimes the only thing needed is to see it fully — both dimensions at once.

**What this section does NOT say:**
- Abstract: "systems and humans are interconnected"
- Framework vocabulary: "structural blindness," "altitude," "multi-dimensional"
- Solution language: "this is why I analyze both"
- The word "analyze"

**Structure (not copy):**
- 1–2 paragraphs
- Personal and observational — the author is describing what they found, not establishing a principle
- Can flow naturally out of Section 2 as the "what this taught me" beat, or stand as a distinct section with its own header
- If distinct header: do not announce "systems and humans" in the header — that's too conceptual. Something simpler: "What I kept finding" or similar

**EN register:**
- Observational. The author is a witness to their own discovery.
- Plain vocabulary — no system architecture language
- "What I found" / "What became clear" > "What I believe" / "What Paritsea holds"

**TH register:**
- Same — เล่าให้ฟัง ไม่ใช่สอน
- "สิ่งที่ฉันพบ" / "มันชัดขึ้นเรื่อยๆ" มากกว่า "Paritsea เชื่อว่า"

**Key material references:**
- Q6 analysis: "The family structure (veto culture, children silenced) appears 'wrong' at first reading. But the same structure that silenced also protected."
- Q6 analysis: "You cannot evaluate structure by one dimension. You cannot see the structure without seeing the human driving it. You cannot see the human without understanding the structural load they're carrying."
- Q6 raw: "ฉันมองว่าในโครงสร้างที่ไม่ถูกต้องเลย กลับเป็นโครงสร้างที่เคยปกป้องบางอย่างไว้ให้ฉันเหมือนกัน"
- Q6 raw: "ฉันรักและยอมรับได้โดยไม่ต้องเปลี่ยนนิสัยคนหรือเปลี่ยนโครงสร้างใด ๆ"
- Q4 analysis: "You can't fix the structure without addressing the humans. You can't address the humans without understanding the structure they're trapped in. They are the same problem."
- Extracted Theme 16: "Acceptance without agenda as Paritsea's philosophical position"
- Extracted Theme 15: "Structure holds shadow and light simultaneously"

---

## Section 4 — What This Sees

**Function:** Name briefly what the lens makes visible — in first-person observational terms, not as a capability claim.

**Current problem:** The "What often goes unseen" section uses rhetorical questions ("Have you ever felt that no matter how hard you work...") and identifies gaps at Home/Journal altitude. That content is not wrong — it belongs in the Journal and on Home, not on About.

### Copy direction

**The single thing to communicate:**

The lens was formed from a specific kind of noticing. What the author kept finding — in the organizational experience, in the personal experience, across multiple contexts — was the same pattern: the thing that was actually driving the situation was invisible to the people inside it. Not hidden maliciously. Simply never acknowledged to exist.

This is the one beat this section needs. Not a list of what Paritsea covers. Not rhetorical questions about the reader's life. One observation from first-person experience: *this is what I kept finding.*

**What this section does NOT do:**
- List capabilities
- Make claims about what Paritsea can do for the reader
- Use rhetorical questions
- Frame the reader's problem ("Have you ever...")
- Promise outcomes

**Structure:** 1 short paragraph. Could be the shortest section on the page. Its brevity is appropriate — the observation is simple. The simplicity is the point.

**EN register:**
- "What I kept finding was..." > "Paritsea addresses..."
- Declarative. Not rhetorical.

**TH register:**
- "สิ่งที่ฉันพบซ้ำๆ" — personal, observational
- ไม่ถามคำถามผู้อ่าน

**Key material references:**
- Q3 raw (final sentence): "มนุษย์หลายคนดูมีชีวิตที่ดี แต่ภายในจิตวิญญาณเหี่ยวแห้งหรือเต็มไปด้วยบาดแผลที่ไม่เคยถูกเยียวยา จุดเริ่มต้นคือมันไม่เคยถูกยอมรับว่ามีอยู่จริง"
- Q4 analysis: "Humans invisible in systems — the system couldn't see the humans inside it"
- Q8 analysis — the mechanism: "presence as evidence that the wall the person believed was there — wasn't"
- Extracted Theme 9: "'It was never acknowledged to exist' — the root wound of Paritsea's purpose."
- Extracted Theme 24: "Presence as evidence — the core conversational mechanism"

---

## Section 5 — Open to Use

**Function:** Note that the ideas are freely available. Non-promotional. Brief.

**Current state:** The existing "Open to use" section is directionally correct. It says Paritsea content is "open for everyone to read, reference, and apply." The structure should stay. The copy needs minor altitude adjustment.

### Copy direction

**The altitude problem with current copy:**
The current version sounds like a permission grant or a license notice ("licensed under..."). That belongs at `/licensing`, not on About. On About, the note should be contextual — *why* the ideas are open, not *how* to use them.

**What to say:**
- The ideas exist to be used. Not as a product. Not behind a gate.
- The reason they're open (without over-explaining): to stay honest. To prevent capture.
- For the specifics of what is and isn't permitted: the licensing page handles that.
- One to two sentences. Possibly shorter than the current version.

**What NOT to say:**
- The license terms (belongs at `/licensing`)
- "CC BY-NC 4.0" as the main message — this can appear as a secondary note or link
- Permission framing: "you are allowed to..." — that's `/licensing` altitude

**Key material reference:**
- Q5 raw: "Paritsea เปิดให้ใช้แนวคิดในรูปแบบ NC BY-CC 4.0 ไม่ Monetize โดยตรง เพื่อปกป้องแนวคิดจากผลประโยชน์ทับท้อน ให้ความจริงยังเป็นความจริงอยู่อย่างนั้น"

**EN register:** plain, one beat, links to `/licensing`
**TH register:** เรียบ ไม่ยิ่งใหญ่ — "แนวคิดเหล่านี้มีไว้เพื่อใช้" ก็พอ

**Link:** Keep the link to `/licensing`.

---

## CTA — Start Where Paritsea Starts

**Keep as-is.** Structure correct: "Start where Paritsea starts" → links to Framework + Journal.

Copy may be minimally refined in Phase 3 if needed, but the function and structure are correct.

---

## Language Rules Summary (from `docs/language-system.md §ABOUT`)

| Rule | Detail |
|---|---|
| **What belongs** | Origin of the system; founder perspective; multi-dimensional lens; open-to-use note |
| **What does NOT belong** | Credentials list; résumé format; service offering; "I have worked with X clients" |
| **Altitude** | Personal-contextual — the human behind the system |
| **First person** | In About ONLY — not Journal (analytical), not Framework (authoritative) |
| **Answers** | "Where does this lens come from, and who holds it?" |
| **Must NOT answer** | "What does the system contain?" or "How do I license it?" |
| **Banned registers** | Therapy language, consultant register, motivational language, guru register |

### Approved vocabulary

| EN | TH | Notes |
|---|---|---|
| lens | สายตา, มุมมอง | Use in About + Home |
| sees / seeing | มองเห็น, เห็น | Use in About + Journal |
| wound | บาดแผล | Use in About + Journal |
| names / naming | ตั้งชื่อ, ถูกตั้งชื่อ | Use in About + Journal |
| crystallized | ตกผลึก | Specific to founder formation narrative |
| understand | เข้าใจ | Not as a journey or destination |

### Banned vocabulary for About

| Banned | Why |
|---|---|
| "I have worked with..." | Credentials register |
| "My approach is..." | Service-offering register |
| "Paritsea helps you..." | Product-pitch register |
| "journey," "transformation," "healing" | Therapy/motivational register |
| "ประสบการณ์กว่า X ปี" | Credentials/résumé format |
| "ผ่านมรสุมชีวิต", "ลุกขึ้นยืนใหม่" | Motivational Thai clichés |

---

## Exit Criteria Check (Phase 2)

From `docs/rewrite-plan.md §Phase 2`:

1. **Origin — what happened that created the beneath-the-surface habit**
   ✅ Covered in Section 1 (Hero) and Section 2 (Founder). The reset, the months, the ice moment, the Synergy Architect experience. All directed.

2. **The lens — who holds it and from where they have stood**
   ✅ Covered in Section 2 (Founder). First person, specific structural experience, no credential framing.

3. **Why systems and people are inseparable in the author's experience**
   ✅ Covered in Section 3 (Why systems and humans together). Personal, discovery-framed, non-abstract.

4. **Outline passes `language-system.md §ABOUT` altitude check (personal, first-person, non-promotional)**
   ✅ Checked section by section above. All sections directed at personal-contextual altitude. No promotional register. No credentials. First person throughout Sections 1–4.

**Phase 2 status: all four exit criteria met.**

---

## What Phase 3 Must Do

Phase 3 writes the actual copy. Before Phase 3 begins, **author approval of this outline is required** (per `docs/rewrite-plan.md §Phase 3`).

Phase 3 takes each section above and writes:
- EN copy (final, ready for page)
- TH copy (same altitude, may use different phrasing — never different meaning)

Phase 3 must also pass the `docs/language-system.md §10` rewrite evaluation checklist.

**Affected file:** `src/pages/[page_slug].astro` — the `aboutContent` object (lines 45–107). The About page is not in D1; it is hardcoded. Phase 3 edits the hardcoded object directly.

*Future work (not Phase 3):* Moving the About page content to D1 so it is CMS-managed. This is a separate architectural task beyond the editorial scope of Phases 1–3.

---

*Created 2026-06-09. Derived from `docs/founder-interview.md` (Phase 1, Session 1) and all governance documents. Phase 3 may begin only after author approval.*
