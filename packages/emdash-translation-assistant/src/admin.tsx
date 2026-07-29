import type { PluginAdminExports } from "emdash";
import {
	apiFetch as baseFetch,
	getErrorMessage,
	parseApiResponse,
} from "emdash/plugin-utils";
import * as React from "react";

const CORE_API = "/_emdash/api";
const PLUGIN_API = `${CORE_API}/plugins/paritsea-translation-assistant`;

type Locale = "en" | "th";

type BylineCredit = {
	byline: { id: string; displayName: string };
	roleLabel: string | null;
};

type ContentItem = {
	id: string;
	slug: string | null;
	status: string;
	locale: Locale | null;
	data: Record<string, unknown>;
	bylines?: BylineCredit[];
};

type TranslationResult = {
	sourceId: string;
	sourceLocale: Locale;
	targetLocale: Locale;
	slug: string | null;
	sourceData: Record<string, unknown>;
	sourceSeo: Record<string, unknown> | null;
	translatedData: Record<string, unknown>;
};

async function apiJson<T>(url: string, init?: RequestInit): Promise<T> {
	const response = await baseFetch(url, init);
	if (!response.ok) throw new Error(await getErrorMessage(response));
	return parseApiResponse<T>(response);
}

function titleFor(item: ContentItem): string {
	const title = item.data.title;
	return typeof title === "string" && title ? title : item.slug ?? item.id;
}

