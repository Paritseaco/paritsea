globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
import { R as decodeSlug, T as getTerm, N as getEntryTerms, L as renderTemplate, H as maybeRenderHead } from "./index_BpQCdXij.mjs";
import { r as renderComponent } from "./worker-entry_ByB1knaX.mjs";
import { n as getEmDashCollection } from "./query-B6Vu0d2i_CdjZKi_-.mjs";
import { a as $$Base } from "./Base_D3tSK0o0.mjs";
import { $ as $$PostCard } from "./PostCard_CGrU9_sH.mjs";
import { g as getReadingTime } from "./reading-time_DXbm4fD_.mjs";
import { a as resolvePostPath } from "./public-paths_p8DnGpf0.mjs";
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const slug = decodeSlug(Astro2.params.slug);
  const structuralPages = /* @__PURE__ */ new Set(["the-doctrine", "protocols", "standards", "the-method"]);
  if (slug && structuralPages.has(slug)) {
    return Astro2.redirect(`/${slug}`, 301);
  }
  const term = slug ? await getTerm("category", slug) : null;
  if (!term) {
    return Astro2.redirect("/404");
  }
  const { entries: posts } = await getEmDashCollection("posts", {
    where: { category: term.slug },
    orderBy: { published_at: "desc" }
  });
  const filteredPosts = await Promise.all(
    posts.map(async (post) => {
      const categories = await getEntryTerms("posts", post.data.id, "category");
      const bylines = post.data.bylines ?? [];
      return { post, cats: categories, bylines };
    })
  );
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": `${term.label} — Paritsea`, "description": `Legacy archive view for ${term.label}.`, "robots": "noindex, follow", "data-astro-cid-xvtl5w7w": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="archive-section" data-astro-cid-xvtl5w7w> <header class="archive-header" data-astro-cid-xvtl5w7w> <span class="archive-label" data-astro-cid-xvtl5w7w>Category</span> <h1 class="archive-title" data-astro-cid-xvtl5w7w>${term.label}</h1> <p class="archive-count" data-astro-cid-xvtl5w7w> ${filteredPosts.length} ${filteredPosts.length === 1 ? "post" : "posts"} </p> </header> ${filteredPosts.length === 0 ? renderTemplate`<p class="no-posts" data-astro-cid-xvtl5w7w>No posts in this category yet.</p>` : renderTemplate`<div class="posts-grid" data-astro-cid-xvtl5w7w> ${filteredPosts.map(({ post, cats }) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "title": post.data.title, "excerpt": post.data.excerpt, "featuredImage": post.data.featured_image, "href": resolvePostPath(post.id, post.data.framework_page, null) ?? `/the-method/${post.id}`, "date": post.data.publishedAt ?? void 0, "readingTime": getReadingTime(post.data.content), "tags": cats.map((c) => ({ slug: c.slug, label: c.label })), "data-astro-cid-xvtl5w7w": true })}`)} </div>`} </section> ` })}`;
}, "/Users/paritr/Desktop/paritsea/src/pages/category/[slug].astro", void 0);
const $$file = "/Users/paritr/Desktop/paritsea/src/pages/category/[slug].astro";
const $$url = "/category/[slug]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
