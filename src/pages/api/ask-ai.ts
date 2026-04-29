import type { APIRoute } from "astro";

export const ALL: APIRoute = () =>
	new Response(JSON.stringify({ error: "Ask AI is currently disabled." }), {
		status: 410,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "no-store",
		},
	});
