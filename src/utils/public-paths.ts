export const FRAMEWORK_PAGE_SEGMENTS = {
	"the-doctrine": "the-doctrine",
	"protocols": "protocols",
	"standards": "standards",
	"the-method": "the-method",
	"implementations": "implementations",
} as const;

export type FrameworkPageSlug = keyof typeof FRAMEWORK_PAGE_SEGMENTS;

const FRAMEWORK_PAGES = new Set<FrameworkPageSlug>(Object.keys(FRAMEWORK_PAGE_SEGMENTS) as FrameworkPageSlug[]);
const TRAILING_SLASH_RE = /\/$/;

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

	if (page === "the-doctrine") {
		return "/the-doctrine";
	}

	return `/${FRAMEWORK_PAGE_SEGMENTS[page]}/${slug}`;
}

export function resolveCategoryArchivePath(categorySlug: string): string {
	return `/category/${categorySlug}`;
}

export function toAbsoluteUrl(siteUrl: string, path: string): string {
	return `${normalizeSiteUrl(siteUrl)}${path.startsWith("/") ? path : `/${path}`}`;
}
