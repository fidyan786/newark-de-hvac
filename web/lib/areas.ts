export type AreaPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  image: string;
  imageAlt: string;
  zip: string;
  body: { h: string; p: string }[];
  faqs: { q: string; a: string }[];
};

export const areas: AreaPage[] = [
  {
    slug: "bear-de-hvac",
    title: "HVAC in Bear, DE | Newark HVAC Pros",
    description:
      "HVAC repair and installation for Bear, Delaware (19701) and nearby Route 40 / Lums Pond homes. Dispatched with the Newark, DE service area.",
    h1: "HVAC Service in Bear, DE",
    lede: "Bear is its own community with ZIP 19701 — not a Newark neighborhood with a different sign. Colonials, split-levels, and newer infill still need cooling that can handle Delaware humidity.",
    image: "/images/local/neighborhood.jpg",
    imageAlt: "Suburban homes similar to Bear, Delaware residential streets",
    zip: "19701",
    body: [
      {
        h: "What Bear homes typically need",
        p: "Summer AC service is the volume driver. Many houses are newer than Newark’s older core, but first-generation condensers from the 2000s are now in replacement age. Heat pumps show up more on newer builds.",
      },
      {
        h: "How we cover Bear",
        p: "Bear sits on the extended Newark dispatch radius along Pulaski Highway and toward Glasgow. Call with ZIP 19701 and the symptom.",
      },
    ],
    faqs: [
      { q: "Is Bear in the Newark service area?", a: "Yes. 19701 is on the nearby ZIP list." },
      { q: "Do I need a different company than Newark?", a: "No. It is the same team and the same phone path." },
    ],
  },
  {
    slug: "pike-creek-de-hvac",
    title: "HVAC in Pike Creek, DE | Newark HVAC Pros",
    description:
      "HVAC service for Pike Creek, Delaware — 19711-area homes, wooded lots, and dual-system houses near Newark.",
    h1: "HVAC Service in Pike Creek, DE",
    lede: "Pike Creek sits a few miles from downtown Newark, mostly in the 19711 ZIP. Owner-occupied split-levels, finished basements, and tree-shaded condensers change how jobs are diagnosed.",
    image: "/images/local/ranch.jpg",
    imageAlt: "Suburban home similar to Pike Creek, Delaware lots",
    zip: "19711",
    body: [
      {
        h: "Housing and climate",
        p: "Same humid summers and cold January nights as Newark, with more zone complexity: bonus rooms, denser tree cover, and older duct chases that were never redesigned after a remodel.",
      },
      {
        h: "Typical conversations",
        p: "Quiet operation on tight lots, dual-fuel or heat-pump interest, and indoor air quality for finished lower levels.",
      },
    ],
    faqs: [
      {
        q: "Is Pike Creek its own city?",
        a: "It is a distinct community in New Castle County, often searched separately from Newark HVAC. Coverage is still from the same dispatch.",
      },
    ],
  },
  {
    slug: "glasgow-de-hvac",
    title: "HVAC in Glasgow, DE | Newark HVAC Pros",
    description: "HVAC repair and installation for Glasgow, Delaware and nearby 19702 streets south and west of Newark.",
    h1: "HVAC Service in Glasgow, DE",
    lede: "Glasgow sits on the south/west side of the Newark orbit. 19702 work already runs this direction every cooling season.",
    image: "/images/about/house.jpg",
    imageAlt: "Residential street typical of Glasgow and southern Newark-area housing",
    zip: "19702",
    body: [
      {
        h: "How Glasgow fits the Newark map",
        p: "Glasgow is its own named community, not a Newark neighborhood with a different sign. Humidity and January cold are the same problem set as Newark.",
      },
    ],
    faqs: [
      { q: "Do you treat Glasgow as a separate company?", a: "No. Same team, same phone path. Glasgow is on the Newark dispatch map." },
    ],
  },
  {
    slug: "hockessin-de-hvac",
    title: "HVAC in Hockessin, DE | Newark HVAC Pros",
    description: "HVAC service for Hockessin, Delaware (19707) — larger lots, mixed equipment, and New Castle County winters.",
    h1: "HVAC Service in Hockessin, DE",
    lede: "Hockessin (19707) is on the extended map. Lots are larger, equipment is mixed, and expectations are specific. We cover it as Newark-area dispatch, not a second brand.",
    image: "/images/local/brick-home.jpg",
    imageAlt: "Brick suburban home similar to Hockessin, Delaware residences",
    zip: "19707",
    body: [
      {
        h: "What to mention when you call",
        p: "ZIP 19707, heat or cool, and whether the home is on a well-wooded lot (condensers hide in leaves all summer).",
      },
    ],
    faqs: [
      { q: "Is Hockessin too far?", a: "It is on the extended list. Ask when you call if the day’s routing is already committed." },
    ],
  },
  {
    slug: "christiana-de-hvac",
    title: "HVAC in Christiana, DE | Newark HVAC Pros",
    description:
      "HVAC service for Christiana, Delaware — mall-adjacent commercial, rentals, and homes between Newark and the I-95 corridor.",
    h1: "HVAC Service in Christiana, DE",
    lede: "Christiana mixes homes, rentals, and small commercial. Cooling complaints spike the same week the mall parking lot feels like a griddle.",
    image: "/images/commercial/office.jpg",
    imageAlt: "Commercial and office buildings near Christiana, Delaware",
    zip: "19702",
    body: [
      {
        h: "Homes and light commercial",
        p: "We handle residential systems and light commercial splits or packaged units. Large campus facilities are a different conversation — ask, and we will not overclaim.",
      },
    ],
    faqs: [
      { q: "Do you service businesses near the mall?", a: "Light commercial, yes, with access arranged. Call with the equipment type if you know it." },
    ],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
