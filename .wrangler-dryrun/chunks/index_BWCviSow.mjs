globalThis.process ??= {};
globalThis.process.env ??= {};
import { a1 as freeze, bh as RawNode, bi as isFunction, bj as SelectQueryNode, s as sql, ag as DEFAULT_MIGRATION_TABLE, ah as DEFAULT_MIGRATION_LOCK_TABLE, bk as isObject, a9 as isString, bl as randomString, bm as Deferred, ad as isNull, bn as isUndefined, af as isBigInt, ac as isNumber, aa as isBoolean, ae as isDate, bo as isBuffer, bp as OperationNodeTransformer, bq as isPlainObject, br as compare } from "./index_BpQCdXij.mjs";
import { bs, bt, bu, bv, bw, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bK, bL, bM, bN, bO, bP, bQ, bR, bS, bT, bU, bV, bW, bX, bY, bZ, b_, b$, c0, c1, c2, c3, a4, c4, c5, c6, a5, c7, c8, c9, ca, cb, cc, cd, ce, cf, cg, ch, ci, cj, ck, cl, cm, cn, co, cp, cq, cr, cs, ct, cu, cv, cw, cx, cy, cz, cA, cB, cC, cD, cE, cF, a3, cG, cH, cI, cJ, cK, cL, cM, cN, cO, K, cP, cQ, cR, cS, cT, cU, cV, a8, cW, cX, cY, cZ, c_, c$, d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, da, db, ab, dc, dd, de, df, dg, dh, a2, di, dj, dk, dl, dm, a7, dn, dp, dq, dr, ds, dt, du, dv, dw, a6, dx, dy, dz, dA, dB, dC, dD, dE, dF, dG, dH, dI, dJ, dK, dL, dM, dN, dO, dP, dQ, dR, dS, dT, dU, dV, dW, dX, dY, dZ, d_, d$, e0, e1, e2, e3, e4, e5, e6, e7, e8, e9 } from "./index_BpQCdXij.mjs";
import { a as SqliteQueryCompiler, S as SqliteAdapter, b as SqliteIntrospector, D as DefaultQueryCompiler, c as DialectAdapterBase } from "./sqlite-adapter_BcahEUaI.mjs";
import { O } from "./sqlite-adapter_BcahEUaI.mjs";
const CompiledQuery = freeze({
  raw(sql2, parameters = []) {
    return freeze({
      sql: sql2,
      query: RawNode.createWithSql(sql2),
      parameters: freeze(parameters)
    });
  }
});
class DummyDriver {
  async init() {
  }
  async acquireConnection() {
    return new DummyConnection();
  }
  async beginTransaction() {
  }
  async commitTransaction() {
  }
  async rollbackTransaction() {
  }
  async releaseConnection() {
  }
  async destroy() {
  }
}
class DummyConnection {
  async executeQuery() {
    return {
      rows: []
    };
  }
  async *streamQuery() {
  }
}
class SqliteDriver {
  #config;
  #connectionMutex = new ConnectionMutex();
  #db;
  #connection;
  constructor(config) {
    this.#config = freeze({ ...config });
  }
  async init() {
    this.#db = isFunction(this.#config.database) ? await this.#config.database() : this.#config.database;
    this.#connection = new SqliteConnection(this.#db);
    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.#connection);
    }
  }
  async acquireConnection() {
    await this.#connectionMutex.lock();
    return this.#connection;
  }
  async beginTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("begin"));
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }
  async releaseConnection() {
    this.#connectionMutex.unlock();
  }
  async destroy() {
    this.#db?.close();
  }
}
class SqliteConnection {
  #db;
  constructor(db2) {
    this.#db = db2;
  }
  executeQuery(compiledQuery) {
    const { sql: sql2, parameters } = compiledQuery;
    const stmt = this.#db.prepare(sql2);
    if (stmt.reader) {
      return Promise.resolve({
        rows: stmt.all(parameters)
      });
    } else {
      const { changes, lastInsertRowid } = stmt.run(parameters);
      const numAffectedRows = changes !== void 0 && changes !== null ? BigInt(changes) : void 0;
      return Promise.resolve({
        // TODO: remove.
        numUpdatedOrDeletedRows: numAffectedRows,
        numAffectedRows,
        insertId: lastInsertRowid !== void 0 && lastInsertRowid !== null ? BigInt(lastInsertRowid) : void 0,
        rows: []
      });
    }
  }
  async *streamQuery(compiledQuery, _chunkSize) {
    const { sql: sql2, parameters, query } = compiledQuery;
    const stmt = this.#db.prepare(sql2);
    if (SelectQueryNode.is(query)) {
      const iter = stmt.iterate(parameters);
      for (const row of iter) {
        yield {
          rows: [row]
        };
      }
    } else {
      throw new Error("Sqlite driver only supports streaming of select queries");
    }
  }
}
class ConnectionMutex {
  #promise;
  #resolve;
  async lock() {
    while (this.#promise) {
      await this.#promise;
    }
    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve;
    });
  }
  unlock() {
    const resolve = this.#resolve;
    this.#promise = void 0;
    this.#resolve = void 0;
    resolve?.();
  }
}
class SqliteDialect {
  #config;
  constructor(config) {
    this.#config = freeze({ ...config });
  }
  createDriver() {
    return new SqliteDriver(this.#config);
  }
  createQueryCompiler() {
    return new SqliteQueryCompiler();
  }
  createAdapter() {
    return new SqliteAdapter();
  }
  createIntrospector(db2) {
    return new SqliteIntrospector(db2);
  }
}
const ID_WRAP_REGEX$1 = /"/g;
class PostgresQueryCompiler extends DefaultQueryCompiler {
  sanitizeIdentifier(identifier) {
    return identifier.replace(ID_WRAP_REGEX$1, '""');
  }
}
class PostgresIntrospector {
  #db;
  constructor(db2) {
    this.#db = db2;
  }
  async getSchemas() {
    let rawSchemas = await this.#db.selectFrom("pg_catalog.pg_namespace").select("nspname").$castTo().execute();
    return rawSchemas.map((it) => ({ name: it.nspname }));
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    let query = this.#db.selectFrom("pg_catalog.pg_attribute as a").innerJoin("pg_catalog.pg_class as c", "a.attrelid", "c.oid").innerJoin("pg_catalog.pg_namespace as ns", "c.relnamespace", "ns.oid").innerJoin("pg_catalog.pg_type as typ", "a.atttypid", "typ.oid").innerJoin("pg_catalog.pg_namespace as dtns", "typ.typnamespace", "dtns.oid").select([
      "a.attname as column",
      "a.attnotnull as not_null",
      "a.atthasdef as has_default",
      "c.relname as table",
      "c.relkind as table_type",
      "ns.nspname as schema",
      "typ.typname as type",
      "dtns.nspname as type_schema",
      sql`col_description(a.attrelid, a.attnum)`.as("column_description"),
      // Detect if the column is auto incrementing by finding the sequence
      // that is created for `serial` and `bigserial` columns.
      this.#db.selectFrom("pg_class").select(sql`true`.as("auto_incrementing")).whereRef("relnamespace", "=", "c.relnamespace").where("relkind", "=", "S").where("relname", "=", sql`c.relname || '_' || a.attname || '_seq'`).as("auto_incrementing")
    ]).where((eb) => eb.or([
      eb("c.relkind", "=", "r"),
      eb("c.relkind", "=", "v"),
      eb("c.relkind", "=", "p")
    ])).where("ns.nspname", "!~", "^pg_").where("ns.nspname", "!=", "information_schema").where("a.attnum", ">=", 0).where("a.attisdropped", "!=", true).orderBy("ns.nspname").orderBy("c.relname").orderBy("a.attnum").$castTo();
    if (!options.withInternalKyselyTables) {
      query = query.where("c.relname", "!=", DEFAULT_MIGRATION_TABLE).where("c.relname", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    }
    const rawColumns = await query.execute();
    return this.#parseTableMetadata(rawColumns);
  }
  async getMetadata(options) {
    return {
      tables: await this.getTables(options)
    };
  }
  #parseTableMetadata(columns) {
    return columns.reduce((tables, it) => {
      let table = tables.find((tbl) => tbl.name === it.table && tbl.schema === it.schema);
      if (!table) {
        table = freeze({
          name: it.table,
          isView: it.table_type === "v",
          schema: it.schema,
          columns: []
        });
        tables.push(table);
      }
      table.columns.push(freeze({
        name: it.column,
        dataType: it.type,
        dataTypeSchema: it.type_schema,
        isNullable: !it.not_null,
        isAutoIncrementing: !!it.auto_incrementing,
        hasDefaultValue: it.has_default,
        comment: it.column_description ?? void 0
      }));
      return tables;
    }, []);
  }
}
const LOCK_ID$1 = BigInt("3853314791062309107");
class PostgresAdapter extends DialectAdapterBase {
  get supportsTransactionalDdl() {
    return true;
  }
  get supportsReturning() {
    return true;
  }
  async acquireMigrationLock(db2, _opt) {
    await sql`select pg_advisory_xact_lock(${sql.lit(LOCK_ID$1)})`.execute(db2);
  }
  async releaseMigrationLock(_db, _opt) {
  }
}
function extendStackTrace(err, stackError) {
  if (isStackHolder(err) && stackError.stack) {
    const stackExtension = stackError.stack.split("\n").slice(1).join("\n");
    err.stack += `
${stackExtension}`;
    return err;
  }
  return err;
}
function isStackHolder(obj) {
  return isObject(obj) && isString(obj.stack);
}
const PRIVATE_RELEASE_METHOD$2 = /* @__PURE__ */ Symbol();
class MysqlDriver {
  #config;
  #connections = /* @__PURE__ */ new WeakMap();
  #pool;
  constructor(configOrPool) {
    this.#config = freeze({ ...configOrPool });
  }
  async init() {
    this.#pool = isFunction(this.#config.pool) ? await this.#config.pool() : this.#config.pool;
  }
  async acquireConnection() {
    const rawConnection = await this.#acquireConnection();
    let connection = this.#connections.get(rawConnection);
    if (!connection) {
      connection = new MysqlConnection(rawConnection);
      this.#connections.set(rawConnection, connection);
      if (this.#config?.onCreateConnection) {
        await this.#config.onCreateConnection(connection);
      }
    }
    if (this.#config?.onReserveConnection) {
      await this.#config.onReserveConnection(connection);
    }
    return connection;
  }
  async #acquireConnection() {
    return new Promise((resolve, reject) => {
      this.#pool.getConnection(async (err, rawConnection) => {
        if (err) {
          reject(err);
        } else {
          resolve(rawConnection);
        }
      });
    });
  }
  async beginTransaction(connection, settings) {
    if (settings.isolationLevel) {
      await connection.executeQuery(CompiledQuery.raw(`set transaction isolation level ${settings.isolationLevel}`));
    }
    await connection.executeQuery(CompiledQuery.raw("begin"));
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }
  async releaseConnection(connection) {
    connection[PRIVATE_RELEASE_METHOD$2]();
  }
  async destroy() {
    return new Promise((resolve, reject) => {
      this.#pool.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
function isOkPacket(obj) {
  return isObject(obj) && "insertId" in obj && "affectedRows" in obj;
}
class MysqlConnection {
  #rawConnection;
  constructor(rawConnection) {
    this.#rawConnection = rawConnection;
  }
  async executeQuery(compiledQuery) {
    try {
      const result = await this.#executeQuery(compiledQuery);
      if (isOkPacket(result)) {
        const { insertId, affectedRows, changedRows } = result;
        const numAffectedRows = affectedRows !== void 0 && affectedRows !== null ? BigInt(affectedRows) : void 0;
        const numChangedRows = changedRows !== void 0 && changedRows !== null ? BigInt(changedRows) : void 0;
        return {
          insertId: insertId !== void 0 && insertId !== null && insertId.toString() !== "0" ? BigInt(insertId) : void 0,
          // TODO: remove.
          numUpdatedOrDeletedRows: numAffectedRows,
          numAffectedRows,
          numChangedRows,
          rows: []
        };
      } else if (Array.isArray(result)) {
        return {
          rows: result
        };
      }
      return {
        rows: []
      };
    } catch (err) {
      throw extendStackTrace(err, new Error());
    }
  }
  #executeQuery(compiledQuery) {
    return new Promise((resolve, reject) => {
      this.#rawConnection.query(compiledQuery.sql, compiledQuery.parameters, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  async *streamQuery(compiledQuery, _chunkSize) {
    const stream = this.#rawConnection.query(compiledQuery.sql, compiledQuery.parameters).stream({
      objectMode: true
    });
    try {
      for await (const row of stream) {
        yield {
          rows: [row]
        };
      }
    } catch (ex) {
      if (ex && typeof ex === "object" && "code" in ex && // @ts-ignore
      ex.code === "ERR_STREAM_PREMATURE_CLOSE") {
        return;
      }
      throw ex;
    }
  }
  [PRIVATE_RELEASE_METHOD$2]() {
    this.#rawConnection.release();
  }
}
const ID_WRAP_REGEX = /`/g;
class MysqlQueryCompiler extends DefaultQueryCompiler {
  getCurrentParameterPlaceholder() {
    return "?";
  }
  getLeftExplainOptionsWrapper() {
    return "";
  }
  getExplainOptionAssignment() {
    return "=";
  }
  getExplainOptionsDelimiter() {
    return " ";
  }
  getRightExplainOptionsWrapper() {
    return "";
  }
  getLeftIdentifierWrapper() {
    return "`";
  }
  getRightIdentifierWrapper() {
    return "`";
  }
  sanitizeIdentifier(identifier) {
    return identifier.replace(ID_WRAP_REGEX, "``");
  }
  visitCreateIndex(node) {
    this.append("create ");
    if (node.unique) {
      this.append("unique ");
    }
    this.append("index ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.name);
    if (node.using) {
      this.append(" using ");
      this.visitNode(node.using);
    }
    if (node.table) {
      this.append(" on ");
      this.visitNode(node.table);
    }
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
  }
}
class MysqlIntrospector {
  #db;
  constructor(db2) {
    this.#db = db2;
  }
  async getSchemas() {
    let rawSchemas = await this.#db.selectFrom("information_schema.schemata").select("schema_name").$castTo().execute();
    return rawSchemas.map((it) => ({ name: it.SCHEMA_NAME }));
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    let query = this.#db.selectFrom("information_schema.columns as columns").innerJoin("information_schema.tables as tables", (b) => b.onRef("columns.TABLE_CATALOG", "=", "tables.TABLE_CATALOG").onRef("columns.TABLE_SCHEMA", "=", "tables.TABLE_SCHEMA").onRef("columns.TABLE_NAME", "=", "tables.TABLE_NAME")).select([
      "columns.COLUMN_NAME",
      "columns.COLUMN_DEFAULT",
      "columns.TABLE_NAME",
      "columns.TABLE_SCHEMA",
      "tables.TABLE_TYPE",
      "columns.IS_NULLABLE",
      "columns.DATA_TYPE",
      "columns.EXTRA",
      "columns.COLUMN_COMMENT"
    ]).where("columns.TABLE_SCHEMA", "=", sql`database()`).orderBy("columns.TABLE_NAME").orderBy("columns.ORDINAL_POSITION").$castTo();
    if (!options.withInternalKyselyTables) {
      query = query.where("columns.TABLE_NAME", "!=", DEFAULT_MIGRATION_TABLE).where("columns.TABLE_NAME", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    }
    const rawColumns = await query.execute();
    return this.#parseTableMetadata(rawColumns);
  }
  async getMetadata(options) {
    return {
      tables: await this.getTables(options)
    };
  }
  #parseTableMetadata(columns) {
    return columns.reduce((tables, it) => {
      let table = tables.find((tbl) => tbl.name === it.TABLE_NAME);
      if (!table) {
        table = freeze({
          name: it.TABLE_NAME,
          isView: it.TABLE_TYPE === "VIEW",
          schema: it.TABLE_SCHEMA,
          columns: []
        });
        tables.push(table);
      }
      table.columns.push(freeze({
        name: it.COLUMN_NAME,
        dataType: it.DATA_TYPE,
        isNullable: it.IS_NULLABLE === "YES",
        isAutoIncrementing: it.EXTRA.toLowerCase().includes("auto_increment"),
        hasDefaultValue: it.COLUMN_DEFAULT !== null,
        comment: it.COLUMN_COMMENT === "" ? void 0 : it.COLUMN_COMMENT
      }));
      return tables;
    }, []);
  }
}
const LOCK_ID = "ea586330-2c93-47c8-908d-981d9d270f9d";
const LOCK_TIMEOUT_SECONDS = 60 * 60;
class MysqlAdapter extends DialectAdapterBase {
  get supportsTransactionalDdl() {
    return false;
  }
  get supportsReturning() {
    return false;
  }
  async acquireMigrationLock(db2, _opt) {
    await sql`select get_lock(${sql.lit(LOCK_ID)}, ${sql.lit(LOCK_TIMEOUT_SECONDS)})`.execute(db2);
  }
  async releaseMigrationLock(db2, _opt) {
    await sql`select release_lock(${sql.lit(LOCK_ID)})`.execute(db2);
  }
}
class MysqlDialect {
  #config;
  constructor(config) {
    this.#config = config;
  }
  createDriver() {
    return new MysqlDriver(this.#config);
  }
  createQueryCompiler() {
    return new MysqlQueryCompiler();
  }
  createAdapter() {
    return new MysqlAdapter();
  }
  createIntrospector(db2) {
    return new MysqlIntrospector(db2);
  }
}
const PRIVATE_RELEASE_METHOD$1 = /* @__PURE__ */ Symbol();
class PostgresDriver {
  #config;
  #connections = /* @__PURE__ */ new WeakMap();
  #pool;
  constructor(config) {
    this.#config = freeze({ ...config });
  }
  async init() {
    this.#pool = isFunction(this.#config.pool) ? await this.#config.pool() : this.#config.pool;
  }
  async acquireConnection() {
    const client = await this.#pool.connect();
    let connection = this.#connections.get(client);
    if (!connection) {
      connection = new PostgresConnection(client, {
        cursor: this.#config.cursor ?? null
      });
      this.#connections.set(client, connection);
      if (this.#config.onCreateConnection) {
        await this.#config.onCreateConnection(connection);
      }
    }
    if (this.#config.onReserveConnection) {
      await this.#config.onReserveConnection(connection);
    }
    return connection;
  }
  async beginTransaction(connection, settings) {
    if (settings.isolationLevel) {
      await connection.executeQuery(CompiledQuery.raw(`start transaction isolation level ${settings.isolationLevel}`));
    } else {
      await connection.executeQuery(CompiledQuery.raw("begin"));
    }
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }
  async releaseConnection(connection) {
    connection[PRIVATE_RELEASE_METHOD$1]();
  }
  async destroy() {
    if (this.#pool) {
      const pool = this.#pool;
      this.#pool = void 0;
      await pool.end();
    }
  }
}
class PostgresConnection {
  #client;
  #options;
  constructor(client, options) {
    this.#client = client;
    this.#options = options;
  }
  async executeQuery(compiledQuery) {
    try {
      const result = await this.#client.query(compiledQuery.sql, [
        ...compiledQuery.parameters
      ]);
      if (result.command === "INSERT" || result.command === "UPDATE" || result.command === "DELETE" || result.command === "MERGE") {
        const numAffectedRows = BigInt(result.rowCount);
        return {
          // TODO: remove.
          numUpdatedOrDeletedRows: numAffectedRows,
          numAffectedRows,
          rows: result.rows ?? []
        };
      }
      return {
        rows: result.rows ?? []
      };
    } catch (err) {
      throw extendStackTrace(err, new Error());
    }
  }
  async *streamQuery(compiledQuery, chunkSize) {
    if (!this.#options.cursor) {
      throw new Error("'cursor' is not present in your postgres dialect config. It's required to make streaming work in postgres.");
    }
    if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
      throw new Error("chunkSize must be a positive integer");
    }
    const cursor = this.#client.query(new this.#options.cursor(compiledQuery.sql, compiledQuery.parameters.slice()));
    try {
      while (true) {
        const rows = await cursor.read(chunkSize);
        if (rows.length === 0) {
          break;
        }
        yield {
          rows
        };
      }
    } finally {
      await cursor.close();
    }
  }
  [PRIVATE_RELEASE_METHOD$1]() {
    this.#client.release();
  }
}
class PostgresDialect {
  #config;
  constructor(config) {
    this.#config = config;
  }
  createDriver() {
    return new PostgresDriver(this.#config);
  }
  createQueryCompiler() {
    return new PostgresQueryCompiler();
  }
  createAdapter() {
    return new PostgresAdapter();
  }
  createIntrospector(db2) {
    return new PostgresIntrospector(db2);
  }
}
class MssqlAdapter extends DialectAdapterBase {
  get supportsCreateIfNotExists() {
    return false;
  }
  get supportsTransactionalDdl() {
    return true;
  }
  get supportsOutput() {
    return true;
  }
  async acquireMigrationLock(db2) {
    await sql`exec sp_getapplock @DbPrincipal = ${sql.lit("dbo")}, @Resource = ${sql.lit(DEFAULT_MIGRATION_TABLE)}, @LockMode = ${sql.lit("Exclusive")}`.execute(db2);
  }
  async releaseMigrationLock() {
  }
}
const PRIVATE_RELEASE_METHOD = /* @__PURE__ */ Symbol();
const PRIVATE_DESTROY_METHOD = /* @__PURE__ */ Symbol();
class MssqlDriver {
  #config;
  #pool;
  constructor(config) {
    this.#config = freeze({ ...config });
    const { tarn, tedious } = this.#config;
    const { validateConnections, ...poolOptions } = tarn.options;
    this.#pool = new tarn.Pool({
      ...poolOptions,
      create: async () => {
        const connection = await tedious.connectionFactory();
        return await new MssqlConnection(connection, tedious).connect();
      },
      destroy: async (connection) => {
        await connection[PRIVATE_DESTROY_METHOD]();
      },
      // @ts-ignore `tarn` accepts a function that returns a promise here, but
      // the types are not aligned and it type errors.
      validate: validateConnections === false ? void 0 : (connection) => connection.validate()
    });
  }
  async init() {
  }
  async acquireConnection() {
    return await this.#pool.acquire().promise;
  }
  async beginTransaction(connection, settings) {
    await connection.beginTransaction(settings);
  }
  async commitTransaction(connection) {
    await connection.commitTransaction();
  }
  async rollbackTransaction(connection) {
    await connection.rollbackTransaction();
  }
  async releaseConnection(connection) {
    await connection[PRIVATE_RELEASE_METHOD]();
    this.#pool.release(connection);
  }
  async destroy() {
    await this.#pool.destroy();
  }
}
class MssqlConnection {
  #connection;
  #tedious;
  constructor(connection, tedious) {
    this.#connection = connection;
    this.#tedious = tedious;
    this.#connection.on("error", console.error);
    this.#connection.once("end", () => {
      this.#connection.off("error", console.error);
    });
  }
  async beginTransaction(settings) {
    const { isolationLevel } = settings;
    await new Promise((resolve, reject) => this.#connection.beginTransaction((error) => {
      if (error)
        reject(error);
      else
        resolve(void 0);
    }, isolationLevel ? randomString(8) : void 0, isolationLevel ? this.#getTediousIsolationLevel(isolationLevel) : void 0));
  }
  async commitTransaction() {
    await new Promise((resolve, reject) => this.#connection.commitTransaction((error) => {
      if (error)
        reject(error);
      else
        resolve(void 0);
    }));
  }
  async connect() {
    await new Promise((resolve, reject) => {
      this.#connection.connect((error) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(void 0);
        }
      });
    });
    return this;
  }
  async executeQuery(compiledQuery) {
    try {
      const deferred = new Deferred();
      const request = new MssqlRequest({
        compiledQuery,
        tedious: this.#tedious,
        onDone: deferred
      });
      this.#connection.execSql(request.request);
      const { rowCount, rows } = await deferred.promise;
      return {
        numAffectedRows: rowCount !== void 0 ? BigInt(rowCount) : void 0,
        rows
      };
    } catch (err) {
      throw extendStackTrace(err, new Error());
    }
  }
  async rollbackTransaction() {
    await new Promise((resolve, reject) => this.#connection.rollbackTransaction((error) => {
      if (error)
        reject(error);
      else
        resolve(void 0);
    }));
  }
  async *streamQuery(compiledQuery, chunkSize) {
    if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
      throw new Error("chunkSize must be a positive integer");
    }
    const request = new MssqlRequest({
      compiledQuery,
      streamChunkSize: chunkSize,
      tedious: this.#tedious
    });
    this.#connection.execSql(request.request);
    try {
      while (true) {
        const rows = await request.readChunk();
        if (rows.length === 0) {
          break;
        }
        yield { rows };
        if (rows.length < chunkSize) {
          break;
        }
      }
    } finally {
      await this.#cancelRequest(request);
    }
  }
  async validate() {
    try {
      const deferred = new Deferred();
      const request = new MssqlRequest({
        compiledQuery: CompiledQuery.raw("select 1"),
        onDone: deferred,
        tedious: this.#tedious
      });
      this.#connection.execSql(request.request);
      await deferred.promise;
      return true;
    } catch {
      return false;
    }
  }
  #getTediousIsolationLevel(isolationLevel) {
    const { ISOLATION_LEVEL } = this.#tedious;
    const mapper = {
      "read committed": ISOLATION_LEVEL.READ_COMMITTED,
      "read uncommitted": ISOLATION_LEVEL.READ_UNCOMMITTED,
      "repeatable read": ISOLATION_LEVEL.REPEATABLE_READ,
      serializable: ISOLATION_LEVEL.SERIALIZABLE,
      snapshot: ISOLATION_LEVEL.SNAPSHOT
    };
    const tediousIsolationLevel = mapper[isolationLevel];
    if (tediousIsolationLevel === void 0) {
      throw new Error(`Unknown isolation level: ${isolationLevel}`);
    }
    return tediousIsolationLevel;
  }
  #cancelRequest(request) {
    return new Promise((resolve) => {
      request.request.once("requestCompleted", resolve);
      const wasCanceled = this.#connection.cancel();
      if (!wasCanceled) {
        request.request.off("requestCompleted", resolve);
        resolve(void 0);
      }
    });
  }
  async [PRIVATE_RELEASE_METHOD]() {
    if (this.#tedious.resetConnectionOnRelease !== false) {
      await new Promise((resolve, reject) => {
        this.#connection.reset((error) => {
          if (error)
            reject(error);
          else
            resolve(void 0);
        });
      });
    }
  }
  [PRIVATE_DESTROY_METHOD]() {
    return new Promise((resolve) => {
      this.#connection.once("end", () => {
        resolve(void 0);
      });
      this.#connection.close();
    });
  }
}
class MssqlRequest {
  #request;
  #rows;
  #streamChunkSize;
  #subscribers;
  #tedious;
  #error;
  #rowCount;
  constructor(props) {
    const { compiledQuery, onDone, streamChunkSize, tedious } = props;
    this.#rows = [];
    this.#streamChunkSize = streamChunkSize;
    this.#subscribers = {};
    this.#tedious = tedious;
    if (onDone) {
      const subscriptionKey = "onDone";
      this.#subscribers[subscriptionKey] = (event, error) => {
        if (event === "chunkReady") {
          return;
        }
        delete this.#subscribers[subscriptionKey];
        if (event === "error") {
          onDone.reject(error);
        } else {
          onDone.resolve({
            rowCount: this.#rowCount,
            rows: this.#rows
          });
        }
      };
    }
    this.#request = new this.#tedious.Request(compiledQuery.sql, (err, rowCount) => {
      if (err) {
        Object.values(this.#subscribers).forEach((subscriber) => subscriber("error", err instanceof AggregateError ? err.errors : err));
      } else {
        this.#rowCount = rowCount;
      }
    });
    this.#addParametersToRequest(compiledQuery.parameters);
    this.#attachListeners();
  }
  get request() {
    return this.#request;
  }
  readChunk() {
    const subscriptionKey = this.readChunk.name;
    return new Promise((resolve, reject) => {
      this.#subscribers[subscriptionKey] = (event, error) => {
        delete this.#subscribers[subscriptionKey];
        if (event === "error") {
          reject(error);
        } else {
          resolve(this.#rows.splice(0, this.#streamChunkSize));
        }
      };
      this.#request.resume();
    });
  }
  #addParametersToRequest(parameters) {
    for (let i = 0; i < parameters.length; i++) {
      const parameter = parameters[i];
      this.#request.addParameter(String(i + 1), this.#getTediousDataType(parameter), parameter);
    }
  }
  #attachListeners() {
    const pauseAndEmitChunkReady = this.#streamChunkSize ? () => {
      if (this.#streamChunkSize <= this.#rows.length) {
        this.#request.pause();
        Object.values(this.#subscribers).forEach((subscriber) => subscriber("chunkReady"));
      }
    } : () => {
    };
    const rowListener = (columns) => {
      const row = {};
      for (const column of columns) {
        row[column.metadata.colName] = column.value;
      }
      this.#rows.push(row);
      pauseAndEmitChunkReady();
    };
    this.#request.on("row", rowListener);
    this.#request.once("requestCompleted", () => {
      Object.values(this.#subscribers).forEach((subscriber) => subscriber("completed"));
      this.#request.off("row", rowListener);
    });
  }
  #getTediousDataType(value) {
    if (isNull(value) || isUndefined(value) || isString(value)) {
      return this.#tedious.TYPES.NVarChar;
    }
    if (isBigInt(value) || isNumber(value) && value % 1 === 0) {
      if (value < -2147483648 || value > 2147483647) {
        return this.#tedious.TYPES.BigInt;
      } else {
        return this.#tedious.TYPES.Int;
      }
    }
    if (isNumber(value)) {
      return this.#tedious.TYPES.Float;
    }
    if (isBoolean(value)) {
      return this.#tedious.TYPES.Bit;
    }
    if (isDate(value)) {
      return this.#tedious.TYPES.DateTime;
    }
    if (isBuffer(value)) {
      return this.#tedious.TYPES.VarBinary;
    }
    return this.#tedious.TYPES.NVarChar;
  }
}
class MssqlIntrospector {
  #db;
  constructor(db2) {
    this.#db = db2;
  }
  async getSchemas() {
    return await this.#db.selectFrom("sys.schemas").select("name").execute();
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    const rawColumns = await this.#db.selectFrom("sys.tables as tables").leftJoin("sys.schemas as table_schemas", "table_schemas.schema_id", "tables.schema_id").innerJoin("sys.columns as columns", "columns.object_id", "tables.object_id").innerJoin("sys.types as types", "types.user_type_id", "columns.user_type_id").leftJoin("sys.schemas as type_schemas", "type_schemas.schema_id", "types.schema_id").leftJoin("sys.extended_properties as comments", (join) => join.onRef("comments.major_id", "=", "tables.object_id").onRef("comments.minor_id", "=", "columns.column_id").on("comments.name", "=", "MS_Description")).$if(!options.withInternalKyselyTables, (qb) => qb.where("tables.name", "!=", DEFAULT_MIGRATION_TABLE).where("tables.name", "!=", DEFAULT_MIGRATION_LOCK_TABLE)).select([
      "tables.name as table_name",
      (eb) => eb.ref("tables.type").$castTo().as("table_type"),
      "table_schemas.name as table_schema_name",
      "columns.default_object_id as column_default_object_id",
      "columns.generated_always_type_desc as column_generated_always_type",
      "columns.is_computed as column_is_computed",
      "columns.is_identity as column_is_identity",
      "columns.is_nullable as column_is_nullable",
      "columns.is_rowguidcol as column_is_rowguidcol",
      "columns.name as column_name",
      "types.is_nullable as type_is_nullable",
      "types.name as type_name",
      "type_schemas.name as type_schema_name",
      "comments.value as column_comment"
    ]).unionAll(this.#db.selectFrom("sys.views as views").leftJoin("sys.schemas as view_schemas", "view_schemas.schema_id", "views.schema_id").innerJoin("sys.columns as columns", "columns.object_id", "views.object_id").innerJoin("sys.types as types", "types.user_type_id", "columns.user_type_id").leftJoin("sys.schemas as type_schemas", "type_schemas.schema_id", "types.schema_id").leftJoin("sys.extended_properties as comments", (join) => join.onRef("comments.major_id", "=", "views.object_id").onRef("comments.minor_id", "=", "columns.column_id").on("comments.name", "=", "MS_Description")).select([
      "views.name as table_name",
      "views.type as table_type",
      "view_schemas.name as table_schema_name",
      "columns.default_object_id as column_default_object_id",
      "columns.generated_always_type_desc as column_generated_always_type",
      "columns.is_computed as column_is_computed",
      "columns.is_identity as column_is_identity",
      "columns.is_nullable as column_is_nullable",
      "columns.is_rowguidcol as column_is_rowguidcol",
      "columns.name as column_name",
      "types.is_nullable as type_is_nullable",
      "types.name as type_name",
      "type_schemas.name as type_schema_name",
      "comments.value as column_comment"
    ])).orderBy("table_schema_name").orderBy("table_name").orderBy("column_name").execute();
    const tableDictionary = {};
    for (const rawColumn of rawColumns) {
      const key = `${rawColumn.table_schema_name}.${rawColumn.table_name}`;
      const table = tableDictionary[key] = tableDictionary[key] || freeze({
        columns: [],
        isView: rawColumn.table_type === "V ",
        name: rawColumn.table_name,
        schema: rawColumn.table_schema_name ?? void 0
      });
      table.columns.push(freeze({
        dataType: rawColumn.type_name,
        dataTypeSchema: rawColumn.type_schema_name ?? void 0,
        hasDefaultValue: rawColumn.column_default_object_id > 0 || rawColumn.column_generated_always_type !== "NOT_APPLICABLE" || rawColumn.column_is_identity || rawColumn.column_is_computed || rawColumn.column_is_rowguidcol,
        isAutoIncrementing: rawColumn.column_is_identity,
        isNullable: rawColumn.column_is_nullable && rawColumn.type_is_nullable,
        name: rawColumn.column_name,
        comment: rawColumn.column_comment ?? void 0
      }));
    }
    return Object.values(tableDictionary);
  }
  async getMetadata(options) {
    return {
      tables: await this.getTables(options)
    };
  }
}
class MssqlQueryCompiler extends DefaultQueryCompiler {
  getCurrentParameterPlaceholder() {
    return `@${this.numParameters}`;
  }
  visitOffset(node) {
    super.visitOffset(node);
    this.append(" rows");
  }
  // mssql allows multi-column alterations in a single statement,
  // but you can only use the command keyword/s once.
  // it also doesn't support multiple kinds of commands in the same
  // alter table statement, but we compile that anyway for the sake
  // of WYSIWYG.
  compileColumnAlterations(columnAlterations) {
    const nodesByKind = {};
    for (const columnAlteration of columnAlterations) {
      if (!nodesByKind[columnAlteration.kind]) {
        nodesByKind[columnAlteration.kind] = [];
      }
      nodesByKind[columnAlteration.kind].push(columnAlteration);
    }
    let first = true;
    if (nodesByKind.AddColumnNode) {
      this.append("add ");
      this.compileList(nodesByKind.AddColumnNode);
      first = false;
    }
    if (nodesByKind.AlterColumnNode) {
      if (!first)
        this.append(", ");
      this.compileList(nodesByKind.AlterColumnNode);
    }
    if (nodesByKind.DropColumnNode) {
      if (!first)
        this.append(", ");
      this.append("drop column ");
      this.compileList(nodesByKind.DropColumnNode);
    }
    if (nodesByKind.ModifyColumnNode) {
      if (!first)
        this.append(", ");
      this.compileList(nodesByKind.ModifyColumnNode);
    }
    if (nodesByKind.RenameColumnNode) {
      if (!first)
        this.append(", ");
      this.compileList(nodesByKind.RenameColumnNode);
    }
  }
  visitAddColumn(node) {
    this.visitNode(node.column);
  }
  visitDropColumn(node) {
    this.visitNode(node.column);
  }
  visitMergeQuery(node) {
    super.visitMergeQuery(node);
    this.append(";");
  }
  announcesNewColumnDataType() {
    return false;
  }
}
class MssqlDialect {
  #config;
  constructor(config) {
    this.#config = config;
  }
  createDriver() {
    return new MssqlDriver(this.#config);
  }
  createQueryCompiler() {
    return new MssqlQueryCompiler();
  }
  createAdapter() {
    return new MssqlAdapter();
  }
  createIntrospector(db2) {
    return new MssqlIntrospector(db2);
  }
}
class FileMigrationProvider {
  #props;
  constructor(props) {
    this.#props = props;
  }
  async getMigrations() {
    const migrations = {};
    const files = await this.#props.fs.readdir(this.#props.migrationFolder);
    for (const fileName of files) {
      if (fileName.endsWith(".js") || fileName.endsWith(".ts") && !fileName.endsWith(".d.ts") || fileName.endsWith(".mjs") || fileName.endsWith(".mts") && !fileName.endsWith(".d.mts")) {
        const migration = await import(
          /* webpackIgnore: true */
          this.#props.path.join(this.#props.migrationFolder, fileName)
        );
        const migrationKey = fileName.substring(0, fileName.lastIndexOf("."));
        if (isMigration(migration?.default)) {
          migrations[migrationKey] = migration.default;
        } else if (isMigration(migration)) {
          migrations[migrationKey] = migration;
        }
      }
    }
    return migrations;
  }
}
function isMigration(obj) {
  return isObject(obj) && isFunction(obj.up);
}
class SnakeCaseTransformer extends OperationNodeTransformer {
  #snakeCase;
  constructor(snakeCase) {
    super();
    this.#snakeCase = snakeCase;
  }
  transformIdentifier(node) {
    node = super.transformIdentifier(node);
    return {
      ...node,
      name: this.#snakeCase(node.name)
    };
  }
}
function createSnakeCaseMapper({ upperCase = false, underscoreBeforeDigits = false, underscoreBetweenUppercaseLetters = false } = {}) {
  return memoize((str) => {
    if (str.length === 0) {
      return str;
    }
    const upper = str.toUpperCase();
    const lower = str.toLowerCase();
    let out = lower[0];
    for (let i = 1, l = str.length; i < l; ++i) {
      const char = str[i];
      const prevChar = str[i - 1];
      const upperChar = upper[i];
      const prevUpperChar = upper[i - 1];
      const lowerChar = lower[i];
      const prevLowerChar = lower[i - 1];
      if (underscoreBeforeDigits && isDigit(char) && !isDigit(prevChar) && !out.endsWith("_")) {
        out += "_" + char;
        continue;
      }
      if (char === upperChar && upperChar !== lowerChar) {
        const prevCharacterIsUppercase = prevChar === prevUpperChar && prevUpperChar !== prevLowerChar;
        if (underscoreBetweenUppercaseLetters || !prevCharacterIsUppercase) {
          out += "_" + lowerChar;
        } else {
          out += lowerChar;
        }
      } else {
        out += char;
      }
    }
    if (upperCase) {
      return out.toUpperCase();
    } else {
      return out;
    }
  });
}
function createCamelCaseMapper({ upperCase = false } = {}) {
  return memoize((str) => {
    if (str.length === 0) {
      return str;
    }
    if (upperCase && isAllUpperCaseSnakeCase(str)) {
      str = str.toLowerCase();
    }
    let out = str[0];
    for (let i = 1, l = str.length; i < l; ++i) {
      const char = str[i];
      const prevChar = str[i - 1];
      if (char !== "_") {
        if (prevChar === "_") {
          out += char.toUpperCase();
        } else {
          out += char;
        }
      }
    }
    return out;
  });
}
function isAllUpperCaseSnakeCase(str) {
  for (let i = 1, l = str.length; i < l; ++i) {
    const char = str[i];
    if (char !== "_" && char !== char.toUpperCase()) {
      return false;
    }
  }
  return true;
}
function isDigit(char) {
  return char >= "0" && char <= "9";
}
function memoize(func) {
  const cache = /* @__PURE__ */ new Map();
  return (str) => {
    let mapped = cache.get(str);
    if (!mapped) {
      mapped = func(str);
      cache.set(str, mapped);
    }
    return mapped;
  };
}
class CamelCasePlugin {
  opt;
  #camelCase;
  #snakeCase;
  #snakeCaseTransformer;
  constructor(opt = {}) {
    this.opt = opt;
    this.#camelCase = createCamelCaseMapper(opt);
    this.#snakeCase = createSnakeCaseMapper(opt);
    this.#snakeCaseTransformer = new SnakeCaseTransformer(this.snakeCase.bind(this));
  }
  transformQuery(args) {
    return this.#snakeCaseTransformer.transformNode(args.node);
  }
  async transformResult(args) {
    if (args.result.rows && Array.isArray(args.result.rows)) {
      return {
        ...args.result,
        rows: args.result.rows.map((row) => this.mapRow(row))
      };
    }
    return args.result;
  }
  mapRow(row) {
    return Object.keys(row).reduce((obj, key) => {
      let value = row[key];
      if (Array.isArray(value)) {
        value = value.map((it) => canMap(it, this.opt) ? this.mapRow(it) : it);
      } else if (canMap(value, this.opt)) {
        value = this.mapRow(value);
      }
      obj[this.camelCase(key)] = value;
      return obj;
    }, {});
  }
  snakeCase(str) {
    return this.#snakeCase(str);
  }
  camelCase(str) {
    return this.#camelCase(str);
  }
}
function canMap(obj, opt) {
  return isPlainObject(obj) && !opt?.maintainNestedObjectKeys;
}
class DeduplicateJoinsTransformer extends OperationNodeTransformer {
  transformSelectQuery(node) {
    return this.#transformQuery(super.transformSelectQuery(node));
  }
  transformUpdateQuery(node) {
    return this.#transformQuery(super.transformUpdateQuery(node));
  }
  transformDeleteQuery(node) {
    return this.#transformQuery(super.transformDeleteQuery(node));
  }
  #transformQuery(node) {
    if (!node.joins || node.joins.length === 0) {
      return node;
    }
    return freeze({
      ...node,
      joins: this.#deduplicateJoins(node.joins)
    });
  }
  #deduplicateJoins(joins) {
    const out = [];
    for (let i = 0; i < joins.length; ++i) {
      let foundDuplicate = false;
      for (let j = 0; j < out.length; ++j) {
        if (compare(joins[i], out[j])) {
          foundDuplicate = true;
          break;
        }
      }
      if (!foundDuplicate) {
        out.push(joins[i]);
      }
    }
    return freeze(out);
  }
}
class DeduplicateJoinsPlugin {
  #transformer = new DeduplicateJoinsTransformer();
  transformQuery(args) {
    return this.#transformer.transformNode(args.node);
  }
  transformResult(args) {
    return Promise.resolve(args.result);
  }
}
class ParseJSONResultsPlugin {
  opt;
  #objectStrategy;
  constructor(opt = {}) {
    this.opt = opt;
    this.#objectStrategy = opt.objectStrategy || "in-place";
  }
  // noop
  transformQuery(args) {
    return args.node;
  }
  async transformResult(args) {
    return {
      ...args.result,
      rows: parseArray(args.result.rows, this.#objectStrategy)
    };
  }
}
function parseArray(arr, objectStrategy) {
  const target = objectStrategy === "create" ? new Array(arr.length) : arr;
  for (let i = 0; i < arr.length; ++i) {
    target[i] = parse(arr[i], objectStrategy);
  }
  return target;
}
function parse(obj, objectStrategy) {
  if (isString(obj)) {
    return parseString(obj);
  }
  if (Array.isArray(obj)) {
    return parseArray(obj, objectStrategy);
  }
  if (isPlainObject(obj)) {
    return parseObject(obj, objectStrategy);
  }
  return obj;
}
function parseString(str) {
  if (maybeJson(str)) {
    try {
      return parse(JSON.parse(str), "in-place");
    } catch (err) {
    }
  }
  return str;
}
function maybeJson(value) {
  return value.match(/^[\[\{]/) != null;
}
function parseObject(obj, objectStrategy) {
  const target = objectStrategy === "create" ? {} : obj;
  for (const key in obj) {
    target[key] = parse(obj[key], objectStrategy);
  }
  return target;
}
const ListNode = freeze({
  is(node) {
    return node.kind === "ListNode";
  },
  create(items) {
    return freeze({
      kind: "ListNode",
      items: freeze(items)
    });
  }
});
export {
  bs as ARITHMETIC_OPERATORS,
  bt as AddColumnNode,
  bu as AddConstraintNode,
  bv as AddIndexNode,
  bw as AggregateFunctionBuilder,
  bx as AggregateFunctionNode,
  by as AliasNode,
  bz as AliasedAggregateFunctionBuilder,
  bA as AliasedExpressionWrapper,
  bB as AliasedJSONPathBuilder,
  bC as AlterColumnBuilder,
  bD as AlterColumnNode,
  bE as AlterTableBuilder,
  bF as AlterTableColumnAlteringBuilder,
  bG as AlterTableNode,
  bH as AlteredColumnBuilder,
  bI as AndNode,
  bJ as AndWrapper,
  bK as BINARY_OPERATORS,
  bL as BinaryOperationNode,
  bM as COMPARISON_OPERATORS,
  CamelCasePlugin,
  bN as CaseBuilder,
  bO as CaseEndBuilder,
  bP as CaseNode,
  bQ as CaseThenBuilder,
  bR as CaseWhenBuilder,
  bS as CastNode,
  bT as CheckConstraintNode,
  bU as ColumnDefinitionBuilder,
  bV as ColumnDefinitionNode,
  bW as ColumnNode,
  bX as ColumnUpdateNode,
  bY as CommonTableExpressionNameNode,
  bZ as CommonTableExpressionNode,
  CompiledQuery,
  b_ as ConnectionBuilder,
  b$ as CreateIndexBuilder,
  c0 as CreateIndexNode,
  c1 as CreateSchemaBuilder,
  c2 as CreateSchemaNode,
  c3 as CreateTableBuilder,
  a4 as CreateTableNode,
  c4 as CreateTypeBuilder,
  c5 as CreateTypeNode,
  c6 as CreateViewBuilder,
  a5 as CreateViewNode,
  c7 as DEFAULT_ALLOW_UNORDERED_MIGRATIONS,
  DEFAULT_MIGRATION_LOCK_TABLE,
  DEFAULT_MIGRATION_TABLE,
  c8 as DataTypeNode,
  DeduplicateJoinsPlugin,
  c9 as DefaultConnectionProvider,
  ca as DefaultInsertValueNode,
  DefaultQueryCompiler,
  cb as DefaultQueryExecutor,
  cc as DefaultValueNode,
  cd as DeleteQueryBuilder,
  ce as DeleteQueryNode,
  cf as DeleteResult,
  DialectAdapterBase,
  cg as DropColumnNode,
  ch as DropConstraintNode,
  ci as DropIndexBuilder,
  cj as DropIndexNode,
  ck as DropSchemaBuilder,
  cl as DropSchemaNode,
  cm as DropTableBuilder,
  cn as DropTableNode,
  co as DropTypeBuilder,
  cp as DropTypeNode,
  cq as DropViewBuilder,
  cr as DropViewNode,
  DummyDriver,
  cs as DynamicModule,
  ct as ExplainNode,
  cu as ExpressionWrapper,
  cv as FetchNode,
  FileMigrationProvider,
  cw as ForeignKeyConstraintBuilder,
  cx as ForeignKeyConstraintNode,
  cy as FromNode,
  cz as FunctionNode,
  cA as GeneratedNode,
  cB as GroupByItemNode,
  cC as GroupByNode,
  cD as HavingNode,
  cE as IdentifierNode,
  cF as InsertQueryBuilder,
  a3 as InsertQueryNode,
  cG as InsertResult,
  cH as JSONOperatorChainNode,
  cI as JSONPathBuilder,
  cJ as JSONPathLegNode,
  cK as JSONPathNode,
  cL as JSONReferenceNode,
  cM as JSON_OPERATORS,
  cN as JoinBuilder,
  cO as JoinNode,
  K as Kysely,
  cP as LOG_LEVELS,
  cQ as LimitNode,
  ListNode,
  cR as Log,
  cS as MIGRATION_LOCK_ID,
  cT as MatchedNode,
  cU as MatchedThenableMergeQueryBuilder,
  cV as MergeQueryBuilder,
  a8 as MergeQueryNode,
  cW as MergeResult,
  cX as Migrator,
  cY as ModifyColumnNode,
  MssqlAdapter,
  MssqlDialect,
  MssqlDriver,
  MssqlIntrospector,
  MssqlQueryCompiler,
  MysqlAdapter,
  MysqlDialect,
  MysqlDriver,
  MysqlIntrospector,
  MysqlQueryCompiler,
  cZ as NOOP_QUERY_EXECUTOR,
  c_ as NO_MIGRATIONS,
  c$ as NoResultError,
  d0 as NoopQueryExecutor,
  d1 as NotMatchedThenableMergeQueryBuilder,
  d2 as ON_COMMIT_ACTIONS,
  d3 as ON_MODIFY_FOREIGN_ACTIONS,
  d4 as OPERATORS,
  d5 as OffsetNode,
  d6 as OnConflictBuilder,
  d7 as OnConflictDoNothingBuilder,
  d8 as OnConflictNode,
  d9 as OnConflictUpdateBuilder,
  da as OnDuplicateKeyNode,
  db as OnNode,
  OperationNodeTransformer,
  O as OperationNodeVisitor,
  ab as OperatorNode,
  dc as OrNode,
  dd as OrWrapper,
  de as OrderByItemNode,
  df as OrderByNode,
  dg as OutputNode,
  dh as OverNode,
  a2 as ParensNode,
  ParseJSONResultsPlugin,
  di as PartitionByItemNode,
  dj as PartitionByNode,
  PostgresAdapter,
  PostgresDialect,
  PostgresDriver,
  PostgresIntrospector,
  PostgresQueryCompiler,
  dk as PrimaryConstraintNode,
  dl as PrimitiveValueListNode,
  dm as QueryCreator,
  a7 as QueryNode,
  RawNode,
  dn as ReferenceNode,
  dp as ReferencesNode,
  dq as RenameColumnNode,
  dr as ReturningNode,
  ds as SchemaModule,
  dt as SchemableIdentifierNode,
  du as SelectAllNode,
  dv as SelectModifierNode,
  SelectQueryNode,
  dw as SelectionNode,
  a6 as SetOperationNode,
  dx as SingleConnectionProvider,
  SqliteAdapter,
  SqliteDialect,
  SqliteDriver,
  SqliteIntrospector,
  SqliteQueryCompiler,
  dy as TRANSACTION_ISOLATION_LEVELS,
  dz as TableNode,
  dA as TopNode,
  dB as Transaction,
  dC as TransactionBuilder,
  dD as TraversedJSONPathBuilder,
  dE as TupleNode,
  dF as UNARY_FILTER_OPERATORS,
  dG as UNARY_OPERATORS,
  dH as UnaryOperationNode,
  dI as UniqueConstraintNode,
  dJ as UpdateQueryBuilder,
  dK as UpdateQueryNode,
  dL as UpdateResult,
  dM as UsingNode,
  dN as ValueListNode,
  dO as ValueNode,
  dP as ValuesNode,
  dQ as WhenNode,
  dR as WheneableMergeQueryBuilder,
  dS as WhereNode,
  dT as WithNode,
  dU as WithSchemaPlugin,
  dV as createFunctionModule,
  dW as createRawBuilder,
  dX as createSelectQueryBuilder,
  dY as expressionBuilder,
  dZ as isAliasedExpression,
  d_ as isArithmeticOperator,
  d$ as isBinaryOperator,
  e0 as isColumnDataType,
  e1 as isComparisonOperator,
  e2 as isCompilable,
  e3 as isExpression,
  e4 as isJSONOperator,
  e5 as isKyselyProps,
  e6 as isNoResultErrorConstructor,
  e7 as isOperationNodeSource,
  e8 as isOperator,
  e9 as logOnce,
  sql
};
