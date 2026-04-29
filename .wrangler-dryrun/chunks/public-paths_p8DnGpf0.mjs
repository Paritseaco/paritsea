globalThis.process ??= {};
globalThis.process.env ??= {};
const FRAMEWORK_PAGE_SEGMENTS = {
  "the-doctrine": "the-doctrine",
  "protocols": "protocols",
  "standards": "standards",
  "the-method": "the-method",
  "implementations": "implementations"
};
const FRAMEWORK_PAGES = new Set(Object.keys(FRAMEWORK_PAGE_SEGMENTS));
const TRAILING_SLASH_RE = /\/$/;
function normalizeSiteUrl(siteUrl) {
  return siteUrl.replace(TRAILING_SLASH_RE, "");
}
function isFrameworkPageSlug(value) {
  return !!value && FRAMEWORK_PAGES.has(value);
}
function resolveFrameworkPage(value, legacyCategorySlug) {
  if (isFrameworkPageSlug(value)) {
    return value;
  }
  if (isFrameworkPageSlug(legacyCategorySlug)) {
    return legacyCategorySlug;
  }
  return null;
}
function resolvePostPath(slug, frameworkPage, legacyCategorySlug) {
  if (!slug) return null;
  const page = resolveFrameworkPage(frameworkPage, legacyCategorySlug);
  if (!page) return null;
  if (page === "the-doctrine") {
    return "/the-doctrine";
  }
  return `/${FRAMEWORK_PAGE_SEGMENTS[page]}/${slug}`;
}
function toAbsoluteUrl(siteUrl, path) {
  return `${normalizeSiteUrl(siteUrl)}${path.startsWith("/") ? path : `/${path}`}`;
}
export {
  resolvePostPath as a,
  isFrameworkPageSlug as i,
  normalizeSiteUrl as n,
  resolveFrameworkPage as r,
  toAbsoluteUrl as t
};
