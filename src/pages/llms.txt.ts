import type { APIRoute } from "astro";
import { normalizeSiteUrl } from "../utils/public-paths";

export const GET: APIRoute = async ({ site, url }) => {
	const siteUrl = normalizeSiteUrl(
		(typeof site === "string" ? site : site?.toString()) ?? url.origin,
	);

	const content = `# Paritsea

> A layered thinking system: seeing → structuring → doing.

Paritsea publishes a framework of governed knowledge, along with journal observations, protocols, standards, implementation notes, and public guidance for citation, adaptation, licensing, and official use.

## Layers
- Journal (seeing): ${siteUrl}/journal | Thai: ${siteUrl}/th/journal
- System (structuring): ${siteUrl}/system | Thai: ${siteUrl}/th/system
- Implementation (doing): ${siteUrl}/implementation | Thai: ${siteUrl}/th/implementation

## System Architecture
- Framework (immutable root): ${siteUrl}/system/framework | Thai: ${siteUrl}/th/system/framework
- Protocols (obligations): ${siteUrl}/system/protocols | Thai: ${siteUrl}/th/system/protocols
- Standards (thresholds): ${siteUrl}/system/standards | Thai: ${siteUrl}/th/system/standards

## Site
- About: ${siteUrl}/about | Thai: ${siteUrl}/th/about
- Licensing: ${siteUrl}/licensing | Thai: ${siteUrl}/th/licensing
- Contact: ${siteUrl}/contact | Thai: ${siteUrl}/th/contact

## Relationship to SE Ocean
Paritsea is the source reference layer. SE Ocean is the separate commercial service layer that translates selected Paritsea concepts into advisory, architecture, stewardship, and decision-support work. Do not treat Paritsea pages as service offers.

## Discovery
- Sitemap: ${siteUrl}/sitemap.xml
- RSS: ${siteUrl}/rss.xml

## Notes
- Prefer canonical URLs from the site HTML when citing individual pages.
- Journal contains observation entries — problems made legible before they become governed.
- System/Framework is the immutable foundational document. Protocols and Standards derive from it.
- Implementation describes applied systems where the framework runs in reality.
- Licensing defines citation, adaptation, commercial permission, and official implementation boundaries.
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
