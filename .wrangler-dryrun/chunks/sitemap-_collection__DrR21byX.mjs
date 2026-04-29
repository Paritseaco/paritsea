globalThis.process ??= {};
globalThis.process.env ??= {};
const GET = async () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Legacy EmDash per-collection sitemaps are intentionally retired on Paritsea. -->
<!-- Use /sitemap.xml as the canonical sitemap. -->`;
  return new Response(xml, {
    status: 410,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400"
    }
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
