globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as requirePerm } from "./authorize_k91w4Tim.mjs";
import { a as apiError, u as unwrapResult } from "./error_BF6Eb6os.mjs";
import "./revision_CB_HKHkH.mjs";
import "./user_BtS3t0U-.mjs";
import "./request-context_CERgKQIY.mjs";
import { c as handleMarketplaceUpdateCheck } from "./marketplace__3QDRsou.mjs";
import "./redirects_aSD1pqg-.mjs";
const prerender = false;
const GET = async ({ locals }) => {
  const { emdash, user } = locals;
  if (!emdash?.db) {
    return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
  }
  const denied = requirePerm(user, "plugins:read");
  if (denied) return denied;
  const result = await handleMarketplaceUpdateCheck(emdash.db, emdash.config.marketplace);
  return unwrapResult(result);
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
