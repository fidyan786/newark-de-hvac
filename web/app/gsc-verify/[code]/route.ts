import { googleHtmlVerificationCode } from "@/lib/gsc";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ code: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { code } = await params;
  const expected = googleHtmlVerificationCode();
  if (!expected || expected !== code) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(`google-site-verification: google${code}.html\n`, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
