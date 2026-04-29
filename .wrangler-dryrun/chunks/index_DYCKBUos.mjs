globalThis.process ??= {};
globalThis.process.env ??= {};
import "./index_Cc6aPHRD.mjs";
import { a as apiError, u as unwrapResult, h as handleError } from "./error_BF6Eb6os.mjs";
import { a as handleApiTokenList, b as handleApiTokenCreate } from "./api-tokens_BtxDmjNa.mjs";
import { p as parseBody, i as isParseError } from "./parse_4YX0X0po.mjs";
import { R as Role } from "./types-ndj-bYfi_Bn2CgOOF.mjs";
import { V as VALID_SCOPES } from "./authenticate-CZ5fe42l_3kffwd1O.mjs";
import { o as object, h as string, e as array, j as _enum } from "./index_BpQCdXij.mjs";
const prerender = false;
const createTokenSchema = object({
  name: string().min(1).max(100),
  scopes: array(_enum(VALID_SCOPES)).min(1),
  expiresAt: string().datetime().optional()
});
const GET = async ({ locals }) => {
  const { emdash, user } = locals;
  if (!emdash?.db) {
    return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
  }
  if (!user || user.role < Role.ADMIN) {
    return apiError("FORBIDDEN", "Admin privileges required", 403);
  }
  const result = await handleApiTokenList(emdash.db, user.id);
  return unwrapResult(result);
};
const POST = async ({ request, locals }) => {
  const { emdash, user } = locals;
  if (!emdash?.db) {
    return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
  }
  if (!user || user.role < Role.ADMIN) {
    return apiError("FORBIDDEN", "Admin privileges required", 403);
  }
  try {
    const body = await parseBody(request, createTokenSchema);
    if (isParseError(body)) return body;
    const result = await handleApiTokenCreate(emdash.db, user.id, body);
    return unwrapResult(result, 201);
  } catch (error) {
    return handleError(error, "Failed to create API token", "TOKEN_CREATE_ERROR");
  }
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
