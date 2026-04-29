globalThis.process ??= {};
globalThis.process.env ??= {};
import { FTSManager } from "./fts-manager_DfToymH_.mjs";
import { s as searchWithDb } from "./query_YQ4sVFQR.mjs";
import { g, a, b, c } from "./query_YQ4sVFQR.mjs";
function isPortableTextSpan(node) {
  return node._type === "span" && "text" in node && typeof node.text == "string" && (node.marks === void 0 || Array.isArray(node.marks) && node.marks.every((mark) => typeof mark == "string"));
}
function isPortableTextBlock(node) {
  return typeof node._type == "string" && node._type[0] !== "@" && (!("markDefs" in node) || !node.markDefs || Array.isArray(node.markDefs) && node.markDefs.every((def) => typeof def._key == "string")) && "children" in node && Array.isArray(node.children) && node.children.every((child) => typeof child == "object" && "_type" in child);
}
const leadingSpace = /^\s/, trailingSpace = /\s$/;
function toPlainText(block) {
  let blocks = Array.isArray(block) ? block : [block], text = "";
  return blocks.forEach((current, index) => {
    if (!isPortableTextBlock(current)) return;
    let pad = false;
    current.children.forEach((span) => {
      isPortableTextSpan(span) ? (text += pad && text && !trailingSpace.test(text) && !leadingSpace.test(span.text) ? " " : "", text += span.text, pad = false) : pad = true;
    }), index !== blocks.length - 1 && (text += "\n\n");
  }), text;
}
function isPortableTextArray(value) {
  return value.every(
    (item) => typeof item === "object" && item !== null && "_type" in item && typeof item._type === "string"
  );
}
function extractCustomBlockText(block) {
  if (block._type === "code" && "code" in block && typeof block.code === "string") {
    return block.code;
  }
  if (block._type === "image") {
    const parts = [];
    if ("alt" in block && typeof block.alt === "string" && block.alt) {
      parts.push(block.alt);
    }
    if ("caption" in block && typeof block.caption === "string" && block.caption) {
      parts.push(block.caption);
    }
    return parts.join(" ");
  }
  return "";
}
function extractPlainText(blocks) {
  if (!blocks) {
    return "";
  }
  let parsedBlocks;
  if (typeof blocks === "string") {
    try {
      parsedBlocks = JSON.parse(blocks);
    } catch {
      return blocks;
    }
  } else {
    parsedBlocks = blocks;
  }
  if (!Array.isArray(parsedBlocks)) {
    return "";
  }
  const toolkitBlocks = parsedBlocks.map((b2) => {
    const obj = { _type: b2._type };
    for (const [key, val] of Object.entries(b2)) {
      obj[key] = val;
    }
    return obj;
  });
  const standardText = toPlainText(toolkitBlocks);
  const customTexts = parsedBlocks.map(extractCustomBlockText).filter((text) => text.length > 0);
  const allTexts = [standardText, ...customTexts].filter((t) => t.length > 0);
  return allTexts.join("\n");
}
function extractSearchableFields(entry, fields) {
  const result = {};
  for (const field of fields) {
    const value = entry[field];
    if (value === null || value === void 0) {
      result[field] = "";
      continue;
    }
    if (typeof value === "string") {
      if (value.startsWith("[")) {
        result[field] = extractPlainText(value);
      } else {
        result[field] = value;
      }
    } else if (Array.isArray(value)) {
      if (isPortableTextArray(value)) {
        result[field] = extractPlainText(value);
      } else {
        result[field] = JSON.stringify(value);
      }
    } else if (typeof value === "object") {
      result[field] = JSON.stringify(value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      result[field] = `${value}`;
    } else {
      result[field] = "";
    }
  }
  return result;
}
export {
  FTSManager,
  extractPlainText,
  extractSearchableFields,
  g as getSearchStats,
  a as getSuggestions,
  b as search,
  c as searchCollection,
  searchWithDb
};
