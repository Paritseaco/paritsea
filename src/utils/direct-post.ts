import { sql } from "kysely";
import { getDb } from "emdash/runtime";

type DirectBylineRow = {
	byline_id: string;
	byline_slug: string;
	display_name: string;
	avatar_media_id: string | null;
	role_label: string | null;
};

type DirectPostRow = {
	id: string;
	slug: string | null;
	status: string | null;
	author_id: string | null;
	primary_byline_id: string | null;
	created_at: string | null;
	updated_at: string | null;
	published_at: string | null;
	scheduled_at: string | null;
	draft_revision_id: string | null;
	live_revision_id: string | null;
	locale: string | null;
	translation_group: string | null;
	title: string | null;
	framework_page: string | null;
	featured_image: string | null;
	content: string | null;
	excerpt: string | null;
};

function parseJsonField<T>(value: string | null, fallback: T): T {
	if (!value) return fallback;

	try {
		return JSON.parse(value) as T;
	} catch {
		return fallback;
	}
}

function toDate(value: string | null): Date | null {
	return value ? new Date(value) : null;
}

export async function getDirectPostBySlug(slug: string, categorySlug: string) {
	const db = await getDb();

	const postResult = await sql<DirectPostRow>`
		SELECT DISTINCT p.*
		FROM ec_posts p
		LEFT JOIN content_taxonomies ct
			ON ct.collection = 'posts'
			AND ct.entry_id = p.id
		LEFT JOIN taxonomies t
			ON t.id = ct.taxonomy_id
		WHERE p.deleted_at IS NULL
			AND p.status = 'published'
			AND (
				p.framework_page = ${categorySlug}
				OR (
					t.name = 'category'
					AND t.slug = ${categorySlug}
				)
			)
			AND (p.slug = ${slug} OR p.id = ${slug})
		LIMIT 1
	`.execute(db);

	const post = postResult.rows[0];
	if (!post) return null;

	const bylineResult = await sql<DirectBylineRow>`
		SELECT
			b.id AS byline_id,
			b.slug AS byline_slug,
			b.display_name,
			b.avatar_media_id,
			cb.role_label
		FROM _emdash_content_bylines cb
		JOIN _emdash_bylines b
			ON b.id = cb.byline_id
		WHERE cb.collection_slug = 'posts'
			AND cb.content_id = ${post.id}
		ORDER BY cb.sort_order ASC
	`.execute(db);

	const bylines = bylineResult.rows.map((row) => ({
		roleLabel: row.role_label,
		byline: {
			id: row.byline_id,
			slug: row.byline_slug,
			displayName: row.display_name,
			avatarMediaId: row.avatar_media_id,
		},
	}));

	const entrySlug = post.slug || post.id;

	return {
		id: entrySlug,
		slug: entrySlug,
		data: {
			id: post.id,
			slug: post.slug,
			status: post.status ?? "draft",
			authorId: post.author_id,
			primaryBylineId: post.primary_byline_id,
			createdAt: toDate(post.created_at),
			updatedAt: toDate(post.updated_at) ?? new Date(),
			publishedAt: toDate(post.published_at),
			scheduledAt: toDate(post.scheduled_at),
			draftRevisionId: post.draft_revision_id,
			liveRevisionId: post.live_revision_id,
			locale: post.locale ?? "en",
			translationGroup: post.translation_group,
			title: post.title ?? "",
			framework_page: post.framework_page,
			featured_image: parseJsonField(post.featured_image, undefined),
			content: parseJsonField(post.content, []),
			excerpt: post.excerpt,
			bylines,
		},
		edit: {
			featured_image: {},
			title: {},
			excerpt: {},
		},
	};
}
