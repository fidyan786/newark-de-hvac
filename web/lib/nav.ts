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
      { href: "/ac-repair-newark-de/", label: "AC Repair" },
      { href: "/ac-installation-newark-de/", label: "AC Installation" },
      { href: "/hvac-replacement-newark-de/", label: "AC Replacement" },
      { href: "/hvac-maintenance-newark-de/", label: "AC Maintenance" },
    ],
  },
  {
    id: "heating",
    label: "Heating",
    items: [
      { href: "/furnace-repair-newark-de/", label: "Furnace Repair" },
      { href: "/furnace-installation-newark-de/", label: "Furnace Installation" },
      { href: "/hvac-replacement-newark-de/", label: "Furnace Replacement" },
      { href: "/furnace-repair-newark-de/", label: "Heating Repair" },
    ],
  },
  {
    id: "heat-pumps",
    label: "Heat Pumps",
    items: [
      { href: "/heat-pump-repair-newark-de/", label: "Heat Pump Repair" },
      { href: "/heat-pump-installation-newark-de/", label: "Heat Pump Installation" },
      { href: "/hvac-maintenance-newark-de/", label: "Heat Pump Maintenance" },
    ],
  },
  {
    id: "air",
    label: "Indoor Air Quality",
    items: [
      { href: "/indoor-air-quality-newark-de/", label: "Air Filtration" },
      { href: "/indoor-air-quality-newark-de/", label: "Humidifiers" },
      { href: "/indoor-air-quality-newark-de/", label: "Dehumidifiers" },
      { href: "/duct-cleaning-newark-de/", label: "Ductwork" },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    items: [
      { href: "/commercial-hvac-newark-de/", label: "Commercial HVAC" },
      { href: "/commercial-hvac-newark-de/", label: "Commercial AC" },
      { href: "/commercial-hvac-newark-de/", label: "Commercial Heating" },
      { href: "/hvac-maintenance-newark-de/", label: "Maintenance" },
    ],
  },
];

export const centerNav = [
  { href: "/service-area/", label: "Service Areas" },
  { href: "/about/", label: "About" },
  { href: "/resources/", label: "Resources" },
];

export const footerServices = [
  { href: "/ac-repair-newark-de/", label: "AC Repair" },
  { href: "/furnace-repair-newark-de/", label: "Furnace Repair" },
  { href: "/heat-pump-repair-newark-de/", label: "Heat Pump Repair" },
  { href: "/emergency-hvac-newark-de/", label: "Emergency HVAC" },
  { href: "/hvac-replacement-newark-de/", label: "Replacement" },
  { href: "/hvac-maintenance-newark-de/", label: "Maintenance" },
  { href: "/indoor-air-quality-newark-de/", label: "Indoor Air Quality" },
  { href: "/commercial-hvac-newark-de/", label: "Commercial" },
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
    image: "/images/ac/outdoor-unit.jpg",
    imageAlt: "Outdoor heat-pump and air-conditioning units along a residential wall",
    links: [
      { href: "/ac-repair-newark-de/", label: "AC Repair" },
      { href: "/ac-installation-newark-de/", label: "AC Installation" },
      { href: "/hvac-replacement-newark-de/", label: "AC Replacement" },
      { href: "/hvac-maintenance-newark-de/", label: "AC Maintenance" },
    ],
  },
  {
    id: "heating",
    label: "Heating",
    title: "Furnaces that start on cold nights",
    text: "January nights in New Castle County are unforgiving. Furnace and heating service covers gas and oil systems common in older Newark homes.",
    image: "/images/local/ranch.jpg",
    imageAlt: "American suburban home that relies on central heating",
    links: [
      { href: "/furnace-repair-newark-de/", label: "Furnace Repair" },
      { href: "/furnace-installation-newark-de/", label: "Furnace Installation" },
      { href: "/hvac-replacement-newark-de/", label: "Furnace Replacement" },
      { href: "/emergency-hvac-newark-de/", label: "No-heat service" },
    ],
  },
  {
    id: "heat-pumps",
    label: "Heat Pumps",
    title: "One system for both seasons",
    text: "One outdoor unit for both seasons — when it is sized honestly for Delaware winters and humid summers.",
    image: "/images/heat-pump/install.jpg",
    imageAlt: "Row of outdoor heat pump units at a residence",
    links: [
      { href: "/heat-pump-repair-newark-de/", label: "Repair" },
      { href: "/heat-pump-installation-newark-de/", label: "Installation" },
      { href: "/hvac-maintenance-newark-de/", label: "Maintenance" },
    ],
  },
  {
    id: "iaq",
    label: "Indoor Air Quality",
    title: "Air that feels as good as it looks",
    text: "Filters, humidity, and ductwork matter as much as the equipment in mixed-humid Newark housing.",
    image: "/images/iaq/vents.jpg",
    imageAlt: "Residential kitchen with a ceiling supply vent",
    links: [
      { href: "/indoor-air-quality-newark-de/", label: "Air Filtration" },
      { href: "/indoor-air-quality-newark-de/", label: "Humidity" },
      { href: "/duct-cleaning-newark-de/", label: "Ductwork" },
    ],
  },
  {
    id: "commercial",
    label: "Commercial HVAC",
    title: "Shops, offices, and rentals",
    text: "Light commercial heating and cooling for shops, offices, and multi-unit properties around Newark and Christiana.",
    image: "/images/commercial/building.jpg",
    imageAlt: "Commercial interior with exposed HVAC ductwork",
    links: [
      { href: "/commercial-hvac-newark-de/", label: "Commercial HVAC" },
      { href: "/hvac-maintenance-newark-de/", label: "Maintenance" },
    ],
  },
];
