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
check(englishHome.body.includes("Ideas for seeing a problem differently"), "English Home missing problem-led proposition");
check(englishHome.body.includes("What do you want to do with the work?"), "English Home missing intent-led entry paths");
check(englishHome.body.includes("What can you use, and when should you ask?"), "English Home missing use and permission boundary");
check(englishHome.body.includes("Parit Ritchai"), "English Home missing author attribution");

const thaiHome = await read("/th");
check(thaiHome.body.includes("Paritsea คือพื้นที่รวมแนวคิด"), "Thai Home missing direct Paritsea definition");
check(thaiHome.body.includes("ฉันรวบรวมข้อสังเกต"), "Thai Home missing first-person authorial voice");
check(thaiHome.body.includes("มาที่นี่เพื่อทำอะไร"), "Thai Home missing intent-led entry paths");
check(thaiHome.body.includes("ใช้ได้แค่ไหน และเมื่อใดต้องขออนุญาต"), "Thai Home missing use and permission boundary");
check(thaiHome.body.includes("ปาริศ ฤทธิ์ชัย"), "Thai Home missing localized author attribution");

const thaiAbout = await read("/th/about");
const sharedThaiAuthorBio = "ฉันคือ ปาริศ ฤทธิ์ชัย ผู้เขียน Paritsea ฉันสนใจปัญหาที่แก้ไม่จบเพราะเรามักมองเหตุผิดจุด และเขียนแนวคิดที่ช่วยให้เห็นต้นเหตุ เลือกสิ่งที่ควรเปลี่ยน และนำไปใช้ได้จริง";
check(thaiAbout.body.includes("พื้นที่สำหรับคนที่อยากเข้าใจปัญหา ก่อนรีบเลือกวิธีแก้"), "Thai About missing reader-first proposition");
check(thaiAbout.body.includes("ฉันชื่อ ปาริศ ฤทธิ์ชัย"), "Thai About missing personal author introduction");
check(thaiAbout.body.includes("/images/home/parit-ritchai-portrait.jpg"), "Thai About missing author portrait");
check(thaiAbout.body.includes("แนวคิดบางส่วนจาก Paritsea ถูกพัฒนาเป็นบริการที่ใช้ได้จริงบน SE Ocean"), "Thai About missing broad SE Ocean service relationship");
check(!thaiAbout.body.includes("สิ่งที่เว็บไซต์นี้จะไม่ทำ") && !thaiAbout.body.includes("Paritsea ไม่ใช่แฟ้มผลงาน"), "Thai About still leads with the retired governance narrative");
check(thaiHome.body.includes(sharedThaiAuthorBio), "Thai Home author introduction is not using the shared profile");

const detailRoutes = [
	"/system/frameworks/paritsea-framework", "/th/system/frameworks/paritsea-framework",
	"/system/protocols/stp", "/th/system/protocols/stp",
	"/system/standards/asls-01", "/th/system/standards/asls-01",
];

await Promise.all(detailRoutes.map(async (path) => {
	const { body } = await read(path);
	check(body.includes('<details class="record-meta"'), `${path} missing document record`);
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

const thaiJournal = await read("/th/journal");
for (const [thaiTitle, englishTitle] of [
	["ความโปร่งใสที่เห็น อาจไม่ใช่ความโปร่งใสที่แท้จริง", "Transparency Is Often Aesthetic. Rarely Structural."],
	["ก่อนเปลี่ยนเครื่องมือ ต้องรู้ก่อนว่าปัญหาอยู่ที่ไหน", "When the Tool Was Not the Problem"],
	["เมื่อระบบทำให้ใครบางคนต้องคอยกังวลแทนทุกคน", "When Monitoring Becomes Emotional Labour"],
]) {
	check(thaiJournal.body.includes(thaiTitle), `/th/journal missing Thai legacy title: ${thaiTitle}`);
	check(!thaiJournal.body.includes(`>${englishTitle}<`), `/th/journal exposes English legacy title: ${englishTitle}`);
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

const latestJournalSlug = "when-employees-lack-ownership";
const latestJournalPath = `/journal/${latestJournalSlug}`;
const latestJournal = await read(latestJournalPath);
check(latestJournal.response.status === 200, `${latestJournalPath} expected 200, received ${latestJournal.response.status}`);
check(
	latestJournal.body.includes("When “Employees Lack Ownership” Isn’t Actually a People Problem"),
	"latest Journal entry missing its published title",
);
check(
	latestJournal.body.includes("youtube-nocookie.com/embed/q1vH9q-HwX8"),
	"latest Journal entry missing its YouTube embed",
);
check(
	latestJournal.body.includes("data-share-url") &&
	latestJournal.body.includes("data-save-article") &&
	latestJournal.body.includes("data-copy-url"),
	"latest Journal entry missing share/save/copy reading utilities",
);
const videoPosition = latestJournal.body.indexOf("article-video-embed");
const articlePosition = latestJournal.body.indexOf("article-content");
const recordPosition = latestJournal.body.indexOf('<details class="record-meta"');
check(
	videoPosition >= 0 && articlePosition >= 0 && videoPosition < articlePosition,
	"latest Journal video must appear before the full article body",
);
check(
	recordPosition >= 0 && articlePosition >= 0 && recordPosition > articlePosition,
	"latest Journal provenance record must appear after the full article body",
);

const journalHub = await read("/journal");
check(journalHub.body.includes(latestJournalPath), "Journal hub does not link to the latest published entry");

const adminView = await read(`/posts/${latestJournalSlug}`);
check(adminView.response.status === 302, `admin View route expected 302, received ${adminView.response.status}`);
check(
	new URL(adminView.response.headers.get("location"), base).pathname === latestJournalPath,
	"admin View route does not resolve to the canonical Journal URL",
);

const thaiLatestPath = `/th/journal/${latestJournalSlug}`;
const thaiLatest = await read(thaiLatestPath);
const thaiLatestUrl = `${base}${thaiLatestPath}`;
if (thaiLatest.response.status === 200) {
	check(thaiLatest.body.includes(sharedThaiAuthorBio), "Thai article author card is not using the shared profile");
	check(sitemapUrls.includes(thaiLatestUrl), "published Thai translation exists but is absent from the sitemap");
} else {
	check(!sitemapUrls.includes(thaiLatestUrl), "missing Thai translation must not be advertised in the sitemap");
	check(!thaiLatest.response.headers.get("location"), "missing Thai translation must not silently redirect as if translated");
}

if (failures.length) {
	throw new Error(`Production QA failures:\n- ${failures.join("\n- ")}`);
}

console.log(
	`Production QA passed: ${canonicalRoutes.length} canonical routes, ${redirects.size} redirects, ${sitemapUrls.length} sitemap URLs, latest Journal/YouTube/admin View, locale-aware sitemap, content registry, metadata, 404, and admin auth.`,
);
