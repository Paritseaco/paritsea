globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as requirePerm } from "./authorize_k91w4Tim.mjs";
import { r as requireDb, u as unwrapResult } from "./error_BF6Eb6os.mjs";
import "./revision_CB_HKHkH.mjs";
import "./user_BtS3t0U-.mjs";
import { h as handleSchemaFieldReorder } from "./schema_D3THSt-1.mjs";
import "./request-context_CERgKQIY.mjs";
import "./manifest-schema_DLrqJQoy.mjs";
import { p as parseBody, i as isParseError } from "./parse_4YX0X0po.mjs";
import { W as fieldReorderBody } from "./redirects_aSD1pqg-.mjs";
const prerender = false;
const POST = async ({ params, request, locals }) => {
  const { emdash, user } = locals;
  const collectionSlug = params.slug;
  const dbErr = requireDb(emdash?.db);
  if (dbErr) return dbErr;
  const denied = requirePerm(user, "schema:manage");
  if (denied) return denied;
  const body = await parseBody(request, fieldReorderBody);
  if (isParseError(body)) return body;
  const result = await handleSchemaFieldReorder(emdash.db, collectionSlug, body.fieldSlugs);
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
