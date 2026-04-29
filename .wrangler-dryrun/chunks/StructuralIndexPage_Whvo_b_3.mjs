globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
import { N as getEntryTerms, L as renderTemplate, H as maybeRenderHead, J as addAttribute } from "./index_BpQCdXij.mjs";
import { r as renderComponent } from "./worker-entry_ByB1knaX.mjs";
import { n as getEmDashCollection } from "./query-B6Vu0d2i_CdjZKi_-.mjs";
import { a as $$Base } from "./Base_D3tSK0o0.mjs";
import { r as resolveFrameworkPage, i as isFrameworkPageSlug } from "./public-paths_p8DnGpf0.mjs";
import { g as getReadingTime } from "./reading-time_DXbm4fD_.mjs";
const $$StructuralIndexPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$StructuralIndexPage;
  const { slug } = Astro2.props;
  let posts = [];
  try {
    ({ entries: posts } = await getEmDashCollection("posts", {
      where: { framework_page: slug },
      orderBy: { published_at: "desc" }
    }));
  } catch {
    ({ entries: posts } = await getEmDashCollection("posts", {
      where: { category: slug },
      orderBy: { published_at: "desc" }
    }));
  }
  const filteredPosts = await Promise.all(
    posts.map(async (post) => {
      const legacyTerms = await getEntryTerms("posts", post.data.id, "category");
      const frameworkPage = resolveFrameworkPage(
        post.data.framework_page,
        legacyTerms.find((term) => isFrameworkPageSlug(term.slug))?.slug
      );
      const categories = legacyTerms.filter((term) => !isFrameworkPageSlug(term.slug));
      const bylines = post.data.bylines ?? [];
      return {
        post,
        frameworkPage,
        cats: categories.length > 0 ? categories : legacyTerms,
        bylines
      };
    })
  );
  const formatDate = (date) => date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const isProtocols = slug === "protocols";
  const isStandards = slug === "standards";
  const isMethod = slug === "the-method";
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": isProtocols ? "Protocols — Paritsea" : isStandards ? "Standards — Paritsea" : "The Method — Paritsea", "description": isProtocols ? "Paritsea Protocols establish structural requirements and transparency obligations for organised systems." : isStandards ? "Paritsea Standards define measurable structural benchmarks derived from the Doctrine." : "The Method documents structural analysis prior to formal protocol articulation — analytical observations, not opinion.", "data-astro-cid-ehlfal7b": true }, { "default": async ($$result2) => renderTemplate`${isProtocols && renderTemplate`${maybeRenderHead()}<div class="index-page" data-astro-cid-ehlfal7b> <header class="index-header" data-astro-cid-ehlfal7b> <div class="index-header-inner" data-astro-cid-ehlfal7b> <p class="index-eyebrow" data-astro-cid-ehlfal7b>Structural Architecture</p> <h1 class="index-title" data-astro-cid-ehlfal7b>Protocols</h1> <p class="index-description" data-astro-cid-ehlfal7b>
Protocols establish structural requirements, obligations, and transparency conditions for organised systems. Each protocol is derived from the Paritsea Doctrine and addresses a specific domain of structural incoherence.
</p> <p class="index-meta-note" data-astro-cid-ehlfal7b> ${filteredPosts.length} ${filteredPosts.length === 1 ? "protocol" : "protocols"} published &ensp;·&ensp; More forthcoming
</p> </div> </header> <section class="document-registry" data-astro-cid-ehlfal7b> ${filteredPosts.length === 0 ? renderTemplate`<p class="registry-empty" data-astro-cid-ehlfal7b>No protocols published yet.</p>` : renderTemplate`<div class="document-list" data-astro-cid-ehlfal7b> ${filteredPosts.map(({ post, cats }, i) => renderTemplate`<a${addAttribute(`/protocols/${post.id}`, "href")} class="document-card" data-astro-cid-ehlfal7b> <div class="document-card-index" data-astro-cid-ehlfal7b>${String(i + 1).padStart(2, "0")}</div> <div class="document-card-body" data-astro-cid-ehlfal7b> ${cats.length > 0 && renderTemplate`<div class="document-card-tags" data-astro-cid-ehlfal7b> ${cats.map((c) => renderTemplate`<span class="document-tag" data-astro-cid-ehlfal7b>${c.label}</span>`)} </div>`} <h2 class="document-card-title" data-astro-cid-ehlfal7b>${post.data.title}</h2> ${post.data.excerpt && renderTemplate`<p class="document-card-excerpt" data-astro-cid-ehlfal7b>${post.data.excerpt}</p>`} <div class="document-card-footer" data-astro-cid-ehlfal7b> ${post.data.publishedAt && renderTemplate`<time class="document-date" data-astro-cid-ehlfal7b>${formatDate(post.data.publishedAt)}</time>`} <span class="document-read" data-astro-cid-ehlfal7b>Read protocol →</span> </div> </div> </a>`)} </div>`} </section> <aside class="index-aside" data-astro-cid-ehlfal7b> <div class="aside-block" data-astro-cid-ehlfal7b> <h3 class="aside-heading" data-astro-cid-ehlfal7b>About Protocols</h3> <p class="aside-text" data-astro-cid-ehlfal7b>
Each protocol is a formal structural instrument. Protocols are not guidelines, best practices, or style recommendations. They establish structural requirements that must be met for a system to be considered coherent under the Paritsea framework.
</p> </div> <div class="aside-block" data-astro-cid-ehlfal7b> <h3 class="aside-heading" data-astro-cid-ehlfal7b>Derived From</h3> <p class="aside-text" data-astro-cid-ehlfal7b>
All protocols derive authority from <a href="/the-doctrine" class="aside-link" data-astro-cid-ehlfal7b>The Paritsea Doctrine</a>. No protocol may contradict the foundational doctrine.
</p> </div> </aside> </div>`}${isStandards && renderTemplate`<div class="index-page" data-astro-cid-ehlfal7b> <header class="index-header" data-astro-cid-ehlfal7b> <div class="index-header-inner" data-astro-cid-ehlfal7b> <p class="index-eyebrow" data-astro-cid-ehlfal7b>Structural Architecture</p> <h1 class="index-title" data-astro-cid-ehlfal7b>Standards</h1> <p class="index-description" data-astro-cid-ehlfal7b>
Standards define measurable structural benchmarks derived from the Doctrine. Where Protocols establish obligations, Standards define the specific conditions under which those obligations are considered met.
</p> <p class="index-meta-note" data-astro-cid-ehlfal7b> ${filteredPosts.length} ${filteredPosts.length === 1 ? "standard" : "standards"} published &ensp;·&ensp; More forthcoming
</p> </div> </header> <section class="document-registry" data-astro-cid-ehlfal7b> ${filteredPosts.length === 0 ? renderTemplate`<p class="registry-empty" data-astro-cid-ehlfal7b>No standards published yet.</p>` : renderTemplate`<div class="document-list" data-astro-cid-ehlfal7b> ${filteredPosts.map(({ post, cats }, i) => renderTemplate`<a${addAttribute(`/standards/${post.id}`, "href")} class="document-card" data-astro-cid-ehlfal7b> <div class="document-card-index" data-astro-cid-ehlfal7b>${String(i + 1).padStart(2, "0")}</div> <div class="document-card-body" data-astro-cid-ehlfal7b> ${cats.length > 0 && renderTemplate`<div class="document-card-tags" data-astro-cid-ehlfal7b> ${cats.map((c) => renderTemplate`<span class="document-tag" data-astro-cid-ehlfal7b>${c.label}</span>`)} </div>`} <h2 class="document-card-title" data-astro-cid-ehlfal7b>${post.data.title}</h2> ${post.data.excerpt && renderTemplate`<p class="document-card-excerpt" data-astro-cid-ehlfal7b>${post.data.excerpt}</p>`} <div class="document-card-footer" data-astro-cid-ehlfal7b> ${post.data.publishedAt && renderTemplate`<time class="document-date" data-astro-cid-ehlfal7b>${formatDate(post.data.publishedAt)}</time>`} <span class="document-read" data-astro-cid-ehlfal7b>Read standard →</span> </div> </div> </a>`)} </div>`} </section> <aside class="index-aside" data-astro-cid-ehlfal7b> <div class="aside-block" data-astro-cid-ehlfal7b> <h3 class="aside-heading" data-astro-cid-ehlfal7b>About Standards</h3> <p class="aside-text" data-astro-cid-ehlfal7b>
Standards translate structural obligations into verifiable conditions. A standard specifies what "structurally coherent" looks like in a given domain — making abstract requirements concrete and assessable.
</p> </div> <div class="aside-block" data-astro-cid-ehlfal7b> <h3 class="aside-heading" data-astro-cid-ehlfal7b>Relationship to Protocols</h3> <p class="aside-text" data-astro-cid-ehlfal7b>
Standards operate beneath Protocols. A Protocol establishes the obligation; a Standard defines the threshold. Multiple standards may exist for a single protocol domain.
</p> </div> </aside> </div>`}${isMethod && renderTemplate`<div class="index-page" data-astro-cid-ehlfal7b> <header class="index-header" data-astro-cid-ehlfal7b> <div class="index-header-inner" data-astro-cid-ehlfal7b> <p class="index-eyebrow" data-astro-cid-ehlfal7b>Structural Analysis</p> <h1 class="index-title" data-astro-cid-ehlfal7b>The Method</h1> <p class="index-description" data-astro-cid-ehlfal7b>
The Method publishes analytical entries prior to formal protocol articulation. These entries show how structural incoherence is identified and examined before it is formalised into protocols or standards.
</p> <p class="index-description-secondary" data-astro-cid-ehlfal7b>
These are analytical observations. Not opinion pieces. Not commentary. Each entry isolates a specific structural failure, names it without distortion, and holds it still long enough to understand what it actually is.
</p> <p class="index-meta-note" data-astro-cid-ehlfal7b> ${filteredPosts.length} ${filteredPosts.length === 1 ? "entry" : "entries"} published
</p> </div> </header> <section class="document-registry" data-astro-cid-ehlfal7b> ${filteredPosts.length === 0 ? renderTemplate`<p class="registry-empty" data-astro-cid-ehlfal7b>No entries yet.</p>` : renderTemplate`<div class="document-list" data-astro-cid-ehlfal7b> ${filteredPosts.map(({ post, cats }, i) => renderTemplate`<a${addAttribute(`/the-method/${post.id}`, "href")} class="document-card" data-astro-cid-ehlfal7b> <div class="document-card-index" data-astro-cid-ehlfal7b>${String(filteredPosts.length - i).padStart(2, "0")}</div> <div class="document-card-body" data-astro-cid-ehlfal7b> ${cats.length > 0 && renderTemplate`<div class="document-card-tags" data-astro-cid-ehlfal7b> ${cats.map((c) => renderTemplate`<span class="document-tag" data-astro-cid-ehlfal7b>${c.label}</span>`)} </div>`} <h2 class="document-card-title" data-astro-cid-ehlfal7b>${post.data.title}</h2> ${post.data.excerpt && renderTemplate`<p class="document-card-excerpt" data-astro-cid-ehlfal7b>${post.data.excerpt}</p>`} <div class="document-card-footer" data-astro-cid-ehlfal7b> ${post.data.publishedAt && renderTemplate`<time class="document-date" data-astro-cid-ehlfal7b>${formatDate(post.data.publishedAt)}</time>`} <span class="document-read" data-astro-cid-ehlfal7b>${getReadingTime(post.data.content)} min read</span> </div> </div> </a>`)} </div>`} </section> <aside class="index-aside" data-astro-cid-ehlfal7b> <div class="aside-block" data-astro-cid-ehlfal7b> <h3 class="aside-heading" data-astro-cid-ehlfal7b>What This Is Not</h3> <p class="aside-text" data-astro-cid-ehlfal7b>
These entries are not opinion columns. They are not commentary. They are not takes on industry news. Each entry is an analytical observation — a structural examination of something that failed to cohere.
</p> </div> <div class="aside-block" data-astro-cid-ehlfal7b> <h3 class="aside-heading" data-astro-cid-ehlfal7b>What Happens to These</h3> <p class="aside-text" data-astro-cid-ehlfal7b>
Patterns that persist across multiple entries may be formalised into protocols or standards, then enforced inside real implementations. The Method is the analytical precursor — where structural problems are named before they are governed.
</p> </div> </aside> </div>`}` })}`;
}, "/Users/paritr/Desktop/paritsea/src/components/StructuralIndexPage.astro", void 0);
export {
  $$StructuralIndexPage as $
};
