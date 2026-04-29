globalThis.process ??= {};
globalThis.process.env ??= {};
import { g as getDb } from "./loader_12jtl1RJ.mjs";
import { SchemaRegistry } from "./registry_D7l7v5Xg.mjs";
async function getCollectionInfo(slug) {
  const db = await getDb();
  return getCollectionInfoWithDb(db, slug);
}
async function getCollectionInfoWithDb(db, slug) {
  const registry = new SchemaRegistry(db);
  return registry.getCollection(slug);
}
export {
  getCollectionInfoWithDb as a,
  getCollectionInfo as g
};
