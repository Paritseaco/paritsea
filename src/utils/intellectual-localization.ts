import type { SiteLocale } from "./i18n";

export type IntellectualRecordMetadata = {
	provenance: string;
	scope: string;
	nonClaims: string;
};

const thaiRecordMetadata: Record<string, IntellectualRecordMetadata> = {
	doctrine: {
		provenance: "เขียนโดย Parit Ritchai จากข้อสังเกตซ้ำเกี่ยวกับความสอดคล้องเชิงโครงสร้างและความชอบธรรม ฉบับ 1.1 เปลี่ยนจากข้อกล่าวอ้างว่าแก่นความคิดเปลี่ยนไม่ได้ มาเป็นการเปลี่ยนแปลงที่ต้องระบุผู้เขียน เหตุผล และเวอร์ชันอย่างเปิดเผย",
		scope: "เป็นวิธีมองต้นทางสำหรับพิจารณาความสอดคล้องเชิงโครงสร้างและความชอบธรรม ไม่ได้ตัดสินคุณค่าทางศีลธรรม ความสำเร็จเชิงพาณิชย์ หรือความเหมาะสมกับทุกบริบท",
		nonClaims: "Framework นี้ไม่ใช่หน่วยงานกำกับ การรับรอง ผลการตรวจประเมิน หรือสิทธิให้ผู้ประยุกต์ใช้แก้ความหมายของต้นทาง canonical",
	},
	stp: {
		provenance: "พัฒนาจาก Paritsea Framework และข้อสังเกตใน Journal เรื่องความโปร่งใสที่มองเห็นได้กับความโปร่งใสเชิงโครงสร้าง",
		scope: "กำหนดภาระหน้าที่ด้านความโปร่งใสเชิงโครงสร้างภายใต้เงื่อนไขที่ระบุไว้ในเอกสาร",
		nonClaims: "Protocol นี้ไม่ใช่การรับรอง ผลการตรวจประเมิน หรือข้อกล่าวอ้างว่าวิธีประยุกต์แบบเดียวใช้ได้กับทุกองค์กร",
	},
	"asls-01": {
		provenance: "พัฒนาจาก Structural Transparency Protocol (STP) เวอร์ชัน 1.0",
		scope: "กำหนดเกณฑ์สำหรับประเมินภาระหน้าที่ของ Protocol ภายในขอบเขตที่เอกสารระบุ",
		nonClaims: "Standard นี้ไม่ได้สร้างการรับรองหรือคำตัดสินที่ใช้ได้กับทุกกรณีด้วยตัวมันเอง",
	},
};

const thaiGenericMetadata: Record<string, IntellectualRecordMetadata> = {
	journal: {
		provenance: "ข้อสังเกตที่ Parit Ritchai เขียนและเก็บไว้ใน Journal ก่อนการจัดระบบเป็นงานอ้างอิง",
		scope: "บันทึกสิ่งที่สังเกต การตีความ และคำถามภายในบริบทที่เนื้อหาระบุ",
		nonClaims: "การเผยแพร่ไม่ได้ทำให้งานชิ้นนี้กลายเป็น Framework, Protocol หรือ Standard และไม่ได้ทำให้ข้อสังเกตมีผลกับทุกบริบท",
	},
	concept: {
		provenance: "Concept record ที่พัฒนาจากข้อสังเกตและการตีความใน Journal",
		scope: "ใช้เป็นภาษากลางเพื่ออ้างถึงรูปแบบที่สังเกตพบ และเปิดให้ตรวจสอบที่มาได้",
		nonClaims: "ยังไม่ใช่ Framework, Protocol หรือ Standard และยังไม่ได้พิสูจน์ความเหมาะสมกับทุกบริบท",
	},
};

const thaiValueLabels: Record<string, string> = {
	journal: "Journal",
	concept: "Concept",
	framework: "Framework",
	protocol: "Protocol",
	standard: "Standard",
	"official use": "ระเบียนการใช้",
	observation: "ข้อสังเกต",
	interpretation: "การตีความ",
	proposition: "ข้อเสนอ",
	formalized: "จัดระบบแล้ว",
	exploring: "กำลังสำรวจ",
	developing: "กำลังพัฒนา",
	current: "ฉบับปัจจุบัน",
	superseded: "มีฉบับใหม่แทนแล้ว",
	retired: "ยุติการใช้อ้างอิง",
	"application record": "ระเบียนการประยุกต์ใช้",
	provisional: "ชั่วคราว",
	recorded: "บันทึกแล้ว",
	prototype: "ต้นแบบ",
	open: "ยังเปิดอยู่",
};

const thaiWorkFamilyLabels: Record<string, string> = {
	"the-method": "บันทึก",
	"the-doctrine": "Framework",
	protocols: "Protocol",
	standards: "Standard",
};

function containsThai(value: string) {
	return /[ก-๙]/.test(value);
}

export function localizeRecordValue(locale: SiteLocale, value: string) {
	if (locale !== "th") return value;
	return thaiValueLabels[value.trim().toLowerCase()] ?? value;
}

export function localizeWorkFamily(locale: SiteLocale, value: string) {
	if (locale !== "th") return value;
	return thaiWorkFamilyLabels[value.trim().toLowerCase()] ?? localizeRecordValue(locale, value);
}

export function localizeRecordMetadata(
	locale: SiteLocale,
	slug: string,
	contentType: string,
	metadata: IntellectualRecordMetadata,
) {
	if (locale !== "th") return metadata;
	const fallback = thaiRecordMetadata[slug] ?? thaiGenericMetadata[contentType.trim().toLowerCase()];
	if (!fallback) return metadata;
	return {
		provenance: containsThai(metadata.provenance) ? metadata.provenance : fallback.provenance,
		scope: containsThai(metadata.scope) ? metadata.scope : fallback.scope,
		nonClaims: containsThai(metadata.nonClaims) ? metadata.nonClaims : fallback.nonClaims,
	};
}

export function localizeAppliedContext(
	locale: SiteLocale,
	context: { title: string; url: string; summary: string; type: string },
) {
	if (locale !== "th") return context;
	const isInvisibleFixers = context.url.includes("invisible-fixers-hold-system");
	return {
		...context,
		title: isInvisibleFixers
			? "ปัญหาองค์กร: คนแก้ปัญหาที่มองไม่เห็นกำลังแบกระบบไว้"
			: "ปัญหาองค์กร: เครื่องมือกำลังเร่งความสับสน",
		summary: "บริบทการประยุกต์ใช้ที่ SE Ocean ดูแล งานหน้านี้ไม่ใช่ต้นทาง canonical และไม่ได้เปลี่ยนอำนาจเหนือแนวคิดต้นทาง",
	};
}
