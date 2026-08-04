import type { SiteLocale } from "./i18n";

const profiles = {
	th: {
		name: "ปาริศ ฤทธิ์ชัย",
		role: "ผู้ก่อตั้ง Paritsea · ผู้พัฒนาแนวคิดและ Framework",
		bio: "ฉันคือ ปาริศ ฤทธิ์ชัย ผู้ก่อตั้ง Paritsea ฉันพัฒนาและเผยแพร่แนวคิดผ่านบทความ วิดีโอ และ Framework เพื่อช่วยให้คนมองเห็นต้นเหตุของปัญหา เลือกสิ่งที่ควรเปลี่ยน และนำความเข้าใจนั้นไปใช้ได้จริง",
		image: "/images/home/parit-ritchai-portrait.jpg",
		imageAlt: "ปาริศ ฤทธิ์ชัย ผู้ก่อตั้ง Paritsea",
	},
	en: {
		name: "Parit Ritchai",
		role: "Founder of Paritsea · Creator of ideas and frameworks",
		bio: "I'm Parit Ritchai, founder of Paritsea. I develop and share ideas through essays, videos, and frameworks to help people locate the real cause of a problem, decide what should change, and apply that understanding in practice.",
		image: "/images/home/parit-ritchai-portrait.jpg",
		imageAlt: "Parit Ritchai, founder of Paritsea",
	},
} as const;

export function getAuthorProfile(locale: SiteLocale) {
	return profiles[locale];
}
