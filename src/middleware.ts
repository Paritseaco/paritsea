import { defineMiddleware } from "astro:middleware";

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
	if (pathname === "/th" || pathname.startsWith("/th/")) {
		context.locals.locale = "th";
		const rewrittenPath = pathname === "/th" ? "/" : pathname.slice(3);
		const rewrittenUrl = new URL(context.url);
		rewrittenUrl.pathname = rewrittenPath || "/";
		rewrittenUrl.searchParams.set("__locale", "th");
		rewrittenUrl.searchParams.set("__path", pathname);
		return context.rewrite(rewrittenUrl);
	}

	// Default — English at root.
	context.locals.locale = "en";
	return next();
});
