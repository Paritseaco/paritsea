globalThis.process ??= {};
globalThis.process.env ??= {};
import { K as Kysely } from "./index_BpQCdXij.mjs";
import { g as getRequestContext } from "./request-context_CERgKQIY.mjs";
let virtualConfig;
let virtualCreateDialect;
async function loadVirtualModules() {
  if (virtualConfig === void 0) {
    const configModule = await import("./config_CG7YeZVr.mjs");
    virtualConfig = configModule.default;
  }
  if (virtualCreateDialect === void 0) {
    const dialectModule = await import("./dialect_DmJ0X_nk.mjs");
    virtualCreateDialect = dialectModule.createDialect;
  }
}
let dbInstance = null;
async function getDb() {
  const ctx = getRequestContext();
  if (ctx?.db) {
    return ctx.db;
  }
  if (!dbInstance) {
    await loadVirtualModules();
    if (!virtualConfig?.database || typeof virtualCreateDialect !== "function") {
      throw new Error(
        "EmDash database not configured. Add database config to emdash() in astro.config.mjs"
      );
    }
    const dialect = virtualCreateDialect(virtualConfig.database.config);
    dbInstance = new Kysely({ dialect });
  }
  return dbInstance;
}
export {
  getDb as g
};
