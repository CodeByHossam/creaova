/**
 * Fail the production build before it can ship placeholder or unsafe
 * configuration.
 *
 * This runs from `prebuild`, so `npm run build` cannot produce a deployable
 * bundle with an example.com canonical origin, a missing form endpoint/key, or
 * an endpoint that would send enquiry data somewhere other than Web3Forms.
 *
 * Values are never printed. Only field names and sanitized hostnames appear in
 * the output.
 */

import { readEnv } from "./env.mjs";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ZERO_UUID = "00000000-0000-0000-0000-000000000000";
const PLACEHOLDER_HOSTS = new Set(["example.com", "example.org", "example.net", "localhost", "127.0.0.1", "0.0.0.0"]);

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function isPlaceholderHost(hostname) {
  const host = hostname.toLowerCase();
  return (
    PLACEHOLDER_HOSTS.has(host) ||
    host.endsWith(".example.com") ||
    host.endsWith(".example.org") ||
    host.endsWith(".example.net")
  );
}

const siteUrlRaw = readEnv("VITE_SITE_URL");
if (!siteUrlRaw) {
  fail("VITE_SITE_URL is required. Set the production origin (https://..., no path).");
} else {
  let siteUrl;
  try {
    siteUrl = new URL(siteUrlRaw);
  } catch {
    fail("VITE_SITE_URL is not a valid URL.");
  }

  if (siteUrl) {
    if (siteUrl.protocol !== "https:") {
      fail("VITE_SITE_URL must use https.");
    }
    if (siteUrl.username || siteUrl.password) {
      fail("VITE_SITE_URL must not contain credentials.");
    }
    if (siteUrl.pathname !== "/" && siteUrl.pathname !== "") {
      fail("VITE_SITE_URL must be an origin only, with no path.");
    }
    if (siteUrl.search || siteUrl.hash) {
      fail("VITE_SITE_URL must not include a query string or fragment.");
    }
    if (isPlaceholderHost(siteUrl.hostname)) {
      fail("VITE_SITE_URL is still a reserved placeholder or local host.");
    }
    if (siteUrl.hostname.endsWith(".onrender.com")) {
      warnings.push(
        "VITE_SITE_URL uses an onrender.com platform hostname. Set a custom domain before public launch so the canonical origin is not tied to a reclaimable platform subdomain.",
      );
    }
  }
}

const provider = readEnv("VITE_FORM_PROVIDER") || "web3forms";
if (provider !== "web3forms") {
  fail("VITE_FORM_PROVIDER must be `web3forms`; no other provider is implemented.");
}

const endpoint = readEnv("VITE_FORM_ENDPOINT");
if (!endpoint) {
  fail("VITE_FORM_ENDPOINT is required so the contact form can submit.");
} else if (endpoint !== "https://api.web3forms.com/submit") {
  fail("VITE_FORM_ENDPOINT must be exactly https://api.web3forms.com/submit.");
}

const accessKey = readEnv("VITE_FORM_ACCESS_KEY");
if (!accessKey) {
  fail("VITE_FORM_ACCESS_KEY is required. Add the Web3Forms access key for the destination inbox.");
} else if (!UUID_RE.test(accessKey) || accessKey.toLowerCase() === ZERO_UUID) {
  fail("VITE_FORM_ACCESS_KEY is not a valid Web3Forms access key.");
}

const captchaSiteKey = readEnv("VITE_FORM_CAPTCHA_SITEKEY");
if (captchaSiteKey && (!UUID_RE.test(captchaSiteKey) || captchaSiteKey.toLowerCase() === ZERO_UUID)) {
  fail("VITE_FORM_CAPTCHA_SITEKEY is not a valid hCaptcha site key.");
}

if (warnings.length) {
  for (const warning of warnings) console.warn(`[validate-env] warning: ${warning}`);
}

if (errors.length) {
  console.error("[validate-env] Build blocked. Fix these configuration problems:");
  for (const error of errors) console.error(`  - ${error}`);
  console.error("[validate-env] Add real values to .env locally or to the host's environment settings.");
  process.exit(1);
}

const host = new URL(siteUrlRaw).host;
console.log(`[validate-env] configuration valid for ${host}.`);
