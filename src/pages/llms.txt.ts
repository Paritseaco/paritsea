import type { APIRoute } from "astro";
import { normalizeSiteUrl } from "../utils/public-paths";

export const GET: APIRoute = async ({ site, url }) => {
	const siteUrl = normalizeSiteUrl(
		(typeof site === "string" ? site : site?.toString()) ?? url.origin,
	);

	const content = `# Paritsea

> An author-led intellectual practice and public record for observations, named concepts, and governed reference work.

Paritsea is not a monetized service website. It publishes the original lens, journal observations, governed Framework / Protocols / Standards, and public guidance for citation, adaptation, licensing, and official use. Implementation records exist as secondary examples of application, not as the site's commercial service layer.

Ideas usually begin as observations from real situations. They are recorded in Journal first. Patterns that repeat and become structurally mature may later crystallize into System documents and future IP.

## Layers
- Lens (origin and creator context): ${siteUrl}/about | Thai: ${siteUrl}/th/about
- Journal (first record / seeing): ${siteUrl}/journal | Thai: ${siteUrl}/th/journal
- Concepts (named patterns): ${siteUrl}/concepts | Thai: ${siteUrl}/th/concepts
- Reference work (Frameworks, Protocols, and Standards): ${siteUrl}/system | Thai: ${siteUrl}/th/system
- IP hub: ${siteUrl}/ip | Thai: ${siteUrl}/th/ip
- Licensing and use boundaries: ${siteUrl}/ip/licensing | Thai: ${siteUrl}/th/ip/licensing
- Media (videos and public reflections): ${siteUrl}/media | Thai: ${siteUrl}/th/media

## System Architecture
- Frameworks hub: ${siteUrl}/system/frameworks | Thai: ${siteUrl}/th/system/frameworks
- Paritsea Framework: ${siteUrl}/system/frameworks/paritsea-framework | Thai: ${siteUrl}/th/system/frameworks/paritsea-framework
- Protocols (obligations): ${siteUrl}/system/protocols | Thai: ${siteUrl}/th/system/protocols
- Standards (thresholds): ${siteUrl}/system/standards | Thai: ${siteUrl}/th/system/standards

## Site
- About / Lens: ${siteUrl}/about | Thai: ${siteUrl}/th/about
- Licensing / IP: ${siteUrl}/ip/licensing | Thai: ${siteUrl}/th/ip/licensing
- IP alias: ${siteUrl}/ip | Thai: ${siteUrl}/th/ip
- Media: ${siteUrl}/media | Thai: ${siteUrl}/th/media
- Official Use records: ${siteUrl}/ip/official-use | Thai: ${siteUrl}/th/ip/official-use
- Contact: ${siteUrl}/contact | Thai: ${siteUrl}/th/contact

## Relationship to SE Ocean
Paritsea originates and preserves the intellectual source. SE Ocean is a separate commercial interpreter and application practice that may use selected work in accountable organizational contexts. Application does not transfer ownership or canonical change authority. Implementation records on Paritsea are documentation, not service offers.

## Discovery
- Sitemap: ${siteUrl}/sitemap.xml
- RSS: ${siteUrl}/rss.xml

## Notes
- Prefer canonical URLs from the site HTML when citing individual pages.
- Journal contains source observations — real situations made legible before they become governed.
- System documents may be derived from recurring Journal patterns. Canonical change requires an explicit, attributable, versioned revision with the prior record preserved; applied work cannot silently redefine the source.
- Implementation records describe applied systems where the framework runs in reality, but they are not the primary IA layer and should not be interpreted as service packaging.
- Licensing defines citation, adaptation, internal use, commercial permission, and official implementation boundaries.
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
