globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
import { N as getEntryTerms, L as renderTemplate, H as maybeRenderHead, J as addAttribute } from "./index_BpQCdXij.mjs";
import { r as renderComponent } from "./worker-entry_ByB1knaX.mjs";
import { n as getEmDashCollection } from "./query-B6Vu0d2i_CdjZKi_-.mjs";
import { a as $$Base } from "./Base_D3tSK0o0.mjs";
import { $ as $$PostCard } from "./PostCard_CGrU9_sH.mjs";
import { r as resolveFrameworkPage, i as isFrameworkPageSlug, a as resolvePostPath } from "./public-paths_p8DnGpf0.mjs";
import { e as extractText, g as getReadingTime } from "./reading-time_DXbm4fD_.mjs";
const prerender = false;
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Search;
  const query = Astro2.url.searchParams.get("q")?.trim() || "";
  const { entries: allPosts } = await getEmDashCollection("posts");
  function matchesQuery(post, q) {
    if (!q) return false;
    const lower = q.toLowerCase();
    const title = (post.data.title || "").toLowerCase();
    const excerpt = (post.data.excerpt || "").toLowerCase();
    const content = extractText(post.data.content).toLowerCase();
    return title.includes(lower) || excerpt.includes(lower) || content.includes(lower);
  }
  const results = query ? allPosts.filter((p) => matchesQuery(p, query)) : [];
  const resultsWithHref = await Promise.all(
    results.map(async (post) => {
      const legacyTerms = await getEntryTerms("posts", post.data.id, "category");
      const frameworkPage = resolveFrameworkPage(
        post.data.framework_page,
        legacyTerms.find((term) => isFrameworkPageSlug(term.slug))?.slug
      );
      return {
        post,
        href: resolvePostPath(post.id, frameworkPage, null) ?? `/the-method/${post.id}`
      };
    })
  );
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": query ? `Search: ${query}` : "Search", "description": "Search the Paritsea public archive.", "robots": "noindex, follow", "data-astro-cid-ipsxrsrh": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="search-page" data-astro-cid-ipsxrsrh> <h1 class="search-title" data-astro-cid-ipsxrsrh>Search</h1> <form method="get" action="/search" class="search-form" data-astro-cid-ipsxrsrh> <input type="search" name="q"${addAttribute(query, "value")} placeholder="Search posts..." class="search-input" autofocus data-astro-cid-ipsxrsrh> <button type="submit" class="search-button" data-astro-cid-ipsxrsrh>Search</button> </form> ${query && renderTemplate`<p class="search-summary" data-astro-cid-ipsxrsrh> ${results.length === 0 ? `No results for "${query}"` : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`} </p>`} ${resultsWithHref.length > 0 && renderTemplate`<div class="search-results" data-astro-cid-ipsxrsrh> ${resultsWithHref.map(({ post, href }) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "title": post.data.title, "excerpt": post.data.excerpt, "featuredImage": post.data.featured_image, "href": href, "date": post.data.publishedAt ?? void 0, "readingTime": getReadingTime(post.data.content), "data-astro-cid-ipsxrsrh": true })}`)} </div>`} ${!query && renderTemplate`<p class="search-hint" data-astro-cid-ipsxrsrh>Enter a search term to find posts.</p>`} </section> ` })}`;
}, "/Users/paritr/Desktop/paritsea/src/pages/search.astro", void 0);
const $$file = "/Users/paritr/Desktop/paritsea/src/pages/search.astro";
const $$url = "/search";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
