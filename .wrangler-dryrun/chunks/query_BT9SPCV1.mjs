globalThis.process ??= {};
globalThis.process.env ??= {};
import { g as getRequestContext } from "./request-context_CERgKQIY.mjs";
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
      return {
        "data-emdash-ref": JSON.stringify({ ...base, field: String(prop) })
      };
    },
    ownKeys() {
      return ["data-emdash-ref"];
    },
    getOwnPropertyDescriptor(_, prop) {
      if (prop === "data-emdash-ref") {
        return {
          configurable: true,
          enumerable: true,
          value: JSON.stringify(base)
        };
      }
      return void 0;
    }
  });
}
function createNoop() {
  return new Proxy({}, {
    get(_, prop) {
      if (typeof prop === "symbol") return void 0;
      return void 0;
    },
    ownKeys() {
      return [];
    },
    getOwnPropertyDescriptor() {
      return void 0;
    }
  });
}
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
    const desc = Object.getOwnPropertyDescriptor(value, EMDASH_EDIT);
    const meta = desc?.value;
    if (isEditFieldMeta(meta)) {
      return meta;
    }
  }
  return void 0;
}
function tagEditableFields(data, collection, id) {
  for (const [field, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.length > 0 && value[0] && typeof value[0] === "object" && "_type" in value[0]) {
      Object.defineProperty(value, EMDASH_EDIT, {
        value: { collection, id, field },
        enumerable: false,
        configurable: true
      });
    }
  }
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
  const d = entryData(entry);
  return dataStr(d, "id") || entry.id;
}
function entryEditOptions(entry) {
  const data = entryData(entry);
  const status = dataStr(data, "status", "draft");
  const draftRevisionId = dataStr(data, "draftRevisionId") || void 0;
  const liveRevisionId = dataStr(data, "liveRevisionId") || void 0;
  const hasDraft = !!draftRevisionId && draftRevisionId !== liveRevisionId;
  return { status, hasDraft };
}
async function getEmDashCollection(type, filter) {
  const { getLiveCollection } = await import("./_astro_content_DVpKsaFh.mjs");
  const ctx = getRequestContext();
  const resolvedLocale = filter?.locale ?? ctx?.locale ?? void 0;
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
  if (error) {
    return { entries: [], error, cacheHint: {} };
  }
  const isEditMode = ctx?.editMode ?? false;
  const entriesWithEdit = entries.map((entry) => {
    const dbId = entryDatabaseId(entry);
    if (isEditMode) {
      tagEditableFields(entryData(entry), type, dbId);
    }
    return {
      ...entry,
      edit: isEditMode ? createEditable(type, dbId, entryEditOptions(entry)) : createNoop()
    };
  });
  await hydrateEntryBylines(type, entriesWithEdit);
  return { entries: entriesWithEdit, nextCursor, cacheHint: cacheHint ?? {} };
}
async function hydrateEntryBylines(type, entries) {
  if (entries.length === 0) return;
  try {
    const { getBylinesForEntries } = await import("./index_BUgfGivc.mjs");
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
    if (!msg.includes("no such table")) {
      console.warn("[emdash] Failed to hydrate bylines:", msg);
    }
  }
}
function invalidateUrlPatternCache() {
}
export {
  getEditMeta,
  getEmDashCollection,
  invalidateUrlPatternCache
};
