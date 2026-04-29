globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
import { L as renderTemplate, H as maybeRenderHead } from "./index_BpQCdXij.mjs";
import { r as renderComponent } from "./worker-entry_ByB1knaX.mjs";
import { a as $$Base } from "./Base_D3tSK0o0.mjs";
const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Page not found", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="not-found" data-astro-cid-zetdm5md> <h1 data-astro-cid-zetdm5md>404</h1> <p data-astro-cid-zetdm5md>The page you're looking for doesn't exist.</p> <a href="/" data-astro-cid-zetdm5md>Go back home</a> </div> ` })}`;
}, "/Users/paritr/Desktop/paritsea/src/pages/404.astro", void 0);
const $$file = "/Users/paritr/Desktop/paritsea/src/pages/404.astro";
const $$url = "/404";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
