// Internal taxonomy keys (left) are frozen — they live in seed content.
// Public URL segments (right) express the seeing → structuring → doing architecture.
export const FRAMEWORK_PAGE_SEGMENTS = {
	"the-doctrine": "system/framework",
	"protocols": "system/protocols",
	"standards": "system/standards",
	"the-method": "journal",
	"implementations": "implementation",
} as const;

export type FrameworkPageSlug = keyof typeof FRAMEWORK_PAGE_SEGMENTS;

const FRAMEWORK_PAGES = new Set<FrameworkPageSlug>(Object.keys(FRAMEWORK_PAGE_SEGMENTS) as FrameworkPageSlug[]);
const TRAILING_SLASH_RE = /\/$/;

// Reverse map: public URL segment (e.g. "system/protocols") → internal key ("protocols").
const SEGMENT_TO_FRAMEWORK_PAGE: Record<string, FrameworkPageSlug> = Object.fromEntries(
	(Object.entries(FRAMEWORK_PAGE_SEGMENTS) as [FrameworkPageSlug, string][]).map(
		([key, segment]) => [segment, key],
	),
);

/** Given a public URL segment prefix, return its internal framework_page key. */
export function frameworkPageFromSegment(segment: string): FrameworkPageSlug | null {
	return SEGMENT_TO_FRAMEWORK_PAGE[segment] ?? null;
}

export function normalizeSiteUrl(siteUrl: string): string {
	return siteUrl.replace(TRAILING_SLASH_RE, "");
}

export function isFrameworkPageSlug(value: string | null | undefined): value is FrameworkPageSlug {
	return !!value && FRAMEWORK_PAGES.has(value as FrameworkPageSlug);
}

export function resolveFrameworkPage(
	value: string | null | undefined,
	legacyCategorySlug?: string | null | undefined,
): FrameworkPageSlug | null {
	if (isFrameworkPageSlug(value)) {
		return value;
	}

	if (isFrameworkPageSlug(legacyCategorySlug)) {
		return legacyCategorySlug;
	}

	return null;
}

export function resolvePostPath(
	slug: string,
	frameworkPage: string | null | undefined,
	legacyCategorySlug?: string | null | undefined,
): string | null {
	if (!slug) return null;

	const page = resolveFrameworkPage(frameworkPage, legacyCategorySlug);
	if (!page) return null;

	// Framework is a single standalone document, not a collection — no child slug.
	if (page === "the-doctrine") {
		return "/system/framework";
	}

	return `/${FRAMEWORK_PAGE_SEGMENTS[page]}/${slug}`;
}

export function resolveCategoryArchivePath(categorySlug: string): string {
	return `/category/${categorySlug}`;
}

export function toAbsoluteUrl(siteUrl: string, path: string): string {
	return `${normalizeSiteUrl(siteUrl)}${path.startsWith("/") ? path : `/${path}`}`;
}
