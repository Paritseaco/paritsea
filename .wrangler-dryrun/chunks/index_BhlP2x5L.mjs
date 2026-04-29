globalThis.process ??= {};
globalThis.process.env ??= {};
import { a as apiError, b as apiSuccess, h as handleError } from "./error_BF6Eb6os.mjs";
import { a as parseQuery, i as isParseError } from "./parse_4YX0X0po.mjs";
import { a4 as searchQuery } from "./redirects_aSD1pqg-.mjs";
import { s as searchWithDb } from "./query_YQ4sVFQR.mjs";
const prerender = false;
const GET = async ({ url, locals }) => {
  const { emdash } = locals;
  if (!emdash?.db) {
    return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
  }
  const query = parseQuery(url, searchQuery);
  if (isParseError(query)) return query;
  const collections = query.collections ? query.collections.split(",").map((c) => c.trim()) : void 0;
  try {
    const result = await searchWithDb(emdash.db, query.q, {
      collections,
      status: query.status,
      locale: query.locale,
      limit: query.limit
    });
    return apiSuccess(result);
  } catch (error) {
    return handleError(error, "Search failed", "SEARCH_ERROR");
  }
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
