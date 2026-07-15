import { execFileSync } from "node:child_process";

const urlArg = process.argv.find((arg) => arg.startsWith("--url="));
const url = urlArg?.slice("--url=".length) || "http://localhost:4321";

function emdash(args) {
	const output = execFileSync("npx", ["emdash", ...args, "--url", url, "--json"], {
		cwd: process.cwd(),
		encoding: "utf8",
		stdio: ["ignore", "pipe", "inherit"],
	});
	return JSON.parse(output);
}

const works = emdash(["content", "list", "posts", "--status", "published", "--limit", "100"]).items;
const bySlug = new Map(works.map((item) => [item.slug, item]));

const journalDefaults = {
	content_type: "journal",
	intellectual_stage: "observation",
	lifecycle_status: "exploring",
	document_version: "0.1",
	provenance_summary: "An authored observation preserved before formalization; revision history remains part of the public record.",
	scope_note: "Records what was observed, interpreted, and questioned in the context named by the entry.",
	non_claims: "This entry is not a universal claim, a diagnostic result, or a finalized Framework, Protocol, or Standard.",
	evidence_note: "Evidence remains contextual unless a later governed work explicitly formalizes the pattern.",
	last_reviewed_at: "2026-07-15T00:00:00.000Z",
};

const metadata = new Map([
	["doctrine", {
		content_type: "framework",
		intellectual_stage: "formalized",
		lifecycle_status: "current",
		document_version: "1.1",
		provenance_summary: "Authored by Parit Ritchai from recurring observations about structural coherence and legitimacy; revision 1.1 replaces absolute immutability with explicit, attributable, versioned change governance.",
		scope_note: "A canonical lens for examining structural coherence and legitimacy. It does not determine moral virtue, commercial success, or universal applicability.",
		non_claims: "This Framework is not a regulator, certification, audit result, or permission for an applied interpreter to alter the canonical source.",
		evidence_note: "Practice may return de-identified field evidence for review; evidence does not change the Framework without a published revision.",
		last_reviewed_at: "2026-07-15T00:00:00.000Z",
	}],
	["stp", {
		content_type: "protocol",
		intellectual_stage: "formalized",
		lifecycle_status: "current",
		document_version: "1.0",
		provenance_summary: "Developed from the Paritsea Framework and the Journal observation on aesthetic transparency.",
		scope_note: "Defines obligations for structural transparency within the conditions stated in the document.",
		non_claims: "This Protocol is not certification, an audit result, or a claim that one implementation fits every organization.",
		evidence_note: "Applied evidence requires confidentiality review and a separate governed revision before changing this Protocol.",
		last_reviewed_at: "2026-07-15T00:00:00.000Z",
	}],
	["asls-01", {
		content_type: "standard",
		intellectual_stage: "formalized",
		lifecycle_status: "current",
		document_version: "1.0",
		provenance_summary: "Developed from Structural Transparency Protocol (STP) version 1.0.",
		scope_note: "Defines thresholds for assessing Protocol obligations within its stated scope.",
		non_claims: "This Standard does not create certification, endorsement, or a universal judgment by itself.",
		evidence_note: "Evidence from use may inform review but cannot silently redefine the Standard.",
		last_reviewed_at: "2026-07-15T00:00:00.000Z",
	}],
]);

for (const item of works) {
	const current = emdash(["content", "get", "posts", item.id]);
	const patch = metadata.get(item.slug) ?? (current.data.framework_page === "the-method" ? journalDefaults : null);
	if (!patch) continue;

	const next = { ...current.data, ...patch };
	if (item.slug === "doctrine" && typeof next.content === "string") {
		next.content = next.content
			.replace("_Constitutional Foundation — Immutable_", "_Canonical Foundation — Version-governed_")
			.replace("## Section VI — Immutability", "## Section VI — Canonical change")
			.replace(
				"The Paritsea Framework is immutable. It forms the constitutional foundation for all derived protocols and standards. Derived instruments may evolve, provided they do not contradict the Framework.",
				"The Paritsea Framework is a canonical, version-governed source. Its meaning may change only through an explicit revision authored by Parit Ritchai and published by Paritsea with the prior record preserved. Applied adaptations and commercial agreements cannot silently redefine it.",
			)
			.replace("_Framework Version: 1.0 — Constitutional Text_", "_Framework Version: 1.1 — Version-governed canonical text_");
	}

	emdash(["content", "update", "posts", item.id, "--rev", current._rev, "--data", JSON.stringify(next)]);
}

const refreshed = emdash(["content", "list", "posts", "--status", "published", "--limit", "100"]).items;
const refreshedBySlug = new Map(refreshed.map((item) => [item.slug, item]));

function ensureRecord(collection, slug, data) {
	const existing = emdash(["content", "list", collection, "--limit", "100"]).items;
	if (existing.some((item) => item.slug === slug)) return;
	emdash(["content", "create", collection, "--slug", slug, "--data", JSON.stringify(data)]);
}

const relationshipSpecs = [
	["stp-developed-from-framework", "stp", "doctrine", "developed-from", "STP develops an operational obligation from the canonical Framework."],
	["stp-developed-from-aesthetic-transparency", "stp", "aesthetic-transparency", "developed-from", "The Protocol responds to the distinction between visible disclosure and structural transparency."],
	["asls-developed-from-stp", "asls-01", "stp", "developed-from", "ASLS-01 sets thresholds for obligations named in STP."],
];

for (const [slug, sourceSlug, targetSlug, type, note] of relationshipSpecs) {
	const source = refreshedBySlug.get(sourceSlug);
	const target = refreshedBySlug.get(targetSlug);
	if (!source || !target) continue;
	ensureRecord("relationships", slug, {
		title: `${sourceSlug} ${type} ${targetSlug}`,
		source_work: source.id,
		target_work: target.id,
		relationship_type: type,
		relationship_note: note,
		sort_order: 10,
	});
}

const appliedSpecs = [
	["automation-fear-se-ocean-context", "on-automation-that-still-requires-fear", "https://seocean.co.th/problems/tools-accelerate-confusion", "A related organizational problem at SE Ocean; the applied page is not the canonical source."],
	["tool-not-problem-se-ocean-context", "when-the-tool-was-not-the-problem", "https://seocean.co.th/problems/tools-accelerate-confusion", "A related organizational problem at SE Ocean; application does not transfer source ownership."],
	["emotional-monitoring-se-ocean-context", "when-monitoring-becomes-emotional-labour", "https://seocean.co.th/problems/invisible-fixers-hold-system", "A related organizational problem at SE Ocean reviewed for public cross-linking."],
];

for (const [slug, workSlug, publicUrl, summary] of appliedSpecs) {
	const work = refreshedBySlug.get(workSlug);
	if (!work) continue;
	ensureRecord("applied_contexts", slug, {
		title: `Applied context for ${workSlug}`,
		related_work: work.id,
		context_type: "se-ocean-problem",
		public_url: publicUrl,
		context_summary: summary,
		disclosure_status: "reviewed-public",
		last_reviewed_at: "2026-07-15T00:00:00.000Z",
	});
}

console.log(`Migrated ${works.length} intellectual works at ${url}.`);
