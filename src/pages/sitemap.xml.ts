import type { APIRoute } from "astro";
import { getEmDashCollection, getEntryTerms } from "emdash";
import {
	isFrameworkPageSlug,
	normalizeSiteUrl,
	resolveFrameworkPage,
	resolvePostPath,
	toAbsoluteUrl,
} from "../utils/public-paths";
import { localizedPath } from "../utils/i18n";

export const GET: APIRoute = async ({ site }) => {
	const siteUrl = normalizeSiteUrl(site?.toString() ?? "https://paritsea.co");

	// Fetch all published posts
	const { entries: posts } = await getEmDashCollection("posts", {
		orderBy: { published_at: "desc" },
		where: { status: "published" },
	});

	// Build post URLs from the explicit framework destination field.
	const postUrls = await Promise.all(
		posts.map(async (post) => {
			if (!post.data.publishedAt) return null;

			const legacyTerms = await getEntryTerms("posts", post.data.id, "category");
			const frameworkPage = resolveFrameworkPage(
				post.data.framework_page,
				legacyTerms.find((term) => isFrameworkPageSlug(term.slug))?.slug,
			);
			const path = resolvePostPath(post.id, frameworkPage, null);
			if (!path) return null;
			const url = toAbsoluteUrl(siteUrl, path);
			const enUrl = toAbsoluteUrl(siteUrl, localizedPath(path, "en"));
			const lastmod = post.data.updatedAt?.toISOString().split("T")[0] ??
				post.data.publishedAt.toISOString().split("T")[0];

			return [{ url, lastmod }, { url: enUrl, lastmod }];
		})
	).then((results) => results.flat().filter(Boolean) as Array<{ url: string; lastmod: string }>);

	// Static pages and structural indexes. Omit lastmod when we do not have a trustworthy
	// modification timestamp rather than emitting an inaccurate date.
	type SitemapEntry = { url: string; lastmod?: string };

	const staticPages: SitemapEntry[] = [
		{ url: `${siteUrl}/` },
		{ url: `${siteUrl}/the-doctrine` },
		{ url: `${siteUrl}/protocols` },
		{ url: `${siteUrl}/standards` },
		{ url: `${siteUrl}/the-method` },
		{ url: `${siteUrl}/implementations` },
		{ url: `${siteUrl}/licensing` },
		{ url: `${siteUrl}/contact` },
		{ url: `${siteUrl}/en` },
		{ url: `${siteUrl}/en/the-doctrine` },
		{ url: `${siteUrl}/en/protocols` },
		{ url: `${siteUrl}/en/standards` },
		{ url: `${siteUrl}/en/the-method` },
		{ url: `${siteUrl}/en/implementations` },
		{ url: `${siteUrl}/en/licensing` },
		{ url: `${siteUrl}/en/contact` },
	];

	// Combine all URLs and deduplicate by canonical loc.
	const allUrls: SitemapEntry[] = Array.from(
		new Map(
			[...staticPages, ...postUrls].map((entry) => [entry.url, entry]),
		).values(),
	);

	// Build XML sitemap
	const urlEntries = allUrls
		.map(({ url, lastmod }) => {
			const lines = [
				"  <url>",
				`    <loc>${escapeXml(url)}</loc>`,
			];
			if (lastmod) {
				lines.push(`    <lastmod>${lastmod}</lastmod>`);
			}
			lines.push("  </url>");
			return lines.join("\n");
		})
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
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
