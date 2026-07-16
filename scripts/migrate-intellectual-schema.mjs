import { readFileSync } from "node:fs";

const urlArg = process.argv.find((arg) => arg.startsWith("--url="));
const url = (urlArg?.slice("--url=".length) || "http://localhost:4321").replace(/\/$/, "");
const token = process.env.EMDASH_TOKEN;

if (!token) {
	throw new Error("EMDASH_TOKEN is required for remote schema migration.");
}

const seed = JSON.parse(readFileSync(new URL("../seed/seed.json", import.meta.url), "utf8"));
const apiBase = `${url}/_emdash/api`;

async function request(method, path, body) {
	const response = await fetch(`${apiBase}${path}`, {
		method,
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
			...(body === undefined ? {} : { "Content-Type": "application/json" }),
		},
		body: body === undefined ? undefined : JSON.stringify(body),
	});

	const payload = await response.json().catch(() => ({}));
	if (!response.ok) {
		const message = payload?.error?.message || `${response.status} ${response.statusText}`;
		throw new Error(`${method} ${path}: ${message}`);
	}
	return payload.data;
}

const supportedCollectionFeatures = new Set(["drafts", "revisions", "preview", "scheduling", "search"]);
let collectionsCreated = 0;
let collectionsUpdated = 0;
let fieldsCreated = 0;
let fieldsReconciled = 0;
let fieldsUpdated = 0;
let menuItemsCreated = 0;

const remoteCollections = await request("GET", "/schema/collections");
const remoteBySlug = new Map(remoteCollections.items.map((collection) => [collection.slug, collection]));

for (const collection of seed.collections ?? []) {
	const supports = (collection.supports ?? []).filter((feature) => supportedCollectionFeatures.has(feature));
	const collectionBody = {
		label: collection.label,
		labelSingular: collection.labelSingular,
		description: collection.description,
		supports,
		hasSeo: (collection.supports ?? []).includes("seo"),
	};

	if (remoteBySlug.has(collection.slug)) {
		await request("PUT", `/schema/collections/${encodeURIComponent(collection.slug)}`, collectionBody);
		collectionsUpdated++;
	} else {
		await request("POST", "/schema/collections", {
			slug: collection.slug,
			...collectionBody,
			source: "seed",
		});
		collectionsCreated++;
	}

	const remoteCollection = await request(
		"GET",
		`/schema/collections/${encodeURIComponent(collection.slug)}?includeFields=true`,
	);
	const remoteFields = new Map(remoteCollection.item.fields.map((field) => [field.slug, field]));

	for (const [sortOrder, field] of collection.fields.entries()) {
		const options = field.options ?? (field.collection ? { collection: field.collection } : undefined);
		const sharedFieldBody = {
			label: field.label,
			required: field.required ?? false,
			unique: field.unique ?? false,
			defaultValue: field.defaultValue,
			validation: field.validation,
			widget: field.widget,
			options,
			sortOrder,
			searchable: field.searchable ?? false,
			translatable: field.translatable !== false,
		};

		if (remoteFields.has(field.slug)) {
			await request(
				"PUT",
				`/schema/collections/${encodeURIComponent(collection.slug)}/fields/${encodeURIComponent(field.slug)}`,
				sharedFieldBody,
			);
			fieldsUpdated++;
		} else {
			try {
				await request(
					"POST",
					`/schema/collections/${encodeURIComponent(collection.slug)}/fields`,
					{
						slug: field.slug,
						type: field.type,
						...sharedFieldBody,
					},
				);
				fieldsCreated++;
			} catch (error) {
				const afterFailure = await request(
					"GET",
					`/schema/collections/${encodeURIComponent(collection.slug)}?includeFields=true`,
				);
				if (afterFailure.item.fields.some((candidate) => candidate.slug === field.slug)) {
					fieldsReconciled++;
				} else {
					throw error;
				}
			}
		}
	}

	await request(
		"POST",
		`/schema/collections/${encodeURIComponent(collection.slug)}/fields/reorder`,
		{ fieldSlugs: collection.fields.map((field) => field.slug) },
	);
}

const remoteMenus = await request("GET", "/menus");
const remoteMenusByName = new Map(remoteMenus.map((menu) => [menu.name, menu]));

for (const menu of seed.menus ?? []) {
	if (remoteMenusByName.has(menu.name)) {
		await request("PUT", `/menus/${encodeURIComponent(menu.name)}`, { label: menu.label });
	} else {
		await request("POST", "/menus", { name: menu.name, label: menu.label });
	}

	const currentMenu = await request("GET", `/menus/${encodeURIComponent(menu.name)}`);
	const currentItems = [...(currentMenu.items ?? [])].sort(
		(a, b) => Number(Boolean(b.parent_id)) - Number(Boolean(a.parent_id)),
	);
	for (const item of currentItems) {
		await request(
			"DELETE",
			`/menus/${encodeURIComponent(menu.name)}/items?id=${encodeURIComponent(item.id)}`,
		);
	}

	async function createMenuItems(items, parentId = undefined) {
		for (const [sortOrder, item] of items.entries()) {
			const created = await request("POST", `/menus/${encodeURIComponent(menu.name)}/items`, {
				type: item.type,
				label: item.label,
				customUrl: item.url,
				target: item.target,
				titleAttr: item.titleAttr,
				parentId,
				sortOrder,
			});
			menuItemsCreated++;
			if (item.children?.length) {
				await createMenuItems(item.children, created.id);
			}
		}
	}

	await createMenuItems(menu.items ?? []);
}

console.log(
	`Migrated schema at ${url}: ${collectionsCreated} collections created, ${collectionsUpdated} updated, ` +
		`${fieldsCreated} fields created, ${fieldsReconciled} orphan columns reconciled, ` +
		`${fieldsUpdated} fields updated, ${menuItemsCreated} menu items created.`,
);
