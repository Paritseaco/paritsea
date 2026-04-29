globalThis.process ??= {};
globalThis.process.env ??= {};
import { a as apiError } from "./error_BF6Eb6os.mjs";
import "./index_Cc6aPHRD.mjs";
import "./runner_CttWqPrA.mjs";
import "./index_BpQCdXij.mjs";
import "./revision_CB_HKHkH.mjs";
import "./request-context_CERgKQIY.mjs";
const prerender = false;
async function handleDevBypass(context) {
  {
    return apiError("FORBIDDEN", "Dev bypass is only available in development mode", 403);
  }
}
const GET = handleDevBypass;
const POST = handleDevBypass;
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
