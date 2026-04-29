globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
import { L as renderTemplate, H as maybeRenderHead, J as addAttribute } from "./index_BpQCdXij.mjs";
import { r as renderComponent } from "./worker-entry_ByB1knaX.mjs";
import { a as $$Base } from "./Base_D3tSK0o0.mjs";
const $$Implementations = createComponent(($$result, $$props, $$slots) => {
  const implementations = [
    {
      name: "AgenSea",
      status: "MVP in development",
      label: "ASLS-01 v1.1 implementation",
      description: "A structural transparency platform for agency-client work that applies ASLS inside discovery, profile logic, trust surfaces, contracts, and operating workflows.",
      href: "https://agensea-flame.vercel.app/",
      notes: [
        "Implements structural legitimacy rather than reputation signals.",
        "Translates ASLS into human-readable trust surfaces instead of exposing raw scores.",
        "Treats structural scoring and operational trust signals as distinct layers."
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Implementations", "description": "Implementations are the applied layer of Paritsea: products and operating systems that enforce protocols and standards inside real environments.", "data-astro-cid-zb5q4wsk": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="implementations-page" data-astro-cid-zb5q4wsk> <header class="page-header" data-astro-cid-zb5q4wsk> <div class="page-header-inner" data-astro-cid-zb5q4wsk> <p class="page-eyebrow" data-astro-cid-zb5q4wsk>Applied Layer</p> <h1 class="page-title" data-astro-cid-zb5q4wsk>Implementations</h1> <p class="page-description" data-astro-cid-zb5q4wsk>
Paritsea is not only a doctrine. It is meant to be enforced. Implementations are the systems, products, and operating environments where protocols and standards become real institutional behavior.
</p> <p class="page-description-secondary" data-astro-cid-zb5q4wsk>
An implementation qualifies when it applies Paritsea logic faithfully without collapsing into marketplace signals, reputation games, or cosmetic compliance language.
</p> <p class="page-meta-note" data-astro-cid-zb5q4wsk> ${implementations.length} ${implementations.length === 1 ? "implementation" : "implementations"} currently documented
</p> </div> </header> <section class="implementation-list" aria-label="Implementation registry" data-astro-cid-zb5q4wsk> ${implementations.map((implementation, index) => renderTemplate`<article class="implementation-card" data-astro-cid-zb5q4wsk> <div class="implementation-index" data-astro-cid-zb5q4wsk>${String(index + 1).padStart(2, "0")}</div> <div class="implementation-body" data-astro-cid-zb5q4wsk> <div class="implementation-meta" data-astro-cid-zb5q4wsk> <span class="implementation-label" data-astro-cid-zb5q4wsk>${implementation.label}</span> <span class="implementation-status" data-astro-cid-zb5q4wsk>${implementation.status}</span> </div> <h2 class="implementation-title" data-astro-cid-zb5q4wsk>${implementation.name}</h2> <p class="implementation-description" data-astro-cid-zb5q4wsk>${implementation.description}</p> <ul class="implementation-notes" data-astro-cid-zb5q4wsk> ${implementation.notes.map((note) => renderTemplate`<li data-astro-cid-zb5q4wsk>${note}</li>`)} </ul> <a${addAttribute(implementation.href, "href")} class="implementation-link" target="_blank" rel="noreferrer" data-astro-cid-zb5q4wsk>
Open implementation →
</a> </div> </article>`)} </section> <aside class="page-aside" data-astro-cid-zb5q4wsk> <div class="aside-block" data-astro-cid-zb5q4wsk> <h2 class="aside-heading" data-astro-cid-zb5q4wsk>Qualification Rule</h2> <p class="aside-text" data-astro-cid-zb5q4wsk>
An implementation must apply Paritsea structurally, not cosmetically. The framework must shape product behavior, accountability logic, and reader-visible trust surfaces.
</p> </div> <div class="aside-block" data-astro-cid-zb5q4wsk> <h2 class="aside-heading" data-astro-cid-zb5q4wsk>What Not to Do</h2> <p class="aside-text" data-astro-cid-zb5q4wsk>
Implementations must not convert standards into review systems, star ratings, leaderboard mechanics, sponsored discovery, or raw score exposure. Enforcement has to preserve structural meaning.
</p> </div> <div class="aside-block" data-astro-cid-zb5q4wsk> <h2 class="aside-heading" data-astro-cid-zb5q4wsk>Current Reading</h2> <p class="aside-text" data-astro-cid-zb5q4wsk>
AgenSea is the first documented implementation layer and currently applies <a href="/standards/asls-01" class="aside-link" data-astro-cid-zb5q4wsk>ASLS-01</a> inside an MVP product model.
</p> </div> </aside> </div> ` })}`;
}, "/Users/paritr/Desktop/paritsea/src/pages/implementations.astro", void 0);
const $$file = "/Users/paritr/Desktop/paritsea/src/pages/implementations.astro";
const $$url = "/implementations";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Implementations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
