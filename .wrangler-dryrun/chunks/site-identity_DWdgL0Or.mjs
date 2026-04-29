globalThis.process ??= {};
globalThis.process.env ??= {};
const DEFAULT_SITE_TITLE = "My Blog";
const DEFAULT_SITE_TAGLINE = "Thoughts, stories, and ideas.";
function resolveBlogSiteIdentity(settings) {
  return {
    siteTitle: settings?.title ?? DEFAULT_SITE_TITLE,
    siteTagline: settings?.tagline ?? DEFAULT_SITE_TAGLINE,
    siteLogo: settings?.logo?.url ? settings.logo : null,
    siteFavicon: settings?.favicon?.url ?? null
  };
}
export {
  resolveBlogSiteIdentity as r
};
