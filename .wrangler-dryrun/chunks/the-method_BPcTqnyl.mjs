globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
import { L as renderTemplate } from "./index_BpQCdXij.mjs";
import { r as renderComponent } from "./worker-entry_ByB1knaX.mjs";
import { $ as $$StructuralIndexPage } from "./StructuralIndexPage_Whvo_b_3.mjs";
const $$TheMethod = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "StructuralIndexPage", $$StructuralIndexPage, { "slug": "the-method" })}`;
}, "/Users/paritr/Desktop/paritsea/src/pages/the-method.astro", void 0);
const $$file = "/Users/paritr/Desktop/paritsea/src/pages/the-method.astro";
const $$url = "/the-method";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$TheMethod,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
