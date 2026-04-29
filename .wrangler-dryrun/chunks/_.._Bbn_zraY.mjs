globalThis.process ??= {};
globalThis.process.env ??= {};
import { env } from "cloudflare:workers";
import { a as apiError, h as handleError } from "./error_BF6Eb6os.mjs";
const prerender = false;
const MAX_DELIVERY_DIMENSION = 3200;
const DEFAULT_WEBP_QUALITY = 82;
const SAFE_INLINE_TYPES = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/x-icon",
  "video/mp4",
  "video/webm",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg"
]);
const TRANSFORMABLE_IMAGE_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
function parsePositiveInt(value, max) {
  if (!value) return void 0;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return void 0;
  return Math.min(parsed, max);
}
const GET = async ({ params, locals, request }) => {
  const { key } = params;
  const { emdash } = locals;
  if (!key) {
    return apiError("NOT_FOUND", "File not found", 404);
  }
  if (!emdash?.storage) {
    return apiError("NOT_CONFIGURED", "Storage not configured", 500);
  }
  try {
    const result = await emdash.storage.download(key);
    const url = new URL(request.url);
    const width = parsePositiveInt(url.searchParams.get("w"), MAX_DELIVERY_DIMENSION);
    const height = parsePositiveInt(url.searchParams.get("h"), MAX_DELIVERY_DIMENSION);
    const quality = parsePositiveInt(url.searchParams.get("q"), 100) ?? DEFAULT_WEBP_QUALITY;
    const requestedFormat = url.searchParams.get("f");
    const accepts = request.headers.get("Accept") || "";
    const outputFormat = requestedFormat === "webp" ? "image/webp" : requestedFormat === "avif" ? "image/avif" : requestedFormat === "jpeg" ? "image/jpeg" : requestedFormat === "png" ? "image/png" : accepts.includes("image/webp") ? "image/webp" : null;
    const shouldTransform = Boolean(env.IMAGES) && Boolean(result.body) && TRANSFORMABLE_IMAGE_TYPES.has(result.contentType) && (outputFormat !== null || width !== void 0 || height !== void 0);
    if (shouldTransform && result.body) {
      const [transformBody, fallbackBody] = result.body.tee();
      try {
        let pipeline = env.IMAGES.input(transformBody);
        if (width || height) {
          pipeline = pipeline.transform({
            width,
            height,
            fit: "scale-down"
          });
        }
        const transformedResponse = (await pipeline.output({
          format: outputFormat ?? "image/webp",
          quality
        })).response();
        const headers2 = {
          "Content-Type": transformedResponse.headers.get("Content-Type") || outputFormat || result.contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Content-Type-Options": "nosniff",
          "Content-Security-Policy": "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
          "Content-Disposition": "inline",
          Vary: "Accept"
        };
        return new Response(transformedResponse.body, { status: 200, headers: headers2 });
      } catch (error) {
        console.warn("[emdash] Failed to optimize image delivery; serving original asset.", error);
        const fallbackHeaders = {
          "Content-Type": result.contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Content-Type-Options": "nosniff",
          "Content-Security-Policy": "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
          "Content-Disposition": SAFE_INLINE_TYPES.has(result.contentType) ? "inline" : "attachment"
        };
        if (result.size) {
          fallbackHeaders["Content-Length"] = String(result.size);
        }
        return new Response(fallbackBody, { status: 200, headers: fallbackHeaders });
      }
    }
    const headers = {
      "Content-Type": result.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      // Sandbox CSP on all user-uploaded content — prevents script execution
      // even for SVGs navigated to directly or content types that support scripting.
      "Content-Security-Policy": "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'"
    };
    if (result.size) {
      headers["Content-Length"] = String(result.size);
    }
    if (SAFE_INLINE_TYPES.has(result.contentType)) {
      headers["Content-Disposition"] = "inline";
    } else {
      headers["Content-Disposition"] = "attachment";
    }
    return new Response(result.body, { status: 200, headers });
  } catch (error) {
    if (error instanceof Error && (error.message.includes("not found") || error.message.includes("NOT_FOUND"))) {
      return apiError("NOT_FOUND", "File not found", 404);
    }
    return handleError(error, "Failed to serve file", "FILE_SERVE_ERROR");
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
