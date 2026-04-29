/** Resolved media reference from getSiteSettings() */
export interface MediaReference {
	mediaId: string;
	alt?: string;
	url?: string;
}

export interface BlogSiteIdentitySettings {
	title?: string;
	tagline?: string;
	logo?: MediaReference;
	favicon?: MediaReference;
}

const DEFAULT_SITE_TITLE = "Paritsea";
const DEFAULT_SITE_TAGLINE = "A public reference framework for structural coherence, legitimacy, and applied judgment.";
const LEGACY_SITE_TAGLINE = "Structural Coherence and Legitimacy";

export function resolveBlogSiteIdentity(settings?: BlogSiteIdentitySettings) {
	const resolvedTagline =
		settings?.tagline && settings.tagline !== LEGACY_SITE_TAGLINE
			? settings.tagline
			: DEFAULT_SITE_TAGLINE;

	return {
		siteTitle: settings?.title ?? DEFAULT_SITE_TITLE,
		siteTagline: resolvedTagline,
		siteLogo: settings?.logo?.url ? settings.logo : null,
		siteFavicon: settings?.favicon?.url ?? null,
	};
}
