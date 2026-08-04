import { spawn } from "node:child_process";

const base = "http://127.0.0.1:4322";
const preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4322"], {
	stdio: ["ignore", "pipe", "pipe"],
	env: { ...process.env, NO_COLOR: "1" },
});

let output = "";
preview.stdout.on("data", (chunk) => { output += chunk; });
preview.stderr.on("data", (chunk) => { output += chunk; });

const stop = () => {
	if (!preview.killed) preview.kill("SIGTERM");
};
process.on("exit", stop);
process.on("SIGINT", () => { stop(); process.exit(130); });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitForServer() {
	for (let attempt = 0; attempt < 60; attempt += 1) {
		try {
			const response = await fetch(`${base}/robots.txt`);
			if (response.ok) return;
		} catch {}
		await sleep(250);
	}
	throw new Error(`Preview did not become ready.\n${output}`);
}

const failures = [];
function check(condition, message) {
	if (!condition) failures.push(message);
}

async function read(path, options) {
	const response = await fetch(`${base}${path}`, { redirect: "manual", ...options });
	return { response, body: await response.text() };
}

try {
	await waitForServer();

	const canonicalRoutes = [
		"/", "/th", "/about", "/th/about", "/journal", "/th/journal",
		"/concepts", "/th/concepts", "/system", "/th/system",
		"/system/frameworks", "/th/system/frameworks", "/system/frameworks/paritsea-framework", "/th/system/frameworks/paritsea-framework",
		"/system/protocols", "/th/system/protocols", "/system/protocols/stp", "/th/system/protocols/stp",
		"/system/standards", "/th/system/standards", "/system/standards/asls-01", "/th/system/standards/asls-01",
		"/ip", "/th/ip", "/ip/licensing", "/th/ip/licensing", "/ip/official-use", "/th/ip/official-use", "/ip/official-use/agensea", "/th/ip/official-use/agensea",
		"/author/parit-ritchai", "/th/author/parit-ritchai", "/media", "/th/media", "/contact", "/th/contact",
		"/llms.txt", "/ai.txt", "/knowledge.json", "/robots.txt", "/sitemap.xml",
	];

	for (const path of canonicalRoutes) {
		const { response, body } = await read(path);
		check(response.status === 200, `${path} expected 200, received ${response.status}`);
		if (response.headers.get("content-type")?.includes("text/html")) {
			const expectedLang = path === "/th" || path.startsWith("/th/") ? "th" : "en";
			check(body.includes(`<html lang="${expectedLang}"`), `${path} missing html lang=${expectedLang}`);
			check(body.includes('id="main-content"'), `${path} missing main content landmark`);
			check((body.match(/<link rel="canonical"/g) ?? []).length === 1, `${path} must emit one canonical link`);
			check((body.match(/<meta name="description"/g) ?? []).length === 1, `${path} must emit one description meta tag`);
			check((body.match(/<meta property="og:description"/g) ?? []).length === 1, `${path} must emit one OG description meta tag`);
			check(body.includes('hreflang="en"') && body.includes('hreflang="th"'), `${path} missing hreflang pair`);
			check(body.includes('hreflang="x-default"'), `${path} missing x-default hreflang`);
		}
	}

	for (const path of ["/journal/when-the-tool-was-not-the-problem", "/th/journal/when-the-tool-was-not-the-problem", "/system/protocols/stp", "/th/system/protocols/stp", "/system/standards/asls-01", "/th/system/standards/asls-01", "/system/frameworks/paritsea-framework", "/th/system/frameworks/paritsea-framework"]) {
		const { response, body } = await read(path);
		check(response.status === 200, `${path} detail expected 200`);
		check(body.includes('class="record-meta"'), `${path} missing document record`);
		check(body.includes("Breadcrumb"), `${path} missing breadcrumb`);
		check(/(Version|เวอร์ชัน)/.test(body), `${path} missing version label`);
		check(/(Provenance|ที่มา)/.test(body), `${path} missing provenance label`);
		check(/(Lifecycle|Status|วงจรสถานะ|สถานะ)/.test(body), `${path} missing lifecycle status label`);
		check(
			body.indexOf('class="record-meta"') > body.indexOf('class="article-content'),
			`${path} document record must follow the article body`,
		);
		check(
			body.includes("data-share-url") &&
			body.includes("data-save-article") &&
			body.includes("data-copy-url"),
			`${path} missing share/save/copy reading utilities`,
		);
	}

	const framework = await read("/system/frameworks/paritsea-framework");
	check(/(?:Version:?\s*1\.1|v1\.1)/.test(framework.body), "Framework page must expose version 1.1");
	check(!framework.body.includes("It is immutable — it is referenced, not revised"), "Framework wrapper still claims absolute immutability");
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

	const thaiAbout = await read("/th/about");
	const sharedThaiFounderBio = "ฉันคือ ปาริศ ฤทธิ์ชัย ผู้ก่อตั้ง Paritsea ฉันพัฒนาและเผยแพร่แนวคิดผ่านบทความ วิดีโอ และ Framework เพื่อช่วยให้คนมองเห็นต้นเหตุของปัญหา เลือกสิ่งที่ควรเปลี่ยน และนำความเข้าใจนั้นไปใช้ได้จริง";
	check(thaiAbout.body.includes("พื้นที่สำหรับคนที่อยากเข้าใจปัญหา ก่อนรีบเลือกวิธีแก้"), "Thai About missing reader-first proposition");
	check(thaiAbout.body.includes("ฉันชื่อ ปาริศ ฤทธิ์ชัย"), "Thai About missing founder introduction");
	check(thaiAbout.body.includes("ผู้ก่อตั้ง Paritsea · ผู้พัฒนาแนวคิดและ Framework"), "Thai About missing founder and idea-development roles");
	check(thaiAbout.body.includes("/images/home/parit-ritchai-portrait.jpg"), "Thai About missing founder portrait");
	check(thaiAbout.body.includes("แนวคิดบางส่วนจาก Paritsea ถูกพัฒนาเป็นบริการที่ใช้ได้จริงบน SE Ocean"), "Thai About missing broad SE Ocean service relationship");
	check(!thaiAbout.body.includes("สิ่งที่เว็บไซต์นี้จะไม่ทำ") && !thaiAbout.body.includes("Paritsea ไม่ใช่แฟ้มผลงาน"), "Thai About still leads with the retired governance narrative");
	const thaiHome = await read("/th");
	const thaiArticle = await read("/th/journal/when-the-tool-was-not-the-problem");
	check(thaiHome.body.includes(sharedThaiFounderBio), "Thai Home founder introduction is not using the shared profile");
	check(thaiArticle.body.includes(sharedThaiFounderBio), "Thai article founder card is not using the shared profile");
	for (const [path, body] of [["/th", thaiHome.body], ["/th/about", thaiAbout.body], ["/th/journal/when-the-tool-was-not-the-problem", thaiArticle.body]]) {
		check(!body.includes("ผู้เขียน Paritsea"), `${path} still presents the founder as only the author of Paritsea`);
	}

	const redirects = new Map([
		["/system/framework", "/system/frameworks/paritsea-framework"],
		["/licensing", "/ip/licensing"],
		["/implementation", "/ip/official-use"],
		["/implementations", "/ip/official-use"],
		["/en/journal", "/journal"],
	]);
	for (const [path, target] of redirects) {
		const { response } = await read(path);
		check(response.status === 301, `${path} expected 301, received ${response.status}`);
		check(new URL(response.headers.get("location"), base).pathname === target, `${path} must redirect directly to ${target}`);
	}

	const adminView = await read("/posts/when-the-tool-was-not-the-problem");
	check(adminView.response.status === 302, `/posts/{slug} expected 302, received ${adminView.response.status}`);
	check(
		new URL(adminView.response.headers.get("location"), base).pathname ===
			"/journal/when-the-tool-was-not-the-problem",
		"/posts/{slug} must resolve through Content Type to the public Journal route",
	);

	const missing = await read("/definitely-not-a-paritsea-route");
	check(missing.response.status === 404, `unknown route expected 404, received ${missing.response.status}`);

	const sitemap = await read("/sitemap.xml");
	check(!sitemap.body.includes(`<loc>${base}/licensing</loc>`), "sitemap contains legacy licensing route");
	check(!sitemap.body.includes(`<loc>${base}/implementation</loc>`), "sitemap contains legacy implementation route");
	check(sitemap.body.includes("/ip/official-use</loc>"), "sitemap missing Official Use hub");
	const sitemapUrls = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
	for (const sitemapUrl of sitemapUrls) {
		const sitemapPath = new URL(sitemapUrl).pathname;
		const result = await read(sitemapPath);
		check(result.response.status === 200, `sitemap URL ${sitemapPath} expected 200, received ${result.response.status}`);
	}

	const knowledgeResponse = await read("/knowledge.json");
	check(knowledgeResponse.response.headers.get("content-type")?.includes("application/json"), "knowledge.json must use application/json");
	const knowledge = JSON.parse(knowledgeResponse.body);
	check(Array.isArray(knowledge.works), "knowledge.json missing works array");
	check(knowledge.founder === "Parit Ritchai", "knowledge.json missing founder identity");
	check(knowledge.author === "Parit Ritchai", "knowledge.json missing author authority");
	check(knowledge.works.some((work) => work.id === "doctrine" && work.version === "1.1"), "knowledge.json missing Framework v1.1");
	check(Array.isArray(knowledge.relationships) && knowledge.relationships.length >= 3, "knowledge.json missing governed relationships");
	check(Array.isArray(knowledge.appliedContexts) && knowledge.appliedContexts.length >= 3, "knowledge.json missing reviewed applied contexts");
	const aiText = await read("/ai.txt");
	check(aiText.body.includes("Founder, originator, and author of record: Parit Ritchai"), "ai.txt missing founder role");
	const llmsText = await read("/llms.txt");
	check(llmsText.body.includes("founded by Parit Ritchai"), "llms.txt missing founder identity");

	if (failures.length) throw new Error(`Smoke failures:\n- ${failures.join("\n- ")}`);
	console.log(`Smoke passed: ${canonicalRoutes.length} canonical routes, ${redirects.size} redirects, detail metadata, 404, sitemap, and machine-readable registry.`);
} finally {
	stop();
}
