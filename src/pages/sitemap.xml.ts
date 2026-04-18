import type { APIRoute } from "astro";
import { getEmDashCollection, getEntryTerms } from "emdash";

export const GET: APIRoute = async ({ site }) => {
	const siteUrl = site?.toString().replace(/\/$/, "") ?? "https://paritsea.co";

	// Category mapping: taxonomy slug → URL path
	const CATEGORY_MAP: Record<string, string> = {
		"protocols": "protocols",
		"standards": "standards",
		"the-method": "the-method",
	};

	// Fetch all published posts
	const { entries: posts } = await getEmDashCollection("posts", {
		orderBy: { published_at: "desc" },
		where: { published: true },
	});

	// Build post URLs with category-aware routing
	const postUrls = await Promise.all(
		posts.map(async (post) => {
			if (!post.data.publishedAt) return null;

			const cats = await getEntryTerms("posts", post.data.id, "category");
			const primaryCategory = cats.length > 0 ? cats[0] : null;

			if (!primaryCategory) return null;

			const urlPath = CATEGORY_MAP[primaryCategory.slug];
			if (!urlPath) return null;

			const url = `${siteUrl}/${urlPath}/${post.id}`;
			const lastmod = post.data.updatedAt?.toISOString().split("T")[0] ??
				post.data.publishedAt.toISOString().split("T")[0];

			return { url, lastmod };
		})
	).then((results) => results.filter(Boolean) as Array<{ url: string; lastmod: string }>);

	// Static pages
	const staticPages = [
		{ url: `${siteUrl}/`, lastmod: new Date().toISOString().split("T")[0] },
		{ url: `${siteUrl}/the-doctrine`, lastmod: new Date().toISOString().split("T")[0] },
		{ url: `${siteUrl}/category/protocols`, lastmod: new Date().toISOString().split("T")[0] },
		{ url: `${siteUrl}/category/standards`, lastmod: new Date().toISOString().split("T")[0] },
		{ url: `${siteUrl}/category/the-method`, lastmod: new Date().toISOString().split("T")[0] },
		{ url: `${siteUrl}/licensing`, lastmod: new Date().toISOString().split("T")[0] },
		{ url: `${siteUrl}/contact`, lastmod: new Date().toISOString().split("T")[0] },
	];

	// Combine all URLs
	const allUrls = [...staticPages, ...postUrls];

	// Build XML sitemap
	const urlEntries = allUrls
		.map(
			({ url, lastmod }) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
		)
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
