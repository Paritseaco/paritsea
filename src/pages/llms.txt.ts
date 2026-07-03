import type { APIRoute } from "astro";
import { normalizeSiteUrl } from "../utils/public-paths";

export const GET: APIRoute = async ({ site, url }) => {
	const siteUrl = normalizeSiteUrl(
		(typeof site === "string" ? site : site?.toString()) ?? url.origin,
	);

	const content = `# Paritsea

> Parit Ritchai's living thought system: lens → journal → system → IP / official use → media.

Paritsea is not a monetized service website. It publishes the original lens, journal observations, governed Framework / Protocols / Standards, implementation records, and public guidance for citation, adaptation, licensing, and official use.

Ideas usually begin as observations from real situations. They are recorded in Journal first. Patterns that repeat and become structurally mature may later crystallize into System documents and future IP.

## Layers
- Lens (origin and creator context): ${siteUrl}/about | Thai: ${siteUrl}/th/about
- Journal (first record / seeing): ${siteUrl}/journal | Thai: ${siteUrl}/th/journal
- System (structuring): ${siteUrl}/system | Thai: ${siteUrl}/th/system
- IP / Licensing (official use boundaries): ${siteUrl}/licensing | Thai: ${siteUrl}/th/licensing
- Media (videos and public reflections): ${siteUrl}/media | Thai: ${siteUrl}/th/media
- Implementation (documented applied systems): ${siteUrl}/implementation | Thai: ${siteUrl}/th/implementation

## System Architecture
- Framework (immutable root): ${siteUrl}/system/framework | Thai: ${siteUrl}/th/system/framework
- Protocols (obligations): ${siteUrl}/system/protocols | Thai: ${siteUrl}/th/system/protocols
- Standards (thresholds): ${siteUrl}/system/standards | Thai: ${siteUrl}/th/system/standards

## Site
- About / Lens: ${siteUrl}/about | Thai: ${siteUrl}/th/about
- Licensing / IP: ${siteUrl}/licensing | Thai: ${siteUrl}/th/licensing
- IP alias: ${siteUrl}/ip | Thai: ${siteUrl}/th/ip
- Media: ${siteUrl}/media | Thai: ${siteUrl}/th/media
- Contact: ${siteUrl}/contact | Thai: ${siteUrl}/th/contact

## Relationship to SE Ocean
Paritsea is the source thinking and IP layer. SE Ocean is the separate commercial service layer that translates selected Paritsea concepts into advisory, architecture, stewardship, and decision-support work under a legal entity. Do not treat Paritsea pages as service offers or copy SE Ocean positioning back into Paritsea.

## Discovery
- Sitemap: ${siteUrl}/sitemap.xml
- RSS: ${siteUrl}/rss.xml

## Notes
- Prefer canonical URLs from the site HTML when citing individual pages.
- Journal contains source observations — real situations made legible before they become governed.
- System documents may be derived from recurring Journal patterns, but Framework remains the immutable root of the governed layer. Protocols and Standards derive from it.
- Implementation describes applied systems where the framework runs in reality.
- Licensing defines citation, adaptation, internal use, commercial permission, and official implementation boundaries.
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
