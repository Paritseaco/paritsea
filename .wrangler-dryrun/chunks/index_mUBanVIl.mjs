globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as requirePerm } from "./authorize_k91w4Tim.mjs";
import { r as requireDb, u as unwrapResult } from "./error_BF6Eb6os.mjs";
import "./revision_CB_HKHkH.mjs";
import "./user_BtS3t0U-.mjs";
import { j as handleSchemaCollectionList, k as handleSchemaCollectionCreate } from "./schema_D3THSt-1.mjs";
import "./request-context_CERgKQIY.mjs";
import "./manifest-schema_DLrqJQoy.mjs";
import { p as parseBody, i as isParseError } from "./parse_4YX0X0po.mjs";
import { $ as createCollectionBody } from "./redirects_aSD1pqg-.mjs";
const prerender = false;
const GET = async ({ locals }) => {
  const { emdash, user } = locals;
  const dbErr = requireDb(emdash?.db);
  if (dbErr) return dbErr;
  const denied = requirePerm(user, "schema:read");
  if (denied) return denied;
  const result = await handleSchemaCollectionList(emdash.db);
  return unwrapResult(result);
};
const POST = async ({ request, locals }) => {
  const { emdash, user } = locals;
  const dbErr = requireDb(emdash?.db);
  if (dbErr) return dbErr;
  const denied = requirePerm(user, "schema:manage");
  if (denied) return denied;
  const body = await parseBody(request, createCollectionBody);
  if (isParseError(body)) return body;
  const result = await handleSchemaCollectionCreate(emdash.db, body);
  emdash.invalidateManifest();
  return unwrapResult(result, 201);
};
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
