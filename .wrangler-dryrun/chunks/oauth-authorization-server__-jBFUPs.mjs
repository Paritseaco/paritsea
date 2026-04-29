globalThis.process ??= {};
globalThis.process.env ??= {};
import { g as getPublicOrigin } from "./public-url_CjoNeDiE.mjs";
import "./index_Cc6aPHRD.mjs";
import { V as VALID_SCOPES } from "./authenticate-CZ5fe42l_3kffwd1O.mjs";
const prerender = false;
const GET = async ({ url, locals }) => {
  const origin = getPublicOrigin(url, locals.emdash?.config);
  const issuer = `${origin}/_emdash`;
  return Response.json(
    {
      issuer,
      authorization_endpoint: `${origin}/_emdash/oauth/authorize`,
      token_endpoint: `${origin}/_emdash/api/oauth/token`,
      scopes_supported: [...VALID_SCOPES],
      response_types_supported: ["code"],
      grant_types_supported: [
        "authorization_code",
        "refresh_token",
        "urn:ietf:params:oauth:grant-type:device_code"
      ],
      code_challenge_methods_supported: ["S256"],
      token_endpoint_auth_methods_supported: ["none"],
      client_id_metadata_document_supported: true,
      device_authorization_endpoint: `${origin}/_emdash/api/oauth/device/code`
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
