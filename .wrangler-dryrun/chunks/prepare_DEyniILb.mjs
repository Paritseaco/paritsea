globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as requirePerm } from "./authorize_k91w4Tim.mjs";
import { a as apiError, b as apiSuccess, h as handleError } from "./error_BF6Eb6os.mjs";
import { p as parseBody, i as isParseError } from "./parse_4YX0X0po.mjs";
import { D as wpPrepareBody } from "./redirects_aSD1pqg-.mjs";
import { b as FIELD_TYPES } from "./types_DcD-7xjQ.mjs";
import { s as sanitizeSlug, c as capitalize, a as singularize } from "./analyze_C25T3GjY.mjs";
function asFieldType(value) {
  return FIELD_TYPES.includes(value) ? value : void 0;
}
const prerender = false;
const POST = async ({ request, locals }) => {
  const { emdash, user } = locals;
  if (!emdash?.db) {
    return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
  }
  const denied = requirePerm(user, "import:execute");
  if (denied) return denied;
  try {
    const body = await parseBody(request, wpPrepareBody);
    if (isParseError(body)) return body;
    const result = await prepareImport(emdash.db, body);
    return apiSuccess(result, result.success ? 200 : 400);
  } catch (error) {
    return handleError(error, "Failed to prepare import", "WXR_PREPARE_ERROR");
  }
};
async function prepareImport(db, request) {
  const { SchemaRegistry } = await import("./registry_D7l7v5Xg.mjs");
  const registry = new SchemaRegistry(db);
  const result = {
    success: true,
    collectionsCreated: [],
    fieldsCreated: [],
    errors: []
  };
  for (const postType of request.postTypes) {
    const collectionSlug = sanitizeSlug(postType.collection);
    try {
      let collection = await registry.getCollection(collectionSlug);
      if (!collection) {
        const label = capitalize(collectionSlug);
        const labelSingular = capitalize(singularize(collectionSlug));
        const isSearchable2 = ["posts", "pages", "post", "page"].includes(collectionSlug);
        const supports = ["revisions", "drafts"];
        if (isSearchable2) {
          supports.push("search");
        }
        const urlPattern = collectionSlug === "pages" ? "/{slug}" : collectionSlug === "posts" ? "/blog/{slug}" : void 0;
        collection = await registry.createCollection({
          slug: collectionSlug,
          label,
          labelSingular,
          description: `Imported from WordPress post type: ${postType.name}`,
          supports,
          urlPattern
        });
        result.collectionsCreated.push(collectionSlug);
      }
      const existingFields = await registry.listFields(collection.id);
      const existingFieldSlugs = new Set(existingFields.map((f) => f.slug));
      for (const field of postType.fields) {
        if (existingFieldSlugs.has(field.slug)) {
          continue;
        }
        const fieldType = asFieldType(field.type);
        if (!fieldType) {
          result.errors.push({
            collection: collectionSlug,
            error: `Unknown field type "${field.type}" for field "${field.slug}"`
          });
          continue;
        }
        await registry.createField(collectionSlug, {
          slug: field.slug,
          label: field.label,
          type: fieldType,
          required: field.required,
          unique: false,
          searchable: field.searchable ?? false,
          sortOrder: existingFields.length + result.fieldsCreated.length
        });
        result.fieldsCreated.push({
          collection: collectionSlug,
          field: field.slug
        });
      }
      const isSearchable = ["posts", "pages", "post", "page"].includes(collectionSlug);
      if (isSearchable) {
        const { FTSManager } = await import("./fts-manager_DfToymH_.mjs");
        const ftsManager = new FTSManager(db);
        const searchableFields = await ftsManager.getSearchableFields(collectionSlug);
        if (searchableFields.length > 0) {
          try {
            await ftsManager.enableSearch(collectionSlug);
          } catch {
          }
        }
      }
    } catch (error) {
      console.error(`Prepare error for collection "${collectionSlug}":`, error);
      result.success = false;
      result.errors.push({
        collection: collectionSlug,
        error: "Failed to prepare collection"
      });
    }
  }
  return result;
}
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
