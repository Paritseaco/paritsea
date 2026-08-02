import type { SiteLocale } from "./i18n";

const profiles = {
	th: {
		name: "ปาริศ ฤทธิ์ชัย",
		role: "ผู้เขียน Paritsea",
		bio: "ฉันคือ ปาริศ ฤทธิ์ชัย ผู้เขียน Paritsea ฉันสนใจปัญหาที่แก้ไม่จบเพราะเรามักมองเหตุผิดจุด และเขียนแนวคิดที่ช่วยให้เห็นต้นเหตุ เลือกสิ่งที่ควรเปลี่ยน และนำไปใช้ได้จริง",
		image: "/images/home/parit-ritchai-portrait.jpg",
		imageAlt: "ปาริศ ฤทธิ์ชัย ผู้เขียน Paritsea",
	},
	en: {
		name: "Parit Ritchai",
		role: "Author of Paritsea",
		bio: "I'm Parit Ritchai, the author of Paritsea. I study problems that keep returning because their causes are framed in the wrong place, then write ideas that help people see what drives them, choose what to change, and apply the insight in practice.",
		image: "/images/home/parit-ritchai-portrait.jpg",
		imageAlt: "Parit Ritchai, author of Paritsea",
	},
} as const;

export function getAuthorProfile(locale: SiteLocale) {
	return profiles[locale];
}
