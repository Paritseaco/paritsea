globalThis.process ??= {};
globalThis.process.env ??= {};
import { O as getSiteSettings, N as getEntryTerms } from "./index_BpQCdXij.mjs";
import { n as getEmDashCollection } from "./query-B6Vu0d2i_CdjZKi_-.mjs";
import { r as resolveBlogSiteIdentity } from "./site-identity_DWdgL0Or.mjs";
import { n as normalizeSiteUrl, r as resolveFrameworkPage, i as isFrameworkPageSlug, a as resolvePostPath, t as toAbsoluteUrl } from "./public-paths_p8DnGpf0.mjs";
const GET = async ({ site, url }) => {
  const siteUrl = normalizeSiteUrl((typeof site === "string" ? site : site?.toString()) || url.origin);
  const { siteTitle, siteTagline } = resolveBlogSiteIdentity(await getSiteSettings());
  const { entries: posts } = await getEmDashCollection("posts", {
    orderBy: { published_at: "desc" },
    limit: 20
  });
  const items = (await Promise.all(
    posts.map(async (post) => {
      if (!post.data.publishedAt) return null;
      const legacyTerms = await getEntryTerms("posts", post.data.id, "category");
      const frameworkPage = resolveFrameworkPage(
        post.data.framework_page,
        legacyTerms.find((term) => isFrameworkPageSlug(term.slug))?.slug
      );
      const postPath = resolvePostPath(post.id, frameworkPage, null);
      if (!postPath) return null;
      const pubDate = post.data.publishedAt.toUTCString();
      const postUrl = toAbsoluteUrl(siteUrl, postPath);
      const title = escapeXml(post.data.title || "Untitled");
      const description = escapeXml(post.data.excerpt || "");
      return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
    })
  )).filter(Boolean).join("\n");
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteTagline)}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${(/* @__PURE__ */ new Date()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
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
