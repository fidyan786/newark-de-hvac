import assert from "node:assert/strict";
import { googleHtmlVerificationCode, googleSiteVerification } from "./gsc";

const prev = process.env.GOOGLE_SITE_VERIFICATION;

process.env.GOOGLE_SITE_VERIFICATION = "";
assert.equal(googleSiteVerification(), undefined);
assert.equal(googleHtmlVerificationCode(), undefined);

process.env.GOOGLE_SITE_VERIFICATION = "  abc_token-from-gsc  ";
assert.equal(googleSiteVerification(), "abc_token-from-gsc");
assert.equal(googleHtmlVerificationCode(), undefined);

process.env.GOOGLE_SITE_VERIFICATION = "google123abc.html";
assert.equal(googleSiteVerification(), undefined);
assert.equal(googleHtmlVerificationCode(), "123abc");

if (prev === undefined) delete process.env.GOOGLE_SITE_VERIFICATION;
else process.env.GOOGLE_SITE_VERIFICATION = prev;

console.log("gsc tests passed");
