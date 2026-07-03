export type SiteLocale = "th" | "en";

type PortableTextBlock = {
	children?: Array<{ text?: string; [key: string]: unknown }>;
	[key: string]: unknown;
};

const TH_PREFIX = "/th";

export function getLocaleFromPath(pathname: string): SiteLocale {
	return pathname === TH_PREFIX || pathname.startsWith(`${TH_PREFIX}/`) ? "th" : "en";
}

export function getAstroLocale(Astro: { url: URL; locals: { locale?: unknown } }): SiteLocale {
	const queryLocale = Astro.url.searchParams.get("__locale");
	if (queryLocale === "en" || queryLocale === "th") return queryLocale;
	const localValue = Astro.locals.locale;
	if (localValue === "en" || localValue === "th") return localValue;
	return getLocaleFromPath(Astro.url.pathname);
}

export function stripLocalePrefix(pathname: string): string {
	if (pathname === TH_PREFIX) return "/";
	if (pathname.startsWith(`${TH_PREFIX}/`)) return pathname.slice(TH_PREFIX.length) || "/";
	return pathname || "/";
}

export function localizedPath(path: string | null | undefined, locale: SiteLocale): string {
	const normalized = path && path.startsWith("/") ? path : `/${path ?? ""}`;
	const stripped = stripLocalePrefix(normalized);
	if (locale === "th") return stripped === "/" ? TH_PREFIX : `${TH_PREFIX}${stripped}`;
	return stripped;
}

export function alternatePath(path: string, locale: SiteLocale): string {
	return localizedPath(path, locale === "en" ? "th" : "en");
}

