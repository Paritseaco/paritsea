globalThis.process ??= {};
globalThis.process.env ??= {};
import { N as getEntryTerms } from "./index_BpQCdXij.mjs";
import { n as getEmDashCollection } from "./query-B6Vu0d2i_CdjZKi_-.mjs";
import { n as normalizeSiteUrl, r as resolveFrameworkPage, i as isFrameworkPageSlug, a as resolvePostPath, t as toAbsoluteUrl } from "./public-paths_p8DnGpf0.mjs";
const GET = async ({ site }) => {
  const siteUrl = normalizeSiteUrl(site?.toString() ?? "https://paritsea.co");
  const { entries: posts } = await getEmDashCollection("posts", {
    orderBy: { published_at: "desc" },
    where: { published: true }
  });
  const postUrls = await Promise.all(
    posts.map(async (post) => {
      if (!post.data.publishedAt) return null;
      const legacyTerms = await getEntryTerms("posts", post.data.id, "category");
      const frameworkPage = resolveFrameworkPage(
        post.data.framework_page,
        legacyTerms.find((term) => isFrameworkPageSlug(term.slug))?.slug
      );
      const path = resolvePostPath(post.id, frameworkPage, null);
      if (!path) return null;
      const url = toAbsoluteUrl(siteUrl, path);
      const lastmod = post.data.updatedAt?.toISOString().split("T")[0] ?? post.data.publishedAt.toISOString().split("T")[0];
      return { url, lastmod };
    })
  ).then((results) => results.filter(Boolean));
  const staticPages = [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/the-doctrine` },
    { url: `${siteUrl}/protocols` },
    { url: `${siteUrl}/standards` },
    { url: `${siteUrl}/the-method` },
    { url: `${siteUrl}/implementations` },
    { url: `${siteUrl}/licensing` },
    { url: `${siteUrl}/contact` }
  ];
  const allUrls = Array.from(
    new Map(
      [...staticPages, ...postUrls].map((entry) => [entry.url, entry])
    ).values()
  );
  const urlEntries = allUrls.map(({ url, lastmod }) => {
    const lines = [
      "  <url>",
      `    <loc>${escapeXml(url)}</loc>`
    ];
    if (lastmod) {
      lines.push(`    <lastmod>${lastmod}</lastmod>`);
    }
    lines.push("  </url>");
    return lines.join("\n");
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
const XML_ESCAPE_PATTERNS = [
  [/&/g, "&amp;"],
  [/</g, "&lt;"],
  [/>/g, "&gt;"],
  [/"/g, "&quot;"],
  [/'/g, "&apos;"]
];
function escapeXml(str) {
  let result = str;
  for (const [pattern, replacement] of XML_ESCAPE_PATTERNS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
