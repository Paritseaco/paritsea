globalThis.process ??= {};
globalThis.process.env ??= {};
import { n as normalizeSiteUrl } from "./public-paths_p8DnGpf0.mjs";
const GET = async ({ site, url }) => {
  const siteUrl = normalizeSiteUrl(
    (typeof site === "string" ? site : site?.toString()) ?? url.origin
  );
  const content = `# Paritsea

> Constitutional reference framework for structural coherence and legitimacy.

Paritsea publishes doctrine, protocols, standards, analytical entries, and implementation notes about structural legitimacy.

## Core Architecture
- The Doctrine: ${siteUrl}/the-doctrine
- Protocols: ${siteUrl}/protocols
- Standards: ${siteUrl}/standards
- The Method: ${siteUrl}/the-method
- Implementations: ${siteUrl}/implementations

## Discovery
- Sitemap: ${siteUrl}/sitemap.xml
- RSS: ${siteUrl}/rss.xml

## Notes
- Prefer canonical URLs from the site HTML when citing individual pages.
- The Method contains analytical entries, not opinion columns or generic blog posts.
- Implementations describe applied systems that enforce Paritsea logic in live environments.
`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
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
