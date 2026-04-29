globalThis.process ??= {};
globalThis.process.env ??= {};
import { o as object, x as unknown, h as string, n as number, e as array, j as _enum, k as boolean, Z as ZodString, y as ZodNumber } from "./index_BpQCdXij.mjs";
const PASCAL_CASE_SPLIT_PATTERN = /[_\-\s]+/;
function generateZodSchema(collection) {
  const shape = {};
  for (const field of collection.fields) {
    shape[field.slug] = generateFieldSchema(field);
  }
  return object(shape);
}
function generateFieldSchema(field) {
  let schema = getBaseSchema(field.type, field);
  if (field.validation) {
    schema = applyValidation(schema, field);
  }
  if (!field.required) {
    schema = schema.optional();
  }
  if (field.defaultValue !== void 0) {
    schema = schema.default(field.defaultValue);
  }
  return schema;
}
function getBaseSchema(type, field) {
  switch (type) {
    case "string":
    case "text":
    case "slug":
      return string();
    case "number":
      return number();
    case "integer":
      return number().int();
    case "boolean":
      return boolean();
    case "datetime":
      return string().datetime().or(string().date());
    case "select": {
      const options = field.validation?.options;
      if (options && options.length > 0) {
        const [first, ...rest] = options;
        return _enum([first, ...rest]);
      }
      return string();
    }
    case "multiSelect": {
      const multiOptions = field.validation?.options;
      if (multiOptions && multiOptions.length > 0) {
        const [first, ...rest] = multiOptions;
        return array(_enum([first, ...rest]));
      }
      return array(string());
    }
    case "portableText":
      return array(
        object({
          _type: string(),
          _key: string()
        }).passthrough()
      );
    case "image":
      return object({
        id: string(),
        src: string().optional(),
        alt: string().optional(),
        width: number().optional(),
        height: number().optional()
      });
    case "file":
      return object({
        id: string(),
        src: string().optional(),
        filename: string().optional(),
        mimeType: string().optional(),
        size: number().optional()
      });
    case "reference":
      return string();
    // Reference ID
    case "json":
      return unknown();
    default:
      return unknown();
  }
}
function applyValidation(schema, field) {
  const validation = field.validation;
  if (!validation) return schema;
  if (schema instanceof ZodString) {
    let strSchema = schema;
    if (validation.minLength !== void 0) {
      strSchema = strSchema.min(validation.minLength);
    }
    if (validation.maxLength !== void 0) {
      strSchema = strSchema.max(validation.maxLength);
    }
    if (validation.pattern) {
      strSchema = strSchema.regex(new RegExp(validation.pattern));
    }
    return strSchema;
  }
  if (schema instanceof ZodNumber) {
    let numSchema = schema;
    if (validation.min !== void 0) {
      numSchema = numSchema.min(validation.min);
    }
    if (validation.max !== void 0) {
      numSchema = numSchema.max(validation.max);
    }
    return numSchema;
  }
  return schema;
}
const schemaCache = /* @__PURE__ */ new Map();
function getCachedSchema(collection, version) {
  const cacheKey = collection.slug;
  const cached = schemaCache.get(cacheKey);
  if (cached && (!version || cached.version === version)) {
    return cached.schema;
  }
  const schema = generateZodSchema(collection);
  schemaCache.set(cacheKey, {
    schema,
    version: version || collection.updatedAt
  });
  return schema;
}
function invalidateSchemaCache(slug) {
  schemaCache.delete(slug);
}
function clearSchemaCache() {
  schemaCache.clear();
}
function validateContent(collection, data) {
  const schema = getCachedSchema(collection);
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}
function generateTypeScript(collection) {
  const interfaceName = getInterfaceName(collection);
  const lines = [];
  lines.push(`export interface ${interfaceName} {`);
  lines.push(`  id: string;`);
  lines.push(`  slug: string | null;`);
  lines.push(`  status: string;`);
  for (const field of collection.fields) {
    const tsType = fieldTypeToTypeScript(field);
    const optional = field.required ? "" : "?";
    lines.push(`  ${field.slug}${optional}: ${tsType};`);
  }
  lines.push(`  createdAt: Date;`);
  lines.push(`  updatedAt: Date;`);
  lines.push(`  publishedAt: Date | null;`);
  lines.push(`  bylines?: ContentBylineCredit[];`);
  lines.push(`}`);
  return lines.join("\n");
}
function fieldTypeToTypeScript(field) {
  switch (field.type) {
    case "string":
    case "text":
    case "slug":
    case "datetime":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    case "select":
      const options = field.validation?.options;
      if (options && options.length > 0) {
        return options.map((o) => `"${o}"`).join(" | ");
      }
      return "string";
    case "multiSelect":
      const multiOptions = field.validation?.options;
      if (multiOptions && multiOptions.length > 0) {
        return `(${multiOptions.map((o) => `"${o}"`).join(" | ")})[]`;
      }
      return "string[]";
    case "portableText":
      return "PortableTextBlock[]";
    case "image":
      return "{ id: string; src?: string; alt?: string; width?: number; height?: number }";
    case "file":
      return "{ id: string; src?: string; filename?: string; mimeType?: string; size?: number }";
    case "reference":
      return "string";
    case "json":
      return "unknown";
    default:
      return "unknown";
  }
}
function pascalCase(str) {
  return str.split(PASCAL_CASE_SPLIT_PATTERN).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
}
function singularize(str) {
  if (str.endsWith("ies")) {
    return str.slice(0, -3) + "y";
  }
  if (str.endsWith("es") && (str.endsWith("sses") || str.endsWith("xes") || str.endsWith("ches") || str.endsWith("shes"))) {
    return str.slice(0, -2);
  }
  if (str.endsWith("s") && !str.endsWith("ss")) {
    return str.slice(0, -1);
  }
  return str;
}
function getInterfaceName(collection) {
  return pascalCase(collection.labelSingular || singularize(collection.slug));
}
export {
  generateTypeScript as a,
  generateZodSchema as b,
  clearSchemaCache as c,
  getCachedSchema as d,
  generateFieldSchema as g,
  invalidateSchemaCache as i,
  validateContent as v
};
