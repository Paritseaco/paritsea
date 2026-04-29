globalThis.process ??= {};
globalThis.process.env ??= {};
import { SchemaRegistry } from "./registry_D7l7v5Xg.mjs";
import { SchemaError } from "./registry_D7l7v5Xg.mjs";
import { F, R, a } from "./types_DcD-7xjQ.mjs";
import { g, a as a2 } from "./query_CjBL5NK5.mjs";
import { c, g as g2, a as a3, b, d, i, v } from "./zod-generator_B2wkOjU4.mjs";
export {
  F as FIELD_TYPE_TO_COLUMN,
  R as RESERVED_COLLECTION_SLUGS,
  a as RESERVED_FIELD_SLUGS,
  SchemaError,
  SchemaRegistry,
  c as clearSchemaCache,
  g2 as generateFieldSchema,
  a3 as generateTypeScript,
  b as generateZodSchema,
  d as getCachedSchema,
  g as getCollectionInfo,
  a2 as getCollectionInfoWithDb,
  i as invalidateSchemaCache,
  v as validateContent
};
