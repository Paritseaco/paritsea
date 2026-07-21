const base = (process.env.BASE_URL ?? "https://paritsea.co").replace(/\/$/, "");

const failures = [];
const check = (condition, message) => {
	if (!condition) failures.push(message);
};

async function read(path) {
	const response = await fetch(`${base}${path}`, { redirect: "manual" });
	return { response, body: await response.text() };
}

const canonicalRoutes = [
	"/", "/th", "/about", "/th/about", "/journal", "/th/journal",
	"/concepts", "/th/concepts", "/system", "/th/system",
	"/system/frameworks", "/th/system/frameworks", "/system/frameworks/paritsea-framework", "/th/system/frameworks/paritsea-framework",
	"/system/protocols", "/th/system/protocols", "/system/protocols/stp", "/th/system/protocols/stp",
	"/system/standards", "/th/system/standards", "/system/standards/asls-01", "/th/system/standards/asls-01",
	"/ip", "/th/ip", "/ip/licensing", "/th/ip/licensing", "/ip/official-use", "/th/ip/official-use",
	"/ip/official-use/agensea", "/th/ip/official-use/agensea",
	"/author/parit-ritchai", "/th/author/parit-ritchai", "/media", "/th/media", "/contact", "/th/contact",
	"/llms.txt", "/ai.txt", "/knowledge.json", "/robots.txt", "/sitemap.xml",
];

await Promise.all(canonicalRoutes.map(async (path) => {
	const { response, body } = await read(path);
	check(response.status === 200, `${path} expected 200, received ${response.status}`);
	if (response.headers.get("content-type")?.includes("text/html")) {
		const locale = path === "/th" || path.startsWith("/th/") ? "th" : "en";
		check(body.includes(`<html lang="${locale}"`), `${path} missing html lang=${locale}`);
		check(body.includes('id="main-content"'), `${path} missing main-content landmark`);
		check((body.match(/<link rel="canonical"/g) ?? []).length === 1, `${path} must emit one canonical link`);
		check((body.match(/<meta name="description"/g) ?? []).length === 1, `${path} must emit one description`);
		check((body.match(/<meta property="og:description"/g) ?? []).length === 1, `${path} must emit one OG description`);
		check(body.includes('hreflang="en"') && body.includes('hreflang="th"'), `${path} missing hreflang pair`);
		check(body.includes('hreflang="x-default"'), `${path} missing x-default hreflang`);
	}
}));

const englishHome = await read("/");
check(englishHome.body.includes("Some things are wrong before we have language for them."), "English Home missing author-led proposition");
check(englishHome.body.includes("Parit Ritchai"), "English Home missing author attribution");

const thaiHome = await read("/th");
check(thaiHome.body.includes("สิ่งที่ยังไม่มีชื่อ ไม่ได้แปลว่าเรายังมองไม่เห็น"), "Thai Home missing author-led proposition");
check(thaiHome.body.includes("ฉันใช้บันทึกสิ่งที่สังเกต"), "Thai Home missing first-person authorial voice");
check(thaiHome.body.includes("ปาริศ ฤทธิ์ชัย"), "Thai Home missing localized author attribution");

const detailRoutes = [
	"/system/frameworks/paritsea-framework", "/th/system/frameworks/paritsea-framework",
	"/system/protocols/stp", "/th/system/protocols/stp",
	"/system/standards/asls-01", "/th/system/standards/asls-01",
];

await Promise.all(detailRoutes.map(async (path) => {
	const { body } = await read(path);
	check(/Document record|ระเบียนเอกสาร/.test(body), `${path} missing document record`);
	check(/Version|เวอร์ชัน/.test(body), `${path} missing version`);
	check(/Provenance|ที่มา/.test(body), `${path} missing provenance`);
	check(/Lifecycle|Status|วงจรสถานะ|สถานะ/.test(body), `${path} missing lifecycle status`);
	check(body.includes("Breadcrumb"), `${path} missing breadcrumb`);
}));

