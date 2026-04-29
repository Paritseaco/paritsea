globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as requirePerm, a as requireOwnerPerm } from "./authorize_k91w4Tim.mjs";
import { a as apiError, u as unwrapResult, m as mapErrorStatus } from "./error_BF6Eb6os.mjs";
import { a as parseQuery, i as isParseError, p as parseBody } from "./parse_4YX0X0po.mjs";
import { z as contentListQuery, A as contentCreateBody } from "./redirects_aSD1pqg-.mjs";
const prerender = false;
const GET = async ({ params, url, locals }) => {
  const { emdash, user } = locals;
  const denied = requirePerm(user, "content:read");
  if (denied) return denied;
  const collection = params.collection;
  const query = parseQuery(url, contentListQuery);
  if (isParseError(query)) return query;
  if (!emdash?.handleContentList) {
    return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
  }
  const result = await emdash.handleContentList(collection, query);
  return unwrapResult(result);
};
const POST = async ({ params, request, locals, cache }) => {
  const { emdash, user } = locals;
  const denied = requirePerm(user, "content:create");
  if (denied) return denied;
  const collection = params.collection;
  const body = await parseBody(request, contentCreateBody);
  if (isParseError(body)) return body;
  if (!emdash?.handleContentCreate || !emdash?.handleContentGet) {
    return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
  }
  if (body.translationOf) {
    const source = await emdash.handleContentGet(collection, body.translationOf);
    if (!source.success) {
      return apiError(
        source.error?.code ?? "NOT_FOUND",
        source.error?.message ?? "Translation source not found",
        mapErrorStatus(source.error?.code)
      );
    }
    const sourceData = source.data && typeof source.data === "object" ? source.data : void 0;
    const sourceItem = sourceData?.item && typeof sourceData.item === "object" ? sourceData.item : sourceData;
    const sourceAuthor = typeof sourceItem?.authorId === "string" ? sourceItem.authorId : "";
    const translationDenied = requireOwnerPerm(
      user,
      sourceAuthor,
      "content:edit_own",
      "content:edit_any"
    );
    if (translationDenied) return translationDenied;
  }
  const result = await emdash.handleContentCreate(collection, {
    ...body,
    authorId: user?.id,
    locale: body.locale,
    translationOf: body.translationOf
  });
  if (!result.success) return unwrapResult(result);
  if (cache.enabled) await cache.invalidate({ tags: [collection] });
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
