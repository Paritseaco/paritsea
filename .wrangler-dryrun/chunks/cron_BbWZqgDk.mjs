globalThis.process ??= {};
globalThis.process.env ??= {};
import { s as sql } from "./index_BpQCdXij.mjs";
async function setCronTasksEnabled(db, pluginId, enabled) {
  try {
    await sql`
			UPDATE _emdash_cron_tasks
			SET enabled = ${enabled ? 1 : 0}
			WHERE plugin_id = ${pluginId}
		`.execute(db);
  } catch {
  }
}
export {
  setCronTasksEnabled as s
};
