import { PHOTOS, serviceHref } from "./paths";

export type NavGroup = {
  id: string;
  label: string;
  items: { href: string; label: string }[];
};

export const serviceGroups: NavGroup[] = [
  {
    id: "cooling",
    label: "Cooling",
    items: [
      { href: serviceHref("ac-repair-newark-de"), label: "AC Repair" },
      { href: serviceHref("ac-installation-newark-de"), label: "AC Installation" },
      { href: serviceHref("ac-replacement-newark-de"), label: "AC Replacement" },
      { href: serviceHref("ac-maintenance-newark-de"), label: "AC Maintenance" },
    ],
  },
  {
    id: "heating",
    label: "Heating",
    items: [
      { href: serviceHref("furnace-repair-newark-de"), label: "Furnace Repair" },
      { href: serviceHref("furnace-installation-newark-de"), label: "Furnace Installation" },
      { href: serviceHref("furnace-replacement-newark-de"), label: "Furnace Replacement" },
      { href: serviceHref("furnace-maintenance-newark-de"), label: "Heating Maintenance" },
      { href: serviceHref("heating-repair-newark-de"), label: "Heating Repair" },
    ],
  },
  {
    id: "heat-pumps",
    label: "Heat Pumps",
    items: [
      { href: serviceHref("heat-pump-repair-newark-de"), label: "Heat Pump Repair" },
      { href: serviceHref("heat-pump-installation-newark-de"), label: "Heat Pump Installation" },
      { href: serviceHref("heat-pump-maintenance-newark-de"), label: "Heat Pump Maintenance" },
      { href: serviceHref("ductless-mini-split-newark-de"), label: "Ductless Mini Splits" },
      { href: serviceHref("mini-split-repair-newark-de"), label: "Mini Split Repair" },
    ],
  },
  {
    id: "air",
    label: "Indoor Air Quality",
    items: [
      { href: serviceHref("indoor-air-quality-newark-de"), label: "Indoor Air Quality" },
      { href: serviceHref("air-filtration-newark-de"), label: "Air Filtration" },
      { href: serviceHref("humidifiers-dehumidifiers-newark-de"), label: "Humidity Control" },
      { href: serviceHref("ductwork-newark-de"), label: "Ductwork" },
    ],
  },
  {
    id: "commercial",
    label: "Commercial HVAC",
    items: [
      { href: serviceHref("commercial-hvac-newark-de"), label: "Commercial HVAC" },
      { href: serviceHref("commercial-ac-newark-de"), label: "Commercial AC" },
      { href: serviceHref("commercial-heating-newark-de"), label: "Commercial Heating" },
      { href: serviceHref("commercial-hvac-maintenance-newark-de"), label: "Commercial Maintenance" },
    ],
  },
  {
    id: "emergency",
    label: "Emergency HVAC",
    items: [
      { href: serviceHref("emergency-hvac-newark-de"), label: "Emergency HVAC" },
      { href: serviceHref("emergency-ac-repair-newark-de"), label: "Emergency AC Repair" },
      { href: serviceHref("emergency-heating-newark-de"), label: "Emergency Heating" },
    ],
  },
];

export const centerNav = [
  { href: "/service-area/", label: "Service Areas" },
  { href: "/about/", label: "About" },
  { href: "/resources/", label: "Resources" },
];

export const footerServices = [
  { href: serviceHref("ac-repair-newark-de"), label: "AC Repair" },
  { href: serviceHref("furnace-repair-newark-de"), label: "Furnace Repair" },
  { href: serviceHref("heat-pump-repair-newark-de"), label: "Heat Pump Repair" },
  { href: serviceHref("emergency-hvac-newark-de"), label: "Emergency HVAC" },
  { href: serviceHref("hvac-replacement-newark-de"), label: "Replacement" },
  { href: serviceHref("hvac-maintenance-newark-de"), label: "Maintenance" },
  { href: serviceHref("indoor-air-quality-newark-de"), label: "Indoor Air Quality" },
  { href: serviceHref("ductless-mini-split-newark-de"), label: "Mini Splits" },
  { href: serviceHref("commercial-hvac-newark-de"), label: "Commercial" },
];

export const locationLinks = [
  { href: "/bear-de-hvac/", label: "Bear" },
  { href: "/pike-creek-de-hvac/", label: "Pike Creek" },
  { href: "/glasgow-de-hvac/", label: "Glasgow" },
  { href: "/hockessin-de-hvac/", label: "Hockessin" },
  { href: "/christiana-de-hvac/", label: "Christiana" },
];

