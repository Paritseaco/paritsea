import type { APIRoute } from "astro";
import { normalizeSiteUrl } from "../utils/public-paths";

export const GET: APIRoute = async ({ site, url }) => {
	const siteUrl = normalizeSiteUrl(
		(typeof site === "string" ? site : site?.toString()) ?? url.origin,
	);
	const robots = `# Robots configuration for Paritsea
# Search discovery is allowed. Admin and CMS internals are not crawl targets.

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: *
Allow: /
Disallow: /_emdash/

Sitemap: ${siteUrl}/sitemap.xml
`;

	return new Response(robots, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
