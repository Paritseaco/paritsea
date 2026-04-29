globalThis.process ??= {};
globalThis.process.env ??= {};
import { g as getPublicOrigin } from "./public-url_CjoNeDiE.mjs";
import "./index_Cc6aPHRD.mjs";
import { V as VALID_SCOPES } from "./authenticate-CZ5fe42l_3kffwd1O.mjs";
const prerender = false;
const GET = async ({ url, locals }) => {
  const origin = getPublicOrigin(url, locals.emdash?.config);
  return Response.json(
    {
      resource: `${origin}/_emdash/api/mcp`,
      authorization_servers: [`${origin}/_emdash`],
      scopes_supported: [...VALID_SCOPES],
      bearer_methods_supported: ["header"]
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
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
