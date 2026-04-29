import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
	const pathname = context.url.pathname;
	context.locals.originalPath = pathname;

	if (pathname === "/en" || pathname.startsWith("/en/")) {
		context.locals.locale = "en";
		const rewrittenPath = pathname === "/en" ? "/" : pathname.slice(3);
		const rewrittenUrl = new URL(context.url);
		rewrittenUrl.pathname = rewrittenPath || "/";
		rewrittenUrl.searchParams.set("__locale", "en");
		rewrittenUrl.searchParams.set("__path", pathname);
		return context.rewrite(rewrittenUrl);
	}

	context.locals.locale = "th";
	return next();
});
