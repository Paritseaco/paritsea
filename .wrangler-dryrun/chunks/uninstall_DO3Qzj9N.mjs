globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as requirePerm } from "./authorize_k91w4Tim.mjs";
import { a as apiError, u as unwrapResult } from "./error_BF6Eb6os.mjs";
import "./revision_CB_HKHkH.mjs";
import "./user_BtS3t0U-.mjs";
import "./request-context_CERgKQIY.mjs";
import { d as handleMarketplaceUninstall } from "./marketplace__3QDRsou.mjs";
import { b as parseOptionalBody, i as isParseError } from "./parse_4YX0X0po.mjs";
import "./redirects_aSD1pqg-.mjs";
import { o as object, k as boolean } from "./index_BpQCdXij.mjs";
const prerender = false;
const uninstallBodySchema = object({
  deleteData: boolean().optional()
});
const POST = async ({ params, request, locals }) => {
  const { emdash, user } = locals;
  const { id } = params;
  if (!emdash?.db) {
    return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
  }
  const denied = requirePerm(user, "plugins:manage");
  if (denied) return denied;
  if (!id) {
    return apiError("INVALID_REQUEST", "Plugin ID required", 400);
  }
  const body = await parseOptionalBody(request, uninstallBodySchema, {});
  if (isParseError(body)) return body;
  const result = await handleMarketplaceUninstall(emdash.db, emdash.storage, id, {
    deleteData: body.deleteData ?? false
  });
  if (!result.success) return unwrapResult(result);
  await emdash.syncMarketplacePlugins();
  return unwrapResult(result);
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
