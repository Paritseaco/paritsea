// Internal taxonomy keys (left) are frozen — they live in seed content.
// Public URL segments (right) express the seeing → structuring → doing architecture.
export const FRAMEWORK_PAGE_SEGMENTS = {
	"the-doctrine": "system/frameworks",
	"protocols": "system/protocols",
	"standards": "system/standards",
	"the-method": "journal",
	"implementations": "ip/official-use",
} as const;

export type FrameworkPageSlug = keyof typeof FRAMEWORK_PAGE_SEGMENTS;
export type IntellectualContentType = "journal" | "concept" | "framework" | "protocol" | "standard";

export const CONTENT_TYPE_FRAMEWORK_PAGE: Record<
	Exclude<IntellectualContentType, "concept">,
	FrameworkPageSlug
> = {
	journal: "the-method",
	framework: "the-doctrine",
	protocol: "protocols",
	standard: "standards",
};

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

export function isIntellectualContentType(
	value: string | null | undefined,
): value is IntellectualContentType {
	return value === "journal" ||
		value === "concept" ||
		value === "framework" ||
		value === "protocol" ||
		value === "standard";
}

export function frameworkPageFromContentType(
	contentType: string | null | undefined,
): FrameworkPageSlug | null {
	if (!isIntellectualContentType(contentType) || contentType === "concept") return null;
	return CONTENT_TYPE_FRAMEWORK_PAGE[contentType];
}

export function resolveWorkFrameworkPage(
	contentType: string | null | undefined,
	frameworkPage: string | null | undefined,
	legacyCategorySlug?: string | null | undefined,
): FrameworkPageSlug | null {
	return frameworkPageFromContentType(contentType) ??
		resolveFrameworkPage(frameworkPage, legacyCategorySlug);
}

export function publicEntrySlug(entry: { id: string; data?: { slug?: unknown } }): string {
	return typeof entry.data?.slug === "string" && entry.data.slug
		? entry.data.slug
		: entry.id.replace(/^[a-z]{2}\//, "");
}

export function resolveIntellectualWorkPath(
	slug: string,
	contentType: string | null | undefined,
	frameworkPage?: string | null | undefined,
	legacyCategorySlug?: string | null | undefined,
): string | null {
	if (!slug) return null;
	if (contentType === "concept") return `/concepts/${slug}`;

	const page = resolveWorkFrameworkPage(contentType, frameworkPage, legacyCategorySlug);
	if (!page) return null;
	if (page === "the-doctrine") {
		return `/system/frameworks/${slug === "doctrine" ? "paritsea-framework" : slug}`;
	}

	return `/${FRAMEWORK_PAGE_SEGMENTS[page]}/${slug}`;
}

export function resolvePostPath(
	slug: string,
	frameworkPage: string | null | undefined,
	legacyCategorySlug?: string | null | undefined,
): string | null {
	return resolveIntellectualWorkPath(slug, null, frameworkPage, legacyCategorySlug);
}

export function resolveCategoryArchivePath(categorySlug: string): string {
	return `/category/${categorySlug}`;
}

export function toAbsoluteUrl(siteUrl: string, path: string): string {
	return `${normalizeSiteUrl(siteUrl)}${path.startsWith("/") ? path : `/${path}`}`;
}
