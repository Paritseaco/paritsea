globalThis.process ??= {};
globalThis.process.env ??= {};
import { B as BylineRepository, g as getDb, _ as __exportAll, v as validateIdentifier, c as chunks, S as SQL_BATCH_SIZE, s as sql } from "./index_BpQCdXij.mjs";
var bylines_exports = /* @__PURE__ */ __exportAll({
  getByline: () => getByline,
  getBylineBySlug: () => getBylineBySlug,
  getBylinesForEntries: () => getBylinesForEntries,
  invalidateBylineCache: () => invalidateBylineCache
});
let hasBylines = null;
function invalidateBylineCache() {
  hasBylines = null;
}
async function hasAnyBylines() {
  if (hasBylines !== null) return hasBylines;
  try {
    const db = await getDb();
    hasBylines = (await sql`
			SELECT id FROM _emdash_bylines LIMIT 1
		`.execute(db)).rows.length > 0;
  } catch (error) {
    if ((error instanceof Error ? error.message : "").includes("no such table")) hasBylines = false;
    else return false;
  }
  return hasBylines;
}
async function getByline(id) {
  return new BylineRepository(await getDb()).findById(id);
}
async function getBylineBySlug(slug) {
  return new BylineRepository(await getDb()).findBySlug(slug);
}
async function getBylinesForEntries(collection, entryIds) {
  validateIdentifier(collection, "collection");
  const result = /* @__PURE__ */ new Map();
  for (const id of entryIds) result.set(id, []);
  if (entryIds.length === 0) return result;
  if (!await hasAnyBylines()) return result;
  const db = await getDb();
  const repo = new BylineRepository(db);
  const bylinesMap = await repo.getContentBylinesMany(collection, entryIds);
  const fallbackEntryIds = [];
  const needsFallback = /* @__PURE__ */ new Map();
  for (const id of entryIds) if (!bylinesMap.has(id)) fallbackEntryIds.push(id);
  if (fallbackEntryIds.length > 0) {
    const authorMap = await getAuthorIds(db, collection, fallbackEntryIds);
    for (const [entryId, authorId] of authorMap) needsFallback.set(entryId, authorId);
  }
  const uniqueAuthorIds = [...new Set(needsFallback.values())];
  const authorBylineMap = await repo.findByUserIds(uniqueAuthorIds);
  for (const id of entryIds) {
    const explicit = bylinesMap.get(id);
    if (explicit && explicit.length > 0) {
      result.set(id, explicit.map((c) => ({
        ...c,
        source: "explicit"
      })));
      continue;
    }
    const authorId = needsFallback.get(id);
    if (authorId) {
      const fallback = authorBylineMap.get(authorId);
      if (fallback) {
        result.set(id, [{
          byline: fallback,
          sortOrder: 0,
          roleLabel: null,
          source: "inferred"
        }]);
        continue;
      }
    }
  }
  return result;
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
    for (const row of result.rows) if (row.author_id) map.set(row.id, row.author_id);
  }
  return map;
}
export {
  getByline as n,
  getBylineBySlug as r,
  bylines_exports as t
};
