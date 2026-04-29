globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as requirePerm } from "./authorize_k91w4Tim.mjs";
import { a as apiError, u as unwrapResult } from "./error_BF6Eb6os.mjs";
import "./revision_CB_HKHkH.mjs";
import "./user_BtS3t0U-.mjs";
import "./request-context_CERgKQIY.mjs";
import { g as handleThemeSearch } from "./marketplace__3QDRsou.mjs";
import "./redirects_aSD1pqg-.mjs";
const prerender = false;
const GET = async ({ url, locals }) => {
  const { emdash, user } = locals;
  if (!emdash?.db) {
    return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
  }
  const denied = requirePerm(user, "plugins:read");
  if (denied) return denied;
  const query = url.searchParams.get("q") ?? void 0;
  const keyword = url.searchParams.get("keyword") ?? void 0;
  const sortParam = url.searchParams.get("sort");
  const validSorts = /* @__PURE__ */ new Set(["name", "created", "updated"]);
  let sort;
  if (sortParam && validSorts.has(sortParam)) {
    sort = sortParam;
  }
  const cursor = url.searchParams.get("cursor") ?? void 0;
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? Math.min(Math.max(1, parseInt(limitParam, 10) || 50), 100) : void 0;
  const result = await handleThemeSearch(emdash.config.marketplace, query, {
    keyword,
    sort,
    cursor,
    limit
  });
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
