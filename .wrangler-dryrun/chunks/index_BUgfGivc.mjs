globalThis.process ??= {};
globalThis.process.env ??= {};
import { s as sql } from "./index_BpQCdXij.mjs";
import { B as BylineRepository, c as chunks, S as SQL_BATCH_SIZE } from "./byline_CkzVJag8.mjs";
import { v as validateIdentifier } from "./validate_Dvrjbe51.mjs";
import { g as getDb } from "./loader_12jtl1RJ.mjs";
let hasBylines = null;
function invalidateBylineCache() {
  hasBylines = null;
}
async function hasAnyBylines() {
  if (hasBylines !== null) return hasBylines;
  try {
    const db = await getDb();
    const result = await sql`
			SELECT id FROM _emdash_bylines LIMIT 1
		`.execute(db);
    hasBylines = result.rows.length > 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("no such table")) {
      hasBylines = false;
    } else {
      return false;
    }
  }
  return hasBylines;
}
async function getByline(id) {
  const db = await getDb();
  const repo = new BylineRepository(db);
  return repo.findById(id);
}
async function getBylineBySlug(slug) {
  const db = await getDb();
  const repo = new BylineRepository(db);
  return repo.findBySlug(slug);
}
async function getEntryBylines(collection, entryId) {
  validateIdentifier(collection, "collection");
  const db = await getDb();
  const repo = new BylineRepository(db);
  const explicit = await repo.getContentBylines(collection, entryId);
  if (explicit.length > 0) {
    return explicit.map((c) => ({ ...c, source: "explicit" }));
  }
  const authorId = await getAuthorId(db, collection, entryId);
  if (authorId) {
    const fallback = await repo.findByUserId(authorId);
    if (fallback) {
      return [{ byline: fallback, sortOrder: 0, roleLabel: null, source: "inferred" }];
    }
  }
  return [];
}
async function getBylinesForEntries(collection, entryIds) {
  validateIdentifier(collection, "collection");
  const result = /* @__PURE__ */ new Map();
  for (const id of entryIds) {
    result.set(id, []);
  }
  if (entryIds.length === 0) {
    return result;
  }
  if (!await hasAnyBylines()) {
    return result;
  }
  const db = await getDb();
  const repo = new BylineRepository(db);
  const bylinesMap = await repo.getContentBylinesMany(collection, entryIds);
  const fallbackEntryIds = [];
  const needsFallback = /* @__PURE__ */ new Map();
  for (const id of entryIds) {
    if (!bylinesMap.has(id)) {
      fallbackEntryIds.push(id);
    }
  }
  if (fallbackEntryIds.length > 0) {
    const authorMap = await getAuthorIds(db, collection, fallbackEntryIds);
    for (const [entryId, authorId] of authorMap) {
      needsFallback.set(entryId, authorId);
    }
  }
  const uniqueAuthorIds = [...new Set(needsFallback.values())];
  const authorBylineMap = await repo.findByUserIds(uniqueAuthorIds);
  for (const id of entryIds) {
    const explicit = bylinesMap.get(id);
    if (explicit && explicit.length > 0) {
      result.set(
        id,
        explicit.map((c) => ({ ...c, source: "explicit" }))
      );
      continue;
    }
    const authorId = needsFallback.get(id);
    if (authorId) {
      const fallback = authorBylineMap.get(authorId);
      if (fallback) {
        result.set(id, [{ byline: fallback, sortOrder: 0, roleLabel: null, source: "inferred" }]);
        continue;
      }
    }
  }
  return result;
}
async function getAuthorId(db, collection, entryId) {
  validateIdentifier(collection, "collection");
  const tableName = `ec_${collection}`;
  const result = await sql`
		SELECT author_id FROM ${sql.ref(tableName)}
		WHERE id = ${entryId}
		LIMIT 1
	`.execute(db);
  return result.rows[0]?.author_id ?? null;
}
async function getAuthorIds(db, collection, entryIds) {
  validateIdentifier(collection, "collection");
  const tableName = `ec_${collection}`;
  const map = /* @__PURE__ */ new Map();
  for (const chunk of chunks(entryIds, SQL_BATCH_SIZE)) {
    const result = await sql`
			SELECT id, author_id FROM ${sql.ref(tableName)}
			WHERE id IN (${sql.join(chunk.map((id) => sql`${id}`))})
		`.execute(db);
    for (const row of result.rows) {
      if (row.author_id) {
        map.set(row.id, row.author_id);
      }
    }
  }
  return map;
}
export {
  getByline,
  getBylineBySlug,
  getBylinesForEntries,
  getEntryBylines,
  invalidateBylineCache
};
