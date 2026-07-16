import type { APIRoute } from "astro";
import { getEmDashCollection } from "emdash";
import { resolveFrameworkPage, resolvePostPath } from "../utils/public-paths";

export const GET: APIRoute = async ({ site }) => {
	const origin = (site?.toString() ?? "https://paritsea.co").replace(/\/$/, "");
	const { entries } = await getEmDashCollection("posts", { orderBy: { published_at: "desc" } });

	let relationships: Array<Record<string, unknown>> = [];
	let appliedContexts: Array<Record<string, unknown>> = [];
	let officialUses: Array<Record<string, unknown>> = [];
	try {
		const result = await getEmDashCollection("relationships");
		relationships = result.entries.map((entry) => ({ recordId: entry.id, ...entry.data }));
	} catch {
		relationships = [];
	}
	try {
		const result = await getEmDashCollection("applied_contexts");
		appliedContexts = result.entries
			.map((entry) => ({ recordId: entry.id, ...(entry.data as unknown as Record<string, unknown>) }) as Record<string, unknown>)
			.filter((entry) => entry["disclosure_status"] === "reviewed-public");
	} catch {
		appliedContexts = [];
	}
	try {
		const result = await getEmDashCollection("official_uses");
		officialUses = result.entries.map((entry) => ({
			recordId: entry.id,
			url: `${origin}/ip/official-use/${entry.id}`,
			...entry.data,
		}));
	} catch {
		officialUses = [];
	}

	const works = entries.map((entry) => {
		const data = entry.data as unknown as Record<string, unknown>;
		const family = resolveFrameworkPage(String(data.framework_page ?? ""));
		const path = resolvePostPath(entry.id, family) ?? `/journal/${entry.id}`;
		const fallbackType = family === "the-method" ? "journal" : family === "the-doctrine" ? "framework" : family === "protocols" ? "protocol" : family === "standards" ? "standard" : "unknown";
		return {
			id: entry.id,
			title: data.title,
			url: `${origin}${path}`,
			contentType: data.content_type ?? fallbackType,
			intellectualStage: data.intellectual_stage ?? (fallbackType === "journal" ? "observation" : "formalized"),
			lifecycleStatus: data.lifecycle_status ?? (fallbackType === "journal" ? "exploring" : "current"),
			version: data.document_version ?? "1.0",
			author: "Parit Ritchai",
			steward: "Paritsea",
			provenance: data.provenance_summary ?? null,
			scope: data.scope_note ?? null,
			nonClaims: data.non_claims ?? null,
			updatedAt: data.updatedAt,
		};
	});

	return new Response(JSON.stringify({
		name: "Paritsea",
		description: "An author-led intellectual practice and public record.",
		canonicalOwner: "Paritsea",
		author: "Parit Ritchai",
		commercialApplication: { name: "SE Ocean", canonicalSource: false, url: "https://seocean.co.th" },
		works,
		relationships,
		appliedContexts,
		officialUses,
		generatedAt: new Date().toISOString(),
	}, null, 2), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "public, max-age=900",
		},
	});
};
