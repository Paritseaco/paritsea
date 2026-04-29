globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as renderComponent, s as spreadAttributes } from "./worker-entry_ByB1knaX.mjs";
import { R as decodeSlug, L as renderTemplate, H as maybeRenderHead } from "./index_BpQCdXij.mjs";
import { r as getEmDashEntry } from "./query-B6Vu0d2i_CdjZKi_-.mjs";
import { a as $$Base, b as $$PortableText } from "./Base_D3tSK0o0.mjs";
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
const $$pageSlug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$pageSlug;
  const slug = decodeSlug(Astro2.params.page_slug);
  if (!slug) {
    return Astro2.redirect("/404");
  }
  const KNOWN_PAGE_SLUGS = ["licensing", "contact"];
  if (!KNOWN_PAGE_SLUGS.includes(slug)) {
    return Astro2.redirect("/404");
  }
  const { entry: page2, cacheHint } = await getEmDashEntry("pages", slug);
  if (!page2) {
    return Astro2.redirect("/404");
  }
  Astro2.cache.set(cacheHint);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": page2.data.title, "content": { collection: "pages", id: page2.data.id, slug }, "data-astro-cid-2spps4tc": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="page-article" data-astro-cid-2spps4tc> <header class="page-header" data-astro-cid-2spps4tc> <h1 class="page-title"${spreadAttributes(page2.edit.title)} data-astro-cid-2spps4tc>${page2.data.title}</h1> </header> <div class="page-content" data-astro-cid-2spps4tc> ${renderComponent($$result2, "PortableText", $$PortableText, { "value": page2.data.content, "data-astro-cid-2spps4tc": true })} </div> </article> ` })}`;
}, "/Users/paritr/Desktop/paritsea/src/pages/[page_slug].astro", void 0);
const $$file = "/Users/paritr/Desktop/paritsea/src/pages/[page_slug].astro";
const $$url = "/[page_slug]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$pageSlug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