const framework = await read("/system/frameworks/paritsea-framework");
check(/Version:?\s*1\.1|v1\.1/.test(framework.body), "Framework must expose version 1.1");
check(!framework.body.includes("It is immutable — it is referenced, not revised"), "Framework retains superseded immutability claim");
check(!framework.body.includes("article-hero-illustration"), "Framework still renders the retired decorative detail template");

const thaiFramework = await read("/th/system/frameworks/paritsea-framework");
check(thaiFramework.body.includes("เวอร์ชัน"), "Thai Framework missing localized version label");
check(!thaiFramework.body.includes("— Consensus"), "Thai Framework retains untranslated content blocks");
const thaiProtocol = await read("/th/system/protocols/stp");
for (const fragment of ["The observation that named this gap", "Protocol Position", "Any agency that cannot publicly commit"]) {
	check(!thaiProtocol.body.includes(fragment), `Thai STP retains untranslated fragment: ${fragment}`);
}
const thaiStandard = await read("/th/system/standards/asls-01");
for (const fragment of ["A. Structurally Aligned", "B. Structurally Incomplete", "C. Structurally Misaligned", "D. Structurally Opaque"]) {
	check(!thaiStandard.body.includes(fragment), `Thai ASLS-01 retains untranslated fragment: ${fragment}`);
}

const agensea = await read("/ip/official-use/agensea");
check(/provisional/i.test(agensea.body), "AgenSea must be identified as provisional");

const redirects = new Map([
	["/system/framework", "/system/frameworks/paritsea-framework"],
	["/licensing", "/ip/licensing"],
	["/implementation", "/ip/official-use"],
	["/implementations", "/ip/official-use"],
	["/en/journal", "/journal"],
]);

await Promise.all([...redirects].map(async ([path, target]) => {
	const { response } = await read(path);
	check(response.status === 301, `${path} expected 301, received ${response.status}`);
	check(new URL(response.headers.get("location"), base).pathname === target, `${path} must redirect directly to ${target}`);
}));

const missing = await read("/definitely-not-a-paritsea-route");
check(missing.response.status === 404, `unknown route expected 404, received ${missing.response.status}`);

const admin = await read("/_emdash/admin");
check(admin.response.status === 302, `admin expected 302, received ${admin.response.status}`);
check(admin.response.headers.get("location")?.includes("/_emdash/admin/login"), "admin must redirect to login, not setup");

const knowledgeResponse = await read("/knowledge.json");
check(knowledgeResponse.response.headers.get("content-type")?.includes("application/json"), "knowledge.json must use application/json");
const knowledge = JSON.parse(knowledgeResponse.body);
check(knowledge.author === "Parit Ritchai", "knowledge.json missing author authority");
check(knowledge.works?.some((work) => work.id === "doctrine" && work.version === "1.1"), "knowledge.json missing Framework v1.1");
check(knowledge.relationships?.length >= 3, "knowledge.json missing governed relationships");
check(knowledge.appliedContexts?.length >= 3, "knowledge.json missing reviewed applied contexts");
check(knowledge.officialUses?.some((use) => /agensea/i.test(JSON.stringify(use))), "knowledge.json missing AgenSea Official Use");

const sitemap = await read("/sitemap.xml");
check(!sitemap.body.includes(`<loc>${base}/licensing</loc>`), "sitemap contains legacy licensing route");
check(!sitemap.body.includes(`<loc>${base}/implementation</loc>`), "sitemap contains legacy implementation route");
const sitemapUrls = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
await Promise.all(sitemapUrls.map(async (sitemapUrl) => {
	const response = await fetch(sitemapUrl, { redirect: "manual" });
	check(response.status === 200, `sitemap URL ${sitemapUrl} expected 200, received ${response.status}`);
}));

if (failures.length) {
	throw new Error(`Production QA failures:\n- ${failures.join("\n- ")}`);
}

console.log(
	`Production QA passed: ${canonicalRoutes.length} canonical routes, ${redirects.size} redirects, ${sitemapUrls.length} sitemap URLs, content registry, metadata, 404, and admin auth.`,
);
