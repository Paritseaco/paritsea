import { sql } from "kysely";
import { getDb } from "emdash/runtime";

const CREATE_VIEWS_TABLE_SQL = `
	CREATE TABLE IF NOT EXISTS post_views (
		post_id TEXT PRIMARY KEY,
		view_count INTEGER NOT NULL DEFAULT 0,
		unique_view_count INTEGER NOT NULL DEFAULT 0,
		updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
	)
`;

type ViewCountRow = {
	view_count?: number;
	unique_view_count?: number;
};

async function ensurePostViewsTable() {
	const db = await getDb();
	await sql.raw(CREATE_VIEWS_TABLE_SQL).execute(db);
	return db;
}

export async function getPostViewCounts(postId: string) {
	const db = await ensurePostViewsTable();

	const result = await sql<ViewCountRow>`
		SELECT view_count, unique_view_count
		FROM post_views
		WHERE post_id = ${postId}
	`.execute(db);

	const row = result.rows[0];
	return {
		viewCount: Number(row?.view_count ?? 0),
		uniqueViewCount: Number(row?.unique_view_count ?? 0),
	};
}

export async function incrementPostViews(postId: string, options?: { unique?: boolean }) {
	const db = await ensurePostViewsTable();
	const uniqueIncrement = options?.unique ? 1 : 0;

	await sql`
		INSERT INTO post_views (post_id, view_count, unique_view_count, updated_at)
		VALUES (${postId}, 1, ${uniqueIncrement}, CURRENT_TIMESTAMP)
		ON CONFLICT(post_id) DO UPDATE SET
			view_count = view_count + 1,
			unique_view_count = unique_view_count + ${uniqueIncrement},
			updated_at = CURRENT_TIMESTAMP
	`.execute(db);

	return getPostViewCounts(postId);
}
