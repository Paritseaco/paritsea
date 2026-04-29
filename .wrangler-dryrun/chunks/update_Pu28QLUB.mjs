globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as requirePerm } from "./authorize_k91w4Tim.mjs";
import { a as apiError, u as unwrapResult } from "./error_BF6Eb6os.mjs";
import "./revision_CB_HKHkH.mjs";
import "./user_BtS3t0U-.mjs";
import "./request-context_CERgKQIY.mjs";
import { e as handleMarketplaceUpdate } from "./marketplace__3QDRsou.mjs";
import { b as parseOptionalBody, i as isParseError } from "./parse_4YX0X0po.mjs";
import "./redirects_aSD1pqg-.mjs";
import { o as object, k as boolean, h as string } from "./index_BpQCdXij.mjs";
const prerender = false;
const updateBodySchema = object({
  version: string().min(1).optional(),
  confirmCapabilityChanges: boolean().optional(),
  confirmRouteVisibilityChanges: boolean().optional()
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
  const body = await parseOptionalBody(request, updateBodySchema, {});
  if (isParseError(body)) return body;
  const result = await handleMarketplaceUpdate(
    emdash.db,
    emdash.storage,
    emdash.getSandboxRunner(),
    emdash.config.marketplace,
    id,
    {
      version: body.version,
      confirmCapabilityChanges: body.confirmCapabilityChanges,
      confirmRouteVisibilityChanges: body.confirmRouteVisibilityChanges
    }
  );
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
