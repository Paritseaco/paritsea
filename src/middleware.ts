import { defineMiddleware } from "astro:middleware";

// ─── Phase 1 IA restructure: old URL → new URL 301 map ───────────────────────
// Exact-match redirects (index pages).
const EXACT_REDIRECTS: Record<string, string> = {
	"/the-doctrine":   "/system/framework",
	"/the-method":     "/journal",
	"/protocols":      "/system/protocols",
	"/standards":      "/system/standards",
	"/implementations":"/implementation",
	"/ip":             "/licensing",
};

// Prefix-match redirects (slug children). Order is significant — more specific first.
const PREFIX_REDIRECTS: [string, string][] = [
	["/the-method/",      "/journal/"],
	["/protocols/",       "/system/protocols/"],
	["/standards/",       "/system/standards/"],
	["/implementations/", "/implementation/"],
];
// ─────────────────────────────────────────────────────────────────────────────

export const onRequest = defineMiddleware((context, next) => {
	const pathname = context.url.pathname;
	context.locals.originalPath = pathname;

	// Legacy /en/* → 301 to bare path (English is now the default at root).
	// Preserves SEO equity from already-indexed English URLs.
	if (pathname === "/en" || pathname.startsWith("/en/")) {
		const target = pathname === "/en" ? "/" : pathname.slice(3);
		const search = context.url.search;
		return context.redirect(`${target}${search}`, 301);
	}

	// Thai prefix → rewrite to bare path and tag locale.
	// After this rewrite the middleware re-runs with the bare path and
	// __locale=th / __path=/th/... set as query params.
	if (pathname === "/th" || pathname.startsWith("/th/")) {
		context.locals.locale = "th";
		const rewrittenPath = pathname === "/th" ? "/" : pathname.slice(3);
		const rewrittenUrl = new URL(context.url);
		rewrittenUrl.pathname = rewrittenPath || "/";
		rewrittenUrl.searchParams.set("__locale", "th");
		rewrittenUrl.searchParams.set("__path", pathname);
		return context.rewrite(rewrittenUrl);
	}

	// ─── Phase 1 IA restructure: 301 redirects ───────────────────────────────
	// At this point, a Thai-origin request has been rewritten to its bare path
	// and carries __locale=th in the query string. Detect this and restore the
	// /th/ prefix on the redirect target so Thai users land on the correct locale.
	//
	// Internal params (__locale, __path) are stripped from the outgoing Location
	// header — they are middleware signals, not user-facing querystring values.
	const isThaiOrigin = context.url.searchParams.get("__locale") === "th";
	const localePrefix = isThaiOrigin ? "/th" : "";

	const cleanParams = new URLSearchParams(context.url.searchParams);
	cleanParams.delete("__locale");
	cleanParams.delete("__path");
	const cleanSearch = cleanParams.size > 0 ? `?${cleanParams.toString()}` : "";

	// Exact match (index pages).
	const exactTarget = EXACT_REDIRECTS[pathname];
	if (exactTarget) {
		return context.redirect(`${localePrefix}${exactTarget}${cleanSearch}`, 301);
	}

	// Prefix match (slug children).
	for (const [from, to] of PREFIX_REDIRECTS) {
		if (pathname.startsWith(from)) {
			const rest = pathname.slice(from.length);
			return context.redirect(`${localePrefix}${to}${rest}${cleanSearch}`, 301);
		}
	}
	// ─────────────────────────────────────────────────────────────────────────

	// Default — English at root.
	context.locals.locale = "en";
	return next();
});
