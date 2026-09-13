import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { areas, getArea } from "@/lib/areas";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);
  if (area) return pageMeta({ title: area.title, description: area.description, path: `/${slug}/` });
  return {};
}

export default async function AreaRoute({ params }: Props) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();
  const url = absoluteUrl(`/${a.slug}/`, site.siteUrl);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/", site.siteUrl) },
          { name: "Service Area", url: absoluteUrl("/service-area/", site.siteUrl) },
          { name: a.h1, url },
        ])}
      />
      <JsonLd data={faqJsonLd(a.faqs)} />
      <div className="page-top">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/service-area/", label: "Service Area" },
              { href: `/${a.slug}/`, label: a.h1 },
            ]}
          />
        </div>
      </div>
      <PageHero eyebrow={`ZIP ${a.zip}`} title={a.h1} lede={a.lede} image={a.image} imageAlt={a.imageAlt} />
      <section className="section">
        <div className="wrap faq-wrap">
          {a.body.map((block) => (
            <div key={block.h}>
              <h2>{block.h}</h2>
              <p>{block.p}</p>
            </div>
          ))}
          <FaqList items={a.faqs} />
        </div>
      </section>
      <CtaBand title={`Need HVAC help in ${a.h1.replace("HVAC Service in ", "")}?`} text="Same Newark dispatch. Tell us the ZIP and the problem." />
    </>
  );
}
