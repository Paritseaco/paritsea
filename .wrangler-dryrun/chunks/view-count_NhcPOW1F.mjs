globalThis.process ??= {};
globalThis.process.env ??= {};
import { s as sql, g as getDb } from "./index_BpQCdXij.mjs";
const TRAILING_SLASH_RE = /\/$/;
const ABSOLUTE_URL_RE = /^https?:\/\//i;
function getSeoMeta(content, options = {}) {
  const { siteTitle, siteUrl, path, defaultOgImage } = options;
  const separator = options.titleSeparator || " | ";
  const seo = content.seo ?? content.data.seo ?? {
    title: null,
    description: null,
    image: null,
    canonical: null,
    noIndex: false
  };
  const pageTitle = seo.title || (typeof content.data.title === "string" ? content.data.title : null) || "";
  const fullTitle = siteTitle && pageTitle ? `${pageTitle}${separator}${siteTitle}` : pageTitle;
  const description = seo.description || (typeof content.data.excerpt === "string" ? content.data.excerpt : null) || null;
  const ogImage = seo.image ? buildMediaUrl(seo.image, siteUrl) : defaultOgImage ?? null;
  let canonical = null;
  if (seo.canonical) if (siteUrl && !seo.canonical.startsWith("/") && !ABSOLUTE_URL_RE.test(seo.canonical)) canonical = `${siteUrl.replace(TRAILING_SLASH_RE, "")}/${seo.canonical}`;
  else canonical = seo.canonical;
  else if (siteUrl && path) {
    const safePath = path.startsWith("/") ? path : `/${path}`;
    canonical = `${siteUrl.replace(TRAILING_SLASH_RE, "")}${safePath}`;
  }
  const robots = seo.noIndex ? "noindex, nofollow" : null;
  return {
    title: fullTitle,
    description,
    ogTitle: pageTitle || fullTitle,
    ogDescription: description,
    ogImage,
    canonical,
    robots
  };
}
function buildMediaUrl(imageRef, siteUrl) {
  if (ABSOLUTE_URL_RE.test(imageRef)) return imageRef;
  const mediaPath = `/_emdash/api/media/file/${imageRef}`;
  if (siteUrl) return `${siteUrl.replace(TRAILING_SLASH_RE, "")}${mediaPath}`;
  return mediaPath;
}
const CREATE_VIEWS_TABLE_SQL = `
	CREATE TABLE IF NOT EXISTS post_views (
		post_id TEXT PRIMARY KEY,
		view_count INTEGER NOT NULL DEFAULT 0,
		unique_view_count INTEGER NOT NULL DEFAULT 0,
		updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
	)
`;
async function ensurePostViewsTable() {
  const db = await getDb();
  await sql.raw(CREATE_VIEWS_TABLE_SQL).execute(db);
  return db;
}
async function getPostViewCounts(postId) {
  const db = await ensurePostViewsTable();
  const result = await sql`
		SELECT view_count, unique_view_count
		FROM post_views
		WHERE post_id = ${postId}
	`.execute(db);
  const row = result.rows[0];
  return {
    viewCount: Number(row?.view_count ?? 0),
    uniqueViewCount: Number(row?.unique_view_count ?? 0)
  };
}
async function incrementPostViews(postId, options) {
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
export {
  getSeoMeta as g,
  incrementPostViews as i
};
