globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
import { O as getSiteSettings, N as getEntryTerms, L as renderTemplate, H as maybeRenderHead, J as addAttribute } from "./index_BpQCdXij.mjs";
import { r as renderComponent } from "./worker-entry_ByB1knaX.mjs";
import { n as getEmDashCollection } from "./query-B6Vu0d2i_CdjZKi_-.mjs";
import { a as $$Base } from "./Base_D3tSK0o0.mjs";
import { i as isFrameworkPageSlug, r as resolveFrameworkPage, a as resolvePostPath } from "./public-paths_p8DnGpf0.mjs";
import { r as resolveBlogSiteIdentity } from "./site-identity_DWdgL0Or.mjs";
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const { entries: posts, cacheHint } = await getEmDashCollection("posts");
  const { siteTitle, siteTagline } = resolveBlogSiteIdentity(await getSiteSettings());
  Astro2.cache.set(cacheHint);
  const doctrinePost = posts.find((p) => p.id === "doctrine");
  const stpPost = posts.find((p) => p.id === "stp");
  const aslsPost = posts.find((p) => p.id === "asls-01");
  const landmarkIds = /* @__PURE__ */ new Set(["doctrine", "stp", "asls-01"]);
  const methodEntries = (await Promise.all(
    posts.filter((p) => !landmarkIds.has(p.id)).map(async (post) => {
      const legacyTerms = await getEntryTerms("posts", post.data.id, "category");
      const legacyFrameworkPage = legacyTerms.find((term) => isFrameworkPageSlug(term.slug))?.slug ?? null;
      return {
        post,
        legacyTerms,
        frameworkPage: resolveFrameworkPage(post.data.framework_page, legacyFrameworkPage)
      };
    })
  )).filter((entry) => entry.frameworkPage === "the-method").toSorted((a, b) => {
    const dateA = a.post.data.publishedAt?.getTime() ?? 0;
    const dateB = b.post.data.publishedAt?.getTime() ?? 0;
    return dateB - dateA;
  }).slice(0, 4);
  const methodEntriesWithTags = await Promise.all(
    methodEntries.map(async ({ post, legacyTerms, frameworkPage }) => {
      const categories = legacyTerms.filter((term) => !isFrameworkPageSlug(term.slug)).length > 0 ? legacyTerms.filter((term) => !isFrameworkPageSlug(term.slug)) : await getEntryTerms("posts", post.data.id, "category");
      const href = resolvePostPath(post.id, frameworkPage, null) ?? `/the-method/${post.id}`;
      return {
        post,
        categories: categories.map((category) => ({
          slug: category.slug,
          label: category.label
        })),
        href
      };
    })
  );
  function formatDate(date) {
    if (!date) return null;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": siteTitle, "description": siteTagline, "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="landing" data-astro-cid-j7pv25f6>  <section class="hero" data-astro-cid-j7pv25f6> <div class="hero-container" data-astro-cid-j7pv25f6> <div class="hero-inner" data-astro-cid-j7pv25f6> <p class="hero-eyebrow" data-astro-cid-j7pv25f6>Paritsea</p> <h1 class="hero-statement" data-astro-cid-j7pv25f6>
Structural coherence<br data-astro-cid-j7pv25f6>is a prerequisite<br data-astro-cid-j7pv25f6>for legitimate action.
</h1> <p class="hero-sub" data-astro-cid-j7pv25f6>
A working framework for seeing clearly inside complex systems —<br class="br-lg" data-astro-cid-j7pv25f6>
where tension is visible, cost is named, and method is precise.
</p> <div class="hero-actions" data-astro-cid-j7pv25f6> ${doctrinePost && renderTemplate`<a href="/the-doctrine" class="btn-primary" data-astro-cid-j7pv25f6>
Read the Doctrine
</a>`} <a href="/the-method" class="btn-ghost" data-astro-cid-j7pv25f6>
Browse the Method →
</a> </div> </div> <div class="hero-illustration-wrapper" data-astro-cid-j7pv25f6> <svg class="hero-illustration" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6>   <rect x="50" y="50" width="500" height="300" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.2" data-astro-cid-j7pv25f6></rect> <rect x="75" y="75" width="450" height="250" fill="none" stroke="currentColor" stroke-width="1" opacity="0.15" data-astro-cid-j7pv25f6></rect>  <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" stroke-width="0.5" opacity="0.1" data-astro-cid-j7pv25f6></line> <line x1="300" y1="50" x2="300" y2="350" stroke="currentColor" stroke-width="0.5" opacity="0.1" data-astro-cid-j7pv25f6></line> <line x1="400" y1="50" x2="400" y2="350" stroke="currentColor" stroke-width="0.5" opacity="0.1" data-astro-cid-j7pv25f6></line>  <line x1="50" y1="150" x2="550" y2="150" stroke="currentColor" stroke-width="0.5" opacity="0.1" data-astro-cid-j7pv25f6></line> <line x1="50" y1="250" x2="550" y2="250" stroke="currentColor" stroke-width="0.5" opacity="0.1" data-astro-cid-j7pv25f6></line>  <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.7" data-astro-cid-j7pv25f6></circle> <circle cx="300" cy="80" r="4" fill="currentColor" opacity="0.5" data-astro-cid-j7pv25f6></circle> <circle cx="500" cy="120" r="4" fill="currentColor" opacity="0.4" data-astro-cid-j7pv25f6></circle> <circle cx="150" cy="200" r="3" fill="currentColor" opacity="0.3" data-astro-cid-j7pv25f6></circle> <circle cx="300" cy="200" r="5" fill="currentColor" opacity="0.6" data-astro-cid-j7pv25f6></circle> <circle cx="450" cy="200" r="3" fill="currentColor" opacity="0.4" data-astro-cid-j7pv25f6></circle> <circle cx="100" cy="300" r="4" fill="currentColor" opacity="0.5" data-astro-cid-j7pv25f6></circle> <circle cx="300" cy="320" r="5" fill="currentColor" opacity="0.7" data-astro-cid-j7pv25f6></circle> <circle cx="500" cy="300" r="4" fill="currentColor" opacity="0.5" data-astro-cid-j7pv25f6></circle>  <path d="M 100 100 Q 200 150 300 200" stroke="currentColor" stroke-width="1" fill="none" opacity="0.2" data-astro-cid-j7pv25f6></path> <path d="M 300 200 Q 400 180 500 120" stroke="currentColor" stroke-width="1" fill="none" opacity="0.15" data-astro-cid-j7pv25f6></path> <path d="M 100 100 L 100 300" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1" data-astro-cid-j7pv25f6></path> <path d="M 300 80 L 300 320" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12" data-astro-cid-j7pv25f6></path> <path d="M 500 120 L 500 300" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1" data-astro-cid-j7pv25f6></path> <path d="M 100 300 Q 200 280 300 320" stroke="currentColor" stroke-width="1" fill="none" opacity="0.15" data-astro-cid-j7pv25f6></path> <path d="M 300 320 Q 400 290 500 300" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12" data-astro-cid-j7pv25f6></path> </svg> </div> </div> <div class="hero-rule" aria-hidden="true" data-astro-cid-j7pv25f6> <span class="rule-label" data-astro-cid-j7pv25f6>est. 2024</span> </div> </section>  <section class="pillars" data-astro-cid-j7pv25f6> <header class="section-header" data-astro-cid-j7pv25f6> <span class="section-eyebrow" data-astro-cid-j7pv25f6>The Architecture</span> </header> <div class="pillars-grid" data-astro-cid-j7pv25f6> ${doctrinePost && renderTemplate`<a href="/the-doctrine" class="pillar pillar--doctrine" data-astro-cid-j7pv25f6> <div class="pillar-index" data-astro-cid-j7pv25f6>01</div> <div class="pillar-body" data-astro-cid-j7pv25f6> <h2 class="pillar-title" data-astro-cid-j7pv25f6>The Doctrine</h2> <p class="pillar-desc" data-astro-cid-j7pv25f6> ${doctrinePost.data.excerpt ?? "The foundational principles that define what this framework stands for and why."} </p> </div> <span class="pillar-arrow" data-astro-cid-j7pv25f6>→</span> </a>`} ${stpPost && renderTemplate`<a href="/protocols/stp" class="pillar" data-astro-cid-j7pv25f6> <div class="pillar-index" data-astro-cid-j7pv25f6>02</div> <div class="pillar-body" data-astro-cid-j7pv25f6> <h2 class="pillar-title" data-astro-cid-j7pv25f6>STP Protocol</h2> <p class="pillar-desc" data-astro-cid-j7pv25f6> ${stpPost.data.excerpt ?? "A structured protocol for navigating system transitions with precision and accountability."} </p> </div> <span class="pillar-arrow" data-astro-cid-j7pv25f6>→</span> </a>`} ${aslsPost && renderTemplate`<a href="/standards/asls-01" class="pillar" data-astro-cid-j7pv25f6> <div class="pillar-index" data-astro-cid-j7pv25f6>03</div> <div class="pillar-body" data-astro-cid-j7pv25f6> <h2 class="pillar-title" data-astro-cid-j7pv25f6>ASLS-01 Standard</h2> <p class="pillar-desc" data-astro-cid-j7pv25f6> ${aslsPost.data.excerpt ?? "The standard for defining, measuring, and communicating structural legitimacy in systems."} </p> </div> <span class="pillar-arrow" data-astro-cid-j7pv25f6>→</span> </a>`} <a href="/the-method" class="pillar pillar--method" data-astro-cid-j7pv25f6> <div class="pillar-index" data-astro-cid-j7pv25f6>04</div> <div class="pillar-body" data-astro-cid-j7pv25f6> <h2 class="pillar-title" data-astro-cid-j7pv25f6>The Method</h2> <p class="pillar-desc" data-astro-cid-j7pv25f6>
Analytical entries tracing where structural incoherence becomes operational cost.
</p> </div> <span class="pillar-arrow" data-astro-cid-j7pv25f6>→</span> </a> <a href="/implementations" class="pillar" data-astro-cid-j7pv25f6> <div class="pillar-index" data-astro-cid-j7pv25f6>05</div> <div class="pillar-body" data-astro-cid-j7pv25f6> <h2 class="pillar-title" data-astro-cid-j7pv25f6>Implementations</h2> <p class="pillar-desc" data-astro-cid-j7pv25f6>
Applied systems that enforce Paritsea standards in real operating environments. AgenSea is the first active ASLS-01 implementation.
</p> </div> <span class="pillar-arrow" data-astro-cid-j7pv25f6>→</span> </a> </div> </section>  ${methodEntriesWithTags.length > 0 && renderTemplate`<section class="records" data-astro-cid-j7pv25f6> <header class="section-header" data-astro-cid-j7pv25f6> <span class="section-eyebrow" data-astro-cid-j7pv25f6>Latest Entries</span> <a href="/the-method" class="section-more" data-astro-cid-j7pv25f6>Browse all →</a> </header> <div class="records-list" data-astro-cid-j7pv25f6> ${methodEntriesWithTags.map(({ post, categories, href }, i) => renderTemplate`<a${addAttribute(href, "href")} class="record-item" data-astro-cid-j7pv25f6> <span class="record-num" data-astro-cid-j7pv25f6> ${String(i + 1).padStart(2, "0")} </span> <div class="record-body" data-astro-cid-j7pv25f6> <h3 class="record-title" data-astro-cid-j7pv25f6>${post.data.title}</h3> ${post.data.excerpt && renderTemplate`<p class="record-excerpt" data-astro-cid-j7pv25f6>${post.data.excerpt}</p>`} </div> <div class="record-meta" data-astro-cid-j7pv25f6> ${categories.length > 0 && renderTemplate`<span class="record-tag" data-astro-cid-j7pv25f6>${categories[0].label}</span>`} ${formatDate(post.data.publishedAt) && renderTemplate`<time class="record-date" data-astro-cid-j7pv25f6>${formatDate(post.data.publishedAt)}</time>`} </div> </a>`)} </div> </section>`}  <section class="closing" data-astro-cid-j7pv25f6> <blockquote class="closing-quote" data-astro-cid-j7pv25f6>
"The problem is not that things are broken.<br data-astro-cid-j7pv25f6>
The problem is that they work — and something is still wrong."
</blockquote> <p class="closing-attr" data-astro-cid-j7pv25f6>— Parit Ritchai, The Doctrine</p> </section> </div> ` })}`;
}, "/Users/paritr/Desktop/paritsea/src/pages/index.astro", void 0);
const $$file = "/Users/paritr/Desktop/paritsea/src/pages/index.astro";
const $$url = "";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
