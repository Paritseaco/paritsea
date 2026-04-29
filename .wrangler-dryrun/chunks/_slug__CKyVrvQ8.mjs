globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as renderComponent, s as spreadAttributes } from "./worker-entry_ByB1knaX.mjs";
import { g as getDb, s as sql, R as decodeSlug, O as getSiteSettings, N as getEntryTerms, L as renderTemplate, H as maybeRenderHead, J as addAttribute, U as Fragment } from "./index_BpQCdXij.mjs";
import { r as getEmDashEntry, n as getEmDashCollection } from "./query-B6Vu0d2i_CdjZKi_-.mjs";
import { g as getSeoMeta, i as incrementPostViews } from "./view-count_NhcPOW1F.mjs";
import { a as $$Base, $ as $$EmDashImage, b as $$PortableText, c as $$Comments, d as $$CommentForm, e as $$WidgetArea, r as renderScript } from "./Base_D3tSK0o0.mjs";
import { $ as $$PostCard } from "./PostCard_CGrU9_sH.mjs";
import { r as resolveFrameworkPage, a as resolvePostPath, i as isFrameworkPageSlug } from "./public-paths_p8DnGpf0.mjs";
import { g as getReadingTime } from "./reading-time_DXbm4fD_.mjs";
import { r as resolveBlogSiteIdentity } from "./site-identity_DWdgL0Or.mjs";
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
function parseJsonField(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
function toDate(value) {
  return value ? new Date(value) : null;
}
async function getDirectPostBySlug(slug, categorySlug) {
  const db = await getDb();
  const postResult = await sql`
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
  const bylineResult = await sql`
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
      avatarMediaId: row.avatar_media_id
    }
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
      updatedAt: toDate(post.updated_at) ?? /* @__PURE__ */ new Date(),
      publishedAt: toDate(post.published_at),
      scheduledAt: toDate(post.scheduled_at),
      draftRevisionId: post.draft_revision_id,
      liveRevisionId: post.live_revision_id,
      locale: post.locale ?? "en",
      translationGroup: post.translation_group,
      title: post.title ?? "",
      framework_page: post.framework_page,
      featured_image: parseJsonField(post.featured_image, null),
      content: parseJsonField(post.content, []),
      excerpt: post.excerpt,
      bylines
    },
    edit: {
      featured_image: {},
      title: {},
      excerpt: {}
    }
  };
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const CATEGORY_MAP = {
    "protocols": "protocols",
    "standards": "standards",
    "the-method": "the-method",
    "implementations": "implementations"
  };
  const categoryParam = Astro2.params.category ?? "";
  const taxonomySlug = CATEGORY_MAP[categoryParam];
  if (!taxonomySlug) return Astro2.redirect("/404");
  const slug = decodeSlug(Astro2.params.slug);
  if (!slug) return Astro2.redirect("/404");
  const { entry: emdashPost, cacheHint } = await getEmDashEntry("posts", slug);
  const matchingEntry = emdashPost && resolveFrameworkPage(emdashPost.data.framework_page) === taxonomySlug ? emdashPost : null;
  const post = matchingEntry ?? await getDirectPostBySlug(slug, taxonomySlug);
  if (!post) return Astro2.redirect("/404");
  if (cacheHint) {
    Astro2.cache.set(cacheHint);
  }
  function getImageUrl(img) {
    if (!img || typeof img !== "object") return void 0;
    const image = img;
    if (typeof image.src === "string" && image.src) {
      return image.src.startsWith("http") ? image.src : `${Astro2.url.origin}${image.src}`;
    }
    const meta = image.meta;
    const storageKey = (typeof meta?.storageKey === "string" ? meta.storageKey : void 0) || (typeof image.id === "string" ? image.id : void 0);
    if (storageKey) {
      return `${Astro2.url.origin}/_emdash/api/media/file/${storageKey}`;
    }
    return void 0;
  }
  const featuredImageUrl = getImageUrl(post.data.featured_image);
  const { siteTitle } = resolveBlogSiteIdentity(await getSiteSettings());
  const seo = getSeoMeta(post, {
    siteTitle,
    siteUrl: Astro2.url.origin,
    path: resolvePostPath(slug, post.data.framework_page, taxonomySlug) ?? `/${categoryParam}/${slug}`,
    defaultOgImage: featuredImageUrl
  });
  const categories = await getEntryTerms("posts", post.data.id, "category");
  const frameworkPage = resolveFrameworkPage(post.data.framework_page, taxonomySlug);
  const isProtocol = frameworkPage === "protocols";
  const isStandard = frameworkPage === "standards";
  const isDoctrine = frameworkPage === "the-doctrine";
  const isRecord = frameworkPage === "the-method";
  const isImplementation = frameworkPage === "implementations";
  const recordCategoryLabel = categories[0]?.label ?? null;
  const docBadge = isRecord ? recordCategoryLabel ?? "The Method" : isProtocol ? "Protocol" : isStandard ? "Standard" : isImplementation ? "Implementation" : isDoctrine ? "Doctrine" : null;
  const bylines = post.data.bylines ?? [];
  const readingTime = getReadingTime(post.data.content);
  const initialViews = await incrementPostViews(post.data.id, { unique: false });
  const { entries: recentPosts } = await getEmDashCollection("posts", {
    orderBy: { published_at: "desc" },
    limit: 4
  });
  const otherPosts = recentPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const otherPostsWithTags = await Promise.all(
    otherPosts.map(async (p) => {
      const postCategories = await getEntryTerms("posts", p.data.id, "category");
      const relatedFrameworkPage = resolveFrameworkPage(
        p.data.framework_page,
        postCategories.find((term) => isFrameworkPageSlug(term.slug))?.slug
      );
      const visibleCategories = postCategories.filter((term) => !isFrameworkPageSlug(term.slug));
      const postBylines = p.data.bylines ?? [];
      const href = resolvePostPath(p.id, relatedFrameworkPage, null) ?? `/the-method/${p.id}`;
      return {
        post: p,
        cats: visibleCategories.length > 0 ? visibleCategories : postCategories,
        bylines: postBylines,
        href
      };
    })
  );
  const publishDate = post.data.publishedAt?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) ?? null;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": seo.title, "pageTitle": seo.ogTitle, "description": seo.description, "image": seo.ogImage, "canonical": seo.canonical, "robots": seo.robots, "type": "article", "publishedTime": post.data.publishedAt?.toISOString() ?? null, "modifiedTime": post.data.updatedAt.toISOString(), "content": { collection: "posts", id: post.data.id, slug }, "data-astro-cid-2e7mcdih": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="article" data-astro-cid-2e7mcdih>  <div class="article-hero" data-astro-cid-2e7mcdih> ${post.data.featured_image ? renderTemplate`<div${spreadAttributes(post.edit.featured_image, void 0, { "class": "astro-2e7mcdih" })} data-astro-cid-2e7mcdih> ${renderComponent($$result2, "Image", $$EmDashImage, { "image": post.data.featured_image, "data-astro-cid-2e7mcdih": true })} </div>` : renderTemplate`<svg class="article-hero-illustration" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" data-astro-cid-2e7mcdih> <!-- vertical grid lines --> <line x1="0" y1="0" x2="0" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="80" y1="0" x2="80" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="160" y1="0" x2="160" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="240" y1="0" x2="240" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="320" y1="0" x2="320" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="400" y1="0" x2="400" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="480" y1="0" x2="480" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="560" y1="0" x2="560" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="640" y1="0" x2="640" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="720" y1="0" x2="720" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="800" y1="0" x2="800" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <!-- horizontal grid lines --> <line x1="0" y1="0" x2="800" y2="0" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="0" y1="40" x2="800" y2="40" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="0" y1="80" x2="800" y2="80" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="0" y1="120" x2="800" y2="120" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="0" y1="160" x2="800" y2="160" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <line x1="0" y1="200" x2="800" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.08" data-astro-cid-2e7mcdih></line> <!-- nodes --> <circle cx="80" cy="40" r="3.5" fill="currentColor" opacity="0.55" data-astro-cid-2e7mcdih></circle> <circle cx="240" cy="80" r="2.5" fill="currentColor" opacity="0.35" data-astro-cid-2e7mcdih></circle> <circle cx="400" cy="40" r="4" fill="currentColor" opacity="0.65" data-astro-cid-2e7mcdih></circle> <circle cx="560" cy="120" r="3" fill="currentColor" opacity="0.4" data-astro-cid-2e7mcdih></circle> <circle cx="720" cy="80" r="3.5" fill="currentColor" opacity="0.5" data-astro-cid-2e7mcdih></circle> <circle cx="160" cy="160" r="2.5" fill="currentColor" opacity="0.3" data-astro-cid-2e7mcdih></circle> <circle cx="400" cy="160" r="3" fill="currentColor" opacity="0.45" data-astro-cid-2e7mcdih></circle> <circle cx="640" cy="160" r="2.5" fill="currentColor" opacity="0.35" data-astro-cid-2e7mcdih></circle> <!-- connecting paths --> <line x1="80" y1="40" x2="240" y2="80" stroke="currentColor" stroke-width="1" opacity="0.18" data-astro-cid-2e7mcdih></line> <line x1="240" y1="80" x2="400" y2="40" stroke="currentColor" stroke-width="1" opacity="0.18" data-astro-cid-2e7mcdih></line> <line x1="400" y1="40" x2="560" y2="120" stroke="currentColor" stroke-width="1" opacity="0.15" data-astro-cid-2e7mcdih></line> <line x1="560" y1="120" x2="720" y2="80" stroke="currentColor" stroke-width="1" opacity="0.15" data-astro-cid-2e7mcdih></line> <line x1="80" y1="40" x2="160" y2="160" stroke="currentColor" stroke-width="1" opacity="0.12" data-astro-cid-2e7mcdih></line> <line x1="400" y1="40" x2="400" y2="160" stroke="currentColor" stroke-width="1" opacity="0.12" data-astro-cid-2e7mcdih></line> <line x1="720" y1="80" x2="640" y2="160" stroke="currentColor" stroke-width="1" opacity="0.12" data-astro-cid-2e7mcdih></line> </svg>`} </div>  <div class="article-grid" data-astro-cid-2e7mcdih>  <aside class="article-meta-col" data-astro-cid-2e7mcdih> <div class="meta-sticky" data-astro-cid-2e7mcdih> ${bylines.length > 0 && renderTemplate`<div class="meta-block byline-block" data-astro-cid-2e7mcdih> <span class="meta-label" data-astro-cid-2e7mcdih> ${bylines.length === 1 ? "Author" : "Authors"} </span> <div class="bylines" data-astro-cid-2e7mcdih> ${bylines.map((credit) => renderTemplate`<div class="byline" data-astro-cid-2e7mcdih> ${credit.byline.avatarMediaId && renderTemplate`<img${addAttribute(`/_emdash/api/media/file/${credit.byline.avatarMediaId}`, "src")}${addAttribute(credit.byline.displayName, "alt")} class="byline-avatar" data-astro-cid-2e7mcdih>`} <div class="byline-info" data-astro-cid-2e7mcdih> <span class="byline-name" data-astro-cid-2e7mcdih> ${credit.byline.displayName} </span> ${credit.roleLabel && renderTemplate`<span class="byline-role" data-astro-cid-2e7mcdih>${credit.roleLabel}</span>`} </div> </div>`)} </div> </div>`} ${publishDate && renderTemplate`<div class="meta-block" data-astro-cid-2e7mcdih> <span class="meta-label" data-astro-cid-2e7mcdih>Published</span> <time class="meta-value" data-astro-cid-2e7mcdih>${publishDate}</time> </div>`} <div class="meta-block" data-astro-cid-2e7mcdih> <span class="meta-label" data-astro-cid-2e7mcdih>Reading time</span> <span class="meta-value" data-astro-cid-2e7mcdih>${readingTime} min</span> </div> <div class="meta-block" data-astro-cid-2e7mcdih> <span class="meta-label" data-astro-cid-2e7mcdih>Readership</span> <span class="meta-value" id="article-readership"${addAttribute(post.data.id, "data-post-id")}${addAttribute(initialViews.viewCount, "data-initial-views")} data-astro-cid-2e7mcdih> ${initialViews.viewCount} reads
