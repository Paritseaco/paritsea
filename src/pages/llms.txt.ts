import type { APIRoute } from "astro";
import { normalizeSiteUrl } from "../utils/public-paths";

export const GET: APIRoute = async ({ site, url }) => {
	const siteUrl = normalizeSiteUrl(
		(typeof site === "string" ? site : site?.toString()) ?? url.origin,
	);

	const content = `# Paritsea

> A layered thinking system: seeing → structuring → doing.

Paritsea publishes a framework of governed knowledge, along with journal observations, protocols, standards, and implementation notes.

## Layers
- Journal (seeing): ${siteUrl}/journal
- System (structuring): ${siteUrl}/system
- Implementation (doing): ${siteUrl}/implementation

## System Architecture
- Framework (immutable root): ${siteUrl}/system/framework
- Protocols (obligations): ${siteUrl}/system/protocols
- Standards (thresholds): ${siteUrl}/system/standards

## Site
- About: ${siteUrl}/about
- Licensing: ${siteUrl}/licensing

## Discovery
- Sitemap: ${siteUrl}/sitemap.xml
- RSS: ${siteUrl}/rss.xml

## Notes
- Prefer canonical URLs from the site HTML when citing individual pages.
- Journal contains observation entries — problems made legible before they become governed.
- System/Framework is the immutable foundational document. Protocols and Standards derive from it.
- Implementation describes applied systems where the framework runs in reality.
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
