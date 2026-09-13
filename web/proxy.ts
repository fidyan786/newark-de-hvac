import { NextRequest, NextResponse } from "next/server";
import { buildCsp, staticSecurityHeaders } from "@/lib/csp";

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce, process.env.NODE_ENV !== "production", process.env.NEXT_PUBLIC_GA4 || "");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("x-nonce", nonce);
  for (const header of staticSecurityHeaders) {
    response.headers.set(header.key, header.value);
  }
  response.headers.delete("Access-Control-Allow-Origin");
  response.headers.delete("X-Powered-By");
  return response;
}

export const proxyConfig = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|images/|robots.txt|sitemap.xml).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
