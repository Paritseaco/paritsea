import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Legacy EmDash per-collection sitemaps are intentionally retired on Paritsea. -->
<!-- Use /sitemap.xml as the canonical sitemap. -->`;

	return new Response(xml, {
		status: 410,
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