export const serviceCategories = [
  {
    id: "cooling",
    label: "Cooling",
    title: "Air conditioning for humid summers",
    text: "When Newark humidity makes a weak condenser feel like a total failure, cooling work starts with diagnosis — not a guess.",
    image: PHOTOS.ac,
    imageAlt: "Outdoor air-conditioning condenser beside a residential wall",
    href: serviceHref("ac-repair-newark-de"),
    links: [
      { href: serviceHref("ac-repair-newark-de"), label: "AC Repair" },
      { href: serviceHref("ac-installation-newark-de"), label: "AC Installation" },
      { href: serviceHref("ac-replacement-newark-de"), label: "AC Replacement" },
      { href: serviceHref("ac-maintenance-newark-de"), label: "AC Maintenance" },
    ],
  },
  {
    id: "heating",
    label: "Heating",
    title: "Furnaces that start on cold nights",
    text: "January nights in New Castle County are unforgiving. Furnace and heating service covers gas and oil systems common in older Newark homes.",
    image: PHOTOS.ranch,
    imageAlt: "American suburban home that relies on central heating",
    href: serviceHref("furnace-repair-newark-de"),
    links: [
      { href: serviceHref("furnace-repair-newark-de"), label: "Furnace Repair" },
      { href: serviceHref("furnace-installation-newark-de"), label: "Furnace Installation" },
      { href: serviceHref("furnace-replacement-newark-de"), label: "Furnace Replacement" },
      { href: serviceHref("furnace-maintenance-newark-de"), label: "Heating Maintenance" },
    ],
  },
  {
    id: "heat-pumps",
    label: "Heat Pumps",
    title: "One system for both seasons",
    text: "One outdoor unit for both seasons — when it is sized honestly for Delaware winters and humid summers.",
    image: PHOTOS.heatPump,
    imageAlt: "Row of outdoor heat pump units at a residence",
    href: serviceHref("heat-pump-repair-newark-de"),
    links: [
      { href: serviceHref("heat-pump-repair-newark-de"), label: "Repair" },
      { href: serviceHref("heat-pump-installation-newark-de"), label: "Installation" },
      { href: serviceHref("heat-pump-maintenance-newark-de"), label: "Maintenance" },
      { href: serviceHref("ductless-mini-split-newark-de"), label: "Mini Splits" },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    title: "Seasonal system checkups",
    text: "Filters, coils, and safety checks before Newark’s cooling and heating seasons — not a parts pitch.",
    image: PHOTOS.tools,
    imageAlt: "Service tools on a workbench during an HVAC checkup",
    href: serviceHref("hvac-maintenance-newark-de"),
    links: [
      { href: serviceHref("ac-maintenance-newark-de"), label: "AC Maintenance" },
      { href: serviceHref("furnace-maintenance-newark-de"), label: "Heating Maintenance" },
      { href: serviceHref("heat-pump-maintenance-newark-de"), label: "Heat Pump Maintenance" },
      { href: serviceHref("hvac-maintenance-newark-de"), label: "HVAC Maintenance" },
    ],
  },
  {
    id: "iaq",
    label: "Indoor Air Quality",
    title: "Air that feels as good as it looks",
    text: "Filters, humidity, and ductwork matter as much as the equipment in mixed-humid Newark housing.",
    image: PHOTOS.iaq,
    imageAlt: "Residential kitchen with a ceiling supply vent",
    href: serviceHref("indoor-air-quality-newark-de"),
    links: [
      { href: serviceHref("indoor-air-quality-newark-de"), label: "Indoor Air Quality" },
      { href: serviceHref("air-filtration-newark-de"), label: "Air Filtration" },
      { href: serviceHref("humidifiers-dehumidifiers-newark-de"), label: "Humidity" },
      { href: serviceHref("ductwork-newark-de"), label: "Ductwork" },
    ],
  },
  {
    id: "commercial",
    label: "Commercial HVAC",
    title: "Shops, offices, and rentals",
    text: "Light commercial heating and cooling for shops, offices, and multi-unit properties around Newark and Christiana.",
    image: PHOTOS.commercial,
    imageAlt: "Commercial interior with exposed HVAC ductwork",
    href: serviceHref("commercial-hvac-newark-de"),
    links: [
      { href: serviceHref("commercial-hvac-newark-de"), label: "Commercial HVAC" },
      { href: serviceHref("commercial-ac-newark-de"), label: "Commercial AC" },
      { href: serviceHref("commercial-heating-newark-de"), label: "Commercial Heating" },
      { href: serviceHref("commercial-hvac-maintenance-newark-de"), label: "Maintenance" },
    ],
  },
  {
    id: "emergency",
    label: "Emergency HVAC",
    title: "When the system stops",
    text: "No heat, no cooling, or a system that will not start. Request service and describe the symptom. Gas, carbon monoxide, fire, or electrical danger is a public-safety situation first.",
    image: PHOTOS.panel,
    imageAlt: "Indoor mechanical equipment in a residential utility space",
    href: serviceHref("emergency-hvac-newark-de"),
    links: [
      { href: serviceHref("emergency-hvac-newark-de"), label: "Emergency HVAC" },
      { href: serviceHref("emergency-ac-repair-newark-de"), label: "Emergency AC" },
      { href: serviceHref("emergency-heating-newark-de"), label: "Emergency Heating" },
    ],
  },
];
