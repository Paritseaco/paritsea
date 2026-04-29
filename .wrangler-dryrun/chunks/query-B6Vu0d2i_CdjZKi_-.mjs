globalThis.process ??= {};
globalThis.process.env ??= {};
import { a as getRequestContext, b as getI18nConfig, _ as __exportAll, i as isI18nEnabled, d as getFallbackChain } from "./index_BpQCdXij.mjs";
function createEditable(collection, id, options) {
  const base = {
    collection,
    id,
    ...options?.status && { status: options.status },
    ...options?.hasDraft && { hasDraft: true }
  };
  return new Proxy({}, {
    get(_, prop) {
      if (prop === "toJSON") return () => ({ "data-emdash-ref": JSON.stringify(base) });
      if (typeof prop === "symbol") return void 0;
      if (prop === "data-emdash-ref") return JSON.stringify(base);
      return { "data-emdash-ref": JSON.stringify({
        ...base,
        field: String(prop)
      }) };
    },
    ownKeys() {
      return ["data-emdash-ref"];
    },
    getOwnPropertyDescriptor(_, prop) {
      if (prop === "data-emdash-ref") return {
        configurable: true,
        enumerable: true,
        value: JSON.stringify(base)
      };
    }
  });
}
function createNoop() {
  return new Proxy({}, {
    get(_, prop) {
      if (typeof prop === "symbol") return void 0;
    },
    ownKeys() {
      return [];
    },
    getOwnPropertyDescriptor() {
    }
  });
}
var query_exports = /* @__PURE__ */ __exportAll({
  getEditMeta: () => getEditMeta,
  getEmDashCollection: () => getEmDashCollection,
  getEmDashEntry: () => getEmDashEntry,
  getTranslations: () => getTranslations,
  invalidateUrlPatternCache: () => invalidateUrlPatternCache,
  resolveEmDashPath: () => resolveEmDashPath
});
const COLLECTION_NAME = "_emdash";
const EMDASH_EDIT = /* @__PURE__ */ Symbol.for("__emdash");
function isEditFieldMeta(value) {
  if (typeof value !== "object" || value === null) return false;
  if (!("collection" in value) || !("id" in value) || !("field" in value)) return false;
  const { collection, id, field } = value;
  return typeof collection === "string" && typeof id === "string" && typeof field === "string";
}
function getEditMeta(value) {
  if (value && typeof value === "object") {
    const meta = Object.getOwnPropertyDescriptor(value, EMDASH_EDIT)?.value;
    if (isEditFieldMeta(meta)) return meta;
  }
}
function tagEditableFields(data, collection, id) {
  for (const [field, value] of Object.entries(data)) if (Array.isArray(value) && value.length > 0 && value[0] && typeof value[0] === "object" && "_type" in value[0]) Object.defineProperty(value, EMDASH_EDIT, {
    value: {
      collection,
      id,
      field
    },
    enumerable: false,
    configurable: true
  });
}
function dataStr(data, key, fallback = "") {
  const val = data[key];
  return typeof val === "string" ? val : fallback;
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function entryData(entry) {
  return isRecord(entry.data) ? entry.data : {};
}
function entryDatabaseId(entry) {
  return dataStr(entryData(entry), "id") || entry.id;
}
function entryEditOptions(entry) {
  const data = entryData(entry);
  const status = dataStr(data, "status", "draft");
  const draftRevisionId = dataStr(data, "draftRevisionId") || void 0;
  const liveRevisionId = dataStr(data, "liveRevisionId") || void 0;
  return {
    status,
    hasDraft: !!draftRevisionId && draftRevisionId !== liveRevisionId
  };
}
async function getEmDashCollection(type, filter) {
  const { getLiveCollection } = await import("./_astro_content_DVpKsaFh.mjs");
  const ctx = getRequestContext();
  const i18nConfig = getI18nConfig();
  const resolvedLocale = filter?.locale ?? ctx?.locale ?? (isI18nEnabled() ? i18nConfig.defaultLocale : void 0);
  const result = await getLiveCollection(COLLECTION_NAME, {
    type,
    status: filter?.status,
    limit: filter?.limit,
    cursor: filter?.cursor,
    where: filter?.where,
    orderBy: filter?.orderBy,
    locale: resolvedLocale
  });
  const { entries, error, cacheHint } = result;
  const rawCursor = Object.getOwnPropertyDescriptor(result, "nextCursor")?.value;
  const nextCursor = typeof rawCursor === "string" ? rawCursor : void 0;
  if (error) return {
    entries: [],
    error,
    cacheHint: {}
  };
  const isEditMode = ctx?.editMode ?? false;
  const entriesWithEdit = entries.map((entry) => {
    const dbId = entryDatabaseId(entry);
    if (isEditMode) tagEditableFields(entryData(entry), type, dbId);
    return {
      ...entry,
      edit: isEditMode ? createEditable(type, dbId, entryEditOptions(entry)) : createNoop()
    };
  });
  await hydrateEntryBylines(type, entriesWithEdit);
  return {
    entries: entriesWithEdit,
    nextCursor,
    cacheHint: cacheHint ?? {}
  };
}
async function getEmDashEntry(type, id, options) {
  const { getLiveEntry } = await import("./_astro_content_DVpKsaFh.mjs");
  const ctx = getRequestContext();
  const preview = ctx?.preview;
  const isEditMode = ctx?.editMode ?? false;
  const isPreviewMode = !!preview && preview.collection === type;
  const serveDrafts = isPreviewMode || isEditMode;
  const requestedLocale = options?.locale ?? ctx?.locale;
  function wrapEntry(raw) {
    const dbId = entryDatabaseId(raw);
    if (isEditMode) tagEditableFields(entryData(raw), type, dbId);
    return {
      ...raw,
      edit: isEditMode ? createEditable(type, dbId, entryEditOptions(raw)) : createNoop()
    };
  }
  function isVisible(entry) {
    const data = entryData(entry);
    const status = dataStr(data, "status");
    const scheduledAt = dataStr(data, "scheduledAt") || void 0;
    return status === "published" || !!(status === "scheduled" && scheduledAt && new Date(scheduledAt) <= /* @__PURE__ */ new Date());
  }
  const localeChain = requestedLocale && isI18nEnabled() ? getFallbackChain(requestedLocale) : [requestedLocale];
  async function successResult(wrapped, opts) {
    await hydrateEntryBylines(type, [wrapped]);
    return {
      entry: wrapped,
      isPreview: opts.isPreview,
      fallbackLocale: opts.fallbackLocale,
      cacheHint: opts.cacheHint
    };
  }
  if (serveDrafts) {
    for (let i = 0; i < localeChain.length; i++) {
      const locale = localeChain[i];
      const fallbackLocale = i > 0 ? locale : void 0;
      const { entry: baseEntry, error: baseError, cacheHint } = await getLiveEntry(COLLECTION_NAME, {
        type,
        id,
        locale
      });
      if (baseError) return {
        entry: null,
        error: baseError,
        isPreview: serveDrafts,
        cacheHint: {}
      };
      if (!baseEntry) continue;
      if (isPreviewMode && !isEditMode) {
        const dbId = entryDatabaseId(baseEntry);
        if (preview.id !== dbId && preview.id !== id) {
          if (isVisible(baseEntry)) return successResult(wrapEntry(baseEntry), {
            isPreview: false,
            fallbackLocale,
            cacheHint: cacheHint ?? {}
          });
          continue;
        }
      }
      const draftRevisionId = dataStr(entryData(baseEntry), "draftRevisionId") || void 0;
      if (draftRevisionId) {
        const { entry: draftEntry, error: draftError } = await getLiveEntry(COLLECTION_NAME, {
          type,
          id,
          revisionId: draftRevisionId,
          locale
        });
        if (!draftError && draftEntry) return successResult(wrapEntry(draftEntry), {
          isPreview: serveDrafts,
          fallbackLocale,
          cacheHint: cacheHint ?? {}
        });
      }
      return successResult(wrapEntry(baseEntry), {
        isPreview: serveDrafts,
        fallbackLocale,
        cacheHint: cacheHint ?? {}
      });
    }
    return {
      entry: null,
      isPreview: serveDrafts,
      cacheHint: {}
    };
  }
  for (let i = 0; i < localeChain.length; i++) {
    const locale = localeChain[i];
    const fallbackLocale = i > 0 ? locale : void 0;
    const { entry, error, cacheHint } = await getLiveEntry(COLLECTION_NAME, {
      type,
      id,
      locale
    });
    if (error) return {
      entry: null,
      error,
      isPreview: false,
      cacheHint: {}
    };
    if (entry && isVisible(entry)) return successResult(wrapEntry(entry), {
      isPreview: false,
      fallbackLocale,
      cacheHint: cacheHint ?? {}
    });
  }
  return {
    entry: null,
    isPreview: false,
    cacheHint: {}
  };
}
async function hydrateEntryBylines(type, entries) {
  if (entries.length === 0) return;
  try {
    const { getBylinesForEntries } = await import("./bylines-C_Wsnz4L_DVOh4-92.mjs").then((n) => n.t);
    const ids = entries.map((e) => dataStr(entryData(e), "id")).filter(Boolean);
    if (ids.length === 0) return;
    const bylinesMap = await getBylinesForEntries(type, ids);
    for (const entry of entries) {
      const data = entryData(entry);
      const dbId = dataStr(data, "id");
      if (!dbId) continue;
      const credits = bylinesMap.get(dbId) ?? [];
      data.bylines = credits;
      data.byline = credits[0]?.byline ?? null;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (!msg.includes("no such table")) console.warn("[emdash] Failed to hydrate bylines:", msg);
  }
}
async function getTranslations(type, id) {
  try {
    const db = (await import("./index_BpQCdXij.mjs").then((n) => n.gp).then((n) => n.r)).getDb;
    const dbInstance = await db();
    const { ContentRepository } = await import("./index_BpQCdXij.mjs").then((n) => n.gn).then((n) => n.n);
    const repo = new ContentRepository(dbInstance);
    const item = await repo.findByIdOrSlug(type, id);
    if (!item) return {
      translationGroup: "",
      translations: [],
      error: /* @__PURE__ */ new Error(`Content item not found: ${id}`)
    };
    const group = item.translationGroup || item.id;
    return {
      translationGroup: group,
      translations: (await repo.findTranslations(type, group)).map((t) => ({
        id: t.id,
        locale: t.locale || "en",
        slug: t.slug,
        status: t.status
      }))
    };
  } catch (error) {
    return {
      translationGroup: "",
      translations: [],
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}
const URL_PARAM_PATTERN = /\{(\w+)\}/g;
function patternToRegex(pattern) {
  const paramNames = [];
  const regexStr = pattern.replace(URL_PARAM_PATTERN, (_match, name) => {
    paramNames.push(name);
    return "([^/]+)";
  });
  return {
    regex: new RegExp(`^${regexStr}$`),
    paramNames
  };
}
let cachedUrlPatterns = null;
function invalidateUrlPatternCache() {
  cachedUrlPatterns = null;
}
async function resolveEmDashPath(path) {
  if (!cachedUrlPatterns) {
    const { getDb } = await import("./index_BpQCdXij.mjs").then((n) => n.gp).then((n) => n.r);
    const { SchemaRegistry } = await import("./index_BpQCdXij.mjs").then((n) => n.go).then((n) => n.r);
    const collections = await new SchemaRegistry(await getDb()).listCollections();
    cachedUrlPatterns = [];
    for (const collection of collections) {
      if (!collection.urlPattern) continue;
      const { regex, paramNames } = patternToRegex(collection.urlPattern);
      cachedUrlPatterns.push({
        slug: collection.slug,
        regex,
        paramNames
      });
    }
  }
  for (const pattern of cachedUrlPatterns) {
    const match = path.match(pattern.regex);
    if (!match) continue;
    const params = {};
    for (let i = 0; i < pattern.paramNames.length; i++) params[pattern.paramNames[i]] = match[i + 1];
    const slug = params.slug;
    if (!slug) continue;
    const { entry } = await getEmDashEntry(pattern.slug, slug);
    if (entry) return {
      entry,
      collection: pattern.slug,
      params
    };
  }
  return null;
}
export {
  invalidateUrlPatternCache as a,
  createEditable as c,
  getTranslations as i,
  createNoop as l,
  getEmDashCollection as n,
  query_exports as o,
  getEmDashEntry as r,
  resolveEmDashPath as s,
  getEditMeta as t
};
