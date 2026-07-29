import { definePlugin } from "emdash";
import type {
	PluginDescriptor,
	ResolvedPlugin,
	RouteContext,
} from "emdash";

const PLUGIN_ID = "paritsea-translation-assistant";
const TRANSLATABLE_FIELDS = [
	"title",
	"excerpt",
	"content",
	"provenance_summary",
	"scope_note",
	"non_claims",
	"evidence_note",
] as const;
const TRANSLATION_MODELS = [
	"gemini-3.5-flash",
	"gemini-3.1-flash-lite",
] as const;

type TargetLocale = "en" | "th";

async function runtimeSecret(name: string): Promise<string | undefined> {
	// Keep the Workers-only module out of Astro's config evaluation. The plugin
	// module is also imported at build time so a top-level cloudflare:workers
	// import would make `astro check` fail in Node.
	const { env } = await import("cloudflare:workers");
	const value = (env as unknown as Record<string, unknown>)[name];
	return typeof value === "string" && value ? value : undefined;
}

function extractJson(text: string): Record<string, unknown> {
	const cleaned = text.trim()
		.replace(/^```(?:json)?\s*/i, "")
		.replace(/\s*```$/, "");
	const parsed = JSON.parse(cleaned) as unknown;
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw new Error("Translation provider returned an invalid document.");
	}
	return parsed as Record<string, unknown>;
}

function validateTranslatedFields(
	source: Record<string, unknown>,
	translated: Record<string, unknown>,
): Record<string, unknown> {
	const result: Record<string, unknown> = {};

	for (const field of TRANSLATABLE_FIELDS) {
		if (!(field in source)) continue;
		const value = translated[field];
		if (field === "content") {
			if (!Array.isArray(value)) throw new Error("Translated article body is missing.");
			result[field] = value;
			continue;
		}
		if (typeof source[field] === "string" && typeof value !== "string") {
			throw new Error(`Translated field "${field}" is missing.`);
		}
		if (value !== undefined) result[field] = value;
	}

	if (typeof result.title !== "string" || !result.title.trim()) {
		throw new Error("Translated title is missing.");
	}
	return result;
}

async function translateHandler(
	ctx: RouteContext,
): Promise<Record<string, unknown>> {
	const input = ctx.input as { sourceId?: unknown; targetLocale?: unknown };
	const sourceId = typeof input.sourceId === "string" ? input.sourceId : "";
	const targetLocale = input.targetLocale === "en" || input.targetLocale === "th"
		? input.targetLocale
		: null;

	if (!sourceId || !targetLocale) {
		throw new Response(JSON.stringify({ error: "Source and target language are required." }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
	if (!ctx.content) throw new Error("Content access is not available.");

	const source = await ctx.content.get("posts", sourceId);
	if (!source) {
		throw new Response(JSON.stringify({ error: "Source article was not found." }), {
			status: 404,
			headers: { "Content-Type": "application/json" },
		});
	}
	if (source.locale === targetLocale) {
		throw new Response(JSON.stringify({ error: "Target language must differ from the source." }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const fields = Object.fromEntries(
		TRANSLATABLE_FIELDS
			.filter((field) => source.data[field] !== undefined && source.data[field] !== null)
			.map((field) => [field, source.data[field]]),
	);
	const apiKey = await runtimeSecret("GEMINI_API_KEY");
	if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");
	if (!ctx.http) throw new Error("Translation network access is not available.");

	const sourceLanguage = source.locale === "th" ? "Thai" : "English";
	const targetLanguage = targetLocale === "th" ? "Thai" : "English";
	const styleInstruction = targetLocale === "th"
		? "Write natural, clear Thai for Thai readers. Do not translate English syntax literally. Prefer ordinary Thai phrasing while preserving the author's precision and first-person voice."
		: "Write natural, clear international English. Do not mirror Thai syntax literally. Preserve the author's precision and first-person voice.";
	const prompt = [
		`Translate this Paritsea intellectual work from ${sourceLanguage} to ${targetLanguage}.`,
		styleInstruction,
		"Return only one JSON object with exactly the same field names and Portable Text structure.",
		"Translate human-readable text only. Preserve _type, _key, style, listItem, level, marks, markDefs, URLs, IDs, numbers, versions, and the terms Paritsea, SE Ocean, Journal, Concept, Framework, Protocol, Standard, IP, and Official Use.",
		"Do not add claims, examples, headings, explanations, or marketing language.",
		"Portable Text children must remain in the same order and marks must remain attached to the same spans.",
		JSON.stringify(fields),
	].join("\n\n");

	const requestBody = JSON.stringify({
		contents: [{ role: "user", parts: [{ text: prompt }] }],
		generationConfig: {
			responseMimeType: "application/json",
			temperature: 0.2,
			maxOutputTokens: 65536,
		},
	});
	let response: Response | null = null;
	let modelUsed: (typeof TRANSLATION_MODELS)[number] | null = null;

	for (const model of TRANSLATION_MODELS) {
		response = await ctx.http.fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-goog-api-key": apiKey,
				},
				body: requestBody,
			},
		);
		if (response.ok) {
			modelUsed = model;
			break;
		}

		const detail = await response.text();
		ctx.log.error(`Gemini ${model} failed (${response.status}): ${detail.slice(0, 500)}`);
		if (![404, 429, 503].includes(response.status)) break;
	}

	if (!response?.ok || !modelUsed) {
		throw new Error(`Translation provider failed with status ${response?.status ?? "unknown"}.`);
	}

	const payload = await response.json() as {
		candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
	};
	const text = payload.candidates?.[0]?.content?.parts
		?.map((part) => part.text ?? "")
		.join("")
		.trim();
	if (!text) throw new Error("Translation provider returned no text.");

	const translatedData = validateTranslatedFields(fields, extractJson(text));
	return {
		sourceId: source.id,
		sourceLocale: source.locale,
		targetLocale,
		slug: source.slug,
		sourceData: source.data,
		sourceSeo: source.seo ?? null,
		translatedData,
		model: modelUsed,
	};
}

export function translationAssistantPlugin(): PluginDescriptor {
	return {
		id: PLUGIN_ID,
		version: "1.0.0",
		format: "native",
		entrypoint: "@paritsea/emdash-translation-assistant",
		adminEntry: "@paritsea/emdash-translation-assistant/admin",
		capabilities: ["read:content", "network:fetch"],
		allowedHosts: ["generativelanguage.googleapis.com"],
		adminPages: [{ path: "/", label: "แปล EN / TH", icon: "language" }],
	};
}

export function createPlugin(): ResolvedPlugin {
	return definePlugin({
		id: PLUGIN_ID,
		version: "1.0.0",
		capabilities: ["read:content", "network:fetch"],
		allowedHosts: ["generativelanguage.googleapis.com"],
		routes: {
			translate: {
				handler: translateHandler,
			},
		},
		admin: {
			pages: [{ path: "/", label: "แปล EN / TH", icon: "language" }],
		},
	});
}
