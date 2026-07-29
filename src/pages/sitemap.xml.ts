import type { APIRoute } from "astro";
import { getEmDashCollection, getEntryTerms } from "emdash";
import {
	isFrameworkPageSlug,
	normalizeSiteUrl,
	publicEntrySlug,
	resolveIntellectualWorkPath,
	resolveWorkFrameworkPage,
	toAbsoluteUrl,
} from "../utils/public-paths";
import { localizedPath, mergeLocalizedEntries } from "../utils/i18n";

export const GET: APIRoute = async ({ site }) => {
	const siteUrl = normalizeSiteUrl(site?.toString() ?? "https://paritsea.co");

	// Fetch all published posts
	const englishResult = await getEmDashCollection("posts", {
		locale: "en",
		orderBy: { published_at: "desc" },
		where: { status: "published" },
	});
	const thaiResult = await getEmDashCollection("posts", {
		locale: "th",
		orderBy: { published_at: "desc" },
		where: { status: "published" },
	});
	const thaiPosts = mergeLocalizedEntries(englishResult.entries, thaiResult.entries, "th")
		.filter((post) =>
			(post.data as unknown as Record<string, unknown>).__resolvedLocale === "th"
		);
	const localizedPosts = [
		...englishResult.entries.map((post) => ({ post, locale: "en" as const })),
		...thaiPosts.map((post) => ({ post, locale: "th" as const })),
	];

	// Build one URL per locale that has either a real translation or an
	// explicitly maintained legacy Thai fallback. Never advertise a 404 locale.
	const postUrls = await Promise.all(
		localizedPosts.map(async ({ post, locale }) => {
			if (!post.data.publishedAt) return null;

			const legacyTerms = await getEntryTerms("posts", post.data.id, "category");
			const frameworkPage = resolveWorkFrameworkPage(
				post.data.content_type,
				post.data.framework_page,
				legacyTerms.find((term) => isFrameworkPageSlug(term.slug))?.slug,
			);
			const path = resolveIntellectualWorkPath(
				publicEntrySlug(post),
				post.data.content_type,
				frameworkPage,
			);
			if (!path) return null;
			const url = toAbsoluteUrl(siteUrl, localizedPath(path, locale));
			const lastmod = post.data.updatedAt?.toISOString().split("T")[0] ??
				post.data.publishedAt.toISOString().split("T")[0];

			return { url, lastmod };
		})
	).then((results) => results.filter(Boolean) as Array<{ url: string; lastmod: string }>);

	// Static pages and structural indexes (Phase 1 IA restructure — new URL vocabulary).
	// Omit lastmod when we do not have a trustworthy modification timestamp.
	type SitemapEntry = { url: string; lastmod?: string };

	const staticPages: SitemapEntry[] = [
		// Root
		{ url: `${siteUrl}/` },
		// Layer index pages
		{ url: `${siteUrl}/journal` },
		{ url: `${siteUrl}/concepts` },
		{ url: `${siteUrl}/system` },
		{ url: `${siteUrl}/system/frameworks` },
		{ url: `${siteUrl}/system/frameworks/paritsea-framework` },
		{ url: `${siteUrl}/system/protocols` },
		{ url: `${siteUrl}/system/standards` },
		{ url: `${siteUrl}/media` },
		// Supporting pages
		{ url: `${siteUrl}/about` },
		{ url: `${siteUrl}/ip` },
		{ url: `${siteUrl}/ip/licensing` },
		{ url: `${siteUrl}/ip/official-use` },
		{ url: `${siteUrl}/ip/official-use/agensea` },
		{ url: `${siteUrl}/author/parit-ritchai` },
		{ url: `${siteUrl}/contact` },
		// Thai locale equivalents
		{ url: `${siteUrl}/th` },
		{ url: `${siteUrl}/th/journal` },
		{ url: `${siteUrl}/th/concepts` },
		{ url: `${siteUrl}/th/system` },
		{ url: `${siteUrl}/th/system/frameworks` },
		{ url: `${siteUrl}/th/system/frameworks/paritsea-framework` },
		{ url: `${siteUrl}/th/system/protocols` },
		{ url: `${siteUrl}/th/system/standards` },
		{ url: `${siteUrl}/th/media` },
		{ url: `${siteUrl}/th/about` },
		{ url: `${siteUrl}/th/ip` },
		{ url: `${siteUrl}/th/ip/licensing` },
		{ url: `${siteUrl}/th/ip/official-use` },
		{ url: `${siteUrl}/th/ip/official-use/agensea` },
		{ url: `${siteUrl}/th/author/parit-ritchai` },
		{ url: `${siteUrl}/th/contact` },
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
