globalThis.process ??= {};
globalThis.process.env ??= {};
const SAFE_URL_SCHEME_RE = /^(https?:|mailto:|tel:|\/(?!\/)|#)/i;
function sanitizeHref(url) {
  if (!url) return "#";
  return SAFE_URL_SCHEME_RE.test(url) ? url : "#";
}
function isSafeHref(url) {
  return SAFE_URL_SCHEME_RE.test(url);
}
export {
  isSafeHref as i,
  sanitizeHref as s
};
