import type { APIRoute } from "astro";
import { getEmDashCollection, getEntryTerms, getSiteSettings } from "emdash";

import { resolveBlogSiteIdentity } from "../utils/site-identity";
import {
	isFrameworkPageSlug,
	normalizeSiteUrl,
	resolveFrameworkPage,
	resolvePostPath,
	toAbsoluteUrl,
} from "../utils/public-paths";
import { localizeEntry } from "../utils/i18n";

export const GET: APIRoute = async ({ site, url }) => {
	const siteUrl = normalizeSiteUrl((typeof site === "string" ? site : site?.toString()) || url.origin);
	const { siteTitle, siteTagline } = resolveBlogSiteIdentity(await getSiteSettings());

	const { entries: posts } = await getEmDashCollection("posts", {
		orderBy: { published_at: "desc" },
		limit: 20,
	});

	const items = (
		await Promise.all(
			posts.map(async (post) => {
			if (!post.data.publishedAt) return null;
			const legacyTerms = await getEntryTerms("posts", post.data.id, "category");
			const frameworkPage = resolveFrameworkPage(
				post.data.framework_page,
				legacyTerms.find((term) => isFrameworkPageSlug(term.slug))?.slug,
			);
			const postPath = resolvePostPath(post.id, frameworkPage, null);
			if (!postPath) return null;
			const localizedPost = localizeEntry(post, "posts", "th");

			const pubDate = post.data.publishedAt.toUTCString();
			const postUrl = toAbsoluteUrl(siteUrl, postPath);
			const title = escapeXml(localizedPost.data.title || "Untitled");
			const description = escapeXml(localizedPost.data.excerpt || "");

			return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
			}),
		)
	)
		.filter(Boolean)
		.join("\n");

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteTagline)}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>th-TH</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};

const XML_ESCAPE_PATTERNS = [
	[/&/g, "&amp;"],
	[/</g, "&lt;"],
	[/>/g, "&gt;"],
	[/"/g, "&quot;"],
	[/'/g, "&apos;"],
] as const;

function escapeXml(str: string): string {
	let result = str;
	for (const [pattern, replacement] of XML_ESCAPE_PATTERNS) {
		result = result.replace(pattern, replacement);
	}
	return result;
}