</span> </div> </div> </aside>  <div${addAttribute(`article-main${isDoctrine ? " article-main--doctrine" : ""}`, "class")} data-astro-cid-2e7mcdih> <header class="article-header" data-astro-cid-2e7mcdih> ${isDoctrine && renderTemplate`<div class="doctrine-notice" data-astro-cid-2e7mcdih> <span class="doctrine-notice-label" data-astro-cid-2e7mcdih>Constitutional Document</span> <span class="doctrine-notice-text" data-astro-cid-2e7mcdih>This document forms the foundational authority for all Paritsea Protocols and Standards. It is immutable.</span> </div>`} ${docBadge && renderTemplate`<div${addAttribute(`article-doc-badge${isDoctrine ? " article-doc-badge--doctrine" : ""}`, "class")} data-astro-cid-2e7mcdih> ${isDoctrine ? "Constitutional Doctrine" : docBadge} </div>`} <div class="article-meta" data-astro-cid-2e7mcdih> ${bylines.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-2e7mcdih": true }, { "default": async ($$result3) => renderTemplate` <span class="article-meta-byline" data-astro-cid-2e7mcdih> ${bylines.map((credit, i) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "data-astro-cid-2e7mcdih": true }, { "default": async ($$result4) => renderTemplate`${i > 0 && ", "}${credit.byline.displayName}` })}`)} </span> <span class="meta-dot" data-astro-cid-2e7mcdih></span> ` })}`} ${publishDate && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-2e7mcdih": true }, { "default": async ($$result3) => renderTemplate` <time data-astro-cid-2e7mcdih>${publishDate}</time> <span class="meta-dot" data-astro-cid-2e7mcdih></span> ` })}`} <span data-astro-cid-2e7mcdih>${readingTime} min read</span> </div> <h1 class="article-title"${spreadAttributes(post.edit.title)} data-astro-cid-2e7mcdih>${post.data.title}</h1> ${post.data.excerpt && renderTemplate`<p class="article-excerpt"${spreadAttributes(post.edit.excerpt)} data-astro-cid-2e7mcdih>${post.data.excerpt}</p>`} </header> <div${addAttribute(`article-content ${post.data.excerpt ? "has-excerpt" : ""}`, "class")} data-astro-cid-2e7mcdih> ${renderComponent($$result2, "PortableText", $$PortableText, { "value": post.data.content, "data-astro-cid-2e7mcdih": true })} </div> <div class="article-comments" data-astro-cid-2e7mcdih> ${renderComponent($$result2, "Comments", $$Comments, { "collection": "posts", "contentId": post.data.id, "threaded": true, "data-astro-cid-2e7mcdih": true })} ${renderComponent($$result2, "CommentForm", $$CommentForm, { "collection": "posts", "contentId": post.data.id, "data-astro-cid-2e7mcdih": true })} </div> </div>  <aside class="article-sidebar" data-astro-cid-2e7mcdih> <div class="sidebar-sticky" data-astro-cid-2e7mcdih> <nav class="toc" aria-label="Table of contents" data-astro-cid-2e7mcdih> <h4 class="toc-title" data-astro-cid-2e7mcdih>On this page</h4> <div class="toc-content" id="toc-content" data-astro-cid-2e7mcdih> <!-- Populated by JS --> </div> </nav> <div class="sidebar-widgets" data-astro-cid-2e7mcdih> ${renderComponent($$result2, "WidgetArea", $$WidgetArea, { "name": "sidebar", "data-astro-cid-2e7mcdih": true })} </div> </div> </aside> </div> </article> ${otherPostsWithTags.length > 0 && renderTemplate`<section class="more-posts" data-astro-cid-2e7mcdih> <div class="more-inner" data-astro-cid-2e7mcdih> <h2 class="more-title" data-astro-cid-2e7mcdih>Continue reading</h2> <div class="more-grid" data-astro-cid-2e7mcdih> ${otherPostsWithTags.map(
    ({ post: p, cats: postCats, bylines: postBylines, href }) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "title": p.data.title, "excerpt": p.data.excerpt, "featuredImage": p.data.featured_image, "href": href, "date": p.data.publishedAt ?? void 0, "readingTime": getReadingTime(p.data.content), "tags": postCats.map((c) => ({ slug: c.slug, label: c.label })), "bylines": postBylines, "data-astro-cid-2e7mcdih": true })}`
  )} </div> </div> </section>`}${renderScript($$result2, "/Users/paritr/Desktop/paritsea/src/pages/[category]/[slug].astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/paritr/Desktop/paritsea/src/pages/[category]/[slug].astro", void 0);
const $$file = "/Users/paritr/Desktop/paritsea/src/pages/[category]/[slug].astro";
const $$url = "/[category]/[slug]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