export function formatDateForLocale(date: Date | null | undefined, locale: SiteLocale) {
	if (!date) return null;
	return date.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export const ui = {
  en: {
    search: "Search...",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    themeSystem: "System theme",
    admin: "Admin",
    footerTagline: "Where systems meet humanity — a way of thinking that understands both the complexity of the world and the depth of human experience.",
    frameworkLayers: "Framework Layers",
    legalContact: "Legal & Contact",
    licensing: "Licensing",
    contact: "Contact",
    languageSwitch: "TH",
    about: "About",
    aboutShort: "About",
    socialFollow: "Follow",
    socialInstagram: "Instagram",
    socialThreads: "Threads",
    socialYouTube: "YouTube",
    authorName: "Parit Ritchai",
    authorRole: "Author of Paritsea · Founder of SE Ocean",
    authorBio: "Paritsea is the public reference layer for a way of thinking that reads people and systems together. It preserves the original framework, governed instruments, and boundaries for citation, adaptation, licensing, and implementation without turning the source into a service funnel.",
    readDoctrine: "Read Framework",
    exploreMethod: "Explore Journal",
    viewImplementations: "View Implementations",
    startHere: "Start here",
    startHereDesc: "New to Paritsea? Begin with the foundational position, then explore analytical entries, or see applied systems.",
    followOn: "Follow on",
    navLabels: {
      // Phase 2 vocabulary — matches new seed menu labels
      Journal: "Journal",
      System: "System",
      Framework: "Framework",
      Protocols: "Protocols",
      Standards: "Standards",
      Implementation: "Implementation",
      // Legacy keys kept for fallback safety
      "The Doctrine": "Framework",
      "The Method": "Journal",
      Implementations: "Implementation",
    },
    labels: {
      author: "Author",
      authors: "Authors",
      lastUpdated: "Last updated",
      readingTime: "Reading time",
      readership: "Readership",
      copyUrl: "Copy URL",
      copied: "Page URL copied.",
      copyFailed: "Could not copy the page URL automatically.",
      minRead: "min read",
      reads: "reads",
      onThisPage: "On this page",
      continueReading: "Continue reading",
      constitutionalDocument: "Constitutional Document",
      doctrineNotice:
        "This document forms the foundational authority for all Paritsea Protocols and Standards. It is immutable — it is referenced, not revised.",
      constitutionalDoctrine: "Constitutional Framework",
      protocol: "Protocol",
      standard: "Standard",
      implementation: "Implementation",
      doctrine: "Framework",
    },
  },
  th: {
    search: "ค้นหา...",
    menuOpen: "เปิดเมนู",
    menuClose: "ปิดเมนู",
    themeLight: "สว่าง",
    themeDark: "มืด",
    themeSystem: "ตามระบบ",
    admin: "จัดการเว็บ",
    footerTagline: "ที่ที่ระบบและมนุษย์มาบรรจบกัน — วิธีคิดที่เข้าใจทั้งความซับซ้อนของโลกและความรู้สึกของคน",
    frameworkLayers: "สถาปัตยกรรมอ้างอิง",
    legalContact: "สิทธิ์ & ติดต่อ",
    licensing: "สิทธิ์การใช้",
    contact: "ติดต่อ",
    languageSwitch: "EN",
    about: "เกี่ยวกับ",
    aboutShort: "เกี่ยวกับ",
    socialFollow: "ติดตาม",
    socialInstagram: "Instagram",
    socialThreads: "Threads",
    socialYouTube: "YouTube",
    authorName: "Parit Ritchai",
    authorRole: "ผู้เขียน Paritsea · ผู้ก่อตั้ง SE Ocean",
    authorBio: "Paritsea คือชั้นอ้างอิงสาธารณะของวิธีคิดที่อ่านคนและระบบไปพร้อมกัน เก็บ Framework ต้นทาง เครื่องมือที่มีกฎกำกับ และขอบเขตการอ้างอิง ดัดแปลง ขอสิทธิการใช้ และนำไปใช้จริง โดยไม่ทำให้ต้นฉบับกลายเป็น funnel ของบริการ",
    readDoctrine: "อ่าน Framework",
    exploreMethod: "สำรวจ Journal",
    viewImplementations: "ดูการนำไปปรับใช้จริง",
    startHere: "เริ่มตรงนี้",
    startHereDesc: "ใหม่กับ Paritsea? เริ่มจาก Framework แล้วค่อยสำรวจ Journal หรือดู Implementation",
    followOn: "ติดตาม",
    navLabels: {
      // Navigation is FULLY ENGLISH in TH + EN (D-029). No Thai nav terms.
      // แก่น is NEVER used. การประยุกต์ใช้ is deprecated.
      Journal: "Journal",
      System: "System",
      Framework: "Framework",
      Protocols: "Protocols",
      Standards: "Standards",
      Implementation: "Implementation",
      // Legacy keys kept for fallback safety
      "The Doctrine": "Framework",
      "The Method": "Journal",
      Implementations: "Implementation",
    },
    labels: {
      author: "ผู้เขียน",
      authors: "ผู้เขียน",
      lastUpdated: "อัปเดตล่าสุด",
      readingTime: "เวลาอ่าน",
      readership: "จำนวนการอ่าน",
      copyUrl: "คัดลอกลิงก์",
      copied: "คัดลอกลิงก์แล้ว",
      copyFailed: "คัดลอกไม่สำเร็จ",
      minRead: "นาที",
      reads: "ครั้ง",
      onThisPage: "ในหน้านี้",
      continueReading: "อ่านต่อ",
      constitutionalDocument: "เอกสาร Framework",
      doctrineNotice:
        "เอกสารนี้เป็นฐานรากของโปรโตคอลและมาตรฐานทั้งหมดของ Paritsea — ไม่เปลี่ยนรูป",
      constitutionalDoctrine: "Paritsea Framework",
      protocol: "Protocol",
      standard: "มาตรฐาน",
      implementation: "การนำไปปรับใช้จริง",
      doctrine: "Framework",
    },
  },
} as const;

const categoryLabels: Record<string, string> = {
	"Seeing Clearly": "การมองให้ชัด",
	"Human Cost": "ต้นทุนมนุษย์",
	"Structural Tension": "แรงตึงเชิงโครงสร้าง",
	Foundational: "ฐานราก",
	Active: "ใช้งานอยู่",
};

const postTranslations: Record<string, { title: string; excerpt?: string; content: Record<string, string> }> = {
	doctrine: {
		title: "Paritsea Framework ว่าด้วยความสอดคล้องเชิงโครงสร้างและความชอบธรรม",
		excerpt: "Paritsea วางความสอดคล้องเชิงโครงสร้างไว้เป็นเงื่อนไขพื้นฐานของความชอบธรรมในทุกระบบที่จัดระเบียบ",
		content: {
			"Constitutional Foundation — Immutable": "ฐาน Framework — ไม่เปลี่ยนรูป",
			"Section I — Foundational Premise": "หมวด I — ข้อตั้งต้น",
			"Paritsea establishes structural coherence as a prerequisite for legitimacy in any organised system.":
				"Paritsea วางความสอดคล้องเชิงโครงสร้างไว้เป็นเงื่อนไขพื้นฐานของความชอบธรรมในทุกระบบที่จัดระเบียบ",
			"Legitimacy is not conferred by:": "ความชอบธรรมไม่ได้มาจาก:",
			"— Consensus\n— Popularity\n— Longevity\n— Institutional endorsement\n— Market scale":
				"— ฉันทามติ\n— ความนิยม\n— การอยู่มานาน\n— การรับรองจากสถาบัน\n— ขนาดของตลาด",
			"Legitimacy arises from structural coherence.": "ความชอบธรรมเกิดจากความสอดคล้องของโครงสร้าง",
			"Legitimacy, within Paritsea, is a structural condition — not a moral endorsement.":
				"ในกรอบ Paritsea ความชอบธรรมคือสภาวะที่โครงสร้างกำหนด ไม่ใช่การรับรองทางศีลธรรม",
			"Section II — Structural Coherence": "หมวด II — ความสอดคล้องเชิงโครงสร้าง",
			"Structural coherence requires:": "ความสอดคล้องเชิงโครงสร้างต้องมี:",
			"— Internal consistency\n— Defined authority\n— Defined accountability\n— Alignment between declared function and operational behaviour\n— Transparent allocation of responsibility\n— Logical integrity across decision layers":
				"— ความสอดคล้องภายใน\n— อำนาจที่กำหนดชัด\n— ความรับผิดที่กำหนดชัด\n— ความตรงกันระหว่างหน้าที่ที่ประกาศไว้กับสิ่งที่ทำจริง\n— การจัดสรรความรับผิดอย่างโปร่งใส\n— ความสมเหตุสมผลทางตรรกะข้ามชั้นการตัดสินใจ",
			"A structure may be widely accepted yet internally incoherent. Institutionalisation does not resolve incoherence.":
				"โครงสร้างที่ได้รับการยอมรับอย่างกว้างขวางอาจยังไม่สอดคล้องภายในก็ได้ การกลายเป็นสถาบันไม่ได้แก้ไขความไม่สอดคล้องนั้น",
			"Section III — Distortion and Normalisation": "หมวด III — การบิดเบือนและการทำให้เป็นปกติ",
			"Distortions may become normalised through repetition. Normalisation does not transform distortion into legitimacy. A system that endures without coherence remains structurally deficient.":
				"การบิดเบือนกลายเป็นเรื่องปกติได้เมื่อถูกทำซ้ำ แต่การเป็นปกติไม่ได้เปลี่ยนการบิดเบือนให้เป็นความชอบธรรม ระบบที่ยืนหยัดได้โดยไม่มีความสอดคล้องยังคงบกพร่องเชิงโครงสร้าง",
			"Section IV — Reform and Replacement": "หมวด IV — การปฏิรูปและการแทนที่",
			"Structural reform is justified only when it increases coherence and integrity. Replacement for novelty is not reform. Rejection of a structure must be grounded in structural incoherence, not ideological preference.":
				"การปฏิรูปเชิงโครงสร้างมีความชอบธรรมเฉพาะเมื่อมันเพิ่มความสอดคล้องและความสมบูรณ์ การแทนที่เพราะต้องการความใหม่ไม่ใช่การปฏิรูป การปฏิเสธโครงสร้างต้องมีฐานจากความไม่สอดคล้องเชิงโครงสร้าง ไม่ใช่ความชอบทางอุดมการณ์",
			"Section V — Scope": "หมวด V — ขอบเขต",
			"Paritsea evaluates structural coherence only. It does not evaluate outcomes, popularity, performance, or success.":
				"Paritsea ประเมินเฉพาะความสอดคล้องเชิงโครงสร้าง ไม่ประเมินผลลัพธ์ ความนิยม สมรรถนะ หรือความสำเร็จ",
			"It does not evaluate:\n— Moral virtue\n— Political ideology\n— Cultural preference\n— Financial scale\n— Popular support\n— Strategic success":
				"กรอบนี้ไม่ประเมิน:\n— คุณค่าทางศีลธรรม\n— อุดมการณ์ทางการเมือง\n— ความชอบทางวัฒนธรรม\n— ขนาดทางการเงิน\n— ความนิยมจากสาธารณะ\n— ความสำเร็จเชิงกลยุทธ์",
			"Section VI — Immutability": "หมวด VI — ความไม่เปลี่ยนรูป",
			"The Paritsea Framework is immutable. It forms the constitutional foundation for all derived protocols and standards. Derived instruments may evolve, provided they do not contradict the Framework.":
				"Paritsea Framework ไม่เปลี่ยนรูป มันเป็นรากฐานของโปรโตคอลและมาตรฐานทุกฉบับที่สืบเนื่องมา เครื่องมือที่สืบเนื่องสามารถพัฒนาได้ ตราบเท่าที่ไม่ขัดต่อ Framework",
			"Paritsea is a constitutional reference framework. It does not function as a regulator, certifier, or enforcement body.":
				"Paritsea คือกรอบอ้างอิงเชิงรัฐธรรมนูญ ไม่ใช่ผู้กำกับดูแล ผู้รับรอง หรือหน่วยงานบังคับใช้",
			"Framework Version: 1.0 — Constitutional Text": "Framework เวอร์ชัน 1.0 — ข้อความรากฐาน",
		},
	},
	stp: {
		title: "โปรโตคอลความโปร่งใสเชิงโครงสร้าง (STP)",
		excerpt: "STP กำหนดให้ความโปร่งใสเชิงโครงสร้างเป็นข้อกำหนดพื้นฐาน ไม่ใช่ทางเลือก",
		content: {
			"v1.0 · Foundational · Authored by Parit Ritchai": "v1.0 · ฐานราก · เขียนโดย Parit Ritchai",
			"This protocol establishes foundational principles of structural transparency as a constitutional requirement.":
				"STP กำหนดเงื่อนไขพื้นฐานที่เอเจนซีต้องผ่าน เพื่อกล่าวอ้างความโปร่งใสเชิงโครงสร้างได้อย่างมีความหมาย",
			"An Industry Challenge to Agencies": "คำท้าถึงอุตสาหกรรมเอเจนซี",
			"Most agencies speak about transparency. Very few structure themselves around it.":
				"เอเจนซีพูดถึงความโปร่งใสกันมาก แต่น้อยมากที่จัดโครงสร้างตัวเองรอบมัน",
			"The modern agency industry has evolved into a performance-driven ecosystem where velocity is rewarded, visibility is curated, and responsibility is often diffused. Clients are sold clarity. What they receive is structure.":
				"ธุรกิจเอเจนซีวันนี้ขับเคลื่อนด้วยผลลัพธ์ ความเร็วได้รับรางวัล ภาพลักษณ์ถูกจัดการ และความรับผิดกระจายจนหาต้นตอไม่ได้\n\nลูกค้าถูกขายความชัดเจน — สิ่งที่ได้รับจริงคือโครงสร้างของเอเจนซี",
			"This document is not a guideline. It is a structural challenge.": "เอกสารนี้ไม่ใช่แนวทางปฏิบัติ — มันคือคำท้าเชิงโครงสร้าง",
			"If an agency claims strategic capability, it must be willing to expose the structure that produces its work. If it cannot, the problem is not messaging. It is design.":
				"ถ้าเอเจนซีอ้างว่ามีความสามารถเชิงกลยุทธ์ ต้องพร้อมเปิดเผยโครงสร้างที่ผลิตงานนั้น\n\nถ้าทำไม่ได้ — ปัญหาไม่ใช่การสื่อสาร มันคือการออกแบบ",
			"Why This Protocol Exists": "ทำไม STP ถึงมีอยู่",
			"Agencies today operate at the intersection of technology, data, performance metrics, and human labour. They promise efficiency. They promise optimisation. They promise measurable results.":
				"เอเจนซีวันนี้อยู่ตรงรอยต่อของเทคโนโลยี ข้อมูล ตัวชี้วัด และแรงงานมนุษย์ พวกเขาสัญญาเรื่องประสิทธิภาพ การปรับ และผลลัพธ์ที่วัดได้",
			"What is rarely disclosed is: who is actually doing the work, how capacity is distributed, where incentives are misaligned, whether conflicts of interest exist, and who absorbs the risk when outcomes fail.":
				"สิ่งที่แทบไม่ถูกพูดถึงคือ: ใครทำงานจริง กำลังการทำงานถูกกระจายอย่างไร แรงจูงใจตรงไหนไม่ตรงกัน มีผลประโยชน์ทับซ้อนหรือไม่ และเมื่องานล้มเหลว — ใครแบกรับ",
			"Transparency is often aesthetic. Rarely structural. The Structural Transparency Protocol exists to change that.":
				"ความโปร่งใสมักเป็นเรื่องภาพ แทบไม่ใช่เรื่องโครงสร้าง STP มีขึ้นเพื่อเปลี่ยนสิ่งนั้น",
			"The Five Structural Exposures": "5 เงื่อนไขที่ต้องเปิดเผย",
			"This protocol is built on five non-negotiable exposures. If an agency cannot meet these conditions, it is not structurally transparent.":
				"STP กำหนดเงื่อนไข 5 ข้อที่ต่อรองไม่ได้ เอเจนซีที่ผ่านไม่ครบทุกข้อ — ยังไม่โปร่งใสเชิงโครงสร้าง",
			"I. Human Visibility": "I. มองเห็นคนที่ทำงานจริง",
			"Clients must know who is doing the work. Not the pitch team. Not the logo slide. Not the senior partner who appears once a quarter. The actual operators.":
				"ลูกค้าต้องรู้ว่าใครทำงานจริง — ไม่ใช่ทีมพิตช์ ไม่ใช่สไลด์โลโก้ ไม่ใช่พาร์ตเนอร์ที่โผล่มาไตรมาสละครั้ง แต่คือคนที่ลงมือทำ",
			"Required disclosure: full team assignment before contract signing, clear role mapping (strategist, executor, reviewer), senior involvement defined in percentage and decision authority, experience level declared without abstraction.":
				"ต้องเปิดเผยก่อนเซ็นสัญญา: ชื่อสมาชิกทีมครบถ้วน บทบาทที่ชัดเจน (นักกลยุทธ์ / ผู้ปฏิบัติ / ผู้ตรวจทาน) สัดส่วนและอำนาจตัดสินใจของระดับอาวุโส และระดับประสบการณ์ที่ระบุโดยไม่คลุมเครือ",
			"If strategy is sold at a senior rate, senior thinking must be structurally present. Anything else is narrative arbitrage.":
				"ถ้าคิดราคาในระดับอาวุโส ความคิดนั้นต้องอยู่ในโครงสร้างจริง — ถ้าไม่ใช่ นั่นคือการขายภาพแทนโครงสร้าง",
			"II. Capacity Integrity": "II. ความซื่อตรงของกำลังการทำงาน",
			"Overbooking is an unspoken norm in agency economics. Clients are rarely told how many accounts a team is handling, whether the team assigned is already operating at capacity, or whether onboarding requires shifting attention from existing clients.":
				"การรับงานเกินกำลังเป็นสิ่งที่รู้กันแต่ไม่พูดกันในธุรกิจเอเจนซี ลูกค้ามักไม่รู้ว่าทีมดูแลกี่บัญชีอยู่ ทีมนั้นเต็มกำลังแล้วหรือไม่ หรือการรับงานใหม่จะดึงความสนใจออกจากลูกค้าเดิมหรือเปล่า",
			"Capacity must be disclosed as structure, not promise. If delivery quality depends on hidden overtime, burnout, or reactive staffing, it is not performance. It is deferred instability.":
				"กำลังการทำงานต้องเปิดเผยเป็นโครงสร้าง ไม่ใช่คำสัญญา\n\nถ้าคุณภาพงานพึ่งโอทีที่ซ่อนอยู่ burnout หรือการจัดทีมแบบตั้งรับ — นั่นไม่ใช่ผลงาน มันคือความไม่มั่นคงที่ถูกเลื่อนออกไป",
			"III. Choice & Representation Rights": "III. สิทธิในการเลือกตัวแทน",
			"In most agencies, account managers and specialists are assigned. Clients are rarely given a say in who represents them, who interprets their data, or who shapes their strategy. This protocol rejects silent assignment.":
				"ในเอเจนซีส่วนใหญ่ ทีมถูกมอบหมายให้โดยไม่ถามความเห็น ลูกค้าแทบไม่มีสิทธิในการเลือกว่าใครเป็นตัวแทน ใครตีความข้อมูล หรือใครกำหนดกลยุทธ์\n\nSTP ปฏิเสธการมอบหมายแบบเงียบ",
			"Selecting a strategic lead should resemble selecting a specialist in a medical context. Assignment by convenience protects the agency. Choice protects the client.":
				"การเลือกผู้นำเชิงกลยุทธ์ควรมีน้ำหนักเหมือนการเลือกผู้เชี่ยวชาญทางการแพทย์ การมอบหมายตามความสะดวกปกป้องเอเจนซี — การให้เลือกปกป้องลูกค้า",
			"IV. Conflict & Competitive Boundaries": "IV. ผลประโยชน์ทับซ้อนและขอบเขตการแข่งขัน",
			"Agencies frequently operate across competing brands, markets, and verticals. True structural transparency requires disclosure of brand positioning overlap, audience overlap analysis, geo-targeting conflict exposure, and strategic intent conflict declaration.":
				"เอเจนซีมักดูแลแบรนด์คู่แข่งพร้อมกัน ทำงานในตลาดและ vertical ที่ทับซ้อนกัน ความโปร่งใสเชิงโครงสร้างต้องเปิดเผยสิ่งเหล่านี้: การทับซ้อนของตำแหน่งแบรนด์ กลุ่มเป้าหมายที่ซ้อนกัน ความขัดแย้งด้านพื้นที่ และเจตนาเชิงกลยุทธ์ที่อาจขัดกัน",
			"Silence is not neutrality. It is leverage. Clients deserve to know whether their competitive edge is structurally diluted before it is measured.":
				"ความเงียบไม่ใช่ความเป็นกลาง — มันคืออำนาจต่อรอง ลูกค้าควรรู้ก่อนว่าความได้เปรียบของตนถูกเจือจางอยู่หรือไม่ ก่อนที่จะเริ่มวัดผล",
			"V. Power & Responsibility Mapping": "V. ใครมีอำนาจ ใครรับผิด",
			"This is the exposure most agencies avoid. Who makes the final strategic decision? Who owns KPI definition? Who carries reputational risk? Who absorbs failure?":
				"นี่คือเงื่อนไขที่เอเจนซีหลีกเลี่ยงมากที่สุด\n\nใครตัดสินใจขั้นสุดท้าย ใครเป็นเจ้าของ KPI ใครแบกความเสี่ยงด้านชื่อเสียง และเมื่อมันล้มเหลว — ใครรับผล",
			"Performance metrics without power mapping create a predictable outcome: execution absorbs blame, strategy remains insulated. Transparency without accountability is branding.":
				"วัดผลงานโดยไม่แมปอำนาจ ผลลัพธ์ที่ได้มีอยู่แบบเดียว: ฝ่ายปฏิบัติรับคำตำหนิ กลยุทธ์รับเครดิต\n\nความโปร่งใสที่ไม่มีความรับผิด — คือแบรนด์ดิ้ง",
			"The Economic Reality": "ความจริงทางธุรกิจ",
			"The market does not reward moral positioning. It rewards risk reduction. Structural transparency is not a virtue signal. It is an economic correction.":
				"ตลาดไม่ได้ให้รางวัลกับจุดยืนทางศีลธรรม — มันให้รางวัลกับการลดความเสี่ยง ความโปร่งใสเชิงโครงสร้างไม่ใช่เรื่องคุณธรรม มันคือการแก้ไขเชิงเศรษฐกิจ",
			"Agencies that adopt this protocol will likely take on fewer clients, close deals more slowly, expose internal inefficiencies, and lose prospects seeking convenience. But they will also reduce reputational volatility, improve retention through structural trust, attract leadership-level clients, and eliminate misaligned accounts early.":
				"เอเจนซีที่รับ STP อาจรับลูกค้าน้อยลง ปิดดีลช้าลง และเปิดเผยความไม่มีประสิทธิภาพภายใน\n\nแลกมาด้วย: ความผันผวนด้านชื่อเสียงน้อยลง ความไว้วางใจที่มั่นคงกว่า ลูกค้าที่ตรงกันมากกว่า และข้อพิพาทน้อยลง",
			"The question is not whether transparency is admirable. The question is whether opacity is sustainable.":
				"คำถามไม่ใช่ว่าความโปร่งใสน่ายกย่องหรือไม่ — คำถามคือ การปิดบังนั้นยั่งยืนได้นานแค่ไหน",
			"The Industry Challenge": "คำท้า",
			"This protocol is not a certification. It is not a badge. It is not a differentiator for marketing decks. It is a structural position.":
				"STP ไม่ใช่การรับรอง ไม่ใช่ตรา และไม่ใช่จุดขายในเด็คการตลาด — มันคือจุดยืนเชิงโครงสร้าง",
			"If an agency cannot publicly commit to these five exposures, it must reconsider how it defines transparency. If it can, it changes the power relationship between agency and client.":
				"ถ้าเอเจนซีไม่สามารถประกาศยึดเงื่อนไขทั้งห้าได้ ต้องทบทวนว่าตัวเองนิยามความโปร่งใสว่าอะไร\n\nถ้าทำได้ — ความสัมพันธ์เชิงอำนาจระหว่างเอเจนซีกับลูกค้าจะเปลี่ยนไป",
			"The industry will not reform through better language. It will reform through structural disclosure. The challenge stands.":
				"อุตสาหกรรมไม่ได้ปฏิรูปด้วยภาษาที่ดีขึ้น — มันปฏิรูปด้วยการเปิดเผย คำท้านี้ยังอยู่",
		},
	},
	"asls-01": {
		title: "มาตรฐานความชอบธรรมเชิงโครงสร้างของเอเจนซี (ASLS-01)",
		excerpt: "ASLS-01 แปลง STP ให้เป็นเกณฑ์ที่ตรวจสอบได้จริงในองค์กรเอเจนซีและธุรกิจบริการ",
		content: {
			"v1.0 · Active · Derived from: Structural Transparency Protocol (STP) v1.0 · Authored by Parit Ritchai":
				"v1.0 · ใช้งานอยู่ · สืบเนื่องจาก STP v1.0 · เขียนโดย Parit Ritchai",
			"I. Purpose": "I. จุดประสงค์",
			"The Agency Structural Legitimacy Standard (ASLS-01) operationalises the Structural Transparency Protocol (STP) within agency and service-based organisations. It defines observable structural conditions under which an agency may be evaluated for legitimacy in relation to Human Visibility, Capacity Integrity, Choice & Representation Rights, Conflict & Competitive Boundaries, and Power & Responsibility Mapping.":
				"ASLS-01 แปลง STP ให้ใช้งานได้จริงในเอเจนซีและองค์กรบริการ โดยกำหนดเงื่อนไขที่สังเกตและตรวจสอบได้ใน 5 ด้าน ได้แก่ การมองเห็นคนที่ทำงานจริง ความซื่อตรงของกำลังการทำงาน สิทธิในการเลือกตัวแทน ขอบเขตความขัดแย้งทางผลประโยชน์ และการแมปอำนาจกับความรับผิด",
			"This standard does not regulate agencies. It establishes structural assessment conditions. Note: Legitimacy, within this framework, is a structural condition — not a marketing claim, performance outcome, or reputational status.":
				"มาตรฐานนี้ไม่ได้กำกับดูแลเอเจนซี — แต่กำหนดเงื่อนไขที่ใช้ประเมินโครงสร้าง\n\nหมายเหตุ: ในกรอบนี้ ความชอบธรรมคือสภาวะที่โครงสร้างกำหนด ไม่ใช่การอ้างสิทธิทางการตลาด ผลงาน หรือชื่อเสียง",
			"II. Constitutional Position": "II. ความสัมพันธ์กับ STP",
			"ASLS-01 remains subordinate to STP v1.0. Where ambiguity arises, interpretation of STP prevails. ASLS-01 translates protocol exposure into verifiable structural disclosures, cross-domain consistency checks, and observable legitimacy states.":
				"ASLS-01 อยู่ภายใต้ STP v1.0 เสมอ เมื่อเกิดความคลุมเครือ การตีความตาม STP มีน้ำหนักสูงกว่า\n\nหน้าที่ของ ASLS-01 คือแปลงข้อกำหนดของ STP ให้เป็นการเปิดเผยที่ตรวจสอบได้ ตรวจสอบความสอดคล้องข้ามด้าน และระบุสภาวะความชอบธรรมที่สังเกตได้",
			"III. Structural Assessment Domains": "III. 5 ด้านการประเมิน",
			"1. Human Visibility": "1. มองเห็นคนที่ทำงานจริง",
			"Agencies must disclose full named team assignment prior to contract execution, role classification (Strategist / Executor / Reviewer / Decision Authority), percentage of senior involvement, experience band declaration, and subcontractor disclosure where applicable.":
				"ก่อนเซ็นสัญญา เอเจนซีต้องเปิดเผยว่าใครทำงานจริง — ไม่ใช่แค่ทีม pitch\n\nต้องระบุชื่อสมาชิกทีม บทบาทที่ชัดเจน (นักกลยุทธ์ / ผู้ปฏิบัติ / ผู้ตรวจทาน / ผู้มีอำนาจตัดสินใจ) สัดส่วนการมีส่วนร่วมของระดับอาวุโส และผู้รับเหมาช่วงหากมี",
			"Structural Condition: No strategic authority may be implied without structural presence.":
				"เงื่อนไข: ห้ามอ้างอำนาจเชิงกลยุทธ์โดยที่คนนั้นไม่ได้มีส่วนร่วมจริงในโครงสร้าง",
			"2. Capacity Integrity": "2. ความซื่อตรงของกำลังการทำงาน",
			"Agencies must disclose client-to-team ratio, active workload allocation, resource strain indicators, onboarding impact statement, and escalation pathway for capacity shifts.":
				"เอเจนซีต้องเปิดเผยว่าทีมดูแลลูกค้ากี่รายในขณะนั้น งานถูกกระจายอย่างไร และการรับลูกค้าใหม่กระทบทีมเดิมอย่างไร\n\nต้องมีช่องทางที่ชัดเจนสำหรับเมื่อกำลังการทำงานเปลี่ยนแปลง",
			"Structural Condition: Capacity must be declared at agreement stage and remain observable throughout contract duration.":
				"เงื่อนไข: ต้องประกาศกำลังการทำงานตั้งแต่ขั้นตกลง และต้องสังเกตได้ตลอดระยะสัญญา",
			"3. Choice & Representation Rights": "3. สิทธิในการเลือกตัวแทน",
			"Agencies must provide client right to confirm or request reassignment of primary contact, specialist reassignment process, and compatibility acknowledgement protocol.":
				"ลูกค้าต้องมีสิทธิยืนยันหรือขอเปลี่ยนผู้รับผิดชอบหลักได้ ไม่ใช่แค่รับการมอบหมายโดยไม่ถูกถาม\n\nต้องมีกระบวนการเปลี่ยนทีมที่ชัดเจน และการรับรู้ความเข้ากันได้ก่อนเริ่มงาน",
			"Structural Condition: Representation must be structurally consensual, not silently assigned.":
				"เงื่อนไข: การเป็นตัวแทนต้องเกิดจากความยินยอม ไม่ใช่การมอบหมายแบบเงียบ",
			"4. Conflict & Competitive Boundaries": "4. ความขัดแย้งทางผลประโยชน์",
			"Agencies must disclose direct competitor relationships, audience overlap, geo-targeting overlap, strategic positioning proximity, and data or intelligence overlap where relevant.":
				"เอเจนซีต้องแจ้งว่าดูแลแบรนด์คู่แข่งอยู่หรือไม่ กลุ่มเป้าหมายทับซ้อนกันหรือเปล่า และมีข้อมูลเชิงกลยุทธ์ที่อาจขัดกันระหว่างลูกค้าหรือไม่",
			"Conflict Classification Framework: Level 0 — Industry Overlap (no structural conflict), Level 1 — Competitive Proximity, Level 2 — Direct Competitive Conflict.":
				"กรอบจำแนก: ระดับ 0 — ทับซ้อนในอุตสาหกรรม (ไม่มีความขัดแย้งเชิงโครงสร้าง) | ระดับ 1 — ใกล้เคียงเชิงแข่งขัน | ระดับ 2 — ขัดแย้งกับคู่แข่งโดยตรง",
			"Structural Condition: Conflict exposure must be declared prior to performance evaluation or contractual execution. ASLS-01 does not prohibit competitive representation. It requires structural exposure.":
				"เงื่อนไข: ต้องแจ้งความขัดแย้งก่อนประเมินผลหรือทำสัญญา ASLS-01 ไม่ได้ห้ามดูแลแบรนด์คู่แข่ง — แต่กำหนดให้ต้องเปิดเผย",
			"5. Power & Responsibility Mapping": "5. แมปอำนาจและความรับผิด",
			"Agencies must document decision authority map, KPI ownership structure, risk allocation statement, and escalation authority framework.":
				"ต้องระบุให้ชัดว่าใครตัดสินใจขั้นสุดท้าย ใครเป็นเจ้าของ KPI ใครแบกรับความเสี่ยง และเมื่องานล้มเหลว — ใครรับผลนั้น",
			"Structural Condition: Strategic authority must align with accountability and risk absorption.":
				"เงื่อนไข: อำนาจตัดสินใจต้องสอดคล้องกับความรับผิดและการรับความเสี่ยง",
			"IV. Evaluation Logic": "IV. ตรรกะการประเมิน",
			"ASLS-01 evaluates structural completeness, consistency between declared and observable structure, cross-domain coherence, and clarity of authority and risk alignment. ASLS-01 does not measure financial performance, creative quality, revenue size, or market popularity.":
				"ASLS-01 ประเมินว่าโครงสร้างครบถ้วนหรือไม่ สิ่งที่ประกาศตรงกับสิ่งที่เกิดขึ้นจริงหรือเปล่า และอำนาจกับความรับผิดสอดคล้องกันอย่างไร\n\nมาตรฐานนี้ไม่ได้วัดผลงานทางการเงิน ความคิดสร้างสรรค์ ขนาดรายได้ หรือความนิยม",
			"V. Structural States": "V. สภาวะที่เอเจนซีอาจอยู่",
			"Agencies may be observed under one of the following structural states:":
				"เอเจนซีอาจถูกสังเกตในสภาวะใดสภาวะหนึ่งต่อไปนี้:",
			"A. Structurally Aligned: All five domains meet required disclosure conditions. No structural contradictions observed.\n\nB. Structurally Incomplete: One or more domains lack required disclosure. No evidence of contradiction.\n\nC. Structurally Misaligned: Declared structure conflicts with observable operational reality.\n\nD. Structurally Opaque: Required disclosures are absent or intentionally withheld.":
				"A. สอดคล้อง — ทั้งห้าด้านผ่านเงื่อนไขการเปิดเผย ไม่มีความขัดแย้งที่สังเกตได้\n\nB. ไม่ครบ — บางด้านขาดการเปิดเผย แต่ยังไม่พบหลักฐานของความขัดแย้ง\n\nC. ไม่ตรงกัน — สิ่งที่ประกาศขัดกับสิ่งที่เกิดขึ้นจริง\n\nD. ปิดบัง — การเปิดเผยที่จำเป็นขาดหาย หรือถูกกักไว้โดยเจตนา",
			"Structural states describe exposure condition — not moral judgement.":
				"สภาวะเหล่านี้อธิบายเงื่อนไขการเปิดเผย ไม่ใช่การตัดสินทางศีลธรรม",
			"VI. Version Governance": "VI. การกำกับเวอร์ชัน",
			"ASLS-01 v1.0 is derived from STP v1.0. Future revisions must declare protocol dependency version, must not retroactively alter prior assessment logic, and require explicit version increment. Adoption of future versions is contract-specific and not automatic.":
				"ASLS-01 v1.0 สืบเนื่องจาก STP v1.0 การแก้ไขในอนาคตต้องระบุเวอร์ชัน STP ที่พึ่งพา ห้ามเปลี่ยนตรรกะการประเมินย้อนหลัง และต้องเพิ่มเลขเวอร์ชันอย่างชัดเจน\n\nการรับเวอร์ชันใหม่ขึ้นอยู่กับสัญญาแต่ละฉบับ — ไม่ใช่อัตโนมัติ",
			"VII. Licensing Position": "VII. การใช้และอ้างอิง",
			"ASLS-01 may be cited and referenced publicly. Commercial enforcement, automated implementation, or system-level operationalisation requires separate licensing agreement. Structural evaluation under ASLS-01 does not constitute certification unless explicitly defined by contractual arrangement.":
				"ASLS-01 อ้างอิงต่อสาธารณะได้ การบังคับใช้เชิงพาณิชย์ การนำไปใช้แบบอัตโนมัติ หรือการฝังเข้าระบบต้องมีข้อตกลงสิทธิการใช้แยกต่างหาก\n\nการประเมินตาม ASLS-01 ไม่ถือเป็นการรับรอง เว้นแต่กำหนดไว้ชัดเจนในสัญญา",
			"VIII. Economic Implication": "VIII. ผลกระทบทางธุรกิจ",
			"Adoption of ASLS-01 may reduce onboarding velocity, expose internal inefficiencies, and increase structural scrutiny. It may also improve retention stability, reduce reputational volatility, strengthen executive-level trust, and reduce structural dispute risk.":
				"การนำ ASLS-01 ไปใช้อาจทำให้รับงานใหม่ช้าลง เปิดเผยความไร้ประสิทธิภาพภายใน และเพิ่มการตรวจสอบ\n\nแต่ก็อาจเพิ่มความมั่นคงในการรักษาลูกค้า ลดความผันผวนของชื่อเสียง เสริมความไว้วางใจระดับผู้บริหาร และลดความเสี่ยงของข้อพิพาท",
			"ASLS-01 does not compel reform. It defines exposure conditions under which legitimacy may be observed.":
				"ASLS-01 ไม่บังคับให้เปลี่ยนแปลง — แต่กำหนดเงื่อนไขที่ทำให้ความชอบธรรมถูกมองเห็นได้",
			"IX. Closing Position": "IX. จุดยืน",
			"Legitimacy is not a marketing position. It is a structural condition. ASLS-01 defines the conditions under which structural legitimacy in agency systems may be observed. It does not compel change. It defines exposure.":
				"ความชอบธรรมไม่ใช่การตลาด — มันเป็นสภาวะที่โครงสร้างกำหนด\n\nASLS-01 กำหนดเงื่อนไขที่ทำให้ความชอบธรรมเชิงโครงสร้างในระบบเอเจนซีถูกสังเกตได้ ไม่ได้สั่งให้เปลี่ยน — แต่กำหนดการเปิดเผย",
		},
	},
	"record-when-everything-works": {
		title: "เมื่อทุกอย่างทำงานได้ แต่ยังมีบางอย่างผิดอยู่",
		excerpt: "ถ้าทุกอย่างทำงานได้ ทำไมจึงยังรู้สึกว่ามีบางอย่างผิดอยู่",
		content: {
			"Seeing Clearly": "การมองให้ชัด",
			"\"If everything is working, why does it feel like something is wrong?\"":
				"\"ถ้าทุกอย่างทำงานได้ ทำไมจึงยังรู้สึกว่ามีบางอย่างผิดอยู่\"",
			"This work did not begin with broken systems.": "งานนี้ไม่ได้เริ่มจากระบบที่พัง",
			"It began with systems that worked.": "แต่มันเริ่มจากระบบที่ทำงานได้",
			"Dashboards were live. Processes were defined. Roles were assigned. Automation was running. Nothing was \"on fire\".":
				"แดชบอร์ดออนไลน์ กระบวนการถูกนิยาม บทบาทถูกมอบหมาย อัตโนมัติทำงานอยู่ ไม่มีอะไร \"ไฟไหม้\"",
			"And yet, people were tired in ways that could not be explained by workload alone. Meetings ended without resolution. Decisions were revisited repeatedly. High performers carried invisible weight. Silence filled the spaces where clarity should have been.":
				"แต่ผู้คนเหนื่อยในแบบที่อธิบายด้วยปริมาณงานอย่างเดียวไม่ได้ การประชุมจบโดยไม่มีข้อยุติ การตัดสินใจถูกย้อนกลับมาซ้ำ คนทำงานเก่งแบกน้ำหนักที่มองไม่เห็น และความเงียบเข้าไปแทนที่ความชัดเจน",
			"When organisations say \"everything is working\", they often mean: nothing has failed loudly enough to demand attention.":
				"เมื่อองค์กรพูดว่า \"ทุกอย่างทำงานได้\" มักหมายถึง ยังไม่มีอะไรล้มเหลวดังพอให้ต้องสนใจ",
			"But systems do not have to collapse to cause harm. They only need to drift far enough from human capacity.":
				"แต่ระบบไม่จำเป็นต้องล่มก่อนจึงจะก่อผลเสีย มันเพียงต้องลอยห่างจากขีดความสามารถของมนุษย์มากพอ",
			"This is where Paritsea begins.": "Paritsea เริ่มต้นตรงนี้",
			"Not at failure. At the quiet dissonance between structure and lived experience.":
				"ไม่ใช่ที่ความล้มเหลว แต่ที่ความไม่ลงรอยเงียบๆ ระหว่างโครงสร้างกับประสบการณ์ที่ผู้คนใช้ชีวิตอยู่",
			"The question is not: \"What is broken?\"": "คำถามไม่ใช่ \"อะไรพัง\"",
			"But: \"If everything is working, why does it feel like something is wrong?\"":
				"แต่คือ \"ถ้าทุกอย่างทำงานได้ ทำไมจึงยังรู้สึกว่ามีบางอย่างผิดอยู่\"",
		},
	},
	"record-automation-fear": {
		title: "ว่าด้วยระบบอัตโนมัติที่ยังต้องใช้ความกลัว",
		excerpt: "หากระบบพังทันทีเมื่อไม่มีมนุษย์เฝ้าอยู่ มันไม่ใช่ระบบ แต่คือความรับผิดที่ถูกเลื่อนออกไป",
		content: {
			"Human Cost": "ต้นทุนมนุษย์",
			"\"If a system collapses without human vigilance, it is not a system. It is deferred responsibility.\"":
				"\"หากระบบพังทันทีเมื่อไม่มีมนุษย์เฝ้าอยู่ มันไม่ใช่ระบบ แต่คือความรับผิดที่ถูกเลื่อนออกไป\"",
			"Automation is often introduced to reduce effort. To remove repetition. To free people from unnecessary labour.":
				"ระบบอัตโนมัติมักถูกนำเข้ามาเพื่อลดแรง effort ตัดงานซ้ำ และปลดผู้คนจากแรงงานที่ไม่จำเป็น",
			"Yet many automated systems do the opposite. They require constant monitoring. They demand standby humans \"just in case\". They create anxiety rather than relief.":
				"แต่ระบบอัตโนมัติจำนวนมากทำตรงกันข้าม มันต้องการการเฝ้าดูตลอดเวลา ต้องมีมนุษย์สแตนด์บาย \"เผื่อไว้\" และสร้างความกังวลแทนความโล่งใจ",
			"If a system collapses without human vigilance, it is not a system. It is deferred responsibility.":
				"หากระบบพังทันทีเมื่อไม่มีมนุษย์เฝ้าอยู่ มันไม่ใช่ระบบ แต่คือความรับผิดที่ถูกเลื่อนออกไป",
			"When people are afraid to leave an automated workflow unattended, the automation has not reduced labour — it has relocated it into emotional space.":
				"เมื่อผู้คนกลัวที่จะปล่อย workflow อัตโนมัติไว้โดยไม่มีคนเฝ้า ระบบนั้นไม่ได้ลดแรงงาน แต่มันย้ายแรงงานเข้าไปอยู่ในพื้นที่ทางอารมณ์",
			"A correct system does not ask for fear. It creates trust through structure.":
				"ระบบที่ถูกต้องไม่เรียกร้องความกลัว แต่สร้างความไว้วางใจผ่านโครงสร้าง",
			"When automation increases vigilance instead of safety, the problem is not technical. It is architectural.":
				"เมื่อระบบอัตโนมัติเพิ่มการเฝ้าระวังแทนที่จะเพิ่มความปลอดภัย ปัญหาไม่ใช่เทคนิค แต่คือสถาปัตยกรรม",
		},
	},
	"record-emotional-labour": {
		title: "เมื่อการเฝ้าระวังกลายเป็นแรงงานทางอารมณ์",
		excerpt: "เมื่อระบบพึ่งพาการเฝ้าระวังทางอารมณ์ ระบบนั้นไม่ขยายตัว แต่มันดูดพลัง",
		content: {
			"Human Cost": "ต้นทุนมนุษย์",
			"\"When systems rely on emotional vigilance, they do not scale. They drain.\"":
				"\"เมื่อระบบพึ่งพาการเฝ้าระวังทางอารมณ์ ระบบนั้นไม่ขยายตัว แต่มันดูดพลัง\"",
			"Monitoring is often described as a technical task.": "การ monitoring มักถูกอธิบายว่าเป็นงานเทคนิค",
			"In reality, it becomes emotional labour when: someone must constantly worry about what might fail, someone must stay alert so others can feel safe, someone absorbs uncertainty so the system appears stable.":
				"ในความจริง มันกลายเป็นแรงงานทางอารมณ์เมื่อมีใครบางคนต้องกังวลตลอดเวลาว่าอะไรอาจพัง ต้องตื่นตัวเพื่อให้คนอื่นรู้สึกปลอดภัย และต้องดูดซับความไม่แน่นอนเพื่อให้ระบบดูมั่นคง",
			"This labour is rarely acknowledged. It does not appear in dashboards. It is not reflected in productivity metrics. But it accumulates.":
				"แรงงานนี้แทบไม่ถูกยอมรับ มันไม่ปรากฏบนแดชบอร์ด ไม่สะท้อนในตัวชี้วัดผลิตภาพ แต่มันสะสม",
			"People begin to feel responsible for outcomes they cannot control. Anxiety replaces clarity. Fatigue appears without visible cause.":
				"ผู้คนเริ่มรู้สึกรับผิดชอบต่อผลลัพธ์ที่ควบคุมไม่ได้ ความกังวลเข้ามาแทนความชัดเจน และความเหนื่อยล้าปรากฏโดยไม่มีสาเหตุที่มองเห็น",
			"When systems rely on emotional vigilance, they do not scale. They drain.":
				"เมื่อระบบพึ่งพาการเฝ้าระวังทางอารมณ์ ระบบนั้นไม่ขยายตัว แต่มันดูดพลัง",
			"This is not a people problem. It is a structural one.": "นี่ไม่ใช่ปัญหาของคน แต่เป็นปัญหาเชิงโครงสร้าง",
		},
	},
	"record-tool-not-problem": {
		title: "เมื่อเครื่องมือไม่ใช่ปัญหา",
		excerpt: "เครื่องมือแทบไม่ใช่ปัญหา มันเพียงเผยให้เห็นปัญหา",
		content: {
			"Seeing Clearly": "การมองให้ชัด",
			"\"Tools are rarely the problem. They only reveal it.\"":
				"\"เครื่องมือแทบไม่ใช่ปัญหา มันเพียงเผยให้เห็นปัญหา\"",
			"The request was simple: \"Teach me how to build this automation workflow.\"":
				"คำขอนั้นเรียบง่าย: \"สอนฉันสร้าง workflow อัตโนมัตินี้หน่อย\"",
			"The workflow already existed. The tools were chosen. The logic was drafted.":
				"workflow มีอยู่แล้ว เครื่องมือถูกเลือกแล้ว ตรรกะถูกวางร่างไว้แล้ว",
			"What was missing was not technical skill, but structural understanding.":
				"สิ่งที่ขาดไม่ใช่ทักษะทางเทคนิค แต่คือความเข้าใจเชิงโครงสร้าง",
			"Why does this workflow exist? What responsibility is it replacing? What happens when it fails? Who carries the consequence?":
				"workflow นี้มีไว้เพื่ออะไร มันกำลังแทนที่ความรับผิดใด เกิดอะไรขึ้นเมื่อมันล้มเหลว และใครแบกรับผลตามมา",
			"Building without answering these questions does not create systems. It creates fragile arrangements.":
				"การสร้างโดยไม่ตอบคำถามเหล่านี้ไม่ได้สร้างระบบ แต่สร้างการจัดวางที่เปราะบาง",
			"Paritsea did not refuse the work. It refused construction without architecture.":
				"Paritsea ไม่ได้ปฏิเสธงาน แต่มันปฏิเสธการก่อสร้างที่ไม่มีสถาปัตยกรรม",
			"Tools are rarely the problem. They only reveal it.": "เครื่องมือแทบไม่ใช่ปัญหา มันเพียงเผยให้เห็นปัญหา",
		},
	},
	"record-ownership-thinking": {
		title: "เมื่อความคิดแบบเจ้าของปะทะกับความจริงของระบบ",
		excerpt: "ตราบใดที่ยังแบกไหว ระบบจะดูเหมือนทำงานได้ ต้นทุนถูกจ่ายที่อื่น อย่างเงียบๆ โดยผู้คน",
		content: {
			"Structural Tension": "แรงตึงเชิงโครงสร้าง",
			"\"As long as carrying remains possible, the system appears functional. The cost is paid elsewhere. Quietly. By people.\"":
				"\"ตราบใดที่ยังแบกไหว ระบบจะดูเหมือนทำงานได้ ต้นทุนถูกจ่ายที่อื่น อย่างเงียบๆ โดยผู้คน\"",
			"Some leaders carry everything themselves. Not because they are incapable of delegation, but because they do not trust structures to hold without them.":
				"ผู้นำบางคนแบกทุกอย่างไว้เอง ไม่ใช่เพราะมอบหมายงานไม่เป็น แต่เพราะไม่เชื่อว่าโครงสร้างจะรับน้ำหนักได้หากไม่มีตน",
			"Growth becomes product expansion. Momentum becomes constant movement. Motivation becomes pressure disguised as inspiration.":
				"การเติบโตกลายเป็นการขยายผลิตภัณฑ์ โมเมนตัมกลายเป็นการเคลื่อนไหวไม่หยุด และแรงจูงใจกลายเป็นแรงกดดันที่ปลอมตัวเป็นแรงบันดาลใจ",
			"From this perspective: more offerings mean more opportunity, more activity means progress.":
				"จากมุมมองนี้ ข้อเสนอที่มากขึ้นหมายถึงโอกาสที่มากขึ้น กิจกรรมที่มากขึ้นหมายถึงความก้าวหน้า",
			"From a system perspective: more load without structure means collapse — slowly.":
				"จากมุมมองระบบ ภาระที่มากขึ้นโดยไม่มีโครงสร้างหมายถึงการพังทลาย อย่างช้าๆ",
			"This is not a conflict of intent. It is a collision of mental models. One is centred on ownership. The other on sustainability.":
				"นี่ไม่ใช่ความขัดแย้งของเจตนา แต่เป็นการปะทะกันของแบบจำลองความคิด แบบหนึ่งมีเจ้าของเป็นศูนย์กลาง อีกแบบมีความยั่งยืนเป็นศูนย์กลาง",
			"As long as carrying remains possible, the system appears functional. The cost is paid elsewhere. Quietly. By people.":
				"ตราบใดที่ยังแบกไหว ระบบจะดูเหมือนทำงานได้ ต้นทุนถูกจ่ายที่อื่น อย่างเงียบๆ โดยผู้คน",
		},
	},
	"aesthetic-transparency": {
		title: "ความโปร่งใสมักเป็นเรื่องภาพ แทบไม่ใช่เรื่องโครงสร้าง",
		excerpt:
			"ความโปร่งใสมักเป็นเรื่องภาพ แทบไม่ใช่เรื่องโครงสร้าง — และนี่คือสิ่งที่ความแตกต่างนั้นมีหน้าตาอย่างไร",
		content: {
			"Most agencies speak about transparency. Very few structure themselves around it.":
				"เอเจนซีพูดถึงความโปร่งใสกันมาก แต่น้อยมากที่จัดโครงสร้างตัวเองรอบมัน",
			"Transparency is often aesthetic. Rarely structural.":
				"ความโปร่งใสมักเป็นเรื่องภาพ แทบไม่ใช่เรื่องโครงสร้าง",
			"The modern agency industry has evolved into a performance-driven ecosystem where velocity is rewarded, visibility is curated, and responsibility is often diffused.":
				"ธุรกิจเอเจนซีวันนี้ขับเคลื่อนด้วยผลลัพธ์ ความเร็วได้รับรางวัล ภาพลักษณ์ถูกจัดการ และความรับผิดกระจายจนหาต้นตอไม่ได้",
			"Clients are sold clarity. What they receive is structure.":
				"ลูกค้าถูกขายความชัดเจน — สิ่งที่ได้รับจริงคือโครงสร้างของเอเจนซี",
			"What is rarely disclosed is: who is actually doing the work, how capacity is distributed, where incentives are misaligned, whether conflicts of interest exist, and who absorbs the risk when outcomes fail.":
				"สิ่งที่แทบไม่ถูกพูดถึงคือ: ใครทำงานจริง กำลังการทำงานถูกกระจายอย่างไร แรงจูงใจตรงไหนไม่ตรงกัน มีผลประโยชน์ทับซ้อนหรือไม่ และเมื่องานล้มเหลว — ใครแบกรับ",
			"The market does not reward moral positioning. It rewards risk reduction.":
				"ตลาดไม่ได้ให้รางวัลกับจุดยืนทางศีลธรรม — มันให้รางวัลกับการลดความเสี่ยง",
			"Structural transparency is not a virtue signal. It is an economic correction.":
				"ความโปร่งใสเชิงโครงสร้างไม่ใช่เรื่องคุณธรรม มันคือการแก้ไขเชิงเศรษฐกิจ",
			"The question is not whether transparency is admirable. The question is whether opacity is sustainable.":
				"คำถามไม่ใช่ว่าความโปร่งใสน่ายกย่องหรือไม่ — คำถามคือ การปิดบังนั้นยั่งยืนได้นานแค่ไหน",
			"The industry will not reform through better language. It will reform through structural disclosure.":
				"อุตสาหกรรมนี้จะไม่ปฏิรูปด้วยภาษาที่ดีขึ้น มันจะปฏิรูปด้วยการเปิดเผยเชิงโครงสร้าง",
			"This observation is the traceable precursor to the ":
				"การสังเกตนี้คือจุดต้นทางที่สืบย้อนได้ของ ",
			"Structural Transparency Protocol": "โปรโตคอลความโปร่งใสเชิงโครงสร้าง",
		},
	},
};

const pageTranslations: Record<string, { title: string; content: Record<string, string> }> = {
	licensing: {
		title: "สิทธิการใช้และการอ้างอิง",
		content: {
			"Constitutional Position": "ตำแหน่งเชิงรัฐธรรมนูญ",
			"Paritsea is an independent framework of structural coherence and legitimacy authored by Parit Ritchai.":
				"Paritsea เป็น framework อิสระว่าด้วยความสอดคล้องเชิงโครงสร้างและความชอบธรรม เขียนโดย Parit Ritchai",
			"The Paritsea Framework and all derived Protocols and Standards are made publicly accessible in order to preserve structural clarity and prevent distortion through opacity or exclusivity.":
				"Paritsea Framework รวมถึงโปรโตคอลและมาตรฐานที่สืบเนื่องทั้งหมดเปิดให้เข้าถึงสาธารณะ เพื่อรักษาความชัดเจนเชิงโครงสร้างและป้องกันการบิดเบือนผ่านความทึบแสงหรือความผูกขาด",
			"Licensing exists to protect Framework integrity, not to restrict legitimate reference.":
				"สิทธิการใช้มีไว้เพื่อปกป้องความสมบูรณ์ของ Framework ไม่ใช่เพื่อจำกัดการอ้างอิงที่ชอบธรรม",
			"Open Licence (Non-Commercial Use)": "สิทธิการใช้แบบเปิด (ไม่ใช่เชิงพาณิชย์)",
			"The Paritsea Framework and its derived Protocols and Standards are released under the Creative Commons Attribution–NonCommercial 4.0 International Licence (CC BY-NC 4.0).":
				"Paritsea Framework และโปรโตคอลกับมาตรฐานที่สืบเนื่อง เผยแพร่ภายใต้สัญญาอนุญาต Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)",
			"Full legal terms are available at: creativecommons.org/licenses/by-nc/4.0/":
				"เงื่อนไขทางกฎหมายฉบับเต็มดูได้ที่: creativecommons.org/licenses/by-nc/4.0/",
			"Non-commercial use is permitted with proper attribution.": "อนุญาตให้ใช้แบบไม่ใช่เชิงพาณิชย์ได้ เมื่อให้เครดิตอย่างเหมาะสม",
			"This licence applies to: The Paritsea Framework — All published Standards — All published Protocols — Public explanatory texts — Official diagrams and structural models":
				"สิทธิการใช้นี้ครอบคลุม: Paritsea Framework — มาตรฐานที่เผยแพร่ทั้งหมด — โปรโตคอลที่เผยแพร่ทั้งหมด — ข้อความอธิบายสาธารณะ — แผนภาพและแบบจำลองโครงสร้างอย่างเป็นทางการ",
			"Attribution Requirements": "ข้อกำหนดการให้เครดิต",
			"Attribution must clearly include: The name \"Paritsea\" — Author: Parit Ritchai — Reference to the original source — A link to the official Paritsea website":
				"การให้เครดิตต้องระบุอย่างชัดเจน: ชื่อ \"Paritsea\" — ผู้เขียน: Parit Ritchai — การอ้างถึงแหล่งต้นทาง — ลิงก์ไปยังเว็บไซต์ Paritsea อย่างเป็นทางการ",
			"Attribution must not imply endorsement, partnership, certification, or institutional affiliation unless explicitly authorised.":
				"การให้เครดิตต้องไม่ทำให้เข้าใจว่าได้รับการรับรอง เป็นพันธมิตร ได้รับ certification หรือมีความเกี่ยวข้องเชิงสถาบัน เว้นแต่ได้รับอนุญาตชัดเจน",
			"Commercial Implementation": "การนำไปใช้เชิงพาณิชย์",
			"Commercial implementation of any Paritsea Protocol or Standard requires a separate commercial licence agreement.":
				"การนำโปรโตคอลหรือมาตรฐานของ Paritsea ไปใช้เชิงพาณิชย์ต้องมีข้อตกลงสิทธิการใช้เชิงพาณิชย์แยกต่างหาก",
			"Commercial implementation includes, but is not limited to: Platform enforcement — Revenue-generating services — Certification systems — Institutional integration — Proprietary deployment within commercial entities":
				"การนำไปใช้เชิงพาณิชย์รวมถึงแต่ไม่จำกัดเพียง: การบังคับใช้บนแพลตฟอร์ม — บริการที่สร้างรายได้ — ระบบ certification — การผนวกเข้ากับสถาบัน — การ deploy แบบ proprietary ภายในองค์กรเชิงพาณิชย์",
			"Enquiries: hello@paritsea.co": "ติดต่อสอบถาม: hello@paritsea.co",
			"Dual Licensing Framework": "กรอบสิทธิการใช้แบบคู่",
			"Paritsea may grant: Standard commercial licences — Dual licences (open + commercial usage rights) — Exclusive commercial licences within defined domains":
				"Paritsea อาจให้: สิทธิการใช้เชิงพาณิชย์มาตรฐาน — สิทธิการใช้แบบคู่ (เปิด + สิทธิใช้เชิงพาณิชย์) — สิทธิการใช้เชิงพาณิชย์แบบ exclusive ในโดเมนที่กำหนด",
			"Dual licensing does not alter Framework content. The Paritsea Framework remains constitutionally immutable regardless of licensing structure.":
				"สิทธิการใช้แบบคู่ไม่เปลี่ยนเนื้อหาของ Framework Paritsea Framework ยังคงไม่เปลี่ยนรูปเชิงรัฐธรรมนูญไม่ว่าโครงสร้างสิทธิการใช้จะเป็นอย่างไร",
			"Framework Integrity Clause": "ข้อกำหนดความสมบูรณ์ของ Framework",
			"The Paritsea Framework is immutable.": "Paritsea Framework ไม่เปลี่ยนรูป",
			"Derived Protocols and Standards may evolve, provided they do not contradict the Framework. No commercial agreement may alter or reinterpret the Framework. Licensing grants permission of use. It does not grant authority to redefine the Framework.":
				"โปรโตคอลและมาตรฐานที่สืบเนื่องอาจพัฒนาได้ ตราบเท่าที่ไม่ขัดต่อ Framework ข้อตกลงเชิงพาณิชย์ใดๆ ไม่อาจแก้ไขหรือตีความ Framework ใหม่ได้ สิทธิการใช้ให้เพียงอนุญาตให้ใช้ ไม่ได้ให้อำนาจในการนิยาม Framework ใหม่",
			"Prohibited Representations": "การกล่าวอ้างที่ห้ามทำ",
			"The following are prohibited without explicit written agreement: Claiming certification by Paritsea — Presenting compliance as endorsement — Modifying Protocol or Standard criteria while retaining the Paritsea name — Using Paritsea branding to imply regulatory authority":
				"สิ่งต่อไปนี้ห้ามทำหากไม่มีข้อตกลงเป็นลายลักษณ์อักษรชัดเจน: อ้างว่าได้รับ certification โดย Paritsea — นำเสนอ compliance เป็น endorsement — แก้เกณฑ์ของโปรโตคอลหรือมาตรฐานแต่ยังใช้ชื่อ Paritsea — ใช้แบรนด์ Paritsea เพื่อสื่อถึงอำนาจกำกับดูแล",
			"Paritsea is a reference framework, not a regulator.": "Paritsea เป็นกรอบอ้างอิง ไม่ใช่หน่วยงานกำกับดูแล",
			"Version Sovereignty": "อธิปไตยของเวอร์ชัน",
			"Protocols and Standards are versioned.": "โปรโตคอลและมาตรฐานมีเวอร์ชัน",
			"Each commercial licence is contract-specific and version-specific.":
				"สิทธิการใช้เชิงพาณิชย์แต่ละฉบับผูกกับสัญญาและเวอร์ชันเฉพาะ",
			"Adoption of newer versions is not automatic. Previously licensed versions may continue operating under their granted terms. Paritsea retains authorship and authorial authority over all versions. Licensees retain implementation autonomy within the bounds of their licensed version. No commercial agreement may redefine or reinterpret the Framework.":
				"การรับเวอร์ชันใหม่ไม่ใช่เรื่องอัตโนมัติ เวอร์ชันที่ได้รับสิทธิแล้วอาจดำเนินต่อภายใต้เงื่อนไขเดิม Paritsea ยังคงถือสิทธิผู้เขียนและสิทธิ์ผู้เขียนเหนือทุกเวอร์ชัน ผู้รับสิทธิยังมีอิสระในการนำไปใช้ภายในขอบเขตของเวอร์ชันที่ได้รับอนุญาต ข้อตกลงเชิงพาณิชย์ใดๆ ไม่อาจนิยามหรือตีความ Framework ใหม่ได้",
			Summary: "สรุป",
			"Paritsea is open for reference under CC BY-NC 4.0. Non-commercial use is permitted with attribution. Commercial implementation requires agreement. The Framework remains immutable. Protocols and Standards are version-governed. Licensing grants permission to implement — not authority to redefine.":
				"Paritsea เปิดให้อ้างอิงภายใต้ CC BY-NC 4.0 อนุญาตให้ใช้แบบไม่ใช่เชิงพาณิชย์เมื่อให้เครดิต การนำไปใช้เชิงพาณิชย์ต้องมีข้อตกลง Framework ยังคงไม่เปลี่ยนรูป โปรโตคอลและมาตรฐานถูกกำกับด้วยเวอร์ชัน สิทธิการใช้ให้สิทธิในการนำไปใช้ ไม่ได้ให้อำนาจในการนิยามใหม่",
		},
	},
	contact: {
		title: "ติดต่อ",
		content: {
			Paritsea: "Paritsea",
			"hello@paritsea.co": "hello@paritsea.co",
			"All correspondence is reviewed. Response is discretionary.":
				"ทุกข้อความจะได้รับการพิจารณา การตอบกลับขึ้นอยู่กับดุลยพินิจ",
			"Paritsea is an independent framework reference authored by Parit Ritchai.":
				"Paritsea เป็นกรอบอ้างอิงอิสระ เขียนโดย Parit Ritchai",
		},
	},
};

const postTranslationAliases: Record<string, string> = {
	"when-everything-works-and-something-is-still-wrong": "record-when-everything-works",
	"on-automation-that-still-requires-fear": "record-automation-fear",
	"when-monitoring-becomes-emotional-labour": "record-emotional-labour",
	"when-the-tool-was-not-the-problem": "record-tool-not-problem",
	"when-ownership-thinking-collides-with-system-reality": "record-ownership-thinking",
};

function translateBlocks(value: unknown, translations: Record<string, string>) {
	if (!Array.isArray(value)) return value;
	return value.map((block: PortableTextBlock) => ({
		...block,
		children: Array.isArray(block.children)
			? block.children.map((child) => ({
					...child,
					text: typeof child.text === "string" ? translations[child.text] ?? child.text : child.text,
				}))
			: block.children,
	}));
}

export function localizeEntry<T extends { id: string; data: { slug?: unknown } }>(
	entry: T,
	collection: "posts" | "pages",
	locale: SiteLocale,
): T {
	if (locale === "en") return entry;
	const entrySlug = typeof entry.data.slug === "string" ? entry.data.slug : entry.id;
	const data = entry.data as Record<string, unknown>;
	const postTranslationKey = postTranslationAliases[entrySlug] ?? entrySlug;
	const translation =
		collection === "posts"
			? postTranslations[postTranslationKey] ?? postTranslations[entrySlug] ?? postTranslations[entry.id]
			: pageTranslations[entrySlug] ?? pageTranslations[entry.id];
	if (!translation) return entry;

	return {
		...entry,
		data: {
			...entry.data,
			title: translation.title,
			excerpt: "excerpt" in translation ? translation.excerpt ?? data.excerpt : data.excerpt,
			content: translateBlocks(data.content, translation.content),
		},
	};
}

export function localizeTermLabel(label: string, locale: SiteLocale) {
	return locale === "th" ? categoryLabels[label] ?? label : label;
}

export function localeToHtmlLang(locale: SiteLocale): "th" | "en" {
	return locale === "th" ? "th" : "en";
}
