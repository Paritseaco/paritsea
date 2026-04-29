-- Remote-safe D1 migration for production execution through:
-- `wrangler d1 execute ... --remote --file=...`
--
-- Cloudflare D1 remote SQL execution does not accept explicit
-- BEGIN/COMMIT transaction statements in the uploaded file.

ALTER TABLE ec_posts ADD COLUMN framework_page TEXT;

UPDATE ec_posts
SET framework_page = CASE
	WHEN slug = 'doctrine' THEN 'the-doctrine'
	ELSE (
		SELECT t.slug
		FROM content_taxonomies ct
		JOIN taxonomies t ON t.id = ct.taxonomy_id
		WHERE ct.collection = 'posts'
			AND ct.entry_id = ec_posts.id
			AND t.name = 'category'
		LIMIT 1
	)
END
WHERE framework_page IS NULL;

UPDATE _emdash_collections
SET label = 'Content',
	label_singular = 'Entry',
	updated_at = datetime('now')
WHERE slug = 'posts';

UPDATE _emdash_fields
SET sort_order = CASE slug
	WHEN 'title' THEN 0
	WHEN 'featured_image' THEN 2
	WHEN 'content' THEN 3
	WHEN 'excerpt' THEN 4
	ELSE sort_order
END
WHERE collection_id = (
	SELECT id
	FROM _emdash_collections
	WHERE slug = 'posts'
)
AND slug IN ('title', 'featured_image', 'content', 'excerpt');

INSERT OR IGNORE INTO _emdash_fields (
	id,
	collection_id,
	slug,
	label,
	type,
	column_type,
	required,
	"unique",
	default_value,
	validation,
	widget,
	options,
	sort_order,
	created_at,
	searchable,
	translatable
)
SELECT
	'field_posts_framework_page',
	id,
	'framework_page',
	'Page Destination',
	'select',
	'TEXT',
	1,
	0,
	NULL,
	'{"options":["the-doctrine","protocols","standards","the-method","implementations"]}',
	NULL,
	NULL,
	1,
	datetime('now'),
	0,
	0
FROM _emdash_collections
WHERE slug = 'posts';

UPDATE _emdash_taxonomy_defs
SET label = 'Categories',
	label_singular = 'Category',
	hierarchical = 1
WHERE name = 'category';

INSERT OR IGNORE INTO taxonomies (id, name, slug, label, parent_id, data) VALUES
	('taxcat_active', 'category', 'active', 'Active', NULL, NULL),
	('taxcat_foundational', 'category', 'foundational', 'Foundational', NULL, NULL),
	('taxcat_human_cost', 'category', 'human-cost', 'Human Cost', NULL, NULL),
	('taxcat_seeing_clearly', 'category', 'seeing-clearly', 'Seeing Clearly', NULL, NULL),
	('taxcat_structural_tension', 'category', 'structural-tension', 'Structural Tension', NULL, NULL);

INSERT OR IGNORE INTO content_taxonomies (collection, entry_id, taxonomy_id)
SELECT
	ct.collection,
	ct.entry_id,
	dest.id
FROM content_taxonomies ct
JOIN taxonomies src
	ON src.id = ct.taxonomy_id
	AND src.name = 'tag'
JOIN taxonomies dest
	ON dest.name = 'category'
	AND dest.slug = src.slug
WHERE ct.collection = 'posts';

DELETE FROM content_taxonomies
WHERE collection = 'posts'
AND taxonomy_id IN (
	SELECT id
	FROM taxonomies
	WHERE name = 'category'
	AND slug IN ('the-doctrine', 'protocols', 'standards', 'the-method')
);

DELETE FROM taxonomies
WHERE name = 'category'
AND slug IN ('the-doctrine', 'protocols', 'standards', 'the-method');

DELETE FROM content_taxonomies
WHERE collection = 'posts'
AND taxonomy_id IN (
	SELECT id
	FROM taxonomies
	WHERE name = 'tag'
);

DELETE FROM taxonomies
WHERE name = 'tag';

DELETE FROM _emdash_taxonomy_defs
WHERE name = 'tag';

UPDATE ec_posts
SET author_id = '01KPDP8WM7WJ5S8WA0V6R819NP'
WHERE author_id IS NULL;

UPDATE _emdash_bylines
SET user_id = '01KPDP8WM7WJ5S8WA0V6R819NP'
WHERE slug = 'parit-ritchai'
AND user_id IS NULL;
