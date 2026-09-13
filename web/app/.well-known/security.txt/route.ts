import { securityContactEmail } from "@/lib/security";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  const email = securityContactEmail();
  const canonical = absoluteUrl("/.well-known/security.txt", site.siteUrl);
  const lines = [
    `# Newark HVAC Pros — security contact`,
    `# Configure SECURITY_CONTACT_EMAIL or NEXT_PUBLIC_EMAIL for a mailto contact.`,
    `Contact: ${absoluteUrl("/contact/", site.siteUrl)}`,
    email ? `Contact: mailto:${email}` : null,
    `Expires: 2027-09-13T00:00:00.000Z`,
    `Preferred-Languages: en`,
    `Canonical: ${canonical}`,
    `Policy: ${absoluteUrl("/privacy-policy/", site.siteUrl)}`,
  ].filter(Boolean);

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
