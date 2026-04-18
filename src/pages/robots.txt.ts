import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const robots = `# Robots configuration for Paritsea
User-agent: *
Allow: /

# Disallow admin area
Disallow: /_emdash/

# Disallow deprecated tag pages
Disallow: /tag/

# Sitemap
Sitemap: https://paritsea.co/sitemap.xml
`;

	return new Response(robots, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
