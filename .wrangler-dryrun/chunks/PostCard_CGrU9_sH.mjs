globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_fjmYYlIV.mjs";
import { H as maybeRenderHead, J as addAttribute, L as renderTemplate } from "./index_BpQCdXij.mjs";
import { r as renderComponent } from "./worker-entry_ByB1knaX.mjs";
import { $ as $$EmDashImage } from "./Base_D3tSK0o0.mjs";
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PostCard;
  const {
    title,
    excerpt,
    featuredImage,
    href,
    date,
    readingTime,
    tags,
    tagHref,
    bylines
  } = Astro2.props;
  const formattedDate = date ? date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }) : null;
  const primaryTag = tags && tags.length > 0 ? tags[0] : null;
  return renderTemplate`${maybeRenderHead()}<article class="post-card" data-astro-cid-iyiqi2so> ${featuredImage && renderTemplate`<a${addAttribute(href, "href")} class="card-image-link" tabindex="-1" aria-hidden="true" data-astro-cid-iyiqi2so> <div class="card-image" data-astro-cid-iyiqi2so> ${renderComponent($$result, "Image", $$EmDashImage, { "image": featuredImage, "data-astro-cid-iyiqi2so": true })} </div> </a>`} <div class="card-body" data-astro-cid-iyiqi2so> ${primaryTag && (tagHref ? renderTemplate`<a${addAttribute(tagHref, "href")} class="card-tag" data-astro-cid-iyiqi2so> ${primaryTag.label} </a>` : renderTemplate`<span class="card-tag" data-astro-cid-iyiqi2so> ${primaryTag.label} </span>`)} <a${addAttribute(href, "href")} class="card-title-link" data-astro-cid-iyiqi2so> <h2 class="card-title" data-astro-cid-iyiqi2so>${title}</h2> </a> ${excerpt && renderTemplate`<p class="card-excerpt" data-astro-cid-iyiqi2so>${excerpt}</p>`} <div class="card-meta" data-astro-cid-iyiqi2so> ${formattedDate && renderTemplate`<time class="card-date" data-astro-cid-iyiqi2so>${formattedDate}</time>`} ${formattedDate && readingTime && renderTemplate`<span class="card-sep" data-astro-cid-iyiqi2so>·</span>`} ${readingTime && renderTemplate`<span class="card-reading-time" data-astro-cid-iyiqi2so>${readingTime} min</span>`} </div> </div> </article>`;
}, "/Users/paritr/Desktop/paritsea/src/components/PostCard.astro", void 0);
export {
  $$PostCard as $
};