function TranslationAssistantPage() {
	const [items, setItems] = React.useState<ContentItem[]>([]);
	const [sourceId, setSourceId] = React.useState("");
	const [targetLocale, setTargetLocale] = React.useState<Locale>("th");
	const [loading, setLoading] = React.useState(true);
	const [working, setWorking] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [created, setCreated] = React.useState<ContentItem | null>(null);

	const loadItems = React.useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const [english, thai] = await Promise.all([
				apiJson<{ items: ContentItem[] }>(`${CORE_API}/content/posts?locale=en&limit=100`),
				apiJson<{ items: ContentItem[] }>(`${CORE_API}/content/posts?locale=th&limit=100`),
			]);
			const nextItems = [...english.items, ...thai.items];
			setItems(nextItems);
			if (!sourceId && nextItems[0]) {
				setSourceId(nextItems[0].id);
				setTargetLocale(nextItems[0].locale === "th" ? "en" : "th");
			}
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Could not load content.");
		} finally {
			setLoading(false);
		}
	}, [sourceId]);

	React.useEffect(() => {
		void loadItems();
	}, []);

	const selected = items.find((item) => item.id === sourceId) ?? null;

	const generateDraft = async () => {
		if (!selected) return;
		setWorking(true);
		setError(null);
		setCreated(null);
		try {
			if (selected.locale === targetLocale) {
				throw new Error("Choose a target language different from the source.");
			}

			const translations = await apiJson<{
				translations: Array<{ locale: string; status: string }>;
			}>(`${CORE_API}/content/posts/${encodeURIComponent(selected.id)}/translations`);
			if (translations.translations.some((translation) => translation.locale === targetLocale)) {
				throw new Error(`A ${targetLocale.toUpperCase()} version already exists. Open that version and edit it manually.`);
			}

			const result = await apiJson<TranslationResult>(`${PLUGIN_API}/translate`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ sourceId: selected.id, targetLocale }),
			});

			const bylines = (selected.bylines ?? []).map((credit) => ({
				bylineId: credit.byline.id,
				roleLabel: credit.roleLabel,
			}));
			const createPayload = {
				slug: result.slug,
				locale: result.targetLocale,
				translationOf: result.sourceId,
				status: "draft",
				data: { ...result.sourceData, ...result.translatedData },
				bylines,
				seo: result.sourceSeo
					? {
							...result.sourceSeo,
							title: typeof result.translatedData.title === "string"
								? result.translatedData.title
								: result.sourceSeo.title,
							description: typeof result.translatedData.excerpt === "string"
								? result.translatedData.excerpt
								: result.sourceSeo.description,
						}
					: undefined,
			};
			const createdResponse = await apiJson<{ item: ContentItem }>(`${CORE_API}/content/posts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(createPayload),
			});

			const sourceTerms = await apiJson<{
				terms: Array<{ id: string }>;
			}>(`${CORE_API}/content/posts/${encodeURIComponent(selected.id)}/terms/category`);
			if (sourceTerms.terms.length) {
				await apiJson(`${CORE_API}/content/posts/${encodeURIComponent(createdResponse.item.id)}/terms/category`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ termIds: sourceTerms.terms.map((term) => term.id) }),
				});
			}

			setCreated(createdResponse.item);
			await loadItems();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Could not create translation draft.");
		} finally {
			setWorking(false);
		}
	};

	return (
		<div className="mx-auto max-w-3xl space-y-6">
			<div>
				<h1 className="text-2xl font-semibold">แปลบทความ EN / TH</h1>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					สร้างฉบับภาษาที่ยังขาดเป็น Draft เพื่อให้ตรวจและแก้เองก่อนเผยแพร่ ระบบจะแปลเฉพาะ
					เนื้อหาที่อ่านได้ ส่วนประเภทงาน สถานะ ลิงก์ YouTube ผู้เขียน และหัวข้อจะใช้ร่วมกัน
					โดยไม่เผยแพร่อัตโนมัติ
				</p>
			</div>

			<div className="rounded-lg border bg-card p-5 space-y-5">
				<div>
					<label className="mb-2 block text-sm font-medium" htmlFor="translation-source">
						เลือกต้นฉบับ
					</label>
					<select
						id="translation-source"
						className="w-full rounded-md border bg-background px-3 py-2 text-sm"
						value={sourceId}
						disabled={loading || working}
						onChange={(event) => {
							const id = event.target.value;
							setSourceId(id);
							const item = items.find((candidate) => candidate.id === id);
							if (item) setTargetLocale(item.locale === "th" ? "en" : "th");
						}}
					>
						{items.map((item) => (
							<option key={item.id} value={item.id}>
								[{(item.locale ?? "en").toUpperCase()}] {titleFor(item)} · {item.status}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium" htmlFor="translation-target">
						สร้าง Draft ภาษา
					</label>
					<select
						id="translation-target"
						className="w-full rounded-md border bg-background px-3 py-2 text-sm"
						value={targetLocale}
						disabled={working}
						onChange={(event) => setTargetLocale(event.target.value as Locale)}
					>
						<option value="en">English (EN)</option>
						<option value="th">ไทย (TH)</option>
					</select>
				</div>

				<div className="rounded-md bg-muted/40 p-4 text-sm text-muted-foreground">
					<p className="font-medium text-foreground">ต้องการเขียนทั้งสองภาษาเอง?</p>
					<p className="mt-1">
						เปิดต้นฉบับแล้วใช้เมนู Translations เพื่อสร้างภาษาที่ยังขาด จากนั้นเขียนหรือวาง
						ฉบับของคุณเองได้เลย เครื่องมือแปลอัตโนมัตินี้เป็นเพียงทางเลือก
					</p>
				</div>

				<button
					type="button"
					className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
					disabled={!selected || working || loading}
					onClick={() => void generateDraft()}
				>
					{working ? "กำลังแปลและสร้าง Draft…" : "แปลและสร้าง Draft"}
				</button>
			</div>

			{error && (
				<div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
					{error}
				</div>
			)}

			{created && (
				<div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4">
					<p className="font-medium">Draft created. Review it before publishing.</p>
					<a
						className="mt-2 inline-block text-sm font-medium underline underline-offset-4"
						href={`/_emdash/admin/content/posts/${encodeURIComponent(created.id)}`}
					>
						Open {targetLocale.toUpperCase()} draft →
					</a>
				</div>
			)}
		</div>
	);
}

export const pages: PluginAdminExports["pages"] = {
	"/": TranslationAssistantPage,
};
